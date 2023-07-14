import React, { useState, useEffect } from "react";

import XLSX from "xlsx";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../../routes";
// import axios from "axios";
import useFetch from "../../../../fecthData/useFetch";
import Repository from "../../../../repositories/Repository";
import Constant from "../../../../helpers/Constant";
import { format } from "date-fns";

import readXlsxFile from "read-excel-file";
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
  CSpinner,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInvalidFeedback,
  CLink,
  CInputFile,
  CSubheader,
  CNavbar,
  CRow,
  CFade,
  CInputRadio,
  CValidFeedback,
  CSelect,
  CButtonToolbar,
} from "@coreui/react";

import PropTypes, { element } from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CIcon from "@coreui/icons-react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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
    key: "fuelTypeName",
    label: "ประเภทเชื้อเพลิง",
  },
  {
    key: "fuelPrice",
    label: "ราคาเชื้อเพลิง",
  },
  {
    key: "fuelDateChange",
    label: "Datetime",
  },
  {
    key: "weekPrice",
    label: "ราคาเชื้อเพลิง/สัปดาห์",
  },
  {
    key: "monthPrice",
    label: "ราคาเชื้อเพลิง/เดือน",
  },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const FuelPrice = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [modal, setModal] = useState(true);
  const [primary, setPrimary] = useState(false);
  const [danger, setDanger] = useState(false);
  const [items, setItems] = useState([]);
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [accordion, setAccordion] = useState(1);
  const [fade, setFade] = useState(true);
  const [isActive, setisActive] = useState(true);
  const [InisActive, setInisActive] = useState(true);
  const [errtxt, seterrtxt] = useState("กรอกข้อมูลให้ครบถ้วน");
  const [fuelPriceById, setFuelPriceById] = useState([]);
  const [fieldIm, setFieldIm] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [requestPayment, setRequestPayment] = useState([]);
  const [edpStatus, setEDPStatus] = useState([]);
  const [isPostingData, setIsPostingData] = useState(false);
  const [selecthandle, setSelecthandle] = useState([]);
  const [edpRefresh, setEDPRefresh] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [fuelTypeList, SetFuelTypeList] = useState([]);
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isAlertNoData, setIsAlertNoData] = useState(false);
  const [refreshData, SetRefreshData] = useState([]);

  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [selectValid, setSelectValid] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = useState([]);
  const [editData, setEditData] = useState([]);
  /**ComboBox */

  const [transportType, setTransportType] = useState([]);
  const [cbFuelType, setCbFuelType] = useState([]);

  //

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const userid = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

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

  const toggleFade = () => {
    setFade(!fade);
  };

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const [checked, setChecked] = React.useState(true);

  const handleChanges = (event) => {
    setisActive(event.target.checked);
  };

  const rows = [];
  const convertToJson = (headers, data) => {
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const mainFormSearch = () => (
    <CForm>
      <Box
        className="border-set"
        component={Grid}
        item
        boxShadow={1}
        xs={{
          width: " 100%",
        }}
      >
        <CCard className="mb-1" xs="12" sm="6" md="12">
          <CCardHeader id="headingThree" class="d-flex justify-content-between">
            <CButton
              // block
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setAccordion(accordion === 1 ? null : 1)}
            >
              <CRow className="m-2 p-0">
                <h6 className="m-2 p-0">ค้นหา</h6>
                {/* {showtext()} */}
              </CRow>
            </CButton>
            <CButton
              // block
              color="link"
              // className="text-right "
              onClick={() => setAccordion(accordion === 1 ? null : 1)}
            >
              <CIcon
                className="collap-icon"
                name={
                  accordion === 1 ? "cil-chevron-bottom" : "cil-chevron-top"
                }
              />
            </CButton>
          </CCardHeader>
          <CCollapse show={accordion === 1}>
            <CForm className="search-header-need-validation">
              <CFormGroup row className="ml-1 mt-1 mr-1 p-0">
                <CCol xs="12" sm="6" md="12">
                  <CLabel htmlFor="date-input">วันที่โหลดสินค้า</CLabel>
                </CCol>
                <CCol xs="12" md="3">
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
                      type="date"
                      id="in-search-FuelPriceFuelDate"
                      onChange={handleChangSearch}
                      name="date-input"
                      placeholder="date"
                      required
                    />
                    <CInvalidFeedback className="p-1">
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </Box>
                </CCol>
                &nbsp;
               
              </CFormGroup>
            </CForm>
            <CFormGroup row className="ml-1 mr-1 p-0">
              <CCol xs="12" sm="6" md="12">
                <CLabel htmlFor="date-input">ประเภทการขนส่ง</CLabel>
              </CCol>
              <CCol xs="12" md="3">
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
                    id="in-search-DeliveryMode"
                    onChange={handleChangSearch}
                  >
                    <option selected hidden value="">
                      {Constant.txtformPlaceholderSelected}
                    </option>
                    {cbFuelType.map((cb) => (
                      <option value={cb.valueMember}>
                        {cb.displayMember}{" "}
                      </option>
                    ))}
                  </CSelect>
                </Box>
              </CCol>
            </CFormGroup>
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
                      onClick={onClickValidSearch}
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
                      onClick={handleChangClear}
                    >
                      ยกเลิก
                    </CButton>
                  </Box>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCollapse>
        </CCard>
      </Box>
      <br />
    </CForm>
  );

  const getBadge = (status) => {
    switch (status) {
      case "Complete":
        return "success";
      case "Approve":
        return "success";
      case "Ok":
        return "success";
      case "Verify":
        return "secondary";
      case "In progress":
        return "secondary";
      case "Reject":
        return "warning";
      case "Cancel":
        return "danger";
      case "Not Ok":
        return "danger";
      default:
        return "primary";
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

  const toggleDetails = (index, id) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [details, index];
      if (!isLoadingData) {
        fnFuelPriceListById(id);
      }
    }
    setDetails(newDetails);
  };

  const _export = React.useRef(null);

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const handleChangSearch = (e) => {
    var obj = {
      FuelTypeId: null,
      FuelDate: null,
      FuelPrice: null,
      WeekPrice: null,
    };

    obj.FuelTypeId =
      document.getElementById("in-search-DeliveryMode").value == ""
        ? null
        : document.getElementById("in-search-DeliveryMode").value;
    obj.FuelDate = document.getElementById("in-search-FuelPriceFuelDate").value;

    console.log(obj);

    setSearchData(obj);
  };

  const onHandleChageEdit = (type) => (e) => {
    var newObj = {...editData };
    if (type === "fuelTypeId") {
      newObj[0].fuelTypeId = e.target.value;
    } else if (type === "fuelDate") {
      newObj[0].fuelDate = e.target.value;
    } else if (type === "fuelPrice") {
      newObj[0].fuelPrice = e.target.value;
    } else if (type === "weekPrice") {
      newObj[0].weekPrice = e.target.value;
    } else if (type === "monthPrice") {
      newObj[0].monthPrice = e.target.value;
    }

    setEditData(newObj);

    // fnEditfuelPriceById()
  };

  const onClickEditData = (index) => (e) => {
    // setIsConfirmEdit(!isConfirmEdit);
    let newArr = [...editData];
    console.log("Checkpoint" + newArr);
    var fuelPriceId = newArr[0].fuelPriceId;
    var fuelTypeId = newArr[0].fuelTypeId;
    var fuelDate = newArr[0].fuelDate;
    var fuelPrice = newArr[0].fuelPrice;
    var weekPrice = newArr[0].weekPrice;
    var monthPrice = newArr[0].monthPrice;
    // var updateBy = 1;
    var arrObj = [
      fuelPriceId,
      fuelTypeId,
      fuelDate,
      fuelPrice,
      weekPrice,
      monthPrice
    ];
    console.log(arrObj);
    fnEditfuelPriceById(arrObj[0], arrObj[1], arrObj[2], arrObj[3], arrObj[4], arrObj[5]);
  };

  const handleChangClear = (e) => {
    document.getElementById("in-search-DeliveryMode").value = "";
    document.getElementById("in-search-FuelPriceFuelDate").value = "";
  };

  const onClickValidSearch = () => {
    if (getIsValidForm("search-header-need-validation")) {
      clickSearch();
    }
  };

  const clickSearch = () => {
    console.log(searchData);
    fnGetFuelPriceListBySearch(searchData);
  };

  const onClickValidEdit = () => {
    if (getIsValidForm("edit-header-need-validation")) {
      setPrimary(!primary);
    }
  };

  const mainTable = () => {
    return (
      <CCard className="p-2 justify-content-center">
        <CForm>
          <CDataTable
            columnFilter
            // tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
            // itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
            className="CDataTable"
            items={fuelTypeList}
            fields={fields}
            responsive
            striped
            bordered
            switcher
            size={"xl"}
            itemsPerPage={10}
            pagination
            scopedSlots={{
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
                          toggleDetails(index, item.fuelPriceId);
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
                  } else if (editData.length) {
                    // var dataShow = [...editData];
                    // console.log(dataShow);
                    // var _fuelTypeId = dataShow[0].fuelTypeId ;
                    // var _fuelPrice = dataShow[0].fuelPrice ;
                    // var _weekPrice = dataShow[0].weekPrice ;
                    // var _monthPrice = dataShow[0].monthPrice ;
                    // var _fuelDate =
                    // dataShow[0].fuelDate !== null
                    //     ? new Date(dataShow[0].fuelDate)
                    //     : null;
                    //     dataShow[0].fuelDate = formatDate(_fuelDate);
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <CForm className="edit-header-need-validation">
                            <CRow className="text-left">
                              <CCol xs="12" sm="6" md="3">
                                <CForm action="" method="post">
                                  <CFormGroup>
                                    <CLabel htmlFor="nf-email">
                                      ประเภทเชื้อเพลิง
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
                                      <CSelect
                                        className="form-control"
                                        id={"edit-data-fuelTypeId"}
                                        onChange={onHandleChageEdit(
                                          "fuelTypeId"
                                        )}
                                        value={editData[0].fuelTypeId}
                                        required
                                      >
                                        <option selected hidden value="">
                                          {Constant.txtformPlaceholderSelected}
                                        </option>
                                        {cbFuelType.map((cb) => (
                                          <option value={cb.valueMember}>
                                            {cb.displayMember}{" "}
                                          </option>
                                        ))}
                                      </CSelect>
                                      {/* <CInput
                                      type="text"
                                      id={"In-countryCode-" + index}
                                      value={dataShow[0].fuelTypeId}
                                      onChange={handleChangeUpdateField(
                                        index,
                                        "countryCode"
                                      )}
                                      // placeholder={dataShow[index].countryCode}
                                      autoComplete="email"
                                    /> */}
                                    </Box>
                                  </CFormGroup>
                                </CForm>
                              </CCol>

                              <CCol xs="12" sm="6" md="3">
                                <CForm action="" method="post">
                                  <CFormGroup>
                                    <CLabel htmlFor="nf-email">
                                      ราคาเชื้อเพลง
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
                                        type="number"
                                        min={0}
                                        onInput={(e) =>
                                          (e.target.value =
                                            e.target.value.slice(0, 14))
                                        }
                                        step="0.01"
                                        onWheel={(e) => e.target.blur()}
                                        id={"edit-data-fuelPrice"}
                                        value={editData[0].fuelPrice}
                                        onChange={onHandleChageEdit(
                                          "fuelPrice"
                                        )}
                                        required
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
                                    <CLabel htmlFor="nf-email">Datetime</CLabel>
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
                                        type="date"
                                        id={"edit-data-fuelDate"}
                                        value={editData[0].fuelDate}
                                        onChange={onHandleChageEdit("fuelDate")}
                                        name="date-input"
                                        placeholder="date"
                                        required
                                      />
                                      {/* <CInput
                                      type="date"
                                      id={"edit-data-fuelDate"}
                                      value={dataShow[0].fuelDate}
                                      onChange={onHandleChageEdit("fuelDate")}
                                      // placeholder={dataShow[index].countryNameThai}
                                    /> */}
                                    </Box>
                                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                  </CFormGroup>
                                </CForm>
                              </CCol>

                              <CCol xs="12" sm="6" md="3">
                                <CForm action="" method="post">
                                  <CFormGroup>
                                    <CLabel htmlFor="nf-email">
                                      ราคาเชื้อเพลิง/สัปดาห์
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
                                        type="number"
                                        min={0}
                                        onInput={(e) =>
                                          (e.target.value =
                                            e.target.value.slice(0, 14))
                                        }
                                        step="0.01"
                                        onWheel={(e) => e.target.blur()}
                                        id={"edit-data-weekPrice"}
                                        value={editData[0].weekPrice}
                                        onChange={onHandleChageEdit(
                                          "weekPrice"
                                        )}
                                        // placeholder={dataShow[index].countryNameThai}
                                        required
                                      />
                                    </Box>
                                  </CFormGroup>
                                </CForm>
                              </CCol>
                              <CCol xs="12" sm="6" md="3">
                                <CForm action="" method="post">
                                  <CFormGroup>
                                    <CLabel htmlFor="nf-email">
                                      ราคาเชื้อเพลิง/เดือน
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
                                        type="number"
                                        min={0}
                                        onInput={(e) =>
                                          (e.target.value =
                                            e.target.value.slice(0, 14))
                                        }
                                        step="0.01"
                                        onWheel={(e) => e.target.blur()}
                                        id={"edit-data-monthPrice"}
                                        value={editData[0].monthPrice}
                                        onChange={onHandleChageEdit(
                                          "monthPrice"
                                        )}
                                        // placeholder={dataShow[index].countryNameThai}
                                      />
                                    </Box>
                                  </CFormGroup>
                                </CForm>
                              </CCol>
                            </CRow>
                          </CForm>

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
                                    onClick={onClickValidEdit}
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
                                <CModalTitle>
                                  {Constant.titleConfirmChangeData}
                                </CModalTitle>
                              </h5>
                            </CModalHeader>
                            <CModalBody>
                              {Constant.contentConfirmEditData}?
                            </CModalBody>
                            <CModalFooter>
                              <CButton
                                color="success"
                                onClick={onClickValidEdit}
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
                              <CModalTitle>
                                {Constant.titleConfirmChangeData}
                              </CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                              {Constant.contentConfirmDeleteData}
                            </CModalBody>
                            <CModalFooter>
                              <CButton
                                color="danger"
                                // onClick={fnDeleteData(item.countryId)}
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
        </CForm>
      </CCard>
    );
  };

  const allModal = () => (
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

      {/* Start Add Modal */}
      {/* <CModal
                show={isAlertNoData}
                onClose={() => setIsAlertNoData(!isAlertNoData)}
                color="success"
            >
                <CModalHeader closeButton>
                    <h5><CModalTitle  >{Constant.titleConfirmChangeData}</CModalTitle></h5>
                </CModalHeader>
                <CModalBody>
                    {Constant.contentConfirmApprove}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" >
                        {Constant.btOK}
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setIsAlertNoData(!isAlertNoData)}>
                        {Constant.btCancel}
                    </CButton>
                </CModalFooter>
            </CModal> */}
      {/* End Add Modal */}

      {/* Start Add Modal */}
      <CModal
        show={isConfirmSave}
        onClose={() => setIsConfirmSave(!isConfirmSave)}
        color="success"
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmInitial}</CModalBody>
        <CModalFooter>
          <CButton color="success">{Constant.btOK}</CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmSave(!isConfirmSave)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Add Modal */}
    </div>
  );

  const getshipment = (arr, brr) => {
    // console.log(shipment)
    // console.log(fuelPriceById)
    var newArr = [];
    arr.map((x) => {
      var obj = {
        shipmentNo: "",
        deliveryNo: "",
        sourceId: "",
        shipTo: "",
        qty: 0.0,
        truckTypeId: null,
        truckLicense: "",
        deliveryDate: "",
        edpstatus: "",
        edpreason: "",
        deliveryMode: "",
        requestPaymentType: null,
        approveBy: null,
        approveDatetime: "",
        rejectBy: null,
        rejectReason: "",
        rejectDatetime: "",
      };
      obj.shipmentNo = x.ShipmentNo;
      // obj.DeliveryNo = y.deliveryNo;
      var result = brr.filter((y) => y.shipmentNo === x.ShipmentNo);
      // console.log(result)

      var dupli = [...new Set(result)];
      console.log(dupli);

      if (result.length > 1) {
        for (var i = 0; i < result.length; i++) {
          if (i < result.length - 1) {
            obj.deliveryNo += result[i].deliveryNo + ",";
          } else {
            obj.deliveryNo += result[i].deliveryNo;
          }
        }
      } else {
        var newObj = brr.find((a) => a.shipmentNo === x.ShipmentNo);
        obj.deliveryNo = newObj.deliveryNo;
      }

      obj.sourceId = x.SourceId === null ? "" : x.SourceId;
      obj.shipTo = x.ShipTo;
      obj.qty = x.Qty;
      obj.truckTypeId = x.TruckTypeId;
      obj.truckLicense = x.TruckLicense;
      obj.deliveryDate = x.DeliveryDate;
      obj.edpstatus = x.Edpstatus;
      obj.edpreason = x.Edpreason;
      obj.deliveryMode = x.DeliveryMode === null ? "" : x.DeliveryMode;
      obj.requestPaymentType = x.RequestPaymentType;
      obj.approveDatetime = x.ApproveDatetime === null ? "" : x.ApproveDatetime;
      obj.rejectBy = x.RejectBy === null ? "" : x.RejectBy;
      obj.rejectReason = x.RejectReason === null ? "" : x.RejectReason;
      obj.rejectDatetime = x.RejectDatetim === undefined ? "" : x.RejectDatetim;
      newArr.push(obj);
    });

    // SetShipment(ship)
    // console.log(newArr)

    SetFuelTypeList(newArr);
  };

  const fnGetCbTransportType = () => {
    Repository.fetchCbTransportType().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setTransportType(result.data);
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

  const fnGetCbFuelTypeList = () => {
    Repository.fetchCbFuelTypeList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbFuelType(result.data);
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

  const fnGetFuelPriceListBySearch = (arr) => {
    setIsPostingData(true);
    Repository.fetchFuelPriceListBySearch(arr).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          result.data.find((x) => {
            var date = new Date(x.fuelDate);
            var formattedDate = d(date, "dd-MM-yyyy H:mm:mm");
            // let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}T${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
            x.fuelDateChange = formattedDate;
            x.monthPrice = x.monthPrice === null ? "" : x.monthPrice;
          });

          SetFuelTypeList(result.data);
          console.log(result.data);
          setAccordion(null);
        } else {
          setError(result);
          setAccordion(1);
        }
      },
      (error) => {
        setIsPostingData(false);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetEDPRefreshData = (arr) => {
    Repository.fetchGetEDPRefreshData(arr).then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setEDPRefresh(result.data);
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

  const fnFuelPriceListById = (index) => {
    setIsLoadingData(true);
    Repository.fecthGetFuelPriceById(index).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          // setFuelPriceById(result.data);
          setEditData(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        setError(error);
      }
    );
  };

  const fnEditfuelPriceById = () => {
    setIsPostingData(true);
    Repository.fetchEditfuelPriceById(editData)
    .then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          window.location.reload(false);
        } else {
          setError(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  // const fnInsertHistoryLog = (arr) => {
  //   console.log(arr);
  //   setIsPostingData(true);
  //   Repository.fetchInsertHistoryLog(arr).then(
  //     (result) => {
  //       setIsPostingData(false);
  //       setIsLoaded(true);
  //       if (result.httpCode === "200") {
  //         window.location.reload(false);
  //       } else {
  //         setError(result);
  //       }
  //     },
  //     (error) => {
  //       setIsPostingData(false);
  //       setIsLoaded(true);
  //       setError(error);
  //     }
  //   );
  // };

  useEffect(() => {
    fnGetCbFuelTypeList();
    // fnGetCbRequestPayment();
    // fnGetCbEDPStatus();
  }, []);

  // const API =
  //     "http://192.168.88.128/PION.SCG.SMP.WebAPI/api/Location/GetCountryList";
  // const { data, error, isLoaded } = useFetch(API);

  if (error) {
    return (
      <CCol className="text-center">
        {Constant.apiTopicFetchError} : {error.message}
      </CCol>
    );
  } else if (!isLoaded) {
    return showLoadingData();
  } else {
    return (
      <div>
        <h6>
          <CRow>
            <CCol>
              <CCard>
                {/* <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}> */}
                <CCardHeader>
                  <CRow>
                    <CCol xs="6" sm="8" md="12">
                      <h3 className="headtext">{Constant.txtFuelPrice}</h3>
                    </CCol>
                  </CRow>
                </CCardHeader>
                {/* </Box> */}
                <CCardBody>
                  {/* {importExcel()} */}
                  {mainFormSearch()}
                  <CRow
                    xs="6"
                    className="justify-content-center"
                    style={{ maxWidth: "100%" }}
                  >
                    {mainTable()}
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
            {allModal()}
          </CRow>
        </h6>
      </div>
    );
  }
};

export default FuelPrice;
