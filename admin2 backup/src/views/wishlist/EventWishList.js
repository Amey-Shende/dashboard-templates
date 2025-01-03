import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import TableCompoenent from '../../components/TableCompoenent';
import authRequest from '../../api';
import debounce from 'lodash/debounce';

const columns = [
    {
        header: "Event Name",
        accessorKey: "event_name",
        cellStyle: { width: '300px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <div style={{
                textAlign: "left", display: 'inline-block', maxWidth: '300px', width: "300px", whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}</div >
        }
    },
    {
        header: "Event Host",
        accessorKey: "event_host",
        cellStyle: { width: '200px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <div style={{
                textAlign: "left", display: 'inline-block', maxWidth: '200px', width: "200px", whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}</div >
        }
    },
    {
        header: "Product url",
        accessorKey: "product_url",
        cellStyle: { width: '500px' },
        enableSorting: false,
        cell: ({ getValue }) => {
            const url = getValue();
            return <div>
                {url}
            </div>
        }
    },
]

function EventWishList() {
    const [eventWishListSearch, setEventWishListSearch] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const getEventWishList = async (eventWishListSearch, pageIndex, pageSize) => {
        try {
            const responseData = await authRequest.get(`/adminapp/eventWishlist?search=${eventWishListSearch}&page=${pageIndex + 1}&page_size=${pageSize}`);
            // console.log("Child Wishlist:-", responseData);

            const childData = await responseData?.data?.results?.flatMap((wishlist) => {
                if (wishlist.wishlist == null || wishlist.wishlist.items.length === 0) {
                    return [{
                        event_id: wishlist.event_id,
                        event_name: wishlist?.event_name,
                        event_host: wishlist?.event_host,
                        product_url: null,
                    }];
                } else {

                    const productLinks = wishlist.wishlist.items.map((item, index) => (
                        <Link key={item.witem_id}
                            to={item?.product_url}
                            target='_blank'
                            className='ms-2'
                            title={item?.product_url}
                        > Product {index + 1}
                        </Link>
                    ));

                    return [{
                        event_id: wishlist.event_id,
                        event_name: wishlist?.event_name,
                        event_host: wishlist?.event_host,
                        product_url: productLinks,
                    }];
                }
            });

            console.log("Data:-", childData);
            setfilterData(childData);
            setTotalCount(responseData.data.count);
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedGetEvents = useMemo(() => {
        return debounce(getEventWishList, 700)
    }, []);

    useEffect(() => {
        debouncedGetEvents(eventWishListSearch, pagination.pageIndex, pagination.pageSize);
        return () => {
            debouncedGetEvents.cancel();
        };
    }, [eventWishListSearch, pagination.pageIndex, pagination.pageSize, debouncedGetEvents]);

    const handleChange = (e) => {
        setEventWishListSearch(e.target.value);
    }
    return (
        <div>
            <div>
                {/* <h3 >All Events</h3> */}
                {/* search box*/}
                <InputComponent
                    divClassName='mb-4'
                    type="search"
                    placeholder='Search by event name'
                    name="eventWishListSearch"
                    id="eventWishListSearch"
                    className='w-25 rounded-3'
                    value={eventWishListSearch}
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
}

export default EventWishList
