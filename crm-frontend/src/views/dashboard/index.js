import React, { useEffect, memo, Fragment } from "react";
import { Row, Col, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCounts from "../../hooks/useCounts.js";

//circular
import Circularprogressbar from "../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from "../../components/progress.js";
//img
import shapes1 from "../../assets/images/shapes/01.png";
import shapes2 from "../../assets/images/shapes/02.png";
import shapes3 from "../../assets/images/shapes/03.png";
import shapes4 from "../../assets/images/shapes/04.png";
import shapes5 from "../../assets/images/shapes/05.png";

//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors.ts";

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {
  useSelector(SettingSelector.theme_color);

  const { counts, loading, error, setCounts } = useCounts();

  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
    };
  };
  const variableColors = getVariableColor();

  const colors = [variableColors.primary, variableColors.info];
  useEffect(() => {
    return () => colors;
  });

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });
  const chart1 = {
    options: {
      chart: {
        fontFamily:
          '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      colors: colors,
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
          offsetX: -5,
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          minHeight: 22,
          maxHeight: 22,
          show: true,
          style: {
            colors: "#8A92A6",
          },
        },
        lines: {
          show: false, //or just here to disable only x axis grids
        },
        categories: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
      },
      grid: {
        show: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 50, 80],
          colors: colors,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    series: [
      {
        name: "total",
        data: [94, 80, 94, 80, 94, 80, 94],
      },
      {
        name: "pipline",
        data: [72, 60, 84, 60, 74, 60, 78],
      },
    ],
  };

  //chart2
  const chartOptions = {
    options: {
      colors: ["#3a57e8", "#4bc7d2"], // Adjust colors if needed
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 10,
            size: "50%",
          },
          track: {
            margin: 10,
            strokeWidth: "50%",
          },
          dataLabels: {
            show: false,
          },
        },
      },
      labels: ["Tickets Created", "Tickets Finished"], // Adjust labels based on your data
    },
    series: [counts.tickets_created || 0, counts.tickets_done || 0], // Use counts data here
  };

  const chart3 = {
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ["#1abc9c"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "28%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Technicians",
          "Orders",
          "Laptops",
          "Clients",
          "Tickets Created",
          "Tickets Diagnostic",
          "Tickets Done",
        ],
        labels: {
          minHeight: 20,
          maxHeight: 70,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          minWidth: 19,
          maxWidth: 19,
          style: {
            colors: "#8A92A6",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
    series: [
      {
        
        data: [
          counts.technicien || 0,
          counts.orders || 0,
          counts.laptops || 0,
          counts.clients || 0,
          counts.tickets_created || 0,
          counts.tickets_with_diagnostic || 0,
          counts.tickets_done || 0,
        ],
      },
    ],
  };

  const renderCountSlide = (title, value, color, svgPath) => (
    <SwiperSlide className="card card-slide" key={title}>
      <div className="card-body">
        <div className="progress-widget">
          <Circularprogressbar
            stroke={color}
            width="60px"
            height="60px"
            Linecap="rounded"
            trailstroke="#ddd"
            strokewidth="4px"
            style={{ width: 60, height: 60 }}
            value={100} // Assuming full progress for simplicity, adjust as needed
            id={`circle-progress-${title}`}
          >
            <svg className="" width="24" height="24px" viewBox="0 0 24 24">
              <path fill="currentColor" d={svgPath} />
            </svg>
          </Circularprogressbar>
          <div className="progress-detail">
            <p className="mb-2">{title}</p>
            <h4 className="counter">
              <CountUp start={150} end={value} duration={1} />
            </h4>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );

  return (
    <Fragment>
      <Row>
        <Col md="12" lg="12">
          <Row className="row-cols-1">
            <div
              className="overflow-hidden d-slider1 "
              data-aos="fade-up"
              data-aos-delay="800"
            >
              <Swiper
                className="p-0 m-0 mb-2 list-inline"
                slidesPerView={5}
                spaceBetween={32}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  550: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1400: { slidesPerView: 3 },
                  1500: { slidesPerView: 4 },
                  1920: { slidesPerView: 4 },
                  2040: { slidesPerView: 7 },
                  2440: { slidesPerView: 8 },
                }}
              >
                {renderCountSlide(
                  "Tickets Created",
                  counts.tickets_created,
                  variableColors.info,
                  "M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                )}
                {renderCountSlide(
                  "Tickets with Diagnostic",
                  counts.tickets_with_diagnostic,
                  variableColors.info,
                  "M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                )}
                {renderCountSlide(
                  "Tickets Done",
                  counts.tickets_done,
                  variableColors.primary,
                  "M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                )}
                {renderCountSlide(
                  "Technicians",
                  counts.technicien,
                  variableColors.primary,
                  "M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                )}
                {renderCountSlide(
                  "Clients",
                  counts.clients,
                  variableColors.primary,
                  "M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                )}
                {renderCountSlide(
                  "Contacts",
                  counts.contacts,
                  variableColors.info,
                  "M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                )}
                {renderCountSlide(
                  "Laptops",
                  counts.laptops,
                  variableColors.primary,
                  "M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                )}
                {renderCountSlide(
                  "Orders",
                  counts.orders,
                  variableColors.info,
                  "M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                )}

                <div className="swiper-button swiper-button-next"></div>
                <div className="swiper-button swiper-button-prev"></div>
              </Swiper>
            </div>
          </Row>
        </Col>
        <Col md="12" lg="12">
          <Row>
            <Col md="12" xl="6">
              <div className="card" data-aos="fade-up" data-aos-delay="900">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Tickets</h4>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      variant="text-gray"
                      type="button"
                      id="dropdownMenuButtonSM"
                    >
                      This Week
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">This Week</Dropdown.Item>
                      <Dropdown.Item href="#">This Month</Dropdown.Item>
                      <Dropdown.Item href="#">This Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <div className="flex-wrap d-flex align-items-center justify-content-between">
                    <Chart
                      className="col-md-8 col-lg-8"
                      options={chartOptions.options}
                      series={chartOptions.series}
                      type="radialBar"
                      height="250"
                    />
                    <div className="d-grid gap col-md-4 col-lg-4">
                      <div className="d-flex align-items-start">
                        <svg
                          className="mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          viewBox="0 0 24 24"
                          fill="#3a57e8"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="#3a57e8"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-3">
                          <span className="text-gray">Tickets Created</span>
                          <h6>{counts.tickets_created}</h6>
                        </div>
                      </div>
                      <div className="d-flex align-items-start">
                        <svg
                          className="mt-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          viewBox="0 0 24 24"
                          fill="#4bc7d2"
                        >
                          <g>
                            <circle
                              cx="12"
                              cy="12"
                              r="8"
                              fill="#4bc7d2"
                            ></circle>
                          </g>
                        </svg>
                        <div className="ms-3">
                          <span className="text-gray">Tickets Done</span>
                          <h6>{counts.tickets_done}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="12" xl="6">
              <div className="card" data-aos="fade-up" data-aos-delay="1000">
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Conversions</h4>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={Button}
                      variant="text-gray"
                      type="button"
                      id="dropdownMenuButtonSM"
                    >
                      This Week
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">This Week</Dropdown.Item>
                      <Dropdown.Item href="#">This Month</Dropdown.Item>
                      <Dropdown.Item href="#">This Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <Chart
                    className="d-activity"
                    options={chart3.options}
                    series={chart3.series}
                    type="bar"
                    height="230"
                  />
                </div>
              </div>
            </Col>
            <Col md="12" lg="6">
              <div
                className="overflow-hidden card"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Enterprise Clients</h4>
                    <p className="mb-0">
                      <svg
                        className="me-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#3a57e8"
                          d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                      </svg>
                      15 new acquired this month
                    </p>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table
                      id="basic-table"
                      className="table mb-0 table-striped"
                      role="grid"
                    >
                      <thead>
                        <tr>
                          <th>COMPANIES</th>
                          <th>CONTACTS</th>
                          <th>ORDER</th>
                          <th>COMPLETION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes1}
                                alt="profile"
                              />
                              <h6>Addidis Sportwear</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$14,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>60%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={60}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes5}
                                alt="profile"
                              />
                              <h6>Netflixer Platforms</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$30,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>25%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={25}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes2}
                                alt="profile"
                              />
                              <h6>Shopifi Stores</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$8,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes3}
                                alt="profile"
                              />
                              <h6>Bootstrap Technologies</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$20,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes4}
                                alt="profile"
                              />
                              <h6>Community First</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$9,800</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>75%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={75}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
             <Col md="12" lg="6">
              <div
                className="overflow-hidden card"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="flex-wrap card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="mb-2 card-title">Enterprise Clients</h4>
                    <p className="mb-0">
                      <svg
                        className="me-2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#3a57e8"
                          d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                      </svg>
                      15 new acquired this month
                    </p>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <div className="mt-4 table-responsive">
                    <table
                      id="basic-table"
                      className="table mb-0 table-striped"
                      role="grid"
                    >
                      <thead>
                        <tr>
                          <th>COMPANIES</th>
                          <th>CONTACTS</th>
                          <th>ORDER</th>
                          <th>COMPLETION</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes1}
                                alt="profile"
                              />
                              <h6>Addidis Sportwear</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$14,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>60%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={60}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes5}
                                alt="profile"
                              />
                              <h6>Netflixer Platforms</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$30,000</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>25%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={25}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes2}
                                alt="profile"
                              />
                              <h6>Shopifi Stores</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$8,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes3}
                                alt="profile"
                              />
                              <h6>Bootstrap Technologies</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  SP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  PP
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  TP
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$20,500</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>100%</h6>
                            </div>
                            <Progress
                              softcolors="success"
                              color="success"
                              className="shadow-none w-100"
                              value={100}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded bg-soft-primary img-fluid avatar-40 me-3"
                                src={shapes4}
                                alt="profile"
                              />
                              <h6>Community First</h6>
                            </div>
                          </td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              <Link to="#" className="iq-media-1">
                                <div className="icon iq-icon-box-3 rounded-pill">
                                  MM
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td>$9,800</td>
                          <td>
                            <div className="mb-2 d-flex align-items-center">
                              <h6>75%</h6>
                            </div>
                            <Progress
                              softcolors="primary"
                              color="primary"
                              className="shadow-none w-100"
                              value={75}
                              minvalue={0}
                              maxvalue={100}
                              style={{ height: "4px" }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
});

export default Index;
