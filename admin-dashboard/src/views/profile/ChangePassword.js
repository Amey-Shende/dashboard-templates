import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, CardBody, CardTitle, Form } from 'reactstrap';

import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

function ChangePassword() {

    const [newPassword, setNewPassword] = useState({
        oldPassword: "",
        password: "",
        cnfPassword: ""
    });

    const [oldPasswordIcon, setOldPasswordIcon] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState(true);
    const [cnfPasswordIcon, setCnfPasswordIcon] = useState(true);

    const navigate = useNavigate();

    //******* on change function *********/
    const handleChanage = (e) => {
        const { name, value } = e.target;
        setNewPassword({ ...newPassword, [name]: value });
    }

    //***** hide & show toggle (old password) *********/
    const handleOldPassword = (e) => {
        setOldPasswordIcon((prev) => !prev);
    };
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
        toast.success("Password change successfully", {
            position: "top-center",
            autoClose: 2000
        });

        setTimeout(() => {
            navigate("/dashboard/home");
        }, 3000)
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

                    <Form>

                        {/****** old password ******/}
                        <InputComponent
                            divClassName='mb-2 position-relative'
                            label="Old Password"

                            type={oldPasswordIcon ? "password" : "text"}
                            placeholder='***********'
                            name="oldPassword"
                            id="oldPassword"
                            className='pe-5'
                            value={newPassword.oldPassword}
                            onChange={handleChanage}
                        />
                        {/******* eye icon *******/}
                        <span
                            onClick={handleOldPassword}
                            className="position-absolute "
                            style={{ top: '38%', right: '50px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                        >
                            {oldPasswordIcon ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>

                        {/******* new password *******/}
                        <InputComponent
                            divClassName='mb-2 position-relative'
                            label="New Password"

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
                            style={{ top: '56%', right: '50px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
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
                            style={{ top: '74%', right: '50px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                        >
                            {cnfPasswordIcon ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>


                        {/******* Submit Button *******/}
                        <ButtonComponent
                            divClassName="mt-3"
                            color='primary'
                            className='w-100 py-2'
                            label="Update Password"
                            onClick={handleSubmit}
                        />
                    </Form>

                </CardBody>
            </Card>
        </div>
    )
}

export default ChangePassword
