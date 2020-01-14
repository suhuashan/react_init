import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";

import Home from '../module/home/index.js';

const SuspenseComponent = Component => props => {
    return (
        <Suspense fallback={null}>
        <Component {...props}></Component>
        </Suspense>
    )
}

export default [
    {
        component: Home,
        routes: [
            {
                path: "/",
                component: Home,
                routes: [
                    {
                        path: "/",
                        exact: true
                    }
                ]
            }
        ]
    }
];
  