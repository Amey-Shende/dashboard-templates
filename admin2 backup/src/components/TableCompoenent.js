import React from 'react'
import { Card, CardBody, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel
} from '@tanstack/react-table';
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaSortDown, FaSortUp } from "react-icons/fa";

function TableCompoenent({ columns = [], data = [], onRowClick = () => { }, pagination, totalCount, setPagination }) {

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(totalCount / pagination.pageSize),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
    });

    return (
        <Row>
            <Col lg="12">
                <Card className='shadow-none'>
                    <CardBody className="">
                        <div style={{ overflowX: "auto", }}>
                            {table.getRowModel().rows.length > 0 ?
                                <Table striped style={{ whiteSpace: 'nowrap' }}>
                                    <thead>
                                        {
                                            table.getHeaderGroups().map(headerGroup => (
                                                <tr key={headerGroup.id}>
                                                    {
                                                        headerGroup.headers.map(header => (
                                                            <th key={header.id} onClick={header.column.getToggleSortingHandler()}
                                                                style={{ ...header.column.columnDef.cellStyle, cursor: "pointer" }}>
                                                                {
                                                                    flexRender(header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )
                                                                }
                                                                {{
                                                                    asc: <FaSortUp className='ms-2' />,
                                                                    desc: <FaSortDown className='ms-2' />,

                                                                }[header.column.getIsSorted()] ?? (!header.column.columnDef.enableSorting ? null : <RiExpandUpDownFill className='ms-2' title="Toggle Sorting" />)}
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </thead>
                                    <tbody>
                                        {
                                            table.getRowModel().rows.map(row => (
                                                <tr key={row.id} >
                                                    {
                                                        row.getVisibleCells().map(cell => (
                                                            <td key={cell.id}
                                                                onClick={cell.column.id === 'name' ? () => onRowClick(cell.row.original.uid) : null}
                                                                style={{ cursor: cell.column.id === 'name' ? "pointer" : "default" }}
                                                            >
                                                                {(cell.getValue() !== null && cell.getValue() !== undefined && cell.getValue() !== '' &&
                                                                    cell.getValue().length !== 0)
                                                                    ? flexRender(cell.column.columnDef.cell, cell.getContext())
                                                                    : <span className='d-flex justify-content-center'>-</span>}
                                                            </td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                : <p>No record found</p>
                            }
                        </div>
                    </CardBody>

                    {/* Pagintation */}
                    {table.getRowModel().rows.length > 0 && (
                        <Pagination className='d-flex justify-content-end me-3 shadow  rounded p-1'>
                            <PaginationItem disabled={!table.getCanPreviousPage()} title='First Page' className='remove-focus-ring'>
                                <PaginationLink
                                    onClick={() => table.setPageIndex(0)}
                                    className='fw-bold remove-focus-ring'
                                > &lt;&lt;
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem disabled={!table.getCanPreviousPage()}>
                                <PaginationLink
                                    onClick={() => table.previousPage()}
                                    className='fw-bold remove-focus-ring'
                                > Previous
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem active>
                                <PaginationLink className='bg-primary text-white remove-focus-ring'>
                                    {pagination.pageIndex + 1}
                                </PaginationLink>
                            </PaginationItem>

                            {
                                pagination.pageIndex + 1 !== table.getPageCount() &&
                                <>
                                    <PaginationItem disabled>
                                        <PaginationLink>
                                            ...
                                        </PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem >
                                        <PaginationLink
                                            onClick={() => table.setPageIndex(table.getPageCount() - 1)} >
                                            {table.getPageCount()}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            }

                            {/* <span className='ms-2 me-2 mt-1' style={{ fontSize: "20px" }}> Page <span className='bg-primary px-2 py-1 text-white rounded'>{pagination.pageIndex + 1}</span> of {table.getPageCount()}
                            </span> */}

                            <PaginationItem disabled={!table.getCanNextPage()}>
                                <PaginationLink
                                    onClick={() => table.nextPage()}
                                    className='fw-bold remove-focus-ring'
                                > Next
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem disabled={!table.getCanNextPage()} title="Last Page" >
                                <PaginationLink
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    className='fw-bold  remove-focus-ring'
                                > &gt;&gt;
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    )}
                </Card>
            </Col>
        </Row >
    )
};

export default TableCompoenent;

// {/* <div className='d-flex justify-content-end pb-2 pe-2'>
//                         <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} title='first page'>
//                             {'<<'}
//                         </button>
//                         <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//                             {'Previous'}
//                         </button>
//                         <span className='ms-1 me-1'>Page {pagination.pageIndex + 1} of {table.getPageCount()}</span>

//                         <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//                             {'Next'}
//                         </button>
//                         <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} title="last page">
//                             {'>>'}
//                         </button>
// </div>  */}

// {
//     table.getRowModel().rows.length > 0
//         ? <Pagination className='d-flex justify-content-end me-5 shadow'>
//             <PaginationItem disabled>
//                 <PaginationLink
//                     href="#"
//                     previous
//                     onClick={() => table.previousPage()}
//                     disabled={!table.getCanPreviousPage()}
//                 >Previous
//                 </PaginationLink>
//             </PaginationItem>

//             {/* <PaginationItem active>
//                 <PaginationLink href="#">
//                     1
//                 </PaginationLink>
//             </PaginationItem> */}
//             <PaginationItem active>
//                 <PaginationLink href="#">
//                     {table.getState().pagination.pageIndex + 1}
//                 </PaginationLink>
//             </PaginationItem>

//             <PaginationItem>
//                 <PaginationLink
//                     href="#"
//                     next
//                     onClick={() => table.nextPage()}
//                     disabled={!table.getCanNextPage()}
//                 >Next
//                 </PaginationLink>
//             </PaginationItem>
//         </Pagination>
//         : null
// }
