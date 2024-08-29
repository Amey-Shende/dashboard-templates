import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  Card, CardBody } from 'reactstrap';
import ButtonComponent from '../../components/ButtonComponent';

// Confirmation button if user write
function OTPVerification() {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/forgot/setNewPassword");
    };

    return (

        <div className=' d-flex justify-content-center align-items-center vh-100 '>

            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 col-lg-3 rounded-3'>

                <small className='text-center text-black-50'>
                    Your password has been succesfully reset.click confirm to set a new password
                </small>

                <CardBody>
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

export default OTPVerification;
