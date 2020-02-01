//write模块
//文章类型
export const ARTICLE_TYPE = [
    {
        name: '原创',
        value: 'original'
    },
    {
        name: '转载',
        value: 'reproduce'
    },
    {
        name: '翻译',
        value: 'translate'
    }
];

//博客状态  'draft'表示仍为草稿，'published'表示为已经发布
export const BLOG_STATUS = {
    draft: 'draft',
    published: 'published'
};