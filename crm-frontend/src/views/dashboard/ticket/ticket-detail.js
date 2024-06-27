import React, { Fragment, useState } from "react";
import FsLightbox from "fslightbox-react";
import { useParams } from "react-router-dom";
import useTicketDetails from "../../../hooks/useTicketDetails";
import { Row, Col, Image, Card, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import images
import avatars11 from "../../../assets/images/avatars/01.png";
import icon4 from "../../../assets/images/icons/04.png";
import shap2 from "../../../assets/images/shapes/02.png";
import icon8 from "../../../assets/images/icons/08.png";
import shap4 from "../../../assets/images/shapes/04.png";
import icon2 from "../../../assets/images/icons/02.png";
import shap6 from "../../../assets/images/shapes/06.png";
import icon5 from "../../../assets/images/icons/05.png";
import icon1 from "../../../assets/images/icons/01.png";

const TicketDetail = () => {
  const [toggler, setToggler] = useState();
  const { id } = useParams();
  const { ticket, loading, error } = useTicketDetails(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Fragment>
      <FsLightbox
        toggler={toggler}
        sources={[
          icon4,
          shap2,
          icon8,
          shap4,
          icon2,
          shap6,
          icon5,
          shap4,
          icon1,
        ]}
      />
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col lg="3">
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Client</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-1">
                  Name: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact.client?.name}
                  </Link>
                </div>
                <div className="mb-1">
                  Phone: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact.client?.phone}
                  </Link>
                </div>
                <div>
                  Location: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact.client?.address}
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Contact</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-1">
                  Name: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact?.name}
                  </Link>
                </div>
                <div className="mb-1">
                  Email: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact?.email}
                  </Link>
                </div>
                <div className="mb-1">
                  Phone: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact?.phone}
                  </Link>
                </div>
                <div>
                  City: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact?.city}
                  </Link>
                </div>
                <div>
                  Country: <br />
                  <Link to="#" className="ms-3">
                    {ticket.contact?.country}
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className="d-flex align-items-center justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Parts</h4>
                </div>
                <span>132 pics</span>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-card grid-cols-3">
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={icon4}
                      className="img-fluid bg-soft-info rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={shap2}
                      className="img-fluid bg-soft-primary rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={icon8}
                      className="img-fluid bg-soft-info rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={shap4}
                      className="img-fluid bg-soft-primary rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={icon2}
                      className="img-fluid bg-soft-warning rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={shap6}
                      className="img-fluid bg-soft-primary rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link to="#">
                    <Image
                      onClick={() => setToggler(!toggler)}
                      src={icon5}
                      className="img-fluid bg-soft-danger rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={shap4}
                      className="img-fluid bg-soft-primary rounded"
                      alt="profile-image"
                    />
                  </Link>
                  <Link onClick={() => setToggler(!toggler)} to="#">
                    <Image
                      src={icon1}
                      className="img-fluid bg-soft-success rounded"
                      alt="profile-image"
                    />
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="5">
            <Tab.Content className="profile-content">
              <Tab.Pane eventKey="first" id="profile-feed">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Activity</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="iq-timeline0 m-0 d-flex align-items-center justify-content-between position-relative">
                      <ul className="list-inline p-0 m-0">
                        <li>
                          <div className="timeline-dots timeline-dot1 border-primary text-primary"></div>
                          <h6 className="float-left mb-1">Creation of ticket</h6>
                          <small className="float-right mt-1">
                            24 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 text-success"></div>
                          <h6 className="float-left mb-1">
                          Diagnostic by the technicien
                          </h6>
                          <small className="float-right mt-1">
                            23 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 border-danger text-danger"></div>
                          <h6 className="float-left mb-1">Order the parts</h6>
                          <small className="float-right mt-1">
                            20 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans{" "}
                              <Link to="#">gummi bears</Link>gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 border-primary text-primary"></div>
                          <h6 className="float-left mb-1">Parts arrived</h6>
                          <small className="float-right mt-1">
                            19 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-dots timeline-dot1 border-warning text-warning"></div>
                          <h6 className="float-left mb-1">Prepare the laptop</h6>
                          <small className="float-right mt-1">
                            15 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                        <li>
                        <div className="timeline-dots timeline-dot1 border-success text-success"></div>
                          <h6 className="float-left mb-1">Done</h6>
                          <small className="float-right mt-1">
                            15 November 2019
                          </small>
                          <div className="d-inline-block w-100">
                            <p>
                              Bonbon macaroon jelly beans gummi bears jelly
                              lollipop apple
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col lg="4">
          <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Technicien</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="text-center">
                  <div className="user-profile">
                    <Image
                     style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={`http://127.0.0.1:8000/storage/${ticket.technician.profile_picture}`}
                      alt="profile-pic"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="d-inline-block">
                      {ticket.technician?.first_name} {ticket.technician?.last_name}
                    </h3>
                    <p className="d-inline-block pl-3">
                      - Technicien CBI/DELL
                    </p>
                    <div className="mb-1">
                      Email:{" "}
                      <Link to="#" className="ms-3">
                        {ticket.technician?.email}
                      </Link>
                    </div>
                    <div className="mb-1">
                      Phone:{" "}
                      <Link to="#" className="ms-3">
                        {ticket.technician?.phone_number}
                      </Link>
                    </div>
                    <div>
                      Location: 
                      <Link to="#" className="ms-3">
                        {ticket.technician?.current_address} <br/>
                        {ticket.technician?.city}
                      </Link>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Ticket</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-1">
               Ticket Id:{" "}
                  <Link to="#" className="ms-3">
                    {ticket.id}
                  </Link>
                </div>
                <div className="mb-1">
                Service Type:{ " "}
                  <Link to="#" className="ms-3">
                    {ticket.service_type}
                  </Link>
                </div>
                <div>
                 Status:
                  <Link to="#" className="ms-3">
                    {ticket.status}
                  </Link>
                </div>
                <div>
                 Problem Description:
                  <Link to="#" className="ms-3">
                    {ticket.problem_description}
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Laptop</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-1">
                Model No:{" "}
                  <Link to="#" className="ms-3">
                    {ticket.laptop?.model_number}
                  </Link>
                </div>
                <div className="mb-1">
                Tag No:{ " "}
                  <Link to="#" className="ms-3">
                    {ticket.laptop?.tag}
                  </Link>
                </div>
                <div>
                  Model Name:
                  <Link to="#" className="ms-3">
                    {ticket.laptop?.model_name}
                  </Link>
                </div>
                <div>
                 Comment:
                  <Link to="#" className="ms-3">
                    {ticket.laptop?.comment}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
};

export default TicketDetail;
