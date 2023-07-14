import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../../routes";
import Repository from "../../../../repositories/Repository";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
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
  CCardFooter,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInvalidFeedback,
  CLink,
  CInputFile,
  CSubheader,
  CNavbar,
  CRow,
  CFade,
  CInputRadio,
  CValidFeedback,
  CSelect,
  CButtonToolbar,
  CSpinner,
  CTextarea,
} from "@coreui/react";
// import { DocsLink } from "../../reusable";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CIcon from "@coreui/icons-react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Constant from "../../../../helpers/Constant";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MakeStyleSheet from "../../../../helpers/MakeStyleSheet";
import FunctionController from "../../../../helpers/FunctionController";
import { tr, zhCN } from "date-fns/locale";

const fields = [
  {
    key: "checked",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "extraChargeStatus",
    label: `${Constant.arrFieldTransCreditDebitMainTable[0]}`,
  },
  {
    key: "deliveryDate",
    label: `${Constant.arrFieldTransCreditDebitMainTable[1]}`,
  },
  {
    key: "createDatetime",
    label: `${Constant.arrFieldTransCreditDebitMainTable[2]}`,
  },
  {
    key: "duration",
    label: `${Constant.arrFieldTransCreditDebitMainTable[3]}`,
  },
  {
    key: "extraChargeType",
    label: `${Constant.arrFieldTransCreditDebitMainTable[4]}`,
  },
  {
    key: "extraChargeDocNo",
    label: `${Constant.arrFieldTransCreditDebitMainTable[5]}`,
  },
  {
    key: "extraChargeName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[6]}`,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransCreditDebitMainTable[7]}`,
  },
  {
    key: "transporterName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[8]}`,
  },
  {
    key: "transporterTypeName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[9]}`,
  },
  {
    key: "truckTypeName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[10]}`,
  },
  {
    key: "extraChargeQty",
    label: `${Constant.arrFieldTransCreditDebitMainTable[11]}`,
    digit: 3,
  },
  {
    key: "extraChargePrice",
    label: `${Constant.arrFieldTransCreditDebitMainTable[12]}`,
    digit: 2,
  },
  {
    key: "extraChargeTotalPrice",
    label: `${Constant.arrFieldTransCreditDebitMainTable[13]}`,
    digit: 2,
  },
  {
    key: "requestName1",
    label: `${Constant.arrFieldTransCreditDebitMainTable[14]}`,
  },
  {
    key: "requestValue1",
    label: `${Constant.arrFieldTransCreditDebitMainTable[15]}`,
  },
  {
    key: "requestName2",
    label: `${Constant.arrFieldTransCreditDebitMainTable[16]}`,
  },
  {
    key: "requestValue2",
    label: `${Constant.arrFieldTransCreditDebitMainTable[17]}`,
  },
  {
    key: "requestName3",
    label: `${Constant.arrFieldTransCreditDebitMainTable[18]}`,
  },
  {
    key: "requestValue3",
    label: `${Constant.arrFieldTransCreditDebitMainTable[19]}`,
  },
  {
    key: "requestName4",
    label: `${Constant.arrFieldTransCreditDebitMainTable[20]}`,
  },
  {
    key: "requestValue4",
    label: `${Constant.arrFieldTransCreditDebitMainTable[21]}`,
  },
  {
    key: "fileType",
    label: `${Constant.arrFieldTransCreditDebitMainTable[22]}`,
  },
  {
    key: "rejectReason",
    label: `${Constant.arrFieldTransCreditDebitMainTable[23]}`,
  },
  {
    key: "createName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[24]}`,
  },
  {
    key: "initialName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[25]}`,
  },
  {
    key: "approveName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[26]}`,
  },
  {
    key: "rejectName",
    label: `${Constant.arrFieldTransCreditDebitMainTable[27]}`,
  },
];

const getBadge = (status) => {
  switch (status) {
    case "Pending":
      return "secondary";
    case "Wait For Approve":
      return "info";
    case "Approve":
      return "success";
    case "Reject":
      return "warning";
  }
};

const ApproveCreditDebit = () => {
  const [error, setError] = useState(null);
  const [errorAPI, setErrorAPI] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isConfirmChangeStatus, setIsConfirmChangeStatus] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isShowApproveSuccess, setIsShowApproveSuccess] = useState(false);
  const [isShowRejectSuccess, setIsShowRejectSuccess] = useState(false);

  const [items, setItems] = useState({});
  const [baseItems, setBaseItems] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [transporterTypeList, setTransporterTypeList] = useState([]);
  const [truckTypeList, setTruckTypeList] = useState([]);
  const [extraChargeGroupList, setExtraChargeGroupList] = useState([]);
  const [extraChargeTypeList, setExtraChargeTypeList] = useState([]);
  const [extraChargeNameList, setExtraChargeNameList] = useState([]);
  const [creditDebitStatusList, setCreditDebitStatusList] = useState([]);

  const [changeStatusList, setChangeStatusList] = useState([]);
  const [changeStatusType, setChangeStatusType] = useState(null);

  const [roleUser, setRoleUser] = useState(null);

  const [selectItemsSearch, setSelectItemsSearch] = useState([{}, {}, {}]);

  const [collsFormSearch, setCollsFormSearch] = useState(1);

  // Var for Start&End Date Search Form
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const classes = MakeStyleSheet.useStyles();

  const empCode = "/tnsctpeapcdini";
  const appCode = "/tnsctpeapcdapp";
  const trstCode = "/tnsctrstcdapcdini";

  const _UserId = parseInt(localStorage.getItem("userId"));
  const _Username = localStorage.getItem("username");
  const _TranspoterId = parseInt(localStorage.getItem("transporterId"));
  const [worktype , setWorkType] = useState(['งานจ่าย','งานย้าย']);

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

  const setZeroTwoDigit = (value) => {
    var txtValue = "" + value + "";
    if (value / 10 < 1) {
      txtValue = "0" + value;
    }
    return txtValue;
  };

  const setItemChangeStatus = (item) => (e) => {
    if (e.target.checked) {
      if (changeStatusList.length) {
        var newArr = [...changeStatusList];
        var newObj = { shipmentNo: null, extraChargeDocNo: null };
        newObj.shipmentNo = item.shipmentNo;
        newObj.extraChargeDocNo = item.extraChargeDocNo;
        newArr.push(newObj);
        setChangeStatusList(newArr);
      } else {
        var newObj = { shipmentNo: null, extraChargeDocNo: null };
        newObj.shipmentNo = item.shipmentNo;
        newObj.extraChargeDocNo = item.extraChargeDocNo;
        setChangeStatusList([newObj]);
      }
    } else {
      if (changeStatusList.length) {
        var newArr = [...changeStatusList];
        var result = newArr.find(
          (x) =>
            x.shipmentNo === item.shipmentNo &&
            x.extraChargeDocNo === item.extraChargeDocNo
        );
        if (result) {
          var index = newArr.findIndex(
            (x) =>
              x.shipmentNo === item.shipmentNo &&
              x.extraChargeDocNo === item.extraChargeDocNo
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

  const handleChangeSelectSearch = (type) => (e, values) => {
    var newArr = [...selectItemsSearch];
    if (type === "transporter") {
      if (getHasObjectValue(values)) {
        newArr[0] = values;
      } else {
        newArr[0] = {};
      }
    } else if (type === "trucktype") {
      if (getHasObjectValue(values)) {
        newArr[1] = values;
      } else {
        newArr[1] = {};
      }
    } else if (type === "extracharge") {
      if (getHasObjectValue(values)) {
        newArr[2] = values;
      } else {
        newArr[2] = {};
      }
    }
    setSelectItemsSearch(newArr);
  };

  const onChangeRejectReason = (id) => (e) => {
    var newArr = [...baseItems];
    var index = newArr.findIndex((x) => x.extraChargeDocNo === id);
    newArr[index].rejectReason = e.target.value;
    // console.log(newArr[index]);
    setBaseItems(newArr);
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
          var newObj = { shipmentNo: null, extraChargeDocNo: null };
          newObj.shipmentNo = x.shipmentNo;
          newObj.extraChargeDocNo = x.extraChargeDocNo;
          newArr.push(newObj);
        } else {
          var newObj = { shipmentNo: null, extraChargeDocNo: null };
          newObj.shipmentNo = x.shipmentNo;
          newObj.extraChargeDocNo = x.extraChargeDocNo;
          newArr.push(newObj);
        }
      });
      // console.log(newArr);
      setChangeStatusList(newArr);
    }
  };

  const onClickCheckSearchData = () => {
    if (getIsValidForm("need-validation-search")) {
      setCollsFormSearch(0);
      onClickSearchData();
    } else {
      setBaseItems([]);
    }
  };

  const onClickClearSearchData = () => {
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.getElementById("shipmentno").value = "";
    document.getElementById("extracharge-type").selectedIndex = 0;
    document.getElementById("creditdebitstatus").selectedIndex = 0;
  };

  const onClickSearchData = () => {
    var arrSearch = [...selectItemsSearch];
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;
    var shipmentNo = document.getElementById("shipmentno").value;
    var transporterId = null;
    var transporterTypeId = parseInt(
      document.getElementById("transporter-type").value
    );
    var trucktypeId = null;
    var extraChargeGroupId = parseInt(
      document.getElementById("extracharge-group").value
    );
    var extraChargeType = document.getElementById("extracharge-type").value;
    var extraChargeName = null;
    var creditDebitStatus = document.getElementById("creditdebitstatus").value;
    var isViewData = false;
    var isTransfer = false ;

    // isTransfer = isTransfer === 'งานย้าย' ? true : false ;

    if (shipmentNo === "") {
      shipmentNo = null;
    }
    if (roleUser === empCode || roleUser === appCode) {
      if (getHasObjectValue(arrSearch[0])) {
        transporterId = arrSearch[0].transporterId;
      }
    } else if (roleUser === trstCode) {
      transporterId = _TranspoterId;
    }
    if (getHasObjectValue(arrSearch[1])) {
      trucktypeId = arrSearch[1].truckTypeId;
    }
    if (getHasObjectValue(arrSearch[2])) {
      extraChargeName = arrSearch[2].extraChargeId;
    }
    if (extraChargeType === "") {
      extraChargeType = null;
    }
    if (isNaN(transporterTypeId)) {
      transporterTypeId = null;
    }
    if (isNaN(extraChargeGroupId)) {
      extraChargeGroupId = null;
    }
    if (creditDebitStatus === "") {
      creditDebitStatus = null;
    }

    var newArr = [
      startDate,
      endDate,
      shipmentNo,
      transporterId,
      trucktypeId,
      extraChargeType,
      extraChargeName,
      creditDebitStatus,
      isViewData,
      transporterTypeId,
      extraChargeGroupId,
      isTransfer
    ];

    // console.log(newArr);
    fnGetData(newArr);
  };

  const onClickConfirmChangeStatusList = (type) => {
    setIsConfirmChangeStatus(!isConfirmChangeStatus);
    setChangeStatusType(type);
  };

  const onClickChangeStatusList = () => {
    setIsConfirmChangeStatus(!isConfirmChangeStatus);
    var arrChangeStatus = [...changeStatusList];
    var arrStatus = [];
    if (arrChangeStatus.length) {
      arrChangeStatus.map((x) => {
        var newObj = { shipmentNo: null, extraChargeDocNo: null, remark: null };
        newObj.shipmentNo = x.shipmentNo;
        newObj.extraChargeDocNo = x.extraChargeDocNo;
        var result = baseItems.find(
          (y) => y.extraChargeDocNo == x.extraChargeDocNo
        );
        if (result) {
          if (
            result.rejectReason !== "" &&
            result.rejectReason !== null &&
            result.rejectReason !== undefined
          ) {
            newObj.remark = result.rejectReason;
          }
        }
        arrStatus.push(newObj);
      });
    }
    // console.log(arrStatus);
    if (changeStatusType === "approve") {
      fnApproveExtraChargeStatusList(arrStatus);
    } else if (changeStatusType === "reject") {
      fnRejectExtraChargeStatusList(arrStatus);
    }
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

  const fnGetData = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetDomCreditDebitList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setBaseItems(
            FunctionController.setCurrencyAndEmptyValueInArray(
              fields,
              result.data
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

  const fnGetExtraChargeGroupNameOnlyList = () => {
    if (!extraChargeGroupList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("ExtraChargeGroup").then(
        (result) => {
          if (result.httpCode === "200") {
            setExtraChargeGroupList(result.data);
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

  const fnGetExtraChargeNameOnlyList = () => {
    if (!extraChargeNameList.length) {
      Repository.fetchGetExtraChargeNameOnlyList().then(
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
    }
  };

  const fnGetCreditDebitNameOnlyList = () => {
    if (!creditDebitStatusList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo(
        "CreditDebitStatus"
      ).then(
        (result) => {
          if (result.httpCode === "200") {
            setCreditDebitStatusList(result.data);
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

  const fnApproveExtraChargeStatusList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchApproveCreditDebitStatusList(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          fnSetValueinHistoryLog(arrData);
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

  const fnRejectExtraChargeStatusList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchRejectCreditDebitStatusList(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          fnSetValueinHistoryLog(arrData);
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

  const fnSetValueinHistoryLog = (arrData = []) => {
    var newArr = [...arrData];
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
      newObj.ExtraChargeDocNo = x.extraChargeDocNo;
      if (changeStatusType === "approve") {
        if (roleUser === appCode) {
          newObj.Description = Constant.apiHisLogApproveCreditDebit;
        } else {
          newObj.Description = Constant.apiHisLogInitialCreditDebit;
        }
      } else if (changeStatusType === "reject") {
        newObj.Description = Constant.apiHisLogRejectCreditDebit + x.remark;
      }
      newObj.CreateByName = _Username;
      newObj.CreateBy = _UserId;
      newData.push(newObj);
    });
    setChangeStatusType(null);
    fnInsertHistoryLogList(newData);
  };

  const fnInsertHistoryLogList = (arrData = []) => {
    Repository.fetchInsertHistoryLog(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          if (changeStatusType === "approve") {
            setIsShowApproveSuccess(!isShowApproveSuccess);
          } else if (changeStatusType === "reject") {
            setIsShowRejectSuccess(!isShowRejectSuccess);
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

  // Old Role Data in Database, Please Delete before Deploy Production continute...
  const oldEmpCode = "/tnsctpedomapcdini";
  const oldAppCode = "/tnsctpedomapcdapp";
  const oldTrstCode = "/tnsctrstdomapcdapp";

  // Old Role Data in Database, Please Delete before Deploy Production continute...
  const fnCheckOldUserAuth = () => {
    var strArr = localStorage.getItem("role");
    var arrRole = JSON.parse(strArr);
    var result = arrRole.filter(
      (x) =>
        x.RoleCode === oldEmpCode ||
        x.RoleCode === oldAppCode ||
        x.RoleCode === oldTrstCode
    );
    if (!result.length) {
      return false;
    } else {
      if (result.length > 1) {
        setRoleUser(appCode);
        return true;
      } else {
        var value = arrRole.find(
          (x) =>
            x.RoleCode === oldEmpCode ||
            x.RoleCode === oldAppCode ||
            x.RoleCode === oldTrstCode
        );
        if (value.RoleCode == oldEmpCode) {
          setRoleUser(empCode);
          return true;
        } else if (value.RoleCode == oldAppCode) {
          setRoleUser(appCode);
          return true;
        } else if (value.RoleCode == oldTrstCode) {
          setRoleUser(trstCode);
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const fnCheckUserAuth = () => {
    var strArr = localStorage.getItem("role");
    var arrRole = JSON.parse(strArr);
    var result = arrRole.filter(
      (x) =>
        x.RoleCode === empCode ||
        x.RoleCode === appCode ||
        x.RoleCode === trstCode
    );
    if (!result.length) {
      if (!fnCheckOldUserAuth()) {
        setIsLoaded(true);
        setError(Constant.apiMessageUnAuthenToUsePage);
      } else {
        fnGetStartEndDate();
      }
    } else {
      if (result.length > 1) {
        setRoleUser(appCode);
      } else {
        var value = arrRole.find(
          (x) =>
            x.RoleCode === empCode ||
            x.RoleCode === appCode ||
            x.RoleCode === trstCode
        );
        if (value) {
          setRoleUser(value.RoleCode);
        }
      }
      fnGetStartEndDate();
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

  const mainFormSearch = () => (
    <CForm className="search-header-need-validation">
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
              onClick={() =>
                setCollsFormSearch(collsFormSearch === 1 ? null : 1)
              }
            >
              <CRow className="m-2 p-0">
                <h6 className="m-2 p-0">
                  {Constant.arrTextGroupTransCdDbData[0]}
                </h6>
                {/* {showtext()} */}
              </CRow>
            </CButton>
            <CButton
              color="link"
              onClick={() =>
                setCollsFormSearch(collsFormSearch === 1 ? null : 1)
              }
            >
              <CIcon
                className="collap-icon"
                name={
                  collsFormSearch === 1
                    ? "cil-chevron-bottom"
                    : "cil-chevron-top"
                }
              />
            </CButton>
          </CCardHeader>
          <CCollapse show={collsFormSearch === 1}>
            <CForm className="need-validation-search" noValidate>
              <CRow className="ml-2 mr-2 p-0">
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="date-input">
                      {Constant.arrFieldTransCreditDebitMainSearch[0]}
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
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
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
                    <CLabel htmlFor="date-input">
                      {Constant.arrFieldTransCreditDebitMainSearch[1]}
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
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
            <CRow className="ml-2 mr-2 p-0">
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="date-input">
                    {Constant.arrFieldTransCreditDebitMainSearch[2]}
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
                    <CInput type="text" id="shipmentno" maxLength="20" />
                  </Box>
                </CFormGroup>
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFieldTransCreditDebitMainSearch[3]}
                  </CLabel>
                  {showInputTransporter()}
                </CFormGroup>
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFieldTransCreditDebitMainSearch[4]}
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
                      id="transporter-type"
                      onClick={fnGetTransporterTypeNameOnlyList}
                    >
                      <option selected hidden value="">
                        {Constant.txtformPlaceholderSelected}
                      </option>
                      <option value="">{Constant.txtFormAllSelected}</option>
                      {transporterTypeList.map((x) => (
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
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFieldTransCreditDebitMainSearch[5]}
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
                      id="trucktype"
                      size="small"
                      options={truckTypeList}
                      onChange={handleChangeSelectSearch("trucktype")}
                      getOptionLabel={(option) =>
                        `[${option.truckTypeCode}] ` + option.truckTypeName
                      }
                      renderOption={(option) => {
                        return (
                          <Typography
                            className={classes.autoCompleteRenderOptions}
                          >
                            {`[${option.truckTypeCode}] ` +
                              option.truckTypeName}
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
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFieldTransCreditDebitMainSearch[6]}
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
                      id="extracharge-group"
                      onClick={fnGetExtraChargeGroupNameOnlyList}
                    >
                      <option selected hidden value="">
                        {Constant.txtformPlaceholderSelected}
                      </option>
                      <option value="">{Constant.txtFormAllSelected}</option>
                      {extraChargeGroupList.map((x) => (
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
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFieldTransCreditDebitMainSearch[7]}
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
                      id="extracharge-type"
                      onClick={fnGetExtraChargeTypeNameOnlyList}
                    >
                      <option selected hidden value="">
                        {Constant.txtformPlaceholderSelected}
                      </option>
                      <option value="">{Constant.txtFormAllSelected}</option>
                      {extraChargeTypeList.map((x) => (
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
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFieldTransCreditDebitMainSearch[8]}
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
                      id="trucktype"
                      size="small"
                      options={extraChargeNameList}
                      onChange={handleChangeSelectSearch("extracharge")}
                      getOptionLabel={(option) =>
                        `[${option.extraChargeType}] ` + option.extraChargeName
                      }
                      renderOption={(option) => {
                        return (
                          <Typography
                            className={classes.autoCompleteRenderOptions}
                          >
                            {`[${option.extraChargeType}] ` +
                              option.extraChargeName}
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
                            onClick={fnGetExtraChargeNameOnlyList}
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
              </CCol>
              <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CLabel htmlFor="name">
                    {Constant.arrFieldTransCreditDebitMainSearch[9]}
                  </CLabel>
                  {showInputCreditDebitStatus()}
                  <CInvalidFeedback>
                    {Constant.inValidNullSelected}
                  </CInvalidFeedback>
                </CFormGroup>
              </CCol>
              {/* <CCol xs="12" sm="6" md="3">
                <CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="name">ประเภทงาน</CLabel>
                   
                    <Box
                      className="border-set"
                      component={Grid}
                      item
                      boxShadow={1}
                      xs={{
                        width: " 100%",
                      }}
                    >
                      <CSelect id="search-workType" required>
                        <option value="">{Constant.txtFormAllSelected}</option>
                        {worktype.map((cb) => (
                          <option value={cb}>{cb} </option>
                        ))}
                      </CSelect>
                    </Box>
                  </CFormGroup>
                </CFormGroup>
              </CCol> */}
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
                      size={Constant.btHeaderSize}
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
                      size={Constant.btHeaderSize}
                      block
                      color="danger"
                      onClick={onClickClearSearchData}
                    >
                      {Constant.btClearData}
                    </CButton>
                  </Box>
                </CFormGroup>
              </CCol>
            </CRow>
            <br />
          </CCollapse>
        </CCard>
      </Box>
      <br />
    </CForm>
  );

  const showInputTransporter = () => {
    if (roleUser === empCode || roleUser === appCode) {
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
            id="transporter"
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
                  {...params}
                  onClick={fnGetTransporterNameOnlyList}
                  label={
                    <Typography className={classes.autoCompleteInputLabel}>
                      {Constant.txtformPlaceholderSelected}
                    </Typography>
                  }
                  variant="outlined"
                />
              );
            }}
          />
        </Box>
      );
    } else if (roleUser === trstCode) {
      fnGetTransporterNameOnlyList();
      var result = null;
      if (transporterList.length) {
        result = transporterList.find((x) => x.transporterId === _TranspoterId);
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
            id="transporter"
            value={
              result != null
                ? "[" +
                  result.transporterCode +
                  "] " +
                  result.transporterNameThai
                : ""
            }
          />
        </Box>
      );
    } else {
      return null;
    }
  };

  const showInputCreditDebitStatus = () => {
    fnGetCreditDebitNameOnlyList();
    if (roleUser === empCode || roleUser === trstCode) {
      var result = null;
      if (creditDebitStatusList.length) {
        result = creditDebitStatusList.find((x) => x.valueMember === "Pending");
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
            id="creditdebitstatus"
            value={result != null ? result.displayMember : ""}
          />
        </Box>
      );
    } else if (roleUser === appCode) {
      var result = null;
      if (creditDebitStatusList.length) {
        result = creditDebitStatusList.find(
          (x) => x.valueMember === "Wait For Approve"
        );
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
          <CSelect
            className="form-control"
            id="creditdebitstatus"
            onClick={fnGetCreditDebitNameOnlyList}
          >
            <option
              selected
              hidden
              value={result != null ? result.valueMember : ""}
            >
              {result != null ? result.valueMember : ""}
            </option>
            <option value="">{Constant.txtFormAllSelected}</option>
            {creditDebitStatusList.map((x) => (
              <option value={x.displayMember}>{x.displayMember} </option>
            ))}
          </CSelect>
        </Box>
      );
    } else {
      return null;
    }
  };

  const mainTable = () => {
    return (
      <CCard className="p-2">
        <CRow>
          <CCol>
            <CButton color="secondary" onClick={onClickSetAllChangeStatus}>
              {Constant.btSelectAll}
            </CButton>
          </CCol>
        </CRow>
        <CDataTable
          Toolbar={{}}
          columnFilter
          tableFilter={{
            label: `${Constant.tabletxtSearch}`,
            placeholder: `${Constant.tabletxtPlaceholder}`,
          }}
          itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
          className="CDataTable"
          items={baseItems}
          fields={fields}
          hover
          striped
          bordered
          itemsPerPage={10}
          pagination
          scopedSlots={{
            checked: (item, index) => {
              if (roleUser === appCode) {
                if (item.extraChargeStatus !== "Wait For Approve") {
                  return <td></td>;
                }
              }
              var isChecked = false;
              if (changeStatusList.length) {
                var newObj = changeStatusList.find(
                  (x) =>
                    x.shipmentNo === item.shipmentNo &&
                    x.extraChargeDocNo === item.extraChargeDocNo
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
            },
            extraChargeStatus: (item) => {
              return (
                <h4>
                  <CBadge color={getBadge(item.extraChargeStatus)}>
                    {item.extraChargeStatus}
                  </CBadge>
                </h4>
              );
            },
            deliveryDate: (item, index) => {
              var newDate = new Date(item.deliveryDate);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            createDatetime: (item, index) => {
              var newDate = new Date(item.createDatetime);
              newDate = newDate.toLocaleDateString();
              return <td className="py-2">{newDate}</td>;
            },
            duration: (item, index) => {
              return <td className="py-2">{item.duration + " วัน"}</td>;
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
                        size={Constant.btHeaderSize}
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
                        size={Constant.btHeaderSize}
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
            rejectReason: (item, index) => {
              if (roleUser === appCode) {
                if (item.extraChargeStatus !== "Wait For Approve") {
                  return <td>{item.rejectReason}</td>;
                } else {
                  if (item.rejectReason != null && item.rejectReason != "") {
                    return <td>{item.rejectReason}</td>;
                  } else {
                    return (
                      <td>
                        <CInput
                          type="text"
                          onBlur={onChangeRejectReason(item.extraChargeDocNo)}
                        />
                      </td>
                    );
                  }
                }
              } else {
                if (item.extraChargeStatus != "Pending") {
                  return <td>{item.rejectReason}</td>;
                } else {
                  return (
                    <td>
                      <CInput
                        type="text"
                        onBlur={onChangeRejectReason(item.extraChargeDocNo)}
                      />
                    </td>
                  );
                }
              }
            },
          }}
        />
      </CCard>
    );
  };

  const showTextAprove = () => {
    if (roleUser === trstCode) {
      return Constant.btAccept;
    } else if (roleUser === empCode) {
      return Constant.btInitial;
    } else if (roleUser === appCode) {
      return Constant.btApprove;
    }
  };

  const mainButton = () => (
    <CFormGroup class="d-flex justify-content-end">
      <CCol xs="10" sm="6" md="2">
        <CFormGroup>
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
              color="success"
              onClick={() => onClickConfirmChangeStatusList("approve")}
            >
              <CIcon name="cil-check-circle" /> {showTextAprove()}
            </CButton>
          </Box>
        </CFormGroup>
      </CCol>
      &nbsp;
      <CCol xs="10" sm="6" md="2">
        <CFormGroup>
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
              color="warning"
              onClick={() => onClickConfirmChangeStatusList("reject")}
            >
              <CIcon name="cil-ban" /> {Constant.btReJect}
            </CButton>
          </Box>
        </CFormGroup>
      </CCol>
    </CFormGroup>
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
          {errorAPI
            ? errorAPI.message != null
              ? errorAPI.message
              : errorAPI.messageDescription
            : " "}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setErrorAPI(null)}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Fetch Error Modal */}

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
          <CButton color="success" onClick={() => onClickChangeStatusList()}>
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

      {/* Start Approve Success Modal */}
      <CModal
        show={isShowApproveSuccess}
        onClose={() => {
          setIsShowApproveSuccess(!isShowApproveSuccess);
          onClickSearchData();
        }}
        color="success"
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessApproveData}</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => {
              setIsShowApproveSuccess(!isShowApproveSuccess);
              onClickSearchData();
            }}
          >
            {Constant.btOK}
          </CButton>{" "}
        </CModalFooter>
      </CModal>
      {/* End Approve Success Modal */}

      {/* Start Reject Success Modal */}
      <CModal
        show={isShowRejectSuccess}
        onClose={() => {
          setIsShowRejectSuccess(!isShowRejectSuccess);
          onClickSearchData();
        }}
        color="success"
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessRejectData}</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => {
              setIsShowRejectSuccess(!isShowRejectSuccess);
              onClickSearchData();
            }}
          >
            {Constant.btOK}
          </CButton>{" "}
        </CModalFooter>
      </CModal>
      {/* End Reject Success Modal */}
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
                <CCol>
                  <CCardHeader>
                    <CRow>
                      <CCol xs="6" sm="8" md="10">
                        <h3 className="headtext">
                          {Constant.txtTransactionApprove}
                        </h3>
                      </CCol>
                      <CCol xs="6" sm="4" md="2">
                        {/* {dialogs("show")} */}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    {mainFormSearch()}
                    {mainTable()}
                    {mainButton()}
                    {modalForm()}
                  </CCardBody>
                </CCol>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  }
};

export default ApproveCreditDebit;
