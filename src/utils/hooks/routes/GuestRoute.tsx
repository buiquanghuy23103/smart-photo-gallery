import React, { Children, useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppContext } from '../../../store/AppContext';

export default function GuestRoute(props: RouteProps) {
    const context = useContext(AppContext);

    if (context?.isLoggedIn) {
        return <Redirect to="/" />
    }

    return <Route { ...props } >{ props.children }</Route>
}
