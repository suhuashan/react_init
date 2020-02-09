import React, { forwardRef } from 'react'; 
import { Form, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import uuid from '@/util/uuid.js';
 
import { ARTICLE_TYPE } from '@/const/text/index.js';

const { Option } = Select;

function FormSelect (props, ref) {
    const formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 28 },
    };
    const { getFieldDecorator, validateFields } = props.form;
    let { blogTags, blogCategories, blogType } = props.formValue;

    let { tags = '', categories = '' } = useSelector(state => {
        return {
            tags: state.getIn(['homeLayout', 'tags']),
            categories: state.getIn(['homeLayout', 'categories'])
        }
    });

    return (
        <Form {...formItemLayout}>
            <Form.Item label="文章标签"> 
                {getFieldDecorator('blogTags', {
                    rules: [{ required: true, message: '文章标签不能为空！' }],
                    initialValue: blogTags && blogTags.split() || []
                })(
                    <Select mode="tags" 
                            style={{ width: '80%' }} 
                            placeholder="文章标签">
                        {
                            tags && tags.split(',').map(item => {
                                return (<Option key={uuid(item)} value={item}>{item}</Option>);
                            }) || []
                        }  
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="分类专栏"> 
                {getFieldDecorator('blogCategories', {
                    rules: [{ required: true, message: '分类专栏不能为空！' }],
                    initialValue: blogCategories && blogCategories.split() || []
                })(
                    <Select mode="tags" 
                            style={{ width: '80%' }} 
                            placeholder="分类专栏">
                        {
                            categories && categories.split(',').map(item => {
                                return (<Option key={uuid(item)} value={item}>{item}</Option>);
                            }) || []
                        }   
                    </Select>
                )}
            </Form.Item>
            <Form.Item label="文章类型"> 
                {getFieldDecorator('blogType', {
                    rules: [{ required: true, message: '文章类型不能为空！' }],
                    initialValue: blogType
                })(
                    <Select style={{ width: '20%' }} 
                            placeholder="文章类型" >
                        {
                            ARTICLE_TYPE.map(item => {
                                return (<Option key={uuid(item.value)} value={item.value}>{item.name}</Option>);
                            })
                        }   
                    </Select>
                )}
            </Form.Item>
        </Form>
    )
}

export default Form.create()(forwardRef(FormSelect));
