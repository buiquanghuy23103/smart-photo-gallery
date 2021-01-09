import React, { useContext } from 'react'
import { Redirect, RouteProps } from 'react-router-dom';
import { AppContext } from '../../store/AppContext';
import AnimatedRoute from './AnimatedRoute';

export default function GuestRoute({ children, ...rest }: RouteProps) {
    const context = useContext(AppContext);

    if (context?.isLoggedIn) {
        return (
            <AnimatedRoute>
                <Redirect to="/" />
            </AnimatedRoute>
        );
    }

    return <AnimatedRoute { ...rest } >{ children }</AnimatedRoute>
}
