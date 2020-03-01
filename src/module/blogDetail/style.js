import styled from 'styled-components';

export const BlogDetailWrapper = styled.div`
    padding-top: 40px;
    min-height: 600px;
`;

export const DetailArticle = styled.div`
    margin: 60px 0;
    padding: 25px;
    box-shadow: 0 0 5px rgba(202,203,203,0.5);
`;

export const BlogAbstract = styled.div`
    font-size: 14px;
    color: #555;
    line-height: 28px;
    margin-top: 20px;
`;

export const BlogContent = styled.div`
    margin: 30px 0;
    line-height: 28px;
    width: 100%;
    min-height: 400px;
    img {
        width: 100%;
        margin: 10px 0;
    }
`;

export const BlogEnd = styled.div`
    font-size: 14px;
    text-align: center;
    color: #ccc;
    .iconfont {
        color: #ccc;
    }
`;

export const BlogTag = styled.ul`
    margin-top: 40px;
    text-align: center;
    li {
        font-size: 13px;
        display: inline-block;
        border-bottom: 1px solid #999;
        height: 28px;
        line-height: 28px;
        margin: 0 2px;
        cursor: pointer;
    }
`;