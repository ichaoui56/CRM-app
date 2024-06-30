import React, { Fragment, useState } from "react";
import FsLightbox from "fslightbox-react";
import { useParams } from "react-router-dom";
import useTicketDetails from "../../../hooks/useTicketDetails";
import {
  Row,
  Col,
  Image,
  Card,
  Tab,
  Spinner,
  Modal,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const TicketDetail = () => {
  const [toggler, setToggler] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showLaptopModal, setShowLaptopModal] = useState(false);

  const { id } = useParams();
  const { ticket, loading, error } = useTicketDetails(id);

  // Handle opening modals
  const openClientModal = () => setShowClientModal(true);
  const openContactModal = () => setShowContactModal(true);
  const openTicketModal = () => setShowTicketModal(true);
  const openLaptopModal = () => setShowLaptopModal(true);

  // Close modals
  const handleCloseModals = () => {
    setShowClientModal(false);
    setShowContactModal(false);
    setShowTicketModal(false);
    setShowLaptopModal(false);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <div>Error: {error.message}</div>;

  const orderedParts = ticket.orders.flatMap((order) => order.parts);
  const orderedPartsCount = orderedParts.length;

  const timelineItems = [
    {
      label: "Creation of ticket",
      date: ticket.created_at,
      borderColor: ticket.created_at ? "primary" : "gray",
      description: "The ticket was created.",
    },
    {
      label: "Diagnostic by the technician",
      date: ticket.diagnostic_date,
      borderColor: ticket.diagnostic_date ? "primary" : "gray",
      description: "The technician performed a diagnostic.",
    },
    {
      label: "Order the parts",
      date: ticket.orders.length > 0 ? ticket.orders[0].ordered_at : null,
      borderColor:
        ticket.orders.length > 0 && ticket.orders[0].ordered_at
          ? "success"
          : "gray",
      description: "Parts were ordered for the repair.",
    },
    {
      label: "Parts arrived",
      date: ticket.orders.length > 0 ? ticket.orders[0].arrived_at : null,
      borderColor:
        ticket.orders.length > 0 && ticket.orders[0].arrived_at
          ? "danger"
          : "gray",
      description: "The ordered parts arrived.",
    },
    {
      label: "Prepare the laptop",
      date: ticket.preparation_date,
      borderColor: ticket.preparation_date ? "warning" : "gray",
      description: "The laptop is being prepared for repair.",
    },
    {
      label: "Done",
      date: ticket.finished_date,
      borderColor: ticket.finished_date ? "success" : "gray",
      description: "The repair is complete.",
    },
  ];

  return (
    <Fragment>
      <FsLightbox
        toggler={toggler}
        sources={orderedParts.map(
          (part) => `http://127.0.0.1:8000/images/${part.part_picture}`
        )}
        slide={currentIndex + 1}
        type="image"
      />
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col lg="3">
            {/* Client Card */}
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Client</h4>
                  <Button variant="primary" size="sm" onClick={openClientModal}>
                    Edit
                  </Button>
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

            {/* Contact Card */}
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">Contact</h4>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={openContactModal}
                  >
                    Edit
                  </Button>
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
                  <h4 className="card-title">Ordered Parts</h4>
                </div>
                <span>{orderedPartsCount} Parts</span>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-card grid-cols-3">
                  {orderedParts.map((part, index) => (
                    <Link
                      key={part.id}
                      onClick={() => {
                        setCurrentIndex(index);
                        setToggler(!toggler);
                      }}
                      to="#"
                    >
                      <Image
                        src={`http://127.0.0.1:8000/images/${part.part_picture}`}
                        className="img-fluid bg-soft-info rounded"
                        alt={part.name}
                      />
                    </Link>
                  ))}
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
                        {timelineItems.map((item, index) => (
                          <li key={index}>
                            <div
                              className={`timeline-dots timeline-dot1 border-${item.borderColor} text-${item.borderColor}`}
                            ></div>
                            <h6 className="float-left mb-1">{item.label}</h6>
                            <small className="float-right mt-1">
                              {item.date
                                ? new Date(item.date).toLocaleDateString()
                                : "Pending"}
                            </small>
                            <div className="d-inline-block w-100">
                              <p>{item.description}</p>
                            </div>
                          </li>
                        ))}
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
                      {ticket.technician?.first_name}{" "}
                      {ticket.technician?.last_name}
                    </h3>
                    <p className="d-inline-block pl-3">- Technicien CBI/DELL</p>
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
                        {ticket.technician?.current_address} <br />
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
                  <Button variant="primary" size="sm" onClick={openTicketModal}>
                    Edit
                  </Button>
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
                  Service Type:{" "}
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
                  <Button variant="primary" size="sm" onClick={openLaptopModal}>
                    Edit
                  </Button>
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
                  Tag No:{" "}
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

      {/* Client Modal */}
      <Modal show={showClientModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="clientName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="clientName"
              defaultValue={ticket.contact.client?.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="clientPhone"
              defaultValue={ticket.contact.client?.phone}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="clientAddress"
              defaultValue={ticket.contact.client?.address}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClientChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="contactName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="contactName"
              defaultValue={ticket.contact?.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="contactEmail"
              defaultValue={ticket.contact?.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="contactPhone"
              defaultValue={ticket.contact?.phone}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="contactCity"
              defaultValue={ticket.contact?.city}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactCountry" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="contactCountry"
              defaultValue={ticket.contact?.country}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveContactChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Ticket Modal */}
      <Modal show={showTicketModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="serviceType" className="form-label">
              Service Type
            </label>
            <input
              type="text"
              className="form-control"
              id="serviceType"
              defaultValue={ticket.service_type}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="problemDescription" className="form-label">
              Problem Description
            </label>
            <textarea
              className="form-control"
              id="problemDescription"
              rows="3"
              defaultValue={ticket.problem_description}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control"
              id="status"
              defaultValue={ticket.status}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTicketChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Laptop Modal */}
      <Modal show={showLaptopModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Laptop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="modelNumber" className="form-label">
              Model Number
            </label>
            <input
              type="text"
              className="form-control"
              id="modelNumber"
              defaultValue={ticket.laptop?.model_number}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tagNumber" className="form-label">
              Tag Number
            </label>
            <input
              type="text"
              className="form-control"
              id="tagNumber"
              defaultValue={ticket.laptop?.tag}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="modelName" className="form-label">
              Model Name
            </label>
            <input
              type="text"
              className="form-control"
              id="modelName"
              defaultValue={ticket.laptop?.model_name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="laptopComment" className="form-label">
              Comment
            </label>
            <textarea
              className="form-control"
              id="laptopComment"
              rows="3"
              defaultValue={ticket.laptop?.comment}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveLaptopChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default TicketDetail;
