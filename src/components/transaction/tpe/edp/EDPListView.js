import React, { useState, useEffect } from "react";

import XLSX from "xlsx";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../../routes";
// import axios from "axios";
import useFetch from "../../../../fecthData/useFetch";
import Repository from "../../../../repositories/Repository";
import FunctionController from "../../../../helpers/FunctionController";
import Constant from "../../../../helpers/Constant";
import { format } from "date-fns";
import { SheetJSApp } from "./Exellim";
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
    key: "manage",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "edpstatus",
    label: "EDP Status",
  },
  {
    key: "shipmentNo",
    label: "Shipment No",
  },
  {
    key: "deliveryNo",
    label: "Delivery No",
  },
  {
    key: "sourceId",
    label: "ต้นทาง",
  },
  ,
  {
    key: "shipTo",
    label: "สถานที่ส่ง",
  },
  {
    key: "qty",
    label: "จำนวน/ตัน",
  },
  {
    key: "truckTypeId",
    label: "ประเภทรถ",
  },
  {
    key: "truckLicense",
    label: "ทะเบียนรถ",
  },
  {
    key: "transportType",
    label: "transportType",
  },
  {
    key: "deliveryMode",
    label: "ประเภทขนส่ง",
  },
  {
    key: "deliveryDate",
    label: "วันที่ส่งสินค้า",
  },
  {
    key: "edpreason",
    label: "EDPReason",
  },

  // {
  //     key: "statusTime",
  //     label: "เวลาที่เปลี่ยน",

  // },
  {
    key: "requestPaymentType",
    label: "สถานะการจ่าย",

    sorter: false,
    filter: false,
  },
  {
    key: "initialByName",
    label: "initial By",
  },
  {
    key: "initialReason",
    label: "InitialReason",
  },
  {
    key: "initialDatetime",
    label: "Initial Datetime",
  },
  {
    key: "approveByName",
    label: "Approve By",
  },
  {
    key: "approveDatetime",
    label: "Approve Datetime",
  },
  {
    key: "rejectName",
    label: "Reject By",
  },
  {
    key: "rejectReason",
    label: "RejectReason",
  },
  {
    key: "rejectDatetime",
    label: "Reject Datetime",
  },

  // {
  //     key: "reasonStatus",
  //     label: "Reason Status",

  // },
  // {
  //     key: "show_details",
  //     label: "",
  //     _style: { width: "1%" },
  //     sorter: false,
  //     filter: false,
  // },
];

const Tables = () => {
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
  const [edplist, setEdplist] = useState([]);
  const [fieldIm, setFieldIm] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [requestPayment, setRequestPayment] = useState([]);
  const [edpStatus, setEDPStatus] = useState([]);
  const [isPostingData, setIsPostingData] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [selecthandle, setSelecthandle] = useState([]);
  const [edpRefresh, setEDPRefresh] = useState([]);

  const [shipmentSort, SetShipmentSort] = useState([]);

  const [isAlertNoData, setIsAlertNoData] = useState(false);
  const [refreshData, SetRefreshData] = useState([]);

  const [isConfirmEdit, setIsConfirmEdit] = useState(false);

  const [selectValid, setSelectValid] = useState(false);
  const [checkBoxValue, setCheckBoxValue] = useState([]);

  /**ComboBox */

  const [transportType, setTransportType] = useState([]);

  const [roleUser, setRoleUser] = useState(null);

  const pageCode = "";

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
                      id="in-search-DeliveryDateStart"
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
                      id="in-search-DeliveryDateEnd"
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
                    {transportType.map((cb) => (
                      <option value={cb.valueMember}>
                        {cb.displayMember}{" "}
                      </option>
                    ))}
                  </CSelect>
                </Box>
              </CCol>
            </CFormGroup>

            <CFormGroup row className="ml-1 mr-1 p-0">
              <CCol xs="12" sm="6" md="12">
                <CLabel htmlFor="date-input">Shipment No</CLabel>
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
                    className="form-control"
                    id="in-search-ShipmentNo"
                    onChange={handleChangSearch}
                  ></CInput>
                  {/* <CSelect
                    className="form-control"
                    id="in-search-ShipmentNo"
                    onChange={handleChangSearch}
                  >
                    <option selected hidden value="">
                      {Constant.txtformPlaceholderSelected}
                    </option>
                    {transportType.map((cb) => (
                      <option value={cb.valueMember}>
                        {cb.displayMember}{" "}
                      </option>
                    ))}
                  </CSelect> */}
                </Box>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="ml-1 mr-1 p-0">
              <CCol xs="12" sm="6" md="12">
                <CLabel htmlFor="date-input">EDP Status</CLabel>
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
                    className=" form-control"
                    id="in-search-EDPStatus"
                    onChange={handleChangSearch}
                  >
                    <option selected value="">
                      {Constant.txtformEmptySelected}
                    </option>
                    {edpStatus.map((cb) => (
                      <option value={cb.displayMember}>
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

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
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

  const changedata = (item, index, type) => {
    if (type === "countrycode") {
      item.countryCode = document.getElementById(
        "In-countryCode-" + index
      ).value;
    }
  };

  const handleChangSearch = (e) => {
    var obj = {
      TransportType: null,
      DeliveryDateStart: "",
      DeliveryDateEnd: "",
      EDPStatus: "",
      ShipmentNo: "",
    };

    obj.TransportType =
      document.getElementById("in-search-DeliveryMode").value == ""
        ? null
        : document.getElementById("in-search-DeliveryMode").value;
    obj.DeliveryDateStart = document.getElementById(
      "in-search-DeliveryDateStart"
    ).value;
    obj.DeliveryDateEnd = document.getElementById(
      "in-search-DeliveryDateEnd"
    ).value;
    obj.EDPStatus = document.getElementById("in-search-EDPStatus").value;
    obj.ShipmentNo = document.getElementById("in-search-ShipmentNo").value;

    console.log(obj);

    setSearchData(obj);
  };

  const handleChangClear = (e) => {
    var obj = {
      DeliveryMode: "",
      DeliveryDateStart: "",
      DeliveryDateEnd: "",
      EDPStatus: "",
      ShipmentNo: "",
    };

    document.getElementById("in-search-DeliveryMode").value = "";
    document.getElementById("in-search-DeliveryDateStart").value = "";
    document.getElementById("in-search-DeliveryDateEnd").value = "";
    document.getElementById("in-search-EDPStatus").value = "";
    document.getElementById("in-search-ShipmentNo").value = "";

    console.log(obj);

    setSearchData(obj);
  };

  const onClickValidSearch = () => {
    if (getIsValidForm("search-header-need-validation")) {
      clickSearch();
    }
  };

  const clickSearch = () => {
    console.log(searchData);
    fnGetEDPListBySearch(searchData);
  };

  const handleChangeUpdateField = (type, index, id) => (e) => {
    console.log(1111);
    if (type === "initialReason") {
      var newArr = [...shipmentSort];
      newArr.find((x) => {
        if (x.shipmentNo === id) {
          if (e.target.value !== "") {
            // newArr[index].initialBy = 1;
            x.initialReason = e.target.value;
          } else {
            x.initialReason = "";
          }
        }
      });
      // if (e.target.value !== "") {
      //   // newArr[index].initialBy = 1;
      //   newArr[index].initialReason = e.target.value;
      // } else {
      //   newArr[index].initialReason = "";
      // }
      SetShipmentSort(newArr);
    } else if (type === "requestPayment") {
      var newArr = [...shipmentSort];
      // if (e.target.value !== "") {
      //   newArr[index].requestPaymentType = parseInt(e.target.value);
      // } else {
      //   newArr[index].requestPaymentType = null;
      // }
      newArr.find((x) => {
        if (x.shipmentNo === id) {
          if (e.target.value !== "") {
            x.requestPaymentType = e.target.value;
          } else {
            x.requestPaymentType = null;
          }
        }
      });
      SetShipmentSort(newArr);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ allColumns: true }} />
      </GridToolbarContainer>
    );
  }

  const ApproveLog = (type, id, reason) => {
    if (type === "Initial") {
      var textInitial = `EDP เอกสารถูก Initial โดย ${id} เนื่องจาก ${reason}`;
      // setTxtApprove(textInitial)
      return textInitial;
    }
    // else if (type === "Reject") {

    //     var textReject = `EDP เอกสารถูก Reject โดย ${id} เพราะ ${reason} `
    //     // setTxtReject(textReject)

    //     return textReject

    // }
  };

  const onChangeInitial = () => {
    if (selecthandle.length) {
      if (getIsValidForm("initialReason-need-validation")) {
        setIsConfirmSave(!isConfirmSave);
      }
    } else {
      // setIsConfirmSave(!isConfirmSave)
    }
  };

  // const onChangeReJectAdd = () => {
  //     selecthandle.find((x) => {
  //         x.rejectBy = 1

  //     })
  //     console.log(selecthandle)
  //     fnEditEDPList(selecthandle)
  // }

  const saveChange = () => {
    var newArr = [];

    selecthandle.map((x) => {
      var newObj = {
        ShipmentNo: "",
        ExtraChargeDocNo: "",
        Description: "",
        CreateByName: "",
        CreateBy: null,
      };

      newObj.ShipmentNo = x.shipmentNo;
      newObj.ExtraChargeDocNo = "";
      newObj.Description = ApproveLog("Initial", username, x.initialReason);
      newObj.CreateByName = username;
      newObj.CreateBy = userid;

      newArr.push(newObj);
      console.log(newArr);
    });
    selecthandle.find((x) => {
      x.initialBy = userid;
    });
    console.log(selecthandle);

    fnEditEDPList(selecthandle);
    fnInsertHistoryLog(newArr);
  };

  const handleChangeSelect = (item, index) => (e) => {
    var newArr = [];
    item.checkBox = e.target.checked;
    // console.log(e.target.checked)
    var status = false;
    if (e.target.checked === true) {
      if (selecthandle.length) {
        newArr = [...selecthandle];
      }
      newArr.map((x) => {
        if (x.shipmentNo === item.shipmentNo) {
          console.log("rejectBy = 1");
          x.requestPaymentType = item.requestPaymentType;
          x.initialReason = item.initialReason;

          status = true;
        } else {
          status = false;
        }
      });
      if (status === false) {
        newArr.push(item);
      }
      setSelecthandle(newArr);
      console.log(selecthandle);
    } else if (e.target.checked === false) {
      var lists = selecthandle.filter((x) => {
        return x.shipmentNo != item.shipmentNo;
      });
      setSelecthandle(lists);
      console.log("selecthandle", selecthandle);
    }
  };

  const notChoose = (index) => {
    // console.log(index)
    // console.log(selecthandle)

    var status = false;
    var check = selecthandle.find((x) => x.shipmentNo === index);
    if (check) {
      status = true;
      console.log(status);
      setSelectValid(status);
      return status;
      // selecthandle.find((x) => {
      //     if (x.requestPaymentType === 0) {
      //         console.log(111)
      //         console.log(x.requestPaymentTyp)
      //         setSelectValid(status)
      //         return status

      //     }
      // })
    } else {
      status = false;
      // console.log(status)
      setSelectValid(status);
      return status;
    }
  };

  const mainTable = () => {
    return (
      <CCard
        className="pl-1 pr-1"
        style={{ maxHeight: "700px", overflowY: "auto" }}
      >
        <CForm
          className="initialReason-need-validation"
          //  style={{height: "10px !important" , overflowY: "scroll", overflowX: "scroll" , maxHeight : "500px" }}
        >
          <CDataTable
            // columnFilter
            tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
            itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
            className="CDataTable"
            items={shipmentSort}
            fields={fields}
            responsive
            // striped
            bordered
            // switcher
            // size={'xl'}
            itemsPerPage={10}
            pagination
            scopedSlots={{
              edpstatus: (item) => (
                <td>
                  <h4>
                    <CBadge color={getBadge(item.edpstatus)}>
                      {item.edpstatus}
                    </CBadge>
                  </h4>
                </td>
              ),

              manage: (item, index) => {
                return (
                  <td className="py-2">
                    <Checkbox
                      defaultChecked={false}
                      color="primary"
                      onChange={handleChangeSelect(item, item.shipmentNo)}
                      id={"checkbox-select-" + index}
                      checked={item.checkBox}
                      // onChange={(event) => {
                      //   setisActive(event.target.value);
                      // }}
                    />
                  </td>
                );
              },
              initialReason: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      valid={selectValid}
                      value={item.initialReason}
                      onChange={handleChangeUpdateField(
                        "initialReason",
                        index,
                        item.shipmentNo
                      )}
                      required={notChoose(item.shipmentNo)}
                    />
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </td>
                );
              },

              requestPaymentType: (item, index) => {
                return (
                  <td className="py-2">
                    <CSelect
                      id="header-contractStatus"
                      onChange={handleChangeUpdateField(
                        "requestPayment",
                        index,
                        item.shipmentNo
                      )}
                      value={item.requestPaymentType}
                      required
                    >
                      {requestPayment.map((cb) => (
                        <option value={cb.valueMember}>
                          {cb.displayMember}{" "}
                        </option>
                      ))}
                    </CSelect>
                  </td>
                );
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
          <CButton color="success" onClick={saveChange}>
            {Constant.btOK}
          </CButton>{" "}
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

  const onClickRefresh = () => {
    var newArr = [];
    console.log(selecthandle);
    selecthandle.map((x) => {
      var newObj = {
        shipmentNo: null,
      };
      newObj.shipmentNo = x.shipmentNo;
      newArr.push(newObj);
    });

    fnEDPRefreshData(newArr);
  };

  const getshipment = (arr, brr) => {
    // console.log(shipment)
    // console.log(edplist)
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

    SetShipmentSort(newArr);
  };

  const fnGetCbTransportType = () => {
    Repository.fetchCbTransportType().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setTransportType(result.data.filter((x) => x.valueMember === "1" || x.valueMember === "2"));
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

  // const fnGetEDPRefreshData = (arr) => {
  //   Repository.fetchGetEDPRefreshData(arr).then(
  //     (result) => {
  //       setIsLoaded(true);
  //       if (result.httpCode === "200") {
  //         setEDPRefresh(result.data);
  //       } else {
  //         setError(result);
  //       }
  //     },
  //     (error) => {
  //       setIsLoaded(true);
  //       setError(error);
  //     }
  //   );
  // };

  // const fnGetEDPList = () => {
  //   Repository.fetchEDPList().then(
  //     (result) => {
  //       setIsLoaded(true);
  //       if (result.httpCode === "200") {
  //         setEdplist(result.data);
  //       } else {
  //         setError(result);
  //       }
  //     },
  //     (error) => {
  //       setIsLoaded(true);
  //       setError(error);
  //     }
  //   );
  // };
  const fnGetCbRequestPayment = () => {
    Repository.fetchCbRequestPayment().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setRequestPayment(result.data);
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

  const fnEDPRefreshData = (arr) => {
    setIsPostingData(true);
    Repository.fetchEDPRefresh(arr).then(
      (result) => {
        // setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          fnGetEDPListBySearch(searchData);
        } else {
          setError(result);
        }
      },
      (error) => {
        // setIsPostingData(false);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetEDPListBySearch = (arr) => {
    setIsPostingData(true);
    Repository.fetchEDPListBySearch(arr).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          result.data.find((x) => {
            var date = new Date(x.deliveryDate);
            var formattedDate = format(date, "dd-MM-yyyy H:mm:mm");
            // let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}T${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;

            x.deliveryDate = formattedDate;
            // if (x.deliveryMode === null) {
            //   x.deliveryMode = "";
            // }
            // if (x.initialBy === null) {
            //   x.initialBy = "";
            // }
            // if (x.initialReason === null) {
            //   x.initialReason = "";
            // }
            // if (x.initialDatetime === null) {
            //   x.initialDatetime = "";
            // }
            // if (x.approveBy === null) {
            //   x.approveBy = "";
            // }
            // if (x.approveDatetime === null) {
            //   x.approveDatetime = "";
            // }
            // if (x.rejectBy === null) {
            //   x.rejectBy = "";
            // }
            // if (x.rejectReason === null) {
            //   x.rejectReason = "";
            // }
            // if (x.rejectDatetime === null) {
            //   x.rejectDatetime = "";
            // }
          });

          SetShipmentSort(FunctionController.setEmptyValueInArray(result.data));

          // SetShipmentSort(result.data);
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

  const fnGetCbEDPStatus = () => {
    Repository.fetchCbEDPStatus().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setEDPStatus(result.data);
        } else {
          console.log(result);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const fnEditEDPList = (arr) => {
    setIsPostingData(true);
    Repository.fetchEditEDPList(arr).then(
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

  const fnInsertHistoryLog = (arr) => {
    console.log(arr);
    setIsPostingData(true);
    Repository.fetchInsertHistoryLog(arr).then(
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
    fnGetCbTransportType();
    fnGetCbRequestPayment();
    fnGetCbEDPStatus();
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
                      <h3 className="headtext">
                        {Constant.txtHeaderEDPInitial}
                      </h3>
                    </CCol>
                  </CRow>
                </CCardHeader>
                {/* </Box> */}
                <CCardBody>
                  {/* {importExcel()} */}
                  {mainFormSearch()}
                  {mainTable()}
                  <CFormGroup class="d-flex justify-content-between">
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
                            Refresh DWH
                          </CButton>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="10" sm="7" md="2">
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
                            color="success"
                            onClick={onChangeInitial}
                          >
                            บันทึก
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
