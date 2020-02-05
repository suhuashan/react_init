import React, { createRef, useState, useRef, useCallback, useEffect } from  'react';
import { useSelector, useDispatch } from 'react-redux';
import RichText from '@/components/richText/index.js';
import { WriteWrapper, 
         WriteTitle, 
         WriteInput, 
         BottomPart,
         BottomBtn,
         ArticleInfo } from './style.js';
import { actionCreators } from '@/layout/homeLayout/store/index.js';
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
                    blogStatus: BLOG_STATUS[type],
                    blogTitle,
                    blogAbstract,
                    blogTags: blogTags.join(),
                    blogCategories: blogCategories.join(),
                    blogType,
                    blogContent
                }   
            }).then(res => {
                message.success('发布成功');
                dispatch(actionCreators.getUserInfo());
                props.history.replace('/home');
            });
        }).catch(() => {
            message.warning('表单填写不完整');
        })
    };
    
    return (
        <WriteWrapper>
            <WriteTitle>创作你的创作</WriteTitle>
            <FormInput ref={formIputRef}/>
            <RichText ref={richTextRef} url='http://localhost:8000/blog/upload'/>
            <FormSelect ref={formSelectRef}/>
            <BottomBtn>
                <Button onClick={() => savePublishBlog('draft')}>保存为草稿</Button>
                <Button onClick={() => savePublishBlog('published')}>发布博客</Button>
            </BottomBtn>
        </WriteWrapper>
    );
}

export default Write;