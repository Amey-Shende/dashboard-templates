import React, { useEffect, useMemo, useState } from 'react'
import TableCompoenent from '../../components/TableCompoenent';
import InputComponent from "../../components/InputComponent";
import { useNavigate } from 'react-router';
import authRequest from '../../api';
import debounce from 'lodash/debounce';

const columns = [
    {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
        cellStyle: { width: '250px' },
        cell: ({ getValue }) => {
            const value = getValue();
            return <span style={{
                textAlign: "center", display: 'inline-block', maxWidth: '250px', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis'
            }} className='text-capitalize'>{value}</span>
        },
    },
    {
        header: "Email",
        accessorKey: "email",
        // cellStyle: { width: '400px' },
        enableSorting: true,
    },
    {
        header: "Phone No",
        accessorKey: "phone",
        // cellStyle: { width: '1000px' },
        enableSorting: true,
    },
    {
        header: "Date of birth",
        accessorKey: "dob",
        // cellStyle: { width: '800px' },
        enableSorting: true,
    },
];

function Users() {
    const [userSearch, setUserSearch] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const navigate = useNavigate();

    // All UserList
    const getUsers = async (userSearch, pageIndex, pageSize) => {
        // const startTime = new Date().getTime();
        try {
            const responseData = await authRequest.get(`/adminapp/users/?search=${userSearch}&page=${pageIndex + 1}&page_size=${pageSize}`);
            // console.log("All Users:- ", responseData)
            // const endTime = new Date().getTime();
            // const timeTaken = endTime - startTime;
            // console.log(timeTaken);
            setfilterData(responseData.data.results);
            setTotalCount(responseData.data.count);
        } catch (error) {
            console.error(error);
        }
    }

    const debouncedGetUsers = useMemo(() => {
        return debounce(getUsers, 700)
    }, []);

    useEffect(() => {
        debouncedGetUsers(userSearch, pagination.pageIndex, pagination.pageSize);

        return () => {
            debouncedGetUsers.cancel();
        };
    }, [userSearch, pagination.pageIndex, pagination.pageSize, debouncedGetUsers]);

    const handleChange = (e) => {
        setUserSearch(e.target.value);
    };

    const handleNavigate = (id) => {
        navigate(`/dashboard/userProfile`, { state: { userId: id } })
    };

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
                pagination={pagination}
                totalCount={totalCount}
                setPagination={setPagination}
            />
        </div>
    )
};

export default Users;
