import React from 'react'
import { Card, CardBody } from 'reactstrap';
import image from "../../assets/images/adminPhoto.jpg"
import { useLocation } from 'react-router';

function UserProfile() {
    const location = useLocation();

    const { name, phone, dob, bio, address_line1, address_line2,
        city, state, country, zipcode, profile_picture } = location.state || {};

    return (
        <div className="d-flex justify-content-center mt-2">
            <Card className='w-75 shadow-lg rounded'>
                <CardBody className="text-center p-4">

                    {/* Profile Picture */}
                    <img
                        src={profile_picture || image}
                        alt="user-photo"
                        width={100}
                        height={100}
                        className='rounded-circle border border-black mb-3'
                    />
                    <h4 className='fw-bold'>{name}</h4>

                    {/* Bio Section */}
                    <div className='mx-4'>
                        <div className='mb-3 '>
                            <textarea
                                className='form-control mt-1'
                                disabled
                                rows="3"
                                style={{ resize: 'none' }}
                                value={bio || 'N/A'}
                            />
                        </div>

                        {/* Contact Information */}
                        <div className='d-block d-sm-flex justify-content-between mb-3'>
                            <div className=' col-lg-5'>
                                <span className='fw-semibold float-start'>Phone</span>
                                <input
                                    type="text"
                                    value={phone || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2 ms-lg-0 col-lg-5'>
                                <span className='fw-semibold float-start'>Date of Birth</span>
                                <input
                                    type="text"
                                    value={dob || 'N/A'}
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
                                value={address_line1 || 'N/A'}
                                className='form-control'
                                disabled
                            />
                        </div>

                        <div className='mb-3'>
                            <span className='fw-semibold float-start'>Address 2</span>
                            <input
                                type="text"
                                value={address_line2 || 'N/A'}
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
                                    value={city || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2 ms-lg-0  col-lg-5'>
                                <span className='fw-semibold float-start'>Zipcode</span>
                                <input
                                    type="text"
                                    value={zipcode || 'N/A'}
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
                                    value={state || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2  ms-lg-0 col-lg-5'>
                                <span className='fw-semibold float-start'>Country</span>
                                <input
                                    type="text"
                                    value={country || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>

    )
}

export default UserProfile;
