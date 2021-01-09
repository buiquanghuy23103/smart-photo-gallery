import React from "react";
import GalleryPageComponent from "../../pages/GalleryPageComponent";
import HomePageComponent from "../../pages/HomePageComponent";
import LoginPageComponent from "../../pages/LoginPageComponent";
import SignUpPageComponent from "../../pages/SignUpPageComponent";


type Route = {
    name: string,
    path: string,
    exact: boolean,
    routeType?: RouteType,
    component: () => JSX.Element
};

export enum RouteType {
    default = "default",
    auth = "auth",
    guest = "guest",
}

const routes: Route[] = [
    {
        name: "Home",
        path: "/",
        exact: true,
        routeType: RouteType.default,
        component: () => <HomePageComponent />
    },
    {
        name: "Gallery",
        path: "/gallery",
        exact: false,
        routeType: RouteType.auth,
        component: () => <GalleryPageComponent />
    },
    {
        name: "Login",
        path: "/login",
        exact: false,
        routeType: RouteType.guest,
        component: () => <LoginPageComponent />
    },
    {
        name: "Sign up",
        path: "/signup",
        exact: false,
        routeType: RouteType.guest,
        component: () => <SignUpPageComponent />
    }
];

export default routes;