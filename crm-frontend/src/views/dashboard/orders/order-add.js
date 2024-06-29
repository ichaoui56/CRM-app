import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Row, Col, Form, Button, Modal, Card } from 'react-bootstrap';
import useTickets from '../../../hooks/useTicket';
import useParts from '../../../hooks/useParts';

const OrderAdd = () => {
    const [validated, setValidated] = useState(false);
    const { tickets, loading, error } = useTickets();
    const { parts, setParts } = useParts();
    const [formData, setFormData] = useState({
        dps_number: '',
        ups_tracking_number: '',
        ordered_at: '',
        arrived_at: '',
        status: 'ordered',
        ticket_id: '',
        part_ids: []
    });
    const [showPartsModal, setShowPartsModal] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData(prevState => ({
                    ...prevState,
                    part_ids: [...prevState.part_ids, value]
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    part_ids: prevState.part_ids.filter(id => id !== value)
                }));
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handlePartSelection = (partId) => {
        setFormData(prevState => {
            const { part_ids } = prevState;
            if (part_ids.includes(partId)) {
                console.log(part_ids);
                return {
                    ...prevState,
                    part_ids: part_ids.filter(id => id !== partId)
                };
            } else {
                console.log(part_ids);
                return {
                    ...prevState,
                    part_ids: [...part_ids, partId]
                };
            }
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        console.log(formData);
        axios.post('http://127.0.0.1:8000/api/order', formData)
            .then(response => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Order has been created successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Clear form inputs
                setFormData({
                    dps_number: '',
                    ups_tracking_number: '',
                    ordered_at: '',
                    status: 'ordered',
                    ticket_id: '',
                    part_ids: []
                });
                setValidated(false);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.errors) {
                    const errorMessages = Object.values(error.response.data.errors).flat().join('<br>');
                    Swal.fire({
                        title: 'Error!',
                        html: errorMessages,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error creating the order!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });

        setValidated(true);
    };

    return (
        <div>
            <Row>
                <Col xl="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-center">
                            <div className="header-title">
                                <h4 className="card-title">Add New Order</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <p className="d-flex justify-content-center">Here you can add a new order including selecting a ticket and multiple parts</p>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3 d-flex justify-content-center">
                                    <Col md="6">
                                        <Form.Group controlId="validationCustom01">
                                            <Form.Label>DPS Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="dps_number"
                                                value={formData.dps_number}
                                                onChange={handleChange}
                                                required
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md="6">
                                        <Form.Group controlId="validationCustom02">
                                            <Form.Label>UPS Tracking Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="ups_tracking_number"
                                                value={formData.ups_tracking_number}
                                                onChange={handleChange}
                                                required
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md="6">
                                        <Form.Group controlId="validationCustom06">
                                            <Form.Label>Ticket ID</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="ticket_id"
                                                value={formData.ticket_id}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a ticket</option>
                                                {tickets.map(ticket => (
                                                    <option key={ticket.id} value={ticket.id}>
                                                        {ticket.id}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md="6">
                                        <Button variant="primary" style={{ marginTop:'31px'}} onClick={() => setShowPartsModal(true)}>
                                            Select Parts
                                        </Button>
                                    </Col>
                                    <hr className='mb-3 mt-3' />
                                    <div className="col-12 d-flex justify-content-center">
                                        <Button variant="btn btn-primary" type="submit">Add Order</Button>
                                    </div>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showPartsModal} onHide={() => setShowPartsModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Select Parts</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Row>
            {parts.map(part => (
                <Col md="4" key={part.id}>
                    <Card
                        onClick={() => handlePartSelection(part.id)}
                        className={`mb-4 ${formData.part_ids.includes(part.id) ? 'selected' : ''}`}
                    >
                        <Card.Img variant="top" style={{ maxWidth: '100%', height: '100px', objectFit: 'cover' }} src={`http://127.0.0.1:8000/images/${part.part_picture}`} alt={part.name} />
                        <Card.Body>
                            <Form.Check
                                type="checkbox"
                                name="part_ids"
                                value={part.id}
                                checked={formData.part_ids.includes(part.id)}
                                onChange={() => handlePartSelection(part.id)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowPartsModal(false)}>
            Close
        </Button>
        <Button variant="primary" onClick={() => setShowPartsModal(false)}>
            Save Changes
        </Button>
    </Modal.Footer>
</Modal>

        </div>
    );
};

export default OrderAdd;
