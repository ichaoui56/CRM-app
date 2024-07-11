import React, { useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Card from "../../../components/Card";
import Swal from "sweetalert2";
import axios from "axios";
import useParts from "../../../hooks/useParts";
import noDataImage from "../../../assets/images/no-data.avif"; // Adjust the path as necessary

const PartsList = () => {
  const { parts, loading, error, setParts } = useParts();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [image, setImage] = useState(null); // State for the selected image

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleEdit = async () => {
    if (!selectedPart || !selectedPart.name ) {
      console.error("Selected part data is incomplete");
      return;
    }

    let base64Image = "";
    if (image) {
      base64Image = await convertImageToBase64(image);
    }

    const payload = {
      name: selectedPart.name,
      part_picture: base64Image,
    };

    console.log("Selected Part:", selectedPart);
    console.log("Payload:", payload);

    axios
      .put(`http://127.0.0.1:8000/api/parts/${selectedPart.id}`, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          Swal.fire("Success", "Part updated successfully", "success");
          setShowEditModal(false);
          setParts((prevParts) =>
            prevParts.map((part) =>
              part.id === selectedPart.id
                ? { ...part, ...response.data.part }
                : part
            )
          );
        } else {
          console.error("Failed to update part:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error updating part:", error);
        Swal.fire(
          "Error",
          `Failed to update part: ${error.response.data.errors}`,
          "error"
        );
      });
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/parts/${selectedPart.id}`)
      .then((response) => {
        if (response.status === 204) {
          // Remove the deleted part from the state
          setParts(parts.filter((part) => part.id !== selectedPart.id));
          setShowDeleteModal(false);
          Swal.fire("Success", "Part deleted successfully", "success");
        } else {
          console.error("Failed to delete part:", response.status);
        }
      })
      .catch((error) => {
        Swal.fire("Error", `Failed to delete part: ${error}`, "error");
        console.error("Error deleting part:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPart((prevPart) => ({
      ...prevPart,
      [name]: value,
    }));
    console.log(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Row>
      {parts.length === 0 ? (
        <Col className="text-center">
          <img
            src={noDataImage}
            alt="No Data Available"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <p>No parts available</p>
        </Col>
      ) : (
        parts.map((part) => (
          <Col key={part.id} md="4">
            <Card className="mb-4 shadow-sm">
              <div className="card-image-container">
                <img
                  src={`http://127.0.0.1:8000/images/${part.part_picture}`}
                  alt={part.name}
                  style={{ maxWidth: "100%", height: "300px" }}
                />
              </div>
              <Card.Body>
                <h5 className="card-title">
                  {part.name.length > 26
                    ? `${part.name.substring(0, 26)}...`
                    : part.name}
                </h5>

                <div className="d-flex align-items-center justify-content-start">
                  <div id="dual-svg-container-27">
                    <svg
                      width="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 16.8701V9.25708H21V16.9311C21 20.0701 19.0241 22.0001 15.8628 22.0001H8.12733C4.99561 22.0001 3 20.0301 3 16.8701ZM7.95938 14.4101C7.50494 14.4311 7.12953 14.0701 7.10977 13.6111C7.10977 13.1511 7.46542 12.7711 7.91987 12.7501C8.36443 12.7501 8.72997 13.1011 8.73985 13.5501C8.7596 14.0111 8.40395 14.3911 7.95938 14.4101ZM12.0198 14.4101C11.5653 14.4311 11.1899 14.0701 11.1701 13.6111C11.1701 13.1511 11.5258 12.7711 11.9802 12.7501C12.4248 12.7501 12.7903 13.1011 12.8002 13.5501C12.82 14.0111 12.4643 14.3911 12.0198 14.4101ZM16.0505 18.0901C15.596 18.0801 15.2305 17.7001 15.2305 17.2401C15.2206 16.7801 15.5862 16.4011 16.0406 16.3911H16.0505C16.5148 16.3911 16.8902 16.7711 16.8902 17.2401C16.8902 17.7101 16.5148 18.0901 16.0505 18.0901ZM11.1701 17.2401C11.1899 17.7001 11.5653 18.0611 12.0198 18.0401C12.4643 18.0211 12.82 17.6411 12.8002 17.1811C12.7903 16.7311 12.4248 16.3801 11.9802 16.3801C11.5258 16.4011 11.1701 16.7801 11.1701 17.2401ZM7.09989 17.2401C7.11965 17.7001 7.49506 18.0611 7.94951 18.0401C8.39407 18.0211 8.74973 17.6411 8.72997 17.1811C8.72009 16.7311 8.35456 16.3801 7.90999 16.3801C7.45554 16.4011 7.09989 16.7801 7.09989 17.2401ZM15.2404 13.6011C15.2404 13.1411 15.596 12.7711 16.0505 12.7611C16.4951 12.7611 16.8507 13.1201 16.8705 13.5611C16.8804 14.0211 16.5247 14.4011 16.0801 14.4101C15.6257 14.4201 15.2503 14.0701 15.2404 13.6111V13.6011Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        d="M3.00293 9.25699C3.01577 8.66999 3.06517 7.50499 3.15803 7.12999C3.63224 5.02099 5.24256 3.68099 7.54442 3.48999H16.4555C18.7376 3.69099 20.3677 5.03999 20.8419 7.12999C20.9338 7.49499 20.9832 8.66899 20.996 9.25699H3.00293Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8.30465 6.59C8.73934 6.59 9.06535 6.261 9.06535 5.82V2.771C9.06535 2.33 8.73934 2 8.30465 2C7.86996 2 7.54395 2.33 7.54395 2.771V5.82C7.54395 6.261 7.86996 6.59 8.30465 6.59Z"
                        fill="currentColor"
                      />
                      <path
                        d="M15.6953 6.59C16.1201 6.59 16.456 6.261 16.456 5.82V2.771C16.456 2.33 16.1201 2 15.6953 2C15.2606 2 14.9346 2.33 14.9346 2.771V5.82C14.9346 6.261 15.2606 6.59 15.6953 6.59Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="card-text">{formatDate(part.created_at)}</p>
                </div>
               
                <div className="d-flex justify-content-between">
                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedPart(part);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedPart({
                        id: part.id,
                        name: part.name,
                      
                        part_picture: part.part_picture,
                      });
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Part</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this part?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Part</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPartName">
              <Form.Label>Part Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedPart?.name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPartPicture">
              <Form.Label>Part Picture</Form.Label>
              <Form.Control
                type="file"
                name="part_picture"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default PartsList;
