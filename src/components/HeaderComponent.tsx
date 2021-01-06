import routes from '../pages/route';
import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderComponent() {
    return (
        <nav className="p-3 bg-gray-900 text-white">
            <ul className="px-10 flex justify-between">
                <span className="flex">
                    <li className="mr-5">
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/gallery">Gallery</Link>
                    </li>
                </span>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}
