import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
        <nav className="p-3 bg-gray-900 text-white flex justify-between">
            <ul className="px-10 flex">
                <li className="mr-5">
                    <NavLink exact activeClassName="text-blue-600 text-bold" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName="text-blue-600 text-bold" to="/gallery">Gallery</NavLink>
                </li>
            </ul>
            <ul className="px-10 flex">
                <li>
                    { context?.isLoggedIn ?
                        (<button onClick={ logout }>Logout</button>) :
                        (<NavLink activeClassName="text-blue-600 text-bold" to="/login">Login</NavLink>)
                    }
                </li>
                <li className="ml-5">
                    { context?.isLoggedIn ?
                        (null) :
                        (<NavLink activeClassName="text-blue-600 text-bold" to="/signup">Sign up</NavLink>)
                    }
                </li>
            </ul>
        </nav>
    )
}
