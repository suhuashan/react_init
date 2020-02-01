import React, { useState, useRef, useCallback } from  'react';
import { useSelector, useDispatch } from 'react-redux';
import RichText from '@/components/richText/index.js';
import { Button, Input, Select } from 'antd';
import debounce from 'lodash/debounce';
import { WriteWrapper, 
         WriteTitle, 
         WriteInput, 
         BottomPart,
         BottomBtn,
         ArticleInfo } from './style.js';
import { ARTICLE_TYPE, BLOG_STATUS } from '@/const/text/index.js';
import { SAVE_PUBLISH_BLOG } from '@/const/api/index.js';
import { message } from 'antd';
import ajax from '@/util/request.js';

const { Option } = Select;
const { TextArea } = Input;

function Write () {
    let dispatch = useDispatch();
    let inputEl = useRef(null);
    let textAreaEl = useRef(null);
    let [blogType, setBlogType] = useState('');
    let [blogContent, setBlogContent] = useState('');
    let [blogTags, setBlogTags] = useState('');
    let [blogCategories, setBlogCategories] = useState('');
    let { tags = '', categories = '' } = useSelector(state => {
        return {
            tags: state.getIn(['homeLayout', 'tags']),
            categories: state.getIn(['homeLayout', 'categories'])
        }
    });

    let savePublishBlog = (type) => {
        ajax({
            method: 'post',
            url: SAVE_PUBLISH_BLOG,
            data: {
                blogStatus: BLOG_STATUS[type],
                blogTitle: inputEl.current.state.value,
                blogAbstract: textAreaEl.current.state.value,
                blogTags,
                blogCategories,
                blogType,
                blogContent
            }   
        }).then(res => {
            message.success('发布成功');
        });
    };
    
    return (
        <WriteWrapper>
            <WriteTitle>创作你的创作</WriteTitle>
            <WriteInput>
                <Input placeholder="文章标题" ref={inputEl}></Input>
                <TextArea rows={3} placeholder="文章摘要" ref={textAreaEl}></TextArea>
            </WriteInput>
            <RichText url='http://localhost:8000/blog/upload'
                      defaultValue={blogContent}
                      onQuillChange={debounce(setBlogContent, 1000)} />
            <BottomPart>
                <ArticleInfo>
                    文章标签：
                    <Select mode="tags" 
                            style={{ width: '80%' }} 
                            placeholder="文章标签"
                            onChange={(value) => {setBlogTags(value.join())}}>
                        {
                            tags && tags.split(',').map(item => {
                                return (<Option key={item}>{item}</Option>);
                            }) || []
                        }   
                    </Select>
                </ArticleInfo>
                <ArticleInfo>
                    分类专栏：
                    <Select mode="tags" 
                            key="categories"
                            style={{ width: '80%' }} 
                            placeholder="分类专栏"
                            onChange={(value) => setBlogCategories(value.join())}>
                        {
                            categories && categories.split(',').map(item => {
                                return (<Option key={item}>{item}</Option>);
                            }) || []
                        }   
                    </Select>
                </ArticleInfo>
                <ArticleInfo>
                    文章类型：
                    <Select style={{ width: '20%' }} 
                            placeholder="文章类型" 
                            onChange={(value) => {setBlogType(value)}}>
                        {
                            ARTICLE_TYPE.map(item => {
                                return (<Option key={item.value} value={item.value}>{item.name}</Option>);
                            })
                        }   
                    </Select>
                </ArticleInfo>
                <BottomBtn>
                    <Button onClick={() => savePublishBlog('draft')}>保存为草稿</Button>
                    <Button onClick={() => savePublishBlog('published')}>发布博客</Button>
                </BottomBtn>
            </BottomPart>
        </WriteWrapper>
    );
}

export default Write;