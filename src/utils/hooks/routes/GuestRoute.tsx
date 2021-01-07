import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom';
import LoadingComponent from '../../../components/LoadingComponent';
import { AppContext } from '../../../store/AppContext';

export default function GuestRoute(props: RouteProps) {
    const context = useContext(AppContext);

    if (context?.isLoggedIn) {
        return <Redirect to="/" />
    }

    return <Route { ...props } />
}
