import React, { useState, useEffect } from "react";

import XLSX from "xlsx";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../../routes";
// import axios from "axios";
import useFetch from "../../../../fecthData/useFetch";
import Repository from "../../../../repositories/Repository";
import Constant from "../../../../helpers/Constant";
import FunctionController from "../../../../helpers/FunctionController";
import { format } from "date-fns";
import CurrencyInput from "react-currency-input-field";
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
  CProgress,
  CSwitch,
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
    key: "fuelDateChange",
    label: "Fuel Date",
  },
  {
    key: "fuelTypeName",
    label: "Fuel Type",
  },
  {
    key: "fuelPrice",
    label: "Fuel Price",
  },

  {
    key: "weekPrice",
    label: "Week Price",
  },
  {
    key: "monthPrice",
    label: "Month Price",
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
  const [warnning, setWarnning] = useState(false);
  const [txtErrorApi, setTxtErrorApi] = useState();
  const [danger, setDanger] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [fuelPriceList, setfuelPriceList] = useState([]);
  const [validations, setValidate] = useState(false);
  const [countryCode, setcountryCode] = useState();
  const [countryNameEng, setcountryNameEng] = useState();
  const [countryNameThai, setcountryNameThai] = useState();
  const [isActive, setisActive] = useState(true);
  const [IncountryCode, setIncountryCode] = useState("");
  const [IncountryNameEng, setIncountryNameEng] = useState("");
  const [IncountryNameThai, setIncountryNameThai] = useState("");
  const [addFuelPriceData, setAddFuelPriceData] = useState([
    {},
    {},
    {},
    {},
    {},
  ]);
  const [InisActive, setInisActive] = useState(false);
  const [errtxt, seterrtxt] = useState("กรอกข้อมูลให้ครบถ้วน");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [accordion, setAccordion] = useState(1);
  const [cbFuelType, setCbFuelType] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isPostingData, setIsPostingData] = useState(false);
  const [fuelTypeList, SetFuelTypeList] = useState([]);
  const [errorAPI, setErrorAPI] = useState(false);
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [typeShowSuccess, setTypeShowSuccess] = useState("");
  const options = {
    method: "POST",
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [roleUser, setRoleUser] = useState(null);

  const pageCode = "";

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

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const myFunction = () => {
    return (
      <CProgress sm animated value={100} className="mb-3" color="danger" />
    );
  };

  const handleChangeUpdateField = (index, target) => (e, value, name) => {
    let newArr = [...fuelPriceList];
    if (target === "fuelTypeId") {
      newArr[0].fuelTypeId = e.target.value;
    } else if (target === "fuelPrice") newArr[0].fuelPrice = name.value;
    else if (target === "weekPrice") newArr[0].weekPrice = name.value;
    else if (target === "monthPrice") newArr[0].monthPrice = name.value;
    setfuelPriceList(newArr);
    console.log(newArr);
  };

  const onClickValidEdit = () => {
    if (getIsValidForm("edit-header-need-validation")) {
      setIsConfirmEdit(!isConfirmEdit);
    }
  };

  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    console.log(fuelPriceList);
    fnEditfuelPriceById();
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

  const onClickValidSearch = () => {
    if (getIsValidForm("search-header-need-validation")) {
      clickSearch();
    }
  };

  const clickSearch = (e) => {
    console.log(searchData);
    fnGetFuelPriceListBySearch(searchData);
  };

  const handleChangClear = (e) => {
    document.getElementById("in-search-DeliveryMode").value = "";
    document.getElementById("in-search-FuelPriceFuelDate").value = "";
  };

  const onClickAddData = () => {
    var newObj = {
      fuelTypeId: null,
      fuelDate: null,
      fuelPrice: null,
      weekPrice: null,
      monthPrice: null,
    };

    newObj.fuelTypeId = document.getElementById("add-fuelTypeId").value;
    newObj.fuelDate = document.getElementById("add-fuelDate").value;
    newObj.fuelPrice = addFuelPriceData[0].fuelPrice;
    newObj.weekPrice = addFuelPriceData[1].weekPrice;
    newObj.monthPrice = addFuelPriceData[2].monthPrice;

    console.log(newObj);
    fnAddDataFuelPrice(newObj);
  };

  const handleChangeAddData = (type) => (e, value, name) => {
    if (type === "fuelPrice") {
      if (value) {
        var newArr = [...addFuelPriceData];

        var obj = {
          fuelPrice: null,
        };
        obj.fuelPrice = name.value;

        newArr[0] = obj;

        setAddFuelPriceData(newArr);
        console.log(newArr);
      } else {
        var newArr = [...addFuelPriceData];
        newArr[0] = {};

        setAddFuelPriceData(newArr);
      }
    }
    if (type === "weekPrice") {
      if (value) {
        var newArr = [...addFuelPriceData];

        var obj = {
          weekPrice: null,
        };
        obj.weekPrice = name.value;

        newArr[1] = obj;

        setAddFuelPriceData(newArr);
        console.log(newArr);
      } else {
        var newArr = [...addFuelPriceData];
        newArr[1] = {};

        setAddFuelPriceData(newArr);
      }
    }
    if (type === "monthPrice") {
      if (value) {
        var newArr = [...addFuelPriceData];

        var obj = {
          monthPrice: null,
        };
        obj.monthPrice = name.value;

        newArr[2] = obj;

        setAddFuelPriceData(newArr);
        console.log(newArr);
      } else {
        var newArr = [...addFuelPriceData];
        newArr[2] = {};

        setAddFuelPriceData(newArr);
      }
    }
  };

  const handleChangSearch = (e) => {
    var obj = {
      FuelTypeId: null,
      FuelDate: null,
      FuelDateEnd: null,
      FuelPrice: null,
      WeekPrice: null,
    };

    obj.FuelTypeId =
      document.getElementById("in-search-DeliveryMode").value == ""
        ? null
        : document.getElementById("in-search-DeliveryMode").value;
    obj.FuelDate = document.getElementById("in-search-FuelPriceFuelDate").value;
    obj.FuelDateEnd = document.getElementById(
      "in-search-FuelPriceFuelDateEnd"
    ).value;

    console.log(obj);

    setSearchData(obj);
  };

  const onClickRefresh = () => {
    setIsPostingData(true);
    Repository.fecthGetUpdateFuelPriceList(searchData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          var Arr = [];

          setIsSuccess(!isSuccess);
        } else {
          console.log(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        console.log(error);
      }
    );

    // fnEDPRefreshData(newArr);
  };

  const fnGetfuelPriceList = (countryId) => {
    setIsPostingData(true);
    Repository.fecthGetFuelPriceById(countryId).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          var Arr = [];
          // if (fuelPriceList.length) {

          //   Arr = [...fuelPriceList]
          // }
          // Arr.push(result.data)
          setfuelPriceList(result.data);
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
                  <CLabel htmlFor="date-input">Fuel Date</CLabel>
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
                      id="in-search-FuelPriceFuelDateEnd"
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
              </CFormGroup>
            </CForm>
            <CFormGroup row className="ml-1 mr-1 p-0">
              <CCol xs="12" sm="6" md="12">
                <CLabel htmlFor="date-input">Fuel Type</CLabel>
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
                    <option value={0}>All</option>
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

  const tabledata = () => {
    return (
      <CDataTable
        // columnFilter
        tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
        itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
        className="CDataTable"
        items={fuelTypeList}
        fields={fields}
        // size='xl'
        // striped
        bordered
        // sorter
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
              } else if (fuelPriceList.length) {
                // var dataShow = [...fuelPriceList];

                var _fuelDate =
                  fuelPriceList[0].fuelDate !== null
                    ? new Date(fuelPriceList[0].fuelDate)
                    : null;
                _fuelDate = formatDate(_fuelDate);
                console.log(_fuelDate);
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <CForm className="edit-header-need-validation">
                        <CRow className="text-left">
                          {/* <CLabel htmlFor="nf-email">{index + 1} : &nbsp;</CLabel> */}
                          <CCol xs="12" sm="6" md="3">
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">Fuel Date</CLabel>
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
                                    value={_fuelDate}
                                    onChange={handleChangeUpdateField(
                                      index,
                                      "fuelDate"
                                    )}
                                    name="date-input"
                                    placeholder="date"
                                    disabled
                                  />
                                  {/* <CInput
                                  type="text"
                                  id={"In-countryNameEng-" + index}
                                  value={fuelPriceList[0].fuelTypeId}
                                  onChange={handleChangeUpdateField(
                                    index,
                                    "countryNameEng"
                                  )}
                                  // placeholder={dataShow[index].countryNameEng}
                                /> */}
                                </Box>
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                              </CFormGroup>
                            </CForm>
                          </CCol>

                          <CCol xs="12" sm="6" md="3">
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">Fuel Type</CLabel>
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
                                    onChange={handleChangeUpdateField(
                                      index,
                                      "fuelTypeId"
                                    )}
                                    value={fuelPriceList[0].fuelTypeId}
                                    disabled
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
                                  value={fuelPriceList[0].fuelPriceId}
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
                                <CLabel htmlFor="nf-email">Fuel Price</CLabel>
                                <Box
                                  className="border-set"
                                  component={Grid}
                                  item
                                  boxShadow={1}
                                  xs={{
                                    width: " 100%",
                                  }}
                                >
                                  <CurrencyInput
                                    class="form-control"
                                    id="add-fuelPrice"
                                    name="input-name"
                                    maxLength="12"
                                    decimalScale={2}
                                    step={0.01}
                                    min={0}
                                    value={fuelPriceList[0].fuelPrice}
                                    decimalsLimit={2}
                                    onValueChange={handleChangeUpdateField(
                                      index,
                                      "fuelPrice"
                                    )}
                                    // onValueChange={setMinValueInMaxHearder}
                                    required
                                  />
                                  {/* <CInput
                                    type="text"
                                    id={"In-countryNameThai-" + index}
                                    value={fuelPriceList[0].fuelPrice}
                                    onChange={handleChangeUpdateField(
                                      index,
                                      "fuelPrice"
                                    )}
                                    required
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
                                <CLabel htmlFor="nf-email">Week Price</CLabel>
                                <Box
                                  className="border-set"
                                  component={Grid}
                                  item
                                  boxShadow={1}
                                  xs={{
                                    width: " 100%",
                                  }}
                                >
                                  <CurrencyInput
                                    class="form-control"
                                    id="add-fuelPrice"
                                    name="input-name"
                                    maxLength="12"
                                    decimalScale={2}
                                    step={0.01}
                                    min={0}
                                    value={fuelPriceList[0].weekPrice}
                                    decimalsLimit={2}
                                    onValueChange={handleChangeUpdateField(
                                      index,
                                      "weekPrice"
                                    )}
                                    // onValueChange={setMinValueInMaxHearder}
                                    required
                                  />
                                  {/* <CInput
                                    type="text"
                                    id={"In-weekPrice-" + index}
                                    value={fuelPriceList[0].weekPrice}
                                    onChange={handleChangeUpdateField(
                                      index,
                                      "weekPrice"
                                    )}
                                    required
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
                                <CLabel htmlFor="nf-email">Month Price</CLabel>
                                <Box
                                  className="border-set"
                                  component={Grid}
                                  item
                                  boxShadow={1}
                                  xs={{
                                    width: " 100%",
                                  }}
                                >
                                  <CurrencyInput
                                    class="form-control"
                                    id="add-fuelPrice"
                                    name="input-name"
                                    maxLength="12"
                                    decimalScale={2}
                                    step={0.01}
                                    min={0}
                                    value={fuelPriceList[0].monthPrice}
                                    decimalsLimit={2}
                                    onValueChange={handleChangeUpdateField(
                                      index,
                                      "monthPrice"
                                    )}
                                    required
                                  />
                                  {/* <CInput
                                    type="text"
                                    id={"In-monthPrice-" + index}
                                    value={fuelPriceList[0].monthPrice}
                                    onChange={handleChangeUpdateField(
                                      index,
                                      "monthPrice"
                                    )}
                                    required
                                    // placeholder={dataShow[index].countryNameThai}
                                  /> */}
                                </Box>
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
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
                        {/* <CCol xs="10" sm="6" md="2">
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
                        </CCol> */}
                      </CRow>

                      <CModal
                        show={isConfirmEdit}
                        onClose={() => setIsConfirmEdit(!isConfirmEdit)}
                        color="success"
                      >
                        <CModalHeader closeButton>
                          <h5>
                            <CModalTitle>
                              {Constant.titleConfirmChangeData}
                            </CModalTitle>
                          </h5>
                        </CModalHeader>
                        <CModalBody className="text-left">
                          {Constant.contentConfirmEditData}
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="success" onClick={onClickEditData}>
                            {Constant.btOK}
                          </CButton>{" "}
                          <CButton
                            color="secondary"
                            onClick={() => setIsConfirmEdit(!isConfirmEdit)}
                          >
                            {Constant.btCancel}
                          </CButton>
                        </CModalFooter>
                      </CModal>
                      <CModal
                        show={isShowSuccess}
                        onClose={onClickThenShowSuccesss}
                        color="success"
                        centered
                      >
                        <CModalHeader>
                          <h5>
                            <CLabel>{Constant.titleConfirmChangeData}</CLabel>
                          </h5>
                        </CModalHeader>
                        <CModalBody>
                          <CLabel>
                            {typeShowSuccess === "Add"
                              ? Constant.contentSuccessSaveData
                              : typeShowSuccess === "Edit"
                              ? showTextContentEdit()
                              : typeShowSuccess === "Delete"
                              ? Constant.contentSuccessDeleteData
                              : null}
                          </CLabel>
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            color="secondary"
                            onClick={onClickThenShowSuccesss}
                          >
                            {Constant.btOK}
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

  const showTextContentEdit = () => (
    <div>{Constant.contentSuccessEditData}</div>
  );

  const onClickThenShowSuccesss = () => {
    setTypeShowSuccess("");
    setIsShowSuccess(!isShowSuccess);
    window.location.reload(false);
  };

  const onclickClear = () => {
    document.getElementById("add-fuelTypeId").value = "";
    document.getElementById("add-fuelDate").value = "";
    document.getElementById("add-weekPrice").value = "";
    document.getElementById("add-fuelPrice").value = "";
    document.getElementById("add-monthPrice").checked = false;
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
            <CForm className="fuelPrice-need-validation" novalidate>
              <CRow>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> Fuel Type</CLabel>
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
                        id="add-fuelTypeId"
                        // onChange={handleChangSearch}
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
                        // invalid={validations}
                        maxLength="5"
                        id="In-CountryCode"
                        type="text"
                        value={IncountryCode}
                        onChange={(event) => {
                          setIncountryCode(event.target.value);
                        }}
                        required
                      /> */}

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>FuelDate</CLabel>
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
                        id="add-fuelDate"
                        // onChange={handleChangSearch}
                        name="date-input"
                        placeholder="date"
                        required
                      />
                      {/* <CInput
                        // invalid={validations}
                        type="text"
                        id="In-CountryNameEng"
                        value={IncountryNameEng}
                        onChange={(event) => {
                          setIncountryNameEng(event.target.value);
                        }}
                        required
                      /> */}

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>Fuel Price</CLabel>
                    <Box
                      className="border-set"
                      component={Grid}
                      item
                      boxShadow={1}
                      xs={{
                        width: " 100%",
                      }}
                    >
                      <CurrencyInput
                        class="form-control"
                        id="add-fuelPrice"
                        name="input-name"
                        maxLength="12"
                        decimalScale={2}
                        step={0.01}
                        min={0}
                        decimalsLimit={2}
                        onValueChange={handleChangeAddData("fuelPrice")}
                        // onValueChange={setMinValueInMaxHearder}
                        required
                      />
                      {/* <CInput
                        type="text"
                        id="In-CountryNameThai"
                        value={IncountryNameThai}
                        onChange={(event) => {
                          setIncountryNameThai(event.target.value);
                        }}
                        required
                      /> */}

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>Week Price</CLabel>
                    <Box
                      className="border-set"
                      component={Grid}
                      item
                      boxShadow={1}
                      xs={{
                        width: " 100%",
                      }}
                    >
                      <CurrencyInput
                        class="form-control"
                        id="add-weekPrice"
                        name="input-name"
                        maxLength="12"
                        decimalScale={2}
                        step={0.01}
                        min={0}
                        decimalsLimit={2}
                        onValueChange={handleChangeAddData("weekPrice")}
                        // onValueChange={setMinValueInMaxHearder}
                        required
                      />
                      {/* <CInput
                        type="text"
                        id="In-CountryNameThai"
                        value={IncountryNameThai}
                        onChange={(event) => {
                          setIncountryNameThai(event.target.value);
                        }}
                        required
                      /> */}

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>Month Price</CLabel>
                    <Box
                      className="border-set"
                      component={Grid}
                      item
                      boxShadow={1}
                      xs={{
                        width: " 100%",
                      }}
                    >
                      <CurrencyInput
                        class="form-control"
                        id="add-monthPrice"
                        name="input-name"
                        maxLength="12"
                        decimalScale={2}
                        step={0.01}
                        min={0}
                        decimalsLimit={2}
                        onValueChange={handleChangeAddData("monthPrice")}
                        // onValueChange={setMinValueInMaxHearder}
                        required
                      />
                      {/* <CInput
                        type="text"
                        id="In-CountryNameThai"
                        value={IncountryNameThai}
                        onChange={(event) => {
                          setIncountryNameThai(event.target.value);
                        }}
                        required
                      /> */}

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
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
                      onClick={onClickAddFuelPrice}
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
                      onClick={onclickClear}
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
                  <CButton color="success" onClick={onClickAddData}>
                    {Constant.btOK}
                  </CButton>{" "}
                  <CButton
                    color="secondary"
                    onClick={() => setWarnning(!primary)}
                  >
                    {Constant.btCancel}
                  </CButton>
                </CModalFooter>
              </CModal>
              <CModal
                show={warnning}
                onClose={() => setWarnning(!warnning)}
                color="warning"
              >
                <CModalHeader closeButton>
                  <h5>
                    <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
                  </h5>
                </CModalHeader>
                <CModalBody>{txtErrorApi}</CModalBody>
                <CModalFooter>
                  <CButton
                    color="success"
                    onClick={() => setWarnning(!warnning)}
                  >
                    {Constant.btOK}
                  </CButton>{" "}
                  <CButton
                    color="secondary"
                    onClick={() => setWarnning(!warnning)}
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
      <CModal
        show={isSuccess}
        onClose={() => setIsSuccess(!isSuccess)}
        color="success"
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.confirmUpdateFuelPrice}</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={fnGetFuelPriceListBySearchRefresh(searchData)}
          >
            {Constant.btOKNew}
          </CButton>{" "}
          {/* <CButton
            color="secondary"
            onClick={() => setIsSuccess(!isSuccess)}
          >
            {Constant.btCancel}
          </CButton> */}
        </CModalFooter>
      </CModal>
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

  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const fnInsertData =
    (countryCode, countryNameEng, countryNameThai, isActive) => (e) => {
      Repository.fetchAddfuelPriceList(
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

  const fnAddDataFuelPrice = (obj) => {
    setTypeShowSuccess("Add");
    setPrimary(!primary);
    setIsPostingData(true);
    Repository.fetchAddFuelPriceList(obj).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setIsShowSuccess(!isShowSuccess);
        } else if (result.httpCode === "400") {
          console.log(result);
          setTxtErrorApi(result.messageDescription);
          setWarnning(!warnning);
        } else {
          // setError(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setIsLoaded(true);
        // setError(error);
      }
    );
  };

  const fnEditfuelPriceById = () => {
    setTypeShowSuccess("Edit");
    setIsPostingData(true);
    Repository.fetchEditfuelPriceById(fuelPriceList).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setIsShowSuccess(!isShowSuccess);
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

  const fnDeleteData = (countryId) => (e) => {
    Repository.fetchDeletefuelPriceList(countryId).then(
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
        fnGetfuelPriceList(id);
      }
    }
    console.log(id);

    setDetails(newDetails);
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

  const onClickAddFuelPrice = () => {
    if (getIsValidForm("fuelPrice-need-validation")) {
      setPrimary(!primary);
    }
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
            var formattedDate = format(date, "dd-MM-yyyy H:mm:mm");
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

  const fnGetFuelPriceListBySearchRefresh = (arr) => (e) => {
    setIsPostingData(true);
    setIsSuccess(!isSuccess)
    Repository.fetchFuelPriceListBySearch(arr).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          result.data.find((x) => {
            var date = new Date(x.fuelDate);
            var formattedDate = format(date, "dd-MM-yyyy H:mm:mm");
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

  const fnGetFuelPriceList = () => {
    Repository.fecthGetFuelPriceList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          console.log(result.data);
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

  const fnCheckUserAuth = () => {
    var result = FunctionController.getUserAuthenOneRole(pageCode);
    if (result.isAuth) {
      setRoleUser(result.roleCode);
      // initeState();
    } else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  useEffect(() => {
    fnGetFuelPriceList();
    fnGetCbFuelTypeList();
  }, []);

  if (error) {
    return (
      <div>
        <h6>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <div className="headertable">{Constant.txtFuelPrice}</div>
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
                  {mainFormSearch()}
                  <CRow xs="6" className="justify-content-center ">
                    <CCard className="p-2">{tabledata()}</CCard>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
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
                      <div className="headertable">Fuel Price</div>
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
                  {mainFormSearch()}
                  {/* <CRow xs="6" className="justify-content-center "> */}
                  <CCard
                    className="p-2"
                    style={{ maxHeight: "700px", overflowY: "auto" }}
                  >
                    {tabledata()}
                  </CCard>
                  {/* </CRow> */}
                  <CFormGroup>
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
                            size={Constant.btAddSize}
                            block
                            color="info"
                            onClick={onClickRefresh}
                          >
                            Refresh FuelPrice
                          </CButton>
                        </Box>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>
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

export default Tables;
