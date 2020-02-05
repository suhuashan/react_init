import styled from 'styled-components';
import { CommonEllipsis } from '../../style/common.js';

export const HomeWrapper = styled.div`
    width: 100%;
    min-height: 500px;
    padding: 40px;
`;

export const BlogItem = styled.div`
    height: 353px;
    width: 570px;
    padding: 25px;
    margin: 60px auto;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
`;

export const BlogTitle = styled(CommonEllipsis)`
    margin: 0 auto;
    width: 80%;
    font-size: 22px;
    font-weight: 400px;
    height: 32px;
    line-height: 32px;
    text-align: center;
`;

export const BlogInfo = styled.div`
    font-size: 12px;
    margin: 3px auto 60px;
    color: #999;
    text-align: center;
    width: 80%;
    height: 48px;
    line-height: 24px;
`;
export const BlogInfoItem = styled.div`
    height: 24px;
    line-height: 24px;
    .iconfont {
        font-size: 12px;
        padding: 0 4px;
    }
`;

export const BlogAbstract = styled(CommonEllipsis)`
    font-size: 14px;
    color: #555;
    width: 80%;
    height: 28px;
    line-height: 28px;
    margin-bottom: 20px;
`;

export const ReadAll = styled.div`
    color: #555;
    background: #fff;
    width: 112px;
    padding: 0 20px;
    font-size: 14px;
    margin: 40px auto 0;
    height: 32px;
    line-height: 2;
    text-align: center;
    border: 2px solid #555;
    border-radius: 2px;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: 0.25s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;

    &:hover {
        border-color: #222;
        color: #fff;
        background: #222;
    }
`;