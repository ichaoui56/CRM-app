import React, { useState } from 'react';
import { Row, Col, Table, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { Link } from "react-router-dom";

import useParts from '../../../hooks/useParts';


const PartsList = () => {

    const [searchParams, setSearchParams] = useState({});
    const { parts, loading, error } = useParts(searchParams);

    const handleSearch = () => {
        const name = document.getElementById('search-name').value;
        const id = document.getElementById('search-id').value;
        const createdAt = document.getElementById('search-created-at').value;

        setSearchParams({ name, id, created_at: createdAt });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); 
    };
    return (
        <>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Parts Table</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <p>
                                Here you can add all{" "}
                                <code>parts</code> needed for your <code>Ticket</code>
                            </p>
                            <div className="table-responsive border-bottom my-3">
                                <Table
                                    responsive
                                    striped
                                    id="datatable"
                                    className=""
                                    data-toggle="data-table"
                                >
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Created at</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parts.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{formatDate(item.created_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    
                                </Table>
                                <Row className="align-items-center">
                                    <Col md="6">
                                        <div
                                            className="dataTables_info"
                                            id="datatable_info"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            Showing 1 to 10 of 57 entries
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div
                                            className="dataTables_paginate paging_simple_numbers"
                                            id="datatable_paginate"
                                        >
                                            <ul className="pagination">
                                                <li
                                                    className="paginate_button page-item previous disabled"
                                                    id="datatable_previous"
                                                >
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        aria-disabled="true"
                                                        data-dt-idx="previous"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        Previous
                                                    </Link>
                                                </li>
                                                <li className="paginate_button page-item active">
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        aria-current="page"
                                                        data-dt-idx="0"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        1
                                                    </Link>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        data-dt-idx="1"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        2
                                                    </Link>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        data-dt-idx="2"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        3
                                                    </Link>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        data-dt-idx="3"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        4
                                                    </Link>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        data-dt-idx="4"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        5
                                                    </Link>
                                                </li>
                                                <li className="paginate_button page-item ">
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        data-dt-idx="5"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        6
                                                    </Link>
                                                </li>
                                                <li
                                                    className="paginate_button page-item next"
                                                    id="datatable_next"
                                                >
                                                    <Link
                                                        to="#"
                                                        aria-controls="datatable"
                                                        data-dt-idx="next"
                                                        tabIndex="0"
                                                        className="page-link"
                                                    >
                                                        Next
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PartsList;
