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
import MockUpData from "../../../../mockupData/MuData";
import { MdSwitchAccount } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { GiBanknote } from "react-icons/gi";
import { MdEditOff } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdStickyNote2 } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import logoallpay from "../../../../assets/icons/allpay.png";
import { GrCircleInformation } from "react-icons/gr";

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
  CImg,
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
import { tr } from "date-fns/locale";
import { eachDayOfInterval } from "date-fns";

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
    key: "runningNo",
    label: "",
    sorter: false,
    filter: false,
  },
  {
    key: "expenseCode",
    label: "Cost Element",
  },
  {
    key: "costCenterCode",
    label: "Cost Center",
  },
  {
    key: "internalOrderNumber",
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
    key: "runningNo",
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
    key: "paymentRunNo",
    label: "ExpenseCode/CostCenter",
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
    label: `${Constant.arrFieldTransExpDelSummary[0]}`,
  },
  {
    key: "totalRow",
    label: `${Constant.arrFieldTransExpDelSummary[1]}`,
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
  {
    key: "totalShippingPrice",
    label: `${Constant.arrFieldTransExpDelSummary[6]}`,
    digit: 2,
  },
];

const fieldMain = [
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  // {
  //   key: "sendToAllPay",
  //   label: "",
  //   _style: { width: "1%" },
  //   sorter: false,
  //   filter: false,
  // },
  {
    key: "paymentStatus",
    label: "Payment Status",
  },
  {
    key: "attachFileStatus",
    label: "Approve Status",
  },
  {
    key: "paymentNo",
    label: "PaymentNo",
  },
  {
    key: "startDate",
    label: "วันที่รอบบิล",
  },
  {
    key: "dueDate",
    label: "วันครบกำหนดชำระ",
  },
  {
    key: "durationDate",
    label: "ระยะเวลาจากวันที่สร้างเอกสาร",
  },
  {
    key: "companyName",
    label: "บริษัท",
  },
  {
    key: "transporterName",
    label: "ผู้รับเหมา",
  },
  {
    key: "transportMode",
    label: "Mode",
  },
  {
    key: "creditTerm",
    label: "เครดิต",
  },
  {
    key: "paymentTypeName",
    label: "วิธีรับเงิน",
  },
  // {
  //   key: "accountNo",
  //   label: "เลขบัญชี",
  // },
  {
    key: "smptotalAmount",
    label: "จำนวนเงิน",
    digit: 2,
  },
  {
    key: "refNo",
    label: "หมายเลขอ้างอิง",
  },

  {
    key: "allPayNo",
    label: "All Pay No",
  },
  {
    key: "subject",
    label: "Subject",
  },
  {
    key: "rejectReason",
    label: "สาเหตุการ Reject",
  },
];

const fieldDelivery = [
  {
    key: "deliveryNo",
    label: `${Constant.arrFieldTransDomDelItemList[0]}`,
  },
  {
    key: "saleOrderNo",
    label: `${Constant.arrFieldTransDomDelItemList[1]}`,
  },
  {
    key: "salesOrg",
    label: `${Constant.arrFieldTransDomDelItemList[2]}`,
  },
  {
    key: "packageType",
    label: `${Constant.arrFieldTransDomDelItemList[3]}`,
  },
  {
    key: "materialNo",
    label: `${Constant.arrFieldTransDomDelItemList[4]}`,
  },
  {
    key: "materialGroup",
    label: `${Constant.arrFieldTransDomDelItemList[5]}`,
  },
  {
    key: "shipToNameThai",
    label: `${Constant.arrFieldTransDomDelItemList[6]}`,
  },
  {
    key: "provinceAndDistrict",
    label: `${Constant.arrFieldTransDomDelItemList[7]}`,
  },
  {
    key: "plant",
    label: `${Constant.arrFieldTransDomDelItemList[8]}`,
  },
  {
    key: "qty",
    label: `${Constant.arrFieldTransDomDelItemList[9]}`,
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
  },
  {
    key: "extraChargeTotalPrice",
    label: `${Constant.arrFieldTransDomDelExtraCharge[5]}`,
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
    case "Open":
      return "success";
    case "Wait for Verify":
      return "secondary";
    case "Wait For Approve":
      return "info";
    case "Reject from Verify":
      return "warning";
    case "Reject from Approve":
      return "warning";
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
  const [isApproveAllpay, setIsApproveAllpay] = useState(false);
  const [isVatNotEqual, setIsVatNotEqual] = useState(false);
  const [isConfirmCancelPayment, setIsConfirmCancelPayment] = useState(false);
  const [isConfirmsManualDoc, setIsConfirmsManualDoc] = useState(false);

  const [isAllpayId, setAllpayId] = useState(null);
  const [isNotApprove, setIsNotApprove] = useState(false);
  const [isShowConfirmSend, setIsShowConfirmSend] = useState(false);

  const [isShowDialogEdit, setisShowDialogEdit] = useState(false);

  const [isShowImage, setIsShowImage] = useState(false);
  const [isShowErrorViewContract, setIsShowErrorViewContract] = useState(false);
  const [isShowWarningSearch, setIsShowWarningSearch] = useState(false);

  const [isShowCancelPaymentSuccess, setIsShowCancelPaymentSuccess] =
    useState(false);

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
  const [visible, setVisible] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [isEditComplete, setIsEditComplete] = useState(false);

  const [isCannotSendToApp, setIsCannotSendToApp] = useState(false);

  /**Payment Detail */

  const [extrachargeData, setExtraChargeData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [createPayment, setCreatePayment] = useState([]);
  const [supportfile, setSupportFile] = useState([]);
  const [amount, setAmount] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(null);
  const [cbWhtRates, setCbWhtRates] = useState([]);
  const [cbVat, setCbVat] = useState([]);

  /** User Email List Variable */
  const [userApproveList, setUserApproveList] = useState([]);
  const [userCCList, setUserCCList] = useState([]);
  const [userReviewerList, setUserReviewerList] = useState([]);
  // const []

  const [userApproveListItems, setUserApproveListItems] = useState({});
  const [userCCListItems, setUserCCListItems] = useState([]);
  const [userReviewerListItems, setUserReviewerListItems] = useState([]);

  const [testShow, setTestShow] = useState(false);
  const [editData, setEditData] = useState([]);

  const [isEdit, setIsEdit] = useState(true);
  const [isAllPayCom, setIsAllPayCom] = useState(false);
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
  const [isTotalError, setIsTotalError] = useState(false);
  const [isNotUserCreate, setIsNotUserCreate] = useState(false);
  const [isType, setIsType] = useState("add");

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
    var newfiles = [...invoiceItems];
    console.log(newfiles[indexFiles[0]]);
    var kkk = event.target.files;
    // kkk.map((x,index) => {
    //   x.guid = "0"+indexFiles[0]+"-"+(index+1)
    // })
    //console.log(kkk[0]);
    //console.log(indexFiles[0]);
    // kkk.FileList.map((x,index) => {
    //     x.guid = "0"+indexFiles[0]+"-"+(index+1)
    //   })
    //console.log(invoiceItems);

    var newArr = [...event.target.files];
    console.log(newArr);
    if (newArr.length) {
      if (newfiles[indexFiles[0]].tpaymentAttachFiles.length) {
        newArr = [...newfiles[indexFiles[0]].tpaymentAttachFiles];
      } else {
        newArr = [...invoiceTax];
      }
      newArr.push(...event.target.files);
    }

    if (event.target.files) {
      var newCrr = [...invoiceItems];
      newCrr[indexFiles[0]].filesName = event.target.files[0].name;
      setInvoiceItems(newCrr);
      console.log(invoiceItems);
    } else {
      var newCrr = [...invoiceItems];
      newCrr[indexFiles[0]].filesName = "";
      setInvoiceItems(newCrr);
    }

    // newArr.push(event.target.files);

    setInvoiceTax(newArr);
    invoiceItems.map((x) => {
      if (x.runningNo === indexFiles[0] + 1) {
        x.tpaymentAttachFiles = newArr;
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
        runningNo: index + 1,
        expenseCode: "",
        costCenterCode: "",
        internalOrderNumber: "",
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
      <CRow className="justify-content-center m-4">
        <CCard>
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
        </CCard>
      </CRow>
    );
  };

  const tableShipExtraChrge = () => {
    return (
      <CCard>
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
                      disabled={isEdit}
                      value={item.ioNo}
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
      </CCard>
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
      runningNo: invoiceItems.length + 1,
      tpaymentAttachFiles: [],
      filesName: "Not Found",
      documentType: "",
      paymentRunNo: "",
      documentNo: "",
      documentDate: "",
      amount: "",
      vatAmount: "",
      totalAmount: "",
      reference1: "",
      vendorTax: "",
      tpaymentVatRate: {},
      tpaymentWhtrates: [],
    };

    var newBrr = [];
    var obj = {
      dpid: invoiceItems.length + 1,
      checkbox: false,
      rate: null,
      baseAmount: 0,
      vatAmount: null,
    };

    obj.rate = 0;
    obj.baseAmount = 0;
    obj.vatAmount = 0;

    newObj.tpaymentVatRate = obj;

    var newCrr = [];
    for (let i = 0; i < 3; i++) {
      var WhtObj = {
        dpid: invoiceItems.length + 1,
        checkbox: false,
        rate: null,
        baseAmount: null,
        vatAmount: null,
      };

      WhtObj.rate = 0;
      WhtObj.baseAmount = null;
      WhtObj.vatAmount = 0;
      newObj.tpaymentWhtrates.push(WhtObj);
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

  const onClickOpenDialogVat = (index, id) => (e) => {
    // fnGetDataListById(index);
    var newArr = [...indexFiles];
    newArr[0] = index;
    newArr[1] = id;
    setIndexFiles(newArr);
    //console.log(newArr);
    // setInvoiceTax([]);
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
          <List>
            {collapseHeaderInvoice(isType)} {modalForm()}
          </List>
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

  // const layoutDialogVat = () => {
  //   return (
  //     <h6>
  //       <Dialog
  //         // fullScreen
  //         fullWidth
  //         maxWidth="100%"
  //         size="xl"
  //         open={isShowDialogVat}
  //         onClose={onClickCloseDialogTax}
  //         TransitionComponent={Transition}
  //       >
  //         <AppBar className={_classes.appBar}>
  //           <Toolbar>
  //             <IconButton
  //               edge="start"
  //               color="default"
  //               onClick={onClickCloseDialogVat}
  //               aria-label="close"
  //             ></IconButton>
  //             <Typography variant="h6" className={_classes.title}>
  //               <h3>Invoice/Tax Invoice/Other Information</h3>
  //             </Typography>
  //             <CButton
  //               className="btt-close"
  //               onClick={onClickCloseDialogVat}
  //             >
  //               <h5>{Constant.txtDialogFormClose}</h5>
  //             </CButton>
  //           </Toolbar>
  //         </AppBar>
  //         <List>{collapseHeaderInvoice("add")}</List>
  //       </Dialog>
  //     </h6>
  //   );
  // };

  const otherTablesGerneral = (type, indexId) => {
    if (Object.keys(editData).length) {
      var newShowData = { ...editData };
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
                            value={newShowData.subject}
                            name="textarea-input"
                            id="create-payment-subject"
                            disabled={isEdit}
                            onChange={onHandleChangeEdit("subject")}
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
    }
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
                    disabled={isEdit}
                    onClick={onClickRemoveRecordAddData("manage", index)}
                  >
                    ลบข้อมูล
                  </CButton>
                </td>
              );
            },
            runningNo: (item, index) => {
              return (
                <td className="py-2">
                  <CLabel>{item.runningNo}</CLabel>
                </td>
              );
            },
            expenseCode: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="costCenter"
                    id="add-costElement"
                    value={item.expenseCode}
                    placeholder="Code or Description"
                    disabled={isEdit}
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
            costCenterCode: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="costElement"
                    id="add-costElement"
                    value={item.costCenterCode}
                    placeholder="Code or Description"
                    disabled={isEdit}
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
            internalOrderNumber: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="ioData"
                    id="add-costElement"
                    value={item.internalOrderNumber}
                    placeholder="Code or Description"
                    disabled={isEdit}
                    onChange={onHandleAddCost("internalOrderNumber", index)}
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
                    value={item.assignment}
                    disabled={isEdit}
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

  const funOpenEdit = (type) => {
    if (type === "add") {
      setOpenAddForm(true);
    } else if (type === "edit") {
      setOpenEditForm(true);
    }
  };

  const handleClickOpen = (type, paymentId) => (e) => {
    if (type === "add") {
      var setNewSelectitems = selectItems.filter((x) => x.isChecked === true);

      fnGetDataPaymentListById(paymentId, type);
      fnGetCompanyListById(baseItems[0].companyId);
      fnGetCompanyCost();
      fnGetCompanyListByMain();
      setTestShow(true);
      setIsType(type);
    } else if (type === "edit") {
      setOpenAddForm(false);
      setIsType(type);
      fnGetDataPaymentListById(paymentId, type);
      fnGetCompanyListById(baseItems[0].companyId);
      fnGetCompanyCost();
      fnGetCompanyListByMain();
      setTestShow(true);
    }
  };
  const fnClearOtherTableValueList = () => {
    setTotalPrice(0);
    setActualVat();
    setActualAmount();
    setEditData([]);
    setUserCCListItems([]);
    setUserCCList([]);
    setUserApproveListItems({});
    setUserApproveList([]);
    setUserReviewerListItems([]);
    setUserReviewerList([]);
    setExtraChargeData([]);
    setShipmentData([]);
    setInvoiceItems([]);
    setSupportFile([]);
    setCostItems([]);
    setIsEdit(true);
  };

  const handleClose = (type) => (e) => {
    fnClearOtherTableValueList();
    setIsApproveAllpay(false);
    if (type === "add") {
      var newArr = [...selectItemsCreatePayment];
      newArr[0] = {};
      setSelectItemsCreatePayment(newArr);
      setOpenAddForm(false);
      setTestShow(false);
    } else if (type === "edit") {
      setOpenEditForm(false);
      setIndexEditForm(null);
      // setEditData([]);
    }
  };

  // const onClickRemoveRecordAddData = (type, index) => (e) => {
  //   if (type === "manage2") {
  //     var newArr = [...invoiceItems];
  //     newArr.splice(index, 1);
  //     setInvoiceItems(newArr);
  //   }
  //   if (type === "manage") {
  //     var newArr = [...costItems];
  //     newArr.splice(index, 1);
  //     setCostItems(newArr);
  //   }
  // };

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
    if (type === "fileView") {
      var newBrr = [...invoiceItems];
      console.log(newBrr[indexFiles[0]].tpaymentAttachFiles[index]);
      newBrr[indexFiles[0]].tpaymentAttachFiles[index].splice(index, 1);
      setInvoiceItems(newBrr);
    }
  };

  const onHandleAddCost = (type, index) => (e) => {
    var newObj = [...costItems];
    if (type === "costElement") {
      newObj[index].expenseCode = e.target.value;
    } else if (type === "costCenter") {
      newObj[index].costCenterCode = e.target.value;
    } else if (type === "internalOrderNumber") {
      newObj[index].internalOrderNumber = e.target.value;
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
      newObj[index].documentType = e.target.value;
      newObj[index].documentTypeId = e.target.value;
    } else if (type === "ioNo") {
      newObj[index].paymentRunNo = e.target.value;
    } else if (type === "documentNo") {
      newObj[index].documentNo = e.target.value;
    } else if (type === "documentDate") {
      newObj[index].documentDate = e.target.value;
    } else if (type === "amount") {
      if (e.target.value != "") {
        newObj[index].amount = parseFloat(e.target.value);
        newObj[index].tpaymentVatRate.baseAmount = parseFloat(e.target.value);
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
                  disabled={isEdit}
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
                  disabled={isEdit}
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
                    <Checkbox
                      defaultChecked={false}
                      color="primary"
                      id={"checkbox-select-" + index}
                      // onChange={(event) => {
                      //   setisActive(event.target.value);
                      // }}
                    />
                  </td>
                );
              },
              manage: (item, index) => {
                return (
                  <td className="py-2">
                    <CLabel>{index + 1}</CLabel>
                  </td>
                );
              },
              fileName: (item, index) => {
                var fileName = "No Items";
                if (item.tpaymentAttachFiles[0]) {
                  fileName = item.tpaymentAttachFiles[0].fileName
                    ? item.tpaymentAttachFiles[0].fileName
                    : item.tpaymentAttachFiles[0].name;
                }
                return (
                  <td className="py-2">
                    <CFormGroup
                    // style={{ backgroundColor: "white" }}
                    // className="justify-content-center text-center"
                    >
                      <CRow>
                        <CLabel style={{ color: "#056776" }}>
                          {/* +ADD */}
                          <BsFileEarmarkArrowDown
                            onClick={onClickOpenDialogInvoice(index, item.dpId)}
                            // disabled={isEdit}
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
                      value={item.documentType}
                      // disabled={isEdit}
                      onChange={onHandleChangeTax("documentTypeId", index)}
                      required
                    >
                      <option value="">Please Select DocumentType</option>
                      {cbDocumentType.map((cb) => (
                        <option value={cb.valueMember}>
                          {cb.displayMember}{" "}
                        </option>
                      ))}
                    </CSelect>
                  </td>
                );
              },
              paymentRunNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CSelect
                      className="form-control"
                      id={"invoice-ioNo"}
                      value={item.paymentRunNo}
                      // onClick={() => //console.log(extrachargeData)}
                      onChange={onHandleChangeTax("ioNo", index)}
                    >
                      <option selected value="">
                        Please Select
                      </option>
                      {costItems.map((cb) => (
                        <option value={cb.runningNo}>{cb.runningNo} </option>
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
                      value={item.documentNo}
                      // disabled={isEdit}
                      onChange={onHandleChangeTax("documentNo", index)}
                      id={"invoice-documentNo"}
                    ></CInput>
                  </td>
                );
              },
              documentDate: (item, index) => {
                item.documentDate =
                  item.documentDate !== null
                    ? new Date(item.documentDate)
                    : null;
                item.documentDate = formatDate(item.documentDate);
                return (
                  <td className="py-2">
                    <CInput
                      size="xs"
                      type="date"
                      // disabled={isEdit}
                      value={item.documentDate}
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
                      // disabled={isEdit}
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
                      // disabled={isEdit}
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
                          // disabled={isEdit}
                          color={"success"}
                          id={"invoice-VAT"}
                          // onChange={onHandleChangeVat("checkBox")}
                          // defaultChecked={false}
                          checked={item.tpaymentVatRate.checkbox}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.tpaymentVatRate.checkbox ? (
                          <CLabel style={{ fontSize: "12px", color: "gray" }}>
                            VAT {item.tpaymentVatRate.rate}%{" "}
                            {item.tpaymentVatRate.vatAmount.toLocaleString(
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
                          // disabled={isEdit}
                          id={"invoice-WHT"}
                          checked={item.tpaymentWhtrates[0].checkbox}
                          // onChange={onHandleChangeWhtRate("checkBox",index)}
                          // defaultChecked={false}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.tpaymentWhtrates[0].checkbox ? (
                          <CForm>
                            {item.tpaymentWhtrates[0].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.tpaymentWhtrates[0].rate}% {"       "}
                                {item.tpaymentWhtrates[0].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.tpaymentWhtrates[1].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.tpaymentWhtrates[1].rate}%{" "}
                                {item.tpaymentWhtrates[1].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.tpaymentWhtrates[2].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.tpaymentWhtrates[2].rate}%{" "}
                                {item.tpaymentWhtrates[2].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}
                            <Divider></Divider>
                            <CLabel style={{ fontSize: "12px", color: "gray" }}>
                              Total Wht{" "}
                              {item.tpaymentWhtrates[0].vatAmount +
                                item.tpaymentWhtrates[1].vatAmount +
                                item.tpaymentWhtrates[2].vatAmount}{" "}
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
                          onClick={onClickOpenDialogVat(index, item)}
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
    } else if (type === "edit") {
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
            itemsPerPage={5}
            pagination
            scopedSlots={{
              manage: (item, index) => {
                return (
                  <td className="py-2">
                    <Checkbox
                      defaultChecked={false}
                      color="primary"
                      id={"checkbox-select-" + index}
                      disabled="false"
                      // onChange={(event) => {
                      //   setisActive(event.target.value);
                      // }}
                    />
                  </td>
                );
              },
              manage: (item, index) => {
                return (
                  <td className="py-2">
                    <CLabel>{index + 1}</CLabel>
                  </td>
                );
              },
              fileName: (item, index) => {
                var fileName = "No Items";
                if (item.tpaymentAttachFiles[0]) {
                  fileName = item.tpaymentAttachFiles[0].fileName
                    ? item.tpaymentAttachFiles[0].fileName
                    : "";
                }
                return (
                  <td className="py-2">
                    <CFormGroup
                    // style={{ backgroundColor: "white" }}
                    // className="justify-content-center text-center"
                    >
                      <CRow>
                        <CLabel style={{ color: "#056776" }}>
                          {/* +ADD */}
                          <BsFileEarmarkArrowDown
                            onClick={onClickOpenDialogInvoice(index, item.dpId)}
                            // disabled="false"
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
                      value={item.documentType}
                      disabled="false"
                      onChange={onHandleChangeTax("documentTypeId", index)}
                      required
                    >
                      <option value="">Please Select DocumentType</option>
                      {cbDocumentType.map((cb) => (
                        <option value={cb.valueMember}>
                          {cb.displayMember}{" "}
                        </option>
                      ))}
                    </CSelect>
                  </td>
                );
              },
              paymentRunNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CSelect
                      className="form-control"
                      id={"invoice-ioNo"}
                      value={item.paymentRunNo}
                      disabled="false"
                      onChange={onHandleChangeTax("ioNo", index)}
                    >
                      <option selected value="">
                        Please Select
                      </option>
                      {costItems.map((cb) => (
                        <option value={cb.runningNo}>{cb.runningNo} </option>
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
                      value={item.documentNo}
                      disabled="false"
                      onChange={onHandleChangeTax("documentNo", index)}
                      id={"invoice-documentNo"}
                    ></CInput>
                  </td>
                );
              },
              documentDate: (item, index) => {
                item.documentDate =
                  item.documentDate !== null
                    ? new Date(item.documentDate)
                    : null;
                item.documentDate = formatDate(item.documentDate);
                return (
                  <td className="py-2">
                    <CInput
                      size="xs"
                      type="date"
                      disabled="false"
                      value={item.documentDate}
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
                      disabled="false"
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
                      disabled="false"
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
                          // disabled={isEdit}
                          color={"success"}
                          id={"invoice-VAT"}
                          // onChange={onHandleChangeVat("checkBox")}
                          // defaultChecked={false}
                          checked={item.tpaymentVatRate.checkbox}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.tpaymentVatRate.checkbox ? (
                          <CLabel style={{ fontSize: "12px", color: "gray" }}>
                            VAT {item.tpaymentVatRate.rate}%{" "}
                            {item.tpaymentVatRate.vatAmount.toLocaleString(
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
                          // disabled={isEdit}
                          id={"invoice-WHT"}
                          checked={item.tpaymentWhtrates[0].checkbox}
                          // onChange={onHandleChangeWhtRate("checkBox",index)}
                          // defaultChecked={false}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.tpaymentWhtrates[0].checkbox ? (
                          <CForm>
                            {item.tpaymentWhtrates[0].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.tpaymentWhtrates[0].rate}% {"       "}
                                {item.tpaymentWhtrates[0].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.tpaymentWhtrates[1].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.tpaymentWhtrates[1].rate}%{" "}
                                {item.tpaymentWhtrates[1].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.tpaymentWhtrates[2].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                Wht {item.tpaymentWhtrates[2].rate}%{" "}
                                {item.tpaymentWhtrates[2].vatAmount} THB{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}
                            <Divider></Divider>
                            <CLabel style={{ fontSize: "12px", color: "gray" }}>
                              Total Wht{" "}
                              {item.tpaymentWhtrates[0].vatAmount +
                                item.tpaymentWhtrates[1].vatAmount +
                                item.tpaymentWhtrates[2].vatAmount}{" "}
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
                          onClick={onClickOpenDialogVat(index, item)}
                          disabled="false"
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
                      disabled="false"
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
  const [collapse, setCollapse] = useState(false);

  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const footerbox = () => {
    if (Object.keys(editData).length) {
      const newVaue = { ...editData };
      var isManual = true;

      var newArr = [...invoiceItems];
      var sum = 0;
      var wht = 0;

      if (newArr.length) {
        newArr.map((x, index) => {
          // console.log(index);
          if (index < 3) {
            wht = wht + x.tpaymentWhtrates[index].vatAmount;
          }
        });
      }

      var status;
      if (
        newVaue.attachFileStatus === "Open" ||
        newVaue.attachFileStatus === "Reject from Approve" ||
        newVaue.attachFileStatus === "Wait for Verify"
      ) {
        status = false;
      } else {
        status = true;
      }

      if (roleUser != trstCode && roleUser != empCode) {
        isManual = false;
      } else {
        isManual = true;
      }

      return (
        <CCard className="fixed d-flex">
          <CCardBody>
            <CRow className="d-flex">
              <CCol className="mr-autopl-3 pr-3">
                <h3>
                  <CLabel style={{ color: "black" }}>
                    Summary Payment Amount
                  </CLabel>
                </h3>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  SMP Total Amount (Exclude VAT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3   text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.smpamount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
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
                  Actual Total Amount (Exclude VAT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.actualAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
              {/* <GrCircleInformation
                // class="tooltip"
                title={
                  "SMP VAT : " +
                  `${newVaue.smpvat}` +
                  "\n" +
                  "ACTUAL VAT : " +
                  `${newVaue.actualVat}`
                }
                color="grey"
                size="20px"
              /> */}
            </CRow>
            {/* //Actual Payment */}
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual VAT
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.actualVat.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual WHT
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {wht.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual Total Amount (Include VAT + WHT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {totalPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              {/* <CCard style={{ backgroundColor : }} onClick={(e) => setIsEdit(!true)}> */}
              {roleUser !== trstCode ? (
                <CCol md="4">
                  <CRow>
                    <CCol md="6" className="mr-autopl-3 pr-3 ">
                      <CButton
                        size={Constant.btAddSize}
                        onClick={() =>
                          setIsConfirmCancelPayment(!isConfirmCancelPayment)
                        }
                        color="danger"
                        style={{ fontSize: "14px" }}
                        block
                      >
                        ยกเลิกเอกสาร
                      </CButton>
                    </CCol>

                    <CCol
                      md="6"
                      style={{ overflow: "hidden" }}
                      className="mr-autopl-3 pr-3  "
                    >
                      <CButton
                        size={Constant.btAddSize}
                        onClick={(e) => setIsEdit(!isEdit)}
                        color="success"
                        style={{ fontSize: "14px", overflow: "hidden" }}
                        block
                      >
                        {isEdit ? (
                          <MdEditOff color="white" size="20px" />
                        ) : (
                          <MdModeEditOutline color="white" size="20px" />
                        )}
                        {"\xa0"}แก้ไขข้อมูล
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
              ) : (
                <div></div>
              )}

              {/* </CCard> */}

              <CCol md="2" className="mr-autopl-3 pr-3 ">
                <CButton
                  size={Constant.btAddSize}
                  onClick={onClickCheckCreatePayment}
                  color="success"
                  style={{ fontSize: "14px" }}
                  block
                >
                  บันทึก
                </CButton>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="1" className=" pr-3 pt-2">
                <CButton
                  size={Constant.btAddSize}
                  onClick={() => setIsConfirmsManualDoc(!isConfirmsManualDoc)}
                  className={"btn-mainsmp"}
                  disabled={isManual}
                  style={{ fontSize: "14px" }}
                  block
                >
                  <MdStickyNote2 size="20px" />
                  {"\xa0"}แนบใบปะหน้า
                </CButton>
              </CCol>
              <CCol xs="12" sm="6" md="1" className=" pr-3 pt-2">
                <CButton
                  size={Constant.btAddSize}
                  onClick={onClickExportPDF}
                  className={"btn-mainsmp"}
                  style={{ fontSize: "14px" }}
                  block
                >
                  <MdStickyNote2 size="20px" />
                  {"\xa0"}ใบปะหน้า
                </CButton>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pr-3  pt-2">
                <CButton
                  size={Constant.btAddSize}
                  onClick={fnfetchVerifyPaymentList(newVaue.paymentNo)}
                  disabled={status}
                  className={"btn-mainsmp"}
                  style={{ fontSize: "14px" }}
                  block
                >
                  {/* <FiSend size="30px" /> */}
                  ส่งเอกสารให้ผู้ตรวจสอบ
                </CButton>
              </CCol>
              {btSendtoAllpay()}
            </CRow>
          </CCardBody>
        </CCard>
      );
    }
  };

  const btSendtoAllpay = () => {
    var item = { ...editData };

    if (roleUser === trstCode) {
      return <td></td>;
    } else {
      if (!item.paymentStatus && item.attachFileStatus === "Complete") {
        return (
          <CCol xs="12" sm="6" md="2" className="mr-autopl-3 pr-3 pt-2">
            <CButton
              size="sm"
              block
              variant="outline"
              onClick={onClickSendToAllPay(item)}
              color="info"
              className="mr-1 mb-1"
            >
              {/* <CLabel style={{ fontSize: "16px" }} className="mr-1">Send to AllPay</CLabel> */}

              <CImg
                size="sm"
                width="30%"
                height="auto"
                className="img-rounded "
                title="Send to AllPay"
                src={logoallpay}
              />
            </CButton>
            {/* <CButton
              onClick={onClickSendToAllPay(item)}
              
              size={Constant.btAddSize}
            >
              <img
                src={logoallpay}
                width="100%"
                height="auto"
                className="img-rounded "
              />
            </CButton> */}
          </CCol>
        );
      } else {
        return (
          <CCol xs="12" sm="6" md="2" className="mr-autopl-3 pr-3 pt-2">
            <CButton
              size="sm"
              block
              variant="outline"
              // onClick={onClickSendToAllPay(item)}
              disabled
              color="info"
              className="mr-1 mb-1"
            >
              {/* <CLabel style={{ fontSize: "16px" }} className="mr-1">Send to AllPay</CLabel> */}
              <CImg
                size="sm"
                width="30%"
                height="auto"
                className="img-rounded "
                title="Send to AllPay"
                src={logoallpay}
              />
            </CButton>
            {/* <CButton
            onClick={onClickSendToAllPay(item)}
            
            size={Constant.btAddSize}
          >
            <img
              src={logoallpay}
              width="100%"
              height="auto"
              className="img-rounded "
            />
          </CButton> */}
          </CCol>
        );
      }
    }
  };

  const onClickExportPDF = () => {
    var newShowData = { ...editData };
    var paymentId = newShowData.paymentId;
    setIsPostingData(true);
    Repository.fetchGetCoverPageData(paymentId, false).then(
      (result) => {
        console.log("result", result);
        setIsPostingData(false);
        if (result.httpCode === "200") {
          console.log("result", result.data);

          const toDay = new Date();

          var subject = document.getElementById("create-payment-subject").value;
          // const toDay = new Date();
          var newDoc = {
            createDate: toDay,
            toName: "",
            fromName: _aliasName,
            subject: subject,
            transporterName: newShowData.transporterName,
            smpNo: newShowData.paymentNo,
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

          if (shipmentData.length) {
            shipmentData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          } else if (extrachargeData.length && !shipmentData.length) {
            extrachargeData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          }

          newBaseItem.map((x) => {
            _sumQty += x.qty;
            newDeliveryList.push(x.deliveryNo);

            // newShipmentList.push(x.shipmentNo);
            newSaleOrderList.push(x.saleOrderNo);
          });

          var countDelivery = [...new Set(newDeliveryList)].length;
          var countShipment = [...new Set(newShipmentList)].length;
          var countSaleOrder = [...new Set(newSaleOrderList)].length;

          console.log("countDelivery", countDelivery);
          console.log("countShipment", countShipment);
          console.log("countSaleOrder", countSaleOrder);

          newDoc.sumQty = result.data.summaryQty;
          newDoc.sumSaleOrder = result.data.summarySaleOrder;
          newDoc.sumShipment = countShipment;
          newDoc.sumDelivery = result.data.summaryDelivery;
          newDoc.sumAmount = totalAmount;
          // totalAmount;
          newDoc.toName = userApproveListItems.aliasName;

          // Render to View PDF
          console.log("newDoc", newDoc);
          FunctionController.renderPDF(newDoc, false);

          // console.log(newDoc);

          // Convert PDF to File in Variable
          FunctionController.convertPDFToFile(
            newDoc,
            "Cover Sheet",
            false
          ).then((result) => {
            // fnCreateDocManual(result, newDoc.smpNo, "Cover Sheet.pdf");
          });
        }
      },
      (error) => {
        setIsPostingData(false);
        // setErrorAPI(error);
      }
    );

    // console.log(newFile.value)
  };

  //ใบปะหน้า Mannual
  // const onClickExportPDF = () => {
  //   var newShowData = { ...editData };
  //   var paymentId = newShowData.paymentId;
  //   setIsPostingData(true);
  //   Repository.fetchGetCoverPageData(paymentId, false).then(
  //     (result) => {
  //       console.log("result", result);
  //       setIsPostingData(false);
  //       if (result.httpCode === "200") {
  //         console.log("result", result.data);

  //         const toDay = new Date();

  //         var subject = document.getElementById("create-payment-subject").value;
  //         // const toDay = new Date();
  //         var newDoc = {
  //           createDate: toDay,
  //           toName: "",
  //           fromName: _aliasName,
  //           subject: subject,
  //           transporterName: newShowData.transporterName,
  //           smpNo: newShowData.paymentNo,
  //           companyName: companyList[0].companyName,
  //           sumQty: 0,
  //           sumSaleOrder: 0,
  //           sumShipment: 0,
  //           sumDelivery: 0,
  //           sumAmount: 0,
  //         };

  //         // console.log(summaryItems);

  //

  //         // Render to View PDF
  //         console.log("newDoc", newDoc);
  //         FunctionController.renderPDF(newDoc);

  //         // console.log(newDoc);

  //         // Convert PDF to File in Variable
  //         FunctionController.convertPDFToFile(newDoc, "Cover Sheet").then(
  //           (result) => {
  //             console.log(result);
  //           }
  //         );
  //       }
  //     },
  //     (error) => {
  //       setIsPostingData(false);
  //       // setErrorAPI(error);
  //     }
  //   );

  //   // console.log(newFile.value)
  // };

  const footerboxView = () => {
    if (Object.keys(editData).length) {
      const newVaue = { ...editData };
      var newArr = [...invoiceItems];
      var sum = 0;
      var wht = 0;

      if (newArr.length) {
        newArr.map((x, index) => {
          // console.log(index);
          if (index < 3) {
            wht = wht + x.tpaymentWhtrates[index].vatAmount;
          }
        });
      }

      return (
        <CCard className="fixed d-flex">
          <CCardBody>
            <CRow className="d-flex">
              <CCol className="mr-autopl-3 pr-3">
                <h3>
                  <CLabel style={{ color: "black" }}>
                    Summary Payment Amount
                  </CLabel>
                </h3>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  SMP Total Amount (Exclude VAT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3   text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.smpamount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
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
                  Actual Total Amount (Exclude VAT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.actualAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
              {/* <GrCircleInformation
            // class="tooltip"
            title={
              "SMP VAT : " +
              `${newVaue.smpvat}` +
              "\n" +
              "ACTUAL VAT : " +
              `${newVaue.actualVat}`
            }
            color="grey"
            size="20px"
          /> */}
            </CRow>
            {/* //Actual Payment */}
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual VAT
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.actualVat.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual WHT
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {wht.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual Total Amount (Include VAT + WHT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {totalPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol md="auto" className="p-3 text-right">
                <CButton
                  size={Constant.btAddSize}
                  onClick={onClickExportPDF}
                  className={"btn-mainsmp"}
                  style={{ fontSize: "14px" }}
                  block
                >
                  <MdStickyNote2 size="20px" />
                  {"\xa0"}ใบปะหน้า
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      );
    }
  };

  const dialogs = (paymentId, type) => {
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
            onClick={handleClickOpen(type, paymentId)}
            // disabled={dis}
            // color="danger"
            // to='/Transaction/TPE/Domestic/PaymentList'
          >
            แก้ไขข้อมูล
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
            {modalForm()}
            {/* {modalDialog()} */}
            {footerbox()}
          </List>
          {/* <Footer/> */}
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
            {modalForm()}
            {footerboxView()}
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

  const collapseHeader = (type) => {
    // //console.log(shipmentData);
    // //console.log(extrachargeData);

    if (type === "add") {
      if (Object.keys(editData).length) {
        // var DueDate = Date.now();

        var newShowData = { ...editData };

        var startDate = newShowData.startDate;
        var endDate = newShowData.endDate;
        var transporterId = newShowData.transporterId;
        var transporterCode = newShowData.transporterCode;
        var transporterName = newShowData.transporterName;
        var transporterEmail = newShowData.transporterEmail;
        var companyId = newShowData.companyId;
        var companyCode = newShowData.companyCode;
        var companyName = newShowData.companyName;
        var paymentTypeId = newShowData.paymentTypeId;
        var bankName = newShowData.bankName;
        var accountNo = newShowData.accountNo;
        var placeCheque = newShowData.placeCheque;
        var creditTerm = newShowData.creditTerm;
        var price = newShowData.price;
        var refNo = newShowData.refNo;
        var allPayNo = newShowData.allPayNo;
        var taxId = newShowData.taxNo;
        var branch = newShowData.branchNo;
        var address = newShowData.address;
        var grApprovefor = newShowData.grApprovefor;
        var subject = newShowData.subject;
        var dueDate =
          newShowData.dueDate !== null ? new Date(newShowData.dueDate) : null;
        dueDate = formatDate(dueDate);
        var currency = newShowData.currency;
        var paymentDescription = newShowData.paymentDescription;
        var exchangeRate = newShowData.exchangeRate;
        var serviceTeamCode = newShowData.serviceTeamCode;
        var smpamount = newShowData.smpamount;
        var smpvat = newShowData.smpvat;
        var smptotalAmount = newShowData.smptotalAmount;
        var actualAmount = newShowData.actualAmount;
        var actualVat = newShowData.actualVat;
        var actualTotalAmount = newShowData.actualTotalAmount;
        var costArr = [];
        var inVoiceArr = [];
        var wht = 0;
        var checkBox = false;
        var checkBoxWht = false;
        var requester = userItems.find(
          (x) => x.userId === newShowData.createBy
        );
        console.log("requester", requester);
        var newWht = [];
        var newtpaymentDoc = [];

        if (editData.tpaymentItems.length > 0) {
          if (!costItems.length && !invoiceItems.length) {
            // checkpoint1
            console.log(editData);
            newShowData.tpaymentItems.map((x) => {
              x.tpaymentDocuments.map((y, index) => {
                y.fileName = y.tpaymentAttachFiles;
                console.log(y.tpaymentWhtrates.length);
                for (let i = y.tpaymentWhtrates.length; i < 3; i++) {
                  var obj = {
                    checkbox: false,
                    rate: 0,
                    baseAmount: 0,
                    vatAmount: 0,
                  };
                  y.tpaymentWhtrates.push(obj);
                }
                console.log(newWht);
                console.log(y.tpaymentWhtrates);
              });

              x.tpaymentDocuments.map((x) => {
                console.log(x.tpaymentVatRate);
                if (x.tpaymentVatRate) {
                  if (x.tpaymentVatRate.vatAmount > 0) {
                    x.tpaymentVatRate.checkbox = true;
                  } else {
                    x.tpaymentVatRate.checkbox = false;
                  }

                  x.vatAmount = x.tpaymentVatRate.vatAmount;
                  x.totalAmount = x.amount + x.vatAmount;
                  checkBox = x.tpaymentVatRate.checkbox;
                } else {
                  var newtVat = {
                    checkbox: false,
                    rate: 0,
                    baseAmount: 0,
                    vatAmount: 0,
                  };

                  newtVat.checkbox = false;
                  x.tpaymentVatRate = newtVat;
                }

                console.log("x.tpaymentWhtrates", x.tpaymentWhtrates);
                if (x.tpaymentWhtrates) {
                  x.tpaymentWhtrates.map((y) => {
                    if (y.vatAmount > 0) {
                      y.checkbox = true;
                    }
                    checkBoxWht = y.checkbox;
                    wht = wht + y.vatAmount;
                  });
                }
              });
              //ErrorCost

              x.tpaymentDocuments.map((t) => {
                newtpaymentDoc.push(t);
              });
            });
            setCostItems(newShowData.tpaymentItems);
            setSupportFile(newShowData.tpaymentSupportFiles);
            setInvoiceItems(newtpaymentDoc);
          }
        }

        if (
          !newShowData.taxNo &&
          !newShowData.branchNo &&
          !newShowData.address
        ) {
          transporterList.find((x) => {
            if (x.transporterId === transporterId) {
              //console.log(x);
              newShowData.taxNo = x.taxNo;
              newShowData.branchNo = x.branchNo;
              newShowData.address = x.address;
              newShowData.transporterCode = x.transporterCode;
              newShowData.transporterName = x.transporterNameThai;
              newShowData.transporterEmail = x.email;
              setEditData(newShowData);
            }
          });
        }

        if (Object.keys(editData).length) {
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
                      <CForm
                        className="general-info-need-validation"
                        noValidate
                      >
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
                                <CInput
                                  size="xs"
                                  type="text"
                                  id="create-payment-companyId"
                                  disabled
                                  value={
                                    editData
                                      ? "[" + companyCode + "]" + companyName
                                      : ""
                                  }
                                  required
                                />
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
                                  disabled={isEdit}
                                  loading
                                  autoHighlight
                                  filterSelectedOptions
                                  defaultValue={transportByMain.find(
                                    (x) => x.transporterId === transporterId
                                  )}
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
                                        // error={invalidMaterialFormCreatePay[0]}
                                        {...params}
                                        // onClick={fnGetCompanyListByMain}
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
                            <CLabel disabled={isEdit} className="pr-2">
                              Tax Id :{" "}
                            </CLabel>
                            <CLabel disabled={isEdit} className="base-Label">
                              {" "}
                              {taxId}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="cvv"> </CLabel>
                            </CFormGroup>
                            <CLabel disabled={isEdit} className="pr-2">
                              Branch :{" "}
                            </CLabel>
                            <CLabel disabled={isEdit} className="base-Label">
                              {branch}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow className="pb-3">
                          <CCol xs="12" sm="6" md="6">
                            {address ? (
                              <FaRegAddressCard
                                size="30px"
                                style={{ color: "grey", size: "100px" }}
                              />
                            ) : (
                              ""
                            )}

                            <CLabel className="base-Label pl-2">
                              {address}
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
                      <CForm
                        className="payment-info-need-validation"
                        noValidate
                      >
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
                                  disabled={isEdit}
                                  value={dueDate}
                                  id="create-payment-dueDate"
                                  name="date-input"
                                  onChange={onHandleChangeEdit("dueDate")}
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
                                    value={paymentTypeId}
                                    disabled
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
                                    disabled={isEdit}
                                    value={paymentDescription}
                                    id="create-payment-paymentDesc"
                                    rows="3"
                                    placeholder=""
                                    onChange={onHandleChangeEdit(
                                      "paymentDescription"
                                    )}
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
                                    value={transporterEmail}
                                    disabled={isEdit}
                                    type="text"
                                    onChange={onHandleChangeEdit(
                                      "transporterEmail"
                                    )}
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
                                disabled={isEdit}
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
                                disabled={isEdit}
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
                                    disabled={isEdit}
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
                      <CForm
                        className="approve-info-need-validation"
                        noValidate
                      >
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
                                      value={requester.userName}
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
                                        disabled={isEdit}
                                        options={userReviewerList}
                                        onChange={handleChangeAddCCAndReviewer(
                                          "reviewer"
                                        )}
                                        getOptionLabel={(option) =>
                                          `[${option.aliasName}]` +
                                          "  " +
                                          option.firstName +
                                          " " +
                                          option.lastName
                                        }
                                        renderOption={(option) => {
                                          return (
                                            <Typography
                                              className={
                                                classes.autoCompleteRenderOptions
                                              }
                                            >
                                              {`[${option.aliasName}]` +
                                                "  " +
                                                option.firstName +
                                                " " +
                                                option.lastName}
                                            </Typography>
                                          );
                                        }}
                                        renderInput={(params) => {
                                          params.inputProps.className =
                                            classes.autoCompleteInputLabel;
                                          return (
                                            <TextField
                                              disabled={isEdit}
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
                                        disabled={isEdit}
                                        options={userCCList}
                                        onChange={handleChangeAddCCAndReviewer(
                                          "cc"
                                        )}
                                        getOptionLabel={(option) =>
                                          `[${option.aliasName}]` +
                                          "  " +
                                          option.firstName +
                                          " " +
                                          option.lastName
                                        }
                                        renderOption={(option) => {
                                          return (
                                            <Typography
                                              className={
                                                classes.autoCompleteRenderOptions
                                              }
                                            >
                                              {`[${option.aliasName}]` +
                                                "  " +
                                                option.firstName +
                                                " " +
                                                option.lastName}
                                            </Typography>
                                          );
                                        }}
                                        renderInput={(params) => {
                                          params.inputProps.className =
                                            classes.autoCompleteInputLabel;
                                          return (
                                            <TextField
                                              disabled={isEdit}
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
                                      {tableApprovalCC(
                                        userCCListItems,
                                        fieldsCC
                                      )}
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
                              {userApproveListItems ? (
                                <CRow>
                                  <CCol xs="12" sm="6" md="6">
                                    <CFormGroup>
                                      <CFormGroup>
                                        <CLabel htmlFor="name">Approver</CLabel>
                                        {showtext()}
                                        <Autocomplete
                                          id="tags-filled"
                                          size="small"
                                          value={userApproveListItems}
                                          disabled={isEdit}
                                          options={userApproveList}
                                          onChange={handleChangeAddCCAndReviewer(
                                            "approve"
                                          )}
                                          getOptionLabel={(option) =>
                                            `[${option.aliasName}]` +
                                            "  " +
                                            option.userName
                                          }
                                          renderOption={(option) => {
                                            return (
                                              <Typography
                                                className={
                                                  classes.autoCompleteRenderOptions
                                                }
                                              >
                                                {`[${option.aliasName}]` +
                                                  "  " +
                                                  option.userName}
                                              </Typography>
                                            );
                                          }}
                                          renderInput={(params) => {
                                            params.inputProps.className =
                                              classes.autoCompleteInputLabel;
                                            return (
                                              <TextField
                                                size="small"
                                                disabled={isEdit}
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
                              ) : (
                                <CRow>
                                  <CCol xs="12" sm="6" md="6">
                                    <CFormGroup>
                                      <CFormGroup>
                                        <CLabel htmlFor="name">Approver</CLabel>
                                        {showtext()}
                                        <Autocomplete
                                          id="tags-filled"
                                          size="small"
                                          // value={userApproveListItems}
                                          disabled={isEdit}
                                          options={userApproveList}
                                          onChange={handleChangeAddCCAndReviewer(
                                            "approve"
                                          )}
                                          getOptionLabel={(option) =>
                                            `[${option.aliasName}]` +
                                            "  " +
                                            option.userName
                                          }
                                          renderOption={(option) => {
                                            return (
                                              <Typography
                                                className={
                                                  classes.autoCompleteRenderOptions
                                                }
                                              >
                                                {`[${option.aliasName}]` +
                                                  "  " +
                                                  option.userName}
                                              </Typography>
                                            );
                                          }}
                                          renderInput={(params) => {
                                            params.inputProps.className =
                                              classes.autoCompleteInputLabel;
                                            return (
                                              <TextField
                                                size="small"
                                                disabled={isEdit}
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
                              )}
                            </CCardBody>
                          </CCollapse>
                        </CCard>
                        {/* <CRow className="justify-content-center">
                          <CCol md="3">
                            <CButton
                              size={Constant.btAddSize}
                              onClick={onClickCheckCreatePayment}
                              color="success"
                              block
                            >
                              Save
                            </CButton>
                          </CCol>
                          <CCol md="3">
                            <CButton
                              size={Constant.btAddSize}
                              color="danger"
                              block
                            >
                              Cancel
                            </CButton>
                          </CCol>
                        </CRow> */}
                      </CForm>
                    </CCardBody>
                  </Box>
                </CCollapse>
              </CCard>
              {/* 5.paymentDocument */}
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
                      <CForm
                        className="invoice-info-need-validation"
                        noValidate
                      >
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
                        <CCard className="p-3">
                          {tabAttachInvoice("show")}
                        </CCard>
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
    } else if (type === "edit") {
      if (Object.keys(editData).length) {
        // var DueDate = Date.now();

        var newShowData = { ...editData };

        var startDate = newShowData.startDate;
        var endDate = newShowData.endDate;
        var transporterId = newShowData.transporterId;
        var transporterCode = newShowData.transporterCode;
        var transporterName = newShowData.transporterName;
        var transporterEmail = newShowData.transporterEmail;
        var companyId = newShowData.companyId;
        var companyCode = newShowData.companyCode;
        var companyName = newShowData.companyName;
        var paymentTypeId = newShowData.paymentTypeId;
        var bankName = newShowData.bankName;
        var accountNo = newShowData.accountNo;
        var placeCheque = newShowData.placeCheque;
        var creditTerm = newShowData.creditTerm;
        var price = newShowData.price;
        var refNo = newShowData.refNo;
        var allPayNo = newShowData.allPayNo;
        var taxId = newShowData.taxNo;
        var branch = newShowData.branchNo;
        var address = newShowData.address;
        var requester = userItems.find(
          (x) => x.userId === newShowData.createBy
        );

        var grApprovefor = newShowData.grApprovefor;
        var subject = newShowData.subject;
        var dueDate =
          newShowData.dueDate !== null ? new Date(newShowData.dueDate) : null;
        dueDate = formatDate(dueDate);
        var currency = newShowData.currency;
        var paymentDescription = newShowData.paymentDescription;
        var exchangeRate = newShowData.exchangeRate;
        var serviceTeamCode = newShowData.serviceTeamCode;
        var smpamount = newShowData.smpamount;
        var smpvat = newShowData.smpvat;
        var smptotalAmount = newShowData.smptotalAmount;
        var actualAmount = newShowData.actualAmount;
        var actualVat = newShowData.actualVat;
        var actualTotalAmount = newShowData.actualTotalAmount;
        var costArr = [];
        var inVoiceArr = [];
        var wht = 0;
        var checkBox = false;
        var checkBoxWht = false;
        var newWht = [];
        var newtpaymentDoc = [];
        if (editData.tpaymentItems.length > 0) {
          if (!costItems.length && !invoiceItems.length) {
            console.log(newShowData.tpaymentItems);
            newShowData.tpaymentItems.map((x) => {
              x.tpaymentDocuments.map((y, index) => {
                y.fileName = y.tpaymentAttachFiles;
                console.log(y.tpaymentWhtrates.length);
                for (let i = y.tpaymentWhtrates.length; i < 3; i++) {
                  var obj = {
                    checkbox: false,
                    rate: 0,
                    baseAmount: 0,
                    vatAmount: 0,
                  };
                  y.tpaymentWhtrates.push(obj);
                }
                console.log(newWht);
                console.log(y.tpaymentWhtrates);
              });

              x.tpaymentDocuments.map((x) => {
                console.log(x.tpaymentVatRate);
                if (x.tpaymentVatRate !== null) {
                  if (x.tpaymentVatRate.vatAmount > 0) {
                    x.tpaymentVatRate.checkbox = true;
                  } else {
                    x.tpaymentVatRate.checkbox = false;
                  }
                  x.vatAmount = x.tpaymentVatRate.vatAmount;
                  x.totalAmount = x.amount + x.vatAmount;
                  checkBox = x.tpaymentVatRate.checkbox;
                } else {
                  var newtVat = {
                    checkbox: false,
                    rate: 0,
                    baseAmount: 0,
                    vatAmount: 0,
                  };

                  newtVat.checkbox = false;
                  x.tpaymentVatRate = newtVat;
                }

                if (x.tpaymentWhtrates) {
                  x.tpaymentWhtrates.map((y) => {
                    if (y.vatAmount > 0) {
                      y.checkbox = true;
                    }
                    checkBoxWht = y.checkbox;
                    wht = wht + y.vatAmount;
                  });
                }
              });
              x.tpaymentDocuments.map((t) => {
                newtpaymentDoc.push(t);
              });
            });
            setCostItems(newShowData.tpaymentItems);
            setSupportFile(newShowData.tpaymentSupportFiles);
            setInvoiceItems(newtpaymentDoc);
          }
        }
        if (
          !newShowData.taxNo &&
          !newShowData.branchNo &&
          !newShowData.address
        ) {
          transporterList.find((x) => {
            if (x.transporterId === transporterId) {
              //console.log(x);
              newShowData.taxNo = x.taxNo;
              newShowData.branchNo = x.branchNo;
              newShowData.address = x.address;
              newShowData.transporterCode = x.transporterCode;
              newShowData.transporterName = x.transporterNameThai;
              newShowData.transporterEmail = x.email;
              setEditData(newShowData);
            }
          });
        }

        if (Object.keys(editData).length) {
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
                      <CForm
                        className="general-info-need-validation"
                        noValidate
                      >
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
                                <CInput
                                  size="xs"
                                  type="text"
                                  id="create-payment-companyId"
                                  disabled
                                  value={
                                    editData
                                      ? "[" + companyCode + "]" + companyName
                                      : ""
                                  }
                                  required
                                />
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
                                  disabled={true}
                                  loading
                                  autoHighlight
                                  filterSelectedOptions
                                  defaultValue={transportByMain.find(
                                    (x) => x.transporterId === transporterId
                                  )}
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
                                        // error={invalidMaterialFormCreatePay[0]}
                                        {...params}
                                        // onClick={fnGetCompanyListByMain}
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
                            <CLabel disabled={true} className="pr-2">
                              Tax Id :{" "}
                            </CLabel>
                            <CLabel disabled={true} className="base-Label">
                              {" "}
                              {taxId}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="cvv"> </CLabel>
                            </CFormGroup>
                            <CLabel disabled={true} className="pr-2">
                              Branch :{" "}
                            </CLabel>
                            <CLabel disabled={true} className="base-Label">
                              {branch}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow className="pb-3">
                          <CCol xs="12" sm="6" md="6">
                            {address ? (
                              <FaRegAddressCard
                                size="30px"
                                style={{ color: "grey", size: "100px" }}
                              />
                            ) : (
                              ""
                            )}

                            <CLabel className="base-Label pl-2">
                              {address}
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
                      <CForm
                        className="payment-info-need-validation"
                        noValidate
                      >
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
                                  disabled={true}
                                  value={dueDate}
                                  id="create-payment-dueDate"
                                  name="date-input"
                                  onChange={onHandleChangeEdit("dueDate")}
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
                                    value={paymentTypeId}
                                    disabled
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
                                    disabled={true}
                                    value={paymentDescription}
                                    id="create-payment-paymentDesc"
                                    rows="3"
                                    placeholder=""
                                    onChange={onHandleChangeEdit(
                                      "paymentDescription"
                                    )}
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
                                    value={transporterEmail}
                                    disabled={true}
                                    type="text"
                                    onChange={onHandleChangeEdit(
                                      "transporterEmail"
                                    )}
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
                                disabled={isEdit}
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
                                // onClick={onClickAddCost("add")}
                                disabled={true}
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
                                    disabled={isEdit}
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
                      <CForm
                        className="approve-info-need-validation"
                        noValidate
                      >
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
                                      value={requester.userName}
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
                                        disabled={isEdit}
                                        options={userReviewerList}
                                        onChange={handleChangeAddCCAndReviewer(
                                          "reviewer"
                                        )}
                                        getOptionLabel={(option) =>
                                          `[${option.aliasName}]` +
                                          "  " +
                                          option.firstName +
                                          " " +
                                          option.lastName
                                        }
                                        renderOption={(option) => {
                                          return (
                                            <Typography
                                              className={
                                                classes.autoCompleteRenderOptions
                                              }
                                            >
                                              {`[${option.aliasName}]` +
                                                "  " +
                                                option.firstName +
                                                " " +
                                                option.lastName}
                                            </Typography>
                                          );
                                        }}
                                        renderInput={(params) => {
                                          params.inputProps.className =
                                            classes.autoCompleteInputLabel;
                                          return (
                                            <TextField
                                              disabled={isEdit}
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
                                        disabled={isEdit}
                                        options={userCCList}
                                        onChange={handleChangeAddCCAndReviewer(
                                          "cc"
                                        )}
                                        getOptionLabel={(option) =>
                                          `[${option.aliasName}]` +
                                          "  " +
                                          option.firstName +
                                          " " +
                                          option.lastName
                                        }
                                        renderOption={(option) => {
                                          return (
                                            <Typography
                                              className={
                                                classes.autoCompleteRenderOptions
                                              }
                                            >
                                              {`[${option.aliasName}]` +
                                                "  " +
                                                option.firstName +
                                                " " +
                                                option.lastName}
                                            </Typography>
                                          );
                                        }}
                                        renderInput={(params) => {
                                          params.inputProps.className =
                                            classes.autoCompleteInputLabel;
                                          return (
                                            <TextField
                                              disabled={isEdit}
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
                                      {tableApprovalCC(
                                        userCCListItems,
                                        fieldsCC
                                      )}
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
                              {userApproveListItems ? (
                                <CRow>
                                  <CCol xs="12" sm="6" md="6">
                                    <CFormGroup>
                                      <CFormGroup>
                                        <CLabel htmlFor="name">Approver</CLabel>
                                        {showtext()}
                                        <Autocomplete
                                          id="tags-filled"
                                          size="small"
                                          value={userApproveListItems}
                                          disabled={isEdit}
                                          options={userApproveList}
                                          onChange={handleChangeAddCCAndReviewer(
                                            "approve"
                                          )}
                                          getOptionLabel={(option) =>
                                            `[${option.aliasName}]` +
                                            "  " +
                                            option.userName
                                          }
                                          renderOption={(option) => {
                                            return (
                                              <Typography
                                                className={
                                                  classes.autoCompleteRenderOptions
                                                }
                                              >
                                                {`[${option.aliasName}]` +
                                                  "  " +
                                                  option.userName}
                                              </Typography>
                                            );
                                          }}
                                          renderInput={(params) => {
                                            params.inputProps.className =
                                              classes.autoCompleteInputLabel;
                                            return (
                                              <TextField
                                                size="small"
                                                disabled={isEdit}
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
                              ) : (
                                <CRow>
                                  <CCol xs="12" sm="6" md="6">
                                    <CFormGroup>
                                      <CFormGroup>
                                        <CLabel htmlFor="name">Approver</CLabel>
                                        {showtext()}
                                        <Autocomplete
                                          id="tags-filled"
                                          size="small"
                                          // value={userApproveListItems}
                                          disabled={isEdit}
                                          options={userApproveList}
                                          onChange={handleChangeAddCCAndReviewer(
                                            "approve"
                                          )}
                                          getOptionLabel={(option) =>
                                            `[${option.aliasName}]` +
                                            "  " +
                                            option.userName
                                          }
                                          renderOption={(option) => {
                                            return (
                                              <Typography
                                                className={
                                                  classes.autoCompleteRenderOptions
                                                }
                                              >
                                                {`[${option.aliasName}]` +
                                                  "  " +
                                                  option.userName}
                                              </Typography>
                                            );
                                          }}
                                          renderInput={(params) => {
                                            params.inputProps.className =
                                              classes.autoCompleteInputLabel;
                                            return (
                                              <TextField
                                                size="small"
                                                disabled={isEdit}
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
                              )}
                            </CCardBody>
                          </CCollapse>
                        </CCard>
                        {/* <CRow className="justify-content-center">
                          <CCol md="3">
                            <CButton
                              size={Constant.btAddSize}
                              onClick={onClickCheckCreatePayment}
                              color="success"
                              block
                            >
                              Save
                            </CButton>
                          </CCol>
                          <CCol md="3">
                            <CButton
                              size={Constant.btAddSize}
                              color="danger"
                              block
                            >
                              Cancel
                            </CButton>
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
                      <CForm
                        className="invoice-info-need-validation"
                        noValidate
                      >
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
                                  // onClick={addInvoiceItems}
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
                        <CCard className="p-3">
                          {tabAttachInvoice("edit")}
                        </CCard>
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
    }
  };

  const onHandleChangeEdit = (type) => (e) => {
    var newData = { ...editData };
    if (type === "subject") {
      newData.subject = e.target.value;
    }
    if (type === "dueDate") {
      newData.dueDate = e.target.value;
    }

    if (type === "paymentDescription") {
      newData.paymentDescription = e.target.value;
    }

    if (type === "serviceTeam") {
      newData.serviceTeamCode = e.target.value;
    }
    if (type === "transporterEmail") {
      newData.transporterEmail = e.target.value;
    }

    //console.log(newData);
    setEditData(newData);
  };

  const onClickCheckCreatePayment = () => {
    var newArr = [...selectItemsCreatePayment];
    // onClickUpdateCreatePayment();
    // setInvalidMaterialFormCreatePay([false]);
    if (
      getIsValidForm("general-info-need-validation") &&
      getIsValidForm("payment-info-need-validation") &&
      getIsValidForm("approve-info-need-validation")
      // Object.keys(newArr[0]).length
    ) {
      setInvalidMaterialFormCreatePay([false]);
      setIsConfirmEdit(!isConfirmEdit);
      // onClickUpdateCreatePayment();
    } else {
      // if (!Object.keys(newArr[0]).length) {
      setInvalidMaterialFormCreatePay([true]);
      // }
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

  const onClickCancelPayment = () => {
    setIsConfirmCancelPayment(!isConfirmCancelPayment);
    var data = { ...editData };
    fnCancelPayment(data.paymentId);
  };

  const fnCancelPayment = (index) => {
    setIsPostingData(true);
    Repository.fetchCancelPaymentById(index, false).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsShowCancelPaymentSuccess(!isShowCancelPaymentSuccess);
        } else {
          setError(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setError(error);
      }
    );
  };

  const onClickCloseCancelPayment = () => {
    setIsShowCancelPaymentSuccess(!isShowCancelPaymentSuccess);
    window.location.reload(false);
  };

  const onClickUpdateCreatePayment = () => {
    /**1.General Information Input */
    // //console.log(selectItemsCreatePayment)
    var newEditData = { ...editData };
    //console.log(newEditData);
    var companyId = companyList[0].companyId;
    var venderId = selectItemsCreatePayment[0].transporterId;
    var taxId = selectItemsCreatePayment[0].taxNo
      ? selectItemsCreatePayment[0].taxNo
      : newEditData.taxNo;
    var branch = selectItemsCreatePayment[0].branchNo
      ? selectItemsCreatePayment[0].branchNo
      : newEditData.branchNo;
    var address = selectItemsCreatePayment[0].address
      ? selectItemsCreatePayment[0].address
      : newEditData.address;
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
    var serviceTeam = document.getElementById(
      "create-payment-serviceTeam"
    ).value;
    var vendorEmail = document.getElementById(
      "create-payment-vendorEmail"
    ).value;
    var nonpo = document.getElementById("create-payment-nonPo").checked;

    /**4.Tax Invoice */

    /**5.User Approval */
    var requestor = _Username;
    var reviewer = null;
    var cc = null;
    var ActualTotalVat = 0;
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

      obj.guid = x.guid ? x.guid : "00" + "-" + "0" + index;
      obj.fileData = x;

      newFileList.push(obj);
    });

    var newSupportFileList = [];
    console.log(supportfile);
    supportfile.map((x, index) => {
      var obj = {
        fileName: null,
        guid: null,
      };

      obj.guid = x.guid ? x.guid : "00" + "-" + "0" + index;
      obj.fileName = x.name ? x.name : x.fileName;

      newSupportFileList.push(obj);
    });

    var newObj = {
      paymentId: null,
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
      // createBy: null,
      // createDateTime: null,
      tpaymentItems: null,
      tpaymentReviewerAndCcs: null,
      tpaymentShipmentLists: null,
      tpaymentAttachFiles: null,
    };

    var tpaymentAttachFilesSupport = [];

    supportfile.map((y, index) => {
      var tpaymentAttachFilessub = {
        fileName: null,
        guid: null,
      };

      tpaymentAttachFilessub.fileName = y.fileName;
      tpaymentAttachFilessub.guid = "0" + 0 + "-" + "1" + index;

      tpaymentAttachFilesSupport.push(tpaymentAttachFilessub);
    });

    var fileList = {
      guid: null,
      fileData: null,
    };

    fileList.guid = null;
    fileList.fileData = null;

    var acsum = 0;
    var acVatsum = 0;
    invoiceItems.map((x, index) => {
      acsum = acsum + x.amount;
      acVatsum = acVatsum + x.vatAmount;
    });

    setActualAmount(acsum);
    setActualVat(acVatsum);

    var tpaymentItemsList = [];
    var totalsum = 0;
    var tpaymentAttachFiles = [];
    var tfiles = [];
    // //console.log(costItems);
    // //console.log(costItems.length);
    costItems.map((z) => {
      var tpaymentItems = {
        expenseCode: null,
        costCenterCode: null,
        internalOrderNumber: null,
        assignment: null,
        amount: null,
        tpaymentDocuments: [],
      };

      tpaymentItems.expenseCode = z.expenseCode;
      tpaymentItems.costCenterCode = z.costCenterCode;
      tpaymentItems.internalOrderNumber = z.internalOrderNumber;
      tpaymentItems.assignment = z.assignment;

      // tpaymentItemsList.push(tpaymentItems);
      //console.log(invoiceItems);
      var tpaymentDocumentsList = [];

      invoiceItems.map((x, indexmain) => {
        var tpaymentDocuments = {
          documentType: null,
          documentNo: null,
          documentDate: null,
          amount: null,
          reference1: null,
          tpaymentVatRate: {},
          tpaymentAttachFiles: [],
          tpaymentWhtrates: [],
        };

        tpaymentDocuments.documentType = x.documentType;
        tpaymentDocuments.documentNo = x.documentNo;
        tpaymentDocuments.documentDate = x.documentDate;
        tpaymentDocuments.reference1 = x.reference1;
        tpaymentDocuments.amount = x.amount;
        totalsum += parseFloat(x.amount);

        // //console.log(x.fileName);

        x.tpaymentAttachFiles.map((y, index) => {
          //console.log(y);
          var tpaymentAttachFilessub = {
            fileName: null,
            guid: null,
            // fileData: null,
          };

          tpaymentAttachFilessub.fileName = y.fileName ? y.fileName : y.name;
          tpaymentAttachFilessub.guid = y.guid
            ? y.guid
            : "0" + (indexmain + 1) + "-" + "1" + index;
          // tpaymentAttachFilessub.fileData = y;

          tpaymentAttachFiles.push(tpaymentAttachFilessub);

          tpaymentDocuments.tpaymentAttachFiles.push(tpaymentAttachFilessub);
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

        if (x.tpaymentVatRate.checkbox !== false) {
          tpaymentDocuments.tpaymentVatRate = x.tpaymentVatRate;
        }
        if (indexmain < 3) {
          if (x.tpaymentWhtrates[indexmain].checkbox !== false) {
            tpaymentDocuments.tpaymentWhtrates.push(
              x.tpaymentWhtrates[indexmain]
            );
          }
        }

        // tpaymentDocumentsList.push(tpaymentDocuments);
        if (z.runningNo.toString() === x.paymentRunNo.toString()) {
          // //console.log(z)

          tpaymentItems.tpaymentDocuments.push(tpaymentDocuments);
        }
      });
      tpaymentItems.amount = totalsum;

      tpaymentItemsList.push(tpaymentItems);
    });

    // console.log(userApproveListItems);
    // console.log(userReviewerListItems);
    // console.log(userCCListItems);

    var commituser = [
      { ...userApproveListItems },
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
      console.log(x);
      tpaymentReviewerAndCcsSub.type = x.type;
      tpaymentReviewerAndCcsSub.userName = x.userName;
      tpaymentReviewerAndCcsSub.ordinal = x.ordinal;
      console.log(tpaymentReviewerAndCcsSub);
      tpaymentReviewerAndCcs.push(tpaymentReviewerAndCcsSub);
    });

    var tpaymentShipment = [];
    shipmentData.map((x) => {
      var tpaymentShipmentLists = {
        shipmentNo: null,
      };
      tpaymentShipmentLists.shipmentNo = x.shipmentNo;

      tpaymentShipment.push(tpaymentShipmentLists);
    });

    newObj.paymentId = newEditData.paymentId;
    newObj.startDate = startDate;
    newObj.endDate = endDate;
    newObj.transporterId = selectItemsCreatePayment[0].transporterId
      ? selectItemsCreatePayment[0].transporterId
      : newEditData.transporterId;
    newObj.transporterCode = selectItemsCreatePayment[0].transporterCode
      ? selectItemsCreatePayment[0].transporterCode
      : newEditData.transporterCode;
    newObj.transporterName = selectItemsCreatePayment[0].transporterNameThai
      ? selectItemsCreatePayment[0].transporterNameThai
      : newEditData.transporterName;
    newObj.transporterEmail = selectItemsCreatePayment[0].email
      ? selectItemsCreatePayment[0].email
      : newEditData.transporterEmail;
    newObj.companyId = companyList[0].companyId;
    newObj.companyCode = companyList[0].companyCode;
    newObj.companyName = companyList[0].companyName;
    newObj.paymentTypeId = paymentType;
    newObj.bankName = selectItemsCreatePayment[0].bankName
      ? selectItemsCreatePayment[0].bankName
      : newEditData.bankName;
    newObj.accountNo = selectItemsCreatePayment[0].accountNo
      ? selectItemsCreatePayment[0].accountNo
      : newEditData.accountNo;
    newObj.placeCheque = selectItemsCreatePayment[0].placeCheque
      ? selectItemsCreatePayment[0].placeCheque
      : newEditData.placeCheque;
    newObj.creditTerm = selectItemsCreatePayment[0].creditTerm
      ? selectItemsCreatePayment[0].creditTerm
      : newEditData.creditTerm;
    newObj.price = totalAmount;
    newObj.refNo = "";
    newObj.allPayNo = null;
    newObj.taxId = taxId;
    newObj.branch = branch;
    newObj.address = address;
    newObj.grApprovefor = grApprovefor;
    newObj.subject = newEditData.subject;
    newObj.dueDate = newEditData.dueDate;
    newObj.currency = currency;
    newObj.paymentDescription = newEditData.paymentDescription;
    newObj.exchangeRate = 1;
    newObj.serviceTeamCode = serviceTeam;
    newObj.smpamount = newEditData.smpamount;
    newObj.smpvat = newEditData.smpvat;
    newObj.smptotalAmount = newEditData.smptotalAmount;
    newObj.actualAmount = acsum;
    newObj.actualVat = parseFloat(acVatsum);
    newObj.actualTotalAmount = parseFloat(acsum) + parseFloat(acVatsum);
    newObj.tpaymentItems = tpaymentItemsList;
    newObj.tpaymentReviewerAndCcs = tpaymentReviewerAndCcs;
    newObj.tpaymentShipmentLists = tpaymentShipment;
    // newObj.tpaymentAttachFiles = newSupportFileList;
    // newObj.tpaymentSupportFiles = newSupportFileList;

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

    // for (let i = 0; i < 2; i++) {
    //   var newListSup = {
    //     fileName: null,
    //     guid: null,
    //   };

    //   var newList = {
    //     guid: null,
    //     fileData: null,
    //   };
    //   if (i === 0) {
    //     newList.guid = "99-01";
    //     newList.fileData = FunctionController.convertDataToFile(
    //       fieldTransportRate2,
    //       FunctionController.setNumberValueInArray(
    //         fieldTransportRate2,
    //         shipmentData
    //       ),
    //       "ShipmentList"
    //     );

    //     newListSup.fileName = "ShipmentList.xlsx";
    //     newListSup.guid = "99-01";
    //   }
    //   if (i === 1) {
    //     newList.guid = "99-02";
    //     newList.fileData = FunctionController.convertDataToFile(
    //       fieldExtraCharge,
    //       FunctionController.setNumberValueInArray(
    //         fieldExtraCharge,
    //         extrachargeData
    //       ),
    //       "ExtraChargeList"
    //     );

    //     newListSup.fileName = "ExtraChargeList.xlsx";
    //     newListSup.guid = "99-02";
    //     newFileList.push(newList);
    //     newSupportFileList.push(newListSup);
    //   }
    // }

    newObj.tpaymentSupportFiles = newSupportFileList;

    console.log(shipmentIOList);

    console.log(newObj);
    console.log(newFileList);
    console.log(extrachargeData);

    fnEditCreatePayment(newObj, newFileList, shipmentIOList);
  };

  const onClickdowloadFile = () => {};

  const fileViews = () => {
    if (invoiceItems[indexFiles[0]]) {
      var lengthOfFile = invoiceItems[indexFiles[0]].tpaymentAttachFiles.length;

      var newArr = [];
      for (var i = 1; i <= lengthOfFile; i++) {
        newArr.push(
          <CRow style={{ display: "flex" }}>
            <CCol xs="12" sm="6" md="12">
              <CLabel
                id={"label-" + i}
                onClick={(e, value) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  console.log(index);
                  console.log(invoiceItems[indexFiles[0]].tpaymentAttachFiles);

                  if (!isNaN(index)) {
                    if (
                      invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                        .guid
                    ) {
                      var guid =
                        invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .guid;

                      console.log(guid);
                      var filename = invoiceItems[indexFiles[0]]
                        .tpaymentAttachFiles[index].fileName
                        ? invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                            .fileName
                        : invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                            .name;
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      // console.log(name);
                      // console.log(fileType);
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";
                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
                style={{ color: "#056776" }}
              >
                {i + "."}
                <BsFileEarmarkCheck
                  // block

                  className="text-center"
                  id={"icon-" + i}
                  style={{
                    width: "100px",
                    height: "100px",
                    color: "#056776",
                  }}
                >
                  {/* +Add */}
                </BsFileEarmarkCheck>
                {invoiceItems[indexFiles[0]].tpaymentAttachFiles[i - 1].fileName
                  ? invoiceItems[indexFiles[0]].tpaymentAttachFiles[i - 1]
                      .fileName
                  : invoiceItems[indexFiles[0]].tpaymentAttachFiles[i - 1].name}
              </CLabel>
              {"\xa0 \xa0 \xa0"}
              {isType === "add" ? (
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
              ) : (
                <div></div>
              )}
              {"\xa0 \xa0 \xa0"}
              <CButton
                id={"bt-" + i}
                color="info"
                onClick={(e, value) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  console.log(index);
                  console.log(invoiceItems[indexFiles[0]].tpaymentAttachFiles);

                  if (!isNaN(index)) {
                    if (
                      invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                        .guid
                    ) {
                      var guid =
                        invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .guid;

                      console.log(guid);
                      var filename = invoiceItems[indexFiles[0]]
                        .tpaymentAttachFiles[index].fileName
                        ? invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                            .fileName
                        : invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                            .name;
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      // console.log(name);
                      // console.log(fileType);
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";
                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
              >
                ดาวโหลดไฟล์
              </CButton>
            </CCol>
          </CRow>
        );
      }

      return <div>{newArr}</div>;
    }
  };

  const onClickRemoveRecordFile = (type, index) => {
    if (type === "fileView") {
      var newBrr = [...invoiceItems];
      console.log(newBrr[indexFiles[0]].tpaymentAttachFiles[index]);
      newBrr[indexFiles[0]].tpaymentAttachFiles.splice(index, 1);
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
    if (supportfile.length) {
      var lengthOfFile = supportfile.length;

      var newArr = [];
      for (var i = 1; i <= lengthOfFile; i++) {
        newArr.push(
          <CRow>
            <CCol xs="12" sm="6" md="12">
              <CLabel
                style={{ color: "#056776" }}
                id={"label-" + i}
                onClick={(e) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  console.log(index);
                  console.log(supportfile[index]);

                  if (!isNaN(index)) {
                    if (supportfile[index].guid) {
                      var guid = supportfile[index].guid;

                      console.log(guid);
                      var filename = supportfile[index].fileName
                        ? supportfile[index].fileName
                        : supportfile[index].name;
                      console.log(filename);
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      // console.log(name)
                      // console.log(fileType);
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";

                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
              >
                {i + "."}
                <BsFileEarmarkCheck
                  id={"icon-" + i}
                  className="text-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    color: "#056776",
                  }}
                >
                  {/* +Add */}
                </BsFileEarmarkCheck>
                {supportfile[i - 1].fileName
                  ? supportfile[i - 1].fileName
                  : supportfile[i - 1].name}
                {/* {supportfile[i - 1].fileName} */}
              </CLabel>
              {"\xa0 \xa0 \xa0"}

              {isType === "add" ? (
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
              ) : (
                <div></div>
              )}
              {"\xa0 \xa0 \xa0"}
              <CButton
                id={"bt-" + i}
                color="info"
                onClick={(e) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  console.log(index);
                  console.log(supportfile[index]);

                  if (!isNaN(index)) {
                    if (supportfile[index].guid) {
                      var guid = supportfile[index].guid;

                      console.log(guid);
                      var filename = supportfile[index].fileName
                        ? supportfile[index].fileName
                        : supportfile[index].name;
                      console.log(filename);
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      // console.log(name)
                      // console.log(fileType);
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";

                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
              >
                ดาวโหลดไฟล์
              </CButton>
            </CCol>
            {/* <CCol xs="1" sm="1" md="1">
           
            </CCol> */}
          </CRow>
        );
        // //console.log(newArr);
        // setItemList(newArr);
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
                        {fileViews()}
                        {/* </CFormGroup> */}
                      </CCol>
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
                        {SupportFileViews()}
                      </CFormGroup>
                    </CCol>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CForm>
          </CCard>
        </CForm>
      );
    } else if (type === "edit") {
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

                        {/* <CInputFile
                          class="form-control form-control-lg"
                          multiple
                          size="lg"
                          onChange={handleFileUploadInvoice}
                          id="file-input-invoice"
                          name="file-input-invoice"
                          style={{ display: "none" }}
                        /> */}

                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                        {fileViews()}
                        {/* </CFormGroup> */}
                      </CCol>
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

                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                        {SupportFileViews()}
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
      console.log(index);
      if (index < 3) {
        wht = wht + x.tpaymentWhtrates[index].vatAmount;
      }
    });
    sum = newArr[indexFiles[0]].amount - wht;

    if (type === "checkBox") {
      newArr[indexFiles[0]].tpaymentVatRate.checkbox = e.target.checked;
      if (e.target.checked === false) {
        newArr[indexFiles[0]].totalAmount = newArr[indexFiles[0]].amount;

        setTotalPrice(sum);
      } else {
        setTotalPrice(sum + newArr[indexFiles[0]].tpaymentVatRate.vatAmount);
        newArr[indexFiles[0]].totalAmount =
          newArr[indexFiles[0]].amount + newArr[indexFiles[0]].vatAmount;
      }
    }
    if (type === "vat") {
      newArr[indexFiles[0]].tpaymentVatRate.rate = parseFloat(e.target.value);
      newArr[indexFiles[0]].tpaymentVatRate.baseAmount =
        newArr[indexFiles[0]].amount;
      newArr[indexFiles[0]].tpaymentVatRate.vatAmount =
        newArr[indexFiles[0]].tpaymentVatRate.baseAmount *
        (newArr[indexFiles[0]].tpaymentVatRate.rate / 100);
    }

    if (type === "baseAmount") {
      if (parseInt(e.target.value) <= newArr[indexFiles[0]].amount) {
        newArr[indexFiles[0]].tpaymentVatRate.baseAmount = parseFloat(
          e.target.value
        );
      }

      newArr[indexFiles[0]].tpaymentVatRate.vatAmount =
        newArr[indexFiles[0]].tpaymentVatRate.baseAmount *
        (newArr[indexFiles[0]].tpaymentVatRate.rate / 100);
    }

    setInvoiceItems(newArr);
  };

  const onHandleChangeWhtRateNew = (type, id) => (e) => {
    var newArr = [...invoiceItems];
    var sum = 0;
    var indexItem = id;
    console.log(indexItem);
    var wht = 0;
    sum =
      newArr[indexFiles[0]].amount +
      newArr[indexFiles[0]].tpaymentVatRate.vatAmount;

    newArr[indexFiles[0]].tpaymentWhtrates.map((x) => {
      if (x.checkbox === true) {
        wht = wht + x.vatAmount;
      }
    });

    if (type === "checkBox") {
      newArr[indexFiles[0]].tpaymentWhtrates[indexItem].checkbox =
        e.target.checked;
      if (e.target.checked === true) {
        newArr[indexFiles[0]].totalAmount =
          sum -
          wht +
          newArr[indexFiles[0]].tpaymentWhtrates[indexItem].vatAmount;
        setTotalPrice(sum);
      } else {
        newArr[indexFiles[0]].tpaymentWhtrates[indexItem].vatAmount =
          (newArr[indexFiles[0]].tpaymentWhtrates[indexItem].baseAmount *
            newArr[indexFiles[0]].tpaymentWhtrates[indexItem].rate) /
          100;
        newArr[indexFiles[0]].totalAmount = sum - wht;
        setTotalPrice(
          sum + newArr[indexFiles[0]].tpaymentWhtrates[indexItem].vatAmount
        );
      }
    }
    if (type === "vat") {
      newArr[indexFiles[0]].tpaymentWhtrates[indexItem].rate = parseFloat(
        e.target.value
      );
      newArr[indexFiles[0]].tpaymentWhtrates[indexItem].baseAmount = newArr[
        indexFiles[0]
      ].tpaymentWhtrates[indexItem].baseAmount
        ? newArr[indexFiles[0]].tpaymentWhtrates[indexItem].baseAmount
        : newArr[indexFiles[0]].amount;

      newArr[indexFiles[0]].tpaymentWhtrates[indexItem].vatAmount =
        (newArr[indexFiles[0]].tpaymentWhtrates[indexItem].baseAmount *
          newArr[indexFiles[0]].tpaymentWhtrates[indexItem].rate) /
        100;
    }

    if (type === "baseAmount") {
      if (parseInt(e.target.value) <= newArr[indexFiles[0]].amount) {
        newArr[indexFiles[0]].tpaymentWhtrates[indexItem].baseAmount =
          parseFloat(e.target.value);
        newArr[indexFiles[0]].tpaymentWhtrates[indexItem].vatAmount =
          (newArr[indexFiles[0]].tpaymentWhtrates[indexItem].baseAmount *
            newArr[indexFiles[0]].tpaymentWhtrates[indexItem].rate) /
          100;
      }
    }

    setInvoiceItems(newArr);
  };

  const onHandleChangeWhtRate = (type) => (e) => {
    var newArr = [...invoiceItems];
    // var newArr = [...invoiceItems];
    var sum = 0;
    var wht = 0;
    sum =
      newArr[indexFiles[0]].amount +
      newArr[indexFiles[0]].tpaymentVatRate.vatAmount;

    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].tpaymentWhtrates.map((x) => {
      wht = wht + x.vatAmount;
    });

    newArr[indexFiles[0]].totalAmount = sum - wht;

    if (type === "checkBox") {
      console.log(newArr[indexFiles[0]]);

      newArr[indexFiles[0]].tpaymentWhtrates[0].checkbox = e.target.checked;
      if (e.target.checked === false) {
        setTotalPrice(sum);
      } else {
        setTotalPrice(
          sum - newArr[indexFiles[0]].tpaymentWhtrates[0].vatAmount
        );
      }
    }
    if (type === "vat") {
      newArr[indexFiles[0]].tpaymentWhtrates[0].rate = parseFloat(
        e.target.value
      );

      newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount = newArr[
        indexFiles[0]
      ].tpaymentWhtrates[0].baseAmount
        ? newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount
        : newArr[indexFiles[0]].amount;

      newArr[indexFiles[0]].tpaymentWhtrates[0].vatAmount =
        (newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount *
          newArr[indexFiles[0]].tpaymentWhtrates[0].rate) /
        100;
    }

    if (type === "baseAmount") {
      if (parseInt(e.target.value) <= newArr[indexFiles[0]].amount) {
        newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount = parseFloat(
          e.target.value
        );
        newArr[indexFiles[0]].tpaymentWhtrates[0].vatAmount =
          (newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount *
            newArr[indexFiles[0]].tpaymentWhtrates[0].rate) /
          100;
      }
    }

    setInvoiceItems(newArr);

    //console.log(newArr);
  };

  const sumtotalprice = () => {
    console.log("invoiceItems", invoiceItems);
    var sum = 0;
    var vat = 0;
    var wht = 0;
    invoiceItems.map((x) => {
      if (x.documentTypeId === "05") {
        sum = sum - x.totalAmount;
      } else {
        sum = sum + x.totalAmount;
      }
    });

    setTotalPrice(sum);
  };

  const setSumTotalPrice = (e) => {
    var newArr = [...invoiceItems];
    //console.log(e.target.value);
    var sum = 0;
    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].totalAmount =
      newArr[indexFiles[0]].amount +
      newArr[indexFiles[0]].tpaymentVatRate.vatAmount;

    newArr[indexFiles[0]].vatAmount =
      newArr[indexFiles[0]].tpaymentVatRate.vatAmount;
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
      newArr[indexFiles[0]].tpaymentVatRate.vatAmount;

    // var newBrr = [...invoiceItems];
    newArr[indexFiles[0]].tpaymentWhtrates.map((x) => {
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
      //console.log(invoiceItems.length);
      //console.log(Object.keys(indexFiles[0]).length);
      if (invoiceItems.length && isShowDialogVat) {
        var newArr = [...invoiceItems];
        //console.log(indexFiles[0]);
        //console.log(newArr[indexFiles[0]]);
        var wht = 0;
        var checkBox = false;
        var checkBoxWht = false;
        newArr.map((x) => {
          if (x.tpaymentVatRate) {
            // x.tpaymentVatRate.checkbox = true;
            // checkBox = x.tpaymentVatRate.checkbox;
          }

          if (x.tpaymentWhtrates) {
            x.tpaymentWhtrates.map((y) => {
              wht = wht + y.vatAmount;
            });
          }
        });

        var vat =
          newArr[indexFiles[0]].tpaymentVatRate.vatAmount !== null
            ? newArr[indexFiles[0]].tpaymentVatRate.vatAmount
            : 0;

        var totalAmonts = newArr[indexFiles[0]].amount + vat - wht;

        var baseAmountVat = 0;
        if (newArr[0].tpaymentVatRate.baseAmount) {
          baseAmountVat = newArr[indexFiles[0]].tpaymentVatRate.baseAmount;
        } else {
          baseAmountVat = newArr[indexFiles[0]].amount;
        }

        var baseAmount = 0;
        if (newArr[indexFiles[0]].tpaymentWhtrates[0]) {
          if (newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount) {
            baseAmount = newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount;
          } else {
            baseAmount = newArr[indexFiles[0]].amount;
          }
        }

        // setInvoiceItems(newArr)

        return (
          <CForm>
            <CCard color="gradient-secondary" className="color-card-gra p-3">
              <CForm className="header-need-validation">
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
                            {
                              maximumFractionDigits: 2,
                            }
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
                                newArr[indexFiles[0]].tpaymentVatRate.checkbox
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
                                    !newArr[indexFiles[0]].tpaymentVatRate
                                      .checkbox
                                  }
                                  onChange={onHandleChangeVat("vat")}
                                  onBlur={setSumTotalPrice}
                                  value={
                                    newArr[indexFiles[0]].tpaymentVatRate.rate
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
                                  id="add-vat-baseAmount"
                                  placeholder=""
                                  maxLength="255"
                                  type="number"
                                  onBlur={setSumTotalPrice}
                                  onChange={onHandleChangeVat("baseAmount")}
                                  disabled={
                                    !newArr[indexFiles[0]].tpaymentVatRate
                                      .checkbox
                                  }
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
                                  ].tpaymentVatRate.vatAmount.toLocaleString(
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
                      {whtBox1()}
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

  const sumtotalpriceVat = () => {
    var newArr = [...invoiceItems];
    // //console.log(e.target.value);
    var sum = 0;
    var vat = 0;
    var wht = 0;
    if (newArr[indexFiles[0]].tpaymentVatRate.checkbox === true) {
      vat = newArr[indexFiles[0]].tpaymentVatRate.vatAmount;
    }

    newArr[indexFiles[0]].tpaymentWhtrates.map((x) => {
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

  const whtBox1 = () => {
    if (invoiceItems[indexFiles[0]]) {
      var newArr = [...invoiceItems];
      var baseAmount = 0;
      // var vatAmount = newArr[indexFiles[0]].tpaymentWhtrates[0].vatAmount
      //   ? newArr[indexFiles[0]].tpaymentWhtrates[0].vatAmount
      //   : 0;
      // var rate = newArr[indexFiles[0]].tpaymentWhtrates[0].rate
      //   ? newArr[indexFiles[0]].tpaymentWhtrates[0].rate
      //   : 0;
      if (newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount) {
        baseAmount = newArr[indexFiles[0]].tpaymentWhtrates[0].baseAmount;
      } else {
        baseAmount = newArr[indexFiles[0]].amount;
      }

      var id = 0;
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
                onChange={onHandleChangeWhtRate("checkBox")}
                checked={newArr[indexFiles[0]].tpaymentWhtrates[0].checkbox}
                onBlur={setSumWhtTotalPrice(0)}
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
                      !newArr[indexFiles[0]].tpaymentWhtrates[0].checkbox
                    }
                    onBlur={setSumWhtTotalPrice(0)}
                    onChange={onHandleChangeWhtRate("vat")}
                    value={newArr[indexFiles[0]].tpaymentWhtrates[0].rate}
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
                    onChange={onHandleChangeWhtRate("baseAmount")}
                    type="number"
                    id="wht-baseAmount"
                    onBlur={setSumWhtTotalPrice(0)}
                    value={baseAmount}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[0].checkbox
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
                    value={newArr[indexFiles[0]].tpaymentWhtrates[0].vatAmount}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[0].checkbox
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

  const whtBox2 = () => {
    if (invoiceItems[indexFiles[0]].tpaymentWhtrates[1]) {
      var newArr = [...invoiceItems];
      var baseAmount = 0;
      if (newArr[indexFiles[0]].tpaymentWhtrates[1].baseAmount) {
        baseAmount = newArr[indexFiles[0]].tpaymentWhtrates[1].baseAmount;
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
                checked={newArr[indexFiles[0]].tpaymentWhtrates[id].checkbox}
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
                    value={newArr[indexFiles[0]].tpaymentWhtrates[id].rate}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[id].checkbox
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
                    value={baseAmount}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[id].checkbox
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
                    value={newArr[indexFiles[0]].tpaymentWhtrates[id].vatAmount}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[id].checkbox
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
    if (invoiceItems[indexFiles[0]].tpaymentWhtrates[2]) {
      var newArr = [...invoiceItems];
      var baseAmount = 0;
      if (newArr[indexFiles[0]].tpaymentWhtrates[2].baseAmount) {
        baseAmount = newArr[indexFiles[0]].tpaymentWhtrates[2].baseAmount;
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
                checked={newArr[indexFiles[0]].tpaymentWhtrates[2].checkbox}
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
                    value={newArr[indexFiles[0]].tpaymentWhtrates[id].rate}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[id].checkbox
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
                    value={baseAmount}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[id].checkbox
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
                    value={newArr[indexFiles[0]].tpaymentWhtrates[id].vatAmount}
                    disabled={
                      !newArr[indexFiles[0]].tpaymentWhtrates[id].checkbox
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
    var newObj = { ...selectItems };
    var newMain = { ...baseItems };

    newObj[index].isChecked = e.target.checked;
    newMain[index].isChecked = e.target.checked;

    setBaseItems(newMain);
    setSelectitems(newObj);
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

  const handleChangeSelectCreatePaymentAuto = (values) => {
    //console.log(values);
    var newArr = [...selectItemsCreatePayment];
    var newShowData = { ...editData };
    if (getHasObjectValue(values)) {
      newArr[0] = values;
      newShowData.taxNo = values.taxNo;
      newShowData.branchNo = values.branchNo;
      newShowData.address = values.address;
      setEditData(newShowData);
    } else {
      newArr[0] = {};
    }

    // //console.log(newArr);

    setSelectItemsCreatePayment(newArr);
  };

  const handleChangeSelectCreatePayment = (type) => (e, values) => {
    //console.log(values);
    var newArr = [...selectItemsCreatePayment];
    setInvalidMaterialFormCreatePay([false]);
    var newShowData = { ...editData };
    if (type === "transporter") {
      if (getHasObjectValue(values)) {
        newArr[0] = values;
        newShowData.taxNo = values.taxNo;
        newShowData.branchNo = values.branchNo;
        newShowData.address = values.address;
        setEditData(newShowData);
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
      if (getHasObjectValue(values)) {
        newArr[4] = values;
      } else {
        newArr[4] = {};
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
        obj.firstName =
          "[" +
          values.aliasName +
          "]" +
          "" +
          values.firstName +
          values.lastName;
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
        obj.firstName =
          "[" +
          values.aliasName +
          "]" +
          "" +
          values.firstName +
          values.lastName;
        obj.lastName = values.lastName;
        obj.aliasName = values.aliasName;

        newArr.push(obj);

        setUserCCListItems(newArr);
      }

      if (type === "approve") {
        var newArr = {};
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
        obj.firstName =
          "[" +
          values.aliasName +
          "]" +
          "" +
          values.firstName +
          values.lastName;
        obj.lastName = values.lastName;
        obj.aliasName = values.aliasName;

        // newArr.push(obj);

        setUserApproveListItems(obj);
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
    if (Object.keys(newArr[1]).length || roleUser == trstCode) {
      setInvalidMaterialFormSearch([false]);
      if (isPass) {
        setCollsFormSearch(false);
        onClickSearchData();
      } else {
        setBaseItems([]);
      }
    } else {
      setInvalidMaterialFormSearch([true]);
      setBaseItems([]);
    }
  };

  const onClickClearData = () => {
    document.getElementById("search-datestart").value = "";
    document.getElementById("search-dateend").value = "";
    // document.getElementById("search-monthyear").value = "";
    document.getElementById("search-refdoc").value = "";
    document.getElementById("search-allPayNo").value = "";
    // document.getElementById("search-saleorderno").value = "";
    // document.getElementById("search-shipmentstatus").selectedIndex = 0;
    // document.getElementById("search-edpstatus").selectedIndex = 0;
    // document.getElementById("search-summarystatus").selectedIndex = 0;
  };

  const onClickSearchData = () => {
    var arrSelect = [...selectItemsSearch];
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var duedate = document.getElementById("search-dueDate").value;
    var monthyear = "";
    var refdoc = document.getElementById("search-refdoc").value;
    var paymentNo = document.getElementById("search-paymentNo").value;
    var allPayNo = document.getElementById("search-allPayNo").value;

    var saleOrderNo = "";
    var companyId = getHasObjectValue(arrSelect[4])
      ? arrSelect[4].companyId
      : null;
    var sourceId = getHasObjectValue(arrSelect[0])
      ? arrSelect[0].sourceId
      : null;
    var transporterId = null;
    if (roleUser === empCode) {
      transporterId = getHasObjectValue(arrSelect[1])
        ? arrSelect[1].transporterId
        : null;
    } else if (roleUser === trstCode) {
      transporterId = _TranspoterId;
    }
    var truckTypeId = getHasObjectValue(arrSelect[2])
      ? arrSelect[2].truckTypeId
      : null;
    // var edpStatus = document.getElementById("search-edpstatus").value;
    // var shipmentStatus = document.getElementById("search-shipmentstatus").value;
    var paymentStatus = getHasObjectValue(arrSelect[3])
      ? arrSelect[3].displayMember
      : null;
    // var summaryStatus = parseInt(
    //   document.getElementById("search-summarystatus").value
    // );

    // var paymentNo = null;
    var refNo = null;
    var isTransfer = true;
    // var allPayNo = null

    dateStart = dateStart !== "" ? dateStart : null;
    dateEnd = dateEnd !== "" ? dateEnd : null;
    monthyear = monthyear !== "" ? monthyear : null;
    refdoc = refdoc !== "" ? refdoc : null;
    allPayNo = allPayNo !== "" ? allPayNo : null;
    paymentNo = paymentNo !== "" ? paymentNo : null;
    duedate = duedate !== "" ? duedate : null;

    var newArr = [
      dateStart,
      dateEnd,
      transporterId,
      paymentNo,
      refdoc,
      allPayNo,
      paymentStatus,
      companyId,
      duedate,
      isTransfer,
    ];

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

  const onClickSendToAllPay = (item) => (e) => {
    setAllpayId(item);
    console.log(item);
    if (
      item.actualAmount === FunctionController.setNumberValue(item.smpamount)
    ) {
      if (item.actualVat !== item.smpvat) {
        if (item.attachFileStatus === "Complete") {
          setIsVatNotEqual(!isVatNotEqual);
        } else {
          setIsNotApprove(!isNotApprove);
        }
      } else {
        if (item.attachFileStatus === "Complete") {
          setIsShowConfirmSend(!isShowConfirmSend);
        } else {
          setIsNotApprove(!isNotApprove);
        }

        // fnSendToAllPay(item.paymentId);
      }
    } else {
      setIsTotalError(!isTotalError);
    }
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

  const fnfetchVerifyPaymentList = (id) => (e) => {
    if (roleUser === trstCode) {
      console.log("payment", id);
      setIsPostingData(true);
      Repository.fetchAcceptPaymentList(id).then(
        (result) => {
          setIsPostingData(false);

          if (result.httpCode === "200") {
            setIsApproveAllpay(!isApproveAllpay);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setIsPostingData(false);
          setErrorAPI(error);
        }
      );
    } else if (roleUser === empCode) {
      var item = { ...editData };
      console.log("item", item);
      //Approve payments
      if (
        item.actualAmount ===
          FunctionController.setNumberValue(item.smpamount) &&
        item.tpaymentItems[0].tpaymentDocuments.length
      ) {
        console.log("payment", id);
        setIsPostingData(true);
        Repository.fetchVerifyPaymentList(id).then(
          (result) => {
            setIsPostingData(false);

            if (result.httpCode === "200") {
              setIsApproveAllpay(!isApproveAllpay);
            } else {
              setErrorAPI(result);
            }
          },
          (error) => {
            setIsPostingData(false);
            setErrorAPI(error);
          }
        );
      } else {
        setIsCannotSendToApp(!isCannotSendToApp);
      }
    }
  };

  const fnGetDataList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetTransfersForCreatePaymentListView(arrData).then(
      (result) => {
        setIsPostingData(false);
        // //console.log()
        if (result.httpCode === "200") {
          //console.log(result.data);
          setBaseItems(
            FunctionController.setCurrencyAndEmptyValueInArray(
              fieldMain,
              result.data
            )
          );
          // setBaseItems(
          //   FunctionController.setEmptyValueInArray(
          //     result.data
          //   )
          // );
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

  const fnCreateDoc = (arr, smpNo, name) => {
    setIsPostingData(true);
    setIsVatNotEqual(false);

    var newShowData = { ...editData };
    var paymentId = newShowData.paymentId;

    Repository.fetchGetCoverPageData(paymentId, true).then(
      (result) => {
        console.log("result", result);
        // setIsPostingData(false);
        if (result.httpCode === "200") {
          console.log("result", result.data);

          const toDay = new Date();

          var subject = document.getElementById("create-payment-subject").value;
          // const toDay = new Date();
          var newDoc = {
            createDate: toDay,
            toName: "",
            fromName: _aliasName,
            subject: subject,
            transporterName: newShowData.transporterName,
            smpNo: newShowData.paymentNo,
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

          if (shipmentData.length) {
            shipmentData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          } else if (extrachargeData.length && !shipmentData.length) {
            extrachargeData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          }

          newBaseItem.map((x) => {
            _sumQty += x.qty;
            newDeliveryList.push(x.deliveryNo);

            // newShipmentList.push(x.shipmentNo);
            newSaleOrderList.push(x.saleOrderNo);
          });

          var countDelivery = [...new Set(newDeliveryList)].length;
          var countShipment = [...new Set(newShipmentList)].length;
          var countSaleOrder = [...new Set(newSaleOrderList)].length;

          console.log("countDelivery", countDelivery);
          console.log("countShipment", countShipment);
          console.log("countSaleOrder", countSaleOrder);

          newDoc.sumQty = result.data.summaryQty;
          newDoc.sumSaleOrder = result.data.summarySaleOrder;
          newDoc.sumShipment = countShipment;
          newDoc.sumDelivery = result.data.summaryDelivery;
          newDoc.sumAmount = totalAmount;
          // totalAmount;
          newDoc.toName = userApproveListItems.aliasName;

          // Render to View PDF
          // console.log("newDoc", newDoc);
          // FunctionController.renderPDF(newDoc);

          // console.log(newDoc);

          // Convert PDF to File in Variable
          FunctionController.convertPDFToFile(
            newDoc,
            "Cover Sheet",
            false
          ).then((result) => {
            setIsConfirmSave(!isConfirmSave);
            Repository.fetchCreateDoc(
              result,
              newDoc.smpNo,
              "Cover Sheet.pdf"
            ).then(
              (result) => {
                setIsConfirmSave(false);
                setIsShowConfirmSend(false);
                if (result.httpCode === "200") {
                  // window.location.reload(false);
                  // setAllPayNo(result.data);
                  fnSendToAllPay(paymentId);
                } else setErrorAPI(result);
              },
              (error) => {
                setIsPostingData(false);
                setErrorAPI(error);
              }
            );
          });
        }
      },
      (error) => {
        setIsPostingData(false);
        // setErrorAPI(error);
      }
    );
  };

  const fnCreateDocManual = (arr, smpNo, name) => {
    setIsPostingData(true);
    setIsConfirmsManualDoc(false);
    setIsVatNotEqual(false);

    var newShowData = { ...editData };
    var paymentId = newShowData.paymentId;

    Repository.fetchGetCoverPageData(paymentId, true).then(
      (result) => {
        console.log("result", result);
        // setIsPostingData(false);
        if (result.httpCode === "200") {
          console.log("result", result.data);

          const toDay = new Date();

          var subject = document.getElementById("create-payment-subject").value;
          // const toDay = new Date();
          var newDoc = {
            createDate: toDay,
            toName: "",
            fromName: _aliasName,
            subject: subject,
            transporterName: newShowData.transporterName,
            smpNo: newShowData.paymentNo,
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

          if (shipmentData.length) {
            shipmentData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          } else if (extrachargeData.length && !shipmentData.length) {
            extrachargeData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          }

          newBaseItem.map((x) => {
            _sumQty += x.qty;
            newDeliveryList.push(x.deliveryNo);

            // newShipmentList.push(x.shipmentNo);
            newSaleOrderList.push(x.saleOrderNo);
          });

          var countDelivery = [...new Set(newDeliveryList)].length;
          var countShipment = [...new Set(newShipmentList)].length;
          var countSaleOrder = [...new Set(newSaleOrderList)].length;

          console.log("countDelivery", countDelivery);
          console.log("countShipment", countShipment);
          console.log("countSaleOrder", countSaleOrder);

          newDoc.sumQty = result.data.summaryQty;
          newDoc.sumSaleOrder = result.data.summarySaleOrder;
          newDoc.sumShipment = countShipment;
          newDoc.sumDelivery = result.data.summaryDelivery;
          newDoc.sumAmount = totalAmount;
          // totalAmount;
          newDoc.toName = userApproveListItems.aliasName;

          // Render to View PDF
          // console.log("newDoc", newDoc);
          // FunctionController.renderPDF(newDoc);

          // console.log(newDoc);

          // Convert PDF to File in Variable
          FunctionController.convertPDFToFile(
            newDoc,
            "Cover Sheet",
            false
          ).then((result) => {
            setIsConfirmSave(!isConfirmSave);
            Repository.fetchCreateDoc(
              result,
              newDoc.smpNo,
              "Cover Sheet.pdf"
            ).then(
              (result) => {
                setIsConfirmSave(false);
                setIsShowConfirmSend(false);
                if (result.httpCode === "200") {
                  // isConfirmsManualDoc(!isConfirmsManualDoc);
                  // setAllPayNo(result.data);
                  // fnSendToAllPay(paymentId);
                } else setErrorAPI(result);
              },
              (error) => {
                setIsPostingData(false);
                setErrorAPI(error);
              }
            );
          });
        }
      },
      (error) => {
        setIsPostingData(false);
        // setErrorAPI(error);
      }
    );
  };

  const fnSendToAllPay = (paymentId) => {
    // setIsPostingData(true);
    Repository.fetchTransferSendToAllPay(paymentId).then(
      (result) => {
        setIsPostingData(false);
        // //console.log()
        if (result.httpCode === "200") {
          setIsAllPayCom(!isAllPayCom);
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

  const fnGetDataPaymentListById = (paymentId, type) => {
    setIsPostingData(true);
    Repository.fetchGetCreatPaymentById(paymentId).then(
      (result) => {
        setIsPostingData(false);

        if (result.httpCode === "200") {
          console.log(result.data);

          if (
            _UserId === result.data.paymentHeader.createBy ||
            result.data.paymentHeader.transporterId === _TranspoterId ||
            _UserId === 1
          ) {
            setEditData({ ...result.data.paymentHeader });
            setExtraChargeData(
              FunctionController.setEmptyValueInArray(
                result.data.extraChargeList
              )
            );

            setShipmentData(
              FunctionController.setEmptyValueInArray(
                result.data.ttransferTransportRate
              )
            );
            setTotalPrice(result.data.paymentHeader.actualTotalAmount);
            setTotalAmount(result.data.paymentHeader.smpamount);
            // GetUserApproveList(result.data.paymentHeader.smptotalAmount);
            var newCC = [];
            var newRe = [];
            var newAp = null;
            // setUserApproveListItems(newAp);
            result.data.paymentHeader.tpaymentReviewerAndCcs.map((x) => {
              if (x.type === "3") {
                if (userReviewerListItems.length) {
                  newRe = [...userReviewerListItems];
                }
                x.firstName = "[" + x.userName + "]" + "" + x.aliasName;
                newRe.push(x);
              }
              if (x.type === "2") {
                if (userCCListItems.length) {
                  newCC = [...userCCListItems];
                }
                x.firstName = "[" + x.userName + "]" + "" + x.aliasName;
                newCC.push(x);
              }
              if (x.type === "1") {
                console.log(x);
                if (x) {
                  //console.log(x)
                  setUserApproveListItems(x);
                  console.log(x);
                  console.log(userApproveListItems);
                }
              }
            });

            setUserReviewerListItems(newRe);
            setUserCCListItems(newCC);
            funOpenEdit(type);
          } else {
            setIsNotUserCreate(!isNotUserCreate);
          }
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
    Repository.fetchGetDomDeliveryListById(arrData).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setItems(result.data.paymentHeader);
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

  const fnGetReCalTransportRate = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetReCalculateTransportRate(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setTransportRateList(
            FunctionController.setEmptyValueInArray(
              result.data.transportRateList
            )
          );
          setTotalPriceTransportRate(result.data.totalPriceTransportRate);
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
          setExtraChargeNameList(result.data);
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

  const fnEditCreatePayment = (
    newArrHeader,
    newArrFileList,
    shipmentIOList
  ) => {
    setIsPostingData(true);
    setIsConfirmEdit(!isConfirmEdit);
    Repository.fetchEditCreatePayment(
      newArrHeader,
      newArrFileList,
      shipmentIOList
    ).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsEditComplete(!isEditComplete);
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
    Repository.fetchAddShipmentExtraChargeList(arrData).then(
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

  const fnDownloadFile = (streamFile, fileType, typeName, name) => {
    console.log(streamFile);
    console.log(fileType);
    console.log(typeName);
    setIsPostingData(true);
    Repository.fetchCreatePaymentDownloadFile(streamFile, fileType, name).then(
      (result) => {
        setIsPostingData(false);
        if (result.status === 200) {
          result.blob().then((blob) => {
            if (typeName === "image") {
              setShowFileImage(blob);
            } else if (typeName === "file") {
              console.log(typeName);
              setDownloadFile(blob, name, fileType);
            }
          });
        } else {
          // setErrorAPI("ไม่สามารถดาวน์โหลดไฟล์ได้");
        }
      },
      (error) => {
        setIsPostingData(false);
        // setErrorAPI(error);
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
            console.log(result.data);

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
    if (VariableController.linkShipmentNo !== null) {
      setIsLoaded(true);
      var newArr = [VariableController.linkShipmentNo];

      fnGetDataListById(newArr);
      setisShowDialogEdit(true);
    } else {
      fnGetStartEndDate();
    }
  };

  const fnGetShipmentDataForPayment = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetShipmentDataForPayment(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          // //console.log(result.data);

          setShipmentData(
            FunctionController.setEmptyValueInArray(result.data.shipmentList)
          );
          setExtraChargeData(
            FunctionController.setEmptyValueInArray(result.data.extraChargeList)
          );
          setAmount(result.data.amount);
          setVatAmount(result.data.vatAmount);
          setTotalAmount(result.data.totalAmount);
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
    var TransporterId = null;
    if (roleUser == trstCode) {
      TransporterId = _TranspoterId;
    } else {
      TransporterId = selectItemsSearch[1].transporterId;
    }
    Repository.fetchTransporterListByMain(TransporterId).then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setTransportByMain(result.data);
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

  const fnGetCompanyCost = () => {
    // if(!cbCompanyCost){
    //   if(baseItems[0].companyId.length){
    Repository.fetchGetCompanyCostList(baseItems[0].companyId).then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbCompanyCost(result.data);
          //console.log(result.data);
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

  const fnGetDataListUser = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetUserList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setUserItems(FunctionController.setEmptyValueInArray(result.data));
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

  useEffect(() => {
    fnGetDataListUser();
    GetUserApproveList();
    GetUserCCList();
    GetUserReviewerList();
    fnGetCbGetVat();
    fnGetCbWhtRates();
    fnGetCbLocationCode();
    fnGetCbDocumentType();
    fnGetCbServiceTeam();
    fnGetCbPaymentType();
    fnCheckUserAuth();
    fnGetCbGrApprove();
    fnGetCbCurrencyType();
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
    var txtLoadDate = setFormatDate(newObj.deliveryDate);
    var txtShipmentNo = newObj.shipmentNo ? newObj.shipmentNo : "";
    var txtDeliveryMode = newObj.deliveryMode ? newObj.deliveryMode : "";
    var txtTruckType = newObj.truckTypeName
      ? setFormatCodeText(newObj.truckTypeCode, newObj.truckTypeName)
      : "";
    var txtTransporter = newObj.transporterNameThai
      ? setFormatCodeText(newObj.transporterCode, newObj.transporterNameThai)
      : "";
    var txtTruckLicense = newObj.truckLicense ? newObj.truckLicense : "";
    var txtSource = newObj.sourceNameThai
      ? setFormatCodeText(newObj.sourceCode, newObj.sourceNameThai)
      : "";
    var txtShipTo = newObj.shipToNameThai
      ? setFormatCodeText(newObj.shipToCode, newObj.shipToNameThai)
      : "";
    var txtProvince = newObj.provinceName1 ? newObj.provinceName1 : "";
    var txtCreditDebitStatus = newObj.creditDebitStatus
      ? newObj.creditDebitStatus
      : "";
    var txtShipmentStatus = newObj.shipmentStatus ? newObj.shipmentStatus : "";
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
                    <CLabel>{Constant.arrFieldTransDomDeliveryMain[7]}</CLabel>
                    <CInput type="text" value={txtDeliveryMode} />
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
              <CRow className="justify-content-center m-4">
                <CCard>
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
              </CRow>
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
                <CRow className="justify-content-center m-4">
                  <CCard>
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
                </CRow>
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
                  <option selected hidden value={item.shipmentStatus}>
                    {item.shipmentStatus}
                  </option>
                  {shipmentStatusList.map((x) => (
                    <option value={x.displayMember}>{x.displayMember}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
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
            </CCol>
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
              <CInput type="text" value={item.shipmentStatus} />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CLabel>{Constant.arrFieldTransDomDeliveryMain[10]}</CLabel>
              <CInput type="text" value={item.edpstatus} />
            </CFormGroup>
          </CCol>
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
          <CCard>
            <CCardBody>
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
            </CCardBody>
          </CCard>
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
                            {Constant.arrFieldTransDomDeliverySearch[0]}
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
                            {Constant.arrFieldTransDomDeliverySearch[1]}
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
                <CCol xs="6" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="cvv">Due Date</CLabel>
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
                      <CInput
                        size="xs"
                        type="date"
                        id="search-dueDate"
                        // required
                        // value={endDate}
                        // onChange={(e) => setEndDate(e.target.value)}
                        // invalid={invalidFormSearch[1]}
                      />
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
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
                    <CFormGroup>
                      <CLabel htmlFor="name">Company</CLabel>
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
                    <CLabel htmlFor="cvv">Mode</CLabel>
                    {/* <CInput size="xs" type="date" style={{ height: Constant.styleHeightField }} id="search-header-year" name="date-input" placeholder="date" required /> */}
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
                        disabled
                        // style={{ height: Constant.styleHeightField }}
                      >
                        <option selected value="">
                          Domestic
                        </option>
                      </CSelect>
                    </Box>
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="6" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">All Pay No</CLabel>
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
                          id="search-allPayNo"
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
                      <CLabel htmlFor="name">Ref No</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="search-refdoc" maxLength="20" />
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
                      <CLabel htmlFor="name">Payment No</CLabel>
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
                          id="search-paymentNo"
                          maxLength="20"
                        />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullSelected}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CFormGroup>
                </CCol>
                {/* <CCol xs="6" sm="6" md="3">
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
                </CCol> */}
                {/* <CCol xs="6" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.arrFieldTransDomDeliveryMain[10]}
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
                          className=" form-control"
                          id="search-edpstatus"
                          onClick={fnGetEDPStatusNameOnlyList}
                        >
                          <option selected hidden value="">
                            {Constant.txtformPlaceholderSelected}
                          </option>
                          <option value="">
                            {Constant.txtFormAllSelected}
                          </option>
                          {edpStatusList.map((x) => (
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
                </CCol> */}
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
                          getOptionLabel={(option) => `${option.displayMember}`}
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
              </CRow>

              {/* <CRow className="ml-2 mr-2 p-0">
                <CCol xs="6" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.arrFieldTransExpDeliverySearch[3]}
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
                          className=" form-control"
                          id="search-summarystatus"
                          onClick={fnGetSummaryStatusNameOnlyList}
                        >
                          <option selected hidden value="">
                            {Constant.txtformPlaceholderSelected}
                          </option>
                          <option value="">
                            {Constant.txtFormAllSelected}
                          </option>
                          {summaryStatusList.map((x) => (
                            <option value={x.valueMember}>
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
              </CRow> */}
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

  const showInputLocation = () => {
    if (Object.keys(editData).length) {
      var newShowData = { ...editData };
      // //console.log(baseItems[0].transporterId);
      // //console.log(createPayment);
      var paymentTypeCode = newShowData.paymentTypeId;
      // //console.log(paymentTypeCode);
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
          <CCol xs="12" sm="6" md="6">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Location</CLabel>
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
                    id="create-payment-LocationCode"
                    value={newShowData.placeCheque}
                    disabled
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
      } else {
        return (
          <CCol xs="12" sm="6" md="6">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Location</CLabel>
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
                    id="create-payment-LocationCode"
                    disabled
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
    }
  };

  const showInputServiceTeam = () => {
    // //console.log(baseItems[0].transporterId);
    // if (Object.keys(editData).length) {
    //   var newShowData = { ...editData };
    if (Object.keys(editData).length) {
      var newShowData = { ...editData };
      // var serviceTeamItems = newShowData.serviceTeamCode;
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
                    onChange={onHandleChangeEdit("serviceTeam")}
                    value={newShowData.serviceTeamCode}
                    disabled={isEdit}
                    required
                  >
                    <option selected hidden value="">
                      Please Select Service Team
                    </option>
                    {serviceTeam.map((cb) => (
                      <option value={cb.valueMember}>
                        {cb.displayMember}{" "}
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
        );
      } else {
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
                    onChange={onHandleChangeEdit("serviceTeam")}
                    value={newShowData.serviceTeamCode}
                    disabled={isEdit}
                    required
                  >
                    <option selected hidden value="">
                      Please Select Service Team
                    </option>
                    {serviceTeam.map((cb) => (
                      <option value={cb.valueMember}>
                        {cb.displayMember}{" "}
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
        );
      }
    }
  };

  const showInputCompanyList = () => {
    // if (roleUser === empCode) {
    return (
      <Autocomplete
        id="search-Company"
        size="small"
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
              // error={invalidMaterialFormSearch[0]}
              {...params}
              onClick={fnBaseGetCompanyList}
              label={
                <Typography className={classes.autoCompleteInputLabel}>
                  {Constant.txtformPlaceholderSelected}
                </Typography>
              }
              // helperText={
              //   invalidMaterialFormSearch[0] ? (
              //     <Typography className={classes.autoCompleteInputHelperText}>
              //       {Constant.inValidNullMessage}
              //     </Typography>
              //   ) : null
              // }
              variant="outlined"
            />
          );
        }}
      />
    );
    // }
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
        <CCardBody>{mainTable()}</CCardBody>
      </CCard>
      //   <CCard>
      //     <CCardBody>{showTabManage()}</CCardBody>
      //   </CCard>
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
            <CRow
            // style={{
            //   height: 500,
            //   maxHeight: "500",
            //   overflow: "auto",
            // }}
            >
              {showTabTwo()}
            </CRow>
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
        bordered
        responsive
        // size="sm"
        itemsPerPage={3}
        pagination
      />
    </h6>
  );

  const mainTable = () => {
    return (
      // <CCard className="p-2">
      <CDataTable
        Toolbar={{}}
        columnFilter
        tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
        itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
        className="CDataTable"
        items={baseItems}
        fields={fieldMain}
        hover
        striped
        bordered
        size="sm"
        itemsPerPage={5}
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
          durationDate: (item) => (
            <td>
              <CLabel>{item.durationDate} Day</CLabel>
            </td>
          ),
          creditTerm: (item) => (
            <td>
              <CLabel>{item.creditTerm} Day</CLabel>
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
          paymentStatus: (item) => (
            <td>
              <h4>
                <CBadge color={getBadge(item.paymentStatus)}>
                  {item.paymentStatus}
                </CBadge>
              </h4>
            </td>
          ),
          attachFileStatus: (item) => (
            <td>
              <h4>
                <CBadge color={getBadge(item.attachFileStatus)}>
                  {item.attachFileStatus}
                </CBadge>
              </h4>
            </td>
          ),
          show_details: (item, index) => {
            if (!item.paymentStatus) {
              return <td className="py-2">{dialogs(item.paymentId, "add")}</td>;
            } else {
              return (
                <td className="py-2">{dialogs(item.paymentId, "edit")}</td>
              );
            }
          },
          // sendToAllPay: (item, index) => {
          //   if (roleUser === trstCode) {
          //     return <td></td>;
          //   } else {
          //     if (!item.paymentStatus) {
          //       return (
          //         <td className="py-2">
          //           <CButton
          //             onClick={onClickSendToAllPay(item)}
          //             color="info"
          //             size={Constant.btAddSize}
          //           >
          //             Send To AllPay
          //           </CButton>
          //         </td>
          //       );
          //     } else {
          //       return (
          //         <td className="py-2">
          //           <CButton
          //             onClick={onClickSendToAllPay(item)}
          //             color="info"
          //             size={Constant.btAddSize}
          //             disabled
          //           >
          //             Send To AllPay
          //           </CButton>
          //         </td>
          //       );
          //     }
          //   }
          // },
        }}
      />
      // </CCard>
    );
  };

  const showTabTwo = () => (
    <h6>
      <div class="table-responsive">
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
          fixed
          striped
          bordered
          size="xl"
          itemsPerPage={10}
          pagination
          scopedSlots={{}}
        />
      </div>
    </h6>
  );

  const onClickThenShowSuccesss = () => {
    setIsEditComplete(!isEditComplete);
    window.location.reload(false);
  };

  const modalForm = () => (
    <div className="c-body">
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

      {/* Start Error Datetime Search Modal */}
      <CModal
        show={isCannotSendToApp}
        onClose={() => setIsCannotSendToApp(!isCannotSendToApp)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          ไม่สามาถส่งหาผู้ตรวจสอบได้เนื่องจากเอกสารไม่ครบถ้วน หรือ
          จำนวนเงินไม่ถูกต้อง
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsCannotSendToApp(!isCannotSendToApp)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Error Datetime Search Modal */}
      <CModal
        show={isShowConfirmSend}
        onClose={() => setIsShowConfirmSend(!isShowConfirmSend)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>คุณต้องการจะส่งเอกสารเข้า AllPay ใช่หรือไม่ ?</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => {
              fnCreateDoc();
            }}
          >
            {Constant.btOK}
          </CButton>
          <CButton
            color="danger"
            onClick={() => setIsShowConfirmSend(!isShowConfirmSend)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Error Datetime Search Modal */}
      <CModal
        show={isTotalError}
        onClose={() => setIsTotalError(!isTotalError)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          จำนวนเงินไม่ตรงกับที่กำหนด ไม่สามารถ Send to AllPay
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsTotalError(!isTotalError)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Error Approve send to allpay Search Modal */}
      <CModal
        show={isVatNotEqual}
        onClose={() => setIsVatNotEqual(!isVatNotEqual)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          จำนวน VAT ไม่เท่ากันยืนยันที่จะทำรายการหรือไม่ ?
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              fnCreateDoc();
            }}
          >
            {Constant.btOK}
          </CButton>
          <CButton
            color="danger"
            onClick={() => setIsVatNotEqual(!isVatNotEqual)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Error Approve send to allpay Search Modal */}
      <CModal
        show={isNotApprove}
        onClose={() => setIsNotApprove(!isNotApprove)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          เอกสารยังไม่ถูกยืนยันจากผู้ตรวจสอบ
          กรุณาส่งเอกสารให้ผู้ตรวจสอบยืนยันเอกสาร
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsNotApprove(!isNotApprove)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Error Approve send to allpay Search Modal */}
      <CModal
        show={isEditComplete}
        onClose={() => setIsEditComplete(!isEditComplete)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessEditData}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClickThenShowSuccesss}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Error Approve send to allpay Search Modal */}
      <CModal
        show={isApproveAllpay}
        onClose={() => setIsApproveAllpay(!isApproveAllpay)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>ส่งเอกสารให้ผู้ตรวจสอบเรียบร้อย</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={
              handleClose("add")
              // window.location.reload(false);
            }
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

      {/* Start Error Datetime Search Modal */}
      <CModal
        show={isNotUserCreate}
        onClose={() => setIsNotUserCreate(!isNotUserCreate)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          ไม่สามารถแก้ไขเอกสารได้ เนื่องจากไม่ใช่ผู้สร้างเอกสาร
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsNotUserCreate(!isNotUserCreate)}
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

      {/* Start Confirm Cancel Payment Modal */}
      <CModal
        show={isConfirmCancelPayment}
        onClose={() => setIsConfirmCancelPayment(!isConfirmCancelPayment)}
        color="danger"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmCancelPayment}</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={onClickCancelPayment}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmCancelPayment(!isConfirmCancelPayment)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Confirm Cancel Payment Modal */}

      {/* Start Cancel Payment Success Modal */}
      <CModal
        show={isShowCancelPaymentSuccess}
        onClose={() =>
          setIsShowCancelPaymentSuccess(!isShowCancelPaymentSuccess)
        }
        color="success"
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessCancelPayment}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClickCloseCancelPayment}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Cancel Payment Success Modal */}

      <CModal
        show={isAllPayCom}
        onClose={() => setIsAllPayCom(!isAllPayCom)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle></CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>ส่งเอกสารเข้า AllPay เรียบร้อยแล้ว</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => setIsAllPayCom(!isAllPayCom)}>
            {Constant.btOK}
          </CButton>
          {/* <CButton
            color="secondary"
            onClick={() => setIsAllPayCom(!isAllPayCom)}
          >
            {Constant.btCancel}
          </CButton> */}
        </CModalFooter>
      </CModal>

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
          <CButton color="success" onClick={onClickUpdateCreatePayment}>
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
    </div>
  );

  const modalDialog = () => (
    <div className="c-body">
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
                      {/* {dialogs()} */}
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
