import React from 'react'
import { Button, Card } from 'reactstrap';
import { RiCloseLargeFill } from "react-icons/ri";

function NotificationPanel({ handleNotification }) {
    return (
        <Card className="bg-white vh-100">

            <div className="d-flex ">
                <h3 className='mt-3 ms-3' >Notifications</h3>
                <Button
                    color="white"
                    className="ms-auto text-black me-3"
                    onClick={handleNotification}
                >
                    {/* <i className="bi bi-x fs-2 "></i> */}
                    <RiCloseLargeFill  />
                </Button>
            </div>

            <div className='text-center'>
                <p>Hello 1</p>
                <p>Hello 2</p>
                <p>Hello 3</p>
                <p>Hello 4</p>
                <p>Hello 5</p>
            </div>
        </Card>


    )
}

export default NotificationPanel
