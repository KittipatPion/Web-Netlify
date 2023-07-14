import { is } from "date-fns/locale";
import max from "date-fns/max";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
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
import CoverSheet from "../components/other/CoverSheet";

class FunctionController {
  setEmptyValueInArray(array = []) {
    var newArr = [];
    array.map((a) => {
      var newObj = {};
      var arrObj = [];
      for (const [key, value] of Object.entries(a)) {
        if (value === null) {
          arrObj.push([key, ""]);
        } else {
          arrObj.push([key, value]);
        }
      }
      newObj = Object.fromEntries(arrObj);
      newArr.push(newObj);
    });
    return newArr;
  }

  setNullValueInArray(array = []) {
    var newArr = [];
    array.map((a) => {
      var newObj = {};
      var arrObj = [];
      for (const [key, value] of Object.entries(a)) {
        if (value === "") {
          arrObj.push([key, null]);
        } else {
          arrObj.push([key, value]);
        }
      }
      newObj = Object.fromEntries(arrObj);
      newArr.push(newObj);
    });
    return newArr;
  }

  setIsCheckedObjectInArray(array = []) {
    var newArr = [];
    array.map((a) => {
      var newObj = {};
      var arrObj = [];
      arrObj.push(["isChecked", false]);
      for (const [key, value] of Object.entries(a)) {
        if (value === null) {
          arrObj.push([key, ""]);
        } else {
          arrObj.push([key, value]);
        }
      }
      newObj = Object.fromEntries(arrObj);
      newArr.push(newObj);
    });
    return newArr;
  }

  setCurrencyValueInArray(baseField = [], baseData = []) {
    var newArr = [];
    baseData.map((a) => {
      var newObj = {};
      var arrObj = [];
      for (const [key, value] of Object.entries(a)) {
        var isPush = false;
        baseField.map((x) => {
          if (x.digit !== undefined && x.digit !== null && x.digit !== false) {
            if (x.key === key) {
              var newValue = value;
              if (typeof value !== "number") {
                if (x.digit > 0) {
                  newValue = setNumberValue(value);
                } else {
                  newValue = setNumberValue(value);
                }
              }
              if (!isNaN(newValue)) {
                isPush = true;
                arrObj.push([key, setNumberCurrency(newValue, x.digit)]);
              }
            }
          }
          // Condition check to set "," in value, If confirm formated then remove this condition...
          else if (x.digit === false) {
            if (x.key === key) {
              var newValue = value;
              if (typeof value !== "number") {
                newValue = setNumberValue(value);
              }
              if (!isNaN(newValue)) {
                isPush = true;
                arrObj.push([key, setCurrencyNoDigit(newValue)]);
              }
            }
          }
        });
        if (!isPush) {
          arrObj.push([key, value]);
        }
      }
      newObj = Object.fromEntries(arrObj);
      newArr.push(newObj);
    });
    return newArr;
  }

  setCurrencyAndEmptyValueInArray(baseField = [], baseData = []) {
    var newArr = [];
    baseData.map((a) => {
      var newObj = {};
      var arrObj = [];
      for (const [key, value] of Object.entries(a)) {
        if (value === null) {
          arrObj.push([key, ""]);
        } else {
          var isPush = false;
          baseField.map((x) => {
            if (
              x.digit !== undefined &&
              x.digit !== null &&
              x.digit !== false
            ) {
              if (x.key === key) {
                var newValue = value;
                if (typeof value !== "number") {
                  if (x.digit > 0) {
                    newValue = setNumberValue(value);
                  } else {
                    newValue = setNumberValue(value);
                  }
                }
                if (!isNaN(newValue)) {
                  isPush = true;
                  arrObj.push([key, setNumberCurrency(newValue, x.digit)]);
                }
              }
            }
            // Condition check to set "," in value, If confirm formated then remove this condition...
            else if (x.digit === false) {
              if (x.key === key) {
                var newValue = value;
                if (typeof value !== "number") {
                  newValue = setNumberValue(value);
                }
                if (!isNaN(newValue)) {
                  isPush = true;
                  arrObj.push([key, setCurrencyNoDigit(newValue)]);
                }
              }
            }
          });
          if (!isPush) {
            arrObj.push([key, value]);
          }
        }
      }
      newObj = Object.fromEntries(arrObj);
      newArr.push(newObj);
    });
    return newArr;
  }

  setNumberValueInArray(baseField = [], baseData = []) {
    var newArr = [];
    baseData.map((a) => {
      var newObj = {};
      var arrObj = [];
      for (const [key, value] of Object.entries(a)) {
        var isPush = false;
        baseField.map((x) => {
          if (x.digit !== undefined && x.digit !== null) {
            if (x.key === key) {
              isPush = true;
              arrObj.push([key, setNumberValue(value)]);
            }
          }
        });
        if (!isPush) {
          arrObj.push([key, value]);
        }
      }
      newObj = Object.fromEntries(arrObj);
      newArr.push(newObj);
    });
    return newArr;
  }

  onBlurChangePrice(
    value,
    digit,
    obj = null,
    index = null,
    min = null,
    max = null
  ) {
    if (Array.isArray(value)) {
      var newArr = [...value];
      if (obj !== null && obj !== undefined && obj !== "") {
        var newObj = { ...newArr[index] };
        var arrObj = [];
        for (const [key, value] of Object.entries(newObj)) {
          if (key === obj) {
            value = setMaxValue(value, max);
            value = setMinValue(value, min);
            value = setCurrencyValue(value, digit);
          }
          arrObj.push([key, value]);
        }
        newObj = Object.fromEntries(arrObj);
        newArr[index] = newObj;
      } else {
        newArr[index] = setMaxValue(newArr[index], max);
        newArr[index] = setMinValue(newArr[index], min);
        newArr[index] = setCurrencyValue(newArr[index], digit);
      }
      return newArr;
    } else if (typeof value === "object") {
      var newObj = { ...value };
      var arrObj = [];
      for (const [key, value] of Object.entries(newObj)) {
        if (key === obj) {
          value = setMaxValue(value, max);
          value = setMinValue(value, min);
          value = setCurrencyValue(value, digit);
        }
        arrObj.push([key, value]);
      }
      newObj = Object.fromEntries(arrObj);
      return newObj;
    } else {
      var newValue = setMaxValue(value, max);
      newValue = setMinValue(value, min);
      newValue = setCurrencyValue(newValue, digit);
      return newValue;
    }
  }

  onClickChangePrice(value, obj = null, index = null) {
    if (Array.isArray(value)) {
      var newArr = [...value];
      if (obj !== null && obj !== undefined && obj !== "") {
        var newObj = { ...newArr[index] };
        var arrObj = [];
        for (const [key, value] of Object.entries(newObj)) {
          if (key === obj) {
            value = setNumberValue(value);
          }
          arrObj.push([key, value]);
        }
        newObj = Object.fromEntries(arrObj);
        newArr[index] = newObj;
      } else {
        newArr[index] = setNumberValue(newArr[index]);
      }
      return newArr;
    } else if (typeof value === "object") {
      var newObj = { ...value };
      var arrObj = [];
      for (const [key, value] of Object.entries(newObj)) {
        if (key === obj) {
          value = setNumberValue(value);
        }
        arrObj.push([key, value]);
      }
      newObj = Object.fromEntries(arrObj);
      return newObj;
    } else {
      var newValue = setNumberValue(value);
      return newValue;
    }
  }

  setCurrencyValue(value, digit) {
    var result = parseFloat(value);
    if (!isNaN(result)) {
      result = setNumberCurrency(result, digit);
    } else {
      console.log(
        "setCurrencyValue Error Log : Parameter value : " +
          value +
          " is not support!!!"
      );
      result = setNumberCurrency(0, digit);
    }
    return result;
  }

  setNumberValue(value) {
    var strValue = "";
    if (value !== null && value !== undefined) {
      var newArr = value.toString().split(",");
      if (newArr.length > 1) {
        newArr.map((x) => {
          strValue += x;
        });
      } else {
        strValue = newArr;
      }
    }
    if (isFloat(strValue)) {
      return parseFloat(strValue);
    } else {
      strValue = parseInt(strValue);
      if (isNaN(strValue)) {
        strValue = 0;
      }
      return strValue;
    }
  }

  getUserAuthenOneRole = (roleCode = null) => {
    var strArr = localStorage.getItem("role");
    var arrRole = JSON.parse(strArr);
    var result = arrRole.filter((x) => x.RoleCode === roleCode);
    var newObj = {
      isAuth: false,
      roleCode: "",
    };
    if (result.length) {
      var result = arrRole.find((x) => x.RoleCode === roleCode);
      if (result) {
        newObj.isAuth = true;
        newObj.roleCode = result.RoleCode;
      }
    }
    return newObj;
  };

  getUserAuthenTwoRole = (roleUserCode = null, roleSupportCode = null) => {
    var strArr = localStorage.getItem("role");
    var arrRole = JSON.parse(strArr);
    var result = arrRole.filter(
      (x) => x.RoleCode === roleUserCode || x.RoleCode === roleSupportCode
    );
    var newObj = {
      isAuth: false,
      roleCode: "",
    };
    if (result.length) {
      if (result.length > 1) {
        newObj.isAuth = true;
        newObj.roleCode = roleSupportCode;
      } else {
        var result = arrRole.find(
          (x) => x.RoleCode === roleUserCode || x.RoleCode === roleSupportCode
        );
        if (result) {
          newObj.isAuth = true;
          newObj.roleCode = result.RoleCode;
        }
      }
    }
    return newObj;
  };

  getUserAuthenThreeRole = (
    roleUserCode = null,
    roleSupportCode = null,
    roleManageCode = null
  ) => {
    var strArr = localStorage.getItem("role");
    var arrRole = JSON.parse(strArr);
    var result = arrRole.filter(
      (x) =>
        x.RoleCode === roleUserCode ||
        x.RoleCode === roleSupportCode ||
        x.RoleCode === roleManageCode
    );
    var newObj = {
      isAuth: false,
      roleCode: "",
    };
    if (result.length) {
      if (result.length > 1) {
        newObj.isAuth = true;
        newObj.roleCode = roleManageCode;
      } else {
        var result = arrRole.find(
          (x) =>
            x.RoleCode === roleUserCode ||
            x.RoleCode === roleSupportCode ||
            x.RoleCode === roleManageCode
        );
        if (result) {
          newObj.isAuth = true;
          newObj.roleCode = result.RoleCode;
        }
      }
    }
    return newObj;
  };

  exportToExcel = (fieldData = [], apiData = [], fileName = "") => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const newArr = setDataToSummaryList(fieldData, apiData);
    const result = setDataToExportExcel(fieldData, newArr);
    const ws = XLSX.utils.json_to_sheet(result);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  convertDataToFile = (fieldData = [], apiData = [], fileName = "") => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const newArr = setDataToSummaryList(fieldData, apiData);
    const result = setDataToExportExcel(fieldData, newArr);
    const ws = XLSX.utils.json_to_sheet(result);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    return blobToFile(data, fileName + fileExtension);
  };

  // setDataToSummaryList = (fieldData = [], arrData = []) => {
  //     return setDataToSummaryList(fieldData, arrData);
  // }

  convertPDFToFile = (data = {}, fileName = "TempName", isTransfer) => {
    return CoverSheet.convertPDF(data, fileName, isTransfer);
  };

  renderPDF = (data = {}, isTransfer) => {
    return CoverSheet.renderPDF(data, isTransfer);
  };

  //------------------------------------ Edit by Game ------------------------------------
  showtext = () => {
    return (
      <CLabel show="false" style={{ color: "red" }}>
        {/* {" "} */}*
      </CLabel>
    );
  };

  setStringToDouble = (value) => {
    var qty = value;
    if (qty !== null) {
      if (qty.length > 3) {
        var txtsplit = qty.replaceAll(",", "");
        qty = parseFloat(txtsplit);
      } else {
        qty = parseFloat(qty);
      }
    } else {
      qty = 0;
    }

    return qty;
  };

  setGetBadge = (status) => {
    var color;
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
}

const setDataToExportExcel = (baseField = [], baseData = []) => {
  var newArr = [];
  baseData.map((a) => {
    var newObj = {};
    var arrObj = [];
    baseField.map((x) => {
      for (const [key, value] of Object.entries(a)) {
        if (x.key === key) {
          if (x.isdatetime) {
            var arrSplit = value.split("T");
            arrObj.push([x.label, arrSplit[0]]);
          } else {
            arrObj.push([x.label, value]);
          }
        }
      }
    });
    newObj = Object.fromEntries(arrObj);
    newArr.push(newObj);
  });
  return newArr;
};

const setDataToSummaryList = (baseField = [], baseData = []) => {
  const txtDecrease = "Credit-ลดหนี้";
  var newArr = [];
  var sumObj = {};
  baseData.map((a) => {
    var newObj = {};
    var arrObj = [];
    var isDecrease = false;
    baseField.map((x) => {
      for (const [key, value] of Object.entries(a)) {
        if (x.key === key) {
          if (
            x.isconditioncredit !== "" &&
            x.isconditioncredit !== null &&
            x.isconditioncredit !== undefined
          ) {
            if (value === txtDecrease) {
              isDecrease = true;
            }
          }
          if (
            x.issumvalue !== "" &&
            x.issumvalue !== null &&
            x.issumvalue !== undefined
          ) {
            if (typeof value != "number") {
              value = setNumberValue(value);
              if (isNaN(value)) {
                value = 0;
              }
            }
            if (!Object.keys(sumObj).length) {
              sumObj = {
                [key]: isDecrease ? -value : value,
              };
            } else {
              if (sumObj[key]) {
                var newSumObj = { ...sumObj };
                newSumObj[key] = isDecrease
                  ? newSumObj[key] - value
                  : newSumObj[key] + value;
                sumObj = newSumObj;
              } else {
                var newSumObj = { ...sumObj };
                newSumObj[key] = isDecrease ? -value : value;
                sumObj = newSumObj;
              }
            }
          }
        }
        arrObj.push([key, value]);
      }
    });
    newObj = Object.fromEntries(arrObj);
    newArr.push(newObj);
  });

  var newObj = {};
  for (const [key, value] of Object.entries(sumObj)) {
    newObj[key] = value;
  }
  newArr.push(newObj);

  return newArr;
};

const blobToFile = (theBlob, fileName) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return new File([theBlob], fileName, { type: theBlob.type });
};

const setNumberCurrency = (value, digit) => {
  //  style: "currency",
  //  currency: "฿",
  //  currencyDisplay: "code",
  //  minimumFractionDigits: digit,
  var newTxt = value.toString();
  var newArr = newTxt.split(".");
  if (digit != 0) {
    if (newArr.length > 1) {
      if (newArr[1].length != digit) {
        // var newValue = newArr[1].substring(0, digit);
        // var newStr = newArr[0] + "." + newValue;
        var newStr = newArr[0] + "." + newArr[1];
        value = parseFloat(newStr);
      }
    }
  } else {
    if (newArr.length > 1) {
      value = parseFloat(newArr[0]);
    }
  }
  const useStyles = {
    style: "decimal",
    currencyDisplay: "code",
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  };
  return value.toLocaleString("en-US", useStyles);
};

const setCurrencyValue = (value, digit) => {
  var result = parseFloat(value);
  if (!isNaN(result)) {
    result = setNumberCurrency(result, digit);
  } else {
    console.log(
      "setCurrencyValue Error Log : Parameter value : " +
        value +
        " is not support!!!"
    );
    result = setNumberCurrency(0, digit);
  }
  return result;
};

const setCurrencyNoDigit = (value) => {
  const useStyles = {
    style: "decimal",
    currencyDisplay: "code",
  };
  return value.toLocaleString("en-US", useStyles);
};

const setNumberValue = (value) => {
  var strValue = "";
  if (value !== null && value !== undefined) {
    var newArr = value.toString().split(",");
    if (newArr.length > 1) {
      newArr.map((x) => {
        strValue += x;
      });
    } else {
      strValue = newArr[0];
    }
  }
  if (isFloat(strValue)) {
    return parseFloat(strValue);
  } else {
    strValue = parseInt(strValue);
    if (isNaN(strValue)) {
      strValue = 0;
    }
    return strValue;
  }
};

const isFloat = (value) => {
  value = parseFloat(value);
  return !isNaN(value) && Number(value) === value && value % 1 !== 0;
};

const setMinValue = (value, min) => {
  var result = parseFloat(value);
  if (!isNaN(result)) {
    if (min !== null && min !== undefined && min !== "") {
      if (min > result) {
        result = min;
      }
    }
  } else {
    result = 0;
  }
  return result;
};

const setMaxValue = (value, max) => {
  var result = parseFloat(value);
  if (!isNaN(result)) {
    if (max !== null && max !== undefined && max !== "") {
      if (max < result) {
        result = max;
      }
    }
  } else {
    result = 0;
  }
  return result;
};

const setStringToDouble = (value) => {
  var qty = value;
  if (qty.includes(",")) {
    var txtsplit = qty.replace(",", "");
    qty = parseFloat(txtsplit);
  } else {
    qty = parseFloat(qty);
  }
  return qty;
};

const functionController = new FunctionController();
export default functionController;
