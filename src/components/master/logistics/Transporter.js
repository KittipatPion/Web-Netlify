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
  CSwitch,
  CTextarea,
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
import functionController from "../../../helpers/FunctionController";
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

const fieldsVat = [
  {
    key: "rateTypeCode",
    label: "Rate Type Code",
  },
  {
    key: "rateTypeName",
    label: "Rate Type Name",
  },
  {
    key: "vatCode",
    label: "Vat Code",
  },
  {
    key: "vatPrice",
    label: "VAT Price",
  },
];

const FMaintable = [
  {
    key: "manage",
    label: "",
    _style: { width: "8%" },
    sorter: false,
    filter: false,
  },
  {
    key: "transporterCode",
    label: "รหัสขนส่ง",
  },
  {
    key: "haulageCode",
    label: "Shipping Code",
  },
  {
    key: "transporterShortName",
    label: "ชื่อขนส่ง(ย่อ)",
  },
  {
    key: "transporterNameEng",
    label: "ชื่อขนส่ง(อังกฤษ)",
  },
  {
    key: "transporterNameThai",
    label: "ชื่อขนส่ง(ไทย)",
  },
  {
    key: "transporterDesc",
    label: "รายละเอียด",
  },
  {
    key: "contractName",
    label: "ชื่อผู้ติดต่อ",
  },
  {
    key: "telNo",
    label: "เบอร์",
  },
  {
    key: "taxNo",
    label: "เลขประจำผู้เสียภาษี",
  },
  {
    key: "branchNo",
    label: "สาขา",
  },
  {
    key: "address",
    label: "ที่อยู่",
  },

  {
    key: "creditTerm",
    label: "เครดิต",
  },
  {
    key: "paymentTypeId",
    label: "วิธีรับเงิน",
  },
  {
    key: "bankName",
    label: "ธนาคาร",
  },
  {
    key: "accountNo",
    label: "เลขที่บัญชี",
  },
  {
    key: "placeCheque",
    label: "จุดรับเช็ค",
  },
  // {
  //   key: "isActive",
  //   label: "สถานะ",
  // },
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
    case "In Active":
      return "danger";
    default:
      return "primary";
  }
};

const ExportAirLCL = () => {
  //DataIn//
  const [InPort, setInPort] = useState([]);
  const [AllInTransport, setAllInTransport] = useState([]);
  const [Transporter, setTransporter] = useState([]);
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

  const pageCode = "";

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
  const [validation, setValidates] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [baseRate, setBaseRate] = useState([]);

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
  const [vatTransporter, setVatTransporter] = useState([]);
  const [mvat, setMvat] = useState([]);
  const [vatSelect, setVatSelect] = useState([]);
  const [cbTransporter, setCbtransporter] = useState([]);
  const _txtUnitBaht = "฿";
  const _txtUnitTon = "ตัน";
  const history = useHistory();
  const [val, setVal] = useState([{}, {}, {}]);
  const [muteBox, setMuteBox] = useState(false);
  const [errortext, seterrortxt] = useState("กรอกข้อมูลให้ครบถ้วน");
  const [errortext1, seterrortxt1] = useState("กรอกข้อมูลให้ครบถ้วน");
  const [collapse1, setCollapse1] = useState(true);
  const [collapse2, setCollapse2] = useState(true);
  const [collapse3, setCollapse3] = useState(true);
  const [collapse4, setCollapse4] = useState(false);
  const [collapse5, setCollapse5] = useState(false);
  const [collapse6, setCollapse6] = useState(false);
  const [primary, setPrimary] = useState(false);
  const [paymentType, setPaymentType] = useState([]);
  const [transportById, setTransportById] = useState([]);
  const [addData, setAddData] = useState([]);
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

  const customData = () => {
    vatTransporter.map((x) => {
      x.vatId = 1;
      x.vatcode = "V0";
      x.vatPrice = 0.0;
    });

    console.log(vatTransporter);
  };

  const handleClickOpen = (type, contractId) => (e) => {
    if (type === "add") {
      console.log(20000);
      customData();
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
  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const clickSearch = (arr) => {
    console.log(arr);
    fnGetExportLCLAIRListBySearch(arr);
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

  const fnClearOtherTableValueList = () => {
    setHeadPlaceContainerReturn([]);
    setCalFuelRateList([]);
    setCalMultiDropRateList([]);
    setCalOverNightRateList([]);
    setInTransportRate([]);
    setInPort([]);
    setInUnloadRate([]);
  };

  const onClickCheckFormEditData = () => {
    if (getIsValidForm("edit-header-need-validation")) {
      if (vatTransporter.length) {
        setIsConfirmEdit(!isConfirmEdit);
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
      <CCard className="p-2">
        <CDataTable
          Toolbar={{}}
          columnFilter={{ disabled: true }}
          tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
          itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
          className="CDataTable"
          items={Transporter}
          fields={FMaintable}
          // key={country.countryId}
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
                        size={Constant.btAddSize}
                        onClick={handleClickOpen("edit", item.transporterId)}
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

    if (type === "TransporterCode") {
      newObj.transporterCode = e.target.value;
    } else if (type === "TransporterShortName") {
      newObj.transporterShortName = e.target.value;
    } else if (type === "TransporterNameEng") {
      newObj.transporterNameEng = e.target.value;
    } else if (type === "TransporterNameThai") {
      newObj.transporterNameThai = e.target.value;
    } else if (type === "shippingCode") {
      newObj.haulageCode = e.target.value;
    } else if (type === "TransporterId") {
      console.log(e.target.value);
      newObj.mainTransporterId = e.target.value;
    } else if (type === "TransporterDesc") {
      newObj.transporterDesc = e.target.value;
    } else if (type === "ContractName") {
      newObj.contractName = e.target.value;
    } else if (type === "TelNo") {
      newObj.telNo = e.target.value;
    } else if (type === "TaxNo") {
      newObj.taxNo = e.target.value;
    } else if (type === "BranchNo") {
      newObj.branchNo = e.target.value;
    } else if (type === "Email") {
      newObj.email = e.target.value;
    } else if (type === "Address") {
      newObj.address = e.target.value;
    } else if (type === "CreditTerm") {
      newObj.creditTerm = e.target.value;
    } else if (type === "PaymentType") {
      newObj.paymentTypeId = e.target.value;
      if (newObj.paymentTypeId == '01') {
        setMuteBox(true);
      } else {
        setMuteBox(false);
      }
    } else if (type === "PlaceCheque") {
      if (newObj.paymentTypeId == 2) {
        newObj.placeCheque = e.target.value;
      } else {
        newObj.placeCheque = "";
      }
    } else if (type === "BankName") {
      if (newObj.paymentTypeId == 1) {
        newObj.bankName = e.target.value;
      } else {
        newObj.bankName = "";
      }
    } else if (type === "AccountNo") {
      if (newObj.paymentTypeId == 1) {
        newObj.accountNo = e.target.value;
      } else {
        newObj.accountNo = "";
      }
    } else if (type === "IsActive") {
      newObj.isActive = e.target.value;
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

  const onHandleChangeadd = (e) => {
    var newObj = {
      transporterCode: "",
      haulageCode: "",
      shippingCodeShortName: "",
      transporterNameEng: "",
      transporterNameThai: "",
      transporterDesc: "",
      contractName: "",
      telNo: "",
      taxNo: "",
      branchNo: "",
      telNo: "",
      taxNo: "",
      branchNo: "",
      address: "",
      email: "",
      creditTerm: null,
      paymentTypeId: "",
      bankName: "",
      accountNo: "",
      isActive: false,
    };

    newObj.transporterCode =
      document.getElementById("in-TransporterCode").value;
    newObj.haulageCode = document.getElementById("in-shippingCode").value;
    newObj.shippingCodeShortName = document.getElementById(
      "in-shippingCodeShortName"
    ).value;

    newObj.transporterNameEng = document.getElementById(
      "in-TransporterNameEng"
    ).value;

    newObj.transporterNameThai = document.getElementById(
      "in-TransporterNameThai"
    ).value;

    newObj.transporterDesc =
      document.getElementById("in-TransporterDesc").value;

    newObj.contractName = document.getElementById("in-ContractName").value;

    newObj.telNo = document.getElementById("in-TelNo").value;

    newObj.taxNo = document.getElementById("in-TaxNo").value;

    newObj.branchNo = document.getElementById("in-BranchNo").value;

    newObj.address = document.getElementById("in-Address").value;

    newObj.email = document.getElementById("in-Email").value;

    newObj.creditTerm = parseInt(
      document.getElementById("in-CreditTerm").value
    );

    newObj.paymentTypeId = document.getElementById("in-PaymentType").value;

    if (newObj.paymentTypeId == '01') {
      setMuteBox(true);
    } else {
      setMuteBox(false);
    }

    newObj.bankName = document.getElementById("in-BankName").value;

    newObj.accountNo = document.getElementById("in-AccountNo").value;

    newObj.placeCheque = document.getElementById("in-PlaceCheque").value;

    newObj.isActive = document.getElementById("in-IsActive").checked;

    console.log(newObj);

    setAddData(newObj);
    // fnUpdateData(newObj);
  };

  const otherTables = (type, item) => {
    if (type === "add") {
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
                  label="Transport"
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
                  {transporterVat()}
                </CRow>
              </TabPanel>
            </SwipeableViews>
          </div>
        </List>
      );
    } else if (type === "edit") {
      if (!isGetDatainCalValue && Object.keys(editData).length) {
        console.log(editData);
        var newObj = { ...editData };
        var newArr = [];
        var newBrr = [];
        if (Object.keys(newObj.transporterVats).length) {
          newObj.transporterVats.map((item) => {
            var obj = {
              transporterId: null,
              rateTypeCode: "",
              rateTypeName: "",
              orderBy: null,
              vatid: null,
              vatCode: "",
              vatPrice: 0.0,
            };
            obj.transporterId = item.transporterId;
            obj.rateTypeCode = item.rateTypeCode;
            var newName = baseRate.find(
              (x) => x.rateTypeCode === item.rateTypeCode
            );
            obj.rateTypeName = newName.rateTypeName;
            obj.orderBy = item.orderBy;
            var newVat = mvat.find((x) => x.vatcode === item.vatCode);
            obj.vatid = newVat.vatid;
            obj.vatCode = item.vatCode;
            obj.vatPrice = item.vatPrice;
            console.log(obj);
            newArr.push(obj);

            // var tt = baseRate.find((s) => s.rateTypeId !== newName.rateTypeId);
            // newBrr.push(tt);
          });

          // var newVrr = [...newArr,...newBrr]
          // console.log(newVrr)
          console.log(newBrr);
          setVatTransporter(newArr);
          console.log(newArr);
          console.log(mvat);

          setIsGetDatainCalValue(true);
        } else {
          customData();
        }
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
                  label="Transport"
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
                  {transporterVat()}
                </CRow>
              </TabPanel>
            </SwipeableViews>
          </div>
        </List>
      );
    }
  };

  const onChangeInputData = (type, index) => (e) => {
    console.log(1111);
    if (type === "vatCode") {
      var newArr = [...vatTransporter];
      if (e.target.value !== "") {
        // newArr[index].initialBy = 1;
        newArr[index].vatid = e.target.value;
        var newVat = mvat.find((x) => x.vatid === parseInt(e.target.value));
        console.log(newVat);
        newArr[index].vatCode = newVat.vatcode;
        newArr[index].vatPrice = newVat.vatPrice;
      } else {
        newArr[index].vatid = 0;
      }
      setVatTransporter(newArr);
    }
  };

  const transporterVat = () => {
    return (
      <CCard className="p-3 justify-content-center">
        <CDataTable
          items={vatTransporter}
          fields={fieldsVat}
          striped
          responsive
          bordered
          size="lg"
          // itemsPerPage={10}
          // pagination
          scopedSlots={{
            vatCode: (item, index) => {
              return (
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
                    <CSelect
                      className="form-control"
                      id={"in-vatCode" + item.vatid}
                      value={item.vatid}
                      onChange={onChangeInputData("vatCode", index)}
                      required
                    >
                      {/* <option selected value="">
                        {Constant.txtformEmptySelected}
                      </option> */}
                      {mvat.map((cb) => (
                        <option value={cb.vatid}>{cb.vatcode} </option>
                      ))}
                    </CSelect>
                  </Box>
                </td>
              );
            },

            vatPrice: (item, index) => {
              return (
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
                    <CSelect
                      className="form-control"
                      id="in-PaymentType"
                      value={item.vatid}
                      disabled
                    >
                      {/* <option selected value="">
                        {Constant.txtformEmptySelected}
                      </option> */}
                      {mvat.map((cb) => (
                        <option value={cb.vatid}>{cb.vatPrice} </option>
                      ))}
                    </CSelect>
                  </Box>
                </td>
              );
            },
          }}
        />
      </CCard>
    );
  };

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

  const onClickAddCheck = () => {
    if (getIsValidForm("transportrate-needs-validation")) {
      setTextEmtry(false);
      console.log(vatTransporter);
      setIsConfirmSave(!isConfirmSave);
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
    } else if (mvat.length) {
      if (type === "add") {
        return (
          <CCard color="gradient-secondary" className="color-card-gra">
            <CForm className="transportrate-needs-validation">
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
                    <CForm>
                      <CCard
                        color="gradient-secondary"
                        className="color-card-gra p-3"
                      >
                        <CForm>
                          <CCardHeader
                            className="font-form-scg-card"
                            style={{
                              backgroundColor: "#50949f",
                              color: "white",
                            }}
                          >
                            1. Information
                            <div className="card-header-actions">
                              {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                              <CLink
                                className="card-header-action"
                                //   onClick={() => setCollapse1(!collapse1)}
                              >
                                {/* <CIcon
                    className="collap-icon"
                    style={{ color: "white" }}
                    name={collapse1 ? "cil-chevron-bottom" : "cil-chevron-top"}
                  /> */}
                              </CLink>
                            </div>
                          </CCardHeader>
                          <CCollapse show={collapse1}>
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
                                <CRow className="m-2 p-0">
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel>รหัสผู้รับเหมา :</CLabel>
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
                                          maxLength="10"
                                          id="in-TransporterCode"
                                          name="nf-email"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel>Shipping Code :</CLabel>
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
                                          invalid={validation}
                                          id="in-shippingCode"
                                          type="text"
                                          maxLength="50"
                                          name="nf-email"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel>ชื่อผู้รับเหมา(ย่อ) :</CLabel>
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
                                          invalid={validation}
                                          id="in-shippingCodeShortName"
                                          type="text"
                                          maxLength="50"
                                          name="nf-email"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CForm>
                                      <CFormGroup>
                                        <CLabel>
                                          ชื่อผู้รับเหมา(อังกฤษ) :
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
                                            id="in-TransporterNameEng"
                                            type="text"
                                            maxLength="50"
                                            onChange={onHandleChangeadd}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext}
                                        </CInvalidFeedback>
                                      </CFormGroup>
                                    </CForm>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel>ชื่อผู้รับเหมา(ไทย) :</CLabel>
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
                                          invalid={validation}
                                          id="in-TransporterNameThai"
                                          type="text"
                                          maxLength="50"
                                          name="nf-email"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>

                                  <CCol xs="12" sm="6" md="4">
                                    <CFormGroup>
                                      <CLabel>Main Transporter</CLabel>
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
                                          // id="in-PaymentType"
                                          onChange={onHandleChangeadd}
                                          disabled
                                        >
                                          <option selected value="">
                                            Please Select Transporter
                                          </option>
                                          {transporterList.map((cb) => (
                                            <option value={cb.valueMember}>
                                              {`[${cb.transporterCode}]` +
                                                "  " +
                                                cb.transporterNameThai}{" "}
                                            </option>
                                          ))}
                                        </CSelect>
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="4">
                                    <CFormGroup>
                                      <CLabel>รายละเอียด :</CLabel>
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
                                          id="in-TransporterDesc"
                                          name="nf-email"
                                          maxLength="255"
                                          onChange={onHandleChangeadd}
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                              </CCardBody>
                            </Box>
                          </CCollapse>
                        </CForm>
                      </CCard>
                      <CCard
                        color="gradient-secondary"
                        className="color-card-gra p-3"
                      >
                        <CForm>
                          <CCardHeader
                            className="font-form-scg-card"
                            style={{
                              backgroundColor: "#50949f",
                              color: "white",
                            }}
                          >
                            2. ข้อมูลผู้ติดต่อ
                            <div className="card-header-actions">
                              {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                              <CLink
                                className="card-header-action"
                                //   onClick={() => setCollapse2(!collapse2)}
                              >
                                {/* <CIcon
                    className="collap-icon"
                    style={{ color: "white" }}
                    name={collapse2 ? "cil-chevron-bottom" : "cil-chevron-top"}
                  /> */}
                              </CLink>
                            </div>
                          </CCardHeader>
                          <CCollapse show={collapse2}>
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
                                <CRow className="m-2 p-0">
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel>ชื่อผู้ติดต่อ :</CLabel>
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
                                          id="in-ContractName"
                                          name="nf-email"
                                          maxLength="255"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel>หมายเลขโทรศัพท์ :</CLabel>
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
                                          id="in-TelNo"
                                          name="nf-email"
                                          maxLength="50"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel>เลขผู้เสียภาษี :</CLabel>
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
                                          id="in-TaxNo"
                                          name="nf-email"
                                          maxLength="15"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel for="validationCustom03">
                                        สาขา :
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
                                          id="in-BranchNo"
                                          name="nf-email"
                                          maxLength="20"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="6">
                                    <CFormGroup>
                                      <CLabel for="validationCustom03">
                                        Email :
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
                                          id="in-Email"
                                          name="nf-Email"
                                          maxLength="255"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                                <CRow class="align-baseline">
                                  <CFormGroup>
                                    <CCol xs="12" sm="6" md="3">
                                      <CLabel htmlFor="textarea-input">
                                        ที่อยู่ :
                                      </CLabel>
                                    </CCol>
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
                                        <CTextarea
                                          name="textarea-input"
                                          id="in-Address"
                                          rows="3"
                                          placeholder=""
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                    </CCol>
                                    <CInvalidFeedback>
                                      {errortext1}
                                    </CInvalidFeedback>
                                  </CFormGroup>
                                </CRow>
                              </CCardBody>
                            </Box>
                          </CCollapse>
                        </CForm>
                      </CCard>
                      <CCard
                        color="gradient-secondary"
                        className="color-card-gra p-3"
                      >
                        <CForm>
                          <CCardHeader
                            className="font-form-scg-card"
                            style={{
                              backgroundColor: "#50949f",
                              color: "white",
                            }}
                          >
                            3. รายละเอียดการจ่าย
                            <div className="card-header-actions">
                              {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                              <CLink
                                className="card-header-action"
                                //   onClick={() => setCollapse3(!collapse3)}
                              >
                                {/* <CIcon
                    className="collap-icon"
                    style={{ color: "white" }}
                    name={collapse3 ? "cil-chevron-bottom" : "cil-chevron-top"}
                  /> */}
                              </CLink>
                            </div>
                          </CCardHeader>
                          <CCollapse show={collapse3}>
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
                                <CRow className="m-2 p-0">
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel for="validationCustom03">
                                        เครดิต :
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
                                          onInput={(e) =>
                                            (e.target.value =
                                              e.target.value.slice(0, 4))
                                          }
                                          type="number"
                                          id="in-CreditTerm"
                                          name="nf-email"
                                          onChange={onHandleChangeadd}
                                          required
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CForm>
                                      <CFormGroup>
                                        <CLabel htmlFor="nf-email">
                                          วิธีรับเงิน :
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
                                            id="in-PaymentType"
                                            onChange={onHandleChangeadd}
                                            required
                                          >
                                            <option selected value="">
                                              {Constant.txtformEmptySelected}
                                            </option>
                                            {paymentType.map((cb) => (
                                              <option value={cb.valueMember}>
                                                {cb.displayMember}{" "}
                                              </option>
                                            ))}
                                          </CSelect>
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext}
                                        </CInvalidFeedback>
                                      </CFormGroup>
                                    </CForm>
                                  </CCol>
                                </CRow>
                                <CRow className="m-2 p-0">
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel for="validationCustom03">
                                        จุดรับเช็ค :
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
                                          maxLength="50"
                                          id="in-PlaceCheque"
                                          disabled={muteBox}
                                          invalid={validation}
                                          // value={transporterDesc}
                                          onChange={onHandleChangeadd}
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                                <CRow className="m-2 p-0">
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel for="validationCustom03">
                                        ธนาคาร :
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
                                          id="in-BankName"
                                          disabled={!muteBox}
                                          maxLength="20"
                                          name="nf-email"
                                          // value={transporterNameEng}
                                          onChange={onHandleChangeadd}
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>
                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel for="validationCustom03">
                                        เลขบัญชี :
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
                                          invalid={validation}
                                          disabled={!muteBox}
                                          // onInput={(e) => e.target.value = e.target.value.slice(0, 15)}
                                          id="in-AccountNo"
                                          type="text"
                                          // max="999999999999999"
                                          //  min="0"
                                          maxLength="15"
                                          // value={transporterNameThai}
                                          onChange={onHandleChangeadd}
                                        />
                                      </Box>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                      {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                    </CFormGroup>
                                  </CCol>

                                  <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                      <CLabel for="validationCustom03">
                                        สถานะ :
                                      </CLabel>
                                      <br />
                                      <CSwitch
                                        className={"mx-1"}
                                        variant={"3d"}
                                        color={"success"}
                                        id="in-IsActive"
                                        onChange={onHandleChangeadd}
                                        defaultChecked={false}
                                        labelOn={"\u2713"}
                                        labelOff={"\u2715"}
                                      />
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                              </CCardBody>
                            </Box>
                          </CCollapse>
                        </CForm>
                      </CCard>

                      <CRow className="justify-content-center mt-2 pb-3">
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
                              block
                              onClick={onClickAddCheck}
                              color="success"
                            >
                              บันทึก
                            </CButton>
                          </Box>
                        </CCol>
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
                              color="danger"
                              block
                              onClick={toggle}
                            >
                              ยกเลิก
                            </CButton>
                          </Box>
                        </CCol>
                      </CRow>

                      <CModal
                        show={primary}
                        onClose={() => setPrimary(!primary)}
                        color="success"
                      >
                        <CModalHeader closeButton>
                          <h5>
                            <CModalTitle>ตรวจสอบข้อมูล</CModalTitle>
                          </h5>
                        </CModalHeader>
                        <CModalBody>
                          คุณต้องการจะเพิ่มข้อมูลใช่หรือไม่?
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            color="success"
                            onClick={fnAddTransporterList}
                          >
                            {" "}
                            {/*addCountry(countryCode, countryNameEng, countryNameThai, isActive)*/}
                            ยืนยัน
                          </CButton>{" "}
                          <CButton
                            color="secondary"
                            onClick={() => setPrimary(!primary)}
                          >
                            ยกเลิก
                          </CButton>
                        </CModalFooter>
                      </CModal>
                    </CForm>
                  </Box>
                </CCardBody>
              </CCollapse>
            </CForm>
          </CCard>
        );
      } else if (type === "edit") {
        if (Object.keys(editData).length) {
          console.log("editData", editData);
          var newObj = { ...editData };
          var TransporterId = newObj.transporterId;
          var MainTransporterId =
            newObj.mainTransporterId === null
              ? newObj.transporterId
              : newObj.mainTransporterId;
          var TransporterCode = newObj.transporterCode;
          var HaulageCode = newObj.haulageCode;
          var TransporterNameEng = newObj.transporterNameEng;
          var TransporterNameThai = newObj.transporterNameThai;
          var TransporterShortName = newObj.transporterShortName;
          var TransporterDesc = newObj.transporterDesc;
          var ContractName = newObj.contractName;
          var TelNo = newObj.telNo;
          var TaxNo = newObj.taxNo;
          var BranchNo = newObj.branchNo;
          var Email = newObj.email;
          var Address = newObj.address;
          var CreditTerm = newObj.creditTerm;
          var PaymentTypeId = newObj.paymentTypeId;
          console.log(PaymentTypeId);
          var BankName = newObj.bankName;
          var AccountNo = newObj.accountNo;
          var PlaceCheque = newObj.placeCheque;
          var IsActive = newObj.isActive;

          return (
            <CCard color="gradient-secondary" className="color-card-gra">
              <CForm className="edit-header-need-validation">
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
                      <CForm>
                        <CCard
                          color="gradient-secondary"
                          className="color-card-gra p-3"
                        >
                          <CForm>
                            <CCardHeader
                              className="font-form-scg-card"
                              style={{
                                backgroundColor: "#50949f",
                                color: "white",
                              }}
                            >
                              1. Information
                              <div className="card-header-actions">
                                {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                                <CLink
                                  className="card-header-action"
                                  //   onClick={() => setCollapse1(!collapse1)}
                                >
                                  {/* <CIcon
                    className="collap-icon"
                    style={{ color: "white" }}
                    name={collapse1 ? "cil-chevron-bottom" : "cil-chevron-top"}
                  /> */}
                                </CLink>
                              </div>
                            </CCardHeader>
                            <CCollapse show={collapse1}>
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
                                  <CRow className="m-2 p-0">
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel>รหัสผู้รับเหมา :</CLabel>
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
                                            maxLength="10"
                                            id="edit-header-TransporterCode"
                                            name="nf-email"
                                            value={TransporterCode}
                                            onChange={handleChangeEditForm(
                                              "TransporterCode"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel>Shipping Code :</CLabel>
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
                                            invalid={validation}
                                            id="edit-header-shippingCode"
                                            type="text"
                                            maxLength="50"
                                            name="nf-email"
                                            value={HaulageCode}
                                            onChange={handleChangeEditForm(
                                              "shippingCode"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel>ชื่อผู้รับเหมา(ย่อ) :</CLabel>
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
                                            invalid={validation}
                                            id="edit-header-TransporterShortName"
                                            type="text"
                                            maxLength="50"
                                            name="nf-email"
                                            value={TransporterShortName}
                                            onChange={handleChangeEditForm(
                                              "TransporterShortName"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CForm>
                                        <CFormGroup>
                                          <CLabel>
                                            ชื่อผู้รับเหมา(อังกฤษ) :
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
                                              id="edit-header-TransporterNameEng"
                                              type="text"
                                              maxLength="50"
                                              value={TransporterNameEng}
                                              onChange={handleChangeEditForm(
                                                "TransporterNameEng"
                                              )}
                                              required
                                            />
                                          </Box>
                                          <CInvalidFeedback>
                                            {errortext}
                                          </CInvalidFeedback>
                                        </CFormGroup>
                                      </CForm>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel>ชื่อผู้รับเหมา(ไทย) :</CLabel>
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
                                            invalid={validation}
                                            id="edit-header-TransporterNameThai"
                                            type="text"
                                            maxLength="50"
                                            name="nf-email"
                                            value={TransporterNameThai}
                                            onChange={handleChangeEditForm(
                                              "TransporterNameThai"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="6" md="4">
                                      <CFormGroup>
                                        <CLabel>Main Transporter</CLabel>
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
                                            value={MainTransporterId}
                                            id="edit-header-transporterId"
                                            onChange={handleChangeEditForm(
                                              "TransporterId"
                                            )}
                                          >
                                            <option selected value="">
                                              Please Select Transporter
                                            </option>
                                            {transporterList.map((cb) => (
                                              <option value={cb.transporterId}>
                                                {`[${cb.transporterCode}]` +
                                                  "  " +
                                                  cb.transporterNameThai}{" "}
                                              </option>
                                            ))}
                                          </CSelect>
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="4">
                                      <CFormGroup>
                                        <CLabel>รายละเอียด :</CLabel>
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
                                            id="edit-header-TransporterDesc"
                                            name="nf-email"
                                            value={TransporterDesc}
                                            maxLength="255"
                                            onChange={handleChangeEditForm(
                                              "TransporterDesc"
                                            )}
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                  </CRow>
                                </CCardBody>
                              </Box>
                            </CCollapse>
                          </CForm>
                        </CCard>
                        <CCard
                          color="gradient-secondary"
                          className="color-card-gra p-3"
                        >
                          <CForm>
                            <CCardHeader
                              className="font-form-scg-card"
                              style={{
                                backgroundColor: "#50949f",
                                color: "white",
                              }}
                            >
                              2. ข้อมูลผู้ติดต่อ
                              <div className="card-header-actions">
                                {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                                <CLink
                                  className="card-header-action"
                                  //   onClick={() => setCollapse2(!collapse2)}
                                >
                                  {/* <CIcon
                    className="collap-icon"
                    style={{ color: "white" }}
                    name={collapse2 ? "cil-chevron-bottom" : "cil-chevron-top"}
                  /> */}
                                </CLink>
                              </div>
                            </CCardHeader>
                            <CCollapse show={collapse2}>
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
                                  <CRow className="m-2 p-0">
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel>ชื่อผู้ติดต่อ :</CLabel>
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
                                            id="edit-header-ContractName"
                                            name="nf-email"
                                            value={ContractName}
                                            maxLength="255"
                                            onChange={handleChangeEditForm(
                                              "ContractName"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel>หมายเลขโทรศัพท์ :</CLabel>
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
                                            id="edit-header-TelNo"
                                            name="nf-email"
                                            value={TelNo}
                                            maxLength="50"
                                            onChange={handleChangeEditForm(
                                              "TelNo"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel>เลขผู้เสียภาษี :</CLabel>
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
                                            id="edit-header-TaxNo"
                                            name="nf-email"
                                            value={TaxNo}
                                            maxLength="15"
                                            onChange={handleChangeEditForm(
                                              "TaxNo"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel for="validationCustom03">
                                          สาขา :
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
                                            id="edit-header-BranchNo"
                                            value={BranchNo}
                                            name="nf-email"
                                            maxLength="20"
                                            onChange={handleChangeEditForm(
                                              "BranchNo"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="6">
                                      <CFormGroup>
                                        <CLabel for="validationCustom03">
                                          Email :
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
                                            id="edit-header-Email"
                                            value={Email}
                                            name="nf-email"
                                            maxLength="255"
                                            onChange={handleChangeEditForm(
                                              "Email"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                  </CRow>
                                  <CRow class="align-baseline">
                                    <CFormGroup>
                                      <CCol xs="12" sm="6" md="3">
                                        <CLabel htmlFor="textarea-input">
                                          ที่อยู่ :
                                        </CLabel>
                                      </CCol>
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
                                          <CTextarea
                                            name="textarea-input"
                                            id="edit-header-Address"
                                            rows="3"
                                            placeholder=""
                                            value={Address}
                                            onChange={handleChangeEditForm(
                                              "Address"
                                            )}
                                            required
                                          />
                                        </Box>
                                      </CCol>
                                      <CInvalidFeedback>
                                        {errortext1}
                                      </CInvalidFeedback>
                                    </CFormGroup>
                                  </CRow>
                                </CCardBody>
                              </Box>
                            </CCollapse>
                          </CForm>
                        </CCard>
                        <CCard
                          color="gradient-secondary"
                          className="color-card-gra p-3"
                        >
                          <CForm>
                            <CCardHeader
                              className="font-form-scg-card"
                              style={{
                                backgroundColor: "#50949f",
                                color: "white",
                              }}
                            >
                              3. รายละเอียดการจ่าย
                              <div className="card-header-actions">
                                {/* <CLink className="card-header-action">
                                    <CIcon name="cil-settings" />
                                </CLink> */}
                                <CLink
                                  className="card-header-action"
                                  //   onClick={() => setCollapse3(!collapse3)}
                                >
                                  {/* <CIcon
                    className="collap-icon"
                    style={{ color: "white" }}
                    name={collapse3 ? "cil-chevron-bottom" : "cil-chevron-top"}
                  /> */}
                                </CLink>
                              </div>
                            </CCardHeader>
                            <CCollapse show={collapse3}>
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
                                  <CRow className="m-2 p-0">
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel for="validationCustom03">
                                          เครดิต :
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
                                            onInput={(e) =>
                                              (e.target.value =
                                                e.target.value.slice(0, 4))
                                            }
                                            type="number"
                                            id="edit-header-CreditTerm"
                                            name="nf-email"
                                            value={CreditTerm}
                                            onChange={handleChangeEditForm(
                                              "CreditTerm"
                                            )}
                                            required
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CForm>
                                        <CFormGroup>
                                          <CLabel htmlFor="nf-email">
                                            วิธีรับเงิน :
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
                                              id="edit-header-PaymentType"
                                              value={PaymentTypeId}
                                              onChange={handleChangeEditForm(
                                                "PaymentType"
                                              )}
                                              required
                                            >
                                              <option selected value="">
                                                {Constant.txtformEmptySelected}
                                              </option>
                                              {paymentType.map((cb) => (
                                                <option value={cb.valueMember}>
                                                  {cb.displayMember}{" "}
                                                </option>
                                              ))}
                                            </CSelect>
                                          </Box>
                                          <CInvalidFeedback>
                                            {errortext}
                                          </CInvalidFeedback>
                                        </CFormGroup>
                                      </CForm>
                                    </CCol>
                                  </CRow>
                                  <CRow className="m-2 p-0">
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel for="validationCustom03">
                                          จุดรับเช็ค :
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
                                            maxLength="50"
                                            id="edit-header-PlaceCheque"
                                            disabled={muteBox}
                                            invalid={validation}
                                            value={PlaceCheque}
                                            // value={transporterDesc}
                                            onChange={handleChangeEditForm(
                                              "PlaceCheque"
                                            )}
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                  </CRow>
                                  <CRow className="m-2 p-0">
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel for="validationCustom03">
                                          ธนาคาร :
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
                                            id="edit-header-BankName"
                                            disabled={!muteBox}
                                            maxLength="20"
                                            value={BankName}
                                            name="nf-email"
                                            // value={transporterNameEng}
                                            onChange={handleChangeEditForm(
                                              "BankName"
                                            )}
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>
                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel for="validationCustom03">
                                          เลขบัญชี :
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
                                            invalid={validation}
                                            disabled={!muteBox}
                                            // onInput={(e) => e.target.value = e.target.value.slice(0, 15)}
                                            id="edit-header-AccountNo"
                                            type="text"
                                            value={AccountNo}
                                            // max="999999999999999"
                                            //  min="0"
                                            maxLength="15"
                                            // value={transporterNameThai}
                                            onChange={handleChangeEditForm(
                                              "AccountNo"
                                            )}
                                          />
                                        </Box>
                                        <CInvalidFeedback>
                                          {errortext1}
                                        </CInvalidFeedback>
                                        {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                      </CFormGroup>
                                    </CCol>

                                    <CCol xs="12" sm="6" md="3">
                                      <CFormGroup>
                                        <CLabel for="validationCustom03">
                                          สถานะ :
                                        </CLabel>
                                        <br />
                                        <CSwitch
                                          className={"mx-1"}
                                          variant={"3d"}
                                          color={"success"}
                                          id="edit-header-IsActive"
                                          checked={IsActive}
                                          onChange={handleChangeEditForm(
                                            "IsActive"
                                          )}
                                          defaultChecked={false}
                                          labelOn={"\u2713"}
                                          labelOff={"\u2715"}
                                        />
                                      </CFormGroup>
                                    </CCol>
                                  </CRow>
                                </CCardBody>
                              </Box>
                            </CCollapse>
                          </CForm>
                        </CCard>

                        <CRow className="justify-content-center mt-2 pb-3">
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
                                block
                                onClick={onClickCheckFormEditData}
                                color="success"
                              >
                                บันทึก
                              </CButton>
                            </Box>
                          </CCol>
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
                                color="danger"
                                block
                                onClick={toggle}
                              >
                                ยกเลิก
                              </CButton>
                            </Box>
                          </CCol>
                        </CRow>
                      </CForm>
                    </Box>
                  </CCardBody>
                </CCollapse>
              </CForm>
            </CCard>
          );
        }
      }
    }
  };

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
              ? Constant.contentSuccessEditData
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
          <CButton color="success" onClick={fnAddTransporterList}>
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

      {/* Start Add Modal */}
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
          <CButton color="success" onClick={fnUpdateData}>
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

      {/* End Add Modal */}

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
    console.log(linkData);
    VariableController.linkShipmentNo = newObj.shipmentNo;
    VariableController.linkDeliveryNo = newObj.deliveryNo;
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
          window.location.reload(false);
        } else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnAddTransporterList = () => {
    setTypeShowSuccess("Add");
    console.log(addData);
    console.log(vatTransporter);
    setIsPostingData(true);
    setIsConfirmSave(!isConfirmSave);
    Repository.fetchAddTransporterList(addData, vatTransporter).then(
      (result) => {
        setIsPostingData(false);
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setIsShowSuccess(!isShowSuccess);
        } else {
          console.log(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        console.log(error);
      }
    );
  };

  const fnUpdateData = () => {
    setTypeShowSuccess("Edit");
    console.log("editData", editData);
    console.log("vatTransporter", vatTransporter);
    setIsPostingData(true);
    setIsConfirmEdit(!isConfirmEdit);
    Repository.fetchEditTransporterList(editData, vatTransporter).then(
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
    Repository.fetchRemoveContractExportLCLAIRList(index).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          window.location.reload(false);
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

  const fnGetTransporterListById = (transportId) => {
    setIsLoadingData(true);
    Repository.fetchTransporterListById(transportId).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setTransportById(result.data);
          console.log(result.data);
        } else {
          console.log(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        console.log(error);
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

    Repository.fetchTransporterListById(index).then(
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
          console.log(result.data);
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

  const fnGetTransporterList = () => {
    Repository.fetchTransporterList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          console.log(result.data);
          result.data.map((x) => {
            x.haulageCode = x.haulageCode === null ? "" : x.haulageCode;
            x.transporterShortName =
              x.transporterShortName === null ? "" : x.transporterShortName;
          });
          setTransporter(result.data);
        } else {
          console.log(result);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const fnGetTransporterRate = () => {
    Repository.fetchTransporterRateList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setVatTransporter(result.data);
          setBaseRate(result.data);
          console.log(result.data);
        } else {
          console.log(result);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const fnGetTransporterVat = () => {
    Repository.fetchTransporterVatList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setMvat(result.data);
          console.log(result.data);
        } else {
          console.log(result);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const fnGetCbPaymentType = () => {
    Repository.fetchCbPaymentTypeList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setPaymentType(result.data);
          console.log(result.data);
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
    var result = functionController.getUserAuthenOneRole(pageCode);
    if (result.isAuth) {
      // initeState();
    } else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
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
      };
      setLinkData(newObj);
      setIsLinkData(true);
      setIsLoaded(true);
      // fnGetDataForEdit(VariableController.linkContractId);
      // setOpenEditForm(true);
      // setIndexEditForm(VariableController.linkContractId);
    } else {
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

      /**NEW API */
      fnGetCbPaymentType();
      fnGetTransporterList();
      fnGetTransporterVat();
      fnGetTransporterRate();
      fnGetCbDeliveryMode();
      fnGetPlaceConList();
      fnGetCyPlace();
      fnGetPortList();
      getFullYearForSearch();
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
                      <h3 className="headertable">Transporter</h3>
                    </CCol>
                    <CCol xs="6" sm="4" md="2">
                      {dialogs()}
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {/* {mainFormSearch()} */}
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
