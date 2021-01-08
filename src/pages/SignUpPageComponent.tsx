import { ErrorMessage, Field, Form, Formik } from 'formik';
import { firebaseAuth } from '../config/firebase';
import * as Yup from 'yup';

enum FormFields {
    email = "email",
    password = "password"
}

export default function SignUpPageComponent(): JSX.Element {

    return (
        <Formik
            initialValues={ {
                email: '',
                password: ''
            } }
            validateOnChange
            onSubmit={ (values, formikBag) => {
                firebaseAuth.createUserWithEmailAndPassword(values.email, values.password)
                    .then((user) => {
                        // Signed in 
                        // ...
                    })
                    .catch((error) => {
                        formikBag.setFieldError(FormFields.email, error.message)
                    });
            } }
            validationSchema={
                Yup.object({
                    email: Yup.string().email().required(),
                    password: Yup.string().min(6).required()
                })
            }
        >

            <div className="flex h-screen bg-gray-200">
                <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                    <Form className="m-5 w-10/12" >
                        <h1 className="w-full text-4xl tracking-widest text-center">Sign up here</h1>
                        <div className="w-full my-6">
                            <Field
                                type="email"
                                className="p-2 rounded shadow w-full text-black"
                                placeholder="Email or username"
                                name={ FormFields.email }
                            />
                            <ErrorMessage name={ FormFields.email } />
                        </div>
                        <div className="w-full my-6">
                            <Field
                                type="password"
                                className="p-2 rounded shadow w-full text-black"
                                placeholder="Password"
                                name={ FormFields.password }
                            />
                            <ErrorMessage name={ FormFields.password } />

                        </div>
                        <button
                            type="submit"
                            className="p-2 w-full rounded shadow text-black bg-gradient-to-tr from-yellow-600 to-yellow-400"
                        >Sign up
                    </button>
                    </Form>
                </div>
            </div>
        </Formik>
    )

}
