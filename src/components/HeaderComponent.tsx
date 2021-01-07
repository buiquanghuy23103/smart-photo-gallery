import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { firebaseAuth } from '../config/firebase';
import { AppContext } from '../store/AppContext';

export default function HeaderComponent() {
    const history = useHistory();
    const context = useContext(AppContext);


    function logout() {
        firebaseAuth.signOut()
            .then(() => {
                history.replace("/login");
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }

    return (
        <nav className="p-3 bg-gray-900 text-white">
            <ul className="px-10 flex justify-between">
                <span className="flex">
                    <li className="mr-5">
                        <NavLink exact activeClassName="underline" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="underline" to="/gallery">Gallery</NavLink>
                    </li>
                </span>
                <li>
                    { context?.isLoggedIn ?
                        (<button onClick={ logout }>Logout</button>) :
                        (<NavLink activeClassName="underline" to="/login">Login</NavLink>)
                    }
                </li>
            </ul>
        </nav>
    )
}
