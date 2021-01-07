import React, { useState } from 'react'
import { firebaseAuth } from '../config/firebase';

export default function LoginPageComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleForm(e: React.FormEvent<HTMLFormElement>) {
        if (isLoading) return;
        setIsLoading(true);
        e.preventDefault();
        firebaseAuth.signInWithEmailAndPassword("huy.bui@email.com", "password123")
            .then((user) => {
                setIsLoading(false);
                console.log(user);
            })
            .catch((error) => {
                setIsLoading(false);
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`Firebase error: ${errorCode} ${errorMessage}`);
                setError(errorMessage);
            });
    }

    function showError() {
        if (error) {
            return (<p className="text-white">{ error }</p>)
        }
        return null;
    }

    function showLoginLoading() {
        if (isLoading) {
            return <i className="fas fa-circle-notch fa-spin text-black" />
        } else {
            return (<p>Login</p>)
        }
    }

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                <form className="m-5 w-10/12" onSubmit={ handleForm }>
                    { showError() }
                    <h1 className="w-full text-4xl tracking-widest text-center">Login</h1>
                    <div className="w-full my-6">
                        <input
                            type="email"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Email or username"
                        />
                    </div>
                    <div className="w-full my-6">
                        <input
                            type="password"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-2 w-full rounded shadow text-black bg-gradient-to-tr from-yellow-600 to-yellow-400"
                    >{ showLoginLoading() }
                    </button>
                </form>
            </div>
        </div>
    )
}
