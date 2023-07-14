import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import bg from '../../../picture/background.png'
// import bg from '../../../picture/bgsmp2.png'
// import bg from '../../../picture/bgsmp3.png'
import bg from "../../../assets/icons/bgsmp4.png";
import bg1 from "../../../assets/icons/bgsmp5.png";
import logoicon from "../../../assets/icons/header.png";
import wmxlogo from "../../../assets/icons/wmxbg.jpg";
import logoicon2 from "../../../assets/icons/smp-logo5.png";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import SystemInfo from "../../../helpers/SystemInfo";

// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputRadio,
  CLabel,
  CSpinner,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Constant from "../../../helpers/Constant";
import VariableController from "../../../helpers/VariableController";
import Repository from "../../../repositories/Repository";
import { default as App, isAuthenticated } from "../../../App";
import jwt_decode from "jwt-decode";
import Moment from "moment";
import { format } from "date-fns";

const bgset = {
  // container: {
  backgroundImage: `url(${bg1})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  // backgroundColor: "#000000",

  // width: '100vw',
  // height: '100vh'
  // }
};

const Login = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [userLogin, setUserLogin] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isPostingData, setIsPostingData] = useState(false);
  const [txterrorAPI, setTxtErrorAPI] = useState("");
  const [errorAPI, setErrorAPI] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [pass, setPass] = useState("password");
  const [unlock, setUnlock] = useState(true);
  const [defaultUser, setDefaultUser] = useState(
    localStorage.getItem("username")
  );
  const [defaultDomain, setDefaultDomain] = useState(
    localStorage.getItem("domain")
  );

  const fnfetchLoginUser = () => {
    localStorage.setItem("domain", userLogin.Domain);
    setIsPostingData(true);
    Repository.fetchLoginUser(userLogin).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          var token = result.data;
          // console.log('Data', decoded);
          var decoded = jwt_decode(token);
          setUserData(decoded);
          console.log("Data", decoded);
          VariableController.loginStatus = decoded;
          VariableController.loginStatus = true;
          localStorage.setItem("expiry", decoded.exp);
          const d = new Date(0);
          d.setUTCSeconds(decoded.exp);
          // console.log(decoded);
          var expdate = format(d, "MM-d-yy H:mma");
          localStorage.setItem("token", token);
          localStorage.setItem("userId", decoded.userID);
          localStorage.setItem("username", decoded.unique_name);
          localStorage.setItem("name", decoded.given_name);
          localStorage.setItem("exp", expdate);
          localStorage.setItem("transporterId", decoded.transporterID);
          localStorage.setItem("role", decoded.role);
          localStorage.setItem("aliasName", decoded.aliasName);
          localStorage.setItem("email", decoded.email);
          localStorage.setItem("authenName", decoded.authenName);

          localStorage.setItem(
            "transporterShortName",
            decoded.transporterShortName
          );

          isAuthenticated(true);
          window.location.reload();
        } else {
          setError(result.messageDescription);
          setTxtErrorAPI(result);
          setErrorAPI(!errorAPI);
        }
      },
      (error) => {
        setErrorAPI(true);
        // isAuthenticated(false)
        setIsPostingData(false);
        setIsLoaded(true);
      }
    );
  };

  const onClickCler = () => {
    document.getElementById("input-login-domain").value = "";
    document.getElementById("input-login-username").value = "";
    document.getElementById("input-login-password").value = "";
    // localStorage.clear();
    // isAuthenticated()
    window.location.reload();
  };

  const onChangeAdd = (e) => {
    setDefaultUser(document.getElementById("input-login-username").value);
    setDefaultDomain(document.getElementById("input-login-domain").value);
    var obj = {
      Domain: "",
      Username: "",
      Password: "",
      UniqueId: "",
      OSVersion: "",
      MobileName: "",
    };
    obj.Domain = document.getElementById("input-login-domain").value;
    obj.Username = document.getElementById("input-login-username").value;
    obj.Password = document.getElementById("input-login-password").value;

    setUserLogin(obj);
  };

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const modalForForm = () => (
    <div>
      {/* Start Fetch Loading Modal */}
      <CModal size="sm" show={isPostingData} centered closeOnBackdrop={false}>
        <CModalBody>{showLoadingData()}</CModalBody>
      </CModal>
      {/* End Fetch Loading Modal */}

      {/* Start Fetch Error Modal */}
      <Box
        className="border-set"
        component={Grid}
        item
        boxShadow={1}
        xs={{
          width: " 100%",
        }}
      >
        <CModal
          className="p-4 mt-2 mb-2 modal-login"
          size="lg"
          show={errorAPI}
          onClose={() => setErrorAPI(!errorAPI)}
          // closeOnBackdrop={false}
        >
          <CModalHeader>
            <CLabel className="headtext-bold-modal">
              {Constant.apiTopicFetchError}
            </CLabel>
          </CModalHeader>
          <CModalBody>
            <CLabel className="headtext-bold-modalbody">
              {txterrorAPI
                ? txterrorAPI.messageCode == null
                  ? txterrorAPI.messageDescription
                  : txterrorAPI.messageCode
                : ""}
            </CLabel>
          </CModalBody>
          <CModalFooter>
            <CButton
              size={Constant.btAddSize}
              color="primary"
              onClick={() => setErrorAPI(!errorAPI)}
            >
              {Constant.btOK}
            </CButton>
          </CModalFooter>
        </CModal>
      </Box>
      {/* End Fetch Error Modal */}
    </div>
  );

  const onClickShow = (e) => {
    if (pass === "password") {
      setUnlock(false);
      setPass("!password");
    } else {
      setPass("password");
      setUnlock(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fnfetchLoginUser();
    }
  };
  const form = () => {
    return (
      <div>
        <CContainer>
          <CRow className="justify-content-end">
            <CCol xs="12" sm="10" md="5">
              <Box
                className="border-set"
                component={Grid}
                item
                boxShadow={1}
                xs={{
                  width: " 100%",
                }}
              >
                <CCardGroup>
                  <CCard>
                    <CCardBody>
                      <CForm className="p-3">
                        <CRow
                          style={{ overflow: "hidden" }}
                          className="justify-content-center mb-3"
                        >
                          <CCol>
                            <CImg
                              src={logoicon}
                              align="center"
                              high="200"
                              width="100%"
                              block
                              fluid
                            />
                          </CCol>
                        </CRow>
                        {/* <CRow class="d-flex justify-content-center">
                          <CLabel className="textLogin-Style">Login</CLabel>
                        </CRow> */}
                        <p className="text-muted">Sign In to your account</p>
                        <h4>Domain</h4>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cilLan" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            onChange={onChangeAdd}
                            id="input-login-domain"
                            type="text"
                            value={defaultDomain}
                            placeholder="Domain"
                            autoComplete="Domain"
                          />
                        </CInputGroup>
                        <h4>Username</h4>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            onChange={onChangeAdd}
                            id="input-login-username"
                            value={defaultUser}
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                          />
                        </CInputGroup>

                        <h4>Password</h4>
                        {/* <CForm onSubmit={handleSubmit}> */}
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>

                          <CInput
                            onChange={onChangeAdd}
                            id="input-login-password"
                            type={pass}
                            placeholder="Password"
                            autoComplete="current-password"
                            onKeyDown={handleKeyDown}
                          />
                          <CInputGroupPrepend
                            style={{ backgroundColor: "#fff" }}
                          >
                            <CInputGroupText
                              onClick={onClickShow}
                              style={{ backgroundColor: "#fff" }}
                            >
                              {unlock ? (
                                <BsFillEyeSlashFill />
                              ) : (
                                <BsFillEyeFill />
                              )}
                            </CInputGroupText>
                          </CInputGroupPrepend>
                        </CInputGroup>
                        <br />
                        <CRow class="d-flex justify-content-center">
                          {/* <CRow> */}
                          <CCol xs="6" sm="6" md="6">
                            <Box
                              className="border-set"
                              component={Grid}
                              item
                              boxShadow={1}
                              xs={{
                                width: " 100%",
                              }}
                            >
                              <CButton
                                className="btn-mainsmp-login"
                                // type="submit"
                                onClick={fnfetchLoginUser}
                                block
                              >
                                Login
                              </CButton>
                            </Box>
                          </CCol>
                          <CCol xs="6" sm="6" md="6">
                            <Box
                              className="border-set"
                              component={Grid}
                              item
                              boxShadow={1}
                              xs={{
                                width: " 100%",
                              }}
                            >
                              <CButton
                                className="btn-mainsmp-logout"
                                onClick={onClickCler}
                                block
                              >
                                Cancel
                              </CButton>
                            </Box>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                    <CCol>
                      <CLabel style={{ color: "grey" }}>
                        Version : {SystemInfo.systemVersion}
                      </CLabel>
                    </CCol>
                  </CCard>
                </CCardGroup>
              </Box>
              <CRow className={"pl-5 pr-3 pt-4 justify-content-center"}>
                <CCol xs="6" sm="6" md="7">
                  <CLink
                    style={{ color: "black" }}
                    onClick={() =>
                      (window.location.href =
                        "https://www.scgchemicals.com/th/cookies-notice")
                    }
                  >
                    นโยบายการใช้คุ้กกี้
                  </CLink>
                </CCol>
                <CCol xs="6" sm="6" md="5">
                  <CLink
                    style={{ color: "black" }}
                    onClick={() =>
                      (window.location.href =
                        "https://www.scgchemicals.com/th/privacy-notice")
                    }
                  >
                    นโยบายความเป็นส่วนตัว
                  </CLink>
                  {/* <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CButton
                      block
                      color="info"
                      onClick={() =>
                        (window.location.href = "https://www.google.com/")
                      }
                    >
                      นโยบายความเป็นส่วนตัว
                    </CButton>
                  </Box> */}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  };

  if (error) {
    return (
      <div
        style={bgset}
        className="c-app c-default-layout flex-row align-items-center "
      >
        <CContainer className="c-body">
          {form()}
          {modalForForm()}
        </CContainer>
        {/* {Constant.apiTopicFetchError} : {error} */}
      </div>
    );
  } else if (!isLoaded) {
    return (
      <CRow class="align-self-center">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {showLoadingData()}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </CRow>
    );
  } else {
    return (
      // <div id="privacineprivacypolicy383"> </div>
      <div
        style={bgset}
        className="c-app c-default-layout flex-row align-items-center"
      >
        <CContainer className="c-body">
          {form()}
          {modalForForm()}
        </CContainer>
      </div>
    );
  }
};

export default Login;
