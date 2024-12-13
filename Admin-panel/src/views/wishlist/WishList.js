import React, { useEffect, useState } from 'react'
import TableCompoenent from '../../components/TableCompoenent'
import { Link } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';

// Wishlist Item
// witem_id, name, asin, product_url, image_url, price, quantity, purchased_quantity, purchased, wishlist_id

const column = [
    {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
    },
    {
        header: "ASIN",
        accessorKey: "asin",
        enableSorting: false,
    },
    {
        header: "Product url",
        accessorKey: "product_url",
        enableSorting: false,
        cell: ({ getValue }) => {
            const url = getValue();
            return (
                <span>
                    <Link to={url} target="_blank">Link</Link>
                </span>
            );
        },
    },
    {
        header: "Price",
        accessorKey: "price",
        enableSorting: true,
    },
    {
        header: "Quantity",
        accessorKey: "quantity",
        enableSorting: true,
    },
    {
        header: "Purchased Quantity",
        accessorKey: "purchased_quantity",
        enableSorting: true,
    },
    {
        header: "Purchased",
        accessorKey: "purchased",
        enableSorting: true,
    }, {
        header: "Wishlist Id",
        accessorKey: "wishlist_id",
        enableSorting: false,
    }
];

const products = [
    {
        witem_id: 1,
        name: "Wireless Mouse",
        asin: "B08XYZ1234",
        product_url: "https://www.example.com/product/wireless-mouse",
        image_url: "https://www.example.com/images/wireless-mouse.jpg",
        price: 29.99,
        quantity: 100,
        purchased_quantity: 25,
        purchased: true,
        wishlist_id: 101
    },
    {
        witem_id: 2,
        name: "Bluetooth Headphones",
        asin: "B07ABC5678",
        product_url: "https://www.example.com/product/bluetooth-headphones",
        image_url: "https://www.example.com/images/bluetooth-headphones.jpg",
        price: 59.99,
        quantity: 50,
        purchased_quantity: 10,
        purchased: false,
        wishlist_id: 102
    },
    {
        witem_id: 3,
        name: "4K Ultra HD TV",
        asin: "B09LMN4321",
        product_url: "https://www.example.com/product/4k-ultra-hd-tv",
        image_url: "https://www.example.com/images/4k-ultra-hd-tv.jpg",
        price: 799.99,
        quantity: 20,
        purchased_quantity: 5,
        purchased: true,
        wishlist_id: 103
    },
    {
        witem_id: 4,
        name: "Smartphone Stand",
        asin: "B06PQW8765",
        product_url: "https://www.example.com/product/smartphone-stand",
        image_url: "https://www.example.com/images/smartphone-stand.jpg",
        price: 14.99,
        quantity: 200,
        purchased_quantity: 50,
        purchased: false,
        wishlist_id: 104
    },
    {
        witem_id: 5,
        name: "Gaming Keyboard",
        asin: "B05RST0987",
        product_url: "https://www.example.com/product/gaming-keyboard",
        image_url: "https://www.example.com/images/gaming-keyboard.jpg",
        price: 89.99,
        quantity: 75,
        purchased_quantity: 30,
        purchased: true,
        wishlist_id: 105
    }
];


function WishList() {

    const [wishListSearch, setWishListSearch] = useState("")
    const [filterData, setfilterData] = useState(products);

    const handleChange = (e) => {
        setWishListSearch(e.target.value);
    };

    useEffect(() => {
        const dataFilter = () => {
            if (!wishListSearch) {
                setfilterData(products);
                return;
            }
            const response = products?.filter((val, index) =>
                val.name?.toLowerCase().includes(wishListSearch.toLowerCase())
                || val.asin?.toLowerCase().includes(wishListSearch.toLowerCase()));

            setfilterData(response)
        }
        dataFilter()
    }, [wishListSearch]);


    return (
        <div>
            <div>
                <div>
                    {/* <h3 >All Events</h3> */}
                    {/* search box*/}
                    <InputComponent
                        divClassName='mb-4'
                        type="search"
                        placeholder='Search by event name'
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
                />
            </div>
        </div>
    )
}

export default WishList
