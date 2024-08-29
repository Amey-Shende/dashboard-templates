import React from 'react';
import { Card, CardBody, CardTitle } from "reactstrap";

function Profile() {
    return (
        <div>
            <Card>
                <CardTitle tag="h4" className='border-bottom p-3 '>
                    Profile
                </CardTitle>

                <CardBody>
                    This is User Profile
                </CardBody>

            </Card>

        </div>
    )
}

export default Profile;
