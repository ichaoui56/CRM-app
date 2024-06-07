import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { Link } from 'react-router-dom';

import avatars1 from '../../../assets/images/avatars/01.png';
import avatars2 from '../../../assets/images/avatars/avtar_1.png';
import avatars3 from '../../../assets/images/avatars/avtar_2.png';
import avatars4 from '../../../assets/images/avatars/avtar_3.png';
import avatars5 from '../../../assets/images/avatars/avtar_4.png';
import avatars6 from '../../../assets/images/avatars/avtar_5.png';

const UserAdd = () => {
   const [validated, setValidated] = useState(false);
   const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      city: '',
      address: '',
      phone: '',
      password: '',
      password_confirmation: '',
      profile_picture: null,
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

      axios.post('http://127.0.0.1:8000/api/user', data, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      })
         .then(response => {
            Swal.fire({
               title: 'Success!',
               text: 'User has been created successfully.',
               icon: 'success',
               confirmButtonText: 'OK'
            });

            // Clear form inputs
            setFormData({
               first_name: '',
               last_name: '',
               email: '',
               city: '',
               address: '',
               phone_number: '',
               password: '',
               password_confirmation: '',
               profile_picture: null,
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
                  text: 'There was an error creating the user!',
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
                  <Card.Header className="d-flex justify-content-between">
                     <div className="header-title">
                        <h4 className="card-title">Add User Information</h4>
                     </div>
                  </Card.Header>
                  <Card.Body>
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh finibus leo</p>
                     <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="form-group d-flex justify-content-center flex-col">
                           <div className="profile-img-edit position-relative">
                              <Image className="theme-color-default-img profile-pic rounded avatar-100" src={avatars1} alt="profile-pic" />
                              <Image className="theme-color-purple-img profile-pic rounded avatar-100" src={avatars2} alt="profile-pic" />
                              <Image className="theme-color-blue-img profile-pic rounded avatar-100" src={avatars3} alt="profile-pic" />
                              <Image className="theme-color-green-img profile-pic rounded avatar-100" src={avatars5} alt="profile-pic" />
                              <Image className="theme-color-yellow-img profile-pic rounded avatar-100" src={avatars6} alt="profile-pic" />
                              <Image className="theme-color-pink-img profile-pic rounded avatar-100" src={avatars4} alt="profile-pic" />
                              <div className="upload-icone bg-primary">
                                 <svg className="upload-button" width="14" height="14" viewBox="0 0 24 24">
                                    <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                 </svg>
                                 <Form.Control
                                    className=""
                                    type="file"
                                    accept="image/*"
                                    name="profile_picture"
                                    onChange={handleChange}
                                 />
                              </div>
                           </div>
                        </Form.Group>
                        <Row className="mb-3">
                           <Col md="6">
                              <Form.Label htmlFor="validationCustom01">First name</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="first_name"
                                 value={formData.first_name}
                                 onChange={handleChange}
                                 id="validationCustom01"
                                 required
                              />
                              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                           </Col>
                           <Col md="6">
                              <Form.Label htmlFor="validationCustom02">Last name</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="last_name"
                                 value={formData.last_name}
                                 onChange={handleChange}
                                 id="validationCustom02"
                                 required
                              />
                              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                           </Col>
                           <Col md="6">
                              <Form.Label htmlFor="validationCustomUsername01">Email</Form.Label>
                              <div className="input-group has-validation">
                                 <span className="input-group-text" id="inputGroupPrepend">@</span>
                                 <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    id="validationCustomUsername01"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                 />
                                 <Form.Control.Feedback type="invalid">
                                    Please choose an email.
                                 </Form.Control.Feedback>
                              </div>
                           </Col>
                           <Col md="6">
                              <Form.Label htmlFor="validationCustom03">City</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="city"
                                 value={formData.city}
                                 onChange={handleChange}
                                 id="validationCustom03"
                                 required
                              />
                              <Form.Control.Feedback type="invalid">
                                 Please provide a valid city.
                              </Form.Control.Feedback>
                           </Col>
                           <Col md="6">
                              <Form.Label htmlFor="validationCustom04">Current Address</Form.Label>
                              <Form.Control
                                 type="text"
                                 name="address"
                                 value={formData.address}
                                 onChange={handleChange}
                                 id="validationCustom04"
                                 required
                              />
                              <Form.Control.Feedback type="invalid">
                                 Please provide a valid address.
                              </Form.Control.Feedback>
                           </Col>
                           <Col md="6" className="mb-3">
                              <Form.Label htmlFor="validationCustom05">Phone number</Form.Label>
                              <Form.Control
                                 type="number"
                                 name="phone_number"
                                 value={formData.phone_number}
                                 onChange={handleChange}
                                 id="validationCustom05"
                                 required
                              />
                              <Form.Control.Feedback type="invalid">
                                 Please provide a valid phone number.
                              </Form.Control.Feedback>
                           </Col>
                           <hr />
                           <h5 className="mb-3">Security</h5>
                           <div className="row">
                              <Form.Group className="col-md-6 form-group">
                                 <Form.Label htmlFor="pass">Password:</Form.Label>
                                 <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    id="pass"
                                    placeholder="Password"
                                    required
                                 />
                              </Form.Group>
                              <Form.Group className="col-md-6 form-group">
                                 <Form.Label htmlFor="rpass">Repeat Password:</Form.Label>
                                 <Form.Control
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    id="rpass"
                                    placeholder="Repeat Password"
                                    required
                                 />
                              </Form.Group>
                           </div>
                           <div className="col-12">
                              <Button variant="btn btn-primary" type="submit">Create User</Button>
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

export default UserAdd;
