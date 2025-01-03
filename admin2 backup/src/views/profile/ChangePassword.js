import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, CardBody, CardTitle, Form } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from "yup";

import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

const validationSchema = Yup.object({
    oldPassword: Yup.string()
        .min(8, "Must be at least 8 character")
        .max(16, "Must be less than 16 character")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must conatin at least one charcater")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[A-Z]/, "Must contain at least one Uppercase")
        .matches(/[a-z]/, "Must contain at least lowercase")
        .required("Password is required"),
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

function ChangePassword() {

    const [oldPasswordIcon, setOldPasswordIcon] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState(true);
    const [cnfPasswordIcon, setCnfPasswordIcon] = useState(true);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            password: "",
            cnfPassword: ""
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {
            toast.success("Password change successfully", {
                position: "top-center",
                autoClose: 2000
            });

            setTimeout(() => {
                navigate("/dashboard/home");
            }, 3000)
            resetForm();
        }
    });

    //***** hide & show toggle (old password) ******/
    const handleOldPassword = (e) => {
        setOldPasswordIcon((prev) => !prev);
    };
    //***** hide & show toggle (password) ******/
    const handlePassword = (e) => {
        setPasswordIcon((prev) => !prev);
    };

    //***** hide & show toggle (confirm password) ******/
    const handleCnfPassword = (e) => {
        setCnfPasswordIcon((prev) => !prev);
    };

    return (

        <div className='d-flex justify-content-center align-items-center'>
            <Card className='p-4 shadow-lg col-10 col-sm-8 col-md-5 col-lg-5 rounded-3'>

                <CardTitle tag="h4" className=' text-center '>
                    Change password
                </CardTitle>

                <small className='text-center text-black-50'>
                    Change a password. Ensure it differenet from previous ones for security.
                </small>

                <CardBody>

                    <Form onSubmit={formik?.handleSubmit}>

                        {/****** old password ******/}
                        <div className="position-relative mb-2">
                            <InputComponent
                                divClassName=''
                                label="Old Password"
                                type={oldPasswordIcon ? "password" : "text"}
                                placeholder='Enter the old password'
                                name="oldPassword"
                                id="oldPassword"
                                className='pe-5'
                                value={formik?.values.oldPassword}
                                onChange={formik?.handleChange}
                            />
                            <span
                                onClick={handleOldPassword}
                                className="position-absolute "
                                style={{ top: '72%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {oldPasswordIcon ? <IoMdEye /> : <IoMdEyeOff />}
                            </span>
                        </div>

                        {formik?.touched.oldPassword && formik?.errors.oldPassword && (
                            <small className='text-danger'>{formik?.errors.oldPassword}</small>
                        )}

                        {/******* new password *******/}
                        <div className="position-relative mb-2">
                            <InputComponent
                                divClassName=''
                                label="New Password"
                                type={passwordIcon ? "password" : "text"}
                                placeholder='Enter the new password'
                                name="password"
                                id="password"
                                className='pe-5'
                                value={formik?.values.password}
                                onChange={formik?.handleChange}
                            />
                            <span
                                onClick={handlePassword}
                                className="position-absolute"
                                style={{ top: '72%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {passwordIcon ? <IoMdEye /> : <IoMdEyeOff />}
                            </span>
                        </div>

                        {formik?.touched.password && formik?.errors.password && (
                            <small className='text-danger'>{formik?.errors.password}</small>
                        )}

                        {/******* confirm password *******/}
                        <div className="position-relative mb-2">
                            <InputComponent
                                divClassName=''
                                label="Confirm Password"
                                type={cnfPasswordIcon ? "password" : "text"}
                                placeholder='Enter the confirm password'
                                name="cnfPassword"
                                id="cnfPassword"
                                className='pe-5'
                                value={formik?.values.cnfPassword}
                                onChange={formik?.handleChange}
                            />
                            <span
                                onClick={handleCnfPassword}
                                className="position-absolute "
                                style={{ top: '72%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {cnfPasswordIcon ? <IoMdEye /> : <IoMdEyeOff />}
                            </span>
                        </div>

                        {formik?.touched.cnfPassword && formik?.errors.cnfPassword && (
                            <small className='text-danger'>{formik?.errors.cnfPassword}</small>
                        )}

                        {/******* Submit Button *******/}
                        <ButtonComponent
                            divClassName="mt-3"
                            color='primary'
                            className='w-100 py-2'
                            label="Update Password"
                            type="submit"
                        />
                    </Form>
                </CardBody>
            </Card>
        </div >
    )
}

export default ChangePassword
