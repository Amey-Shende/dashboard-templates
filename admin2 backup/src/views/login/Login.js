import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardBody, Form, } from 'reactstrap';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useFormik } from 'formik';
import * as Yup from "yup";
import authRequest from '../../api';
import GiveMEoLogo from '../../layouts/GiveMEoLogo';

// Yup validation schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email address")
        .required("email address required"),

    password: Yup.string()
        .min(8, "must be at least 8 character")
        .max(16, "must be less than 16 character")
        //     .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must conatin at least one charcater")
        .matches(/[0-9]/, "must contain at least one number")
        // .matches(/[A-Z]/, "must contain at least one Uppercase")
        .matches(/[a-z]/, "must contain at least lowercase")
        .required("password is required"),
});

function Login() {

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await authRequest.post("/user/alogin/", values);
                // console.log(res);
                if (res.status === 200) {
                    const token = res.data.token.access;
                    localStorage.setItem('token', token);
                    navigate("/dashboard", { state: { isLogin: true } });
                    resetForm();
                }
            } catch (error) {
                console.log(error);
                toast.error("Invalid email and password!", {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    //****  password visible *****/
    const togglePasswordVisibility = (e) => {
        setPasswordVisibility((pre) => !pre)
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'
        // style={{ background: 'linear-gradient(180deg,rgb(29, 12, 71) 0%, #451FA7 100%)' }}
        >
            <ToastContainer />
            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-6 custom-lg rounded-3'>
                {/* Givemeo LoGo */}
                <GiveMEoLogo />

                <CardTitle tag="h3" className='text-center'>
                    Welcome to Admin Panel
                </CardTitle>

                <CardBody>
                    <Form onSubmit={formik.handleSubmit}>
                        {/******* email *******/}
                        <InputComponent
                            divClassName='mb-2'
                            label="Email"
                            type="text"
                            placeholder='Enter your email'
                            name="email"
                            id="email"
                            className=''
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            autoComplete="on"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <small className='text-danger'>{formik.errors.email}</small>
                        )}

                        {/******* Password *******/}
                        <div className='position-relative mb-2'>
                            <InputComponent
                                divClassName=''
                                label="Password"
                                type={passwordVisibility ? 'password' : 'text'}
                                placeholder='Enter your password'
                                name="password"
                                id="password"
                                className='pe-5'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                autoComplete="current-password"
                            />
                            {/* eye icon */}
                            <span
                                onClick={togglePasswordVisibility}
                                className="position-absolute"
                                style={{ top: '72%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {passwordVisibility ? <IoMdEye /> : <IoMdEyeOff />}
                            </span>
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <small className='text-danger'>{formik.errors.password}</small>
                        ) : null}

                        {/******* forgot password link *******/}
                        {/* <div>
                            <small className='text-primary'>
                                <Link to="/forgot" className="text-decoration-none">
                                    Forgot password?
                                </Link>
                            </small>
                        </div> */}

                        {/******* Login Button *******/}
                        <ButtonComponent
                            divClassName="mt-3"
                            className="w-100 py-2"
                            label="Login"
                            color="primary"
                            type="submit"
                        />
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
};

export default Login
