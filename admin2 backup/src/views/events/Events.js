import React, { useEffect, useMemo, useState } from 'react'
import TableCompoenent from '../../components/TableCompoenent'
import InputComponent from "../../components/InputComponent";
import authRequest from '../../api';
import debounce from 'lodash/debounce';

const columns = [
    {
        header: "Event Name",
        accessorKey: "event_name",
        cellStyle: { width: '400px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <div style={{
                display: 'inline-block', maxWidth: '400px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}
            </div>;
        }
    },
    {
        header: "Event Host",
        accessorKey: "event_host",
        cellStyle: { width: '400px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <div style={{
                display: 'inline-block', maxWidth: '400px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }}>{value}
            </div>;
        }
    },
    {
        header: "Event Creator",
        accessorKey: "event_creator_name",
        cellStyle: { width: '300px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <span style={{
                display: 'inline-block', maxWidth: '300px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} className='text-capitalize'>{value}
            </span>;
        }
    },
    {
        header: "Event-All-Day",
        accessorKey: "event_all_day",
        cellStyle: { width: '400px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return value ? <div style={{ textAlign: "center" }}>Yes</div> : <div style={{ textAlign: "center" }}> No</div>;
        }
    },
    {
        header: "Start Date",
        accessorKey: "event_start_date",
        cellStyle: { width: '200px' },
        enableSorting: true,
    },
    {
        header: "End Date",
        accessorKey: "event_end_date",
        cellStyle: { width: '200px' },
        enableSorting: false,
    },
    {
        header: "Start Time",
        accessorKey: "event_start_time",
        cellStyle: { width: '150px' },
        enableSorting: true,
    },
    {
        header: "End Time",
        accessorKey: "event_end_time",
        cellStyle: { width: '150px' },
        enableSorting: false,
    },
    {
        header: "Virtual Location",
        accessorKey: "event_virtual_location",
        cellStyle: { width: '300px' },
        enableSorting: false,
    },
    {
        header: "Physical Location",
        accessorKey: "event_location",
        cellStyle: { width: '300px' },
        enableSorting: false,
        cell: ({ getValue }) => {
            const value = getValue();
            return <span style={{
                display: 'inline-block', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}
            </span>;
        }
    },
    {
        header: "Event For",
        accessorKey: "event_for_details",
        cellStyle: { width: '250px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <span className='text-capitalize'>{value?.map(val => val.name).join(", ")}
            </span>;
        },
    }
];

function Events() {
    const [eventSearch, setEventSearch] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const getEvents = async (eventSearch, pageIndex, pageSize) => {
        try {
            const responseData = await authRequest.get(`/adminapp/eventList?search=${eventSearch}&page=${pageIndex + 1}&page_size=${pageSize}`);
            setfilterData(responseData.data.results);
            setTotalCount(responseData.data.count);
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedGetEvents = useMemo(() => {
        return debounce(getEvents, 700)
    }, []);

    useEffect(() => {
        debouncedGetEvents(eventSearch, pagination.pageIndex, pagination.pageSize);

        return () => {
            debouncedGetEvents.cancel();
        };

    }, [eventSearch, pagination.pageIndex, pagination.pageSize, debouncedGetEvents]);

    const handleChange = (e) => {
        setEventSearch(e.target.value);
    };

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
                pagination={pagination}
                totalCount={totalCount}
                setPagination={setPagination}
            />
        </div>
    )
};
export default Events
