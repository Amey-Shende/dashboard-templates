import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Form, Input, Label, } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';


function ForgotPassword() {

    const [forgotUsername, setForgotUsername] = useState('');

    const navigate = useNavigate();


    //********* handle Change Function */
    const handleChanage = (e) => {
        setForgotUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("OTP is send to +91********345", {
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
                        <div className='mb-2'>
                            <Label for="username">Username*</Label>
                            <Input
                                type="email"
                                placeholder='Enter the username'
                                name="username"
                                id="username"
                                className='form-control remove-focus-ring'
                                value={forgotUsername}
                                onChange={handleChanage}
                            />
                        </div>

                        {/* otp send button (Submit) */}
                        <div className='text-center mt-3 '>
                            <Button color='primary' className='w-100 py-2' onClick={handleSubmit}>
                                Send Code
                            </Button>
                        </div>

                        {/* Back to Login link */}
                        <div className="text-center text-primary mt-2">
                            <small>
                                <NavLink to="/login" className='text-decoration-none'>
                                    Back to Login
                                </NavLink>
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
