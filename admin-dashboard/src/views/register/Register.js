import React from 'react'
import { Link } from "react-router-dom";
import { Card, CardTitle, CardBody } from 'reactstrap'

function Register() {
    return (
        <div className=' d-flex justify-content-center align-items-center vh-100 '>
            <Card className='p-4 shadow-lg col-10 col-sm-7 col-md-5 col-lg-3 rounded-3'>

                <CardTitle tag="h4" className=' text-center '>
                    Register
                </CardTitle>

                <CardBody>

                    <div className="text-center">
                        <small>
                            Already have account?
                            <Link to="/login" className="text-primary text-decoration-none">Login</Link>
                        </small>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register
