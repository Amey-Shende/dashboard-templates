import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import ButtonComponent from '../../components/ButtonComponent';
import InputComponent from '../../components/InputComponent';


export default function OTPVerification() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [errorMsg,setErrorMsg]=useState('');
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;
        const otpCopy = [...otp];
        otpCopy[index] = value.slice(0, 1); // Limit input to one character
        setOtp(otpCopy);

        // Move focus to the next input if the current input is filled
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move focus to previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();   
        }
    };

    const handleSubmit = () => {
        const allFilled = otp.every(digit => digit !== "" && /^[0-9]$/.test(digit));
        // console.log(allFilled);
        if (allFilled) {
            setErrorMsg('');
            navigate("/forgot/setNewPassword");
        }else{
            setErrorMsg("Please enter a valid OTP");
        }
    };

    useEffect(()=>{
        const token = localStorage.getItem("otp");
        if (!token) {
            navigate("/forgot");
        }
    },[navigate])


    return (
        <div className=' d-flex justify-content-center align-items-center vh-100 '>
            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 custom-lg rounded-3'>
                <small className='text-center text-black-50'>
                    Your password has been succesfully reset.click confirm to set a new password
                </small>

                <CardBody>
                    <div className="d-flex justify-content-evenly">
                        {otp.map((digit, index) => (
                            <InputComponent
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="form-control border border-secondary rounded text-center font-weight-bold "
                                style={{ width: '40px', height: '40px', fontSize: '16px' }}
                               
                            />
                        ))}
                    </div>
                    { errorMsg ? <small className='text-danger ms-4'>{errorMsg}</small> : null}

                    <ButtonComponent
                        divClassName="mt-3"
                        color='primary'
                        className='w-100 py-2'
                        label="Confirm"
                        onClick={handleSubmit}
                    />
                </CardBody>
            </Card>
        </div >
    )
}


