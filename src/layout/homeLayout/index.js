import React from 'react';
import { NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import NavLinkConfig from './navLinkConfig.js';

import { 
    HomeLayoutConatiner,
    HomeContainer,
    LeftContainer,
    LeftTop,
    PersonInfo,
    NavLinkContainer,
    LeftBottom,
    RightContainer
} from './style.js';

function HomeLayout (props) {
    return (
        <HomeLayoutConatiner>
            <HomeContainer>
                <LeftContainer>
                    <LeftTop>
                        <PersonInfo></PersonInfo>
                        {
                            NavLinkConfig.map((item, index) => {
                                return (
                                    <NavLinkContainer key={item.navPath}>
                                        <NavLink to={item.navPath} activeClassName="selected" >
                                            <i className={`iconfont ${item.navIcon}`}></i>
                                            {item.navText}
                                        </NavLink>
                                    </NavLinkContainer>
                                );
                            })
                        }
                    </LeftTop>
                    <LeftBottom>leftBottom</LeftBottom>
                </LeftContainer>
                <RightContainer>
                    { renderRoutes(props.route.routes) }
                </RightContainer>
            </HomeContainer>
        </HomeLayoutConatiner>
    );
}

export default HomeLayout;