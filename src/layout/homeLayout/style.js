import styled from "styled-components";

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
    height: 115px;
    background: #222;
    color: #fff;
    margin-bottom: 16px;
`;

export const NavLinkContainer = styled.div`
    a {
        display: block;
        color: #555;
        height: 27px;
        line-height: 27px;
        padding: 5px 20px;
        font-size: 14px;
        cursor: pointer;
        &.selected {
            background: #f9f9f9;
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