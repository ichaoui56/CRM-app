import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Adjust the path based on your file structure
import Default from "../layouts/dashboard/default";
import Index from "../views/dashboard/index";
import PartAdd from "../views/dashboard/parts/parts-add";
import PartsList from "../views/dashboard/parts/partsList";
import TicketList from "../views/dashboard/ticket/ticket-list";
import TicketDetail from "../views/dashboard/ticket/ticket-detail";
import TicketAdd from "../views/dashboard/ticket/ticket-add";
import Billing from "../views/dashboard/special-pages/billing";
import Calender from "../views/dashboard/special-pages/calender";
import Kanban from "../views/dashboard/special-pages/kanban";
import Pricing from "../views/dashboard/special-pages/pricing";
import Timeline from "../views/dashboard/special-pages/timeline";
import RtlSupport from "../views/dashboard/special-pages/RtlSupport";
import UserProfile from "../views/dashboard/app/user-profile";
import UserAdd from "../views/dashboard/app/user-add";
import UserList from "../views/dashboard/app/user-list";
import Admin from "../views/dashboard/admin/admin";
import Widgetbasic from "../views/dashboard/widget/widgetbasic";
import Widgetchart from "../views/dashboard/widget/widgetchart";
import Widgetcard from "../views/dashboard/widget/widgetcard";
import Google from "../views/dashboard/maps/google";
import Vector from "../views/dashboard/maps/vector";
import FormElement from "../views/dashboard/from/form-element";
import FormWizard from "../views/dashboard/from/form-wizard";
import FormValidation from "../views/dashboard/from/form-validation";
import BootstrapTable from "../views/dashboard/table/bootstrap-table";
import TableData from "../views/dashboard/table/table-data";
import Solid from "../views/dashboard/icons/solid";
import Outline from "../views/dashboard/icons/outline";
import DualTone from "../views/dashboard/icons/dual-tone";
import OrderAdd from "../views/dashboard/orders/order-add";
import OrderList from "../views/dashboard/orders/order-list";

export const DefaultRouter = [
  {
    path: "/",
    element: <Default />,
    children: [
      { path: "/", element: <PrivateRoute element={Index} /> },
      {
        path: "/dashboard/parts/parts-add",
        element: <PrivateRoute element={PartAdd} />,
      },
      {
        path: "/dashboard/parts/parts-list",
        element: <PrivateRoute element={PartsList} />,
      },
      {
        path: "/dashboard/orders/order-add",
        element: <PrivateRoute element={OrderAdd} />,
      },
      {
        path: "/dashboard/orders/order-list",
        element: <PrivateRoute element={OrderList} />,
      },
      {
        path: "/dashboard/parts/parts-add",
        element: <PrivateRoute element={PartAdd} />,
      },
      {
        path: "/dashboard/tickets/ticket-list",
        element: <PrivateRoute element={TicketList} />,
      },
      {        
        path: "/dashboard/tickets/ticket-details/:id",
        element: <PrivateRoute element={TicketDetail} />,
      },
      {
        path: "/dashboard/tickets/ticket-add",
        element: <PrivateRoute element={TicketAdd} />,
      },
      {
        path: "dashboard/special-pages/billing",
        element: <PrivateRoute element={Billing} />,
      },
      {
        path: "dashboard/special-pages/calender",
        element: <PrivateRoute element={Calender} />,
      },
      {
        path: "dashboard/special-pages/kanban",
        element: <PrivateRoute element={Kanban} />,
      },
      {
        path: "dashboard/special-pages/pricing",
        element: <PrivateRoute element={Pricing} />,
      },
      {
        path: "dashboard/special-pages/timeline",
        element: <PrivateRoute element={Timeline} />,
      },
      {
        path: "dashboard/special-pages/rtl-support",
        element: <PrivateRoute element={RtlSupport} />,
      },
      {
        path: "dashboard/app/user-profile",
        element: <PrivateRoute element={UserProfile} />,
      },
      {
        path: "dashboard/app/user-add",
        element: <PrivateRoute element={UserAdd} />,
      },
      {
        path: "dashboard/app/user-list",
        element: <PrivateRoute element={UserList} />,
      },
      {
        path: "dashboard/admin/admin",
        element: <PrivateRoute element={Admin} />,
      },
      {
        path: "dashboard/widget/widgetbasic",
        element: <PrivateRoute element={Widgetbasic} />,
      },
      {
        path: "dashboard/widget/widgetchart",
        element: <PrivateRoute element={Widgetchart} />,
      },
      {
        path: "dashboard/widget/widgetcard",
        element: <PrivateRoute element={Widgetcard} />,
      },
      {
        path: "dashboard/map/google",
        element: <PrivateRoute element={Google} />,
      },
      {
        path: "dashboard/map/vector",
        element: <PrivateRoute element={Vector} />,
      },
      {
        path: "dashboard/form/form-element",
        element: <PrivateRoute element={FormElement} />,
      },
      {
        path: "dashboard/form/form-wizard",
        element: <PrivateRoute element={FormWizard} />,
      },
      {
        path: "dashboard/form/form-validation",
        element: <PrivateRoute element={FormValidation} />,
      },
      {
        path: "dashboard/table/bootstrap-table",
        element: <PrivateRoute element={BootstrapTable} />,
      },
      {
        path: "dashboard/table/table-data",
        element: <PrivateRoute element={TableData} />,
      },
      {
        path: "dashboard/icon/solid",
        element: <PrivateRoute element={Solid} />,
      },
      {
        path: "dashboard/icon/outline",
        element: <PrivateRoute element={Outline} />,
      },
      {
        path: "dashboard/icon/dual-tone",
        element: <PrivateRoute element={DualTone} />,
      },
    ],
  },
];
