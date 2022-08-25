import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { authActions } from '../../store/auth-slice';
import logo from '../../assets/images/banner1.jpg';


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const initialFormValues = {
        email: "",
        password: ""
    };

    const formValidationSchema = Yup.object({
        email: Yup
            .string()
            .trim()
            .required('The email field is required')
            .email('The email must be a valid email address')
            .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, 'The email must be a valid email address'),
        password: Yup
            .string()
            .trim()
            .required('The password field is required')
            .min(6, 'Password must contain atleast six charecters')
    });

    useEffect(() => {
        document.title = 'Login';
    }, []);


    return (
        <section className="log-reg-sec height-fix">
            <div className="content">
                <Formik
                    initialValues={initialFormValues}
                    validationSchema={formValidationSchema}
                    validateOnBlur={false}
                    onSubmit={(values, actions) => {
                        // console.log(values, actions);
                        localStorage.setItem('flagToken', JSON.stringify({ email: values.email }));
                        dispatch(authActions.login(values.email));
                        setSuccessMessage(true);
                        actions.resetForm();
                        setSubmitted(false);
                        setTimeout(() => {
                            setSuccessMessage(false);
                            actions.setSubmitting(false);
                            navigate('/home', { replace: true });
                        }, 3000);
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        <div className="form-content">
                            <img src={logo} alt='Login' className="form-logo" />
                            <h1 className="text-center">Sign in to continue</h1>
                            {successMessage ? <div className="alert alert-success" role="alert">
                                Login Success
                            </div> : null}
                            <Form>
                                <div className="form-group p-2">
                                    <label htmlFor='email'>Email<sup className="text-danger">*</sup></label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={submitted && errors && errors.email ? "form-control is-invalid" : "form-control"}
                                        placeholder="Email" />
                                    {submitted && <span className="text-danger small">
                                        <strong>
                                            <ErrorMessage name="email" />
                                        </strong>
                                    </span>}
                                </div>
                                <div className="form-group p-2">
                                    <label htmlFor='password'>Password<sup className="text-danger">*</sup></label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={submitted && errors && errors.password ? "form-control is-invalid" : "form-control"}
                                        placeholder="Password" />
                                    {submitted && <span className="text-danger small">
                                        <strong>
                                            <ErrorMessage name="password" />
                                        </strong>
                                    </span>}
                                </div>
                                <div className="form-group p-2">
                                    <button className="btn btn-primary w-100 mt-5"
                                        type='submit'
                                        disabled={isSubmitting}
                                        onClick={() => { setSubmitted(true) }}>Sign in</button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default Login;