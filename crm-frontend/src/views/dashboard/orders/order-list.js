import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import Card from '../../../components/Card';
import useOrders from '../../../hooks/useOrders';
import useTickets from '../../../hooks/useTicket';
import axios from 'axios';
import Swal from 'sweetalert2';
import printJS from 'print-js';


const OrderList = () => {
    const { orders, loading, error, setOrders } = useOrders();
    const { tickets } = useTickets();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [formData, setFormData] = useState({
        parts_ordered: '',
        diagnostic_content: '',
        ordered_at: '',
        arrived_at: '',
        status: '',
        ticket_id: '',
        technician_name: '',
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(6);

    // Calculate pagination indexes
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = (order) => {
        setCurrentOrder(order);
        setFormData({
            parts_ordered: order.parts_ordered,
            diagnostic_content: order.diagnostic_content,
            ordered_at: order.ordered_at,
            arrived_at: order.arrived_at,
            status: order.status,
            ticket_id: order.ticket_id,
            technician_name: order.technician ? `${order.technician.first_name} ${order.technician.last_name}` : '',
        });
        setShowEditModal(true);
    };

    const handlePrint = (id) => {
        axios
          .get(`http://127.0.0.1:8000/api/orderPdf/${id}`, { responseType: 'blob' })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            printJS(url);
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
          });
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/order/${currentOrder.id}`, formData);
            setShowEditModal(false);

            // Update local orders state to reflect the updated order
            const updatedOrders = orders.map(order => 
                order.id === currentOrder.id ? { ...order, ...formData } : order
            );
            setOrders(updatedOrders);

            Swal.fire({
                icon: 'success',
                title: 'Order updated successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while updating the order.',
            });
        }
    };

    const handleDelete = (order) => {
        setCurrentOrder(order);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/order/${currentOrder.id}`);

            // Update local orders state to remove the deleted order
            const updatedOrders = orders.filter(order => order.id !== currentOrder.id);
            setOrders(updatedOrders);

            setShowDeleteModal(false);
            Swal.fire({
                icon: 'success',
                title: 'Order deleted successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while deleting the order.',
            });
        }
    };

    return (
        <Row>
            <Col sm="12">
                <Card>
                    <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                            <h4 className="card-title">Order Information</h4>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {!loading && !error && currentOrders.length === 0 && <p>No orders found.</p>}
                        <div className="table-responsive border-bottom my-3">
                            <Table responsive striped id="datatable">
                                <thead>
                                    <tr>
                                        <th>Parts Ordered</th>
                                        <th>Diagnostic Content</th>
                                        <th>Ordered At</th>
                                        <th>Arrived At</th>
                                        <th>Status</th>
                                        <th>Ticket Id</th>
                                        <th>Technician Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                <div className="flex space-x-2">
                                                    {order.parts.map((part) => (
                                                        <img
                                                            key={part.id}
                                                            src={`http://127.0.0.1:8000/images/${part.part_picture}`}
                                                            alt={part.name}
                                                            style={{
                                                                width: "100px",
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </td>
                                            <td>{order.diagnostic_content}</td>
                                            <td>{order.ordered_at}</td>
                                            <td>{order.arrived_at}</td>
                                            <td>{order.status}</td>
                                            <td>{order.ticket_id}</td>
                                            <td>{order.technician ? `${order.technician.first_name} ${order.technician.last_name}` : ''}</td>
                                            <td>
                                                <div className="flex align-items-center list-user-action">
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => handlePrint(order.id)}
                                                    >
                                                        Print
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="m-1"
                                                        onClick={() => handleEdit(order)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleDelete(order)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        {/* Pagination */}
                        <div className="bd-example">
                            <nav aria-label="Another pagination example">
                                <ul className="pagination pagination-lg flex-wrap">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === Math.ceil(orders.length / ordersPerPage) ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDpsNumber">
                            <Form.Label>Diagnostic Content</Form.Label>
                            <Form.Control
                                type="text"
                                name="diagnostic_content"
                                value={formData.diagnostic_content}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="ordered">Ordered</option>
                                <option value="arrived">Arrived</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formTicketId">
                            <Form.Label>Ticket ID</Form.Label>
                            <Form.Control
                                as="select"
                                name="ticket_id"
                                value={formData.ticket_id}
                                onChange={handleChange}
                            >
                                <option value="">Select Ticket</option>
                                {tickets.map(ticket => (
                                    <option key={ticket.id} value={ticket.id}>
                                        {ticket.id} - {ticket.client_name}
                                    </option>
                                ))}
                            </Form.Control>
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
                    <Modal.Title>Delete Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this order?
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

export default OrderList;
