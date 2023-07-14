import React, { useState, useEffect } from "react";
import Repository from "../../../repositories/Repository";
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
  CTextarea,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import PropTypes, { func } from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import Constant from "../../../helpers/Constant";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Typography } from "@material-ui/core";
import MakeStyleSheet from "../../../helpers/MakeStyleSheet";
import VariableController from "../../../helpers/VariableController";
import functionController from "../../../helpers/FunctionController";

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

const FtruckLicenseNo = [
  {
    key: "truckLicense",
    label: `${Constant.arrFieldMasterConDomTruckLicense[0]}`,
  },
];

const FUnloadRate = [
  {
    key: "manPower",
    label: `${Constant.arrFieldMasterConDomUnload[0]}`,
  },
  {
    key: "minRatePrice",
    label: `${Constant.arrFieldMasterConDomUnload[1]}`,
  },
  {
    key: "unloadPrice",
    label: `${Constant.arrFieldMasterConDomUnload[2]}`,
  },
  {
    key: "unitTon",
    label: `${Constant.arrFieldMasterConDomUnload[3]}`,
  },
  {
    key: "delete_UnloadRate",
    label: "",
    _style: { width: "17%" },
    sorter: false,
    filter: false,
  },
];
const FUnloadRateNo = [
  {
    key: "manPower",
    label: `${Constant.arrFieldMasterConDomUnload[0]}`,
    digit: false,
  },
  {
    key: "minRatePrice",
    label: `${Constant.arrFieldMasterConDomUnload[1]}`,
    digit: 2,
  },
  {
    key: "unloadPrice",
    label: `${Constant.arrFieldMasterConDomUnload[2]}`,
    digit: 2,
  },
  {
    key: "unitTon",
    label: `${Constant.arrFieldMasterConDomUnload[3]}`,
    digit: 3,
  },
];

const FTransportRate = [
  {
    key: "shipToNameThai",
    label: `${Constant.arrFieldMasterConDomTransport[0]}`,
    _style: { width: "20%" },
  },
  {
    key: "provinceName1",
    label: `${Constant.arrFieldMasterConDomTransport[1]}`,
  },
  {
    key: "districtName1",
    label: `${Constant.arrFieldMasterConDomTransport[2]}`,
  },
  {
    key: "price",
    label: `${Constant.arrFieldMasterConDomTransport[3]}`,
    _style: { fontFamily: "Scg" },
    digit: 2,
  },
  {
    key: "fuelPrice",
    label: `${Constant.arrFieldMasterConDomTransport[4]}`,
    digit: 2,
  },
  {
    key: "delete_transportRate",
    label: "",
    _style: { width: "8%" },
    sorter: false,
    filter: false,
  },
];

const FTransportRateTable = [
  {
    key: "shipToName",
    label: `${Constant.arrFieldMasterConDomTransport[0]}`,
  },
  {
    key: "provinceName",
    label: `${Constant.arrFieldMasterConDomTransport[1]}`,
  },
  {
    key: "districtName",
    label: `${Constant.arrFieldMasterConDomTransport[2]}`,
  },
  {
    key: "price",
    label: `${Constant.arrFieldMasterConDomTransport[3]}`,
    _style: { fontFamily: "Scg" },
    digit: 2,
  },
  {
    key: "fuelPrice",
    label: `${Constant.arrFieldMasterConDomTransport[4]}`,
    digit: 2,
  },
];

const FFuelRate = [
  {
    key: "fuelFrom",
    label: `${Constant.arrFieldMasterConDomFuel[0]}`,
    _style: { width: "30%" },
    digit: 2,
  },
  {
    key: "fuelTo",
    label: `${Constant.arrFieldMasterConDomFuel[1]}`,
    _style: { width: "30%" },
    digit: 2,
  },
  {
    key: "seqRate",
    label: `${Constant.arrFieldMasterConDomFuel[2]}`,
    _style: { width: "40%" },
    digit: 2,
  },
];

const FMultiDropRate = [
  {
    key: "distanceFrom",
    label: `${Constant.arrFieldMasterConDomMultiDrop[0]}`,
    digit: 2,
  },
  {
    key: "distanceTo",
    label: `${Constant.arrFieldMasterConDomMultiDrop[1]}`,
    digit: 2,
  },
  {
    key: "distancePrice",
    label: `${Constant.arrFieldMasterConDomMultiDrop[2]}`,
    digit: 2,
  },
];

const FMultiDropRateManage = [...FMultiDropRate];
FMultiDropRateManage.push({
  key: "manage",
  label: "",
  _style: { width: "18%" },
  sorter: false,
  filter: false,
});

const FOverNightpRate = [
  {
    key: "provinceName",
    label: `${Constant.arrFieldMasterConDomOverNight[0]}`,
  },
  {
    key: "overnightPerManPrice",
    label: `${Constant.arrFieldMasterConDomOverNight[1]}`,
    digit: 2,
  },
];

const FOverNightpRateManage = [...FOverNightpRate];
FOverNightpRateManage.push({
  key: "manage",
  label: "",
  _style: { width: "20%" },
  sorter: false,
  filter: false,
});

const fields = [
  {
    key: "manage",
    label: "",
    _style: { width: "4%" },
    sorter: false,
    filter: false,
  },
  {
    key: "contractStatus",
    label: `${Constant.arrFieldMasterConDomHeader[14]}`,
  },
  {
    key: "sourceName",
    label: `${Constant.arrFieldMasterConDomHeader[1]}`,
  },
  {
    key: "startDate",
    label: `${Constant.arrFieldMasterConDomHeader[12]}`,
  },
  {
    key: "endDate",
    label: `${Constant.arrFieldMasterConDomHeader[13]}`,
  },
  {
    key: "transporterName",
    label: `${Constant.arrFieldMasterConDomHeader[2]}`,
  },
  {
    key: "contractNo",
    label: `${Constant.arrFieldMasterConDomHeader[0]}`,
    _style: { width: "8%" },
  },
  {
    key: "truckTypeName",
    label: `${Constant.arrFieldMasterConDomHeader[3]}`,
  },
  {
    key: "fuelTypeName",
    label: `${Constant.arrFieldMasterConDomHeader[4]}`,
    _style: { width: "8%" },
  },
  {
    key: "rateTypeName",
    label: `${Constant.arrFieldMasterConDomHeader[5]}`,
    _style: { width: "8%" },
  },
  {
    key: "unloadTypeName",
    label: `${Constant.arrFieldMasterConDomHeader[6]}`,
  },
  {
    key: "packageType",
    label: `${Constant.arrFieldMasterConDomHeader[7]}`,
    _style: { width: "8%" },
  },
  // {
  //   key: "show_details",
  //   label: "",
  //   _style: { width: "1%" },
  //   sorter: false,
  //   filter: false,
  // },
];

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
    backgroundColor: "#056776",
  },
  tabRoot: {
    fontFamily: "Scg",
    fontWeight: "normal",
    color: "black ",
    backgroundColor: "#056776",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function Domestic() {
  //GetData//
  const [getshipto, setGetShipTo] = useState([]);
  //

  //DataIn//
  const [InTruckLicense, setInTruckLicense] = useState([]);
  const [AllInTransport, setAllInTransport] = useState([]);

  const [InTransportRate, setInTransportRate] = useState([]);
  const [InUnloadRate, setInUnloadRate] = useState([]);
  const [InTransportRateByPD, setInTransportRateByPD] = useState([]);
  //
  const [data, setData] = useState([]);
  const [cloneData, setCloneData] = useState({});
  const [editData, setEditData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [source, setSource] = useState([]);
  const [details, setDetails] = useState([]);
  const [validatecheck, setvalidatecheck] = useState("");
  const [validAlert, setValidAlert] = useState(false);
  const [collapsed, setCollapsed] = React.useState(true);

  //Input//
  const [inputTruckLicense, setInputTruckLicense] = useState("");

  //

  //Combobox//
  const [CbProvinceDistrict, setCbProvinceDistrict] = useState([]);
  const [truckType, setTruckType] = useState([]);
  const [fuelType, setFuelType] = useState([]);
  const [rateType, setRateType] = useState([]);
  const [unload, setUnloadType] = useState([]);
  const [packageType, setPackage] = useState([]);
  const [contractStatus, setContractStatus] = useState([]);

  //

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [errorAPI, setErrorAPI] = useState(null);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [isConfirmDeleteRecordOT, setIsConfirmDeleteRecordOT] = useState(false);

  const [typeShowSuccess, setTypeShowSuccess] = useState("");
  const [arrForRemoveRecord, setArrForRemoveRecord] = useState(["", 0]);

  const [isWarningInputForm, setIsWarningInputForm] = useState(false);
  const [isGetDatainCalValue, setIsGetDatainCalValue] = useState(false);
  const [isGetDataOtherTable, setIsGetDataOtherTable] = useState(false);

  const [fullYearList, setFullYearList] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  const [calFuelRateList, setCalFuelRateList] = useState([]);
  const [headerMinValueForMax, setHeaderMinValueForMax] = useState(null);
  const [headerMaxValueForMin, setHeaderMaxValueForMin] = useState(null);
  const [fuelRateMinEnd, setFuelRateMinEnd] = useState(0);
  const [calMultiDropRateList, setCalMultiDropRateList] = useState([]);
  const [multiDropRateMinEnd, setMultiDropRateMinEnd] = useState(0);

  const [invalidFuelRateEnd, setInvalidFuelRateEnd] = useState(false);
  const [invalidMultiDropStart, setInvalidMultiDropStart] = useState(false);
  const [invalidMultiDropEnd, setInvalidMultiDropEnd] = useState(false);

  const [calOverNightRateList, setCalOverNightRateList] = useState([]);
  const [provinceThaiList, setProvinceThaiList] = useState([]);
  const [provinceOverNightList, setProvinceOverNightList] = useState([]);
  const [transporterList, setTransporterList] = useState([]);

  const [itemSelectSearch, setItemSelectSearch] = useState([{}, {}, {}]);
  const [itemSelectAdd, setItemSelectAdd] = useState([{}, {}, {}]);
  const [itemSelectEdit, setItemSelectEdit] = useState([{}, {}, {}]);
  const [itemSelectOther, setItemSelectOther] = useState([{}, {}]);

  const [invalidMaterialFormSearch, setInvalidMaterialFormSearch] = useState([
    false,
  ]);
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
  const [invalidMaterialFormOther, setInvalidMaterialFormOther] = useState([
    false,
    false,
  ]);

  const [isShowCloned, setIsShowCloned] = useState(false);
  const [isShowCloneSuccess, setIsShowCloneSuccess] = useState(false);
  const [isShowExitClone, setIsShowExitClone] = useState(false);

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [indexEditForm, setIndexEditForm] = useState(null);

  const [linkData, setLinkData] = useState({});
  const [isLinkData, setIsLinkData] = useState(false);

  const [accordion, setAccordion] = useState(1);

  const _classes = useStyles();
  const classes = MakeStyleSheet.useStyles();
  const history = useHistory();

  const pageCode = "/mstcontdom";

  const _txtUnitBaht = "฿";
  const _txtUnitTon = "ตัน";

  const _UserId = parseInt(localStorage.getItem("userId"));

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

  const handleChange = (event, newValue) => {
    setFuelRateMinEnd(0);
    setMultiDropRateMinEnd(0);
    setInvalidFuelRateEnd(false);
    setInvalidMultiDropStart(false);
    setInvalidMultiDropEnd(false);
    setInvalidMaterialFormOther([false, false]);
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClickOpen = (type, contractId) => (e) => {
    if (type === "add") {
      fnGetContractDomesticOtherList();
      setOpenAddForm(true);
    } else if (type === "edit") {
      fnGetDataForEdit(contractId);
      setOpenEditForm(true);
      setIndexEditForm(contractId);
    }
  };

  const handleClose = (type) => (e) => {
    if (!isShowSuccess) {
      if (type === "add") {
        if (Object.keys(cloneData).length) {
          setIsShowExitClone(!isShowExitClone);
        } else {
          fnClearOtherTableValueList();
          setIsGetDataOtherTable(false);
          setOpenAddForm(false);
        }
      } else if (type === "edit") {
        setOpenEditForm(false);
        setIndexEditForm(null);
        setIsGetDatainCalValue(false);
        setEditData({});
        setItemSelectEdit([{}, {}, {}]);
      }
    }
  };

  // const handleRemoveItem = (idTruck) => (e) => {
  //     var newArr = [];
  //     console.log(idTruck)
  //     InTruckLicense.map((x) => {
  //         if (x.truckLicense === idTruck) {
  //             if (InTruckLicense.length) {
  //                 // obj.id = obj.id + 1;
  //                 newArr = [...InTruckLicense]
  //             }
  //             newArr.pop(newArr.filter(item => item.truckLicense == idTruck));
  //             setInTruckLicense(newArr)

  //         }
  //     })
  // }

  const handleRemoveItem = (item, index, type) => {
    if (type === "IntruckLicense") {
      var newArr = [...InTruckLicense];
      newArr.splice(index, 1);
      setInTruckLicense(newArr);
    }

    if (type === "InUnloadRate") {
      var newArr = [...InUnloadRate];
      newArr.splice(index, 1);
      setInUnloadRate(newArr);
    }

    if (type === "InTransportRate-s") {
      if (item.contractId) {
        var newArr = [...InTransportRateByPD];
        var newBrr = [...InTransportRate];
        newArr.splice(index, 1);
        newBrr.splice(index, 1);
        setInTransportRate(newBrr);

        if (item.shipToId) {
          setInTransportRateByPD(newArr);
        } else {
          item.price = 0;
          item.fuelPrice = 0;
        }
      } else {
        if (item.shipToId) {
          var newArr = [...InTransportRateByPD];
          newArr.splice(index, 1);
          setInTransportRateByPD(newArr);
        } else {
          item.price = 0;
          item.fuelPrice = 0;
          document.getElementById("PD-AfuelPrice-" + index).value = 0;
          document.getElementById("PD-APrice-" + index).value = 0;
        }
      }
    }

    if (type === "InTransportRate") {
      var newArr = [...InTransportRateByPD];
      var newBrr = [...InTransportRate];
      newArr.splice(item - 1, 1);
      newBrr.splice(index, 1);

      setInTransportRateByPD(newArr);
      setInTransportRate(newBrr);
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

  const setShowFormClone = () => {
    setIsShowCloned(!isShowCloned);
    var result = data.find((x) => x.contractId === indexEditForm);
    setCloneData(result);
    setIndexEditForm(null);
    setEditData({});
    setItemSelectEdit([{}, {}, {}]);
    setOpenEditForm(false);
    setOpenAddForm(true);
    setIsShowCloneSuccess(!isShowCloneSuccess);
  };

  const setCloseFormClone = () => {
    setIsShowExitClone(!isShowExitClone);
    fnClearOtherTableValueList();
    setIsGetDataOtherTable(false);
    setIsGetDatainCalValue(false);
    setCloneData({});
    setOpenAddForm(false);
  };

  const setMinValueInMaxHearder = (e) => {
    if (!isNaN(parseFloat(e.target.value))) {
      setHeaderMinValueForMax(parseFloat(e.target.value));
    } else {
      setHeaderMinValueForMax(0);
    }
  };

  const setMaxValueInMinHearder = (e) => {
    if (!isNaN(parseFloat(e.target.value))) {
      setHeaderMaxValueForMin(parseFloat(e.target.value));
    } else {
      setHeaderMaxValueForMin(0);
    }
  };

  const handleChangeCloneForm = (type) => (e) => {
    var newObj = { ...cloneData };

    if (type === "contractNo") {
      newObj.contractNo = e.target.value;
    } else if (type === "refDocNo") {
      newObj.refDocNo = e.target.value;
    } else if (type === "minQty") {
      newObj.minQty = e.target.value;
      // if (!isNaN(parseFloat(e.target.value))) {
      //   newObj.minQty = parseFloat(e.target.value);
      //   setHeaderMinValueForMax(parseFloat(e.target.value));
      // }
      // else {
      //   newObj.minQty = e.target.value;
      //   setHeaderMinValueForMax(e.target.value);
      // }
    } else if (type === "maxQty") {
      newObj.maxQty = e.target.value;
      // if (!isNaN(parseFloat(e.target.value))) {
      //   newObj.maxQty = parseFloat(e.target.value);
      //   setHeaderMaxValueForMin(parseFloat(e.target.value));
      // }
      // else {
      //   newObj.maxQty = e.target.value;
      //   setHeaderMaxValueForMin(e.target.value);
      // }
    } else if (type === "minTonRate") {
      newObj.minTonRate = e.target.value;
      // if (!isNaN(parseFloat(e.target.value))) {
      //   newObj.minTonRate = parseFloat(e.target.value);
      // }
      // else {
      //   newObj.minTonRate = 0;
      // }
    } else if (type === "startDate") {
      newObj.startDate = e.target.value;
    } else if (type === "endDate") {
      newObj.endDate = e.target.value;
    } else if (type === "fuelRateRemark") {
      newObj.fuelRateRemark = e.target.value;
    }
    setCloneData(newObj);
  };

  const handleChangeEditForm = (type) => (e) => {
    var newObj = { ...editData };

    if (type === "contractNo") {
      newObj.contractNo = e.target.value;
    } else if (type === "refDocNo") {
      newObj.refDocNo = e.target.value;
    } else if (type === "minQty") {
      newObj.minQty = e.target.value;
      // if (!isNaN(parseFloat(e.target.value))) {
      //   newObj.minQty = parseFloat(e.target.value);
      //   setHeaderMinValueForMax(parseFloat(e.target.value));
      // }
      // else {
      //   newObj.minQty = e.target.value;
      //   setHeaderMinValueForMax(e.target.value);
      // }
    } else if (type === "maxQty") {
      newObj.maxQty = e.target.value;
      // if (!isNaN(parseFloat(e.target.value))) {
      //   newObj.maxQty = parseFloat(e.target.value);
      //   setHeaderMaxValueForMin(parseFloat(e.target.value));
      // }
      // else {
      //   newObj.maxQty = e.target.value;
      //   setHeaderMaxValueForMin(e.target.value);
      // }
    } else if (type === "minTonRate") {
      newObj.minTonRate = e.target.value;
      // if (!isNaN(parseFloat(e.target.value))) {
      //   newObj.minTonRate = parseFloat(e.target.value);
      // }
      // else {
      //   newObj.minTonRate = 0;
      // }
    } else if (type === "startDate") {
      newObj.startDate = e.target.value;
    } else if (type === "endDate") {
      newObj.endDate = e.target.value;
    } else if (type === "fuelRateRemark") {
      newObj.fuelRateRemark = e.target.value;
    }
    setEditData(newObj);
  };

  const showSelectList = (type) => {
    if (type === "add-overnight") {
      return provinceOverNightList.map((item) => (
        <option value={item.provinceId}>{item.provinceName1}</option>
      ));
    } else if (type === "edit-overnight") {
      return provinceOverNightList.map((item) => {
        var result = calOverNightRateList.find(
          (x) => x.provinceId === item.provinceId
        );
        if (!result) {
          return <option value={item.provinceId}>{item.provinceName1}</option>;
        }
      });
    }
  };

  const handleChangeSearchSelect = (type) => (e, values) => {
    if (type === "transporter") {
      if (values) {
        var newArr = [...itemSelectSearch];
        newArr[0] = values;
        setItemSelectSearch(newArr);
      } else {
        var newArr = [...itemSelectSearch];
        newArr[0] = {};
        setItemSelectSearch(newArr);
      }
    } else if (type === "source") {
      if (values) {
        var newArr = [...itemSelectSearch];
        newArr[1] = values;
        setItemSelectSearch(newArr);
      } else {
        var newArr = [...itemSelectSearch];
        newArr[1] = {};
        setItemSelectSearch(newArr);
      }
    } else if (type === "trucktype") {
      if (values) {
        var newArr = [...itemSelectSearch];
        newArr[2] = values;
        setItemSelectSearch(newArr);
      } else {
        var newArr = [...itemSelectSearch];
        newArr[2] = {};
        setItemSelectSearch(newArr);
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
    } else if (type === "source") {
      if (values) {
        var newArr = [...itemSelectAdd];
        newArr[1] = values;
        setItemSelectAdd(newArr);
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
    } else if (type === "trucktype") {
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

  const handleChangeOtherSelect = (type) => (e, values) => {
    if (type === "overnight") {
      if (values) {
        var newArr = [...itemSelectOther];
        newArr[0] = values;
        setItemSelectOther(newArr);
      } else {
        var newArr = [...itemSelectOther];
        newArr[0] = {};
        setItemSelectOther(newArr);
      }
    } else if (type === "transport") {
      if (values) {
        var newArr = [...itemSelectOther];
        newArr[1] = values;
        setItemSelectOther(newArr);
      } else {
        var newArr = [...itemSelectOther];
        newArr[1] = {};
        setItemSelectOther(newArr);
      }
    }
  };

  const handleChangeInputStartValue = (type) => (e) => {
    var value = parseFloat(e.target.value);
    value = (value + 0.01).toFixed(2);
    if (type === "fuel-rate") {
      setFuelRateMinEnd(parseFloat(value));
    } else if (type === "multidrop-rate") {
      setMultiDropRateMinEnd(parseFloat(value));
    }
  };

  const handleChangeUpdateField = (type, index, item) => (e) => {
    if (type === "fuel-rate") {
      console.log("data", item);
      var newArr = [...calFuelRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        // newArr[index].seqRate = e.target.value;
        newArr.map((x) => {
          if (x.fuelFrom === item.fuelFrom && x.fuelTo === item.fuelTo) {
            x.seqRate = e.target.value;
          }
        });
      } else {
        newArr.map((x) => {
          if (x.fuelFrom === item.fuelFrom && x.fuelTo === item.fuelTo) {
            x.seqRate = 0;
          }
        });
        // newArr[index].seqRate = 0;
      }
      setCalFuelRateList(newArr);
    } else if (type === "multidrop-rate") {
      var newArr = [...calMultiDropRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].distancePrice = e.target.value;
      } else {
        newArr[index].distancePrice = 0;
      }
      setCalMultiDropRateList(newArr);
    } else if (type === "overnight-rate") {
      var newArr = [...calOverNightRateList];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArr[index].overnightPerManPrice = e.target.value;
      } else {
        newArr[index].overnightPerManPrice = 0;
      }
      setCalOverNightRateList(newArr);
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

  const onClickConfirmRemoveRecord = (type, index) => (e) => {
    var newArr = [type, index];
    setArrForRemoveRecord(newArr);
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
  };

  const onClickCancelRemoveRecord = () => {
    setArrForRemoveRecord([]);
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
  };

  const onClickRemoveRecordAddData = () => {
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
    var arrRemove = [...arrForRemoveRecord];
    if (arrRemove.length) {
      if (arrRemove[0] === "multidrop-rate") {
        var newArr = [...calMultiDropRateList];
        newArr.splice(arrRemove[1], 1);
        setCalMultiDropRateList(newArr);
      }
      if (arrRemove[0] === "overnight-rate") {
        var newArr = [...calOverNightRateList];
        newArr.splice(arrRemove[1], 1);
        setCalOverNightRateList(newArr);
        setProvinceOvNSelection(newArr);
      }
      if (arrRemove[0] === "transport-rate") {
        var newArr = [...InTransportRateByPD];
        newArr.splice(arrRemove[1], 1);
        setInTransportRateByPD(newArr);
      }
      if (arrRemove[0] === "truck-license") {
        var newArr = [...InTruckLicense];
        newArr.splice(arrRemove[1], 1);
        setInTruckLicense(newArr);
      }
      if (arrRemove[0] === "unload-rate") {
        var newArr = [...InUnloadRate];
        newArr.splice(arrRemove[1], 1);
        setInUnloadRate(newArr);
      }
    }
    setArrForRemoveRecord([]);
  };

  const onClickCalFuelRate = () => {
    var startValue = functionController.setNumberValue(
      document.getElementById("fuel-start").value
    );
    var endValue = functionController.setNumberValue(
      document.getElementById("fuel-end").value
    );
    if (getIsValidForm("fuel-need-validation") && startValue < endValue) {
      setInvalidFuelRateEnd(false);
      var priceValue = functionController.setNumberValue(
        document.getElementById("fuel-price").value
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

      var isIntegerStart = startValue % 1;
      isIntegerStart = parseFloat(isIntegerStart.toFixed(2));
      var isIntegerEnd = endValue % 1;
      isIntegerEnd = parseFloat(isIntegerEnd.toFixed(2));
      var count = startValue;

      while (count - (rangeBase + addRunning) >= minLength) {
        priceStart -= priceValue;
        count -= rangeBase + addRunning;
        count = parseFloat(count.toFixed(2));
        // console.log(count);
      }

      while (count <= maxLength) {
        var obj = { fuelFrom: 0.0, fuelTo: 0.0, seqRate: 0.0 };
        obj.fuelFrom = parseFloat(count.toFixed(2));
        obj.fuelTo = parseFloat((count + rangeBase).toFixed(2));
        obj.seqRate = parseFloat(priceStart.toFixed(2));
        newArr.push(obj);
        count += rangeBase + addRunning;
        priceStart += priceValue;
      }
      setCalFuelRateList(
        functionController.setCurrencyValueInArray(FFuelRate, newArr)
      );

      document.getElementById("fuel-start").value = "";
      document.getElementById("fuel-end").value = "";
      document.getElementById("fuel-price").value = "";
      setFuelRateMinEnd(0);
      setNoValidateForm("fuel-need-validation");
    } else {
      if (startValue >= endValue) {
        setNoValidateForm("fuel-need-validation");
        setInvalidFuelRateEnd(true);
      } else {
        setInvalidFuelRateEnd(false);
      }
      setCalFuelRateList([]);
    }
  };

  const onClickCalMultiDropRate = () => {
    var isValid = true;
    if (calMultiDropRateList.length) {
      var startValue = functionController.setNumberValue(
        document.getElementById("multidrop-start").value
      );
      var endValue = functionController.setNumberValue(
        document.getElementById("multidrop-end").value
      );
      if (!isNaN(startValue) && !isNaN(endValue) && startValue < endValue) {
        var startValueinSpoce = 0;
        var endValueinSpoce = 0;
        var overScope = false;
        calMultiDropRateList.map((item) => {
          if (startValue < item.distanceFrom) {
            startValueinSpoce++;
          } else if (
            startValue > item.distanceFrom &&
            startValue > item.distanceTo
          ) {
            startValueinSpoce++;
          }

          if (endValue < item.distanceFrom) {
            endValueinSpoce++;
          } else if (
            endValue > item.distanceFrom &&
            endValue > item.distanceTo
          ) {
            endValueinSpoce++;
          }

          if (startValue < item.distanceFrom && endValue > item.distanceTo) {
            overScope = true;
          }
        });

        if (startValueinSpoce < calMultiDropRateList.length) {
          setInvalidMultiDropStart(true);
          isValid = false;
        } else {
          if (invalidMultiDropStart) {
            setInvalidMultiDropStart(false);
          }
        }

        if (endValueinSpoce < calMultiDropRateList.length || overScope) {
          setInvalidMultiDropStart(true);
          isValid = false;
        } else {
          if (invalidMultiDropStart) {
            setInvalidMultiDropStart(false);
          }
        }
      } else {
        if (startValue >= endValue) {
          setNoValidateForm("multidrop-need-validation");
          setInvalidMultiDropEnd(true);
        } else {
          setInvalidMultiDropEnd(false);
        }
        isValid = getIsValidForm("multidrop-need-validation");
      }
    }

    if (isValid) {
      if (invalidMultiDropStart) {
        setInvalidMultiDropStart(false);
      }
      if (invalidMultiDropEnd) {
        setInvalidMultiDropEnd(false);
      }
      var startValue = functionController.setNumberValue(
        document.getElementById("multidrop-start").value
      );
      var endValue = functionController.setNumberValue(
        document.getElementById("multidrop-end").value
      );
      if (
        getIsValidForm("multidrop-need-validation") &&
        startValue < endValue
      ) {
        var priceValue = functionController.setNumberValue(
          document.getElementById("multidrop-price").value
        );
        var obj = { distanceFrom: 0.0, distanceTo: 0.0, distancePrice: 0.0 };
        var newArr = [];
        if (calMultiDropRateList.length) {
          newArr = [...calMultiDropRateList];
        }
        obj.distanceFrom = startValue;
        obj.distanceTo = endValue;
        obj.distancePrice = priceValue;
        newArr.push(obj);
        setCalMultiDropRateList(
          functionController.setCurrencyValueInArray(FMultiDropRate, newArr)
        );

        document.getElementById("multidrop-start").value = "";
        document.getElementById("multidrop-end").value = "";
        document.getElementById("multidrop-price").value = "";
        setMultiDropRateMinEnd(0);
        setNoValidateForm("multidrop-need-validation");
      } else {
        if (startValue >= endValue) {
          setNoValidateForm("multidrop-need-validation");
          setInvalidMultiDropEnd(true);
        } else {
          setInvalidMultiDropEnd(false);
        }
      }
    } else {
      if (startValue >= endValue) {
        setNoValidateForm("multidrop-need-validation");
        setInvalidMultiDropEnd(true);
      } else {
        setInvalidMultiDropEnd(false);
      }
    }
  };

  const onClickCalOverNightRate = () => {
    var arrObj = [...itemSelectOther];
    var arrInvalid = [...invalidMaterialFormOther];
    if (
      getIsValidForm("overnight-need-validation") &&
      Object.keys(arrObj[0]).length
    ) {
      arrInvalid[0] = false;
      setInvalidMaterialFormOther(arrInvalid);

      var provinceId = arrObj[0].provinceId;
      var priceValue = functionController.setNumberValue(
        document.getElementById("overnight-price").value
      );
      var newProvinceList = provinceList.find(
        (x) => x.provinceId === provinceId
      );
      var provinceNameValue = newProvinceList.provinceName1;
      var obj = { provinceId: 0, provinceName: "", overnightPerManPrice: 0.0 };
      var newArr = [];
      if (calOverNightRateList.length) {
        newArr = [...calOverNightRateList];
      }
      obj.provinceId = provinceId;
      obj.provinceName = provinceNameValue;
      obj.overnightPerManPrice = functionController.setCurrencyValue(
        priceValue,
        2
      );
      newArr.push(obj);
      setCalOverNightRateList(newArr);
      setProvinceOvNSelection(newArr);

      document.getElementById("overnight-province").selectedIndex = 0;
      document.getElementById("overnight-price").value = "";
      setNoValidateForm("overnight-need-validation");
    } else {
      if (!Object.keys(arrObj[0]).length) {
        arrInvalid[0] = true;
      } else {
        arrInvalid[0] = false;
      }
      setInvalidMaterialFormOther(arrInvalid);
    }
  };

  const setDataTransportRateList = () => {
    var newArr = [];
    CbProvinceDistrict.find((x) => {
      var obj = {
        shipToId: null,
        shipToNameThai: "",
        provinceId: null,
        provinceName1: "",
        districtId: null,
        districtName1: "",
        price: 0,
        fuelPrice: 0,
      };
      obj.provinceId = x.provinceId;
      obj.provinceName1 = x.provinceName1;
      obj.districtId = x.districtId;
      obj.districtName1 = x.districtName1;
      obj.price = 0;
      obj.fuelPrice = 0;
      newArr.push(obj);
    });
    // console.log(newArr)
    setInTransportRateByPD(
      functionController.setCurrencyValueInArray(FTransportRateTable, newArr)
    );
  };

  const onClickAddShipToInDataList = () => {
    var newArr = [...InTransportRateByPD];
    var arrObj = [...itemSelectOther];
    var newEmptyArr = [];
    var check = null;
    var checkedit = null;
    var obj = {
      shipToId: null,
      shipToNameThai: "",
      provinceId: null,
      provinceName1: "",
      districtId: null,
      districtName1: "",
      price: 0,
      fuelPrice: 0,
    };
    var shipToId = arrObj[1].shipToId;
    var arrInvalid = [...invalidMaterialFormOther];
    if (Object.keys(arrObj[1]).length) {
      arrInvalid[1] = false;
      obj.price = 0;
      obj.fuelPrice = 0;
      obj.shipToId = shipToId;
      getshipto.find((x) => {
        if (x.shipToId === shipToId) {
          obj.shipToNameThai = "[" + x.shipToCode + "] " + x.shipToNameThai;
        }
      });
      if (InTransportRate.length) {
        newEmptyArr = [...InTransportRate];
      }
      check = InTransportRate.find((x) => x.shipToId === shipToId);
      checkedit = InTransportRateByPD.find((x) => x.shipToId === shipToId);
      if (!checkedit) {
        if (check) {
          console.log("ซ้ำ");
        } else {
          newEmptyArr.push(obj);
          newArr.push(obj);
          setInTransportRate(newEmptyArr);
          setInTransportRateByPD(
            functionController.setCurrencyValueInArray(
              FTransportRateTable,
              newArr
            )
          );
          // console.log(newArr)
        }
      } else {
        console.log("ซ้ำ");
      }
    } else {
      arrInvalid[1] = true;
    }
    setInvalidMaterialFormOther(arrInvalid);
  };

  const handleCUpdateField = (index, type, data) => (e) => {
    console.log("data", data);

    if (type === "PD1") {
      var newArrTransport = [...AllInTransport];
      var newArrTransportByPD = [...InTransportRateByPD];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        newArrTransportByPD.map((x) => {
          if (
            x.provinceId === data.provinceId &&
            x.districtId === data.districtId
          ) {
            x.price = e.target.value;
          }
        });

        // newArrTransportByPD[index].price = e.target.value;
      } else {
        newArrTransportByPD.map((x) => {
          if (
            x.provinceId === data.provinceId &&
            x.districtId === data.districtId
          ) {
            x.price = 0;
          }
        });
      }
      if (AllInTransport.length) {
        newArrTransportByPD.push(newArrTransport);
      }
      setInTransportRateByPD(newArrTransportByPD);
    }

    if (type === "PD2") {
      var newArr = [...InTransportRateByPD];
      if (e.target.value !== "") {
        if (e.target.value.length > 1 && e.target.value.charAt(0) === "0") {
          e.target.value = e.target.value.substring(1);
        }
        // newArr[index].fuelPrice = e.target.value;
        newArr.map((x) => {
          if (
            x.provinceId === data.provinceId &&
            x.districtId === data.districtId
          ) {
            x.fuelPrice = e.target.value;
          }
        });
      } else {
        // newArr[index].fuelPrice = 0;
        newArr.map((x) => {
          if (
            x.provinceId === data.provinceId &&
            x.districtId === data.districtId
          ) {
            x.fuelPrice = 0;
          }
        });
      }
      setInTransportRateByPD(newArr);
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

  const onClickAddUnloadRate = () => {
    if (getIsValidForm("unloadrate-need-validation")) {
      var newArr = [];
      var obj = { manPower: 0, minRatePrice: 0, unloadPrice: 0, unitTon: 0 };
      obj.manPower = functionController.setNumberValue(
        document.getElementById("unloadRate-manPower").value
      );
      obj.minRatePrice = functionController.setNumberValue(
        document.getElementById("unloadRate-minRatePrice").value
      );
      obj.unloadPrice = functionController.setNumberValue(
        document.getElementById("unloadRate-unloadPrice").value
      );
      obj.unitTon = functionController.setNumberValue(
        document.getElementById("unloadRate-unitTon").value
      );
      if (InUnloadRate.length) {
        newArr = [...InUnloadRate];
      }
      newArr.push(obj);
      console.log("objUnloadRate", obj);
      console.log(
        "setUnloadRate",
        functionController.setCurrencyValueInArray(FUnloadRateNo, newArr)
      );
      setInUnloadRate(
        functionController.setCurrencyValueInArray(FUnloadRateNo, newArr)
      );
      setNoValidateForm("unloadrate-need-validation");
      document.getElementById("unloadRate-manPower").value = "";
      document.getElementById("unloadRate-minRatePrice").value = "";
      document.getElementById("unloadRate-unloadPrice").value = "";
      document.getElementById("unloadRate-unitTon").value = "";
    }
  };

  const fnClearOtherTableValueList = () => {
    setValue(0);
    setCalFuelRateList([]);
    setCalMultiDropRateList([]);
    setCalOverNightRateList([]);
    setInTransportRate([]);
    setInTruckLicense([]);
    setInUnloadRate([]);
  };

  const fnGetProvinceOverNightList = () => {
    var newArr = [];
    provinceList.map((item) => {
      newArr.push(item);
    });
    setProvinceThaiList(newArr);
    setProvinceOverNightList(newArr);
  };

  const handleChangeContractDate = () => {
    var contractYear = document.getElementById("search-header-year");
    contractYear.selectedIndex = 0;
    setNoValidateForm("search-header-need-validation");
  };

  const handleChangeContractYear = () => {
    var contractDate = document.getElementById("search-header-date");
    contractDate.value = "";
    setNoValidateForm("search-header-need-validation");
  };

  const onClickSearchData = () => {
    // if (contractDate === "" && isNaN(contractYear)) {
    //   if (!getIsValidForm("search-header-need-validation")) {
    //     if (Object.keys(data).length) {
    //       setData([]);
    //     }
    //   }
    // }
    var arrObj = [...itemSelectSearch];
    if (
      getIsValidForm("search-header-need-validation") &&
      Object.keys(arrObj[0]).length
    ) {
      setNoValidateForm("search-header-need-validation");
      setInvalidMaterialFormSearch([false]);
      setAccordion(0);
      var contractDate = document.getElementById("search-header-date").value;
      var contractYear = parseInt(
        document.getElementById("search-header-year").value
      );
      var contractNo = document.getElementById(
        "search-header-contractNo"
      ).value;
      var transporterId = Object.keys(arrObj[0]).length
        ? arrObj[0].transporterId
        : null;
      var sourceId = Object.keys(arrObj[1]).length ? arrObj[1].sourceId : null;
      var truckTypeId = Object.keys(arrObj[2]).length
        ? arrObj[2].truckTypeId
        : null;
      var fuelTypeId = parseInt(
        document.getElementById("search-header-fueltypeId").value
      );
      var rateTypeId = parseInt(
        document.getElementById("search-header-ratetypeId").value
      );
      var unloadTypeId = parseInt(
        document.getElementById("search-header-unloadTypeId").value
      );
      var packageType = document.getElementById(
        "search-header-packagetypeId"
      ).value;
      var minQty = parseFloat(
        document.getElementById("search-header-minqty").value
      );
      var maxQty = parseFloat(
        document.getElementById("search-header-maxqty").value
      );
      var refDocNo = document.getElementById("search-header-refDoc").value;
      var minTonRate = parseFloat(
        document.getElementById("search-header-mintonrate").value
      );
      var contractStatus = document.getElementById(
        "search-header-contractStatus"
      ).value;

      if (isNaN(fuelTypeId)) {
        fuelTypeId = null;
      }
      if (isNaN(rateTypeId)) {
        rateTypeId = null;
      }
      if (isNaN(unloadTypeId)) {
        unloadTypeId = null;
      }
      if (isNaN(minQty)) {
        minQty = null;
      }
      if (isNaN(maxQty)) {
        maxQty = null;
      }
      if (isNaN(minTonRate)) {
        minTonRate = null;
      }
      if (contractDate === "") {
        contractDate = null;
      }
      if (contractYear === "") {
        contractYear = null;
      }
      if (contractNo === "") {
        contractNo = null;
      }
      if (packageType === "") {
        packageType = null;
      }
      if (refDocNo === "") {
        refDocNo = null;
      }
      if (contractStatus === "") {
        contractStatus = null;
      }

      var newArr = [
        contractNo,
        sourceId,
        transporterId,
        truckTypeId,
        fuelTypeId,
        rateTypeId,
        unloadTypeId,
        packageType,
        minQty,
        maxQty,
        refDocNo,
        minTonRate,
        contractDate,
        contractYear,
        contractStatus,
      ];

      // console.log(newArr);
      fnGetContractDomesticList(newArr);
    } else {
      if (!Object.keys(arrObj[0]).length) {
        setInvalidMaterialFormSearch([true]);
      }
      if (Object.keys(data).length) {
        setData([]);
      }
    }
  };

  const onClickClearDataForSearch = () => {
    var contractNo = document.getElementById("search-header-contractNo");
    contractNo.value = "";

    // var transporterId = document.getElementById("search-header-transporterId");
    // transporterId.selectedIndex = 0;
    // var sourceId = document.getElementById("search-header-sourceId");
    // sourceId.selectedIndex = 0;
    // var truckTypeId = document.getElementById("search-header-trucktypeId");
    // truckTypeId.selectedIndex = 0;

    var fuelTypeId = document.getElementById("search-header-fueltypeId");
    fuelTypeId.selectedIndex = 0;
    var rateTypeId = document.getElementById("search-header-ratetypeId");
    rateTypeId.selectedIndex = 0;
    var unloadTypeId = document.getElementById("search-header-unloadTypeId");
    unloadTypeId.selectedIndex = 0;
    var packageType = document.getElementById("search-header-packagetypeId");
    packageType.selectedIndex = 0;
    var minQty = document.getElementById("search-header-minqty");
    minQty.value = "";
    var maxQty = document.getElementById("search-header-maxqty");
    maxQty.value = "";
    var refDocNo = document.getElementById("search-header-refDoc");
    refDocNo.value = "";
    var minTonRate = document.getElementById("search-header-mintonrate");
    minTonRate.value = "";
    var startDate = document.getElementById("search-header-date");
    startDate.value = "";
    var endDate = document.getElementById("search-header-year");
    endDate.value = "";
    var contractStatus = document.getElementById(
      "search-header-contractStatus"
    );
    contractStatus.selectedIndex = 0;
  };

  const onClickCheckFormAddData = () => {
    var arrObj = [...itemSelectAdd];
    if (
      getIsValidForm("add-header-need-validation") &&
      Object.keys(arrObj[0]).length &&
      Object.keys(arrObj[1]).length &&
      Object.keys(arrObj[2]).length
    ) {
      setInvalidMaterialFormAdd([false, false, false]);

      if (calFuelRateList.length && InTruckLicense.length) {
        setIsConfirmSave(!isConfirmSave);
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

  const onClickCheckFormEditData = () => {
    var arrObj = [...itemSelectEdit];
    if (
      getIsValidForm("edit-header-need-validation") &&
      Object.keys(arrObj[0]).length &&
      Object.keys(arrObj[1]).length &&
      Object.keys(arrObj[2]).length
    ) {
      setInvalidMaterialFormAdd([false, false, false]);

      if (calFuelRateList.length && InTruckLicense.length) {
        setIsConfirmEdit(!isConfirmEdit);
      } else {
        setIsWarningInputForm(!isWarningInputForm);
      }
    } else {
      var arrInvalid = [...invalidMaterialFormEdit];
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
      setInvalidMaterialFormEdit(arrInvalid);
    }
  };

  const onClickAddData = () => {
    setIsConfirmSave(!isConfirmSave);
    var arrObj = [...itemSelectAdd];
    var contractNo = document.getElementById("header-contractNo").value;
    var transporterId = arrObj[0].transporterId;
    var sourceId = arrObj[1].sourceId;
    var truckTypeId = arrObj[2].truckTypeId;
    var fuelTypeId = parseInt(
      document.getElementById("header-fueltypeId").value
    );
    var rateTypeId = parseInt(
      document.getElementById("header-ratetypeId").value
    );
    var unloadTypeId = parseInt(
      document.getElementById("header-unloadTypeId").value
    );
    var packageType = document.getElementById("header-packagetypeId").value;
    var minQty = functionController.setNumberValue(
      document.getElementById("header-minqty").value
    );
    var maxQty = functionController.setNumberValue(
      document.getElementById("header-maxqty").value
    );
    var refDocNo = document.getElementById("header-refDoc").value;
    var minTonRate = functionController.setNumberValue(
      document.getElementById("header-mintonrate").value
    );
    var startDate = document.getElementById("header-dateStart").value;
    var endDate = document.getElementById("header-dateEnd").value;
    var fuelRateRemark = document.getElementById("fuelrate-remark")
      ? document.getElementById("fuelrate-remark").value
      : null;
    var contractStatus = document.getElementById("header-contractStatus").value;
    var createBy = _UserId;

    if (isNaN(minQty)) {
      minQty = null;
    }
    if (isNaN(maxQty)) {
      maxQty = null;
    }
    if (isNaN(minTonRate)) {
      minTonRate = null;
    }
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
      truckTypeId,
      fuelTypeId,
      rateTypeId,
      unloadTypeId,
      packageType,
      minQty,
      maxQty,
      refDocNo,
      minTonRate,
      startDate,
      endDate,
      fuelRateRemark,
      contractStatus,
      createBy,
    ];

    var newArrOverNight = [];
    calOverNightRateList.map((item) => {
      var newObj = { provinceId: 0, overnightPerManPrice: 0.0 };
      newObj.provinceId = item.provinceId;
      newObj.overnightPerManPrice = functionController.setNumberValue(
        item.overnightPerManPrice
      );
      newArrOverNight.push(newObj);
    });

    var newArrTransport = [];
    InTransportRateByPD.map((item) => {
      var newObj = {
        shipToId: null,
        provinceId: null,
        districtId: null,
        price: 0.0,
        fuelPrice: 0.0,
      };
      newObj.shipToId = item.shipToId;
      newObj.provinceId = item.provinceId;
      newObj.districtId = item.districtId === "" ? null : item.districtId;
      newObj.price = functionController.setNumberValue(item.price);
      newObj.fuelPrice = functionController.setNumberValue(item.fuelPrice);
      newArrTransport.push(newObj);
    });

    var newArrFuelRate = functionController.setNumberValueInArray(
      FFuelRate,
      calFuelRateList
    );
    var newArrMultidrop = functionController.setNumberValueInArray(
      FMultiDropRate,
      calMultiDropRateList
    );
    var newArrUnloadRate = functionController.setNumberValueInArray(
      FUnloadRateNo,
      InUnloadRate
    );

    // console.log(newArrHeader, newArrFuelRate, newArrMultidrop, newArrOverNight, newArrTransport, InTruckLicense, newArrUnloadRate);
    fnInsertData(
      newArrHeader,
      newArrFuelRate,
      newArrMultidrop,
      newArrOverNight,
      newArrTransport,
      InTruckLicense,
      newArrUnloadRate
    );
  };

  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var arrObj = [...itemSelectEdit];
    var transporterId = arrObj[0].transporterId;
    var sourceId = arrObj[1].sourceId;
    var truckTypeId = arrObj[2].truckTypeId;
    var fuelTypeId = parseInt(
      document.getElementById("edit-header-fueltype").value
    );
    var rateTypeId = parseInt(
      document.getElementById("edit-header-ratetype").value
    );
    var unloadTypeId = parseInt(
      document.getElementById("edit-header-unloadtype").value
    );
    var packageType = document.getElementById("edit-header-packagetype").value;
    var contractStatus = document.getElementById(
      "edit-header-contractstatus"
    ).value;

    var newArrOverNight = [];
    calOverNightRateList.map((item) => {
      var newObj = { provinceId: 0, overnightPerManPrice: 0.0 };
      newObj.provinceId = item.provinceId;
      newObj.overnightPerManPrice = functionController.setNumberValue(
        item.overnightPerManPrice
      );
      newArrOverNight.push(newObj);
    });

    var newArrTransport = [];
    InTransportRateByPD.map((item) => {
      var newObj = {
        shipToId: null,
        provinceId: null,
        districtId: null,
        price: 0.0,
        fuelPrice: 0.0,
      };
      newObj.shipToId = item.shipToId;
      newObj.provinceId = item.provinceId;
      newObj.districtId = item.districtId === "" ? null : item.districtId;
      newObj.price = functionController.setNumberValue(item.price);
      newObj.fuelPrice = functionController.setNumberValue(item.fuelPrice);
      newArrTransport.push(newObj);
    });

    var newObj = { ...editData };
    newObj.transporterId = transporterId;
    newObj.sourceId = sourceId;
    newObj.truckTypeId = truckTypeId;
    newObj.fuelTypeId = fuelTypeId;
    newObj.rateTypeId = rateTypeId;
    newObj.unloadTypeId = unloadTypeId;
    newObj.packageType = packageType;
    newObj.contractStatus = contractStatus;
    newObj.minQty = functionController.setNumberValue(newObj.minQty);
    newObj.maxQty = functionController.setNumberValue(newObj.maxQty);
    newObj.minTonRate = functionController.setNumberValue(newObj.minTonRate);

    var newArrFuelRate = functionController.setNumberValueInArray(
      FFuelRate,
      calFuelRateList
    );
    var newArrMultidrop = functionController.setNumberValueInArray(
      FMultiDropRate,
      calMultiDropRateList
    );
    var newArrUnloadRate = functionController.setNumberValueInArray(
      FUnloadRateNo,
      InUnloadRate
    );

    newObj.mcontractDomesticFuelRates = [...newArrFuelRate];
    newObj.mcontractDomesticMultiDropRates = [...newArrMultidrop];
    newObj.mcontractDomesticOverNightRates = [...newArrOverNight];
    newObj.mcontractDomesticTransportRates = [...newArrTransport];
    newObj.mcontractDomesticTruckLicenses = [...InTruckLicense];
    newObj.mcontractDomesticUnloadRates = [...newArrUnloadRate];
    newObj.updateBy = _UserId;

    // console.log(newObj);
    fnUpdateData(newObj);
  };

  const onClickDeleteData = () => {
    setIsConfirmDelete(!isConfirmDelete);
    // console.log(indexEditForm);
    fnDeleteData(indexEditForm);
  };

  const onClickThenShowSuccesss = () => {
    setIsShowSuccess(!isShowSuccess);
    setTypeShowSuccess("");
    window.location.reload(false);
  };

  const fnInsertData = (
    arrHeaderData,
    arrFuelRateData,
    arrMultidropData,
    arrOverNightData,
    arrTransportData,
    arrTruckLicenseData,
    arrUnloadRateData
  ) => {
    setIsPostingData(true);
    Repository.fetchAddContractDomesticList(
      arrHeaderData,
      arrFuelRateData,
      arrMultidropData,
      arrOverNightData,
      arrTransportData,
      arrTruckLicenseData,
      arrUnloadRateData
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
    Repository.fetchEditContractDomesticList(objData).then(
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
    Repository.fetchRemoveContractDomesticList(index).then(
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

  const fnGetContractDomesticList = (arrData = []) => {
    setIsPostingData(true);
    setData([]);
    Repository.fetchGetContractDomesticList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setData(result.data);
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

  const fnGetDataForEdit = (index) => {
    setIsLoadingData(true);
    setProvinceList([]);
    setDistrictList([]);
    setCbProvinceDistrict([]);
    setGetShipTo([]);
    setSource([]);
    setTransporterList([]);
    setTruckType([]);
    setFuelType([]);
    setRateType([]);
    setUnloadType([]);
    setPackage([]);
    setContractStatus([]);
    setEditData({});
    Repository.fetchGetContractDomesticListById(index).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setProvinceList(result.data.provinceTHList);
          setDistrictList(result.data.districtList);
          setCbProvinceDistrict(result.data.provinceAndDistrictList);
          setGetShipTo(result.data.shipToList);
          setSource(result.data.sourceList);
          setTransporterList(result.data.transporterList);
          setTruckType(result.data.truckTypeList);
          setFuelType(result.data.fuelTypeList);
          setRateType(result.data.rateTypeList);
          setUnloadType(result.data.unloadTypeList);
          setPackage(result.data.packageTypeList);
          setContractStatus(result.data.contractStatusList);
          setEditData(result.data.contractDomesticList);
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

  const fnGetContractDomesticOtherList = () => {
    setIsLoadingData(true);
    setProvinceList([]);
    setDistrictList([]);
    setCbProvinceDistrict([]);
    setGetShipTo([]);
    setSource([]);
    setTransporterList([]);
    setTruckType([]);
    setFuelType([]);
    setRateType([]);
    setUnloadType([]);
    setPackage([]);
    setContractStatus([]);
    Repository.fetchGetContractDomesticOtherList().then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setProvinceList(result.data.provinceTHList);
          setDistrictList(result.data.districtList);
          setCbProvinceDistrict(result.data.provinceAndDistrictList);
          setGetShipTo(result.data.shipToList);
          setSource(result.data.sourceList);
          setTransporterList(result.data.transporterList);
          setTruckType(result.data.truckTypeList);
          setFuelType(result.data.fuelTypeList);
          setRateType(result.data.rateTypeList);
          setUnloadType(result.data.unloadTypeList);
          setPackage(result.data.packageTypeList);
          setContractStatus(result.data.contractStatusList);
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

  const fnGetContractDomesticForSearchList = () => {
    Repository.fetchGetContractDomesticForSearchList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setSource(result.data.sourceList);
          setTransporterList(result.data.transporterList);
          setTruckType(result.data.truckTypeList);
          setFuelType(result.data.fuelTypeList);
          setRateType(result.data.rateTypeList);
          setUnloadType(result.data.unloadTypeList);
          setPackage(result.data.packageTypeList);
          setContractStatus(result.data.contractStatusList);
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
      initeState();
    } else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  const initeState = () => {
    fnGetContractDomesticForSearchList();
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
      setOpenEditForm(true);
      setIndexEditForm(VariableController.linkContractId);
    } else {
      fnCheckUserAuth();
    }
  }, []);

  const mainTable = () => {
    return (
      // <CRow className="justify-content-center">
      <CCard className="p-2" style={{ maxHeight: "700px", overflowY: "auto" }}>
        {/* <CCardBody> */}
        <CDataTable
          // Toolbar={{}}/
          // columnFilter
          tableFilter={{
            label: `${Constant.tabletxtSearch}`,
            placeholder: `${Constant.tabletxtPlaceholder}`,
          }}
          itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
          className="CDataTable"
          items={data}
          fields={fields}
          // hover
          // striped
          bordered
          itemsPerPage={10}
          pagination
          scopedSlots={{
            startDate: (item) => {
              var newDate = new Date(item.startDate);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            endDate: (item) => {
              var newDate = new Date(item.endDate);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            manage: (item) => {
              return (
                <td className="py-2">
                  <CRow>
                    <CCol className="col-12">
                      <CButton
                        color="primary"
                        block
                        size={Constant.btAddSize}
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
            //         size={Constant.btAddSize}
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
            //       <CCardBody>
            //         {otherTables("show", item)}
            //       </CCardBody>
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
        {/* </CCardBody> */}
      </CCard>
      // </CRow>
    );
  };

  const otherTables = (type, item) => {
    if (type === "show" && Object.keys(cloneData).length) {
      if (!isGetDatainCalValue && Object.keys(cloneData).length) {
        var newObj = { ...cloneData };
        var newArr = [];
        newObj.mcontractDomesticFuelRates.map((item) => {
          var obj = { fuelFrom: 0.0, fuelTo: 0.0, seqRate: 0.0 };
          obj.fuelFrom = item.fuelFrom;
          obj.fuelTo = item.fuelTo;
          obj.seqRate = item.seqRate;
          newArr.push(obj);
        });
        setCalFuelRateList(
          functionController.setCurrencyValueInArray(FFuelRate, newArr)
        );

        newArr = [];
        newObj.mcontractDomesticMultiDropRates.map((item) => {
          var obj = { distanceFrom: 0.0, distanceTo: 0.0, distancePrice: 0.0 };
          obj.distanceFrom = item.distanceFrom;
          obj.distanceTo = item.distanceTo;
          obj.distancePrice = item.distancePrice;
          newArr.push(obj);
        });
        setCalMultiDropRateList(
          functionController.setCurrencyValueInArray(FMultiDropRate, newArr)
        );

        newArr = [];
        newObj.mcontractDomesticOverNightRates.map((item) => {
          var obj = {
            provinceId: 0,
            provinceName: "",
            overnightPerManPrice: 0.0,
          };
          obj.provinceId = item.provinceId;
          var newProvinceList = provinceList.find(
            (x) => x.provinceId === item.provinceId
          );
          obj.provinceName = newProvinceList.provinceName1;
          obj.overnightPerManPrice = item.overnightPerManPrice;
          newArr.push(obj);
        });
        setCalOverNightRateList(
          functionController.setCurrencyValueInArray(FOverNightpRate, newArr)
        );

        newArr = [];
        newObj.mcontractDomesticTransportRates.map((item) => {
          var obj = {
            shipToId: null,
            shipToNameThai: "",
            provinceId: null,
            provinceName1: "",
            districtId: null,
            districtName1: "",
            price: 0,
            fuelPrice: 0,
          };
          obj.shipToId = item.shipToId;
          obj.contractId = item.contractId;
          obj.runningNo = item.runningNo;
          getshipto.find((x) => {
            if (x.shipToId === item.shipToId) {
              // console.log(x.shipToNameEng)
              obj.shipToNameThai = x.shipToNameThai;
            }
          });
          obj.provinceId = item.provinceId;
          provinceList.find((p) => {
            if (p.provinceId === item.provinceId) {
              obj.provinceName1 = p.provinceName1;
            }
          });

          obj.districtId = item.districtId;
          districtList.find((y) => {
            if (y.districtId === item.districtId) {
              obj.districtName1 = y.districtName1;
            }
          });
          obj.price = item.price;
          obj.fuelPrice = item.fuelPrice;
          newArr.push(obj);
        });
        setInTransportRateByPD(
          functionController.setCurrencyValueInArray(
            FTransportRateTable,
            newArr
          )
        );

        newArr = [];
        newObj.mcontractDomesticTruckLicenses.map((item) => {
          var obj = { truckLicense: "" };
          obj.contractId = item.contractId;
          obj.runningNo = item.runningNo;
          obj.truckLicense = item.truckLicense;
          newArr.push(obj);
        });
        setInTruckLicense(newArr);

        newArr = [];
        newObj.mcontractDomesticUnloadRates.map((item) => {
          var obj = {
            manPower: 0.0,
            minRatePrice: 0.0,
            unloadPrice: 0.0,
            unitTon: 0,
          };
          obj.contractId = item.contractId;
          obj.runningNo = item.runningNo;
          obj.manPower = item.manPower;
          obj.minRatePrice = item.minRatePrice;
          obj.unloadPrice = item.unloadPrice;
          obj.unitTon = item.unitTon;
          newArr.push(obj);
        });
        setInUnloadRate(
          functionController.setCurrencyValueInArray(FUnloadRateNo, newArr)
        );

        setIsGetDatainCalValue(true);
      }
    }
    if (type === "edit") {
      if (!isGetDatainCalValue && Object.keys(editData).length) {
        var newObj = { ...editData };
        var newArr = [];
        newObj.mcontractDomesticFuelRates.map((item) => {
          var obj = { fuelFrom: 0.0, fuelTo: 0.0, seqRate: 0.0 };
          obj.fuelFrom = item.fuelFrom;
          obj.fuelTo = item.fuelTo;
          obj.seqRate = item.seqRate;
          newArr.push(obj);
        });
        setCalFuelRateList(
          functionController.setCurrencyValueInArray(FFuelRate, newArr)
        );

        newArr = [];
        newObj.mcontractDomesticMultiDropRates.map((item) => {
          var obj = { distanceFrom: 0.0, distanceTo: 0.0, distancePrice: 0.0 };
          obj.distanceFrom = item.distanceFrom;
          obj.distanceTo = item.distanceTo;
          obj.distancePrice = item.distancePrice;
          newArr.push(obj);
        });
        setCalMultiDropRateList(
          functionController.setCurrencyValueInArray(FMultiDropRate, newArr)
        );

        newArr = [];
        newObj.mcontractDomesticOverNightRates.map((item) => {
          var obj = {
            provinceId: 0,
            provinceName: "",
            overnightPerManPrice: 0.0,
          };
          obj.provinceId = item.provinceId;
          var newProvinceList = provinceList.find(
            (x) => x.provinceId === item.provinceId
          );
          obj.provinceName = newProvinceList.provinceName1;
          obj.overnightPerManPrice = item.overnightPerManPrice;
          newArr.push(obj);
        });
        setCalOverNightRateList(
          functionController.setCurrencyValueInArray(FOverNightpRate, newArr)
        );

        newArr = [];
        newObj.mcontractDomesticTransportRates.map((item) => {
          var obj = {
            shipToId: null,
            shipToNameThai: "",
            provinceId: null,
            provinceName1: "",
            districtId: null,
            districtName1: "",
            price: 0,
            fuelPrice: 0,
          };
          obj.shipToId = item.shipToId;
          obj.contractId = item.contractId;
          obj.runningNo = item.runningNo;
          getshipto.find((x) => {
            if (x.shipToId === item.shipToId) {
              // console.log(x.shipToNameEng)
              obj.shipToNameThai = x.shipToNameThai;
            }
          });
          obj.provinceId = item.provinceId;
          provinceList.find((p) => {
            if (p.provinceId === item.provinceId) {
              obj.provinceName1 = p.provinceName1;
            }
          });

          obj.districtId = item.districtId;
          districtList.find((y) => {
            if (y.districtId === item.districtId) {
              obj.districtName1 = y.districtName1;
            }
          });
          obj.price = item.price;
          obj.fuelPrice = item.fuelPrice;
          newArr.push(obj);
        });
        setInTransportRateByPD(
          functionController.setCurrencyValueInArray(
            FTransportRateTable,
            newArr
          )
        );

        newArr = [];
        newObj.mcontractDomesticTruckLicenses.map((item) => {
          var obj = { truckLicense: "" };
          obj.contractId = item.contractId;
          obj.runningNo = item.runningNo;
          obj.truckLicense = item.truckLicense;
          newArr.push(obj);
        });
        setInTruckLicense(newArr);

        newArr = [];
        newObj.mcontractDomesticUnloadRates.map((item) => {
          var obj = {
            manPower: 0.0,
            minRatePrice: 0.0,
            unloadPrice: 0.0,
            unitTon: 0,
          };
          obj.contractId = item.contractId;
          obj.runningNo = item.runningNo;
          obj.manPower = item.manPower;
          obj.minRatePrice = item.minRatePrice;
          obj.unloadPrice = item.unloadPrice;
          obj.unitTon = item.unitTon;
          newArr.push(obj);
        });
        setInUnloadRate(
          functionController.setCurrencyValueInArray(FUnloadRateNo, newArr)
        );

        setIsGetDatainCalValue(true);
      }
    }
    if (type === "show") {
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
                  label={Constant.arrFieldMasterConDomOtherTable[3]}
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label={Constant.arrFieldMasterConDomOtherTable[0]}
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label={Constant.arrFieldMasterConDomOtherTable[4]}
                  {...a11yProps(2)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label={Constant.arrFieldMasterConDomOtherTable[5]}
                  {...a11yProps(3)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label={Constant.arrFieldMasterConDomOtherTable[2]}
                  {...a11yProps(4)}
                />
                <Tab
                  style={{ outline: "none" }}
                  label={Constant.arrFieldMasterConDomOtherTable[1]}
                  {...a11yProps(5)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                {tabledata(
                  FTransportRateTable,
                  item.mcontractDomesticTransportRates
                )}
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                {tabledata(FFuelRate, item.mcontractDomesticFuelRates)}
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                {tabledata(
                  FtruckLicenseNo,
                  item.mcontractDomesticTruckLicenses
                )}
              </TabPanel>
              <TabPanel value={value} index={3} dir={theme.direction}>
                {tabledata(FUnloadRateNo, item.mcontractDomesticUnloadRates)}
              </TabPanel>
              {/* <TabPanel value={value} index={4} dir={theme.direction}>
                {tabledata(FOverNightpRate, item.mcontractDomesticOverNightRates)}
              </TabPanel> */}
              {/* <TabPanel value={value} index={5} dir={theme.direction}>
                {tabledata(FMultiDropRate, item.mcontractDomesticMultiDropRates)}
              </TabPanel> */}
            </SwipeableViews>
          </div>
        </List>
      );
    } else {
      if (
        provinceList.length &&
        districtList.length &&
        CbProvinceDistrict.length &&
        getshipto.length &&
        source.length &&
        transporterList.length &&
        truckType.length &&
        fuelType.length &&
        rateType.length &&
        unload.length &&
        packageType.length &&
        contractStatus.length
      ) {
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
                    label={Constant.arrFieldMasterConDomOtherTable[3]}
                    {...a11yProps(0)}
                  />
                  <Tab
                    style={{ outline: "none" }}
                    label={Constant.arrFieldMasterConDomOtherTable[0]}
                    {...a11yProps(1)}
                  />
                  <Tab
                    style={{ outline: "none" }}
                    label={Constant.arrFieldMasterConDomOtherTable[4]}
                    {...a11yProps(2)}
                  />
                  <Tab
                    style={{ outline: "none" }}
                    label={Constant.arrFieldMasterConDomOtherTable[5]}
                    {...a11yProps(3)}
                  />
                  {/* <Tab style={{ outline: 'none' }} label={Constant.arrFieldMasterConDomOtherTable[2]} {...a11yProps(4)} />
                  <Tab style={{ outline: 'none' }} label={Constant.arrFieldMasterConDomOtherTable[1]} {...a11yProps(5)} /> */}
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {type === "add"
                    ? formTransportRate()
                    : type === "edit"
                    ? formTransportRate()
                    : null}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {type === "add"
                    ? formFuelRate()
                    : type === "edit"
                    ? formFuelRate()
                    : null}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  {type === "add"
                    ? formTruckLicense()
                    : type === "edit"
                    ? formTruckLicense()
                    : null}
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  {type === "add"
                    ? formUnloadRate()
                    : type === "edit"
                    ? formUnloadRate()
                    : null}
                </TabPanel>
                {/* <TabPanel value={value} index={4} dir={theme.direction}>
                  {type === "add" ? formOverNightRate() :
                    type === "edit" ? formOverNightRate() : null}
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                  {type === "add" ? formMultiDropRate() :
                    type === "edit" ? formMultiDropRate() : null}
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
        <CRow className="justify-content-center">
          <CCard>
            <CCardBody>
              <CCardBody>
                <CDataTable
                  // columnFilter
                  tableFilter={{
                    label: `${Constant.tabletxtSearch}`,
                    placeholder: `${Constant.tabletxtPlaceholder}`,
                  }}
                  itemsPerPageSelect={{
                    label: `${Constant.tabletxtCountPage}`,
                  }}
                  className="CDataTable"
                  items={data}
                  fields={fieldsIn}
                  itemsPerPage={10}
                  pagination
                />
              </CCardBody>
            </CCardBody>
          </CCard>
        </CRow>
      </h6>
    );
  };

  const mainFormSearch = () => (
    <CForm className="search-header-need-validation ">
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
              // block
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setAccordion(accordion === 1 ? null : 1)}
            >
              <CRow className="ml-2 mt-1 p-0">
                <h6 className="ml-2 mt-1 p-0">ค้นหา</h6>
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
              <CCardBody>
                <CRow>
                  <CCol sm="12" md="12" lg="4">
                    <CForm className="search-header-need-validation">
                      <CRow>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">
                              {Constant.arrFieldConDomSearchDateYear[0]}
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
                                style={{ height: Constant.styleHeightField }}
                                id="search-header-date"
                                name="date-input"
                                placeholder="date"
                                onChange={handleChangeContractDate}
                                // required
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
                              {Constant.arrFieldConDomSearchDateYear[1]}
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
                                style={{ height: Constant.styleHeightField }}
                                onChange={handleChangeContractYear}
                                // required
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
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="4">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[2]}
                        </CLabel>
                        {/* <CSelect className="form-control"
                                        id="search-header-transporterId"
                                        style={{ height: Constant.styleHeightField }}
                                    >
                                        <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                        <option value="">{Constant.txtFormAllSelected}</option>
                                        {transporterList.map((item) => <option value={item.transporterId} >{`[${item.transporterCode}]` + '  ' + item.transporterNameThai}  </option>)}
                                    </CSelect>
                                    <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
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
                            id="search-header-transporterId"
                            options={transporterList}
                            size="small"
                            getOptionLabel={(option) =>
                              "[" +
                              option.transporterCode +
                              "] " +
                              option.transporterNameThai
                            }
                            // style={{ width: 300 }}
                            onChange={handleChangeSearchSelect("transporter")}
                            renderOption={(option) => (
                              <Typography
                                className={classes.autoCompleteRenderOptions}
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
                                  error={invalidMaterialFormSearch[0]}
                                  {...params}
                                  label={
                                    <Typography
                                      className={classes.autoCompleteInputLabel}
                                    >
                                      {Constant.txtformPlaceholderSelected}
                                    </Typography>
                                  }
                                  helperText={
                                    invalidMaterialFormSearch[0] ? (
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
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[1]}
                        </CLabel>
                        {/* <CSelect className="form-control"
                                        id="search-header-sourceId"
                                        style={{ height: Constant.styleHeightField }}
                                    >
                                        <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                        <option value="">{Constant.txtFormAllSelected}</option>
                                        {source.map((cb) => <option value={cb.sourceId} >{`[${cb.sourceCode}]` + '  ' + cb.sourceNameThai}  </option>)}
                                    </CSelect>
                                    <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
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
                            id="search-header-sourceId"
                            options={source}
                            size="small"
                            getOptionLabel={(option) =>
                              "[" +
                              option.sourceCode +
                              "] " +
                              option.sourceNameThai
                            }
                            // style={{ width: 300 }}
                            onChange={handleChangeSearchSelect("source")}
                            renderOption={(option) => (
                              <Typography
                                className={classes.autoCompleteRenderOptions}
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
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" sm="6" md="6" lg="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[3]}
                        </CLabel>
                        {/* <CSelect className="form-control"
                                        id="search-header-trucktypeId"
                                        style={{ height: Constant.styleHeightField }}
                                    >
                                        <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                        <option value="">{Constant.txtFormAllSelected}</option>
                                        {truckType.map((cb) => <option value={cb.truckTypeId} >{`[${cb.truckTypeCode}]` + '  ' + cb.truckTypeName}  </option>)}
                                    </CSelect>
                                   
                                   <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
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
                            id="search-header-trucktypeId"
                            options={truckType}
                            size="small"
                            getOptionLabel={(option) =>
                              "[" +
                              option.truckTypeCode +
                              "] " +
                              option.truckTypeName
                            }
                            // style={{ width: 300 }}
                            onChange={handleChangeSearchSelect("trucktype")}
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
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[4]}
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
                            id="search-header-fueltypeId"
                            style={{ height: Constant.styleHeightField }}
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
                            </option>
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
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[5]}
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
                            id="search-header-ratetypeId"
                            style={{ height: Constant.styleHeightField }}
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
                            </option>
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
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[6]}
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
                            id="search-header-unloadTypeId"
                            style={{ height: Constant.styleHeightField }}
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
                            </option>
                            {unload.map((cb) => (
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
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[7]}
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
                            id="search-header-packagetypeId"
                            style={{ height: Constant.styleHeightField }}
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
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
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
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
                            <CInput
                              type="number"
                              style={{ height: Constant.styleHeightField }}
                              id="search-header-minqty"
                              step="0.001"
                              min="0"
                              max={headerMaxValueForMin}
                              onWheel={(e) => e.target.blur()}
                              onChange={setMinValueInMaxHearder}
                            />
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CInputGroup>
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
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
                            <CInput
                              type="number"
                              style={{ height: Constant.styleHeightField }}
                              id="search-header-maxqty"
                              min={headerMinValueForMax}
                              step="0.001"
                              onWheel={(e) => e.target.blur()}
                              onChange={setMaxValueInMinHearder}
                            />
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CInputGroup>
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
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
                          <CInput
                            type="number"
                            style={{ height: Constant.styleHeightField }}
                            id="search-header-mintonrate"
                            step="0.001"
                            min="0"
                            onWheel={(e) => e.target.blur()}
                          />
                          <CInvalidFeedback>
                            {Constant.inValidNullMessage}
                          </CInvalidFeedback>
                        </CInputGroup>
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" sm="6" md="6" lg="3">
                    <CFormGroup>
                      <CLabel htmlFor="ccmonth">
                        {Constant.arrFieldMasterConDomHeader[10]}
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
                          id="search-header-refDoc"
                          maxLength="50"
                          style={{ height: Constant.styleHeightField }}
                          placeholder=""
                        />
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[14]}
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
                            id="search-header-contractStatus"
                            style={{ height: Constant.styleHeightField }}
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            <option value="">
                              {Constant.txtFormAllSelected}
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
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" sm="6" md="6" lg="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldMasterConDomHeader[0]}
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
                            id="search-header-contractNo"
                            maxLength="50"
                            style={{ height: Constant.styleHeightField }}
                            placeholder=""
                          />
                        </Box>
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="row justify-content-center">
                  <CCol xs="10" sm="6" md="6" lg="2">
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
                          size="md"
                          block
                          color="warning"
                          onClick={onClickSearchData}
                        >
                          {Constant.btSearchData}
                        </CButton>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" sm="6" md="6" lg="2">
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
                          size="md"
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
            </CCardBody>
          </CCollapse>
        </CCard>
      </Box>
    </CForm>
  );

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
            size={Constant.btHeaderSize}
            block
            className="btn-mainsmp"
            onClick={handleClickOpen("add")}
          >
            {Constant.btCreateOrder}
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
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={handleClose("edit")}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>{Constant.txtDialogMasterConDom}</h3>
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
      </h6>
    );
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

  const onClickPreviousPage = () => {
    var newObj = { ...linkData };
    VariableController.linkShipmentNo = newObj.shipmentNo;
    VariableController.linkDeliveryNo = newObj.deliveryNo;
    VariableController.linkArrContractData = newObj.arrContractData;
    history.goBack();
  };

  const collapseHeader = (type) => {
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
    } else if (
      provinceList.length &&
      districtList.length &&
      CbProvinceDistrict.length &&
      getshipto.length &&
      source.length &&
      transporterList.length &&
      truckType.length &&
      fuelType.length &&
      rateType.length &&
      unload.length &&
      packageType.length &&
      contractStatus.length
    ) {
      if (!isGetDataOtherTable) {
        fnGetProvinceOverNightList();
        setDataTransportRateList();
        setIsGetDataOtherTable(true);
      }
      if (type === "add") {
        var isClone = Object.keys(cloneData).length !== 0;
        if (isClone) {
          var newObj = { ...cloneData };
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
          var truckTypeList = truckType.find(
            (x) => x.truckTypeId === newObj.truckTypeId
          );
          var truckTypeValue =
            "[" +
            truckTypeList.truckTypeCode +
            "] " +
            truckTypeList.truckTypeName;
          var fuelTypeList = fuelType.find(
            (x) => parseInt(x.valueMember) === newObj.fuelTypeId
          );
          var fuelTypeValue = fuelTypeList.displayMember;
          var rateTypeList = rateType.find(
            (x) => parseInt(x.valueMember) === newObj.rateTypeId
          );
          var rateTypeValue = rateTypeList.displayMember;
          var unloadTypeList = unload.find(
            (x) => parseInt(x.valueMember) === newObj.unloadTypeId
          );
          var unloadTypeValue = unloadTypeList.displayMember;
          var packageTypeValue = newObj.packageType;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var minQtyValue = newObj.minQty !== null ? newObj.minQty : null;
          var maxQtyValue = newObj.maxQty !== null ? newObj.maxQty : null;
          var minTonRateValue =
            newObj.minTonRate !== null ? newObj.minTonRate : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;
          var _contractStatus = newObj.contractStatus;
          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);
          if (headerMinValueForMax === null) {
            setHeaderMinValueForMax(minQtyValue);
          }
          if (headerMaxValueForMin === null) {
            setHeaderMaxValueForMin(maxQtyValue);
          }

          if (
            !Object.keys(itemSelectAdd[0]).length &&
            !Object.keys(itemSelectAdd[1]).length &&
            !Object.keys(itemSelectAdd[2]).length
          ) {
            setItemSelectAdd([_transporterList, sourceList, truckTypeList]);
          }
        }
        return (
          // <CCard>
          <CForm className="add-header-need-validation">
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
                <Box
                  className="border-set"
                  component={Grid}
                  item
                  boxShadow={1}
                  xs={{
                    width: " 100%",
                  }}
                >
                  <CCardHeader className="headtext">
                    {Constant.txtFormHeaderNewCreate}
                    <div className="card-header-actions">
                      <CLink
                        className="card-header-action"
                        onClick={() => setCollapsed(!collapsed)}
                      >
                        <CIcon
                          style={{ color: "blue" }}
                          name={
                            collapsed ? "cil-chevron-bottom" : "cil-chevron-top"
                          }
                        />
                      </CLink>
                    </div>
                  </CCardHeader>
                </Box>
                <CCollapse show={collapsed}>
                  <CCardBody className="headtext">
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
                        <CRow className="ml-2 mr-2 mt-1">
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="cvv">
                                {Constant.arrFieldMasterConDomHeader[12]}
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
                                  style={{ height: Constant.styleHeightField }}
                                  id="header-dateStart"
                                  name="date-input"
                                  value={isClone ? startDateValue : null}
                                  placeholder="date"
                                  onChange={
                                    isClone
                                      ? handleChangeCloneForm("startDate")
                                      : null
                                  }
                                  required
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
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
                                  style={{ height: Constant.styleHeightField }}
                                  id="header-dateEnd"
                                  name="date-input"
                                  value={isClone ? endDateValue : null}
                                  placeholder="date"
                                  onChange={
                                    isClone
                                      ? handleChangeCloneForm("endDate")
                                      : null
                                  }
                                  required
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="4">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[2]}
                              </CLabel>

                              {/* <CSelect className="form-control"
                                                    id="header-transporterId"
                                                    style={{ height: Constant.styleHeightField }}
                                                    required
                                                >
                                                    <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                                    {transporterList.map((item) => <option value={item.transporterId} >{`[${item.transporterCode}]` + '  ' + item.transporterNameThai}  </option>)}
                                                </CSelect>
                                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
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
                                  id="header-transporterId"
                                  options={transporterList}
                                  size="small"
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.transporterCode +
                                    "] " +
                                    option.transporterNameThai
                                  }
                                  // style={{ width: 300 }}
                                  defaultValue={
                                    isClone ? _transporterList : null
                                  }
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
                                />
                              </Box>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[1]}
                              </CLabel>
                              {/* <CSelect className="form-control"
                                                    id="header-sourceId"
                                                    style={{ height: Constant.styleHeightField }}
                                                    required
                                                >
                                                    <option selected hidden value="">เลือกต้นทาง</option>
                                                    {source.map((cb) => <option value={cb.sourceId} >{`[${cb.sourceCode}]` + '  ' + cb.sourceNameThai}  </option>)}
                                                </CSelect>
                                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
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
                                  id="header-sourceId"
                                  options={source}
                                  size="small"
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.sourceCode +
                                    "] " +
                                    option.sourceNameThai
                                  }
                                  // style={{ width: 300 }}
                                  defaultValue={isClone ? sourceList : null}
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
                                />
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
                        <CRow className="ml-2 mr-2 mt-1">
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[3]}
                              </CLabel>
                              {/* <CSelect className="form-control"
                                                    id="header-trucktypeId"
                                                    style={{ height: Constant.styleHeightField }}
                                                    required
                                                >
                                                    <option selected hidden value="">เลือกประเภทรถ</option>
                                                    {truckType.map((cb) => <option value={cb.truckTypeId} >{`[${cb.truckTypeCode}]` + '  ' + cb.truckTypeName}  </option>)}
                                                </CSelect>
                                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
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
                                  id="header-trucktypeId"
                                  options={truckType}
                                  size="small"
                                  getOptionLabel={(option) =>
                                    "[" +
                                    option.truckTypeCode +
                                    "] " +
                                    option.truckTypeName
                                  }
                                  // style={{ width: 300 }}
                                  defaultValue={isClone ? truckTypeList : null}
                                  onChange={handleChangeAddSelect("trucktype")}
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
                                />
                              </Box>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[4]}
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
                                  id="header-fueltypeId"
                                  style={{ height: Constant.styleHeightField }}
                                  required
                                >
                                  <option
                                    selected
                                    hidden
                                    value={isClone ? newObj.fuelTypeId : ""}
                                  >
                                    {isClone
                                      ? fuelTypeValue
                                      : Constant.txtformPlaceholderSelected}
                                  </option>
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
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[5]}
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
                                  id="header-ratetypeId"
                                  style={{ height: Constant.styleHeightField }}
                                  required
                                >
                                  <option
                                    selected
                                    hidden
                                    value={isClone ? newObj.rateTypeId : ""}
                                  >
                                    {isClone
                                      ? rateTypeValue
                                      : Constant.txtformPlaceholderSelected}
                                  </option>
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
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[6]}
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
                                  id="header-unloadTypeId"
                                  style={{ height: Constant.styleHeightField }}
                                  required
                                >
                                  <option
                                    selected
                                    hidden
                                    value={isClone ? newObj.unloadTypeId : ""}
                                  >
                                    {isClone
                                      ? unloadTypeValue
                                      : Constant.txtformPlaceholderSelected}
                                  </option>
                                  {unload.map((cb) => (
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
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[7]}
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
                                  id="header-packagetypeId"
                                  style={{ height: Constant.styleHeightField }}
                                  required
                                >
                                  <option
                                    selected
                                    hidden
                                    value={isClone ? packageTypeValue : ""}
                                  >
                                    {isClone
                                      ? packageTypeValue
                                      : Constant.txtformPlaceholderSelected}
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
                        <CRow className="ml-2 mr-2 mt-1">
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
                                  <CInput
                                    type="text"
                                    style={{
                                      height: Constant.styleHeightField,
                                    }}
                                    id="header-minqty"
                                    step="0.001"
                                    // min="0"
                                    // max={headerMaxValueForMin}
                                    // onWheel={(e) => e.target.blur()}
                                    value={isClone ? minQtyValue : null}
                                    onChange={
                                      isClone
                                        ? handleChangeCloneForm("minQty")
                                        : //setMinValueInMaxHearder
                                          null
                                    }
                                    onBlur={
                                      isClone
                                        ? () =>
                                            setCloneData(
                                              functionController.onBlurChangePrice(
                                                cloneData,
                                                3,
                                                "minQty",
                                                null,
                                                0
                                              )
                                            )
                                        : () =>
                                            (document.getElementById(
                                              "header-minqty"
                                            ).value =
                                              functionController.onBlurChangePrice(
                                                document.getElementById(
                                                  "header-minqty"
                                                ).value,
                                                3,
                                                null,
                                                null,
                                                0
                                              ))
                                    }
                                    onClick={
                                      isClone
                                        ? () =>
                                            setCloneData(
                                              functionController.onClickChangePrice(
                                                cloneData,
                                                "minQty"
                                              )
                                            )
                                        : () =>
                                            (document.getElementById(
                                              "header-minqty"
                                            ).value =
                                              functionController.onClickChangePrice(
                                                document.getElementById(
                                                  "header-minqty"
                                                ).value
                                              ))
                                    }
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
                                  <CInput
                                    type="text"
                                    style={{
                                      height: Constant.styleHeightField,
                                    }}
                                    id="header-maxqty"
                                    step="0.001"
                                    // onWheel={(e) => e.target.blur()}
                                    // min={headerMinValueForMax}
                                    value={isClone ? maxQtyValue : null}
                                    onChange={
                                      isClone
                                        ? handleChangeCloneForm("maxQty")
                                        : //setMaxValueInMinHearder
                                          null
                                    }
                                    onBlur={
                                      isClone
                                        ? () =>
                                            setCloneData(
                                              functionController.onBlurChangePrice(
                                                cloneData,
                                                3,
                                                "maxQty",
                                                null,
                                                0
                                              )
                                            )
                                        : () =>
                                            (document.getElementById(
                                              "header-maxqty"
                                            ).value =
                                              functionController.onBlurChangePrice(
                                                document.getElementById(
                                                  "header-maxqty"
                                                ).value,
                                                3,
                                                null,
                                                null,
                                                0
                                              ))
                                    }
                                    onClick={
                                      isClone
                                        ? () =>
                                            setCloneData(
                                              functionController.onClickChangePrice(
                                                cloneData,
                                                "maxQty"
                                              )
                                            )
                                        : () =>
                                            (document.getElementById(
                                              "header-maxqty"
                                            ).value =
                                              functionController.onClickChangePrice(
                                                document.getElementById(
                                                  "header-maxqty"
                                                ).value
                                              ))
                                    }
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
                                  <CInput
                                    type="text"
                                    style={{
                                      height: Constant.styleHeightField,
                                    }}
                                    id="header-mintonrate"
                                    // step="0.001"
                                    // min="0"
                                    // onWheel={(e) => e.target.blur()}
                                    value={isClone ? minTonRateValue : null}
                                    onChange={
                                      isClone
                                        ? handleChangeCloneForm("minTonRate")
                                        : null
                                    }
                                    onBlur={
                                      isClone
                                        ? () =>
                                            setCloneData(
                                              functionController.onBlurChangePrice(
                                                cloneData,
                                                3,
                                                "minTonRate",
                                                null,
                                                0
                                              )
                                            )
                                        : () =>
                                            (document.getElementById(
                                              "header-mintonrate"
                                            ).value =
                                              functionController.onBlurChangePrice(
                                                document.getElementById(
                                                  "header-mintonrate"
                                                ).value,
                                                3,
                                                null,
                                                null,
                                                0
                                              ))
                                    }
                                    onClick={
                                      isClone
                                        ? () =>
                                            setCloneData(
                                              functionController.onClickChangePrice(
                                                cloneData,
                                                "minTonRate"
                                              )
                                            )
                                        : () =>
                                            (document.getElementById(
                                              "header-mintonrate"
                                            ).value =
                                              functionController.onClickChangePrice(
                                                document.getElementById(
                                                  "header-mintonrate"
                                                ).value
                                              ))
                                    }
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
                        <CRow className="ml-2 mr-2 mt-1">
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="ccmonth">
                                {Constant.arrFieldMasterConDomHeader[10]}
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
                                  id="header-refDoc"
                                  maxLength="50"
                                  style={{ height: Constant.styleHeightField }}
                                  value={isClone ? refDocNoValue : null}
                                  onChange={
                                    isClone
                                      ? handleChangeCloneForm("refDocNo")
                                      : null
                                  }
                                />
                              </Box>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[14]}
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
                                  id="header-contractStatus"
                                  style={{ height: Constant.styleHeightField }}
                                  required
                                >
                                  <option
                                    selected
                                    hidden
                                    value={isClone ? _contractStatus : ""}
                                  >
                                    {isClone
                                      ? _contractStatus
                                      : Constant.txtformPlaceholderSelected}
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
                        <CRow className="ml-2 mr-2 mt-1">
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="name">
                                {Constant.arrFieldMasterConDomHeader[0]}
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
                                  id="header-contractNo"
                                  maxLength="50"
                                  style={{ height: Constant.styleHeightField }}
                                  required
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CCard>
                    </Box>

                    <CRow className="row justify-content-center">
                      <CCol xs="12" sm="6" md="2">
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
                              onClick={onClickCheckFormAddData}
                            >
                              {Constant.btSave}
                            </CButton>
                          </Box>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
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
                              onClick={
                                isClone
                                  ? () => setIsShowExitClone(!isShowExitClone)
                                  : handleClose("add")
                              }
                            >
                              {Constant.btCancel}
                            </CButton>
                          </Box>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </Box>
          </CForm>

          // </CCard >
        );
      } else if (type === "edit") {
        if (Object.keys(editData).length) {
          var newObj = { ...editData };
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
          var truckTypeList = truckType.find(
            (x) => x.truckTypeId === newObj.truckTypeId
          );
          var truckTypeValue =
            "[" +
            truckTypeList.truckTypeCode +
            "] " +
            truckTypeList.truckTypeName;
          var fuelTypeList = fuelType.find(
            (x) => parseInt(x.valueMember) === newObj.fuelTypeId
          );
          var fuelTypeValue = fuelTypeList.displayMember;
          var rateTypeList = rateType.find(
            (x) => parseInt(x.valueMember) === newObj.rateTypeId
          );
          var rateTypeValue = rateTypeList.displayMember;
          var unloadTypeList = unload.find(
            (x) => parseInt(x.valueMember) === newObj.unloadTypeId
          );
          var unloadTypeValue = unloadTypeList.displayMember;
          var packageTypeValue = newObj.packageType;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var minQtyValue = newObj.minQty !== null ? newObj.minQty : null;
          var maxQtyValue = newObj.maxQty !== null ? newObj.maxQty : null;
          var minTonRateValue =
            newObj.minTonRate !== null ? newObj.minTonRate : null;
          var startDateValue =
            newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue =
            newObj.endDate !== null ? new Date(newObj.endDate) : null;
          var _contractStatus = newObj.contractStatus;
          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);
          if (headerMinValueForMax === null) {
            setHeaderMinValueForMax(minQtyValue);
          }
          if (headerMaxValueForMin === null) {
            setHeaderMaxValueForMin(maxQtyValue);
          }

          if (
            !Object.keys(itemSelectEdit[0]).length &&
            !Object.keys(itemSelectEdit[1]).length &&
            !Object.keys(itemSelectEdit[2]).length
          ) {
            setItemSelectEdit([_transporterList, sourceList, truckTypeList]);
          }

          return (
            <CCard>
              <CForm className="edit-header-need-validation">
                <CCardHeader className="headtext">
                  {Constant.txtFormHeaderEditData}
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => setCollapsed(!collapsed)}
                    >
                      <CIcon
                        style={{ color: "blue" }}
                        name={
                          collapsed ? "cil-chevron-bottom" : "cil-chevron-top"
                        }
                      />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed}>
                  <CCardBody className="headtext">
                    <CRow>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CLabel htmlFor="cvv">
                            {Constant.arrFieldMasterConDomHeader[12]}
                          </CLabel>
                          <CInput
                            size="xs"
                            type="date"
                            style={{ height: Constant.styleHeightField }}
                            value={startDateValue}
                            onChange={handleChangeEditForm("startDate")}
                            disabled={isLinkData}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CLabel htmlFor="cvv">
                            {Constant.arrFieldMasterConDomHeader[13]}
                          </CLabel>
                          <CInput
                            size="xs"
                            type="date"
                            style={{ height: Constant.styleHeightField }}
                            value={endDateValue}
                            onChange={handleChangeEditForm("endDate")}
                            disabled={isLinkData}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="4">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[2]}
                            </CLabel>
                            {/* <CSelect className="form-control"
                                                            id="edit-header-transporter"
                                                            style={{ height: Constant.styleHeightField }}
                                                            required
                                                        >
                                                            <option selected hidden value={newObj.transporterId}>{transporterValue}</option>
                                                            {transporterList.map((item) => <option value={item.transporterId} >{`[${item.transporterCode}]` + '  ' + item.transporterNameThai}  </option>)}
                                                        </CSelect>
                                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
                            <Autocomplete
                              id="edit-header-transporter"
                              options={transporterList}
                              size="small"
                              defaultValue={transporterList.find(
                                (x) => x.transporterId === newObj.transporterId
                              )}
                              getOptionLabel={(option) =>
                                "[" +
                                option.transporterCode +
                                "] " +
                                option.transporterNameThai
                              }
                              // style={{ width: 300 }}
                              onChange={handleChangeEditSelect("transporter")}
                              renderOption={(option) => (
                                <Typography
                                  className={classes.autoCompleteRenderOptions}
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
                                    style={{
                                      height: Constant.styleHeightField,
                                    }}
                                    error={invalidMaterialFormEdit[0]}
                                    {...params}
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
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[1]}
                            </CLabel>
                            {/* <CSelect className="form-control"
                                                            id="edit-header-source"
                                                            style={{ height: Constant.styleHeightField }}
                                                            required
                                                        >
                                                            <option selected hidden value={newObj.sourceId}>{sourceValue}</option>
                                                            {source.map((cb) => <option value={cb.sourceId} >{`[${cb.sourceCode}]` + '  ' + cb.sourceNameThai}  </option>)}
                                                        </CSelect>
                                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback> */}
                            <Autocomplete
                              id="edit-header-source"
                              options={source}
                              size="small"
                              defaultValue={source.find(
                                (x) => x.sourceId === newObj.sourceId
                              )}
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
                                  className={classes.autoCompleteRenderOptions}
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
                                    style={{
                                      height: Constant.styleHeightField,
                                    }}
                                    error={invalidMaterialFormEdit[1]}
                                    {...params}
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
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <div className="dropdown-divider" />
                    <CRow>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[3]}
                            </CLabel>
                            {/* <CSelect className="form-control"
                                                            id="edit-header-trucktype"
                                                            style={{ height: Constant.styleHeightField }}
                                                            required
                                                        >
                                                            <option selected hidden value={newObj.truckTypeId}>{truckTypeValue}</option>
                                                            {truckType.map((cb) => <option value={cb.truckTypeId} >{`[${cb.truckTypeCode}]` + '  ' + cb.truckTypeName}  </option>)}
                                                        </CSelect>
                                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback> */}
                            <Autocomplete
                              id="edit-header-trucktype"
                              options={truckType}
                              size="small"
                              defaultValue={truckType.find(
                                (x) => x.truckTypeId === newObj.truckTypeId
                              )}
                              getOptionLabel={(option) =>
                                "[" +
                                option.truckTypeCode +
                                "] " +
                                option.truckTypeName
                              }
                              // style={{ width: 300 }}
                              onChange={handleChangeEditSelect("trucktype")}
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
                                    style={{
                                      height: Constant.styleHeightField,
                                    }}
                                    error={invalidMaterialFormEdit[2]}
                                    {...params}
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
                                      invalidMaterialFormEdit[2] ? (
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
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[4]}
                            </CLabel>
                            <CSelect
                              className="form-control"
                              id="edit-header-fueltype"
                              style={{ height: Constant.styleHeightField }}
                              required
                              disabled={isLinkData}
                            >
                              <option selected hidden value={newObj.fuelTypeId}>
                                {fuelTypeValue}
                              </option>
                              {fuelType.map((cb) => (
                                <option value={cb.valueMember}>
                                  {cb.displayMember}{" "}
                                </option>
                              ))}
                            </CSelect>
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[5]}
                            </CLabel>
                            <CSelect
                              className="form-control"
                              id="edit-header-ratetype"
                              style={{ height: Constant.styleHeightField }}
                              required
                              disabled={isLinkData}
                            >
                              <option selected hidden value={newObj.rateTypeId}>
                                {rateTypeValue}
                              </option>
                              {rateType.map((cb) => (
                                <option value={cb.valueMember}>
                                  {cb.displayMember}{" "}
                                </option>
                              ))}
                            </CSelect>
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[6]}
                            </CLabel>
                            <CSelect
                              className="form-control"
                              id="edit-header-unloadtype"
                              style={{ height: Constant.styleHeightField }}
                              required
                              disabled={isLinkData}
                            >
                              <option
                                selected
                                hidden
                                value={newObj.unloadTypeId}
                              >
                                {unloadTypeValue}
                              </option>
                              {unload.map((cb) => (
                                <option value={cb.valueMember}>
                                  {cb.displayMember}{" "}
                                </option>
                              ))}
                            </CSelect>
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[7]}
                            </CLabel>
                            <CSelect
                              className="form-control"
                              id="edit-header-packagetype"
                              style={{ height: Constant.styleHeightField }}
                              required
                              disabled={isLinkData}
                            >
                              <option
                                selected
                                hidden
                                value={newObj.packageType}
                              >
                                {packageTypeValue}
                              </option>
                              {packageType.map((cb) => (
                                <option value={cb.valueMember}>
                                  {cb.displayMember}{" "}
                                </option>
                              ))}
                            </CSelect>
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <div className="dropdown-divider" />
                    <CRow>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[8]}
                            </CLabel>
                            <CInputGroup className="input-prepend">
                              <CInputGroupPrepend>
                                <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                type="text"
                                style={{ height: Constant.styleHeightField }}
                                // step="0.001"
                                // min="0"
                                max={headerMaxValueForMin}
                                // onWheel={(e) => e.target.blur()}
                                value={minQtyValue}
                                onChange={handleChangeEditForm("minQty")}
                                required
                                disabled={isLinkData}
                                onBlur={() =>
                                  setEditData(
                                    functionController.onBlurChangePrice(
                                      editData,
                                      3,
                                      "minQty",
                                      null,
                                      0
                                    )
                                  )
                                }
                                onClick={() =>
                                  setEditData(
                                    functionController.onClickChangePrice(
                                      editData,
                                      "minQty"
                                    )
                                  )
                                }
                              />
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CInputGroup>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[9]}
                            </CLabel>
                            <CInputGroup className="input-prepend">
                              <CInputGroupPrepend>
                                <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                type="text"
                                style={{ height: Constant.styleHeightField }}
                                // step="0.001"
                                // min={headerMinValueForMax}
                                // onWheel={(e) => e.target.blur()}
                                value={maxQtyValue}
                                onChange={handleChangeEditForm("maxQty")}
                                required
                                disabled={isLinkData}
                                onBlur={() =>
                                  setEditData(
                                    functionController.onBlurChangePrice(
                                      editData,
                                      3,
                                      "maxQty",
                                      null,
                                      0
                                    )
                                  )
                                }
                                onClick={() =>
                                  setEditData(
                                    functionController.onClickChangePrice(
                                      editData,
                                      "maxQty"
                                    )
                                  )
                                }
                              />
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CInputGroup>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">
                            {Constant.arrFieldMasterConDomHeader[11]}
                          </CLabel>
                          <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                              <CInputGroupText>{_txtUnitTon}</CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              style={{ height: Constant.styleHeightField }}
                              // step="0.001"
                              // min="0"
                              value={minTonRateValue}
                              onChange={handleChangeEditForm("minTonRate")}
                              required
                              disabled={isLinkData}
                              onBlur={() =>
                                setEditData(
                                  functionController.onBlurChangePrice(
                                    editData,
                                    3,
                                    "minTonRate",
                                    null,
                                    0
                                  )
                                )
                              }
                              onClick={() =>
                                setEditData(
                                  functionController.onClickChangePrice(
                                    editData,
                                    "minTonRate"
                                  )
                                )
                              }
                            />
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CInputGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <div className="dropdown-divider" />
                    <CRow>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">
                            {Constant.arrFieldMasterConDomHeader[10]}
                          </CLabel>
                          <CInput
                            type="text"
                            maxLength="50"
                            value={refDocNoValue}
                            style={{ height: Constant.styleHeightField }}
                            onChange={handleChangeEditForm("refDocNo")}
                            disabled={isLinkData}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[14]}
                            </CLabel>
                            <CSelect
                              className="form-control"
                              id="edit-header-contractstatus"
                              style={{ height: Constant.styleHeightField }}
                              required
                              disabled={isLinkData}
                            >
                              <option selected hidden value={_contractStatus}>
                                {_contractStatus}
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
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <div className="dropdown-divider" />
                    <CRow>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">
                              {Constant.arrFieldMasterConDomHeader[0]}
                            </CLabel>
                            <CInput
                              type="text"
                              maxLength="50"
                              value={contractNoValue}
                              style={{ height: Constant.styleHeightField }}
                              onChange={handleChangeEditForm("contractNo")}
                              required
                              disabled={isLinkData}
                            />
                            <CInvalidFeedback>
                              {Constant.inValidNullMessage}
                            </CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    {formButtonManageEdit()}
                  </CCardBody>
                </CCollapse>
              </CForm>
            </CCard>
          );
        }
      }
    }
  };

  const formButtonManageEdit = () => {
    if (!isLinkData) {
      return (
        <div>
          <div className="dropdown-divider" />
          <CRow className="row justify-content-center">
            <CCol xs="10" sm="6" md="2">
              <CFormGroup>
                <br />
                <CButton
                  size={Constant.btAddSize}
                  block
                  color="primary"
                  onClick={() => setIsShowCloned(!isShowCloned)}
                >
                  {Constant.btCloneData}
                </CButton>
              </CFormGroup>
            </CCol>
            <CCol md="3" />
            <CCol xs="10" sm="6" md="2">
              <CFormGroup>
                <br />
                <CButton
                  size={Constant.btAddSize}
                  block
                  color="success"
                  onClick={onClickCheckFormEditData}
                >
                  {Constant.btSave}
                </CButton>
              </CFormGroup>
            </CCol>
            <CCol md="3" />
            <CCol xs="10" sm="6" md="2">
              <CFormGroup>
                <br />
                <CButton
                  size={Constant.btAddSize}
                  block
                  color="danger"
                  onClick={() => setIsConfirmDelete(!isConfirmDelete)}
                >
                  {Constant.btDeleteData}
                </CButton>
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
      );
    }
  };

  const formFuelRate = () => {
    var isClone = Object.keys(cloneData).length !== 0;
    var isEdit = Object.keys(editData).length !== 0;
    if (isClone) {
      var newObj = { ...cloneData };
    } else if (isEdit) {
      var newObj = { ...editData };
    }
    return (
      <div className="font-form-scg">
        {formAddFuelRate()}
        <br />
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          {/* <CCardBody> */}
          <CDataTable
            items={calFuelRateList}
            fields={FFuelRate}
            // columnFilter
            tableFilter={{
              label: `${Constant.tabletxtSearch}`,
              placeholder: `${Constant.tabletxtPlaceholder}`,
            }}
            // itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
            itemsPerPage={100}
            // hover
            bordered
            // sorter
            pagination
            scopedSlots={{
              seqRate: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      // step="0.5"
                      // onWheel={(e) => e.target.blur()}
                      value={item.seqRate}
                      onChange={handleChangeUpdateField(
                        "fuel-rate",
                        index,
                        item
                      )}
                      disabled={isLinkData}
                      onBlur={() =>
                        setCalFuelRateList(
                          functionController.onBlurChangePrice(
                            calFuelRateList,
                            2,
                            "seqRate",
                            index
                          )
                        )
                      }
                      onClick={() =>
                        setCalFuelRateList(
                          functionController.onClickChangePrice(
                            calFuelRateList,
                            "seqRate",
                            index
                          )
                        )
                      }
                    />
                  </td>
                );
              },
            }}
          />
          {/* </CCardBody> */}
        </CCard>
        {/* </CRow> */}
        <CRow>
          <CCol md="6">
            <CFormGroup>
              <CLabel>{Constant.arrFieldMasterConDomFuel[3]}</CLabel>
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
                  id="fuelrate-remark"
                  rows="6"
                  value={
                    isClone
                      ? newObj.fuelRateRemark
                      : isEdit
                      ? newObj.fuelRateRemark
                      : null
                  }
                  onChange={
                    isClone
                      ? handleChangeCloneForm("fuelRateRemark")
                      : isEdit
                      ? handleChangeEditForm("fuelRateRemark")
                      : null
                  }
                  disabled={isLinkData}
                />
              </Box>
              <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
            </CFormGroup>
          </CCol>
        </CRow>
      </div>
    );
  };

  const formAddFuelRate = () => {
    if (!isLinkData) {
      return (
        <CForm className="fuel-need-validation" noValidate>
          <CRow>
            <CCol md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomFuel[0]}</CLabel>
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
                    id="fuel-start"
                    style={{ height: Constant.styleHeightField }}
                    // step="0.01"
                    // min="0"
                    // onWheel={(e) => e.target.blur()}
                    required
                    onChange={handleChangeInputStartValue("fuel-rate")}
                    onBlur={() =>
                      (document.getElementById("fuel-start").value =
                        functionController.onBlurChangePrice(
                          document.getElementById("fuel-start").value,
                          2,
                          null,
                          null,
                          0
                        ))
                    }
                    onClick={() =>
                      (document.getElementById("fuel-start").value =
                        functionController.onClickChangePrice(
                          document.getElementById("fuel-start").value
                        ))
                    }
                  />
                  <CInvalidFeedback>
                    {Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomFuel[1]}</CLabel>
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
                    id="fuel-end"
                    style={{ height: Constant.styleHeightField }}
                    // step="0.01"
                    // onWheel={(e) => e.target.blur()}
                    // min={fuelRateMinEnd}
                    invalid={invalidFuelRateEnd}
                    required
                    onBlur={() =>
                      (document.getElementById("fuel-end").value =
                        functionController.onBlurChangePrice(
                          document.getElementById("fuel-end").value,
                          2,
                          null,
                          null,
                          fuelRateMinEnd
                        ))
                    }
                    onClick={() =>
                      (document.getElementById("fuel-end").value =
                        functionController.onClickChangePrice(
                          document.getElementById("fuel-end").value
                        ))
                    }
                  />
                  <CInvalidFeedback>
                    {invalidFuelRateEnd
                      ? Constant.inValidMoreThanValue
                      : Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomFuel[2]}</CLabel>
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
                    id="fuel-price"
                    style={{ height: Constant.styleHeightField }}
                    // step="0.5"
                    // onWheel={(e) => e.target.blur()}
                    // min="0"
                    required
                    onBlur={() =>
                      (document.getElementById("fuel-price").value =
                        functionController.onBlurChangePrice(
                          document.getElementById("fuel-price").value,
                          2,
                          null,
                          null,
                          0
                        ))
                    }
                    onClick={() =>
                      (document.getElementById("fuel-price").value =
                        functionController.onClickChangePrice(
                          document.getElementById("fuel-price").value
                        ))
                    }
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
                  onClick={onClickCalFuelRate}
                >
                  {Constant.btCalculate}
                </CButton>
              </Box>
            </CCol>
          </CRow>
        </CForm>
      );
    } else {
      return null;
    }
  };

  const formMultiDropRate = () => {
    return (
      <div className="font-form-scg">
        {formAddMultiDropRate()}
        <br />
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          {/* <CCardBody> */}
          <CDataTable
            items={calMultiDropRateList}
            fields={FMultiDropRateManage}
            // columnFilter
            tableFilter={{
              label: `${Constant.tabletxtSearch}`,
              placeholder: `${Constant.tabletxtPlaceholder}`,
            }}
            itemsPerPage={100}
            bordered
            // hover
            // sorter
            pagination
            scopedSlots={{
              distancePrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      // step="0.01"
                      // onWheel={(e) => e.target.blur()}
                      // min="0"
                      value={item.distancePrice}
                      onChange={handleChangeUpdateField(
                        "multidrop-rate",
                        index
                      )}
                      disabled={isLinkData}
                      onBlur={() =>
                        setCalMultiDropRateList(
                          functionController.onBlurChangePrice(
                            calMultiDropRateList,
                            2,
                            "distancePrice",
                            index,
                            0
                          )
                        )
                      }
                      onClick={() =>
                        setCalMultiDropRateList(
                          functionController.onClickChangePrice(
                            calMultiDropRateList,
                            "distancePrice",
                            index
                          )
                        )
                      }
                    />
                  </td>
                );
              },
              manage: (item, index) => {
                if (!isLinkData) {
                  return (
                    <td className="py-2">
                      <CButton
                        size={Constant.btAddSize}
                        color="danger"
                        className="mr-1"
                        onClick={onClickConfirmRemoveRecord(
                          "multidrop-rate",
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
          {/* </CCardBody> */}
        </CCard>
        {/* </CRow> */}
      </div>
    );
  };

  const formAddMultiDropRate = () => {
    if (!isLinkData) {
      return (
        <CForm className="multidrop-need-validation" noValidate>
          <CRow>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomMultiDrop[0]}</CLabel>
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
                    id="multidrop-start"
                    style={{ height: Constant.styleHeightField }}
                    // step="0.01"
                    // onWheel={(e) => e.target.blur()}
                    // min="0"
                    required
                    invalid={invalidMultiDropStart}
                    onChange={handleChangeInputStartValue("multidrop-rate")}
                    onBlur={() =>
                      (document.getElementById("multidrop-start").value =
                        functionController.onBlurChangePrice(
                          document.getElementById("multidrop-start").value,
                          2,
                          null,
                          null,
                          0
                        ))
                    }
                    onClick={() =>
                      (document.getElementById("multidrop-start").value =
                        functionController.onClickChangePrice(
                          document.getElementById("multidrop-start").value
                        ))
                    }
                  />
                  <CInvalidFeedback>
                    {invalidMultiDropStart
                      ? Constant.inValidDuplicateValue
                      : Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomMultiDrop[1]}</CLabel>
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
                    id="multidrop-end"
                    style={{ height: Constant.styleHeightField }}
                    // step="0.01"
                    // onWheel={(e) => e.target.blur()}
                    // min={multiDropRateMinEnd}
                    required
                    invalid={invalidMultiDropEnd}
                    onBlur={() =>
                      (document.getElementById("multidrop-end").value =
                        functionController.onBlurChangePrice(
                          document.getElementById("multidrop-end").value,
                          2,
                          null,
                          null,
                          multiDropRateMinEnd
                        ))
                    }
                    onClick={() =>
                      (document.getElementById("multidrop-end").value =
                        functionController.onClickChangePrice(
                          document.getElementById("multidrop-end").value
                        ))
                    }
                  />
                  <CInvalidFeedback>
                    {invalidMultiDropEnd
                      ? Constant.inValidMoreThanValue
                      : Constant.inValidNullMessage}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomMultiDrop[2]}</CLabel>
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
                    id="multidrop-price"
                    style={{ height: Constant.styleHeightField }}
                    // step="0.01"
                    // onWheel={(e) => e.target.blur()}
                    // min="0"
                    required
                    onBlur={() =>
                      (document.getElementById("multidrop-price").value =
                        functionController.onBlurChangePrice(
                          document.getElementById("multidrop-price").value,
                          2,
                          null,
                          null,
                          0
                        ))
                    }
                    onClick={() =>
                      (document.getElementById("multidrop-price").value =
                        functionController.onClickChangePrice(
                          document.getElementById("multidrop-price").value
                        ))
                    }
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
              <CButton
                className="editbutton"
                size={Constant.btAddSize}
                color="success"
                block
                onClick={onClickCalMultiDropRate}
              >
                {Constant.btAddData}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      );
    } else {
      return null;
    }
  };

  const formOverNightRate = () => {
    return (
      <div className="font-form-scg">
        {formAddOverNightRate()}
        <br />
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          {/* <CCardBody> */}
          <CDataTable
            items={calOverNightRateList}
            fields={FOverNightpRateManage}
            // columnFilter
            tableFilter={{
              label: `${Constant.tabletxtSearch}`,
              placeholder: `${Constant.tabletxtPlaceholder}`,
            }}
            itemsPerPage={100}
            // hover
            bordered
            // sorter
            pagination
            scopedSlots={{
              overnightPerManPrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      // step="0.01"
                      // onWheel={(e) => e.target.blur()}
                      // min="0"
                      value={item.overnightPerManPrice}
                      onChange={handleChangeUpdateField(
                        "overnight-rate",
                        index
                      )}
                      disabled={isLinkData}
                      onBlur={() =>
                        setCalOverNightRateList(
                          functionController.onBlurChangePrice(
                            calOverNightRateList,
                            2,
                            "overnightPerManPrice",
                            index,
                            0
                          )
                        )
                      }
                      onClick={() =>
                        setCalOverNightRateList(
                          functionController.onClickChangePrice(
                            calOverNightRateList,
                            "overnightPerManPrice",
                            index
                          )
                        )
                      }
                    />
                  </td>
                );
              },
              manage: (item, index) => {
                if (!isLinkData) {
                  return (
                    <td className="py-2">
                      <CButton
                        size={Constant.btAddSize}
                        color="danger"
                        className="mr-1"
                        onClick={onClickConfirmRemoveRecord(
                          "overnight-rate",
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
          {/* </CCardBody> */}
        </CCard>
        {/* // </CRow> */}
      </div>
    );
  };

  const formAddOverNightRate = () => {
    if (!isLinkData) {
      var newProvince = [];
      if (indexEditForm !== null && calOverNightRateList.length) {
        provinceOverNightList.map((item) => {
          var result = calOverNightRateList.find(
            (x) => x.provinceId === item.provinceId
          );
          if (!result) {
            newProvince.push(item);
          }
        });
      } else {
        newProvince = [...provinceOverNightList];
      }
      return (
        <CForm className="overnight-need-validation" noValidate>
          <CRow>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomOverNight[0]}</CLabel>
                {/* <CSelect
                                    id="overnight-province"
                                    style={{ height: Constant.styleHeightField }}
                                    required>
                                    <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                    {showSelectList(indexEditForm === null ? "add-overnight" : "edit-overnight")}
                                </CSelect>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback> */}
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
                    id="overnight-province"
                    options={newProvince}
                    size="small"
                    getOptionLabel={(option) => `${option.provinceName1}`}
                    // style={{ width: 300 }}
                    onChange={handleChangeOtherSelect("overnight")}
                    renderOption={(option) => (
                      <Typography className={classes.autoCompleteRenderOptions}>
                        {option.provinceName1}
                      </Typography>
                    )}
                    renderInput={(params) => {
                      params.inputProps.className =
                        classes.autoCompleteInputLabel;
                      return (
                        <TextField
                          size="small"
                          // style={{ height: Constant.styleHeightField }}
                          error={invalidMaterialFormOther[0]}
                          {...params}
                          label={
                            <Typography
                              className={classes.autoCompleteInputLabel}
                            >
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
                </Box>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="6" md="3">
              <CFormGroup>
                <CLabel>{Constant.arrFieldMasterConDomOverNight[1]}</CLabel>
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
                    id="overnight-price"
                    style={{ height: Constant.styleHeightField }}
                    // step="0.01"
                    // onWheel={(e) => e.target.blur()}
                    // min="0"
                    required
                    onBlur={() =>
                      (document.getElementById("overnight-price").value =
                        functionController.onBlurChangePrice(
                          document.getElementById("overnight-price").value,
                          2,
                          null,
                          null,
                          0
                        ))
                    }
                    onClick={() =>
                      (document.getElementById("overnight-price").value =
                        functionController.onClickChangePrice(
                          document.getElementById("overnight-price").value
                        ))
                    }
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
                  onClick={onClickCalOverNightRate}
                >
                  {Constant.btAddData}
                </CButton>
              </Box>
            </CCol>
          </CRow>
        </CForm>
      );
    } else {
      return null;
    }
  };

  const formTransportRate = () => {
    return (
      <div className="font-form-scg">
        <br />
        {formAddTransportRate()}
        <br />
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          {/* <CCardBody> */}
          <CDataTable
            items={InTransportRateByPD}
            fields={FTransportRate}
            // columnFilter
            tableFilter={{
              label: `${Constant.tabletxtSearch}`,
              placeholder: `${Constant.tabletxtPlaceholder}`,
            }}
            itemsPerPage={100}
            // striped
            bordered
            pagination
            // hover
            // sorter
            scopedSlots={{
              price: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      id={"PD-APrice-" + index}
                      type="text"
                      // min='0'
                      // step='0.01'
                      // onWheel={(e) => e.target.blur()}
                      // placeholder={item.price === NaN ? item.price : 0}
                      value={item.price}
                      onChange={handleCUpdateField(index, "PD1", item)}
                      disabled={isLinkData}
                      onBlur={() =>
                        setInTransportRateByPD(
                          functionController.onBlurChangePrice(
                            InTransportRateByPD,
                            2,
                            "price",
                            index,
                            0
                          )
                        )
                      }
                      onClick={() =>
                        setInTransportRateByPD(
                          functionController.onClickChangePrice(
                            InTransportRateByPD,
                            "price",
                            index
                          )
                        )
                      }
                    />
                  </td>
                );
              },
              fuelPrice: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      id={"PD-AfuelPrice-" + index}
                      type="text"
                      // min='0'
                      // step='0.01'
                      // onWheel={(e) => e.target.blur()}
                      // placeholder={item.fuelPrice === NaN ? item.fuelPrice : 0}
                      value={item.fuelPrice}
                      onChange={handleCUpdateField(index, "PD2", item)}
                      disabled={isLinkData}
                      onBlur={() =>
                        setInTransportRateByPD(
                          functionController.onBlurChangePrice(
                            InTransportRateByPD,
                            2,
                            "fuelPrice",
                            index,
                            0
                          )
                        )
                      }
                      onClick={() =>
                        setInTransportRateByPD(
                          functionController.onClickChangePrice(
                            InTransportRateByPD,
                            "fuelPrice",
                            index
                          )
                        )
                      }
                    />
                  </td>
                );
              },
              delete_transportRate: (item, index) => {
                if (item.shipToId !== null && !isLinkData) {
                  return (
                    <td className="py-2">
                      <CButton
                        size={Constant.btAddSize}
                        block
                        color="danger"
                        onClick={onClickConfirmRemoveRecord(
                          "transport-rate",
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
          {/* </CCardBody> */}
        </CCard>
        {/* </CRow> */}
      </div>
    );
  };

  const formAddTransportRate = () => {
    if (!isLinkData) {
      return (
        <CForm className="fuel-need-validation" noValidate>
          <CFormGroup className="font-form-scg">
            <CRow>
              <CCol xs="12" sm="6" md="4">
                <CFormGroup>
                  <CLabel>{Constant.arrFieldMasterConDomTransport[0]}</CLabel>
                  {/* <CSelect className="form-control"
                                        id="transport-shipToId"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder="กรุณาเลือกประเทศ">
                                        <option selected hidden value="">เลือกปลายทาง</option>
                                        {getshipto.map((cb) => <option value={cb.shipToId} >{`[${cb.shipToCode}]` + '  ' + cb.shipToNameThai}  </option>)}
                                    </CSelect>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback> */}
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
                      id="transport-shipToId"
                      options={getshipto}
                      size="small"
                      getOptionLabel={(option) =>
                        "[" + option.shipToCode + "] " + option.shipToNameThai
                      }
                      // style={{ width: 300 }}
                      onChange={handleChangeOtherSelect("transport")}
                      renderOption={(option) => (
                        <Typography
                          className={classes.autoCompleteRenderOptions}
                        >
                          {"[" +
                            option.shipToCode +
                            "] " +
                            option.shipToNameThai}
                        </Typography>
                      )}
                      renderInput={(params) => {
                        params.inputProps.className =
                          classes.autoCompleteInputLabel;
                        return (
                          <TextField
                            size="small"
                            // style={{ height: Constant.styleHeightField }}
                            {...params}
                            error={invalidMaterialFormOther[1]}
                            label={
                              <Typography
                                className={classes.autoCompleteInputLabel}
                              >
                                {Constant.txtformPlaceholderSelected}
                              </Typography>
                            }
                            helperText={
                              invalidMaterialFormOther[1] ? (
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
                    onClick={onClickAddShipToInDataList}
                  >
                    {/*  */}
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

  const formTruckLicense = () => {
    return (
      <div className="font-form-scg">
        {formAddTruckLicense()}
        <br />
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          {/* <CCardBody> */}
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
          {/* </CCardBody> */}
        </CCard>
        {/* // </CRow> */}
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

  const formUnloadRate = () => {
    return (
      <div className="font-form-scg">
        {formAddUnloadRate()}
        <br />
        {/* <CRow className="justify-content-center"> */}
        <CCard
          className="p-2"
          style={{ maxHeight: "700px", overflowY: "auto" }}
        >
          {/* <CCardBody> */}
          <CDataTable
            items={InUnloadRate}
            fields={FUnloadRate}
            // columnFilter
            tableFilter={{
              label: `${Constant.tabletxtSearch}`,
              placeholder: `${Constant.tabletxtPlaceholder}`,
            }}
            itemsPerPage={100}
            bordered
            // hover
            // sorter
            pagination
            scopedSlots={{
              delete_UnloadRate: (item, index) => {
                if (!isLinkData) {
                  return (
                    <td className="py-2">
                      <CButton
                        size={Constant.btAddSize}
                        block
                        color="danger"
                        onClick={onClickConfirmRemoveRecord(
                          "unload-rate",
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
          {/* </CCardBody> */}
        </CCard>
        {/* </CRow> */}
      </div>
    );
  };

  const formAddUnloadRate = () => {
    if (!isLinkData) {
      return (
        <CForm className="unloadrate-need-validation" noValidate>
          <CFormGroup className="font-form-scg">
            <CRow>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel>{Constant.arrFieldMasterConDomUnload[0]}</CLabel>
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
                      id="unloadRate-manPower"
                      style={{ height: Constant.styleHeightField }}
                      // onWheel={(e) => e.target.blur()}
                      // min="0"
                      required
                      onBlur={() =>
                        (document.getElementById("unloadRate-manPower").value =
                          functionController.onBlurChangePrice(
                            document.getElementById("unloadRate-manPower")
                              .value,
                            0,
                            null,
                            null,
                            0
                          ))
                      }
                      onClick={() =>
                        (document.getElementById("unloadRate-manPower").value =
                          functionController.onClickChangePrice(
                            document.getElementById("unloadRate-manPower").value
                          ))
                      }
                    />
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </Box>
                </CFormGroup>
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel>{Constant.arrFieldMasterConDomUnload[1]}</CLabel>
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
                      id="unloadRate-minRatePrice"
                      style={{ height: Constant.styleHeightField }}
                      // step="0.01"
                      // min="0"
                      // onWheel={(e) => e.target.blur()}
                      required
                      onBlur={() =>
                        (document.getElementById(
                          "unloadRate-minRatePrice"
                        ).value = functionController.onBlurChangePrice(
                          document.getElementById("unloadRate-minRatePrice")
                            .value,
                          2,
                          null,
                          null,
                          0
                        ))
                      }
                      onClick={() =>
                        (document.getElementById(
                          "unloadRate-minRatePrice"
                        ).value = functionController.onClickChangePrice(
                          document.getElementById("unloadRate-minRatePrice")
                            .value
                        ))
                      }
                    />
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </Box>
                </CFormGroup>
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel>{Constant.arrFieldMasterConDomUnload[2]}</CLabel>
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
                      id="unloadRate-unloadPrice"
                      style={{ height: Constant.styleHeightField }}
                      // step="0.01"
                      // min="0"
                      // onWheel={(e) => e.target.blur()}
                      required
                      onBlur={() =>
                        (document.getElementById(
                          "unloadRate-unloadPrice"
                        ).value = functionController.onBlurChangePrice(
                          document.getElementById("unloadRate-unloadPrice")
                            .value,
                          2,
                          null,
                          null,
                          0
                        ))
                      }
                      onClick={() =>
                        (document.getElementById(
                          "unloadRate-unloadPrice"
                        ).value = functionController.onClickChangePrice(
                          document.getElementById("unloadRate-unloadPrice")
                            .value
                        ))
                      }
                    />
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </Box>
                </CFormGroup>
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel>{Constant.arrFieldMasterConDomUnload[3]}</CLabel>
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
                      id="unloadRate-unitTon"
                      style={{ height: Constant.styleHeightField }}
                      // step="0.001"
                      // min="0"
                      // onWheel={(e) => e.target.blur()}
                      required
                      onBlur={() =>
                        (document.getElementById("unloadRate-unitTon").value =
                          functionController.onBlurChangePrice(
                            document.getElementById("unloadRate-unitTon").value,
                            3,
                            null,
                            null,
                            0
                          ))
                      }
                      onClick={() =>
                        (document.getElementById("unloadRate-unitTon").value =
                          functionController.onClickChangePrice(
                            document.getElementById("unloadRate-unitTon").value
                          ))
                      }
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
                    className="editbutton mb-1"
                    size={Constant.btAddSize}
                    color="success"
                    block
                    onClick={onClickAddUnloadRate}
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
                          !calFuelRateList.length
                            ? Constant.arrFieldMasterConDomOtherTable[0]
                            : ""
                        }
                                ${
                                  !InTruckLicense.length
                                    ? !calFuelRateList.length
                                      ? `, ${Constant.arrFieldMasterConDomOtherTable[4]}`
                                      : Constant
                                          .arrFieldMasterConDomOtherTable[4]
                                    : ""
                                }
                                    ${
                                      !InUnloadRate.length
                                        ? !calFuelRateList.length ||
                                          !InTruckLicense.length
                                          ? `, ${Constant.arrFieldMasterConDomOtherTable[5]}`
                                          : Constant
                                              .arrFieldMasterConDomOtherTable[5]
                                        : ""
                                    }`}
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
      {/* End Warning Input Form Modal */}

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
                        {Constant.txtMasterContactDomestic}
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
}
