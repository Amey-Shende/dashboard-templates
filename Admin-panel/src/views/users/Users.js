import React, { useEffect, useState } from 'react'
import TableCompoenent from '../../components/TableCompoenent';
import InputComponent from "../../components/InputComponent";
import { useNavigate } from 'react-router';
import { userData } from "./data";

//users:-  uid, name, email, phone, dob, tc, role, created_at, updated_at,is_active,is_staff
//users,bio :- address_line1 ,address_line2,profile_picture, city, state, country,zipcode, 

const columns = [
    {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
    },
    {
        header: "Email",
        accessorKey: "email",
        cellStyle: { width: '400px' },
        enableSorting: true,
    },
    {
        header: "Phone No",
        accessorKey: "phone",
        cellStyle: { width: '1000px' },
        enableSorting: true,
    },
    {
        header: "Date of birth",
        accessorKey: "dob",
        cellStyle: { width: '800px' },
        enableSorting: true,
    },
    // {
    //     header: "Role",
    //     accessorKey: "role",
    //     cellStyle: { width: '150px' },
    // },
    {
        header: "Created_At",
        accessorKey: "created_at",
        cellStyle: { width: '200px' },
        enableSorting: true,
    },
    {
        header: "Updated_At",
        accessorKey: "updated_at",
        cellStyle: { width: '200px' },
        enableSorting: true,
    },
    {
        header: "Active",
        accessorKey: "is_active",
        cellStyle: { width: '100px' },
        enableSorting: true,
    },
    {
        header: "Staff",
        accessorKey: "is_staff",
        cellStyle: { width: '100px' },
        enableSorting: true,
    }
];

function Users() {
    const [userSearch, setUserSearch] = useState('');
    const [filterData, setfilterData] = useState(userData);
    const navigate = useNavigate();

    useEffect(() => {
        const dataFilter = () => {
            if (!userSearch) {
                setfilterData(userData);
                return;
            }

            const response = userData?.filter((val, index) =>
                val.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
                val.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
                val.phone?.includes(userSearch));
            setfilterData(response)
        }
        dataFilter()
    }, [userSearch]);

    const handleChange = (e) => {
        setUserSearch(e.target.value);
    };

    const handleNavigate = (id) => {
        const profileData = filterData.find(val => val.uid === id);
        const essentialData = {
            uid: profileData.uid,
            name: profileData.name,
            phone: profileData.phone,
            dob: profileData.dob,
            bio: profileData.bio,
            address_line1: profileData.address_line1,
            address_line2: profileData.address_line2,
            city: profileData.city,
            state: profileData.state,
            country: profileData.country,
            zipcode: profileData.zipcode,
            profile_picture: profileData.profile_picture
        };

        navigate(`/dashboard/userProfile`, { state: essentialData })
    }

    return (
        <div>
            <div>
                {/* <h3>All Users</h3> */}
                {/* search box  users*/}
                <InputComponent
                    divClassName='mb-4'
                    type="search"
                    placeholder='Search by name, email, or phone no'
                    name="userSearch"
                    id="userSearch"
                    className='w-25 rounded-3'
                    value={userSearch}
                    onChange={handleChange}
                />
            </div>

            <TableCompoenent
                columns={columns}
                data={filterData}
                onRowClick={handleNavigate}
            />
        </div>
    )
};

export default Users;
