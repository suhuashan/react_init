import React from 'react';
import { useSelector } from 'react-redux';
import { CategoryWrapper, CategoryList } from './style.js';
import { actionCreators } from './store/index.js';
import CommonHeader from '../common/header/index.js';

function Categories (props) {
    let { categories = '' } = useSelector(state => ({
        categories: state.getIn(['homeLayout', 'categories']).split(',')
    }));

    let loadCategoryDetailBlog = (categoryName) => {
        props.history.replace(`/categories/${categoryName}`);
    }

    return (
        <CategoryWrapper>
            <CommonHeader text="分类" number={categories.length} />
            <CategoryList>
                <ul>
                    {
                        categories.map(item => {
                            return (
                                <li key={item}>
                                    <span onClick={() => {loadCategoryDetailBlog(item)}}>{item}</span>
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