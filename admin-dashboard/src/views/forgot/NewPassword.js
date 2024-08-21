import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, Form, Input, Label } from 'reactstrap';

function NewPassword() {

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
        navigate("/login");
    };

    return (
        <div className=' d-flex justify-content-center align-items-center vh-100 '>

            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 col-lg-3 rounded-3'>

                <CardTitle tag="h4" className=' text-center '>
                    Set a new password
                </CardTitle>

                <small className='text-center text-black-50'>Create a new password. Ensure it differenet from previous ones for security.</small>

                <CardBody>

                    <Form>
                        {/*  password */}
                        <div className='mb-2 position-relative'>
                            <Label for="password">Password*</Label>
                            <Input
                                type={passwordIcon ? "password" : "text"}
                                placeholder='Password'
                                name="password"
                                id="password"
                                className='form-control remove-focus-ring pe-5'
                                value={newPassword.password}
                                onChange={handleChanage}
                            />
                            <span
                                onClick={handlePassword}
                                className="position-absolute "
                                style={{ top: '70%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {passwordIcon ? <IoMdEyeOff /> : <IoMdEye />}
                            </span>
                        </div>

                        {/* confirm password */}
                        <div className='mb-2 position-relative'>
                            <Label for="cnfPassword">Confirm Password*</Label>
                            <Input
                                type={cnfPasswordIcon ? "password" : "text"}
                                placeholder='confirm Password'
                                name="cnfPassword"
                                id="cnfPassword"
                                className='form-control remove-focus-ring pe-5'
                                value={newPassword.cnfPassword}
                                onChange={handleChanage}
                            />
                            <span
                                onClick={handleCnfPassword}
                                className="position-absolute "
                                style={{ top: '70%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {cnfPasswordIcon ? <IoMdEyeOff /> : <IoMdEye />}
                            </span>
                        </div>

                        <div className='text-center mt-3 '>
                            <Button color='primary' className='w-100 py-2' onClick={handleSubmit}>
                                Update Password
                            </Button>
                        </div>
                    </Form>

                </CardBody>
            </Card>
        </div >
    )
}

export default NewPassword
