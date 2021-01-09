import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppContext } from '../../../store/AppContext'

export default function AuthRoute(props: RouteProps) {
    const context = useContext(AppContext);

    if (context?.isLoggedIn) {
        return <Route { ...props } >{ props.children }</Route>
    }

    return <Redirect to="/login" />
}
