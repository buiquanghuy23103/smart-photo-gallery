import GalleryPageComponent from "./GalleryPageComponent";
import HomePageComponent from "./HomePageComponent";
import LoginPageComponent from "./LoginPageComponent";

type Route = {
    name: string,
    path: string,
    exact: boolean,
    component: () => JSX.Element
};

const routes: Route[] = [
    {
        name: "Home",
        path: "/",
        exact: true,
        component: () => <HomePageComponent />
    },
    {
        name: "Gallery",
        path: "/gallery",
        exact: false,
        component: () => <GalleryPageComponent />
    },
    {
        name: "Login",
        path: "/login",
        exact: false,
        component: () => <LoginPageComponent />
    },
];

export default routes;