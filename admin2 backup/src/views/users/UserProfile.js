import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap';
import { useLocation } from 'react-router';
import authRequest from '../../api';
import defaultImage from "../../assets/images/adminPhoto.jpg"
import childPhoto from "../../assets/images/childPhoto.png"
import InputComponent from '../../components/InputComponent';

// uid, name ,email, phone ,dob
// user_profile => bio, address_line_1,city,state,country,zipcode
// children (array) => child_id ,first_name, last_name,bith_date,profile_pic

function UserProfile() {
    const [userData, setUserData] = useState({})
    const location = useLocation();
    const userId = location.state.userId || null;

    // const [open, setOpen] = useState('');

    useEffect(() => {
        const getUser = async (userId) => {
            try {
                const userProfleData = await authRequest.get(`/adminapp/users/${userId}`);
                // console.log(userProfleData.data);
                setUserData(userProfleData.data)
            } catch (error) {
                console.error(error);
            }
        }
        getUser(userId);
    }, [userId])

    return (
        <div className="d-flex justify-content-center mt-2">
            <Card className='w-75 shadow-lg rounded'>
                <CardBody className="text-center p-4">

                    {/* Profile Picture */}
                    <img
                        src={userData?.user_profile?.profile_picture || defaultImage}
                        alt="user-photo"
                        width={100}
                        height={100}
                        className='rounded-circle border border-1 mb-3'
                    />
                    <h4 className='fw-bold text-capitalize'>{userData?.name}</h4>
                    <h6 className='fw-bold'>{userData?.email}</h6>

                    <div className='mx-4'>
                        {/* Bio Section */}
                        <div className='mb-3 '>
                            <span className='fw-semibold float-start'>Bio</span>
                            <textarea
                                className='form-control mt-1'
                                disabled
                                rows="2"
                                style={{ resize: 'none' }}
                                value={userData?.user_profile?.bio || 'bio'}
                            />
                        </div>

                        {/* Contact Information */}
                        <div className='d-block d-sm-flex justify-content-between mb-3'>
                            <div className=' col-lg-5'>
                                <span className='fw-semibold float-start'>Phone</span>
                                <InputComponent
                                    type="text"
                                    value={userData?.phone || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2 ms-lg-0 col-lg-5'>
                                <span className='fw-semibold float-start'>Date of Birth</span>
                                <InputComponent
                                    type="text"
                                    value={userData?.dob || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className='mb-3'>
                            <span className='fw-semibold float-start'>Address</span>
                            <InputComponent
                                type="text"
                                value={userData?.user_profile?.address_line_1 ? `${userData?.user_profile?.address_line_1}, ${userData?.user_profile?.city}, ${userData?.user_profile?.state}, ${userData?.user_profile?.country}` : 'N/A'}
                                className='form-control'
                                disabled
                            />
                        </div>

                        {/* Location Details */}
                        <div className='d-block d-sm-flex justify-content-between mb-3'>
                            <div className='col-lg-5'>
                                <span className='fw-semibold float-start'>City</span>
                                <InputComponent
                                    type="text"
                                    value={userData?.user_profile?.city || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                            <div className='ms-2 ms-lg-0  col-lg-5'>
                                <span className='fw-semibold float-start'>Zipcode</span>
                                <InputComponent
                                    type="text"
                                    value={userData?.user_profile?.zipcode || 'N/A'}
                                    className='form-control'
                                    disabled
                                />
                            </div>
                        </div>

                        {/* <div className='d-flex justify-content-between mb-3'>
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
                        </div> */}

                        <p className='fw-semibold d-flex justify-content-start'>Childrens </p>
                        {userData?.children?.length <= 0 ?
                            <p>No children</p>
                            : <ChildComponent userData={userData} />
                        }
                    </div>
                </CardBody>
            </Card>
        </div >
    )
}

export default UserProfile;

const ChildComponent = ({ userData = [] }) => {
    return <div className="row">
        {userData?.children?.map((child) => (
            <div className="col-md-4 " key={child.child_id}>
                <div className="card mt-1 border-1">
                    <div className="card-body text-center">
                        <img
                            src={child?.profile_pic || childPhoto}
                            alt={`${child.first_name} ${child.last_name}`}
                            width={100}
                            height={100}
                            className='rounded-circle mb-2'
                        />
                        <h5 className="card-title text-capitalize" style={{
                            minHeight: "20px", whiteSpace: 'nowrap', maxWidth: "100%",
                            overflow: 'hidden', textOverflow: 'ellipsis'
                        }}
                        >{`${child.first_name} ${child.last_name}`}</h5>
                        <p className="card-text"><>Birth Date:-</> {child.birth_date}</p>
                    </div>
                </div>
            </div>
        ))}
    </div >
};
