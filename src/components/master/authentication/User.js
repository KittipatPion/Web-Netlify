import React, { useState, useEffect } from "react";
import Repository from "../../../repositories/Repository";
import Constant from "../../../helpers/Constant";

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
  CSpinner,
  CCol,
  CSelect,
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
  CProgress,
  CSwitch,
  CLink,
  CSubheader,
  CBreadcrumbRouter,
  CRow,
  CButtonToolbar,
  CImg,
} from "@coreui/react";
import { DocsLink } from "../../../reusable";
import CIcon from "@coreui/icons-react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import MakeStyleSheet from "../../../helpers/MakeStyleSheet";
import FunctionController from "../../../helpers/FunctionController";

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

const fields = [
  {
    key: "manage",
    label: "",
    _style: { width: "7%" },
    sorter: false,
    filter: false,
  },
  {
    key: "userName",
    label: `${Constant.arrFieldMasterUser[0]}`,
  },
  {
    key: "aliasName",
    label: `${Constant.arrFieldMasterUser[1]}`,
  },
  {
    key: "firstName",
    label: `${Constant.arrFieldMasterUser[2]}`,
  },
  {
    key: "lastName",
    label: `${Constant.arrFieldMasterUser[3]}`,
  },

  {
    key: "loginDatetime",
    label: `${Constant.arrFieldMasterUser[4]}`,
  },
  {
    key: "inActiveDateTime",
    label: `${Constant.arrFieldMasterUser[5]}`,
  },
  {
    key: "changePasswordDateTime",
    label: `${Constant.arrFieldMasterUser[6]}`,
  },
  {
    key: "counter",
    label: `${Constant.arrFieldMasterUser[7]}`,
  },

  {
    key: "transporterName",
    label: `${Constant.arrFieldMasterUser[8]}`,
  },
  {
    key: "email",
    label: `${Constant.arrFieldMasterUser[9]}`,
  },
  {
    key: "isLogin",
    label: `${Constant.arrFieldMasterUser[10]}`,
  },
  {
    key: "activatePassword",
    label: `${Constant.arrFieldMasterUser[11]}`,
  },
  {
    key: "isActive",
    label: `${Constant.arrFieldMasterUser[12]}`,
  },
];

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
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 100,
      height: 10,
      fontSize: 18,
      fontFamily: "Scg",
    },
  },
  textfont: {
    fontFamily: "Scg",
  },

  comboOptions: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "grey ",
    fontFamily: "Scg",
  },
  label: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "grey ",
    fontFamily: "Scg",
  },
}));

const Tables = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState({});
  const [baseItems, setBaseItems] = useState([]);

  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isShowDialogEdit, setisShowDialogEdit] = useState(false);

  const [isShowDialogAdd, setisShowDialogAdd] = useState(false);
  const [userGroupList, setUserGroupList] = useState([]);

  const [isActive, setisActive] = useState(true);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const [isRePassword, setIsRePassword] = useState(false);
  const [isChangeRePassword, setIsChangeRePassword] = useState(false);
  const [isConfirmResetPass, setIsConfirmResetPass] = useState(false);
  const [isShowFormChangePass, setIsShowFormChangePass] = useState(false);
  const [isShowSuccessResetPass, setIsShowSuccessResetPass] = useState(false);
  const [isShowSuccessChangePass, setIsShowSuccessChangePass] = useState(false);

  const [collsFormSearch, setCollsFormSearch] = useState(true);
  const [isPostingData, setIsPostingData] = useState(false);
  const [errorAPI, setErrorAPI] = useState(null);
  const [itemsTran, setTransportList] = useState([]);
  const [fieldDelete, setFieldDelete] = useState(null);

  const [selectItemsSearch, setSelectItemsSearch] = useState([{}]);
  const [selectItemsAdd, setSelectItemsAdd] = useState([{}]);

  const pageCode = "";

  const _classes = MakeStyleSheet.useStyles();

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

  const handleChangeSearchSelect = (e, values) => {
    if (values) {
      setSelectItemsSearch([values]);
    } else {
      setSelectItemsSearch([{}]);
    }
  };

  const handleChangeAddSelect = (e, values) => {
    if (values) {
      setSelectItemsAdd([values]);
    } else {
      setSelectItemsAdd([{}]);
    }
  };

  const handleChanges = (event) => {
    setisActive(event.target.checked);
  };

  const handleChangeConfirmDelete = (index) => (e) => {
    setIsConfirmDelete(!isConfirmDelete);
    setFieldDelete(index);
  };

  const handleChangeUpdateField = (target) => (e, value) => {
    let newArr = { ...items };
    // console.log(newArr);
    if (target === "userName") {
      newArr.userName = e.target.value;
    } else if (target === "isActive") {
      newArr.isActive = e.target.checked;
    } else if (target === "password") {
      newArr.password = e.target.value;
    } else if (target === "aliasName") {
      newArr.aliasName = e.target.value;
    } else if (target === "firstName") {
      newArr.firstName = e.target.value;
    } else if (target === "lastName") {
      newArr.lastName = e.target.value;
    } else if (target === "transporterId") {
      if (value) {
        newArr.transporterId = value.transporterId;
      }
      else {
        newArr.transporterId = null;
      }
    } else if (target === "email") {
      newArr.email = e.target.value;
    } else if (target === "userGroupId") {
      newArr.userGroupId = e.target.value;
    }
    setItems(newArr);
    // console.log(newArr);
  };

  const onClickOpenDialogAdd = () => {
    setisShowDialogAdd(true);
  };

  const onClickCloseDialogAdd = () => {
    setItems({});
    setisShowDialogAdd(false);
  };

  const onClickOpenDialogEdit = (x) => (e) => {
    setisShowDialogEdit(true);
    if (!isLoadingData) {
      fnGetDataListById(x);
      fnGetUserGroupList();
    }
  };

  const onClickCloseDialogEdit = () => {
    setItems({});
    setisShowDialogEdit(false);
  };

  const onClickCheckSearchData = () => {
    if (getIsValidForm("search-header-need-validation")) {
      onClickSearchData();
    } else {
      setBaseItems([]);
    }
  };

  const onClickSearchData = () => {
    var arrSelect = [...selectItemsSearch];
    // console.log(arrSelect);
    var userName = document.getElementById("search-userName").value;
    var aliasName = document.getElementById("search-aliasName").value;
    var firstName = document.getElementById("search-firstName").value;
    var lastName = document.getElementById("search-lastName").value;
    var email = document.getElementById("search-email").value;
    // var sourceId = getHasObjectValue(arrSelect[0]) ? arrSelect[0].sourceId : null;
    var transporterId = getHasObjectValue(arrSelect[0])
      ? arrSelect[0].transporterId
      : null;
    userName = userName != "" ? userName : null;
    aliasName = aliasName != "" ? aliasName : null;
    firstName = firstName != "" ? firstName : null;
    lastName = lastName != "" ? lastName : null;
    email = email != "" ? email : null;

    var newArr = [
      userName,
      aliasName,
      firstName,
      lastName,
      transporterId,
      email,
    ];

    // console.log(newArr);
    fnGetDataList(newArr);
  };

  const onClickClearDataForSearch = () => {
    var userName = document.getElementById("search-userName");
    userName.value = "";
    var aliasName = document.getElementById("search-aliasName");
    aliasName.value = "";
    var firstName = document.getElementById("search-firstName");
    firstName.value = "";
    var lastName = document.getElementById("search-lastName");
    lastName.value = "";
    var transporterId = document.getElementById("search-transporterId");
    transporterId.value = "";
    var email = document.getElementById("search-email");
    email.value = "";
  };

  const onClickClearDataForAdd = () => {
    var userName = document.getElementById("add-userName");
    userName.value = "";
    var password = document.getElementById("add-password");
    password.value = "";
    var isActive = document.getElementById("add-isActive");
    isActive.checked = false;
    var aliasName = document.getElementById("add-aliasName");
    aliasName.value = "";
    var firstName = document.getElementById("add-firstName");
    firstName.value = "";
    var lastName = document.getElementById("add-lastName");
    lastName.value = "";
    var transporterId = document.getElementById("add-transporterId");
    transporterId.value = "";
    var email = document.getElementById("add-email");
    email.value = "";
  };

  const onClickClearDataFormPass = () => {
    setIsChangeRePassword(false);
    setNoValidateForm("change-pass-need-validation");
    document.getElementById("change-password").value = "";
    document.getElementById("change-re-password").value = "";
  }

  const onClickCheckFormAddData = () => {
    var password = document.getElementById("add-password").value;
    var rePassword = document.getElementById("add-re-password").value;
    if (getIsValidForm("add-need-validation") && password === rePassword) {
      setIsConfirmSave(!isConfirmSave);
      setIsRePassword(false);
    }
    else if (password !== rePassword) {
      console.log("asd");
      setNoValidateForm("add-need-validation");
      setIsRePassword(true);
    }
    else {
      setIsRePassword(false);
    }
  };

  const onClickAddData = () => {
    setIsConfirmSave(!isConfirmSave);
    var arrObj = [...selectItemsAdd];
    var userName = document.getElementById("add-userName").value;
    var password = document.getElementById("add-password").value;
    var aliasName = document.getElementById("add-aliasName").value;
    var firstName = document.getElementById("add-firstName").value;
    var lastName = document.getElementById("add-lastName").value;
    var isActive = document.getElementById("add-isActive").checked;
    var transporterId = getHasObjectValue(arrObj[0])
      ? arrObj[0].transporterId
      : null;
    var email = document.getElementById("add-email").value;
    var userGroupId = document.getElementById("add-user-group").value;

    var createBy = 1;
    var newArr = [
      userName,
      password,
      aliasName,
      firstName,
      lastName,
      isActive,
      transporterId,
      email,
      createBy,
      userGroupId
    ];
    // console.log(newArr);
    fnInsertData(newArr);
  };

  const onClickCheckFormEditData = () => {
    if (getIsValidForm("edit-need-validation")) {
      setIsConfirmEdit(!isConfirmEdit);
    }
  };

  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    let newArr = { ...items };
    // console.log("Checkpoint" + newArr);
    var userId = newArr.userId;
    var userName = newArr.userName;
    var isActive = newArr.isActive;
    var password = newArr.password;
    var aliasName = newArr.aliasName;
    var firstName = newArr.firstName;
    var lastName = newArr.lastName;
    var transporterId = newArr.transporterId;
    var email = newArr.email;
    var userGroupId = parseInt(newArr.userGroupId);
    var updateBy = 1;
    var arrObj = [
      userId,
      userName,
      isActive,
      password,
      aliasName,
      firstName,
      lastName,
      transporterId,
      email,
      updateBy,
      userGroupId
    ];
    // console.log(arrObj);
    fnUpdateData(arrObj);
  };

  const onClickResetPassword = () => {
    setIsConfirmResetPass(!isConfirmResetPass);
    var newObj = { ...items };
    fnResetPassword(newObj.userId);
  }

  const onClickChangePassword = () => {
    var pass = document.getElementById("change-password").value;
    var rePass = document.getElementById("change-re-password").value;
    if (getIsValidForm("change-pass-need-validation") && pass === rePass) {
      setIsChangeRePassword(false);
      setIsShowFormChangePass(!isShowFormChangePass);
      var newObj = { ...items };
      var userId = newObj.userId;
      var newArr = [userId, pass];

      // console.log(newArr);
      fnChangePassword(newArr);
    }
    else if (pass !== rePass) {
      setNoValidateForm("change-pass-need-validation");
      setIsChangeRePassword(true);
    }
    else {
      setIsChangeRePassword(false);
    }
  }

  const onClickDeleteData = () => {
    setIsConfirmDelete(!isConfirmDelete);
    var userId = fieldDelete;
    // console.log(zoneId);
    fnDeleteData(userId);
  };

  const fnInsertData = (arrData) => {
    setIsPostingData(true);
    Repository.fetchAddUserList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") window.location.reload(false);
        else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnUpdateData = (arrData) => {
    setIsPostingData(true);
    Repository.fetchEditUserList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") window.location.reload(false);
        else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnResetPassword = (index) => {
    setIsPostingData(true);
    Repository.fetchResetPasswordUserListById(index).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsShowSuccessResetPass(!isShowSuccessResetPass);
        }
        else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  }

  const fnChangePassword = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchChangePasswordByAdmin(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsShowSuccessChangePass(!isShowSuccessChangePass);
        }
        else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  }

  const fnDeleteData = (index) => {
    setIsPostingData(true);
    Repository.fetchRemoveUserList(index).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") window.location.reload(false);
        else setErrorAPI(result);
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetTransporterNameOnlyList = () => {
    Repository.fetchTransporterList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setTransportList(result.data);
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

  const fnGetDataList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetUserList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setBaseItems(FunctionController.setEmptyValueInArray(result.data));
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

  const fnGetDataListById = (data) => {
    setIsLoadingData(true);
    Repository.fetchGetUserListById(data).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setItems(result.data);
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

  const fnGetUserGroupList = () => {
    if (!userGroupList.length) {
      Repository.fetchGetUserGroupList().then(
        (result) => {
          if (result.httpCode === "200") {
            setUserGroupList(result.data);
          } else {
            setError(result);
          }
        },
        (error) => {
          setError(error);
        }
      );
    }
  }

  const fnCheckUserAuth = () => {
    var result = FunctionController.getUserAuthenOneRole(pageCode);
    if (result.isAuth) {
      // initeState();
    }
    else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  useEffect(() => {
    fnGetTransporterNameOnlyList();
  }, []);

  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const formSearch = () => (
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
          <CCardHeader id="headingThree" class="d-flex justify-content-between">
            <CButton
              color="link"
              className="text-left m-0 p-0"
              onClick={() => setCollsFormSearch(!collsFormSearch)}
            >
              <CRow className="ml-2 mt-1 p-0">
                <h6 className="ml-2 mt-1 p-0">ค้นหาข้อมูล</h6>
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
              <CForm className="search-header-need-validation">
                <CFormGroup>
                  <CRow>
                    <CCol xs="12" sm="4" md="4">
                      <CLabel>ชื่อผู้ใช้งาน</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="search-userName" />
                      </Box>
                    </CCol>
                    <CCol xs="12" sm="4" md="4">
                      <CLabel>ชื่อที่ใช้แสดง</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="search-aliasName" />
                      </Box>
                    </CCol>
                    <CCol xs="12" sm="4" md="4">
                      <CLabel htmlFor="select">บริษัทขนส่ง</CLabel>
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
                          id="search-transporterId"
                          options={itemsTran}
                          size="small"
                          getOptionLabel={(option) =>
                            "[" +
                            option.transporterCode +
                            "] " +
                            option.transporterNameThai
                          }
                          // style={{ width: 300 }}
                          onChange={handleChangeSearchSelect}
                          renderOption={(option) => (
                            <Typography
                              className={_classes.autoCompleteRenderOptions}
                            >
                              {"[" +
                                option.transporterCode +
                                "] " +
                                option.transporterNameThai}
                            </Typography>
                          )}
                          renderInput={(params) => {
                            params.inputProps.className =
                              _classes.autoCompleteInputLabel;
                            return (
                              <TextField
                                size="small"
                                // style={{ height: Constant.styleHeightField }}
                                {...params}
                                label={
                                  <Typography
                                    className={_classes.autoCompleteInputLabel}
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
                    </CCol>
                  </CRow>
                </CFormGroup>
                <CFormGroup>
                  <CRow>
                    <CCol xs="12" sm="4" md="4">
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CLabel>ชื่อจริง</CLabel>
                        <CInput type="text" id="search-firstName" />
                      </Box>
                    </CCol>
                    <CCol xs="12" sm="4" md="4">
                      <CLabel>นามสกุล</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="search-lastName" />
                      </Box>
                    </CCol>
                    <CCol xs="12" sm="4" md="4">
                      <CLabel>Email</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="search-email" />
                      </Box>
                    </CCol>
                  </CRow>
                </CFormGroup>
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
                          onClick={onClickClearDataForSearch}
                        >
                          {Constant.btClearData}
                        </CButton>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCollapse>
        </CCard>
      </Box>
    </div>
  );

  const formAdd = () => (
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
                <h6 className="ml-2 mt-1 p-0">ข้อมูลผู้ใช้งาน</h6>
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
              <CForm className="add-need-validation" noValidate>
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>ชื่อจริง</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="add-firstName" />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>นามสกุล</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="add-lastName" />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>ชื่อที่ใช้แสดง</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="add-aliasName" required />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>Email</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="add-email" />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>ชื่อผู้ใช้งาน</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="text" id="add-userName" required />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>รหัสผ่าน</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="password" id="add-password" required />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>ยืนยันรหัสผ่าน</CLabel>
                      <Box
                        className="border-set"
                        component={Grid}
                        item
                        boxShadow={1}
                        xs={{
                          width: " 100%",
                        }}
                      >
                        <CInput type="password" id="add-re-password" invalid={isRePassword} required />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="select">บริษัทขนส่ง</CLabel>
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
                          id="add-transporterId"
                          options={itemsTran}
                          size="small"
                          getOptionLabel={(option) =>
                            "[" +
                            option.transporterCode +
                            "] " +
                            option.transporterNameThai
                          }
                          // style={{ width: 300 }}
                          onChange={handleChangeAddSelect}
                          renderOption={(option) => (
                            <Typography
                              className={_classes.autoCompleteRenderOptions}
                            >
                              {"[" +
                                option.transporterCode +
                                "] " +
                                option.transporterNameThai}
                            </Typography>
                          )}
                          renderInput={(params) => {
                            params.inputProps.className =
                              _classes.autoCompleteInputLabel;
                            return (
                              <TextField
                                size="small"
                                // style={{ height: Constant.styleHeightField }}
                                {...params}
                                label={
                                  <Typography
                                    className={
                                      _classes.autoCompleteInputLabel
                                    }
                                  >
                                    {Constant.txtformPlaceholderSelected}
                                  </Typography>
                                }
                                variant="outlined"
                              />
                            );
                          }}
                        />
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel>User Group Name</CLabel>
                      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                      }}>
                        <CSelect
                          id="add-user-group"
                          style={{ height: Constant.styleHeightField }}
                          onClick={fnGetUserGroupList}
                          required
                        >
                          <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                          {userGroupList.map((x) => (
                            <option value={x.userGroupId}>{x.userGroupName}</option>
                          ))}
                        </CSelect>
                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel className="mt-1" class="align-top">
                        สถานะ
                      </CLabel>
                      <br />
                      <CSwitch
                        id="add-isActive"
                        className={"mx-1"}
                        variant={"3d"}
                        color={"success"}
                        onChange={handleChanges}
                        value={isActive}
                        defaultChecked={false}
                        labelOn={"\u2713"}
                        labelOff={"\u2715"}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="justify-content-center mt-2">
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
                        className="addbutton"
                        size={Constant.btAddSize}
                        block
                        // type="submit"
                        color="success"
                        onClick={onClickCheckFormAddData}
                      >
                        {Constant.btSave}
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
                        className="editbutton"
                        size={Constant.btAddSize}
                        color="danger"
                        block
                        onClick={onClickClearDataForAdd}
                      >
                        ยกเลิก
                      </CButton>
                    </Box>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCollapse>
        </CCard>
      </Box>
    </div>
  );

  const formEdit = () => {
    if (isLoadingData) {
      return (
        <CCardBody>
          {/* <CProgress sm animated value={100} className="mb-3" color='danger' /> */}
          {showLoadingData()}
        </CCardBody>
      );
    } else if (Object.keys(items).length) {
      var arr = { ...items };
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
                  <h6 className="ml-2 mt-1 p-0">ข้อมูลผู้ใช้งาน</h6>
                </CRow>
              </CButton>
              <CButton
                color="link"
                onClick={() => setCollsFormSearch(!collsFormSearch)}
              >
                <CIcon
                  className="collap-icon"
                  name={
                    collsFormSearch
                      ? "cil-chevron-bottom"
                      : "cil-chevron-top"
                  }
                />
              </CButton>
            </CCardHeader>
            <CCollapse show={collsFormSearch}>
              <CCardBody>
                <CForm className="edit-need-validation">
                  <CRow className="ml-2 mr-2 p-0">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>ชื่อจริง</CLabel>
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
                            id="add-firstName"
                            value={arr.firstName}
                            onChange={handleChangeUpdateField("firstName")}
                          />
                          <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>นามสกุล</CLabel>
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
                            id="add-lastName"
                            value={arr.lastName}
                            onChange={handleChangeUpdateField("lastName")}
                          />
                          <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>ชื่อที่ใช้แสดง</CLabel>
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
                            id="add-aliasName"
                            value={arr.aliasName}
                            onChange={handleChangeUpdateField("aliasName")}
                            required
                          />
                          <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>Email</CLabel>
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
                            id="add-email"
                            value={arr.email}
                            onChange={handleChangeUpdateField("email")}
                          />
                          <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="ml-2 mr-2 p-0">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>ชื่อผู้ใช้งาน</CLabel>
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
                            id="add-userName"
                            value={arr.userName}
                            onChange={handleChangeUpdateField("userName")}
                            required
                          />
                          <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="12" md="6">
                      <CFormGroup>
                        <CLabel>จัดการรหัสผ่าน</CLabel>
                        <CRow>
                          <CCol xs="12" sm="12" md="6">
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
                                className="addbutton"
                                size={Constant.btAddSize}
                                block
                                color="warning"
                                onClick={() => setIsConfirmResetPass(!isConfirmResetPass)}
                              >
                                {Constant.btResetPassword}
                              </CButton>
                            </Box>
                          </CCol>
                          <CCol xs="12" sm="12" md="6">
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
                                className="addbutton"
                                size={Constant.btAddSize}
                                block
                                color="warning"
                                onClick={() => setIsShowFormChangePass(!isShowFormChangePass)}
                              >
                                {Constant.btChangePassword}
                              </CButton>
                            </Box>
                          </CCol>
                        </CRow>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" md="3">
                      <CFormGroup>
                        <CLabel htmlFor="select">บริษัทขนส่ง</CLabel>
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
                            id="add-transporterId"
                            options={itemsTran}
                            size="small"
                            getOptionLabel={(option) =>
                              "[" +
                              option.transporterCode +
                              "] " +
                              option.transporterNameThai
                            }
                            // style={{ width: 300 }}
                            defaultValue={itemsTran.find(
                              (x) => x.transporterId === arr.transporterId
                            )}
                            onChange={handleChangeUpdateField(
                              "transporterId"
                            )}
                            renderOption={(option) => (
                              <Typography
                                className={_classes.autoCompleteRenderOptions}
                              >
                                {"[" +
                                  option.transporterCode +
                                  "] " +
                                  option.transporterNameThai}
                              </Typography>
                            )}
                            renderInput={(params) => {
                              params.inputProps.className =
                                _classes.autoCompleteInputLabel;
                              return (
                                <TextField
                                  size="small"
                                  // style={{ height: Constant.styleHeightField }}
                                  {...params}
                                  label={
                                    <Typography
                                      className={
                                        _classes.autoCompleteInputLabel
                                      }
                                    >
                                      {Constant.txtformPlaceholderSelected}
                                    </Typography>
                                  }
                                  variant="outlined"
                                />
                              );
                            }}
                          />
                          <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="ml-2 mr-2 p-0">
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel>User Group Name</CLabel>
                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                          width: ' 100%'
                        }}>
                          <CSelect
                            id="edit-user-group"
                            style={{ height: Constant.styleHeightField }}
                            onClick={fnGetUserGroupList}
                            value={arr.userGroupId}
                            required
                            onChange={handleChangeUpdateField("userGroupId")}
                          >
                            <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                            {userGroupList.map((x) => (
                              <option value={x.userGroupId}>{x.userGroupName}</option>
                            ))}
                          </CSelect>
                          <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm="6" md="3">
                      <CFormGroup>
                        <CLabel className="mt-1" class="align-top">
                          สถานะ
                        </CLabel>
                        <br />
                        <CSwitch
                          id="add-isActive"
                          className={"mx-1"}
                          variant={"3d"}
                          color={"success"}
                          // value={isActive}
                          checked={arr.isActive}
                          onChange={handleChangeUpdateField("isActive")}
                          defaultChecked={false}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow className="justify-content-center mt-2">
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
                          className="addbutton"
                          size={Constant.btAddSize}
                          block
                          // type="submit"
                          color="success"
                          onClick={onClickCheckFormEditData}
                        >
                          {Constant.btSave}
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
                          className="editbutton"
                          size={Constant.btAddSize}
                          color="danger"
                          block
                          onClick={handleChangeConfirmDelete(arr.userId)}
                        >
                          ลบช้อมูล
                        </CButton>
                      </Box>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
        </Box>
      );
    }
  };

  const tabledata = () => {
    return (
      <CDataTable
        // columnFilter
        tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
        itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
        className="CDataTable"
        items={baseItems}
        fields={fields}
        // size='xl'
        // striped
        responsive
        bordered
        // sorter
        itemsPerPage={10}
        pagination
        scopedSlots={{
          loginDatetime: (item) => {
            var newDate = new Date(item.loginDatetime);
            newDate = newDate.toLocaleString(['ban', 'TH']);
            newDate = newDate != "Invalid Date" ? newDate : "";
            return (
              <td className="py-2 text-center">
                {newDate}
              </td>
            );
          },
          inActiveDateTime: (item) => {
            var newDate = new Date(item.inActiveDateTime);
            newDate = newDate.toLocaleString(['ban', 'TH']);
            newDate = newDate != "Invalid Date" ? newDate : "";
            return (
              <td className="py-2 text-center">
                {newDate}
              </td>
            );
          },
          changePasswordDateTime: (item) => {
            var newDate = new Date(item.changePasswordDateTime);
            newDate = newDate.toLocaleDateString();
            newDate = newDate != "Invalid Date" ? newDate : "";
            return (
              <td className="py-2 text-center">
                {newDate}
              </td>
            );
          },
          isActive: (item, index) => {
            return (
              <td className="py-2 text-center">
                {item.isActive ? (
                  <CIcon
                    name="cil-check-circle"
                    style={{ color: "green" }}
                    size="2xl"
                  />
                ) : (
                  <CIcon
                    name="cil-x-circle"
                    style={{ color: "red" }}
                    size="2xl"
                  />
                )}
              </td>
            );
          },
          isLogin: (item, index) => {
            return (
              <td className="py-2 text-center">
                {item.isLogin ? (
                  <CIcon
                    name="cil-check-circle"
                    style={{ color: "green" }}
                    size="2xl"
                  />
                ) : (
                  <CIcon
                    name="cil-x-circle"
                    style={{ color: "red" }}
                    size="2xl"
                  />
                )}
              </td>
            );
          },
          activatePassword: (item, index) => {
            return (
              <td className="py-2 text-center">
                {item.activatePassword ? (
                  <CIcon
                    name="cil-check-circle"
                    style={{ color: "green" }}
                    size="2xl"
                  />
                ) : (
                  <CIcon
                    name="cil-x-circle"
                    style={{ color: "red" }}
                    size="2xl"
                  />
                )}
              </td>
            );
          },
          manage: (item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  block
                  size={Constant.btHeaderSize}
                  onClick={onClickOpenDialogEdit(item.userId)}
                >
                  {Constant.btEditData}
                </CButton>
              </td>
            );
          },
        }}
      />
    );
  };

  const layoutDialogAdd = () => {
    return (
      <h6>
        <Dialog
          fullScreen
          open={isShowDialogAdd}
          // onClose={onClickCloseDialog}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                // onClick={onClickCloseDialog}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>เพิ่มผู้ใช้งาน</h3>
              </Typography>
              <CButton className="btt-close" onClick={onClickCloseDialogAdd}>
                <h5>Close</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>{modalDialog()}</List>
          <CCardBody>{formAdd()}</CCardBody>
        </Dialog>
      </h6>
    );
  };

  const layoutDialogEdit = () => {
    return (
      <h6>
        <Dialog
          fullScreen
          open={isShowDialogEdit}
          // onClose={onClickCloseDialog}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                // onClick={onClickCloseDialog}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>แก้ไขรายละเอียดผู้ใช้งาน</h3>
              </Typography>
              <CButton className="btt-close" onClick={onClickCloseDialogEdit}>
                <h5>Close</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>{modalDialog()}</List>
          <CCardBody>{formEdit()}</CCardBody>
        </Dialog>
      </h6>
    );
  };

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
    </div>
  );

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

      {/* Start Reset Password Modal */}
      <CModal
        show={isConfirmResetPass}
        onClose={() => setIsConfirmResetPass(!isConfirmResetPass)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentConfirmResetPassword}</CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={onClickResetPassword}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => setIsConfirmResetPass(!isConfirmResetPass)}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Reset Password Modal */}

      {/* Start Show Success Reset Password Modal */}
      <CModal
        show={isShowSuccessResetPass}
        onClose={() => setIsShowSuccessResetPass(!isShowSuccessResetPass)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessResetPass}</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowSuccessResetPass(!isShowSuccessResetPass)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Success Reset Password Modal */}

      {/* Start Show Form Change Password Modal */}
      <CModal
        show={isShowFormChangePass}
        onClose={() => { onClickClearDataFormPass(); setIsShowFormChangePass(!isShowFormChangePass); }}
        color="success"
        centered
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleChangePassword}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          <CForm className="change-pass-need-validation">
            <CRow>
              <CCol sm="12" md="6">
                <CFormGroup>
                  <CLabel>รหัสผ่านใหม่</CLabel>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CInput type="password" id="change-password" required />
                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                  </Box>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12" md="6">
                <CFormGroup>
                  <CLabel>ยืนยันรหัสผ่านใหม่</CLabel>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CInput type="password" id="change-re-password" invalid={isChangeRePassword} required />
                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                  </Box>
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickChangePassword}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => { onClickClearDataFormPass(); setIsShowFormChangePass(!isShowFormChangePass); }}
          >
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Form Change Password Modal */}

      {/* Start Show Success Change Password Modal */}
      <CModal
        show={isShowSuccessChangePass}
        onClose={() => setIsShowSuccessChangePass(!isShowSuccessChangePass)}
        color="success"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>{Constant.contentSuccessChangePass}</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowSuccessChangePass(!isShowSuccessChangePass)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Success Change Password Modal */}

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
    </div >
  );

  if (error) {
    return (
      <CCol className="text-center">
        {Constant.apiTopicFetchError} : {error.message}
      </CCol>
    );
  } else if (!isLoaded) {
    return <div className="content-wrapper">{showLoadingData()}</div>;
  } else {
    return (
      <div>
        <h6>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <div className="headertable">User</div>
                    </CCol>
                    <CCol className="col-2">
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
                          onClick={onClickOpenDialogAdd}
                        >
                          เพิ่มผู้ใช้งาน
                        </CButton>
                      </Box>
                    </CCol>
                  </CRow>
                  {/* {collaps()} */}
                </CCardHeader>
                <CCardBody>
                  {modalForm()}
                  {layoutDialogAdd()}
                  {layoutDialogEdit()}
                  {formSearch()}
                  {/* <CRow xs="6" className="justify-content-center "> */}
                  <CCard className="p-2" style={{ maxHeight: "700px", overflowY: "auto" }}>
                    {/* <CFormGroup xs="12" sm="6" md="2">  */}
                    {/* <CCard className='mt-2' style={{ width: '100%' }} > */}

                    {tabledata()}
                    {/* </CCard> */}
                    {/* </CFormGroup> */}
                  </CCard>
                  {/* </CRow> */}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  }
};

export default Tables;
