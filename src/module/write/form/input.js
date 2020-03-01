import React, { forwardRef } from 'react';
import { Input, Form } from 'antd';

const { TextArea } = Input;

function FormInput (props, ref) {
    const { getFieldDecorator } = props.form;
    let { blogTitle = '', blogAbstract = ''} = props.formValue;

    return (
        <Form> 
            <Form.Item>
                {getFieldDecorator('blogTitle', {
                        rules: [
                            { 
                                validator: (rule, value = '', callback) => { 
                                    if (!value.length) {
                                        callback('文章标题不能为空!');
                                    } else if (value.length > 100) {
                                        callback('文章标题仅限100字!');
                                    }
                                    callback();
                                } 
                            }
                        ],
                        validateTrigger: 'onBlur',
                        initialValue: blogTitle
                    }
                )(
                    <Input placeholder="文章标题" autoComplete="off"/>,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('blogAbstract', {
                    rules: [{ required: true, message: '文章摘要不能为空！' }],
                    initialValue: blogAbstract
                })(
                    <TextArea placeholder="文章摘要" rows={3}/>
                )}
            </Form.Item>
        </Form>
    );
}

export default Form.create()(forwardRef(FormInput));
