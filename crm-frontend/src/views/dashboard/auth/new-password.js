import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'; // Import useLocation for retrieving query params
import Card from '../../../components/Card';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios for making HTTP requests

// img
import auth2 from '../../../assets/images/auth/02.png';
import Logo from '../../../components/partials/components/logo';

const Newpw = () => {
   const navigate = useNavigate();
   const { token } = useParams(); // Retrieve token from URL params
   const location = useLocation(); // Get the current location
   const [password, setPassword] = useState('');
   const [passwordConfirmation, setPasswordConfirmation] = useState('');
   const [email, setEmail] = useState('');
   const [errors, setErrors] = useState({}); // State for handling errors

   useEffect(() => {
      const searchParams = new URLSearchParams(location.search); // Parse query parameters
      const emailParam = searchParams.get('email');
      setEmail(emailParam || ''); // Set the email state
   }, [location.search]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await axios.post('http://127.0.0.1:8000/api/reset-password', {
            token,
            email,
            password,
            password_confirmation: passwordConfirmation,
         });
      
         if (response.status === 200) {
            Swal.fire({
               title: 'Success!',
               text: 'Password has been reset successfully.',
               icon: 'success',
               confirmButtonText: 'OK'
            });
            navigate('/auth/sign-in');
         } else {
            // Handle error (e.g., show a message to the user)
            console.error('Error resetting password:', response.data);
         }
      } catch (error) {
         // Handle validation errors
         if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors);
         } else {
            console.error('Error resetting password:', error);
         }
      }
      
   };

   return (
      <>
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white vh-100">
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth2} className="img-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
               <Col md="6" className="p-0">
                  <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                     <Card.Body>
                     <div className='d-flex justify-content-center'>
                        <Logo />
                     </div>
                        <h2 className="mb-2">New Password</h2>
                        <p>Enter your new password and confirm password</p>
                        <Form onSubmit={handleSubmit}>
                           <Row>
                              <Col lg="12" className="col-lg-12">
                                 <Form.Group className="floating-label">
                                    <Form.Label htmlFor="password" className="form-label">Password</Form.Label>
                                    <Form.Control
                                       type="password"
                                       className="form-control"
                                       id="password"
                                       aria-describedby="password"
                                       placeholder=" "
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && (
                                       <Alert variant="danger" className="mt-2">
                                          {errors.password.join(', ')}
                                       </Alert>
                                    )}
                                 </Form.Group>
                              </Col>
                              <Col lg="12" className="col-lg-12">
                                 <Form.Group className="floating-label">
                                    <Form.Label htmlFor="passwordConfirmation" className="form-label">Confirm Password</Form.Label>
                                    <Form.Control
                                       type="password"
                                       className="form-control"
                                       id="passwordConfirmation"
                                       aria-describedby="passwordConfirmation"
                                       placeholder=" "
                                       value={passwordConfirmation}
                                       onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    />
                                    {errors.password_confirmation && (
                                       <Alert variant="danger" className="mt-2">
                                          {errors.password_confirmation.join(', ')}
                                       </Alert>
                                    )}
                                 </Form.Group>
                              </Col>
                           </Row>
                           <Button className="mt-3" type="submit" variant="primary">Reset</Button>
                        </Form>
                     </Card.Body>
                  </Card>
                  <div className="sign-bg sign-bg-right">
                     <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.05">
                           <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                           <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                           <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                           <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                        </g>
                     </svg>
                  </div>
               </Col>
            </Row>
         </section>
      </>
   );
};

export default Newpw;
