import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, Form, } from 'reactstrap';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";

import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useFormik } from 'formik';
import * as Yup from "yup";
import GiveMEoLogo from '../../layouts/GiveMEoLogo';


const validationSchema = Yup.object({
    forgotUsername: Yup.string()
        .email("Invalid email address")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email address")
        .required("email address required"),
});

function ForgotPassword() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            forgotUsername: ""
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {

            toast.success("OTP is send successfully to +91*******345", {
                position: "top-center",
                autoClose: false
            });
            // console.log(values);
            localStorage.setItem("otp", "true");

            setTimeout(() => {
                navigate("/forgot/otp");
            }, 2000);
            resetForm();
        }
    });

    useEffect(() => {
        localStorage.removeItem("otp");
    }, [navigate]);


    return (

        <div className=' d-flex justify-content-center align-items-center vh-100 '>
            <ToastContainer className="w-25" />
            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-6 custom-lg rounded-3'>
                {/* Givemeo Logo */}
                <GiveMEoLogo />
                <CardTitle tag="h4" className=' text-center '>
                    Forgot Password
                </CardTitle>

                <small className='text-center text-black-50'>
                    Please enter your email address to reset the password
                </small>

                <CardBody className=''>
                    <Form onSubmit={formik.handleSubmit}>
                        {/******** Username ********/}
                        <InputComponent
                            divClassName="mb-2"
                            label="Username"
                            type="text"
                            placeholder='Enter the username'
                            name="forgotUsername"
                            id="forgotUsername"
                            className=''
                            value={formik.values.forgotUsername}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.forgotUsername && formik.errors.forgotUsername && (
                            <small className='text-danger'>{formik.errors.forgotUsername}</small>
                        )}

                        {/******** otp send button (Submit) ********/}
                        <ButtonComponent
                            divClassName="mt-3"
                            color='primary'
                            className='w-100 py-2'
                            type="submit"
                            label='Send Code'
                        />

                        {/******** Back to Login link ********/}
                        <div className="text-center text-primary mt-2">
                            <small>
                                <Link to="/login" className='text-decoration-none'>
                                    Back to Login
                                </Link>
                            </small>
                        </div>

                    </Form>
                </CardBody>
            </Card>

            <main>
                <outlet />
            </main>
        </div>
    )
};

export default ForgotPassword;
