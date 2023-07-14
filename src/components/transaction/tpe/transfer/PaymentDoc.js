import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Repository from "../../../../repositories/Repository";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CurrencyInput from "react-currency-input-field";
import { Divider } from "@material-ui/core";
import { GrMapLocation } from "react-icons/gr";
import { RiUserLocationLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Stack } from "@mui/material";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { MdSwitchAccount } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { GiBanknote } from "react-icons/gi";

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
  CSelect,
  CCardFooter,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSwitch,
  CModalTitle,
  CInvalidFeedback,
  CLink,
  CSpinner,
  CInputFile,
  CTextarea,
  CSubheader,
  CBreadcrumbRouter,
  CRow,
  CButtonToolbar,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInputGroupPrepend,
  CFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import PropTypes, { object } from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Constant from "../../../../helpers/Constant";
import MakeStyleSheet from "../../../../helpers/MakeStyleSheet";
import FunctionController from "../../../../helpers/FunctionController";
import VariableController from "../../../../helpers/VariableController";
import { GrCircleInformation } from "react-icons/gr";
import { tr } from "date-fns/locale";
import { set } from "date-fns";

/**New Field */
// showtext()

const showtext2 = () => {
  return <CLabel style={{ color: "red" }}>*</CLabel>;
};

const fieldsPayment = [
  {
    key: "manage",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  {
    key: "csId",
    label: "",
    sorter: false,
    filter: false,
  },
  {
    key: "costElement",
    label: "Expense Code",
  },
  {
    key: "costCenter",
    label: "Cost Center",
  },
  {
    key: "orderNo",
    label: "Order No.(IO)",
  },
  {
    key: "assignment",
    label: "Assignment",
  },
];

const fieldsInvoice = [
  {
    key: "manage",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },

  {
    key: "dpId",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "fileName",
    label: "",
    // _style: { width: "10", height: "50px" },
    sorter: false,
    filter: false,
  },
  {
    key: "documentTypeId",
    label: "Document Type",
  },
  {
    key: "ioNo",
    label: "CostElement/CostCenter",
  },
  {
    key: "documentNo",
    label: "Document No",
  },
  {
    key: "documentDate",
    label: "Document Date",
  },
  {
    key: "amount",
    _style: { width: "8%" },
    label: "Amount(Excl.VAT)",
  },
  {
    key: "vatAmount",
    _style: { width: "8%" },
    label: "VAT Amount",
  },
  {
    key: "totalAmount",
    _style: { width: "8%" },
    label: "Total Amount",
  },
  {
    key: "refDocNo",
    label: "RefDoc",
  },
  {
    key: "vendorTax",
    label: "Vendor & Tax",
  },

  {
    key: "manage2",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const fieldsApproveval = [
  {
    key: "firstName",
    label: "Reviewer",
  },
  {
    key: "manage",
    label: "",
    _style: { width: "7%" },
    sorter: false,
    filter: false,
  },
];

const fieldsCC = [
  {
    key: "firstName",
    label: "CC",
  },
  {
    key: "manage",
    label: "",
    _style: { width: "7%" },
    sorter: false,
    filter: false,
  },
];

/** */

const fieldSummary = [
  {
    key: "summaryList",
    label: "Status : Transfer",
  },
  {
    key: "totalRow",
    label: "Sum Transfer (รายการ)",
    digit: 0,
  },
  {
    key: "totalTransferType",
    label: "Sum Transfer Type (รายการ)",
    digit: 0,
  },
  {
    key: "totalTransferTypeMTP",
    label: "Sum Transfer Type (MTP)",
    digit: 0,
  },
  {
    key: "totalTransferTypeLCB",
    label: "Sum Transfer Type (LCB)",
    digit: 0,
  },
  {
    key: "totalTransferTypeMilesRate",
    label: "Sum Transfer Type (Mileage)",
    digit: 0,
  },
  {
    key: "totalSource",
    label: "Sum Source (รายการ)",
    digit: 0,
  },
  {
    key: "totalDest",
    label: "Sum Dest (รายการ)",
    digit: 0,
  },
  {
    key: "totalShipment",
    label: `${Constant.arrFieldTransExpDelSummary[3]}`,
    digit: 0,
  },
  {
    key: "totalQty",
    label: `${Constant.arrFieldTransExpDelSummary[4]}`,
    digit: 3,
  },
  {
    key: "totalTransportPrice",
    label: `${Constant.arrFieldTransExpDelSummary[5]}`,
    digit: 2,
  },
  // {
  //   key: "totalShippingPrice",
  //   label: `${Constant.arrFieldTransExpDelSummary[6]}`,
  //   digit: false,
  // },
];

const fieldMain = [
  {
    key: "checked",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "manage",
    label: "",
    _style: { width: "4%" },
    sorter: false,
    filter: false,
  },
  {
    key: "docStatus",
    label: `${Constant.arrFieldTransExpDeliveryMain[13]}`,
  },
  // {
  //   key: "edpstatus",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[11]}`,
  // },
  {
    key: "creditDebitStatus",
    label: `${Constant.arrFieldTransExpDeliveryMain[12]}`,
  },
  {
    key: "paymentStatus",
    label: `${Constant.arrFieldTransExpDeliveryMain[14]}`,
  },
  {
    key: "transferDatetime",
    label: `${Constant.arrFieldTransExpDeliveryMain[6]}`,
    isdatetime: true,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransExpDeliveryMain[0]}`,
  },
  {
    key: "tonoSource",
    label: "TO Source",
    isdatetime: true,
  },
  {
    key: "tonoDest",
    label: "TO Dest",
  },
  {
    key: "materialNo",
    label: "Material",
  },
  {
    key: "batchNo",
    label: "Batch",
  },
  {
    key: "transporterNameThai",
    label: `${Constant.arrFieldTransExpDeliveryMain[2]}`,
  },

  {
    key: "transferTypeCode",
    label: "ประเภทงานย้าย",
  },
  {
    key: "siteCodeSource",
    label: "ต้นทาง",
  },
  {
    key: "siteCodeDest",
    label: "ปลายทาง",
  },
  {
    key: "truckLicense",
    label: "ทะเบียนรถ",
  },
  {
    key: "truckTypeName",
    label: "ประเภททรถ",
  },
  {
    key: "weightDocNo",
    label: "WeightDocNo",
  },
  {
    key: "confirmSource",
    label: "Confirm Source",
  },
  {
    key: "confirmDest",
    label: "Confirm Dest",
  },
  {
    key: "sloc",
    label: "SLOC",
  },
  // {
  //   key: "companyCode",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[44]}`,
  // },
  // {
  //   key: "companyName",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[45]}`,
  // },
  // {
  //   key: "sourceNameThai",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[4]}`,
  // },
  // {
  //   key: "shipToCountry",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[41]}`,
  // },
  // {
  //   key: "shipTo",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[42]}`,
  // },
  // {
  //   key: "shipToName1",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[43]}`,
  // },
  {
    key: "qty",
    label: `${Constant.arrFieldTransExpDeliveryMain[15]}`,
    digit: 3,
    issumvalue: true,
  },
  {
    key: "fuelRefPrice",
    label: "ราคาน้ำมัน/วัน",
    digit: false,
  },
  // {
  //   key: "weekPrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[9]}`,
  //   digit: false,
  // },
  {
    key: "transportPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[36]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "extraChargePrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[18]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "totalTransporterPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[16]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "refNo",
    label: "หมายเลขอ้างอิง",
  },
  {
    key: "calMessage",
    label: "Cal Message",
  },
  {
    key: "remark",
    label: "หมายเหตุ",
  },

  // {
  //   key: "rejectByName",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[23]}`,
  // },
  {
    key: "rejectReason",
    label: `${Constant.arrFieldTransDomDeliveryMain[25]}`,
  },
  {
    key: "approveByName",
    label: `${Constant.arrFieldTransDomDeliveryMain[23]}`,
  },
  {
    key: "rejectByName",
    label: `${Constant.arrFieldTransDomDeliveryMain[24]}`,
  },
];

const fieldDelivery = [
  {
    key: "tonoSource",
    label: "ToNo",
  },

  {
    key: "batchNo",
    label: "Batch No",
  },
  {
    key: "materialNo",
    label: `${Constant.arrFieldTransExpDelItemList[3]}`,
  },

  {
    key: "plantSource",
    label: "Plant Source",
  },
  {
    key: "qty",
    label: `${Constant.arrFieldTransExpDelItemList[6]}`,
    digit: 3,
  },

  {
    key: "companyCode",
    label: `${Constant.arrFieldExportFileExpAccure[1]}`,
  },

  {
    key: "siteCodeDest",
    label: "ปลายทาง",
  },
  {
    key: "plantDest",
    label: "Plant Dest",
  },
  {
    key: "calMessage",
    label: `${Constant.arrFieldTransExpDelItemList[10]}`,
  },
];

const fieldTransportRate2 = [
  {
    key: "shipmentNo",
    label: "Shipment No",
  },
  {
    key: "rateTypeName",
    label: `${Constant.arrFieldTransDomDelTransport[0]}`,
  },
  {
    key: "price",
    label: `${Constant.arrFieldTransDomDelTransport[1]}`,
    issumvalue: true,
  },
  {
    key: "vat",
    label: `${Constant.arrFieldTransDomDelTransport[2]}`,
  },
  {
    key: "refName1",
    label: `${Constant.arrFieldTransDomDelTransport[3]}`,
  },
  {
    key: "refValue1",
    label: `${Constant.arrFieldTransDomDelTransport[4]}`,
  },
  // {
  //   key: "refName2",
  //   label: `${Constant.arrFieldTransDomDelTransport[5]}`,
  // },
  // {
  //   key: "refValue2",
  //   label: `${Constant.arrFieldTransDomDelTransport[6]}`,
  // },
  // {
  //   key: "refName3",
  //   label: `${Constant.arrFieldTransDomDelTransport[7]}`,
  // },
  // {
  //   key: "refValue3",
  //   label: `${Constant.arrFieldTransDomDelTransport[8]}`,
  // },
  // {
  //   key: "refName4",
  //   label: `${Constant.arrFieldTransDomDelTransport[9]}`,
  // },
  // {
  //   key: "refValue4",
  //   label: `${Constant.arrFieldTransDomDelTransport[10]}`,
  // },
];

const fieldTransportRate = [
  {
    key: "rateTypeName",
    label: `${Constant.arrFieldTransDomDelTransport[0]}`,
  },
  {
    key: "price",
    label: `${Constant.arrFieldTransDomDelTransport[1]}`,
  },
  {
    key: "vat",
    label: `${Constant.arrFieldTransDomDelTransport[2]}`,
  },
  {
    key: "refName1",
    label: `${Constant.arrFieldTransDomDelTransport[3]}`,
  },
  {
    key: "refValue1",
    label: `${Constant.arrFieldTransDomDelTransport[4]}`,
  },
  {
    key: "refName2",
    label: `${Constant.arrFieldTransDomDelTransport[5]}`,
  },
  {
    key: "refValue2",
    label: `${Constant.arrFieldTransDomDelTransport[6]}`,
  },
  {
    key: "refName3",
    label: `${Constant.arrFieldTransDomDelTransport[7]}`,
  },
  {
    key: "refValue3",
    label: `${Constant.arrFieldTransDomDelTransport[8]}`,
  },
  {
    key: "refName4",
    label: `${Constant.arrFieldTransDomDelTransport[9]}`,
  },
  {
    key: "refValue4",
    label: `${Constant.arrFieldTransDomDelTransport[10]}`,
  },
];

const fieldExtraCharge = [
  {
    key: "ioNo",
    label: "IO Number",
  },
  {
    key: "extraChargeStatus",
    label: `${Constant.arrFieldTransDomDelExtraCharge[17]}`,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransDomDelExtraCharge[0]}`,
  },
  {
    key: "extraChargeType",
    label: `${Constant.arrFieldTransDomDelExtraCharge[1]}`,
    isconditioncredit: true,
  },
  {
    key: "extraChargeName",
    label: `${Constant.arrFieldTransDomDelExtraCharge[2]}`,
  },
  {
    key: "extraChargeQty",
    label: `${Constant.arrFieldTransDomDelExtraCharge[4]}`,
  },
  {
    key: "extraChargePrice",
    label: `${Constant.arrFieldTransDomDelExtraCharge[3]}`,
    issumvalue: true,
  },
  {
    key: "extraChargeTotalPrice",
    label: `${Constant.arrFieldTransDomDelExtraCharge[5]}`,
    issumvalue: true,
  },
  {
    key: "extraChargeDocNo",
    label: `${Constant.arrFieldTransDomDelExtraCharge[8]}`,
  },
  {
    key: "paymentDocNo",
    label: `${Constant.arrFieldTransDomDelExtraCharge[7]}`,
  },
  {
    key: "requestName1",
    label: `${Constant.arrFieldTransDomDelExtraCharge[9]}`,
  },
  {
    key: "requestValue1",
    label: `${Constant.arrFieldTransDomDelExtraCharge[10]}`,
  },
  {
    key: "requestName2",
    label: `${Constant.arrFieldTransDomDelExtraCharge[11]}`,
  },
  {
    key: "requestValue2",
    label: `${Constant.arrFieldTransDomDelExtraCharge[12]}`,
  },
  {
    key: "requestName3",
    label: `${Constant.arrFieldTransDomDelExtraCharge[13]}`,
  },
  {
    key: "requestValue3",
    label: `${Constant.arrFieldTransDomDelExtraCharge[14]}`,
  },
  {
    key: "requestName4",
    label: `${Constant.arrFieldTransDomDelExtraCharge[15]}`,
  },
  {
    key: "requestValue4",
    label: `${Constant.arrFieldTransDomDelExtraCharge[16]}`,
  },
  // {
  //   key: "fileType",
  //   label: `${Constant.arrFieldTransDomDelExtraCharge[6]}`,
  // },
  // {
  //   key: "manage",
  //   label: "",
  //   _style: { width: "3%" },
  //   sorter: false,
  //   filter: false,
  // },
];

const getBadge = (status) => {
  switch (status) {
    case "Complete":
      return "success";
    case "Approve":
      return "success";
    case "Match":
      return "success";
    case "Mismatch":
      return "danger";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TabPanel = (props) => {
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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const allProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  autoCompleteRenderOptions: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "grey",
    fontFamily: "Scg",
  },
  autoCompleteInputLabel: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "grey",
    fontFamily: "Scg",
  },
  autoCompleteInputHelperText: {
    fontSize: "12.8px",
    fontWeight: "normal",
    color: " #e55353",
    fontFamily: "Scg",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  appBar: {
    position: "relative",
    backgroundColor: "#056776",
  },
  tabRoot: {
    fontFamily: "Scg",
    fontWeight: "normal",
    color: "black ",
    backgroundColor: "#056776",
  },
  PrivateTabIndicator: {},
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    fontFamily: "Scg",
    fontWeight: "normal",
    color: "black ",
  },
  label: {
    fontFamily: "Scg",
    fontWeight: "normal",
    color: "grey ",
  },
  comboOptions: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "grey ",
    fontFamily: "Scg",
  },
  options: {
    backgroundColor: "red",
    fontSize: "14px",
    fontWeight: "normal",
    color: "grey ",
    fontFamily: "Scg",
  },
}));

const DeliveryList = () => {
  const [error, setError] = useState(null);
  const [errorAPI, setErrorAPI] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [items, setItems] = useState({});
  const [baseItems, setBaseItems] = useState([]);
  const [summaryItems, setSummaryItems] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [truckTypeList, setTruckTypeList] = useState([]);
  const [shipmentTypeList, setShipmentTypeList] = useState([]);
  const [shipmentStatusList, setShipmentStatusList] = useState([]);
  const [edpStatusList, setEDPStatusList] = useState([]);
  const [paymentStatusList, setPaymentStatusList] = useState([]);
  const [summaryStatusList, setSummaryStatusList] = useState([]);

  const [readyChangeStatusList, setReadyChangeStatusList] = useState([]);
  const [changeStatusList, setChangeStatusList] = useState([]);

  // Var for Start&End Date Search Form
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Var for Table Edit Form
  const [deliveryItemList, setDeliveryItemList] = useState([]);
  const [totalQtyDeliveryList, setTotalQtyDeliveryList] = useState(0.0);
  const [transportRateList, setTransportRateList] = useState([]);
  const [totalPriceTransportRate, setTotalPriceTransportRate] = useState(0.0);

  const [extraChargeList, setExtraChargeList] = useState([]);
  const [extraChargeTypeList, setExtraChargeTypeList] = useState([]);
  const [extraChargeNameList, setExtraChargeNameList] = useState([]);

  const [extraChargeNameObj, setExtraChargeNameObj] = useState({});
  const [extcDeleteObj, setExtcDeleteObj] = useState({});

  const [selectItemsSearch, setSelectItemsSearch] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [selectItemsEdit, setSelectItemsEdit] = useState({});

  const [textConfirmDelete, setTextConfirmDelete] = useState("");
  const [textTypeInsert, setTextTypeInsert] = useState("");

  const [invalidFormSearch, setInvalidFormSearch] = useState([
    false,
    false,
    false,
  ]);
  const [invalidMaterialFormSearch, setInvalidMaterialFormSearch] = useState([
    false,
    false,
  ]);
  const [invalidMaterialFormCreatePay, setInvalidMaterialFormCreatePay] =
    useState([false]);
  // const [invalidFormEdit, setInvalidFormEdit] = useState(false);

  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isConfirmChangeStatus, setIsConfirmChangeStatus] = useState(false);
  const [isConfirmViewContract, setIsConfirmViewContract] = useState(false);
  const [isConfirmReCal, setIsConfirmReCal] = useState(false);

  const [isShowDialogEdit, setisShowDialogEdit] = useState(false);

  const [isShowImage, setIsShowImage] = useState(false);
  const [isShowErrorViewContract, setIsShowErrorViewContract] = useState(false);
  const [isShowWarningSearch, setIsShowWarningSearch] = useState(false);

  const [isOnchangeExtraCharge, setIsOnchangeExtraCharge] = useState(false);

  const [dialogValue, setDialogValue] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [selectItems, setSelectitems] = useState([]);
  const [collsFormSearch, setCollsFormSearch] = useState(true);
  const [collsDialogTabOne, setCollsDialogTabOne] = useState([
    true,
    true,
    true,
    true,
  ]);
  const [collsDialogTabTwo, setCollsDialogTabTwo] = useState([true, true]);

  const [roleUser, setRoleUser] = useState(null);

  const theme = useTheme();
  const _classes = useStyles();
  const classes = MakeStyleSheet.useStyles();

  const txtWarningAttachFile =
    "***รองรับไฟล์ .png / .jpg / .jpeg / .pdf ขนาดไม่เกิน 1 MB***";
  const txtUnitPrice = "บาท";

  const empCode = "/tnsctpedomdelv";
  const trstCode = "/tnsctrstdomdelv";

  const _UserId = parseInt(localStorage.getItem("userId"));
  const _Username = localStorage.getItem("username");
  const _TranspoterId = parseInt(localStorage.getItem("transporterId"));
  const _aliasName = localStorage.getItem("aliasName");

  /**New const */

  const [value1, setValue1] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [indexEditForm, setIndexEditForm] = useState(null);
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed1, setCollapsed1] = React.useState(true);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [collapsed3, setCollapsed3] = React.useState(true);
  const [collapsed4, setCollapsed4] = React.useState(true);
  const [collapsed5, setCollapsed5] = React.useState(true);
  const [collapsed6, setCollapsed6] = React.useState(true);
  const [collapsed7, setCollapsed7] = React.useState(true);
  const [collapsed8, setCollapsed8] = React.useState(true);
  const [collapsed9, setCollapsed9] = React.useState(true);
  const [collapsed10, setCollapsed10] = React.useState(true);
  const [collapsed11, setCollapsed11] = React.useState(true);
  const [collapsed12, setCollapsed12] = React.useState(true);
  const [isShowDialogInvoice, setisShowDialogInvoice] = useState(false);
  const [isShowDialogVat, setisShowDialogVat] = useState(false);
  const [grApproveType, setGrApproveType] = useState([]);
  const [invoiceTax, setInvoiceTax] = React.useState([]);
  const [cbLocationCode, setCbLocationCode] = useState([]);
  const [cbPaymentType, setCbPaymentType] = useState([]);
  const [cbCurrencyType, setCbCurrencyType] = useState([]);
  const [cbDocumentType, setCbDocumentType] = useState([]);
  const [transferType, setTransferType] = useState([]);
  const [selectItemsCreatePayment, setSelectItemsCreatePayment] = useState([
    {},
    {},
    {},
    {},
  ]);
  const [companyList, setCompanyList] = useState([]);
  const [serviceTeam, setCbServiceTeam] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [attrachFile, setAttrachFile] = useState([{}]);
  const [indexFiles, setIndexFiles] = useState([{}, {}]);
  const [costItems, setCostItems] = useState([]);
  const [dataForPayment, setDataForPayment] = useState([]);
  const [cbCompanyList, setCbCompanyList] = useState([]);
  const [cbCompanyCost, setCbCompanyCost] = useState([]);
  const [transportByMain, setTransportByMain] = useState([]);
  const [isIoNo, setIsIoNo] = useState(false);
  // const [cbLocationCode,setCbLocationCode]= useState([]);

  /**Payment Detail */

  const [extrachargeData, setExtraChargeData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [createPayment, setCreatePayment] = useState([]);
  const [supportfile, setSupportFile] = useState([]);
  const [amount, setAmount] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cbWhtRates, setCbWhtRates] = useState([]);
  const [cbVat, setCbVat] = useState([]);

  /** User Email List Variable */
  const [userApproveList, setUserApproveList] = useState([]);
  const [userCCList, setUserCCList] = useState([]);
  const [userReviewerList, setUserReviewerList] = useState([]);
  // const []

  const [userApproveListItems, setUserApproveListItems] = useState([]);
  const [userCCListItems, setUserCCListItems] = useState([]);
  const [userReviewerListItems, setUserReviewerListItems] = useState([]);
  const [allPayNo, setAllPayNo] = useState();
  const [isAllPayNo, setIsAllPayNo] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [noVat, setNoVat] = useState(true);
  const [noWht, setNoWht] = useState(true);
  const [vatRate, setVatRate] = useState({});
  const [whtRates, setWhtRates] = useState([]);
  const [whtRatesBox, setWhtRatesBox] = useState([]);
  const [actualVat, setActualVat] = useState([]);
  const [actualAmount, setActualAmount] = useState([]);
  const [serviceTeamItems, setServiceTeamItems] = useState();
  const [isCreatePayment, setIsCreatePayment] = useState(false);
  const [createDoc, setCreateDoc] = useState({});

  const [cbLocSite, setCbLocSite] = useState([]);

  /**New */

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

  /**New Func */

  const handleFileUploadInvoice = (event) => {
    var kkk = event.target.files;
    // kkk.map((x,index) => {
    //   x.guid = "0"+indexFiles[0]+"-"+(index+1)
    // })
    //console.log(kkk[0]);
    // kkk.FileList.map((x,index) => {
    //     x.guid = "0"+indexFiles[0]+"-"+(index+1)
    //   })
    //console.log(invoiceItems);

    var newArr = [...event.target.files];
    //console.log(newArr);
    if (newArr.length) {
      newArr = [...invoiceTax];
      newArr.push(...event.target.files);
    }

    if (event.target.files) {
      var newCrr = [...invoiceItems];
      newCrr[indexFiles[0]].filesName = event.target.files[0].name;
      setInvoiceItems(newCrr);
      // //console.log(invoiceItems);
    } else {
      var newCrr = [...invoiceItems];
      newCrr[indexFiles[0]].filesName = "";
      setInvoiceItems(newCrr);
    }

    // newArr.push(event.target.files);

    setInvoiceTax(newArr);
    invoiceItems.map((x) => {
      if (x.dpId === indexFiles[1]) {
        x.fileName = newArr;
      }
    });
  };

  const handleFileUploadSupportFile = (event) => {
    var newArr = [...event.target.files];
    if (newArr.length) {
      newArr = [...supportfile];
      newArr.push(...event.target.files);
    }
    setSupportFile(newArr);
    //console.log(newArr);
  };

  const handleFileUpload = (event) => {
    //console.log(event.target.files[0].name);
  };

  const setCostData = () => {
    //console.log(11111);
    if (!costItems.length) {
      var newObj = {
        csId: 1,
        costElement: null,
        costCenter: null,
        orderNo: "",
        assignment: "",
      };
      setCostItems([newObj]);
      //console.log([newObj]);
    }
  };

  const onClickAddCost = (type) => (e) => {
    if (type === "add") {
      var newArr = [];
      if (costItems.length) {
        newArr = [...costItems];
      }
      var index = costItems.length;
      var newObj = {
        csId: index + 1,
        costElement: "",
        costCenter: "",
        orderNo: "",
        assignment: "",
      };

      newArr.push(newObj);
      setCostItems(newArr);
    }
  };

  const Footer = () => (
    <footer>
      <p>This is some content in sticky footer</p>
    </footer>
  );

  const onHandleChangeAddIo = (index) => (e) => {
    //console.log();
    var newObj = [...extrachargeData];

    newObj[index].ioNo = e.target.value;

    //console.log(newObj);

    setExtraChargeData(newObj);
    //console.log(extrachargeData);
  };

  const tableShipDetail = () => {
    return (
      // <CRow className="justify-content-center m-4">
      // <CCard>
      <CCardBody className="c-body-1">
        <CDataTable
          columnFilter
          className="CDataTable ml-1 mr-1"
          items={shipmentData}
          fields={fieldTransportRate2}
          hover
          // striped
          // bordered
          size="sm"
          itemsPerPage={10}
          pagination
        />
      </CCardBody>
      // </CCard>
      // </CRow>
    );
  };

  const tableShipExtraChrge = () => {
    return (
      // <CCard>
      <CCardBody className="c-body-1">
        <CDataTable
          className="CDataTable"
          columnFilter
          items={extrachargeData}
          fields={fieldExtraCharge}
          itemsPerPage={10}
          hover
          pagination
          scopedSlots={{
            ioNo: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    size={Constant.btAddSize}
                    type="text"
                    block
                    color="danger"
                    onChange={onHandleChangeAddIo(index)}
                  ></CInput>
                </td>
              );
            },

            fileType: (item, index) => {
              if (item.fileType !== "") {
                var result = Constant.arrFileImage.find(
                  (x) => x === item.fileType
                );
                if (result) {
                  return (
                    <td className="py-2">
                      <CButton
                        id="img-show"
                        size={Constant.btAddSize}
                        block
                        color="success"
                        onClick={() =>
                          fnDownloadFile(
                            item.extraChargeRequestFile,
                            item.fileType,
                            "image"
                          )
                        }
                      >
                        {Constant.btShowImage}
                      </CButton>
                    </td>
                  );
                } else {
                  return (
                    <td className="py-2">
                      <CButton
                        size={Constant.btAddSize}
                        block
                        color="primary"
                        onClick={() =>
                          fnDownloadFile(
                            item.extraChargeRequestFile,
                            item.fileType,
                            "file"
                          )
                        }
                      >
                        {Constant.btDownloadFile}
                      </CButton>
                    </td>
                  );
                }
              } else {
                return <td className="py-2"></td>;
              }
            },
            manage: (item, index) => {
              if (
                item.extraChargeStatus === "Pending" &&
                item.runningNo !== 1 &&
                item.createFrom === _UserId
              ) {
                return (
                  <td className="py-2">
                    <CButton
                      size={Constant.btAddSize}
                      block
                      color="danger"
                      onClick={() => onClickSetItemDelete(item)}
                    >
                      {setTextButtonDeleteExtc(item)}
                    </CButton>
                  </td>
                );
              } else {
                return <td className="py-2"></td>;
              }
            },
          }}
        />
      </CCardBody>
      // </CCard>
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const addInvoiceItems = () => {
    var newArr = [];
    var newObj = {
      dpId: invoiceItems.length + 1,
      fileName: {},
      filesName: "Not Found",
      documentType: "",
      ioNo: "",
      documentNo: "",
      documentDate: "",
      amount: "",
      vatAmount: "",
      totalAmount: "",
      reference1: "",
      vendorTax: "",
      mpaymentVatRates: {},
      mpaymentWhtRates: [],
    };

    var newBrr = [];
    var obj = {
      dpid: newObj.dpId,
      checkbox: false,
      rate: null,
      baseAmount: 0,
      vatAmount: null,
    };

    obj.rate = 0;
    obj.baseAmount = 0;
    obj.vatAmount = 0;

    newObj.mpaymentVatRates = obj;

    var newCrr = [];
    for (let i = 0; i < 3; i++) {
      var WhtObj = {
        dpid: newObj.dpId,
        checkbox: false,
        rate: null,
        baseAmount: null,
        vatAmount: null,
      };

      WhtObj.rate = 0;
      WhtObj.baseAmount = null;
      WhtObj.vatAmount = 0;
      newObj.mpaymentWhtRates.push(WhtObj);
    }

    if (invoiceItems.length) {
      newArr = [...invoiceItems];
    }

    //console.log(newObj);

    newArr.push(newObj);

    setInvoiceItems(newArr);
  };

  const onClickOpenDialogInvoice = (index, id) => (e) => {
    // fnGetDataListById(index);
    var newArr = [...indexFiles];
    newArr[0] = index;
    newArr[1] = id;
    setIndexFiles(newArr);
    setInvoiceTax([]);
    setisShowDialogInvoice(true);
  };

  const onClickOpenDialogVat = (index) => (e) => {
    // fnGetDataListById(index);
    // var newArr = [...indexFiles];
    // newArr[0] = index;
    // newArr[1] = id;
    // setIndexFiles(newArr);
    // setInvoiceTax([]);
    var newArr = [...indexFiles];
    newArr[0] = index;
    setIndexFiles(newArr);
    setisShowDialogVat(true);
  };

  const onClickCloseDialogInvoice = () => {
    // setClearVariableController();
    // setClearDetailData();
    setisShowDialogInvoice(false);
  };

  const onClickCloseDialogVat = () => {
    // setClearVariableController();
    // setClearDetailData();
    setisShowDialogVat(false);
  };

  const onHandleChangeCreate = () => {
    var paymentTypeCode = document.getElementById(
      "create-payment-paymentType"
    ).value;
    var newObj = {
      paymentTypeCode: "",
    };

    newObj.paymentTypeCode = paymentTypeCode;

    setCreatePayment(newObj);
    //console.log(newObj);
  };

  const layoutDialogInvoice = () => {
    return (
      <h6>
        <Dialog
          // fullScreen
          fullWidth
          maxWidth="100%"
          size="xl"
          open={isShowDialogInvoice}
          onClose={onClickCloseDialogInvoice}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={onClickCloseDialogInvoice}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>Invoice/Tax Invoice/Other Information</h3>
              </Typography>
              <CButton
                className="btt-close"
                onClick={onClickCloseDialogInvoice}
              >
                <h5>{Constant.txtDialogFormClose}</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>{collapseHeaderInvoice("add")}</List>
        </Dialog>
        <Dialog
          // fullScreen
          fullWidth
          maxWidth="100%"
          size="xl"
          open={isShowDialogVat}
          onClose={onClickCloseDialogVat}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={onClickCloseDialogVat}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>Vendor & Tax Details</h3>
              </Typography>
              <CButton className="btt-close" onClick={onClickCloseDialogVat}>
                <h5>{Constant.txtDialogFormClose}</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>{collapseHeaderVat("add")}</List>
        </Dialog>
      </h6>
    );
  };

  const otherTablesGerneral = (type, indexId) => {
    return (
      <List>
        <div className={_classes.root}>
          <AppBar position="center" color="default">
            <Tabs
              className={_classes.tabRoot}
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              centered
            >
              <Tab
                style={{ outline: "none" }}
                label="GR & Payment Approve"
                {...a11yProps(0)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              className="c-body-1"
              value={value}
              index={0}
              dir={theme.direction}
            >
              <CForm className="c-body-1">
                <CRow>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        GR Aprroval For{showtext()}{" "}
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
                          id="create-payment-grApprovefor"
                          value={1}
                          disabled
                          required
                        >
                          <option selected hidden value="">
                            Please Select GR For
                          </option>
                          {grApproveType.map((cb) => (
                            <option value={cb.valueMember}>
                              {cb.displayMember}
                            </option>
                          ))}
                        </CSelect>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">Subject{showtext()} </CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CTextarea
                          // value={item.address}
                          name="textarea-input"
                          id="create-payment-subject"
                          rows="3"
                          placeholder=""
                          required
                        />
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
              {/* {type === "show"
                ? paymentDocDetail()
                : type === "add"
                ? paymentDocDetail()
                : null} */}
            </TabPanel>
          </SwipeableViews>
        </div>
      </List>
    );
  };

  const otherTablesShipmentDetail = (type, indexId) => {
    return (
      <List>
        <div className={_classes.root}>
          <AppBar position="center" color="default">
            <Tabs
              className={_classes.tabRoot}
              value={value1}
              onChange={handleChange1}
              variant="fullWidth"
              centered
            >
              <Tab
                style={{ outline: "none" }}
                label="Shipment Detail"
                {...a11yProps(0)}
              />
              <Tab
                style={{ outline: "none" }}
                label="Extra Charge"
                {...a11yProps(0)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value1}
            onChangeIndex={handleChangeIndex1}
          >
            <TabPanel value={value1} index={0} dir={theme.direction}>
              {tableShipDetail()}
            </TabPanel>
            <TabPanel value={value1} index={1} dir={theme.direction}>
              {tableShipExtraChrge()}
            </TabPanel>
          </SwipeableViews>
        </div>
      </List>
    );
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleChangeIndex1 = (index) => {
    setValue1(index);
  };

  const tablePayment = () => {
    return (
      <CForm className="p-2">
        <CDataTable
          // columnFilter
          items={costItems}
          fields={fieldsPayment}
          itemsPerPage={50}
          pagination
          scopedSlots={{
            manage: (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    color="danger"
                    size="sm"
                    id={"checkbox-select-" + index}
                    onClick={onClickRemoveRecordAddData("manage", index)}
                  >
                    ลบข้อมูล
                  </CButton>
                </td>
              );
            },
            csId: (item, index) => {
              return (
                <td className="py-2">
                  <CLabel>{item.csId}</CLabel>
                </td>
              );
            },
            costElement: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="costCenter"
                    id="add-costElement"
                    placeholder="Code or Description"
                    // onClick={fnGetCompanyCost}
                    onChange={onHandleAddCost("costElement", index)}
                  ></CInput>
                  <datalist style={{ display: "none" }} id="costCenter">
                    {cbCompanyCost.map((cb) => (
                      <option
                        value={cb.valueMember}
                        className={_classes.options}
                      >
                        {cb.costElement}{" "}
                      </option>
                    ))}
                  </datalist>
                </td>
              );
            },
            costCenter: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="costElement"
                    id="add-costElement"
                    placeholder="Code or Description"
                    onChange={onHandleAddCost("costCenter", index)}
                  ></CInput>
                  <datalist style={{ display: "none" }} id="costElement">
                    {cbCompanyCost.map((cb) => (
                      <option
                        value={cb.valueMember}
                        className={_classes.options}
                      >
                        {cb.costCenter}{" "}
                      </option>
                    ))}
                  </datalist>
                </td>
              );
            },
            orderNo: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="ioData"
                    id="add-costElement"
                    // disabled={isIoNo}
                    placeholder="Code or Description"
                    onChange={onHandleAddCost("orderNo", index)}
                  ></CInput>
                  <datalist id="ioData">
                    {extrachargeData.map((cb) => (
                      <option
                        // value={cb.valueMember}
                        className={_classes.options}
                      >
                        {cb.ioNo}{" "}
                      </option>
                    ))}
                  </datalist>
                </td>
              );
            },
            assignment: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    onChange={onHandleAddCost("assignment", index)}
                    type="text"
                  ></CInput>
                </td>
              );
            },
          }}
        />
      </CForm>
    );
  };

  const handleClickOpen = (type, contractId) => (e) => {
    if (type === "add") {
      var setNewSelectitems = baseItems.filter((x) => x.isChecked === true);
      console.log(setNewSelectitems);

      console.log("baseItems[0]", baseItems[0]);
      console.log("setNewSelectitems.length", setNewSelectitems.length);
      if (baseItems[0] && setNewSelectitems.length) {
        if (selectItemsSearch[4].length > 1) {
          setCompanyList(selectItemsSearch[4]);
        } else {
          fnGetCompanyListById(baseItems[0].companyId);
        }
        fnGetCompanyListByMain();
        fnGetShipmentDataForPayment(setNewSelectitems);
        setCostData();
        fnGetCompanyCost();
        onClickGetSelectData();
        setInvalidMaterialFormSearch([false]);
        setOpenAddForm(true);
      } else {
        setIsCreatePayment(!isCreatePayment);
        setInvalidMaterialFormSearch([true]);
      }
    } else if (type === "edit") {
      setOpenEditForm(true);
    }
  };
  const fnClearOtherTableValueList = () => {
    setTotalPrice(0);
    setActualVat();
    setActualAmount();
    setServiceTeamItems();
    setUserCCListItems([]);
    setUserApproveListItems([]);
    setUserReviewerListItems([]);
    setExtraChargeData([]);
    setShipmentData([]);
    setInvoiceItems([]);
    setSupportFile([]);
    setCostItems([]);
  };

  const handleClose = (type) => (e) => {
    fnClearOtherTableValueList();

    if (type === "add") {
      var newArr = [...selectItemsCreatePayment];
      newArr[0] = {};
      setSelectItemsCreatePayment(newArr);
      setOpenAddForm(false);
    } else if (type === "edit") {
      setOpenEditForm(false);
      setIndexEditForm(null);
      // setEditData([]);
    }
  };

  const onClickRemoveRecordAddData = (type, index) => (e) => {
    //console.log(type);
    if (type === "manage2") {
      var newArr = [...invoiceItems];
      // var newBrr = [...vatRate];
      newArr.splice(index, 1);
      setInvoiceItems(newArr);
      var sum = 0;
      //console.log(invoiceItems);
      newArr.map((x) => {
        sum = sum + x.totalAmount;
      });
      setTotalPrice(sum);
    }
    if (type === "manage") {
      var newArr = [...costItems];
      newArr.splice(index, 1);
      setCostItems(newArr);
    }
    if (type === "whtBox") {
      var newBrr = [...invoiceItems];
      //console.log(index);
      //console.log(newBrr[indexFiles[0]].mpaymentWhtRates);
      newBrr[indexFiles[0]].mpaymentWhtRates.splice(index, 1);
      setInvoiceItems(newBrr);
    }
  };

  const onHandleAddCost = (type, index) => (e) => {
    var newObj = [...costItems];
    if (type === "costElement") {
      newObj[index].costElement = e.target.value;
    } else if (type === "costCenter") {
      newObj[index].costCenter = e.target.value;
    } else if (type === "orderNo") {
      //console.log(e.target.value);
      newObj[index].orderNo = e.target.value;
    } else if (type === "assignment") {
      newObj[index].assignment = e.target.value;
    }
    setCostItems(newObj);
    //console.log(newObj);
  };

  const showtext = () => {
    return (
      <CLabel show="false" style={{ color: "red" }}>
        {/* {" "} */}*
      </CLabel>
    );
  };

  const onHandleChangeTax = (type, index) => (e) => {
    var newObj = [...invoiceItems];

    if (type === "documentTypeId") {
      newObj[index].documentTypeId = e.target.value;
    } else if (type === "ioNo") {
      newObj[index].ioNo = e.target.value;
    } else if (type === "documentNo") {
      newObj[index].documentNo = e.target.value;
    } else if (type === "documentDate") {
      newObj[index].documentDate = e.target.value;
    } else if (type === "amount") {
      if (e.target.value != "") {
        newObj[index].amount = parseFloat(e.target.value);
        // newObj[index].mpaymentVatRates.baseAmount = parseFloat(e.target.value);
        newObj[index].totalAmount = newObj[index].amount;
      } else {
        newObj[index].amount = 0;
        newObj[index].totalAmount = newObj[index].amount;
      }

      // + newObj[index].vatAmount;
    } else if (type === "refDocNo") {
      newObj[index].refDocNo = e.target.value;
    }
    setInvoiceItems(newObj);
    //console.log(newObj);
  };

  const sumtotalprice = () => {
    // console.log('invoiceItems', invoiceItems)
    var sum = 0;
    invoiceItems.map((x) => {
      if (x.documentTypeId === "05") {
        sum = sum - x.totalAmount;
      } else {
        sum = sum + x.totalAmount;
      }
    });

    setTotalPrice(sum);
  };

  const sumtotalpriceVat = () => {
    var newArr = [...invoiceItems];
    // //console.log(e.target.value);
    var sum = 0;
    var vat = 0;
    var wht = 0;
    if (newArr[indexFiles[0]].mpaymentVatRates.checkbox === true) {
      vat = newArr[indexFiles[0]].mpaymentVatRates.vatAmount;
    }

    newArr[indexFiles[0]].mpaymentWhtRates.map((x) => {
      if (x.checkbox === true) {
        wht = wht + x.vatAmount;
      }
    });

    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].totalAmount =
      newArr[indexFiles[0]].amount + vat - wht;

    newArr[indexFiles[0]].vatAmount = vat;
    // //console.log(newArr);

    setInvoiceItems(newArr);
    newArr.map((x) => {
      if (x.documentTypeId === "05") {
        sum = sum - x.totalAmount;
      } else {
        sum = sum + x.totalAmount;
      }
    });
    setTotalPrice(sum);
  };

  const tableApproval = (data, fields) => {
    return (
      <CDataTable
        // columnFilter
        className="CDataTable"
        header={false}
        items={data}
        fields={fields}
        // key={country.countryId}
        size="sm"
        itemsPerPage={5}
        pagination
        scopedSlots={{
          manage: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  onClick={onClickRemoveRecordUser("Reviewer", index)}
                  block
                  color="danger"
                >
                  -
                </CButton>
              </td>
            );
          },
        }}
      />
    );
  };

  const tableApprovalCC = (data, fields) => {
    return (
      <CDataTable
        // columnFilter
        className="CDataTable"
        header={false}
        items={data}
        fields={fields}
        // key={country.countryId}
        size="sm"
        itemsPerPage={5}
        pagination
        scopedSlots={{
          manage: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  onClick={onClickRemoveRecordUser("CC", index)}
                  block
                  color="danger"
                >
                  -
                </CButton>
              </td>
            );
          },
        }}
      />
    );
  };

  const tabAttachInvoice = (type) => {
    if (type === "show") {
      return (
        <CForm className="justify-content-center">
          <CDataTable
            // columnFilter
            items={invoiceItems}
            fields={fieldsInvoice}
            //   hover
            // striped
            bordered
            size="sm"
            itemsPerPage={100}
            pagination
            scopedSlots={{
              manage: (item, index) => {
                return (
                  <td className="py-2">
                    <CLabel>{index + 1}</CLabel>
                  </td>
                );
              },
              fileName: (item, index) => {
                console.log(item);
                var fileName = "No Items";
                if (item.fileName[0]) {
                  fileName = item.fileName[0].name;
                }
                return (
                  <td className="py-2">
                    <CFormGroup>
                      <CRow>
                        <CLabel style={{ color: "#056776" }}>
                          {/* +ADD */}
                          <BsFileEarmarkArrowDown
                            onClick={onClickOpenDialogInvoice(index, item.dpId)}
                            className="text-center"
                            style={{
                              width: "50px",
                              height: "50px",
                              color: "#056776",
                            }}
                          />
                          {/* {item.filesName.slice(0, 9)} */}
                        </CLabel>
                      </CRow>
                      <CRow>
                        <CLabel
                          className="pl-1"
                          style={{
                            display: "inline-block",
                            width: "100px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {fileName}
                        </CLabel>
                      </CRow>

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </td>
                );
              },
              documentTypeId: (item, index) => {
                return (
                  <td className="py-2">
                    <CSelect
                      className="form-control"
                      id="invoice-documentTypeId"
                      // value={item.vatid}
                      onChange={onHandleChangeTax("documentTypeId", index)}
                      // onBlur={setSumTotalPrice}
                      required
                    >
                      <option selected value="">
                        Please Select DocumentType
                      </option>
                      {cbDocumentType.map((cb) => (
                        <option value={cb.valueMember}>
                          {cb.displayMember}{" "}
                        </option>
                      ))}
                    </CSelect>
                  </td>
                );
              },
              ioNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CSelect
                      className="form-control"
                      id={"invoice-ioNo"}
                      // disabled={isIoNo}
                      // value={item.vatid}
                      // onClick={() => //console.log(extrachargeData)}
                      onChange={onHandleChangeTax("ioNo", index)}
                    >
                      <option selected value="">
                        Please Select
                      </option>
                      {costItems.map((cb) => (
                        <option value={cb.csId}>{cb.csId} </option>
                      ))}
                    </CSelect>
                  </td>
                );
              },
              documentNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      onChange={onHandleChangeTax("documentNo", index)}
                      id={"invoice-documentNo"}
                    ></CInput>
                  </td>
                );
              },
              documentDate: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      size="xs"
                      type="date"
                      onChange={onHandleChangeTax("documentDate", index)}
                      id={"invoice-documentDate"}
                      name="date-input"
                      placeholder="date"
                      required
                    />
                  </td>
                );
              },
              amount: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      value={item.amount}
                      type="number"
                      step="0.001"
                      min="0"
                      onWheel={(e) => e.target.blur()}
                      onBlur={sumtotalprice}
                      onChange={onHandleChangeTax("amount", index)}
                      id={"invoice-amount"}
                    ></CInput>
                  </td>
                );
              },
              vatAmount: (item, index) => {
                return (
                  <td className="py-2">
                    <CLabel>
                      {item.vatAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </CLabel>
                  </td>
                );
              },
              totalAmount: (item, index) => {
                return (
                  <td className="py-2">
                    <CLabel>
                      {item.totalAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </CLabel>
                  </td>
                );
              },
              refDocNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      onChange={onHandleChangeTax("refDocNo", index)}
                      id={"invoice-refDocNo"}
                    ></CInput>
                  </td>
                );
              },
              vendorTax: (item, index) => {
                return (
                  <td className="py-2">
                    <CRow>
                      <CCol>
                        <CLabel>VAT </CLabel>
                        <br />
                        <CSwitch
                          className={"mx-1"}
                          variant={"3d"}
                          color={"success"}
                          id={"invoice-VAT"}
                          // onChange={onHandleChangeVat("checkBox")}
                          // defaultChecked={false}
                          checked={item.mpaymentVatRates.checkbox}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.mpaymentVatRates.checkbox ? (
                          <CLabel style={{ fontSize: "12px", color: "gray" }}>
                            VAT {item.mpaymentVatRates.rate}%{" "}
                            {item.mpaymentVatRates.vatAmount.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}{" "}
                            THB{" "}
                          </CLabel>
                        ) : (
                          <CLabel></CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CLabel>WHT </CLabel>
                        <br />
                        <CSwitch
                          className={"mx-1"}
                          variant={"3d"}
                          color={"success"}
                          id={"invoice-WHT"}
                          checked={item.mpaymentWhtRates[0].checkbox}
                          // onChange={onHandleChangeWhtRate("checkBox",index)}
                          // defaultChecked={false}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.mpaymentWhtRates[0].checkbox ? (
                          <CForm>
                            {item.mpaymentWhtRates[0].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.mpaymentWhtRates[0].rate}% {"       "}
                                {item.mpaymentWhtRates[0].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.mpaymentWhtRates[1].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.mpaymentWhtRates[1].rate}%{" "}
                                {item.mpaymentWhtRates[1].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.mpaymentWhtRates[2].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.mpaymentWhtRates[2].rate}%{" "}
                                {item.mpaymentWhtRates[2].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}
                            <Divider></Divider>
                            <CLabel style={{ fontSize: "12px", color: "gray" }}>
                              Total Wht{" "}
                              {item.mpaymentWhtRates[0].vatAmount +
                                item.mpaymentWhtRates[1].vatAmount +
                                item.mpaymentWhtRates[2].vatAmount}{" "}
                              THB{" "}
                            </CLabel>
                          </CForm>
                        ) : (
                          <div></div>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CButton
                          onClick={onClickOpenDialogVat(index)}
                          type="button"
                          style={{ color: "black", fontSize: "15px" }}
                          class="btn btn-link"
                        >
                          Edit
                        </CButton>
                      </CCol>
                    </CRow>
                  </td>
                );
              },
              manage2: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="danger"
                      onClick={onClickRemoveRecordAddData("manage2", index)}
                    >
                      -
                    </CButton>
                  </td>
                );
              },
            }}
          />
        </CForm>
      );
    }
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const footerbox = () => {
    return (
      <CForm className="fixed">
        <CCardBody>
          <CRow className="d-flex mb-3">
            <CCol className="mr-autopl-3 pr-3">
              <h3>
                <CLabel style={{ color: "black" }}>
                  Summary Payment Amount
                </CLabel>
              </h3>
            </CCol>
            <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
              <CLabel style={{ color: "black", fontSize: "20px" }}>
                SMP Total Amount
              </CLabel>
            </CCol>
            <CCol xs="12" sm="6" md="2" className="pl-3 pr-3   text-right">
              <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                {amount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits:2
                  })}
              </CLabel>
              <CLabel
                className="pl-1"
                style={{ color: "black", fontSize: "20px" }}
              >
                THB
              </CLabel>
            </CCol>
            <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
              <CLabel style={{ color: "black", fontSize: "20px" }}>
                Actual Total Amount
              </CLabel>
            </CCol>
            <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
              <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                {totalPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits:2
                  })}
              </CLabel>
              <CLabel
                className="pl-1"
                style={{ color: "black", fontSize: "20px" }}
              >
                THB
              </CLabel>
            </CCol>
            <GrCircleInformation
              // class="tooltip"
              title={
                "SMP VAT : " +
                `${vatAmount}` +
                "\n" +
                "SMP TOTAL AMOUNT : " +
                `${totalAmount}` +
                "\n"
              }
              color="grey"
              size="20px"
            />
          </CRow>
          <CRow className="justify-content-end">
            <CCol md="3" className="pl-3 pr-3 pt-3 text-right">
              <CButton
                size={Constant.btAddSize}
                onClick={onClickCheckCreatePayment}
                color="success"
                style={{ fontSize: "16px" }}
                block
              >
                Save
              </CButton>
            </CCol>

            {/* <CCol md="3" className="pl-3 pr-3 pt-3 text-right">
              <CButton
                size={Constant.btAddSize}
                onClick={onClickExportPDF}
                color="success"
                style={{ fontSize: "16px" }}
                block
              >
                View PDF
              </CButton>
            </CCol> */}
          </CRow>
        </CCardBody>
      </CForm>
    );
  };

  const onClickExportPDF = () => {
    var newSum = { ...summaryItems[0] };
    const toDay = new Date();

    var subject = document.getElementById("create-payment-subject").value;
    // const toDay = new Date();
    var newDoc = {
      createDate: toDay,
      toName: "",
      fromName: _aliasName,
      subject: subject,
      transporterName: selectItemsCreatePayment[0].transporterNameThai,
      smpNo: "",
      companyName: companyList[0].companyName,
      sumQty: 0,
      sumSaleOrder: 0,
      sumShipment: 0,
      sumDelivery: 0,
      sumAmount: 0,
    };

    // console.log(summaryItems);

    var newDeliveryList = [];
    var newShipmentList = [];
    var newSaleOrderList = [];

    var newBaseItem = baseItems.filter((x) => x.isChecked === true);

    console.log(newBaseItem);
    var _sumQty = 0;

    newBaseItem.map((x) => {
      _sumQty += x.qty;
      newDeliveryList.push(x.deliveryNo);

      newShipmentList.push(x.shipmentNo);
      newSaleOrderList.push(x.saleOrderNo);
    });

    var countDelivery = [...new Set(newDeliveryList)].length;
    var countShipment = [...new Set(newShipmentList)].length;
    var countSaleOrder = [...new Set(newSaleOrderList)].length;

    console.log("countDelivery", countDelivery);
    console.log("countShipment", countShipment);
    console.log("countSaleOrder", countSaleOrder);

    newDoc.sumQty = _sumQty;
    newDoc.sumSaleOrder = countSaleOrder;
    newDoc.sumShipment = countShipment;
    newDoc.sumDelivery = countDelivery;
    newDoc.sumAmount = totalAmount;
    // totalAmount;

    var commituser = [
      ...userApproveListItems,
      ...userReviewerListItems,
      ...userCCListItems,
    ];

    commituser.map((x) => {
      var tpaymentReviewerAndCcsSub = {
        type: null,
        userName: null,
        ordinal: null,
      };

      if (x.type === 1) {
        // console.log(x);
        newDoc.toName = x.aliasName;
      }
    });

    // Render to View PDF
    FunctionController.renderPDF(newDoc , false );

    // console.log(newDoc);

    // Convert PDF to File in Variable
    FunctionController.convertPDFToFile(newDoc, "Cover Sheet" , false ).then(
      (result) => {
        console.log(result);
      }
    );

    // console.log(newFile.value)
  };

  const dialogs = () => {
    return (
      <h6>
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
            className="btn-mainsmp"
            size={Constant.btAddSize}
            block
            onClick={handleClickOpen("add")}
            // color="danger"
            // to='/Transaction/TPE/Domestic/PaymentList'
          >
            สร้างรายการ
          </CButton>
        </Box>

        <Dialog
          fullScreen
          open={openAddForm}
          onClose={handleClose("add")}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={handleClose("add")}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>Payment</h3>
              </Typography>
              <CButton className="btt-close" onClick={handleClose("add")}>
                <h5>Close</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>
            {collapseHeader("add")}
            {/* {modalForm()} */}
            {modalDialog()}
            {footerbox()}
          </List>
        </Dialog>

        <Dialog
          fullScreen
          open={openEditForm}
          onClose={handleClose("edit")}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={handleClose("edit")}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>Payment</h3>
              </Typography>
              <CButton className="btt-close" onClick={handleClose("edit")}>
                <h5>Close</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>
            {collapseHeader("edit")}
            {/* {otherTables("edit")} */}
          </List>
        </Dialog>
      </h6>
    );
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

  const showPaymentCompany = () => {
    if (selectItemsSearch[4].length > 1) {
      return (
        <CSelect
          className="form-control"
          id="create-payment-companyId"
          required
        >
          <option selected hidden value="">
            {Constant.txtformPlaceholderSelected}
          </option>
          {companyList.map((x) => (
            <option value={x.companyId}>
              {"[" + x.companyCode + "] " + x.companyName}
            </option>
          ))}
        </CSelect>
      );
    } else {
      return (
        <CInput
          size="xs"
          type="text"
          id="create-payment-companyId"
          disabled
          value={
            companyList[0]
              ? "[" +
                companyList[0].companyCode +
                "] " +
                companyList[0].companyName
              : ""
          }
          required
        />
      );
    }
  };

  const collapseHeader = (type) => {
    // //console.log(shipmentData);
    // //console.log(extrachargeData);

    if (type === "add") {
      if (companyList[0] && (shipmentData.length || extrachargeData.length)) {
        var DueDate =
          selectItemsSearch[1].dueDate !== null
            ? new Date(selectItemsSearch[1].dueDate)
            : null;
        DueDate = formatDate(DueDate);

        return (
          <div>
            <CCard color="gradient-secondary" className="color-card-gra p-3">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                1. General Information
                <div className="card-header-actions">
                  {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                  {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                </div>
              </CCardHeader>
              <CCollapse show={collapsed}>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardBody className="font-form-scg-card">
                    <CForm className="general-info-need-validation" noValidate>
                      {/* <h6> */}
                      <CRow>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">Company </CLabel>
                            {showtext()}
                            <Box
                              className="border-set"
                              component={Grid}
                              item
                              boxShadow={1}
                              xs={{
                                width: " 100%",
                              }}
                            >
                              {showPaymentCompany()}
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </Box>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">Vender </CLabel>
                            {showtext()}
                            <Box
                              className="border-set"
                              component={Grid}
                              item
                              boxShadow={1}
                              xs={{
                                width: " 100%",
                              }}
                            >
                              <Autocomplete
                                id="search-transporter"
                                size="small"
                                options={transportByMain}
                                loading
                                autoHighlight
                                filterSelectedOptions
                                // defaultValue={transportByMain.find(
                                //   (x) => x.isMainTransporter === true
                                // )}
                                onChange={handleChangeSelectCreatePayment(
                                  "transporter"
                                )}
                                getOptionLabel={(option) =>
                                  `[${option.transporterCode}] ` +
                                  option.transporterNameThai
                                }
                                renderOption={(option) => {
                                  return (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {`[${option.transporterCode}] ` +
                                        option.transporterNameThai}
                                    </Typography>
                                  );
                                }}
                                renderInput={(params) => {
                                  params.inputProps.className =
                                    classes.autoCompleteInputLabel;
                                  return (
                                    <TextField
                                      size="small"
                                      error={invalidMaterialFormCreatePay[0]}
                                      {...params}
                                      // onClick={fnGetCompanyListByMain}
                                      label={
                                        <Typography
                                          className={
                                            classes.autoCompleteInputLabel
                                          }
                                        >
                                          {Constant.txtformPlaceholderSelected}
                                        </Typography>
                                      }
                                      helperText={
                                        invalidMaterialFormCreatePay[0] ? (
                                          <Typography
                                            className={
                                              classes.autoCompleteInputHelperText
                                            }
                                          >
                                            {Constant.inValidNullSelected}
                                          </Typography>
                                        ) : null
                                      }
                                      variant="outlined"
                                    />
                                  );
                                }}
                              />
                            </Box>
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CLabel htmlFor="cvv"> </CLabel>
                          </CFormGroup>
                          <CLabel className="pr-2">Tax Id : </CLabel>
                          <CLabel className="base-Label">
                            {" "}
                            {selectItemsCreatePayment[0].taxNo}
                          </CLabel>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CLabel htmlFor="cvv"> </CLabel>
                          </CFormGroup>
                          <CLabel className="pr-2">Branch : </CLabel>
                          <CLabel className="base-Label">
                            {selectItemsCreatePayment[0].branchNo}
                          </CLabel>
                        </CCol>
                      </CRow>
                      <CRow className="pb-3">
                        <CCol xs="12" sm="6" md="6">
                          {/* <CFormGroup>
                          <CLabel htmlFor="cvv">{" "}</CLabel>
                          </CFormGroup> */}
                          {selectItemsCreatePayment[0].address ? (
                            <FaRegAddressCard
                              size="30px"
                              style={{ color: "grey", size: "100px" }}
                            />
                          ) : (
                            ""
                          )}

                          <CLabel className="base-Label pl-2">
                            {selectItemsCreatePayment[0].address}
                          </CLabel>
                        </CCol>
                      </CRow>

                      {otherTablesGerneral()}
                    </CForm>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CCard>

            <CCard color="gradient-secondary" className="color-card-gra p-3">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                2. Shipment Detail
                <div className="card-header-actions">
                  {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed1(!collapsed1)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed1 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                  {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                </div>
              </CCardHeader>
              <CCollapse show={collapsed1}>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardBody className="font-form-scg-card">
                    <CForm
                      className="shipment-detail-need-validation"
                      noValidate
                    >
                      {/* <h6> */}

                      {otherTablesShipmentDetail()}
                      <CRow>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            {/* <CLabel htmlFor="cvv">Due date {showtext()}</CLabel> */}

                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CCard>
            <CCard color="gradient-secondary" className="color-card-gra p-3">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                3. Payment & Budget Information
                <div className="card-header-actions">
                  {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed1(!collapsed1)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed1 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                  {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                </div>
              </CCardHeader>
              <CCollapse show={collapsed1}>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardBody className="font-form-scg-card">
                    <CForm className="payment-info-need-validation" noValidate>
                      {/* <h6> */}
                      <CRow>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">Due date</CLabel>
                            {showtext()}
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
                                value={DueDate}
                                id="create-payment-dueDate"
                                onChange={(e) => {
                                  var newArr = [...selectItemsSearch];

                                  newArr[1].dueDate = e.target.value;

                                  setSelectItemsSearch(newArr);
                                }}
                                name="date-input"
                                placeholder="date"
                                required
                              />
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CLabel htmlFor="name">Currency</CLabel>
                            {showtext()}
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
                                id="create-payment-currency"
                                value={1}
                                disabled
                                required
                              >
                                <option selected hidden value="">
                                  Please Select Currency
                                </option>
                                {cbCurrencyType.map((cb) => (
                                  <option value={cb.valueMember}>
                                    {cb.displayMember}
                                  </option>
                                ))}
                              </CSelect>
                              <CInvalidFeedback>
                                {Constant.inValidNullSelected}
                              </CInvalidFeedback>
                            </Box>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Payment Type</CLabel>
                              {showtext()}
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
                                  id="create-payment-paymentType"
                                  disabled
                                  value={
                                    selectItemsCreatePayment[0].paymentTypeId
                                  }
                                  onChange={onHandleChangeCreate}
                                  required
                                >
                                  <option selected hidden value="">
                                    Please Select Payment Type
                                  </option>
                                  {cbPaymentType.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}
                                    </option>
                                  ))}
                                </CSelect>
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullSelected}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        {showInputLocation()}
                      </CRow>

                      <CRow>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                Payment Description
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
                                <CTextarea
                                  name="textarea-input"
                                  id="create-payment-paymentDesc"
                                  rows="3"
                                  placeholder=""
                                  // onChange={onHandleChangeadd}
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullSelected}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        {showInputServiceTeam()}
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Vendor Email</CLabel>
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
                                  id="create-payment-vendorEmail"
                                  value={selectItemsCreatePayment[0].email}
                                  type="text"
                                  onChange={(e) =>
                                    (selectItemsCreatePayment[0].email =
                                      e.target.value)
                                  }
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullSelected}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                      {/* <CRow>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CLabel for="validationCustom03">
                              Alternative Payee :
                            </CLabel>
                            <br />

                            <CSwitch
                              className={"mx-1"}
                              variant={"3d"}
                              color={"success"}
                              id="create-payment-alternativePayee"
                              //   onChange={onHandleChangeadd}
                              defaultChecked={false}
                              labelOn={"\u2713"}
                              labelOff={"\u2715"}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow> */}
                      <Divider></Divider>
                      <CRow className="pt-2">
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CLabel for="validationCustom03">Non-PO</CLabel>
                            <br />

                            <CSwitch
                              className={"mx-1"}
                              variant={"3d"}
                              color={"success"}
                              id="create-payment-nonPo"
                              disabled
                              block
                              //   onChange={onHandleChangeadd}
                              checked={true}
                              labelOn={"\u2713"}
                              labelOff={"\u2715"}
                            />
                          </CFormGroup>
                        </CCol>
                      </CRow>

                      {tablePayment()}

                      <CRow className="justify-content-center">
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
                              size={Constant.btAddSize}
                              color="success"
                              onClick={onClickAddCost("add")}
                              block
                            >
                              {/* เพิ่มรายการ */}
                              <AiOutlinePlusSquare size="30px" />
                              {""} Add Item
                            </CButton>
                          </Box>
                        </CCol>
                      </CRow>
                      {/* <CRow>
                        <CCol xs="12" sm="12" md="12">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Additional Data</CLabel>
                              <Box
                                className="border-set"
                                component={Grid}
                                item
                                boxShadow={1}
                                xs={{
                                  width: " 100%",
                                }}
                              >
                                <CTextarea
                                  name="textarea-input"
                                  id="create-payment-additionalData"
                                  rows="3"
                                  placeholder=""
                                  // onChange={onHandleChangeadd}
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullSelected}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow> */}
                    </CForm>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CCard>

            <CCard color="gradient-secondary" className="color-card-gra p-3">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                4. User Approval Information
                <div className="card-header-actions">
                  {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed3(!collapsed3)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed3 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                  {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                </div>
              </CCardHeader>
              <CCollapse show={collapsed3}>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardBody className="font-form-scg-card">
                    <CForm className="approve-info-need-validation" noValidate>
                      {/* <h6> */}
                      <CCard
                        color="gradient-secondary"
                        className="color-card-gra p-3"
                      >
                        <CCardHeader
                          className="font-form-scg-card"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          Requestor
                          <div className="card-header-actions">
                            {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                            <CLink
                              className="card-header-action"
                              onClick={() => setCollapsed6(!collapsed6)}
                            >
                              <CIcon
                                className="collap-icon"
                                style={{ color: "black" }}
                                name={
                                  collapsed6
                                    ? "cil-chevron-bottom"
                                    : "cil-chevron-top"
                                }
                              />
                            </CLink>
                            {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                          </div>
                        </CCardHeader>
                        <CCollapse show={collapsed6}>
                          <CCardBody className="font-form-scg-card">
                            <CRow>
                              <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                  <CLabel htmlFor="cvv">
                                    Requestor {showtext()}
                                  </CLabel>
                                  <CInput
                                    value={_Username}
                                    readOnly
                                    size="xs"
                                    type="text"
                                    required
                                  ></CInput>
                                  <CInvalidFeedback>
                                    {Constant.inValidNullMessage}
                                  </CInvalidFeedback>
                                </CFormGroup>
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </CCollapse>
                      </CCard>

                      <CCard
                        color="gradient-secondary"
                        className="color-card-gra p-3"
                      >
                        <CCardHeader
                          className="font-form-scg-card"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          Reviewer
                          <div className="card-header-actions">
                            {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                            <CLink
                              className="card-header-action"
                              onClick={() => setCollapsed4(!collapsed4)}
                            >
                              <CIcon
                                className="collap-icon"
                                style={{ color: "black" }}
                                name={
                                  collapsed4
                                    ? "cil-chevron-bottom"
                                    : "cil-chevron-top"
                                }
                              />
                            </CLink>
                            {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                          </div>
                        </CCardHeader>
                        <CCollapse show={collapsed4}>
                          <CCardBody className="font-form-scg-card">
                            <CRow className="justify-content-between">
                              <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                  <CFormGroup>
                                    <CLabel htmlFor="name">Reviewer</CLabel>

                                    <Autocomplete
                                      id="tags-filled"
                                      size="small"
                                      // multiple
                                      options={userReviewerList}
                                      onChange={handleChangeAddCCAndReviewer(
                                        "reviewer"
                                      )}
                                      getOptionLabel={(option) =>
                                        `[${option.userName}]` +
                                        "  " +
                                        option.aliasName
                                      }
                                      renderOption={(option) => {
                                        return (
                                          <Typography
                                            className={
                                              classes.autoCompleteRenderOptions
                                            }
                                          >
                                            {`[${option.userName}]` +
                                              "  " +
                                              option.aliasName}
                                          </Typography>
                                        );
                                      }}
                                      renderInput={(params) => {
                                        params.inputProps.className =
                                          classes.autoCompleteInputLabel;
                                        return (
                                          <TextField
                                            size="small"
                                            {...params}
                                            onClick={GetUserReviewerList}
                                            label={
                                              <Typography
                                                className={
                                                  classes.autoCompleteInputLabel
                                                }
                                              >
                                                {
                                                  Constant.txtformPlaceholderSelected
                                                }
                                              </Typography>
                                            }
                                            variant="outlined"
                                          />
                                        );
                                      }}
                                    />

                                    <br />
                                    {/* <CButton
                                      size={Constant.btAddSize}
                                      color="success"
                                      block
                                    >
                                      +Add
                                    </CButton> */}

                                    <CInvalidFeedback>
                                      {Constant.inValidNullMessage}
                                    </CInvalidFeedback>
                                    {tableApproval(
                                      userReviewerListItems,
                                      fieldsApproveval
                                    )}
                                  </CFormGroup>
                                </CFormGroup>
                              </CCol>
                              <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                  <CFormGroup>
                                    <CLabel htmlFor="name">CC</CLabel>

                                    <Autocomplete
                                      id="tags-filled"
                                      size="small"
                                      // multiple
                                      options={userCCList}
                                      onChange={handleChangeAddCCAndReviewer(
                                        "cc"
                                      )}
                                      getOptionLabel={(option) =>
                                        `[${option.userName}]` +
                                        "  " +
                                        option.aliasName
                                      }
                                      renderOption={(option) => {
                                        return (
                                          <Typography
                                            className={
                                              classes.autoCompleteRenderOptions
                                            }
                                          >
                                            {`[${option.userName}]` +
                                              "  " +
                                              option.aliasName}
                                          </Typography>
                                        );
                                      }}
                                      renderInput={(params) => {
                                        params.inputProps.className =
                                          classes.autoCompleteInputLabel;
                                        return (
                                          <TextField
                                            size="small"
                                            {...params}
                                            onClick={GetUserCCList}
                                            label={
                                              <Typography
                                                className={
                                                  classes.autoCompleteInputLabel
                                                }
                                              >
                                                {
                                                  Constant.txtformPlaceholderSelected
                                                }
                                              </Typography>
                                            }
                                            variant="outlined"
                                          />
                                        );
                                      }}
                                    />

                                    <br />
                                    {/* <CButton
                                      size={Constant.btAddSize}
                                      color="success"
                                      block
                                    >
                                      +Add
                                    </CButton> */}
                                    {tableApprovalCC(userCCListItems, fieldsCC)}
                                    <CInvalidFeedback>
                                      {Constant.inValidNullMessage}
                                    </CInvalidFeedback>
                                  </CFormGroup>
                                </CFormGroup>
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </CCollapse>
                      </CCard>

                      <CCard
                        color="gradient-secondary"
                        className="color-card-gra p-3"
                      >
                        <CCardHeader
                          className="font-form-scg-card"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          Approver
                          <div className="card-header-actions">
                            {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                            <CLink
                              className="card-header-action"
                              onClick={() => setCollapsed5(!collapsed5)}
                            >
                              <CIcon
                                className="collap-icon"
                                style={{ color: "black" }}
                                name={
                                  collapsed5
                                    ? "cil-chevron-bottom"
                                    : "cil-chevron-top"
                                }
                              />
                            </CLink>
                            {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                          </div>
                        </CCardHeader>
                        <CCollapse show={collapsed5}>
                          <CCardBody className="font-form-scg-card">
                            <CRow>
                              <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                  <CLabel for="validationCustom03">
                                    Auto DOA
                                  </CLabel>
                                  <br />

                                  <CSwitch
                                    className={"mx-1"}
                                    variant={"3d"}
                                    color={"success"}
                                    id="create-payment-autoDoa"
                                    block
                                    disabled
                                    //   onChange={onHandleChangeadd}
                                    defaultChecked={false}
                                    labelOn={"\u2713"}
                                    labelOff={"\u2715"}
                                  />
                                </CFormGroup>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol xs="12" sm="6" md="6">
                                <CFormGroup>
                                  <CFormGroup>
                                    <CLabel htmlFor="name">Approver</CLabel>
                                    {showtext()}
                                    <Autocomplete
                                      id="tags-filled"
                                      size="small"
                                      // multiple
                                      options={userApproveList}
                                      onChange={handleChangeAddCCAndReviewer(
                                        "approve"
                                      )}
                                      getOptionLabel={(option) =>
                                        `[${option.userName}]` +
                                        "  " +
                                        option.aliasName
                                      }
                                      renderOption={(option) => {
                                        return (
                                          <Typography
                                            className={
                                              classes.autoCompleteRenderOptions
                                            }
                                          >
                                            {`[${option.userName}]` +
                                              "  " +
                                              option.aliasName}
                                          </Typography>
                                        );
                                      }}
                                      renderInput={(params) => {
                                        params.inputProps.className =
                                          classes.autoCompleteInputLabel;
                                        return (
                                          <TextField
                                            size="small"
                                            {...params}
                                            onClick={GetUserApproveList}
                                            label={
                                              <Typography
                                                className={
                                                  classes.autoCompleteInputLabel
                                                }
                                              >
                                                {
                                                  Constant.txtformPlaceholderSelected
                                                }
                                              </Typography>
                                            }
                                            variant="outlined"
                                          />
                                        );
                                      }}
                                    />

                                    <CInvalidFeedback>
                                      {Constant.inValidNullSelected}
                                    </CInvalidFeedback>
                                  </CFormGroup>
                                </CFormGroup>
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </CCollapse>
                      </CCard>
                    </CForm>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CCard>
            <CCard color="gradient-secondary" className="color-card-gra p-3">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                5. Invoice/Tax Invoice/Other Information
                <div className="card-header-actions">
                  {/* <CLink className="card-header-action">
                                      <CIcon name="cil-settings" />
                                  </CLink> */}
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed2(!collapsed2)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed2 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                  {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                      <CIcon name="cil-x-circle" />
                                  </CLink> */}
                </div>
              </CCardHeader>
              <CCollapse show={collapsed2}>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardBody className="font-form-scg-card">
                    <CForm className="invoice-info-need-validation" noValidate>
                      <CRow className="m-1 p-0 justify-content-center">
                        <CCol xs="12" sm="6" md="12">
                          <Box
                            className="border-set"
                            component={Grid}
                            item
                            boxShadow={1}
                            xs={{
                              width: " 100%",
                            }}
                          >
                            <CCard
                              className="p-3"
                              style={{
                                borderColor: "#5089c6",
                                borderStyle: "dashed",
                              }}
                            >
                              <CLabel
                                className="text-center"
                                style={{ color: "#5089c6" }}
                                onClick={addInvoiceItems}
                              >
                                {" "}
                                Upload Invoice,Tax Invoice Click
                                {<BsFileEarmarkArrowDown size="30px" />}
                              </CLabel>
                            </CCard>
                          </Box>
                        </CCol>
                      </CRow>

                      <br />
                      {/* <CRow className="justify-content-center"> */}
                      {/* <CCard className="p-3"> */}
                      {tabAttachInvoice("show")}
                      {/* </CCard> */}
                      {/* </CRow> */}
                    </CForm>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CCard>
          </div>
        );
      }
    }
  };

  const onClickCheckCreatePayment = () => {
    var newArr = [...selectItemsCreatePayment];
    // onClickCreatePayment();
    // setInvalidMaterialFormCreatePay([false]);
    // setIsConfirmSave(!isConfirmSave)
    if (
      getIsValidForm("general-info-need-validation") &&
      getIsValidForm("payment-info-need-validation") &&
      getIsValidForm("approve-info-need-validation") &&
      Object.keys(newArr[0]).length
    ) {
      setInvalidMaterialFormCreatePay([false]);
      setIsConfirmSave(!isConfirmSave);
    } else {
      if (!Object.keys(newArr[0]).length) {
        setInvalidMaterialFormCreatePay([true]);
      }
    }
  };

  const onClickRemoveRecordUser = (type, index) => (e) => {
    if (type === "Reviewer") {
      var newArr = [...userReviewerListItems];
      newArr.splice(index, 1);
      setUserReviewerListItems(newArr);
    }
    if (type === "CC") {
      var newArr = [...userCCListItems];
      newArr.splice(index, 1);
      setUserCCListItems(newArr);
    }
  };

  const onClickCreatePayment = () => {
    /**1.General Information Input */
    // //console.log(selectItemsCreatePayment)
    var companyId = null;
    if (selectItemsSearch[4].length > 1) {
      companyId = parseInt(
        document.getElementById("create-payment-companyId").value
      );
    } else {
      companyId = companyList.length < 1 ? 10 : companyList[0].companyId;
    }
    var venderId = selectItemsCreatePayment[0].transporterId;
    var taxId = selectItemsCreatePayment[0].taxNo;
    var branch = selectItemsCreatePayment[0].branchNo;
    var address = selectItemsCreatePayment[0].address;
    /**Tab Gr Payment Input */
    var grApprovefor = document.getElementById(
      "create-payment-grApprovefor"
    ).value;
    var subject = document.getElementById("create-payment-subject").value;

    /**3.Payment&Budget Information Input */
    var dueDate = document.getElementById("create-payment-dueDate").value;
    var currency = document.getElementById("create-payment-currency").value;
    var paymentType = document.getElementById(
      "create-payment-paymentType"
    ).value;
    // var locationCode = document.getElementById(
    //   "create-payment-LocationCode"
    // ).value;
    var paymentDesc = document.getElementById(
      "create-payment-paymentDesc"
    ).value;
    var serviceTeam = serviceTeamItems;
    var vendorEmail = document.getElementById(
      "create-payment-vendorEmail"
    ).value;
    // var alternativePayee = document.getElementById(
    //   "create-payment-alternativePayee"
    // ).checked;
    // var addtionalData = document.getElementById(
    //   "create-payment-additionalData"
    // ).value;
    var nonpo = document.getElementById("create-payment-nonPo").checked;

    /**4.Tax Invoice */

    /**5.User Approval */
    var requestor = _Username;
    var reviewer = null;
    var cc = null;

    // var autoDoa = document.getElementById("create-payment-autoDoa").checked;
    // var approver = document.getElementById("create-payment-approver").value;

    /**Supporting Doc */
    var supportFile = supportfile;

    var newFileList = [];

    supportfile.map((x, index) => {
      var obj = {
        guid: null,
        fileData: null,
      };

      obj.guid = "00" + "-" + "0" + index;
      obj.fileData = x;

      newFileList.push(obj);
    });

    var newSupportFileList = [];

    supportfile.map((x, index) => {
      var obj = {
        fileName: null,
        guid: null,
      };

      obj.guid = "00" + "-" + "0" + index;
      obj.fileName = x.name;

      newSupportFileList.push(obj);
    });

    var acsum = 0;
    var acVatsum = 0;
    invoiceItems.map((x, index) => {
      acsum = acsum + x.amount;
      acVatsum = parseFloat(acVatsum + x.vatAmount);
    });

    setActualAmount(acsum);
    setActualVat(acVatsum);

    var newObj = {
      // paymentId : null ,
      startDate: null,
      endDate: null,
      transporterId: null,
      transporterCode: null,
      transporterName: null,
      transporterEmail: null,
      companyId: null,
      companyCode: null,
      companyName: null,
      paymentTypeId: null,
      bankName: null,
      accountNo: null,
      placeCheque: null,
      creditTerm: null,
      price: null,
      refNo: null,
      allPayNo: null,
      taxId: null,
      branch: null,
      address: null,
      grApprovefor: null,
      subject: null,
      dueDate: null,
      currency: null,
      paymentDescription: null,
      exchangeRate: null,
      serviceTeamCode: null,
      smpamount: null,
      smpvat: null,
      smptotalAmount: null,
      actualAmount: null,
      actualVat: null,
      actualTotalAmount: null,
      tpaymentItems: null,
      tpaymentReviewerAndCcs: null,
      tpaymentShipmentLists: null,
      tpaymentSupportFiles: null,
    };

    // ใบปะหน้า
    const toDay = new Date();
    var newDoc = {
      createDate: toDay,
      toName: "",
      fromName: _aliasName,
      subject: subject,
      transporterName: selectItemsCreatePayment[0].transporterNameThai,
      smpNo: "",
      companyName: companyList[0].companyName,
      sumQty: 0,
      sumSaleOrder: 0,
      sumShipment: 0,
      sumDelivery: 0,
      sumAmount: 0,
    };

    console.log(summaryItems);

    var _sumSaleOrder = 0;
    var _sumShipment = 0;
    var _sumDelivery = 0;
    var _sumQty = 0;
    console.log(baseItems);
    baseItems.map((x) => {
      _sumQty += x.qty;

      if (x.saleOrderNo !== "") {
        _sumSaleOrder += 1;
      }

      if (x.shipmentNo !== "") {
        _sumShipment += 1;
      }

      if (x.deliveryNo !== "") {
        _sumDelivery += 1;
      }
    });

    newDoc.sumQty = _sumQty;
    newDoc.sumSaleOrder = _sumSaleOrder;
    newDoc.sumShipment = _sumShipment;
    newDoc.sumDelivery = _sumDelivery;
    newDoc.sumAmount = totalAmount;

    var tpaymentAttachFilesSupport = [];

    supportfile.map((y, index) => {
      var tpaymentAttachFilessub = {
        fileName: null,
        guid: null,
      };

      tpaymentAttachFilessub.fileName = y.name;
      tpaymentAttachFilessub.guid = "0" + 0 + "-" + "1" + index;

      tpaymentAttachFilesSupport.push(tpaymentAttachFilessub);
    });

    var fileListData = [];

    // console.log(
    //   FunctionController.convertDataToFile(
    //     fieldTransportRate2,
    //     FunctionController.setNumberValueInArray(
    //       fieldTransportRate2,
    //       shipmentData
    //     ),
    //     "ShipmentList"
    //   )
    // );

    // console.log(
    //   FunctionController.convertDataToFile(
    //     fieldMain,
    //     FunctionController.setNumberValueInArray(fieldMain, baseItems),
    //     "DeliveryList"
    //   )
    // );
    // console.log(
    //   FunctionController.convertDataToFile(
    //     fieldExtraCharge,
    //     FunctionController.setNumberValueInArray(
    //       fieldExtraCharge,
    //       extrachargeData
    //     ),
    //     "ExtraChargeList"
    //   )
    // );

    var fileList = {
      guid: null,
      fileData: null,
    };

    fileList.guid = null;
    fileList.fileData = null;

    var tpaymentItemsList = [];
    var totalsum = 0;
    //console.log(costItems);
    //console.log(costItems.length);
    //console.log(invoiceItems);
    costItems.map((z) => {
      if (z.costElement !== "" && z.costCenter) {
        var tpaymentItems = {
          expenseCode: null,
          costCenterCode: null,
          internalOrderNumber: null,
          assignment: null,
          amount: null,
          tpaymentDocuments: [],
        };

        tpaymentItems.expenseCode = z.costElement;
        tpaymentItems.costCenterCode = z.costCenter;
        tpaymentItems.internalOrderNumber = z.orderNo;
        tpaymentItems.assignment = z.assignment;

        // tpaymentItemsList.push(tpaymentItems);

        var tpaymentDocumentsList = [];
        invoiceItems.map((x, indexmain) => {
          var tpaymentDocuments = {
            documentType: null,
            documentNo: null,
            documentDate: null,
            amount: null,
            reference1: null,
            tpaymentVatRate: {},
            tpaymentAttachFiles: null,
            tpaymentWhtrates: [],
          };

          tpaymentDocuments.documentType = x.documentTypeId;
          tpaymentDocuments.documentNo = x.documentNo;
          tpaymentDocuments.documentDate = x.documentDate;
          tpaymentDocuments.reference1 = x.reference1;
          tpaymentDocuments.amount = x.amount;
          totalsum += parseFloat(x.amount);

          //console.log(x.fileName);

          var tpaymentAttachFiles = [];
          x.fileName.map((y, index) => {
            var tpaymentAttachFilessub = {
              fileName: null,
              guid: null,
            };

            tpaymentAttachFilessub.fileName = y.name;
            tpaymentAttachFilessub.guid =
              "0" + (indexmain + 1) + "-" + "1" + index;

            tpaymentAttachFiles.push(tpaymentAttachFilessub);

            var obj = {
              guid: null,
              fileData: null,
            };

            obj.guid = tpaymentAttachFilessub.guid;
            obj.fileData = y;

            newFileList.push(obj);
          });

          var tpaymentVatRate = {
            rate: null,
            baseAmount: null,
            vatAmount: null,
          };

          tpaymentVatRate.rate = 0;
          tpaymentVatRate.baseAmount = parseFloat(x.amount);
          tpaymentVatRate.vatAmount = 0;
          var newWrr = [];

          var tpaymentWhtrates = {
            rate: 0,
            baseAmount: 0,
            vatAmount: 0,
          };

          tpaymentWhtrates.rate = 0;
          tpaymentWhtrates.baseAmount = parseFloat(x.amount);
          tpaymentWhtrates.vatAmount = 0;

          newWrr.push(tpaymentWhtrates);

          if (x.mpaymentVatRates.checkbox !== false) {
            tpaymentDocuments.tpaymentVatRate = x.mpaymentVatRates;
          }
          tpaymentDocuments.tpaymentAttachFiles = tpaymentAttachFiles;
          if (indexmain < 3) {
            if (x.mpaymentWhtRates[indexmain].checkbox !== false) {
              tpaymentDocuments.tpaymentWhtrates.push(
                x.mpaymentWhtRates[indexmain]
              );
            }
          }

          // tpaymentDocumentsList.push(tpaymentDocuments);
          if (z.csId.toString() === x.ioNo) {
            tpaymentItems.tpaymentDocuments.push(tpaymentDocuments);
          }
        });
        tpaymentItems.amount = totalsum;
        // tpaymentItems.tpaymentDocuments = tpaymentDocumentsList;
        tpaymentItemsList.push(tpaymentItems);
      }
    });

    var commituser = [
      ...userApproveListItems,
      ...userReviewerListItems,
      ...userCCListItems,
    ];

    var tpaymentReviewerAndCcs = [];
    commituser.map((x) => {
      var tpaymentReviewerAndCcsSub = {
        type: null,
        userName: null,
        ordinal: null,
      };

      if (x.type === 1) {
        newDoc.toName = x.userName;
      }

      tpaymentReviewerAndCcsSub.type = x.type.toString();
      tpaymentReviewerAndCcsSub.userName = x.userName;
      tpaymentReviewerAndCcsSub.ordinal = x.ordinal;

      tpaymentReviewerAndCcs.push(tpaymentReviewerAndCcsSub);
    });

    var tpaymentShipment = [];
    var setNewSelectitems = baseItems.filter((x) => x.isChecked === true);
    setNewSelectitems.map((x) => {
      var tpaymentShipmentLists = {
        shipmentNo: null,
      };
      tpaymentShipmentLists.shipmentNo = x.shipmentNo;

      tpaymentShipment.push(tpaymentShipmentLists);
    });

    newObj.startDate = startDate;
    newObj.endDate = endDate;
    newObj.transporterId = selectItemsCreatePayment[0].transporterId;
    newObj.transporterCode = selectItemsCreatePayment[0].transporterCode;
    newObj.transporterName = selectItemsCreatePayment[0].transporterNameThai;
    newObj.transporterEmail = selectItemsCreatePayment[0].email;
    newObj.companyId = companyList[0].companyId;
    newObj.companyCode = companyList[0].companyCode;
    newObj.companyName = companyList[0].companyName;
    newObj.paymentTypeId = selectItemsCreatePayment[0].paymentTypeId;
    newObj.bankName = selectItemsCreatePayment[0].bankName;
    newObj.accountNo = selectItemsCreatePayment[0].accountNo;
    newObj.placeCheque = selectItemsCreatePayment[0].placeCheque;
    newObj.creditTerm = selectItemsCreatePayment[0].creditTerm;
    newObj.price = totalAmount;
    newObj.refNo = "";
    newObj.allPayNo = null;
    newObj.taxId = taxId;
    newObj.branch = branch;
    newObj.address = address;
    newObj.grApprovefor = grApprovefor;
    newObj.subject = subject;
    newObj.dueDate = dueDate;
    newObj.currency = currency;
    newObj.paymentDescription = paymentDesc;
    newObj.exchangeRate = 1;
    newObj.serviceTeamCode = serviceTeam;
    newObj.smpamount = amount;
    newObj.smpvat = vatAmount;
    newObj.smptotalAmount = totalAmount;
    newObj.actualAmount = acsum;
    newObj.actualVat = parseFloat(acVatsum);
    newObj.actualTotalAmount = acsum + acVatsum;
    // newObj.createBy = null;
    // newObj.createDateTime = null;
    newObj.tpaymentItems = tpaymentItemsList;
    newObj.tpaymentReviewerAndCcs = tpaymentReviewerAndCcs;
    newObj.tpaymentShipmentLists = tpaymentShipment;

    var shipmentIOList = [];
    extrachargeData.map((x) => {
      var obj = {
        shipmentNo: null,
        ioNo: null,
        runningNo: null,
      };
      if (x.ioNo) {
        obj.shipmentNo = x.shipmentNo;
        obj.ioNo = x.ioNo;
        obj.runningNo = x.runningNo;
        shipmentIOList.push(obj);
      }
    });

    for (let i = 0; i < 3; i++) {
      var newListSup = {
        fileName: null,
        guid: null,
      };

      var newList = {
        guid: null,
        fileData: null,
      };
      if (i === 0) {
        newList.guid = "99-01";
        newList.fileData = FunctionController.convertDataToFile(
          fieldTransportRate2,
          FunctionController.setNumberValueInArray(
            fieldTransportRate2,
            shipmentData
          ),
          "ShipmentList"
        );

        newListSup.fileName = "ShipmentList.xlsx";
        newListSup.guid = "99-01";

        newFileList.push(newList);
        newSupportFileList.push(newListSup);
      }
      if (extrachargeData.length) {
        if (i === 1) {
          newList.guid = "99-02";
          newList.fileData = FunctionController.convertDataToFile(
            fieldExtraCharge,
            FunctionController.setNumberValueInArray(
              fieldExtraCharge,
              extrachargeData
            ),
            "ExtraChargeList"
          );

          newListSup.fileName = "ExtraChargeList.xlsx";
          newListSup.guid = "99-02";

          newFileList.push(newList);
          newSupportFileList.push(newListSup);
        }
      }
      if (i === 2) {
        newList.guid = "99-03";
        newList.fileData = FunctionController.convertDataToFile(
          fieldMain,
          FunctionController.setNumberValueInArray(
            fieldMain,
            setNewSelectitems
          ),
          "DeliveryList"
        );

        newListSup.fileName = "DeliveryList.xlsx";
        newListSup.guid = "99-03";

        newFileList.push(newList);
        newSupportFileList.push(newListSup);
      }
    }

    newObj.tpaymentSupportFiles = newSupportFileList;
    setCreateDoc(newDoc);
    console.log(newDoc);

    console.log(newObj);
    console.log(newFileList);

    console.log(shipmentIOList);

    fnCreatePayment(newObj, newFileList, shipmentIOList);
  };

  const fileViews = () => {
    if (invoiceItems[indexFiles[0]]) {
      var lengthOfFile = invoiceItems[indexFiles[0]].fileName.length;

      var newArr = [];
      for (var i = 1; i <= lengthOfFile; i++) {
        newArr.push(
          <CCol xs="12" sm="6" md="12">
            <CLabel style={{ color: "#056776" }}>
              {i + "."}
              <BsFileEarmarkCheck
                // block
                className="text-center"
                style={{
                  width: "100px",
                  height: "100px",
                  color: "#056776",
                }}
              >
                {/* +Add */}
              </BsFileEarmarkCheck>
              {invoiceItems[indexFiles[0]].fileName[i - 1].name}
            </CLabel>
            {"\xa0 \xa0 \xa0"}
            <CButton
              id={"bt-" + i}
              color="danger"
              onClick={(e) => {
                var newArr = e.target.id.split("-");
                var index = parseInt(newArr[newArr.length - 1]) - 1;

                onClickRemoveRecordFile("fileView", index);
              }}
            >
              ลบไฟล์
            </CButton>
          </CCol>
        );
      }

      return <div>{newArr}</div>;
    }
  };

  const onClickRemoveRecordFile = (type, index) => {
    if (type === "fileView") {
      var newBrr = [...invoiceItems];
      console.log(invoiceItems[indexFiles[0]].fileName[index]);
      newBrr[indexFiles[0]].fileName.splice(index, 1);
      setInvoiceItems(newBrr);
    }

    if (type === "fileViewSupport") {
      var newBrr = [...supportfile];
      console.log(newBrr);
      newBrr.splice(index, 1);
      setSupportFile(newBrr);
    }
  };

  const SupportFileViews = () => {
    if (supportfile) {
      var lengthOfFile = supportfile.length;

      var newArr = [];
      for (var i = 1; i <= supportfile.length; i++) {
        newArr.push(
          <CCol xs="12" sm="6" md="12">
            <CLabel style={{ color: "#056776" }}>
              {i + "."}
              <BsFileEarmarkCheck
                // block
                className="text-center"
                style={{
                  width: "100px",
                  height: "100px",
                  color: "#056776",
                }}
              >
                {/* +Add */}
              </BsFileEarmarkCheck>
              {supportfile[i - 1].name}
            </CLabel>
            {"\xa0 \xa0 \xa0"}
            <CButton
              id={"bt-" + i}
              color="danger"
              onClick={(e) => {
                var newArr = e.target.id.split("-");
                var index = parseInt(newArr[newArr.length - 1]) - 1;

                onClickRemoveRecordFile("fileViewSupport", index);
              }}
            >
              ลบไฟล์
            </CButton>
          </CCol>
        );
      }

      return <div>{newArr}</div>;
    }
  };

  const collapseHeaderInvoice = (type) => {
    if (type === "add") {
      return (
        <CForm>
          <CCard color="gradient-secondary" className="color-card-gra p-3">
            <CForm className="header-need-validation">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                Tax Invoice
                <div className="card-header-actions">
                  {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed11(!collapsed11)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed11 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                  {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                    <CIcon name="cil-x-circle" />
                                </CLink> */}
                </div>
              </CCardHeader>
              <CCollapse show={collapsed11}>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardBody
                    // xs="12"
                    // sm="6"
                    // md="12"
                    className="font-form-scg-card"
                  >
                    {/* <h6> */}
                    <CRow>
                      <CCol xs="12" sm="6" md="12">
                        {/* <CFormGroup
                          style={{ backgroundColor: "white" }}
                          // className="justify-content-center text-center"
                          // inline
                        > */}
                        <CLabel
                          style={{ color: "#056776" }}
                          htmlFor="file-input-invoice"
                        >
                          <BsFileEarmarkArrowDown
                            // block
                            className="text-center"
                            style={{
                              width: "100px",
                              height: "100px",
                              color: "#056776",
                            }}
                          ></BsFileEarmarkArrowDown>
                          Click to Attach file
                        </CLabel>

                        <CInputFile
                          class="form-control form-control-lg"
                          multiple
                          size="lg"
                          onChange={handleFileUploadInvoice}
                          id="file-input-invoice"
                          name="file-input-invoice"
                          style={{ display: "none" }}
                        />

                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                        <CRow>{fileViews()}</CRow>
                        {/* </CFormGroup> */}
                      </CCol>

                      {/* <CCol>{itemList}</CCol> */}
                    </CRow>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CForm>
          </CCard>

          <CCard color="gradient-secondary" className="color-card-gra p-3">
            <CForm className="header-need-validation">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                Supporting Doc
                <div className="card-header-actions">
                  {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed10(!collapsed10)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed10 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                  {/* <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                                    <CIcon name="cil-x-circle" />
                                </CLink> */}
                </div>
              </CCardHeader>
              <CCollapse show={collapsed10}>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardBody className="font-form-scg-card">
                    <CCol xs="12" sm="6" md="12">
                      <CFormGroup
                        style={{ backgroundColor: "white" }}
                        // className="justify-content-center text-center"
                      >
                        <CLabel
                          style={{ color: "#056776" }}
                          htmlFor="file-input-support"
                        >
                          {/* +ADD */}
                          <BsFileEarmarkArrowDown
                            // block
                            className="text-center"
                            style={{
                              width: "100px",
                              height: "100px",
                              color: "#056776",
                            }}
                          >
                            {/* +Add */}
                          </BsFileEarmarkArrowDown>
                          Click to Attach file
                        </CLabel>

                        <CInputFile
                          class="form-control form-control-lg"
                          multiple
                          size="lg"
                          onChange={handleFileUploadSupportFile}
                          id="file-input-support"
                          name="file-input-support"
                          style={{ display: "none" }}
                        />

                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                        <CRow>{SupportFileViews()}</CRow>
                      </CFormGroup>
                    </CCol>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CForm>
          </CCard>
        </CForm>
      );
    }
  };

  const onHandleChangeVat = (type) => (e) => {
    var newArr = [...invoiceItems];
    var sum = 0;
    var wht = 0;
    newArr.map((x, index) => {
      if (index < 3) {
        wht = wht + x.mpaymentWhtRates[index].vatAmount;
      }
    });
    sum = newArr[indexFiles[0]].amount - wht;

    // var newBrr = [...invoiceItems];

    if (type === "checkBox") {
      newArr[indexFiles[0]].mpaymentVatRates.checkbox = e.target.checked;
      if (e.target.checked === false) {
        newArr[indexFiles[0]].totalAmount = newArr[indexFiles[0]].amount;
        //console.log(newArr[indexFiles[0]]);
        //console.log(newArr[indexFiles[0]].baseAmount);
        setTotalPrice(sum);
      } else {
        setTotalPrice(sum + newArr[indexFiles[0]].mpaymentVatRates.vatAmount);
        newArr[indexFiles[0]].totalAmount =
          newArr[indexFiles[0]].amount + newArr[indexFiles[0]].vatAmount;
      }
    }
    if (type === "vat") {
      newArr[indexFiles[0]].mpaymentVatRates.rate = parseFloat(e.target.value);
      newArr[indexFiles[0]].mpaymentVatRates.baseAmount = newArr[indexFiles[0]]
        .mpaymentVatRates.baseAmount
        ? newArr[indexFiles[0]].mpaymentVatRates.baseAmount
        : newArr[indexFiles[0]].amount;
      newArr[indexFiles[0]].mpaymentVatRates.vatAmount =
        newArr[indexFiles[0]].mpaymentVatRates.baseAmount *
        (newArr[indexFiles[0]].mpaymentVatRates.rate / 100);
    }

    if (type === "baseAmount") {
      //console.log("baseAmount");
      // newArr[indexFiles[0]].mpaymentVatRates.rate = parseInt(e.target.value);
      if (parseInt(e.target.value) <= newArr[indexFiles[0]].amount) {
        newArr[indexFiles[0]].mpaymentVatRates.baseAmount = parseFloat(
          e.target.value
        );
      }
      // newArr[indexFiles[0]].mpaymentVatRates.baseAmount =
      //   newArr[indexFiles[0]].amount;
      newArr[indexFiles[0]].mpaymentVatRates.vatAmount =
        newArr[indexFiles[0]].mpaymentVatRates.baseAmount *
        (newArr[indexFiles[0]].mpaymentVatRates.rate / 100);
    }

    setInvoiceItems(newArr);

    //console.log(newArr);
  };

  const onHandleChangeWhtRateNew = (type, id) => (e) => {
    // reCalWht
    var newArr = [...invoiceItems];
    var sum = 0;
    var indexItem = id;
    var wht = 0;
    sum =
      newArr[indexFiles[0]].amount +
      newArr[indexFiles[0]].mpaymentVatRates.vatAmount;

    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].mpaymentWhtRates.map((x) => {
      if (x.checkbox === true) {
        wht = wht + x.vatAmount;
      }
    });

    //console.log(indexItem);
    //console.log(newArr[indexFiles[0]].mpaymentWhtRates[indexItem]);

    if (type === "checkBox") {
      newArr[indexFiles[0]].mpaymentWhtRates[indexItem].checkbox =
        e.target.checked;
      if (e.target.checked === false) {
        newArr[indexFiles[0]].totalAmount =
          sum -
          wht +
          newArr[indexFiles[0]].mpaymentWhtRates[indexItem].vatAmount;
        // newArr[indexFiles[0]].mpaymentWhtRates[indexItem].vatAmount = 0;
        setTotalPrice(sum);
      } else {
        newArr[indexFiles[0]].mpaymentWhtRates[indexItem].vatAmount =
          (newArr[indexFiles[0]].mpaymentWhtRates[indexItem].baseAmount *
            newArr[indexFiles[0]].mpaymentWhtRates[indexItem].rate) /
          100;
        newArr[indexFiles[0]].totalAmount = sum - wht;
        setTotalPrice(
          sum + newArr[indexFiles[0]].mpaymentWhtRates[indexItem].vatAmount
        );
      }
    }
    if (type === "vat") {
      //console.log("vat");
      newArr[indexFiles[0]].mpaymentWhtRates[indexItem].rate = parseFloat(
        e.target.value
      );
      newArr[indexFiles[0]].mpaymentWhtRates[indexItem].baseAmount = newArr[
        indexFiles[0]
      ].mpaymentWhtRates[indexItem].baseAmount
        ? newArr[indexFiles[0]].mpaymentWhtRates[indexItem].baseAmount
        : newArr[indexFiles[0]].amount;

      // newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount2 = parseInt(e.target.value);
      newArr[indexFiles[0]].mpaymentWhtRates[indexItem].vatAmount =
        (newArr[indexFiles[0]].mpaymentWhtRates[indexItem].baseAmount *
          newArr[indexFiles[0]].mpaymentWhtRates[indexItem].rate) /
        100;
    }

    if (type === "baseAmount") {
      //console.log("baseAmount");
      // newArr[indexFiles[0]].mpaymentWhtRates[0].rate = parseInt(e.target.value);
      if (parseInt(e.target.value) <= newArr[indexFiles[0]].totalAmount) {
        newArr[indexFiles[0]].mpaymentWhtRates[indexItem].baseAmount =
          parseFloat(e.target.value);
        // newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount2 = parseInt(e.target.value);
        newArr[indexFiles[0]].mpaymentWhtRates[indexItem].vatAmount =
          (newArr[indexFiles[0]].mpaymentWhtRates[indexItem].baseAmount *
            newArr[indexFiles[0]].mpaymentWhtRates[indexItem].rate) /
          100;
      }
    }

    setInvoiceItems(newArr);

    //console.log(newArr);
  };

  const onHandleChangeWhtRate = (type) => (e) => {
    var newArr = [...invoiceItems];
    // var newArr = [...invoiceItems];
    var sum = 0;
    var wht = 0;
    sum =
      newArr[indexFiles[0]].amount +
      newArr[indexFiles[0]].mpaymentVatRates.vatAmount;

    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].mpaymentWhtRates.map((x) => {
      if (x.checkbox === true) {
        wht = wht + x.vatAmount;
      }
    });

    if (type === "checkBox") {
      newArr[indexFiles[0]].mpaymentWhtRates[0].checkbox = e.target.checked;
      if (e.target.checked === false) {
        newArr[indexFiles[0]].totalAmount =
          sum - wht + newArr[indexFiles[0]].mpaymentWhtRates[0].vatAmount;
        setTotalPrice(sum);
      } else {
        newArr[indexFiles[0]].totalAmount = sum - wht;
        setTotalPrice(
          sum - newArr[indexFiles[0]].mpaymentWhtRates[0].vatAmount
        );
      }
    }
    if (type === "vat") {
      newArr[indexFiles[0]].mpaymentWhtRates[0].rate = parseFloat(
        e.target.value
      );
      newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount = newArr[
        indexFiles[0]
      ].mpaymentWhtRates[0].baseAmount
        ? newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount
        : newArr[indexFiles[0]].amount;

      // newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount2 = parseInt(e.target.value);
      newArr[indexFiles[0]].mpaymentWhtRates[0].vatAmount =
        (newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount *
          newArr[indexFiles[0]].mpaymentWhtRates[0].rate) /
        100;
    }

    if (type === "baseAmount") {
      // newArr[indexFiles[0]].mpaymentWhtRates[0].rate = parseInt(e.target.value);
      if (e.target.value <= newArr[indexFiles[0]].totalAmount) {
        newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount =
          document.getElementById("wht-baseAmount").value;
        // newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount2 = parseInt(e.target.value);
        newArr[indexFiles[0]].mpaymentWhtRates[0].vatAmount =
          (newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount *
            newArr[indexFiles[0]].mpaymentWhtRates[0].rate) /
          100;
      }
    }

    setInvoiceItems(newArr);

    //console.log(newArr);
  };

  const setSumTotalPrice = (e) => {
    var newArr = [...invoiceItems];
    //console.log(e.target.value);
    var sum = 0;
    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].totalAmount =
      newArr[indexFiles[0]].amount +
      newArr[indexFiles[0]].mpaymentVatRates.vatAmount;

    newArr[indexFiles[0]].vatAmount =
      newArr[indexFiles[0]].mpaymentVatRates.vatAmount;
    // //console.log(newArr);

    setInvoiceItems(newArr);
    newArr.map((x) => {
      if (x.documentTypeId === "05") {
        sum = sum - x.totalAmount;
      } else {
        sum = sum + x.totalAmount;
      }
    });
    setTotalPrice(sum);
  };

  const setSumWhtTotalPrice = (id) => (e) => {
    var newArr = [...invoiceItems];
    var sum = 0;
    var wht = 0;
    sum =
      newArr[indexFiles[0]].amount +
      newArr[indexFiles[0]].mpaymentVatRates.vatAmount;

    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].mpaymentWhtRates.map((x) => {
      if (x.checkbox === true) {
        wht = wht + x.vatAmount;
      }
    });

    newArr[indexFiles[0]].totalAmount = sum - wht;

    //console.log("setSumWhtTotalPrice");

    setInvoiceItems(newArr);

    var sum = 0;
    newArr.map((x) => {
      if (x.documentTypeId === "05") {
        sum = sum - x.totalAmount;
      } else {
        sum = sum + x.totalAmount;
      }
    });
    setTotalPrice(sum);
  };

  const collapseHeaderVat = (type) => {
    if (type === "add") {
      if (invoiceItems[indexFiles[0]]) {
        var newArr = [...invoiceItems];
        var baseAmountVat = 0;

        if (newArr[indexFiles[0]].mpaymentVatRates.baseAmount) {
          baseAmountVat = newArr[indexFiles[0]].mpaymentVatRates.baseAmount;
        } else {
          baseAmountVat = newArr[indexFiles[0]].amount;
        }

        var baseAmount = 0;
        if (newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount) {
          baseAmount = newArr[indexFiles[0]].mpaymentWhtRates[0].baseAmount;
        } else {
          baseAmount = newArr[indexFiles[0]].amount;
        }
        // setInvoiceItems(newArr)

        return (
          <CForm>
            <CCard color="gradient-secondary" className="color-card-gra p-3">
              <CForm className="header-need-validation">
                {/* <CCardHeader
                  className="font-form-scg-card"
                  style={{ backgroundColor: "#50949f", color: "white" }}
                >
                  Tax Details
                  <div className="card-header-actions">
                  
                    <CLink
                      className="card-header-action"
                      onClick={() => setCollapsed11(!collapsed11)}
                    >
                    
                    </CLink>
                   
                  </div>
                </CCardHeader> */}
                <CCollapse show={collapsed11}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCardBody className="font-form-scg-card ">
                      <CRow className="pl-3 pr-3 pt-3">
                        <CLabel>Tax Details</CLabel>
                      </CRow>
                      <CRow className="pl-3 pr-3 pb-3">
                        <CLabel>
                          Amount(Incl.VAT){" "}
                          {newArr[indexFiles[0]].totalAmount.toLocaleString(
                            undefined,
                            { maximumFractionDigits: 2 }
                          )}{" "}
                          THB
                        </CLabel>
                      </CRow>
                      <CRow className="justify-content-start">
                        <CCol xs="12" sm="6" md="1">
                          <CFormGroup>
                            <CLabel for="validationCustom03"> </CLabel>
                            <br />
                            <CSwitch
                              className={"mx-1"}
                              variant={"3d"}
                              color={"success"}
                              id="in-IsActive"
                              // onChange={(e) => setNoVat(!noVat)}
                              onChange={onHandleChangeVat("checkBox")}
                              onBlur={sumtotalpriceVat}
                              checked={
                                newArr[indexFiles[0]].mpaymentVatRates.checkbox
                              }
                              // defaultChecked={false}
                              labelOn={"\u2713"}
                              labelOff={"\u2715"}
                            />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="3">
                          <CFormGroup>
                            <CLabel htmlFor="name">VAT</CLabel>
                            <Box
                              className="border-set"
                              component={Grid}
                              item
                              boxShadow={1}
                              xs={{
                                width: " 100%",
                              }}
                            >
                              <CInputGroup className="input-prepend">
                                <CSelect
                                  className="form-control"
                                  id="add-vat"
                                  disabled={
                                    !newArr[indexFiles[0]].mpaymentVatRates
                                      .checkbox
                                  }
                                  onChange={onHandleChangeVat("vat")}
                                  onBlur={setSumTotalPrice}
                                  value={
                                    newArr[indexFiles[0]].mpaymentVatRates.rate
                                  }
                                  // style={{ height: Constant.styleHeightField }}
                                  // onChange={handleChangSearch("Years")}
                                  required
                                >
                                  <option selected hidden value="">
                                    Please Select VAT
                                  </option>
                                  {cbVat.map((x) => (
                                    <option value={x.vatPrice}>
                                      {x.vatPrice}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                                <CInputGroupPrepend>
                                  <CInputGroupText>%</CInputGroupText>
                                </CInputGroupPrepend>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Base Amount</CLabel>
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
                                  // onChange={handleChangSearch("ContractNo")}
                                  value={baseAmountVat}
                                  onBlur={setSumTotalPrice}
                                  id="add-vat-baseAmount"
                                  placeholder=""
                                  maxLength="255"
                                  type="number"
                                  onChange={onHandleChangeVat("baseAmount")}
                                  // disabled
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">VAT Amount</CLabel>
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
                                  // onChange={handleChangSearch("ContractNo")}
                                  id="add-vat-vatAmount"
                                  placeholder=""
                                  maxLength="255"
                                  value={newArr[
                                    indexFiles[0]
                                  ].mpaymentVatRates.vatAmount.toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 2 }
                                  )}
                                  disabled
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CRow className="d-flex align-items-center">
                          <CCol>
                            <CLabel style={{ fontWeight: "bold" }}>THB</CLabel>
                          </CCol>
                        </CRow>
                      </CRow>
                      <CRow className="justify-content-start">
                        <CCol xs="12" sm="6" md="1">
                          <CFormGroup>
                            <CLabel for="validationCustom03"> </CLabel>
                            <br />
                            <CSwitch
                              className={"mx-1"}
                              variant={"3d"}
                              color={"success"}
                              id="in-IsActive"
                              onChange={onHandleChangeWhtRate("checkBox")}
                              onBlur={setSumWhtTotalPrice(0)}
                              checked={
                                newArr[indexFiles[0]].mpaymentWhtRates[0]
                                  .checkbox
                              }
                              labelOn={"\u2713"}
                              labelOff={"\u2715"}
                            />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="12" md="3">
                          <CFormGroup>
                            <CLabel htmlFor="name">WHT</CLabel>
                            <Box
                              className="border-set"
                              component={Grid}
                              item
                              boxShadow={1}
                              xs={{
                                width: " 100%",
                              }}
                            >
                              <CInputGroup className="input-prepend">
                                <CSelect
                                  className="form-control"
                                  id="search-header-year"
                                  disabled={
                                    !newArr[indexFiles[0]].mpaymentWhtRates[0]
                                      .checkbox
                                  }
                                  onBlur={setSumWhtTotalPrice(0)}
                                  onChange={onHandleChangeWhtRate("vat")}
                                  value={
                                    newArr[indexFiles[0]].mpaymentWhtRates[0]
                                      .rate
                                  }
                                  required
                                >
                                  <option selected hidden value="">
                                    Please Select WHT
                                  </option>
                                  {cbWhtRates.map((x) => (
                                    <option value={x.displayMember}>
                                      {x.displayMember}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                                <CInputGroupPrepend>
                                  <CInputGroupText>%</CInputGroupText>
                                </CInputGroupPrepend>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Base Amount</CLabel>
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
                                  onChange={onHandleChangeWhtRate("baseAmount")}
                                  id="wht-baseAmount"
                                  onBlur={setSumWhtTotalPrice(0)}
                                  value={baseAmount}
                                  type="number"
                                  step="0.001"
                                  min="0"
                                  onWheel={(e) => e.target.blur()}
                                  disabled={
                                    !newArr[indexFiles[0]].mpaymentWhtRates[0]
                                      .checkbox
                                  }
                                  maxLength="255"
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">WHT Amount</CLabel>
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
                                  onChange={onHandleChangeWhtRate("checkBox")}
                                  id="in-search-ContractNo"
                                  value={
                                    newArr[indexFiles[0]].mpaymentWhtRates[0]
                                      .vatAmount
                                  }
                                  disabled={
                                    !newArr[indexFiles[0]].mpaymentWhtRates[0]
                                      .checkbox
                                  }
                                  maxLength="255"
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CRow className="d-flex align-items-center">
                          <CCol>
                            <CLabel style={{ fontWeight: "bold" }}>THB</CLabel>
                          </CCol>
                        </CRow>
                      </CRow>
                      {whtBox2()}
                      {whtBox3()}
                    </CCardBody>
                  </Box>
                </CCollapse>
              </CForm>
            </CCard>
          </CForm>
        );
      }
    }
  };

  const whtBox2 = () => {
    if (invoiceItems[indexFiles[0]]) {
      var newArr = [...invoiceItems];
      var baseAmountVat = 0;
      if (newArr[indexFiles[0]].mpaymentVatRates.baseAmount) {
        baseAmountVat = newArr[indexFiles[0]].mpaymentVatRates.baseAmount;
      } else {
        baseAmountVat = newArr[indexFiles[0]].amount;
      }

      var baseAmount = 0;
      if (newArr[indexFiles[0]].mpaymentWhtRates[1].baseAmount) {
        baseAmount = newArr[indexFiles[0]].mpaymentWhtRates[1].baseAmount;
      } else {
        baseAmount = newArr[indexFiles[0]].amount;
      }
      var id = 1;
      return (
        <CRow className="justify-content-start">
          <CCol xs="12" sm="6" md="1">
            <CFormGroup>
              <CLabel for="validationCustom03"> </CLabel>
              <br />
              <CSwitch
                className={"mx-1"}
                variant={"3d"}
                color={"success"}
                id="in-IsActive"
                onChange={onHandleChangeWhtRateNew("checkBox", id)}
                onBlur={setSumWhtTotalPrice(1)}
                checked={newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox}
                labelOn={"\u2713"}
                labelOff={"\u2715"}
              />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="12" md="3">
            <CFormGroup>
              <CLabel htmlFor="name">WHT</CLabel>
              <Box
                className="border-set"
                component={Grid}
                item
                boxShadow={1}
                xs={{
                  width: " 100%",
                }}
              >
                <CInputGroup className="input-prepend">
                  <CSelect
                    className="form-control"
                    id="search-header-year"
                    value={newArr[indexFiles[0]].mpaymentWhtRates[id].rate}
                    disabled={
                      !newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox
                    }
                    onBlur={setSumWhtTotalPrice(1)}
                    onChange={onHandleChangeWhtRateNew("vat", id)}
                    required
                  >
                    <option selected hidden value="">
                      Please Select WHT
                    </option>
                    {cbWhtRates.map((x) => (
                      <option value={x.displayMember}>{x.displayMember}</option>
                    ))}
                  </CSelect>
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                  <CInputGroupPrepend>
                    <CInputGroupText>%</CInputGroupText>
                  </CInputGroupPrepend>
                </CInputGroup>
              </Box>
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Base Amount</CLabel>
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
                    onChange={onHandleChangeWhtRateNew("baseAmount", id)}
                    id="wht-baseAmount"
                    onBlur={setSumWhtTotalPrice(1)}
                    type="number"
                    step="0.001"
                    min="0"
                    value={baseAmount}
                    disabled={
                      !newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox
                    }
                    maxLength="255"
                  />
                </Box>
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">VAT Amount</CLabel>
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
                    onChange={onHandleChangeWhtRate("checkBox")}
                    id="in-search-ContractNo"
                    value={newArr[indexFiles[0]].mpaymentWhtRates[id].vatAmount}
                    disabled={
                      !newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox
                    }
                    maxLength="255"
                  />
                </Box>
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CFormGroup>
          </CCol>
          <CRow className="d-flex align-items-center">
            <CCol>
              <CLabel style={{ fontWeight: "bold" }}>THB</CLabel>
            </CCol>
          </CRow>
        </CRow>
      );
    }
  };

  const whtBox3 = () => {
    if (invoiceItems[indexFiles[0]]) {
      var newArr = [...invoiceItems];
      var baseAmountVat = 0;
      if (newArr[indexFiles[0]].mpaymentVatRates.baseAmount) {
        baseAmountVat = newArr[indexFiles[0]].mpaymentVatRates.baseAmount;
      } else {
        baseAmountVat = newArr[indexFiles[0]].amount;
      }

      var baseAmount = 0;
      if (newArr[indexFiles[0]].mpaymentWhtRates[2].baseAmount) {
        baseAmount = newArr[indexFiles[0]].mpaymentWhtRates[2].baseAmount;
      } else {
        baseAmount = newArr[indexFiles[0]].amount;
      }
      var id = 2;
      return (
        <CRow className="justify-content-start">
          <CCol xs="12" sm="6" md="1">
            <CFormGroup>
              <CLabel for="validationCustom03"> </CLabel>
              <br />
              <CSwitch
                className={"mx-1"}
                variant={"3d"}
                color={"success"}
                id="in-IsActive"
                onChange={onHandleChangeWhtRateNew("checkBox", id)}
                onBlur={setSumWhtTotalPrice(2)}
                // onBlur={reCalWht}
                checked={newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox}
                labelOn={"\u2713"}
                labelOff={"\u2715"}
              />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="12" md="3">
            <CFormGroup>
              <CLabel htmlFor="name">WHT</CLabel>
              <Box
                className="border-set"
                component={Grid}
                item
                boxShadow={1}
                xs={{
                  width: " 100%",
                }}
              >
                <CInputGroup className="input-prepend">
                  <CSelect
                    className="form-control"
                    id="search-header-year"
                    value={newArr[indexFiles[0]].mpaymentWhtRates[id].rate}
                    disabled={
                      !newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox
                    }
                    onBlur={setSumWhtTotalPrice(2)}
                    onChange={onHandleChangeWhtRateNew("vat", id)}
                    required
                  >
                    <option selected hidden value="">
                      Please Select WHT
                    </option>
                    {cbWhtRates.map((x) => (
                      <option value={x.displayMember}>{x.displayMember}</option>
                    ))}
                  </CSelect>
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                  <CInputGroupPrepend>
                    <CInputGroupText>%</CInputGroupText>
                  </CInputGroupPrepend>
                </CInputGroup>
              </Box>
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Base Amount</CLabel>
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
                    onChange={onHandleChangeWhtRateNew("baseAmount", id)}
                    id="wht-baseAmount"
                    onBlur={setSumWhtTotalPrice(2)}
                    type="number"
                    step="0.001"
                    min="0"
                    value={baseAmount}
                    disabled={
                      !newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox
                    }
                    maxLength="255"
                  />
                </Box>
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">VAT Amount</CLabel>
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
                    // onChange={onHandleChangeWhtRate("checkBox", id)}
                    id="in-search-ContractNo"
                    value={newArr[indexFiles[0]].mpaymentWhtRates[id].vatAmount}
                    disabled={
                      !newArr[indexFiles[0]].mpaymentWhtRates[id].checkbox
                    }
                    maxLength="255"
                  />
                </Box>
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CFormGroup>
          </CCol>
          <CRow className="d-flex align-items-center">
            <CCol>
              <CLabel style={{ fontWeight: "bold" }}>THB</CLabel>
            </CCol>
          </CRow>
        </CRow>
      );
    }
  };

  /**New Func */

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

  const setNoValidateForm = (formClassName) => {
    var forms = document.querySelectorAll(`.${formClassName}`);
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.classList.remove("was-validated");
    });
  };

  const setFormatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const setFormatCodeText = (txtCode, txtName) => `[${txtCode}] ${txtName}`;

  const setCollapsedFormTapOne = (index) => (e) => {
    var newArr = [...collsDialogTabOne];
    if (index === 1) {
      newArr[index - 1] = !newArr[index - 1];
    } else if (index === 2) {
      newArr[index - 1] = !newArr[index - 1];
    } else if (index === 3) {
      newArr[index - 1] = !newArr[index - 1];
    } else if (index === 4) {
      newArr[index - 1] = !newArr[index - 1];
    }
    setCollsDialogTabOne(newArr);
  };

  const setCollapsedFormTapTwo = (index) => (e) => {
    var newArr = [...collsDialogTabTwo];
    if (index === 1) {
      newArr[index - 1] = !newArr[index - 1];
    } else if (index === 2) {
      newArr[index - 1] = !newArr[index - 1];
    }
    setCollsDialogTabTwo(newArr);
  };

  const setFormRemarkShow = (index, label, condition, value) => {
    switch (condition) {
      case "Text":
        return formRemarkText(index, label, value);
      case "Number":
        return formRemarkNumber(index, label, value);
      case "Select":
        return formRemarkSelect(index, label, value);
      default:
        return (
          <CCol>
            <CRow>
              <CCol xs="12" sm="6" md="6"></CCol>
            </CRow>
          </CCol>
        );
    }
  };

  const setResetValueInputExtraCharge = (item, isOnChangeSelect = false) => {
    if (!isOnChangeSelect) {
      if (
        !item.isFixPrice &&
        document.getElementById("extc-input-price") != null
      ) {
        item.extraChargePrice = "";
        setExtraChargeNameObj(item);
      }
      if (item.isUseQty && document.getElementById("extc-input-qty") != null) {
        document.getElementById("extc-input-qty").value = "";
      }
      if (
        item.isRequstFile &&
        document.getElementById("extc-input-attackfile") != null
      ) {
        document.getElementById("extc-input-attackfile").value = "";
      }
    }
    if (document.getElementById("extc-remark-1") !== null) {
      if (
        item.requestDataType1 === "Text" ||
        item.requestDataType1 === "Number"
      ) {
        document.getElementById("extc-remark-1").value = "";
      } else if (item.requestDataType1 === "Select") {
        document.getElementById("extc-remark-1").selectedIndex = 0;
      }
    }
    if (document.getElementById("extc-remark-2") !== null) {
      if (
        item.requestDataType2 === "Text" ||
        item.requestDataType2 === "Number"
      ) {
        document.getElementById("extc-remark-2").value = "";
      } else if (item.requestDataType2 === "Select") {
        document.getElementById("extc-remark-2").selectedIndex = 0;
      }
    }
    if (document.getElementById("extc-remark-3") !== null) {
      if (
        item.requestDataType3 === "Text" ||
        item.requestDataType3 === "Number"
      ) {
        document.getElementById("extc-remark-3").value = "";
      } else if (item.requestDataType3 === "Select") {
        document.getElementById("extc-remark-3").selectedIndex = 0;
      }
    }
    if (document.getElementById("extc-remark-4") !== null) {
      if (
        item.requestDataType4 === "Text" ||
        item.requestDataType4 === "Number"
      ) {
        document.getElementById("extc-remark-4").value = "";
      } else if (item.requestDataType4 === "Select") {
        document.getElementById("extc-remark-4").selectedIndex = 0;
      }
    }
  };

  const setTextButtonDeleteExtc = (obj) => {
    if (obj.initialBy != "" || obj.approveBy != "" || obj.rejectBy != "") {
      return Constant.btCancel;
    } else {
      return Constant.btDeleteData;
    }
  };

  const setZeroTwoDigit = (value) => {
    var txtValue = "" + value + "";
    if (value / 10 < 1) {
      txtValue = "0" + value;
    }
    return txtValue;
  };

  const setClearVariableController = () => {
    VariableController.linkShipmentNo = null;
    VariableController.linkContractId = null;
    VariableController.linkDeliveryNo = null;
  };

  const setItemChangeStatus = (item, index) => (e) => {
    //console.log(11111);
    // var newObj = { ...selectItems };
    var newMain = [...baseItems];

    // newObj[index].isChecked = e.target.checked;
    newMain[index].isChecked = e.target.checked;

    setBaseItems(newMain);
    // setSelectitems(newObj);
  };

  const setShowFileImage = (file) => {
    setIsShowImage(!isShowImage);
    const url = window.URL.createObjectURL(file);
    var image = document.getElementById("extc-image");
    image.src = url;
  };

  const setDownloadFile = (file, name, type) => {
    const url = window.URL.createObjectURL(file);
    const image = document.createElement("a");
    image.style.display = "none";
    image.href = url;
    image.download = name + "." + type;
    document.body.appendChild(image);
    image.click();
    document.body.removeChild(image);
    window.URL.revokeObjectURL(url);
  };

  const setClearDetailData = () => {
    setDialogValue(0);
    setItems({});
    setDeliveryItemList([]);
    setTotalQtyDeliveryList(0.0);
    setTransportRateList([]);
    setTotalPriceTransportRate(0.0);
    setExtraChargeList([]);
    setExtraChargeNameList([]);
    setExtraChargeNameObj({});
    setExtcDeleteObj({});
  };

  const handleChangeTabIndex = (index) => {
    setTabValue(index);
  };

  const handleChangeDialogIndex = (index) => {
    setDialogValue(index);
  };

  const handleChangeSelectCreatePayment = (type) => (e, values) => {
    var newArr = [...selectItemsCreatePayment];
    setInvalidMaterialFormCreatePay([false]);
    // //console.log(values);
    if (type === "transporter") {
      if (getHasObjectValue(values)) {
        newArr[0] = values;
      } else {
        newArr[0] = {};
      }
    }
    // //console.log(newArr);

    setSelectItemsCreatePayment(newArr);
  };

  const handleChangeSelectSearch = (type) => (e, values) => {
    var newArr = [...selectItemsSearch];
    if (type === "source") {
      if (getHasObjectValue(values)) {
        newArr[0] = values;
      } else {
        newArr[0] = {};
      }
    } else if (type === "transporter") {
      if (getHasObjectValue(values)) {
        newArr[1] = values;
        //console.log(values);
        if (values.icflag === "X") {
          setServiceTeamItems("03");
        } else {
          setServiceTeamItems("01");
        }
      } else {
        newArr[1] = {};
      }
    } else if (type === "trucktype") {
      if (getHasObjectValue(values)) {
        newArr[2] = values;
      } else {
        newArr[2] = {};
      }
    } else if (type === "paymentstatus") {
      if (getHasObjectValue(values)) {
        newArr[3] = values;
      } else {
        newArr[3] = {};
      }
    } else if (type === "company") {
      // console.log(values);
      if (values.length) {
        newArr[4] = values;
      } else {
        newArr[4] = [];
      }
    } else if (type === "LocSiteSource") {
      // console.log(values);
      if (values.length) {
        newArr[5] = values;
      } else {
        newArr[5] = [];
      }
    } else if (type === "LocSiteDest") {
      // console.log(values);
      if (values.length) {
        newArr[6] = values;
      } else {
        newArr[6] = [];
      }
    }
    setSelectItemsSearch(newArr);
  };

  const handleChangeExtraChargeType = (e) => {
    var newObj = { ...items };
    var transportType = newObj.transportType;
    var extraChargeTypeId = parseInt(e.target.value);
    var newArr = [transportType, extraChargeTypeId];
    setExtraChargeNameList([]);
    fnGetMasterExtraChargeList(newArr);
  };

  const handleChangeExtraChargePrice = (e) => {
    var newObj = { ...extraChargeNameObj };
    if (e.target.value !== "") {
      if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
        e.target.value = e.target.value.substring(1);
      }
      newObj.extraChargePrice = parseFloat(e.target.value);
    } else {
      newObj.extraChargePrice = 0;
    }
    setExtraChargeNameObj(newObj);
  };

  const handleChangeExtraChargeName = (e, values) => {
    setNoValidateForm("need-validation-extracharge");
    if (values) {
      var newObj = { ...values };
      setExtraChargeNameObj(newObj);
      setResetValueInputExtraCharge(newObj, true);
    } else {
      setExtraChargeNameObj({});
    }
  };

  const handleChangeEditStatus = (e, values) => {
    if (values) {
      var newObj = { ...values };
      setSelectItemsEdit(newObj);
    } else {
      setSelectItemsEdit({});
    }
  };

  const handleChangeAddCCAndReviewer = (type) => (e, values) => {
    //console.log(values);
    if (values) {
      if (type === "reviewer") {
        var newArr = [];
        var obj = {
          type: null,
          userName: null,
          ordinal: null,
          firstName: null,
          lastName: null,
          aliasName: null,
        };
        if (userReviewerListItems.length) {
          newArr = [...userReviewerListItems];
        }

        obj.type = values.userPaymentTypeId;
        obj.userName = values.userName;
        obj.ordinal = userReviewerListItems.length + 1;
        obj.firstName = "[" + values.userName + "]" + "" + values.aliasName;
        obj.lastName = values.lastName;
        obj.aliasName = values.aliasName;

        newArr.push(obj);

        setUserReviewerListItems(newArr);
      }

      if (type === "cc") {
        var newArr = [];
        var obj = {
          type: null,
          userName: null,
          ordinal: null,
          firstName: null,
          lastName: null,
          aliasName: null,
        };
        if (userCCListItems.length) {
          newArr = [...userCCListItems];
        }

        obj.type = values.userPaymentTypeId;
        obj.userName = values.userName;
        obj.ordinal = userCCListItems.length + 1;
        obj.firstName = "[" + values.userName + "]" + "" + values.aliasName;
        obj.lastName = values.lastName;
        obj.aliasName = values.aliasName;

        newArr.push(obj);

        setUserCCListItems(newArr);
      }

      if (type === "approve") {
        var newArr = [];
        var obj = {
          type: null,
          userName: null,
          ordinal: null,
          firstName: null,
          lastName: null,
          aliasName: null,
        };

        obj.type = values.userPaymentTypeId;
        obj.userName = values.userName;
        obj.ordinal = 1;
        obj.firstName = "[" + values.userName + "]" + "" + values.aliasName;
        obj.lastName = values.lastName;
        obj.aliasName = values.aliasName;

        newArr.push(obj);

        setUserApproveListItems(newArr);
        //console.log(newArr);
      }
    }
  };

  const handleChangeMonthYear = (e) => {
    setNoValidateForm("search-startend-need-validation");
    if (e.target.value != "") {
      setStartDate("");
      setEndDate("");
    } else {
      fnGetStartEndDate();
    }
  };

  const onClickChangeTab = (e, values) => {
    setTabValue(values);
  };

  const onClickChangeDialogPage = (e, values) => {
    setDialogValue(values);
    if (values === 1 && !extraChargeList.length) {
      var newObj = { ...items };
      fnGetExtraChargeDataList(newObj.shipmentNo, false, true);
    } else if (values === 0 && isOnchangeExtraCharge) {
      var newObj = { ...items };
      setIsOnchangeExtraCharge(false);

      fnGetDataListById([newObj.shipmentNo, newObj.deliveryNo]);
    }
  };

  const onClickOpenDialog =
    (index = []) =>
    (e) => {
      fnGetDataListById(index);
      setisShowDialogEdit(true);
    };

  const onClickCloseDialog = () => {
    setClearVariableController();
    setClearDetailData();
    setisShowDialogEdit(false);
  };

  const onClickCheckSearchData = () => {
    var newArr = [...selectItemsSearch];
    //console.log(newArr);
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var monthyear = "";
    var isPass = false;

    if (dateStart === "" && dateEnd === "" && monthyear === "") {
      setInvalidFormSearch([true, true, true]);
    } else if (dateStart !== "" && dateEnd === "" && monthyear === "") {
      setInvalidFormSearch([false, true, false]);
    } else if (dateStart === "" && dateEnd !== "" && monthyear === "") {
      setInvalidFormSearch([true, false, false]);
    } else if (dateStart === "" && dateEnd === "" && monthyear !== "") {
      setInvalidFormSearch([false, false, false]);
      isPass = true;
    } else if (dateStart !== "" && dateEnd !== "" && monthyear === "") {
      setInvalidFormSearch([false, false, false]);
      isPass = true;
    } else if (dateStart !== "" && dateEnd !== "" && monthyear !== "") {
      setIsShowWarningSearch(!isShowWarningSearch);
    }
    if (
      (Object.keys(newArr[1]).length && newArr[4].length) ||
      roleUser == trstCode
    ) {
      setInvalidMaterialFormSearch([false, false]);
      if (isPass) {
        setCollsFormSearch(false);
        onClickSearchData();
      } else {
        setBaseItems([]);
      }
    } else {
      setInvalidMaterialFormSearch([true, true]);
      setBaseItems([]);
    }
  };

  const onClickClearData = () => {
    document.getElementById("search-datestart").value = "";
    document.getElementById("search-dateend").value = "";
    document.getElementById("search-monthyear").value = "";
    document.getElementById("search-shipmentno").value = "";
    document.getElementById("search-siteSource").value = "";
    document.getElementById("search-siteDest").value = "";
    document.getElementById("search-tonoSource").value = "";
    document.getElementById("search-tonoDest").value = "";
    document.getElementById("search-shipmenttype").selectedIndex = 0;
    document.getElementById("search-edpstatus").selectedIndex = 0;
    document.getElementById("search-summarystatus").selectedIndex = 0;
    document.getElementById("in-search-transferTypeId").selectedIndex = 0;
    document.getElementById("search-weightDocNo").value = "";
  };

  const onClickSearchData = () => {
    var arrSelect = [...selectItemsSearch];
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var monthyear = null;
    var shipmentNo = document.getElementById("search-shipmentno").value;
    var weightDocNo = document.getElementById("search-weightDocNo").value;
    var saleOrderNo = "";
    var sourceId = null;
    var transporterId = getHasObjectValue(arrSelect[1])
      ? arrSelect[1].transporterId
      : null;
    var shippingid = null;
    var exportModeId = null;
    var truckTypeId = getHasObjectValue(arrSelect[3])
      ? arrSelect[3].truckTypeId
      : null;
    var edpStatus = "";
    var shipmentStatus = document.getElementById("search-shipmentstatus").value;
    var transferType = document.getElementById(
      "in-search-transferTypeId"
    ).value;
    var paymentStatus = getHasObjectValue(arrSelect[3])
      ? arrSelect[3].displayMember
      : null;
    var tonoSource = document.getElementById("search-tonoSource").value;
    var tonoDest = document.getElementById("search-tonoDest").value;
    var companyIdList = arrSelect[4].length ? arrSelect[4] : null;
    if (companyIdList.length) {
      var newArr = [];
      companyIdList.map((x) => {
        newArr.push(x.companyId);
      });
      companyIdList = newArr;
    }
    var summaryStatus = null;
    var siteCodeSource = arrSelect[5].length ? arrSelect[5] : null;
    var siteCodeDest = arrSelect[6].length ? arrSelect[6] : null;
    var shipmentType = document.getElementById("search-shipmenttype").value;

    dateStart = dateStart !== "" ? dateStart : null;
    dateEnd = dateEnd !== "" ? dateEnd : null;
    monthyear = monthyear !== "" ? monthyear : null;
    shipmentNo = shipmentNo !== "" ? shipmentNo : null;
    weightDocNo = weightDocNo !== "" ? weightDocNo : null;
    saleOrderNo = saleOrderNo !== "" ? saleOrderNo : null;
    exportModeId = !isNaN(exportModeId) ? exportModeId : null;
    edpStatus = edpStatus !== "" ? edpStatus : null;
    shipmentStatus = shipmentStatus !== "" ? shipmentStatus : null;
    summaryStatus = !isNaN(summaryStatus) ? summaryStatus : null;
    transferType = transferType !== "" ? transferType : null;
    siteCodeSource = siteCodeSource !== "" ? siteCodeSource : null;
    siteCodeDest = siteCodeDest !== "" ? siteCodeDest : null;
    tonoSource = tonoSource !== "" ? tonoSource : null;
    tonoDest = tonoDest !== "" ? tonoDest : null;
    shipmentType = shipmentType !== "" ? shipmentType : null;

    var newArr = [
      dateStart,
      dateEnd,
      monthyear,
      shipmentNo,
      weightDocNo,
      saleOrderNo,
      sourceId,
      transporterId,
      shippingid,
      truckTypeId,
      edpStatus,
      shipmentStatus,
      paymentStatus,
      shipmentType,
      exportModeId,
      companyIdList,
      transferType,
      siteCodeSource,
      siteCodeDest,
      tonoSource,
      tonoDest,
    ];
    // console.log(newArr);
    fnGetDataList(newArr);
  };

  const onClickChangeStatusList = () => {
    setIsConfirmChangeStatus(!isConfirmChangeStatus);
    var arrChangeStatus = [...changeStatusList];
    var arrStatus = [];
    if (roleUser === empCode) {
      if (arrChangeStatus.length) {
        arrChangeStatus.map((x) => {
          var newObj = { shipmentNo: null };
          newObj.shipmentNo = x.shipmentNo;
          arrStatus.push(newObj);
        });
      }
    } else if (roleUser === trstCode) {
      if (arrChangeStatus.length) {
        arrChangeStatus.map((x) => {
          var newObj = { shipmentNo: null, remark: null };
          var remarkValue = document.getElementById(
            "remark-" + x.shipmentNo + "-" + x.deliveryNo
          ).value;
          newObj.shipmentNo = x.shipmentNo;
          if (remarkValue !== "") {
            newObj.remark = remarkValue;
          } else {
            newObj.remark = null;
          }
          arrStatus.push(newObj);
        });
      }
    }
    var updateBy = _UserId;
    var newArr = [arrStatus, updateBy];
    fnUpdateShipmentStatusList(newArr);
  };

  const onClickConfirmViewContract = () => {
    var newObj = { ...items };
    if (newObj.contractId !== null) {
      setIsConfirmViewContract(!isConfirmViewContract);
      VariableController.linkContractId = newObj.contractId;
      VariableController.linkShipmentNo = newObj.shipmentNo;
      VariableController.linkDeliveryNo = newObj.deliveryNo;
    } else {
      setIsShowErrorViewContract(!isShowErrorViewContract);
    }
  };

  const onClickCancelViewContract = () => {
    setIsConfirmViewContract(!isConfirmViewContract);
    VariableController.linkContractId = null;
  };

  const onClickCheckAddMultiDrop = () => {
    if (getIsValidForm("need-validation-multidrop")) {
      setIsConfirmSave(!isConfirmSave);
      setTextTypeInsert("MultiDrop");
    }
  };

  const onClickCheckAddExtraCharge = () => {
    if (getIsValidForm("need-validation-extracharge")) {
      setIsConfirmSave(!isConfirmSave);
      setTextTypeInsert("ExtraCharge");
    }
  };

  const onClickCheckEditData = () => {
    if (getIsValidForm("need-validation-shipmentstatus")) {
      setIsConfirmEdit(!isConfirmEdit);
    }
  };

  const onClickReCalTransport = () => {
    setIsConfirmReCal(!isConfirmReCal);
    var newObj = { ...items };
    var shipmentNo = newObj.shipmentNo;
    var createBy = _UserId;

    var newArr = [shipmentNo, createBy];

    // //console.log(newArr);
    fnGetReCalTransportRate(newArr);
  };

  const onClickGetSelectData = () => {
    var newSelect = selectItems.filter((x) => x.isChecked !== false);

    // //console.log(newSelect);
  };

  const onClickAddExtraCharge = () => {
    setIsConfirmSave(!isConfirmSave);
    var shipmentObj = { ...items };
    var shipmentNo = shipmentObj.shipmentNo;
    var newObj = { ...extraChargeNameObj };
    var extraChargeId = newObj.extraChargeId;
    var transporterTypeId = newObj.transporterTypeId;
    var extraChargeTypeId = newObj.extraChargeTypeId;
    var extraChargeName = newObj.extraChargeName;
    var extraChargePrice = newObj.extraChargePrice;
    var vatCode = newObj.vatCode;
    var vatPrice = newObj.vatPrice;

    var extraChargeQTY = null;
    if (newObj.isUseQty) {
      extraChargeQTY = parseInt(
        document.getElementById("extc-input-qty").value
      );
    }

    var requestFile = null;
    var fileType = null;
    if (newObj.isRequstFile) {
      requestFile = document.getElementById("extc-input-attackfile").files[0];
      var fileName = requestFile.name;
      var arrFileName = fileName.split(".");
      fileType = arrFileName[arrFileName.length - 1];
    }

    var requestName1 = null;
    var requestValue1 = null;
    if (newObj.requestDataType1 !== null) {
      requestName1 = newObj.requestName1;
      requestValue1 = document.getElementById("extc-remark-1").value;
    }

    var requestName2 = null;
    var requestValue2 = null;
    if (newObj.requestDataType2 !== null) {
      requestName2 = newObj.requestName2;
      requestValue2 = document.getElementById("extc-remark-2").value;
    }

    var requestName3 = null;
    var requestValue3 = null;
    if (newObj.requestDataType3 !== null) {
      requestName3 = newObj.requestName3;
      requestValue3 = document.getElementById("extc-remark-3").value;
    }

    var requestName4 = null;
    var requestValue4 = null;
    if (newObj.requestDataType4 !== null) {
      requestName4 = newObj.requestName4;
      requestValue4 = document.getElementById("extc-remark-4").value;
    }

    var createBy = _UserId;

    var newArr = [
      shipmentNo,
      extraChargeId,
      transporterTypeId,
      extraChargeTypeId,
      extraChargeName,
      extraChargePrice,
      extraChargeQTY,
      requestFile,
      fileType,
      requestName1,
      requestValue1,
      requestName2,
      requestValue2,
      requestName3,
      requestValue3,
      requestName4,
      requestValue4,
      createBy,
      vatCode,
      vatPrice,
    ];

    // //console.log(newArr);
    fnInsertExtraChargeData(newArr);
  };

  const onClickAddExtraChargeMultiDrop = () => {
    setIsConfirmSave(!isConfirmSave);
    var shipmentObj = { ...items };
    var shipmentNo = shipmentObj.shipmentNo;
    var multiDropDistance = parseFloat(
      document.getElementById("multidrop-input-droprange").value
    );
    var file = document.getElementById("multidrop-input-attackfile").files[0];
    var fileName = file.name;
    var arrFileName = fileName.split(".");
    var fileType = arrFileName[arrFileName.length - 1];
    var createBy = _UserId;

    var newArr = [shipmentNo, multiDropDistance, file, fileType, createBy];
    // //console.log(newArr);
    fnInsertExtraChargeMultiDropData(newArr);
  };

  const onClickSetItemDelete = (obj) => {
    setIsConfirmDelete(!isConfirmDelete);
    setTextConfirmDelete(setTextButtonDeleteExtc(obj));
    setExtcDeleteObj(obj);
  };

  const onClickDeleteExtraChrge = () => {
    setIsConfirmDelete(!isConfirmDelete);
    var newObj = { ...extcDeleteObj };
    var newArr = [newObj.shipmentNo, newObj.runningNo];
    fnDeleteExtraChargeData(newArr);
  };

  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var shipmentObj = { ...items };
    var shipmentNo = shipmentObj.shipmentNo;
    var shipmentStatus = document.getElementById("edit-shipmentstatus").value;
    var edpStatus = document.getElementById("edit-edpstatus").value;
    var selectObj = { ...selectItemsEdit };
    var paymentStatus = selectObj.displayMember;
    var updateBy = _UserId;

    var newArr = [
      shipmentNo,
      shipmentStatus,
      edpStatus,
      paymentStatus,
      updateBy,
    ];

    // //console.log(newArr);
    fnUpdateDataList(newArr);
  };

  const fnGetCbTransferType = () => {
    // console.log('88888');
    Repository.fetchCbTransferType().then(
      (result) => {
        // setIsLoaded(true);
        if (result.httpCode === "200") {
          setTransferType(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        // console.log(error);
        // setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetDataList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetCreateTransferListForCreatePayment(arrData).then(
      (result) => {
        setIsPostingData(false);
        // //console.log()
        if (result.httpCode === "200") {
          // //console.log(result.data);
          setSummaryItems(
            FunctionController.setCurrencyValueInArray(
              fieldSummary,
              result.data.summaryList
            )
          );

          // result.data.vtdomshipmentList.map((x) => {
          //   x.selectItems = true;
          //   if (x.creditDebitStatus === "In Progress") {
          //     x.selectItems = false;
          //   }
          // });

          setBaseItems(
            FunctionController.setEmptyValueInArray(
              result.data.vttransferShipmentList
            )
          );

          //console.log(result.data.vtdomshipmentList);

          var arrData = [...result.data.vttransferShipmentList];

          var newArr = [];
          arrData.map((x) => {
            // x.selectItems = true;
            // if (
            //   x.edpstatus === "Mismatch" ||
            //   x.creditDebitStatus === "In Progress" ||
            //   x.shipmentStatus === "Open"
            // ) {
            //   x.selectItems = false;
            // }

            if (roleUser === empCode) {
              if (x.docStatus === "Reject") {
                if (newArr.length) {
                  var result = newArr.find(
                    (y) => y.shipmentNo === x.shipmentNo
                  );
                  if (!result) {
                    var newObj = { shipmentNo: null, weightDocNo: null };
                    newObj.shipmentNo = x.shipmentNo;
                    newObj.weightDocNo = x.weightDocNo;
                    newArr.push(newObj);
                  }
                } else {
                  var newObj = { shipmentNo: null, weightDocNo: null };
                  newObj.shipmentNo = x.shipmentNo;
                  newObj.weightDocNo = x.weightDocNo;
                  newArr.push(newObj);
                }
              }
            } else if (roleUser === trstCode) {
              if (x.docStatus === "Open" || x.docStatus === "Reopen") {
                if (newArr.length) {
                  var result = newArr.find(
                    (y) => y.shipmentNo === x.shipmentNo
                  );
                  if (!result) {
                    var newObj = { shipmentNo: null, weightDocNo: null };
                    newObj.shipmentNo = x.shipmentNo;
                    newObj.weightDocNo = x.weightDocNo;
                    newArr.push(newObj);
                  }
                } else {
                  var newObj = { shipmentNo: null, weightDocNo: null };
                  newObj.shipmentNo = x.shipmentNo;
                  newObj.weightDocNo = x.weightDocNo;
                  newArr.push(newObj);
                }
              }
            }
          });
          setSelectitems(arrData);

          setReadyChangeStatusList(newArr);
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

  const fnUpdateShipmentStatusList = (arrData = []) => {
    setIsPostingData(true);
    if (roleUser === empCode) {
      Repository.fetchReopenShipmentStatusList(arrData).then(
        (result) => {
          setIsPostingData(false);
          if (result.httpCode === "200") {
            fnSetValueinHistoryLog(arrData);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setIsPostingData(false);
          setErrorAPI(error);
        }
      );
    } else if (roleUser === trstCode) {
      Repository.fetchRejectShipmentStatusList(arrData).then(
        (result) => {
          setIsPostingData(false);
          if (result.httpCode === "200") {
            fnSetValueinHistoryLog(arrData);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setIsPostingData(false);
          setErrorAPI(error);
        }
      );
    }
  };

  const fnSetValueinHistoryLog = (arrData = []) => {
    var newArr = [...arrData[0]];
    //console.log(newArr);
    var newData = [];
    newArr.map((x) => {
      var newObj = {
        ShipmentNo: null,
        ExtraChargeDocNo: null,
        Description: null,
        CreateByName: null,
        CreateBy: null,
      };
      newObj.ShipmentNo = x.shipmentNo;
      if (roleUser === empCode) {
        newObj.Description = Constant.apiHisLogReOpenDelivery;
      } else if (roleUser === trstCode) {
        newObj.Description = Constant.apiHisLogRejectDelivery + x.remark;
      }
      newObj.CreateByName = _Username;
      newObj.CreateBy = _UserId;
      newData.push(newObj);
    });
    fnInsertHistoryLogList(newData);
  };

  const fnInsertHistoryLogList = (arrData = []) => {
    Repository.fetchInsertHistoryLog(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          window.location.reload(false);
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

  const fnGetDataListById = (arrData = []) => {
    setIsLoadingData(true);
    Repository.fetchGetTransferListById(arrData).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setItems(result.data.headerList);
          setDeliveryItemList(
            FunctionController.setEmptyValueInArray(
              result.data.deliveryItemList
            )
          );
          setTotalQtyDeliveryList(result.data.totalQtyDeliveryList);
          setTransportRateList(
            FunctionController.setEmptyValueInArray(
              result.data.transportRateList
            )
          );
          setTotalPriceTransportRate(result.data.totalPriceTransportRate);
          setPaymentStatusList(result.data.paymentStatusList);
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetReCalTransportRate = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetReCalculateTransferTransportRate(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setTransportRateList(
            FunctionController.setEmptyValueInArray(
              result.data.saleOrderPriceList
            )
          );
          setTotalPriceTransportRate(
            FunctionController.setCurrencyValue(
              result.data.totalTransportPrice,
              2
            )
          );
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

  const fnUpdateDataList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchEditDeliveryStatusList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          window.location.reload(false);
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

  const fnGetMasterExtraChargeList = (arrData = []) => {
    Repository.fetchGetMasterExtraChargeListByGroupType(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          var filterData = result.data.filter((x) => x.extraChargeCode.includes('TransferTMP'))
          setExtraChargeNameList(filterData);
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setErrorAPI(error);
      }
    );
  };

  const fnGetSourceNameOnlyList = () => {
    if (!sourceList.length) {
      Repository.fetchGetSourceNameOnlyList().then(
        (result) => {
          if (result.httpCode === "200") {
            setSourceList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnGetTransporterNameOnlyList = () => {
    if (!transporterList.length) {
      Repository.fetchTransporterListForCreate().then(
        (result) => {
          if (result.httpCode === "200") {
            // //console.log(result.data);
            setTransporterList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnGetShipmentTypeNameOnlyList = () => {
    if (!shipmentTypeList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("ShipmentType").then(
        (result) => {
          if (result.httpCode === "200") {
            var filterData = result.data.filter(
              (x) => x.displayMember !== "EPZ"
            );
            setShipmentTypeList(filterData);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnCreatePayment = (newArrHeader, newArrFileList, shipmentIOList) => {
    setIsPostingData(true);
    setIsConfirmSave(!isConfirmSave);
    Repository.fetchTransferCreatePayment(
      newArrHeader,
      newArrFileList,
      shipmentIOList
    ).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          // window.location.reload(false);
          // var newDoc = { ...createDoc };

          setAllPayNo(result.data);
          const toDay = new Date();

          var subject = document.getElementById("create-payment-subject").value;
          // const toDay = new Date();
          var newDoc = {
            createDate: toDay,
            toName: "",
            fromName: _aliasName,
            subject: subject,
            transporterName: selectItemsCreatePayment[0].transporterNameThai,
            smpNo: "",
            companyName: companyList[0].companyName,
            sumQty: 0,
            sumSaleOrder: 0,
            sumShipment: 0,
            sumDelivery: 0,
            sumAmount: 0,
          };

          var newDeliveryList = [];
          var newShipmentList = [];
          var newSaleOrderList = [];

          var newBaseItem = baseItems.filter((x) => x.isChecked === true);

          console.log(newBaseItem);
          var _sumQty = 0;

          newBaseItem.map((x) => {
            _sumQty += x.qty;
            newDeliveryList.push(x.deliveryNo);

            newShipmentList.push(x.shipmentNo);
            newSaleOrderList.push(x.saleOrderNo);
          });

          var countDelivery = [...new Set(newDeliveryList)].length;
          var countShipment = [...new Set(newShipmentList)].length;
          var countSaleOrder = [...new Set(newSaleOrderList)].length;

          console.log("countDelivery", countDelivery);
          console.log("countShipment", countShipment);
          console.log("countSaleOrder", countSaleOrder);

          newDoc.sumQty = _sumQty;
          newDoc.sumSaleOrder = countSaleOrder;
          newDoc.sumShipment = countShipment;
          newDoc.sumDelivery = countDelivery;
          newDoc.sumAmount = totalAmount;
          newDoc.smpNo = result.data;

          var commituser = [
            ...userApproveListItems,
            ...userReviewerListItems,
            ...userCCListItems,
          ];

          commituser.map((x) => {
            var tpaymentReviewerAndCcsSub = {
              type: null,
              userName: null,
              ordinal: null,
            };

            if (x.type === 1) {
              console.log(x);
              newDoc.toName = x.aliasName;
            }
          });

          FunctionController.convertPDFToFile(newDoc, "Cover Sheet" , false).then(
            (result) => {
              fnCreateDoc(result, newDoc.smpNo, "Cover Sheet.pdf");
            }
          );

          console.log(newDoc);
          console.log(result.data);
        } else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnCreateDoc = (arr, smpNo, name) => {
    setIsPostingData(true);
    setIsConfirmSave(!isConfirmSave);
    Repository.fetchCreateDoc(arr, smpNo, name).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          // window.location.reload(false);
          // setAllPayNo(result.data);
          setIsAllPayNo(!isAllPayNo);
        } else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetTruckTypeNameOnlyList = () => {
    if (!truckTypeList.length) {
      Repository.fetchGetTruckTypeNameOnlyList().then(
        (result) => {
          if (result.httpCode === "200") {
            setTruckTypeList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnGetExtraChargeTypeNameOnlyList = () => {
    if (!extraChargeTypeList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("ExtraChargeType").then(
        (result) => {
          if (result.httpCode === "200") {
            setExtraChargeTypeList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnGetEDPStatusNameOnlyList = () => {
    if (!edpStatusList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("EDPStatus").then(
        (result) => {
          if (result.httpCode === "200") {
            setEDPStatusList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnGetPaymentStatusNameOnlyList = () => {
    if (!paymentStatusList.length || paymentStatusList.length <= 1) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("PaymentStatus").then(
        (result) => {
          if (result.httpCode === "200") {
            setPaymentStatusList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnGetShipmentStatusNameOnlyList = () => {
    if (!shipmentStatusList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("ShipmentStatus").then(
        (result) => {
          if (result.httpCode === "200") {
            setShipmentStatusList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnGetSummaryStatusNameOnlyList = () => {
    if (!summaryStatusList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo(
        "DeliverySummaryStatus"
      ).then(
        (result) => {
          if (result.httpCode === "200") {
            setSummaryStatusList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnInsertExtraChargeData = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchAddTransferShipmentExtraChargeList(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          var newObj = { ...items };
          setIsOnchangeExtraCharge(true);
          fnGetExtraChargeDataList(newObj.shipmentNo, true);
        } else {
          setIsPostingData(false);
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnInsertExtraChargeMultiDropData = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchAddShipmentExtraChargeMultiDrop(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          var newObj = { ...items };
          setIsOnchangeExtraCharge(true);
          fnGetExtraChargeDataList(newObj.shipmentNo);
        } else {
          setIsPostingData(false);
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnDeleteExtraChargeData = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchRemoveShipmentExtraChargeList(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          var newObj = { ...items };
          setIsOnchangeExtraCharge(true);
          fnGetExtraChargeDataList(newObj.shipmentNo);
        } else {
          setIsPostingData(false);
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetExtraChargeDataList = (
    index,
    isClickAddExtC = false,
    isClickTab = false
  ) => {
    if (isClickTab) {
      setIsLoadingData(true);
    }
    Repository.fetchGetShipmentExtraChargeListById(index).then(
      (result) => {
        if (isClickTab) {
          setIsLoadingData(false);
        } else {
          setIsPostingData(false);
        }
        if (result.httpCode === "200") {
          if (isClickAddExtC) {
            var newObj = { ...extraChargeNameObj };
            setResetValueInputExtraCharge(newObj);
            setNoValidateForm("need-validation-extracharge");
          }
          setExtraChargeList(
            FunctionController.setEmptyValueInArray(result.data)
          );
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        if (isClickTab) {
          setIsLoadingData(false);
        } else {
          setIsPostingData(false);
        }
        setErrorAPI(error);
      }
    );
  };

  const fnDownloadFile = (streamFile, fileType, typeName) => {
    setIsPostingData(true);
    Repository.fetchDownloadFile(streamFile).then(
      (result) => {
        setIsPostingData(false);
        if (result.status === 200) {
          result.blob().then((blob) => {
            if (typeName === "image") {
              setShowFileImage(blob);
            } else if (typeName === "file") {
              setDownloadFile(blob, streamFile, fileType);
            }
          });
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

  const GetUserApproveList = () => {
    if (!userApproveList.length) {
      Repository.fetchGetPaymentUserListByUserType(
        totalAmount,
        "Approver"
      ).then(
        (result) => {
          if (result.httpCode === "200") {
            setUserApproveList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const GetUserCCList = () => {
    if (!userCCList.length) {
      Repository.fetchGetPaymentUserListByUserType(null, "CC").then(
        (result) => {
          if (result.httpCode === "200") {
            setUserCCList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const GetUserReviewerList = () => {
    if (!userReviewerList.length) {
      Repository.fetchGetPaymentUserListByUserType(null, "Reviewer").then(
        (result) => {
          if (result.httpCode === "200") {
            setUserReviewerList(result.data);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setErrorAPI(error);
        }
      );
    }
  };

  const fnCheckUserAuth = () => {
    var result = FunctionController.getUserAuthenTwoRole(trstCode, empCode);
    if (result.isAuth) {
      setRoleUser(result.roleCode);
      initeState();
    } else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  const initeState = () => {
    if (
      VariableController.linkShipmentNo !== null 
    ) {
      setIsLoaded(true);
      var newArr = [
        VariableController.linkShipmentNo,
        VariableController.linkDeliveryNo,
      ];

      fnGetDataListById(newArr);
      setisShowDialogEdit(true);
    } else {
      fnGetStartEndDate();
    }
  };

  const fnGetShipmentDataForPayment = (arrData = []) => {
    setIsPostingData(true);

    Repository.fetchGetTransferShipmentDataForPayment(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          //console.log(result.data);

          setShipmentData(
            FunctionController.setEmptyValueInArray(result.data.shipmentList)
          );
          setExtraChargeData(
            FunctionController.setEmptyValueInArray(result.data.extraChargeList)
          );
          if (result.data.extraChargeList) {
            setIsIoNo(true);
          } else {
            setIsIoNo(false);
          }
          setAmount(result.data.amount);
          setVatAmount(result.data.vatAmount);
          setTotalAmount(result.data.totalAmount);
          console.log("setAmount", result.data.amount);
          console.log("setVatAmount", result.data.vatAmount);
          console.log("setTotalAmount", result.data.totalAmount);
        } else {
          setIsPostingData(false);
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetStartEndDate = () => {
    Repository.fetchGetAutoStartEndDateTime().then(
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

  /**Create Payment */

  const fnGetCbGrApprove = () => {
    Repository.fetchCbGrApproveList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setGrApproveType(result.data);
          // //console.log(result.data);
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

  const fnGetCbPaymentType = () => {
    Repository.fetchCbPaymentTypeList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbPaymentType(result.data);
          // //console.log(result.data);
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

  const fnGetCbCurrencyType = () => {
    Repository.fetchCbAll("CurrencyType").then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbCurrencyType(result.data);
          // //console.log(result.data);
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

  const fnGetCbLocationCode = () => {
    Repository.fetchCbAll("LocationCode").then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbLocationCode(result.data);
          // //console.log(result.data);
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

  const fnGetCbServiceTeam = () => {
    Repository.fetchCbAll("ServiceTeam").then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          var newResult = result.data.filter((x) => x.valueMember !== "02"); //Because IsDomestic
          setCbServiceTeam(newResult);
          // //console.log(newResult);
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
  const fnGetCbWhtRates = () => {
    Repository.fetchCbAll("WhtRates").then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // var newResult = result.data.filter((x) => x.valueMember !== "2"); //Because IsDomestic
          setCbWhtRates(result.data);
          // //console.log(newResult);
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

  const fnGetCbLocSite = () => {
    // console.log('88888');
    Repository.fetchCbAll("LocSite").then(
      (result) => {
        // setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbLocSite(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        // console.log(error);
        // setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetCbGetVat = () => {
    Repository.fetchGetVatList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // var newResult = result.data.filter((x) => x.valueMember !== "2"); //Because IsDomestic
          setCbVat(result.data);
          // //console.log(newResult);
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

  const fnGetCbDocumentType = () => {
    Repository.fetchCbAll("DocumentType").then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // var newResult = result.data.filter((x) => x.valueMember !== "2"); //Because IsDomestic
          setCbDocumentType(result.data);
          // //console.log(newResult);
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

  const fnGetCompanyListById = (companyId) => {
    Repository.fetchGetCompanyListById(companyId).then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setCompanyList(result.data);
          // //console.log(result.data);
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

  const fnGetCompanyListByMain = () => {
    //console.log(selectItemsSearch[1].transporterId);
    Repository.fetchTransporterListByMain(
      selectItemsSearch[1].transporterId
    ).then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setTransportByMain(result.data);
          console.log("setTransportByMain", result.data);
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

  const fnGetCompanyCost = () => {
    // if(!cbCompanyCost){
    //   if(baseItems[0].companyId.length){
    console.log("company select", baseItems[0]);
    Repository.fetchGetCompanyCostList(baseItems[0].companyId).then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          console.log("company", result.data);

          var filter = result.data.filter(
            (x) => x.paymentById === 1 && x.transporterTypeId === 1
          );
          setCbCompanyCost(filter);
        } else {
          setError(result);
        }
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );

    // }

    // }
  };

  const fnBaseGetCompanyList = () => {
    Repository.fetchCompanyList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbCompanyList(result.data);
        } else {
          //console.log(result);
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  };

  useEffect(() => {
    fnGetCbGetVat();
    fnGetCbWhtRates();
    fnGetCbLocationCode();
    fnGetCbDocumentType();
    fnGetCbServiceTeam();
    fnGetCbPaymentType();
    fnGetCbGrApprove();
    fnGetCbCurrencyType();
    fnGetCbTransferType();
    fnGetCbTransferType();
    fnGetCbLocSite();
    fnCheckUserAuth();
  }, []);

  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const layoutDialog = () => {
    return (
      <h6>
        <Dialog
          fullScreen
          open={isShowDialogEdit}
          onClose={onClickCloseDialog}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={onClickCloseDialog}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>{Constant.txtTransactionDeliveryList}</h3>
              </Typography>
              <CButton className="btt-close" onClick={onClickCloseDialog}>
                <h5>{Constant.txtDialogFormClose}</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>
            {dialogTabManage()}
            {modalDialog()}
          </List>
        </Dialog>
      </h6>
    );
  };

  const dialogTabManage = () => {
    if (isLoadingData) {
      return (
        <CRow>
          <CCol>
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
          </CCol>
        </CRow>
      );
    } else if (errorAPI) {
      return null;
    } else if (Object.keys(items).length && paymentStatusList.length) {
      return (
        <List>
          <div className={_classes.root}>
            <AppBar position="center" color="default">
              <Tabs
                className={_classes.tabRoot}
                value={dialogValue}
                onChange={onClickChangeDialogPage}
                variant="fullWidth"
                centered
              >
                <Tab
                  style={{ outline: "none" }}
                  label="Shipment Document Detail"
                  {...allProps(0)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label="Extra Charge"
                  {...allProps(1)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={dialogValue}
              onChangeIndex={handleChangeDialogIndex}
            >
              <TabPanel value={dialogValue} index={0} dir={theme.direction}>
                {formDialogTabOne()}
              </TabPanel>
              <TabPanel value={dialogValue} index={1} dir={theme.direction}>
                {formDialogTabTwo()}
              </TabPanel>
            </SwipeableViews>
          </div>
        </List>
      );
    }
  };

  const formDialogTabOne = () => {
    var newObj = { ...items };
    var txtLoadDate = setFormatDate(newObj.transferDatetime);
    var txtShipmentNo = newObj.shipmentNo ? newObj.shipmentNo : "";
    var txtTransferType = newObj.transferTypeCode
      ? newObj.transferTypeCode
      : "";
    var txtTruckType = newObj.truckTypeName
      ? setFormatCodeText(newObj.truckTypeCode, newObj.truckTypeName)
      : "";
    var txtTransporter = newObj.transporterNameThai
      ? setFormatCodeText(newObj.transporterCode, newObj.transporterNameThai)
      : "";
    var txtTruckLicense = newObj.truckLicense ? newObj.truckLicense : "";
    var txtSource = newObj.siteCodeSource ? newObj.siteCodeSource : "";
    var txtShipTo = newObj.shipToNameThai
      ? setFormatCodeText(newObj.shipToCode, newObj.shipToNameThai)
      : "";
    var txtWeightDocNo = newObj.weightDocNo ? newObj.weightDocNo : "";
    var txtProvince = newObj.provinceName1 ? newObj.provinceName1 : "";
    var txtCreditDebitStatus = newObj.creditDebitStatus
      ? newObj.creditDebitStatus
      : "";
    var txtShipmentStatus = newObj.docStatus ? newObj.docStatus : "";
    var txtEDPstatus = newObj.edpstatus ? newObj.edpstatus : "";
    var txtPaymentStatus = newObj.paymentStatus ? newObj.paymentStatus : "";
    return (
      <CForm>
        <CCard className="mb-1" xs="12" sm="6" md="12">
          <CCardHeader id="headingThree" class="d-flex justify-content-between">
            <CButton
              color="link"
              className="text-left m-0 p-0"
              onClick={setCollapsedFormTapOne(1)}
            >
              <CRow className="m-2 p-0">
                <h6 className="m-2 p-0">
                  {Constant.arrTextGroupTransDomDelData[1]}
                </h6>
              </CRow>
            </CButton>
            <CButton color="link" onClick={setCollapsedFormTapOne(1)}>
              <CIcon
                className="collap-icon"
                name={
                  collsDialogTabOne[1]
                    ? "cil-chevron-bottom"
                    : "cil-chevron-top"
                }
              />
            </CButton>
          </CCardHeader>
          <CCollapse show={collsDialogTabOne[0]}>
            <CCardBody className="c-body-1">
              <CRow className="m-1 p-0">
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel>{Constant.arrFieldTransDomDeliveryMain[5]}</CLabel>
                    <CInput size="xs" type="date" value={txtLoadDate} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel>{Constant.arrFieldTransDomDeliveryMain[0]}</CLabel>
                    <CInput type="text" value={txtShipmentNo} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel>Transfer Type</CLabel>
                    <CInput type="text" value={txtTransferType} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel>Weight Doc No</CLabel>
                    <CInput type="text" value={txtWeightDocNo} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="m-1 p-0 ">
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel>{Constant.arrFieldTransDomDeliveryMain[2]}</CLabel>
                    <CInput type="text" value={txtTransporter} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel>
                        {Constant.arrFieldTransDomDeliveryMain[3]}
                      </CLabel>
                      <CInput type="text" value={txtSource} />
                    </CFormGroup>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel>{Constant.arrFieldTransDomDeliveryMain[4]}</CLabel>
                    <CInput type="text" value={txtTruckType} />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel>
                        {Constant.arrFieldTransDomDeliveryMain[6]}
                      </CLabel>
                      <CInput type="text" value={txtTruckLicense} />
                    </CFormGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCollapse>
        </CCard>
        <CCard className="mb-1" xs="12" sm="6" md="12">
          <CCardHeader id="headingThree" class="d-flex justify-content-between">
            <CButton
              color="link"
              className="text-left m-0 p-0"
              onClick={setCollapsedFormTapOne(2)}
            >
              <CRow className="m-2 p-0">
                <h6 className="m-2 p-0">
                  {Constant.arrTextGroupTransDomDelData[2]}
                </h6>
              </CRow>
            </CButton>
            <CButton color="link" onClick={setCollapsedFormTapOne(2)}>
              <CIcon
                className="collap-icon"
                name={
                  collsDialogTabOne[1]
                    ? "cil-chevron-bottom"
                    : "cil-chevron-top"
                }
              />
            </CButton>
          </CCardHeader>
          <CCollapse show={collsDialogTabOne[1]}>
            <CCardBody className="c-body-1">
              {/* <CRow className="justify-content-center m-4"> */}
              <CCard
                className="p-2 text-center"
                style={{ maxHeight: "700px", overflowY: "auto" }}
              >
                <CCardBody>
                  <CDataTable
                    className="CDataTable ml-1 mr-1"
                    items={deliveryItemList}
                    fields={fieldDelivery}
                    // hover
                    striped
                    bordered
                    size="sm"
                    itemsPerPage={10}
                    pagination
                  />
                </CCardBody>
              </CCard>

              <CRow className="m-2 p-0">
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">
                      {Constant.arrFieldTransDomDelItemList[10]}
                    </CLabel>
                    <CInput
                      type="text"
                      step="0.001"
                      value={totalQtyDeliveryList}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCollapse>
        </CCard>
        <CCard xs="12" sm="6" md="12">
          <CForm className="c-body-1">
            <CCardHeader
              id="headingThree"
              class="d-flex justify-content-between"
            >
              <CButton
                color="link"
                className="text-left m-0 p-0"
                onClick={setCollapsedFormTapOne(3)}
              >
                <CRow className="m-2 p-0">
                  <h6 className="m-2 p-0">
                    {Constant.arrTextGroupTransDomDelData[3]}
                  </h6>
                </CRow>
              </CButton>
              <CButton color="link" onClick={setCollapsedFormTapOne(3)}>
                <CIcon
                  className="collap-icon"
                  name={
                    collsDialogTabOne[2]
                      ? "cil-chevron-bottom"
                      : "cil-chevron-top"
                  }
                />
              </CButton>
            </CCardHeader>
            <CCollapse show={collsDialogTabOne[2]}>
              <CCardBody>
                {/* <CRow className="justify-content-center m-4"> */}
                <CCard
                  className="p-2 text-center"
                  style={{ maxHeight: "700px", overflowY: "auto" }}
                >
                  <CCardBody>
                    <CDataTable
                      className="CDataTable ml-1 mr-1"
                      items={transportRateList}
                      fields={fieldTransportRate}
                      // hover
                      striped
                      bordered
                      size="sm"
                      itemsPerPage={10}
                      pagination
                    />
                  </CCardBody>
                </CCard>

                <CRow className="m-2 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="ccmonth">
                        {Constant.arrFieldTransDomDelTransport[11]}
                      </CLabel>
                      <CInput
                        type="text"
                        step="0.001"
                        value={totalPriceTransportRate}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="d-flex justify-content-center">
                  <CCol xs="12" sm="6" md="2" className="ml-3">
                    <CFormGroup>
                      <CButton
                        className="btn-warning "
                        size={Constant.btAddSize}
                        block
                        onClick={onClickConfirmViewContract}
                      >
                        {Constant.btViewContract}
                      </CButton>
                    </CFormGroup>
                  </CCol>
                  {showButtonReCal()}
                </CRow>
              </CCardBody>
            </CCollapse>
          </CForm>
        </CCard>
        <CCard xs="12" sm="6" md="12">
          <CForm className="c-body-1">
            <CCardHeader
              id="headingThree"
              class="d-flex justify-content-between"
            >
              <CButton
                color="link"
                className="text-left m-0 p-0"
                onClick={setCollapsedFormTapOne(4)}
              >
                <CRow className="m-2 p-0">
                  <h6 className="m-2 p-0">
                    {Constant.arrTextGroupTransDomDelData[4]}
                  </h6>
                </CRow>
              </CButton>
              <CButton color="link" onClick={setCollapsedFormTapOne(4)}>
                <CIcon
                  className="collap-icon"
                  name={
                    collsDialogTabOne[3]
                      ? "cil-chevron-bottom"
                      : "cil-chevron-top"
                  }
                />
              </CButton>
            </CCardHeader>
            <CCollapse show={collsDialogTabOne[3]}>
              <CCardBody>
                <CForm className="need-validation-shipmentstatus" noValidate>
                  {showInputDeliveryStatus(newObj)}
                </CForm>
              </CCardBody>
            </CCollapse>
          </CForm>
        </CCard>
      </CForm>
    );
  };

  const showButtonReCal = () => {
    if (roleUser === empCode) {
      return (
        <CCol xs="12" sm="6" md="2">
          <CFormGroup>
            <CButton
              className="btn-warning-01"
              size={Constant.btAddSize}
              block
              onClick={() => setIsConfirmReCal(!isConfirmReCal)}
            >
              {Constant.btReCalculate}
            </CButton>
          </CFormGroup>
        </CCol>
      );
    } else {
      return null;
    }
  };

  const showInputDeliveryStatus = (item) => {
    if (roleUser === empCode) {
      return (
        <div>
          <CRow className="m-1 p-0">
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldTransDomDeliveryMain[11]}</CLabel>
                <CInput type="text" value={item.creditDebitStatus} />
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldTransDomDeliveryMain[12]}</CLabel>
                <CSelect
                  className="form-control"
                  id="edit-shipmentstatus"
                  onClick={fnGetShipmentStatusNameOnlyList}
                  required
                >
                  <option selected hidden value={item.docStatus}>
                    {item.docStatus}
                  </option>
                  {shipmentStatusList.map((x) => (
                    <option value={x.displayMember}>{x.displayMember}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            {/* <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldTransDomDeliveryMain[10]}</CLabel>
                <CSelect
                  className="form-control"
                  id="edit-edpstatus"
                  onClick={fnGetEDPStatusNameOnlyList}
                  required
                >
                  <option selected hidden value={item.edpstatus}>
                    {item.edpstatus}
                  </option>
                  {edpStatusList.map((x) => (
                    <option value={x.displayMember}>{x.displayMember}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol> */}
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldTransDomDeliveryMain[13]}</CLabel>
                <Autocomplete
                  id="edit-paymentstatus"
                  size="small"
                  options={paymentStatusList}
                  onChange={handleChangeEditStatus}
                  defaultValue={paymentStatusList.find(
                    (x) => x.displayMember === item.paymentStatus
                  )}
                  getOptionLabel={(option) => `${option.displayMember}`}
                  renderOption={(option) => {
                    return (
                      <Typography className={classes.autoCompleteRenderOptions}>
                        {option.displayMember}
                      </Typography>
                    );
                  }}
                  renderInput={(params) => {
                    params.inputProps.className =
                      classes.autoCompleteInputLabel;
                    return (
                      <TextField
                        size="small"
                        {...params}
                        onClick={fnGetPaymentStatusNameOnlyList}
                        label={
                          <Typography
                            className={classes.autoCompleteInputLabel}
                          >
                            {Constant.txtformPlaceholderSelected}
                          </Typography>
                        }
                        variant="outlined"
                      />
                    );
                  }}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow className="m-1 p-0 row justify-content-center">
            <CCol xs="12" sm="6" md="2">
              <CButton
                className="btn-success"
                size={Constant.btAddSize}
                block
                onClick={onClickCheckEditData}
              >
                {Constant.btSave}
              </CButton>
            </CCol>
          </CRow>
        </div>
      );
    } else if (roleUser === trstCode) {
      return (
        <CRow className="m-1 p-0">
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CLabel>{Constant.arrFieldTransDomDeliveryMain[11]}</CLabel>
              <CInput type="text" value={item.creditDebitStatus} />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CLabel>{Constant.arrFieldTransDomDeliveryMain[12]}</CLabel>
              <CInput type="text" value={item.docStatus} />
            </CFormGroup>
          </CCol>
          {/* <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CLabel>{Constant.arrFieldTransDomDeliveryMain[10]}</CLabel>
              <CInput type="text" value={item.edpstatus} />
            </CFormGroup>
          </CCol> */}
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CLabel>{Constant.arrFieldTransDomDeliveryMain[13]}</CLabel>
              <CInput type="text" value={item.paymentStatus} />
            </CFormGroup>
          </CCol>
        </CRow>
      );
    } else {
      return null;
    }
  };

  const formDialogTabTwo = () => {
    return (
      <CForm>
        {formMultiDrop()}
        <CCard className="mb-1" xs="12" sm="6" md="12">
          <CCardHeader id="headingThree" class="d-flex justify-content-between">
            <CButton
              // block
              color="link"
              className="text-left m-0 p-0"
              onClick={setCollapsedFormTapTwo(2)}
            >
              <CRow className="m-2 p-0">
                <h6 className="m-2 p-0">
                  {Constant.arrTextGroupTransDomDelData[6]}
                </h6>
                {/* {showtext()} */}
              </CRow>
            </CButton>
            <CButton
              // block
              color="link"
              // className="text-right "
              onClick={setCollapsedFormTapTwo(2)}
            >
              <CIcon
                className="collap-icon"
                name={
                  collsDialogTabTwo[1]
                    ? "cil-chevron-bottom"
                    : "cil-chevron-top"
                }
              />
            </CButton>
          </CCardHeader>
          <CCollapse show={collsDialogTabTwo[1]}>
            <CCardBody className="c-body-1">
              <CRow className="m-1 p-0">
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="cvv">
                      {Constant.arrFieldTransDomDelMasterExtc[0]}
                    </CLabel>
                    <CSelect
                      className=" form-control"
                      id="edit-extrachargetype"
                      onClick={fnGetExtraChargeTypeNameOnlyList}
                      onChange={handleChangeExtraChargeType}
                    >
                      <option selected hidden value="">
                        {Constant.txtformPlaceholderSelected}
                      </option>
                      {extraChargeTypeList.map((x) => (
                        <option value={x.valueMember}>
                          {x.displayMember}{" "}
                        </option>
                      ))}
                    </CSelect>
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="cvv">
                      {Constant.arrFieldTransDomDelMasterExtc[1]}
                    </CLabel>
                    <Autocomplete
                      id="edit-extrachargelist"
                      size="small"
                      options={extraChargeNameList}
                      onChange={handleChangeExtraChargeName}
                      getOptionLabel={(option) =>
                        `[${option.extraChargeCode}] ` + option.extraChargeName
                      }
                      renderOption={(option) => {
                        return (
                          <Typography
                            className={classes.autoCompleteRenderOptions}
                          >
                            {`[${option.extraChargeCode}] ` +
                              option.extraChargeName}{" "}
                          </Typography>
                        );
                      }}
                      renderInput={(params) => {
                        params.inputProps.className =
                          classes.autoCompleteInputLabel;
                        return (
                          <TextField
                            size="small"
                            {...params}
                            label={
                              <Typography
                                className={classes.autoCompleteInputLabel}
                              >
                                {Constant.txtformPlaceholderSelected}
                              </Typography>
                            }
                            variant="outlined"
                          />
                        );
                      }}
                    />
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CForm className="need-validation-extracharge" noValidate>
                {formExtraChargeValue()}
                {formRemarkManage()}
              </CForm>
              {formExtraChargeButtonSave()}
            </CCardBody>
          </CCollapse>
        </CCard>
        <h6>
          <CCardBody className="c-body-1">
            {/* <CRow className="justify-content-center m-4"> */}
            <CCard
              className="p-2 text-center"
              style={{ maxHeight: "700px", overflowY: "auto" }}
            >
              <CDataTable
                className="CDataTable"
                items={extraChargeList}
                fields={fieldExtraCharge}
                size="sm"
                itemsPerPage={10}
                striped
                bordered
                pagination
                scopedSlots={{
                  fileType: (item, index) => {
                    if (item.fileType !== "") {
                      var result = Constant.arrFileImage.find(
                        (x) => x === item.fileType
                      );
                      if (result) {
                        return (
                          <td className="py-2">
                            <CButton
                              id="img-show"
                              size={Constant.btAddSize}
                              block
                              color="success"
                              onClick={() =>
                                fnDownloadFile(
                                  item.extraChargeRequestFile,
                                  item.fileType,
                                  "image"
                                )
                              }
                            >
                              {Constant.btShowImage}
                            </CButton>
                          </td>
                        );
                      } else {
                        return (
                          <td className="py-2">
                            <CButton
                              size={Constant.btAddSize}
                              block
                              color="primary"
                              onClick={() =>
                                fnDownloadFile(
                                  item.extraChargeRequestFile,
                                  item.fileType,
                                  "file"
                                )
                              }
                            >
                              {Constant.btDownloadFile}
                            </CButton>
                          </td>
                        );
                      }
                    } else {
                      return <td className="py-2"></td>;
                    }
                  },
                  manage: (item, index) => {
                    if (
                      item.extraChargeStatus === "Pending" &&
                      item.runningNo !== 1 &&
                      item.createFrom === _UserId
                    ) {
                      return (
                        <td className="py-2">
                          <CButton
                            size={Constant.btAddSize}
                            block
                            color="danger"
                            onClick={() => onClickSetItemDelete(item)}
                          >
                            {setTextButtonDeleteExtc(item)}
                          </CButton>
                        </td>
                      );
                    } else {
                      return <td className="py-2"></td>;
                    }
                  },
                }}
              />
            </CCard>
          </CCardBody>
        </h6>
      </CForm>
    );
  };

  const formMultiDrop = () => {
    var newObj = { ...items };
    if (newObj.dropPoint > 1) {
      return (
        <CCard className="mb-1" xs="12" sm="6" md="12">
          <CCardHeader id="headingThree" class="d-flex justify-content-between">
            <CButton
              // block
              color="link"
              className="text-left m-0 p-0"
              onClick={setCollapsedFormTapTwo(1)}
            >
              <CRow className="m-2 p-0">
                <h6 className="m-2 p-0">
                  {Constant.arrTextGroupTransDomDelData[5]}
                </h6>
                {/* {showtext()} */}
              </CRow>
            </CButton>
            <CButton
              // block
              color="link"
              // className="text-right "
              onClick={setCollapsedFormTapTwo(1)}
            >
              <CIcon
                className="collap-icon"
                name={
                  collsDialogTabTwo[0]
                    ? "cil-chevron-bottom"
                    : "cil-chevron-top"
                }
              />
            </CButton>
          </CCardHeader>
          <CCollapse show={collsDialogTabTwo[0]}>
            <CCardBody className="c-body-1">
              <CForm className="need-validation-multidrop" noValidate>
                <CRow className="m-1 p-0">
                  <CCol xs="5" sm="6" md="4">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransDomDelMultiDrop[0]}
                      </CLabel>
                      <CInput
                        type="number"
                        id="multidrop-input-droprange"
                        step="0.01"
                        required
                      />
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  {/* <CCol xs="5" sm="6" md="4">
                                        <CFormGroup>
                                            <CLabel htmlFor="cvv">ค่า Drop</CLabel>
                                            <CInput type="number" id="multidrop-input-dropprice" step="0.01" required/>
                                            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                        </CFormGroup>
                                    </CCol> */}
                  <CCol xs="5" sm="6" md="4">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransDomDelMultiDrop[1]}
                      </CLabel>
                      <CInputFile id="multidrop-input-attackfile" required />
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
              <CRow className="m-1 p-0">
                <CCol xs="12" sm="6" md="1">
                  <CButton
                    className="btn-success"
                    size={Constant.btAddSize}
                    block
                    onClick={onClickCheckAddMultiDrop}
                  >
                    {Constant.btSave}
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCollapse>
        </CCard>
      );
    } else {
      return null;
    }
  };

  const formExtraChargeValue = () => {
    var newObj = { ...extraChargeNameObj };
    if (Object.keys(newObj).length) {
      return (
        <CRow className="m-1 p-0">
          {formExtraChargeVatPrice(newObj)}
          {formExtraChargePrice(newObj)}
          {formExtraChargeQty(newObj)}
          {formExtraChargeAttackFile(newObj)}
        </CRow>
      );
    }
  };

  const formExtraChargeVatPrice = (obj) => {
    var numVat = obj.vatPrice;
    return (
      <CCol xs="12" sm="6" md="3">
        <CFormGroup>
          <CLabel>{Constant.arrFieldTransDomDelMasterExtc[2]}</CLabel>
          <CInputGroup>
            <CInput type="text" value={numVat} required disabled />
            <CInputGroupAppend>
              <CInputGroupText>%</CInputGroupText>
            </CInputGroupAppend>
          </CInputGroup>
        </CFormGroup>
      </CCol>
    );
  };

  const formExtraChargePrice = (obj) => {
    var isFix = obj.isFixPrice;
    var numValue = obj.extraChargePrice;
    var numMax = obj.maxPrice;
    return (
      <CCol xs="12" sm="6" md="3">
        <CFormGroup>
          <CLabel>
            {Constant.arrFieldTransDomDelMasterExtc[3]}
            {" (" + txtUnitPrice + ")"}
          </CLabel>
          <CInputGroup>
            <CInput
              id="extc-input-price"
              type={isFix ? "text" : "number"}
              min="0"
              max={numMax}
              step="0.01"
              value={numValue}
              onChange={isFix ? null : handleChangeExtraChargePrice}
              required
            />
            <CInputGroupAppend>
              <CInputGroupText>{Constant.unitBaht}</CInputGroupText>
            </CInputGroupAppend>
          </CInputGroup>
        </CFormGroup>
      </CCol>
    );
  };

  const formExtraChargeQty = (obj) => {
    if (obj.isUseQty) {
      return (
        <CCol xs="12" sm="6" md="3">
          <CFormGroup>
            <CLabel>{Constant.arrFieldTransDomDelMasterExtc[4]}</CLabel>
            <CInput id="extc-input-qty" type="number" required />
            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
          </CFormGroup>
        </CCol>
      );
    } else {
      return null;
    }
  };

  const formExtraChargeAttackFile = (obj) => {
    if (obj.isRequstFile) {
      return (
        <CCol xs="12" sm="6" md="3">
          <CFormGroup>
            <CLabel>{Constant.arrFieldTransDomDelMasterExtc[5]}</CLabel>{" "}
            <CLabel style={{ color: "red" }}>{txtWarningAttachFile}</CLabel>
            <CInputFile id="extc-input-attackfile" required />
            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
          </CFormGroup>
        </CCol>
      );
    } else {
      return null;
    }
  };

  const formRemarkManage = () => {
    var newObj = { ...extraChargeNameObj };
    if (Object.keys(newObj).length) {
      return (
        <CRow className="m-1 p-0">
          <CCol>
            <CCard>
              <CCardHeader>
                <CLabel>{Constant.arrFieldTransDomDelMasterExtc[6]}</CLabel>
              </CCardHeader>
              <CCardBody>
                <CRow className="m-1 p-0">
                  {formExtraChargeRemark(1)}
                  {formExtraChargeRemark(2)}
                </CRow>
                <CRow className="m-1 p-0">
                  {formExtraChargeRemark(3)}
                  {formExtraChargeRemark(4)}
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      );
    } else {
      return null;
    }
  };

  const formExtraChargeRemark = (index) => {
    var newObj = { ...extraChargeNameObj };
    switch (index) {
      case 1:
        return setFormRemarkShow(
          index,
          newObj.requestName1,
          newObj.requestDataType1,
          newObj.requestValue1
        );
      case 2:
        return setFormRemarkShow(
          index,
          newObj.requestName2,
          newObj.requestDataType2,
          newObj.requestValue2
        );
      case 3:
        return setFormRemarkShow(
          index,
          newObj.requestName3,
          newObj.requestDataType3,
          newObj.requestValue3
        );
      case 4:
        return setFormRemarkShow(
          index,
          newObj.requestName4,
          newObj.requestDataType4,
          newObj.requestValue4
        );
      default:
        return null;
    }
  };

  const formRemarkText = (index, txtLabel, arrtxtDesc) => (
    <CCol>
      <CRow>
        <CCol xs="12" sm="6" md="6">
          <CFormGroup>
            <CLabel>{txtLabel}</CLabel>
            <CInput id={"extc-remark-" + index} type="text" required />
          </CFormGroup>
        </CCol>
        <CCol xs="12" sm="6" md="6" className="m-0 p-3">
          {formRemarkTextDesc(arrtxtDesc)}
        </CCol>
      </CRow>
    </CCol>
  );

  const formRemarkTextDesc = (arrtxtDesc) => {
    if (arrtxtDesc != null) {
      return (
        <CFormGroup>
          <br />
          <CLabel>
            {Constant.arrFieldTransDomDelMasterExtc[7]} : {arrtxtDesc[0]}
          </CLabel>
        </CFormGroup>
      );
    } else {
      return null;
    }
  };

  const formRemarkNumber = (index, txtLabel, arrMinMax = []) => {
    if (arrMinMax === null) {
      arrMinMax = [null, null];
    }
    return (
      <CCol>
        <CRow>
          <CCol xs="12" sm="6" md="6">
            <CFormGroup>
              <CLabel>{txtLabel}</CLabel>
              <CInput
                id={"extc-remark-" + index}
                type="number"
                step="0.001"
                min={arrMinMax[0]}
                max={arrMinMax[1]}
                required
              />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="6" md="6" />
        </CRow>
      </CCol>
    );
  };

  const formRemarkSelect = (index, txtLabel, arrSelect) => (
    <CCol>
      <CRow>
        <CCol xs="12" sm="6" md="6">
          <CFormGroup>
            <CLabel>{txtLabel}</CLabel>
            <CSelect
              className=" form-control"
              id={"extc-remark-" + index}
              required
            >
              <option selected hidden value="">
                {Constant.txtformPlaceholderSelected}
              </option>
              {arrSelect.map((x) => (
                <option value={x}>{x}</option>
              ))}
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol xs="12" sm="6" md="6" />
      </CRow>
    </CCol>
  );

  const formExtraChargeButtonSave = () => {
    var newObj = { ...extraChargeNameObj };
    if (Object.keys(newObj).length) {
      return (
        <CRow className="m-1 p-0">
          <CCol xs="12" sm="6" md="2">
            <CButton
              className="btn-success"
              size={Constant.btAddSize}
              block
              onClick={onClickCheckAddExtraCharge}
            >
              {Constant.btSave}
            </CButton>
          </CCol>
        </CRow>
      );
    }
  };

  const formSearch = () => {
    var newArr = [...selectItemsSearch];
    var isAuto = newArr[4].length > 1;

    var isAuto2 = newArr[5].length > 1;
    var isAuto3 = newArr[6].length > 1;
    return (
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
            <CCardHeader
              id="headingThree"
              class="d-flex justify-content-between"
            >
              <CButton
                color="link"
                className="text-left m-0 p-0"
                onClick={() => setCollsFormSearch(!collsFormSearch)}
              >
                <CRow className="ml-2 mt-1 p-0">
                  <h6 className="ml-2 mt-1 p-0">
                    {Constant.arrTextGroupTransDomDelData[0]}
                  </h6>
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
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="6" sm="6" md="6">
                    <CForm className="search-startend-need-validation">
                      <CRow>
                        <CCol xs="6" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">
                              {Constant.arrFieldTransExpDeliverySearch[0]}
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
                                size="xs"
                                type="date"
                                id="search-datestart"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                invalid={invalidFormSearch[0]}
                              />
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">
                              {Constant.arrFieldTransExpDeliverySearch[1]}
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
                                size="xs"
                                type="date"
                                id="search-dateend"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                invalid={invalidFormSearch[1]}
                              />
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </Box>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>

                  <CCol
                    xs="12"
                    sm={isAuto ? "auto" : "6"}
                    md={isAuto ? "auto" : "3"}
                  >
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">Company</CLabel>
                        {FunctionController.showtext()}
                        <Box
                          className="border-set"
                          component={Grid}
                          item
                          boxShadow={1}
                          xs={{
                            width: " 100%",
                          }}
                        >
                          {showInputCompanyList()}
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[2]}
                        </CLabel>
                        {FunctionController.showtext()}
                        <Box
                          className="border-set"
                          component={Grid}
                          item
                          boxShadow={1}
                          xs={{
                            width: " 100%",
                          }}
                        >
                          {showInputTransporter()}
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>

                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="name">Transfer Type</CLabel>
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
                          id="in-search-transferTypeId"
                          // onChange={handleChangSearch("PackageType")}
                        >
                          <option selected hidden value="">
                            {Constant.txtformPlaceholderSelected}
                          </option>
                          <option value={0}>{Constant.txtAll}</option>
                          {transferType.map((cb) => (
                            <option value={cb.displayMember}>
                              {cb.displayMember}{" "}
                            </option>
                          ))}
                        </CSelect>
                      </Box>

                      <CInvalidFeedback>
                        {Constant.inValidNullSelected}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol
                    xs="12"
                    sm={isAuto2 ? "auto" : "6"}
                    md={isAuto2 ? "auto" : "3"}
                  >
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">ต้นทาง</CLabel>
                        {/* {FunctionController.showtext()} */}
                        <Box
                          className="border-set"
                          component={Grid}
                          item
                          boxShadow={1}
                          xs={{
                            width: " 100%",
                          }}
                        >
                          {showInputLocSite("LocSiteSource")}
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol
                    xs="12"
                    sm={isAuto3 ? "auto" : "6"}
                    md={isAuto3 ? "auto" : "3"}
                  >
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">ปลายทาง</CLabel>
                        {/* {FunctionController.showtext()} */}
                        <Box
                          className="border-set"
                          component={Grid}
                          item
                          boxShadow={1}
                          xs={{
                            width: " 100%",
                          }}
                        >
                          {showInputLocSite("LocSiteDest")}
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">TO Source</CLabel>
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
                            id="search-tonoSource"
                            maxLength="20"
                          />
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">TO Dest</CLabel>
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
                            id="search-tonoDest"
                            maxLength="20"
                          />
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">WeightDoc No</CLabel>
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
                            id="search-weightDocNo"
                            maxLength="20"
                          />
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  {/* <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[3]}
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
                          <Autocomplete
                            id="search-source"
                            size="small"
                            options={sourceList}
                            onChange={handleChangeSelectSearch("source")}
                            getOptionLabel={(option) =>
                              `[${option.sourceCode}] ` + option.sourceNameThai
                            }
                            renderOption={(option) => {
                              return (
                                <Typography
                                  className={classes.autoCompleteRenderOptions}
                                >
                                  {`[${option.sourceCode}] ` +
                                    option.sourceNameThai}
                                </Typography>
                              );
                            }}
                            renderInput={(params) => {
                              params.inputProps.className =
                                classes.autoCompleteInputLabel;
                              return (
                                <TextField
                                  size="small"
                                  {...params}
                                  onClick={fnGetSourceNameOnlyList}
                                  label={
                                    <Typography
                                      className={classes.autoCompleteInputLabel}
                                    >
                                      {Constant.txtformPlaceholderSelected}
                                    </Typography>
                                  }
                                  variant="outlined"
                                />
                              );
                            }}
                          />
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol> */}
                  {/* <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[22]}
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
                            id="search-saleorderno"
                            maxLength="20"
                          />
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol> */}
                  {/* <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[1]}
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
                            id="search-deliveryno"
                            maxLength="20"
                          />
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol> */}
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[0]}
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
                            id="search-shipmentno"
                            maxLength="20"
                          />
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[12]}
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
                            id="search-shipmentstatus"
                            onClick={fnGetShipmentStatusNameOnlyList}
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
                            </option>
                            {shipmentStatusList.map((x) => (
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
                    </CFormGroup>
                  </CCol>

                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[13]}
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
                          <Autocomplete
                            id="search-paymentstatus"
                            size="small"
                            options={paymentStatusList}
                            onChange={handleChangeSelectSearch("paymentstatus")}
                            getOptionLabel={(option) =>
                              `${option.displayMember}`
                            }
                            renderOption={(option) => {
                              return (
                                <Typography
                                  className={classes.autoCompleteRenderOptions}
                                >
                                  {option.displayMember}
                                </Typography>
                              );
                            }}
                            renderInput={(params) => {
                              params.inputProps.className =
                                classes.autoCompleteInputLabel;
                              return (
                                <TextField
                                  size="small"
                                  {...params}
                                  onClick={fnGetPaymentStatusNameOnlyList}
                                  label={
                                    <Typography
                                      className={classes.autoCompleteInputLabel}
                                    >
                                      {Constant.txtformPlaceholderSelected}
                                    </Typography>
                                  }
                                  variant="outlined"
                                />
                              );
                            }}
                          />
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>

                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[27]}
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
                            id="search-shipmenttype"
                            onClick={fnGetShipmentTypeNameOnlyList}
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
                            </option>
                            {shipmentTypeList.map((x) => (
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
                    </CFormGroup>
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
                          size={Constant.btSeacrhSize}
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
                          size={Constant.btSeacrhSize}
                          block
                          color="danger"
                          onClick={onClickClearData}
                        >
                          {Constant.btClearData}
                        </CButton>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCollapse>
          </CCard>
        </Box>
      </div>
    );
  };

  const showInputLocSite = (type) => {
    return (
      <Autocomplete
        id="search-Company"
        size="small"
        multiple
        options={cbLocSite}
        onChange={handleChangeSelectSearch(type)}
        getOptionLabel={(option) => option.displayMember}
        renderOption={(option) => {
          return (
            <Typography className={classes.autoCompleteRenderOptions}>
              {option.displayMember}
            </Typography>
          );
        }}
        renderInput={(params) => {
          params.inputProps.className = classes.autoCompleteInputLabel;
          return (
            <TextField
              size="small"
              error={invalidMaterialFormSearch[1]}
              {...params}
              // onClick={fnBaseGetCompanyList}
              label={
                <Typography className={classes.autoCompleteInputLabel}>
                  {Constant.txtformPlaceholderSelected}
                </Typography>
              }
              helperText={
                invalidMaterialFormSearch[1] ? (
                  <Typography className={classes.autoCompleteInputHelperText}>
                    {Constant.inValidNullMessage}
                  </Typography>
                ) : null
              }
              variant="outlined"
            />
          );
        }}
      />
    );
  };

  const showInputLocation = () => {
    // //console.log(baseItems[0].transporterId);
    // //console.log(createPayment);
    var paymentTypeCode = selectItemsCreatePayment[0].paymentTypeId;
    // //console.log(paymentTypeCode);
    //console.log(selectItemsCreatePayment[0]);
    if (paymentTypeCode) {
      if (paymentTypeCode === "01") {
        return (
          <CRow>
            <CCol xs="12" sm="6" md="12">
              <MdSwitchAccount
                size="30px"
                style={{ color: "grey", size: "100px" }}
              />
              <CLabel className="base-Label pl-2">
                xxxx-xxx-x-xxx-xxx
                {/* {selectItemsCreatePayment[0].accountNo} */}
              </CLabel>
            </CCol>
            <CCol xs="12" sm="12" md="12">
              <RiBankFill
                size="30px"
                style={{ color: "grey", size: "100px" }}
              />
              <CLabel className="base-Label pl-2">
                {selectItemsCreatePayment[0].bankName}
              </CLabel>
            </CCol>
          </CRow>
        );
      } else if (
        paymentTypeCode === "02" ||
        paymentTypeCode === "03" ||
        paymentTypeCode === "04"
      ) {
        return (
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Location</CLabel>
                {/* {showtext()} */}
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
                    id="create-payment-LocationCode"
                    value={selectItemsCreatePayment[0].placeCheque}
                    disabled
                    // onChange={(e) => selectItemsCreatePayment[0].placeCheque = e.target.value}
                    required
                  >
                    <option selected hidden value="">
                      Please Select Location
                    </option>
                    {cbLocationCode.map((cb) => (
                      <option value={cb.valueMember}>{cb.displayMember}</option>
                    ))}
                  </CSelect>
                  <CInvalidFeedback>
                    {Constant.inValidNullSelected}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CFormGroup>
          </CCol>
        );
      }
      // else {
      //   return (
      //     <CCol xs="12" sm="6" md="6">
      //       <CFormGroup>
      //         <CFormGroup>
      //           <CLabel htmlFor="name">Location</CLabel>
      //           {showtext()}
      //           <Box
      //             className="border-set"
      //             component={Grid}
      //             item
      //             boxShadow={1}
      //             xs={{
      //               width: " 100%",
      //             }}
      //           >
      //             <CSelect
      //               disabled
      //               className="form-control"
      //               id="create-payment-LocationCode"
      //               required
      //             >
      //               <option selected hidden value="">
      //                 Please Select Location
      //               </option>
      //               {cbLocationCode.map((cb) => (
      //                 <option value={cb.valueMember}>{cb.displayMember}</option>
      //               ))}
      //             </CSelect>
      //             <CInvalidFeedback>
      //               {Constant.inValidNullSelected}
      //             </CInvalidFeedback>
      //           </Box>
      //         </CFormGroup>
      //       </CFormGroup>
      //     </CCol>
      //   );
      // }
    }
  };

  const showInputServiceTeam = () => {
    //console.log(selectItemsSearch[1]);
    //console.log(serviceTeamItems);

    if (selectItemsSearch[1].icflag === true) {
      return (
        <CCol xs="12" sm="6" md="3">
          <CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="name">Service Team</CLabel>
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
                  id="create-payment-serviceTeam"
                  onChange={(e) => setServiceTeamItems(e.target.value)}
                  value={serviceTeamItems}
                  required
                >
                  <option selected hidden value="">
                    Please Select Service Team
                  </option>
                  {serviceTeam.map((cb) => (
                    <option value={cb.valueMember}>{cb.displayMember} </option>
                  ))}
                </CSelect>
              </Box>
              <CInvalidFeedback>
                {Constant.inValidNullSelected}
              </CInvalidFeedback>
            </CFormGroup>
          </CFormGroup>
        </CCol>
      );
    } else if (selectItemsSearch[1].icflag !== true) {
      return (
        <CCol xs="12" sm="6" md="3">
          <CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="name">Service Team</CLabel>
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
                  id="create-payment-serviceTeam"
                  onChange={(e) => setServiceTeamItems(e.target.value)}
                  value={serviceTeamItems}
                  required
                >
                  <option selected hidden value="">
                    Please Select Service Team
                  </option>
                  {serviceTeam.map((cb) => (
                    <option value={cb.valueMember}>{cb.displayMember} </option>
                  ))}
                </CSelect>
              </Box>
              <CInvalidFeedback>
                {Constant.inValidNullSelected}
              </CInvalidFeedback>
            </CFormGroup>
          </CFormGroup>
        </CCol>
      );
    }
  };

  const showInputCompanyList = () => {
    return (
      <Autocomplete
        id="search-Company"
        size="small"
        multiple
        options={cbCompanyList}
        onChange={handleChangeSelectSearch("company")}
        getOptionLabel={(option) =>
          `[${option.companyCode}] ` + option.companyName
        }
        renderOption={(option) => {
          return (
            <Typography className={classes.autoCompleteRenderOptions}>
              {`[${option.companyCode}] ` + option.companyName}
            </Typography>
          );
        }}
        renderInput={(params) => {
          params.inputProps.className = classes.autoCompleteInputLabel;
          return (
            <TextField
              size="small"
              error={invalidMaterialFormSearch[1]}
              {...params}
              onClick={fnBaseGetCompanyList}
              label={
                <Typography className={classes.autoCompleteInputLabel}>
                  {Constant.txtformPlaceholderSelected}
                </Typography>
              }
              helperText={
                invalidMaterialFormSearch[1] ? (
                  <Typography className={classes.autoCompleteInputHelperText}>
                    {Constant.inValidNullMessage}
                  </Typography>
                ) : null
              }
              variant="outlined"
            />
          );
        }}
      />
    );
  };

  const showInputTransporter = () => {
    if (roleUser === empCode) {
      return (
        <Autocomplete
          id="search-transporter"
          size="small"
          options={transporterList}
          onChange={handleChangeSelectSearch("transporter")}
          getOptionLabel={(option) =>
            `[${option.transporterCode}] ` + option.transporterNameThai
          }
          renderOption={(option) => {
            return (
              <Typography className={classes.autoCompleteRenderOptions}>
                {`[${option.transporterCode}] ` + option.transporterNameThai}
              </Typography>
            );
          }}
          renderInput={(params) => {
            params.inputProps.className = classes.autoCompleteInputLabel;
            return (
              <TextField
                size="small"
                error={invalidMaterialFormSearch[0]}
                {...params}
                onClick={fnGetTransporterNameOnlyList}
                label={
                  <Typography className={classes.autoCompleteInputLabel}>
                    {Constant.txtformPlaceholderSelected}
                  </Typography>
                }
                helperText={
                  invalidMaterialFormSearch[0] ? (
                    <Typography className={classes.autoCompleteInputHelperText}>
                      {Constant.inValidNullMessage}
                    </Typography>
                  ) : null
                }
                variant="outlined"
              />
            );
          }}
        />
      );
    } else if (roleUser === trstCode) {
      fnGetTransporterNameOnlyList();
      var result = null;
      if (transporterList.length) {
        result = transporterList.find((x) => x.transporterId === _TranspoterId);
      }
      return (
        <CInput
          type="text"
          id="search-transporter"
          value={
            result != null
              ? "[" + result.transporterCode + "] " + result.transporterNameThai
              : ""
          }
        />
      );
    } else {
      return null;
    }
  };

  const tableSearch = () => {
    return (
      <CCard>
        <CCardBody>{showTabManage()}</CCardBody>
      </CCard>
    );
  };

  const showButtonManage = () => {
    if (roleUser === empCode) {
      return (
        <CCol xs="4" sm="3" md="2">
          <CFormGroup>
            <CButton
              className="btn-success"
              size={Constant.btHeaderSize}
              block
              onClick={() => setIsConfirmChangeStatus(!isConfirmChangeStatus)}
            >
              {Constant.btReOpen}
            </CButton>
          </CFormGroup>
        </CCol>
      );
    } else if (roleUser === trstCode) {
      return (
        <CCol xs="4" sm="3" md="2">
          <CFormGroup>
            <CButton
              className="btn-warning"
              size={Constant.btHeaderSize}
              block
              onClick={() => setIsConfirmChangeStatus(!isConfirmChangeStatus)}
            >
              {Constant.btReJect}
            </CButton>
          </CFormGroup>
        </CCol>
      );
    } else {
      return null;
    }
  };

  const showTabManage = () => (
    <List>
      <div className={_classes.root}>
        <AppBar position="center" color="default">
          <Tabs
            className={_classes.tabRoot}
            value={tabValue}
            onChange={onClickChangeTab}
            variant="fullWidth"
            centered
          >
            <Tab
              style={{ outline: "none" }}
              label={"Summary"}
              {...allProps(0)}
            />
            <Tab
              style={{ outline: "none" }}
              label={"Shipment List"}
              {...allProps(1)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabValue}
          onChangeIndex={handleChangeTabIndex}
        >
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            {/* <CRow className="justify-content-center"> */}
            {showTabOne()}
            {/* </CRow> */}
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            {showTabTwo()}
          </TabPanel>
        </SwipeableViews>
      </div>
    </List>
  );

  const showTabOne = () => (
    <h6>
      <CDataTable
        className="CDataTable ml-1 mr-1"
        items={summaryItems}
        fields={fieldSummary}
        // hover
        // striped
        responsive
        bordered
        size="sm"
        itemsPerPage={3}
        pagination
      />
    </h6>
  );

  const showTabTwo = () => (
    <h6>
      <CCard
        className="pl-1 pr-1"
        style={{ maxHeight: "700px", overflowY: "auto" }}
      >
        <CDataTable
          // columnFilter
          tableFilter={{
            label: `${Constant.tabletxtSearch}`,
            placeholder: `${Constant.tabletxtPlaceholder}`,
          }}
          itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
          className="CDataTable ml-1 mr-1"
          items={baseItems}
          fields={fieldMain}
          // footer
          // fixed
          // striped
          responsive
          bordered
          // size="xl"
          itemsPerPage={10}
          pagination
          scopedSlots={{
            dueDate: (item) => {
              var newDate = new Date(item.dueDate);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            startDate: (item) => {
              var newDate = new Date(item.startDate);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            checked: (item, index) => {
              if (
                (item.docStatus === "Open" || item.docStatus === "Reopen") &&
                item.creditDebitStatus !== "In Progress"
              ) {
                return (
                  <td>
                    <Checkbox
                      checked={item.isChecked}
                      defaultChecked={item.isChecked}
                      color="primary"
                      onChange={setItemChangeStatus(item, index)}
                    />
                  </td>
                );
              } else {
                return (
                  <td>
                    <Checkbox
                      checked={false}
                      defaultChecked={false}
                      disabled
                      color="primary"
                      // onChange={setItemChangeStatus(item, index)}
                    />
                  </td>
                );
              }
            },
            transferDatetime: (item) => {
              var newDate = new Date(item.transferDatetime);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            confirmSource: (item) => {
              var newDate = new Date(item.confirmSource);
              newDate = newDate.toLocaleString();
              return <td className="py-2">{newDate}</td>;
            },
            confirmDest: (item) => {
              var newDate = new Date(item.confirmDest);
              newDate = newDate.toLocaleString();
              return <td className="py-2">{newDate}</td>;
            },
            creditDebitStatus: (item) => (
              <td>
                <h4>
                  <CBadge color={getBadge(item.creditDebitStatus)}>
                    {item.creditDebitStatus}
                  </CBadge>
                </h4>
              </td>
            ),
            edpstatus: (item) => (
              <td>
                <h4>
                  <CBadge color={getBadge(item.edpstatus)}>
                    {item.edpstatus}
                  </CBadge>
                </h4>
              </td>
            ),
            paymentStatus: (item) => (
              <td>
                <h4>
                  <CBadge color={getBadge(item.paymentStatus)}>
                    {item.paymentStatus}
                  </CBadge>
                </h4>
              </td>
            ),
            docStatus: (item) => (
              <td>
                <h4>
                  <CBadge color={getBadge(item.docStatus)}>
                    {item.docStatus}
                  </CBadge>
                </h4>
              </td>
            ),
            rejectReason: (item) => {
              if (roleUser === trstCode) {
                var result = readyChangeStatusList.find(
                  (x) =>
                    x.shipmentNo === item.shipmentNo &&
                    x.weightDocNo === item.weightDocNo
                );
                if (result) {
                  return (
                    <td>
                      <CInput
                        id={
                          "remark-" + item.shipmentNo + "-" + item.weightDocNo
                        }
                      />
                    </td>
                  );
                }
              }
              return <td>{item.rejectReason}</td>;
            },
            manage: (item) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    size={Constant.btAddSize}
                    block
                    onClick={onClickOpenDialog([
                      item.shipmentNo,
                      item.weightDocNo,
                    ])}
                  >
                    ดูข้อมูล
                  </CButton>
                </td>
              );
            },
          }}
        />
      </CCard>
    </h6>
  );

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

      {/* Start Error Datetime Search Modal */}
      <CModal
        show={isShowWarningSearch}
        onClose={() => setIsShowWarningSearch(!isShowWarningSearch)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentWarningForDateTimeOrMontYearSearch}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowWarningSearch(!isShowWarningSearch)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Edit Status Modal */}
      <CModal
        show={isConfirmChangeStatus}
        onClose={() => setIsConfirmChangeStatus(!isConfirmChangeStatus)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmChangeStatus}</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickChangeStatusList}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmChangeStatus(!isConfirmChangeStatus)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Edit Status Modal */}
      <CModal
        show={isCreatePayment}
        onClose={() => setIsCreatePayment(!isCreatePayment)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentCantCreatePayment}</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => setIsCreatePayment(!isCreatePayment)}
          >
            {Constant.btOK}
          </CButton>{" "}
          {/* <CButton
            color="secondary"
            onClick={() => setIsCreatePayment(!isCreatePayment)}
          >
            {Constant.btCancel}
          </CButton> */}
        </CModalFooter>
      </CModal>
    </div>
  );

  const modalDialog = () => (
    <div>
      {/* Start AllPayNo  Modal */}
      <CModal
        show={isAllPayNo}
        onClose={() => setIsAllPayNo(!isAllPayNo)}
        color="warning"
        closeOnBackdrop={false}
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>สร้างเอกสารสำเร็จ</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody className="c-body">
          <CRow className="justify-content-center">
            <CLabel style={{ fontSize: "16px" }}>Payment No : {"\xa0"}</CLabel>
            <CLabel style={{ fontSize: "16px" }}> {allPayNo}</CLabel>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={(e) => window.location.reload(false)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End AllPayNo Modal */}
      {/* Start Fetch Loading Modal */}
      <CModal size="sm" show={isPostingData} centered closeOnBackdrop={false}>
        <CModalBody>{showLoadingData()}</CModalBody>
      </CModal>
      {/* End Fetch Loading Modal */}

      {/* Start Fetch Error Modal */}
      <CModal show={errorAPI} color="danger" centered closeOnBackdrop={false}>
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
        show={isConfirmSave}
        onClose={() => setIsConfirmSave(!isConfirmSave)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          {textTypeInsert === ""
            ? Constant.contentConfirmCreatePayment
            : Constant.contentConfirmAddData}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={
              textTypeInsert === "ExtraCharge"
                ? onClickAddExtraCharge
                : textTypeInsert === "MultiDrop"
                ? onClickAddExtraChargeMultiDrop
                : onClickCreatePayment
            }
          >
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

      {/* Start Edit Modal */}
      <CModal
        show={isConfirmEdit}
        onClose={() => setIsConfirmEdit(!isConfirmEdit)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmEditData}</CModalBody>
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
      {/* End Edit Modal */}

      {/* Start View Contract Modal */}
      <CModal
        show={isConfirmViewContract}
        onClose={onClickCancelViewContract}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmOpenContract}</CModalBody>
        <CModalFooter>
          <CButton color="success" to="/master/Contract/Domestic">
            {Constant.btOK}
          </CButton>{" "}
          <CButton color="secondary" onClick={onClickCancelViewContract}>
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End View Contract Modal */}

      {/* Start Error View Contract Modal */}
      <CModal
        show={isShowErrorViewContract}
        onClose={() => setIsShowErrorViewContract(!isShowErrorViewContract)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentWarningForViewContract}</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowErrorViewContract(!isShowErrorViewContract)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error View Contract Modal */}

      {/* Start ReCal Modal */}
      <CModal
        show={isConfirmReCal}
        onClose={() => setIsConfirmReCal(!isConfirmReCal)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmReCal}</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickReCalTransport}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmReCal(!isConfirmReCal)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End ReCal Modal */}

      {/* Start Show Image Modal */}
      <CModal
        show={isShowImage}
        onClose={() => setIsShowImage(!isShowImage)}
        color="success"
        centered
        size="xl"
      >
        <img id="extc-image" src="#" />
      </CModal>
      {/* End Show Image Modal */}

      {/* Start Delete Modal */}
      <CModal
        show={isConfirmDelete}
        onClose={() => setIsConfirmDelete(!isConfirmDelete)}
        color="danger"
        centered
      >
        <CModalHeader closeButton>
          <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {Constant.contentConfirmTempDataStart +
            textConfirmDelete +
            Constant.contentConfirmTempDataEnd}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={onClickDeleteExtraChrge}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmDelete(!isConfirmDelete)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Delete Modal */}
      {/* Start Add Modal */}
      <CModal
        show={isCreatePayment}
        onClose={() => setIsCreatePayment(!isCreatePayment)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentCantCreatePayment}</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => setIsCreatePayment(!isCreatePayment)}
          >
            {Constant.btOK}
          </CButton>{" "}
          {/* <CButton
            color="secondary"
            onClick={() => setIsCreatePayment(!isCreatePayment)}
          >
            {Constant.btCancel}
          </CButton> */}
        </CModalFooter>
      </CModal>
      {/* End Add Modal */}
    </div>
  );

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
                <CCardHeader>
                  <CRow>
                    <CCol xs="6" sm="8" md="10">
                      <h3 className="headtext">Payment</h3>
                    </CCol>
                    <CCol xs="6" sm="4" md="2">
                      {dialogs()}
                      {layoutDialogInvoice()}
                    </CCol>
                    <CCol>{layoutDialog()}</CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {formSearch()}
                  {tableSearch()}
                  {modalForm()}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  }
};

export default DeliveryList;
