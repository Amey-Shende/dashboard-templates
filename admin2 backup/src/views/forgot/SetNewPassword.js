import React, { useEffect, useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardTitle, Form } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import GiveMEoLogo from '../../layouts/GiveMEoLogo';

const validationSchema = Yup.object({
    password: Yup.string()
        .min(8, "Must be at least 8 character")
        .max(16, "Must be less than 16 character")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must conatin at least one charcater")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[A-Z]/, "Must contain at least one Uppercase")
        .matches(/[a-z]/, "Must contain at least lowercase")
        .required("Password is required"),
    cnfPassword: Yup.string()
        .min(8, "Must be at least 8 character")
        .max(16, "Must be less than 16 character")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must conatin at least one charcater")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[A-Z]/, "Must contain at least one Uppercase")
        .matches(/[a-z]/, "Must contain at least lowercase")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Password is required")
});

export default function SetNewPassword() {
    const [passwordIcon, setPasswordIcon] = useState(true);
    const [cnfPasswordIcon, setCnfPasswordIcon] = useState(true);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: "",
            cnfPassword: ""
        },

        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (Values, { resetForm }) => {
            toast.dismiss();
            toast.success("Your password has been changed", {
                position: "top-center",
                autoClose: 2000
            });
            console.log(JSON.stringify(Values, null, 2));

            setTimeout(() => {
                navigate("/login");
                localStorage.removeItem("otp");
            }, 2000);
            resetForm();
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("otp");
        if (!token) {
            navigate("/forgot");
        }
    });

    //***** hide & show toggle (password) *********/
    const handlePassword = (e) => {
        setPasswordIcon((prev) => !prev);
    };

    //***** hide & show toggle (confirm password) *********/
    const handleCnfPassword = (e) => {
        setCnfPasswordIcon((prev) => !prev);
    };

    return (
        <div className=' d-flex justify-content-center align-items-center vh-100 '>
            <ToastContainer className="w-25" />
            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 custom-lg rounded-3'>
                {/* Givemeo Logo */}
                <GiveMEoLogo />
                <CardTitle tag="h4" className=' text-center '>
                    Set a new password
                </CardTitle>
                <small className='text-center text-black-50'>
                    Create a new password. Ensure it differenet from previous ones for security.
                </small>

                <CardBody>
                    <Form onSubmit={formik.handleSubmit}>

                        {/******* new password *******/}
                        <div className="position-relative mb-2">
                            <InputComponent
                                divClassName=''
                                label="Password"
                                type={passwordIcon ? "password" : "text"}
                                placeholder='Enter the password'
                                name="password"
                                id="password"
                                className='pe-5'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                autoComplete="new-password"
                            />
                            <span
                                onClick={handlePassword}
                                className="position-absolute"
                                style={{ top: '72%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {passwordIcon ? <IoMdEye /> : <IoMdEyeOff />}
                            </span>
                        </div>

                        {formik.touched.password && formik.errors.password && (
                            <small className='text-danger'>{formik.errors.password}</small>
                        )}

                        {/******* confirm password *******/}
                        <div className="position-relative mb-2">
                            <InputComponent
                                divClassName=''
                                label="Confirm Password"
                                type={cnfPasswordIcon ? "password" : "text"}
                                placeholder='Enter confirm password'
                                name="cnfPassword"
                                id="cnfPassword"
                                className='pe-5'
                                value={formik.values.cnfPassword}
                                onChange={formik.handleChange}
                                autoComplete="new-password"
                            />
                            <span
                                onClick={handleCnfPassword}
                                className="position-absolute "
                                style={{ top: '72%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {cnfPasswordIcon ? <IoMdEye /> : <IoMdEyeOff />}
                            </span>
                        </div>

                        {formik.touched.cnfPassword && formik.errors.cnfPassword && (
                            <small className='text-danger'>{formik.errors.cnfPassword}</small>
                        )}

                        {/******* Update password button *******/}
                        <ButtonComponent
                            divClassName="mt-3"
                            color='primary'
                            className='w-100 py-2'
                            label='Update Password'
                            type="submit"
                        />
                    </Form>
                </CardBody>
            </Card>
        </div >
    )
};

