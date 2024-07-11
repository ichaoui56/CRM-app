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
  Button,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import printJS from 'print-js';

const TicketDetail = () => {
  const [toggler, setToggler] = useState();
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ticket, loading, error, refetch } = useTicketDetails(id);

  if (loading) return <Spinner animation="border" />;
  if (error) return <div>Error: {error.message}</div>;

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/ticket/${id}`,
        {
          status: newStatus,
        }
      );

      if (!response.data) {
        throw new Error("Failed to update status");
      }

      await refetch();

      Swal.fire({
        icon: "success",
        title: "Status Updated!",
        text: `Ticket status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update ticket status",
      });
    }
  };

  const handleStatusSelect = (newStatus) => {
    handleStatusUpdate(newStatus);
  };

  const handleGeneratePdf = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/ticketPdf/${id}`,
        {
          responseType: "blob",
        }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl); // Open the PDF in a new window
    } catch (error) {
      console.error("Error generating PDF:", error);
      Swal.fire({
        icon: "error",
        title: "PDF Generation Failed",
        text: error,
      });
    }
  };

  const handlePrintPdf = () => {
    axios
      .get(`http://127.0.0.1:8000/api/ticketPdf/${id}`, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        printJS(url);
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  const statusOptions = ["created", "diagnostic", "in_repair", "finished"];
  const orderedParts = ticket.orders.flatMap((order) => order.parts);
  const orderedPartsCount = orderedParts.length;

  const timelineItems = [
    {
      label: "Creation of ticket",
      date: ticket.created_at,
      borderColor: ticket.created_at ? "success" : "danger",
      description: "The ticket was created.",
    },
    {
      label: "Diagnostic by the technician",
      date: ticket.diagnostic_date,
      borderColor: ticket.diagnostic_date ? "success" : "danger",
      description: "The technician performed a diagnostic.",
    },
    {
      label: "Order the parts",
      date: ticket.orders.length > 0 ? ticket.orders[0].ordered_at : null,
      borderColor:
        ticket.orders.length > 0 && ticket.orders[0].ordered_at
          ? "success"
          : "danger",
      description: "Parts were ordered for the repair.",
    },
    {
      label: "Parts arrived",
      date: ticket.orders.length > 0 ? ticket.orders[0].arrived_at : null,
      borderColor:
        ticket.orders.length > 0 && ticket.orders[0].arrived_at
          ? "success"
          : "danger",
      description: "The ordered parts arrived.",
    },
    {
      label: "Prepare the laptop",
      date: ticket.preparation_date,
      borderColor: ticket.preparation_date ? "success" : "danger",
      description: "The laptop is being prepared for repair.",
    },
    {
      label: "Done",
      date: ticket.finished_date,
      borderColor: ticket.finished_date ? "success" : "danger",
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
            <div
              className="d-flex align-items-center position-absolute"
              style={{ top: "150px", right: "200px" }}
            >
              <Button
                className="d-flex align-items-center position-absolute"
                style={{ color: "white" }}
                onClick={handlePrintPdf}
              >
                <svg
                  width="20"
                  className="me-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8251 15.2171H12.1748C14.0987 15.2171 15.731 13.985 16.3054 12.2764C16.3887 12.0276 16.1979 11.7713 15.9334 11.7713H14.8562C14.5133 11.7713 14.2362 11.4977 14.2362 11.16C14.2362 10.8213 14.5133 10.5467 14.8562 10.5467H15.9005C16.2463 10.5467 16.5263 10.2703 16.5263 9.92875C16.5263 9.58722 16.2463 9.31075 15.9005 9.31075H14.8562C14.5133 9.31075 14.2362 9.03619 14.2362 8.69849C14.2362 8.35984 14.5133 8.08528 14.8562 8.08528H15.9005C16.2463 8.08528 16.5263 7.8088 16.5263 7.46728C16.5263 7.12575 16.2463 6.84928 15.9005 6.84928H14.8562C14.5133 6.84928 14.2362 6.57472 14.2362 6.23606C14.2362 5.89837 14.5133 5.62381 14.8562 5.62381H15.9886C16.2483 5.62381 16.4343 5.3789 16.3645 5.13113C15.8501 3.32401 14.1694 2 12.1748 2H11.8251C9.42172 2 7.47363 3.92287 7.47363 6.29729V10.9198C7.47363 13.2933 9.42172 15.2171 11.8251 15.2171Z"
                    fill="currentColor"
                  ></path>
                  <path
                    opacity="0.4"
                    d="M19.5313 9.82568C18.9966 9.82568 18.5626 10.2533 18.5626 10.7823C18.5626 14.3554 15.6186 17.2627 12.0005 17.2627C8.38136 17.2627 5.43743 14.3554 5.43743 10.7823C5.43743 10.2533 5.00345 9.82568 4.46872 9.82568C3.93398 9.82568 3.5 10.2533 3.5 10.7823C3.5 15.0873 6.79945 18.6413 11.0318 19.1186V21.0434C11.0318 21.5715 11.4648 22.0001 12.0005 22.0001C12.5352 22.0001 12.9692 21.5715 12.9692 21.0434V19.1186C17.2006 18.6413 20.5 15.0873 20.5 10.7823C20.5 10.2533 20.066 9.82568 19.5313 9.82568Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Generate Pdf
              </Button>
            </div>
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
                <div className="d-flex align-items-center">
                  Status:
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-basic"
                      style={{ textDecoration: "none", color: "#00bcd4" }}
                    >
                      {ticket.status}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {statusOptions.map((status, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => handleStatusSelect(status)}
                        >
                          {status}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
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
    </Fragment>
  );
};

export default TicketDetail;
