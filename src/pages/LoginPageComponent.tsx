import React from 'react'

export default function LoginPageComponent() {
    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg
            rounded-lg bg-indigo-900">
                <form className="m-5 w-10/12">
                    <h1 className="w-full text-4xl tracking-widest text-center my-6">Login page</h1>
                    <div className="w-full my-6">
                        <input
                            type="email"
                            className="p-2 rounded shadow w-full"
                            placeholder="Email or username"
                        />
                    </div>
                    <div className="w-full my-6">
                        <input
                            type="password"
                            className="p-2 rounded shadow w-full"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="p-2 w-full rounded shadow bg-yellow-400 text-black"
                    >Login
                    </button>
                </form>
            </div>
        </div>
    )
}
