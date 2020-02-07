import styled from 'styled-components';

export const CategoryWrapper = styled.div`
    min-height: 500px;
`;

export const CategoryList = styled.div`
    margin-top: 20px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    ul {
        li {
            margin: 5px 10px;
            list-style: circle;
            span {
                border-bottom: 1px solid #999;
                cursor: pointer;
            }
        }
    }
`;