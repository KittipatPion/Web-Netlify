import React, { useState, useEffect } from "react";
import {
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CInvalidFeedback,
  CBadge,
  CInputCheckbox,
  CSwitch,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Repository from "../../../repositories/Repository";
import Constant from "../../../helpers/Constant";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MakeStyleSheet from "../../../helpers/MakeStyleSheet";
import FunctionController from "../../../helpers/FunctionController";

const fields = [
  {
    key: "checkbox",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "roleName",
    label: `${Constant.arrFieldMasterAuthentication[0]}`,
  },
  {
    key: "roleDescription",
    label: `${Constant.arrFieldMasterAuthentication[1]}`,
  },
];

export default function UserGroup() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [baseItems, setBaseItems] = useState([]);
  const [items, setItems] = useState({});
  const [isConfirmSave, setIsConfirmSave] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [userGroupList, setUserGroupList] = useState([]);
  const [collsFormSearch, setCollsFormSearch] = useState(1);
  const [selectItemsSearch, setSelectItemsSearch] = useState({});
  const [invalidMaterialFormSearch, setInvalidMaterialFormSearch] = useState([false]);

  const pageCode = "";

  const _classes = MakeStyleSheet.useStyles();

  const handleChangeSearchSelect = (e, values) => {
    if (values) {
      setSelectItemsSearch(values);
    }
    else {
      setSelectItemsSearch({});
    }
  }

  const handleChangeIsActive = (index) => (e) => {
    var newArr = [...baseItems];
    var newIndex = baseItems.findIndex((x) => x.roleId === index);
    newArr[newIndex].isUse = e.target.checked;
    setBaseItems(newArr);
  }

  const onClickSearchData = () => {
    var itemsSelect = { ...selectItemsSearch };
    if (Object.keys(itemsSelect).length) {
      setInvalidMaterialFormSearch([false]);
      var userGroupId = itemsSelect.userGroupId;
      fnGetData(userGroupId);
    }
    else {
      setBaseItems([]);
      setInvalidMaterialFormSearch([true]);
    }
  }

  const onClickEditData = () => {
    setIsConfirmEdit(!isConfirmEdit);
    var newObj = { ...selectItemsSearch };
    var newRole = FunctionController.setNullValueInArray([...baseItems]);
    var userGroupId = newObj.userGroupId;

    var newArr = [userGroupId, newRole];
    fnUpdateData(newArr);
  };

  const fnGetData = (index) => {
    setIsPostingData(true);
    Repository.fetchGetUserGroupAuthenListById(index).then(
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

  const fnUpdateData = (arrData) => {
    setIsPostingData(true);
    Repository.fetchEditUserGroupAuthenListById(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          window.location.reload(false);
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
  };

  const fnGetUserGroupNameOnlyList = () => {
    Repository.fetchGetUserGroupNameOnlyList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setUserGroupList(result.data);
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
    fnGetUserGroupNameOnlyList();
  }, []);

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

  const onClickCheckFormEditData = () => {
    if (getIsValidForm("edit-needs-validation")) {
      setIsConfirmEdit(!isConfirmEdit);
    }
  };

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  //////Search////
  const selectData = () => (
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
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="select">User Group</CLabel>
                      <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                      }}>
                        <Autocomplete
                          id="search-usergroup"
                          size="small"
                          options={userGroupList}
                          onChange={handleChangeSearchSelect}
                          getOptionLabel={(option) => (`[${option.userGroupCode}] ` + option.userGroupName)}
                          renderOption={(option) => {
                            return (
                              <Typography className={_classes.autoCompleteRenderOptions}>{`[${option.userGroupCode}] ` + option.userGroupName}</Typography>
                            )
                          }}
                          renderInput={(params) => {
                            params.inputProps.className = _classes.autoCompleteInputLabel;
                            return (
                              <TextField size="small"
                                error={invalidMaterialFormSearch[0]}
                                {...params}
                                label={<Typography className={_classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                helperText={invalidMaterialFormSearch[0] ? <Typography className={_classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                variant="outlined" />
                            )
                          }}
                        />
                      </Box>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CButton
                        className="editbutton"
                        size={Constant.btHeaderSize}
                        color="warning"
                        block
                        onClick={onClickSearchData}
                      >
                        {Constant.btSearchData}
                      </CButton>
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

  const allModal = () => (
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

      {/* Start Edit Modal */}
      <CModal
        show={isConfirmEdit}
        onClose={() => setIsConfirmEdit(!isConfirmEdit)}
        color="success"
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
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol>
                  <h3 className="headertable">
                    {Constant.txtMasterAuthentication}
                  </h3>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {selectData()}
              <br />
              {/* <CRow className="justify-content-center"> */}
              <CCard className="p-2" style={{ maxHeight: "700px", overflowY: "auto" }}>
                  {/* <CCardBody> */}
                    <CDataTable
                      id="table-export"
                      items={baseItems}
                      fields={fields}
                      // columnFilter
                      tableFilter={{
                        label: `${Constant.tabletxtSearch}`,
                        placeholder: `${Constant.tabletxtPlaceholder}`,
                      }}
                      itemsPerPageSelect={{
                        label: `${Constant.tabletxtCountPage}`,
                      }}
                      itemsPerPage={10}
                      // hover
                      // sorter
                      // size="lg"
                      responsive
                      bordered
                      pagination
                      scopedSlots={{
                        checkbox: (data, index) => {
                          return (
                            <td className="py-2">
                              <Checkbox
                                color="primary"
                                id={"checkbox-select-" + data.roleId}
                                checked={data.isUse}
                                onChange={handleChangeIsActive(data.roleId)}
                              />
                            </td>
                          );
                        },
                      }}
                    />
                  {/* </CCardBody> */}
                </CCard>
              {/* </CRow> */}
              <CRow className="justify-content-center">
                <CCol md="2">
                  <CButton
                    className="editbutton"
                    size={Constant.btHeaderSize}
                    color="success"
                    block
                    onClick={() => setIsConfirmEdit(!isConfirmEdit)}
                  >
                    {Constant.btSave}
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {allModal()}
      </CRow >
    );
  }
}
