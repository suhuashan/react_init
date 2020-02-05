import styled from 'styled-components';
import { CommonEllipsis } from '@/style/common.js';

export const CtgDetailWrapper = styled.div`
    padding: 40px;
    min-height: 600px;
`;

export const CtgDetailContent = styled.div`
    position: relative;
    margin-left: 55px;
    margin-top: 55px;
`;

export const CtgTitle = styled.div`
    position: relative;
    font-size: 22px;
    margin-left: 20px;
    height: 33px;
    line-height: 33px;
    font-weight: bold;

    &::before {
        content: " ";
        position: absolute;
        left: -20px;
        top: 18px;
        margin-left: -4px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        background: #bbb;
        border-radius: 50%;
        z-index: 11;
    }
    span {
        margin-left: 6px;
        color: #bbb;
        font-size: 18px;
    }
`;

export const BlogItem = styled.div`
    margin: 30px 0;
    padding: 40px 25px 25px;
    height: 118px;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);

    &::after {
        content: " ";
        position: absolute;
        top: 20px;
        left: 0;
        margin-left: -2px;
        width: 4px;
        height: 100%;
        background: #f5f5f5;
        z-index: 10;
    }
`;

export const BlogDetail = styled.div`
    font-size: 16px;
    padding-left: 12px;
    height: 48px;
    line-height: 48px;
    position: relative;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: border;
    border-bottom: 1px dashed #ccc;

    span {
        vertical-align: top;
        font-size: 12px;
        margin: 0 6px;
    }

    &::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 22px;
        width: 8px;
        height: 8px;
        margin-left: -4px;
        background: #bbb;
        border-radius: 50%;
        border: 1px solid #fff;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        transition-delay: 0s;
        transition-property: background;
    }
`;

export const BlogTitle = styled(CommonEllipsis)`
    width: 450px;
    display: inline-block;
`;