import React from 'react';
import { useSelector } from 'react-redux';
import { CategoryWrapper, CategoryList } from './style.js';
import CommonHeader from '../common/header/index.js';

function Categories (props) {
    let { categories, categoriesLen } = useSelector(state => ({
        categories: state.getIn(['homeLayout', 'categories']),
        categoriesLen: state.getIn(['homeLayout', 'categoriesLen'])
    }));

    let loadCategoryDetailBlog = (categoryName) => {
        props.history.replace(`/categories/${categoryName}`);
    }

    return (
        <CategoryWrapper>
            <CommonHeader text="分类" number={categoriesLen} />
            <CategoryList>
                <ul>
                    {
                        categories && categories.split(',').map(item => {
                            return (
                                <li key={item}>
                                    <span onClick={() => {loadCategoryDetailBlog(item)}}>
                                        <i className="iconfont icon-wenjianjia"></i>
                                        {item}
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </CategoryList>
        </CategoryWrapper>
    );
}

export default Categories;