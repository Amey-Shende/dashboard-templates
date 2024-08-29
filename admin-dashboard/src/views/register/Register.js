import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Card, CardTitle, CardBody, Form } from 'reactstrap'
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

function Register() {

    const [registerData, setRegisterData] = useState({
        fullName: "",
        mobileNo: "",
        email: "",
        dob: "",
        password: "",
        cnfPassword: "",
        termAndCondition: false
    });


    const navigate = useNavigate()

    // on Change Function
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setRegisterData({ ...registerData, [name]: (type === 'checkbox') ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // navigate("/login");

        console.log("THe Register Data", registerData);

        setRegisterData({
            fullName: "",
            mobileNo: "",
            email: "",
            dob: "",
            password: "",
            cnfPassword: "",
            termAndCondition: false
        })
    };

    return (
        <div className=' d-flex justify-content-center align-items-center vh-100 '>

            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 col-lg-4 rounded-3'>

                <CardTitle tag="h4" className=' text-center '>
                    Create Account
                </CardTitle>

                <CardBody>
                    <Form>

                        {/****** Full Name  (info-button) ******/}
                        <InputComponent
                            label="Full name"
                            name="fullName"
                            id="fullName"
                            type="text"
                            placeholder="Full name"
                            divClassName="mb-2"
                            value={registerData.fullName}
                            onChange={handleChange}
                        />

                        {/****** Mobile Number ****** ******/}
                        <InputComponent
                            label="Mobile Number******"
                            name="mobileNo"
                            id="mobileNo"
                            type="text"
                            placeholder="Mobile Number"
                            divClassName="mb-2"
                            value={registerData.mobileNo}
                            onChange={handleChange}
                        />

                        {/****** email ******/}
                        <InputComponent
                            label="Email (optional)"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Email address"
                            divClassName="mb-2"
                            value={registerData.email}
                            onChange={handleChange}
                        />

                        {/****** Date of Birth  (info-button)******/}
                        <InputComponent
                            label="Date of Birth"
                            name="dob"
                            id="dob"
                            type="date"
                            placeholder="Date of birth"
                            divClassName="mb-2"
                            value={registerData.dob}
                            onChange={handleChange}
                        />


                        {/****** Password ******/}
                        <InputComponent
                            label="Password"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="**********"
                            divClassName="mb-2"
                            value={registerData.password}
                            onChange={handleChange}
                        />


                        {/****** Confirm Password ******/}
                        <InputComponent
                            label="Confirm Password"
                            name="cnfPassword"
                            id="cnfPassword"
                            type="password"
                            placeholder="***********"
                            divClassName="mb-2"
                            value={registerData.cnfPassword}
                            onChange={handleChange}
                        />


                        {/****** Checkbox (term and Condition) ******/}
                        <div className='d-flex justify-content-around'>
                            <InputComponent
                                name="termAndCondition"
                                id="termAndCondition"
                                type="checkbox"
                                placeholder="Chekck box"
                                divClassName="mb-2"
                                className="mt-2 border border-2 form-check-input"
                                checked={registerData.termAndCondition === true}
                                onChange={handleChange}
                            />
                            <small className='mt-2'>
                                By proceeding your agree with our Terms & condition
                            </small>
                        </div>


                        {/****** Sign up Button ******/}
                        <ButtonComponent
                            divClassName="mt-1 mb-2"
                            className="w-100 "
                            label="Sign up"
                            color="primary"
                            onClick={handleSubmit}
                        />

                    </Form>

                    {/****** Social Login ******/}

                    {/****** Redirect to Login page ******/}
                    <div className="text-center ">
                        <small>
                            Already have account?
                            <Link to="/login" className="text-primary text-decoration-none">Login</Link>
                        </small>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register;
