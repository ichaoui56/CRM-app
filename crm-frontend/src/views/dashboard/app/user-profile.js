import React, { Fragment, useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { Row, Col, Image, Tab, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Correct import for Link
import UserData from '../../../hooks/useUserData';

// img imports
import icon1 from '../../../assets/images/icons/01.png';
import icon2 from '../../../assets/images/icons/02.png';
import icon3 from '../../../assets/images/icons/03.png';
import icon4 from '../../../assets/images/icons/04.png';
import icon8 from '../../../assets/images/icons/08.png';
import icon6 from '../../../assets/images/icons/06.png';
import icon7 from '../../../assets/images/icons/07.png';
import icon5 from '../../../assets/images/icons/05.png';
import shap2 from '../../../assets/images/shapes/02.png';
import shap4 from '../../../assets/images/shapes/04.png';
import shap6 from '../../../assets/images/shapes/06.png';

const UserProfile = () => {
  const [toggler, setToggler] = useState(false);
  const { user, setUser } = UserData();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <FsLightbox toggler={toggler} sources={[icon4, shap2, icon8, shap4, icon2, shap6, icon5, shap4, icon1]} />
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col lg="12">
            <Card>
              <Card.Body>
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-wrap align-items-center">
                    <div className="profile-img position-relative me-3 mb-3 mb-lg-0 profile-logo profile-logo1">
                      <Image
                        className="theme-color-default-img img-fluid rounded-pill avatar-100"
                        src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        alt="profile-pic"
                      />
                    </div>
                    <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                      <h4 className="me-2 h4">{`${user.first_name} ${user.last_name}`}</h4>
                      <span> - Technician DELL/CBI</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="6">
            <Tab.Content className="profile-content">
              <Tab.Pane eventKey="first" id="profile-profile">
                <Card>
                  <Card.Header>
                    <div className="header-title">
                      <h4 className="card-title">Profile</h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="text-center">
                      <div className="user-profile">
                        <Image
                          className="theme-color-default-img rounded-pill avatar-130 img-fluid"
                          src={`http://127.0.0.1:8000/storage/${user.profile_picture}`}
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          alt="profile-pic"
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className="d-inline-block">{`${user.first_name} ${user.last_name}`}</h3>
                        <p className="d-inline-block pl-3"> - Technician DELL/CBI</p>
                        <p className="mb-0">
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>

          <Col lg="6">
            <Card>
              <Card.Header>
                <div className="header-title">
                  <h4 className="card-title">About User</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mt-2">
                  <h6 className="mb-1">Joined:</h6>
                  <p>{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Lives:</h6>
                  <p>{user.city || 'United States of America'}</p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Current Address:</h6>
                  <p>
                    <Link to="#" className="text-body" target="_blank">
                      {user.current_address}
                    </Link>
                  </p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Email:</h6>
                  <p>
                    <Link to="#" className="text-body">
                      {user.email}
                    </Link>
                  </p>
                </div>
                <div className="mt-2">
                  <h6 className="mb-1">Contact:</h6>
                  <p>
                    <Link to="#" className="text-body">
                      {user.phone_number}
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
};

export default UserProfile;
