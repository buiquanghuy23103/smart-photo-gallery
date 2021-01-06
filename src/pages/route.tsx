import GalleryPageComponent from "./GalleryPageComponent";
import HomePageComponent from "./HomePageComponent";
import LoginPageComponent from "./LoginPageComponent";

type Route = {
    path: string,
    exact: boolean,
    component: () => JSX.Element
};

const routes: Route[] = [
    {
        path: "/",
        exact: true,
        component: () => <HomePageComponent />
    },
    {
        path: "/gallery",
        exact: false,
        component: () => <GalleryPageComponent />
    },
    {
        path: "/login",
        exact: false,
        component: () => <LoginPageComponent />
    },
];

export default routes;