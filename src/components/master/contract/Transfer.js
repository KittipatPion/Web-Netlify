import React, { useState, useEffect } from "react";
import Repository from "../../../repositories/Repository";
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
import Constant from "../../../helpers/Constant";
import VariableController from "../../../helpers/VariableController";
import { indigo } from "@material-ui/core/colors";
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

const FEXTransportRateMileRate = [
  {
    key: "startRate",
    label: "เชื้อเพลิงเริ่มต้น",
  },
  {
    key: "endRate",
    label: "เชื้อเพลิงสิ้นสุด",
  },
  {
    key: "fuelRate",
    label: "ค่าชดเชยน้ำมัน",
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
    key: "shipToRate",
    label: "ค่าขนส่งต้นทาง",
  },
  {
    key: "seqShipToRate",
    label: "ราคาปรับต้นทาง",
  },
  {
    key: "shipFromRate",
    label: "ค่าขนส่งปลายทาง",
  },
  {
    key: "seqShipFromRate",
    label: "ราคาปรับปลายทาง",
  },
  {
    key: "palletRate",
    label: "ราคาพาเลท",
  },
  {
    key: "seqPalletRate",
    label: "ราคาปรับพาเลท",
  },
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
    key: "transporterNameThai",
    label: `${Constant.txtVenderName}`,
  },
  {
    key: "transferTypeName",
    label: `${Constant.txtTransferType}`,
  },
  {
    key: "truckTypeName",
    label: `${Constant.txtTruckType}`,
  },
  {
    key: "fuelTypeName",
    label: `${Constant.txtFuelType}`,
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

const FtruckLicense = [
  {
    key: "truckLicense",
    label: `${Constant.arrFieldMasterConDomTruckLicense[0]}`,
  },
  {
    key: "delete_truckLicense",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
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

const TransferMTP = () => {
  //GetData//

  //

  //DataIn//
  const [InPort, setInPort] = useState([]);
  //
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [cloneData, setCloneData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [country, setCountry] = useState([]);
  const [transferList, SetTransferList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [source, setSource] = useState([]);

  const [details, setDetails] = useState([]);

  const [validatecheck, setvalidatecheck] = useState("");
  const [validAlert, setValidAlert] = useState(false);
  const [collapsed, setCollapsed] = React.useState(true);

  //Input//
  const [InTruckLicense, setInTruckLicense] = useState([]);
  const [inputTruckLicense, setInputTruckLicense] = useState("");
  const [arrForRemoveRecord, setArrForRemoveRecord] = useState(["", 0]);
  //

  //Combobox//

  const [truckType, setTruckType] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [rateType, setRateType] = useState([]);
  const [transferType, setTransferType] = useState([]);
  const [packageType, setPackage] = useState([]);
  const [contractStatus, setContractStatus] = useState([]);
  const [shipTo, setShipTo] = useState([]);
  const [customType, setCustomType] = useState([]);
  const [fullYearList, setFullYearList] = useState([]);
  const [cbdeliveryMode, setDeliveryMode] = useState([]);
  const [headerMinValueForMax, setHeaderMinValueForMax] = useState(0);
  const [headerMaxValueForMin, setHeaderMaxValueForMin] = useState(0);
  const [_headerMinValueForMax, _setHeaderMinValueForMax] = useState(0);
  const [_headerMaxValueForMin, _setHeaderMaxValueForMin] = useState(0);
  //

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [valueHeader, setValueHeader] = React.useState(0);
  const [isMileRate, setIsMileRate] = useState(false);

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

  const [calFuelRateList, setCalFuelRateList] = useState([]);
  const [fuelRateMinEnd, setFuelRateMinEnd] = useState(0);
  const [transporterList, setTransporterList] = useState([]);
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
  const [placeContainerSelect, setPlaceContainerSelect] = useState([]);
  const [linkData, setLinkData] = useState({});
  const [isLinkData, setIsLinkData] = useState(false);
  const [itemSelectEdit, setItemSelectEdit] = useState([{}, {}, {}]);
  const [itemSelectAdd, setItemSelectAdd] = useState([{}, {}, {}]);
  const [isShowCloned, setIsShowCloned] = useState(false);
  const [isShowCloneSuccess, setIsShowCloneSuccess] = useState(false);
  const [isShowExitClone, setIsShowExitClone] = useState(false);
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [isConfirmDeleteRecordOT, setIsConfirmDeleteRecordOT] = useState(false);
  const [typeShowSuccess, setTypeShowSuccess] = useState("");
  const classes = useStyles();
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
  const [count, setCount] = useState(0);
  const _txtUnitTon = "ตัน";
  const txtKm = "Km";
  const txtUnitBaht = "บาท";
  const txtBahtKv = "บาท / Km";
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

  const handleChangeHeader = (event, newValue) => {
    setValueHeader(newValue);
  };

  const handleChangeHeaderIndex = (index) => {
    setValueHeader(index);
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
      TransferTypeId: null,
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
    obj.DeliveryMode = "";
    obj.FuelTypeId = document.getElementById("in-search-FuelType").value;
    obj.RateTypeId = document.getElementById("in-search-RateType").value;
    obj.RefDocNo = document.getElementById("in-search-RefDocNo").value;
    obj.TransferTypeId = document.getElementById(
      "in-search-transferTypeId"
    ).value;
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
  };

  const onClickAddTruckLicense = () => {
    var result = document.getElementById("truck-license").value;
    var check = InTruckLicense.find((x) => x.truckLicense === result);
    if (check) {
      console.log("ซ้ำ");
      setvalidatecheck("ซ้ำ");
      setValidAlert(true);
    } else {
      setvalidatecheck(Constant.inValidNullMessage);
      if (getIsValidForm("TruckLicense-need-validation")) {
        var newArr = [];
        var obj = { truckLicense: "" };
        obj.truckLicense = result;
        if (InTruckLicense.length) {
          newArr = [...InTruckLicense];
        }
        newArr.push(obj);
        setInTruckLicense(newArr);
        setNoValidateForm("TruckLicense-need-validation");
        setValidAlert(false);
        setInputTruckLicense("");
      }
    }
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
        TransferTypeId: null,
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

      obj.SourceId = null;

      obj.TruckTypeId =
        itemSelectSearchheader[2].truckTypeId === undefined
          ? null
          : itemSelectSearchheader[2].truckTypeId;

      obj.DeliveryMode = "";

      obj.FuelTypeId =
        document.getElementById("in-search-FuelType").value === ""
          ? null
          : document.getElementById("in-search-FuelType").value;
      obj.RateTypeId =
        document.getElementById("in-search-RateType").value === ""
          ? null
          : document.getElementById("in-search-RateType").value;
      obj.RefDocNo = document.getElementById("in-search-RefDocNo").value;
      obj.TransferTypeId = document.getElementById(
        "in-search-transferTypeId"
      ).value;

      if (obj.Years) {
        handleChangeContractYear();
      }
      console.log(obj);
      clickSearch(obj);
    }
  };

  const clickSearch = (arr) => {
    console.log(arr);
    fnGetTransferListBySearch(arr);
  };

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
        setCount(0);
      } else if (type === "clone") {
        setIsShowExitClone(!isShowExitClone);
      }
    }
  };

  const setShowFormClone = () => {
    setIsShowCloned(!isShowCloned);
    var result = transferList.find((x) => x.contractId === indexEditForm);
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

  const onChangeTransferType = () => {
    var transfervalue = document.getElementById("header-TransferType").value;
    if (transfervalue == "3") {
      setIsMileRate(true);
    } else {
      setIsMileRate(false);
    }
    setCalFuelRateList([]);
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
    if (type === "shipToRate") {
      var newArr = [...calFuelRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].shipToRate = parseFloat(e.target.value);
      } else {
        newArr[index].shipToRate = 0;
      }
      setCalFuelRateList(newArr);
    }
    if (type === "palletRate") {
      var newArr = [...calFuelRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].shipToRate = parseFloat(e.target.value);
      } else {
        newArr[index].shipToRate = 0;
      }
      setCalFuelRateList(newArr);
    }
    if (type === "shipFromRate") {
      var newArr = [...calFuelRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].palletRate = parseFloat(e.target.value);
      } else {
        newArr[index].palletRate = 0;
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

  const onClickCalFuelRate = () => {
    if (getIsValidForm("fuel-need-validation")) {
      var startValue = parseFloat(document.getElementById("fuel-start").value);
      var endValue = parseFloat(document.getElementById("fuel-end").value);
      var priceValue = 0;
      var shipfromStep = 0;
      var shiptoStep = 0;
      var shiptoPrice = 0;
      var shipfromPrice = 0;
      var palletPrice = 0;
      var palletStep = 0;
      if (!isMileRate) {
        shipfromStep = parseFloat(
          document.getElementById("shipfrom-step").value
        );
        shiptoStep = parseFloat(document.getElementById("shipto-step").value);
        shiptoPrice = parseFloat(document.getElementById("shipto-start").value);
        shipfromPrice = parseFloat(
          document.getElementById("shipfrom-start").value
        );
        palletPrice = parseFloat(document.getElementById("pallet-price").value);
        palletStep = parseFloat(document.getElementById("pallet-step").value);
      } else {
        priceValue = parseFloat(document.getElementById("fuel-price").value);
      }
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

      var shipfromStart = 0;
      var shiptoStart = 0;
      var palletStart = 0;

      while (count - (rangeBase + addRunning) >= minLength) {
        priceStart -= priceValue;
        shipfromStart -= shipfromStep;
        shiptoStart -= shiptoStep;
        palletStart -= palletStep;
        count -= rangeBase + addRunning;
        count = parseFloat(count.toFixed(2));
        console.log(count);
      }

      while (count <= maxLength) {
        var obj = {
          startRate: 0.0,
          endRate: 0.0,
          shipToRate: 0.0,
          seqShipToRate: 0.0,
          shipFromRate: 0.0,
          seqShipFromRate: 0.0,
          palletRate: 0.0,
          seqPalletRate: 0.0,
          fuelRate: 0.0,
        };
        obj.startRate = parseFloat(count.toFixed(2));
        obj.endRate = parseFloat((count + rangeBase).toFixed(2));
        obj.seqShipToRate = parseFloat(shiptoStart.toFixed(2));
        obj.seqShipFromRate = parseFloat(shipfromStart.toFixed(2));
        obj.seqPalletRate = parseFloat(palletStart.toFixed(2));
        obj.shipToRate = parseFloat(
          (shiptoPrice + obj.seqShipToRate).toFixed(2)
        );

        obj.shipFromRate = parseFloat(
          (shipfromPrice + obj.seqShipFromRate).toFixed(2)
        );

        obj.palletRate = parseFloat(
          (palletPrice + obj.seqPalletRate).toFixed(2)
        );
        obj.fuelRate = parseFloat(priceStart.toFixed(2));

        newArr.push(obj);
        count += rangeBase + addRunning;
        priceStart += priceValue;
        shipfromStart += shipfromStep;
        shiptoStart += shiptoStep;
        palletStart += palletStep;
      }
      console.log(newArr);
      setCalFuelRateList(newArr);

      document.getElementById("fuel-start").value = "";
      document.getElementById("fuel-end").value = "";
      if (!isMileRate) {
        document.getElementById("shipfrom-step").value = "";
        document.getElementById("shipto-step").value = "";
        document.getElementById("shipto-start").value = "";
        document.getElementById("shipfrom-start").value = "";
        document.getElementById("pallet-price").value = "";
        document.getElementById("pallet-step").value = "";
      } else {
        document.getElementById("fuel-price").value = "";
      }

      setFuelRateMinEnd(0);
      setNoValidateForm("fuel-need-validation");
    } else {
      setCalFuelRateList([]);
    }
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

  const onClickRemoveRecordAddDataTruck = () => {
    var arrRemove = [...arrForRemoveRecord];
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
    if (arrRemove.length) {
      if (arrRemove[0] === "truck-license") {
        var newArr = [...InTruckLicense];
        newArr.splice(arrRemove[1], 1);
        setInTruckLicense(newArr);
      }
      setArrForRemoveRecord([]);
    }
  };

  const fnClearOtherTableValueList = () => {
    setHeadPlaceContainerReturn([]);
    setCalFuelRateList([]);
    setInPort([]);
    setInTruckLicense([]);
    setIsMileRate(false);
  };

  const onClickClearData = (type) => (e) => {
    setOpenAddForm(false);

    if (type === "Add") {
      document.getElementById("add-header-contractNo").value = "";
      document.getElementById("add-header-fueltypeId").selectedIndex = 0;
      document.getElementById("add-header-ratetypeId").selectedIndex = 0;
      document.getElementById("header-TransferType").selectedIndex = 0;
      document.getElementById("add-header-refDoc").value = "";
      document.getElementById("add-header-dateStart").value = "";
      document.getElementById("add-header-dateEnd").value = "";
      document.getElementById("add-header-contractStatus").selectedIndex = 0;
    }
  };

  const onClickClearDataForSearch = () => {
    document.getElementById("in-search-ContractNo").value = "";
    document.getElementById("in-search-FuelType").selectedIndex = 0;
    document.getElementById("in-search-RateType").selectedIndex = 0;
    document.getElementById("in-search-DeliveryMode").selectedIndex = 0;
    document.getElementById("in-search-RefDocNo").value = "";
    document.getElementById("in-search-StartDate").value = "";
    document.getElementById("search-header-year").value = "";
    document.getElementById("in-search-EndDate").value = "";
    document.getElementById("in-search-ContractStatus").selectedIndex = 0;
  };

  const onClickCheckFormAddData = () => {
    var arrObj = [...itemSelectAdd];
    var contractStatus = document.getElementById(
      "add-header-contractStatus"
    ).value;
    if (
      getIsValidForm("add-header-need-validation") &&
      Object.keys(arrObj[0]).length
      //  &&
      // Object.keys(arrObj[1]).length &&
      // Object.keys(arrObj[2]).length
    ) {
      setInvalidMaterialFormAdd([false, false, false]);
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        if (InTruckLicense.length && calFuelRateList.length) {
          setIsConfirmSave(!isConfirmSave);
          // console.log(1111)
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        if (InTruckLicense.length && calFuelRateList.length) {
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
      // if (!Object.keys(arrObj[1]).length) {
      //   arrInvalid[1] = true;
      // } else {
      //   arrInvalid[1] = false;
      // }
      // if (!Object.keys(arrObj[2]).length) {
      //   arrInvalid[2] = true;
      // } else {
      //   arrInvalid[2] = false;
      // }
      setInvalidMaterialFormAdd(arrInvalid);
    }
  };

  const onClickCheckFormCloneData = () => {
    var contractStatus = document.getElementById(
      "clone-header-contractStatus"
    ).value;
    if (getIsValidForm("clone-header-need-validation")) {
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        if (InTruckLicense.length && calFuelRateList.length) {
          setIsConfirmSaveClone(!isConfirmSaveClone);
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        if (InTruckLicense.length && calFuelRateList.length) {
          setIsConfirmSaveClone(!isConfirmSaveClone);
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else {
        setIsNotAuthorized(!isNotAuthorized);
      }
    }
  };

  const onClickCheckFormEditData = () => {
    var contractStatus = document.getElementById(
      "edit-header-contractStatus"
    ).value;
    if (getIsValidForm("edit-header-need-validation")) {
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        console.log(_UserAuthen);
        if (InTruckLicense.length && calFuelRateList.length) {
          setIsConfirmEdit(!isConfirmEdit);
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        console.log(contractStatus);
        if (InTruckLicense.length && calFuelRateList.length) {
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
          items={transferList}
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
    } else if (type === "TruckTypeId") {
      newObj.truckTypeId = e.target.value;
    } else if (type === "TransferTypeId") {
      newObj.transferTypeId = parseInt(e.target.value);
      if (newObj.transferTypeId === 3) {
        setIsMileRate(true);
      } else {
        setIsMileRate(false);
      }
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
    } else if (type === "minTransportRate") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minTransportRate = name.value;
      } else {
        newObj.minTransportRate = 0;
      }
    } else if (type === "minDistanceRate") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minDistanceRate = name.value;
      } else {
        newObj.minDistanceRate = 0;
      }
    } else if (type === "overRatio") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.overRatio = name.value;
      } else {
        newObj.overRatio = 0;
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
    }
  };

  const handleChangeAddSelect = (type) => (e, values) => {
    if (type === "transporter") {
      if (values) {
        var newArr = [...itemSelectAdd];
        newArr[0] = values;
        setItemSelectAdd(newArr);
      } else {
        var newArr = [...itemSelectAdd];
        newArr[0] = {};
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
    // var sourceId = itemSelectAdd[1].sourceId;
    var transporterId = itemSelectAdd[0].transporterId;
    // var packageType = document.getElementById("header-packagetypeId").value;
    var rateTypeId = parseInt(
      document.getElementById("add-header-fueltypeId").value
    );
    var fuelTypeId = parseInt(
      document.getElementById("add-header-ratetypeId").value
    );
    var truckTypeId = parseInt(
      document.getElementById("add-header-TruckType").value
    );
    var transferTypeId = parseInt(
      document.getElementById("header-TransferType").value
    );
    var refDocNo = document.getElementById("add-header-refDoc").value;
    var startDate = document.getElementById("add-header-dateStart").value;
    var endDate = document.getElementById("add-header-dateEnd").value;
    var minQty = 0;
    var maxQty = 0;
    var minTonRate = 0;
    var minTransportRate = 0;
    var minDistanceRate = 0;
    var overRatio = 0;
    if (isMileRate) {
      minTransportRate = parseFloat(
        document.getElementById("add-header-transportRate").value
      );
      minDistanceRate = parseFloat(
        document.getElementById("add-header-distanceRate").value
      );
      overRatio = parseFloat(
        document.getElementById("add-header-overRatio").value
      );
    } else {
      minQty = document.getElementById("add-header-minqty").value;
      maxQty = document.getElementById("add-header-maxqty").value;
      minTonRate = document.getElementById("add-header-mintonrate").value;
    }
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
      transporterId,
      rateTypeId,
      truckTypeId,
      fuelTypeId,
      transferTypeId,
      minQty,
      maxQty,
      minTonRate,
      minTransportRate,
      minDistanceRate,
      overRatio,
      refDocNo,
      startDate,
      endDate,
      contractStatus,
      createBy,
    ];

    var newArrCalFuelRateList = [];
    calFuelRateList.map((item) => {
      var newObj = {
        startRate: 0.0,
        endRate: 0.0,
        shipToRate: 0.0,
        seqShipToRate: 0.0,
        shipFromRate: 0.0,
        seqShipFromRate: 0.0,
        palletRate: 0.0,
        seqPalletRate: 0.0,
        fuelRate: 0.0,
      };
      newObj.startRate = parseFloat(item.startRate);
      newObj.endRate = parseFloat(item.endRate);
      newObj.shipToRate = parseFloat(item.shipToRate);
      newObj.seqShipToRate = parseFloat(item.seqShipToRate);
      newObj.shipFromRate = parseFloat(item.shipFromRate);
      newObj.seqShipFromRate = parseFloat(item.seqShipFromRate);
      newObj.palletRate = parseFloat(item.palletRate);
      newObj.seqPalletRate = parseFloat(item.seqPalletRate);
      newObj.fuelRate = parseFloat(item.fuelRate);
      newArrCalFuelRateList.push(newObj);
    });

    console.log(newArrHeader);
    console.log(InTruckLicense);
    console.log(newArrCalFuelRateList);

    fnInsertData(newArrHeader, InTruckLicense, newArrCalFuelRateList);
  };
  const onClickCloneData = () => {
    setIsConfirmSaveClone(!isConfirmSaveClone);
    var newObj = { ...cloneData };
    var contractNo = document.getElementById("clone-header-contractNo").value;
    var transporterId = itemSelectAdd[0].transporterId;
    var truckTypeId = newObj.truckTypeId;
    var transferTypeId = newObj.transferTypeId;
    var minQty = 0;
    var maxQty = 0;
    var minTonRate = 0;
    var minTransportRate = 0;
    var minDistanceRate = 0;
    var overRatio = 0;

    if (isMileRate) {
      minTransportRate =  parseFloat(newObj.minTransportRate);
      minDistanceRate =  parseFloat(newObj.minDistanceRate);
      overRatio =  parseFloat(newObj.overRatio);
    } else {
      minQty = parseFloat(document.getElementById("clone-header-minQty").value);
      maxQty = parseFloat(document.getElementById("clone-header-maxQty").value);
      minTonRate = parseFloat(
        document.getElementById("clone-header-minTonRate").value
      );
    }

    var rateTypeId = parseInt(
      document.getElementById("clone-header-ratetypeId").value
    );
    var fuelTypeId = parseInt(
      document.getElementById("clone-header-fuelTypeId").value
    );
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
      transporterId,
      rateTypeId,
      truckTypeId,
      fuelTypeId,
      transferTypeId,
      minQty,
      maxQty,
      minTonRate,
      minTransportRate,
      minDistanceRate,
      overRatio,
      refDocNo,
      startDate,
      endDate,
      contractStatus,
      createBy,
    ];

    console.log(calFuelRateList);
    var newArrCalFuelRateList = [];
    calFuelRateList.map((item) => {
      var newObj = {
        startRate: 0.0,
        endRate: 0.0,
        shipToRate: 0.0,
        seqShipToRate: 0.0,
        shipFromRate: 0.0,
        seqShipFromRate: 0.0,
        palletRate: 0.0,
        seqPalletRate: 0.0,
        fuelRate: 0.0,
      };
      newObj.startRate = parseFloat(item.startRate);
      newObj.endRate = parseFloat(item.endRate);
      newObj.shipToRate = parseFloat(item.shipToRate);
      newObj.seqShipToRate = parseFloat(item.seqShipToRate);
      newObj.shipFromRate = parseFloat(item.shipFromRate);
      newObj.seqShipFromRate = parseFloat(item.seqShipFromRate);
      newObj.palletRate = parseFloat(item.palletRate);
      newObj.seqPalletRate = parseFloat(item.seqPalletRate);
      newObj.fuelRate = parseFloat(item.fuelRate);
      newArrCalFuelRateList.push(newObj);
    });
    console.log(newArrHeader);

    console.log(newArrCalFuelRateList);

    fnInsertData(newArrHeader, InTruckLicense, newArrCalFuelRateList);
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
    } else if (type === "truckType") {
      newObj.truckTypeId = e.target.value;
    } else if (type === "TransferTypeId") {
      newObj.transferTypeId = parseInt(e.target.value);
      if (newObj.transferTypeId === 3) {
        setIsMileRate(true);
      } else {
        setIsMileRate(false);
      }
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
    } else if (type === "minTransportRate") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minTransportRate = name.value;
      } else {
        newObj.minTransportRate = 0;
      }
    } else if (type === "minDistanceRate") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.minDistanceRate = name.value;
      } else {
        newObj.minDistanceRate = 0;
      }
    } else if (type === "overRatio") {
      if (!isNaN(parseFloat(name.value))) {
        newObj.overRatio = name.value;
      } else {
        newObj.overRatio = 0;
      }
    }

    setCloneData(newObj);
  };

  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var arrObj = [...itemSelectEdit];

    var transporterId = arrObj[0].transporterId;
    var fuelTypeId = document.getElementById("edit-header-fuelTypeId").value;
    var contractStatus = document.getElementById(
      "edit-header-contractStatus"
    ).value;

    console.log(calFuelRateList);
    var newArrCalFuelRateList = [];
    calFuelRateList.map((item) => {
      var newObj = {
        startRate: 0.0,
        endRate: 0.0,
        shipToRate: 0.0,
        seqShipToRate: 0.0,
        shipFromRate: 0.0,
        seqShipFromRate: 0.0,
        palletRate: 0.0,
        seqPalletRate: 0.0,
        fuelRate: 0.0,
      };
      newObj.startRate = parseFloat(item.startRate);
      newObj.endRate = parseFloat(item.endRate);
      newObj.shipToRate = parseFloat(item.shipToRate);
      newObj.seqShipToRate = parseFloat(item.seqShipToRate);
      newObj.shipFromRate = parseFloat(item.shipFromRate);
      newObj.seqShipFromRate = parseFloat(item.seqShipFromRate);
      newObj.palletRate = parseFloat(item.palletRate);
      newObj.seqPalletRate = parseFloat(item.seqPalletRate);
      newObj.fuelRate = parseFloat(item.fuelRate);
      newArrCalFuelRateList.push(newObj);
    });

    var newObj = { ...editData };

    newObj.transporterId = transporterId;
    newObj.fuelTypeId = fuelTypeId;
    newObj.contractStatus = contractStatus;
    newObj.mcontractTransferTruckLicenses = [...InTruckLicense];
    newObj.mcontractTransferFuelRates = [...newArrCalFuelRateList];
    newObj.updateBy = parseInt(localStorage.getItem("userId"));
    console.log(newObj);
    fnUpdateData(newObj);
  };

  const otherTables = (type, item) => {
    if (type == "edit") {
      if (!isGetDatainCalValue && Object.keys(editData).length) {
        // console.log(editData);
        var newObj = { ...editData };
        var newArr1 = [];
        newObj.mcontractTransferFuelRates.map((item) => {
          var obj = {
            startRate: 0.0,
            endRate: 0.0,
            shipToRate: 0.0,
            seqShipToRate: 0.0,
            shipFromRate: 0.0,
            seqShipFromRate: 0.0,
            palletRate: 0.0,
            seqPalletRate: 0.0,
            fuelRate: 0.0,
          };
          obj.startRate = item.startRate ?? 0;
          obj.endRate = item.endRate ?? 0;
          obj.shipToRate = item.shipToRate ?? 0;
          obj.seqShipToRate = item.seqShipToRate ?? 0;
          obj.shipFromRate = item.shipFromRate ?? 0;
          obj.seqShipFromRate = item.seqShipFromRate ?? 0;
          obj.palletRate = item.palletRate ?? 0;
          obj.seqPalletRate = item.seqPalletRate ?? 0;
          obj.fuelRate = item.fuelRate ?? 0;

          newArr1.push(obj);
        });

        setCalFuelRateList(newArr1);

        var newArr2 = [];
        newObj.mcontractTransferTruckLicenses.map((item) => {
          var obj = { truckLicense: "" };
          obj.contractId = item.contractId;
          obj.runningNo = item.runningNo;
          obj.truckLicense = item.truckLicense;
          newArr2.push(obj);
        });
        setInTruckLicense(newArr2);

        setIsGetDatainCalValue(true);
      }
    }

    if (type === "show") {
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
                      FtruckLicense,
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
        transferType.length &&
        transporterList.length &&
        packageType.length &&
        contractStatus.length &&
        fuelType.length &&
        rateType.length
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
                  {/* <Tab
                    style={{ outline: "none" }}
                    label="Place Container Return"
                    {...a11yProps(0)}
                  /> */}
                  <Tab
                    style={{ outline: "none" }}
                    label="Fuel Rate"
                    {...a11yProps(0)}
                  />
                  <Tab
                    style={{ outline: "none" }}
                    label="Truck License"
                    TransferType
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
                    ? formFuelRate()
                    : type === "edit"
                    ? formFuelRate()
                    : null}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {type === "add"
                    ? formTruckLicense()
                    : type === "edit"
                    ? formTruckLicense()
                    : null}
                </TabPanel>
              </SwipeableViews>
            </div>
          </List>
        );
      }
    }
  };

  // const tabHeader = (type, item) => {
  //   if (type === "edit") {
  //     if (!isGetDatainCalValue && Object.keys(editData).length) {
  //       // console.log(editData);
  //       var newObj = { ...editData };
  //       var newArr = [];
  //       newObj.mcontractExportLclairfuelRates.map((item) => {
  //         var obj = {
  //           startRate: 0.0,
  //           endRate: 0.0,
  //           shipToRate: 0.0,
  //           seqShipToRate: 0.0,
  //           shipFromRate: 0.0,
  //           seqShipFromRate: 0.0,
  //           palletRate: 0.0,
  //           seqPalletRate: 0.0,
  //         };
  //         obj.startRate = item.startRate;
  //         obj.endRate = item.endRate;
  //         obj.shipToRate = item.shipToRate;
  //         obj.seqShipToRate = item.seqShipToRate;
  //         obj.shipFromRate = item.shipFromRate;
  //         obj.seqShipFromRate = item.seqShipFromRate;
  //         obj.palletRate = item.palletRate;
  //         obj.seqPalletRate = item.seqPalletRate;

  //         newArr.push(obj);
  //       });

  //       setCalFuelRateList(newArr);

  //       newArr = [];
  //       newObj.mcontractDomesticTruckLicenses.map((item) => {
  //         var obj = { truckLicense: "" };
  //         obj.contractId = item.contractId;
  //         obj.runningNo = item.runningNo;
  //         obj.truckLicense = item.truckLicense;
  //         newArr.push(obj);
  //       });
  //       setInTruckLicense(newArr);

  //       setIsGetDatainCalValue(true);
  //     }
  //   } else if (type === "add") {
  //     if (
  //       truckType.length &&
  //       shipTo.length &&
  //       source.length &&
  //       transferType.length &&
  //       transporterList.length &&
  //       packageType.length &&
  //       contractStatus.length &&
  //       fuelType.length &&
  //       rateType.length &&
  //       cbdeliveryMode.length
  //     ) {
  //       return (
  //         <List>
  //           <div className={classes.root}>
  //             <AppBar position="center" color="default">
  //               <Tabs
  //                 className={classes.tabRoot}
  //                 value={valueHeader}
  //                 onChange={handleChangeHeader}
  //                 variant="fullWidth"
  //                 centered
  //               >
  //                 {/* <Tab style={{ outline: 'none' }} label="Custom" {...a11yProps(0)} /> */}
  //                 {/* <Tab
  //                   style={{ outline: "none" }}
  //                   label="Place Container Return"
  //                   {...a11yProps(0)}
  //                 /> */}
  //                 <Tab
  //                   style={{ outline: "none" }}
  //                   label="Contract Header"
  //                   {...a11yProps(0)}
  //                 />
  //                 <Tab
  //                   style={{ outline: "none" }}
  //                   label="Miles Rate"
  //                   TransferType
  //                   {...a11yProps(1)}
  //                 />
  //               </Tabs>
  //             </AppBar>
  //             <SwipeableViews
  //               axis={theme.direction === "rtl" ? "x-reverse" : "x"}
  //               index={valueHeader}
  //               onChangeIndex={handleChangeHeaderIndex}
  //             >
  //               <TabPanel value={value} index={0} dir={theme.direction}>
  //                 {type === "add"
  //                   ? collapseHeader(type)
  //                   : type === "edit"
  //                   ? collapseHeader(type)
  //                   : null}
  //               </TabPanel>
  //               <TabPanel value={value} index={1} dir={theme.direction}>
  //                 {type === "add"
  //                   ? formMilesRate(type)
  //                   : type === "edit"
  //                   ? formMilesRate(type)
  //                   : null}
  //               </TabPanel>
  //             </SwipeableViews>
  //           </div>
  //         </List>
  //       );
  //     }
  //   }
  // };

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
                    <CLabel htmlFor="name">ประเภทรถ</CLabel>
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
                        id="in-search-TruckTypeId"
                        // onChange={handleChangSearch("PackageType")}
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>
                        <option value={0}>{Constant.txtAll}</option>
                        {truckType.map((cb) => (
                          <option value={cb.truckTypeId}>
                            {cb.truckTypeName}{" "}
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
            {/* {tabHeader("add")} */}
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

  const dynamicDialog = (type) => {
    if (type === "add") {
      if (isMileRate) {
        return (
          <CCard>
            <CRow className="m-3 p-0">
              <CCol xs="12" sm="6" md="2">
                <CFormGroup>
                  <CLabel htmlFor="name">อัตราค่าวิ่งขั้นต่ำ</CLabel>
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
                        <CInputGroupText>{txtKm}</CInputGroupText>
                      </CInputGroupPrepend>
                      <CurrencyInput
                        class="form-control"
                        id="add-header-transportRate"
                        name="input-name"
                        decimalScale={3}
                        step={0.01}
                        min={0}
                        decimalsLimit={3}
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
                  <CLabel htmlFor="name">อัตราค่าขนส่งขั้นต่ำ</CLabel>
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
                        <CInputGroupText>{txtUnitBaht}</CInputGroupText>
                      </CInputGroupPrepend>

                      <CurrencyInput
                        class="form-control"
                        id="add-header-distanceRate"
                        name="input-name"
                        min={0}
                        decimalScale={3}
                        step={0.01}
                        decimalsLimit={3}
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
                  <CLabel htmlFor="name">อัตราส่วนเกิน</CLabel>
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
                        <CInputGroupText>{txtBahtKv}</CInputGroupText>
                      </CInputGroupPrepend>

                      <CurrencyInput
                        class="form-control"
                        id="add-header-overRatio"
                        name="input-name"
                        maxLength="12"
                        decimalScale={3}
                        step={0.01}
                        min={0}
                        decimalsLimit={3}
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
        );
      } else {
        return (
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
                      <CurrencyInput
                        class="form-control"
                        id="add-header-mintonrate"
                        name="input-name"
                        maxLength="12"
                        decimalScale={3}
                        step={0.01}
                        min={0}
                        decimalsLimit={3}
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
        );
      }
    } else if (type === "edit") {
      if (Object.keys(editData).length) {
        var newObj = { ...editData };
        console.log(editData);
        var minQtyValue = newObj.minQty;
        var maxQtyValue = newObj.maxQty;
        var minTonRateValue = newObj.minTonRate;
        var minTransportRateValue = newObj.minTransportRate;
        var minDistanceRateValue = newObj.minDistanceRate;
        var overRatioValue = newObj.overRatio;
      }
      if (isMileRate) {
        return (
          <CCard>
            <CRow className="m-3 p-0">
              <CCol xs="12" sm="6" md="2">
                <CFormGroup>
                  <CLabel htmlFor="name">อัตราค่าวิ่งขั้นต่ำ</CLabel>
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
                        <CInputGroupText>{txtKm}</CInputGroupText>
                      </CInputGroupPrepend>
                      <CurrencyInput
                        class="form-control"
                        id="add-header-transportRate"
                        name="input-name"
                        decimalScale={3}
                        step={0.01}
                        min={0}
                        decimalsLimit={3}
                        value={minTransportRateValue}
                        onValueChange={handleChangeEditForm("minTransportRate")}
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
                  <CLabel htmlFor="name">อัตราค่าขนส่งขั้นต่ำ</CLabel>
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
                        <CInputGroupText>{txtUnitBaht}</CInputGroupText>
                      </CInputGroupPrepend>

                      <CurrencyInput
                        class="form-control"
                        id="add-header-distanceRate"
                        name="input-name"
                        min={0}
                        decimalScale={3}
                        step={0.01}
                        decimalsLimit={3}
                        value={minDistanceRateValue}
                        onValueChange={handleChangeEditForm("minDistanceRate")}
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
                  <CLabel htmlFor="name">อัตราส่วนเกิน</CLabel>
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
                        <CInputGroupText>{txtBahtKv}</CInputGroupText>
                      </CInputGroupPrepend>

                      <CurrencyInput
                        class="form-control"
                        id="add-header-overRatio"
                        name="input-name"
                        maxLength="12"
                        decimalScale={3}
                        step={0.01}
                        min={0}
                        decimalsLimit={3}
                        value={overRatioValue}
                        onValueChange={handleChangeEditForm("overRatio")}
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
        );
      } else {
        return (
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
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
                        onValueChange={handleChangeEditForm("minTonRate")}
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
        );
      }
    } else if (type === "clone") {
      if (Object.keys(cloneData).length) {
        var newObj = { ...cloneData };
        console.log(cloneData);
        var minQtyValue = newObj.minQty;
        var maxQtyValue = newObj.maxQty;
        var minTonRateValue = newObj.minTonRate;
        var minTransportRateValue = newObj.minTransportRate;
        var minDistanceRateValue = newObj.minDistanceRate;
        var overRatioValue = newObj.overRatio;
      }
      if (isMileRate) {
        return (
          <CCard>
            <CRow className="m-3 p-0">
              <CCol xs="12" sm="6" md="2">
                <CFormGroup>
                  <CLabel htmlFor="name">อัตราค่าวิ่งขั้นต่ำ</CLabel>
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
                        <CInputGroupText>{txtKm}</CInputGroupText>
                      </CInputGroupPrepend>
                      <CurrencyInput
                        class="form-control"
                        id="clone-header-transportRate"
                        name="input-name"
                        decimalScale={3}
                        step={0.01}
                        min={0}
                        decimalsLimit={3}
                        value={minTransportRateValue}
                        onValueChange={handleChangeCloneForm(
                          "minTransportRate"
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
              <CCol xs="12" sm="6" md="2">
                <CFormGroup>
                  <CLabel htmlFor="name">อัตราค่าขนส่งขั้นต่ำ</CLabel>
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
                        <CInputGroupText>{txtUnitBaht}</CInputGroupText>
                      </CInputGroupPrepend>

                      <CurrencyInput
                        class="form-control"
                        id="clone-header-distanceRate"
                        name="input-name"
                        min={0}
                        decimalScale={3}
                        step={0.01}
                        decimalsLimit={3}
                        value={minDistanceRateValue}
                        onValueChange={handleChangeCloneForm("minDistanceRate")}
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
                  <CLabel htmlFor="name">อัตราส่วนเกิน</CLabel>
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
                        <CInputGroupText>{txtBahtKv}</CInputGroupText>
                      </CInputGroupPrepend>

                      <CurrencyInput
                        class="form-control"
                        id="clone-header-overRatio"
                        name="input-name"
                        maxLength="12"
                        decimalScale={3}
                        step={0.01}
                        min={0}
                        decimalsLimit={3}
                        value={overRatioValue}
                        onValueChange={handleChangeCloneForm("overRatio")}
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
        );
      } else {
        return (
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
                      <CurrencyInput
                        class="form-control"
                        id="clone-header-minQty"
                        name="input-name"
                        maxLength="12"
                        decimalScale={3}
                        step={0.001}
                        min={0}
                        decimalsLimit={3}
                        value={minQtyValue}
                        // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                        onValueChange={handleChangeCloneForm("minQty")}
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
                      <CurrencyInput
                        class="form-control"
                        id="clone-header-maxQty"
                        name="input-name"
                        maxLength="12"
                        decimalScale={3}
                        step={0.001}
                        min={0}
                        value={maxQtyValue}
                        decimalsLimit={3}
                        // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                        onValueChange={handleChangeCloneForm("maxQty")}
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
                        <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                      </CInputGroupPrepend>
                      <CurrencyInput
                        class="form-control"
                        id="clone-header-minTonRate"
                        name="input-name"
                        maxLength="12"
                        decimalScale={3}
                        value={minTonRateValue}
                        step={0.001}
                        min={0}
                        decimalsLimit={3}
                        // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                        onValueChange={handleChangeCloneForm("minTonRate")}
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
        );
      }
    }
  };

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
      transporterList.length &&
      packageType.length &&
      contractStatus.length &&
      fuelType.length &&
      rateType.length
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
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
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
                                  id="header-TransferType"
                                  onChange={onChangeTransferType}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกรายการ
                                  </option>
                                  {transferType.map((cb) => (
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
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">ประเภทรถ</CLabel>
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
                                    id="add-header-TruckType"
                                    required
                                  >
                                    <option selected hidden value="">
                                      เลือกรายการ
                                    </option>
                                    {truckType.map((cb) => (
                                      <option value={cb.truckTypeId}>
                                        {cb.truckTypeName}{" "}
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
                        {dynamicDialog(type)}
                      </Box>
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
          var contractNoValue = newObj.contractNo;
          var _transporterList = transporterList.find(
            (x) => x.transporterId === newObj.transporterId
          );
          var rateTypeValue = newObj.rateTypeId;
          var truckTypeValue = newObj.truckTypeId;
          var fuelTypeValue =
            newObj.fuelTypeId !== null ? newObj.fuelTypeId : null;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;
          var transferTypeId = newObj.transferTypeId;
          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);
          var _contractStatus = newObj.contractStatus;
          if (!Object.keys(itemSelectEdit[0]).length) {
            setItemSelectEdit([_transporterList]);
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
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
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
                                  id="edit-header-TransferType"
                                  onChange={handleChangeEditForm(
                                    "TransferTypeId"
                                  )}
                                  value={transferTypeId}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกรายการ
                                  </option>
                                  {transferType.map((cb) => (
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
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทรถ</CLabel>
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
                                  id="edit-header-TruckType"
                                  value={truckTypeValue}
                                  onChange={handleChangeEditForm("TruckTypeId")}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกรายการ
                                  </option>
                                  {truckType.map((cb) => (
                                    <option value={cb.truckTypeId}>
                                      {cb.truckTypeName}{" "}
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
                                  id="edit-header-ratetypeId"
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
                    {dynamicDialog(type)}
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
          var contractNoValue = newObj.contractNo;
          var _transporterList = transporterList.find(
            (x) => x.transporterId === newObj.transporterId
          );
          var rateTypeValue = newObj.rateTypeId;
          var truckTypeValue = newObj.truckTypeId;
          var fuelTypeValue =
            newObj.fuelTypeId !== null ? newObj.fuelTypeId : null;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;
          var transferTypeId = newObj.transferTypeId;
          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);
          var _contractStatus = newObj.contractStatus;
          if (!Object.keys(itemSelectAdd[0]).length) {
            setItemSelectAdd([_transporterList]);
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
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
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
                                  id="edit-header-TransferType"
                                  onChange={handleChangeCloneForm(
                                    "TransferTypeId"
                                  )}
                                  value={transferTypeId}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกรายการ
                                  </option>
                                  {transferType.map((cb) => (
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
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทรถ</CLabel>
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
                                  onChange={handleChangeCloneForm("truckType")}
                                  id="clone-header-truckType"
                                  value={truckTypeValue}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทรถ
                                  </option>
                                  {truckType.map((cb) => (
                                    <option value={cb.truckTypeId}>
                                      {cb.truckTypeName}{" "}
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
                    {dynamicDialog(type)}
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
            {isMileRate ? (
              <CCol xs="12" sm="6" md="2">
                <CFormGroup>
                  <CLabel>ค่าชดเชยเชื้อเพลิง</CLabel>

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
                      onInput={(e) =>
                        (e.target.value = e.target.value.slice(0, 14))
                      }
                      step="0.01"
                      min={0}
                      // max="100"
                      required
                    />
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </Box>
                </CFormGroup>
              </CCol>
            ) : (
              <div></div>
            )}
          </CRow>
          {dynamicFuelRate()}
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
        <br />{" "}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto", textAlign: "center" }}
        >
          <CDataTable
            items={calFuelRateList}
            fields={isMileRate ? FEXTransportRateMileRate : FEXTransportRate}
            bordered
            style={{ textAlign: "center" }}
            // columnFilter
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
              shipToRate: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      value={item.shipToRate}
                      style={{
                        textAlign: "center",
                      }}
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      decimalsLimit={2}
                      disabled={isLinkData}
                      onValueChange={handleChangeUpdateField(
                        "shipToRate",
                        index
                      )}
                    />
                  </td>
                );
              },
              shipFromRate: (item, index) => {
                return (
                  <td className="py-2 ">
                    <CurrencyInput
                      class="form-control"
                      value={item.shipFromRate}
                      // name="input-name"
                      style={{
                        textAlign: "center",
                      }}
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      decimalsLimit={2}
                      disabled={isLinkData}
                      onValueChange={handleChangeUpdateField(
                        "shipFromRate",
                        index
                      )}
                    />
                  </td>
                );
              },
              palletRate: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      value={item.palletRate}
                      style={{
                        textAlign: "center",
                      }}
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      decimalsLimit={2}
                      disabled={isLinkData}
                      onValueChange={handleChangeUpdateField(
                        "palletRate",
                        index
                      )}
                    />
                  </td>
                );
              },
              fuelFrom: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      value={item.fuelFrom}
                      // name="input-name"
                      maxLength="14"
                      disabled
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      decimalsLimit={2}
                      // onValueChange={handleChangAddLiftOn("liftOnPrice")}
                    />
                  </td>
                );
              },
              fuelTo: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      value={item.fuelTo}
                      // name="input-name"
                      maxLength="14"
                      disabled
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      decimalsLimit={2}
                      // onValueChange={handleChangAddLiftOn("liftOnPrice")}
                    />
                  </td>
                );
              },
            }}
          />
        </CCard>
      </div>
    );
  };

  const dynamicFuelRate = () => {
    if (!isMileRate) {
      return (
        <CRow>
          <CCol xs="12" sm="6" md="2">
            <CFormGroup>
              <CLabel>ค่าขนส่งต้นทาง</CLabel>
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
                  id="shipto-start"
                  onWheel={(e) => e.target.blur()}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 14))
                  }
                  step="0.01"
                  min={0}
                  // max="100"
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
              <CLabel>อัตราปรับต้นทาง</CLabel>
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
                  id="shipto-step"
                  onWheel={(e) => e.target.blur()}
                  step="0.01"
                  min="0"
                  // max="10000"
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
              <CLabel>ค่าขนส่งปลายทาง</CLabel>
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
                  id="shipfrom-start"
                  onWheel={(e) => e.target.blur()}
                  step="0.01"
                  min="0"
                  // max="10000"
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
              <CLabel>อัตราปรับปลายทาง</CLabel>
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
                  id="shipfrom-step"
                  onWheel={(e) => e.target.blur()}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 14))
                  }
                  step="0.01"
                  min={0}
                  // max="100"
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
              <CLabel>ราคาพาเลท</CLabel>
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
                  id="pallet-price"
                  onWheel={(e) => e.target.blur()}
                  step="0.01"
                  min="0"
                  // max="10000"
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
              <CLabel>อัตราปรับพาเลท</CLabel>
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
                  id="pallet-step"
                  onWheel={(e) => e.target.blur()}
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 14))
                  }
                  step="0.01"
                  min={0}
                  // max="100"
                  required
                />
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </Box>
            </CFormGroup>
          </CCol>
        </CRow>
      );
    }
  };

  const formTruckLicense = () => {
    return (
      <div className="font-form-scg">
        {formAddTruckLicense()}
        <br />

        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          <CDataTable
            items={InTruckLicense}
            fields={FtruckLicense}
            // columnFilter
            tableFilter={{
              label: `${Constant.tabletxtSearch}`,
              placeholder: `${Constant.tabletxtPlaceholder}`,
            }}
            itemsPerPage={100}
            hover
            // sorter
            pagination
            scopedSlots={{
              delete_truckLicense: (item, index) => {
                if (!isLinkData) {
                  return (
                    <td className="py-2">
                      <CButton
                        size={Constant.btAddSize}
                        block
                        color="danger"
                        onClick={onClickConfirmRemoveRecord(
                          "truck-license",
                          index
                        )}
                      >
                        {Constant.btDeleteData}
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
      </div>
    );
  };

  const formAddTruckLicense = () => {
    if (!isLinkData) {
      return (
        <CForm className="TruckLicense-need-validation" noValidate>
          <CFormGroup className="font-form-scg">
            <CRow>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel>
                    {Constant.arrFieldMasterConDomTruckLicense[0]}
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
                      id="truck-license"
                      style={{ height: Constant.styleHeightField }}
                      value={inputTruckLicense}
                      invalid={validAlert}
                      maxLength="20"
                      required
                      onChange={(event) => {
                        setInputTruckLicense(event.target.value);
                      }}
                    />
                    <CInvalidFeedback>{validatecheck}</CInvalidFeedback>
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
                    className="editbutton mb-1"
                    size={Constant.btAddSize}
                    color="success"
                    block
                    onClick={onClickAddTruckLicense}
                  >
                    {Constant.btAddData}
                  </CButton>
                </Box>
              </CCol>
            </CRow>
          </CFormGroup>
        </CForm>
      );
    } else {
      return null;
    }
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
  );

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
                                  !InTruckLicense.length
                                    ? !calFuelRateList.length
                                      ? `, Truck License`
                                      : "Truck License"
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
              ? showTextContentEdit()
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
          <CButton color="danger" onClick={onClickRemoveRecordAddDataTruck}>
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
    // VariableController.linkDeliveryNo = newObj.deliveryNo;
    // VariableController.linkSaleOrderNo = newObj.saleOrderNo;
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

  const fnInsertData = (newArrHeader, newArrTruckLicense, newArrFuelRate) => {
    setIsPostingData(true);
    Repository.fetchAddContractTransferList(
      newArrHeader,
      newArrTruckLicense,
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
    Repository.fetchEditTransferList(objData).then(
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
    Repository.fetchRemoveContractTransferList(index).then(
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

  const fnGetTransferListBySearch = (arr) => {
    setIsPostingData(true);
    Repository.fetchTransferListBySearch(arr).then(
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

          SetTransferList(result.data);
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

    Repository.fetchTransferBySearchById(index).then(
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
          if (result.data.headerList.transferTypeId === 3) {
            setIsMileRate(true);
          } else {
            setIsMileRate(false);
          }
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
    initeState();
  };

  const initeState = () => {
    /**NEW API */
    fnGetContractExportTruckForSearchList();
    fnGetCbTransferType();
    getFullYearForSearch();
  };

  useEffect(() => {
    if (
      VariableController.linkContractId !== null &&
      VariableController.linkShipmentNo !== null 
      // VariableController.linkDeliveryNo !== null &&
      // VariableController.linkSaleOrderNo !== null
    ) {
      initeState();
      var newObj = {
        shipmentNo: VariableController.linkShipmentNo,
        // deliveryNo: VariableController.linkDeliveryNo,
        contractId: VariableController.linkContractId,
        // saleOrderNo: VariableController.linkSaleOrderNo,
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
                        {Constant.txtMasterTranferMTP}
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

export default TransferMTP;
