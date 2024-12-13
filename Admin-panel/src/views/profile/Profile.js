import React from 'react';
import { Card, CardBody } from "reactstrap";
import image from "../../assets/images/adminPhoto.jpg";

const adminProfile = {
    name: "John Doe",
    phone: "+1-234-567-8901",
    dob: "1990-01-01",
    bio: "Hello I am Admin of GiveMeo",
    address_line1: "123 Main St",
    address_line2: "Apt 4B",
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
                        src={adminProfile.profile_picture || image}
                        alt="user-photo"
                        width={100}
                        height={100}
                        className='rounded-circle border border-black mb-3'
                    />
                    <h4 className='fw-bold'>{adminProfile.name}</h4>

                    {/* Bio Section */}
                    <div className='mx-4'>
                        <div className='mb-3 '>
                            <textarea
                                className='form-control mt-1'
                                disabled
                                rows="3"
                                style={{ resize: 'none' }}
                                value={adminProfile.bio || 'N/A'}
                            />
                        </div>

                        {/* Contact Information */}
                        <div className='d-block d-sm-flex justify-content-between mb-3'>
                            <div className=' col-lg-5'>
                                <span className='fw-semibold float-start'>Phone</span>
                                <input
                                    type="text"
                                    value={adminProfile.phone || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2 ms-lg-0 col-lg-5'>
                                <span className='fw-semibold float-start'>Date of Birth</span>
                                <input
                                    type="text"
                                    value={adminProfile.dob || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className='mb-3'>
                            <span className='fw-semibold float-start'>Address 1</span>
                            <input
                                type="text"
                                value={adminProfile.address_line1 || 'N/A'}
                                className='form-control'
                                disabled
                            />
                        </div>

                        <div className='mb-3'>
                            <span className='fw-semibold float-start'>Address 2</span>
                            <input
                                type="text"
                                value={adminProfile.address_line2 || 'N/A'}
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

                        <div className='d-flex justify-content-between mb-3'>
                            <div className=' col-lg-5'>
                                <span className='fw-semibold float-start'>State</span>
                                <input
                                    type="text"
                                    value={adminProfile.state || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2  ms-lg-0 col-lg-5'>
                                <span className='fw-semibold float-start'>Country</span>
                                <input
                                    type="text"
                                    value={adminProfile.country || 'N/A'}
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
