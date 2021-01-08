import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { firebaseAuth } from '../config/firebase';
import { EmailPasswordFormValue } from '../types/Forms';
import * as Yup from 'yup';

enum SignUpFormFields {
    email = "email",
    password = "password"
}

export default function SignUpPageComponent(): JSX.Element {

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

    function showErrorAfterFieldTouched(errorMessage: string | undefined) {
        if (formik.touched.email && formik.touched.password) {
            if (errorMessage === undefined) return null;
            return (<p>{ errorMessage }</p>)
        }
        return null;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        })
    });

    return (
        <Formik
            initialValues={ {
                email: '',
                password: ''
            } }
            validateOnChange
            onSubmit={ handleSubmit }
            validationSchema={ Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required()
            }) }
        >

            <div className="flex h-screen bg-gray-200">
                <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                    <form className="m-5 w-10/12" onSubmit={ formik.handleSubmit } >
                        <h1 className="w-full text-4xl tracking-widest text-center">Sign up here</h1>
                        <div className="w-full my-6">
                            <Field
                                type="email"
                                className="p-2 rounded shadow w-full text-black"
                                placeholder="Email or username"
                                name={ SignUpFormFields.email }
                            />
                            <ErrorMessage name={ SignUpFormFields.email } />
                        </div>
                        <div className="w-full my-6">
                            <Field
                                type="password"
                                className="p-2 rounded shadow w-full text-black"
                                placeholder="Password"
                                name={ SignUpFormFields.password }
                            />
                            <ErrorMessage name={ SignUpFormFields.password } />

                        </div>
                        <button
                            type="submit"
                            className="p-2 w-full rounded shadow text-black bg-gradient-to-tr from-yellow-600 to-yellow-400"
                        >Sign up
                    </button>
                    </form>
                </div>
            </div>
        </Formik>
    )

}
