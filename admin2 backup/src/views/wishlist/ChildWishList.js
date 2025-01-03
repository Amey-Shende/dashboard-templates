import React, { useEffect, useMemo, useState } from 'react'
import TableCompoenent from '../../components/TableCompoenent';
import InputComponent from '../../components/InputComponent';
import authRequest from '../../api';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';

const columns = [
    {
        header: "Parent Name",
        accessorKey: "parent_name",
        cellStyle: { width: '200px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <span style={{
                textAlign: "center", display: 'inline-block', maxWidth: '200px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}</span>
        },
    },
    {
        header: "First Name",
        accessorKey: "first_name",
        cellStyle: { width: '180px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <span style={{
                textAlign: "center", display: 'inline-block', maxWidth: '180px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}</span>
        },
    },
    {
        header: "Last Name",
        accessorKey: "last_name",
        cellStyle: { width: '180px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <span style={{
                textAlign: "center", display: 'inline-block', maxWidth: '180px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}</span>
        },
    },
    {
        header: "Product url",
        accessorKey: "product_url",
        cellStyle: { width: '500px' },
        enableSorting: false,
        cell: ({ getValue }) => {
            const url = getValue();
            return <div style={{
                textAlign: "center", display: 'inline-block', maxWidth: '490px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }}><Link to={url} target="_blank">{url}</Link></div>
        }
    },
    {
        header: "Price",
        accessorKey: "price",
        cellStyle: { width: '120px' },
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <div
                style={{ textAlign: "center" }}
            >${value}</div>
        },
    },
]

function ChildWishList() {

    const [childWishListSearch, setChildWishListSearch] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const getChildWishList = async (childWishListSearch, pageIndex, pageSize) => {
        try {
            const responseData = await authRequest.get(`/adminapp/childWishlist?search=${childWishListSearch}&page=${pageIndex + 1}&page_size=${pageSize}`);
            // console.log("Child Wishlist:-", responseData);

            const childData = await responseData?.data?.results?.flatMap((wishlist) => {
                if (wishlist.child_wishlist == null || wishlist.child_wishlist.items.length === 0) {
                    return [{
                        child_id: wishlist.child_id,
                        parent_name: wishlist?.parent_name,
                        first_name: wishlist?.first_name,
                        last_name: wishlist?.last_name,
                        product_url: null,
                        price: null
                    }];
                } else {
                    return wishlist.child_wishlist?.items?.map((item) => ({
                        child_id: wishlist.child_id,
                        parent_name: wishlist?.parent_name,
                        first_name: wishlist?.first_name,
                        last_name: wishlist?.last_name,
                        product_url: item?.product_url,
                        price: item?.price
                    }));
                }
            });

            // console.log("ChildData:-", childData);
            setfilterData(childData);
            setTotalCount(responseData.data.count);
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedGetEvents = useMemo(() => {
        return debounce(getChildWishList, 700)
    }, []);

    useEffect(() => {
        debouncedGetEvents(childWishListSearch, pagination.pageIndex, pagination.pageSize);
        return () => {
            debouncedGetEvents.cancel();
        };
    }, [childWishListSearch, pagination.pageIndex, pagination.pageSize, debouncedGetEvents]);

    const handleChange = (e) => {
        setChildWishListSearch(e.target.value);
    }

    return (
        <div>
            <div>
                {/* <h3 >All Events</h3> */}
                {/* search box*/}
                <InputComponent
                    divClassName='mb-4'
                    type="search"
                    placeholder='Search by first and last name'
                    name="childWishListSearch"
                    id="childWishListSearch"
                    className='w-25 rounded-3'
                    value={childWishListSearch}
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

export default ChildWishList;
