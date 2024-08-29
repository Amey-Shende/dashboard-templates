import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardTitle, Form } from 'reactstrap';

import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

function SetNewPassword() {

    const [newPassword, setNewPassword] = useState({
        password: "",
        cnfPassword: ""
    });

    const [passwordIcon, setPasswordIcon] = useState(true);
    const [cnfPasswordIcon, setCnfPasswordIcon] = useState(true);

    const navigate = useNavigate();

    //******* on change function *********/
    const handleChanage = (e) => {
        const { name, value } = e.target;
        setNewPassword({ ...newPassword, [name]: value });
    }

    //***** hide & show toggle (password) *********/
    const handlePassword = (e) => {
        setPasswordIcon((prev) => !prev);
    };

    //***** hide & show toggle (confirm password) *********/
    const handleCnfPassword = (e) => {
        setCnfPasswordIcon((prev) => !prev);
    };

    //***** Submit function  *********/
    const handleSubmit = (e) => {
        e.preventDefault();

        toast.success("Your password has been changed", {
            position: "top-center",
            autoclose: 2000
        });

        setTimeout(() => {
            navigate("/login");
        }, 3000);
    };

    return (
        <div className=' d-flex justify-content-center align-items-center vh-100 '>
            <ToastContainer />

            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 col-lg-3 rounded-3'>

                <CardTitle tag="h4" className=' text-center '>
                    Set a new password
                </CardTitle>

                <small className='text-center text-black-50'>Create a new password. Ensure it differenet from previous ones for security.</small>

                <CardBody>

                    <Form>

                        {/******* new password *******/}
                        <InputComponent
                            divClassName='mb-2 position-relative'
                            label="Password"

                            type={passwordIcon ? "password" : "text"}
                            placeholder='***********'
                            name="password"
                            id="password"
                            className='pe-5'
                            value={newPassword.password}
                            onChange={handleChanage}
                        />
                        {/* eye icon */}
                        <span
                            onClick={handlePassword}
                            className="position-absolute"
                            style={{ top: '46%', right: '50px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                        >
                            {passwordIcon ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>


                        {/******* confirm password *******/}
                        <InputComponent
                            divClassName='mb-2 position-relative'
                            label="Confirm Password"

                            type={cnfPasswordIcon ? "password" : "text"}
                            placeholder='***********'
                            name="cnfPassword"
                            id="cnfPassword"
                            className='pe-5'
                            value={newPassword.cnfPassword}
                            onChange={handleChanage}
                        />
                        {/* eye icon */}
                        <span
                            onClick={handleCnfPassword}
                            className="position-absolute "
                            style={{ top: '68%', right: '50px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                        >
                            {cnfPasswordIcon ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>

                        {/******* Update password button *******/}
                        <ButtonComponent
                            divClassName="mt-3"
                            color='primary'
                            className='w-100 py-2'
                            label='Update Password'
                            onClick={handleSubmit}
                        />

                    </Form>

                </CardBody>
            </Card>
        </div >
    )
}

export default SetNewPassword;
