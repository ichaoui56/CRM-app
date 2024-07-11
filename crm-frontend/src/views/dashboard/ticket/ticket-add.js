import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Image } from 'react-bootstrap';
import Card from '../../../components/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import imgsuccess from '../../../assets/images/pages/img-success.png';
import useCities from "../../../hooks/useCities";


const TicketAdd = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [show, AccountShow] = useState('A');
    const [technicians, setTechnicians] = useState([]); 
    const { cities } = useCities(); // Destructure cities from useCities hook

    const validateStep = (step) => {
        let newErrors = {};
        if (step === 'A') {
            if (!values.clientName) newErrors.clientName = 'Client name is required';
            if (!values.clientAddress) newErrors.clientAddress = 'Client address is required';
            if (!values.clientPhone) newErrors.clientPhone = 'Client phone number is required';
            if (!values.contactName) newErrors.contactName = 'Contact name is required';
            if (!values.contactEmail) newErrors.contactEmail = 'Contact email is required';
            if (!values.contactPhone) newErrors.contactPhone = 'Contact phone number is required';
            if (!values.clientCity) newErrors.clientCity = 'Client city is required';
            if (!values.clientCountry) newErrors.clientCountry = 'Client country is required';
        } else if (step === 'Account') {
            if (!values.modelName) newErrors.modelName = 'Model name is required';
            if (!values.comment) newErrors.comment = 'Comment is required';
            if (!values.tagNo) newErrors.tagNo = 'Tag number is required';
            if (!values.modelNo) newErrors.modelNo = 'Model number is required';
        } else if (step === 'Personal') {
            if (!values.technicianName) newErrors.technicianName = 'Technician name is required';
            if (!values.serviceType) newErrors.serviceType = 'Service type is required';
            if (!values.problemDescription) newErrors.problemDescription = 'Problem description is required';
        }
        return newErrors;
    };

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users');
                setTechnicians(response.data.data); 
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching technicians:', error);
            }
        };
        fetchTechnicians();
    }, []);

    const handleNext = async (step) => {
        const newErrors = validateStep(show);
        if (Object.keys(newErrors).length === 0) {
            if (step === 'Image') {
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/addTicket', values);
                    if (response.status === 201) {
                        AccountShow(step);
                        const MySwal = withReactContent(Swal);
                        MySwal.fire({
                            title: 'Success!',
                            text: 'Ticket Added Successfully',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }
                } catch (error) {
                    console.error('There was an error adding the ticket:', error);
                    const MySwal = withReactContent(Swal);
                    MySwal.fire({
                        title: 'Error!',
                        text: 'There was an error adding the ticket',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else {
                AccountShow(step);
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

        // Real-time validation
        setErrors({ ...errors, [name]: value ? '' : `${name.replace(/([A-Z])/g, ' $1')} is required` });
    };
    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Add Ticket</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Form id="form-wizard1" className="text-center mt-3" onSubmit={(e) => e.preventDefault()}>
                                    <ul id="top-tab-list" className="p-0 row list-inline">
                                        <li className={` ${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? ' active done' : ''} ${show === 'Account' ? ' active done' : ''} ${show === 'A' ? 'active' : ''} col-lg-3 col-md-6 text-start mb-2 active`} id="account">
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <div id="svg-container-1">
                                                        <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M9.59151 15.2068C13.2805 15.2068 16.4335 15.7658 16.4335 17.9988C16.4335 20.2318 13.3015 20.8068 9.59151 20.8068C5.90151 20.8068 2.74951 20.2528 2.74951 18.0188C2.74951 15.7848 5.88051 15.2068 9.59151 15.2068Z"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M9.59157 12.0198C7.16957 12.0198 5.20557 10.0568 5.20557 7.63476C5.20557 5.21276 7.16957 3.24976 9.59157 3.24976C12.0126 3.24976 13.9766 5.21276 13.9766 7.63476C13.9856 10.0478 12.0356 12.0108 9.62257 12.0198H9.59157Z"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path
                                                                d="M16.4829 10.8815C18.0839 10.6565 19.3169 9.28253 19.3199 7.61953C19.3199 5.98053 18.1249 4.62053 16.5579 4.36353"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path
                                                                d="M18.5952 14.7322C20.1462 14.9632 21.2292 15.5072 21.2292 16.6272C21.2292 17.3982 20.7192 17.8982 19.8952 18.2112"
                                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <span>Client/Contact</span>
                                            </Link>
                                        </li>
                                        <li id="personal" className={`${show === 'Personal' ? ' active done' : ''} ${show === 'Image' ? ' active done' : ''} ${show === 'Account' ? 'active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M15.7729 9.30504V6.27304C15.7729 4.18904 14.0839 2.50004 12.0009 2.50004C9.91694 2.49104 8.21994 4.17204 8.21094 6.25604V6.27304V9.30504"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M16.7422 21.0004H7.25778C4.90569 21.0004 3 19.0954 3 16.7454V11.2294C3 8.87937 4.90569 6.97437 7.25778 6.97437H16.7422C19.0943 6.97437 21 8.87937 21 11.2294V16.7454C21 19.0954 19.0943 21.0004 16.7422 21.0004Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <span>Computer</span>
                                            </Link>
                                        </li>
                                        <li id="payment" className={`${show === 'Image' ? ' active done' : ''} ${show === 'Personal' ? 'active' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.8496 4.25024V6.67024" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M13.8496 17.76V19.784" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M13.8496 14.3247V9.50366" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M18.7021 20C20.5242 20 22 18.5426 22 16.7431V14.1506C20.7943 14.1506 19.8233 13.1917 19.8233 12.001C19.8233 10.8104 20.7943 9.85039 22 9.85039L21.999 7.25686C21.999 5.45745 20.5221 4 18.7011 4H5.29892C3.47789 4 2.00104 5.45745 2.00104 7.25686L2 9.93485C3.20567 9.93485 4.17668 10.8104 4.17668 12.001C4.17668 13.1917 3.20567 14.1506 2 14.1506V16.7431C2 18.5426 3.4758 20 5.29787 20H18.7021Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <span>Service</span>
                                            </Link>
                                        </li>
                                        <li id="confirm" className={`${show === 'Image' ? ' active ' : ''} col-lg-3 col-md-6 mb-2 text-start`}>
                                            <Link to="#">
                                                <div className="iq-icon me-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span>Finish</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="col-5">
                                                <h2 className="steps">Step 1 - 4</h2>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Client Information: </h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Client Name:*</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.clientName ? 'is-invalid' : values.clientName ? 'is-valid' : ''}`}
                                                            name="clientName"
                                                            placeholder="Client name"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.clientName && <div className="invalid-feedback">{errors.clientName}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Address:*</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.clientAddress ? 'is-invalid' : values.clientAddress ? 'is-valid' : ''}`}
                                                            name="clientAddress"
                                                            placeholder="Client Address"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.clientAddress && <div className="invalid-feedback">{errors.clientAddress}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Phone Number:*</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.clientPhone ? 'is-invalid' : values.clientPhone ? 'is-valid' : ''}`}
                                                            name="clientPhone"
                                                            placeholder="Client Phone Number"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.clientPhone && <div className="invalid-feedback">{errors.clientPhone}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Contact Information: </h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Contact Name:*</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.contactName ? 'is-invalid' : values.contactName ? 'is-valid' : ''}`}
                                                            name="contactName"
                                                            placeholder="Contact name"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.contactName && <div className="invalid-feedback">{errors.contactName}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Email:*</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.contactEmail ? 'is-invalid' : values.contactEmail ? 'is-valid' : ''}`}
                                                            name="contactEmail"
                                                            placeholder="Contact Email"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.contactEmail && <div className="invalid-feedback">{errors.contactEmail}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Phone Number:*</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.contactPhone ? 'is-invalid' : values.contactPhone ? 'is-valid' : ''}`}
                                                            name="contactPhone"
                                                            placeholder="Contact Phone Number"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.contactPhone && <div className="invalid-feedback">{errors.contactPhone}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">City:*</label>
                                                        <select
                                                            className={`form-control ${
                                                                errors.clientCity ? "is-invalid" : values.clientCity ? "is-valid" : ""
                                                            }`}
                                                            name="clientCity"
                                                            value={values.clientCity}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select a city</option>
                                                            {cities.map((city) => (
                                                                <option key={city.id} value={city.name}>
                                                                    {city.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.clientCity && <div className="invalid-feedback">{errors.clientCity}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Country:*</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.clientCountry ? 'is-invalid' : values.clientCountry ? 'is-valid' : ''}`}
                                                            name="clientCountry"
                                                            placeholder="Client Country"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.clientCountry && <div className="invalid-feedback">{errors.clientCountry}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Next" onClick={() => handleNext('Account')}>Next</button>
                                    </fieldset>
                                    <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="col-5">
                                                <h2 className="steps">Step 2 - 4</h2>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Machine Information:</h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Model Name: *</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.modelName ? 'is-invalid' : values.modelName ? 'is-valid' : ''}`}
                                                            name="modelName"
                                                            placeholder="Model Name"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.modelName && <div className="invalid-feedback">{errors.modelName}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Reference: *</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.modelNo ? 'is-invalid' : values.modelNo ? 'is-valid' : ''}`}
                                                            name="modelNo"
                                                            placeholder="Model Number"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.modelNo && <div className="invalid-feedback">{errors.modelNo}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="form-label">Tag No: *</label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${errors.tagNo ? 'is-invalid' : values.tagNo ? 'is-valid' : ''}`}
                                                            name="tagNo"
                                                            placeholder="Tag Number"
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.tagNo && <div className="invalid-feedback">{errors.tagNo}</div>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Comment: *</label>
                                                        <textarea
                                                            className={`form-control ${errors.comment ? 'is-invalid' : values.comment ? 'is-valid' : ''}`}
                                                            name="comment"
                                                            placeholder="Give a comment"
                                                            onChange={handleInputChange}
                                                        ></textarea>
                                                        {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <button type="button" name="next" className="btn btn-primary next action-button float-end" value="Next" onClick={() => handleNext('Personal')}>Next</button>
                                        <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('A')}>Previous</button>
                                    </fieldset>
                                    <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-start">
                                            <div className="col-5">
                                                <h2 className="steps">Step 3 - 4</h2>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Service Information:</h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Technician Name: *</label>
                                                        <select
                                                            className={`form-control ${errors.technicianName ? 'is-invalid' : values.technicianName ? 'is-valid' : ''}`}
                                                            name="technicianName"
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select Technician</option>
                                                            {technicians.map((tech) => (
                                                                <option key={tech.id} value={`${tech.id}`}>
                                                                    {tech.first_name} {tech.last_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.technicianName && <div className="invalid-feedback">{errors.technicianName}</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Service Type: *</label>
                                                        <select
                                                            className={`form-control ${errors.serviceType ? 'is-invalid' : values.serviceType ? 'is-valid' : ''}`}
                                                            name="serviceType"
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select Service Type</option>
                                                            <option value="Maintenance">Maintenance</option>
                                                            <option value="Repair">Repair</option>
                                                            <option value="Installation">Installation</option>
                                                        </select>
                                                        {errors.serviceType && <div className="invalid-feedback">{errors.serviceType}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="form-label">Problem Description: *</label>
                                                        <textarea
                                                            className={`form-control ${errors.problemDescription ? 'is-invalid' : values.problemDescription ? 'is-valid' : ''}`}
                                                            name="problemDescription"
                                                            placeholder="Describe the problem"
                                                            onChange={handleInputChange}
                                                        ></textarea>
                                                        {errors.problemDescription && <div className="invalid-feedback">{errors.problemDescription}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" className="btn btn-primary next action-button float-end" onClick={() => handleNext('Image')}>Submit</button>
                                        <button type="button" name="previous" className="btn btn-dark previous action-button-previous float-end me-1" value="Previous" onClick={() => AccountShow('Account')}>Previous</button>
                                    </fieldset>
                                    <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                                        <div className="form-card text-center">
                                            <div className="row justify-content-center">
                                                <div className="col-7">
                                                    <h3 className="mb-4">Success!</h3>
                                                    <Image src={imgsuccess} className="img-fluid"  style={{ maxWidth: "100%", height: "300px" }} alt="Success" />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TicketAdd;
