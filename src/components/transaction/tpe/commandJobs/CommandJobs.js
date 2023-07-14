import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
// import axios from "axios";
import Repository from "../../../../repositories/Repository";
import Constant from "../../../../helpers/Constant";
import FunctionController from "../../../../helpers/FunctionController";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CCol,
  CSelect,
  CDataTable,
  CCollapse,
  CInput,
  CLabel,
  CForm,
  CFormGroup,
  CFormText,
  CModal,
  CCardFooter,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInvalidFeedback,
  CProgress,
  CSwitch,
  CLink,
  CSubheader,
  CBreadcrumbRouter,
  CRow,
  CButtonToolbar,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import MakeStyleSheet from "../../../../helpers/MakeStyleSheet";

const fields = [
  // {
  //   key: "manage",
  //   label: "",
  //   _style: { width: "14%" },
  //   sorter: false,
  //   filter: false,
  // },
  {
    key: "command",
    label: "Command",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "piority",
    label: "Piority",
  },
  {
    key: "queueStatus",
    label: "Queue Status",
  },

  {
    key: "createBy",
    label: "Create By",
  },
  {
    key: "createDatetime",
    label: "Create Date",
  },
];

const Tables = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [baseItems, setBaseItems] = useState([]);
  const [status, setStatus] = useState([]);

  const [collsFormSearch, setCollsFormSearch] = useState(true);
  const [isPostingData, setIsPostingData] = useState(false);
  const [errorAPI, setErrorAPI] = useState(null);
  // Var for Start&End Date Search Form
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [roleUser, setRoleUser] = useState(null);

  const pageCode = "";

  const getHasObjectValue = (obj) => {
    if (obj !== null && obj !== undefined) {
      if (Object.keys(obj).length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getIsValidForm = (formClassName) => {
    var forms = document.querySelectorAll(`.${formClassName}`);
    var isValid = false;
    Array.prototype.slice.call(forms).forEach(function (form) {
      if (form.checkValidity()) {
        isValid = true;
      }
      form.classList.add("was-validated");
    });
    return isValid;
  };

  const setNoValidateForm = (formClassName) => {
    var forms = document.querySelectorAll(`.${formClassName}`);
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.classList.remove("was-validated");
    });
  };

  const setZeroTwoDigit = (value) => {
    var txtValue = "" + value + "";
    if (value / 10 < 1) {
      txtValue = "0" + value;
    }
    return txtValue;
  };

  const onClickCheckSearchData = () => {
    if (getIsValidForm("search-header-need-validation")) {
      onClickSearchData();
    } else {
      setBaseItems([]);
    }
  };

  const onClickSearchData = () => {
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var status = document.getElementById("search-status").value;
    status = status != "" ? status : null;

    var newArr = [dateStart, dateEnd, status];

    // console.log(newArr);
    fnGetCommandJobs(newArr);
  };

  const onClickClearDataForSearch = () => {
    var userName = document.getElementById("search-userName");
    userName.value = "";
    var aliasName = document.getElementById("search-aliasName");
    aliasName.value = "";
    var firstName = document.getElementById("search-firstName");
    firstName.value = "";
    var lastName = document.getElementById("search-lastName");
    lastName.value = "";
    var transporterId = document.getElementById("search-transporterId");
    transporterId.value = "";
    var email = document.getElementById("search-email");
    email.value = "";
  };

  const fnGetCommandJobs = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetCommandJobs(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {

          setBaseItems(FunctionController.setEmptyValueInArray(result.data));
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetAutoStartEndOneDayDateTime = () => {
    Repository.fetchGetAutoStartEndOneDayDateTime().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          var startDate = new Date(result.data.startDatetime);
          var endDate = new Date(result.data.endDatetime);
          var txtStartDate =
            startDate.getFullYear() +
            "-" +
            setZeroTwoDigit(startDate.getMonth() + 1) +
            "-" +
            setZeroTwoDigit(startDate.getDate());
          var txtEndDate =
            endDate.getFullYear() +
            "-" +
            setZeroTwoDigit(endDate.getMonth() + 1) +
            "-" +
            setZeroTwoDigit(endDate.getDate());
          setStartDate(txtStartDate);
          setEndDate(txtEndDate);
        } else {
          setError(result);
        }
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetStatus = () => {
    Repository.fetchGetComboBoxListByGroupNo("CMDQueueStatus").then(
      (result) => {
        if (result.httpCode === "200") {
          setStatus(result.data);
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setErrorAPI(error);
      }
    );
  };

  const fnCheckUserAuth = () => {
    var result = FunctionController.getUserAuthenOneRole(pageCode);
    if (result.isAuth) {
      setRoleUser(result.roleCode);
      // initeState();
    }
    else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  useEffect(() => {
    fnGetAutoStartEndOneDayDateTime();
  }, []);

  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );


  const formSearch = () => (
    <div>
      <Box
        className="border-set"
        component={Grid}
        item
        boxShadow={1}
        xs={{
          width: " 100%",
        }}
      >
        <CCard xs="12" sm="6" md="12">
          <CCardHeader id="headingThree" class="d-flex justify-content-between">
            <CButton
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setCollsFormSearch(!collsFormSearch)}
            >
              <CRow className="ml-2 mt-1 p-0">
                <h6 className="ml-2 mt-1 p-0">ค้นหา</h6>
              </CRow>
            </CButton>

            <CButton
              color="link"
              onClick={() => setCollsFormSearch(!collsFormSearch)}
            >
              <CIcon
                className="collap-icon"
                name={
                  collsFormSearch ? "cil-chevron-bottom" : "cil-chevron-top"
                }
              />
            </CButton>
          </CCardHeader>
          <CCollapse show={collsFormSearch}>
            <CCardBody>
              <CForm className="search-header-need-validation">
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="6" sm="6" md="12">
                    <CRow>
                      <CCol xs="6" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="cvv">วันที่เริ่มต้น</CLabel>
                          <Box
                            className="border-set"
                            component={Grid}
                            item
                            boxShadow={1}
                            xs={{
                              width: " 100%",
                            }}
                          >
                            <CInput
                              size="xs"
                              type="date"
                              id="search-datestart"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              required
                            />

                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </Box>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="cvv">วันที่สิ้นสุด</CLabel>
                          <Box
                            className="border-set"
                            component={Grid}
                            item
                            boxShadow={1}
                            xs={{
                              width: " 100%",
                            }}
                          >
                            <CInput
                              size="xs"
                              type="date"
                              id="search-dateend"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              required
                            />
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </Box>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="6" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="name">Status</CLabel>
                          <Box
                            className="border-set"
                            component={Grid}
                            item
                            boxShadow={1}
                            xs={{
                              width: " 100%",
                            }}
                          >
                            <CSelect
                              className="form-control"
                              id="search-status"
                              onClick={fnGetStatus}
                            >
                              <option selected hidden value="">
                                {Constant.txtformPlaceholderSelected}
                              </option>
                              <option value="">
                                {Constant.txtFormAllSelected}
                              </option>
                              {status.map((x) => (
                                <option value={x.displayMember}>
                                  {x.displayMember}{" "}
                                </option>
                              ))}
                            </CSelect>
                          </Box>
                          <CInvalidFeedback>
                            {Constant.inValidNullSelected}
                          </CInvalidFeedback>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>

                <CRow className="row justify-content-center">
                  <CCol xs="10" sm="6" md="2">
                    <CFormGroup>
                      <br />
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
                          size={Constant.btAddSize}
                          block
                          color="warning"
                          onClick={onClickCheckSearchData}
                        >
                          {Constant.btSearchData}
                        </CButton>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" sm="6" md="2">
                    <CFormGroup>
                      <br />
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
                          size={Constant.btAddSize}
                          block
                          color="danger"
                          onClick={onClickClearDataForSearch}
                        >
                          {Constant.btClearData}
                        </CButton>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCollapse>
        </CCard>
      </Box>
    </div>
  );

  const tabledata = () => {
    return (
      <CDataTable
        // columnFilter
        tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
        itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
        className="CDataTable"
        items={baseItems}
        fields={fields}
        // size='xl'
        // striped
        bordered
        // sorter
        itemsPerPage={10}
        pagination
        scopedSlots={{
          createDatetime: (item) => {
            var newDate = new Date(item.createDatetime);
            newDate = newDate.toLocaleDateString();
            return <td className="py-2">{newDate}</td>;
          },
        }}
      />
    );
  };

  const modalForm = () => (
    <div>
      {/* Start Fetch Loading Modal */}
      <CModal size="sm" show={isPostingData} centered closeOnBackdrop={false}>
        <CModalBody>{showLoadingData()}</CModalBody>
      </CModal>
      {/* End Fetch Loading Modal */}

      {/* Start Fetch Error Modal */}
      <CModal show={errorAPI} color="danger" closeOnBackdrop={false}>
        <CModalHeader>
          <h5>
            <CLabel>{Constant.apiTopicFetchError}</CLabel>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CLabel>
            {errorAPI
              ? errorAPI.message != null
                ? errorAPI.message
                : errorAPI.messageDescription
              : " "}
          </CLabel>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setErrorAPI(null)}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Fetch Error Modal */}
    </div>
  );

  if (error) {
    return (
      <CCol className="text-center">
        {Constant.apiTopicFetchError} : {error.message}
      </CCol>
    );
  } else if (!isLoaded) {
    return <div className="content-wrapper">{showLoadingData()}</div>;
  } else {
    return (
      <div>
        <h6>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <div className="headertable">Command Jobs</div>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {modalForm()}
                  {formSearch()}
                  <CCard style={{ maxHeight: "700px", overflowY: "auto" }}>
                    {tabledata()}
                  </CCard>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  }
};

export default Tables;