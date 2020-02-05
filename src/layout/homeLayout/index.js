import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Modal, Button, Form, Input, Icon, message, Tooltip, Upload } from 'antd';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { 
    HomeLayoutConatiner,
    HomeContainer,
    LeftContainer,
    LeftTop,
    PersonInfo,
    PersonAvatar,
    PersonName,
    PersonSignature,
    SignatureContent,
    EditIcon,
    NavLinkContainer,
    LeftBottom,
    RightContainer
} from './style.js';
import NavLinkConfig from './navLinkConfig.js';
import ajax from '@/util/request.js';
import { actionCreators } from './store/index.js';
import { LOGIN, REG, EDIT_SIGNATURE } from '@/const/api/index.js';

function HomeLayout (props) {
    const { getFieldDecorator, validateFields } = props.form;

    let inputEl = useRef(null);
    let [modalStatus, setModalStatus] = useState(false);
    let [isEdit, setEditStatus] = useState(false);

    let userData = useSelector(state => {
        return {
            username: state.getIn(['homeLayout', 'username']),
            signature: state.getIn(['homeLayout', 'signature']),
            desc: state.getIn(['homeLayout', 'desc']),
            avatar: state.getIn(['homeLayout', 'avatar']),
            tags: state.getIn(['homeLayout', 'tags'])
        };
    });
    let dispatch = useDispatch();

    //登录/注册modal关闭方法
    let handleCancel = () => {
        setModalStatus(false);
    };

    //登录/注册modal表单内容提交请求
    let handleSubmit = (type) => {
        validateFields((err, values) => {
            if (!err) {
              let { username, password } = values;
              let isLogin = type === 'login';
              
              ajax({
                  url: isLogin ? LOGIN : REG,
                  method: 'post',
                  data: {
                      username,
                      password
                  }
              }).then(res => {
                handleCancel();
                message.success(isLogin ? '登录成功' : '注册成功');
                dispatch(actionCreators.getUserInfo());
              });
            }
        });
    };

    //编辑个性签名
    let handleEditSignature = () => {
        let editValue = get(inputEl, 'current.state.value', '');
        ajax({
            url: EDIT_SIGNATURE,
            method: 'post',
            data: {
                signature: editValue
            }
        }).then(() => {
            message.success('编辑成功');
            dispatch(actionCreators.getUserInfo());
        });
    };

    //图片上传成功回调
    let handleChange = (obj) => {
        if (obj.file.status === 'done' && obj.file.response.success) {
            message.success('上传成功');
            dispatch(actionCreators.getUserInfo());
        }
    };

    //图片上传格式的校验
    let beforeUpload = (file) => {
        if (!/image\/\w+/.test(file.type)) {
            message.warning('图片格式不正确');
            return false;
        } 
        return true;
    };

    useEffect(() => {
        dispatch(actionCreators.getUserInfo());
    }, []);

    return (
        <HomeLayoutConatiner>
            <HomeContainer>
                <LeftContainer>
                    <LeftTop>
                        <PersonInfo>
                            <Upload
                                name="avatar" 
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="http://localhost:8000/blog/upload?type=avatar"
                                withCredentials={true}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                <PersonAvatar avatar={userData.avatar}></PersonAvatar>
                            </Upload>
                            <PersonName onClick={() => {setModalStatus(true)}}>
                                <Tooltip placement="rightTop" title={userData.username} overlayClassName='common-tooltip'>
                                    {userData.username ? userData.username : '登录/注册'}
                                </Tooltip>
                            </PersonName>
                            <PersonSignature>
                                {
                                    isEdit ? 
                                    <Input placeholder="编辑个性签名" 
                                           size="small" 
                                           ref={inputEl}
                                           defaultValue={userData.signature}
                                           onBlur={() => setEditStatus(false)}
                                           onChange={debounce(handleEditSignature, 2000)}/> :
                                    <Fragment>
                                        <SignatureContent>
                                            <Tooltip placement="rightTop" title={userData.signature} overlayClassName='common-tooltip'>
                                                {userData.signature ? userData.signature : '这个人很懒，啥都没写...'}
                                            </Tooltip> 
                                        </SignatureContent>
                                        <EditIcon className="iconfont icon-bianji" 
                                                  onClick={() => {setEditStatus(true)}}/>
                                    </Fragment>
                                }


                            </PersonSignature>
                        </PersonInfo>
                        {
                            NavLinkConfig.map((item) => {
                                return (
                                    <NavLinkContainer key={item.navPath}>
                                        <NavLink to={item.navPath} activeClassName="selected" exact={true}>
                                            <i className={`iconfont ${item.navIcon}`}></i>
                                            {item.navText}
                                        </NavLink>
                                    </NavLinkContainer>
                                );
                            })
                        }
                    </LeftTop>
                    <LeftBottom>leftBottom</LeftBottom>
                </LeftContainer>
                <RightContainer>
                    { renderRoutes(props.route.routes) }
                </RightContainer>
            </HomeContainer>
            <Modal  width={400}
                    visible={modalStatus}
                    title="登录/注册"
                    destroyOnClose={true}
                    onCancel={handleCancel}
                    footer={null}>
                 <Form className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { 
                                    validator: (rule, value = '', callback) => { 
                                        if (!value.length) {
                                            callback('用户名不能为空!')
                                        }
                                        callback();
                                    } 
                                }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入合法的用户名!"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { 
                                    validator: (rule, value = '', callback) => {  
                                        if (value.length > 16 || value.length < 8) {
                                            callback('请输入8-16位密码，必须包含英文字母和数字!');
                                        }
                                        callback();
                                    } 
                                }
                            ],
                            validateTrigger: 'onBlur'
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入8-16位密码，必须包含英文字母和数字!"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{'width': '100%'}} onClick={() => {
                            handleSubmit('login')
                        }}>
                            登录
                        </Button>
                        <Button type="primary" style={{'width': '100%'}} onClick={() => {
                            handleSubmit('reg')
                        }}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </HomeLayoutConatiner>
    );
}

export default Form.create()(HomeLayout);