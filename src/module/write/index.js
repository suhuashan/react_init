import React, { createRef, useEffect } from  'react';
import { useSelector, useDispatch } from 'react-redux';
import RichText from '@/components/richText/index.js';
import { WriteWrapper, 
         WriteTitle, 
         WriteInput, 
         BottomPart,
         BottomBtn,
         ArticleInfo } from './style.js';
import { actionCreators } from '@/layout/homeLayout/store/index.js';
import { getDraftDetail } from './store/actionCreators.js';
import { SAVE_PUBLISH_BLOG } from '@/const/api/index.js';
import {  BLOG_STATUS } from '@/const/text/index.js';
import { message, Button } from 'antd';
import ajax from '@/util/request.js';
import FormInput from './form/input.js';
import FormSelect from './form/select.js';

function Write (props) {
    let dispatch = useDispatch();
    let richTextRef = createRef();
    let formIputRef = createRef();
    let formSelectRef = createRef();
    let { blogID } = props.match.params;
    let { blogTitle, blogAbstract, blogContent, blogStatus, blogType, 
          blogTags, blogCategories } = useSelector(state => state.get('write').toJS());

    let savePublishBlog = (type) => {
        let blogContent = richTextRef.current.getContent();

        if (!blogContent) {
            message.warning('表单填写不完整');
            return;
        }
        Promise.all([
            formIputRef.current.validateFields(),
            formSelectRef.current.validateFields()
        ]).then(res => {
            let { blogTitle, blogAbstract } = res[0];
            let { blogType, blogTags, blogCategories} = res[1];

            ajax({
                method: 'post',
                url: SAVE_PUBLISH_BLOG,
                data: {
                    blogID: blogID || '',
                    blogStatus: BLOG_STATUS[type],
                    blogTitle,
                    blogAbstract,
                    blogTags: blogTags.join(),
                    blogCategories: blogCategories.join(),
                    blogType,
                    blogContent
                }   
            }).then(res => {
                let isPublished = type === 'published';

                message.success(isPublished ? '发布成功' : '保存成功');
                dispatch(actionCreators.getUserInfo());
                props.history.replace(isPublished ? '/home' : '/draft');
            });
        }).catch(() => {
            message.warning('表单填写不完整');
        })
    };

    useEffect(() => {
        console.log('write effect');
        dispatch(getDraftDetail(props.match.params.blogID || ''));
    }, []);

    return (
        <WriteWrapper>
            <WriteTitle>创作你的创作</WriteTitle>
            <FormInput ref={formIputRef} formValue={{blogTitle, blogAbstract}}/>
            <RichText ref={richTextRef} url='http://localhost:8000/blog/upload' defaultValue={blogContent}/>
            <FormSelect ref={formSelectRef} formValue={{blogTags, blogCategories, blogType}}/>
            <BottomBtn>
                <Button onClick={() => savePublishBlog('draft')}>保存为草稿</Button>
                <Button onClick={() => savePublishBlog('published')}>发布博客</Button>
            </BottomBtn>
        </WriteWrapper>
    );
}

export default Write;