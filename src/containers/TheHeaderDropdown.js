import React from "react";
import {
  CBadge,
  CCard,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CImg,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Timmers from "../helpers/Timers";
import { default as App, isAuthenticated } from "../../src/App";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { getDate } from "date-fns";
import { gridDateTimeFormatter } from "@material-ui/data-grid";
const username = localStorage.getItem("username");
const userGroupName = localStorage.getItem("authenName");
const aliasName = localStorage.getItem("aliasName");
const email = localStorage.getItem("email");
const exp = localStorage.getItem("expiry");
const dateNow = Date.now();

const TheHeaderDropdown = () => {
  const onClickLogout = () => {
    console.log(11111);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // localStorage.clear("username");
    localStorage.removeItem("name");
    localStorage.removeItem("exp");
    localStorage.removeItem("transporterId");
    localStorage.removeItem("role");
    localStorage.removeItem("aliasName");
    localStorage.removeItem("email");
    localStorage.removeItem("authenName");
    localStorage.removeItem("expiry");
    localStorage.removeItem("transporterShortName");
    localStorage.removeItem("searchData");
    // localStorage.clear();
    // isAuthenticated()
    window.location.reload();
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2 " direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CForm
          // className="c-avatar"
          className="justify-content-center"
        >
          <CRow className="justify-content-center">
            <FaUserCircle size={"25px"} />
          </CRow>
          <CRow className="justify-content-center">
            <CCol>
              <CLabel style={{ fontSize: "14px" }}>{username}</CLabel>
            </CCol>
          </CRow>
        </CForm>
      </CDropdownToggle>
      <Box
        className="border-set"
        component={Grid}
        item
        boxShadow={1}
        xs={{
          width: " 100%",
        }}
      >
        <CDropdownMenu className="pt-0" placement="bottom-start">
          {/* <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>Account</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-bell" className="mfe-2" />
            Updates */}
          {/* <CBadge color="info" className="mfs-auto">
              42
            </CBadge> */}
          {/* </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-envelope-open" className="mfe-2" />
            Messages */}
          {/* <CBadge color="success" className="mfs-auto">
              42
            </CBadge> */}
          {/* </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-task" className="mfe-2" />
            Tasks */}
          {/* <CBadge color="danger" className="mfs-auto">
              42
            </CBadge> */}
          {/* </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-comment-square" className="mfe-2" />
            Comments */}
          {/* <CBadge color="warning" className="mfs-auto">
              42
            </CBadge> */}
          {/* </CDropdownItem>

          <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>Settings</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-settings" className="mfe-2" />
            Settings
          </CDropdownItem>
          <CDropdownItem> */}
          {/* <CIcon name="cil-credit-card" className="mfe-2" /> */}
          {/* Payments */}
          {/* <CBadge color="secondary" className="mfs-auto">
              42
            </CBadge> */}
          {/* </CDropdownItem> */}
          <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>User</strong>
          </CDropdownItem>
          <CDropdownItem>
            {/* <CIcon name="cilPeople" className="mfe-2" /> */}
            Username : {username}
          </CDropdownItem>
          <CDropdownItem>
            {/* <CIcon name="cilPeople" className="mfe-2" /> */}
            Aliasname : {aliasName}
          </CDropdownItem>
          <CDropdownItem>Email : {email}</CDropdownItem>
          <CDropdownItem>
          {/* <Link to={{ pathname: "https://stpdpaprivacineprdsea001.blob.core.windows.net/scgchemicals/WOEx" }} target="_blank" /> */}
            {/* Privacy :{" "}
            <link
              rel="stylesheet"
              type="text/css"
              href="https://stpdpaprivacineprdsea001.blob.core.windows.net/scgchemicals/WOEx ATS/b86f714f14da421493039e8dcd4c4128.css"
            /> */}
          </CDropdownItem>

          <CDropdownItem>
            {/* Begin SCG Cookie & Policy Notice */}
            <link
              rel="stylesheet"
              type="text/css"
              href="https://stpdpaprivacineprdsea001.blob.core.windows.net/scgchemicals/WOEx ATS/b86f714f14da421493039e8dcd4c4128.css"
            />
            {/* End SCG Cookie & Policy Notice */}
          </CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem to="/Menu/EditProfile">
            <CIcon name="cilSettings" className="mfe-2" />
            Edit Profile
          </CDropdownItem>

          <CDropdownItem onClick={onClickLogout}>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Logout
          </CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem
            header
            tag="div"
            className="jutify-content-center pl-2 pr-2"
          >
            <Box
              className="border-set"
              component={Grid}
              item
              boxShadow={1}
              xs={{
                width: " 100%",
              }}
            >
              <CCard>
                <CCol className="text-center ml-2 mr-2 mt-3">
                  <br />
                  <strong>{Timmers()}</strong>
                  <br />
                  <br />
                </CCol>
              </CCard>
            </Box>
          </CDropdownItem>
        </CDropdownMenu>
      </Box>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
