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
import { SheetJSApp } from "./Exellim";
import readXlsxFile from "read-excel-file";
import { format } from "date-fns";
import moment from "moment";

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
  CSpinner,
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

const headeredit = [
  "DeliveryStatus",
  "CheckInInfo",
  "PlanDelivery",
  "CheckInTimestamp",
  "SubmittoServerTimestamp",
  "ApproveCheckInOffline",
  "SalesOrg",
  "SalesOrg.",
  "OrderNumber",
  "DeliveryNumber",
  "LoadDate",
  "LoadTime",
  "ConfirmedDate",
  "ConfirmedTime",
  "ShipmentNumber",
  "OwnerCompany",
  "Channel",
  "PayerCode",
  "PayerName",
  "ShipToCode",
  "ShipToName",
  "ShipToAddress",
  "DeliveryDate",
  "ShippingType",
  "ShippingTypeDescription",
  "LicenseNumber",
  "ForwardingAgentCode",
  "ForwardingAgentName",
  "TabletNumber",
  "UnloadingMethod",
  "UnloadingMethodDescription",
  "ContainerNumber",
  "SealNumber",
  "MaterialCode",
  "Grade",
  "Plant",
  "Batch",
  "Quantity",
  "SumDiffQty",
  "Unit",
  "ManualCloseBy",
  "ManualCloseDate",
  "ManualCloseTime",
  "ManualCloseReason",
  "ReferenceDeliveryNumber",
  "Remark",
  "DriverSignFlag",
  "ApproveCheck-In&SignOutsideLocationFlag",
  "ApproveCheck-In&SignOutside LocationComment",
  "FeedbackPoint",
  "FeedbackComment",
];

const fields = [
  {
    key: `${Constant.arrFieldEDPHeader[0]}`,
    label: `${Constant.arrFieldEDPHeader[0]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[1]}`,
    label: `${Constant.arrFieldEDPHeader[1]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[2]}`,
    label: `${Constant.arrFieldEDPHeader[2]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[3]}`,
    label: `${Constant.arrFieldEDPHeader[3]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[4]}`,
    label: `${Constant.arrFieldEDPHeader[4]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[5]}`,
    label: `${Constant.arrFieldEDPHeader[5]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[6]}`,
    label: `${Constant.arrFieldEDPHeader[6]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[7]}`,
    label: `${Constant.arrFieldEDPHeader[7]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[8]}`,
    label: `${Constant.arrFieldEDPHeader[8]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[9]}`,
    label: `${Constant.arrFieldEDPHeader[9]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[10]}`,
    label: `${Constant.arrFieldEDPHeader[10]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[11]}`,
    label: `${Constant.arrFieldEDPHeader[11]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[12]}`,
    label: `${Constant.arrFieldEDPHeader[12]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[13]}`,
    label: `${Constant.arrFieldEDPHeader[13]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[14]}`,
    label: `${Constant.arrFieldEDPHeader[14]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[15]}`,
    label: `${Constant.arrFieldEDPHeader[15]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[16]}`,
    label: `${Constant.arrFieldEDPHeader[16]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[17]}`,
    label: `${Constant.arrFieldEDPHeader[17]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[18]}`,
    label: `${Constant.arrFieldEDPHeader[18]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[19]}`,
    label: `${Constant.arrFieldEDPHeader[19]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[20]}`,
    label: `${Constant.arrFieldEDPHeader[20]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[21]}`,
    label: `${Constant.arrFieldEDPHeader[21]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[22]}`,
    label: `${Constant.arrFieldEDPHeader[22]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[23]}`,
    label: `${Constant.arrFieldEDPHeader[23]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[24]}`,
    label: `${Constant.arrFieldEDPHeader[24]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[25]}`,
    label: `${Constant.arrFieldEDPHeader[25]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[26]}`,
    label: `${Constant.arrFieldEDPHeader[26]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[27]}`,
    label: `${Constant.arrFieldEDPHeader[27]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[28]}`,
    label: `${Constant.arrFieldEDPHeader[28]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[29]}`,
    label: `${Constant.arrFieldEDPHeader[29]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[30]}`,
    label: `${Constant.arrFieldEDPHeader[30]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[31]}`,
    label: `${Constant.arrFieldEDPHeader[31]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[32]}`,
    label: `${Constant.arrFieldEDPHeader[32]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[33]}`,
    label: `${Constant.arrFieldEDPHeader[33]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[34]}`,
    label: `${Constant.arrFieldEDPHeader[34]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[35]}`,
    label: `${Constant.arrFieldEDPHeader[35]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[36]}`,
    label: `${Constant.arrFieldEDPHeader[36]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[37]}`,
    label: `${Constant.arrFieldEDPHeader[37]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[38]}`,
    label: `${Constant.arrFieldEDPHeader[38]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[39]}`,
    label: `${Constant.arrFieldEDPHeader[39]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[40]}`,
    label: `${Constant.arrFieldEDPHeader[40]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[41]}`,
    label: `${Constant.arrFieldEDPHeader[41]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[42]}`,
    label: `${Constant.arrFieldEDPHeader[42]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[43]}`,
    label: `${Constant.arrFieldEDPHeader[43]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[44]}`,
    label: `${Constant.arrFieldEDPHeader[44]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[45]}`,
    label: `${Constant.arrFieldEDPHeader[45]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[46]}`,
    label: `${Constant.arrFieldEDPHeader[46]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[47]}`,
    label: `${Constant.arrFieldEDPHeader[47]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[48]}`,
    label: `${Constant.arrFieldEDPHeader[48]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[49]}`,
    label: `${Constant.arrFieldEDPHeader[49]}`,
  },
  {
    key: `${Constant.arrFieldEDPHeader[50]}`,
    label: `${Constant.arrFieldEDPHeader[50]}`,
  },
  //   {
  //     key: `${Constant.arrFieldEDPHeader[51]}`,
  //     label: `${Constant.arrFieldEDPHeader[51]}`,
  //   },
  //   {
  //     key: `${Constant.arrFieldEDPHeader[52]}`,
  //     label: `${Constant.arrFieldEDPHeader[52]}`,
  //   },

  // {
  //     key: "show_details",
  //     label: "",
  //     _style: { width: "1%" },
  //     sorter: false,
  //     filter: false,
  // },
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
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [accordion, setAccordion] = useState(1);
  const [fade, setFade] = useState(true);
  const [validations, setValidate] = useState(false);
  const [countryCode, setcountryCode] = useState();
  const [countryNameEng, setcountryNameEng] = useState();
  const [countryNameThai, setcountryNameThai] = useState();
  const [isActive, setisActive] = useState(true);
  const [IncountryCode, setIncountryCode] = useState();
  const [IncountryNameEng, setIncountryNameEng] = useState();
  const [IncountryNameThai, setIncountryNameThai] = useState();
  const [InisActive, setInisActive] = useState(true);
  const [errtxt, seterrtxt] = useState("กรอกข้อมูลให้ครบถ้วน");
  const [edplist, setEdplist] = useState([]);
  const [selecthandle, setSelecthandle] = useState([]);
  // const [fieldIm, setFieldIm] = useState([]);
  // const [itemexcel, setItemexcel] = useState([]);

  /**API */
  const [isPostingData, setIsPostingData] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const options = {
    method: "POST",
  };

  /**ComboBox */

  const [transportType, setTransportType] = useState([]);

  //

  const [roleUser, setRoleUser] = useState(null);

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

  const flatMap = (date, time) => {
    // console.log(date)
    if (date !== "") {
      if (date !== undefined) {
        if (time === undefined) {
          // console.log(date)
          var myArr = date.split("/");
          var yeartime = myArr[2];
          var arrYearTime = yeartime.split(" ");
          var newStr =
            arrYearTime[0] +
            "-" +
            myArr[1] +
            "-" +
            myArr[0] +
            "T" +
            arrYearTime[1];

          return newStr;
        } else {
          var myArr = date.split("/");
          var newStr = myArr[2] + "-" + myArr[1] + "-" + myArr[0] + "T" + time;
          // console.log(newStr);
          return newStr;
        }
      } else {
        var newStr = "";
        return newStr;
      }
    }

    // var date = "19/09/2021";
    // var time = "09:30:15";
  };
  const flatMap2 = (date, time) => {
    console.log(date);
    var myArr = date.split("/");
    var yeartime = myArr[2];
    var arrYearTime = yeartime.split(" ");
    var newStr = arrYearTime[0] + "-" + myArr[1] + "-" + myArr[0];

    return newStr;
  };
  const flatMap3 = (date) => {
    if (date !== null) {
      if (date !== "") {
        if (date !== undefined) {
          console.log(date);
          var myArr = date.split("/");
          var yeartime = myArr[2];
          var arrYearTime = yeartime.split(" ");
          var newStr = arrYearTime[0] + "-" + myArr[1] + "-" + myArr[0];

          return newStr;
        } else {
          var newStr = "";
          return newStr;
        }
      } else {
        var newStr = "";
        return newStr;
      }
    } else {
      var newStr = "";
      return newStr;
    }
  };

  const onClickAddData = () => {
    var newArr = [];
    // console.log(itemexcel)
    var ShipmentNo;
    var DeliveryNo;
    var OrderNo;
    var SalesOrg;
    var CompanyId;
    var ShipTo;
    var DeliveryStatus;
    var CheckIn;
    var PlanDelivery;
    var LoadDatetime;
    var ConfirmDatetime;
    var Channel;
    var DeliveryDate;
    var ShippingType;
    var TruckLicense;
    var TransporterCode;
    var UnloadingCode;
    var Qty;

    if (itemexcel.length) {
      itemexcel.map((x) => {
        var obj = [
          ShipmentNo,
          DeliveryNo,
          OrderNo,
          SalesOrg,
          CompanyId,
          ShipTo,
          DeliveryStatus,
          CheckIn,
          PlanDelivery,
          LoadDatetime,
          ConfirmDatetime,
          Channel,
          DeliveryDate,
          ShippingType,
          TruckLicense,
          TransporterCode,
          UnloadingCode,
          Qty,
        ];

        obj.ShipmentNo =
          typeof x.ShipmentNumber === "number"
            ? x.ShipmentNumber.toString()
            : x.ShipmentNumber;
        obj.DeliveryNo =
          typeof x.DeliveryNumber === "number"
            ? x.DeliveryNumber.toString()
            : x.DeliveryNumber;
        obj.OrderNo =
          typeof x.OrderNumber === "number"
            ? x.OrderNumber.toString()
            : x.OrderNumber;
        obj.SalesOrg = x.SalesOrg;
        obj.CompanyId = x.OwnerCompany;
        obj.ShipTo = x.ShipToCode;
        obj.DeliveryStatus = x.DeliveryStatus;
        obj.CheckIn = x.CheckInInfo;
        console.log(x.PlanDelivery);
        obj.PlanDelivery =
          x.PlanDelivery === undefined ? "" : flatMap3(x.PlanDelivery);

        obj.LoadDatetime = flatMap(x.LoadDate, x.LoadTime);
        obj.ConfirmDatetime = flatMap(x.ConfirmedDate, x.ConfirmedTime);
        obj.Channel = x.Channel;
        obj.DeliveryDate =
          x.DeliveryDate === undefined ? "" : flatMap2(x.DeliveryDate);
        obj.ShippingType = x.ShippingType;
        obj.TruckLicense = x.LicenseNumber;
        obj.TransporterCode = x.ForwardingAgentCode;
        obj.UnloadingCode = x.UnloadingMethod;
        obj.Qty = parseFloat(x.Quantity);

        obj.splice(0, 18);

        newArr.push(obj);
      });
    }

    // setIsConfirmSave(!isConfirmSave);

    // var obj = [truckTypeCode, truckTypeName, truckTypeDesc, loadWeight, isActive, createBy];
    console.log(newArr);

    fnInsertEDPEx(newArr);
  };

  //* IMPORT EXCEL//

  const [fieldIm, setFieldIm] = useState([]);
  const [itemexcel, setItemexcel] = useState([]);

  const rows = [];
  const convertToJson = (headers, data) => {
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });

    // console.log(rows)
    rows.map((x) => {
      if (x.SealNumber === undefined) {
        x.SealNumber = "";
      }
      if (x.ManualCloseReason === undefined) {
        x.ManualCloseReason = "";
      }
      if (x.ReferenceDeliveryNumber === undefined) {
        x.ReferenceDeliveryNumber = "";
      }
      if (x.FeedbackPoint === undefined) {
        x.FeedbackPoint = "";
      }
    });
    console.log(rows);
    return rows;
  };

  // const uploadExcel = (e) => {

  //     const file = e.target.files[0]

  //     const reader = new FileReader()
  //     reader.onload = (event) => {

  //         const bstr = event.target.result
  //         const workBook = XLSX.read(bstr, { type: "binary" })

  //         const workSheetName = workBook.SheetNames[0]
  //         const workSheet = workBook.Sheets[workSheetName]

  //         const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

  //         console.log(fileData)

  //         const headers = fileData[0]

  //         const heads = headers.map(head => ({ key: head }))

  //         setFieldIm(heads)
  //         fileData.splice(0, 1)

  //         setItemexcel(convertToJson(headers, fileData))

  //     }

  //     reader.readAsBinaryString(file)

  // }

  const uploadExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      // const workSheetName = workBook.SheetNames[1]
      // console.log(workSheetName)
      // const workSheet = workBook.Sheets[workSheetName]

      const workSheetName = "Data";

      // workSheetName.includes("Data")
      // console.log(workSheetName)
      const workSheet = workBook.Sheets[workSheetName];
      console.log(workSheet);

      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      console.log(fileData);
      const headeredit = [
        "DeliveryStatus",
        "CheckInInfo",
        "PlanDelivery",
        "CheckInTimestamp",
        "SubmittoServerTimestamp",
        "ApproveCheckInOffline",
        "SalesOrg",
        "SalesOrg.",
        "OrderNumber",
        "DeliveryNumber",
        "LoadDate",
        "LoadTime",
        "ConfirmedDate",
        "ConfirmedTime",
        "ShipmentNumber",
        "OwnerCompany",
        "Channel",
        "PayerCode",
        "PayerName",
        "ShipToCode",
        "ShipToName",
        "ShipToAddress",
        "DeliveryDate",
        "ShippingType",
        "ShippingTypeDescription",
        "LicenseNumber",
        "ForwardingAgentCode",
        "ForwardingAgentName",
        "TabletNumber",
        "UnloadingMethod",
        "UnloadingMethodDescription",
        "ContainerNumber",
        "SealNumber",
        "MaterialCode",
        "Grade",
        "Plant",
        "Batch",
        "Quantity",
        "SumDiffQty",
        "Unit",
        "ManualCloseBy",
        "ManualCloseDate",
        "ManualCloseTime",
        "ManualCloseReason",
        "ReferenceDeliveryNumber",
        "Remark",
        "DriverSignFlag",
        "ApproveCheck-In&SignOutsideLocationFlag",
        "ApproveCheck-In&SignOutside LocationComment",
        "FeedbackPoint",
        "FeedbackComment",
      ];
      // const headers = fileData[0]
      // console.log(headeredit)
      const heads = headeredit.map((head) => ({ key: head }));
      console.log(fileData);
      // setFieldIm(heads)
      // setItemexcel(fileData)
      fileData.splice(0, 1);
      //   console.log(fileData);
      setItemexcel(convertToJson(headeredit, fileData));
      console.log(itemexcel);
    };

    reader.readAsBinaryString(file);
  };

  const importExcel = () => {
    return (
      <Box
        className="border-set"
        component={Grid}
        item
        boxShadow={1}
        xs={{
          width: " 100%",
        }}
      >
        <CCard className="p-3">
          <CFormGroup row className="ml-1 mr-1 p-0">
            <CCol xs="12" sm="6" md="12">
              <CLabel htmlFor="date-input">อัพโหลดไฟล์</CLabel>
            </CCol>
            <CFormGroup>
              <CCol xs="12" md="9">
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CInputFile
                    id="file-input"
                    name="file-input"
                    onChange={uploadExcel}
                  />
                </Box>
              </CCol>
            </CFormGroup>
          </CFormGroup>
          <CFormGroup row className="ml-1 mr-1 p-0">
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
                    color="success"
                    onClick={onClickAddData}
                  >
                    Upload
                  </CButton>
                </Box>
              </CFormGroup>
            </CCol>
          </CFormGroup>
        </CCard>
      </Box>
    );
  };

  //

  const mainFormSearch = () => (
    <CForm className="search-header-need-validation">
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
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                  />
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
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                  />
                </Box>
              </CCol>
            </CFormGroup>
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
                    id="header-contractStatus"
                    required
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
                <CLabel htmlFor="date-input">อัพโหลดไฟล์</CLabel>
              </CCol>
              <CFormGroup>
                <CCol xs="12" md="9">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CInputFile id="file-input" name="file-input" />
                  </Box>
                </CCol>
              </CFormGroup>
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
                      size="sm"
                      block
                      color="success"
                      // onClick={searchData()}
                    >
                      Upload
                    </CButton>
                  </Box>
                </CFormGroup>
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
                    <CButton type="submit" size="sm" block color="warning">
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
                      size="sm"
                      block
                      color="danger"
                      // onClick={searchData()}
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

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

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
        closeOnBackdrop="false"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentUploadSuccess}</CModalBody>
        <CModalFooter>
          {/* <CButton color="success" onClick={saveChange}>
            {Constant.btOK}
          </CButton>{" "} */}
          <CButton
            color="secondary"
            onClick={(e) => window.location.reload(false)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Add Modal */}
    </div>
  );



  const mainTable = () => {
    return (
      <CCard
        className="pl-1 pr-1"
        style={{ maxHeight: "700px", overflowY: "auto" }}
      >
        <CDataTable
          // columnFilter
          tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
          itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
          className="CDataTable"
          items={itemexcel}
          fields={fields}
          responsive
          // hover
          // striped
          bordered
          // switcher
          itemsPerPage={10}
          pagination
          scopedSlots={{
            dropdownSelect: (item) => {
              return (
                <td className="py-2">
                  <CSelect className="form-control" id="port-id" required>
                    <option selected value="">
                      เลือกสถานะ
                    </option>
                    <option value="">จ่าย</option>
                    <option value="">ไม่จ่าย</option>

                    {/* {source.map((cb) => <option value={cb.sourceId} >{`[${cb.sourceCode}]` + '  ' + cb.sourceNameThai}  </option>)} */}
                  </CSelect>
                </td>
              );
            },
            // show_details: (item, index) => {
            //     return (
            //         <td className="py-2">
            //             <CButton
            //                 color="primary"
            //                 variant="outline"
            //                 shape="square"
            //                 size="sm"
            //                 onClick={() => {
            //                     toggleDetails(index);
            //                 }}
            //             >
            //                 {details.includes(index) ? "ซ่อน" : "แสดง"}
            //             </CButton>
            //         </td>
            //     );
            // },
          }}
        />
      </CCard>
    );
  };

  // const modalDialog = () => (
  //   <div>
  //     {/* Start AllPayNo  Modal */}
  //     <CModal
  //       show={isAllPayNo}
  //       onClose={() => setIsAllPayNo(!isAllPayNo)}
  //       color="warning"
  //       closeOnBackdrop="false"
  //       centered
  //     >
  //       <CModalHeader closeButton>
  //         <h5>
  //           <CModalTitle>แจ้งเตือน</CModalTitle>
  //         </h5>
  //       </CModalHeader>
  //       <CModalBody>
  //         <CRow className="justify-content-center">
  //           <CLabel style={{ fontSize: "16px" }}>อัพโหลดไฟล์สำเร็จ</CLabel>
  //         </CRow>
  //       </CModalBody>
  //       <CModalFooter>
  //         <CButton
  //           color="secondary"
  //           onClick={(e) => window.location.reload(false)}
  //         >
  //           {Constant.btOK}
  //         </CButton>
  //       </CModalFooter>
  //     </CModal>
  //     {/* End AllPayNo Modal */}
  //   </div>
  // );

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

  const fnGetEDPList = () => {
    Repository.fetchEDPList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setEdplist(result.data);
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

  const fnInsertEDPEx = (arrData) => {
    setIsPostingData(true);
    Repository.fetchInsertEDPEx(arrData).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setIsConfirmSave(true)
          // window.location.reload(false);
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
    // fnGetEDPList();
  }, []);

  // const API =
  //     "http://192.168.88.128/PION.SCG.SMP.WebAPI/api/Location/GetCountryList";
  // const { data, error, isLoaded } = useFetch(API);

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">Fetch Error : {error.message}</div>
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">Loading...</div>
        </div>
      </div>
    );
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
                        {Constant.txtHeaderImportEDPFile}
                      </h3>
                    </CCol>
                  </CRow>
                </CCardHeader>
                {/* </Box> */}
                <CCardBody>
                  {importExcel()}
                  {/* {mainFormSearch()} */}
                  {mainTable()}
                  <CFormGroup class="d-flex justify-content-end"></CFormGroup>
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
