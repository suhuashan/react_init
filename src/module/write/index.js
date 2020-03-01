import React, { createRef, useEffect, useState } from  'react';
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
    let tempBlogContent;
    let dispatch = useDispatch();
    let richTextRef = createRef();
    let formIputRef = createRef();
    let formSelectRef = createRef();
    let { blogID } = props.match.params;
    
    let { blogTitle, blogAbstract, blogContent, blogStatus, blogType, 
          blogTags, blogCategories } = useSelector(state => {
              return state.get('write').toJS();   
          });

    let savePublishBlog = (type) => {
        tempBlogContent = tempBlogContent || blogContent;
        if (!tempBlogContent) {
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
                    blogContent: tempBlogContent
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
        dispatch(getDraftDetail(props.match.params.blogID || ''));
    }, []);

    let saveEditorContent = (content) => {
        tempBlogContent = content;
    };

    return (
        <WriteWrapper>
            <WriteTitle>创作你的创作</WriteTitle>
            <FormInput ref={formIputRef} formValue={{blogTitle, blogAbstract}}/>
            
            <RichText url='http://localhost:8000/blog/upload' 
                    defaultValue={blogContent}
                    onQuillChange={saveEditorContent}
            /> 
            
            <FormSelect ref={formSelectRef} formValue={{blogTags, blogCategories, blogType}}/>
            <BottomBtn>
                <Button onClick={() => savePublishBlog('draft')}>保存为草稿</Button>
                <Button onClick={() => savePublishBlog('published')}>发布博客</Button>
            </BottomBtn>
        </WriteWrapper>
    );
}

export default Write;