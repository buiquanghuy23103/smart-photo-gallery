import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../config/firebase';

export default function HeaderComponent() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })
    });

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
                    { isLoggedIn ?
                        (<button>Logout</button>) :
                        (<Link to="/login">Login</Link>)
                    }
                </li>
            </ul>
        </nav>
    )
}
