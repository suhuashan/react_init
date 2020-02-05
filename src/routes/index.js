import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";

import BlankLayout from '../layout/blankLayout/index.js';
import HomeLayout from '../layout/homeLayout/index.js';


const SuspenseComponent = Component => React.memo(props => {
    return (
        <Suspense fallback={null}>
            <Component {...props}></Component>
        </Suspense>
    )
},(nextProps, previousProps) => nextProps !== previousProps);

const HomeComponent = lazy(() => import("../module/home/index.js"));
const AboutComponent = lazy(() => import("../module/about/index.js"));
const CategoriesComponent = lazy(() => import("../module/categories/index.js"));
const CategoriesDetailComponent = lazy(() => import("../module/categories/detail/index.js"));
const TagsComponent = lazy(() => import("../module/tags/index.js"));
const TagsDetailComponent = lazy(() => import("../module/tags/detail/index.js"));
const ArchivesComponent = lazy(() => import("../module/archives/index.js"));
const WriteComponent = lazy(() => import("../module/write/index.js"));

export default [
    {
        component: BlankLayout,
        routes: [
            {
                path: "/",
                component: HomeLayout,
                routes: [
                    {
                        path: "/",
                        exact: true,
                        render: () => (<Redirect to="/home"></Redirect>)
                    },
                    {
                        path: "/home",
                        component: SuspenseComponent(HomeComponent)
                    },
                    {
                        path: "/about",
                        component: SuspenseComponent(AboutComponent)
                    },
                    {
                        path: "/categories",
                        exact: true,
                        component: SuspenseComponent(CategoriesComponent)
                    },
                    {
                        path: "/categories/:categoryName",
                        component: SuspenseComponent(CategoriesDetailComponent)
                    },
                    {
                        path: "/tags",
                        exact: true,
                        component: SuspenseComponent(TagsComponent)
                    },
                    {
                        path: "/tags/:tagName",
                        component: SuspenseComponent(TagsDetailComponent)
                    },
                    {
                        path: "/archives",
                        component: SuspenseComponent(ArchivesComponent)
                    },
                    {
                        path: "/write",
                        component: SuspenseComponent(WriteComponent)
                    }
                ]
            }
        ]
    }
];
  