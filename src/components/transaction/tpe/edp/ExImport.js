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
import navigation from "../../../../containers/_nav";
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
  CSpinner,
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
  // {
  //     key: "manage",
  //     label: "",
  //     _style: { width: "1%" },
  //     sorter: false,
  //     filter: false,
  // },
  {
    key: "SONo",
    label: "SONo",
  },
  {
    key: "MaterialCode",
    label: "MaterialCode",
  },
  {
    key: "PackageType",
    label: "PackageType",
  },
  {
    key: "MaterialGroup",
    label: "MaterialGroup",
  },
  ,
  {
    key: "SOQty",
    label: "SOQty",
  },
  {
    key: "LoadingLocation",
    label: "LoadingLocation",
  },
  {
    key: "ContainerSize",
    label: "ContainerSize",
  },
  {
    key: "NOofContainer",
    label: "NOofContainer",
  },
  {
    key: "LoadDate",
    label: "LoadDate",
  },

  {
    key: "HaulageName",
    label: "HaulageName",
  },
  {
    key: "ShippingAccountName",
    label: "ShippingAccountName",
  },
  {
    key: "PlaceContainerReturn",
    label: "PlaceContainerReturn",
  },
  {
    key: "CYPlace",
    label: "CYPlace",
  },
  {
    key: "BookerNote",
    label: "BookerNote",
  },
  {
    key: "RemarkforInternal",
    label: "RemarkforInternal",
  },
  {
    key: "ShipTo",
    label: "ShipTo",
  },
  {
    key: "ShipToName",
    label: "ShipToName",
  },

  {
    key: "ShipToCountry",
    label: "ShipToCountry",
  },
  {
    key: "BookingNo",
    label: "BookingNo",
  },
  // {
  //     key: "ShipTo",
  //     label: "ShipTo",

  // },

  {
    key: "ShipAgentName",
    label: "ShipAgentName",
  },
  {
    key: "ShippingMarks",
    label: "ShippingMarks",
  },
  {
    key: "ShipFromName",
    label: "ShipFromName",
  },

  {
    key: "Plant",
    label: "Plant",
  },
  {
    key: "ModeOfTransport",
    label: "ModeOf",
  },
  {
    key: "Channel",
    label: "Channel",
  },

  {
    key: "SOItemNo",
    label: "SOItemNo",
  },
  {
    key: "SalesOrg",
    label: "SalesOrg",
  },
  // {
  //     key: "show_details",
  //     label: "",
  //     _style: { width: "1%" },
  //     sorter: false,
  //     filter: false,
  // },
];

const usersData = [
  {
    id: 0,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 1,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "Not OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 2,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "OK(With Condition)",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 3,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 4,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "Not OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 5,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "OK(With Condition)",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 6,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 7,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "Not OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 8,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "OK(With Condition)",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 9,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "Not OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 10,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
  {
    id: 11,
    shipmentNo: "12123",
    deliveryNo: "0321123",
    sourcTo: "TPE",
    shipTo: "LCB",
    truckType: "10W",
    carLicense: "1A-1011",
    status: "Not OK",
    statusBy: "1",
    statusTime: "2018/01/01",
    reasonApprove: "",
    reasonStatus: "pending",
  },
];

const ExImport = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
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
  const [isPostingData, setIsPostingData] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  // const [fieldIm, setFieldIm] = useState([]);
  // const [itemexcel, setItemexcel] = useState([]);
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
    console.log(itemexcel);
    var newArr = [];
    // console.log(itemexcel)
    var SONo;
    var SalesOrgCode;
    var SalesOrgName;
    var MaterialCode;
    var PackageTypeCode;
    var PackageType;
    var MaterialGroup;
    var Soqty;
    var LoadingLocationCode;
    var LoadingLocation;
    var ContainerSize;
    var ContainerCode;
    var NOofContainer;
    var LoadDate;
    var HaulageName;
    var HaulageCode;
    var ShippingAccountCode;
    var ShippingAccountName;
    var PlaceContainerReturnCode;
    var PlaceContainerReturn;
    var CyplaceCode;
    var CyplaceName;
    var BookerNote;
    var RemarkforInternal;
    var ShipTo;
    var ShipToName;
    var ShipToCountry;
    var BookingNo;
    var ShipAgentCode;
    var ShipAgentName;
    var ShippingMarks;
    var ShipFromName;
    var ShipFromCode;
    var Plant;
    var ModeOfTransport;
    var Channel;
    var SoitemNo;

    if (itemexcel.length) {
      itemexcel.map((x) => {
        var newObj = [
          SONo,
          SalesOrgCode,
          SalesOrgName,
          MaterialCode,
          PackageTypeCode,
          PackageType,
          MaterialGroup,
          Soqty,
          LoadingLocationCode,
          LoadingLocation,
          ContainerSize,
          ContainerCode,
          NOofContainer,
          LoadDate,
          HaulageName,
          HaulageCode,
          ShippingAccountCode,
          ShippingAccountName,
          PlaceContainerReturnCode,
          PlaceContainerReturn,
          CyplaceCode,
          CyplaceName,
          BookerNote,
          RemarkforInternal,
          ShipTo,
          ShipToName,
          ShipToCountry,
          BookingNo,
          ShipAgentCode,
          ShipAgentName,
          ShippingMarks,
          ShipFromCode,
          ShipFromName,
          Plant,
          ModeOfTransport,
          Channel,
          SoitemNo,
        ];
        newObj.SONo = x.SONo.toString();
        // console.log(x.SalesOrg)
        var mySalesOrg = x.SalesOrg.split("-");
        // console.log(mySalesOrg)
        newObj.SalesOrgCode = mySalesOrg[0];
        newObj.SalesOrgName = mySalesOrg[1];
        newObj.MaterialCode = x.MaterialCode;
        var myPackageType = x.PackageType.split("-");
        // console.log(myPackageType)
        newObj.PackageTypeCode = myPackageType[0];
        newObj.PackageType = myPackageType[1];
        newObj.MaterialGroup = x.MaterialGroup;
        newObj.Soqty = x.SOQty;
        var myLoadingLocation = x.LoadingLocation.split("-");
        newObj.LoadingLocationCode = myLoadingLocation[0];
        newObj.LoadingLocation =
          myLoadingLocation[1] + "-" + myLoadingLocation[2];
        var myContainerSize = x.ContainerSize.split("-");
        // console.log(myContainerSize)
        newObj.ContainerSize = myContainerSize[1];
        newObj.ContainerCode = myContainerSize[0];
        // console.log(x.NOofContainer)
        newObj.NOofContainer = x.NOofContainer;
        newObj.LoadDate = flatMap2(x.LoadDate);
        var myHaulage = x.HaulageName.split("-");
        // console.log(myHaulage)
        newObj.HaulageName = myHaulage[1];
        newObj.HaulageCode = myHaulage[0];
        var myShippingAccountName = x.ShippingAccountName.split("-");
        newObj.ShippingAccountCode = myShippingAccountName[0];
        newObj.ShippingAccountName = myShippingAccountName[1];
        var myPlaceContainerReturn = x.PlaceContainerReturn.split("-");
        newObj.PlaceContainerReturnCode = myPlaceContainerReturn[0];
        newObj.PlaceContainerReturn = myPlaceContainerReturn[1];
        var myCYPlace = x.CYPlace.split("-");
        newObj.CyplaceCode = myCYPlace[0];
        newObj.CyplaceName = myCYPlace[1];
        newObj.BookerNote = x.BookerNote;
        newObj.RemarkforInternal = x.RemarkforInternal;
        newObj.ShipTo = x.ShipTo;
        newObj.ShipToCountry = x.ShipToCountry;
        newObj.BookingNo = x.BookingNo;
        var myShipAgentName = x.ShipAgentName.split("-");
        // console.log(myShipAgentName)
        newObj.ShipAgentCode = myShipAgentName[0];
        newObj.ShipAgentName = myShipAgentName[1];
        newObj.ShippingMarks = x.ShippingMarks;
        console.log(x.ShipFromName);
        var myShipFromName = x.ShipFromName.split("-");
        // console.log(myShipFromName)
        newObj.ShipFromCode = myShipFromName[0];
        newObj.ShipFromName = myShipFromName[1];
        newObj.Plant = x.Plant;
        newObj.ModeOfTransport = x.ModeOfTransport;
        newObj.Channel = x.Channel;
        newObj.SoitemNo = x.SOItemNo;

        newObj.splice(0, 36);

        newArr.push(newObj);
        // console.log(newObj)
      });
    }

    // setIsConfirmSave(!isConfirmSave);

    // var obj = [truckTypeCode, truckTypeName, truckTypeDesc, loadWeight, isActive, createBy];
    // console.log(newArr);

    fnInsertExportExcel(newArr);
  };

  //* IMPORT EXCEL//

  const [fieldIm, setFieldIm] = useState([]);
  const [itemexcel, setItemexcel] = useState([]);

  const rows = [];
  const convertToJson = (headers, data) => {
    console.log(headers);
    console.log(data);
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    rows.splice(data.length - 3, data.length);
    return rows;
  };

  const uploadExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target.result;
      const workBook = XLSX.read(bstr, { type: "binary" });

      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

      var newArr = [];

      //   fileData.map((el) => console.log(el));
      // fileData.map((x,index) => {
      //     x.NoData1 = ""
      // })
        console.log(fileData);

      const headeredit = [
        // "NoData1",
        "SONo",
        // "NoData2",
        "MaterialCode",
        "PackageType",
        "MaterialGroup",
        "SOQty",
        "LoadingLocation",
        "ContainerSize",
        "NOofContainer",
        "LoadDate",
        "HaulageName",
        "ShippingAccountName",
        "PlaceContainerReturn",
        "CYPlace",
        "BookerNote",
        "RemarkforInternal",
        "ShipTo",
        "ShipToName",
        "ShipToCountry",
        "BookingNo",
        "ShipAgentName",
        "ShippingMarks",
        "ShipFromName",
        "Plant",
        "ModeOfTransport",
        "Channel",
        "SOItemNo",
        "SalesOrg",
      ];
      fileData.splice(0, 19);
    //   console.log(fileData);

      fileData.map((x) => {
        var newObj = []
        x.map(y => newObj.push(y))
        newArr.push(newObj);
      });
      console.log(newArr);

      // console.log(headeredit)
      const heads = headeredit.map((head) => ({ key: head }));
      // console.log(fileData)
      // setFieldIm(heads)
      // setItemexcel(fileData)
      newArr.splice(0, 1);
      // console.log(fileData)
      // console.log(navigation)
      setItemexcel(convertToJson(headeredit, newArr));

      // console.log(itemexcel)
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
                    size="sm"
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

  const fnUpdateData =
    (countryId, countryCode, countryNameEng, countryNameThai, isActive) =>
    (e) => {
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

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
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
          // hover
          // striped
          responsive
          bordered
          // switcher
          // size={'xl'}
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
          {/* <CButton color="success" onClick={saveChange}>
                {Constant.btOK}
              </CButton>{" "} */}
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

  const fnInsertExportExcel = (arrData) => {
    setIsPostingData(true);
    Repository.fetchInsertExportExcel(arrData).then(
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
    }
    else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  useEffect(() => {
    // fnGetCbTransportType();
    // fnGetEDPList();
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
                        {Constant.txtHeaderImportSFFile}
                      </h3>
                    </CCol>
                  </CRow>
                </CCardHeader>
                {/* </Box> */}
                <CCardBody>
                  {importExcel()}
                  {/* {mainFormSearch()} */}
                  {mainTable()}
                  <CFormGroup class="d-flex justify-content-end">
                    {/* <CCol xs="10" sm="6" md="2">
                                            <CFormGroup>
                                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                    width: ' 100%'
                                                }}>
                                                    <CButton size="sm" block color="success"
                                                    // onClick={searchData()}
                                                    >
                                                        Save
                                                    </CButton>
                                                </Box>
                                            </CFormGroup>
                                        </CCol> */}
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

export default ExImport;
