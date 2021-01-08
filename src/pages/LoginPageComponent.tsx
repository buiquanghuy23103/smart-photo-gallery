import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { firebaseAuth } from '../config/firebase';

type FormValues = {
    email: string,
    password: string,
}

export default function LoginPageComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState<FormValues>({ email: "", password: "" });
    const history = useHistory();

    function handleForm(e: React.FormEvent<HTMLFormElement>) {
        if (isLoading) return;
        setIsLoading(true);
        e.preventDefault();
        firebaseAuth.signInWithEmailAndPassword(form.email, form.password)
            .then((user) => {
                setIsLoading(false);
                setError("");
                history.push("/");
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

    function onFormInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }


    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                <form className="m-5 w-10/12" onSubmit={ handleForm }>
                    { showError() }
                    <h1 className="w-full text-4xl tracking-widest text-center">Login</h1>
                    <div className="w-full my-6">
                        <input
                            name="email"
                            type="email"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Email or username"
                            value={ form.email }
                            onChange={ onFormInputChange }
                        />
                    </div>
                    <div className="w-full my-6">
                        <input
                            name="password"
                            type="password"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Password"
                            value={ form.password }
                            onChange={ onFormInputChange }
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
