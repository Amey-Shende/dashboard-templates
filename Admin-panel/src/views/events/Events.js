import React, { useEffect, useState } from 'react'
import TableCompoenent from '../../components/TableCompoenent'
import InputComponent from "../../components/InputComponent";
import { eventData, columns } from './data';

function Events() {
    const [eventSearch, setEventSearch] = useState('');
    const [filterData, setfilterData] = useState(eventData);

    const handleChange = (e) => {
        setEventSearch(e.target.value);
    };

    useEffect(() => {
        const dataFilter = () => {
            if (!eventSearch) {
                setfilterData(eventData);
                return;
            }

            const response = eventData?.filter((val, index) =>
                val.event_name?.toLocaleLowerCase().includes(eventSearch.toLocaleLowerCase()))
            setfilterData(response)
        }
        dataFilter()
    }, [eventSearch]);

    return (
        <div>
            <div>
                {/* <h3 >All Events</h3> */}
                {/* search box*/}
                <InputComponent
                    divClassName='mb-4'
                    type="search"
                    placeholder='Search by event name'
                    name="eventSearch"
                    id="eventSearch"
                    className='w-25 rounded-3'
                    value={eventSearch}
                    onChange={handleChange}
                />
            </div>

            {/*Table  */}
            <TableCompoenent
                columns={columns}
                data={filterData}
            />
        </div>
    )
};
export default Events
