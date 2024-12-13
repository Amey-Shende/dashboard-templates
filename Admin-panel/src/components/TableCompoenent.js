import React from 'react'
import { Card, CardBody, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaSortDown, FaSortUp } from "react-icons/fa";

function TableCompoenent({ columns = [], data = [], onRowClick }) {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
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

                                                                }[header.column.getIsSorted()] ?? (!header.column.columnDef.enableSorting ? null : <RiExpandUpDownFill className='ms-2' />)}

                                                                {/* <RiExpandUpDownFill className='ms-2' /> */}
                                                                {/* header.column.columnDef.enableSorting */}
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
                                                                {(cell.getValue() !== null && cell.getValue() !== undefined && cell.getValue() !== '')
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
                    {
                        table.getRowModel().rows.length > 0
                            ? <Pagination className='d-flex justify-content-end me-5 shadow'>
                                <PaginationItem disabled>
                                    <PaginationLink
                                        href="#"
                                        previous
                                    >Previous
                                    </PaginationLink>
                                </PaginationItem>

                                <PaginationItem active>
                                    <PaginationLink href="#">
                                        1
                                    </PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink href="#">
                                        2
                                    </PaginationLink>
                                </PaginationItem>

                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        next
                                    >Next
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                            : null
                    }
                </Card>
            </Col>
        </Row >
    )
};

export default TableCompoenent;
