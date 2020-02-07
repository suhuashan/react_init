import styled from 'styled-components';

export const ArchivesWrapper = styled.div`
    min-height: 500px;
`;

export const ArchivesContent = styled.div`
    margin-left: 44px;
    position: relative;
    z-index: 50;
`;
export const ArchivesInfoLogo = styled.span`
    position: absolute;
    top: 11px;
    left: 0;
    margin-left: -6px;
    width: 10px;
    height: 10px;
    opacity: 0.5;
    background: #555;
    border: 1px solid #fff;
    border-radius: 50%;
`;

export const ArchivesInfo = styled.div`
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    position: relative;
    top: 5px;
    left: 20px;
`;

export const ArchivesYear = styled.div`
    font-size: 22px;
    position: relative;
    margin: 60px 0;
    font-weight: bold;
    height: 33px;
    line-height: 33px;
    padding-left: 20px;

    &::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -4px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        background: #bbb;
        border-radius: 50%;
        z-index: 30;
    }
`;