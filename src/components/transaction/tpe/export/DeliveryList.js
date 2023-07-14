import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Repository from "../../../../repositories/Repository";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import PropTypes from "prop-types";
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
import { SiMicrosoftexcel } from "react-icons/si";

const fieldsSaleOrderList = [
  {
    key: "companyName",
    label: "Company Name",
  },
  {
    key: "saleOrderNo",
    label: "Sale Order No",
  },
  {
    key: "shipToCountry",
    label: "ShipTo-Country",
  },
  {
    key: "shipToName",
    label: "ShipTo Name",
  },
  {
    key: "totalQty",
    label: "Sum of Q'ty(Tons)",
    digit: 3,
    issumvalue: true,
  },
  {
    key: "totalTransportRate",
    label: "Sum of Transport Cost",
    digit: 2,
    issumvalue: true,
  },
  {
    key: "totalExtraChargePrice",
    label: "Sum of Transport -Extra (Request)",
    digit: 2,
    issumvalue: true,
  },
  {
    key: "totalTransportPrice",
    label: "Sum of ToTal Transport Cost",
    digit: 2,
    issumvalue: true,
  },
  {
    key: "totalShippingRate",
    label: "Sum of SMP Shipping Cost",
    digit: 2,
    issumvalue: true,
  },
  {
    key: "totalExtraShippingPrice",
    label: "Sum of Shipping -Extra (Request)",
    digit: 2,
    issumvalue: true,
  },
  {
    key: "totalShippingPrice",
    label: "Sum of Total Shipping Cost",
    digit: 2,
    issumvalue: true,
  },
];

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
    key: "totalSaleOrder",
    label: `${Constant.arrFieldTransExpDelSummary[2]}`,
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
    key: "shipmentStatus",
    label: `${Constant.arrFieldTransExpDeliveryMain[13]}`,
  },
  {
    key: "edpstatus",
    label: `${Constant.arrFieldTransExpDeliveryMain[11]}`,
  },
  {
    key: "creditDebitStatus",
    label: `${Constant.arrFieldTransExpDeliveryMain[12]}`,
  },
  {
    key: "paymentStatus",
    label: `${Constant.arrFieldTransExpDeliveryMain[14]}`,
  },
  {
    key: "deliveryDate",
    label: `${Constant.arrFieldTransExpDeliveryMain[6]}`,
    isdatetime: true,
  },
  {
    key: "loadingDate2",
    label: `${Constant.arrFieldTransExpDeliveryMain[55]}`,
    isdatetime: true,
  },
  {
    key: "saleOrderNo",
    label: `${Constant.arrFieldTransExpDeliveryMain[21]}`,
  },
  {
    key: "deliveryNo",
    label: `${Constant.arrFieldTransExpDeliveryMain[1]}`,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransExpDeliveryMain[0]}`,
  },
  {
    key: "companyCode",
    label: `${Constant.arrFieldTransExpDeliveryMain[44]}`,
  },
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
  // {
  //   key: "cyplaceNameEng",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[31]}`,
  // },
  // {
  //   key: "placeContainerReturnNameEng",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[20]}`,
  // },
  {
    key: "transporterNameThai",
    label: `${Constant.arrFieldTransExpDeliveryMain[2]}`,
  },
  {
    key: "shippingNameThai",
    label: `${Constant.arrFieldTransExpDeliveryMain[3]}`,
  },
  // {
  //   key: "exportMode",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[8]}`,
  // },
  {
    key: "truckTypeName",
    label: `${Constant.arrFieldTransExpDeliveryMain[5]}`,
  },
  {
    key: "truckLicense",
    label: `${Constant.arrFieldTransExpDeliveryMain[7]}`,
  },
  {
    key: "containerType",
    label: `${Constant.arrFieldTransExpDeliveryMain[26]}`,
  },
  {
    key: "qty",
    label: `${Constant.arrFieldTransExpDeliveryMain[15]}`,
    digit: 3,
    issumvalue: true,
  },
  {
    key: "fuelPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[9]}`,
    digit: false,
  },
  // {
  //   key: "liftOnPrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[37]}`,
  //   digit: false,
  //   issumvalue: true,
  // },
  // {
  //   key: "liftOnReceiveContrainerPrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[46]}`,
  //   digit: false,
  //   issumvalue: true,
  // },
  // {
  //   key: "liftOnYardPassPrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[47]}`,
  //   digit: false,
  //   issumvalue: true,
  // },
  // {
  //   key: "liftOffPrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[38]}`,
  //   digit: false,
  //   issumvalue: true,
  // },
  // {
  //   key: "liftOffReturnContrainerPrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[48]}`,
  //   digit: false,
  //   issumvalue: true,
  // },
  // {
  //   key: "liftOffPassengerFeePrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[49]}`,
  //   digit: false,
  //   issumvalue: true,
  // },
  // {
  //   key: "liftOffWeighingPrice",
  //   label: `${Constant.arrFieldTransExpDeliveryMain[50]}`,
  //   digit: false,
  //   issumvalue: true,
  // },
  {
    key: "transportRatePrice",
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
    key: "allTotalTransportPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[16]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "totalShippingPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[17]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "extraChargeShippingPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[19]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "allTotalShippingPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[51]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "totalPrice",
    label: `${Constant.arrFieldTransExpDeliveryMain[39]}`,
    digit: false,
    issumvalue: true,
  },
  {
    key: "remark",
    label: `${Constant.arrFieldTransExpDeliveryMain[10]}`,
  },
  {
    key: "rejectReason",
    label: `${Constant.arrFieldTransExpDeliveryMain[24]}`,
  },
  {
    key: "approveByName",
    label: `${Constant.arrFieldTransExpDeliveryMain[22]}`,
  },
  {
    key: "rejectByName",
    label: `${Constant.arrFieldTransExpDeliveryMain[23]}`,
  },
];

const fieldDelivery = [
  {
    key: "shipmentStatus",
    label: `${Constant.arrFieldTransExpDelItemList[15]}`,
  },
  {
    key: "edpstatus",
    label: `${Constant.arrFieldTransExpDelItemList[16]}`,
  },
  {
    key: "paymentStatus",
    label: `${Constant.arrFieldTransExpDelItemList[17]}`,
  },
  {
    key: "deliveryDate",
    label: `${Constant.arrFieldTransExpDelItemList[0]}`,
  },
  {
    key: "deliveryNo",
    label: `${Constant.arrFieldTransExpDelItemList[2]}`,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransExpDelItemList[1]}`,
  },
  {
    key: "loadingLocationName",
    label: `${Constant.arrFieldTransExpDelItemList[11]}`,
  },
  {
    key: "materialNo",
    label: `${Constant.arrFieldTransExpDelItemList[3]}`,
  },
  {
    key: "productHierarchy",
    label: `${Constant.arrFieldTransExpDelItemList[4]}`,
  },
  {
    key: "productionPlant",
    label: `${Constant.arrFieldTransExpDelItemList[5]}`,
  },
  {
    key: "qty",
    label: `${Constant.arrFieldTransExpDelItemList[6]}`,
    digit: 3,
  },
  {
    key: "truckTypeName",
    label: `${Constant.arrFieldTransExpDelItemList[7]}`,
  },
  {
    key: "truckLicense",
    label: `${Constant.arrFieldTransExpDelItemList[8]}`,
  },
  {
    key: "containerType",
    label: `${Constant.arrFieldTransExpDelItemList[9]}`,
  },
  {
    key: "remark",
    label: `${Constant.arrFieldTransExpDelItemList[10]}`,
  },
  {
    key: "sourceNameThai",
    label: `${Constant.arrFieldTransExpDelItemList[11]}`,
  },
  {
    key: "packageType",
    label: `${Constant.arrFieldTransExpDelItemList[12]}`,
  },
  {
    key: "materialGroup",
    label: `${Constant.arrFieldTransExpDelItemList[13]}`,
  },
  {
    key: "plant",
    label: `${Constant.arrFieldTransExpDelItemList[14]}`,
  },
];

const fieldContainer = [
  {
    key: "containerType",
    label: `${Constant.arrFieldTransExpDelContainer[0]}`,
  },
  {
    key: "qty",
    label: `${Constant.arrFieldTransExpDelContainer[1]}`,
  },
];

const fieldTransportRate = [
  {
    key: "viewContractTransport",
    label: ``,
    // _style: { width: '100%' },
  },
  {
    key: "viewContractShipping",
    label: ``,
    // _style: { width: '100%' },
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransExpDelTransport[0]}`,
  },
  {
    key: "transporterPrice",
    label: `${Constant.arrFieldTransExpDelTransport[1]}`,
    digit: false,
  },
  {
    key: "extCTransporterPrice",
    label: `${Constant.arrFieldTransExpDelTransport[3]}`,
    digit: false,
  },
  {
    key: "totalTransporterPrice",
    label: `${Constant.arrFieldTransExpDelTransport[5]}`,
    digit: false,
  },
  {
    key: "shippingPrice",
    label: `${Constant.arrFieldTransExpDelTransport[2]}`,
    digit: false,
  },
  {
    key: "extCShippingPrice",
    label: `${Constant.arrFieldTransExpDelTransport[4]}`,
    digit: false,
  },
  {
    key: "totalShippingPrice",
    label: `${Constant.arrFieldTransExpDelTransport[6]}`,
    digit: false,
  },
  {
    key: "allTotalPrice",
    label: `${Constant.arrFieldTransExpDelTransport[7]}`,
    digit: false,
  },
  {
    key: "collepse",
    label: ``,
  },
];

const fieldDetailTransportRate = [
  {
    key: "rateTypeName",
    label: `${Constant.arrFieldTransDomDelTransport[0]}`,
  },
  {
    key: "price",
    label: `${Constant.arrFieldTransDomDelTransport[1]}`,
    digit: false,
  },
  {
    key: "vat",
    label: `${Constant.arrFieldTransDomDelTransport[2]}`,
    digit: 2,
  },
  {
    key: "refName1",
    label: `${Constant.arrFieldTransDomDelTransport[3]}`,
  },
  {
    key: "refValue1",
    label: `${Constant.arrFieldTransDomDelTransport[4]}`,
    digit: false,
  },
  {
    key: "refName2",
    label: `${Constant.arrFieldTransDomDelTransport[5]}`,
  },
  {
    key: "refValue2",
    label: `${Constant.arrFieldTransDomDelTransport[6]}`,
    digit: false,
  },
  {
    key: "refName3",
    label: `${Constant.arrFieldTransDomDelTransport[7]}`,
  },
  {
    key: "refValue3",
    label: `${Constant.arrFieldTransDomDelTransport[8]}`,
    digit: false,
  },
  {
    key: "refName4",
    label: `${Constant.arrFieldTransDomDelTransport[9]}`,
  },
  {
    key: "refValue4",
    label: `${Constant.arrFieldTransDomDelTransport[10]}`,
    digit: false,
  },
];

const fieldExtraCharge = [
  {
    key: "extraChargeStatus",
    label: `${Constant.arrFieldTransExpDelExtraCharge[17]}`,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransExpDelExtraCharge[0]}`,
  },
  {
    key: "extraChargeType",
    label: `${Constant.arrFieldTransExpDelExtraCharge[1]}`,
  },
  {
    key: "transporterTypeName",
    label: `${Constant.arrFieldTransExpDelExtraCharge[18]}`,
  },
  {
    key: "extraChargeName",
    label: `${Constant.arrFieldTransExpDelExtraCharge[2]}`,
  },
  {
    key: "extraChargeQty",
    label: `${Constant.arrFieldTransExpDelExtraCharge[4]}`,
    digit: 3,
  },
  {
    key: "vat",
    label: `${Constant.arrFieldTransExpDelExtraCharge[19]}`,
    digit: 2,
  },
  {
    key: "extraChargePrice",
    label: `${Constant.arrFieldTransExpDelExtraCharge[3]}`,
    digit: false,
  },
  {
    key: "extraChargeTotalPrice",
    label: `${Constant.arrFieldTransExpDelExtraCharge[5]}`,
    digit: false,
  },
  {
    key: "extraChargeDocNo",
    label: `${Constant.arrFieldTransExpDelExtraCharge[8]}`,
  },
  {
    key: "paymentDocNo",
    label: `${Constant.arrFieldTransExpDelExtraCharge[7]}`,
  },
  {
    key: "requestName1",
    label: `${Constant.arrFieldTransExpDelExtraCharge[9]}`,
  },
  {
    key: "requestValue1",
    label: `${Constant.arrFieldTransExpDelExtraCharge[10]}`,
  },
  {
    key: "requestName2",
    label: `${Constant.arrFieldTransExpDelExtraCharge[11]}`,
  },
  {
    key: "requestValue2",
    label: `${Constant.arrFieldTransExpDelExtraCharge[12]}`,
  },
  {
    key: "requestName3",
    label: `${Constant.arrFieldTransExpDelExtraCharge[13]}`,
  },
  {
    key: "requestValue3",
    label: `${Constant.arrFieldTransExpDelExtraCharge[14]}`,
  },
  {
    key: "requestName4",
    label: `${Constant.arrFieldTransExpDelExtraCharge[15]}`,
  },
  {
    key: "requestValue4",
    label: `${Constant.arrFieldTransExpDelExtraCharge[16]}`,
  },
  {
    key: "fileType",
    label: `${Constant.arrFieldTransExpDelExtraCharge[6]}`,
  },
  {
    key: "manage",
    label: "",
    _style: { width: "3%" },
    sorter: false,
    filter: false,
  },
];

const fieldExportAccrue = [
  {
    key: "transporterNameThai",
    label: `${Constant.arrFieldExportFileExpAccure[21]}`,
  },
  {
    key: "loadingDate2",
    label: `${Constant.arrFieldExportFileExpAccure[0]}`,
    isdatetime: true,
  },
  {
    key: "companyShortName",
    label: `${Constant.arrFieldExportFileExpAccure[1]}`,
  },
  {
    key: "salesGroupCode",
    label: `${Constant.arrFieldExportFileExpAccure[2]}`,
  },
  {
    key: "distributionChannel",
    label: `${Constant.arrFieldExportFileExpAccure[3]}`,
  },
  {
    key: "shipToCountry",
    label: `${Constant.arrFieldExportFileExpAccure[4]}`,
  },
  {
    key: "endCustomerCode",
    label: `${Constant.arrFieldExportFileExpAccure[5]}`,
  },
  {
    key: "saleOrderNo",
    label: `${Constant.arrFieldExportFileExpAccure[6]}`,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldExportFileExpAccure[7]}`,
  },
  {
    key: "deliveryNo",
    label: `${Constant.arrFieldExportFileExpAccure[8]}`,
  },
  {
    key: "materialNo",
    label: `${Constant.arrFieldExportFileExpAccure[9]}`,
  },
  {
    key: "productHierarchy",
    label: `${Constant.arrFieldExportFileExpAccure[10]}`,
  },
  {
    key: "productionPlant",
    label: `${Constant.arrFieldExportFileExpAccure[11]}`,
  },
  {
    key: "plant",
    label: `${Constant.arrFieldExportFileExpAccure[12]}`,
  },
  {
    key: "qty",
    label: `${Constant.arrFieldExportFileExpAccure[13]}`,
    issumvalue: true,
  },
  {
    key: "haulagePrice",
    label: `${Constant.arrFieldExportFileExpAccure[14]}`,
    issumvalue: true,
  },
  {
    key: "hardCode98",
    label: `${Constant.arrFieldExportFileExpAccure[15]}`,
    issumvalue: true,
  },
  {
    key: "exportInLand",
    label: `${Constant.arrFieldExportFileExpAccure[16]}`,
    issumvalue: true,
  },
  // {
  //   key: "liftOnPrice",
  //   label: `${Constant.arrFieldExportFileExpAccure[17]}`,
  // },
  // {
  //   key: "liftOffPrice",
  //   label: `${Constant.arrFieldExportFileExpAccure[18]}`,
  // },
  {
    key: "totalTransportPrice",
    label: `${Constant.arrFieldExportFileExpAccure[19]}`,
    issumvalue: true,
  },
  {
    key: "totalShippingPrice",
    label: `${Constant.arrFieldExportFileExpAccure[20]}`,
    issumvalue: true,
  },
];

const getBadge = (status) => {
  switch (status) {
    case "Complete":
      return "success";
    case "Match":
      return "success";
    case "Match(With Condition)":
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
    case "Mismatch":
      return "danger";
    case "Pending":
      return "secondary";
    case "Wait For Approve":
      return "info";
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
    color: "black",
    backgroundColor: "#056776",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const DeliveryList = () => {
  const [error, setError] = useState(null);
  const [errorAPI, setErrorAPI] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingDataDetail, setIsLoadingDataDetail] = useState(false);

  const [details, setDetails] = useState([]);
  const [items, setItems] = useState({});
  const [baseItems, setBaseItems] = useState([]);
  const [summaryItems, setSummaryItems] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [exportModeList, setExportModeList] = useState([]);
  const [truckTypeList, setTruckTypeList] = useState([]);
  const [shipmentStatusList, setShipmentStatusList] = useState([]);
  const [edpStatusList, setEDPStatusList] = useState([]);
  const [paymentStatusList, setPaymentStatusList] = useState([]);
  const [summaryStatusList, setSummaryStatusList] = useState([]);
  const [overAllStatus, setOverAllStatus] = useState({});
  const [companyList, setCompanyList] = useState([]);
  const [transportTypeList, setTransportTypeList] = useState([]);

  const [readyChangeStatusList, setReadyChangeStatusList] = useState([]);
  const [changeStatusList, setChangeStatusList] = useState([]);

  const [objLinkFormSearch, setObjLinkFormSearch] = useState({});
  const [shipmentNonSoNo, setShipmentNonSoNo] = useState("");
  const [objMainIndex, setObjMainIndex] = useState({});

  // Var for Start&End Date Search Form
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Var for Table Edit Form
  const [containerList, setContainerList] = useState([]);
  const [deliveryItemList, setDeliveryItemList] = useState([]);
  const [totalQtyDeliveryList, setTotalQtyDeliveryList] = useState(0.0);
  const [transportRateList, setTransportRateList] = useState([]);
  const [transportRateDetailList, setTransportRateDetailList] = useState([]);
  const [totalPriceTransportRate, setTotalPriceTransportRate] = useState(0.0);
  const [totalPriceShippingRate, setTotalPriceShippingRate] = useState(0.0);
  const [allTotalPrice, setAllTotalPrice] = useState(0.0);

  const [extraChargeList, setExtraChargeList] = useState([]);
  const [extraChargeTypeList, setExtraChargeTypeList] = useState([]);
  const [extraChargeNameList, setExtraChargeNameList] = useState([]);
  const [transporterTypeList, setTransporterTypeList] = useState([]);

  const [extraChargeNameObj, setExtraChargeNameObj] = useState({});
  const [extcDeleteObj, setExtcDeleteObj] = useState({});

  const [selectItemsSearch, setSelectItemsSearch] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [selectItemsAddShipNonSO, setSelectItemsAddShipNonSO] = useState([
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
  // const [invalidFormEdit, setInvalidFormEdit] = useState(false);
  const [invalidMaterialFormAddShipNonSo, setInvalidMaterialFormAddShipNonSo] =
    useState([false, false, false, false]);

  const [isShipmentNonSO, setIsShipmentNonSO] = useState(false);
  const [isShipmentComplete, setIsShipmentComplete] = useState(false);

  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isConfirmSaveShipNonSO, setIsConfirmSaveShipNonSO] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isConfirmEditShipNonSO, setIsConfirmEditShipNonSO] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isConfirmChangeStatus, setIsConfirmChangeStatus] = useState(false);
  const [isConfirmViewContract, setIsConfirmViewContract] = useState(false);
  const [isConfirmReCal, setIsConfirmReCal] = useState(false);
  const [isConfirmDeleteNonSO, setIsConfirmDeleteNonSO] = useState(false);
  const [isShowDeleteSuccess, setIsShowDeleteSuccess] = useState(false);
  const [isShowDialogEdit, setisShowDialogEdit] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isShowErrorViewContract, setIsShowErrorViewContract] = useState(false);
  const [isShowWarningSearch, setIsShowWarningSearch] = useState(false);
  const [isShowSelectExport, setIsShowSelectExport] = useState(false);
  const [isShowReCalSuccess, setIsShowReCalSuccess] = useState(false);
  const [isShowSaveShipNonSOSuccess, setIsShowSaveShipNonSOSuccess] =
    useState(false);
  const [isShowEditShipNonSOSuccess, setIsShowEditShipNonSOSuccess] =
    useState(false);
  const [isShowWarningSaleOderList, setIsShowWarningSaleOderList] =
    useState(false);

  const [isOnchangeExtraCharge, setIsOnchangeExtraCharge] = useState(false);

  const [dialogValue, setDialogValue] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  const [collsFormSearch, setCollsFormSearch] = useState(true);
  const [collsDialogTabOne, setCollsDialogTabOne] = useState([
    true,
    true,
    true,
    true,
  ]);
  const [collsDialogTabTwo, setCollsDialogTabTwo] = useState([true, true]);

  const [openAddForm, setOpenAddForm] = useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const [shipTo, setShipTo] = useState([]);

  const [roleUser, setRoleUser] = useState(null);

  const theme = useTheme();
  const _classes = useStyles();
  const classes = MakeStyleSheet.useStyles();

  const empCode = "/tnsctpedomdelv";
  const trstCode = "/tnsctrstdomdelv";

  const _UserId = parseInt(localStorage.getItem("userId"));
  const _Username = localStorage.getItem("username");
  const _TranspoterId = parseInt(localStorage.getItem("transporterId"));

  const txtExportFileDeliveryList = "DeliveryList-Export-File";
  const txtExportFileAccureFile = "DeliveryList-Export-Accrue-File";
  const txtExportFileSaleOrderList = "DeliveryList-Export-SaleOrderList";

  const toggleDetails = (index, keyId) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [details, index];
      if (!isLoadingDataDetail) {
        setTransportRateDetailList([]);
        fnGetExpTransportRateById(keyId);
      }
    }
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
      if (document.getElementById("edit-transporter-type") != null) {
        document.getElementById("edit-transporter-type").selectedIndex = 0;
      }
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
    VariableController.linkSaleOrderNo = null;
    VariableController.linkArrDataList = null;
    VariableController.linkObjSearchData = null;
  };

  const setItemChangeStatus = (item) => (e) => {
    if (e.target.checked) {
      if (changeStatusList.length) {
        var newArr = [...changeStatusList];
        var newObj = { saleOrderNo: null, shipmentNo: null, deliveryNo: null };
        newObj.saleOrderNo = item.saleOrderNo;
        newObj.shipmentNo = item.shipmentNo;
        newObj.deliveryNo = item.deliveryNo;
        newArr.push(newObj);
        setChangeStatusList(newArr);
      } else {
        var newObj = { saleOrderNo: null, shipmentNo: null, deliveryNo: null };
        newObj.saleOrderNo = item.saleOrderNo;
        newObj.shipmentNo = item.shipmentNo;
        newObj.deliveryNo = item.deliveryNo;
        setChangeStatusList([newObj]);
      }
    } else {
      if (changeStatusList.length) {
        var newArr = [...changeStatusList];
        var result = newArr.find(
          (x) =>
            x.shipmentNo === item.shipmentNo && x.deliveryNo === item.deliveryNo
        );
        if (result) {
          var index = newArr.findIndex(
            (x) =>
              x.shipmentNo === item.shipmentNo &&
              x.deliveryNo === item.deliveryNo
          );
          if (index != -1) {
            newArr.splice(index, 1);
          }
          setChangeStatusList(newArr);
        }
      }
    }
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
    setDetails([]);
    setDialogValue(0);
    setItems({});
    setContainerList([]);
    setDeliveryItemList([]);
    setTotalQtyDeliveryList(0.0);
    setTransportRateList([]);
    setTotalPriceTransportRate(0.0);
    setTotalPriceShippingRate(0.0);
    setAllTotalPrice(0.0);
    setExtraChargeList([]);
    setExtraChargeNameList([]);
    setExtraChargeNameObj({});
    setExtcDeleteObj({});
    setIsShipmentNonSO(false);
    setInvalidMaterialFormAddShipNonSo([false, false, false, false]);
    setObjMainIndex({});
  };

  const handleChangeTabIndex = (index) => {
    setTabValue(index);
  };

  const handleChangeDialogIndex = (index) => {
    setDialogValue(index);
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
    } else if (type === "shipping") {
      if (getHasObjectValue(values)) {
        newArr[2] = values;
      } else {
        newArr[2] = {};
      }
    } else if (type === "trucktype") {
      if (getHasObjectValue(values)) {
        newArr[3] = values;
      } else {
        newArr[3] = {};
      }
    } else if (type === "paymentstatus") {
      if (getHasObjectValue(values)) {
        newArr[4] = values;
      } else {
        newArr[4] = {};
      }
    } else if (type === "company") {
      if (getHasObjectValue(values)) {
        newArr[5] = values;
      } else {
        newArr[5] = {};
      }
    }
    setSelectItemsSearch(newArr);
  };

  const handleChangeSelectAddShipNonSO = (type) => (e, values) => {
    var newArr = [...selectItemsAddShipNonSO];
    if (type === "company") {
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
    } else if (type === "shipto") {
      if (getHasObjectValue(values)) {
        newArr[2] = values;
      } else {
        newArr[2] = {};
      }
    } else if (type === "trucktype") {
      if (getHasObjectValue(values)) {
        newArr[3] = values;
      } else {
        newArr[3] = {};
      }
    }
    setSelectItemsAddShipNonSO(newArr);
  };

  const handleChangeExtraChargeType = (e) => {
    var isExport = true;
    var extraChargeTypeId = parseInt(e.target.value);
    var newArr = [isExport, extraChargeTypeId];
    setExtraChargeNameList([]);
    fnGetMasterExtraChargeList(newArr);
  };

  const handleChangeExtraChargePrice = (e) => {
    var newObj = { ...extraChargeNameObj };
    if (e.target.value !== "") {
      if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
        e.target.value = e.target.value.substring(1);
      }
      newObj.extraChargePrice = e.target.value;
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

  const handleChangeMonthYear = (e) => {
    setNoValidateForm("search-startend-need-validation");
    if (e.target.value != "") {
      setStartDate("");
      setEndDate("");
    } else {
      fnGetStartEndDate();
    }
  };

  const handleChangeUpdateLinkSearch = (type) => (e) => {
    var obj = { ...objLinkFormSearch };
    if (type == "datestart") {
      obj.dateStart = e.target.value;
    } else if (type == "dateend") {
      obj.dateEnd = e.target.value;
    } else if (type == "monthyear") {
      obj.monthyear = e.target.value;
    } else if (type == "saleorder") {
      obj.saleOrderNo = e.target.value;
    } else if (type == "deliveryno") {
      obj.deliveryNo = e.target.value;
    } else if (type == "shipmentno") {
      obj.shipmentNo = e.target.value;
    }
    setObjLinkFormSearch(obj);
  };

  const onChangeUpdateShipmentNonSO = (type) => (e, values) => {
    var newObj = { ...items };
    if (type == "company") {
      if (getHasObjectValue(values)) {
        newObj.companyId = values.companyId;
      } else {
        newObj.companyId = null;
      }
    } else if (type == "transporter") {
      if (getHasObjectValue(values)) {
        newObj.transporterId = values.transporterId;
      } else {
        newObj.transporterId = null;
      }
    } else if (type == "transporttype") {
      newObj.transportTypeId = parseInt(e.target.value);
    } else if (type == "deliverydate") {
      newObj.deliveryDate = e.target.value;
    } else if (type == "shipto") {
      if (getHasObjectValue(values)) {
        newObj.shipToId = values.shipToId;
      } else {
        newObj.shipToId = null;
      }
    } else if (type == "trucktype") {
      if (getHasObjectValue(values)) {
        newObj.truckTypeId = values.truckTypeId;
      } else {
        newObj.truckTypeId = null;
      }
    } else if (type == "qty") {
      newObj.qty = e.target.value;
    } else if (type == "productno") {
      newObj.productNo = e.target.value;
    } else if (type == "refno") {
      newObj.refNo = e.target.value;
    }
    setItems(newObj);
  };

  const onClickChangeTab = (e, values) => {
    setTabValue(values);
  };

  const onClickChangeDialogPage = (e, values) => {
    setDialogValue(values);
    if (values === 1 && !extraChargeList.length) {
      var newObj = isShipmentNonSO ? { ...objMainIndex } : { ...items };
      fnGetExtraChargeDataList(newObj.saleOrderNo, false, true);
    } else if (values === 0 && isOnchangeExtraCharge) {
      var newObj = isShipmentNonSO ? { ...objMainIndex } : { ...items };
      setIsOnchangeExtraCharge(false);
      if (!isShipmentNonSO) {
        fnGetDataListById([
          newObj.shipmentNo,
          newObj.deliveryNo,
          newObj.saleOrderNo,
        ]);
      }
    }
  };

  const onClickSetAllChangeStatus = (e) => {
    var baseData = [...baseItems];
    var newArr = [];
    if (changeStatusList.length) {
      setChangeStatusList([]);
    } else if (baseData.length) {
      baseData.map((x) => {
        if (changeStatusList.length) {
          newArr = [...changeStatusList];
          var newObj = {
            saleOrderNo: null,
            shipmentNo: null,
            deliveryNo: null,
          };
          newObj.saleOrderNo = x.saleOrderNo;
          newObj.shipmentNo = x.shipmentNo;
          newObj.deliveryNo = x.deliveryNo;
          newArr.push(newObj);
        } else {
          var newObj = {
            saleOrderNo: null,
            shipmentNo: null,
            deliveryNo: null,
          };
          newObj.saleOrderNo = x.saleOrderNo;
          newObj.shipmentNo = x.shipmentNo;
          newObj.deliveryNo = x.deliveryNo;
          newArr.push(newObj);
        }
      });
      // console.log(newArr);
      setChangeStatusList(newArr);
    }
  };

  const onClickOpenDialog =
    (index = [], isComplete) =>
    (e) => {
      var newObj = baseItems.find(
        (x) => x.shipmentNo === index[0] && x.deliveryNo === index[1]
      );
      // console.log(newObj)
      setIsShipmentComplete(isComplete);
      if (newObj) {
        if (newObj.shipmentType !== "Non-SO") {
          fnGetDataListById(index);
        } else {
          var objIndex = {
            shipmentNo: newObj.shipmentNo,
            deliveryNo: newObj.deliveryNo,
            saleOrderNo: newObj.saleOrderNo,
          };
          setObjMainIndex(objIndex);
          setIsShipmentNonSO(true);
          fnGetShipmentNonSODataById(index[0]);
        }
        setisShowDialogEdit(true);
      }
    };

  const onClickCloseDialog = () => {
    setClearVariableController();
    setClearDetailData();
    setisShowDialogEdit(false);
  };

  const onClickOpenDialogNonSo = () => {
    setOpenAddForm(true);
  };

  const onClickCloseDialogNonSo = () => {
    setClearDetailData();
    setOpenAddForm(false);
  };

  const onClickCheckSearchData = () => {
    var newArr = [...selectItemsSearch];
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var monthyear = document.getElementById("search-monthyear").value;
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
    if (Object.keys(newArr[1]).length || Object.keys(newArr[2]).length) {
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
    document.getElementById("search-deliveryno").value = "";
    document.getElementById("search-saleorderno").value = "";
    document.getElementById("search-shipmentstatus").selectedIndex = 0;
    document.getElementById("search-edpstatus").selectedIndex = 0;
    document.getElementById("search-summarystatus").selectedIndex = 0;
  };

  const onClickClearShipNonSOData = () => {
    document.getElementById("shipmentnonso-delivery-date").value = "";
    document.getElementById("shipmentnonso-shipto-addtxt").value = "";
    document.getElementById("shipmentnonso-qty").value = "";
    document.getElementById("shipmentnonso-productno").value = "";
    document.getElementById("shipmentnonso-refno").value = "";
  };

  const onClickSearchData = (isExportAccrueFile = false) => {
    var arrSelect = [...selectItemsSearch];
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var monthyear = document.getElementById("search-monthyear").value;
    var shipmentNo = document.getElementById("search-shipmentno").value;
    var deliveryNo = document.getElementById("search-deliveryno").value;
    var saleOrderNo = document.getElementById("search-saleorderno").value;
    var sourceId = getHasObjectValue(arrSelect[0])
      ? arrSelect[0].sourceId
      : null;
    var transporterId = getHasObjectValue(arrSelect[1])
      ? arrSelect[1].transporterId
      : null;
    var shippingid = getHasObjectValue(arrSelect[2])
      ? arrSelect[2].transporterId
      : null;
    var exportModeId = parseInt(
      document.getElementById("search-export-mode").value
    );
    var truckTypeId = getHasObjectValue(arrSelect[3])
      ? arrSelect[3].truckTypeId
      : null;
    var edpStatus = document.getElementById("search-edpstatus").value;
    var shipmentStatus = document.getElementById("search-shipmentstatus").value;
    var paymentStatus = getHasObjectValue(arrSelect[4])
      ? arrSelect[4].displayMember
      : null;
    var companyId = getHasObjectValue(arrSelect[5])
      ? arrSelect[5].companyId
      : null;
    var summaryStatus = parseInt(
      document.getElementById("search-summarystatus").value
    );

    dateStart = dateStart !== "" ? dateStart : null;
    dateEnd = dateEnd !== "" ? dateEnd : null;
    monthyear = monthyear !== "" ? monthyear : null;
    shipmentNo = shipmentNo !== "" ? shipmentNo : null;
    deliveryNo = deliveryNo !== "" ? deliveryNo : null;
    saleOrderNo = saleOrderNo !== "" ? saleOrderNo : null;
    exportModeId = !isNaN(exportModeId) ? exportModeId : null;
    edpStatus = edpStatus !== "" ? edpStatus : null;
    shipmentStatus = shipmentStatus !== "" ? shipmentStatus : null;
    summaryStatus = !isNaN(summaryStatus) ? summaryStatus : null;

    var newArr = [
      dateStart,
      dateEnd,
      monthyear,
      shipmentNo,
      deliveryNo,
      saleOrderNo,
      sourceId,
      transporterId,
      shippingid,
      truckTypeId,
      edpStatus,
      shipmentStatus,
      paymentStatus,
      summaryStatus,
      exportModeId,
      companyId,
    ];

    var newObj = {
      dateStart: dateStart,
      dateEnd: dateEnd,
      monthyear: monthyear,
      shipmentNo: shipmentNo,
      deliveryNo: deliveryNo,
      saleOrderNo: saleOrderNo,
      sourceId: sourceId,
      transporterId: transporterId,
      shippingid: shippingid,
      exportModeId: exportModeId,
      truckTypeId: truckTypeId,
      edpStatus: edpStatus,
      shipmentStatus: shipmentStatus,
      paymentStatus: paymentStatus,
      summaryStatus: summaryStatus,
      companyId: companyId,
    };

    VariableController.linkObjSearchData = newObj;

    // console.log(newArr);
    if (isExportAccrueFile) {
      fnGetExpDeliveryItemList(newArr);
    } else {
      fnGetDataList(newArr);
    }
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

  const onClickReCalculateList = () => {
    setIsConfirmReCal(!isConfirmReCal);
    if (roleUser === empCode) {
      var arrChangeStatus = [...changeStatusList];
      var arrStatus = [];
      arrChangeStatus.map((x) => {
        if (arrStatus.length) {
          var result = arrStatus.find((y) => y === x.saleOrderNo);
          if (!result) {
            arrStatus.push(x.saleOrderNo);
          }
        } else {
          arrStatus.push(x.saleOrderNo);
        }
      });

      // console.log(arrStatus);
      fnGetReCalculateMultiSaleOrder(arrStatus);
    }
  };

  const onClickDeleteShipmentNonSOList = () => {
    setIsConfirmDeleteNonSO(!isConfirmDeleteNonSO);
    if (roleUser === empCode) {
      var arrChangeStatus = [...changeStatusList];
      var arrStatus = [];
      arrChangeStatus.map((x) => {
        if (arrStatus.length) {
          var result = arrStatus.find((y) => y === x.shipmentNo);
          if (!result) {
            arrStatus.push(x.shipmentNo);
          }
        } else {
          arrStatus.push(x.shipmentNo);
        }
      });

      // console.log(arrStatus);
      fnGetDeleteShipmentNonSo(arrStatus);
    }
  };

  const fnGetDeleteShipmentNonSo = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchDeleteShipmentNonSoList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsShowDeleteSuccess(!isShowDeleteSuccess);
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

  const onClickReCalOKRefreshPage = () => {
    setIsShowReCalSuccess(!isShowReCalSuccess);
    window.location.reload(false);
  };

  const onClickDeleteOKRefreshPage = () => {
    setIsShowDeleteSuccess(!isShowDeleteSuccess);
    window.location.reload(false);
  };

  const onClickConfirmViewContract = (type, index) => {
    var headerObj = { ...items };
    var transportList = [...transportRateList];
    var newIndex = transportRateList.findIndex((x) => x.shipmentNo === index);
    var contractId = null;
    if (type === "Transport") {
      contractId = transportList[newIndex].contractId;
    } else if (type === "Shipping") {
      contractId = transportList[newIndex].shippingContractId;
    }
    if (contractId) {
      setIsConfirmViewContract(!isConfirmViewContract);
      VariableController.linkContractId = contractId;
      VariableController.linkShipmentNo = headerObj.shipmentNo;
      VariableController.linkDeliveryNo = headerObj.deliveryNo;
      VariableController.linkSaleOrderNo = headerObj.saleOrderNo;
      VariableController.linkArrDataList = baseItems;
    } else {
      setIsShowErrorViewContract(!isShowErrorViewContract);
    }
    // else if (type === "Shipping") {
    //   var headerObj = { ...items };
    //   if (headerObj.shippingContractId !== null) {
    //     setIsConfirmViewContract(!isConfirmViewContract);
    //     VariableController.linkContractId = headerObj.shippingContractId;
    //     VariableController.linkShipmentNo = headerObj.shipmentNo;
    //     VariableController.linkDeliveryNo = headerObj.deliveryNo;
    //     VariableController.linkSaleOrderNo = headerObj.saleOrderNo;
    //   }
    //   else {
    //     setIsShowErrorViewContract(!isShowErrorViewContract);
    //   }
    // }
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

  const onClickCheckAddShipmentNonSO = () => {
    var newArr = [...selectItemsAddShipNonSO];
    var shipToName = document.getElementById(
      "shipmentnonso-shipto-addtxt"
    ).value;
    if (
      getIsValidForm("need-validation-shipmentnonso") &&
      Object.keys(newArr[0]).length &&
      (Object.keys(newArr[1]).length || roleUser === trstCode) &&
      (Object.keys(newArr[2]).length || shipToName !== "") &&
      Object.keys(newArr[3]).length
    ) {
      setInvalidMaterialFormAddShipNonSo([false, false, false, false]);
      setIsConfirmSaveShipNonSO(!isConfirmSaveShipNonSO);
    } else if (
      !Object.keys(newArr[0]).length ||
      !Object.keys(newArr[1]).length ||
      !Object.keys(newArr[2]).length ||
      !Object.keys(newArr[3]).length
    ) {
      var arrError = [...invalidMaterialFormAddShipNonSo];
      if (Object.keys(newArr[0]).length) {
        arrError[0] = false;
      } else {
        arrError[0] = true;
      }

      if (Object.keys(newArr[1]).length || roleUser === trstCode) {
        arrError[1] = false;
      } else {
        arrError[1] = true;
      }

      if (Object.keys(newArr[2]).length || shipToName !== "") {
        arrError[2] = false;
      } else {
        arrError[2] = true;
      }

      if (Object.keys(newArr[3]).length) {
        arrError[3] = false;
      } else {
        arrError[3] = true;
      }

      setInvalidMaterialFormAddShipNonSo(arrError);
    } else {
      setInvalidMaterialFormAddShipNonSo([false, false, false, false]);
    }
  };

  const onClickCheckEditShipmentNonSO = () => {
    var newObj = { ...items };
    var shipToName = document.getElementById(
      "shipmentnonso-shipto-edittxt"
    ).value;
    // console.log(newObj);
    if (
      getIsValidForm("need-validation-edit-shipmentnonso") &&
      newObj.companyId !== null &&
      newObj.transporterId !== null &&
      (newObj.shipToId !== null || shipToName !== "") &&
      newObj.truckTypeId !== null
    ) {
      setInvalidMaterialFormAddShipNonSo([false, false, false, false]);
      setIsConfirmEditShipNonSO(!isConfirmEditShipNonSO);
    } else if (
      newObj.companyId === null ||
      newObj.transporterId === null ||
      newObj.shipToId === null ||
      newObj.truckTypeId === null
    ) {
      var arrError = [...invalidMaterialFormAddShipNonSo];
      if (newObj.companyId !== null) {
        arrError[0] = false;
      } else {
        arrError[0] = true;
      }

      if (newObj.transporterId !== null) {
        arrError[1] = false;
      } else {
        arrError[1] = true;
      }

      if (newObj.shipToId !== null || shipToName !== "") {
        arrError[2] = false;
      } else {
        arrError[2] = true;
      }

      if (newObj.truckTypeId !== null) {
        arrError[3] = false;
      } else {
        arrError[3] = true;
      }

      setInvalidMaterialFormAddShipNonSo(arrError);
    } else {
      setInvalidMaterialFormAddShipNonSo([false, false, false, false]);
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
    var saleOrderNo = newObj.saleOrderNo;
    var createBy = _UserId;

    var newArr = [saleOrderNo, createBy];

    // console.log(newArr);
    fnGetReCalTransportRate(newArr);
  };

  const onClickAddExtraCharge = () => {
    setIsConfirmSave(!isConfirmSave);
    var shipmentNo = document.getElementById("edit-shipmentNo-extc").value;
    var newObj = { ...extraChargeNameObj };
    var extraChargeId = newObj.extraChargeId;
    var transporterTypeId = newObj.transporterTypeId;
    var extraChargeTypeId = newObj.extraChargeTypeId;
    var extraChargeName = newObj.extraChargeName;
    var vatCode = newObj.vatCode;
    var vatPrice = newObj.vatPrice;
    var extraChargePrice = FunctionController.setNumberValue(
      newObj.extraChargePrice
    );

    if (transporterTypeId === null) {
      transporterTypeId = parseInt(
        document.getElementById("edit-transporter-type").value
      );
    }

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

    // console.log(newArr);
    fnInsertExtraChargeData(newArr);
  };

  const onClickAddExtraChargeMultiDrop = () => {
    setIsConfirmSave(!isConfirmSave);
    var shipmentNo = document.getElementById("edit-shipmentNo-multi").value;
    var multiDropDistance = parseFloat(
      document.getElementById("multidrop-input-droprange").value
    );
    var file = document.getElementById("multidrop-input-attackfile").files[0];
    var fileName = file.name;
    var arrFileName = fileName.split(".");
    var fileType = arrFileName[arrFileName.length - 1];
    var createBy = _UserId;

    var newArr = [shipmentNo, multiDropDistance, file, fileType, createBy];
    // console.log(newArr);
    fnInsertExtraChargeMultiDropData(newArr);
  };

  const onClickAddShipmentNonSO = () => {
    setIsConfirmSaveShipNonSO(!isConfirmSaveShipNonSO);
    var arrSelectItems = [...selectItemsAddShipNonSO];
    var companyId = arrSelectItems[0].companyId;
    var transporterId = null;
    if (roleUser !== trstCode) {
      transporterId = arrSelectItems[1].transporterId;
    } else {
      transporterId = _TranspoterId;
    }
    var transportTypeId = parseInt(
      document.getElementById("shipmentnonso-transport-type").value
    );
    var deliveryDate = document.getElementById(
      "shipmentnonso-delivery-date"
    ).value;
    var shipToId = null;
    if (Object.keys(arrSelectItems[2]).length) {
      shipToId = arrSelectItems[2].shipToId;
    }
    var shipToName = document.getElementById(
      "shipmentnonso-shipto-addtxt"
    ).value;
    var truckTypeId = arrSelectItems[3].truckTypeId;
    var productNo = document.getElementById("shipmentnonso-productno").value;
    var qty = parseFloat(document.getElementById("shipmentnonso-qty").value);
    var productNo = document.getElementById("shipmentnonso-productno").value;
    var refNo = document.getElementById("shipmentnonso-refno").value;

    transportTypeId = !isNaN(transportTypeId) ? transportTypeId : null;
    shipToName = shipToName !== "" ? shipToName : null;

    var newArr = [
      companyId,
      transporterId,
      deliveryDate,
      shipToId,
      shipToName,
      truckTypeId,
      qty,
      productNo,
      refNo,
      transportTypeId,
    ];

    // console.log(newArr);
    fnInsertShipmentNonSOData(newArr);
  };

  const onClickEditShipmentNonSO = () => {
    setIsConfirmEditShipNonSO(!isConfirmEditShipNonSO);
    var newObj = { ...items };
    var shipmentId = newObj.shipmentId;
    var companyId = newObj.companyId;
    var transporterId = newObj.transporterId;
    var transportTypeId = newObj.transportTypeId;
    var deliveryDate = newObj.deliveryDate;
    var shipToId = null;
    if (newObj.shipToId !== null) {
      shipToId = newObj.shipToId;
    }
    var shipToName = document.getElementById(
      "shipmentnonso-shipto-edittxt"
    ).value;
    var truckTypeId = newObj.truckTypeId;
    var qty = newObj.qty;
    var productNo = newObj.productNo;
    var refNo = newObj.refNo;

    shipToName = shipToName !== "" ? shipToName : null;

    var newArr = [
      shipmentId,
      companyId,
      transporterId,
      deliveryDate,
      shipToId,
      shipToName,
      truckTypeId,
      qty,
      productNo,
      refNo,
      transportTypeId,
    ];

    // console.log(newArr);
    fnUpdateShipmentNonSOData(newArr);
  };

  const onClickCloseDialogShowShipNonSOSucc = () => {
    setShipmentNonSoNo("");
    setIsShowSaveShipNonSOSuccess(!isShowSaveShipNonSOSuccess);
    window.location.reload(false);
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

    // console.log(newArr);
    fnUpdateDataList(newArr);
  };

  const onClickExportData = () => {
    setIsShowSelectExport(!isShowSelectExport);
    FunctionController.exportToExcel(
      fieldMain,
      FunctionController.setNumberValueInArray(fieldMain, baseItems),
      txtExportFileDeliveryList
    );
  };

  const fnSetDataToExportSaleOrderList = () => {
    var exportModeId = parseInt(
      document.getElementById("search-export-mode").value
    );
    if (exportModeId == 2 || exportModeId == 3 || exportModeId == 4) {
      var arrData = [
        ...FunctionController.setNumberValueInArray(fieldMain, baseItems),
      ];
      var newArr = [];
      // console.log(arrData);

      arrData.map((data) => {
        var newObj = {
          companyName: null,
          saleOrderNo: null,
          shipToCountry: null,
          shipToName: null,
          totalQty: null,
          totalTransportRate: null,
          totalExtraChargePrice: null,
          totalTransportPrice: null,
          totalShippingRate: null,
          totalExtraShippingPrice: null,
          totalShippingPrice: null,
        };
        if (!newArr.length) {
          newObj.companyName = data.companyName;
          newObj.saleOrderNo = data.saleOrderNo;
          newObj.shipToCountry = data.shipToCountry;
          newObj.shipToName = data.shipToName1;
          newObj.totalQty = data.qty;
          newObj.totalTransportRate = data.totalTransporterPrice;
          newObj.totalExtraChargePrice = data.extraChargePrice;
          newObj.totalTransportPrice = data.allTotalTransportPrice;
          newObj.totalShippingRate = data.totalShippingPrice;
          newObj.totalExtraShippingPrice = data.extraChargeShippingPrice;
          newObj.totalShippingPrice = data.allTotalShippingPrice;
          newArr.push(newObj);
        } else {
          var index = newArr.findIndex(
            (x) => x.saleOrderNo == data.saleOrderNo
          );
          if (index != -1) {
            newArr[index].companyName = data.companyName;
            newArr[index].saleOrderNo = data.saleOrderNo;
            newArr[index].shipToCountry = data.shipToCountry;
            newArr[index].shipToName = data.shipToName1;
            newArr[index].totalQty += data.qty;
            newArr[index].totalTransportRate += data.totalTransporterPrice;
            newArr[index].totalExtraChargePrice += data.extraChargePrice;
            newArr[index].totalTransportPrice += data.allTotalTransportPrice;
            newArr[index].totalShippingRate += data.totalShippingPrice;
            newArr[index].totalExtraShippingPrice +=
              data.extraChargeShippingPrice;
            newArr[index].totalShippingPrice += data.allTotalShippingPrice;
          } else {
            newObj.companyName = data.companyName;
            newObj.saleOrderNo = data.saleOrderNo;
            newObj.shipToCountry = data.shipToCountry;
            newObj.shipToName = data.shipToName1;
            newObj.totalQty = data.qty;
            newObj.totalTransportRate = data.totalTransporterPrice;
            newObj.totalExtraChargePrice = data.extraChargePrice;
            newObj.totalTransportPrice = data.allTotalTransportPrice;
            newObj.totalShippingRate = data.totalShippingPrice;
            newObj.totalExtraShippingPrice = data.extraChargeShippingPrice;
            newObj.totalShippingPrice = data.allTotalShippingPrice;
            newArr.push(newObj);
          }
        }
      });
      // console.log(newArr);

      FunctionController.exportToExcel(
        fieldsSaleOrderList,
        newArr,
        txtExportFileSaleOrderList
      );
    } else {
      setIsShowSelectExport(!isShowSelectExport);
      setIsShowWarningSaleOderList(!isShowWarningSaleOderList);
    }
  };

  const fnGetDataList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetExpDeliveryList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setBaseItems(
            FunctionController.setCurrencyAndEmptyValueInArray(
              fieldMain,
              result.data.vtexpshipmentList
            )
          );
          setSummaryItems(
            FunctionController.setCurrencyValueInArray(
              fieldSummary,
              result.data.summaryList
            )
          );
          var arrData = [...result.data.vtexpshipmentList];
          var newArr = [];
          arrData.map((x) => {
            if (newArr.length) {
              var result = newArr.find((y) => y.shipmentNo === x.shipmentNo);
              if (!result) {
                var newObj = {
                  saleOrderNo: null,
                  shipmentNo: null,
                  deliveryNo: null,
                };
                newObj.saleOrderNo = x.saleOrderNo;
                newObj.shipmentNo = x.shipmentNo;
                newObj.deliveryNo = x.deliveryNo;
                newArr.push(newObj);
              }
            } else {
              var newObj = {
                saleOrderNo: null,
                shipmentNo: null,
                deliveryNo: null,
              };
              newObj.saleOrderNo = x.saleOrderNo;
              newObj.shipmentNo = x.shipmentNo;
              newObj.deliveryNo = x.deliveryNo;
              newArr.push(newObj);
            }
          });
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

  const fnGetShipmentNonSODataById = (index) => {
    setIsPostingData(true);
    Repository.fetchGetShipmentNonSOById(index).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          fnGetCompanyList();
          fnGetTransporterNameOnlyList();
          fnGetShipToList();
          fnGetTruckTypeNameOnlyList();
          fnGetTransportTypeNameOnlyList();
          setItems(result.data);
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
    console.log(newArr);
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
    Repository.fetchGetExpDeliveryListById(arrData).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setItems(result.data.headerList);
          setContainerList(result.data.containerList);
          setDeliveryItemList(
            FunctionController.setCurrencyAndEmptyValueInArray(
              fieldDelivery,
              result.data.deliveryItemList
            )
          );
          setTotalQtyDeliveryList(
            FunctionController.setCurrencyValue(
              result.data.totalQtyDeliveryList,
              3
            )
          );
          setTransportRateList(
            FunctionController.setCurrencyAndEmptyValueInArray(
              fieldTransportRate,
              result.data.saleOrderPriceList
            )
          );
          setTotalPriceTransportRate(
            FunctionController.setCurrencyValue(
              result.data.totalTransportPrice,
              2
            )
          );
          setTotalPriceShippingRate(
            FunctionController.setCurrencyValue(
              result.data.totalShippingPrice,
              2
            )
          );
          setAllTotalPrice(
            FunctionController.setCurrencyValue(result.data.allTotalPrice, 2)
          );
          setOverAllStatus(result.data.overAllStatus);
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

  const fnGetExpTransportRateById = (index) => {
    setIsLoadingDataDetail(true);
    Repository.fetchGetExpTransportRateById(index).then(
      (result) => {
        setIsLoadingDataDetail(false);
        if (result.httpCode === "200") {
          setTransportRateDetailList(
            FunctionController.setCurrencyAndEmptyValueInArray(
              fieldDetailTransportRate,
              result.data
            )
          );
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsLoadingDataDetail(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetReCalTransportRate = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetReCalculateExpTransportRate(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setTransportRateList(
            FunctionController.setCurrencyAndEmptyValueInArray(
              fieldTransportRate,
              result.data.saleOrderPriceList
            )
          );
          setTotalPriceTransportRate(
            FunctionController.setCurrencyValue(
              result.data.totalTransportPrice,
              2
            )
          );
          setTotalPriceShippingRate(
            FunctionController.setCurrencyValue(
              result.data.totalShippingPrice,
              2
            )
          );
          setAllTotalPrice(
            FunctionController.setCurrencyValue(result.data.allTotalPrice, 2)
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

  const fnGetReCalculateMultiSaleOrder = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetReCalculateMultiSaleOrder(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsShowReCalSuccess(!isShowReCalSuccess);
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

  const fnInsertShipmentNonSOData = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchAddShipmentNonSO(arrData, true).then(
      (result) => {
        if (result.httpCode === "200") {
          fnGetShipmentNoByShipmentId(result.data);
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

  const fnGetShipmentNoByShipmentId = (index) => {
    Repository.fetchGetShipmentNoByShipmentId(index).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setShipmentNonSoNo(result.data);
          setIsShowSaveShipNonSOSuccess(!isShowSaveShipNonSOSuccess);
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

  const fnUpdateShipmentNonSOData = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchEditShipmentNonSO(arrData, true).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsShowEditShipNonSOSuccess(!isShowEditShipNonSOSuccess);
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

  const fnGetShipmentListBySaleOrder = (index) => {
    if (!deliveryItemList.length) {
      Repository.fetchGetShipmentListBySaleOrder(index).then(
        (result) => {
          if (result.httpCode === "200") {
            setDeliveryItemList(result.data);
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
      Repository.fetchGetTransporterNameOnlyList().then(
        (result) => {
          if (result.httpCode === "200") {
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

  const fnGetExportModeNameOnlyList = () => {
    if (!exportModeList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("ExportModeId").then(
        (result) => {
          if (result.httpCode === "200") {
            setExportModeList(
              result.data.filter((x) => x.valueMember.toString() === "1")
            );
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

  const fnGetTransportTypeNameOnlyList = () => {
    if (!transportTypeList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("TransportType").then(
        (result) => {
          if (result.httpCode === "200") {
            setTransportTypeList(result.data);
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

  const fnGetTransporterTypeNameOnlyList = () => {
    if (!transporterTypeList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("TransporterType").then(
        (result) => {
          if (result.httpCode === "200") {
            setTransporterTypeList(result.data);
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
          var newObj = isShipmentNonSO ? { ...objMainIndex } : { ...items };
          setIsOnchangeExtraCharge(true);
          fnGetExtraChargeDataList(newObj.saleOrderNo, true);
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
          fnGetExtraChargeDataList(newObj.saleOrderNo);
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
          var newObj = isShipmentNonSO ? { ...objMainIndex } : { ...items };
          setIsOnchangeExtraCharge(true);
          fnGetExtraChargeDataList(newObj.saleOrderNo);
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
    Repository.fetchGetShipmentExtraChargeListBySaleOrder(index).then(
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
            FunctionController.setCurrencyAndEmptyValueInArray(
              fieldExtraCharge,
              result.data
            )
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

  const fnGetExpDeliveryItemList = (arrData) => {
    setIsShowSelectExport(!isShowSelectExport);
    setIsPostingData(true);
    Repository.fetchGetExpDeliveryItemList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          FunctionController.exportToExcel(
            fieldExportAccrue,
            result.data,
            txtExportFileAccureFile
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
      VariableController.linkShipmentNo !== null &&
      VariableController.linkDeliveryNo !== null &&
      VariableController.linkSaleOrderNo !== null
    ) {
      var newArr = [
        VariableController.linkShipmentNo,
        VariableController.linkDeliveryNo,
        VariableController.linkSaleOrderNo,
      ];

      if (
        VariableController.linkObjSearchData !== null &&
        VariableController.linkArrDataList !== null
      ) {
        setObjLinkFormSearch(VariableController.linkObjSearchData);
        setBaseItems(VariableController.linkArrDataList);
        fnGetStartEndDate(false);
        fnGetTransporterNameOnlyList();
        fnGetTruckTypeNameOnlyList();
        fnGetSourceNameOnlyList();
        fnGetExportModeNameOnlyList();
        fnGetShipmentStatusNameOnlyList();
        fnGetEDPStatusNameOnlyList();
        fnGetPaymentStatusNameOnlyList();
        fnGetSummaryStatusNameOnlyList();
      } else {
        setIsLoaded(true);
      }

      fnGetDataListById(newArr);
    } else {
      fnGetStartEndDate();
    }
  };

  const fnGetStartEndDate = (isSetLoaded = true) => {
    Repository.fetchGetAutoStartEndDateTime().then(
      (result) => {
        if (isSetLoaded) {
          setIsLoaded(true);
        }
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
        if (isSetLoaded) {
          setIsLoaded(true);
        }
        setError(error);
      }
    );
  };

  const fnGetShipToList = () => {
    if (!shipTo.length) {
      Repository.fetchGetShipToList().then(
        (result) => {
          if (result.httpCode === "200") {
            setShipTo(result.data);
          } else {
            setError(result);
          }
        },
        (error) => {
          setError(error);
        }
      );
    }
  };

  const fnGetCompanyList = () => {
    if (!companyList.length) {
      Repository.fetchCompanyList().then(
        (result) => {
          if (result.httpCode === "200") {
            var data = result.data.filter(
              (x) => x.companyId !== 21 && x.companyId !== 22
            );
            console.log("data", data);
            setCompanyList(data);
          } else {
            console.log(result);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  useEffect(() => {
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
    }
    // else if (Object.keys(items).length && paymentStatusList.length) {
    else {
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
                  label="Sale Order Document Detail"
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
    if (Object.keys(items).length) {
      var newObj = { ...items };
      if (!isShipmentNonSO) {
        var txtFirstLoadDate = setFormatDate(newObj.loadingDate);
        var txtLastLoadDate = setFormatDate(newObj.loadingDate2);
        var txtSaleOrderNo = newObj.saleOrderNo ? newObj.saleOrderNo : "";
        var txtCompany = newObj.companyName
          ? setFormatCodeText(newObj.companyCode, newObj.companyName)
          : "";
        var txtSaleOrg = newObj.salesOrg ? newObj.salesOrg : "";
        var txtDeliveryMode = newObj.exportMode ? newObj.exportMode : "";
        var txtChannel = newObj.channel ? newObj.channel : "";
        var txtTransporter = newObj.transporterNameThai
          ? setFormatCodeText(
              newObj.transporterCode,
              newObj.transporterNameThai
            )
          : "";
        var txtShipping = newObj.shippingNameThai
          ? setFormatCodeText(newObj.shippingCode, newObj.shippingNameThai)
          : "";
        var txtSource = newObj.loadingLocationName
          ? setFormatCodeText(
              newObj.loadingLocationCode,
              newObj.loadingLocationName
            )
          : "";
        var txtHaulage = newObj.haulageNameThai
          ? setFormatCodeText(newObj.haulageCode, newObj.haulageNameThai)
          : "";
        var txtCyPlace = newObj.cyplaceNameEng
          ? setFormatCodeText(newObj.cyplaceCode, newObj.cyplaceNameEng)
          : "";
        var txtPlaceContainerReturnNameEng = newObj.placeContainerReturnNameEng
          ? setFormatCodeText(
              newObj.placeContainerReturnCode,
              newObj.placeContainerReturnNameEng
            )
          : "";
        var txtShipToCountry = newObj.shipToCountry ? newObj.shipToCountry : "";
        var txtBookerNote = newObj.bookerNote ? newObj.bookerNote : "";
        var txtRemarkforInternal = newObj.remarkforInternal
          ? newObj.remarkforInternal
          : "";
        var txtBookingNo = newObj.bookingNo ? newObj.bookingNo : "";
        var txtSoldToName = newObj.soldToName1
          ? setFormatCodeText(newObj.soldTo, newObj.soldToName1)
          : "";
        var txtShipToName = newObj.shipToName1
          ? setFormatCodeText(newObj.shipTo, newObj.shipToName1)
          : "";
        var txtShipAgentName = newObj.shipAgentName
          ? setFormatCodeText(newObj.shipAgentCode, newObj.shipAgentName)
          : "";
        var txtEndCustomerName = newObj.endCustomerName
          ? setFormatCodeText(newObj.endCustomerCode, newObj.endCustomerName)
          : "";

        var newOvAStatus = { ...overAllStatus };
        // var txtCreditDebitStatus = newObj.creditDebitStatus ? newObj.creditDebitStatus : "";
        // var txtShipmentStatus = newObj.shipmentStatus ? newObj.shipmentStatus : "";
        // var txtEDPstatus = newObj.edpstatus ? newObj.edpstatus : "";
        // var txtPaymentStatus = newObj.paymentStatus ? newObj.paymentStatus : "";
        return (
          <CForm>
            <CCard className="mb-1" xs="12" sm="6" md="12">
              <CCardHeader
                id="headingThree"
                class="d-flex justify-content-between"
              >
                <CButton
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={setCollapsedFormTapOne(1)}
                >
                  <CRow className="m-2 p-0">
                    <h6 className="m-2 p-0">
                      {Constant.arrTextGroupTransExpDelData[1]}
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
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[56]}
                        </CLabel>
                        <CInput
                          size="xs"
                          type="date"
                          value={txtFirstLoadDate}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[55]}
                        </CLabel>
                        <CInput size="xs" type="date" value={txtLastLoadDate} />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[21]}
                        </CLabel>
                        <CInput type="text" value={txtSaleOrderNo} />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[25]}
                        </CLabel>
                        <CInput type="text" value={txtCompany} />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="m-1 p-0 ">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[27]}
                        </CLabel>
                        <CInput type="text" value={txtSaleOrg} />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[8]}
                        </CLabel>
                        <CInput type="text" value={txtDeliveryMode} />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[28]}
                          </CLabel>
                          <CInput type="text" value={txtChannel} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[2]}
                        </CLabel>
                        <CInput type="text" value={txtTransporter} />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="m-1 p-0 ">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[3]}
                          </CLabel>
                          <CInput type="text" value={txtShipping} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[29]}
                          </CLabel>
                          <CInput type="text" value={txtHaulage} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[4]}
                        </CLabel>
                        <CInput type="text" value={txtSource} />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[52]}
                          </CLabel>
                          <CInput type="text" value={txtSoldToName} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="m-1 p-0 ">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[43]}
                          </CLabel>
                          <CInput type="text" value={txtShipToName} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[53]}
                          </CLabel>
                          <CInput type="text" value={txtShipAgentName} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[54]}
                          </CLabel>
                          <CInput type="text" value={txtEndCustomerName} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[31]}
                          </CLabel>
                          <CInput type="text" value={txtCyPlace} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="m-1 p-0 ">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[30]}
                        </CLabel>
                        <CInput
                          type="text"
                          value={txtPlaceContainerReturnNameEng}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[32]}
                        </CLabel>
                        <CInput type="text" value={txtShipToCountry} />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[33]}
                          </CLabel>
                          <CInput type="text" value={txtBookerNote} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>
                          {Constant.arrFieldTransExpDeliveryMain[34]}
                        </CLabel>
                        <CInput type="text" value={txtRemarkforInternal} />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="m-1 p-0 ">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[35]}
                          </CLabel>
                          <CInput type="text" value={txtBookingNo} />
                        </CFormGroup>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="justify-content-left m-4">
                    <CCard>
                      <CCardBody>
                        <CDataTable
                          className="CDataTable ml-1 mr-1"
                          items={containerList}
                          fields={fieldContainer}
                          // hover
                          striped
                          bordered
                          itemsPerPage={10}
                          pagination
                        />
                      </CCardBody>
                    </CCard>
                  </CRow>
                </CCardBody>
              </CCollapse>
            </CCard>
            <CCard className="mb-1" xs="12" sm="6" md="12">
              <CCardHeader
                id="headingThree"
                class="d-flex justify-content-between"
              >
                <CButton
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={setCollapsedFormTapOne(2)}
                >
                  <CRow className="m-2 p-0">
                    <h6 className="m-2 p-0">
                      {Constant.arrTextGroupTransExpDelData[2]}
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
                          itemsPerPage={10}
                          pagination
                          scopedSlots={{
                            deliveryDate: (item, index) => {
                              var newDate = new Date(item.deliveryDate);
                              newDate = newDate.toLocaleDateString();
                              return <td className="py-2">{newDate}</td>;
                            },
                          }}
                        />
                      </CCardBody>
                    </CCard>
                  </CRow>
                  <CRow className="m-2 p-0">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel htmlFor="ccmonth">
                          {Constant.arrFieldTransExpDelItemList[18]}
                        </CLabel>
                        <CInput type="text" value={totalQtyDeliveryList} />
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
                        {Constant.arrTextGroupTransExpDelData[3]}
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
                            itemsPerPage={10}
                            pagination
                            scopedSlots={{
                              collepse: (data, index) => (
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
                                      shape="square"
                                      size={Constant.btAddData}
                                      block
                                      onClick={() => {
                                        toggleDetails(index, data.shipmentNo);
                                      }}
                                    >
                                      {details.includes(index)
                                        ? `${Constant.btCollapseHide}`
                                        : `${Constant.btCollapseShow}`}
                                    </CButton>
                                  </Box>
                                </td>
                              ),
                              viewContractTransport: (data, index) => {
                                return (
                                  <td>
                                    <CButton
                                      color="primary"
                                      // style={{ overflow: 'hidden' }}
                                      size={Constant.btAddData}
                                      block
                                      onClick={() =>
                                        onClickConfirmViewContract(
                                          "Transport",
                                          data.shipmentNo
                                        )
                                      }
                                    >
                                      {Constant.btViewContractTransport}
                                    </CButton>
                                  </td>
                                );
                              },
                              viewContractShipping: (data, index) => {
                                return (
                                  <td>
                                    <CButton
                                      className="btn-warning"
                                      // style={{ overflow: 'hidden' }}
                                      size={Constant.btAddSize}
                                      block
                                      onClick={() =>
                                        onClickConfirmViewContract(
                                          "Shipping",
                                          data.shipmentNo
                                        )
                                      }
                                    >
                                      {Constant.btViewContractShipping}
                                    </CButton>
                                  </td>
                                );
                              },
                              details: (data, index) => {
                                return (
                                  <CCollapse show={details.includes(index)}>
                                    <CCardBody>
                                      {showTransportRateDetail()}
                                    </CCardBody>
                                  </CCollapse>
                                );
                              },
                            }}
                          />
                        </CCardBody>
                      </CCard>
                    </CRow>
                    <CRow className="m-2 p-0">
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">
                            {Constant.arrFieldTransExpDelTransport[5]}
                          </CLabel>
                          <CInput type="text" value={totalPriceTransportRate} />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">
                            {Constant.arrFieldTransExpDelTransport[6]}
                          </CLabel>
                          <CInput type="text" value={totalPriceShippingRate} />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">
                            {Constant.arrFieldTransExpDelTransport[7]}
                          </CLabel>
                          <CInput type="text" value={allTotalPrice} />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <CRow className="d-flex justify-content-center">
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
                        {Constant.arrTextGroupTransExpDelData[4]}
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
                    <CRow className="m-1 p-0">
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[11]}
                          </CLabel>
                          <CInput type="text" value={newOvAStatus.edpStatus} />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[13]}
                          </CLabel>
                          <CInput
                            type="text"
                            value={newOvAStatus.shipmentStatus}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel>
                            {Constant.arrFieldTransExpDeliveryMain[14]}
                          </CLabel>
                          <CInput
                            type="text"
                            value={newOvAStatus.paymentStatus}
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCollapse>
              </CForm>
            </CCard>
          </CForm>
        );
      } else {
        // console.log(newObj);
        var companyId = newObj.companyId;
        var transporterId = newObj.transporterId;
        var transportTypeId = newObj.transportTypeId
          ? newObj.transportTypeId.toString()
          : null;
        var deliveryDate = setFormatDate(newObj.deliveryDate);
        var shipToId = newObj.shipToId;
        var truckTypeId = newObj.truckTypeId;
        var qty = newObj.qty;
        var productNo = newObj.productNo;
        var refNo = newObj.refNo;
        // var isTransporter = false;
        // if (roleUser === trstCode) {
        //   isTransporter = true;
        // }

        if (
          companyList.length &&
          transporterList.length &&
          shipTo.length &&
          truckTypeList.length &&
          transportTypeList.length
        ) {
          return (
            <div>
              <CCard color="gradient-secondary" className="color-card-gra p-3">
                <CCardBody className="font-form-scg-card">
                  <CForm
                    className="need-validation-edit-shipmentnonso"
                    noValidate
                  >
                    <CCard className="mb-1" xs="12" sm="6" md="12">
                      <CCardHeader
                        id="headingThree"
                        class="d-flex justify-content-between"
                      >
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
                        <CButton
                          color="link"
                          onClick={setCollapsedFormTapOne(1)}
                        >
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
                          <CRow>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[0]}
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
                                  <Autocomplete
                                    size="small"
                                    options={companyList}
                                    loading
                                    autoHighlight
                                    filterSelectedOptions
                                    disabled={isShipmentComplete}
                                    defaultValue={companyList.find(
                                      (x) => x.companyId === companyId
                                    )}
                                    onChange={onChangeUpdateShipmentNonSO(
                                      "company"
                                    )}
                                    getOptionLabel={(option) =>
                                      `[${option.companyCode}] ` +
                                      option.companyName
                                    }
                                    renderOption={(option) => {
                                      return (
                                        <Typography
                                          className={
                                            classes.autoCompleteRenderOptions
                                          }
                                        >
                                          {`[${option.companyCode}] ` +
                                            option.companyName}
                                        </Typography>
                                      );
                                    }}
                                    renderInput={(params) => {
                                      params.inputProps.className =
                                        classes.autoCompleteInputLabel;
                                      return (
                                        <TextField
                                          size="small"
                                          error={
                                            invalidMaterialFormAddShipNonSo[0]
                                          }
                                          {...params}
                                          onClick={fnGetCompanyList}
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
                                          helperText={
                                            invalidMaterialFormAddShipNonSo[0] ? (
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
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[1]}
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
                                  {showEditShipmentNonSO(transporterId)}
                                </Box>
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CFormGroup>
                                  <CLabel htmlFor="name">
                                    {Constant.arrFieldTransExpDeliveryMain[40]}
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
                                      onClick={fnGetTransportTypeNameOnlyList}
                                      onChange={onChangeUpdateShipmentNonSO(
                                        "transporttype"
                                      )}
                                      required
                                    >
                                      <option
                                        selected
                                        hidden
                                        value={transportTypeId}
                                      >
                                        {
                                          transportTypeList.find(
                                            (x) =>
                                              x.valueMember === transportTypeId
                                          ).displayMember
                                        }
                                      </option>
                                      {transportTypeList.map((x) =>
                                        x.valueMember !== "1" ? (
                                          <option value={x.valueMember}>
                                            {x.displayMember}{" "}
                                          </option>
                                        ) : null
                                      )}
                                    </CSelect>
                                  </Box>
                                  <CInvalidFeedback>
                                    {Constant.inValidNullSelected}
                                  </CInvalidFeedback>
                                </CFormGroup>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[2]}
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
                                    placeholder="date"
                                    disabled={isShipmentComplete}
                                    value={deliveryDate}
                                    onChange={onChangeUpdateShipmentNonSO(
                                      "deliverydate"
                                    )}
                                    required
                                  />
                                  <CInvalidFeedback>
                                    {Constant.inValidNullMessage}
                                  </CInvalidFeedback>
                                </Box>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[3]}
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
                                  <Autocomplete
                                    size="small"
                                    options={truckTypeList}
                                    loading
                                    autoHighlight
                                    filterSelectedOptions
                                    disabled={isShipmentComplete}
                                    defaultValue={truckTypeList.find(
                                      (x) => x.truckTypeId === truckTypeId
                                    )}
                                    onChange={onChangeUpdateShipmentNonSO(
                                      "trucktype"
                                    )}
                                    getOptionLabel={(option) =>
                                      `[${option.truckTypeCode}] ` +
                                      option.truckTypeName
                                    }
                                    renderOption={(option) => {
                                      return (
                                        <Typography
                                          className={
                                            classes.autoCompleteRenderOptions
                                          }
                                        >
                                          {`[${option.truckTypeCode}] ` +
                                            option.truckTypeName}{" "}
                                        </Typography>
                                      );
                                    }}
                                    renderInput={(params) => {
                                      params.inputProps.className =
                                        classes.autoCompleteInputLabel;
                                      return (
                                        <TextField
                                          size="small"
                                          error={
                                            invalidMaterialFormAddShipNonSo[3]
                                          }
                                          onClick={fnGetTruckTypeNameOnlyList}
                                          {...params}
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
                                          helperText={
                                            invalidMaterialFormAddShipNonSo[3] ? (
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
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[4]}
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
                                  <Autocomplete
                                    size="small"
                                    options={shipTo}
                                    loading
                                    autoHighlight
                                    filterSelectedOptions
                                    disabled={isShipmentComplete}
                                    defaultValue={shipTo.find(
                                      (x) => x.shipToId === shipToId
                                    )}
                                    onChange={onChangeUpdateShipmentNonSO(
                                      "shipto"
                                    )}
                                    getOptionLabel={(option) =>
                                      `[${option.shipToCode}] ` +
                                      option.shipToNameThai
                                    }
                                    renderOption={(option) => {
                                      return (
                                        <Typography
                                          className={
                                            classes.autoCompleteRenderOptions
                                          }
                                        >
                                          {`[${option.shipToCode}] ` +
                                            option.shipToNameThai}
                                        </Typography>
                                      );
                                    }}
                                    renderInput={(params) => {
                                      params.inputProps.className =
                                        classes.autoCompleteInputLabel;
                                      return (
                                        <TextField
                                          size="small"
                                          error={
                                            invalidMaterialFormAddShipNonSo[2]
                                          }
                                          {...params}
                                          onClick={fnGetShipToList}
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
                                          helperText={
                                            invalidMaterialFormAddShipNonSo[2] ? (
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
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[5]}
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
                                    type="text"
                                    id="shipmentnonso-shipto-edittxt"
                                    value={shipToId !== null ? "" : null}
                                    disabled={
                                      shipToId !== null || isShipmentComplete
                                    }
                                    required
                                  />
                                </Box>
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[6]}
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
                                    type="text"
                                    disabled={isShipmentComplete}
                                    value={qty}
                                    onChange={onChangeUpdateShipmentNonSO(
                                      "qty"
                                    )}
                                    onBlur={() =>
                                      setItems(
                                        FunctionController.onBlurChangePrice(
                                          items,
                                          3,
                                          "qty",
                                          null,
                                          0
                                        )
                                      )
                                    }
                                    onClick={() =>
                                      setItems(
                                        FunctionController.onClickChangePrice(
                                          items,
                                          "qty"
                                        )
                                      )
                                    }
                                    required
                                  />
                                </Box>
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[7]}
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
                                    type="text"
                                    disabled={isShipmentComplete}
                                    value={productNo}
                                    onChange={onChangeUpdateShipmentNonSO(
                                      "productno"
                                    )}
                                    required
                                  />
                                </Box>
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="6">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">
                                  {Constant.arrFieldShipmentNonSO[8]}
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
                                    type="text"
                                    disabled={isShipmentComplete}
                                    value={refNo}
                                    onChange={onChangeUpdateShipmentNonSO(
                                      "refno"
                                    )}
                                    required
                                  />
                                </Box>
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCardBody>
                      </CCollapse>
                    </CCard>
                  </CForm>
                  {showButtonEditShipNonSO()}
                </CCardBody>
              </CCard>
            </div>
          );
        } else {
          return (
            <div>
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
            </div>
          );
        }
      }
    } else {
      return (
        <div>
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
        </div>
      );
    }
  };

  const showEditShipmentNonSO = (transporterId) => {
    if (roleUser !== trstCode) {
      return (
        <Autocomplete
          size="small"
          options={transporterList}
          loading
          autoHighlight
          filterSelectedOptions
          disabled={isShipmentComplete}
          defaultValue={transporterList.find(
            (x) => x.transporterId === transporterId
          )}
          onChange={onChangeUpdateShipmentNonSO("transporter")}
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
                error={invalidMaterialFormAddShipNonSo[1]}
                {...params}
                onClick={fnGetTransporterNameOnlyList}
                label={
                  <Typography className={classes.autoCompleteInputLabel}>
                    {Constant.txtformPlaceholderSelected}
                  </Typography>
                }
                helperText={
                  invalidMaterialFormAddShipNonSo[1] ? (
                    <Typography className={classes.autoCompleteInputHelperText}>
                      {Constant.inValidNullSelected}
                    </Typography>
                  ) : null
                }
                variant="outlined"
              />
            );
          }}
        />
      );
    } else {
      var transporter = transporterList.find(
        (x) => x.transporterId === transporterId
      );
      return (
        <CInput
          type="text"
          value={
            "[" +
            transporter.transporterCode +
            "] " +
            transporter.transporterNameThai
          }
          disabled={isShipmentComplete}
          required
        />
      );
    }
  };

  const showButtonEditShipNonSO = () => {
    if (!isShipmentComplete) {
      return (
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
                  size={Constant.btEditData}
                  block
                  color="primary"
                  onClick={onClickCheckEditShipmentNonSO}
                >
                  {Constant.btSave}
                </CButton>
              </Box>
            </CFormGroup>
          </CCol>
        </CRow>
      );
    }
  };

  const showTransportRateDetail = () => {
    if (isLoadingDataDetail) {
      return (
        <div>
          <br />
          <br />
          <br />
          {showLoadingData()}
          <br />
          <br />
          <br />
        </div>
      );
    } else if (transportRateDetailList.length) {
      return (
        <CRow className="justify-content-center m-4">
          <CCard>
            <CCardBody>
              <CDataTable
                className="CDataTable ml-1 mr-1"
                items={transportRateDetailList}
                fields={fieldDetailTransportRate}
                // hover
                striped
                bordered
                itemsPerPage={10}
                pagination
              />
            </CCardBody>
          </CCard>
        </CRow>
      );
    } else {
      return null;
    }
  };

  const showButtonReCal = () => {
    if (roleUser === empCode && !isShipmentComplete) {
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

  const formDialogTabTwo = () => {
    var newObj = { ...objMainIndex };
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
                  {Constant.arrTextGroupTransExpDelData[6]}
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
              <CForm className="need-validation-extracharge" noValidate>
                <CRow className="m-1 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransExpDelMasterExtc[0]}
                      </CLabel>
                      <CSelect
                        className=" form-control"
                        id="edit-shipmentNo-extc"
                        disabled={isShipmentComplete}
                        onClick={
                          isShipmentNonSO
                            ? () =>
                                fnGetShipmentListBySaleOrder(newObj.saleOrderNo)
                            : null
                        }
                        required
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>
                        {deliveryItemList.map((x) => (
                          <option value={x.shipmentNo}>{x.shipmentNo} </option>
                        ))}
                      </CSelect>
                      <CInvalidFeedback>
                        {Constant.inValidNullSelected}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransExpDelMasterExtc[1]}
                      </CLabel>
                      <CSelect
                        className=" form-control"
                        id="edit-extrachargetype"
                        onClick={fnGetExtraChargeTypeNameOnlyList}
                        onChange={handleChangeExtraChargeType}
                        disabled={isShipmentComplete}
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
                        {Constant.arrFieldTransExpDelMasterExtc[2]}
                      </CLabel>
                      <Autocomplete
                        id="edit-extrachargelist"
                        size="small"
                        options={extraChargeNameList}
                        onChange={handleChangeExtraChargeName}
                        disabled={isShipmentComplete}
                        getOptionLabel={(option) =>
                          `[${option.extraChargeCode}] ` +
                          option.extraChargeName
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
                itemsPerPage={10}
                striped
                bordered
                pagination
                scopedSlots={{
                  extraChargeStatus: (item) => (
                    <td>
                      <h4>
                        <CBadge
                          color={FunctionController.setGetBadge(
                            item.extraChargeStatus
                          )}
                        >
                          {item.extraChargeStatus}
                        </CBadge>
                      </h4>
                    </td>
                  ),
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
                  {Constant.arrTextGroupTransExpDelData[5]}
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
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransExpDelMasterExtc[0]}
                      </CLabel>
                      <CSelect
                        className=" form-control"
                        id="edit-shipmentNo-multi"
                        required
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>
                        {deliveryItemList.map((x) => (
                          <option value={x.shipmentNo}>{x.shipmentNo} </option>
                        ))}
                      </CSelect>
                      <CInvalidFeedback>
                        {Constant.inValidNullSelected}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="5" sm="6" md="4">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransExpDelMultiDrop[0]}
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
                  <CCol xs="5" sm="6" md="4">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransExpDelMultiDrop[1]}
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
                <CCol xs="12" sm="6" md="2">
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
          {formExtraChargeTransporterType(newObj)}
          {formExtraChargeQty(newObj)}
          {formExtraChargePrice(newObj)}
          {formExtraChargeVatPrice(newObj)}
          {formExtraChargeAttackFile(newObj)}
        </CRow>
      );
    }
  };

  const formExtraChargeTransporterType = (obj) => {
    if (obj.transporterTypeId === null) {
      return (
        <CCol xs="12" sm="6" md="3">
          <CFormGroup>
            <CLabel>{Constant.arrFieldTransExpDelMasterExtc[9]}</CLabel>
            <CSelect
              className=" form-control"
              id="edit-transporter-type"
              required
              onClick={fnGetTransporterTypeNameOnlyList}
            >
              <option selected hidden value="">
                {Constant.txtformPlaceholderSelected}
              </option>
              {transporterTypeList.map((x) => (
                <option value={x.valueMember}>{x.displayMember} </option>
              ))}
            </CSelect>
          </CFormGroup>
        </CCol>
      );
    }
  };

  const formExtraChargeVatPrice = (obj) => {
    var numVat = obj.vatPrice;
    return (
      <CCol xs="12" sm="6" md="3">
        <CFormGroup>
          <CLabel>{Constant.arrFieldTransExpDelMasterExtc[3]}</CLabel>
          <CInputGroup>
            <CInput type="text" value={numVat} disabled />
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
          <CLabel>{Constant.arrFieldTransExpDelMasterExtc[4]}</CLabel>
          <CInputGroup>
            <CInput
              id="extc-input-price"
              type="text"
              // type={isFix ? "text" : "number"}
              // min="0"
              // max={numMax}
              // step="0.01"
              value={numValue}
              onChange={isFix ? null : handleChangeExtraChargePrice}
              onBlur={
                isFix
                  ? null
                  : () =>
                      setExtraChargeNameObj(
                        FunctionController.onBlurChangePrice(
                          extraChargeNameObj,
                          2,
                          "extraChargePrice",
                          null,
                          null,
                          numMax
                        )
                      )
              }
              onClick={
                isFix
                  ? null
                  : () =>
                      setExtraChargeNameObj(
                        FunctionController.onClickChangePrice(
                          extraChargeNameObj,
                          "extraChargePrice"
                        )
                      )
              }
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
            <CLabel>{Constant.arrFieldTransExpDelMasterExtc[5]}</CLabel>
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
            <CLabel>{Constant.arrFieldTransExpDelMasterExtc[6]}</CLabel>
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
                <CLabel>{Constant.arrFieldTransExpDelMasterExtc[7]}</CLabel>
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
            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
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
            {Constant.arrFieldTransExpDelMasterExtc[8]} : {arrtxtDesc[0]}
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
              <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
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
            <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
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
    var dateStart = null;
    var dateEnd = null;
    var monthyear = null;
    var shipmentNo = null;
    var deliveryNo = null;
    var saleOrderNo = null;
    var sourceId = null;
    var transporterId = null;
    var shippingid = null;
    var truckTypeId = null;
    var exportModeId = null;
    var edpStatus = null;
    var shipmentStatus = null;
    var paymentStatus = null;
    var summaryStatus = null;

    if (Object.keys(objLinkFormSearch).length) {
      var newObj = { ...objLinkFormSearch };
      dateStart = newObj.dateStart;
      dateEnd = newObj.dateEnd;
      monthyear = newObj.monthyear;
      shipmentNo = newObj.shipmentNo;
      deliveryNo = newObj.deliveryNo;
      saleOrderNo = newObj.saleOrderNo;
      sourceId = newObj.sourceId;
      transporterId = newObj.transporterId;
      shippingid = newObj.shippingid;
      truckTypeId = newObj.truckTypeId;
      exportModeId = newObj.exportModeId;
      edpStatus = newObj.edpStatus;
      shipmentStatus = newObj.shipmentStatus;
      paymentStatus = newObj.paymentStatus;
      summaryStatus = newObj.summaryStatus;
    }
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
                    {Constant.arrTextGroupTransExpDelData[0]}
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
                                value={dateStart ? dateStart : startDate}
                                onChange={
                                  dateStart
                                    ? handleChangeUpdateLinkSearch("datestart")
                                    : (e) => setStartDate(e.target.value)
                                }
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
                                value={dateEnd ? dateEnd : endDate}
                                onChange={
                                  dateEnd
                                    ? handleChangeUpdateLinkSearch("dateend")
                                    : (e) => setEndDate(e.target.value)
                                }
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
                    <CForm className="search-monthyear-need-validation">
                      <CRow>
                        <CCol>
                          <CFormGroup>
                            <CLabel htmlFor="cvv">
                              {Constant.arrFieldTransExpDeliverySearch[2]}
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
                                type="month"
                                id="search-monthyear"
                                value={monthyear ? monthyear : null}
                                onChange={
                                  monthyear
                                    ? handleChangeUpdateLinkSearch("monthyear")
                                    : handleChangeMonthYear
                                }
                                invalid={invalidFormSearch[2]}
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
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[25]}
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
                            id="search-Company"
                            size="small"
                            options={companyList}
                            onChange={handleChangeSelectSearch("company")}
                            getOptionLabel={(option) =>
                              `[${option.companyCode}] ` + option.companyName
                            }
                            renderOption={(option) => {
                              return (
                                <Typography
                                  className={classes.autoCompleteRenderOptions}
                                >
                                  {`[${option.companyCode}] ` +
                                    option.companyName}
                                </Typography>
                              );
                            }}
                            renderInput={(params) => {
                              params.inputProps.className =
                                classes.autoCompleteInputLabel;
                              return (
                                <TextField
                                  size="small"
                                  // error={invalidMaterialFormSearch[1]}
                                  {...params}
                                  onClick={fnGetCompanyList}
                                  label={
                                    <Typography
                                      className={classes.autoCompleteInputLabel}
                                    >
                                      {Constant.txtformPlaceholderSelected}
                                    </Typography>
                                  }
                                  // helperText={
                                  //   invalidMaterialFormSearch[1] ? (
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
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[2]}
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
                          {showInputTransporter(transporterId)}
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[3]}
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
                          {showInputShipping(shippingid)}
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[5]}
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
                            id="search-trucktype"
                            size="small"
                            options={truckTypeList}
                            defaultValue={
                              truckTypeId
                                ? truckTypeList.find(
                                    (x) => x.truckTypeId === truckTypeId
                                  )
                                : null
                            }
                            onChange={handleChangeSelectSearch("trucktype")}
                            getOptionLabel={(option) =>
                              `[${option.truckTypeCode}] ` +
                              option.truckTypeName
                            }
                            renderOption={(option) => {
                              return (
                                <Typography
                                  className={classes.autoCompleteRenderOptions}
                                >
                                  {`[${option.truckTypeCode}] ` +
                                    option.truckTypeName}{" "}
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
                                  onClick={fnGetTruckTypeNameOnlyList}
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
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[4]}
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
                            defaultValue={
                              sourceId
                                ? sourceList.find(
                                    (x) => x.sourceId === sourceId
                                  )
                                : null
                            }
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
                  </CCol>
                </CRow>
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[40]}
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
                            id="search-export-mode"
                            onClick={fnGetExportModeNameOnlyList}
                          >
                            <option
                              selected
                              hidden
                              value={exportModeId ? exportModeId : ""}
                            >
                              {exportModeId
                                ? exportModeList.find(
                                    (x) =>
                                      x.valueMember === exportModeId.toString()
                                  ).displayMember
                                : Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
                            </option>
                            {exportModeList.map((x) => (
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
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[21]}
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
                            value={saleOrderNo ? saleOrderNo : null}
                            onChange={
                              saleOrderNo
                                ? handleChangeUpdateLinkSearch("saleorder")
                                : null
                            }
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
                          {Constant.arrFieldTransExpDeliveryMain[1]}
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
                            value={deliveryNo ? deliveryNo : null}
                            onChange={
                              deliveryNo
                                ? handleChangeUpdateLinkSearch("deliveryno")
                                : null
                            }
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
                          {Constant.arrFieldTransExpDeliveryMain[0]}
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
                            value={shipmentNo ? shipmentNo : null}
                            onChange={
                              shipmentNo
                                ? handleChangeUpdateLinkSearch("shipmentno")
                                : null
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
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[11]}
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
                            <option
                              selected
                              hidden
                              value={edpStatus ? edpStatus : ""}
                            >
                              {edpStatus
                                ? edpStatus
                                : Constant.txtformPlaceholderSelected}
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
                  </CCol>
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[13]}
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
                            <option
                              selected
                              hidden
                              value={shipmentStatus ? shipmentStatus : ""}
                            >
                              {shipmentStatus
                                ? shipmentStatus
                                : Constant.txtformPlaceholderSelected}
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
                          {Constant.arrFieldTransExpDeliveryMain[14]}
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
                            defaultValue={
                              paymentStatus
                                ? paymentStatusList.find(
                                    (x) => x.displayMember === paymentStatus
                                  )
                                : null
                            }
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
                            <option
                              selected
                              hidden
                              value={summaryStatus ? summaryStatus : ""}
                            >
                              {summaryStatus
                                ? summaryStatusList.find(
                                    (x) =>
                                      x.valueMember === summaryStatus.toString()
                                  ).displayMember
                                : Constant.txtformPlaceholderSelected}
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

  const showInputTransporter = (transporterId) => {
    if (roleUser === empCode || roleUser === trstCode) {
      var result = [];
      if (roleUser === empCode) {
        result = transporterList;
      } else if (roleUser === trstCode) {
        if (transporterList.length) {
          result = transporterList.filter(
            (x) => x.transporterId === _TranspoterId
          );
        }
      }
      return (
        <Autocomplete
          id="search-transporter"
          size="small"
          options={result}
          defaultValue={
            transporterId
              ? transporterList.find((x) => x.transporterId === transporterId)
              : null
          }
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
    } else {
      return null;
    }
  };

  const showInputShipping = (shippingid) => {
    if (roleUser === empCode || roleUser === trstCode) {
      var result = [];
      if (roleUser === empCode) {
        result = transporterList;
      } else if (roleUser === trstCode) {
        if (transporterList.length) {
          result = transporterList.filter(
            (x) => x.transporterId === _TranspoterId
          );
        }
      }
      return (
        <Autocomplete
          id="search-shipping"
          size="small"
          options={result}
          defaultValue={
            shippingid
              ? transporterList.find((x) => x.transporterId === shippingid)
              : null
          }
          onChange={handleChangeSelectSearch("shipping")}
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
                error={invalidMaterialFormSearch[1]}
                {...params}
                onClick={fnGetTransporterNameOnlyList}
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
    } else {
      return null;
    }
  };

  const tableSearch = () => {
    return (
      <CCard>
        <CCardHeader>{showButtonManage()}</CCardHeader>
        <CCardBody>{showTabManage()}</CCardBody>
      </CCard>
    );
  };

  const showButtonManage = () => {
    if (roleUser === empCode) {
      return (
        <CRow className="d-flex justify-content-end">
          <CCol xs="4" sm="3" md="2">
            <CFormGroup>
              <CButton
                className="btn-success"
                size={Constant.btHeaderSize}
                block
                onClick={() => setIsConfirmReCal(!isConfirmReCal)}
              >
                {Constant.btReCalculate}
              </CButton>
            </CFormGroup>
          </CCol>
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
          <CCol xs="4" sm="3" md="2">
            <CFormGroup>
              <CButton
                className="btn-danger"
                size={Constant.btHeaderSize}
                block
                onClick={() => setIsConfirmDeleteNonSO(!isConfirmDeleteNonSO)}
              >
                {Constant.btDeleteShipmentNonSOData}
              </CButton>
            </CFormGroup>
          </CCol>
        </CRow>
      );
    } else if (roleUser === trstCode) {
      return (
        <CRow className="d-flex justify-content-end">
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
        </CRow>
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
            {showTabOne()}
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
        striped
        bordered
        itemsPerPage={3}
        pagination
        // scopedSlots={{
        //   totalQty: (item) => {
        //     var value = FunctionController.setNumberCurrency(item.totalQty, 3);
        //     return (
        //       <td>{value}</td>
        //     )
        //   },
        //   totalTransportPrice: (item) => {
        //     var value = FunctionController.setNumberCurrency(item.totalTransportPrice, 2);
        //     return (
        //       <td>{value}</td>
        //     )
        //   },
        //   totalShippingPrice: (item) => {
        //     var value = FunctionController.setNumberCurrency(item.totalShippingPrice, 2);
        //     return (
        //       <td>{value}</td>
        //     )
        //   }
        // }}
      />
    </h6>
  );

  const showTabTwo = () => (
    <h6>
      <CRow>
        <CCol>
          <CFormGroup>
            <CButton color="secondary" onClick={onClickSetAllChangeStatus}>
              {Constant.btSelectAll}
            </CButton>{" "}
            <SiMicrosoftexcel
              size="40px"
              color="green"
              onClick={() => setIsShowSelectExport(!isShowSelectExport)}
            />
          </CFormGroup>
        </CCol>
        {/* <CCol xs="4" sm="3" md="2">
        <CFormGroup>
          <CButton className="btn-success" size={Constant.btHeaderSize} block
            onClick={() => FunctionController.exportToExcel(fieldMain, baseItems, "DeliveryList-Export")}
          >
            {"Export Data"}
          </CButton>
        </CFormGroup>
      </CCol> */}
      </CRow>
      <CCard className="p-2" style={{ maxHeight: "700px", overflowY: "auto" }}>
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
          // hover
          // striped
          // bordered
          itemsPerPage={10}
          pagination
          scopedSlots={{
            checked: (item, index) => {
              var result = readyChangeStatusList.find(
                (x) =>
                  x.shipmentNo === item.shipmentNo &&
                  x.deliveryNo === item.deliveryNo 
                  // && 
                  // (x.edpStatus === 'Match' || x.edpStatus ==='Match(With Condition)')
              );
              if (result) {
                var isChecked = false;
                if (changeStatusList.length) {
                  var newObj = changeStatusList.find(
                    (x) =>
                      x.shipmentNo === item.shipmentNo &&
                      x.deliveryNo === item.deliveryNo 
                      // && 
                      // (x.edpStatus === 'Match' || x.edpStatus ==='Match(With Condition)')
                  );
                  if (newObj) {
                    isChecked = true;
                  }
                }
                return (
                  <td>
                    <Checkbox
                      checked={isChecked}
                      color="primary"
                      onChange={setItemChangeStatus(item)}
                    />
                  </td>
                );
              } else {
                return <td></td>;
              }
            },
            deliveryDate: (item) => {
              var newDate = new Date(item.deliveryDate);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            loadingDate2: (item) => {
              var newDate = new Date(item.loadingDate2);
              newDate = newDate.toLocaleDateString();
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
            shipmentStatus: (item) => (
              <td>
                <h4>
                  <CBadge color={getBadge(item.shipmentStatus)}>
                    {item.shipmentStatus}
                  </CBadge>
                </h4>
              </td>
            ),
            rejectReason: (item) => {
              if (roleUser === trstCode) {
                var result = readyChangeStatusList.find(
                  (x) =>
                    x.shipmentNo === item.shipmentNo &&
                    x.deliveryNo === item.deliveryNo
                );
                if (result) {
                  return (
                    <td>
                      <CInput
                        id={"remark-" + item.shipmentNo + "-" + item.deliveryNo}
                      />
                    </td>
                  );
                }
              }
              return <td>{item.rejectReason}</td>;
            },
            manage: (item) => {
              var isComplete = item.shipmentStatus === "Complete";
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    size={Constant.btAddSize}
                    block
                    onClick={onClickOpenDialog(
                      [item.shipmentNo, item.deliveryNo, item.saleOrderNo],
                      isComplete
                    )}
                  >
                    {Constant.btEditData}
                  </CButton>
                </td>
              );
            },
          }}
        />
      </CCard>
    </h6>
  );

  const formExportAccureFile = () => {
    if (roleUser === empCode) {
      return (
        <CRow>
          <CCol>
            <CFormGroup>
              <SiMicrosoftexcel
                size="30px"
                color="green"
                onClick={() => onClickSearchData(true)}
              />{" "}
              <CLabel>{Constant.btExportFileAccure}</CLabel>
            </CFormGroup>
          </CCol>
        </CRow>
      );
    }
  };

  const formExportSaleOrderListFile = () => {
    if (roleUser === empCode) {
      return (
        <CRow>
          <CCol>
            <CFormGroup>
              <SiMicrosoftexcel
                size="30px"
                color="green"
                onClick={() => fnSetDataToExportSaleOrderList()}
              />{" "}
              <CLabel>{Constant.btExportFileSaleOrder}</CLabel>
            </CFormGroup>
          </CCol>
        </CRow>
      );
    }
  };

  /** Shipment Non-Reference */
  const layoutNonSODialogs = () => {
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
            onClick={onClickOpenDialogNonSo}
          >
            Create Shipment Non-Reference
          </CButton>
        </Box>
        <Dialog
          fullScreen
          open={openAddForm}
          onClose={onClickCloseDialogNonSo}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={onClickCloseDialogNonSo}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>Extra Charge with out Reference Shipment</h3>
              </Typography>
              <CButton className="btt-close" onClick={onClickCloseDialogNonSo}>
                <h5>Close</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>
            {collapsHeaderNonSO()}
            {modalDialog()}
          </List>
        </Dialog>
      </h6>
    );
  };

  const showInputTransporterShipNonSO = () => {
    if (roleUser !== trstCode) {
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
          <Autocomplete
            id="shipmentnonso-transporter"
            size="small"
            options={transporterList}
            loading
            autoHighlight
            filterSelectedOptions
            onChange={handleChangeSelectAddShipNonSO("transporter")}
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
                  error={invalidMaterialFormAddShipNonSo[1]}
                  {...params}
                  onClick={fnGetTransporterNameOnlyList}
                  label={
                    <Typography className={classes.autoCompleteInputLabel}>
                      {Constant.txtformPlaceholderSelected}
                    </Typography>
                  }
                  helperText={
                    invalidMaterialFormAddShipNonSo[1] ? (
                      <Typography
                        className={classes.autoCompleteInputHelperText}
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
      );
    } else {
      fnGetTransporterNameOnlyList();
      var transporter = null;
      var transporterName = null;
      if (transporterList.length) {
        transporter = transporterList.find(
          (x) => x.transporterId === _TranspoterId
        );
        transporterName =
          "[" +
          transporter.transporterCode +
          "] " +
          transporter.transporterNameThai;
      }
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
          <CInput
            type="text"
            value={transporterName ? transporterName : Constant.apiLoadingData}
            required
          />
        </Box>
      );
    }
  };

  const collapsHeaderNonSO = () => (
    <div>
      <CCard color="gradient-secondary" className="color-card-gra p-3">
        <CCardHeader
          className="font-form-scg-card"
          style={{ backgroundColor: "#50949f", color: "white" }}
        >
          {Constant.arrTextGroupTransDomDelData[0]}
          <div className="card-header-actions">
            <CLink
              className="card-header-action"
              onClick={() => setCollapsed(!collapsed)}
            >
              <CIcon
                className="collap-icon"
                style={{ color: "white" }}
                name={collapsed ? "cil-chevron-bottom" : "cil-chevron-top"}
              />
            </CLink>
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
              <CForm className="need-validation-shipmentnonso" noValidate>
                <CRow>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[0]}
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
                        <Autocomplete
                          id="shipmentnonso-company"
                          size="small"
                          options={companyList}
                          loading
                          autoHighlight
                          filterSelectedOptions
                          onChange={handleChangeSelectAddShipNonSO("company")}
                          getOptionLabel={(option) =>
                            `[${option.companyCode}] ` + option.companyName
                          }
                          renderOption={(option) => {
                            return (
                              <Typography
                                className={classes.autoCompleteRenderOptions}
                              >
                                {`[${option.companyCode}] ` +
                                  option.companyName}
                              </Typography>
                            );
                          }}
                          renderInput={(params) => {
                            params.inputProps.className =
                              classes.autoCompleteInputLabel;
                            return (
                              <TextField
                                size="small"
                                error={invalidMaterialFormAddShipNonSo[0]}
                                {...params}
                                onClick={fnGetCompanyList}
                                label={
                                  <Typography
                                    className={classes.autoCompleteInputLabel}
                                  >
                                    {Constant.txtformPlaceholderSelected}
                                  </Typography>
                                }
                                helperText={
                                  invalidMaterialFormAddShipNonSo[0] ? (
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
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[1]}
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
                        {showInputTransporterShipNonSO}
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[2]}
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
                          id="shipmentnonso-delivery-date"
                          placeholder="date"
                          required
                        />
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransExpDeliveryMain[40]}
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
                            id="shipmentnonso-transport-type"
                            onClick={fnGetTransportTypeNameOnlyList}
                            required
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            {transportTypeList.map((x) =>
                              x.valueMember !== "1" ? (
                                <option value={x.valueMember}>
                                  {x.displayMember}{" "}
                                </option>
                              ) : null
                            )}
                          </CSelect>
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[3]}
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
                        <Autocomplete
                          id="shipmentnonso-trucktype"
                          size="small"
                          options={truckTypeList}
                          loading
                          autoHighlight
                          filterSelectedOptions
                          onChange={handleChangeSelectAddShipNonSO("trucktype")}
                          getOptionLabel={(option) =>
                            `[${option.truckTypeCode}] ` + option.truckTypeName
                          }
                          renderOption={(option) => {
                            return (
                              <Typography
                                className={classes.autoCompleteRenderOptions}
                              >
                                {`[${option.truckTypeCode}] ` +
                                  option.truckTypeName}{" "}
                              </Typography>
                            );
                          }}
                          renderInput={(params) => {
                            params.inputProps.className =
                              classes.autoCompleteInputLabel;
                            return (
                              <TextField
                                size="small"
                                error={invalidMaterialFormAddShipNonSo[3]}
                                onClick={fnGetTruckTypeNameOnlyList}
                                {...params}
                                label={
                                  <Typography
                                    className={classes.autoCompleteInputLabel}
                                  >
                                    {Constant.txtformPlaceholderSelected}
                                  </Typography>
                                }
                                helperText={
                                  invalidMaterialFormAddShipNonSo[3] ? (
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
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[4]}
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
                        <Autocomplete
                          id="shipmentnonso-shipto"
                          size="small"
                          options={shipTo}
                          loading
                          autoHighlight
                          filterSelectedOptions
                          onChange={handleChangeSelectAddShipNonSO("shipto")}
                          getOptionLabel={(option) =>
                            `[${option.shipToCode}] ` + option.shipToNameThai
                          }
                          renderOption={(option) => {
                            return (
                              <Typography
                                className={classes.autoCompleteRenderOptions}
                              >
                                {`[${option.shipToCode}] ` +
                                  option.shipToNameThai}
                              </Typography>
                            );
                          }}
                          renderInput={(params) => {
                            params.inputProps.className =
                              classes.autoCompleteInputLabel;
                            return (
                              <TextField
                                size="small"
                                error={invalidMaterialFormAddShipNonSo[2]}
                                {...params}
                                onClick={fnGetShipToList}
                                label={
                                  <Typography
                                    className={classes.autoCompleteInputLabel}
                                  >
                                    {Constant.txtformPlaceholderSelected}
                                  </Typography>
                                }
                                helperText={
                                  invalidMaterialFormAddShipNonSo[2] ? (
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
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[5]}
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
                          type="text"
                          id="shipmentnonso-shipto-addtxt"
                          value={
                            Object.keys(selectItemsAddShipNonSO[2]).length
                              ? ""
                              : null
                          }
                          disabled={
                            Object.keys(selectItemsAddShipNonSO[2]).length
                          }
                          required
                        />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[6]}
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
                          type="text"
                          id="shipmentnonso-qty"
                          onBlur={() =>
                            (document.getElementById(
                              "shipmentnonso-qty"
                            ).value = FunctionController.onBlurChangePrice(
                              document.getElementById("shipmentnonso-qty")
                                .value,
                              3,
                              null,
                              null,
                              0
                            ))
                          }
                          onClick={() =>
                            (document.getElementById(
                              "shipmentnonso-qty"
                            ).value = FunctionController.onClickChangePrice(
                              document.getElementById("shipmentnonso-qty").value
                            ))
                          }
                          required
                        />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[7]}
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
                          type="text"
                          id="shipmentnonso-productno"
                          required
                        />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldShipmentNonSO[8]}
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
                        <CInput type="text" id="shipmentnonso-refno" required />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
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
                          color="success"
                          onClick={onClickCheckAddShipmentNonSO}
                        >
                          {Constant.btSave}
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
                          size={Constant.btCancel}
                          block
                          color="danger"
                          onClick={onClickClearShipNonSOData}
                        >
                          {Constant.btClearData}
                        </CButton>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </Box>
        </CCollapse>
      </CCard>
    </div>
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

      {/* Start Show Select Export Modal */}
      <CModal
        show={isShowSelectExport}
        onClose={() => setIsShowSelectExport(!isShowSelectExport)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol>
              <CFormGroup>
                <SiMicrosoftexcel
                  size="30px"
                  color="green"
                  onClick={onClickExportData}
                />{" "}
                <CLabel>{Constant.btExportFileDelivery}</CLabel>
              </CFormGroup>
            </CCol>
          </CRow>
          {formExportAccureFile()}
          {formExportSaleOrderListFile()}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowSelectExport(!isShowSelectExport)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Select Export Modal */}

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
          <CButton color="success" onClick={onClickReCalculateList}>
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

      {/* Start ReCal Modal */}
      <CModal
        show={isConfirmDeleteNonSO}
        onClose={() => setIsConfirmDeleteNonSO(!isConfirmDeleteNonSO)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmDeleteShipmentNonSo}</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickDeleteShipmentNonSOList}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmDeleteNonSO(!isConfirmDeleteNonSO)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End ReCal Modal */}

      {/* Start ReCal Success Modal */}
      <CModal
        show={isShowReCalSuccess}
        onClose={() => setIsShowReCalSuccess(!isShowReCalSuccess)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessRecalData}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClickReCalOKRefreshPage}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End ReCal Success Modal */}

      {/* Start DeleteShipNon Success Modal */}
      <CModal
        show={isShowDeleteSuccess}
        onClose={() => setIsShowDeleteSuccess(!isShowDeleteSuccess)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessRecalData}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClickDeleteOKRefreshPage}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End DeleteShipNon Success Modal */}

      {/* Start Warning Export Sale Order List Modal */}
      <CModal
        show={isShowWarningSaleOderList}
        onClose={() => setIsShowWarningSaleOderList(!isShowWarningSaleOderList)}
        color="warning"
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentWarningExportSaleOrderList}</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() =>
              setIsShowWarningSaleOderList(!isShowWarningSaleOderList)
            }
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Warning Export Sale Order List Modal */}
    </div>
  );

  const showButtonViewContract = () => {
    var newObj = { ...items };
    switch (newObj.exportModeId) {
      case 1:
        return (
          <CButton color="success" to="/master/Contract/Export">
            {Constant.btOK}
          </CButton>
        );
      case 2:
        return (
          <CButton color="success" to="/master/Contract/Export-Truck">
            {Constant.btOK}
          </CButton>
        );
      case 3:
        return (
          <CButton color="success" to="/master/Contract/Export-LCLAir">
            {Constant.btOK}
          </CButton>
        );
      case 4:
        return (
          <CButton color="success" to="/master/Contract/Export-LCLAir">
            {Constant.btOK}
          </CButton>
        );
      default:
        return (
          <CButton color="danger" disabled>
            Unknown Type Of Export Mode
          </CButton>
        );
    }
  };

  const modalDialog = () => (
    <div>
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
        <CModalBody>{Constant.contentConfirmAddData}</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={
              textTypeInsert === "ExtraCharge"
                ? onClickAddExtraCharge
                : textTypeInsert === "MultiDrop"
                ? onClickAddExtraChargeMultiDrop
                : null
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

      {/* Start Add Shipment Non SO Modal */}
      <CModal
        show={isConfirmSaveShipNonSO}
        onClose={() => setIsConfirmSaveShipNonSO(!isConfirmSaveShipNonSO)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmAddData}</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickAddShipmentNonSO}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmSaveShipNonSO(!isConfirmSaveShipNonSO)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Add Shipment Non SO  Modal */}

      {/* Start Edit Shipment Non SO Modal */}
      <CModal
        show={isConfirmEditShipNonSO}
        onClose={() => setIsConfirmEditShipNonSO(!isConfirmEditShipNonSO)}
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
          <CButton color="success" onClick={onClickEditShipmentNonSO}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmEditShipNonSO(!isConfirmEditShipNonSO)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Edit Shipment Non SO Modal */}

      {/* Start Add Shipment Non SO Success Modal */}
      <CModal
        show={isShowSaveShipNonSOSuccess}
        onClose={onClickCloseDialogShowShipNonSOSucc}
        color="success"
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentSuccessSaveData}
          <br />
          {"Shipment No : " + shipmentNonSoNo}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={onClickCloseDialogShowShipNonSOSucc}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Add Shipment Non SO Success Modal */}

      {/* Start Edit Shipment Non SO Success Modal */}
      <CModal
        show={isShowEditShipNonSOSuccess}
        onClose={() => {
          setIsShowEditShipNonSOSuccess(!isShowEditShipNonSOSuccess);
          window.location.reload(false);
        }}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessSaveData}</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setIsShowEditShipNonSOSuccess(!isShowEditShipNonSOSuccess);
              window.location.reload(false);
            }}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Edit Shipment Non SO Success Modal */}

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
          {showButtonViewContract()}{" "}
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
    if (Object.keys(objLinkFormSearch).length) {
      if (
        transporterList.length &&
        truckTypeList.length &&
        sourceList.length &&
        exportModeList.length &&
        shipmentStatusList.length &&
        edpStatusList.length &&
        paymentStatusList.length &&
        summaryStatusList.length
      ) {
        setIsLoaded(true);
        setisShowDialogEdit(true);
      }
    }
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
                      <h3 className="headtext">
                        {Constant.txtTransactionDeliveryList}
                      </h3>
                    </CCol>
                    <CCol>
                      {/* {layoutNonSODialogs()} */}
                      {layoutDialog()}
                    </CCol>
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
