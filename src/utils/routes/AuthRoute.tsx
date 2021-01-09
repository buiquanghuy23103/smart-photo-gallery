import React, { useContext } from 'react'
import { Redirect, RouteProps } from 'react-router-dom';
import { AppContext } from '../../store/AppContext';
import AnimatedRoute from './AnimatedRoute';

export default function AuthRoute({ children, ...rest }: RouteProps) {
    const context = useContext(AppContext);

    if (context?.isLoggedIn) {
        return <AnimatedRoute { ...rest } >{ children }</AnimatedRoute>
    }

    return <Redirect to="/login" />
}
