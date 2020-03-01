import styled from 'styled-components';

export const TagsWrapper = styled.div`
    min-height: 500px;
`;

export const TagsList = styled.div`
    text-align: center;
`;

export const TagsItem = styled.span`
    font-size: 12px;
    color: #555;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    margin: 10px;
    border-bottom: 1px solid #999;
    word-wrap: break-word;
    cursor: pointer;
`;