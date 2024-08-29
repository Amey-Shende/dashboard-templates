import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardTitle, CardBody, Form, } from 'reactstrap';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';


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

                        {/******* Username *******/}
                        <InputComponent
                            divClassName='mb-2'
                            label="Username"

                            type="email"
                            placeholder='Enter the username'
                            name="username"
                            id="username"
                            className=''
                            value={loginData.username}
                            onChange={handleChanage}
                        />

                        {/******* Password *******/}
                        <InputComponent
                            divClassName='mb-2 position-relative'
                            label="Password"

                            type={passwordVisibilityIcon ? 'password' : 'text'}
                            placeholder='***********'
                            name="password"
                            id="password"
                            className='pe-5'
                            value={loginData.password}
                            onChange={handleChanage}
                        />
                        {/* eye icon */}
                        <span
                            onClick={passwordVisible}
                            className="position-absolute "
                            style={{ top: '56%', right: '50px', transform: 'translateY(-50%)', cursor: 'pointer', fontSize: "1.25rem" }}
                        >
                            {passwordVisibilityIcon ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>


                        {/******* forgot password link *******/}
                        <div>
                            <small className='text-primary'>
                                <Link to="/forgot" className="text-decoration-none">
                                    Forgot password?
                                </Link>
                            </small>
                        </div>

                        {/******* Login Button *******/}
                        <ButtonComponent
                            divClassName="mt-3"
                            className="w-100 py-2 mb-2"
                            label="Login"
                            color="primary"
                            onClick={handleSubmit}
                        />

                    </Form>

                </CardBody>
            </Card>
        </div>

    )
}

export default Login
