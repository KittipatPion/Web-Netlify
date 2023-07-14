import React, { useState, useEffect } from "react";
import Repository from '../../../repositories/Repository'
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
  CTextarea
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import PropTypes, { func } from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
import Constant from "../../../helpers/Constant";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Typography } from '@material-ui/core';
import MakeStyleSheet from '../../../helpers/MakeStyleSheet';
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
  },
  {
    key: "minRatePrice",
    label: `${Constant.arrFieldMasterConDomUnload[1]}`,
    digit: 2
  },
  {
    key: "unloadPrice",
    label: `${Constant.arrFieldMasterConDomUnload[2]}`,
    digit: 2
  },
  {
    key: "unitTon",
    label: `${Constant.arrFieldMasterConDomUnload[3]}`,
    digit: 3
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
    _style: { fontFamily: 'Scg' },
    digit: 2
  },
  {
    key: "fuelPrice",
    label: `${Constant.arrFieldMasterConDomTransport[4]}`,
    digit: 2
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
    _style: { fontFamily: 'Scg' },
    digit: 2
  },
  {
    key: "fuelPrice",
    label: `${Constant.arrFieldMasterConDomTransport[4]}`,
    digit: 2
  },
];

const FFuelRate = [
  {
    key: "fuelFrom",
    label: `${Constant.arrFieldMasterConDomFuel[0]}`,
    _style: { width: "30%" },
    digit: 2
  },
  {
    key: "fuelTo",
    label: `${Constant.arrFieldMasterConDomFuel[1]}`,
    _style: { width: "30%" },
    digit: 2
  },
  {
    key: "seqRate",
    label: `${Constant.arrFieldMasterConDomFuel[2]}`,
    _style: { width: "40%" },
    digit: 2
  }
];

const FMultiDropRate = [
  {
    key: "distanceFrom",
    label: `${Constant.arrFieldMasterConDomMultiDrop[0]}`,
    digit: 2
  },
  {
    key: "distanceTo",
    label: `${Constant.arrFieldMasterConDomMultiDrop[1]}`,
    digit: 2
  },
  {
    key: "distancePrice",
    label: `${Constant.arrFieldMasterConDomMultiDrop[2]}`,
    digit: 2
  }
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
    digit: 2
  }
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
  },
  {
    key: "packageType",
    label: `${Constant.arrFieldMasterConDomHeader[7]}`,
  },

  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',

  },
  appBar: {
    position: 'relative',
    backgroundColor: '#056776',
  },
  tabRoot: {
    fontFamily: 'Scg',
    fontWeight: 'normal',
    color: 'black ',
    backgroundColor: '#056776'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function EPZ() {
  const [data, setData] = useState([]);
  const [cloneData, setCloneData] = useState({});
  const [editData, setEditData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState([]);

  const [collapsed, setCollapsed] = React.useState(true);

  const [transporterList, setTransporterList] = useState([]);
  const [shiptoList, setShiptoList] = useState([]);

  const [packageType, setPackageType] = useState([]);
  const [contractStatus, setContractStatus] = useState([]);

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

  const [isGetDataOtherTable, setIsGetDataOtherTable] = useState(false);

  const [fullYearList, setFullYearList] = useState([]);

  const [itemSelectSearch, setItemSelectSearch] = useState([{}]);
  const [itemSelectAdd, setItemSelectAdd] = useState([{}]);
  const [itemSelectEdit, setItemSelectEdit] = useState([{}]);
  const [itemSelectOther, setItemSelectOther] = useState([{}]);

  const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState([false]);
  const [invalidMaterialFormEdit, setInvalidMaterialFormEdit] = useState([false]);
  const [invalidMaterialFormOther, setInvalidMaterialFormOther] = useState([false]);

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

  const _UserId = parseInt(localStorage.getItem('userId'));

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
    setIsLoaded(true);
  }

  const getIsValidForm = (formClassName) => {
    var forms = document.querySelectorAll(`.${formClassName}`);
    var isValid = false;
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        if (form.checkValidity()) {
          isValid = true;
        }
        form.classList.add('was-validated');
      });
    return (isValid);
  }

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
  }

  const setCloseFormClone = () => {
    setIsShowExitClone(!isShowExitClone);
    fnClearOtherTableValueList();
    setIsGetDataOtherTable(false);
    setCloneData({});
    setOpenAddForm(false);
  }

  const setNoValidateForm = (formClassName) => {
    var forms = document.querySelectorAll(`.${formClassName}`);
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.classList.remove('was-validated');
      });
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

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

  const handleClickOpen = (type, contractId) => (e) => {
    if (type === "add") {
      setOpenAddForm(true);
    }
    else if (type === "edit") {
      setOpenEditForm(true);
      setIndexEditForm(contractId);
    }
  };

  const handleClose = (type) => (e) => {
    if (!isShowSuccess) {
      if (type === "add") {
        if (Object.keys(cloneData).length) {
          setIsShowExitClone(!isShowExitClone);
        }
        else {
          fnClearOtherTableValueList();
          setIsGetDataOtherTable(false);
          setOpenAddForm(false);
        }
      }
      else if (type === "edit") {
        setOpenEditForm(false);
        setIndexEditForm(null);
        setEditData({});
        setItemSelectEdit([{}, {}, {}]);
      }
    }
  };

  const handleChangeCloneForm = (type) => (e) => {
    var newObj = { ...cloneData };

    if (type === "contractNo") {
      newObj.contractNo = e.target.value;
    }
    else if (type === "refDocNo") {
      newObj.refDocNo = e.target.value;
    }
    else if (type === "startDate") {
      newObj.startDate = e.target.value;
    }
    else if (type === "endDate") {
      newObj.endDate = e.target.value;
    }
    setCloneData(newObj);
  };

  const handleChangeEditForm = (type) => (e) => {
    var newObj = { ...editData };

    if (type === "contractNo") {
      newObj.contractNo = e.target.value;
    }
    else if (type === "refDocNo") {
      newObj.refDocNo = e.target.value;
    }
    else if (type === "startDate") {
      newObj.startDate = e.target.value;
    }
    else if (type === "endDate") {
      newObj.endDate = e.target.value;
    }
    setEditData(newObj);
  };

  const handleChangeSearchSelect = (type) => (e, values) => {
    if (type === "transporter") {
      if (values) {
        var newArr = [...itemSelectSearch];
        newArr[0] = values;
        setItemSelectSearch(newArr);
      }
      else {
        var newArr = [...itemSelectSearch];
        newArr[0] = {};
        setItemSelectSearch(newArr);
      }
    }
  }

  const handleChangeAddSelect = (type) => (e, values) => {
    if (type === "transporter") {
      if (values) {
        var newArr = [...itemSelectAdd];
        newArr[0] = values;
        setItemSelectAdd(newArr);
      }
      else {
        var newArr = [...itemSelectAdd];
        newArr[0] = {};
        setItemSelectAdd(newArr);
      }
    }
  }

  const handleChangeEditSelect = (type) => (e, values) => {
    if (type === "transporter") {
      if (values) {
        var newArr = [...itemSelectEdit];
        newArr[0] = values;
        setItemSelectEdit(newArr);
      }
      else {
        var newArr = [...itemSelectEdit];
        newArr[0] = {};
        setItemSelectEdit(newArr);
      }
    }
  }

  const handleChangeOtherSelect = (type) => (e, values) => {
    if (type === "") {
      if (values) {
        var newArr = [...itemSelectOther];
        newArr[1] = values;
        setItemSelectOther(newArr);
      }
      else {
        var newArr = [...itemSelectOther];
        newArr[1] = {};
        setItemSelectOther(newArr);
      }
    }
  }

  const onClickConfirmRemoveRecord = (type, index) => (e) => {
    var newArr = [type, index];
    setArrForRemoveRecord(newArr);
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
  }

  const onClickCancelRemoveRecord = () => {
    setArrForRemoveRecord([]);
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
  }

  const onClickRemoveRecordAddData = () => {
    setIsConfirmDeleteRecordOT(!isConfirmDeleteRecordOT);
    var arrRemove = [...arrForRemoveRecord];
    if (arrRemove.length) {
      if (arrRemove[0] === "") {
      }
    }
    setArrForRemoveRecord([]);
  }

  const fnClearOtherTableValueList = () => {

  }

  const handleChangeContractDate = () => {
    var contractYear = document.getElementById("search-header-year");
    contractYear.selectedIndex = 0;
    setNoValidateForm("search-header-need-validation");
  }

  const handleChangeContractYear = () => {
    var contractDate = document.getElementById("search-header-date");
    contractDate.value = "";
    setNoValidateForm("search-header-need-validation");
  }

  const onClickSearchData = () => {
    var contractDate = document.getElementById("search-header-date").value;
    var contractYear = parseInt(document.getElementById("search-header-year").value);
    if (contractDate === "" && isNaN(contractYear)) {
      if (!getIsValidForm("search-header-need-validation")) {
        if (Object.keys(data).length) {
          setData([]);
        }
      }
    }
    else if (getIsValidForm("search-header-need-validation")) {
      setNoValidateForm("search-header-need-validation");
      setAccordion(0);

      var arrObj = [...itemSelectSearch];
      var contractNo = document.getElementById("search-header-contractNo").value;
      var transporterId = Object.keys(arrObj[0]).length ? arrObj[0].transporterId : null;
      var packageType = document.getElementById("search-header-packagetypeId").value;
      var refDocNo = document.getElementById("search-header-refDoc").value;
      var contractStatus = document.getElementById("search-header-contractStatus").value;

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
        transporterId,
        packageType,
        refDocNo,
        contractDate,
        contractYear,
        contractStatus
      ];

      // console.log(newArr);
    }
  }



  const onClickClearDataForSearch = () => {
    var contractNo = document.getElementById("search-header-contractNo");
    contractNo.value = "";
    var packageType = document.getElementById("search-header-packagetypeId");
    packageType.selectedIndex = 0;
    var refDocNo = document.getElementById("search-header-refDoc");
    refDocNo.value = "";
    var startDate = document.getElementById("search-header-date");
    startDate.value = "";
    var endDate = document.getElementById("search-header-year");
    endDate.value = "";
    var contractStatus = document.getElementById("search-header-contractStatus");
    contractStatus.selectedIndex = 0;
  }

  const onClickCheckFormAddData = () => {
    var arrObj = [...itemSelectAdd];
    if (getIsValidForm("add-header-need-validation") && Object.keys(arrObj[0]).length) {
      setInvalidMaterialFormAdd([false]);
      setIsConfirmSave(!isConfirmSave);
    }
    else {
      var arrInvalid = [...invalidMaterialFormAdd];
      if (!Object.keys(arrObj[0]).length) {
        arrInvalid[0] = true;
      }
      else {
        arrInvalid[0] = false;
      }
      setInvalidMaterialFormAdd(arrInvalid);
    }
  }

  const onClickCheckFormEditData = () => {
    var arrObj = [...itemSelectEdit];
    if (getIsValidForm("edit-header-need-validation") && Object.keys(arrObj[0]).length) {
      setInvalidMaterialFormAdd([false]);
      setIsConfirmEdit(!isConfirmEdit);
    }
    else {
      var arrInvalid = [...invalidMaterialFormEdit];
      if (!Object.keys(arrObj[0]).length) {
        arrInvalid[0] = true;
      }
      else {
        arrInvalid[0] = false;
      }
      setInvalidMaterialFormEdit(arrInvalid);
    }
  }

  const onClickAddData = () => {
    setIsConfirmSave(!isConfirmSave);
    var arrObj = [...itemSelectAdd];
    var contractNo = document.getElementById("header-contractNo").value;
    var transporterId = arrObj[0].transporterId;
    var packageType = document.getElementById("header-packagetypeId").value;
    var refDocNo = document.getElementById("header-refDoc").value;
    var startDate = document.getElementById("header-dateStart").value;
    var endDate = document.getElementById("header-dateEnd").value;
    var contractStatus = document.getElementById("header-contractStatus").value;
    var createBy = _UserId;

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
      startDate,
      endDate,
      contractStatus,
      createBy
    ];

    // console.log(newArrHeader);
    fnInsertData(newArrHeader);
  }

  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var arrObj = [...itemSelectEdit];
    var transporterId = arrObj[0].transporterId;
    var packageType = document.getElementById("edit-header-packagetype").value;
    var contractStatus = document.getElementById("edit-header-contractstatus").value;

    var newObj = { ...editData };
    newObj.transporterId = transporterId;
    newObj.packageType = packageType;
    newObj.contractStatus = contractStatus;
    newObj.updateBy = _UserId;

    // console.log(newObj);
    fnUpdateData(newObj);
  }

  const onClickDeleteData = () => {
    setIsConfirmDelete(!isConfirmDelete);
    // console.log(indexEditForm);
    fnDeleteData(indexEditForm);
  }

  const onClickThenShowSuccesss = () => {
    setIsShowSuccess(!isShowSuccess);
    setTypeShowSuccess("");
    window.location.reload(false);
  }

  const fnInsertData = (arrHeaderData) => {
    setIsPostingData(true);
    Repository.fetchAddContractDomesticList(
      arrHeaderData
    )
      .then(
        (result) => {
          setIsPostingData(false);
          if (result.httpCode === "200") {
            setTypeShowSuccess("Add");
            setIsShowSuccess(!isShowSuccess);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setIsPostingData(false);
          setErrorAPI(error);
        }
      )
  }

  const fnUpdateData = (objData) => {
    setIsPostingData(true);
    Repository.fetchEditContractDomesticList(objData)
      .then(
        (result) => {
          setIsPostingData(false);
          if (result.httpCode === "200") {
            setTypeShowSuccess("Edit");
            setIsShowSuccess(!isShowSuccess);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setIsPostingData(false);
          setErrorAPI(error);
        }
      )
  }

  const fnDeleteData = (index) => {
    setIsPostingData(true);
    Repository.fetchRemoveContractDomesticList(index)
      .then(
        (result) => {
          setIsPostingData(false);
          if (result.httpCode === "200") {
            setTypeShowSuccess("Delete");
            setIsShowSuccess(!isShowSuccess);
          } else {
            setErrorAPI(result);
          }
        },
        (error) => {
          setIsPostingData(false);
          setErrorAPI(error);
        }
      )
  }

  const fnGetTranspoterList = () => {
    if (!transporterList.length) {
      Repository.fetchGetTransporterNameOnlyList()
        .then(
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
        )
    }
  }

  const fnGetPackageTypeList = () => {
    if (!packageType.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("PackageType")
        .then(
          (result) => {
            if (result.httpCode === "200") {
              setPackageType(result.data);
            } else {
              setErrorAPI(result);
            }
          },
          (error) => {
            setErrorAPI(error);
          }
        )
    }
  }

  const fnGetContractStatusList = () => {
    if (!contractStatus.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("ContractStatus")
        .then(
          (result) => {
            if (result.httpCode === "200") {
              setContractStatus(result.data);
            } else {
              setErrorAPI(result);
            }
          },
          (error) => {
            setErrorAPI(error);
          }
        )
    }
  }

  const fnCheckUserAuth = () => {
    var result = functionController.getUserAuthenOneRole(pageCode);
    if (result.isAuth) {
      initeState();
    }
    else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  const initeState = () => {
    getFullYearForSearch();
  }

  useEffect(() => {
    if (VariableController.linkContractId !== null &&
      VariableController.linkShipmentNo !== null &&
      VariableController.linkDeliveryNo !== null) {
      var newObj = {
        "shipmentNo": VariableController.linkShipmentNo,
        "deliveryNo": VariableController.linkDeliveryNo,
        "contractId": VariableController.linkContractId,
        "arrContractData": VariableController.linkArrContractData
      }
      setLinkData(newObj);
      setIsLinkData(true);
      setIsLoaded(true);
      setOpenEditForm(true);
      setIndexEditForm(VariableController.linkContractId);
    }
    else {
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
            placeholder: `${Constant.tabletxtPlaceholder}`
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
              return (
                <td className="py-2">
                  {newDate}
                </td>
              );
            },
            endDate: (item) => {
              var newDate = new Date(item.endDate);
              newDate = newDate.toLocaleDateString();
              return (
                <td className="py-2">
                  {newDate}
                </td>
              );
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
    )
  }

  const otherTables = (type, item) => {
    if (type === "add" && Object.keys(cloneData).length !== 0) {

    }
    else if (type === "edit") {

    }
    return (
      <List>
        <div className={_classes.root}>
          <AppBar position="center" color="default">
            <Tabs
              className={_classes.tabRoot}
              value={value}
              variant="fullWidth"
              centered
            >
              <Tab style={{ outline: 'none' }} label={Constant.arrFieldMasterConDomOtherTable[3]} {...a11yProps(0)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {type === "add" ? formCustomerShipTo() :
                type === "edit" ? formCustomerShipTo() : null}
            </TabPanel>
          </SwipeableViews>
        </div>
      </List>
    )
  }

  const formCustomerShipTo = () => {
    return (
      null
    )
  }

  const mainFormSearch = () => (
    <CForm className="search-header-need-validation ">
      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
        width: ' 100%'
      }}>
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
              <CIcon className="collap-icon" name={accordion === 1 ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
            </CButton>
          </CCardHeader>
          <CCollapse show={accordion === 1}>
            <CCardBody >
              <CCardBody>
                <CRow>
                  <CCol sm="12" md="12" lg="4">
                    <CForm className="search-header-need-validation">
                      <CRow>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">{Constant.arrFieldConDomSearchDateYear[0]}</CLabel>
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                              width: ' 100%'
                            }}>
                              <CInput
                                size="xs"
                                type="date"
                                style={{ height: Constant.styleHeightField }}
                                id="search-header-date"
                                name="date-input"
                                placeholder="date"
                                onChange={handleChangeContractDate}
                                required
                              />
                            </Box>
                            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="6">
                          <CFormGroup>
                            <CLabel htmlFor="cvv">{Constant.arrFieldConDomSearchDateYear[1]}</CLabel>
                            {/* <CInput size="xs" type="date" style={{ height: Constant.styleHeightField }} id="search-header-year" name="date-input" placeholder="date" required /> */}
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                              width: ' 100%'
                            }}>
                              <CSelect className="form-control"
                                id="search-header-year"
                                style={{ height: Constant.styleHeightField }}
                                onChange={handleChangeContractYear}
                                required
                              >
                                <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                {fullYearList.map((x) => (<option value={x}>{x}</option>))}
                              </CSelect>
                            </Box>
                            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="4">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[2]}</CLabel>
                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                          width: ' 100%'
                        }}>
                          <Autocomplete
                            id="search-header-transporterId"
                            options={transporterList}
                            size="small"
                            getOptionLabel={(option) => ("[" + option.transporterCode + "] " + option.transporterNameThai)}
                            // style={{ width: 300 }}   
                            onChange={handleChangeSearchSelect("transporter")}
                            renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{"[" + option.transporterCode + "] " + option.transporterNameThai}</Typography>)}
                            renderInput={(params) => {
                              params.inputProps.className = classes.autoCompleteInputLabel;
                              return (
                                <TextField
                                  size="small"
                                  // style={{ height: Constant.styleHeightField }}
                                  {...params}
                                  label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                  variant="outlined"
                                  onClick={fnGetTranspoterList}
                                />
                              )
                            }
                            }
                          />
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[7]}</CLabel>
                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                          width: ' 100%'
                        }}>
                          <CSelect className="form-control"
                            id="search-header-packagetypeId"
                            style={{ height: Constant.styleHeightField }}
                            onClick={fnGetPackageTypeList}
                          >
                            <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                            <option value="">{Constant.txtFormAllSelected}</option>
                            {packageType.map((cb) => <option value={cb.valueMember} >{cb.displayMember}  </option>)}
                          </CSelect>
                        </Box>
                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" sm="6" md="6" lg="3">
                    <CFormGroup>
                      <CLabel htmlFor="ccmonth">{Constant.arrFieldMasterConDomHeader[10]}</CLabel>
                      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                      }}>
                        <CInput
                          type="text"
                          id="search-header-refDoc"
                          maxLength="50"
                          style={{ height: Constant.styleHeightField }}
                          placeholder="" />
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[14]}</CLabel>
                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                          width: ' 100%'
                        }}>
                          <CSelect className="form-control"
                            id="search-header-contractStatus"
                            style={{ height: Constant.styleHeightField }}
                            onClick={fnGetContractStatusList}
                          >
                            <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                            <option value="">{Constant.txtFormAllSelected}</option>
                            {contractStatus.map((cb) => <option value={cb.valueMember} >{cb.displayMember}  </option>)}
                          </CSelect>
                        </Box>
                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="6" lg="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[0]}</CLabel>
                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                          width: ' 100%'
                        }}>
                          <CInput
                            type="text"
                            id="search-header-contractNo"
                            maxLength="50"
                            style={{ height: Constant.styleHeightField }}
                            placeholder="" />
                        </Box>
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="row justify-content-center">
                  <CCol xs="10" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <br />
                      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                      }}>
                        <CButton size="md" block color="warning" onClick={onClickSearchData}>
                          {Constant.btSearchData}
                        </CButton>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="10" sm="6" md="6" lg="2">
                    <CFormGroup>
                      <br />
                      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                      }}>
                        <CButton size="md" block color="danger" onClick={onClickClearDataForSearch}>
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
  )



  const dialogs = () => {
    return (
      <h6>
        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
          width: ' 100%'
        }}>
          <CButton size={Constant.btHeaderSize} block className='btn-mainsmp' onClick={handleClickOpen("add")}>
            {Constant.btCreateOrder}
          </CButton>
        </Box>

        <Dialog fullScreen open={openAddForm} onClose={handleClose("add")} TransitionComponent={Transition}>
          <AppBar className={_classes.appBar} >
            <Toolbar >
              <IconButton edge="start" color="default" onClick={handleClose("add")} aria-label="close">
              </IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>
                  {Constant.txtDialogMasterConDom}
                </h3>
              </Typography>
              <CButton className="btt-close" onClick={handleClose("add")}>
                <h5>
                  {Constant.txtDialogFormClose}
                </h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>
            {collapseHeader("add")}
            {otherTables("add")}
            {modalForDialog()}
          </List>
        </Dialog>

        <Dialog fullScreen open={openEditForm} onClose={handleClose("edit")} TransitionComponent={Transition}>
          <AppBar className={_classes.appBar} >
            <Toolbar >
              <IconButton edge="start" color="default" onClick={handleClose("edit")} aria-label="close">
              </IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>
                  {Constant.txtDialogMasterConDom}
                </h3>
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
    )
  }

  const formButtomCloseDialogEdit = () => {
    if (!isLinkData) {
      return (
        <CButton className="btt-close" onClick={handleClose("edit")}>
          <h5>
            {Constant.txtDialogFormClose}
          </h5>
        </CButton>
      )
    }
    else {
      return (
        <CButton className="btt-close" onClick={onClickPreviousPage}>
          <h5>
            {Constant.txtDialogFormClose}
          </h5>
        </CButton>
      )
    }
  }

  const onClickPreviousPage = () => {
    var newObj = { ...linkData };
    VariableController.linkShipmentNo = newObj.shipmentNo;
    VariableController.linkDeliveryNo = newObj.deliveryNo;
    VariableController.linkArrContractData = newObj.arrContractData;
    history.goBack();
  }

  const collapseHeader = (type) => {
    if (isLoadingData) {
      return (
        <CRow>
          <CCol>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br /><br />
            {showLoadingData()}
          </CCol>
        </CRow>
      )
    }
    else {
      if (type === "add") {
        var isClone = Object.keys(cloneData).length !== 0;
        if (isClone) {
          var newObj = { ...cloneData };
          var _transporterList = transporterList.find((x) => x.transporterId === newObj.transporterId);
          var transporterValue = "[" + _transporterList.transporterCode + "] " + _transporterList.transporterNameThai;
          var packageTypeValue = newObj.packageType;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue = newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue = newObj.endDate !== null ? new Date(newObj.endDate) : null;
          var _contractStatus = newObj.contractStatus;
          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);

          if (!Object.keys(itemSelectAdd[0]).length) {
            setItemSelectAdd([_transporterList]);
          }
        }
        if (!isClone || (isClone && isGetDataOtherTable)) {
          return (
            <CForm className="add-header-need-validation">
              <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                width: ' 100%'
              }}>
                <CCard>
                  <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                    width: ' 100%'
                  }}>
                    <CCardHeader className="headtext">
                      {Constant.txtFormHeaderNewCreate}
                      <div className="card-header-actions">
                        <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                          <CIcon style={{ color: 'blue' }} name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                        </CLink>
                      </div>
                    </CCardHeader>
                  </Box>
                  <CCollapse show={collapsed}>
                    <CCardBody className="headtext">
                      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                      }}>
                        <CCard>
                          <CRow className='ml-2 mr-2 mt-1'>
                            <CCol xs="12" sm="6" md="2">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">{Constant.arrFieldMasterConDomHeader[12]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                  width: ' 100%'
                                }}>
                                  <CInput
                                    size="xs"
                                    type="date"
                                    style={{ height: Constant.styleHeightField }}
                                    id="header-dateStart"
                                    name="date-input"
                                    value={isClone ? startDateValue : null}
                                    placeholder="date"
                                    onChange={isClone ? handleChangeCloneForm("startDate") : null}
                                    required />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="2">
                              <CFormGroup>
                                <CLabel htmlFor="cvv">{Constant.arrFieldMasterConDomHeader[13]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                  width: ' 100%'
                                }}>
                                  <CInput
                                    size="xs"
                                    type="date"
                                    style={{ height: Constant.styleHeightField }}
                                    id="header-dateEnd"
                                    name="date-input"
                                    value={isClone ? endDateValue : null}
                                    placeholder="date"
                                    onChange={isClone ? handleChangeCloneForm("endDate") : null}
                                    required />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="4">
                              <CFormGroup>
                                <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[2]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                  width: ' 100%'
                                }}>
                                  <Autocomplete
                                    id="header-transporterId"
                                    options={transporterList}
                                    size="small"
                                    getOptionLabel={(option) => ("[" + option.transporterCode + "] " + option.transporterNameThai)}
                                    // style={{ width: 300 }}   
                                    defaultValue={isClone ? _transporterList : null}
                                    onChange={handleChangeAddSelect("transporter")}
                                    renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{"[" + option.transporterCode + "] " + option.transporterNameThai}</Typography>)}
                                    renderInput={(params) => {
                                      params.inputProps.className = classes.autoCompleteInputLabel;
                                      return (
                                        <TextField
                                          size="small"
                                          // style={{ height: Constant.styleHeightField }}
                                          error={invalidMaterialFormAdd[0]}
                                          {...params}
                                          label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                          helperText={invalidMaterialFormAdd[0] ? <Typography className={classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                          variant="outlined"
                                          onClick={fnGetTranspoterList}
                                        />
                                      )
                                    }}
                                  />
                                </Box>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="2">
                              <CFormGroup>
                                <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[7]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                  width: ' 100%'
                                }}>
                                  <CSelect className="form-control"
                                    id="header-packagetypeId"
                                    style={{ height: Constant.styleHeightField }}
                                    required
                                    onClick={fnGetPackageTypeList}
                                  >
                                    <option selected hidden value={isClone ? packageTypeValue : ""}>{isClone ? packageTypeValue : Constant.txtformPlaceholderSelected}</option>
                                    {packageType.map((cb) => <option value={cb.valueMember} >{cb.displayMember}  </option>)}
                                  </CSelect>
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCard>
                      </Box>
                      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                      }}>
                        <CCard>
                          <CRow className='ml-2 mr-2 mt-1'>
                            <CCol xs="12" sm="6" md="3">
                              <CFormGroup>
                                <CLabel htmlFor="ccmonth">{Constant.arrFieldMasterConDomHeader[10]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                  width: ' 100%'
                                }}>
                                  <CInput
                                    type="text"
                                    id="header-refDoc"
                                    maxLength="50"
                                    style={{ height: Constant.styleHeightField }}
                                    value={isClone ? refDocNoValue : null}
                                    onChange={isClone ? handleChangeCloneForm("refDocNo") : null}
                                  />

                                </Box>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="3">
                              <CFormGroup>
                                <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[14]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                  width: ' 100%'
                                }}>
                                  <CSelect className="form-control"
                                    id="header-contractStatus"
                                    style={{ height: Constant.styleHeightField }}
                                    required
                                    onClick={fnGetContractStatusList}
                                  >
                                    <option selected hidden value={isClone ? _contractStatus : ""}>{isClone ? _contractStatus : Constant.txtformPlaceholderSelected}</option>
                                    {contractStatus.map((cb) => <option value={cb.valueMember} >{cb.displayMember}  </option>)}
                                  </CSelect>
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="3">
                              <CFormGroup>
                                <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[0]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                  width: ' 100%'
                                }}>
                                  <CInput
                                    type="text"
                                    id="header-contractNo"
                                    maxLength="50"
                                    style={{ height: Constant.styleHeightField }}
                                    required />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCard>
                      </Box>
                      <CRow className="row justify-content-center">
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <br />
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                              width: ' 100%'
                            }}>
                              <CButton size={Constant.btAddSize} block color="success" onClick={onClickCheckFormAddData}>
                                {Constant.btSave}
                              </CButton>
                            </Box>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="2">
                          <CFormGroup>
                            <br />
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                              width: ' 100%'
                            }}>
                              <CButton size={Constant.btAddSize} block color="danger" onClick={isClone ? () => setIsShowExitClone(!isShowExitClone) : handleClose("add")}>
                                {Constant.btCancel}
                              </CButton>
                            </Box>
                          </CFormGroup>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCollapse >
                </CCard>
              </Box>
            </CForm >
          )
        }
      }
      else if (type === "edit") {
        if (Object.keys(editData).length) {
          var newObj = { ...editData };
          var contractNoValue = newObj.contractNo;
          var _transporterList = transporterList.find((x) => x.transporterId === newObj.transporterId);
          var transporterValue = "[" + _transporterList.transporterCode + "] " + _transporterList.transporterNameThai;
          var packageTypeValue = newObj.packageType;
          var refDocNoValue = newObj.refDocNo !== null ? newObj.refDocNo : null;
          var startDateValue = newObj.startDate !== null ? new Date(newObj.startDate) : null;
          var endDateValue = newObj.endDate !== null ? new Date(newObj.endDate) : null;
          var _contractStatus = newObj.contractStatus;
          startDateValue = formatDate(startDateValue);
          endDateValue = formatDate(endDateValue);

          if (!Object.keys(itemSelectEdit[0]).length) {
            setItemSelectEdit([_transporterList]);
          }

          return (
            <CCard>
              <CForm className="edit-header-need-validation">
                <CCardHeader className="headtext">
                  {Constant.txtFormHeaderEditData}
                  <div className="card-header-actions">
                    <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                      <CIcon style={{ color: 'blue' }} name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed}>
                  <CCardBody className="headtext">
                    <CRow>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CLabel htmlFor="cvv">{Constant.arrFieldMasterConDomHeader[12]}</CLabel>
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
                          <CLabel htmlFor="cvv">{Constant.arrFieldMasterConDomHeader[13]}</CLabel>
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
                            <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[2]}</CLabel>
                            <Autocomplete
                              id="edit-header-transporter"
                              options={transporterList}
                              size="small"
                              defaultValue={transporterList.find((x) => x.transporterId === newObj.transporterId)}
                              getOptionLabel={(option) => ("[" + option.transporterCode + "] " + option.transporterNameThai)}
                              // style={{ width: 300 }}   
                              onChange={handleChangeEditSelect("transporter")}
                              renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{"[" + option.transporterCode + "] " + option.transporterNameThai}</Typography>)}
                              renderInput={(params) => {
                                params.inputProps.className = classes.autoCompleteInputLabel;
                                return (
                                  <TextField
                                    size="small"
                                    style={{ height: Constant.styleHeightField }}
                                    error={invalidMaterialFormEdit[0]}
                                    {...params}
                                    label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                    helperText={invalidMaterialFormEdit[0] ? <Typography className={classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                    variant="outlined"
                                    onClick={fnGetTranspoterList}
                                  />
                                )
                              }}
                              disabled={isLinkData}
                            />
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="2">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[7]}</CLabel>
                            <CSelect className="form-control"
                              id="edit-header-packagetype"
                              style={{ height: Constant.styleHeightField }}
                              required
                              disabled={isLinkData}
                              onClick={fnGetPackageTypeList}
                            >
                              <option selected hidden value={newObj.packageType}>{packageTypeValue}</option>
                              {packageType.map((cb) => <option value={cb.valueMember} >{cb.displayMember}  </option>)}
                            </CSelect>
                            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <div className="dropdown-divider" />
                    <CRow>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CLabel htmlFor="ccmonth">{Constant.arrFieldMasterConDomHeader[10]}</CLabel>
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
                            <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[14]}</CLabel>
                            <CSelect className="form-control"
                              id="edit-header-contractstatus"
                              style={{ height: Constant.styleHeightField }}
                              required
                              disabled={isLinkData}
                              onClick={fnGetContractStatusList}
                            >
                              <option selected hidden value={_contractStatus}>{_contractStatus}</option>
                              {contractStatus.map((cb) => <option value={cb.valueMember} >{cb.displayMember}  </option>)}
                            </CSelect>
                            <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                      <CCol xs="12" sm="6" md="3">
                        <CFormGroup>
                          <CFormGroup>
                            <CLabel htmlFor="name">{Constant.arrFieldMasterConDomHeader[0]}</CLabel>
                            <CInput
                              type="text"
                              maxLength="50"
                              value={contractNoValue}
                              style={{ height: Constant.styleHeightField }}
                              onChange={handleChangeEditForm("contractNo")} required
                              disabled={isLinkData}
                            />
                            <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                          </CFormGroup>
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <div className="dropdown-divider" />
                    {formButtonManageEdit()}
                  </CCardBody>
                </CCollapse>
              </CForm>
            </CCard>
          )
        }
      }
    }
  }

  const formButtonManageEdit = () => {
    if (!isLinkData) {
      return (
        <div>
          <div className="dropdown-divider" />
          <CRow className="row justify-content-center">
            <CCol xs="10" sm="6" md="2">
              <CFormGroup>
                <br />
                <CButton size={Constant.btAddSize} block color="primary" onClick={() => setIsShowCloned(!isShowCloned)}>
                  {Constant.btCloneData}
                </CButton>
              </CFormGroup>
            </CCol>
            <CCol md="3" />
            <CCol xs="10" sm="6" md="2">
              <CFormGroup>
                <br />
                <CButton size={Constant.btAddSize} block color="success" onClick={onClickCheckFormEditData}>
                  {Constant.btSave}
                </CButton>
              </CFormGroup>
            </CCol>
            <CCol md="3" />
            <CCol xs="10" sm="6" md="2">
              <CFormGroup>
                <br />
                <CButton size={Constant.btAddSize} block color="danger" onClick={() => setIsConfirmDelete(!isConfirmDelete)}>
                  {Constant.btDeleteData}
                </CButton>
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
      )
    }
  }

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>
        {Constant.apiLoadingData}
      </CLabel>
      {" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  )

  const modalForForm = () => (
    <div>
      {/* Start Fetch Loading Modal */}
      <CModal
        size="sm"
        show={isPostingData}
        centered
        closeOnBackdrop={false}
      >
        <CModalBody>
          {showLoadingData()}
        </CModalBody>
      </CModal>
      {/* End Fetch Loading Modal */}

      {/* Start Fetch Error Modal */}
      <CModal
        show={errorAPI}
        color="danger"
        closeOnBackdrop={false}
      >
        <CModalHeader>
          <h5>
            <CLabel>
              {Constant.apiTopicFetchError}
            </CLabel>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CLabel>
            {errorAPI ? errorAPI.message != null ? errorAPI.message : errorAPI.messageDescription : " "}
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
  )

  const modalForDialog = () => (
    <div>
      {/* Start Fetch Loading Modal */}
      <CModal
        size="sm"
        show={isPostingData}
        centered
        closeOnBackdrop={false}
      >
        <CModalBody>
          {showLoadingData()}
        </CModalBody>
      </CModal>
      {/* End Fetch Loading Modal */}

      {/* Start Fetch Error Modal */}
      <CModal
        show={errorAPI}
        color="danger"
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader>
          <h5>
            <CLabel>
              {Constant.apiTopicFetchError}
            </CLabel>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CLabel>
            {errorAPI ? errorAPI.message != null ? errorAPI.message : errorAPI.messageDescription : " "}
          </CLabel>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setErrorAPI(null)}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Fetch Error Modal */}

      {/* Start Confirm Cloned Form Modal */}
      <CModal
        show={isShowCloned}
        onClose={() => setIsShowCloned(!isShowCloned)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5><CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle></h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentConfirmCloneData}
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={setShowFormClone}>
            {Constant.btOK}
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setIsShowCloned(!isShowCloned)}>
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
            <CLabel>
              {Constant.titleConfirmChangeData}
            </CLabel>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CLabel>
            {typeShowSuccess === "Add" ? Constant.contentSuccessSaveData :
              typeShowSuccess === "Edit" ? Constant.contentSuccessEditData :
                typeShowSuccess === "Delete" ? Constant.contentSuccessDeleteData :
                  null}
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
          <h5><CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle></h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentSuccessCloneData}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsShowCloneSuccess(!isShowCloneSuccess)}>
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
          <h5><CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle></h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentConfirmExitForm}
          <br />
          ***{Constant.contentWarningForClone}***
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={setCloseFormClone}>
            {Constant.btOK}
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setIsShowExitClone(!isShowExitClone)}>
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
          <h5><CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle></h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentConfirmAddData}
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickAddData}>
            {Constant.btOK}
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setIsConfirmSave(!isConfirmSave)}>
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
          <h5><CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle></h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentConfirmEditData}
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickEditData}>
            {Constant.btOK}
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setIsConfirmEdit(!isConfirmEdit)}>
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
        <CModalBody>
          {Constant.contentConfirmDeleteData}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={onClickDeleteData}>
            {Constant.btOK}
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setIsConfirmDelete(!isConfirmDelete)}>
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
        <CModalBody>
          {Constant.contentConfirmDeleteData}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={onClickRemoveRecordAddData}>
            {Constant.btOK}
          </CButton>{' '}
          <CButton color="secondary" onClick={onClickCancelRemoveRecord}>
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Delete Modal Record Other Table */}
    </div>
  )

  if (error) {
    return (
      <CCol className="text-center">
        {Constant.apiTopicFetchError} : {error.message}
      </CCol>
    );
  } else if (!isLoaded) {
    return (
      showLoadingData()
    );
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
                      <h3 className="headertable">{Constant.txtMasterContactEPZ}</h3>
                    </CCol>
                    <CCol xs="6" sm="4" md="2" >
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
