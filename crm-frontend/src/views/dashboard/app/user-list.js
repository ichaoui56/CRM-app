import React, { useState } from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import Card from "../../../components/Card"; 
import useUsers from "../../../hooks/useUsers";

const TableData = () => {
   const [searchParams, setSearchParams] = useState({
      id: '',
      city: '',
      per_page: 10,
      page: 1,
   });
   
   const { users, loading, error } = useUsers(searchParams);
   const handleSearch = (e) => {
      e.preventDefault();
      setSearchParams((prevParams) => ({
         ...prevParams,
         [e.target.name]: e.target.value,
         page: 1, // Reset to first page on new search
      }));
   };

   const handlePagination = (page) => {
      setSearchParams((prevParams) => ({
         ...prevParams,
         page,
      }));
   };

   const usersArray = users;

   return (
      <Row>
         <Col sm="12">
            <Card>
               <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                     <h4 className="card-title">User Information</h4>
                  </div>
               </Card.Header>
               <Card.Body>
                  <Form onSubmit={handleSearch} className="mb-3">
                     <Row>
                        <Col md="3">
                           <Form.Group>
                              <Form.Label>ID</Form.Label>
                              <Form.Control
                                 type="number   "
                                 name="id"
                                 placeholder="Search by ID"
                                 onChange={handleSearch}
                              />
                           </Form.Group>
                        </Col>
                        <Col md="3">
                           <Form.Group>
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="city"
                                 placeholder="Filter by City"
                                 onChange={handleSearch}
                              />
                           </Form.Group>
                        </Col>
                        <Col md="3">
                           <Form.Group>
                              <Form.Label>Items per page</Form.Label>
                              <Form.Control
                                 as="select"
                                 name="per_page"
                                 onChange={handleSearch}
                              >
                                 <option value="10">10</option>
                                 <option value="25">25</option>
                                 <option value="50">50</option>
                                 <option value="100">100</option>
                              </Form.Control>
                           </Form.Group>
                        </Col>
                     </Row>
                  </Form>
                  {loading && <p>Loading...</p>}
                  {error && <p>Error: {error}</p>}
                  {!loading && !error && usersArray.length === 0 && <p>No users found.</p>}
                  <div className="table-responsive border-bottom my-3">
                     <Table responsive striped id="datatable">
                        <thead>
                           <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Phone Number</th>
                              <th>City</th>
                              <th>Current Address</th>
                              <th>Profile Picture</th>
                              <th>Email</th>
                           </tr>
                        </thead>
                        <tbody>
                           {usersArray.map((user) => (
                              <tr key={user.id}>
                                 <td>{user.first_name}</td>
                                 <td>{user.last_name}</td>
                                 <td>{user.phone_number}</td>
                                 <td>{user.city}</td>
                                 <td>{user.current_address}</td>
                                 <td>
                                    <img src={user.profile_picture} alt="Profile" style={{ width: "50px", height: "50px" }} />
                                 </td>
                                 <td>{user.email}</td>
                              </tr>
                           ))}
                        </tbody>
                        <tfoot>
                           <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Phone Number</th>
                              <th>City</th>
                              <th>Current Address</th>
                              <th>Profile Picture</th>
                              <th>Email</th>
                           </tr>
                        </tfoot>
                     </Table>
                  </div>
                  <Row className="align-items-center">
                     <Col md="6">
                        <div className="dataTables_info" role="status" aria-live="polite">
                           Showing {searchParams.page} to {Math.ceil(usersArray.length / searchParams.per_page)} of {usersArray.length} entries
                        </div>
                     </Col>
                     <Col md="6">
                        <div className="dataTables_paginate paging_simple_numbers">
                           <ul className="pagination">
                              <li className="paginate_button page-item previous" onClick={() => handlePagination(searchParams.page - 1)}>
                                 <Button disabled={searchParams.page <= 1} className="page-link">Previous</Button>
                              </li>
                              {[...Array(Math.ceil(usersArray.length / searchParams.per_page)).keys()].map(pageNum => (
                                 <li key={pageNum} className={`paginate_button page-item ${pageNum + 1 === searchParams.page ? 'active' : ''}`}>
                                    <Button onClick={() => handlePagination(pageNum + 1)} className="page-link">{pageNum + 1}</Button>
                                 </li>
                              ))}
                              <li className="paginate_button page-item next" onClick={() => handlePagination(searchParams.page + 1)}>
                                 <Button disabled={searchParams.page >= Math.ceil(usersArray.length / searchParams.per_page)} className="page-link">Next</Button>
                              </li>
                           </ul>
                        </div>
                     </Col>
                  </Row>
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};

export default TableData;
