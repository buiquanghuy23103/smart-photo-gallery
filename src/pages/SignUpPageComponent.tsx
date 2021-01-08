import { useFormik } from 'formik';
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
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-700">
                <form className="m-5 w-10/12" onSubmit={ formik.handleSubmit } >
                    <h1 className="w-full text-4xl tracking-widest text-center">Sign up here</h1>
                    <div className="w-full my-6">
                        <input
                            type="email"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Email or username"
                            { ...formik.getFieldProps(SignUpFormFields.email) }
                        />
                        { showErrorAfterFieldTouched(formik.errors.email) }
                    </div>
                    <div className="w-full my-6">
                        <input
                            type="password"
                            className="p-2 rounded shadow w-full text-black"
                            placeholder="Password"
                            { ...formik.getFieldProps(SignUpFormFields.password) }
                        />
                        { showErrorAfterFieldTouched(formik.errors.password) }
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
