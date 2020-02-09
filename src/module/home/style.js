import styled from 'styled-components';
import { CommonEllipsis } from '../../style/common.js';

export const HomeWrapper = styled.div`
    width: 100%;
    min-height: 500px;
`;

export const BlogItem = styled.div`
    height: 353px;
    width: 570px;
    padding: 25px;
    margin: 60px auto;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
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