import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'
import TableCompoenent from '../components/TableCompoenent'

function Home() {
    return (

        <Card>
            <CardTitle tag="h4" className='border-bottom p-3 '>
                Home Page
            </CardTitle>
            <CardBody>
                This is dashboard Home Page

                <TableCompoenent />
            </CardBody>
        </Card>

    )
}

export default Home
