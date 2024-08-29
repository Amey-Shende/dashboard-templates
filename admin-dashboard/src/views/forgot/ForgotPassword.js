import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, Form,  } from 'reactstrap';
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";

import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

function ForgotPassword() {

    const [forgotUsername, setForgotUsername] = useState('');

    const navigate = useNavigate();


    //********* handle Change Function */
    const handleChanage = (e) => {
        setForgotUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.dismiss();
        toast.success("OTP is send successfully to +91********345", {
            position: "top-center",
            autoClose: 3000
        });
        setTimeout(() => {
            navigate("/forgot/otp");
        }, 3000);
    }

    return (

        <div className=' d-flex justify-content-center align-items-center vh-100 '>
            <ToastContainer />
            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 col-lg-3 rounded-3'>

                <CardTitle tag="h4" className=' text-center '>
                    Forgot Password
                </CardTitle>

                <small className='text-center text-black-50'>
                    Please enter your mobile number to reset the password
                </small>

                <CardBody className='pt-1'>

                    <Form>

                        {/* Username */}
                        <InputComponent
                            divClassName="mb-2"
                            label="Username"

                            type="email"
                            placeholder='Enter the username'
                            name="username"
                            id="username"
                            className=''
                            value={forgotUsername}
                            onChange={handleChanage}
                        />

                        {/* otp send button (Submit) */}
                        <ButtonComponent
                            divClassName="mt-3"
                            color='primary'
                            className='w-100 py-2'
                            onClick={handleSubmit}
                            label='Send Code'
                        />

                        {/* Back to Login link */}
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
