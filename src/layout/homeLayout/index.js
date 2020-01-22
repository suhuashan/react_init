import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Modal, Button, Form, Input, Icon } from 'antd';
import { 
    HomeLayoutConatiner,
    HomeContainer,
    LeftContainer,
    LeftTop,
    PersonInfo,
    PersonAvatar,
    PersonName,
    PersonSignature,
    NavLinkContainer,
    LeftBottom,
    RightContainer
} from './style.js';
import NavLinkConfig from './navLinkConfig.js';
import ajax from '@/util/request.js';
import { actionCreators } from './store/index.js';
import { LOGIN, REG, USER_INFO } from '@/const/api/index.js';

function HomeLayout (props) {
    const { getFieldDecorator, validateFields } = props.form;

    let [modalStatus, setModalStatus] = useState(false);
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
              
              ajax({
                  url: type === 'login' ? LOGIN : REG,
                  method: 'post',
                  data: {
                      username,
                      password
                  }
              }).then(res => {
                handleCancel();
                dispatch(actionCreators.getUserInfo(username));
              });
            }
        });
    };

    return (
        <HomeLayoutConatiner>
            <HomeContainer>
                <LeftContainer>
                    <LeftTop>
                        <PersonInfo>
                            <PersonAvatar avatar={userData.avatar}></PersonAvatar>
                            <PersonName title={userData.account}
                                        onClick={() => {setModalStatus(true)}}>
                                {userData.username ? userData.username : '登录/注册'}
                            </PersonName>
                            <PersonSignature title={userData.signature}>
                                {userData.signature ? userData.signature : '这个人很懒，啥都没写...'}
                            </PersonSignature>
                        </PersonInfo>
                        {
                            NavLinkConfig.map((item) => {
                                return (
                                    <NavLinkContainer key={item.navPath}>
                                        <NavLink to={item.navPath} activeClassName="selected" >
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
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            取消
                        </Button>
                    ]}>
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