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
    key: "transporterNameThai",
    label: `${Constant.txtVenderName}`,
  },

  {
    key: "packageType",
    label: "ประเภทแพ็คเกจ",
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

const FShipTo = [
  {
    key: "manage",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  {
    key: "shipToCode",
    label: "Ship To",
  },
  {
    key: "customFee",
    label: "Custom Fee ",
  },
  {
    key: "customFee2",
    label: "Custom Fee 2",
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
  const [contractEPZ, SetcontractEPZ] = useState([]);
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
  const [headCustomShipTo, setheadCustomShipTo] = useState([]);
  const [headliffoff, setHeadLiftOff] = useState([]);
  const [headlifton, setHeadLiftOn] = useState([]);
  const [shipToSelect, setshipToSelect] = useState([]);
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
      PackageType: null,
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
    obj.PackageType = document.getElementById("in-search-PackageType").value;
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

    if (type === "ShipTo") {
      if (value) {
        var newArr = [...shipToSelect];

        var obj = {
          shipToId: null,
          shipToNameThai: "",
          shipToCode: "",
        };
        obj.shipToId = value.shipToId;
        obj.shipToNameThai = value.shipToNameThai;
        obj.shipToCode = value.shipToCode;
        newArr[0] = obj;

        setshipToSelect(newArr);
        console.log(newArr);
      } else {
        var newArr = [...shipToSelect];
        newArr[0] = {};

        setshipToSelect(newArr);
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

  const handleChangAddCustomeShipTo = (type) => (e, value) => {
    var obj = {
      shipToId: null,
      shipToNameThai: "",
      customFee: 0.0,
      customFee2: 0.0,
    };

    obj.customFee = document.getElementById("header-shipTo-customfee").value;
    obj.customFee2 = document.getElementById("header-shipTo-customfee2").value;

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

        PackageType: null,

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
      obj.PackageType = document.getElementById("in-search-PackageType").value;
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
    fnGetcontractEPZBySearch(arr);
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
    var result = contractEPZ.find((x) => x.contractId === indexEditForm);
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
    if (type === "customFee") {
      var newArr = [...headCustomShipTo];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].customFee = name.value;
      } else {
        newArr[index].customFee = 0;
      }
      setheadCustomShipTo(newArr);
    }
    if (type === "customFee2") {
      var newArr = [...headCustomShipTo];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].customFee2 = name.value;
      } else {
        newArr[index].customFee2 = 0;
      }
      setheadCustomShipTo(newArr);
    }

    if (type === "portChargePrice") {
      var newArr = [...headCustomShipTo];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].portChargePrice = name.value;
      } else {
        newArr[index].portChargePrice = 0;
      }
      setheadCustomShipTo(newArr);
    }

    if (type === "lashingChargePrice") {
      var newArr = [...headCustomShipTo];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].lashingChargePrice = name.value;
      } else {
        newArr[index].lashingChargePrice = 0;
      }
      setheadCustomShipTo(newArr);
    }

    if (type === "repackageChargePrice") {
      var newArr = [...headCustomShipTo];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].repackageChargePrice = name.value;
      } else {
        newArr[index].repackageChargePrice = 0;
      }
      setheadCustomShipTo(newArr);
    }

    if (type === "inspectorFeePrice") {
      var newArr = [...headCustomShipTo];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].inspectorFeePrice = name.value;
      } else {
        newArr[index].inspectorFeePrice = 0;
      }
      setheadCustomShipTo(newArr);
    }

    if (type === "fuelPrice") {
      var newArr = [...headCustomShipTo];
      if (name.value) {
        // if (e.target.value.length > 1 ) {
        //   e.target.value = e.target.value
        // }
        newArr[index].fuelPrice = name.value;
      } else {
        newArr[index].fuelPrice = 0;
      }
      setheadCustomShipTo(newArr);
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
      var newArr = [...headCustomShipTo];
      newArr.splice(index, 1);
      setheadCustomShipTo(newArr);
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

  const onClickAddShipTo = () => {
    var arrInvalid = [...invalidMaterialFormOther1];

    var check = headCustomShipTo.find(
      (x) => x.shipToId === shipToSelect[0].shipToId
    );
    if (!check) {
      if (
        getIsValidForm("formCustomerShipTo-need-validation") &&
        Object.keys(shipToSelect).length
      ) {
        arrInvalid[0] = false;
        setInvalidMaterialFormOther1(arrInvalid);

        var inShipToId = shipToSelect[0].shipToId;
        var inShipToNameThai = shipToSelect[0].shipToNameThai;
        var inShipToCode = shipToSelect[0].shipToCode;
        var inCustomFee = headerInputPlaceCon.customFee;
        var inCustomFee2 = headerInputPlaceCon.customFee2;

        var obj = {
          shipToId: null,
          shipToNameThai: "",
          shipToCode: "",
          customFee: "",
          customFee2: 0.0,
        };
        var newArr = [];
        if (headCustomShipTo.length) {
          newArr = [...headCustomShipTo];
        }
        obj.shipToId = inShipToId;
        obj.shipToNameThai = inShipToNameThai;
        obj.shipToCode = "[" + inShipToCode + "]" + " " + inShipToNameThai;
        obj.customFee = inCustomFee;
        obj.customFee2 = inCustomFee2;

        newArr.push(obj);
        // console.log(obj)
        setheadCustomShipTo(newArr);

        document.getElementById("header-shipTo-customfee2").value = "";
        document.getElementById("header-shipTo-customfee").value = "";

        setNoValidateForm("formCustomerShipTo-need-validation");
      } else {
        if (!Object.keys(shipToSelect).length) {
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
    setheadCustomShipTo([]);
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
    var contractStatus = document.getElementById(
      "add-header-contractStatus"
    ).value;
    if (
      getIsValidForm("add-header-need-validation") &&
      Object.keys(arrObj[0]).length
    ) {
      setInvalidMaterialFormAdd([false, false, false]);
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        if (headCustomShipTo.length) {
          setIsConfirmSave(!isConfirmSave);
          // console.log(1111)
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        if (headCustomShipTo.length) {
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
    var contractStatus = document.getElementById(
      "clone-header-contractStatus"
    ).value;
    if (getIsValidForm("clone-header-need-validation")) {
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        if (headCustomShipTo.length) {
          setIsConfirmSaveClone(!isConfirmSaveClone);
          // console.log(1111)
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        if (headCustomShipTo.length) {
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
    var contractStatus = document.getElementById(
      "edit-header-contractStatus"
    ).value;
    if (getIsValidForm("edit-header-need-validation")) {
      if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
        console.log(_UserAuthen);
        if (headCustomShipTo.length) {
          setIsConfirmEdit(!isConfirmEdit);
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else if (contractStatus !== "Active") {
        console.log(contractStatus);
        if (headCustomShipTo.length) {
          setIsConfirmEdit(!isConfirmEdit);
        } else {
          setIsWarningInputForm(!isWarningInputForm);
        }
      } else {
        setIsNotAuthorized(!isNotAuthorized);
      }
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
          items={contractEPZ}
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
    } else if (type === "packageType") {
      newObj.packageType = e.target.value;
    } else if (type === "contractStatus") {
      newObj.contractStatus = e.target.value;
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
    var transporterId = itemSelectAdd[0].transporterId;
    var packageType = document.getElementById("add-header-packageType").value;
    var refDocNo = document.getElementById("add-header-refDoc").value;
    var startDate = document.getElementById("add-header-dateStart").value;
    var endDate = document.getElementById("add-header-dateEnd").value;

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
      packageType,
      refDocNo,
      contractStatus,
      startDate,
      endDate,

      createBy,
    ];

    var newArrCustomShipTo = [];
    headCustomShipTo.map((item) => {
      console.log("ShipToitem", item);
      var newObj = {
        shipToId: null,
        customfee: 0.0,
        customfee2: 0.0,
      };
      newObj.shipToId = item.shipToId;
      newObj.customfee = parseFloat(item.customFee);
      newObj.customfee2 = parseFloat(item.customFee2);

      newArrCustomShipTo.push(newObj);
    });

    console.log("newArrHeader", newArrHeader);

    console.log("newArrCustomShipTo", newArrCustomShipTo);
    setTypeShowSuccess("Add");
    fnInsertData(newArrHeader, newArrCustomShipTo);
  };
  const onClickCloneData = () => {
    setIsConfirmSaveClone(!isConfirmSaveClone);
    var contractNo = document.getElementById("clone-header-contractNo").value;
    var transporterId = itemSelectAdd[0].transporterId;
    var packageType = document.getElementById("clone-header-packageType").value;
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
      packageType,
      refDocNo,
      contractStatus,
      startDate,
      endDate,
      createBy,
    ];

    var newArrCustomShipTo = [];
    headCustomShipTo.map((item) => {
      var newObj = {
        shipToId: null,
        customfee: 0.0,
        customfee2: 0.0,
      };
      newObj.shipToId = item.shipToId;
      newObj.customfee = parseFloat(item.customFee);
      newObj.customfee2 = parseFloat(item.customFee2);
      newArrCustomShipTo.push(newObj);
    });
    setTypeShowSuccess("Clone");
    fnInsertData(newArrHeader, newArrCustomShipTo);
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
    } else if (type === "packageType") {
      newObj.packageType = e.target.value;
    } else if (type === "contractStatus") {
      newObj.contractStatus = e.target.value;
    }

    setCloneData(newObj);
  };
  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var arrObj = [...itemSelectEdit];
    var transporterId = arrObj[0].transporterId;
    var contractStatus = document.getElementById(
      "edit-header-contractStatus"
    ).value;
    var packageType = document.getElementById("edit-header-packageType").value;

    var newArrCustomShipTo = [];
    headCustomShipTo.map((item) => {
      var newObj = {
        shipToId: null,
        customfee: 0.0,
        customfee2: 0.0,
      };
      newObj.shipToId = item.shipToId;
      newObj.customfee = parseFloat(item.customFee);
      newObj.customfee2 = parseFloat(item.customFee2);
      newArrCustomShipTo.push(newObj);
    });

    var newObj = { ...editData };

    newObj.transporterId = transporterId;
    newObj.packageType = packageType;
    newObj.contractStatus = contractStatus;
    newObj.mcontractEpzshipTos = [...newArrCustomShipTo];
    newObj.updateBy = parseInt(localStorage.getItem("userId"));
    console.log(newObj);
    setTypeShowSuccess("Edit");
    fnUpdateData(newObj);
  };

  const otherTables = (type, item) => {
    if (type === "edit" && shipTo.length > 0) {
      if (
        !isGetDatainCalValue &&
        Object.keys(editData).length &&
        placeContrainer.length &&
        shipTo.length
      ) {
        var newObj = { ...editData };
        var newArr = [];

        newArr = [];
        newObj.mcontractEpzshipTos.map((item) => {
          console.log('item', item)
          var obj = {
            shipToId: null,
            shipToNameThai: "",
            shipToCode: "",
            customFee: 0.0,
            customFee2: 0.0,
          };
          obj.shipToId = item.shipToId;
          var newShipTo = shipTo.find((x) => x.shipToId === item.shipToId);
          console.log('shipTo', shipTo)
          console.log("newShipTo", newShipTo);
          obj.shipToNameThai = newShipTo.shipToNameThai;
          obj.shipToCode =
            "[" + newShipTo.shipToCode + "]" + " " + newShipTo.shipToNameThai;
          obj.customFee = item.customFee;
          obj.customFee2 = item.customFee2;

          newArr.push(obj);
        });
        setheadCustomShipTo(newArr);

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
                  label="Customer Ship To"
                  {...a11yProps(0)}
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
                      FShipTo,
                      item.mcontractExportLclairplaceContainerReturns
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
        shipTo.length &&
        transporterList.length &&
        packageType.length &&
        contractStatus.length
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
                    label="Customer Ship To"
                    {...a11yProps(0)}
                  />
                  {/* <Tab
                    style={{ outline: "none" }}
                    label="ShippingSP"
                    {...a11yProps(1)}
                  /> */}
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {type === "add"
                    ? formCustomerShipTo()
                    : type === "edit"
                      ? formCustomerShipTo()
                      : null}
                </TabPanel>
                {/* <TabPanel value={value} index={1} dir={theme.direction}>
                  {type === "add"
                    ? formShippingSP()
                    : type === "edit"
                    ? formShippingSP()
                    : null}
                // </TabPanel> */}
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
                    <CLabel htmlFor="name">ประเภทแพ็คเกจ</CLabel>
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
                        id="in-search-PackageType"
                        onChange={handleChangSearch("PackageType")}
                      >
                        <option selected hidden value="">
                          {Constant.txtformPlaceholderSelected}
                        </option>

                        {packageType.map((cb) => (
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
    } else if (transporterList.length && packageType.length && shipTo.length) {
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
                        <CCol xs="12" sm="6" md="4">
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
                        <CCol xs="12" sm="6" md="4">
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
                          <CCol xs="12" sm="6" md="4">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">ประเภทแพ็คเกจ</CLabel>
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
                                    id="add-header-packageType"
                                    required
                                  >
                                    <option selected hidden value="">
                                      เลือกประแพ็คเกจ
                                    </option>
                                    {packageType.map((cb) => (
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

                          <CCol xs="12" sm="6" md="4">
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
                          <CCol xs="12" sm="6" md="4">
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
                        <CCol xs="12" sm="6" md="4">
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
          var packageTypeValue =
            newObj.packageType !== null ? newObj.packageType : null;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;

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
                        <CCol xs="12" sm="6" md="4">
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
                                disabled={isLinkData}
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
                        <CCol xs="12" sm="6" md="4">
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
                        <CCol xs="12" sm="6" md="4">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">ประเภทแพ็คเกจ</CLabel>
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
                                  onChange={handleChangeEditForm("packageType")}
                                  id="edit-header-packageType"
                                  value={packageTypeValue}
                                  required
                                  disabled={isLinkData}
                                >
                                  <option selected hidden value="">
                                    เลือกประแพ็คเกจ
                                  </option>
                                  {packageType.map((cb) => (
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

                        <CCol xs="12" sm="6" md="4">
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
                                disabled={isLinkData}
                              />
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4">
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
                                  disabled={isLinkData}
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
                                  disabled={isLinkData}
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
          var packageTypeValue =
            newObj.packageType !== null ? newObj.packageType : null;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;

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
                              <CLabel htmlFor="name">ประเภทแพ็คเกจ</CLabel>
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
                                    "packageType"
                                  )}
                                  id="clone-header-packageType"
                                  value={packageTypeValue}
                                  required
                                >
                                  <option selected hidden value="">
                                    เลือกประแพ็คเกจ
                                  </option>
                                  {packageType.map((cb) => (
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

  const formCustomerShipTo = () => {
    return (
      <div className="font-form-scg">
        <CForm className="formCustomerShipTo-need-validation">
          <CRow>
            <CCol xs="12" sm="6" md="4">
              <CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Ship To</CLabel>
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
                      onChange={handleChangSelect("ShipTo")}
                      // id="header-LiftOff-CYPlace"
                      options={shipTo}
                      style={{ fontFamily: "Scg" }}
                      size="small"
                      getOptionLabel={(option) =>
                        "[" + option.shipToCode + "] " + option.shipToNameThai
                      }
                      renderOption={(option) => {
                        return (
                          <Typography
                            className={classes.comboOptions}
                            value={option.placeContainerReturnId}
                          >
                            {`[${option.shipToCode}]` +
                              "  " +
                              option.shipToNameThai}
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
                      disabled={isLinkData}
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
                <CLabel htmlFor="name">Custom Fee</CLabel>
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
                    onChange={handleChangAddCustomeShipTo()}
                    type="number"
                    id="header-shipTo-customfee"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    required
                    disabled={isLinkData}
                  />
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>{" "}
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel htmlFor="name">Custom Fee 2</CLabel>
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
                    onChange={handleChangAddCustomeShipTo()}
                    type="number"
                    id="header-shipTo-customfee2"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    required
                    disabled={isLinkData}
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
                  className="editbutton"
                  size={Constant.btAddSize}
                  color="success"
                  block
                  onClick={onClickAddShipTo}
                  disabled={isLinkData}
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
            items={headCustomShipTo}
            fields={FShipTo}
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
                      onClick={onClickRemoveRecordAddData("ShipTo", index)}
                      disabled={isLinkData}
                    >
                      {Constant.btDeleteData}
                    </CButton>
                  </td>
                );
              },
              customFee: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.customFee}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "customFee",
                        index
                      )}
                    disabled={isLinkData}
                    />
                  </td>
                );
              },
              customFee2: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      value={item.customFee2}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "customFee2",
                        index
                      )}
                    disabled={isLinkData}
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
                        ${!headCustomShipTo.length ? "Custom Ship To" : ""}
                               
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
                  : typeShowSuccess === "Clone"
                    ? Constant.contentSuccessCloneData
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
    VariableController.linkShipmentNo = newObj.shipmentNo;
    VariableController.linkDeliveryNo = newObj.deliveryNo;
    VariableController.linkArrContractData = newObj.arrContractData;
    history.goBack();
  };

  const onClickDeleteData = () => {
    setTypeShowSuccess("Delete");
    setIsConfirmDelete(!isConfirmDelete);
    // console.log(contractId);
    fnDeleteData(indexEditForm);
  };
  const onClickThenShowSuccesss = () => {
    setTypeShowSuccess("");
    setIsShowSuccess(!isShowSuccess);
    window.location.reload(false);
  };

  const fnInsertData = (newArrHeader, newArrCustomShipTo) => {
    setIsPostingData(true);
    Repository.fetchAddContractEPZList(newArrHeader, newArrCustomShipTo).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
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
    Repository.fetchEditEPZList(objData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
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
    Repository.fetchRemoveContractEPZList(index).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
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

  const fnGetcontractEPZBySearch = (arr) => {
    setIsPostingData(true);
    Repository.fetchGetEPZListForSearch(arr).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          console.log(result.data);
          result.data.map((x) => {
            x.startDateCovert = new Date(x.startDate).toLocaleString();
            x.endDateCovert = new Date(x.endDate).toLocaleString();

            console.log(x.deliveryName);
          });

          SetcontractEPZ(result.data);
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

    setEditData([]);

    Repository.fetchGetContractEPZListById(index).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          console.log(result.data.headerList); // // setGetShipTo(result.data.shipToList);
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

  const fnGetContractExportTruckForSearchList = () => {
    Repository.fetchGetEPZListForSearchData().then(
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
      VariableController.linkDeliveryNo !== null
    ) {
      
      var newObj = {
        shipmentNo: VariableController.linkShipmentNo,
        deliveryNo: VariableController.linkDeliveryNo,
        contractId: VariableController.linkContractId,
        arrContractData: VariableController.linkArrContractData,
      };
      setLinkData(newObj);
      setIsLinkData(true);
      setIsLoaded(true);
      fnGetDataForEdit(VariableController.linkContractId);
      initeState();
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
                        {Constant.txtMasterContactEPZ}
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
