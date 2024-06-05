import { useEffect, memo, Fragment, useContext } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { ShepherdTourContext } from "react-shepherd";
import { Button } from "react-bootstrap";
import Header from "../../components/partials/dashboard/HeaderStyle/header";
import SubHeader from "../../components/partials/dashboard/HeaderStyle/sub-header";
import Sidebar from "../../components/partials/dashboard/SidebarStyle/sidebar";
import Footer from "../../components/partials/dashboard/FooterStyle/footer";
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";
import Loader from "../../components/Loader";
import * as SettingSelector from "../../store/setting/selectors.ts";
import { useSelector } from "react-redux";

const Tour = () => {
  const tour = useContext(ShepherdTourContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/dashboard" && sessionStorage.getItem("tour") !== "true") {
      tour?.start();
    }
  }, [pathname, tour]);
  return <Fragment></Fragment>;
};

const Default = memo(() => {
  const appName = useSelector(SettingSelector.app_name);
  useEffect(() => { }, []);

  return (
    <Fragment>
      <Loader />
      <Sidebar app_name={appName} />
      <Tour />
      <main className="main-content">
        <div className="position-relative">
          <Header />
          <SubHeader />
        </div>
        <div className="py-0 conatiner-fluid content-inner mt-n5">
          <Outlet />
        </div>
        <div className="btn-download">
         
        </div>
        <Footer />
      </main>
      <SettingOffCanvas />
    </Fragment>
  );
});

Default.displayName = "Default";
export default Default;
