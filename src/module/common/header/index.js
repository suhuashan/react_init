import React from 'react';
import { HeaderTitle, HeaderInfo } from './style.js';

function CommonHeader (props) {
    let { text, number } = props;
    return (
        <React.Fragment>
            <HeaderTitle>{text}</HeaderTitle>
            <HeaderInfo>目前共计{number}个{text}</HeaderInfo>
        </React.Fragment>
    )
}

export default CommonHeader;