import styled from 'styled-components';
import { CommonEllipsis } from '../../../style/common.js';

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