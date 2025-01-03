import React from 'react';
import { Card, CardBody } from "reactstrap";
import defaultImage from "../../assets/images/adminPhoto.jpg";

const adminProfile = {
    name: "John Doe",
    phone: "+1-234-567-8901",
    email: "givemeo@exampl.com",
    address_line1: "123 Main St",
    city: "Springfield",
    state: "IL",
    country: "USA",
    zipcode: "62701",
    profile_picture: null
};

function Profile() {
    return (
        <div className="d-flex justify-content-center mt-2">
            <Card className='w-75 shadow-lg rounded'>
                <CardBody className="text-center p-4">

                    {/* Profile Picture */}
                    <img
                        src={adminProfile.profile_picture || defaultImage}
                        alt="user-photo"
                        width={100}
                        height={100}
                        className='rounded-circle border border-black mb-3'
                    />
                    <h4 className='fw-bold'>{adminProfile.name}</h4>

                    {/* Bio Section */}
                    <div className='mx-4'>
                        {/* Contact Information */}
                        <div className='d-block d-sm-flex justify-content-between mb-3'>
                            <div className=' col-lg-5'>
                                <span className='fw-semibold float-start'>Email</span>
                                <input
                                    type="text"
                                    value={adminProfile.email || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2 ms-lg-0 col-lg-5'>
                                <span className='fw-semibold float-start'>Phone</span>
                                <input
                                    type="text"
                                    value={adminProfile.phone || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className='mb-3'>
                            <span className='fw-semibold float-start'>Address</span>
                            <input
                                type="text"
                                value={adminProfile.address_line1 + ", " + adminProfile.state + ", " + adminProfile.country || 'N/A'}
                                className='form-control'
                                disabled
                            />
                        </div>

                        {/* Location Details */}
                        <div className='d-block d-sm-flex justify-content-between mb-3'>
                            <div className='  col-lg-5'>
                                <span className='fw-semibold float-start'>City</span>
                                <input
                                    type="text"
                                    value={adminProfile.city || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2 ms-lg-0  col-lg-5'>
                                <span className='fw-semibold float-start'>Zipcode</span>
                                <input
                                    type="text"
                                    value={adminProfile.zipcode || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div >
    )
}

export default Profile;
