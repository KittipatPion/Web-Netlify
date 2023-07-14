import React, { useState, useEffect } from "react";
import Repository from "../../../repositories/Repository";
import MakeStyleSheet from "../../../helpers/MakeStyleSheet";
import CurrencyInput from "react-currency-input-field";
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
  CSubheader,
  CBreadcrumbRouter,
  CRow,
  CButtonToolbar,
  CInputGroup,
  CInputGroupText,
  CInputGroupPrepend,
  CSpinner,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
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
import { colors } from "@material-ui/core";
import Constant from "../../../helpers/Constant";
import Province from "../location/Province";
import { format } from "date-fns";
import VariableController from "../../../helpers/VariableController";
// import { indexOf } from "core-js/js/array";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
}));

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

const FPort = [
  // {
  //     key: "portId",
  //     label: "ท่าเรือ",

  // },
  {
    key: "placeContainerReturnNameThai",
    label: "ลานคืนตู้",
  },
  {
    key: "delete_truckLicense",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const FPortNo = [
  {
    key: "placeContainerReturnNameThai",
    label: "ลานคืนตู้",
  },
];

const FEXTransportRate = [
  {
    key: "startRate",
    label: "เชื้อเพลิงเริ่มต้น",
  },
  {
    key: "endRate",
    label: "เชื้อเพลิงสิ้นสุด",
  },
  {
    key: "fuelRatePrice",
    label: "ราคาปรับ",
  },
  // {
  //   key: "size40Ship1Price",
  //   label: "ราคาตู้ 40",
  // },
];

const FMaintable = [
  {
    key: "manage",
    label: "",
    _style: { width: "7%" },
    sorter: false,
    filter: false,
  },
  {
    key: "contractStatus",
    label: `${Constant.txtContractStatus}`,
  },
  {
    key: "contractNo",
    label: `${Constant.txtContractNo}`,
  },
  {
    key: "sourceNameThai",
    label: `${Constant.txtLoadingLocation}`,
  },
  {
    key: "transporterNameThai",
    label: `${Constant.txtVenderName}`,
  },
  {
    key: "deliveryName",
    label: `${Constant.txtContractType}`,
  },
  {
    key: "fuelTypeName",
    label: `${Constant.txtFuelType}`,
  },
  {
    key: "truckTypeName",
    label: `${Constant.txtTruckType}`,
  },
  {
    key: "rateTypeName",
    label: `${Constant.txtRateType}`,
  },
  {
    key: "startDateCovert",
    label: `${Constant.arrTxtMainStartDateEndDate[0]}`,
  },
  {
    key: "endDateCovert",
    label: `${Constant.arrTxtMainStartDateEndDate[1]}`,
  },
  {
    key: "refDocNo",
    label: `${Constant.txtRefDocNo}`,
  },

  // {
  //   key: "show_details",
  //   label: "",
  //   _style: { width: "1%" },
  //   sorter: false,
  //   filter: false,
  // },
];

const FShippingSP = [
  {
    key: "ShipToID",
    label: "ปลายทาง",
  },
  {
    key: "OtherExportTypeID",
    label: "ประเภทการจ่าย",
  },
  {
    key: "OtherExportPrice",
    label: "ราคา",
  },
  {
    key: "FormQty",
    label: "FormQty",
  },
  {
    key: "ToQty",
    label: "ToQty",
  },
  {
    key: "PriceTypeID",
    label: "ประเภทการขนส่ง",
  },
];

const FPlaceContainerReturn = [
  {
    key: "placeContainerReturnNameThai",
    label: `${Constant.arrFPlaceContainerReturn[0]}`,
  },
  {
    key: "transporterCostPrice",
    label: `${Constant.arrFPlaceContainerReturn[1]}`,
  },
  {
    key: "customFeePrice",
    label: `${Constant.arrFPlaceContainerReturn[2]}`,
  },
  {
    key: "portChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[3]}`,
  },
  {
    key: "lashingChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[4]}`,
  },
  {
    key: "repackageChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[5]}`,
  },
  {
    key: "inspectorFeePrice",
    label: `${Constant.arrFPlaceContainerReturn[6]}`,
  },
];

const FShippingSPManage = [
  {
    key: "manage",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  {
    key: "placeContainerReturnCode",
    label: `${Constant.arrFPlaceContainerReturn[0]}`,
  },
  {
    key: "transporterCostPrice",
    label: `${Constant.arrFPlaceContainerReturn[1]}`,
  },
  {
    key: "customFeePrice",
    label: `${Constant.arrFPlaceContainerReturn[2]}`,
  },
  {
    key: "portChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[3]}`,
  },
  {
    key: "lashingChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[4]}`,
  },
  {
    key: "repackageChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[5]}`,
  },
  {
    key: "inspectorFeePrice",
    label: `${Constant.arrFPlaceContainerReturn[6]}`,
  },
];

const FPlaceContainerReturnManage = [
  {
    key: "manage",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  {
    key: "placeContainerReturnCode",
    label: `${Constant.arrFPlaceContainerReturn[0]}`,
  },
  {
    key: "fuelPrice",
    label: `${Constant.arrFPlaceContainerReturn[7]}`,
  },
  {
    key: "transporterCostPrice",
    label: `${Constant.arrFPlaceContainerReturn[1]}`,
  },
  {
    key: "customFeePrice",
    label: `${Constant.arrFPlaceContainerReturn[2]}`,
  },
  {
    key: "portChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[3]}`,
  },
  {
    key: "lashingChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[4]}`,
  },
  {
    key: "repackageChargePrice",
    label: `${Constant.arrFPlaceContainerReturn[5]}`,
  },
  {
    key: "inspectorFeePrice",
    label: `${Constant.arrFPlaceContainerReturn[6]}`,
  },
];

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
    case "Active":
      return "success";
    case "Draft":
      return "secondary";
    case "InActive":
      return "danger";
    default:
      return "primary";
  }
};

const fields = [
  {
    key: "manage",
    label: "",
    _style: { width: "7%" },
    sorter: false,
    filter: false,
  },
  {
    key: "contractStatus",
    label: "สถานะ",
  },
  {
    key: "contractNo",
    label: "เลขที่สัญญา",
  },
  {
    key: "sourceNameThai",
    label: "ต้นทาง",
  },
  {
    key: "transporterNameThai",
    label: "บริษัทขนส่ง",
  },
  {
    key: "packageType",
    label: "ประเภทสินค้า",
  },
  {
    key: "startDateCovert",
    label: "วันเริ่มต้น",
  },
  {
    key: "endDateCovert",
    label: "วันสิ้นสุด",
  },
  {
    key: "refDocNo",
    label: "หมายเลขอ้างอิง",
  },

  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const ExportAirLCL = () => {
  //GetData//
  const [getshipto, setGetShipTo] = useState([]);
  //

  //DataIn//
  const [InPort, setInPort] = useState([]);
  const [AllInTransport, setAllInTransport] = useState([]);

  const [InTransportRate, setInTransportRate] = useState([]);
  const [InUnloadRate, setInUnloadRate] = useState([]);
  const [InTransportRateByPD, setInTransportRateByPD] = useState([]);
  //
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [cloneData, setCloneData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [country, setCountry] = useState([]);
  const [exportLCLAIRList, SetExportLCLAIRList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [source, setSource] = useState([]);

  const [details, setDetails] = useState([]);

  const [validatecheck, setvalidatecheck] = useState("");
  const [validAlert, setValidAlert] = useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);
  const [headerinput, setheaderInput] = useState([]);
  const [headerInputPlaceCon, setheaderInputPlaceCon] = useState([]);

  //Input//
  const [inputPort, setInputPort] = useState("");

  //

  //Combobox//
  const [CbProvinceDistrict, setCbProvinceDistrict] = useState([]);
  const [truckType, setTruckType] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [rateType, setRateType] = useState([]);
  const [unload, setUnloadType] = useState([]);
  const [packageType, setPackage] = useState([]);
  const [contractStatus, setContractStatus] = useState([]);
  const [cyplace, setGetCYPlace] = useState([]);
  const [shipTo, setShipTo] = useState([]);
  const [cbport, setPortList] = useState([]);
  const [customType, setCustomType] = useState([]);
  const [fullYearList, setFullYearList] = useState([]);
  const [placeContrainer, setPlaceContainerReturn] = useState([]);
  const [cbdeliveryMode, setDeliveryMode] = useState([]);
  const [headerMinValueForMax, setHeaderMinValueForMax] = useState(0);
  const [headerMaxValueForMin, setHeaderMaxValueForMin] = useState(0);
  const [_headerMinValueForMax, _setHeaderMinValueForMax] = useState(0);
  const [_headerMaxValueForMin, _setHeaderMaxValueForMin] = useState(0);
  //

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const pageCode = "/mstcontexpla";

  const [dataC, setDataC] = useState([]);

  const [errorAPI, setErrorAPI] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isConfirmSaveClone, setIsConfirmSaveClone] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isWarningInputForm, setIsWarningInputForm] = useState(false);
  const [isGetDatainCalValue, setIsGetDatainCalValue] = useState(false);
  const [isGetDataOtherTable, setIsGetDataOtherTable] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [calFuelRateList, setCalFuelRateList] = useState([]);
  const [fuelRateMinEnd, setFuelRateMinEnd] = useState(0);
  const [calMultiDropRateList, setCalMultiDropRateList] = useState([]);
  const [calOverNightRateList, setCalOverNightRateList] = useState([]);
  const [provinceThaiList, setProvinceThaiList] = useState([]);
  const [provinceOverNightList, setProvinceOverNightList] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [cyplacechoose, setCyplaceChoose] = useState([]);
  const [textEmtry, setTextEmtry] = useState(false);
  const [itemSelectSearchheader, setItemSelectSearchheader] = useState([
    {},
    {},
    {},
  ]);
  const [containerSizeLiftOffChoose, setContainerSizeLiftOffChoose] = useState(
    []
  );
  const [containerSizeLiftOnChoose, setContainerSizeLiftOnChoose] = useState(
    []
  );
  const [placeContrainerSelect, setPlaceContrainerSelect] = useState([]);
  const [headPlaceContainerReturn, setHeadPlaceContainerReturn] = useState([]);
  const [headliffoff, setHeadLiftOff] = useState([]);
  const [headlifton, setHeadLiftOn] = useState([]);
  const [placeContainerSelect, setPlaceContainerSelect] = useState([]);
  const [customList, setCustomList] = useState([]);
  const [linkData, setLinkData] = useState({});
  const [isLinkData, setIsLinkData] = useState(false);
  const [itemSelectEdit, setItemSelectEdit] = useState([{}, {}, {}]);
  const [itemSelectAdd, setItemSelectAdd] = useState([{}, {}, {}]);
  const [itemSelectOther, setItemSelectOther] = useState([{}, {}]);
  const [invalidMaterialFormOther, setInvalidMaterialFormOther] = useState([
    false,
    false,
  ]);
  const [invalidMaterialFormOther1, setInvalidMaterialFormOther1] = useState([
    false,
    false,
  ]);
  const [invalidMaterialFormOther2, setInvalidMaterialFormOther2] = useState([
    false,
    false,
  ]);
  const [invalidMaterialFormOther3, setInvalidMaterialFormOther3] = useState([
    false,
    false,
  ]);

  const [invalidMaterialFormOther4, setInvalidMaterialFormOther4] = useState([
    false,
    false,
  ]);

  const [multiDropRateMinEnd, setMultiDropRateMinEnd] = useState(0);

  const [arrForRemoveRecord, setArrForRemoveRecord] = useState(["", 0]);
  const [isShowCloned, setIsShowCloned] = useState(false);
  const [isShowCloneSuccess, setIsShowCloneSuccess] = useState(false);
  const [isShowExitClone, setIsShowExitClone] = useState(false);

  const [isShowSuccess, setIsShowSuccess] = useState(false);

  const [isConfirmDeleteRecordOT, setIsConfirmDeleteRecordOT] = useState(false);
  const [typeShowSuccess, setTypeShowSuccess] = useState("");

  const [mcontractLiftOff, setMcontractLiftOff] = useState([]);
  const [mcontractLiftOn, setMcontractLiftOn] = useState([]);
  const [mcontractTranspotRate, setMcontractTransportRate] = useState([]);
  const [mcontractPort, setMcontractPort] = useState([]);

  const classes = useStyles();
  const [invalidMaterialFormSearch, setInvalidMaterialFormSearch] =
    useState(false);
  const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState([
    false,
    false,
    false,
  ]);
  const [invalidMaterialFormEdit, setInvalidMaterialFormEdit] = useState([
    false,
    false,
    false,
  ]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openCloneForm, setOpenCloneForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [indexEditForm, setIndexEditForm] = useState(null);
  const [accordion, setAccordion] = useState(1);
  const [accordion2, setAccordion2] = useState(2);
  const [accordion3, setAccordion3] = useState(3);
  const [accordion4, setAccordion4] = useState(4);
  const [accordion5, setAccordion5] = useState(5);
  const _txtUnitBaht = "฿";
  const _txtUnitTon = "ตัน";
  const history = useHistory();
  const [val, setVal] = useState([{}, {}, {}]);
  const _UserAuthen = localStorage.getItem("authenName");
  const _UserId = parseInt(localStorage.getItem("userId"));
  const _Username = localStorage.getItem("username");
  const _TranspoterId = parseInt(localStorage.getItem("transporterId"));
  const [isNotAuthorized, setIsNotAuthorized] = useState(false);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [details, index];
    }
    setDetails(newDetails);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClickOpen = (type, contractId) => (e) => {
    if (type === "add") {
      console.log(20000);
      // fnGetContractDomesticOtherList();
      setOpenAddForm(true);
    } else if (type === "edit") {
      fnGetDataForEdit(contractId);
      setOpenEditForm(true);
      setIndexEditForm(contractId);
    } else if (type === "clone") {
      setOpenCloneForm(true);
    }
  };
  /**NEW Func */
  const handleChangSearch = (type) => (e, value) => {
    var obj = {
      StartDate: null,
      EndDate: null,
      Years: null,
      ContractStatus: "",
      TransporterId: null,
      ContractNo: "",
      SourceId: null,
      TruckTypeId: null,
      RateTypeId: null,
      FuelTypeId: null,
      DeliveryMode: "",
      RefDocNo: "",
    };

    console.log(document.getElementById("in-search-StartDate").value);
    console.log(document.getElementById("in-search-EndDate").value);

    obj.StartDate = document.getElementById("in-search-StartDate").value;
    obj.EndDate = document.getElementById("in-search-EndDate").value;
    obj.Years = document.getElementById("search-header-year").value;
    obj.ContractStatus = document.getElementById(
      "in-search-ContractStatus"
    ).value;
    if (type == "TransporterId") {
      obj.TransporterId = value.transporterId;
    }

    obj.ContractNo = document.getElementById("in-search-ContractNo").value;
    if (type == "SourceId") {
      obj.SourceId = value.sourceId;
    }
    obj.DeliveryMode = document.getElementById("in-search-DeliveryMode").value;
    obj.FuelTypeId = document.getElementById("in-search-FuelType").value;
    obj.RateTypeId = document.getElementById("in-search-RateType").value;
    obj.RefDocNo = document.getElementById("in-search-RefDocNo").value;
    if (type == "Years") {
      handleChangeContractYear();
    }

    console.log(obj);

    setSearchData(obj);
  };

  const handleChangSelect = (type) => (e, value) => {
    console.log(value);

    if (type === "Search-TransporterId") {
      if (value) {
        var newArr = [...itemSelectSearchheader];

        var obj = {
          transporterId: null,
        };
        obj.transporterId = value.transporterId;

        newArr[0] = obj;
        setVal(newArr[0].transporterCode + newArr[0].transporterNameThai);
        setItemSelectSearchheader(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemSelectSearchheader];
        newArr[0] = {};

        setItemSelectSearchheader(newArr);
      }
    }

    if (type === "Search-SourceID") {
      if (value) {
        var newArr = [...itemSelectSearchheader];

        var obj = {
          sourceId: null,
        };
        obj.sourceId = value.sourceId;

        newArr[1] = obj;
        setVal(newArr);
        setItemSelectSearchheader(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemSelectSearchheader];
        newArr[1] = {};

        setItemSelectSearchheader(newArr);
      }
    }

    if (type === "Search-TruckTypeId") {
      if (value) {
        var newArr = [...itemSelectSearchheader];

        var obj = {
          truckTypeId: null,
        };
        obj.truckTypeId = value.truckTypeId;

        newArr[2] = obj;
        setVal(newArr);
        // console.log(newArr)
        setItemSelectSearchheader(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemSelectSearchheader];
        newArr[2] = {};

        setItemSelectSearchheader(newArr);
      }
    }

    if (type === "PlaceContainer") {
      if (value) {
        var newArr = [...placeContainerSelect];

        var obj = {
          placeContainerReturnId: null,
          placeContainerReturnNameThai: "",
          placeContainerReturnCode: "",
        };
        obj.placeContainerReturnId = value.placeContainerReturnId;
        obj.placeContainerReturnNameThai = value.placeContainerReturnNameThai;
        obj.placeContainerReturnCode = value.placeContainerReturnCode;
        newArr[0] = obj;

        setPlaceContainerSelect(newArr);
        console.log(newArr);
      } else {
        var newArr = [...placeContainerSelect];
        newArr[0] = {};

        setPlaceContainerSelect(newArr);
      }
    }
    if (type === "ContainerSize-LiftOff") {
      if (value) {
        var newArr = [...containerSizeLiftOffChoose];

        var obj = {
          containerSize: null,
        };
        obj.containerSize = value.displayMember;

        newArr[0] = obj;

        setContainerSizeLiftOffChoose(newArr);
        console.log(newArr);
      } else {
        var newArr = [...containerSizeLiftOffChoose];
        newArr[0] = {};

        setContainerSizeLiftOffChoose(newArr);
      }
    }
    if (type === "ContainerSize-LiftOn") {
      if (value) {
        var newArr = [...containerSizeLiftOnChoose];

        var obj = {
          containerSize: null,
        };
        obj.containerSize = value.displayMember;

        newArr[0] = obj;

        setContainerSizeLiftOnChoose(newArr);
        console.log(newArr);
      } else {
        var newArr = [...containerSizeLiftOnChoose];
        newArr[0] = {};

        setContainerSizeLiftOnChoose(newArr);
      }
    }

    if (type === "PlaceContainerReturn") {
      if (value) {
        var newArr = [...placeContrainerSelect];
        var obj = {
          placeContainerReturnId: null,
          placeContainerReturnNameThai: "",
        };
        obj.placeContainerReturnId = value.placeContainerReturnId;
        obj.placeContainerReturnNameThai = value.placeContainerReturnNameThai;

        newArr[0] = obj;

        setPlaceContrainerSelect(newArr);
        console.log(placeContrainerSelect);
      } else {
        var newArr = [...placeContrainerSelect];
        newArr[0] = {};
        setPlaceContrainerSelect(newArr);
      }
    }

    if (type === "Custom") {
      var obj = {
        customTypeId: null,
        // "customTypeName": null,
      };
      obj.customTypeId = e.target.value;

      setCustomType(obj);
      console.log(placeContrainerSelect);
    }
  };

  const handleChangAdd = (type) => (e, value) => {
    var obj = {
      contrainerSize: "",
      cyplaceId: null,
      cyplaceNameThai: "",
      liftOffPrice: 0.0,
      passengerFeePrice: 0.0,
      weighingPrice: 0.0,
      receiveContrainerPrice: 0.0,
    };

    obj.liftOffPrice = document.getElementById(
      "header-LiftOff-liftOffPrice"
    ).value;
    obj.passengerFeePrice = document.getElementById(
      "header-LiftOff-passengerFeePrice"
    ).value;
    obj.weighingPrice = document.getElementById(
      "header-LiftOff-weighingPrice"
    ).value;
    obj.receiveContrainerPrice = document.getElementById(
      "header-LiftOff-receiveContrainerPrice"
    ).value;
    // console.log(obj);

    setheaderInput(obj);
    // console.log(headerinput)
  };

  const handleChangAddPlaceCon = (type) => (e, value) => {
    var obj = {
      placeContainerReturnId: null,
      placeContainerReturnNameThai: "",
      transporterCostPrice: "",
      customFeePrice: 0.0,
      portChargePrice: 0.0,
      lashingChargePrice: 0.0,
      repackageChargePrice: 0.0,
      inspectorFeePrice: 0.0,
      fuelPrice: 0.0,
    };

    obj.transporterCostPrice = document.getElementById(
      "header-place-transporterCostPrice"
    ).value;
    obj.customFeePrice = document.getElementById(
      "header-place-customFeePrice"
    ).value;
    obj.portChargePrice = document.getElementById(
      "header-place-portChargePrice"
    ).value;
    obj.lashingChargePrice = document.getElementById(
      "header-place-lashingChargePrice"
    ).value;
    obj.repackageChargePrice = document.getElementById(
      "header-place-repackageChargePrice"
    ).value;
    obj.inspectorFeePrice = document.getElementById(
      "header-place-inspectorFeePrice"
    ).value;
    obj.fuelPrice = document.getElementById("header-place-fuelPrice").value;

    setheaderInputPlaceCon(obj);
  };

  const onClickValidSearch = () => {
    var contracStartDate = document.getElementById("in-search-StartDate").value;
    var contractEndDate = document.getElementById("in-search-EndDate").value;
    var contractYear = parseInt(
      document.getElementById("search-header-year").value
    );
    console.log(contractYear);
    if (
      contracStartDate === "" &&
      contractEndDate === "" &&
      isNaN(contractYear)
    ) {
      if (!getIsValidForm("search-header-need-validation")) {
        if (Object.keys(data).length) {
          setData([]);
        }
      }
    } else {
      setNoValidateForm("search-header-need-validation");
      var newArr = [];

      var obj = {
        StartDate: null,
        EndDate: null,
        Years: null,
        ContractStatus: "",
        TransporterId: null,
        ContractNo: "",
        SourceId: null,
        TruckTypeId: null,
        RateTypeId: null,
        FuelTypeId: null,
        DeliveryMode: "",
        RefDocNo: "",
      };

      obj.StartDate = document.getElementById("in-search-StartDate").value;
      obj.EndDate = document.getElementById("in-search-EndDate").value;
      obj.Years = document.getElementById("search-header-year").value;
      obj.ContractStatus = document.getElementById(
        "in-search-ContractStatus"
      ).value;

      obj.TransporterId =
        itemSelectSearchheader[0].transporterId === undefined
          ? null
          : itemSelectSearchheader[0].transporterId;

      obj.ContractNo = document.getElementById("in-search-ContractNo").value;

      obj.SourceId =
        itemSelectSearchheader[1].sourceId === undefined
          ? null
          : itemSelectSearchheader[1].sourceId;

      obj.TruckTypeId =
        itemSelectSearchheader[2].truckTypeId === undefined
          ? null
          : itemSelectSearchheader[2].truckTypeId;

      obj.DeliveryMode =
        document.getElementById("in-search-DeliveryMode").value === ""
          ? null
          : document.getElementById("in-search-DeliveryMode").value;
      obj.FuelTypeId =
        document.getElementById("in-search-FuelType").value === ""
          ? null
          : document.getElementById("in-search-FuelType").value;
      obj.RateTypeId =
        document.getElementById("in-search-RateType").value === ""
          ? null
          : document.getElementById("in-search-RateType").value;
      obj.RefDocNo = document.getElementById("in-search-RefDocNo").value;

      if (obj.Years) {
        handleChangeContractYear();
      }
      console.log(obj);
      clickSearch(obj);
    }
  };

  const clickSearch = (arr) => {
    console.log(arr);
    fnGetExportLCLAIRListBySearch(arr);
  };

  const onClickConfirmRemoveRecord = (type, index) => (e) => {
    var newArr = [type, index];
    setArrForRemoveRecord(newArr);
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
  };

  const onClickCancelRemoveRecord = () => {
    setArrForRemoveRecord([]);
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
  };

  //

  const handleClose = (type) => (e) => {
    if (!isShowSuccess) {
      fnClearOtherTableValueList();
      setIsGetDataOtherTable(false);
      if (type === "add") {
        setOpenAddForm(false);
      } else if (type === "edit") {
        setOpenEditForm(false);
        setIndexEditForm(null);
        setIsGetDatainCalValue(false);
        setEditData({});
        setItemSelectEdit([{}, {}, {}]);
      } else if (type === "clone") {
        setIsShowExitClone(!isShowExitClone);
      }
    }
  };

  const setShowFormClone = () => {
    setIsShowCloned(!isShowCloned);
    var result = exportLCLAIRList.find((x) => x.contractId === indexEditForm);
    console.log(result);
    setCloneData(result);
    setOpenEditForm(false);
    setOpenAddForm(false);
    setOpenCloneForm(true);
    setIsShowCloneSuccess(!isShowCloneSuccess);
  };

  const setCloseFormClone = () => {
    setIsShowExitClone(!isShowExitClone);
    setCloneData({});
    setOpenCloneForm(false);
  };

  const handleRemoveItem = (item, index, type) => {
    if (type === "InPort") {
      var newArr = [...InPort];
      newArr.splice(index, 1);
      setInPort(newArr);
    }
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
  const getFullYearForSearch = () => {
    var dateNow = new Date();
    var yearNow = dateNow.getFullYear();
    var newArr = [];
    for (let index = yearNow; index > 2021; index--) {
      var value = index - 1;
      newArr.push(value);
    }
    for (let index = 0; index <= 5; index++) {
      newArr.push(yearNow + index);
    }
    setFullYearList(newArr);
  };

  const handleChangeContractYear = () => {
    var contractDate = document.getElementById("in-search-StartDate");
    var contractDateEnd = document.getElementById("in-search-EndDate");
    contractDate.value = "";
    contractDateEnd.value = "";
    setNoValidateForm("search-header-need-validation");
  };

  const handleChangeInputStartValue = (type) => (e) => {
    var value = parseFloat(e.target.value);
    value = (value + 0.01).toFixed(2);
    if (type === "fuel-rate") {
      setFuelRateMinEnd(parseFloat(value));
    }
  };

  const handleChangeUpdateField = (type, index) => (e, value, name) => {
    if (type === "transporterCostPrice") {
      var newArr = [...headPlaceContainerReturn];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].transporterCostPrice = name.value;
      } else {
        newArr[index].transporterCostPrice = 0;
      }
      setHeadPlaceContainerReturn(newArr);
    }
    if (type === "customFeePrice") {
      var newArr = [...headPlaceContainerReturn];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].customFeePrice = name.value;
      } else {
        newArr[index].customFeePrice = 0;
      }
      setHeadPlaceContainerReturn(newArr);
    }

    if (type === "portChargePrice") {
      var newArr = [...headPlaceContainerReturn];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].portChargePrice = name.value;
      } else {
        newArr[index].portChargePrice = 0;
      }
      setHeadPlaceContainerReturn(newArr);
    }

    if (type === "lashingChargePrice") {
      var newArr = [...headPlaceContainerReturn];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].lashingChargePrice = name.value;
      } else {
        newArr[index].lashingChargePrice = 0;
      }
      setHeadPlaceContainerReturn(newArr);
    }

    if (type === "repackageChargePrice") {
      var newArr = [...headPlaceContainerReturn];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].repackageChargePrice = name.value;
      } else {
        newArr[index].repackageChargePrice = 0;
      }
      setHeadPlaceContainerReturn(newArr);
    }

    if (type === "inspectorFeePrice") {
      var newArr = [...headPlaceContainerReturn];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].inspectorFeePrice = name.value;
      } else {
        newArr[index].inspectorFeePrice = 0;
      }
      setHeadPlaceContainerReturn(newArr);
    }

    if (type === "fuelPrice") {
      var newArr = [...headPlaceContainerReturn];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].fuelPrice = name.value;
      } else {
        newArr[index].fuelPrice = 0;
      }
      setHeadPlaceContainerReturn(newArr);
    }

    if (type === "fuel-rate") {
      var newArr = [...calFuelRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].fuelRatePrice = parseFloat(e.target.value);
      } else {
        newArr[index].fuelRatePrice = 0;
      }
      setCalFuelRateList(newArr);
    }
    if (type === "Size20-Ship") {
      var newArr = [...calFuelRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].size20Ship1Price = parseFloat(e.target.value);
      } else {
        newArr[index].size20Ship1Price = 0;
      }
      setCalFuelRateList(newArr);
    }
    if (type === "Size40-Ship") {
      var newArr = [...calFuelRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].size40Ship1Price = parseFloat(e.target.value);
      } else {
        newArr[index].size40Ship1Price = 0;
      }
      setCalFuelRateList(newArr);
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

  const setProvinceOvNSelection = (arrList) => {
    var newArr = [...provinceThaiList];
    arrList.map((item) => {
      newArr.splice(
        newArr.findIndex((x) => x.provinceId === item.provinceId),
        1
      );
    });
    setProvinceOverNightList(newArr);
  };

  const onClickRemoveRecordAddData = (type, index) => (e) => {
    if (type === "ShipTo") {
      var newArr = [...headPlaceContainerReturn];
      newArr.splice(index, 1);
      setHeadPlaceContainerReturn(newArr);
    }
    if (type === "LiftOn") {
      var newArr = [...headlifton];
      newArr.splice(index, 1);
      setHeadLiftOn(newArr);
    }
  };

  const onClickCalFuelRate = () => {
    if (getIsValidForm("fuel-need-validation")) {
      // var size20Ship1Price = parseFloat(
      //   document.getElementById("transportRate-ship20").value
      // );
      // var size40Ship1Price = parseFloat(
      //   document.getElementById("transportRate-ship40").value
      // );
      var startValue = parseFloat(document.getElementById("fuel-start").value);
      var endValue = parseFloat(document.getElementById("fuel-end").value);
      var priceValue = parseFloat(document.getElementById("fuel-price").value);
      var newArr = [];
      var rangeBase = endValue - startValue;
      var rangeValue = startValue % 1;
      rangeValue = parseFloat(rangeValue.toFixed(2));
      var addRunning = 0.01;
      var minLength = startValue % 1;
      minLength = parseFloat(minLength.toFixed(2));
      var maxLength = 50;
      var priceStart = 0;

      var isIntegerStart = startValue % 1;
      isIntegerStart = parseFloat(isIntegerStart.toFixed(2));
      var isIntegerEnd = endValue % 1;
      isIntegerEnd = parseFloat(isIntegerEnd.toFixed(2));
      var count = startValue;

      while (count - (rangeBase + addRunning) >= minLength) {
        priceStart -= priceValue;
        count -= rangeBase + addRunning;
        count = parseFloat(count.toFixed(2));
        console.log(count);
      }

      while (count <= maxLength) {
        var obj = {
          startRate: 0.0,
          endRate: 0.0,
          fuelRatePrice: 0.0,
          // size20Ship1Price: 0.0,
          // size40Ship1Price: 0.0,
        };
        obj.startRate = parseFloat(count.toFixed(2));
        obj.endRate = parseFloat((count + rangeBase).toFixed(2));
        obj.fuelRatePrice = parseFloat(priceStart.toFixed(2));
        // obj.size20Ship1Price = parseFloat(
        //   (size20Ship1Price + obj.seqRate).toFixed(2)
        // );
        // obj.size40Ship1Price = parseFloat(
        //   (size40Ship1Price + obj.seqRate).toFixed(2)
        // );
        newArr.push(obj);
        count += rangeBase + addRunning;
        priceStart += priceValue;
      }
      console.log(newArr);
      setCalFuelRateList(newArr);

      document.getElementById("fuel-start").value = "";
      document.getElementById("fuel-end").value = "";
      document.getElementById("fuel-price").value = "";
      // document.getElementById("transportRate-ship20").value = "";
      // document.getElementById("transportRate-ship40").value = "";
      setFuelRateMinEnd(0);
      setNoValidateForm("fuel-need-validation");
    } else {
      setCalFuelRateList([]);
    }
  };

  const onClickCustom = () => {
    if (getIsValidForm("custom-need-validation")) {
      var newArr = [];
      var incustomTypeId = customType.customTypeId;
      // console.log(customType.customTypeId)
      var incustomValue1 = parseFloat(
        document.getElementById("header-custom-value1").value
      );
      var incustomValue2 = parseFloat(
        document.getElementById("header-custom-value2").value
      );
      var incustomPrice = parseFloat(
        document.getElementById("header-custom-price").value
      );

      if (customList.length) {
        newArr = [...customList];
      }

      var obj = {
        customTypeId: 0.0,
        customValue1: 0.0,
        customValue2: 0.0,
        customPrice: 0.0,
      };
      obj.customTypeId = incustomTypeId;
      obj.customValue1 = incustomValue1;
      obj.customValue2 = incustomValue2;
      obj.customPrice = incustomPrice;
      newArr.push(obj);

      setCustomList(newArr);
    }
  };

  const onClickAddLiftOff = () => {
    var arrInvalid = [...invalidMaterialFormOther];
    var arrInvalid1 = [...invalidMaterialFormOther4];
    var check = headliffoff.find(
      (x) => x.cyplaceId === cyplacechoose[0].cyplaceId
    );
    var check1 = headliffoff.find(
      (x) => x.contrainerSize === containerSizeLiftOffChoose[0].containerSize
    );
    var check2 = headliffoff.find(
      (x) =>
        x.contrainerSize === containerSizeLiftOffChoose[0].containerSize &&
        x.cyplaceId === cyplacechoose[0].cyplaceId
    );

    if ((!check && !check1) || !check2) {
      if (
        getIsValidForm("LiftOff-need-validation") &&
        Object.keys(cyplacechoose).length &&
        Object.keys(containerSizeLiftOffChoose).length
      ) {
        arrInvalid[0] = false;
        setInvalidMaterialFormOther(arrInvalid);

        // console.log(headerinput)
        var incontrainerSize = containerSizeLiftOffChoose[0].containerSize;
        var incyplaceId = cyplacechoose[0].cyplaceId;
        var incyplaceNameThai = cyplacechoose[0].cyplaceNameThai;
        var inliftOffPrice = headerinput.liftOffPrice;
        var inpassengerFeePrice = headerinput.passengerFeePrice;
        var inweighingPrice = headerinput.weighingPrice;
        var inreceiveContrainerPrice = headerinput.receiveContrainerPrice;
        var obj = {
          contrainerSize: "",
          cyplaceId: null,
          cyplaceNameThai: null,
          liftOffPrice: 0.0,
          passengerFeePrice: 0.0,
          weighingPrice: 0.0,
          receiveContrainerPrice: 0.0,
        };
        var newArr = [];
        if (headliffoff.length) {
          newArr = [...headliffoff];
        }
        obj.contrainerSize = incontrainerSize;
        obj.cyplaceId = incyplaceId;
        obj.cyplaceNameThai = incyplaceNameThai;
        obj.liftOffPrice = inliftOffPrice;
        obj.passengerFeePrice = inpassengerFeePrice;
        obj.weighingPrice = inweighingPrice;
        obj.receiveContrainerPrice = inreceiveContrainerPrice;
        newArr.push(obj);
        setHeadLiftOff(newArr);

        document.getElementById("header-LiftOff-liftOffPrice").value = "";
        document.getElementById("header-LiftOff-passengerFeePrice").value = "";
        document.getElementById("header-LiftOff-weighingPrice").value = "";
        document.getElementById("header-LiftOff-receiveContrainerPrice").value =
          "";
        setNoValidateForm("LiftOff-need-validation");
      } else {
        if (!Object.keys(cyplacechoose).length) {
          arrInvalid[0] = true;
        } else {
          arrInvalid[0] = false;
        }
        if (!Object.keys(containerSizeLiftOffChoose).length) {
          arrInvalid1[0] = true;
        } else {
          arrInvalid1[0] = false;
        }
        setInvalidMaterialFormOther(arrInvalid);
        setInvalidMaterialFormOther4(arrInvalid1);
      }

      // setProvinceOvNSelection(newArr);

      // document.getElementById("overnight-province").selectedIndex = 0;
      // document.getElementById("overnight-price").value = "";
    }
  };

  const onClickAddPlaceContainerReturn = () => {
    var arrInvalid = [...invalidMaterialFormOther1];

    var check = headPlaceContainerReturn.find(
      (x) =>
        x.placeContainerReturnId ===
        placeContainerSelect[0].placeContainerReturnId
    );
    if (!check) {
      if (
        getIsValidForm("formPlaceContainerReturn-need-validation") &&
        Object.keys(placeContainerSelect).length
      ) {
        arrInvalid[0] = false;
        setInvalidMaterialFormOther1(arrInvalid);

        var inplaceContainerReturnId =
          placeContainerSelect[0].placeContainerReturnId;
        var inplaceContainerReturnNameThai =
          placeContainerSelect[0].placeContainerReturnNameThai;
        var inplaceContainerReturnCode =
          placeContainerSelect[0].placeContainerReturnCode;
        var intransporterCostPrice = headerInputPlaceCon.transporterCostPrice;
        var incustomFeePrice = headerInputPlaceCon.customFeePrice;
        var inportChargePrice = headerInputPlaceCon.portChargePrice;
        var inlashingChargePrice = headerInputPlaceCon.lashingChargePrice;
        var inrepackageChargePrice = headerInputPlaceCon.repackageChargePrice;
        var ininspectorFeePrice = headerInputPlaceCon.inspectorFeePrice;
        var infuelPrice = headerInputPlaceCon.fuelPrice;

        var obj = {
          placeContainerReturnId: null,
          placeContainerReturnNameThai: "",
          placeContainerReturnCode: "",
          transporterCostPrice: "",
          customFeePrice: 0.0,
          portChargePrice: 0.0,
          lashingChargePrice: 0.0,
          repackageChargePrice: 0.0,
          inspectorFeePrice: 0.0,
          fuelPrice: 0.0,
        };
        var newArr = [];
        if (headPlaceContainerReturn.length) {
          newArr = [...headPlaceContainerReturn];
        }
        obj.placeContainerReturnId = inplaceContainerReturnId;
        obj.placeContainerReturnNameThai = inplaceContainerReturnNameThai;
        obj.placeContainerReturnCode =
          "[" +
          inplaceContainerReturnCode +
          "]" +
          " " +
          inplaceContainerReturnNameThai;
        obj.transporterCostPrice = intransporterCostPrice;
        obj.customFeePrice = incustomFeePrice;
        obj.portChargePrice = inportChargePrice;
        obj.lashingChargePrice = inlashingChargePrice;
        obj.repackageChargePrice = inrepackageChargePrice;
        obj.inspectorFeePrice = ininspectorFeePrice;
        obj.fuelPrice = infuelPrice;

        newArr.push(obj);
        // console.log(obj)
        setHeadPlaceContainerReturn(newArr);

        document.getElementById("header-place-transporterCostPrice").value = "";
        document.getElementById("header-place-customFeePrice").value = "";
        document.getElementById("header-place-portChargePrice").value = "";
        document.getElementById("header-place-lashingChargePrice").value = "";
        document.getElementById("header-place-repackageChargePrice").value = "";
        document.getElementById("header-place-inspectorFeePrice").value = "";
        document.getElementById("header-place-fuelPrice").value = "";
        setNoValidateForm("formPlaceContainerReturn-need-validation");
      } else {
        if (!Object.keys(placeContainerSelect).length) {
          arrInvalid[0] = true;
        } else {
          arrInvalid[0] = false;
        }
        setInvalidMaterialFormOther1(arrInvalid);
      }

      // setProvinceOvNSelection(newArr);
    }
  };

  const onClickInPort = () => {
    // console.log(inputPort)
    var arrInvalid = [...invalidMaterialFormOther2];
    console.log(inputPort);
    var check = InPort.find(
      (x) => x.placeContainerReturnId === inputPort[0].placeContainerReturnId
    );
    // var check = false

    if (check) {
      // console.log('ซ้ำ')
      setvalidatecheck("ซ้ำ");
      setValidAlert(true);
    } else {
      setvalidatecheck(Constant.inValidNullMessage);
      if (
        getIsValidForm("Port-need-validation") &&
        Object.keys(inputPort).length
      ) {
        arrInvalid[0] = false;
        setInvalidMaterialFormOther2(arrInvalid);

        var newArr = [];
        // var obj = { "id": 1, "truckLicense": '' };
        var obj = {
          placeContainerReturnId: "",
          placeContainerReturnNameThai: "",
        };
        obj.placeContainerReturnId = inputPort[0].placeContainerReturnId;
        obj.placeContainerReturnNameThai =
          inputPort[0].placeContainerReturnNameThai;
        if (InPort.length) {
          // obj.id = obj.id + 1;
          newArr = [...InPort];
        }

        newArr.push(obj);
        setInPort(newArr);
        setNoValidateForm("Port-need-validation");
        setValidAlert(false);
      } else {
        if (!Object.keys(inputPort).length) {
          arrInvalid[0] = true;
        } else {
          arrInvalid[0] = false;
        }
        setInvalidMaterialFormOther2(arrInvalid);
        setInPort([]);
      }
    }
  };

  const fnClearOtherTableValueList = () => {
    setHeadPlaceContainerReturn([]);
    setCalFuelRateList([]);
    setCalMultiDropRateList([]);
    setCalOverNightRateList([]);
    setInTransportRate([]);
    setInPort([]);
    setInUnloadRate([]);
  };

  const onClickClearData = (type) => (e) => {
    setOpenAddForm(false);

    if (type === "Add") {
      document.getElementById("add-header-contractNo").value = "";
      document.getElementById("add-header-fueltypeId").selectedIndex = 0;
      document.getElementById("add-header-ratetypeId").selectedIndex = 0;
      document.getElementById("header-deliveryMode").selectedIndex = 0;

      // document.getElementById("in-search-PackageType").selectedIndex = 0;

      document.getElementById("add-header-refDoc").value = "";

      document.getElementById("add-header-dateStart").value = "";

      document.getElementById("add-header-dateEnd").value = "";

      document.getElementById("add-header-contractStatus").selectedIndex = 0;
    }
  };

  const onClickClearDataForSearch = () => {
    // setVal([''],[''],['']);//you pass any value from the array of top100Films
    // set value in TextField from dropdown list
    document.getElementById("in-search-ContractNo").value = "";
    document.getElementById("in-search-FuelType").selectedIndex = 0;
    document.getElementById("in-search-RateType").selectedIndex = 0;
    document.getElementById("in-search-DeliveryMode").selectedIndex = 0;
    // document.getElementById("in-search-TransporterId").value = ''

    // document.getElementById("in-search-PackageType").selectedIndex = 0;

    document.getElementById("in-search-RefDocNo").value = "";

    document.getElementById("in-search-StartDate").value = "";

    document.getElementById("search-header-year").value = "";

    document.getElementById("in-search-EndDate").value = "";

    document.getElementById("in-search-ContractStatus").selectedIndex = 0;
  };

  const onClickCheckFormAddData = () => {
    var arrObj = [...itemSelectAdd];
    var contractStatus = document.getElementById("add-header-contractStatus").value;
    if (
      getIsValidForm("add-header-need-validation") &&
      Object.keys(arrObj[0]).length &&
      Object.keys(arrObj[1]).length &&
      Object.keys(arrObj[2]).length
    ) {
      setInvalidMaterialFormAdd([false, false, false]);
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        if (headPlaceContainerReturn.length && calFuelRateList.length) {
          setIsConfirmSave(!isConfirmSave);
          // console.log(1111)
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        if (headPlaceContainerReturn.length && calFuelRateList.length) {
          setIsConfirmSave(!isConfirmSave);
          // console.log(1111)
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else {
        setIsNotAuthorized(!isNotAuthorized);
      }
    } else {
      var arrInvalid = [...invalidMaterialFormAdd];
      if (!Object.keys(arrObj[0]).length) {
        arrInvalid[0] = true;
      } else {
        arrInvalid[0] = false;
      }
      if (!Object.keys(arrObj[1]).length) {
        arrInvalid[1] = true;
      } else {
        arrInvalid[1] = false;
      }
      if (!Object.keys(arrObj[2]).length) {
        arrInvalid[2] = true;
      } else {
        arrInvalid[2] = false;
      }
      setInvalidMaterialFormAdd(arrInvalid);
    }
  };

  const onClickCheckFormCloneData = () => {
    var contractStatus = document.getElementById("clone-header-contractStatus").value;
    if (getIsValidForm("clone-header-need-validation")) {
     
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        if (headPlaceContainerReturn.length && calFuelRateList.length) {
          setIsConfirmSaveClone(!isConfirmSaveClone);
          // console.log(1111)
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        if (headPlaceContainerReturn.length && calFuelRateList.length) {
          setIsConfirmSaveClone(!isConfirmSaveClone);
          // console.log(1111)
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else {
        setIsNotAuthorized(!isNotAuthorized);
      }
    }
  };

  const onClickCheckFormEditData = () => {
    var contractStatus = document.getElementById("edit-header-contractStatus").value;
    if (getIsValidForm("edit-header-need-validation")) {
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        console.log(_UserAuthen)
        if (headPlaceContainerReturn.length && calFuelRateList.length) {
          setIsConfirmEdit(!isConfirmEdit);
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        console.log(contractStatus)
        if (headPlaceContainerReturn.length && calFuelRateList.length) {
          setIsConfirmEdit(!isConfirmEdit);
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else {
        setIsNotAuthorized(!isNotAuthorized);
      }
     
    }
  };

  const setMinValueInMaxHearder = (e, value, name) => {
    if (!isNaN(parseFloat(name.value))) {
      setHeaderMinValueForMax(name.value + 0.01);
    } else {
      setHeaderMinValueForMax(0);
    }
  };
  const setMaxValueInMinHearder = (e, value, name) => {
    if (!isNaN(parseFloat(name.value))) {
      setHeaderMaxValueForMin(name.value);
    } else {
      setHeaderMaxValueForMin(0);
    }
  };

  const _setMaxValueInMinHearder = (e, value, name) => {
    if (!isNaN(parseFloat(e.target.value))) {
      _setHeaderMaxValueForMin(e.target.value);
    } else {
      _setHeaderMaxValueForMin(0);
    }
  };

  const _setMinValueInMaxHearder = (e, value, name) => {
    if (!isNaN(parseFloat(e.target.value))) {
      _setHeaderMinValueForMax(e.target.value + 0.01);
    } else {
      _setHeaderMinValueForMax(0);
    }
  };

  const formButtomCloseDialogEdit = () => {
    if (!isLinkData) {
      return (
        <CButton className="btt-close" onClick={handleClose("edit")}>
          <h5>{Constant.txtDialogFormClose}</h5>
        </CButton>
      );
    } else {
      return (
        <CButton className="btt-close" onClick={onClickPreviousPage}>
          <h5>{Constant.txtDialogFormClose}</h5>
        </CButton>
      );
    }
  };

  const mainTable = () => {
    return (
      <CCard className="p-2" style={{ maxHeight: "700px", overflowY: "auto" }}>
        <CDataTable
          // Toolbar={{}}
          // columnFilter={{ disabled: true }}
          tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
          itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
          // className="CDataTable"
          items={exportLCLAIRList}
          fields={FMaintable}
          key={country.countryId}
          // hover
          // striped
          bordered
          // size="lg"
          itemsPerPage={10}
          pagination
          scopedSlots={{
            manage: (item) => {
              return (
                <td color="red" className="py-2">
                  <CRow>
                    <CCol className="col-12">
                      <CButton
                        color="primary"
                        block
                        size="sm"
                        onClick={handleClickOpen("edit", item.contractId)}
                      >
                        {Constant.btEditData}
                      </CButton>
                    </CCol>
                  </CRow>
                </td>
              );
            },
            // show_details: (item, index) => {
            //   return (
            //     <td className="py-2">
            //       <CButton
            //         color="primary"
            //         variant="outline"
            //         shape="square"
            //         size="sm"
            //         onClick={() => {
            //           toggleDetails(index);
            //         }}
            //       >
            //         {details.includes(index) ? "ซ่อน" : "แสดง"}
            //       </CButton>
            //     </td>
            //   );
            // },
            // details: (item, index) => {
            //   return (
            //     <CCollapse show={details.includes(index)}>
            //       <CCardBody>{otherTables("show", item)}</CCardBody>
            //     </CCollapse>
            //   );
            // },
            contractStatus: (item) => (
              <td>
                <h4>
                  <CBadge color={getBadge(item.contractStatus)}>
                    {item.contractStatus}
                  </CBadge>
                </h4>
              </td>
            ),
          }}
        />
      </CCard>
    );
  };

  const handleChangeEditForm = (type) => (e, value, name) => {
    var newObj = { ...editData };

    if (type === "contractNo") {
      newObj.contractNo = e.target.value;
    } else if (type === "refDocNo") {
      newObj.refDocNo = e.target.value;
    } else if (type === "startDate") {
      newObj.startDate = e.target.value;
    } else if (type === "endDate") {
      newObj.endDate = e.target.value;
    } else if (type === "rateTypeId") {
      newObj.rateTypeId = e.target.value;
    } else if (type === "fuelTypeId") {
      newObj.fuelTypeId = e.target.value;
    } else if (type === "deliveryMode") {
      newObj.deliveryMode = e.target.value;
    } else if (type === "contractStatus") {
      newObj.contractStatus = e.target.value;
    } else if (type === "minQty") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minQty = name.value;
        setHeaderMinValueForMax(name.value + 0.01);
      } else {
        newObj.minQty = name.value;
        setHeaderMinValueForMax(name.value);
      }
    } else if (type === "maxQty") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.maxQty = name.value;
        setHeaderMaxValueForMin(name.value);
      } else {
        if (e.target.value < 0) {
          newObj.maxQty = 0;
          setHeaderMaxValueForMin(0);
        } else {
          newObj.maxQty = name.value;
          setHeaderMaxValueForMin(name.value);
        }
      }
    } else if (type === "minTonRate") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minTonRate = name.value;
      } else {
        newObj.minTonRate = 0;
      }
    }

    setEditData(newObj);
  };

  const handleChangeEditSelect = (type) => (e, values) => {
    if (type === "transporter") {
      if (values) {
        var newArr = [...itemSelectEdit];
        newArr[0] = values;
        setItemSelectEdit(newArr);
      } else {
        var newArr = [...itemSelectEdit];
        newArr[0] = {};
        setItemSelectEdit(newArr);
      }
    } else if (type === "source") {
      if (values) {
        var newArr = [...itemSelectEdit];
        newArr[1] = values;
        setItemSelectEdit(newArr);
      } else {
        var newArr = [...itemSelectEdit];
        newArr[1] = {};
        setItemSelectEdit(newArr);
      }
    } else if (type === "truckType") {
      if (values) {
        var newArr = [...itemSelectEdit];
        newArr[2] = values;
        setItemSelectEdit(newArr);
      } else {
        var newArr = [...itemSelectEdit];
        newArr[2] = {};
        setItemSelectEdit(newArr);
      }
    } else if (type === "port") {
      if (values) {
        var newArr = [...itemSelectEdit];
        newArr[2] = values;
        setItemSelectEdit(newArr);
      } else {
        var newArr = [...itemSelectEdit];
        newArr[2] = {};
        setItemSelectEdit(newArr);
      }
    }
  };

  const handleChangeAddSelect = (type) => (e, values) => {
    if (type === "transporter") {
      if (values) {
        var newArr = [...itemSelectAdd];
        newArr[0] = values;
        setItemSelectAdd(newArr);
        // console.log(newArr[0]);
      } else {
        var newArr = [...itemSelectAdd];
        newArr[0] = {};
        setItemSelectAdd(newArr);
      }
    } else if (type === "source") {
      if (values) {
        var newArr = [...itemSelectAdd];
        newArr[1] = values;
        setItemSelectAdd(newArr);
        // console.log(newArr[1]);
        // console.log(itemSelectAdd);
      } else {
        var newArr = [...itemSelectAdd];
        newArr[1] = {};
        setItemSelectAdd(newArr);
      }
    } else if (type === "trucktype") {
      if (values) {
        var newArr = [...itemSelectAdd];
        newArr[2] = values;
        setItemSelectAdd(newArr);
      } else {
        var newArr = [...itemSelectAdd];
        newArr[2] = {};
        setItemSelectAdd(newArr);
      }
    }
  };

  const formButtonManageEdit = () => {
    if (!isLinkData) {
      return (
        <div>
          {/* <div className="dropdown-divider" /> */}
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
                    color="primary"
                    onClick={() => setIsShowCloned(!isShowCloned)}
                  >
                    {Constant.btCloneData}
                  </CButton>
                </Box>
              </CFormGroup>
            </CCol>
            <CCol md="3" />
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
                    color="success"
                    onClick={onClickCheckFormEditData}
                  >
                    {Constant.btSave}
                  </CButton>
                </Box>
              </CFormGroup>
            </CCol>
            <CCol md="3" />
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
                    onClick={() => setIsConfirmDelete(!isConfirmDelete)}
                  >
                    {Constant.btDeleteData}
                  </CButton>
                </Box>
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
      );
    }
  };

  const onClickAddData = () => {
    setIsConfirmSave(!isConfirmSave);
    var contractNo = document.getElementById("add-header-contractNo").value;
    var sourceId = itemSelectAdd[1].sourceId;
    var transporterId = itemSelectAdd[0].transporterId;
    // var packageType = document.getElementById("header-packagetypeId").value;
    var rateTypeId = parseInt(
      document.getElementById("add-header-fueltypeId").value
    );
    var fuelTypeId = parseInt(
      document.getElementById("add-header-ratetypeId").value
    );
    var truckTypeId = itemSelectAdd[2].truckTypeId;
    var deliveryMode = document.getElementById("header-deliveryMode").value;
    var refDocNo = document.getElementById("add-header-refDoc").value;
    var startDate = document.getElementById("add-header-dateStart").value;
    var endDate = document.getElementById("add-header-dateEnd").value;
    var minQty = document.getElementById("add-header-minqty").value;
    var maxQty = document.getElementById("add-header-maxqty").value;
    var minTonRate = document.getElementById("add-header-mintonrate").value;
    var contractStatus = document.getElementById(
      "add-header-contractStatus"
    ).value;
    var createBy = parseInt(localStorage.getItem("userId"));

    if (startDate === "") {
      startDate = null;
    }
    if (endDate === "") {
      endDate = null;
    }

    var newArrHeader = [
      contractNo,
      sourceId,
      transporterId,
      rateTypeId,
      truckTypeId,
      fuelTypeId,
      minQty,
      maxQty,
      minTonRate,
      refDocNo,
      startDate,
      endDate,
      contractStatus,
      createBy,
      deliveryMode,
    ];

    var newArrPlaceContainer = [];
    headPlaceContainerReturn.map((item) => {
      var newObj = {
        placeContainerReturnId: null,
        transporterCostPrice: 0.0,
        customFeePrice: 0.0,
        portChargePrice: 0.0,
        lashingChargePrice: 0.0,
        repackageChargePrice: 0.0,
        inspectorFeePrice: 0.0,
        fuelPrice: 0.0,
      };
      newObj.placeContainerReturnId = item.placeContainerReturnId;
      newObj.transporterCostPrice = parseFloat(item.transporterCostPrice);
      newObj.customFeePrice = parseFloat(item.customFeePrice);
      newObj.portChargePrice = parseFloat(item.portChargePrice);
      newObj.lashingChargePrice = parseFloat(item.lashingChargePrice);
      newObj.repackageChargePrice = parseFloat(item.repackageChargePrice);
      newObj.inspectorFeePrice = parseFloat(item.inspectorFeePrice);
      newObj.fuelPrice = parseFloat(item.fuelPrice);

      newArrPlaceContainer.push(newObj);
    });

    console.log(calFuelRateList);
    var newArrCalFuelRateList = [];
    calFuelRateList.map((item) => {
      var newObj = {
        startRate: 0.0,
        endRate: 0.0,
        fuelRatePrice: 0.0,
      };
      newObj.startRate = parseFloat(item.startRate);
      newObj.endRate = parseFloat(item.endRate);
      newObj.fuelRatePrice = parseFloat(item.fuelRatePrice);
      newArrCalFuelRateList.push(newObj);
    });

    console.log(newArrHeader);
    console.log(newArrPlaceContainer);
    console.log(newArrCalFuelRateList);

    fnInsertData(newArrHeader, newArrPlaceContainer, newArrCalFuelRateList);
  };
  const onClickCloneData = () => {
    setIsConfirmSaveClone(!isConfirmSaveClone);
    var contractNo = document.getElementById("clone-header-contractNo").value;
    var sourceId = itemSelectAdd[1].sourceId;
    var transporterId = itemSelectAdd[0].transporterId;
    var trucktypeId = itemSelectAdd[2].truckTypeId;
    var minQty = parseFloat(
      document.getElementById("clone-header-minQty").value
    );
    var maxQty = parseFloat(
      document.getElementById("clone-header-maxQty").value
    );
    var minTonRate = parseFloat(
      document.getElementById("clone-header-minTonRate").value
    );
    var rateTypeId = parseInt(
      document.getElementById("clone-header-ratetypeId").value
    );
    var fuelTypeId = parseInt(
      document.getElementById("clone-header-fuelTypeId").value
    );
    var deliveryMode = document.getElementById(
      "clone-header-deliveryMode"
    ).value;
    var refDocNo = document.getElementById("clone-header-refDoc").value;
    var startDate = document.getElementById("clone-header-dateStart").value;
    var endDate = document.getElementById("clone-header-dateEnd").value;
    var contractStatus = document.getElementById(
      "clone-header-contractStatus"
    ).value;
    var createBy = parseInt(localStorage.getItem("userId"));

    if (startDate === "") {
      startDate = null;
    }
    if (endDate === "") {
      endDate = null;
    }

    var newArrHeader = [
      contractNo,
      sourceId,
      transporterId,
      rateTypeId,
      trucktypeId,
      fuelTypeId,
      minQty,
      maxQty,
      minTonRate,
      refDocNo,
      startDate,
      endDate,
      contractStatus,
      createBy,
      deliveryMode,
    ];

    var newArrPlaceContainer = [];
    headPlaceContainerReturn.map((item) => {
      var newObj = {
        placeContainerReturnId: null,
        transporterCostPrice: 0.0,
        customFeePrice: 0.0,
        portChargePrice: 0.0,
        lashingChargePrice: 0.0,
        repackageChargePrice: 0.0,
        inspectorFeePrice: 0.0,
        fuelPrice: 0.0,
      };
      newObj.placeContainerReturnId = item.placeContainerReturnId;
      newObj.transporterCostPrice = parseFloat(item.transporterCostPrice);
      newObj.customFeePrice = parseFloat(item.customFeePrice);
      newObj.portChargePrice = parseFloat(item.portChargePrice);
      newObj.lashingChargePrice = parseFloat(item.lashingChargePrice);
      newObj.repackageChargePrice = parseFloat(item.repackageChargePrice);
      newObj.inspectorFeePrice = parseFloat(item.inspectorFeePrice);
      newObj.fuelPrice = parseFloat(item.fuelPrice);
      newArrPlaceContainer.push(newObj);
    });

    console.log(calFuelRateList);
    var newArrCalFuelRateList = [];
    calFuelRateList.map((item) => {
      var newObj = {
        startRate: 0.0,
        endRate: 0.0,
        fuelRatePrice: 0.0,
      };
      newObj.startRate = parseFloat(item.startRate);
      newObj.endRate = parseFloat(item.endRate);
      newObj.fuelRatePrice = parseFloat(item.fuelRatePrice);
      newArrCalFuelRateList.push(newObj);
    });
    console.log(newArrHeader);
    console.log(newArrPlaceContainer);
    console.log(newArrCalFuelRateList);

    fnInsertData(newArrHeader, newArrPlaceContainer, newArrCalFuelRateList);
  };

  const showtext = () => {
    if (textEmtry) {
      return (
        <CLabel show="false" style={{ color: "red" }}>
          {" "}
          **
        </CLabel>
      );
    } else {
    }
  };

  const handleChangeCloneForm = (type) => (e, value, name) => {
    var newObj = { ...cloneData };
    console.log(cloneData);

    if (type === "contractNo") {
      newObj.contractNo = e.target.value;
    } else if (type === "refDocNo") {
      newObj.refDocNo = e.target.value;
    } else if (type === "startDate") {
      newObj.startDate = e.target.value;
    } else if (type === "endDate") {
      newObj.endDate = e.target.value;
    } else if (type === "rateTypeId") {
      newObj.rateTypeId = e.target.value;
    } else if (type === "fuelTypeId") {
      newObj.fuelTypeId = e.target.value;
    } else if (type === "deliveryMode") {
      newObj.deliveryMode = e.target.value;
    } else if (type === "contractStatus") {
      newObj.contractStatus = e.target.value;
    } else if (type === "minQty") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minQty = name.value;
        setHeaderMinValueForMax(name.value + 0.01);
      } else {
        newObj.minQty = name.value;
        setHeaderMinValueForMax(0);
      }
    } else if (type === "maxQty") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.maxQty = name.value;
        setHeaderMaxValueForMin(name.value);
      } else {
        if (name.value < 0) {
          newObj.maxQty = 0;
          setHeaderMaxValueForMin(0);
        } else {
          newObj.maxQty = name.value;
          setHeaderMaxValueForMin(0);
        }
      }
    } else if (type === "minTonRate") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minTonRate = name.value;
      } else {
        newObj.minTonRate = 0;
      }
    }

    setCloneData(newObj);
  };
  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var arrObj = [...itemSelectEdit];

    var transporterId = arrObj[0].transporterId;
    var sourceId = arrObj[1].sourceId;
    var trucktypeId = arrObj[2].truckTypeId;
    var fuelTypeId = document.getElementById("edit-header-fuelTypeId").value;
    var contractStatus = document.getElementById(
      "edit-header-contractStatus"
    ).value;
    var deliveryMode = document.getElementById(
      "edit-header-deliveryMode"
    ).value;

    var newArrPlaceContainer = [];
    headPlaceContainerReturn.map((item) => {
      var newObj = {
        placeContainerReturnId: null,
        transporterCostPrice: 0.0,
        customFeePrice: 0.0,
        portChargePrice: 0.0,
        lashingChargePrice: 0.0,
        repackageChargePrice: 0.0,
        inspectorFeePrice: 0.0,
        fuelPrice: 0.0,
      };
      newObj.placeContainerReturnId = item.placeContainerReturnId;
      newObj.transporterCostPrice = parseFloat(item.transporterCostPrice);
      newObj.customFeePrice = parseFloat(item.customFeePrice);
      newObj.portChargePrice = parseFloat(item.portChargePrice);
      newObj.lashingChargePrice = parseFloat(item.lashingChargePrice);
      newObj.repackageChargePrice = parseFloat(item.repackageChargePrice);
      newObj.inspectorFeePrice = parseFloat(item.inspectorFeePrice);
      newObj.fuelPrice = parseFloat(item.fuelPrice);
      newArrPlaceContainer.push(newObj);
    });

    console.log(calFuelRateList);
    var newArrCalFuelRateList = [];
    calFuelRateList.map((item) => {
      var newObj = {
        startRate: 0.0,
        endRate: 0.0,
        fuelRatePrice: 0.0,
      };
      newObj.startRate = parseFloat(item.startRate);
      newObj.endRate = parseFloat(item.endRate);
      newObj.fuelRatePrice = parseFloat(item.fuelRatePrice);
      newArrCalFuelRateList.push(newObj);
    });

    var newObj = { ...editData };

    newObj.transporterId = transporterId;
    newObj.sourceId = sourceId;
    newObj.truckTypeId = trucktypeId;
    newObj.fuelTypeId = fuelTypeId;
    newObj.deliveryMode = deliveryMode;
    newObj.contractStatus = contractStatus;
    newObj.mcontractExportLclairplaceContainerReturns = [
      ...newArrPlaceContainer,
    ];
    newObj.mcontractExportLclairfuelRates = [...newArrCalFuelRateList];
    newObj.updateBy = parseInt(localStorage.getItem("userId"));
    console.log(newObj);
    fnUpdateData(newObj);
  };

  const otherTables = (type, item) => {
    if (type === "edit") {
      if (
        !isGetDatainCalValue &&
        Object.keys(editData).length &&
        placeContrainer.length
      ) {
        // console.log(editData);
        var newObj = { ...editData };
        var newArr = [];
        newObj.mcontractExportLclairfuelRates.map((item) => {
          var obj = {
            startRate: 0.0,
            endRate: 0.0,
            fuelRatePrice: 0.0,
          };
          obj.startRate = item.startRate;
          obj.endRate = item.endRate;
          obj.fuelRatePrice = item.fuelRatePrice;

          newArr.push(obj);
        });

        setCalFuelRateList(newArr);

        newArr = [];
        newObj.mcontractExportLclairplaceContainerReturns.map((item) => {
          var obj = {
            placeContainerReturnId: null,
            placeContainerReturnNameThai: "",
            placeContainerReturnCode: "",
            transporterCostPrice: 0.0,
            customFeePrice: 0.0,
            portChargePrice: 0.0,
            lashingChargePrice: 0.0,
            repackageChargePrice: 0.0,
            inspectorFeePrice: 0.0,
            fuelPrice: 0.0,
          };
          obj.placeContainerReturnId = item.placeContainerReturnId;
          var newPlaceCon = placeContrainer.find(
            (x) => x.placeContainerReturnId === item.placeContainerReturnId
          );
          obj.placeContainerReturnNameThai = newPlaceCon
            ? newPlaceCon.placeContainerReturnNameThai
            : "";
          obj.placeContainerReturnCode =
            "[" +
            newPlaceCon.placeContainerReturnNameThai +
            "]" +
            " " +
            obj.placeContainerReturnNameThai;

          obj.transporterCostPrice = item.transporterCostPrice;

          obj.customFeePrice = item.customFeePrice;
          obj.portChargePrice = item.portChargePrice;
          obj.lashingChargePrice = item.lashingChargePrice;
          obj.repackageChargePrice = item.repackageChargePrice;
          obj.inspectorFeePrice = item.inspectorFeePrice;
          obj.fuelPrice = item.fuelPrice;

          newArr.push(obj);
        });
        setHeadPlaceContainerReturn(newArr);

        setIsGetDatainCalValue(true);
      }
    }

    if (type === "show") {
      // if (item.mcontractExportLclairplaceContainerReturns.length) {
      //   console.log(item);
      //   item.mcontractExportLclairplaceContainerReturns.map((y) => {
      //     var newPlaceCon = placeContrainer.find(
      //       (x) => x.placeContainerReturnId === y.placeContainerReturnId
      //     );

      //     y.placeContainerReturnNameThai =
      //       newPlaceCon.placeContainerReturnNameThai;
      //   });
      // }

      return (
        <List>
          <div className={classes.root}>
            <AppBar position="center" color="default">
              <Tabs
                className={classes.tabRoot}
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                centered
              >
                <Tab
                  style={{ outline: "none" }}
                  label="Place Container Return"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label="Fuel Rate"
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <CRow className="justify-content-center">
                  <CCard>
                    {tabledata(
                      FPlaceContainerReturn,
                      item.mcontractExportLclairplaceContainerReturns
                    )}
                  </CCard>
                </CRow>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <CRow className="justify-content-center">
                  <CCard>
                    {tabledata(
                      FEXTransportRate,
                      item.mcontractExportLclairfuelRates
                    )}
                  </CCard>
                </CRow>
              </TabPanel>
            </SwipeableViews>
          </div>
        </List>
      );
    } else {
      if (
        truckType.length &&
        shipTo.length &&
        source.length &&
        transporterList.length &&
        packageType.length &&
        contractStatus.length &&
        fuelType.length &&
        rateType.length &&
        cbdeliveryMode.length &&
        placeContrainer.length &&
        cyplace.length &&
        cbport.length
      ) {
        return (
          <List>
            <div className={classes.root}>
              <AppBar position="center" color="default">
                <Tabs
                  className={classes.tabRoot}
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  centered
                >
                  {/* <Tab style={{ outline: 'none' }} label="Custom" {...a11yProps(0)} /> */}
                  <Tab
                    style={{ outline: "none" }}
                    label="Place Container Return"
                    {...a11yProps(0)}
                  />
                  {/* <Tab
                    style={{ outline: "none" }}
                    label="ShippingSP"
                    {...a11yProps(1)}
                  /> */}
                  <Tab
                    style={{ outline: "none" }}
                    label="Fuel Rate"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {type === "add"
                    ? formPlaceContainerReturn()
                    : type === "edit"
                    ? formPlaceContainerReturn()
                    : null}
                </TabPanel>
                {/* <TabPanel value={value} index={1} dir={theme.direction}>
                  {type === "add"
                    ? formShippingSP()
                    : type === "edit"
                    ? formShippingSP()
                    : null}
                // </TabPanel> */}
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {type === "add"
                    ? formFuelRate()
                    : type === "edit"
                    ? formFuelRate()
                    : null}
                </TabPanel>
              </SwipeableViews>
            </div>
          </List>
        );
      }
    }
  };

  const tabledata = (fieldsIn, data) => {
    return (
      <h6>
        <CCardBody>
          <CDataTable
            columnFilter
            // tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
            // itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
            className="CDataTable"
            items={data}
            striped
            hover
            fields={fieldsIn}
            size="xl"
            itemsPerPage={10}
            pagination
          />
        </CCardBody>
      </h6>
    );
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
            <CCardBody>
              <CForm className="search-header-need-validation">
                <CRow className="m-0 p-0 ">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">วันเริ่มต้น</CLabel>
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
                          onChange={handleChangSearch("StartDate")}
                          id="in-search-StartDate"
                          name="date-input"
                          placeholder="date"
                          required
                        />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldMasterConDomHeader[13]}
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
                          id="in-search-EndDate"
                          onChange={handleChangSearch("EndDate")}
                          name="date-input"
                          placeholder="date"
                          required
                        />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">ปีสิ้นสุด</CLabel>
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
                          id="search-header-year"
                          // style={{ height: Constant.styleHeightField }}
                          onChange={handleChangSearch("Years")}
                          required
                        >
                          <option selected hidden value="">
                            {Constant.txtformPlaceholderSelected}
                          </option>
                          {fullYearList.map((x) => (
                            <option value={x}>{x}</option>
                          ))}
                        </CSelect>
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
              <CRow className="m-0 p-0 ">
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">เลขที่สัญญา</CLabel>
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
                          onChange={handleChangSearch("ContractNo")}
                          id="in-search-ContractNo"
                          placeholder=""
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
                    <CLabel htmlFor="name">ประเภทสัญญา</CLabel>
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
                        onChange={handleChangSearch("DeliveryMode")}
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>
                        <option value={0}>{Constant.txtAll}</option>
                        {cbdeliveryMode.map((cb) => (
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
                </CCol>

                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.txtMasterTransporterEng}
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
                          onChange={handleChangSelect("Search-TransporterId")}
                          id="in-search-TransporterId"
                          // value={val[0] }
                          options={transporterList}
                          style={{ fontFamily: "Scg" }}
                          filterSelectedOptions
                          size="small"
                          fullWidth
                          getOptionLabel={(option) =>
                            "[" +
                            option.transporterCode +
                            "] " +
                            option.transporterNameThai
                          }
                          // getOptionLabel={(option) => {
                          //   ("[" + option.transporterCode + "] " + option.transporterNameThai) ? ("[" + option.transporterCode + "] " + option.transporterNameThai) : ''}
                          // }
                          renderOption={(option) => {
                            return (
                              <Typography
                                className={classes.comboOptions}
                                value={option.countryId}
                              >
                                {`[${option.transporterCode}]` +
                                  "  " +
                                  option.transporterNameThai}
                              </Typography>
                            );
                          }}
                          renderInput={(params) => {
                            params.inputProps.className = classes.comboOptions;
                            return (
                              <TextField
                                InputProps={{
                                  className: classes.input,
                                }}
                                // error={invalidMaterialFormAdd}
                                {...params}
                                size="small"
                                label={
                                  <Typography className={classes.label}>
                                    {Constant.txtformPlaceholderSelected}
                                  </Typography>
                                }
                                // helperText={
                                //   invalidMaterialFormAdd
                                //     ? Constant.inValidNullMessage
                                //     : null
                                // }
                                variant="outlined"
                              />
                            );
                          }}
                        />
                      </Box>

                      <CInvalidFeedback>
                        {Constant.inValidNullSelected}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="name">Loading Location</CLabel>
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
                        onChange={handleChangSelect("Search-SourceID")}
                        id="in-search-SourceId"
                        // value={val[1]}
                        options={source}
                        style={{ fontFamily: "Scg" }}
                        size="small"
                        filterSelectedOptions
                        getOptionLabel={(option) =>
                          "[" + option.sourceCode + "] " + option.sourceNameThai
                        }
                        renderOption={(option) => {
                          return (
                            <Typography
                              className={classes.comboOptions}
                              value={option.countryId}
                            >
                              {`[${option.sourceCode}]` +
                                "  " +
                                option.sourceNameThai}
                            </Typography>
                          );
                        }}
                        renderInput={(params) => {
                          params.inputProps.className = classes.comboOptions;
                          return (
                            <TextField
                              InputProps={{
                                className: classes.input,
                              }}
                              // error={invalidMaterialFormAdd}
                              {...params}
                              size="small"
                              label={
                                <Typography className={classes.label}>
                                  {Constant.txtformPlaceholderSelected}
                                </Typography>
                              }
                              // helperText={
                              //   invalidMaterialFormAdd
                              //     ? Constant.inValidNullMessage
                              //     : null
                              // }
                              variant="outlined"
                            />
                          );
                        }}
                      />
                    </Box>

                    <CInvalidFeedback>
                      {Constant.inValidNullSelected}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">{Constant.txtTruckType}</CLabel>
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
                          id="edit-header-transporter"
                          options={truckType}
                          // value={val[2]}
                          size="small"
                          filterSelectedOptions
                          getOptionLabel={(option) =>
                            "[" +
                            option.truckTypeCode +
                            "] " +
                            option.truckTypeName
                          }
                          // style={{ width: 300 }}
                          onChange={handleChangSelect("Search-TruckTypeId")}
                          renderOption={(option) => (
                            <Typography
                              className={classes.autoCompleteRenderOptions}
                            >
                              {"[" +
                                option.truckTypeCode +
                                "] " +
                                option.truckTypeName}
                            </Typography>
                          )}
                          renderInput={(params) => {
                            params.inputProps.className =
                              classes.autoCompleteInputLabel;
                            return (
                              <TextField
                                size="small"
                                // style={{ height: Constant.styleHeightField }}
                                error={invalidMaterialFormEdit[0]}
                                {...params}
                                label={
                                  <Typography
                                    className={classes.autoCompleteInputLabel}
                                  >
                                    {Constant.txtformPlaceholderSelected}
                                  </Typography>
                                }
                                helperText={
                                  invalidMaterialFormEdit[0] ? (
                                    <Typography
                                      className={
                                        classes.autoCompleteInputHelperText
                                      }
                                    >
                                      {Constant.inValidNullMessage}
                                    </Typography>
                                  ) : null
                                }
                                variant="outlined"
                              />
                            );
                          }}
                          disabled={isLinkData}
                        />
                        <CInvalidFeedback>
                          {Constant.inValidNullSelected}
                        </CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CFormGroup>
                </CCol>

                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="name">ประเภทเชื้อเพลิง</CLabel>
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
                        id="in-search-FuelType"
                        // onChange={handleChangSearch("PackageType")}
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>
                        <option value={0}>{Constant.txtAll}</option>
                        {fuelType.map((cb) => (
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
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="name">ประเภทขนส่ง</CLabel>
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
                        id="in-search-RateType"
                        // onChange={handleChangSearch("PackageType")}
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>
                        <option value={0}>{Constant.txtAll}</option>
                        {rateType.map((cb) => (
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
                </CCol>

                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">หมายเลขอ้างอิง</CLabel>
                    <Box
                      className="border-set"
                      component={Grid}
                      item
                      boxShadow={1}
                      // xs={{
                      //   width: " 100%",
                      // }}
                    >
                      <CInput
                        onChange={handleChangSearch("RefDocNo")}
                        id="in-search-RefDocNo"
                        placeholder=""
                      />
                    </Box>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="name">สถานะการใช้งาน</CLabel>
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
                        onChange={handleChangSearch("ContractStatus")}
                        id="in-search-ContractStatus"
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>
                        {contractStatus.map((cb) => (
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
                        onClick={onClickClearDataForSearch}
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
      <br />
    </CForm>
  );

  const dialogs = () => {
    return (
      <h6>
        <CButton
          size={Constant.btAddSize}
          block
          className="btn-mainsmp"
          onClick={handleClickOpen("add")}
        >
          สร้างรายการ
        </CButton>

        <Dialog
          fullScreen
          open={openAddForm}
          onClose={handleClose("add")}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={handleClose("add")}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={classes.title}>
                <h3>{Constant.txtDialogMasterConDom}</h3>
              </Typography>
              <CButton className="btt-close" onClick={handleClose("add")}>
                <h5>{Constant.txtDialogFormClose}</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>
            {collapseHeader("add")}
            {otherTables("add")}
            {modalForDialog()}
          </List>
        </Dialog>

        <Dialog
          fullScreen
          open={openEditForm}
          onClose={handleClose("edit")}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={handleClose("edit")}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={classes.title}>
                <h3>Contract</h3>
              </Typography>
              {formButtomCloseDialogEdit()}
            </Toolbar>
          </AppBar>
          <List>
            {collapseHeader("edit")}
            {otherTables("edit")}
            {modalForDialog()}
          </List>
        </Dialog>

        <Dialog
          fullScreen
          open={openCloneForm}
          onClose={handleClose("clone")}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={handleClose("clone")}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={classes.title}>
                <h3>Contract</h3>
              </Typography>
              <CButton className="btt-close" onClick={handleClose("clone")}>
                <h5>{Constant.txtDialogFormClose}</h5>
              </CButton>
              {/* {formButtomCloseDialogEdit()} */}
            </Toolbar>
          </AppBar>
          <List>
            {collapseHeader("clone")}
            {otherTables("add")}
            {modalForDialog()}
          </List>
        </Dialog>
      </h6>
    );
  };

  //   const collapseHeader = (type) => {
  //     console.log(type);
  //   };

  const collapseHeader = (type) => {
    if (isLoadingData) {
      return (
        <CRow>
          <CCol>
            <br /> <br />
            <br /> <br />
            <br /> <br />
            <br /> <br />
            <br /> <br />
            <br /> <br />
            <br /> <br />
            {showLoadingData()}
          </CCol>
        </CRow>
      );
    } else if (
      truckType.length &&
      shipTo.length &&
      source.length &&
      transporterList.length &&
      packageType.length &&
      contractStatus.length &&
      fuelType.length &&
      rateType.length &&
      cbdeliveryMode.length &&
      placeContrainer.length &&
      cyplace.length &&
      cbport.length
    ) {
      if (!isGetDataOtherTable) {
        setIsGetDataOtherTable(true);
      }
      if (type === "add") {
        return (
          <CCard color="gradient-secondary" className="color-card-gra">
            <CForm className="add-header-need-validation">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                สร้างรายการใหม่
                <div className="card-header-actions">
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
                </div>
              </CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody className="font-form-scg-card p-2">
                  {/* <h6> */}
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">วันเริ่มต้น</CLabel>
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
                                id="add-header-dateStart"
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
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">วันสิ้นสุด</CLabel>
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
                                id="add-header-dateEnd"
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
                        <CCol xs="12" sm="6" md="4">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.txtVenderName}
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
                                  id="edit-header-transporter"
                                  options={transporterList}
                                  size="small"
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.transporterCode +
                                    "] " +
                                    option.transporterNameThai
                                  }
                                  // style={{ width: 300 }}
                                  onChange={handleChangeAddSelect(
                                    "transporter"
                                  )}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.transporterCode +
                                        "] " +
                                        option.transporterNameThai}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormAdd[0]}
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
                                          invalidMaterialFormAdd[0] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Loading Location</CLabel>
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
                                  id="edit-header-source"
                                  options={source}
                                  size="small"
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.sourceCode +
                                    "] " +
                                    option.sourceNameThai
                                  }
                                  // style={{ width: 300 }}

                                  onChange={handleChangeAddSelect("source")}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.sourceCode +
                                        "] " +
                                        option.sourceNameThai}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormAdd[1]}
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
                                          invalidMaterialFormAdd[1] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>

                    <Box
                      className="border-set"
                      component={Grid}
                      item
                      boxShadow={1}
                      xs={{
                        width: " 100%",
                      }}
                    >
                      <CCard>
                        <CRow className="m-3 p-0">
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">ประเภทสัญญา</CLabel>
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
                                    id="header-deliveryMode"
                                    required
                                  >
                                    <option selected hidden value="">
                                      เลือกประเภทสัญญา
                                    </option>
                                    {cbdeliveryMode.map((cb) => (
                                      <option value={cb.valueMember}>
                                        {cb.displayMember}{" "}
                                      </option>
                                    ))}
                                  </CSelect>
                                  <CInvalidFeedback>
                                    {Constant.inValidNullSelected}
                                  </CInvalidFeedback>
                                </Box>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">ประเภทเชื้อเพลิง</CLabel>
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
                                    id="add-header-fueltypeId"
                                    required
                                  >
                                    <option selected hidden value="">
                                      เลือกประเภทเชื้อเพลิง
                                    </option>
                                    {fuelType.map((cb) => (
                                      <option value={cb.valueMember}>
                                        {cb.displayMember}{" "}
                                      </option>
                                    ))}
                                  </CSelect>
                                  <CInvalidFeedback>
                                    {Constant.inValidNullSelected}
                                  </CInvalidFeedback>
                                </Box>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">
                                  {Constant.txtTruckType}
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
                                    id="edit-header-transporter"
                                    options={truckType}
                                    size="small"
                                    getOptionLabel={(option) =>
                                      "[" +
                                      option.truckTypeCode +
                                      "] " +
                                      option.truckTypeName
                                    }
                                    // style={{ width: 300 }}
                                    onChange={handleChangeAddSelect(
                                      "trucktype"
                                    )}
                                    renderOption={(option) => (
                                      <Typography
                                        className={
                                          classes.autoCompleteRenderOptions
                                        }
                                      >
                                        {"[" +
                                          option.truckTypeCode +
                                          "] " +
                                          option.truckTypeName}
                                      </Typography>
                                    )}
                                    renderInput={(params) => {
                                      params.inputProps.className =
                                        classes.autoCompleteInputLabel;
                                      return (
                                        <TextField
                                          size="small"
                                          // style={{ height: Constant.styleHeightField }}
                                          error={invalidMaterialFormAdd[2]}
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
                                            invalidMaterialFormAdd[2] ? (
                                              <Typography
                                                className={
                                                  classes.autoCompleteInputHelperText
                                                }
                                              >
                                                {Constant.inValidNullMessage}
                                              </Typography>
                                            ) : null
                                          }
                                          variant="outlined"
                                        />
                                      );
                                    }}
                                    disabled={isLinkData}
                                  />
                                  <CInvalidFeedback>
                                    {Constant.inValidNullSelected}
                                  </CInvalidFeedback>
                                </Box>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">ประเภทการขนส่ง</CLabel>
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
                                    id="add-header-ratetypeId"
                                    required
                                  >
                                    <option selected hidden value="">
                                      เลือกประเภทการขนส่ง
                                    </option>
                                    {rateType.map((cb) => (
                                      <option value={cb.valueMember}>
                                        {cb.displayMember}{" "}
                                      </option>
                                    ))}
                                  </CSelect>
                                  <CInvalidFeedback>
                                    {Constant.inValidNullSelected}
                                  </CInvalidFeedback>
                                </Box>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCard>

                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CCard>
                          <CRow className="m-3 p-0">
                            <CCol xs="12" sm="6" md="2">
                              <CFormGroup>
                                <CLabel htmlFor="name">
                                  {Constant.arrFieldMasterConDomHeader[8]}
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
                                  <CInputGroup className="input-prepend">
                                    <CInputGroupPrepend>
                                      <CInputGroupText>
                                        {_txtUnitTon}
                                      </CInputGroupText>
                                    </CInputGroupPrepend>
                                    {/* <CInput
                                      type="number"
                                      // style={{ height: Constant.styleHeightField }}
                                      id="add-header-minqty"
                                      step="0.001"
                                      min="0"
                                       onWheel={(e) => e.target.blur()}
                                      max={headerMaxValueForMin}
                                      onWheel={(e) => e.target.blur()}
                                      // value={isClone ? minQtyValue : null}
                                      onChange={setMinValueInMaxHearder}
                                      required
                                    /> */}
                                    <CurrencyInput
                                      class="form-control"
                                      id="add-header-minqty"
                                      name="input-name"
                                      maxLength="12"
                                      decimalScale={3}
                                      step={0.01}
                                      min={0}
                                      decimalsLimit={3}
                                      max={headerMaxValueForMin}
                                      // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                                      onValueChange={setMinValueInMaxHearder}
                                      required
                                    />
                                    <CInvalidFeedback>
                                      {Constant.inValidNullMessage}
                                    </CInvalidFeedback>
                                  </CInputGroup>
                                </Box>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="2">
                              <CFormGroup>
                                <CLabel htmlFor="name">
                                  {Constant.arrFieldMasterConDomHeader[9]}
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
                                  <CInputGroup className="input-prepend">
                                    <CInputGroupPrepend>
                                      <CInputGroupText>
                                        {_txtUnitTon}
                                      </CInputGroupText>
                                    </CInputGroupPrepend>
                                    {/* <CInput
                                      type="number"
                                      // style={{ height: Constant.styleHeightField }}
                                      id="add-header-maxqty"
                                      step="0.001"
                                      onWheel={(e) => e.target.blur()}
                                      min={headerMinValueForMax}
                                      // value={isClone ? maxQtyValue : null}
                                      onChange={setMaxValueInMinHearder}
                                      required
                                    /> */}
                                    <CurrencyInput
                                      class="form-control"
                                      id="add-header-maxqty"
                                      name="input-name"
                                      maxLength="12"
                                      decimalScale={3}
                                      step={0.01}
                                      min={headerMinValueForMax}
                                      decimalsLimit={3}
                                      max={headerMaxValueForMin}
                                      // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                                      onValueChange={setMaxValueInMinHearder}
                                      required
                                    />

                                    <CInvalidFeedback>
                                      {Constant.inValidNullMessage}
                                    </CInvalidFeedback>
                                  </CInputGroup>
                                </Box>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="2">
                              <CFormGroup>
                                <CLabel htmlFor="ccmonth">
                                  {Constant.arrFieldMasterConDomHeader[11]}
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
                                  <CInputGroup className="input-prepend">
                                    <CInputGroupPrepend>
                                      <CInputGroupText>
                                        {_txtUnitTon}
                                      </CInputGroupText>
                                    </CInputGroupPrepend>
                                    {/* <CInput
                                      type="number"
                                      style={{
                                        height: Constant.styleHeightField,
                                      }}
                                      id="add-header-mintonrate"
                                      step="0.001"
                                      min="0"
                                      onWheel={(e) => e.target.blur()}
                                      required
                                    /> */}
                                    <CurrencyInput
                                      class="form-control"
                                      id="add-header-mintonrate"
                                      name="input-name"
                                      maxLength="12"
                                      decimalScale={3}
                                      step={0.01}
                                      min={0}
                                      decimalsLimit={3}
                                      // onValueChange={handleChangAddLiftOn("yardPassPrice")}

                                      required
                                    />

                                    <CInvalidFeedback>
                                      {Constant.inValidNullMessage}
                                    </CInvalidFeedback>
                                  </CInputGroup>
                                </Box>
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCard>
                      </Box>

                      {/* <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      > */}

                      {/* </Box> */}

                      <CCard>
                        <CRow className="m-3 p-0">
                          <CCol xs="12" sm="6" md="6">
                            <CFormGroup>
                              <CLabel htmlFor="ccmonth">หมายเลขอ้างอิง</CLabel>
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
                                  id="add-header-refDoc"
                                  maxLength="255"
                                  placeholder=""
                                />
                              </Box>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">สถานะการใช้งาน</CLabel>
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
                                    id="add-header-contractStatus"
                                    required
                                  >
                                    <option selected hidden value="">
                                      {Constant.txtformPlaceholderSelected}
                                    </option>
                                    {contractStatus.map((cb) => (
                                      <option value={cb.valueMember}>
                                        {cb.displayMember}{" "}
                                      </option>
                                    ))}
                                  </CSelect>
                                  <CInvalidFeedback>
                                    {Constant.inValidNullSelected}
                                  </CInvalidFeedback>
                                </Box>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCard>
                    </Box>

                    <Box
                      className="border-set"
                      component={Grid}
                      item
                      boxShadow={1}
                      xs={{
                        width: " 100%",
                      }}
                    ></Box>

                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">เลขที่สัญญา</CLabel>
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
                                  id="add-header-contractNo"
                                  type="text"
                                  maxLength="255"
                                  placeholder=""
                                  required
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <CRow className="row justify-content-center">
                    <CCol xs="12" sm="3" md="2" class="col-sm-3">
                      <br />
                      <CFormGroup class="align-middle">
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
                            color="success"
                            onClick={onClickCheckFormAddData}
                          >
                            บันทึก
                          </CButton>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="3" md="2" class="col-sm-3">
                      <br />
                      <CFormGroup class="align-middle">
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
                            onClick={onClickClearData("Add")}
                            block
                            color="danger"
                          >
                            ยกเลิก
                          </CButton>
                        </Box>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  {/* </h6> */}
                </CCardBody>
              </CCollapse>
            </CForm>
          </CCard>
        );
      } else if (type === "edit") {
        if (Object.keys(editData).length) {
          var newObj = { ...editData };
          console.log(editData);
          var contractNoValue = newObj.contractNo;
          var _transporterList = transporterList.find(
            (x) => x.transporterId === newObj.transporterId
          );
          var transporterValue =
            "[" +
            _transporterList.transporterCode +
            "] " +
            _transporterList.transporterNameThai;
          var sourceList = source.find((x) => x.sourceId === newObj.sourceId);
          var sourceValue =
            "[" + sourceList.sourceCode + "] " + sourceList.sourceNameThai;
          var rateTypeValue = newObj.rateTypeId;

          var truckTypeId = truckType.find(
            (x) => x.truckTypeId === newObj.truckTypeId
          );
          console.log(truckTypeId);
          var truckTypeValue =
            "[" + truckTypeId.truckTypeCode + "] " + truckTypeId.truckTypeName;
          var fuelTypeValue =
            newObj.fuelTypeId !== null ? newObj.fuelTypeId : null;
          var minQtyValue = newObj.minQty;
          var maxQtyValue = newObj.maxQty;
          var minTonRateValue = newObj.minTonRate;
          var deliveryMode =
            newObj.deliveryMode !== null ? newObj.deliveryMode : null;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;

          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);
          var _contractStatus = newObj.contractStatus;

          if (
            !Object.keys(itemSelectEdit[0]).length &&
            !Object.keys(itemSelectEdit[1]).length &&
            !Object.keys(itemSelectEdit[2]).length
          ) {
            setItemSelectEdit([_transporterList, sourceList, truckTypeId]);
          }

          return (
            <CCard color="gradient-secondary" className="color-card-gra">
              <CForm className="edit-header-need-validation">
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardHeader
                    className="font-form-scg-card"
                    style={{ backgroundColor: "#50949f", color: "white" }}
                  >
                    แก้ไขรายการผู้ติดต่อ
                  </CCardHeader>
                </Box>
                <CCardBody className="font-form-scg-card p-2">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">วันเริ่มต้น</CLabel>
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
                                value={startDateValue}
                                size="xs"
                                type="date"
                                id="-edit-header-dateStart"
                                isabled={isLinkData}
                                name="date-input"
                                placeholder="date"
                                onChange={handleChangeEditForm("startDate")}
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
                            <CLabel htmlFor="cvv">วันสิ้นสุด</CLabel>
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
                                value={endDateValue}
                                disabled={isLinkData}
                                onChange={handleChangeEditForm("endDate")}
                                type="date"
                                id="edit-header-dateEnd"
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
                        <CCol xs="12" sm="6" md="4">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.txtMasterTransporter}
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
                                  id="edit-header-transporter"
                                  options={transporterList}
                                  size="small"
                                  defaultValue={_transporterList}
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.transporterCode +
                                    "] " +
                                    option.transporterNameThai
                                  }
                                  // style={{ width: 300 }}
                                  onChange={handleChangeEditSelect(
                                    "transporter"
                                  )}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.transporterCode +
                                        "] " +
                                        option.transporterNameThai}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormEdit[0]}
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
                                          invalidMaterialFormEdit[0] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Loading Location</CLabel>
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
                                  id="edit-header-source"
                                  options={source}
                                  size="small"
                                  defaultValue={sourceList}
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.sourceCode +
                                    "] " +
                                    option.sourceNameThai
                                  }
                                  // style={{ width: 300 }}
                                  onChange={handleChangeEditSelect("source")}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.sourceCode +
                                        "] " +
                                        option.sourceNameThai}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormEdit[1]}
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
                                          invalidMaterialFormEdit[1] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.txtTruckType}
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
                                  id="edit-header-transporter"
                                  options={truckType}
                                  defaultValue={truckTypeId}
                                  size="small"
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.truckTypeCode +
                                    "] " +
                                    option.truckTypeName
                                  }
                                  // style={{ width: 300 }}
                                  onChange={handleChangeEditSelect("truckType")}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.truckTypeCode +
                                        "] " +
                                        option.truckTypeName}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormEdit[0]}
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
                                          invalidMaterialFormEdit[0] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทสัญญา</CLabel>
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
                                  onChange={handleChangeEditForm(
                                    "deliveryMode"
                                  )}
                                  id="edit-header-deliveryMode"
                                  value={deliveryMode}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทสัญญา
                                  </option>
                                  {cbdeliveryMode.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทการขนส่ง</CLabel>
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
                                  onChange={handleChangeEditForm("rateTypeId")}
                                  id="add-header-ratetypeId"
                                  value={rateTypeValue}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทการขนส่ง
                                  </option>
                                  {rateType.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทเชื้อเพลิง</CLabel>
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
                                  id="edit-header-fuelTypeId"
                                  onChange={handleChangeEditForm("fuelTypeId")}
                                  value={fuelTypeValue}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทเชื้อเพลิง
                                  </option>
                                  {fuelType.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[8]}
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
                              <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    {_txtUnitTon}
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                {/* <CInput
                                  type="number"
                                  // style={{ height: Constant.styleHeightField }}
                                  id="add-header-minqty"
                                  step="0.001"
                                  min="0"
                                  max={maxQtyValue}
                                  onChange={handleChangeEditForm("minQty")}
                                  onWheel={(e) => e.target.blur()}
                                  value={minQtyValue}
                                  // onChange={setMinValueInMaxHearder}
                                  required
                                /> */}

                                <CurrencyInput
                                  class="form-control"
                                  id="add-header-minqty"
                                  name="input-name"
                                  maxLength="12"
                                  decimalScale={3}
                                  step={0.001}
                                  min={0}
                                  decimalsLimit={3}
                                  value={minQtyValue}
                                  // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                                  onValueChange={handleChangeEditForm("minQty")}
                                  required
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[9]}
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
                              <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    {_txtUnitTon}
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                {/* <CInput
                                  type="number"
                                  // style={{ height: Constant.styleHeightField }}
                                  id="add-header-maxqty"
                                  step="0.001"
                                  onWheel={(e) => e.target.blur()}
                                  min={minQtyValue}
                                  onChange={handleChangeEditForm("maxQty")}
                                  value={maxQtyValue}
                                  // onChange={setMaxValueInMinHearder}
                                  required
                                /> */}

                                <CurrencyInput
                                  class="form-control"
                                  id="add-header-maxqty"
                                  name="input-name"
                                  maxLength="12"
                                  decimalScale={3}
                                  step={0.001}
                                  min={0}
                                  value={maxQtyValue}
                                  decimalsLimit={3}
                                  // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                                  onValueChange={handleChangeEditForm("maxQty")}
                                  required
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="ccmonth">
                              {Constant.arrFieldMasterConDomHeader[11]}
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
                              <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    {_txtUnitTon}
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                {/* <CInput
                                  type="number"
                                  style={{
                                    height: Constant.styleHeightField,
                                  }}
                                  id="add-header-mintonrate"
                                  step="0.001"
                                  min="0"
                                  onChange={handleChangeEditForm("minTonRate")}
                                  value={minTonRateValue}
                                  onWheel={(e) => e.target.blur()}
                                  required
                                /> */}

                                <CurrencyInput
                                  class="form-control"
                                  id="add-header-mintonrate"
                                  name="input-name"
                                  maxLength="12"
                                  decimalScale={3}
                                  value={minTonRateValue}
                                  step={0.001}
                                  min={0}
                                  decimalsLimit={3}
                                  // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                                  onValueChange={handleChangeEditForm(
                                    "minTonRate"
                                  )}
                                  required
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="ccmonth">หมายเลขอ้างอิง</CLabel>
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
                                id="header-refDoc"
                                value={refDocNoValue}
                                onChange={handleChangeEditForm("refDocNo")}
                                placeholder=""
                                maxLength="255"
                              />
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">สถานะการใช้งาน</CLabel>
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
                                  id="edit-header-contractStatus"
                                  onChange={handleChangeEditForm(
                                    "contractStatus"
                                  )}
                                  value={_contractStatus}
                                  required
                                >
                                  <option selected hidden value="">
                                    {Constant.txtformPlaceholderSelected}
                                  </option>
                                  {contractStatus.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">เลขที่สัญญา</CLabel>
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
                                  id="edit-header-contractNo"
                                  value={contractNoValue}
                                  onChange={handleChangeEditForm("contractNo")}
                                  placeholder=""
                                  maxLength="255"
                                  required
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>
                  {formButtonManageEdit()}
                </CCardBody>
              </CForm>
            </CCard>
          );
        }
      } else if (type === "clone") {
        var isClone = Object.keys(cloneData).length !== 0;
        if (isClone) {
          var newObj = { ...cloneData };
          console.log(cloneData);
          var contractNoValue = newObj.contractNo;
          var _transporterList = transporterList.find(
            (x) => x.transporterId === newObj.transporterId
          );
          var transporterValue =
            "[" +
            _transporterList.transporterCode +
            "] " +
            _transporterList.transporterNameThai;
          var sourceList = source.find((x) => x.sourceId === newObj.sourceId);
          var sourceValue =
            "[" + sourceList.sourceCode + "] " + sourceList.sourceNameThai;
          var rateTypeValue = newObj.rateTypeId;

          var truckTypeId = truckType.find(
            (x) => x.truckTypeId === newObj.truckTypeId
          );
          console.log(truckTypeId);
          var truckTypeValue =
            "[" + truckTypeId.truckTypeCode + "] " + truckTypeId.truckTypeName;
          var fuelTypeValue =
            newObj.fuelTypeId !== null ? newObj.fuelTypeId : null;
          var minQtyValue = newObj.minQty !== null ? newObj.minQty : null;
          var maxQtyValue = newObj.maxQty !== null ? newObj.maxQty : null;
          var minTonRateValue =
            newObj.minTonRate !== null ? newObj.minTonRate : null;
          var deliveryModeValue =
            newObj.deliveryMode !== null ? newObj.deliveryMode : null;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;

          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);
          var _contractStatus = newObj.contractStatus;

          if (
            !Object.keys(itemSelectAdd[0]).length &&
            !Object.keys(itemSelectAdd[1]).length &&
            !Object.keys(itemSelectAdd[2]).length
          ) {
            setItemSelectAdd([_transporterList, sourceList, truckTypeId]);
          }
        }
        return (
          <CCard color="gradient-secondary" className="color-card-gra">
            <CForm className="clone-header-need-validation">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                สร้างรายการใหม่
                <div className="card-header-actions">
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
                </div>
              </CCardHeader>
              <CCollapse show={collapsed}>
                <CCardBody className="font-form-scg-card p-2">
                  {/* <h6> */}
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">วันเริ่มต้น</CLabel>
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
                                value={startDateValue}
                                type="date"
                                id="clone-header-dateStart"
                                onChange={handleChangeCloneForm("startDate")}
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
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">วันสิ้นสุด</CLabel>
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
                                value={endDateValue}
                                type="date"
                                id="clone-header-dateEnd"
                                onChange={handleChangeCloneForm("endDate")}
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
                        <CCol xs="12" sm="6" md="4">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.txtMasterTransporter}
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
                                  id="clone-header-transporter"
                                  options={transporterList}
                                  size="small"
                                  defaultValue={_transporterList}
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.transporterCode +
                                    "] " +
                                    option.transporterNameThai
                                  }
                                  // style={{ width: 300 }}
                                  onChange={handleChangeAddSelect(
                                    "transporter"
                                  )}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.transporterCode +
                                        "] " +
                                        option.transporterNameThai}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormEdit[0]}
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
                                          invalidMaterialFormEdit[0] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Loading Location</CLabel>
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
                                  id="edit-header-source"
                                  options={source}
                                  size="small"
                                  defaultValue={sourceList}
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.sourceCode +
                                    "] " +
                                    option.sourceNameThai
                                  }
                                  // style={{ width: 300 }}

                                  onChange={handleChangeAddSelect("source")}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.sourceCode +
                                        "] " +
                                        option.sourceNameThai}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormEdit[1]}
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
                                          invalidMaterialFormEdit[1] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.txtTruckType}
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
                                  id="edit-header-transporter"
                                  options={truckType}
                                  defaultValue={truckTypeId}
                                  size="small"
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.truckTypeCode +
                                    "] " +
                                    option.truckTypeName
                                  }
                                  // style={{ width: 300 }}
                                  onChange={handleChangeAddSelect("truckType")}
                                  renderOption={(option) => (
                                    <Typography
                                      className={
                                        classes.autoCompleteRenderOptions
                                      }
                                    >
                                      {"[" +
                                        option.truckTypeCode +
                                        "] " +
                                        option.truckTypeName}
                                    </Typography>
                                  )}
                                  renderInput={(params) => {
                                    params.inputProps.className =
                                      classes.autoCompleteInputLabel;
                                    return (
                                      <TextField
                                        size="small"
                                        // style={{ height: Constant.styleHeightField }}
                                        error={invalidMaterialFormEdit[0]}
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
                                          invalidMaterialFormEdit[0] ? (
                                            <Typography
                                              className={
                                                classes.autoCompleteInputHelperText
                                              }
                                            >
                                              {Constant.inValidNullMessage}
                                            </Typography>
                                          ) : null
                                        }
                                        variant="outlined"
                                      />
                                    );
                                  }}
                                  disabled={isLinkData}
                                />
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทสัญญา</CLabel>
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
                                  onChange={handleChangeCloneForm(
                                    "deliveryMode"
                                  )}
                                  id="clone-header-deliveryMode"
                                  value={deliveryModeValue}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทสัญญา
                                  </option>
                                  {cbdeliveryMode.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทการขนส่ง</CLabel>
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
                                  onChange={handleChangeCloneForm("rateTypeId")}
                                  id="clone-header-ratetypeId"
                                  value={rateTypeValue}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทการขนส่ง
                                  </option>
                                  {rateType.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทเชื้อเพลิง</CLabel>
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
                                  id="clone-header-fuelTypeId"
                                  onChange={handleChangeCloneForm("fuelTypeId")}
                                  value={fuelTypeValue}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทเชื้อเพลิง
                                  </option>
                                  {fuelType.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[8]}
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
                              <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    {_txtUnitTon}
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                <CurrencyInput
                                  class="form-control"
                                  id="clone-header-minQty"
                                  decimalScale={3}
                                  step={0.001}
                                  decimalsLimit={3}
                                  min={0}
                                  max={maxQtyValue}
                                  onValueChange={handleChangeCloneForm(
                                    "minQty"
                                  )}
                                  onWheel={(e) => e.target.blur()}
                                  value={minQtyValue}
                                  // disabled={isLinkData}
                                  // onChange={setMinValueInMaxHearder}
                                  required
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[9]}
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
                              <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    {_txtUnitTon}
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                <CurrencyInput
                                  class="form-control"
                                  id="clone-header-maxQty"
                                  maxLength="12"
                                  decimalScale={3}
                                  step={0.001}
                                  decimalsLimit={3}
                                  onWheel={(e) => e.target.blur()}
                                  min={minQtyValue}
                                  onValueChange={handleChangeCloneForm(
                                    "maxQty"
                                  )}
                                  value={maxQtyValue}
                                  // disabled={isLinkData}
                                  // onChange={setMaxValueInMinHearder}
                                  required
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <CLabel htmlFor="ccmonth">
                              {Constant.arrFieldMasterConDomHeader[11]}
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
                              <CInputGroup className="input-prepend">
                                <CInputGroupPrepend>
                                  <CInputGroupText>
                                    {_txtUnitTon}
                                  </CInputGroupText>
                                </CInputGroupPrepend>
                                <CurrencyInput
                                  class="form-control"
                                  id="clone-header-minTonRate"
                                  maxLength="12"
                                  decimalScale={3}
                                  value={minTonRateValue}
                                  step={0.001}
                                  min={0}
                                  decimalsLimit={3}
                                  onValueChange={handleChangeCloneForm(
                                    "minTonRate"
                                  )}
                                  onWheel={(e) => e.target.blur()}
                                  required
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </CInputGroup>
                            </Box>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="ccmonth">หมายเลขอ้างอิง</CLabel>
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
                                id="clone-header-refDoc"
                                onChange={handleChangeCloneForm("refDocNo")}
                                value={refDocNoValue}
                                maxLength="255"
                                placeholder=""
                              />
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">สถานะการใช้งาน</CLabel>
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
                                  id="clone-header-contractStatus"
                                  value={_contractStatus}
                                  onChange={handleChangeCloneForm(
                                    "contractStatus"
                                  )}
                                  required
                                >
                                  <option selected hidden value="">
                                    {Constant.txtformPlaceholderSelected}
                                  </option>
                                  {contractStatus.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}{" "}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CCard>
                      <CRow className="m-3 p-0">
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">เลขที่สัญญา</CLabel>
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
                                  id="clone-header-contractNo"
                                  onChange={handleChangeCloneForm("contractNo")}
                                  value={contractNoValue}
                                  placeholder=""
                                  maxLength="255"
                                  required
                                />

                                <CInvalidFeedback>
                                  {Constant.inValidNullMessage}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCard>
                  </Box>

                  <CRow className="row justify-content-center">
                    <CCol xs="12" sm="3" md="2" class="col-sm-3">
                      <br />
                      <CFormGroup class="align-middle">
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
                            color="success"
                            onClick={onClickCheckFormCloneData}
                          >
                            บันทึก
                          </CButton>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="3" md="2" class="col-sm-3">
                      <br />
                      <CFormGroup class="align-middle">
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
                            onClick={() => setIsShowExitClone(!isShowExitClone)}
                            size={Constant.btAddSize}
                            block
                            color="danger"
                          >
                            ยกเลิก
                          </CButton>
                        </Box>
                      </CFormGroup>
                    </CCol>
                  </CRow>

                  {/* </h6> */}
                </CCardBody>
              </CCollapse>
            </CForm>
          </CCard>
        );
      }
    }
  };

  const formPlaceContainerReturn = () => {
    return (
      <div className="font-form-scg">
        <CForm className="formPlaceContainerReturn-need-validation">
          <CRow>
            <CCol xs="12" sm="6" md="4">
              <CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFPlaceContainerReturn[0]}
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
                      onChange={handleChangSelect("PlaceContainer")}
                      // id="header-LiftOff-CYPlace"
                      options={placeContrainer}
                      style={{ fontFamily: "Scg" }}
                      size="small"
                      getOptionLabel={(option) =>
                        "[" +
                        option.placeContainerReturnCode +
                        "] " +
                        option.placeContainerReturnNameThai
                      }
                      renderOption={(option) => {
                        return (
                          <Typography
                            className={classes.comboOptions}
                            value={option.placeContainerReturnId}
                          >
                            {`[${option.placeContainerReturnCode}]` +
                              "  " +
                              option.placeContainerReturnNameThai}
                          </Typography>
                        );
                      }}
                      renderInput={(params) => {
                        params.inputProps.className = classes.comboOptions;
                        return (
                          <TextField
                            InputProps={{
                              className: classes.input,
                            }}
                            error={invalidMaterialFormOther1[0]}
                            {...params}
                            size="small"
                            label={
                              <Typography className={classes.label}>
                                {Constant.txtformPlaceholderSelected}
                              </Typography>
                            }
                            helperText={
                              invalidMaterialFormOther1[0] ? (
                                <Typography
                                  className={
                                    classes.autoCompleteInputHelperText
                                  }
                                >
                                  {Constant.inValidNullMessage}
                                </Typography>
                              ) : null
                            }
                            variant="outlined"
                          />
                        );
                      }}
                    />
                    <CInvalidFeedback>
                      {Constant.inValidNullSelected}
                    </CInvalidFeedback>
                  </Box>
                </CFormGroup>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFPlaceContainerReturn[1]}
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
                    onChange={handleChangAddPlaceCon()}
                    type="number"
                    id="header-place-transporterCostPrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    required
                  />
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>{" "}
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFPlaceContainerReturn[7]}
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
                    onChange={handleChangAddPlaceCon()}
                    type="number"
                    id="header-place-fuelPrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
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
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFPlaceContainerReturn[2]}
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
                    onChange={handleChangAddPlaceCon()}
                    type="number"
                    id="header-place-customFeePrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
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
                <CLabel htmlFor="name">
                  {Constant.arrFPlaceContainerReturn[3]}
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
                  {/* <CurrencyInput
                    class="form-control"
                    id="header-shipTo-TransportChargePrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    onValueChange={handleChangAddShipTo("transportChargePrice")}
                    required
                  /> */}
                  <CInput
                    onChange={handleChangAddPlaceCon()}
                    type="number"
                    id="header-place-portChargePrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    required
                  />
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>{" "}
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFPlaceContainerReturn[4]}
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
                    onChange={handleChangAddPlaceCon()}
                    type="number"
                    id="header-place-lashingChargePrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
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
                <CLabel htmlFor="name">
                  {Constant.arrFPlaceContainerReturn[5]}
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
                    onChange={handleChangAddPlaceCon()}
                    type="number"
                    id="header-place-repackageChargePrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    required
                  />
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>{" "}
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFPlaceContainerReturn[6]}
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
                    onChange={handleChangAddPlaceCon()}
                    type="number"
                    id="header-place-inspectorFeePrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    required
                  />
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>
          </CRow>

          {/* <CRow>
           
              
            </CRow> */}

          {/* </CRow> */}
          <CRow>
            <CCol xs="12" sm="6" md="1">
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
                  color="success"
                  block
                  onClick={onClickAddPlaceContainerReturn}
                >
                  ยืนยัน
                </CButton>
              </Box>
            </CCol>
          </CRow>
        </CForm>
        <br />
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          <CDataTable
            items={headPlaceContainerReturn}
            fields={FPlaceContainerReturnManage}
            bordered
            // columnFilter
            // tableFilter={{
            //     label: `${Constant.tabletxtSearch}`,
            //     placeholder: `${Constant.tabletxtPlaceholder}`
            // }}
            // itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
            // itemsPerPage={10}
            // hover
            // sorter
            // pagination
            scopedSlots={{
              manage: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                    
                      size={Constant.btAddSize}
                      color="danger"
                      className="mr-1"
                      onClick={onClickRemoveRecordAddData("ShipTo", index)}
                    >
                      {Constant.btDeleteData}
                    </CButton>
                  </td>
                );
              },
              transporterCostPrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.transporterCostPrice}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "transporterCostPrice",
                        index
                      )}
                      // disabled={isLinkData}
                    />
                  </td>
                );
              },
              customFeePrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.customFeePrice}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "customFeePrice",
                        index
                      )}
                      // disabled={isLinkData}
                    />
                  </td>
                );
              },
              portChargePrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.portChargePrice}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "portChargePrice",
                        index
                      )}
                      // disabled={isLinkData}
                    />
                  </td>
                );
              },
              lashingChargePrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.lashingChargePrice}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "lashingChargePrice",
                        index
                      )}
                      // disabled={isLinkData}
                    />
                  </td>
                );
              },
              repackageChargePrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.repackageChargePrice}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "repackageChargePrice",
                        index
                      )}
                      // disabled={isLinkData}
                    />
                  </td>
                );
              },
              inspectorFeePrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.inspectorFeePrice}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "inspectorFeePrice",
                        index
                      )}
                      // disabled={isLinkData}
                    />
                  </td>
                );
              },
              fuelPrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.fuelPrice}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "fuelPrice",
                        index
                      )}
                      // disabled={isLinkData}
                    />
                  </td>
                );
              },
            }}
          />
        </CCard>
        {/* </CRow> */}
      </div>
    );
  };

  const formFuelRate = () => {
    return (
      <div className="font-form-scg">
        <CForm className="fuel-need-validation" noValidate>
          <CRow>
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>เชื้อเพลิงเริ่มต้น</CLabel>
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
                    id="fuel-start"
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    min="0"
                    max="100"
                    required
                    onChange={handleChangeInputStartValue("fuel-rate")}
                  />
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>เชื้อเพลิงสิ้นสุด</CLabel>
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
                    id="fuel-end"
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    min={fuelRateMinEnd}
                    max="100"
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
                <CLabel>Step</CLabel>
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
                    id="fuel-price"
                    onWheel={(e) => e.target.blur()}
                    step="0.01"
                    min="0"
                    max="10000"
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
            <CCol xs="12" sm="6" md="1">
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
                  // className="editbutton"
                  size={Constant.btAddSize}
                  color="success"
                  block
                  onClick={onClickCalFuelRate}
                >
                  {Constant.btCalculate}
                </CButton>
              </Box>
            </CCol>
          </CRow>
        </CForm>
        <br />
        <CRow className="justify-content-center">
          <CCard
            className="p-2"
            style={{ maxHeight: "700px", overflowY: "auto" }}
          >
            <CDataTable
              items={calFuelRateList}
              fields={FEXTransportRate}
              bordered
              columnFilter
              // tableFilter={{
              //     label: `${Constant.tabletxtSearch}`,
              //     placeholder: `${Constant.tabletxtPlaceholder}`
              // }}
              // // itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
              // itemsPerPage={100}
              // hover
              // sorter
              // pagination
              scopedSlots={{
                fuelRatePrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CInput
                        type="number"
                        step="0.5"
                        onWheel={(e) => e.target.blur()}
                        value={item.fuelRatePrice}
                        onChange={handleChangeUpdateField("fuel-rate", index)}
                        disabled={isLinkData}
                      />
                    </td>
                  );
                },
              }}
            />
          </CCard>
        </CRow>
      </div>
    );
  };

  const formPort = () => {
    return (
      <div className="font-form-scg">
        <CForm className="Port-need-validation" noValidate>
          <CFormGroup className="font-form-scg">
            <CRow>
              <CCol md="3">
                <CFormGroup>
                  <CLabel>ลานคืนตู้</CLabel>
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
                      onChange={(event, value) => {
                        if (value !== null) {
                          var newArr = [...inputPort];
                          newArr[0] = value;
                          setInputPort(newArr);
                        } else {
                          var newArr = [...inputPort];
                          newArr[0] = {};
                          setInputPort(newArr);
                        }
                      }}
                      id="header-cyplace"
                      options={placeContrainer}
                      style={{ fontFamily: "Scg" }}
                      size="small"
                      getOptionLabel={(option) =>
                        `${option.placeContainerReturnCode}` &&
                        `(${option.placeContainerReturnNameThai})`
                      }
                      renderOption={(option) => {
                        return (
                          <Typography
                            className={classes.comboOptions}
                            value={option.placeContainerReturnId}
                          >
                            {`[${option.placeContainerReturnCode}]` +
                              "  " +
                              option.placeContainerReturnNameThai}
                          </Typography>
                        );
                      }}
                      renderInput={(params) => {
                        params.inputProps.className = classes.comboOptions;
                        return (
                          <TextField
                            InputProps={{
                              className: classes.input,
                            }}
                            error={invalidMaterialFormOther2[0]}
                            {...params}
                            size="small"
                            label={
                              <Typography className={classes.label}>
                                {Constant.txtformPlaceholderSelected}
                              </Typography>
                            }
                            helperText={
                              invalidMaterialFormOther2[0] ? (
                                <Typography
                                  className={
                                    classes.autoCompleteInputHelperText
                                  }
                                >
                                  {Constant.inValidNullMessage}
                                </Typography>
                              ) : null
                            }
                            variant="outlined"
                          />
                        );
                      }}
                    />
                  </Box>

                  <CInvalidFeedback>{validatecheck}</CInvalidFeedback>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" sm="6" md="1">
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
                    color="success"
                    block
                    onClick={onClickInPort}
                  >
                    บันทึก
                  </CButton>
                </Box>
                {/* <CButton className="editbutton" size={Constant.btAddSize} color="danger" className="mr-1" onClick={onClickClear('Port')}>
                                    ยกเลิก
                                </CButton> */}
              </CCol>
            </CRow>
          </CFormGroup>
        </CForm>
        <br />
        <CRow className="justify-content-center">
          <CCard
            className="p-2"
            style={{ maxHeight: "700px", overflowY: "auto" }}
          >
            <CDataTable
              items={InPort}
              fields={FPort}
              bordered
              columnFilter
              // tableFilter={{
              //     label: `${Constant.tabletxtSearch}`,
              //     placeholder: `${Constant.tabletxtPlaceholder}`
              // }}
              // itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
              // itemsPerPage={10}
              // hover
              // sorter
              // pagination
              scopedSlots={{
                delete_truckLicense: (item, index) => {
                  return (
                    <td className="py-2">
                      <CButton
                        size="sm"
                        block
                        color="danger"
                        onClick={() => handleRemoveItem(item, index, "InPort")}
                      >
                        ยกเลิก
                      </CButton>
                    </td>
                  );
                },
              }}
            />
          </CCard>
        </CRow>
      </div>
    );
  };

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const showTextContentEdit = () => (
    <div>
      {Constant.contentSuccessEditData}
      <br />
      {Constant.contentSuccessContractRecalData}
    </div>
  )

  const modalForForm = () => (
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

  const modalForDialog = () => (
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

      {/* Start Warning Input Form Modal */}
      <CModal
        show={isWarningInputForm}
        onClose={() => setIsWarningInputForm(!isWarningInputForm)}
        color="warning"
        centered
      >
        <CModalHeader>
          <h5>
            <CLabel>{Constant.titleConfirmChangeData}</CLabel>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CLabel>
            {`${Constant.inValidNullBelow} 
                        ${!calFuelRateList.length ? Constant.txtFuelRate : ""}
                                ${
                                  !headPlaceContainerReturn.length
                                    ? !calFuelRateList.length
                                      ? `, ${Constant.arrFPlaceContainerReturn[0]}`
                                      : Constant.arrFPlaceContainerReturn[0]
                                    : ""
                                }
                                   `}
          </CLabel>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsWarningInputForm(!isWarningInputForm)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Warning Input Form Modal

      {/* Start Confirm Cloned Form Modal */}
      <CModal
        show={isShowCloned}
        onClose={() => setIsShowCloned(!isShowCloned)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmCloneData}</CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={setShowFormClone}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsShowCloned(!isShowCloned)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Confirm Cloned Form Modal */}

      {/* Start Show Save Success Form Modal */}
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
              ?showTextContentEdit()
              : typeShowSuccess === "Delete"
              ? Constant.contentSuccessDeleteData
              : null}
          </CLabel>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClickThenShowSuccesss}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Save Success Form Modal */}

      {/* Start Clone Form Success Modal */}
      <CModal
        show={isShowCloneSuccess}
        onClose={() => setIsShowCloneSuccess(!isShowCloneSuccess)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessCloneData}</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowCloneSuccess(!isShowCloneSuccess)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Clone Form Success Modal */}

      {/* Start Confirm Exit Clone Form Modal */}
      <CModal
        show={isShowExitClone}
        onClose={() => setIsShowExitClone(!isShowExitClone)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentConfirmExitForm}
          <br />
          ***{Constant.contentWarningForClone}***
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={setCloseFormClone}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsShowExitClone(!isShowExitClone)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Confirm Exit Clone Form Modal */}

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
          <CButton color="success" onClick={onClickAddData}>
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

      <CModal
        show={isConfirmSaveClone}
        onClose={() => setIsConfirmSaveClone(!isConfirmSaveClone)}
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
          <CButton color="success" onClick={onClickCloneData}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmSaveClone(!isConfirmSaveClone)}
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
        <CModalBody>{Constant.contentConfirmDeleteData}</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={onClickDeleteData}>
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

      {/* Start Delete Record Other Table Modal */}
      <CModal
        show={isConfirmDeleteRecordOT}
        onClose={() => setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT)}
        color="danger"
        centered
      >
        <CModalHeader closeButton>
          <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmDeleteData}</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={onClickRemoveRecordAddData}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton color="secondary" onClick={onClickCancelRemoveRecord}>
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Delete Modal Record Other Table */}
      {/* Start Warning Input Form Modal */}
      <CModal
        show={isNotAuthorized}
        onClose={() => setIsNotAuthorized(!isNotAuthorized)}
        color="warning"
        centered
      >
        <CModalHeader>
          <h5>
            <CLabel>{Constant.titleConfirmChangeData}</CLabel>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CLabel>
            คุณไม่มีสิทธ์ในการสร้างสัญญาที่มีสถานะสัญญาเป็น Active
          </CLabel>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsNotAuthorized(!isNotAuthorized)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Warning Input Form Modal */}
    </div>
  );
  const onClickPreviousPage = () => {
    var newObj = { ...linkData };
    console.log(linkData);
    VariableController.linkShipmentNo = newObj.shipmentNo;
    VariableController.linkDeliveryNo = newObj.deliveryNo;
    VariableController.linkSaleOrderNo = newObj.saleOrderNo;
    VariableController.linkArrContractData = newObj.arrContractData;
    history.goBack();
  };

  const onClickDeleteData = () => {
    setIsConfirmDelete(!isConfirmDelete);
    // console.log(contractId);
    fnDeleteData(indexEditForm);
  };
  const onClickThenShowSuccesss = () => {
    setTypeShowSuccess("");
    setIsShowSuccess(!isShowSuccess);
    window.location.reload(false);
  };

  const fnInsertData = (newArrHeader, newArrPlaceContainer, newArrFuelRate) => {
    setIsPostingData(true);
    Repository.fetchAddContractExportLCLAIRList(
      newArrHeader,
      newArrPlaceContainer,
      newArrFuelRate
    ).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setTypeShowSuccess("Add");
          setIsShowSuccess(!isShowSuccess);
        } else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnUpdateData = (objData) => {
    setIsPostingData(true);
    Repository.fetchEditExportLCLAIRList(objData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setTypeShowSuccess("Edit");
          setIsShowSuccess(!isShowSuccess);
        } else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnDeleteData = (index) => {
    setIsPostingData(true);
    Repository.fetchRemoveContractExportLCLAIRList(index).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setTypeShowSuccess("Delete");
          setIsShowSuccess(!isShowSuccess);
        } else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetCyPlace = () => {
    Repository.fetchGetCYPlaceList().then(
      (result) => {
        if (result.httpCode === "200") {
          // console.log(result.data)
          setGetCYPlace(result.data);
        } else {
          // console.log(result);
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  };

  const fnGetPortList = () => {
    // console.log('88888');
    Repository.fetchPortList().then(
      (result) => {
        // setIsLoaded(true);
        if (result.httpCode === "200") {
          // var newArr = [...result.data]

          setPortList(result.data);
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

  const fnGetCbDeliveryMode = () => {
    // console.log('88888');
    Repository.fetchCbDeliveryMode().then(
      (result) => {
        // setIsLoaded(true);
        if (result.httpCode === "200") {
          setDeliveryMode(result.data);
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

  const fnGetPlaceConList = () => {
    // console.log('88888');
    Repository.fetchGetPlaceContainerReturnList().then(
      (result) => {
        // setIsLoaded(true);
        if (result.httpCode === "200") {
          // console.log(result.data)
          setPlaceContainerReturn(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        // console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetExportLCLAIRListBySearch = (arr) => {
    setIsPostingData(true);
    Repository.fetchExportLCLAIRListBySearch(arr).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          result.data.map((x) => {
            x.startDateCovert = new Date(x.startDate).toLocaleString();
            x.endDateCovert = new Date(x.endDate).toLocaleString();

            console.log(x.deliveryName);
          });
          console.log(result.data);

          SetExportLCLAIRList(result.data);
          // console.log()

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

  // const fnGetContractDomesticList = (arrData = []) => {
  //   setIsPostingData(true);
  //   setData([]);
  //   Repository.fetchGetContractDomesticList(arrData).then(
  //     (result) => {
  //       setIsPostingData(false);
  //       if (result.httpCode === "200") {
  //         setData(result.data);
  //       } else {
  //         setErrorAPI(result);
  //       }
  //     },
  //     (error) => {
  //       setIsPostingData(false);
  //       setErrorAPI(error);
  //     }
  //   );
  // };

  const fnGetDataForEdit = (index) => {
    setIsLoadingData(true);
    // setGetShipTo([]);
    // setSource([]);
    // setFuelType([]);
    // setTruckType([]);
    // setRateType([]);
    // setTransporterList([]);
    // setPackage([]);
    // setContractStatus([]);
    setEditData([]);

    Repository.fetchExportVesselLCLAIRBySearchById(index).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          console.log(result.data.headerList); // // setGetShipTo(result.data.shipToList);
          // setSource(result.data.sourceList);
          // setTransporterList(result.data.transporterList);
          // setFuelType(result.data.fuelTypeList);
          // setTruckType(result.data.truckTypeList);
          // setRateType(result.data.rateTypeList);
          // setContractStatus(result.data.contractStatusList);
          setEditData(result.data.headerList);
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

  const fnGetDataForShow = (index) => (e) => {
    setIsLoadingData(true);

    setEditData([]);
    setMcontractLiftOff([]);
    setMcontractLiftOn([]);
    setMcontractTransportRate([]);
    setMcontractPort([]);
    Repository.fetchExportVesselListBySearchById(index).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          // console.log(result.data.headerList)

          // setEditData(result.data.headerList);
          setMcontractLiftOff(
            result.data.headerList.mcontractExportVesselLiftOffs
          );
          setMcontractLiftOn(
            result.data.headerList.mcontractExportVesselLiftOns
          );
          setMcontractTransportRate(
            result.data.headerList.mcontractExportVesselTransportRates
          );
          setMcontractPort(result.data.headerList.mcontractExportVesselPorts);
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

  // const fnGetContractDomesticOtherList = () => {
  //   setIsLoadingData(true);
  //   setProvinceList([]);
  //   setDistrictList([]);
  //   setCbProvinceDistrict([]);
  //   setGetShipTo([]);
  //   setSource([]);
  //   setTransporterList([]);
  //   setTruckType([]);
  //   setFuelType([]);
  //   setRateType([]);
  //   setUnloadType([]);
  //   setPackage([]);
  //   setContractStatus([]);
  //   Repository.fetchGetContractDomesticOtherList().then(
  //     (result) => {
  //       setIsLoadingData(false);
  //       if (result.httpCode === "200") {
  //         setProvinceList(result.data.provinceTHList);
  //         setDistrictList(result.data.districtList);
  //         setCbProvinceDistrict(result.data.provinceAndDistrictList);
  //         setGetShipTo(result.data.shipToList);
  //         setSource(result.data.sourceList);
  //         setTransporterList(result.data.transporterList);
  //         setTruckType(result.data.truckTypeList);
  //         setFuelType(result.data.fuelTypeList);
  //         setRateType(result.data.rateTypeList);
  //         setUnloadType(result.data.unloadTypeList);
  //         setPackage(result.data.packageTypeList);
  //         setContractStatus(result.data.contractStatusList);
  //       } else {
  //         setErrorAPI(result);
  //       }
  //     },
  //     (error) => {
  //       setIsLoadingData(false);
  //       setErrorAPI(error);
  //     }
  //   );
  // };

  const fnGetContractExportTruckForSearchList = () => {
    Repository.fetchGetContractExportTruckForSearchList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          console.log(result.data);
          setTruckType(result.data.truckTypeList);
          setShipTo(result.data.shipToList);
          setSource(result.data.sourceList);
          setTransporterList(result.data.transporterList);
          setPackage(result.data.packageTypeList);
          setContractStatus(result.data.contractStatusList);
          setFuelType(result.data.fuelTypeList);
          setRateType(result.data.rateTypeList);
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
    // var result = FunctionController.getUserAuthenOneRole(pageCode);
    // if (result.isAuth) {
    //   initeState();
    // }
    // else {
    //   setIsLoaded(true);
    //   setError(Constant.apiMessageUnAuthenToUsePage);
    // }
    initeState();
  };

  const initeState = () => {
    /**NEW API */
    fnGetContractExportTruckForSearchList();
    fnGetCbDeliveryMode();
    fnGetPlaceConList();
    fnGetCyPlace();
    fnGetPortList();
    getFullYearForSearch();
  };

  useEffect(() => {
    if (
      VariableController.linkContractId !== null &&
      VariableController.linkShipmentNo !== null &&
      VariableController.linkDeliveryNo !== null &&
      VariableController.linkSaleOrderNo !== null
    ) {
      initeState();
      var newObj = {
        shipmentNo: VariableController.linkShipmentNo,
        deliveryNo: VariableController.linkDeliveryNo,
        contractId: VariableController.linkContractId,
        saleOrderNo: VariableController.linkSaleOrderNo,
        arrContractData: VariableController.linkArrContractData,
      };
      setLinkData(newObj);
      setIsLinkData(true);
      setIsLoaded(true);
      fnGetDataForEdit(VariableController.linkContractId);
      setOpenEditForm(true);
      setIndexEditForm(VariableController.linkContractId);
    } else {
      fnCheckUserAuth();
    }
  }, []);

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
                      <h3 className="headertable">
                        {Constant.txtMasterContactExportLCLAir}
                      </h3>
                    </CCol>
                    <CCol xs="6" sm="4" md="2">
                      {dialogs()}
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {mainFormSearch()}
                  {mainTable()}
                  {modalForForm()}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  }
};

export default ExportAirLCL;
