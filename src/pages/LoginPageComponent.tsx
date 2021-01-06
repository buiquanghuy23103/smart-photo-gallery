import React from 'react'

export default function LoginPageComponent() {
    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                <form className="m-5 w-10/12">
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
                    >Login
                    </button>
                </form>
            </div>
        </div>
    )
}
