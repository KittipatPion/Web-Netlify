import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../routes";
// import axios from "axios";
import useFetch from "../../../fecthData/useFetch";
import Repository from "../../../repositories/Repository";
import Constant from "../../../helpers/Constant";

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
import { DocsLink } from "../../../reusable";
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
import usersData from "../../../views/users/UsersData";
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
import functionController from "../../../helpers/FunctionController";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  appBar: {
    position: "relative",
    backgroundColor: "#ED1B24",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const fields = [
  {
    key: "countryCode",
    label: "รหัสประเทศ",
  },
  {
    key: "countryNameEng",
    label: "ชื่อประเทศ(อังกฤษ)",
  },
  {
    key: "countryNameThai",
    label: "ชื่อประเทศ(ไทย)",
  },
  ,
  {
    key: "isActive",
    label: "สถานะ",
  },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const Tables = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [country, setCountry] = useState([]);
  const [modal, setModal] = useState(true);
  const [primary, setPrimary] = useState(false);
  const [danger, setDanger] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [countryList, setCountryList] = useState([]);
  const [validations, setValidate] = useState(false);
  const [countryCode, setcountryCode] = useState();
  const [countryNameEng, setcountryNameEng] = useState();
  const [countryNameThai, setcountryNameThai] = useState();
  const [isActive, setisActive] = useState(true);
  const [IncountryCode, setIncountryCode] = useState("");
  const [IncountryNameEng, setIncountryNameEng] = useState("");
  const [IncountryNameThai, setIncountryNameThai] = useState("");
  const [InisActive, setInisActive] = useState(false);
  const [errtxt, seterrtxt] = useState("กรอกข้อมูลให้ครบถ้วน");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const options = {
    method: "POST",
  };

  const pageCode = "";

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const myFunction = () => {
    return (
      <CProgress sm animated value={100} className="mb-3" color="danger" />
    );
  };

  const handleChangeUpdateField = (index, target) => (e) => {
    let newArr = [...countryList];
    if (target === "countryCode") {
      newArr[0].countryCode = e.target.value;
    } else if (target === "isActive") newArr[0].isActive = e.target.checked;
    else if (target === "countryNameEng")
      newArr[0].countryNameEng = e.target.value;
    else if (target === "countryNameThai")
      newArr[0].countryNameThai = e.target.value;
    setCountryList(newArr);
    console.log(newArr);
  };

  const onClickEditData = (index) => (e) => {
    // setIsConfirmEdit(!isConfirmEdit);
    let newArr = [...countryList];
    console.log("Checkpoint" + newArr);
    var countryId = newArr[0].countryId;
    var countryCode = newArr[0].countryCode;
    var countryNameEng = newArr[0].countryNameEng;
    var countryNameThai = newArr[0].countryNameThai;
    var isActive = newArr[0].isActive;
    // var updateBy = 1;
    var arrObj = [
      countryId,
      countryCode,
      countryNameEng,
      countryNameThai,
      isActive,
    ];
    console.log(arrObj);
    fnUpdateData(arrObj[0], arrObj[1], arrObj[2], arrObj[3], arrObj[4]);
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse);
  };
  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const fnGetCountryList = (countryId) => {
    setIsLoadingData(true);
    Repository.fecthGetCountryById(countryId).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          var Arr = [];
          // if (countryList.length) {

          //   Arr = [...countryList]
          // }
          // Arr.push(result.data)
          setCountryList(result.data);
          // console.log(result.data)
        } else {
          console.log(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        console.log(error);
      }
    );
  };

  const [checked, setChecked] = React.useState(true);

  const handleChanges = (event) => {
    setisActive(event.target.checked);
  };

  const tabledata = () => {
    return (
      <CDataTable
        columnFilter
        tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
        itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
        className="CDataTable"
        items={data}
        fields={fields}
        // size='xl'
        // striped
        bordered
        sorter
        itemsPerPage={10}
        pagination
        scopedSlots={{
          isActive: (item, index) => {
            return (
              <td className="py-2 text-center">
                {item.isActive ? (
                  <CIcon
                    name="cil-check-circle"
                    style={{ color: "green" }}
                    size="2xl"
                  />
                ) : (
                  <CIcon
                    name="cil-x-circle"
                    style={{ color: "red" }}
                    size="2xl"
                  />
                )}
              </td>
            );
          },
          show_details: (item, index) => {
            return (
              <td className="py-2">
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
                    color="primary"
                    variant="outline"
                    block
                    size="sm"
                    onClick={() => {
                      toggleDetails(index, item.countryId);
                    }}
                  >
                    {details.includes(index) ? "ซ่อน" : "แสดง"}
                  </CButton>
                </Box>
              </td>
            );
          },

          details: (item, index) => {
            if (details.includes(index)) {
              if (isLoadingData) {
                return (
                  <CCardBody>
                    <div>
                      <CRow>
                        <CCol>
                          <br />
                          <br />
                          <br />
                          <br />
                        </CCol>
                      </CRow>
                      {showLoadingData()}
                      <CRow>
                        <CCol>
                          <br />
                          <br />
                          <br />
                          <br />
                        </CCol>
                      </CRow>
                    </div>
                  </CCardBody>
                );
              } else if (countryList.length) {
                // var dataShow = [...countryList];
                console.log(countryList);
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <CRow className="text-left">
                        <CLabel htmlFor="nf-email">{index + 1} : &nbsp;</CLabel>

                        <CCol xs="12" sm="6" md="3">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email"> {Constant.arrFieldAddCountry[0]}</CLabel>
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
                                  type="text"
                                  id={"In-countryCode-" + index}
                                  value={countryList[0].countryCode}
                                  onChange={handleChangeUpdateField(
                                    index,
                                    "countryCode"
                                  )}
                                  // placeholder={dataShow[index].countryCode}
                                  autoComplete="email"
                                />
                              </Box>
                            </CFormGroup>
                          </CForm>
                        </CCol>

                        <CCol xs="12" sm="6" md="3">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                              {Constant.arrFieldAddCountry[1]}
                              </CLabel>
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
                                  type="text"
                                  id={"In-countryNameEng-" + index}
                                  value={countryList[0].countryNameEng}
                                  onChange={handleChangeUpdateField(
                                    index,
                                    "countryNameEng"
                                  )}
                                  // placeholder={dataShow[index].countryNameEng}
                                />
                              </Box>
                              {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CFormGroup>
                          </CForm>
                        </CCol>

                        <CCol xs="12" sm="6" md="3">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                              {Constant.arrFieldAddCountry[2]}
                              </CLabel>
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
                                  type="text"
                                  id={"In-countryNameThai-" + index}
                                  value={countryList[0].countryNameThai}
                                  onChange={handleChangeUpdateField(
                                    index,
                                    "countryNameThai"
                                  )}
                                  // placeholder={dataShow[index].countryNameThai}
                                />
                              </Box>
                              {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CFormGroup>
                          </CForm>
                        </CCol>

                        <CCol xs="12" sm="6" md="2">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                &nbsp; &nbsp; {Constant.arrFieldAddCountry[3]}
                              </CLabel>
                              <CSwitch
                                className={"mx-1"}
                                variant={"3d"}
                                color={"success"}
                                onChange={handleChangeUpdateField(
                                  index,
                                  "isActive"
                                )}
                                defaultChecked={countryList[0].isActive}
                                value={countryList[0].isActive}
                                checked={countryList[0].isActive}
                                labelOn={"\u2713"}
                                labelOff={"\u2715"}
                              />

                              {/* <Checkbox
                                id={"checkbox-" + index}
                                defaultChecked={countryList[0].isActive}
                                color="primary"
                                // value={countryList[0].isActive}
                                onChange={
                                  handleChangeUpdateField(index, 'isActive')
                                }
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              /> */}
                            </CFormGroup>
                          </CForm>
                        </CCol>
                      </CRow>

                    

                      <CRow className="justify-content-center">
                        <CCol xs="10" sm="6" md="2">
                          <CFormGroup>
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
                                className="editbutton"
                                size={Constant.btAddSize}
                                color="primary"
                                block
                                onClick={() => setPrimary(!primary)}
                              >
                                 {Constant.btEditData}
                              </CButton>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="10" sm="6" md="2">
                          <CFormGroup>
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
                                className="editbutton"
                                size={Constant.btAddSize}
                                color="danger"
                                block
                                onClick={() => setDanger(!danger)}
                              >
                                  {Constant.btDeleteData}
                              </CButton>
                            </Box>
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      <CModal
                        show={primary}
                        onClose={() => setPrimary(!primary)}
                        color="success"
                      >
                        <CModalHeader closeButton>
                          <h5>
                            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
                          </h5>
                        </CModalHeader>
                        <CModalBody>
                        {Constant.contentConfirmEditData}?
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            color="success"
                            onClick={onClickEditData(index)}
                          >
                              {Constant.btOK}
                          </CButton>{" "}
                          <CButton
                            color="secondary"
                            onClick={() => setPrimary(!primary)}
                          >
                              {Constant.btCancel}
                          </CButton>
                        </CModalFooter>
                      </CModal>
                      <CModal
                        show={danger}
                        onClose={() => setDanger(!danger)}
                        color="danger"
                      >
                        <CModalHeader closeButton>
                          <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
                        </CModalHeader>
                        <CModalBody>{Constant.contentConfirmDeleteData}</CModalBody>
                        <CModalFooter>
                          <CButton
                            color="danger"
                            onClick={fnDeleteData(item.countryId)}
                          >
                             {Constant.btOK}
                          </CButton>{" "}
                          <CButton
                            color="secondary"
                            onClick={() => setDanger(!danger)}
                          >
                             {Constant.btCancel}
                          </CButton>
                        </CModalFooter>
                      </CModal>
                    </CCardBody>
                  </CCollapse>
                );
              }
            }
          },
        }}
      />
    );
  };

  const OnclickClear = () => {
    document.getElementById("In-CountryCode").value = "";
    document.getElementById("In-CountryNameEng").value = "";
    document.getElementById("In-CountryNameThai").value = "";
    document.getElementById("In-Status").checked = false;
  };

  const collaps = () => {
    return (
      <CCollapse show={collapse}>
        <Box
          className="border-set"
          component={Grid}
          item
          boxShadow={1}
          xs={{
            width: " 100%",
          }}
        >
          <CCard className="p-3 mt-1">
            <CForm className="country-need-validation" novalidate>
              <CRow>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> {Constant.arrFieldAddCountry[0]}</CLabel>
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
                        // invalid={validations}
                        maxLength="5"
                        id="In-CountryCode"
                        type="text"
                        value={IncountryCode}
                        onChange={(event) => {
                          setIncountryCode(event.target.value);
                        }}
                        required
                      />
                   
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                    </Box>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>{Constant.arrFieldAddCountry[1]}</CLabel>
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
                        // invalid={validations}
                        type="text"
                        id="In-CountryNameEng"
                        value={IncountryNameEng}
                        onChange={(event) => {
                          setIncountryNameEng(event.target.value);
                        }}
                        required
                      />
                   
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                    </Box>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>{Constant.arrFieldAddCountry[2]}</CLabel>
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
                        type="text"
                        id="In-CountryNameThai"
                        value={IncountryNameThai}
                        onChange={(event) => {
                          setIncountryNameThai(event.target.value);
                        }}
                        required
                      />
                   
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                    </Box>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel className="mt-1" class="align-top">
                      &nbsp; {Constant.arrFieldAddCountry[3]}
                    </CLabel>
                    &nbsp;
                    <CSwitch
                      className={"mx-1"}
                      variant={"3d"}
                      id="In-Status"
                      color={"success"}
                      onChange={handleChanges}
                      value={isActive}
                      defaultChecked={false}
                      labelOn={"\u2713"}
                      labelOff={"\u2715"}
                    />
                    {/* <Checkbox
                      defaultChecked
                      color="primary"
                      onChange={handleChanges}
                      inputProps={{
                        "aria-label": "secondary checkbox",
                      }}
                    /> */}
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="justify-content-center mt-2">
                <CCol xs="12" sm="6" md="2">
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
                      className="editbutton"
                      size={Constant.btAddSize}
                      block
                      // type="submit"
                      color="success"
                      onClick={onClickAddCountry}
                    >
                      {Constant.btSave}
                    </CButton>
                  </Box>
                </CCol>
                <CCol xs="12" sm="6" md="2">
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
                      className="editbutton"
                      size={Constant.btAddSize}
                      color="danger"
                      block
                      onClick={OnclickClear}
                    >
                      {Constant.btCancel}
                    </CButton>
                  </Box>
                </CCol>
              </CRow>

              <CModal
                show={primary}
                onClose={() => setPrimary(!primary)}
                color="success"
              >
                <CModalHeader closeButton>
                  <h5>
                    <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
                  </h5>
                </CModalHeader>
                <CModalBody>{Constant.contentConfirmAddData}</CModalBody>
                <CModalFooter>
                  <CButton
                    color="success"
                    onClick={fnInsertData(
                      IncountryCode,
                      IncountryNameEng,
                      IncountryNameThai,
                      isActive
                    )}
                  >
                    {Constant.btOK}
                  </CButton>{" "}
                  <CButton
                    color="secondary"
                    onClick={() => setPrimary(!primary)}
                  >
                    {Constant.btCancel}
                  </CButton>
                </CModalFooter>
              </CModal>
            </CForm>
          </CCard>
        </Box>
      </CCollapse>
    );
  };

  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const fnInsertData =
    (countryCode, countryNameEng, countryNameThai, isActive) => (e) => {
      Repository.fetchAddCountryList(
        countryCode,
        countryNameEng,
        countryNameThai,
        isActive
      ).then(
        (result) => {
          if (result.httpCode === "200") window.location.reload(false);
          else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
      setPrimary(!primary);
      window.location.reload();
    };

  const fnUpdateData = (
    countryId,
    countryCode,
    countryNameEng,
    countryNameThai,
    isActive
  ) => {
    Repository.fetchEditCountryList(
      countryId,
      countryCode,
      countryNameEng,
      countryNameThai,
      isActive
    ).then(
      (result) => {
        if (result.httpCode === "200") window.location.reload(false);
        else console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    setPrimary(!primary);
    window.location.reload();
  };

  const fnDeleteData = (countryId) => (e) => {
    Repository.fetchDeleteCountryList(countryId).then(
      (result) => {
        if (result.httpCode === "200") window.location.reload(false);
        else console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    setDanger(!danger);
    window.location.reload();
  };

  const toggleDetails = (index, id) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [details, index];
      if (!isLoadingData) {
        fnGetCountryList(id);
      }
    }
    console.log(id);

    setDetails(newDetails);
  };

  const _export = React.useRef(null);

  const editData = (id) => (e) => {
    var countrycodeIN = document.getElementById("In-countryCode").value;
    var countryNameTH = document.getElementById("In-countryNameThai").value;
    var countryNameEng = document.getElementById("In-countryNameEng").value;
    // var countrycode = document.getElementById("").value;
    console.log(id, countrycodeIN, countryNameTH, countryNameEng);
    // fnUpdateData(id,countrycode,countryNameTH,countryNameEng)
  };

  const onTodoChange = (value) => {};

  const changedata = (item, index, type) => {
    if (type === "countrycode") {
      item.countryCode = document.getElementById(
        "In-countryCode-" + index
      ).value;
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ allColumns: true }} />
      </GridToolbarContainer>
    );
  }

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

  const onClickAddCountry = () => {
    var checkmap = data.find(
      (x) => x.countryCode === document.getElementById("In-CountryCode").value
    );
    if (checkmap) {
      console.log(checkmap);

      console.log(1111);
      console.log(document.getElementById("In-CountryCode").value);
    } else {
      if (getIsValidForm("country-need-validation")) {
        setPrimary(!primary);
      }
    }
  };

  const fnBaseGetCountryList = () => {
    Repository.fetchGetCountryList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setData(result.data);
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

  const fnCheckUserAuth = () => {
    var result = functionController.getUserAuthenOneRole(pageCode);
    if (result.isAuth) {
      // initeState();
    }
    else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  useEffect(() => {
    fnBaseGetCountryList();
  }, []);

  // const API = "http://192.168.88.128/PION.SCG.SMP.WebAPI/api/Location/GetCountryList"
  // const { data, error, isLoaded } = useFetch(API)

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
                      <div className="headertable">
                        {Constant.txtHeaderCountry}
                      </div>
                    </CCol>
                    <CCol className="col-2">
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
                          size={Constant.btHeaderSize}
                          block
                          className="btn-mainsmp"
                          onClick={toggle}
                        >
                          {Constant.btAddData}
                        </CButton>
                      </Box>
                    </CCol>
                  </CRow>
                  {collaps()}
                </CCardHeader>
                <CCardBody>
                  {/* <CRow xs="6" className="justify-content-center "> */}
                    <CCard className="p-2">{tabledata()}</CCard>
                  {/* </CRow> */}
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
