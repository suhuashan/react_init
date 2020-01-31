import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import debounce from 'lodash/debounce';
import RichText from '@/components/richText/index.js';
import ajax from '@/util/request.js';
import { EDIT_DESC } from '@/const/api/index.js';
import { AboutWrapper, RightEdit, EditIcon, DescWrapper, ButtonWrapper } from './style.js';
import { actionCreators } from '@/layout/homeLayout/store/index.js';

function About () {
    let { desc } = useSelector(state => ({
            desc: state.getIn(['homeLayout', 'desc'])
        }));
    let [editStatus, setEditStatus] = useState(false);
    let dispatch = useDispatch();

    let saveEditorContent = (content) => {
        ajax({
            url: EDIT_DESC,
            method: 'post',
            data: {
                desc: content
            }
        });
    };

    let editComplete = () => {
        setEditStatus(false);
        dispatch(actionCreators.getUserInfo());
    };

    return (
        <AboutWrapper>
            <RightEdit>
                {
                    editStatus ? 
                    <ButtonWrapper>
                        <Button size='small' onClick={editComplete}>完成</Button>
                    </ButtonWrapper> :
                    <EditIcon className='iconfont icon-bianji-page'
                              onClick={() => {setEditStatus(true)}}>
                        编辑
                    </EditIcon>
                }
            </RightEdit>
            {
                editStatus ? 
                <RichText url='http://localhost:8000/blog/upload'
                          defaultValue={desc}
                          onQuillChange={debounce(saveEditorContent, 1000)} /> :
                <DescWrapper className='ql-editor'
                             dangerouslySetInnerHTML={{ __html: desc }}></DescWrapper> 
            }

        </AboutWrapper>
    );
}

export default About;