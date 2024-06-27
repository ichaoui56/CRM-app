import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import useCities from "../../../hooks/useCities";
import useUsers from "../../../hooks/useUsers";
import axios from "axios";
import Swal from "sweetalert2";

const TableData = () => {
  const { users, loading, error, setUsers } = useUsers();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    city: "",
    current_address: "",
    email: ""
  });

  const { cities } = useCities();

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      city: user.city,
      current_address: user.current_address,
      email: user.email
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${currentUser.id}`, formData);
      setUsers(prevUsers => prevUsers.map(user => user.id === currentUser.id ? { ...user, ...formData } : user));
      setShowEditModal(false);
      Swal.fire({
        icon: "success",
        title: "User updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the user.",
      });
    }
  };

  const handleDelete = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${currentUser.id}`);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== currentUser.id));
      setShowDeleteModal(false);
      Swal.fire({
        icon: "success",
        title: "User deleted successfully!",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting the user.",
      });
    }
  };

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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && users.length === 0 && <p>No users found.</p>}
            <div className="table-responsive border-bottom my-3">
              <Table responsive striped id="datatable">
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>City</th>
                    <th>Current Address</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="d-flex justify-content-center">
                        <img
                          src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                          alt="Profile"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover"
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/path/to/fallback-image.png";
                          }}
                        />
                      </td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.phone_number}</td>
                      <td>{user.city}</td>
                      <td>{user.current_address}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="flex align-items-center list-user-action">
                          <Link
                            className="btn btn-sm btn-icon btn-warning m-1"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            data-original-title="Edit"
                            to="#"
                            onClick={() => handleEdit(user)}
                          >
                            <span className="btn-inner">
                              <svg
                                width="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M15.1655 4.60254L19.7315 9.16854"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </Link>
                          <Link
                            className="btn btn-sm btn-icon btn-danger"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            data-original-title="Delete"
                            to="#"
                            onClick={() => handleDelete(user)}
                          >
                            <span className="btn-inner">
                              <svg
                                width="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="currentColor"
                              >
                                <path
                                  d="M19.3248 9.89551C19.3248 9.89551 18.8338 16.2005 18.5398 19.0655C18.3888 20.5185 17.4798 21.3755 16.0068 21.4015C13.4798 21.4475 10.9468 21.4505 8.42077 21.3965C6.99277 21.3655 6.09677 20.5005 5.94977 19.0685C5.65377 16.1855 5.16477 9.89551 5.16477 9.89551"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M20.708 6.23975H3.78198"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M17.4404 6.23975C16.6554 6.23975 15.9804 5.68475 15.8254 4.91575L15.5824 3.69975C15.4574 3.10875 14.9394 2.71075 14.3314 2.71075H10.1584C9.54943 2.71075 9.03243 3.10875 8.90743 3.69975L8.66443 4.91575C8.50943 5.68475 7.83443 6.23975 7.04943 6.23975"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                as="select"
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                {cities.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="currentAddress">
              <Form.Label>Current Address</Form.Label>
              <Form.Control
                type="text"
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default TableData;
