import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { Card, CardTitle, CardBody, Form, Button, Label, Input } from 'reactstrap';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';


// sample data for Login
const data = {
    username: "admin@gmail.com",
    password: "admin"
}

function Login() {

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    // password type toggle in password and text
    const [passwordVisibilityIcon, setPasswordVisibilityIcon] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("isLogin");

        if (token) {
            navigate("/dashboard");
        }

    }, [navigate]);

    //*******  handlechange *******/
    const handleChanage = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
    };

    //**********   Validateion function  **************/
    const validateData = (loginData) => {
        const { username, password } = loginData;

        if (username && password) {
            if (username === data.username && password === data.password)
                return true;
        }
    }

    //********* Submit Function  **********/
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateData(loginData)) {

            //******** save token in localstorage */
            localStorage.setItem("isLogin", "true");
            console.log(loginData);

            //******  Navigate to dashboard */
            navigate("/dashboard");

            // reset field
            setLoginData({
                username: "",
                password: ""
            })

        } else {
            // alert("Enter valid data");
            toast.error("Invalid username and password!", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };

    //****  password visible *****/
    const passwordVisible = (e) => {
        setPasswordVisibilityIcon((pre) => !pre)
    }

    return (
        <div className=' d-flex justify-content-center align-items-center vh-100 '>
            <ToastContainer />

            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 col-lg-3 rounded-3'>

                <CardTitle tag="h3" className=' text-center '>
                    Login
                </CardTitle>

                <CardBody>
                    <Form >
                        {/* Username */}
                        <div className='mb-2'>
                            <Label for="username">Username</Label>
                            <Input
                                type="email"
                                placeholder='Enter the username'
                                name="username"
                                id="username"
                                className='form-control remove-focus-ring'
                                value={loginData.username}
                                onChange={handleChanage}
                            />
                        </div>

                        {/* Password */}
                        <div className='mb-2 position-relative'>
                            <Label for="password">Password</Label>
                            <Input
                                type={passwordVisibilityIcon ? 'password' : 'text'}
                                placeholder='***********'
                                name="password"
                                id="password"
                                className="form-control pe-5  remove-focus-ring"
                                value={loginData.password}
                                onChange={handleChanage}
                            />
                            <span
                                onClick={passwordVisible}
                                className="position-absolute "
                                style={{ top: '70%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                            >
                                {passwordVisibilityIcon ? <IoMdEyeOff /> : <IoMdEye />}
                            </span>

                        </div>

                        <div>
                            <small className='text-primary'>
                                <NavLink to="/forgot" className="text-decoration-none">
                                    Forgot password?
                                </NavLink>
                            </small>
                        </div>

                        {/* Login Button */}
                        <div className='text-center mt-3'>
                            <Button
                                className=' w-100 py-2 mb-2'
                                size='md'
                                color='primary'
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                            <br></br>

                            <small>
                                Don't have account?
                                <NavLink to="/register" className="text-decoration-none">
                                    Register
                                </NavLink>
                            </small>
                        </div>
                    </Form>

                </CardBody>
            </Card>
        </div>

    )
}

export default Login
