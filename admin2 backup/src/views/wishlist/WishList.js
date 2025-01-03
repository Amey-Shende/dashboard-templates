import React, { useEffect, useMemo, useState } from 'react'
import TableCompoenent from '../../components/TableCompoenent'
import { Link } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import authRequest from '../../api';
import debounce from 'lodash/debounce';

const column = [
    {
        header: "Producr Name",
        accessorKey: "name",
        enableSorting: true,
        cellStyle: { width: '400px', },
        cell: ({ getValue }) => {
            const value = getValue();
            return <span style={{
                display: 'inline-block', maxWidth: '400px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} title={value}>{value}
            </span>;
        }
    },
    {
        header: "Product url",
        accessorKey: "product_url",
        cellStyle: { width: '600px', },
        enableSorting: false,
        cell: ({ getValue }) => {
            const url = getValue();
            return <div style={{
                textAlign: "center", display: 'inline-block', maxWidth: '600px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }}><Link to={url} target="_blank">{url}</Link></div>
        },
    },
    {
        header: "Price",
        accessorKey: "price",
        enableSorting: true,
        cell: ({ getValue }) => {
            const value = getValue();
            return <div
            // style={{ textAlign: "center" }}
            > ${value}</div>
        },

    },
    // {
    //     header: "Quantity",
    //     accessorKey: "quantity",
    //     enableSorting: true,
    //     cell: ({ getValue }) => {
    //         const value = getValue();
    //         return <div style={{ textAlign: "center" }}> {value} </div>
    //     },
    // },
    // {
    //     header: "Purchased Quantity",
    //     accessorKey: "purchased_quantity",
    //     enableSorting: true,
    //     cell: ({ getValue }) => {
    //         const value = getValue();
    //         return <div style={{ textAlign: "center" }}>{value}</div>
    //     },
    // },
    // {
    //     header: "Purchased",
    //     accessorKey: "purchased",
    //     enableSorting: true,
    //     cell: ({ getValue }) => {
    //         const value = getValue();
    //         return value ? <div style={{ textAlign: "center" }}>Yes</div> : <div style={{ textAlign: "center" }}> No</div>;
    //     }
    // },
    // {
    //     header: "Wishlist Id",
    //     accessorKey: "wishlist_id",
    //     enableSorting: false,
    // }
];

function WishList() {
    const [wishListSearch, setWishListSearch] = useState("")
    const [filterData, setfilterData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // product data
    const getWishList = async (wishListSearch, pageIndex, pageSize) => {
        try {
            const responseData = await authRequest.get(`/adminapp/wishList/?search=${wishListSearch}&page=${pageIndex + 1}&page_size=${pageSize}`);
            // console.log("All Users:- ", responseData)
            const allItems = await responseData?.data?.results?.flatMap((wishlist) => {
                return wishlist?.items?.map((item) => ({
                    wishlist_id: wishlist.wishlist_id,
                    name: item.name,
                    product_url: item.product_url,
                    price: item.price,
                }));
            });
            setfilterData(allItems);
            setTotalCount(responseData.data.count);
        } catch (error) {
            console.error(error);
        }
    }

    const debouncedGetWishList = useMemo(() => {
        return debounce(getWishList, 700)
    }, []);

    useEffect(() => {
        debouncedGetWishList(wishListSearch, pagination.pageIndex, pagination.pageSize);

        return () => {
            debouncedGetWishList.cancel();
        };
    }, [wishListSearch, pagination.pageIndex, pagination.pageSize, debouncedGetWishList])

    const handleChange = (e) => {
        setWishListSearch(e.target.value);
    };

    return (
        <div>
            <div>
                <div>
                    {/* <h3 >All Events</h3> */}
                    {/* search box*/}
                    <InputComponent
                        divClassName='mb-4'
                        type="search"
                        placeholder='Search by product name'
                        name="wishListSearch"
                        id="wishListSearch"
                        className='w-25 rounded-3'
                        value={wishListSearch}
                        onChange={handleChange}
                    />
                </div>

                <TableCompoenent
                    columns={column}
                    data={filterData}
                    pagination={pagination}
                    totalCount={totalCount}
                    setPagination={setPagination}
                />
            </div>
        </div>
    )
}

export default WishList
