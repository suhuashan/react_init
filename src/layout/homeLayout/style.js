import styled from "styled-components";
import { CommonEllipsis } from '../../style/common.js';
import Avatar from '../../assets/images/avatar.svg';

export const HomeLayoutConatiner = styled.div`
    border-top: 3px #222 solid;
    width: 100%;
`;

export const HomeContainer = styled.div`
    width: 970px;
    margin: 0 auto;
`;

export const LeftContainer = styled.div`
    float: left;
    width: 240px;
    margin-right: 30px;
    height: 720px;
`;

export const LeftTop = styled.div`
    background: #fff;
    height: 370px;
    margin-bottom: 15px;
`;

export const PersonInfo = styled.div`
    padding: 10px 20px 0;
    height: 115px;
    background: #222;
    color: #fff;
    margin-bottom: 16px;
`;

export const PersonAvatar = styled.div`
    float: left;
    width: 50px;
    height: 50px;
    border: 1px solid #fff;
    background: no-repeat #fff url(${props => props.avatar || Avatar}) center center;
    background-size: 100% 100%;
    border-radius: 50%;
    cursor: pointer;
`;

export const PersonName = styled(CommonEllipsis)`
    width: 65%;
    margin-left: 70px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
`;

export const PersonSignature = styled.div`
    position: relative;
    font-size: 14px;
    width: 100%;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    color: #ddd;
`;

export const SignatureContent = styled(CommonEllipsis)`
    width: 90%;
    height: 30px;
`;

export const EditIcon = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    float: right;
    font-size: 12px;
    cursor: pointer;
`;

export const NavLinkContainer = styled.div`
    position: relative;
    a {
        display: block;
        color: #555;
        height: 37px;
        line-height: 27px;
        padding: 5px 20px;
        font-size: 14px;
        cursor: pointer;
        &.selected {
            background: #f9f9f9;
            &:after {
                content: " ";
                position: absolute;
                top: 50%;
                margin-top: -3px;
                right: 15px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #bbb;
            }
        }
        .iconfont {
            font-size: 12px;
            margin-right: 10px;
        }
    }
`;

export const LeftBottom = styled.div`
    height: 320px;
    background: #fff;
`;

export const RightContainer = styled.div`
    overflow: hidden;
    width: 700px;
    height: 400px;
    background: #fff;
`;