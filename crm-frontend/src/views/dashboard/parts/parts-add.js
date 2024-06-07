import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { Link } from 'react-router-dom';

const PartAdd = () => {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        part_name: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
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

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        axios.post('http://127.0.0.1:8000/api/part', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Part has been created successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Clear form inputs
                setFormData({
                    part_name: ''
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
                        text: 'There was an error creating the part!',
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
                                <h4 className="card-title">Add New Parts</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <p className="d-flex justify-content-center">Here you can add all parts needed for the creation of the ticktes</p>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3 d-flex justify-content-center">
                                    <Col md="6">
                                        <Form.Control
                                            type="text"
                                            name="part_name"
                                            value={formData.part_name}
                                            onChange={handleChange}
                                            id="validationCustom01"
                                            required
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Col>
                                    <hr className='mb-3 mt-3' />
                                    <div className="col-12 d-flex justify-content-center">
                                        <Button variant="btn btn-primary" type="submit">Add Part</Button>
                                    </div>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PartAdd;
