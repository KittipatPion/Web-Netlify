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
      color="red"
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
    label: "Place Container Return",
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
    label: "Place Container Return",
  },
];

const FEXTransportRate = [
  {
    key: "fuelFrom",
    label: "ค่าเชื้อเพลิงเริ่มต้น",
  },
  {
    key: "fuelTo",
    label: "ค่าเชื้อเพลิงสิ้นสุด",
  },
  {
    key: "size20Ship1Price",
    label: "ค่าหัวลากตู้20'(บาทต่อตู้)",
  },
  {
    key: "size40Ship1Price",
    label: "ค่าหัวลากตู้40'(บาทต่อตู้)",
  },
];

const FCustom = [
  {
    key: "customTypeId",
    label: "customType",
  },
  {
    key: "customValue1",
    label: "ราคา Value1",
  },
  {
    key: "customValue2",
    label: "ราคา Value2",
  },
  {
    key: "customPrice",
    label: "ราคา",
  },
];

const FLiftOn = [
  {
    key: "contrainerSize",
    label: "ขนาดตู้คอนเทนเนอร์",
  },
  {
    key: "cyplaceNameThai",
    label: "CY Place",
  },
  {
    key: "liftOnPrice",
    label: "ค่ายกตู้เปล่า(Lift On)",
  },
  {
    key: "yardPassPrice",
    label: "ค่าผ่านลานรับตู้เปล่า",
  },
  // {
  //   key: "weighingPrice",
  //   label: "ค่าชั่งน้ำหนัก",
  // },
  {
    key: "receiveContrainerPrice",
    label: "ค่าต่อระยะรับตู้เปล่า",
  },
];

const FLiftOff = [
  {
    key: "contrainerSize",
    label: "ขนาดตู้คอนเทนเนอร์",
  },
  {
    key: "placeContainerReturnNameThai",
    label: "Place Container Return",
  },
  {
    key: "liftOffPrice",
    label: "ค่ายกตู้หนัก(Lift Off)",
  },
  {
    key: "passengerFeePrice",
    label: "ค่าผ่านท่า(ตู้หนัก)",
  },
  {
    key: "weighingPrice",
    label: "ค่าชั่งน้ำหนัก(ตู้หนัก)",
  },
  {
    key: "returnContrainerPrice",
    label: "ค่าต่อระยะคืนตู้หนัก",
  },
];

const FLiftOffManage = [...FLiftOff];
FLiftOffManage.push({
  key: "manage",
  label: "",
  _style: { width: "10%" },
  sorter: false,
  filter: false,
});

const FLiftOnManage = [...FLiftOn];
FLiftOnManage.push({
  key: "manage",
  label: "",
  _style: { width: "10%" },
  sorter: false,
  filter: false,
});

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
    label: "Vender Name",
  },
  {
    key: "packageType",
    label: "ประเภทแพ็คเกจ",
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

const ExportVessel = () => {
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
  const [exportVSList, SetExportVSList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [source, setSource] = useState([]);

  const [details, setDetails] = useState([]);

  const [validatecheck, setvalidatecheck] = useState("");
  const [validAlert, setValidAlert] = useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);
  const [headerinput, setheaderInput] = useState([]);
  const [headerInputLiftOn, setheaderInputLiftOn] = useState([]);
  const [textEmtry, setTextEmtry] = useState(false);

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
  const [cbport, setPortList] = useState([]);
  const [customType, setCustomType] = useState([]);
  const [fullYearList, setFullYearList] = useState([]);
  const [placeContrainer, setPlaceContainerReturn] = useState([]);
  const [containerSize, setContainerSize] = useState([]);
  const [cbcustomBy, setCbCustomBy] = useState([]);
  //

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const pageCode = "/mstcontexpv";

  const _UserAuthen = localStorage.getItem("authenName");
  const _UserId = parseInt(localStorage.getItem("userId"));
  const _Username = localStorage.getItem("username");
  const _TranspoterId = parseInt(localStorage.getItem("transporterId"));

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
  const [calTransportRateList, setCalTransportRateList] = useState([]);
  const [fuelRateMinEnd, setFuelRateMinEnd] = useState(0.0);
  const [calMultiDropRateList, setCalMultiDropRateList] = useState([]);
  const [calOverNightRateList, setCalOverNightRateList] = useState([]);
  const [provinceThaiList, setProvinceThaiList] = useState([]);
  const [provinceOverNightList, setProvinceOverNightList] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [cyplacechoose, setCyplaceChoose] = useState([]);
  const [containerSizeLiftOffChoose, setContainerSizeLiftOffChoose] = useState(
    []
  );
  const [containerSizeLiftOnChoose, setContainerSizeLiftOnChoose] = useState(
    []
  );
  const [placeContrainerSelect, setPlaceContrainerSelect] = useState([]);
  const [headliffoff, setHeadLiftOff] = useState([]);
  const [headlifton, setHeadLiftOn] = useState([]);
  const [customList, setCustomList] = useState([]);
  const [linkData, setLinkData] = useState({});
  const [isLinkData, setIsLinkData] = useState(false);
  const [itemSelectEdit, setItemSelectEdit] = useState([{}, {}, {}]);
  const [itemSelectAdd, setItemSelectAdd] = useState([{}, {}, {}]);
  const [itemSelectOther, setItemSelectOther] = useState([{}, {}]);
  const [itemSelectSearchheader, setItemSelectSearchheader] = useState([
    {},
    {},
  ]);
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
  const [itemShipToAdd, setItemShipToAdd] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  const [multiDropRateMinEnd, setMultiDropRateMinEnd] = useState(0);
  const [arrTrue, setArrTrue] = useState(false);
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
  ]);
  const [invalidMaterialFormEdit, setInvalidMaterialFormEdit] = useState([
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
  const [isNotAuthorized, setIsNotAuthorized] = useState(false);
  const history = useHistory();

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
      // console.log(20000);
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
      PackageType: "",
      RefDocNo: "",
    };

    // console.log(document.getElementById("in-search-StartDate").value);
    // console.log(document.getElementById("in-search-EndDate").value);

    obj.StartDate = document.getElementById("in-search-StartDate").value;
    obj.EndDate = document.getElementById("in-search-EndDate").value;
    obj.Years = document.getElementById("search-header-year").value;
    obj.ContractStatus = document.getElementById(
      "in-search-ContractStatus"
    ).value;

    // obj.TransporterId = itemSelectSearchheader[0].transporterId;

    obj.ContractNo = document.getElementById("in-search-ContractNo").value;

    // obj.SourceId = itemSelectSearchheader[1].sourceId;

    obj.PackageType = document.getElementById("in-search-PackageType").value;
    obj.RefDocNo = document.getElementById("in-search-RefDocNo").value;
    if (type == "Years") {
      handleChangeContractYear();
    }

    console.log(obj);

    setSearchData(obj);
  };

  const handleChangSelect = (type) => (e, value) => {
    // console.log(value);

    if (type === "Search-TransporterId") {
      if (value) {
        var newArr = [...itemSelectSearchheader];

        var obj = {
          transporterId: null,
        };
        obj.transporterId = value.transporterId;

        newArr[0] = obj;

        setItemSelectSearchheader(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemSelectSearchheader];
        newArr[0] = {};

        setItemSelectSearchheader(newArr);
      }
    }

    if (type === "Search-SourceId") {
      if (value) {
        var newArr = [...itemSelectSearchheader];

        var obj = {
          sourceId: null,
        };
        obj.sourceId = value.sourceId;

        newArr[1] = obj;

        setItemSelectSearchheader(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemSelectSearchheader];
        newArr[1] = {};

        setItemSelectSearchheader(newArr);
      }
    }

    if (type === "CYPlace") {
      if (value) {
        var newArr = [...cyplacechoose];

        var obj = {
          cyplaceId: null,
          cyplaceNameThai: "",
        };
        obj.cyplaceId = value.cyplaceId;
        obj.cyplaceNameThai = value.cyplaceNameThai;
        newArr[0] = obj;

        setCyplaceChoose(newArr);
        // console.log(newArr);
      } else {
        var newArr = [...cyplacechoose];
        newArr[0] = {};

        setCyplaceChoose(newArr);
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
        // console.log(newArr);
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
        // console.log(newArr);
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
        // console.log(placeContrainerSelect);
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
      // console.log(placeContrainerSelect);
    }
  };

  const handleChangAdd = (type) => (e, value, name) => {
    var obj = {
      contrainerSize: "",
      placeContainerId: null,
      placeContainerReturnNameThai: "",
      liftOffPrice: 0.0,
      passengerFeePrice: 0.0,
      weighingPrice: 0.0,
      returnContrainerPrice: 0.0,
    };

    if (type === "liftOffPrice") {
      if (value) {
        var newArr = [...itemShipToAdd];

        var obj = {
          liftOffPrice: null,
        };
        obj.liftOffPrice = name.value;

        newArr[3] = obj;

        setItemShipToAdd(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemShipToAdd];
        newArr[3] = {};

        setItemShipToAdd(newArr);
      }
    }
    if (type === "passengerFeePrice") {
      if (value) {
        var newArr = [...itemShipToAdd];

        var obj = {
          passengerFeePrice: null,
        };
        obj.passengerFeePrice = name.value;

        newArr[4] = obj;

        setItemShipToAdd(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemShipToAdd];
        newArr[4] = {};

        setItemShipToAdd(newArr);
      }
    }

    if (type === "weighingPrice") {
      if (value) {
        var newArr = [...itemShipToAdd];

        var obj = {
          weighingPrice: null,
        };
        obj.weighingPrice = name.value;

        newArr[5] = obj;

        setItemShipToAdd(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemShipToAdd];
        newArr[5] = {};

        setItemShipToAdd(newArr);
      }
    }

    if (type === "returnContrainerPrice") {
      if (value) {
        var newArr = [...itemShipToAdd];

        var obj = {
          returnContrainerPrice: null,
        };
        obj.returnContrainerPrice = name.value;

        newArr[6] = obj;

        setItemShipToAdd(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemShipToAdd];
        newArr[6] = {};

        setItemShipToAdd(newArr);
      }
    }

    // obj.liftOffPrice = document.getElementById(
    //   "header-LiftOff-liftOffPrice"
    // ).value;
    // obj.passengerFeePrice = document.getElementById(
    //   "header-LiftOff-passengerFeePrice"
    // ).value;
    // obj.weighingPrice = document.getElementById(
    //   "header-LiftOff-weighingPrice"
    // ).value;
    // obj.returnContrainerPrice = document.getElementById(
    //   "header-LiftOff-returnContrainerPrice"
    // ).value;
    // console.log(obj);

    // setheaderInput(obj);
    // console.log(headerinput);
  };

  const handleChangAddLiftOn = (type) => (e, value, name) => {
    var newArr = [];
    var obj = {
      contrainerSize: "",
      cyplaceId: null,
      cyplaceNameThai: null,
      liftOnPrice: null,
      yardPassPrice: null,
      receiveContrainerPrice: null,
    };

    if (type === "liftOnPrice") {
      if (value) {
        var newArr = [...itemShipToAdd];

        var obj = {
          liftOnPrice: null,
        };
        obj.liftOnPrice = name.value;

        newArr[0] = obj;

        setItemShipToAdd(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemShipToAdd];
        newArr[0] = {};

        setItemShipToAdd(newArr);
      }
    }

    if (type === "yardPassPrice") {
      if (value) {
        var newArr = [...itemShipToAdd];

        var obj = {
          yardPassPrice: null,
        };
        obj.yardPassPrice = name.value;

        newArr[1] = obj;

        setItemShipToAdd(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemShipToAdd];
        newArr[1] = {};

        setItemShipToAdd(newArr);
      }
    }

    if (type === "receiveContrainerPrice") {
      if (value) {
        var newArr = [...itemShipToAdd];

        var obj = {
          receiveContrainerPrice: null,
        };
        obj.receiveContrainerPrice = name.value;

        newArr[2] = obj;

        setItemShipToAdd(newArr);
        console.log(newArr);
      } else {
        var newArr = [...itemShipToAdd];
        newArr[2] = {};

        setItemShipToAdd(newArr);
      }
    }

    // if (type === "liftOnPrice") {
    //   obj.liftOnPrice = name.value;
    // } else if (type === "yardPassPrice") {
    //   obj.yardPassPrice = name.value;
    // } else if (type === "receiveContrainerPrice") {
    //   obj.receiveContrainerPrice = name.value;
    // }

    // setheaderInputLiftOn(obj);
    // console.log(name.value);
  };

  const onClickValidSearch = () => {
    var contracStartDate = document.getElementById("in-search-StartDate").value;
    var contractEndDate = document.getElementById("in-search-EndDate").value;
    var contractYear = parseInt(
      document.getElementById("search-header-year").value
    );
    // console.log(contractYear);
    if (
      contracStartDate === "" &&
      contractEndDate === "" &&
      isNaN(contractYear)
    ) {
      if (!getIsValidForm("search-header-need-validation")) {
        setTextEmtry(true);

        if (Object.keys(data).length) {
          setData([]);
        }
      }
    } else {
      setNoValidateForm("search-header-need-validation");
      setTextEmtry(false);
      // console.log(searchData);
      var newArr = [];

      var obj = {
        StartDate: null,
        EndDate: null,
        Years: null,
        ContractStatus: "",
        TransporterId: null,
        ContractNo: "",
        SourceId: null,
        PackageType: "",
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

      obj.PackageType = document.getElementById("in-search-PackageType").value;
      obj.RefDocNo = document.getElementById("in-search-RefDocNo").value;
      if (obj.Years) {
        handleChangeContractYear();
      }
      // newObj.StartDate = x.StartDate
      // newObj.EndDate = x.EndDate
      // newObj.Years = x.Years
      // newObj.ContractStatus = x.ContractStatus
      // newObj.TransporterId = itemSelectSearchheader[0].transporterId  === null ? null : itemSelectSearchheader[0].transporterId
      // newObj.ContractNo = x.ContractNo
      // newObj.SourceId = itemSelectSearchheader[1].sourceId === null ? null : itemSelectSearchheader[1].sourceId
      // newObj.PackageType = x.PackageType
      // newObj.RefDocNo = x.RefDocNo;
      // newArr.push(newObj);
      // x.transporterId = itemSelectSearchheader[0].transporterId
      // x.sourceId = itemSelectSearchheader[1].sourceId

      clickSearch(obj);
    }
  };

  const clickSearch = (arr) => {
    // console.log(arr);
    fnGetExportVesselListBySearch(arr);
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

  const onClickClearHeader = () => {
    document.getElementById("header-contractNo").value = "";
    document.getElementById("header-packagetypeId").selectedIndex = 0;

    document.getElementById("header-fueltypeId").selectedIndex = 0;

    document.getElementById("header-refDoc").value = "";
    document.getElementById("header-dateStart").value = "";
    document.getElementById("header-dateEnd").value = "";
    document.getElementById("header-contractStatus").value = "";
    parseInt(localStorage.getItem("userId"));
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
    var result = exportVSList.find((x) => x.contractId === indexEditForm);
    // setDataC(result)
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

  const redStart = () => {
    return (
      <CLabel show="false" style={{ color: "red" }}>
        **
      </CLabel>
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
    var value = e.target.value;
    // value = (value + 0.01).toFixed(2);
    if (type === "fuel-rate") {
      // value = parseFloat(e.target.value).toFixed(2);
      // setFuelRateMinEnd(parseFloat(value));
      setFuelRateMinEnd(value);
    }
  };

  const handleChangeUpdateField = (type, index) => (e, value, name) => {
    if (type === "Size20-Ship") {
      var newArr = [...calTransportRateList];
      if (name.value !== "") {
        // if (name.value > 1) {
        //   name.value = name.value
        // }
        newArr[index].size20Ship1Price = name.value;
      } else {
        newArr[index].size20Ship1Price = 0;
      }
      setCalTransportRateList(newArr);
    }
    if (type === "Size40-Ship") {
      var newArr = [...calTransportRateList];
      if (name.value !== "") {
        // if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
        //   e.target.value = e.target.value.substring(1);
        // }
        newArr[index].size40Ship1Price = name.value;
      } else {
        newArr[index].size40Ship1Price = 0;
      }
      setCalTransportRateList(newArr);
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
    if (type === "LiftOff") {
      var newArr = [...headliffoff];
      newArr.splice(index, 1);
      setHeadLiftOff(newArr);
    }
    if (type === "LiftOn") {
      var newArr = [...headlifton];
      newArr.splice(index, 1);
      setHeadLiftOn(newArr);
    }
  };

  const onClickCalFuelRate = () => {
    if (getIsValidForm("fuel-need-validation")) {
      var size20Ship1Price = parseFloat(
        document.getElementById("transportRate-ship20").value
      );
      var size40Ship1Price = parseFloat(
        document.getElementById("transportRate-ship40").value
      );
      var startValue = parseFloat(document.getElementById("fuel-start").value);
      var endValue = parseFloat(document.getElementById("fuel-end").value);
      var priceValue = parseFloat(document.getElementById("fuel-price").value);
      var priceValue40 = parseFloat(
        document.getElementById("fuel-price-40").value
      );
      var newArr = [];
      var rangeBase = endValue - startValue;
      var rangeValue = startValue % 1;
      rangeValue = parseFloat(rangeValue.toFixed(2));
      var addRunning = 0.01;
      var minLength = startValue % 1;
      minLength = parseFloat(minLength.toFixed(2));
      var maxLength = 50;
      var priceStart = 0;
      var priceStart40 = 0;

      var isIntegerStart = startValue % 1;
      isIntegerStart = parseFloat(isIntegerStart.toFixed(2));
      var isIntegerEnd = endValue % 1;
      isIntegerEnd = parseFloat(isIntegerEnd.toFixed(2));
      var count = startValue;

      while (count - (rangeBase + addRunning) >= minLength) {
        priceStart -= priceValue;
        priceStart40 -= priceValue40;
        count -= rangeBase + addRunning;
        count = parseFloat(count.toFixed(2));
        // console.log(count);
      }

      while (count <= maxLength) {
        var obj = {
          fuelFrom: 0.0,
          fuelTo: 0.0,
          seqRate: 0.0,
          seqRate40: 0.0,
          size20Ship1Price: 0.0,
          size40Ship1Price: 0.0,
        };
        obj.fuelFrom = parseFloat(count.toFixed(2));
        obj.fuelTo = parseFloat((count + rangeBase).toFixed(2));
        obj.seqRate = parseFloat(priceStart.toFixed(2));
        obj.seqRate40 = parseFloat(priceStart40.toFixed(2));
        obj.size20Ship1Price = parseFloat(
          (size20Ship1Price + obj.seqRate).toFixed(2)
        );
        obj.size40Ship1Price = parseFloat(
          (size40Ship1Price + obj.seqRate40).toFixed(2)
        );
        newArr.push(obj);
        count += rangeBase + addRunning;
        priceStart += priceValue;
        priceStart40 += priceValue40;
      }
      // console.log(newArr);
      setCalTransportRateList(newArr);

      document.getElementById("fuel-start").value = "";
      document.getElementById("fuel-end").value = "";
      document.getElementById("fuel-price").value = "";
      document.getElementById("fuel-price-40").value = "";
      document.getElementById("transportRate-ship20").value = "";
      document.getElementById("transportRate-ship40").value = "";
      setFuelRateMinEnd(0);
      setNoValidateForm("fuel-need-validation");
    } else {
      setCalTransportRateList([]);
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
    var arrInvalid = [...invalidMaterialFormOther1];
    var arrInvalid1 = [...invalidMaterialFormOther4];
    var check = headliffoff.find(
      (x) =>
        x.placeContainerReturnId ===
        placeContrainerSelect[0].placeContainerReturnId
    );
    var check1 = headliffoff.find(
      (x) => x.contrainerSize === containerSizeLiftOffChoose[0].containerSize
    );
    var check2 = headliffoff.find(
      (x) =>
        x.contrainerSize === containerSizeLiftOffChoose[0].containerSize &&
        x.placeContainerReturnId ===
          placeContrainerSelect[0].placeContainerReturnId
    );

    if ((!check && !check1) || !check2) {
      if (
        getIsValidForm("LiftOff-need-validation") &&
        Object.keys(placeContrainerSelect).length &&
        Object.keys(containerSizeLiftOffChoose).length
      ) {
        arrInvalid[0] = false;
        setInvalidMaterialFormOther(arrInvalid);

        // console.log(headerinput)
        var incontrainerSize = containerSizeLiftOffChoose[0].containerSize;
        var inplaceContainerReturnId =
          placeContrainerSelect[0].placeContainerReturnId;
        var inplaceContainerReturnNameThai =
          placeContrainerSelect[0].placeContainerReturnNameThai;
        var inliftOffPrice =
          itemShipToAdd[3].liftOffPrice === null
            ? 0
            : itemShipToAdd[3].liftOffPrice;
        var inpassengerFeePrice =
          itemShipToAdd[4].passengerFeePrice === null
            ? 0
            : itemShipToAdd[4].passengerFeePrice;
        var inweighingPrice =
          itemShipToAdd[5].weighingPrice === null
            ? 0
            : itemShipToAdd[5].weighingPrice;
        var inreturnContrainerPrice =
          itemShipToAdd[6].returnContrainerPrice === null
            ? 0
            : itemShipToAdd[6].returnContrainerPrice;
        var obj = {
          contrainerSize: "",
          placeContainerReturnId: null,
          placeContainerReturnNameThai: null,
          liftOffPrice: 0.0,
          passengerFeePrice: 0.0,
          weighingPrice: 0.0,
          returnContrainerPrice: 0.0,
        };
        var newArr = [];
        if (headliffoff.length) {
          newArr = [...headliffoff];
        }
        obj.contrainerSize = incontrainerSize;
        obj.placeContainerReturnId = inplaceContainerReturnId;
        obj.placeContainerReturnNameThai = inplaceContainerReturnNameThai;
        obj.liftOffPrice = inliftOffPrice;
        obj.passengerFeePrice = inpassengerFeePrice;
        obj.weighingPrice = inweighingPrice;
        obj.returnContrainerPrice = inreturnContrainerPrice;
        newArr.push(obj);
        setHeadLiftOff(newArr);

        document.getElementById("header-LiftOff-liftOffPrice").value = "";
        document.getElementById("header-LiftOff-passengerFeePrice").value = "";
        document.getElementById("header-LiftOff-weighingPrice").value = "";
        document.getElementById("header-LiftOff-returnContrainerPrice").value =
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
        setInvalidMaterialFormOther1(arrInvalid);
        setInvalidMaterialFormOther4(arrInvalid1);
      }

      // setProvinceOvNSelection(newArr);

      // document.getElementById("overnight-province").selectedIndex = 0;
      // document.getElementById("overnight-price").value = "";
    }
  };

  const onClickAddLiftOn = () => {
    var arrInvalid = [...invalidMaterialFormOther];
    var arrInvalid1 = [...invalidMaterialFormOther3];
    var check = headlifton.find(
      (x) => x.cyplaceId === cyplacechoose[0].cyplaceId
    );
    var check1 = headlifton.find(
      (x) => x.contrainerSize === containerSizeLiftOnChoose[0].containerSize
    );
    var check2 = headlifton.find(
      (x) =>
        x.contrainerSize === containerSizeLiftOnChoose[0].containerSize &&
        x.cyplaceId === cyplacechoose[0].cyplaceId
    );

    if ((!check && !check1) || !check2) {
      if (
        getIsValidForm("formLiffOn-need-validation") &&
        Object.keys(cyplacechoose).length &&
        Object.keys(containerSizeLiftOnChoose).length
      ) {
        arrInvalid[0] = false;
        setInvalidMaterialFormOther1(arrInvalid);

        var incontanerSize = containerSizeLiftOnChoose[0].containerSize;
        var incyplaceId = cyplacechoose[0].cyplaceId;
        var incyplaceNameThai = cyplacechoose[0].cyplaceNameThai;
        var inliftOnPrice =
          itemShipToAdd[0].liftOnPrice === null
            ? 0
            : itemShipToAdd[0].liftOnPrice;
        var inyardPassPrice =
          itemShipToAdd[1].yardPassPrice === null
            ? 0
            : itemShipToAdd[1].yardPassPrice;
        var inreceiveContrainerPrice =
          itemShipToAdd[2].receiveContrainerPrice === null
            ? 0
            : itemShipToAdd[2].receiveContrainerPrice;
        var obj = {
          contrainerSize: "",
          cyplaceId: null,
          cyplaceNameThai: "",
          liftOnPrice: null,
          yardPassPrice: null,
          receiveContrainerPrice: null,
        };
        var newArr = [];
        if (headlifton.length) {
          newArr = [...headlifton];
        }
        obj.contrainerSize = incontanerSize;
        obj.cyplaceId = incyplaceId;
        obj.cyplaceNameThai = incyplaceNameThai;
        obj.liftOnPrice = inliftOnPrice;
        obj.yardPassPrice = inyardPassPrice;
        obj.receiveContrainerPrice = inreceiveContrainerPrice;
        newArr.push(obj);
        // console.log(obj)
        setHeadLiftOn(newArr);

        document.getElementById("header-liftOn-liftOnPrice").value = "";
        document.getElementById("header-liftOn-yardPassPrice").value = "";
        document.getElementById("header-liftOn-receiveContrainerPrice").value =
          "";
        setNoValidateForm("formLiffOn-need-validation");
      } else {
        if (!Object.keys(placeContrainerSelect).length) {
          arrInvalid[0] = true;
        } else {
          arrInvalid[0] = false;
        }
        if (!Object.keys(containerSizeLiftOnChoose).length) {
          arrInvalid1[0] = true;
        } else {
          arrInvalid1[0] = false;
        }
        setInvalidMaterialFormOther(arrInvalid);
        setInvalidMaterialFormOther3(arrInvalid1);
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
    setCalTransportRateList([]);
    setCalMultiDropRateList([]);
    setCalOverNightRateList([]);
    setInTransportRate([]);
    setHeadLiftOff([]);
    setHeadLiftOn([]);
    setInPort([]);
    setInUnloadRate([]);
  };

  const onClickClearDataForSearch = () => {
    setArrTrue(true);
    document.getElementById("in-search-ContractNo").value = "";
    // document.getElementById("in-search-SourceId").value = -1
    // document.getElementById("in-search-TransporterId").value = null

    document.getElementById("in-search-PackageType").selectedIndex = 0;

    document.getElementById("in-search-RefDocNo").value = "";

    document.getElementById("in-search-StartDate").value = "";

    document.getElementById("search-header-year").value = "";

    document.getElementById("in-search-EndDate").value = "";

    document.getElementById("in-search-ContractStatus").selectedIndex = 0;
  };

  const onClickCheckFormAddData = () => {
    var arrObj = [...itemSelectAdd];
    var contractStatus = document.getElementById("header-contractStatus").value;
    if (
      getIsValidForm("add-header-need-validation") &&
      Object.keys(arrObj[0]).length &&
      Object.keys(arrObj[1]).length
    ) {
      setInvalidMaterialFormAdd([false, false, false]);
      if (InPort.length) {
        if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
          if (
            calTransportRateList.length &&
            headliffoff.length &&
            headlifton.length
          ) {
            setIsConfirmSave(!isConfirmSave);
          } else {
            if (
              calTransportRateList.length &&
              !headliffoff.length &&
              !headlifton.length
            ) {
              setIsConfirmSave(!isConfirmSave);
            } else if (
              !calTransportRateList.length &&
              headliffoff.length &&
              headlifton.length
            ) {
              setIsConfirmSave(!isConfirmSave);
            } else {
              setIsWarningInputForm(!isWarningInputForm);
            }
          }
        } else if (contractStatus !== "Active") {
          if (
            calTransportRateList.length &&
            headliffoff.length &&
            headlifton.length
          ) {
            setIsConfirmSave(!isConfirmSave);
          } else {
            if (
              calTransportRateList.length &&
              !headliffoff.length &&
              !headlifton.length
            ) {
              setIsConfirmSave(!isConfirmSave);
            } else if (
              !calTransportRateList.length &&
              headliffoff.length &&
              headlifton.length
            ) {
              setIsConfirmSave(!isConfirmSave);
            } else {
              setIsWarningInputForm(!isWarningInputForm);
            }
          }
        } else {
          setIsNotAuthorized(!isNotAuthorized);
        }

        // setIsConfirmSave(!isConfirmSave);
        // console.log(1111)
      } else {
        setIsWarningInputForm(!isWarningInputForm);
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
    var arrObj = [...itemSelectAdd];
    var contractStatus = document.getElementById(
      "clone-header-contractStatus"
    ).value;
    if (getIsValidForm("clone-add-header-need-validation")) {
      // setInvalidMaterialFormAdd([false, false, false]);

      if (InPort.length) {
        if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
          if (
            calTransportRateList.length &&
            headliffoff.length &&
            headlifton.length
          ) {
            setIsConfirmSaveClone(!isConfirmSaveClone);
          } else {
            if (
              calTransportRateList.length &&
              !headliffoff.length &&
              !headlifton.length
            ) {
              setIsConfirmSaveClone(!isConfirmSaveClone);
            } else if (
              !calTransportRateList.length &&
              headliffoff.length &&
              headlifton.length
            ) {
              setIsConfirmSaveClone(!isConfirmSaveClone);
            } else {
              setIsWarningInputForm(!isWarningInputForm);
            }
          }
        } else if (contractStatus !== "Active") {
          if (
            calTransportRateList.length &&
            headliffoff.length &&
            headlifton.length
          ) {
            setIsConfirmSaveClone(!isConfirmSaveClone);
          } else {
            if (
              calTransportRateList.length &&
              !headliffoff.length &&
              !headlifton.length
            ) {
              setIsConfirmSaveClone(!isConfirmSaveClone);
            } else if (
              !calTransportRateList.length &&
              headliffoff.length &&
              headlifton.length
            ) {
              setIsConfirmSaveClone(!isConfirmSaveClone);
            } else {
              setIsWarningInputForm(!isWarningInputForm);
            }
          }
        } else {
          setIsNotAuthorized(!isNotAuthorized);
        }

        // setIsConfirmSave(!isConfirmSave);
        // console.log(1111)
      } else {
        setIsWarningInputForm(!isWarningInputForm);
      }
    }
  };

  const onClickCheckFormEditData = () => {
    var arrObj = [...itemSelectEdit];
    var contractStatus = document.getElementById(
      "edit-header-contractStatus"
    ).value;
    var docume;
    if (getIsValidForm("edit-header-need-validation")) {
      if (InPort.length) {
        if (_UserAuthen === "Admin" || _UserAuthen === "TPE-Approver") {
          if (
            calTransportRateList.length &&
            headliffoff.length &&
            headlifton.length
          ) {
            console.log(11111);
            setIsConfirmEdit(!isConfirmEdit);
          } else {
            if (
              calTransportRateList.length &&
              !headliffoff.length &&
              !headlifton.length
            ) {
              setIsConfirmEdit(!isConfirmEdit);
            } else if (
              !calTransportRateList.length &&
              headliffoff.length &&
              headlifton.length
            ) {
              setIsConfirmEdit(!isConfirmEdit);
            } else {
              setIsWarningInputForm(!isWarningInputForm);
            }
          }
        } else if (contractStatus !== "Active") {
          if (
            calTransportRateList.length &&
            headliffoff.length &&
            headlifton.length
          ) {
            setIsConfirmEdit(!isConfirmEdit);
          } else {
            if (
              calTransportRateList.length &&
              headliffoff.length &&
              headlifton.length
            ) {
              console.log(11111);
              setIsConfirmEdit(!isConfirmEdit);
            } else {
              if (
                calTransportRateList.length &&
                !headliffoff.length &&
                !headlifton.length
              ) {
                setIsConfirmEdit(!isConfirmEdit);
              } else if (
                !calTransportRateList.length &&
                headliffoff.length &&
                headlifton.length
              ) {
                setIsConfirmEdit(!isConfirmEdit);
              } else {
                setIsWarningInputForm(!isWarningInputForm);
              }
            }
          }
        } else {
          setIsNotAuthorized(!isNotAuthorized);
        }

        // setIsConfirmSave(!isConfirmSave);
        // console.log(1111)
      } else {
        setIsWarningInputForm(!isWarningInputForm);
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
          tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
          itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
          // className="CDataTable"
          items={exportVSList}
          fields={fields}
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
            show_details: (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => {
                      toggleDetails(index);
                    }}
                  >
                    {details.includes(index) ? "ซ่อน" : "แสดง"}
                  </CButton>
                </td>
              );
            },
            details: (item, index) => {
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>{otherTables("show", item)}</CCardBody>
                </CCollapse>
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

  const handleChangeEditForm = (type) => (e) => {
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
    } else if (type === "fuelTypeId") {
      newObj.fuelTypeId = e.target.value;
    } else if (type === "contractStatus") {
      newObj.contractStatus = e.target.value;
    }
    console.log(newObj);

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

  var myObj = {
    style: "currency",
    currency: "THB",
    currencyDisplay: "code",
    minimumFractionDigits: "3",
  };

  const onClickAddData = () => {
    setIsConfirmSave(!isConfirmSave);
    var contractNo = document.getElementById("header-contractNo").value;
    var sourceId = itemSelectAdd[1].sourceId;
    var transporterId = itemSelectAdd[0].transporterId;
    var packageType = document.getElementById("header-packagetypeId").value;
    var fuelTypeId = parseInt(
      document.getElementById("header-fueltypeId").value
    );
    var refDocNo = document.getElementById("header-refDoc").value;
    var startDate = document.getElementById("header-dateStart").value;
    var endDate = document.getElementById("header-dateEnd").value;
    var contractStatus = document.getElementById("header-contractStatus").value;
    var createBy = parseInt(localStorage.getItem("userId"));
    var customfee = 0;
    var customBy = 1;
    // var customfee = document.getElementById("header-customfee").value;
    // var customBy = document.getElementById("header-customBy").value;

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
      packageType,
      fuelTypeId,
      refDocNo,
      startDate,
      endDate,
      contractStatus,
      createBy,
      customfee,
      customBy,
    ];

    var newArrLiftOff = [];
    headliffoff.map((item) => {
      var newObj = {
        contrainerSize: "",
        placeContainerReturnId: null,
        placeContainerReturnNameThai: null,
        liftOffPrice: 0.0,
        passengerFeePrice: 0.0,
        weighingPrice: 0.0,
        returnContrainerPrice: 0.0,
      };
      newObj.contrainerSize = item.contrainerSize;
      newObj.placeContainerReturnId = item.placeContainerReturnId;
      newObj.placeContainerReturnNameThai = item.placeContainerReturnNameThai;
      newObj.liftOffPrice = parseFloat(item.liftOffPrice);
      newObj.passengerFeePrice = parseFloat(item.passengerFeePrice);
      newObj.weighingPrice = parseFloat(item.weighingPrice);
      newObj.returnContrainerPrice = parseFloat(item.returnContrainerPrice);
      newArrLiftOff.push(newObj);
    });

    var newArrLiftOn = [];
    headlifton.map((item) => {
      var newObj = {
        contrainerSize: "",
        cyplaceId: null,
        cyplaceNameThai: "",
        liftOnPrice: 0.0,
        yardPassPrice: 0.0,
        receiveContrainerPrice: 0.0,
      };
      newObj.contrainerSize = item.contrainerSize;
      newObj.cyplaceId = item.cyplaceId;
      newObj.cyplaceNameThai = item.cyplaceNameThai;
      newObj.liftOnPrice = parseFloat(item.liftOnPrice);
      newObj.yardPassPrice = parseFloat(item.yardPassPrice);
      newObj.receiveContrainerPrice = parseFloat(item.receiveContrainerPrice);
      newArrLiftOn.push(newObj);
    });

    var newArrTransportRate = [];
    console.log(calTransportRateList);
    calTransportRateList.map((item) => {
      var newObj = {
        fuelFrom: 0.0,
        fuelTo: 0.0,
        size20Ship1Price: 0.0,
        size20Ship2Price: 0.0,
        size40Ship1Price: 0.0,
      };
      newObj.fuelFrom = item.fuelFrom;
      newObj.fuelTo = item.fuelTo;
      newObj.size20Ship1Price = item.size20Ship1Price;
      newObj.size20Ship2Price = item.size20Ship1Price;
      newObj.size40Ship1Price = item.size40Ship1Price;
      newArrTransportRate.push(newObj);
      // setCalTransportRateList()
    });

    var newArrPort = [];
    InPort.map((item) => {
      var newObj = { placeContainerReturnId: null };
      newObj.placeContainerReturnId = parseInt(item.placeContainerReturnId);

      newArrPort.push(newObj);
    });

    console.log(newArrHeader);
    console.log(newArrLiftOff);
    console.log(newArrLiftOn);
    console.log(newArrTransportRate);
    console.log(newArrPort);

    fnInsertData(
      newArrHeader,
      newArrLiftOff,
      newArrLiftOn,
      newArrTransportRate,
      newArrPort
    );
  };

  const onClickCloneData = () => {
    setIsConfirmSaveClone(!isConfirmSaveClone);
    var contractNo = document.getElementById("clone-header-contractNo").value;
    var sourceId = itemSelectAdd[1].sourceId;
    var transporterId = itemSelectAdd[0].transporterId;
    var fuelTypeId = parseInt(
      document.getElementById("clone-header-fueltypeId").value
    );
    var packageType = document.getElementById(
      "clone-header-packagetypeId"
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
      packageType,
      fuelTypeId,
      refDocNo,
      startDate,
      endDate,
      contractStatus,
      createBy,
    ];

    var newArrLiftOff = [];
    headliffoff.map((item) => {
      var newObj = {
        contrainerSize: "",
        placeContainerReturnId: null,
        placeContainerReturnNameThai: null,
        liftOffPrice: 0.0,
        passengerFeePrice: 0.0,
        weighingPrice: 0.0,
        returnContrainerPrice: 0.0,
      };
      newObj.contrainerSize = item.contrainerSize;
      newObj.placeContainerReturnId = parseInt(item.placeContainerReturnId);
      newObj.placeContainerReturnNameThai = item.placeContainerReturnNameThai;
      newObj.liftOffPrice = parseFloat(item.liftOffPrice);
      newObj.passengerFeePrice = parseFloat(item.passengerFeePrice);
      newObj.weighingPrice = parseFloat(item.weighingPrice);
      newObj.returnContrainerPrice = parseFloat(item.returnContrainerPrice);
      newArrLiftOff.push(newObj);
    });

    var newArrLiftOn = [];
    headlifton.map((item) => {
      var newObj = {
        contrainerSize: "",
        cyplaceId: null,
        cyplaceNameThai: "",
        liftOnPrice: 0.0,
        yardPassPrice: 0.0,
        receiveContrainerPrice: 0.0,
      };
      newObj.contrainerSize = item.contrainerSize;
      newObj.cyplaceId = parseInt(item.cyplaceId);
      newObj.cyplaceNameThai = item.cyplaceNameThai;
      newObj.liftOnPrice = parseFloat(item.liftOnPrice);
      newObj.yardPassPrice = parseFloat(item.yardPassPrice);
      newObj.receiveContrainerPrice = parseFloat(item.receiveContrainerPrice);
      newArrLiftOn.push(newObj);
    });

    var newArrTransportRate = [];
    calTransportRateList.map((item) => {
      var newObj = {
        fuelFrom: 0.0,
        fuelTo: 0.0,
        size20Ship1Price: 0.0,
        size20Ship1Price: 0.0,
        size40Ship1Price: 0.0,
      };
      newObj.fuelFrom = parseFloat(item.fuelFrom);
      newObj.fuelTo = parseFloat(item.fuelTo);
      newObj.size20Ship1Price = parseFloat(item.size20Ship1Price);
      newObj.size20Ship2Price = parseFloat(item.size20Ship1Price);
      newObj.size40Ship1Price = parseFloat(item.size40Ship1Price);
      newArrTransportRate.push(newObj);
      // setCalTransportRateList()
    });

    var newArrPort = [];
    InPort.map((item) => {
      var newObj = { placeContainerReturnId: null };
      newObj.placeContainerReturnId = parseInt(item.placeContainerReturnId);

      newArrPort.push(newObj);
    });

    // console.log(newArrHeader);
    // console.log(newArrLiftOff);
    // console.log(newArrLiftOn);
    // console.log(newArrTransportRate);
    // console.log(newArrPort);

    fnInsertData(
      newArrHeader,
      newArrLiftOff,
      newArrLiftOn,
      newArrTransportRate,
      newArrPort
    );
  };

  const handleChangeCloneForm = (type) => (e) => {
    console.log(111111);
    var newObj = { ...cloneData };
    // console.log(cloneData);

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
    } else if (type === "fueltypeId") {
      newObj.fuelTypeId = e.target.value;
    }

    setCloneData(newObj);
  };
  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var arrObj = [...itemSelectEdit];

    var transporterId = arrObj[0].transporterId;
    var sourceId = arrObj[1].sourceId;
    var packageType = document.getElementById(
      "edit-header-packagetypeId"
    ).value;
    var fuelTypeId = document.getElementById("edit-header-fuelTypeId").value;
    var contractStatus = document.getElementById(
      "edit-header-contractStatus"
    ).value;
    var newArrLiftOff = [];
    headliffoff.map((item) => {
      var newObj = {
        contrainerSize: "",
        placeContainerReturnId: null,
        placeContainerReturnNameThai: null,
        liftOffPrice: 0.0,
        passengerFeePrice: 0.0,
        weighingPrice: 0.0,
        returnContrainerPrice: 0.0,
      };
      newObj.contrainerSize = item.contrainerSize;
      newObj.placeContainerReturnId = parseInt(item.placeContainerReturnId);
      newObj.placeContainerReturnNameThai = item.placeContainerReturnNameThai;
      newObj.liftOffPrice = parseFloat(item.liftOffPrice);
      newObj.passengerFeePrice = parseFloat(item.passengerFeePrice);
      newObj.weighingPrice = parseFloat(item.weighingPrice);
      newObj.returnContrainerPrice = parseFloat(item.returnContrainerPrice);
      newArrLiftOff.push(newObj);
    });

    var newArrLiftOn = [];
    headlifton.map((item) => {
      var newObj = {
        contrainerSize: "",
        cyplaceId: null,
        cyplaceNameThai: "",
        liftOnPrice: 0.0,
        yardPassPrice: 0.0,
        receiveContrainerPrice: 0.0,
      };
      newObj.contrainerSize = item.contrainerSize;
      newObj.cyplaceId = parseInt(item.cyplaceId);
      newObj.cyplaceNameThai = item.cyplaceNameThai;
      newObj.liftOnPrice = parseFloat(item.liftOnPrice);
      newObj.yardPassPrice = parseFloat(item.yardPassPrice);
      newObj.receiveContrainerPrice = parseFloat(item.receiveContrainerPrice);
      newArrLiftOn.push(newObj);
    });

    var newArrTransportRate = [];
    calTransportRateList.map((item) => {
      var newObj = {
        fuelFrom: 0.0,
        fuelTo: 0.0,
        size20Ship1Price: 0.0,
        size20Ship1Price: 0.0,
        size40Ship1Price: 0.0,
      };
      newObj.fuelFrom = item.fuelFrom;
      newObj.fuelTo = item.fuelTo;
      newObj.size20Ship1Price = item.size20Ship1Price;
      newObj.size20Ship2Price = item.size20Ship1Price;
      newObj.size40Ship1Price = item.size40Ship1Price;
      newArrTransportRate.push(newObj);
      // setCalTransportRateList()
    });

    var newArrPort = [];
    InPort.map((item) => {
      var newObj = { placeContainerReturnId: null };
      newObj.placeContainerReturnId = parseInt(item.placeContainerReturnId);

      newArrPort.push(newObj);
    });
    var newObj = { ...editData };

    newObj.transporterId = transporterId;
    newObj.sourceId = sourceId;
    newObj.packageType = packageType;
    newObj.fuelTypeId = fuelTypeId;
    newObj.contractStatus = contractStatus;
    newObj.mcontractExportVesselLiftOffs = [...newArrLiftOff];
    newObj.mcontractExportVesselLiftOns = [...newArrLiftOn];
    newObj.mcontractExportVesselTransportRates = [...newArrTransportRate];
    newObj.mcontractExportVesselPorts = [...newArrPort];
    newObj.updateBy = parseInt(localStorage.getItem("userId"));

    fnUpdateData(newObj);
  };

  const otherTables = (type, item) => {
    if (type === "edit") {
      if (
        !isGetDatainCalValue &&
        Object.keys(editData).length &&
        placeContrainer.length &&
        cyplace.length
      ) {
        // console.log(editData);
        var newObj = { ...editData };

        if (newObj.mcontractExportVesselTransportRates) {
          var newArr = [];
          newObj.mcontractExportVesselTransportRates.map((item) => {
            var obj = {
              fuelFrom: 0.0,
              fuelTo: 0.0,
              size20Ship1Price: 0.0,
              size20Ship2Price: 0.0,
              size40Ship1Price: 0.0,
            };
            // obj.fuelFrom = item.fuelFrom;
            obj.fuelTo = item.fuelTo;
            // obj.seqRate = item.seqRate;
            obj.fuelFrom = item.fuelFrom;
            obj.size20Ship1Price = item.size20Ship1Price;
            obj.size20Ship2Price = item.size20Ship1Price;
            obj.size40Ship1Price = item.size40Ship1Price;
            newArr.push(obj);
          });

          setCalTransportRateList(newArr);
        } else {
          setCalTransportRateList([]);
        }

        if (newObj.mcontractExportVesselLiftOffs) {
          newArr = [];
          newObj.mcontractExportVesselLiftOffs.map((item) => {
            var obj = {
              contrainerSize: "",
              placeContainerReturnId: null,
              placeContainerReturnNameThai: "",
              liftOffPrice: 0.0,
              passengerFeePrice: 0.0,
              weighingPrice: 0.0,
              returnContrainerPrice: 0.0,
            };
            obj.contrainerSize = item.contrainerSize;
            obj.placeContainerReturnId = item.placeContainerReturnId;
            var newPlaceContainerReturn = placeContrainer.find(
              (x) => x.placeContainerReturnId === item.placeContainerReturnId
            );
            obj.placeContainerReturnNameThai = newPlaceContainerReturn
              ? newPlaceContainerReturn.placeContainerReturnNameThai
              : "";
            obj.liftOffPrice = item.liftOffPrice;
            obj.passengerFeePrice = item.passengerFeePrice;
            obj.weighingPrice = item.weighingPrice;
            obj.returnContrainerPrice = item.returnContrainerPrice;
            newArr.push(obj);
          });
          setHeadLiftOff(newArr);
        } else {
          setHeadLiftOff([]);
        }

        if (newObj.mcontractExportVesselLiftOns) {
          newArr = [];
          newObj.mcontractExportVesselLiftOns.map((item) => {
            var obj = {
              contrainerSize: "",
              cyplaceId: null,
              cyplaceNameThai: "",
              liftOnPrice: 0.0,
              yardPassPrice: 0.0,
              receiveContrainerPrice: 0.0,
            };
            obj.contrainerSize = item.contrainerSize;
            obj.cyplaceId = item.cyplaceId;
            var newCyplace = cyplace.find(
              (x) => x.cyplaceId === item.cyplaceId
            );
            obj.cyplaceNameThai = newCyplace ? newCyplace.cyplaceNameThai : "";
            obj.liftOnPrice = item.liftOnPrice;
            obj.yardPassPrice = item.yardPassPrice;
            obj.receiveContrainerPrice = item.receiveContrainerPrice;
            newArr.push(obj);
          });
          setHeadLiftOn(newArr);
        } else {
          setHeadLiftOn([]);
        }

        if (newObj.mcontractExportVesselPorts) {
          newArr = [];
          newObj.mcontractExportVesselPorts.map((item) => {
            var obj = {
              placeContainerReturnId: null,
              placeContainerReturnNameThai: "",
            };
            obj.placeContainerReturnId = item.placeContainerReturnId;
            var newPort = placeContrainer.find(
              (x) => x.placeContainerReturnId === item.placeContainerReturnId
            );
            obj.placeContainerReturnNameThai = newPort
              ? newPort.placeContainerReturnNameThai
              : "";
            newArr.push(obj);
          });
          setInPort(newArr);
        } else {
          setInPort([]);
        }

        setIsGetDatainCalValue(true);
      }
    }

    if (type === "show") {
      if (Object.keys(item).length) {
        // console.log(item);

        if (item.mcontractExportVesselLiftOffs) {
          item.mcontractExportVesselLiftOffs.map((item) => {
            item.contrainerSize = item.contrainerSize;
            item.placeContainerReturnId = item.placeContainerReturnId;
            var newPlaceContainerReturn = placeContrainer.find(
              (x) => x.placeContainerReturnId === item.placeContainerReturnId
            );
            if (newPlaceContainerReturn) {
              item.placeContainerReturnNameThai =
                newPlaceContainerReturn.placeContainerReturnNameThai;
            } else {
              item.placeContainerReturnNameThai = "";
            }

            item.liftOffPrice = item.liftOffPrice;
            item.passengerFeePrice = item.passengerFeePrice;
            item.weighingPrice = item.weighingPrice;
            item.returnContrainerPrice = item.returnContrainerPrice;
          });
        } else {
        }

        if (item.mcontractExportVesselLiftOns) {
          item.mcontractExportVesselLiftOns.map((item) => {
            item.contrainerSize = item.contrainerSize;
            item.cyplaceId = item.cyplaceId;
            var newCyplace = cyplace.find(
              (x) => x.cyplaceId === item.cyplaceId
            );
            // console.log(newCyplace);
            if (newCyplace) {
              item.cyplaceNameThai = newCyplace.cyplaceNameThai;
            } else {
              item.cyplaceNameThai = "";
            }

            item.liftOnPrice = item.liftOnPrice;
            item.yardPassPrice = item.yardPassPrice;
            item.receiveContrainerPrice = item.receiveContrainerPrice;
            // newArr.push(obj);
          });
        } else {
        }

        item.mcontractExportVesselPorts.map((item) => {
          // var obj = { "portId": null, "portNameThai": "" }
          item.placeContainerReturnId = item.placeContainerReturnId;
          var newPort = placeContrainer.find(
            (x) => x.placeContainerReturnId === item.placeContainerReturnId
          );
          if (newPort) {
            item.placeContainerReturnNameThai =
              newPort.placeContainerReturnNameThai;
          } else {
            item.placeContainerReturnNameThai = "";
          }
        });
      }

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
                  label="Transport Rate"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label="Lift On"
                  {...a11yProps(2)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label="Lift Off"
                  {...a11yProps(3)}
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
                    {tabledata(FPortNo, item.mcontractExportVesselPorts)}
                  </CCard>
                </CRow>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <CRow className="justify-content-center">
                  <CCard>
                    {tabledata(
                      FEXTransportRate,
                      item.mcontractExportVesselTransportRates
                    )}
                  </CCard>
                </CRow>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <CRow className="justify-content-center">
                  <CCard>
                    {tabledata(FLiftOn, item.mcontractExportVesselLiftOns)}
                  </CCard>
                </CRow>
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                <CRow className="justify-content-center">
                  <CCard>
                    {tabledata(FLiftOff, item.mcontractExportVesselLiftOffs)}
                  </CCard>
                </CRow>
              </TabPanel>
            </SwipeableViews>
          </div>
        </List>
      );
    } else {
      if (
        source.length &&
        transporterList.length &&
        packageType.length &&
        contractStatus.length &&
        fuelType.length &&
        cbcustomBy.length &&
        containerSize.length &&
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
                  <Tab
                    style={{ outline: "none" }}
                    label="Transport Rate"
                    {...a11yProps(1)}
                  />
                  <Tab
                    style={{ outline: "none" }}
                    label="Lift On"
                    {...a11yProps(2)}
                  />
                  <Tab
                    style={{ outline: "none" }}
                    label="Lift Off"
                    {...a11yProps(3)}
                  />
                  {/* <Tab
                    style={{ outline: "none" }}
                    label="Custom"
                    {...a11yProps(4)}
                  /> */}
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                {/* <TabPanel value={value} index={0} dir={theme.direction}>
                                    {type === "add" ? formCustom() :
                                        type === "edit" ? formCustom() : null}
                                </TabPanel> */}
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {type === "add"
                    ? formPort()
                    : type === "edit"
                    ? formPort()
                    : null}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {type === "add"
                    ? formTransportRate()
                    : type === "edit"
                    ? formTransportRate()
                    : null}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  {type === "add"
                    ? formLiffOn()
                    : type === "edit"
                    ? formLiffOn()
                    : null}
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  {type === "add"
                    ? formLiftOff()
                    : type === "edit"
                    ? formLiftOff()
                    : null}
                </TabPanel>
                {/* <TabPanel value={value} index={4} dir={theme.direction}>
                  {type === "add"
                    ? formCustom()
                    : type === "edit"
                    ? formCustom()
                    : null}
                </TabPanel> */}
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
                      <CLabel htmlFor="cvv">
                        วันที่เริ่มต้น
                        {showtext()}
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
                        {showtext()}
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
                          // required
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
                        ปีสิ้นสุด
                        {showtext()}
                      </CLabel>
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
                      <CLabel htmlFor="name">Vender Name</CLabel>
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
                          clearOnBlur
                          clearOnEscape={true}
                          options={transporterList}
                          style={{ fontFamily: "Scg" }}
                          size="small"
                          getOptionLabel={(option) =>
                            `${option.transporterNameThai}` +
                            `(${option.transporterCode})`
                          }
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
                    <CLabel htmlFor="name">ต้นทาง</CLabel>
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
                        onChange={handleChangSelect("Search-SourceId")}
                        id="in-search-SourceId"
                        options={source}
                        style={{ fontFamily: "Scg" }}
                        size="small"
                        getOptionLabel={(option) =>
                          `${option.sourceCode}` && `(${option.sourceNameThai})`
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
                    {/* <CSelect className="form-control"
                                        id="in-search-SourceId"
                                        onChange={handleChangSearch}
                                        required
                                    >
                                        <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                        {source.map((cb) => <option value={cb.sourceId} >{`[${cb.sourceCode}]` + '  ' + cb.sourceNameThai}  </option>)}
                                    </CSelect> */}
                    <CInvalidFeedback>
                      {Constant.inValidNullSelected}
                    </CInvalidFeedback>
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
                <CCol xs="12" sm="6" md="3">
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
                        aria-label="clear"
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
      source.length &&
      transporterList.length &&
      packageType.length &&
      contractStatus.length &&
      fuelType.length &&
      cbcustomBy.length &&
      containerSize.length &&
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
                                id="header-dateStart"
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
                                id="header-dateEnd"
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
                            <CFormGroup>
                              <CLabel htmlFor="name">Vender Name</CLabel>
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
                              <CLabel htmlFor="name">ต้นทาง</CLabel>
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
                                    id="header-packagetypeId"
                                    required
                                  >
                                    <option selected hidden value="">
                                      เลือกประเภทแพ็คเกจ
                                    </option>
                                    {packageType.map((cb) => (
                                      <option value={cb.displayMember}>
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
                                    id="header-fueltypeId"
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
                          
                          {/* <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="ccmonth">ราคาค่าขนลง/ตัน</CLabel>
                              {redStart()}
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
                                  id="header-customfee"
                                  onWheel={(e) => e.target.blur()}
                                  onInput={(e) =>
                                    (e.target.value = e.target.value.slice(
                                      0,
                                      14
                                    ))
                                  }
                                  step="0.01"
                                  min="0"
                                  required
                                />
                              </Box>
                            </CFormGroup> */}
                          {/* </CCol> */}
                          {/* <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">Custom By</CLabel>
                                {redStart()}
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
                                    id="header-customBy"
                                    required
                                  >
                                    <option selected hidden value="">
                                      {Constant.txtformPlaceholderSelected}
                                    </option>
                                    {cbcustomBy.map((cb) => (
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
                          </CCol> */}
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
                      ></Box>

                      <CCard>
                        <CRow className="m-3 p-0">
                          <CCol xs="12" sm="6" md="3">
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
                                  id="header-refDoc"
                                  maxLength="20"
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
                                    id="header-contractStatus"
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
                                  id="header-contractNo"
                                  type="text"
                                  maxLength="20"
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
                            block
                            color="danger"
                            onClick={onClickClearHeader}
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
          // console.log(editData);
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
          var packageTypeValue = newObj.packageType;
          var fuelTypeValue = newObj.fuelTypeId;
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
            !Object.keys(itemSelectEdit[1]).length
          ) {
            setItemSelectEdit([_transporterList, sourceList]);
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
                        <CCol xs="12" sm="6" md="3">
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
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Vender Name</CLabel>
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
                                {/* <CSelect className="form-control"
                                                            id="header-transporterId-edit"
                                                            required
                                                        >
                                                            <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                                            {transporterList.map((item) => <option value={item.transporterId} >{`[${item.transporterCode}]` + '  ' + item.transporterNameThai}  </option>)}
                                                        </CSelect> */}
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
                              <CLabel htmlFor="name">ต้นทาง</CLabel>
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
                                  id="edit-header-packagetypeId"
                                  onChange={handleChangeEditForm("packageType")}
                                  required
                                  value={packageTypeValue}
                                >
                                  <option selected hidden value="">
                                    เลือกประเภทแพ็คเกจ
                                  </option>
                                  {packageType.map((cb) => (
                                    <option value={cb.displayMember}>
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
                        <CCol xs="12" sm="6" md="3">
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
                                  id="edit-header-contractNo"
                                  value={contractNoValue}
                                  onChange={handleChangeEditForm("contractNo")}
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
          // console.log(cloneData);
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
          var packageTypeValue = newObj.packageType;
          var fuelTypeValue = newObj.fuelTypeId;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue = new Date(newObj.startDate);

          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          // console.log(newObj.endDate);
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;
          // console.log(endDateValue);
          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);
          // console.log(endDateValue);
          var _contractStatus = newObj.contractStatus;

          // endDateValue = formatDate(endDateValue);

          if (
            !Object.keys(itemSelectAdd[0]).length &&
            !Object.keys(itemSelectAdd[1]).length
          ) {
            setItemSelectAdd([_transporterList, sourceList]);
          }
        }
        return (
          <CCard color="gradient-secondary" className="color-card-gra">
            <CForm className="clone-add-header-need-validation">
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
                        <CCol xs="12" sm="6" md="3">
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
                        <CCol xs="12" sm="6" md="3">
                          <CFormGroup>
                            <CFormGroup>
                              <CLabel htmlFor="name">Vender Name</CLabel>
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
                              <CLabel htmlFor="name">ต้นทาง</CLabel>
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
                                    id="clone-header-packagetypeId"
                                    onChange={handleChangeCloneForm(
                                      "packageType"
                                    )}
                                    value={packageTypeValue}
                                    required
                                  >
                                    <option selected hidden value="">
                                      เลือกประเภทแพ็คเกจ
                                    </option>
                                    {packageType.map((cb) => (
                                      <option value={cb.displayMember}>
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
                                    id="clone-header-fueltypeId"
                                    onChange={handleChangeCloneForm(
                                      "fueltypeId"
                                    )}
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
                          <CCol xs="12" sm="6" md="3">
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
                    ></Box>

                    <CCard>
                      <CRow className="m-3 p-0">
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
                                  id="clone-header-contractNo"
                                  onChange={handleChangeCloneForm("contractNo")}
                                  value={contractNoValue}
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

  const formCustom = () => {
    return (
      <div className="font-form-scg">
        <CForm className="custom-need-validation" noValidate>
          <CRow>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel htmlFor="name">CustomType</CLabel>
                <CSelect
                  className="form-control"
                  id="header-custom-customType"
                  onClick={handleChangSelect("Custom")}
                  required
                >
                  <option selected value="">
                    กรุณาเลือกCustomType
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  {/* {source.map((cb) => <option value={cb.sourceId} >{`[${cb.sourceCode}]` + '  ' + cb.sourceNameThai}  </option>)} */}
                </CSelect>
                <CInvalidFeedback>
                  {Constant.inValidNullSelected}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>

            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>Value:1</CLabel>
                <CInput
                  type="number"
                  id="header-custom-value1"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                />
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>Value:2</CLabel>
                <CInput
                  type="number"
                  id="header-custom-value2"
                  step="0.01"
                  min="0"
                  max="70"
                  required
                />
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>ราคา</CLabel>
                <CInput
                  type="number"
                  id="header-custom-price"
                  step="0.01"
                  min="0"
                  max="70"
                  required
                />
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12" sm="6" md="2">
              <CButton
                className="editbutton"
                color="success"
                size={Constant.btAddSize}
                block
                onClick={onClickCustom}
              >
                ยืนยัน
              </CButton>
            </CCol>
          </CRow>
        </CForm>
        <br />
        <CRow className="justify-content-center">
          <CCard
            className="p-2"
            style={{ maxHeight: "800px", overflowY: "auto" }}
          >
            <CDataTable
              items={customList}
              fields={FCustom}
              bordered
              // columnFilter
              // tableFilter={{
              //     label: `${Constant.tabletxtSearch}`,
              //     placeholder: `${Constant.tabletxtPlaceholder}`
              // }}
              // itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
              // itemsPerPage={100}
              // hover
              // sorter
              // pagination
              scopedSlots={
                {
                  // seqRate: (item, index) => {
                  //     return (
                  //         <td className="py-2">
                  //             <CInput
                  //                 type="number"
                  //                 step="0.01"
                  //                 value={item.seqRate}
                  //                 onChange={handleChangeUpdateField("fuel-rate", index)}
                  //             />
                  //         </td>
                  //     );
                  // },
                }
              }
            />
          </CCard>
        </CRow>
      </div>
    );
  };

  const formLiffOn = () => {
    //LiftOff
    return (
      <div className="font-form-scg">
        <CForm className="formLiffOn-need-validation">
          <CRow>
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>ขนาดตู้คอนเทนเนอร์</CLabel>
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
                    onChange={handleChangSelect("ContainerSize-LiftOn")}
                    // id="header-LiftOn-CYPlace"
                    options={containerSize}
                    style={{ fontFamily: "Scg" }}
                    size="small"
                    getOptionLabel={(option) => `${option.displayMember}`}
                    renderOption={(option) => {
                      return (
                        <Typography
                          className={classes.comboOptions}
                          value={option.displayMember}
                        >
                          {option.displayMember}
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
                          error={invalidMaterialFormOther3[0]}
                          {...params}
                          size="small"
                          label={
                            <Typography className={classes.label}>
                              {Constant.txtformPlaceholderSelected}
                            </Typography>
                          }
                          helperText={
                            invalidMaterialFormOther3[0] ? (
                              <Typography
                                className={classes.autoCompleteInputHelperText}
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
                  {/* <CInput
                    onChange={handleChangAddLiftOn()}
                    type="text"
                    id="header-liftOn-contrainerSize"
                    onWheel={(e) => e.target.blur()}
                    maxLength="15"
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
                <CLabel htmlFor="name">CY Place</CLabel>
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
                    onChange={handleChangSelect("CYPlace")}
                    id="header-LiftOff-CYPlace"
                    options={cyplace}
                    style={{ fontFamily: "Scg" }}
                    size="small"
                    fullWidth
                    loading
                    getOptionLabel={(option) =>
                      `${option.cyplaceCode}` && `(${option.cyplaceNameThai})`
                    }
                    renderOption={(option) => {
                      return (
                        <Typography
                          className={classes.comboOptions}
                          value={option.cyplaceId}
                        >
                          {`[${option.cyplaceCode}]` +
                            "  " +
                            option.cyplaceNameThai}
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
                          error={invalidMaterialFormOther[0]}
                          {...params}
                          size="small"
                          label={
                            <Typography className={classes.label}>
                              {Constant.txtformPlaceholderSelected}
                            </Typography>
                          }
                          helperText={
                            invalidMaterialFormOther[0] ? (
                              <Typography
                                className={classes.autoCompleteInputHelperText}
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
            </CCol>

            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>ค่ายกตู้เปล่า(Lift On)</CLabel>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  {/* <CInput
                    onChange={handleChangAddLiftOn()}
                    type="number"
                    id="header-liftOn-liftOnPrice"
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    min="0"
                    required
                  /> */}
                  <CurrencyInput
                    class="form-control"
                    id="header-liftOn-liftOnPrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    // onValueChange={handleChangAddLiftOn("liftOnPrice")}
                    onValueChange={handleChangAddLiftOn("liftOnPrice")}
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
                <CLabel>ค่าผ่านลานรับตู้เปล่า</CLabel>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  {/* <CInput
                    onChange={handleChangAddLiftOn()}
                    type="number"
                    id="header-liftOn-yardPassPrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    required
                  /> */}
                  <CurrencyInput
                    class="form-control"
                    id="header-liftOn-yardPassPrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    // onValueChange={handleChangAddLiftOn("yardPassPrice")}
                    onValueChange={handleChangAddLiftOn("yardPassPrice")}
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
                <CLabel>ค่าต่อระยะรับตู้เปล่า</CLabel>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  {/* <CInput
                    onChange={handleChangAddLiftOn()}
                    type="number"
                    id="header-liftOn-receiveContrainerPrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    onWheel={(e) => e.target.blur()}
                    step="0.01"
                    min="0"
                    required
                  /> */}
                  <CurrencyInput
                    class="form-control"
                    id="header-liftOn-receiveContrainerPrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    onValueChange={handleChangAddLiftOn(
                      "receiveContrainerPrice"
                    )}
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
                  className="editbutton"
                  size={Constant.btAddSize}
                  color="success"
                  block
                  onClick={onClickAddLiftOn}
                >
                  ยืนยัน
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
              items={headlifton}
              fields={FLiftOnManage}
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
                        size="sm"
                        color="danger"
                        className="mr-1"
                        onClick={onClickRemoveRecordAddData("LiftOn", index)}
                      >
                        {Constant.btDeleteData}
                      </CButton>
                    </td>
                  );
                },
                liftOnPrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CurrencyInput
                        class="form-control"
                        value={item.liftOnPrice}
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
                yardPassPrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CurrencyInput
                        class="form-control"
                        value={item.yardPassPrice}
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
                receiveContrainerPrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CurrencyInput
                        class="form-control"
                        value={item.receiveContrainerPrice}
                        // name="input-name"
                        disabled
                        maxLength="14"
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
        </CRow>
      </div>
    );
  };

  const formLiftOff = () => {
    //LiftOn
    return (
      <div className="font-form-scg">
        <CForm className="LiftOff-need-validation" noValidate>
          <CRow>
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>ขนาดตู้คอนเทนเนอร์</CLabel>
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
                    onChange={handleChangSelect("ContainerSize-LiftOff")}
                    options={containerSize}
                    style={{ fontFamily: "Scg" }}
                    size="small"
                    getOptionLabel={(option) => `${option.displayMember}`}
                    renderOption={(option) => {
                      return (
                        <Typography
                          className={classes.comboOptions}
                          value={option.displayMember}
                        >
                          {option.displayMember}
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
                          error={invalidMaterialFormOther4[0]}
                          {...params}
                          size="small"
                          label={
                            <Typography className={classes.label}>
                              {Constant.txtformPlaceholderSelected}
                            </Typography>
                          }
                          helperText={
                            invalidMaterialFormOther4[0] ? (
                              <Typography
                                className={classes.autoCompleteInputHelperText}
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
                  {/* <CInput
                    onChange={handleChangAdd("contrainerSize")}
                    type="text"
                    id="header-LiftOff-contrainerSize"
                    onWheel={(e) => e.target.blur()}
                    maxLength="15"
                    min="0"
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
                <CLabel htmlFor="name">Place Container Return</CLabel>
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
                    onChange={handleChangSelect("PlaceContainerReturn")}
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
                          value={option.portId}
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
                            required: true,
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
                                className={classes.autoCompleteInputHelperText}
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
                  {/* <CSelect className="form-control"
                                    id="search-header-sourceId"
                                    required
                                >
                                    <option selected value="">กรุณาเลือกท่าเรือ</option>
                                    <option value="">แหลมฉบัง</option>
                                    <option value="">เคอรี่สยามซีพอร์ต </option>
                                    <option value="">อื่นๆ</option>
                                    
                                </CSelect> */}
                  <CInvalidFeedback>
                    {Constant.inValidNullSelected}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>

            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>ค่ายกตู้หนัก(Lift Off)</CLabel>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  {/* <CInput
                    onChange={handleChangAdd("liftOffPrice")}
                    type="number"
                    id="header-LiftOff-liftOffPrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    onWheel={(e) => e.target.blur()}
                    step="0.01"
                    min="0"
                    required
                  /> */}
                  <CurrencyInput
                    class="form-control"
                    id="header-LiftOff-liftOffPrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    onValueChange={handleChangAdd("liftOffPrice")}
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
                <CLabel>ค่าผ่านท่า(ตู้หนัก)</CLabel>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  {/* <CInput
                    onChange={handleChangAdd("passengerFeePrice")}
                    type="number"
                    id="header-LiftOff-passengerFeePrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    onWheel={(e) => e.target.blur()}
                    step="0.01"
                    min="0"
                    required
                  /> */}
                  <CurrencyInput
                    class="form-control"
                    id="header-LiftOff-passengerFeePrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    onValueChange={handleChangAdd("passengerFeePrice")}
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
                <CLabel>ค่าชั่งน้ำหนัก(ตู้หนัก)</CLabel>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  {/* <CInput
                    onChange={handleChangAdd("weighingPrice")}
                    type="number"
                    id="header-LiftOff-weighingPrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    onWheel={(e) => e.target.blur()}
                    step="0.01"
                    min="0"
                    required
                  /> */}
                  <CurrencyInput
                    class="form-control"
                    id="header-LiftOff-weighingPrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    onValueChange={handleChangAdd("weighingPrice")}
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
                <CLabel>ค่าต่อระยะคืนตู้หนัก</CLabel>
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  {/* <CInput
                    onChange={handleChangAdd("returnContrainerPrice")}
                    type="number"
                    id="header-LiftOff-returnContrainerPrice"
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    onWheel={(e) => e.target.blur()}
                    step="0.01"
                    min="0"
                    required
                  /> */}
                  <CurrencyInput
                    class="form-control"
                    id="header-LiftOff-returnContrainerPrice"
                    name="input-name"
                    maxLength="14"
                    decimalScale={2}
                    step={0.01}
                    min={0}
                    decimalsLimit={2}
                    onValueChange={handleChangAdd("returnContrainerPrice")}
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
                  className="editbutton"
                  size={Constant.btAddSize}
                  color="success"
                  block
                  onClick={onClickAddLiftOff}
                >
                  ยืนยัน
                  {/* {Constant.btAddData} */}
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
              items={headliffoff}
              fields={FLiftOffManage}
              // columnFilter
              bordered
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
                        size="sm"
                        color="danger"
                        className="mr-1"
                        onClick={onClickRemoveRecordAddData("LiftOff", index)}
                      >
                        {Constant.btDeleteData}
                      </CButton>
                    </td>
                  );
                },
                liftOffPrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CurrencyInput
                        class="form-control"
                        value={item.liftOffPrice}
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
                passengerFeePrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CurrencyInput
                        class="form-control"
                        value={item.passengerFeePrice}
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
                weighingPrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CurrencyInput
                        class="form-control"
                        value={item.weighingPrice}
                        // name="input-name"
                        disabled
                        maxLength="14"
                        decimalScale={2}
                        step={0.01}
                        min={0}
                        decimalsLimit={2}
                        // onValueChange={handleChangAddLiftOn("liftOnPrice")}
                      />
                    </td>
                  );
                },
                returnContrainerPrice: (item, index) => {
                  return (
                    <td className="py-2">
                      <CurrencyInput
                        class="form-control"
                        value={item.returnContrainerPrice}
                        // name="input-name"
                        disabled
                        maxLength="14"
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
        </CRow>
      </div>
    );
  };

  const formTransportRate = () => {
    return (
      <div className="font-form-scg">
        <CForm className="fuel-need-validation" noValidate>
          <CRow>
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>ค่าหัวลากตู้20'(บาทต่อตู้)</CLabel>
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
                    id="transportRate-ship20"
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
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
                <CLabel>ค่าหัวลากตู้40'(บาทต่อตู้)</CLabel>
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
                    type="currency"
                    id="transportRate-ship40"
                    onWheel={(e) => e.target.blur()}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 14))
                    }
                    step="0.01"
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
                <CLabel>ค่าเชื้อเพลิงเริ่มต้น</CLabel>
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
                    type="currency"
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
                <CLabel>ค่าเชื้อเพลิงสิ้นสุด</CLabel>
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
                    type="currency"
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
                <CLabel>ค่าชดเชยเชื้อเพลิง(บาทต่อตู้20')</CLabel>
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
            <CCol xs="12" sm="6" md="2">
              <CFormGroup>
                <CLabel>ค่าชดเชยเชื้อเพลิง(บาทต่อตู้40')</CLabel>
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
                    id="fuel-price-40"
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
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto", textAlign: "center" }}
        >
          <CDataTable
            items={calTransportRateList}
            fields={FEXTransportRate}
            bordered
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
              size20Ship1Price: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      value={item.size20Ship1Price}
                      // name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "Size20-Ship",
                        index
                      )}
                    />
                    {/* <CInput
                        type="number"
                        step="0.01"
                        value={item.size20Ship1Price}
                        onChange={handleChangeUpdateField("Size20-Ship", index)}
                      /> */}
                  </td>
                );
              },
              size40Ship1Price: (item, index) => {
                return (
                  <td className="py-2">
                    <CurrencyInput
                      class="form-control"
                      value={item.size40Ship1Price}
                      // name="input-name"
                      maxLength="14"
                      decimalScale={2}
                      step={0.01}
                      min={0}
                      decimalsLimit={2}
                      onValueChange={handleChangeUpdateField(
                        "Size40-Ship",
                        index
                      )}
                    />
                    {/* <CInput
                        type="number"
                        step="0.01"
                        value={item.size40Ship1Price}
                        onChange={handleChangeUpdateField("Size40-Ship", index)}
                      /> */}
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
        {/* </CRow> */}
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
                  <CLabel>Place Container Return</CLabel>
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
                    {Constant.btOK}
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
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          <CDataTable
            items={InPort}
            fields={FPort}
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
        {/* </CRow> */}
      </div>
    );
  };

  const showTextContentEdit = () => (
    <div>
      {Constant.contentSuccessEditData}
      <br />
      {Constant.contentSuccessContractRecalData}
    </div>
  );

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
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
                        ${
                          !InPort.length
                            ? Constant.arrFieldMasterConExportOtherTable[3]
                            : ""
                        }
                                ${
                                  !calTransportRateList.length
                                    ? !headlifton.length && !headliffoff.length
                                      ? `${Constant.arrFieldMasterConExportOtherTable[3]} หรือ  ${Constant.arrFieldMasterConExportOtherTable[1]}, ${Constant.arrFieldMasterConExportOtherTable[0]} `
                                      : Constant
                                          .arrFieldMasterConExportOtherTable[3]
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
          <CButton color="danger" onClick={onClickRemoveRecordAddData}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton color="secondary" onClick={onClickCancelRemoveRecord}>
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Delete Modal Record Other Table */}
    </div>
  );
  const onClickPreviousPage = () => {
    var newObj = { ...linkData };
    // console.log(linkData);
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

  const fnInsertData = (
    newArrHeader,
    newArrLiftOff,
    newArrLiftOn,
    newArrTransportRate,
    newArrPort
  ) => {
    setIsPostingData(true);
    Repository.fetchAddContractExportVList(
      newArrHeader,
      newArrLiftOff,
      newArrLiftOn,
      newArrTransportRate,
      newArrPort
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
    Repository.fetchEditExportVesselList(objData).then(
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
    Repository.fetchRemoveContractExportList(index).then(
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

  const fnGetCbContainerSize = () => {
    // console.log('88888');
    Repository.fetchCbContainerSizeList().then(
      (result) => {
        // setIsLoaded(true);
        if (result.httpCode === "200") {
          setContainerSize(result.data);
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

  const fnGetCbCustomBy = () => {
    // console.log('88888');
    Repository.fetchCbCustomBy().then(
      (result) => {
        // setIsLoaded(true);
        if (result.httpCode === "200") {
          setCbCustomBy(result.data);
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

  const fnGetExportVesselListBySearch = (arr) => {
    setIsPostingData(true);
    Repository.fetchExportVesselListBySearch(arr).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // console.log(result.data);
          result.data.map((x) => {
            x.startDateCovert = new Date(x.startDate).toLocaleString();
            x.endDateCovert = new Date(x.endDate).toLocaleString();
          });
          SetExportVSList(result.data);
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
    setSource([]);
    setTransporterList([]);
    setPackage([]);
    setContractStatus([]);
    setEditData([]);

    Repository.fetchExportVesselListBySearchById(index).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          console.log(result.data.headerList);
          // // setGetShipTo(result.data.shipToList);
          setSource(result.data.sourceList);
          setTransporterList(result.data.transporterList);
          setPackage(result.data.packageTypeList);
          setContractStatus(result.data.contractStatusList);
          setEditData(result.data.headerList);
          // setMcontractLiftOff(result.data.mcontractExportVesselLiftOffs);
          // setMcontractLiftOff(result.data.mcontractExportVesselLiftOns);
          // setMcontractLiftOff(result.data.mcontractExportVesselTransportRates);
          // setMcontractLiftOff(result.data.mcontractExportVesselPorts);
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

  const fnGetContractExportForSearchList = () => {
    Repository.fetchGetContractExportForSearchList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // console.log(result.data);
          setSource(result.data.sourceList);
          setTransporterList(result.data.transporterList);
          setPackage(result.data.packageTypeList);
          setContractStatus(result.data.contractStatusList);
          setFuelType(result.data.fuelTypeList);
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
    fnGetContractExportForSearchList();
    fnGetCbCustomBy();
    fnGetCbContainerSize();
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
                        {Constant.txtMasterContactExport}
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

export default ExportVessel;
