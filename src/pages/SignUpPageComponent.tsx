import { useFormik } from 'formik';
import { firebaseAuth } from '../config/firebase';
import { EmailPasswordErrorMessage, EmailPasswordFormValue } from '../types/Forms';

export default function SignUpPageComponent() {

    function validateForm(values: EmailPasswordFormValue) {
        const errors: EmailPasswordErrorMessage = {
            email: '',
            password: '',
        };

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 6) {
            errors.password = 'Must be 6 characters or more';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    }

    function handleSubmit(values: EmailPasswordFormValue) {
        firebaseAuth.createUserWithEmailAndPassword(values.email, values.password)
            .then((user) => {
                // Signed in 
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: true,
        validate: validateForm,
        onSubmit: handleSubmit,
    });

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                <form className="m-5 w-10/12" onSubmit={ formik.handleSubmit } >
                    <h1 className="w-full text-4xl tracking-widest text-center">Sign up here</h1>
                    <div className="w-full my-6">
                        <input
                            name="email"
                            type="email"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Email or username"
                            value={ formik.values.email }
                            onChange={ formik.handleChange }
                        />
                        <p>{ formik.errors.email }</p>
                    </div>
                    <div className="w-full my-6">
                        <input
                            name="password"
                            type="password"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Password"
                            value={ formik.values.password }
                            onChange={ formik.handleChange }
                        />
                        <p>{ formik.errors.password }</p>
                    </div>
                    <button
                        type="submit"
                        className="p-2 w-full rounded shadow text-black bg-gradient-to-tr from-yellow-600 to-yellow-400"
                    >Sign up
                    </button>
                </form>
            </div>
        </div>
    )

}
