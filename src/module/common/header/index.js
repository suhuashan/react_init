import React from 'react';
import { HeaderTitle, HeaderInfo } from './style.js';

function CommonHeader (props) {
    let { title, text, number } = props;
    return (
        <React.Fragment>
            <HeaderTitle>{title || text}</HeaderTitle>
            <HeaderInfo>目前共计{number}个{text}</HeaderInfo>
        </React.Fragment>
    )
}

export default CommonHeader;