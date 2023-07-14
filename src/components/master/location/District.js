import React, { useState, useEffect } from "react";
import Repository from "../../../repositories/Repository";
import Constant from "../../../helpers/Constant";
import { Typography } from "@material-ui/core";
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
  CProgress,
  CModalTitle,
  CSwitch,
  CInvalidFeedback,
  CValidFeedback,
  CLink,
  CSelect,
  CSpinner,
  CSubheader,
  CBreadcrumbRouter,
  CRow,
} from "@coreui/react";
import Checkbox from "@material-ui/core/Checkbox";
import CIcon from "@coreui/icons-react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DocsLink } from "../../../reusable";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import usersData from "../../../views/users/UsersData";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import functionController from "../../../helpers/FunctionController";

const fields = [
  // 'districtId',
  {
    key: "provinceName1",
    label: "จังหวัด",
  },
  {
    key: "districtCode",
    label: "รหัสอำเภอ",
  },
  {
    key: "districtName1",
    label: "ชื่ออำเภอ 1",
  },
  {
    key: "districtName2",
    label: "ชื่ออำเภอ 2",
  },
  {
    key: "districtName3",
    label: "ชื่ออำเภอ 3",
  },
  {
    key: "districtDesc",
    label: "รายละเอียด",
  },
  {
    key: "isActive",
    label: "สถานะ",
  },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const useStyles = makeStyles({
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
});

const District = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [district, setDistrict] = useState([]);
  // const [items, setItems] = useState([]);
  const [modal, setModal] = useState(true);
  const [primary, setPrimary] = useState(false);
  const [danger, setDanger] = useState(false);
  const [items, setItems] = useState([]);
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [provinceId, setprovinceId] = useState(0);
  const [districtName1, setdistrictName1] = useState("");
  const [districtName2, setdistrictName2] = useState("");
  const [districtName3, setdistrictName3] = useState("");
  const [districtDesc, setdistrictDesc] = useState("");
  const [provinceList, setProvinceList] = useState([]);
  const [errortext, seterrortxt] = useState(Constant.inValidNullMessage);
  const [errortext1, seterrortxt1] = useState("ซ้ำในระบบ");
  const [checkDistrict, setcheckDistrict] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [validations, setValidate] = useState(false);
  const [validation, setValidates] = useState(false);
  const [districtCode, setdistrictCode] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [validAlert, setValidAlert] = useState(false);
  const [invalidMaterialFormSearch, setInvalidMaterialFormSearch] =
    useState(false);
  const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState(false);
  const [invalidMaterialFormEdit, setInvalidMaterialFormEdit] = useState(false);
  const options = {
    method: "POST",
  };

  const pageCode = "";

  const classes = useStyles();

  const toggleDetails = (index, id) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [details, index];
      if (!isLoadingData) {
        fnGetDistrictListById(id);
      }
    }
    setDetails(newDetails);

    // fnGetDistrictList()
  };

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
    }
    setCollapseMulti(newCollapse);
  };
  const toggle = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const onClickAddCheck = () => {
    if (validations === true) {
    } else {
      setValidate(false);
      if (getIsValidForm("District-need-validation")) {
        setPrimary(!primary);
      }
    }
  };

  const onClickAddCheck2 = (item) => {
    console.log(checkDistrict);
    // if (items) {
    //   setcheckDistrict(true)
    //   seterrortxt1('ซ้ำในระบบ')
    // } else {
    //   setcheckDistrict(false)
    //   seterrortxt1('')
    // }
    if (checkDistrict === true) {
      setValidAlert(true);
      seterrortxt1("ซ้ำในระบบ");
    } else {
      setValidAlert(false);
      // seterrortxt1('ซ้ำในระบบ')
      setPrimary(!primary);
      // if (getIsValidForm("DistrictCode-need-validation")) {

      // }
    }
  };

  const findprovinceName = (item) => {
    const pp = provinceList.find((x) => x.provinceId === item.provinceId);
    console.log(pp);
    return <ul>{pp.provinceName1}</ul>;
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

  const collap = () => {
    return (
      <CCollapse show={collapse}>
        <Box
          className="border-set"
          component={Grid}
          item
          boxShadow={1}
          xs={{
            width: " 100%",
          }}
        >
          <CCard className="p-3">
            <CForm className="District-need-validation">
              <CRow>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> {Constant.arrFieldAddDistrict[0]}</CLabel>
                    {/* <CSelect className="form-control" onChange={handleChangeC} required>
                  <option value={''} >กรุณาเลือกจังหวัด  </option>
                  {provinceList.map((provinceList) => <option value={provinceList.provinceId} >{provinceList.provinceName1}  </option>)}
                </CSelect> */}
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
                        onChange={(event, value) =>
                          setprovinceId(value.provinceId)
                        }
                        id="add-province-name"
                        options={provinceList}
                        style={{ fontFamily: "Scg" }}
                        size="small"
                        getOptionLabel={(option) => `${option.provinceName1}`}
                        renderOption={(option) => {
                          return (
                            <Typography
                              className={classes.comboOptions}
                              value={option.provinceId}
                            >
                              {option.provinceName1}
                            </Typography>
                          );
                        }}
                        renderInput={(params) => {
                          params.inputProps.className = classes.comboOptions;
                          return (
                            <TextField
                              size="small"
                              error={invalidMaterialFormAdd}
                              {...params}
                              label={
                                <Typography className={classes.label}>
                                  {Constant.txtformPlaceholderSelected}
                                </Typography>
                              }
                              helperText={
                                invalidMaterialFormAdd
                                  ? Constant.inValidNullMessage
                                  : null
                              }
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
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> {Constant.arrFieldAddDistrict[1]}</CLabel>
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
                        invalid={validations}
                        id="In-districtcode"
                        type="text"
                        onChange={handleChange}
                        required
                      />

                      <CInvalidFeedback>{errortext}</CInvalidFeedback>
                    </Box>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> {Constant.arrFieldAddDistrict[2]}</CLabel>
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
                        id="In-districtName1"
                        name="nf-email"
                        value={districtName1}
                        onChange={(event) => {
                          setdistrictName1(event.target.value);
                        }}
                        required
                      />

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> {Constant.arrFieldAddDistrict[3]}</CLabel>
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
                        id="In-districtName2"
                        name="nf-email"
                        value={districtName2}
                        onChange={(event) => {
                          setdistrictName2(event.target.value);
                        }}
                      />

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> {Constant.arrFieldAddDistrict[4]}</CLabel>
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
                        id="In-districtName3"
                        name="nf-email"
                        value={districtName3}
                        onChange={(event) => {
                          setdistrictName3(event.target.value);
                        }}
                      />

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel> {Constant.arrFieldAddDistrict[5]}</CLabel>
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
                        id="In-districtDesc"
                        name="nf-email"
                        value={districtDesc}
                        onChange={(event) => {
                          setdistrictDesc(event.target.value);
                        }}
                      />

                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel className="mt-1" class="align-top">
                      &nbsp; {Constant.arrFieldAddDistrict[6]}
                    </CLabel>
                    &nbsp;
                    <CSwitch
                      className={"mx-1"}
                      variant={"3d"}
                      id="In-Status"
                      color={"success"}
                      onChange={(event) => {
                        setisActive(event.target.checked);
                      }}
                      value={isActive}
                      defaultChecked={false}
                      labelOn={"\u2713"}
                      labelOff={"\u2715"}
                    />
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
                        color="success"
                        onClick={onClickAddCheck}
                      >
                        {Constant.btSave}
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
                        onClick={OnclickClear}
                      >
                        {Constant.btCancel}
                      </CButton>
                    </Box>
                  </CFormGroup>
                </CCol>
              </CRow>

              <CModal
                show={primary}
                onClose={() => setPrimary(!primary)}
                color="success"
              >
                <CModalHeader closeButton>
                  <h5>
                    <CModalTitle>
                      {" "}
                      {Constant.titleConfirmChangeData}
                    </CModalTitle>
                  </h5>
                </CModalHeader>
                <CModalBody> {Constant.contentConfirmAddData}</CModalBody>
                <CModalFooter>
                  <CButton
                    color="success"
                    onClick={insertDistrict(
                      provinceId,
                      districtCode,
                      districtName1,
                      districtName2,
                      districtName3,
                      districtDesc,
                      isActive
                    )}
                  >
                    {" "}
                    {/*addCountry(countryCode, countryNameEng, countryNameThai, isActive)*/}
                    {Constant.btOK}
                  </CButton>{" "}
                  <CButton
                    color="secondary"
                    onClick={() => setPrimary(!primary)}
                  >
                    {Constant.btCancel}
                  </CButton>
                </CModalFooter>
              </CModal>
            </CForm>
          </CCard>
        </Box>
      </CCollapse>
    );
  };

  const OnclickClear = () => {
    document.getElementById("In-districtcode").value = "";
    document.getElementById("In-districtName1").value = "";
    document.getElementById("In-districtName2").value = "";
    document.getElementById("In-districtName3").value = "";
    document.getElementById("In-districtDesc").value = "";
    document.getElementById("In-Status").checked = false;
  };

  const maintable = () => {
    return (
      <CCard className="p-2">
        <CDataTable
          columnFilter
          tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
          itemsPerPageSelect={{ label: "จำนวนหน้า" }}
          items={district}
          fields={fields}
          // striped
          bordered
          size="sm"
          itemsPerPage={10}
          pagination
          scopedSlots={{
            isActive: (item, index) => {
              return (
                <td className="py-2 text-center">
                  {item.isActive ? (
                    (console.log(item.isActive),
                    (
                      <CIcon
                        name="cil-check-circle"
                        style={{ color: "green" }}
                        size="2xl"
                      />
                    ))
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
            // provinceId: (item, index) => {
            //   return (
            //     <td className="py-2">
            //       {findprovinceName(item)}
            //       {/* {provinceList.map((provinceList) => {<option value={provinceList.provinceId} >{provinceList.provinceName1}  </option>})} */}
            //     </td >
            //   );
            // },
            show_details: (item, index) => {
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
                    <CButton
                      color="primary"
                      variant="outline"
                      block
                      size="sm"
                      onClick={() => {
                        toggleDetails(index, item.districtId);
                      }}
                    >
                      {details.includes(index) ? "ซ่อน" : "แสดง"}
                    </CButton>
                  </Box>
                </td>
              );
            },
            details: (item, index) => {
              if (details.includes(index)) {
                if (isLoadingData) {
                  return (
                    <div>
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
                        </CCol>
                      </CRow>
                      {showLoadingData()}
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
                        </CCol>
                      </CRow>
                    </div>
                  );
                } else if (items.length) {
                  // var dataShow = [...items]
                  return (
                    <CCollapse show={details.includes(index)}>
                      <CCardBody>
                        <CRow className="text-left">
                          {/* <CLabel htmlFor="nf-email">
                            {item.districtId} : 
                          </CLabel> */}

                          <CCol xs="12" sm="6" md="2">
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">
                                  {" "}
                                  {Constant.arrFieldAddDistrict[0]}
                                </CLabel>
                                {/* <CSelect className="form-control" value={items[0].provinceId} onChange={handleChangeUpdateField(0, 'provinceId', items[0].provinceId)}>
                                {provinceList.map((provinceList) => <option value={provinceList.provinceId} >{provinceList.provinceName1}  </option>)}
                              </CSelect> */}
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
                                    onChange={handleChangeUpdateField(
                                      0,
                                      "provinceId",
                                      items[0].provinceId
                                    )}
                                    id="add-province-name"
                                    options={provinceList}
                                    style={{ fontFamily: "Scg" }}
                                    size="small"
                                    defaultValue={provinceList.find(
                                      (x) =>
                                        x.provinceId === items[0].provinceId
                                    )}
                                    getOptionLabel={(option) =>
                                      `${option.provinceName1}`
                                    }
                                    renderOption={(option) => {
                                      return (
                                        <Typography
                                          className={classes.comboOptions}
                                          value={option.provinceId}
                                        >
                                          {option.provinceName1}
                                        </Typography>
                                      );
                                    }}
                                    renderInput={(params) => {
                                      params.inputProps.className =
                                        classes.comboOptions;
                                      return (
                                        <TextField
                                          size="small"
                                          error={invalidMaterialFormAdd}
                                          {...params}
                                          label={
                                            <Typography
                                              className={classes.label}
                                            >
                                              {
                                                Constant.txtformPlaceholderSelected
                                              }
                                            </Typography>
                                          }
                                          helperText={
                                            invalidMaterialFormAdd
                                              ? Constant.inValidNullMessage
                                              : null
                                          }
                                          variant="outlined"
                                        />
                                      );
                                    }}
                                  />
                                </Box>
                              </CFormGroup>
                            </CForm>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CForm
                              action=""
                              method="post"
                              className="DistrictCode-need-validation"
                            >
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">
                                  {" "}
                                  {Constant.arrFieldAddDistrict[1]}
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
                                    invalid={validAlert}
                                    type="text"
                                    id="nf-email"
                                    name="nf-email"
                                    value={items[0].districtCode}
                                    onChange={handleChangeUpdateField(
                                      0,
                                      "districtCode",
                                      items[0].districtCode
                                    )}
                                    placeholder={items[0].districtCode}
                                    required
                                  />
                                </Box>
                                <CInvalidFeedback>
                                  {errortext1}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CForm>
                          </CCol>

                          <CCol xs="12" sm="6" md="2">
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">
                                  {" "}
                                  {Constant.arrFieldAddDistrict[2]}
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
                                    id="nf-email"
                                    name="nf-email"
                                    value={items[0].districtName1}
                                    onChange={handleChangeUpdateField(
                                      0,
                                      "districtName1",
                                      items[0].districtName1
                                    )}
                                    placeholder={items[0].districtName1}
                                    autoComplete="email"
                                  />
                                </Box>
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                              </CFormGroup>
                            </CForm>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">
                                  {" "}
                                  {Constant.arrFieldAddDistrict[3]}
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
                                    id="nf-email"
                                    name="nf-email"
                                    value={items[0].districtName2}
                                    onChange={handleChangeUpdateField(
                                      0,
                                      "districtName2",
                                      items[0].districtName2
                                    )}
                                    placeholder={items[0].districtName2}
                                    autoComplete="email"
                                  />
                                </Box>
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                              </CFormGroup>
                            </CForm>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">
                                  {" "}
                                  {Constant.arrFieldAddDistrict[4]}
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
                                    id="nf-email"
                                    name="nf-email"
                                    value={items[0].districtName3}
                                    onChange={handleChangeUpdateField(
                                      0,
                                      "districtName3",
                                      items[0].districtName3
                                    )}
                                    placeholder={items[0].districtName3}
                                    autoComplete="email"
                                  />
                                </Box>
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                              </CFormGroup>
                            </CForm>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CForm action="" method="post">
                              <CFormGroup>
                                <CLabel htmlFor="nf-email">
                                  {" "}
                                  {Constant.arrFieldAddDistrict[5]}
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
                                    id="nf-email"
                                    name="nf-email"
                                    value={items[0].districtDesc}
                                    onChange={handleChangeUpdateField(
                                      0,
                                      "districtDesc",
                                      items[0].districtDesc
                                    )}
                                    placeholder={items[0].districtDesc}
                                    autoComplete="email"
                                  />
                                </Box>
                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                              </CFormGroup>
                            </CForm>
                          </CCol>
                        </CRow>
                        <CRow className="text-left">
                          <CCol xs="12" sm="6" md="2">
                            <CForm action="" method="post">
                              <CFormGroup>
                                {/* <CLabel htmlFor="nf-email">
                                  &nbsp; &nbsp;สถานะ
                                </CLabel>
                                <Checkbox
                                  defaultChecked={items[0].isActive}
                                  color="primary"
                                  value={items[0].isActive}
                                  onChange={handleChangeUpdateField(0, 'isActive', items[0].isActive)}
                                  inputProps={{
                                    "aria-label": "secondary checkbox",
                                  }}
                                /> */}
                                <CLabel className="mt-1" class="align-top">
                                  &nbsp; {Constant.arrFieldAddDistrict[6]}
                                </CLabel>
                                &nbsp;
                                <CSwitch
                                  className={"mx-1"}
                                  variant={"3d"}
                                  color={"success"}
                                  onChange={handleChangeUpdateField(
                                    0,
                                    "isActive",
                                    items[0].isActive
                                  )}
                                  checked={items[0].isActive}
                                  defaultChecked={false}
                                  labelOn={"\u2713"}
                                  labelOff={"\u2715"}
                                />
                              </CFormGroup>
                            </CForm>
                          </CCol>
                        </CRow>

                        <CRow className="row justify-content-center">
                          <CCol xs="10" sm="6" md="1">
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
                                  type="submit"
                                  size={Constant.btAddSize}
                                  block
                                  color="primary"
                                  onClick={onClickAddCheck2}
                                >
                                  {Constant.btEditData}
                                </CButton>
                              </Box>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="10" sm="6" md="1">
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
                                  onClick={() => setDanger(!danger)}
                                >
                                  {Constant.btDeleteData}
                                </CButton>
                              </Box>
                            </CFormGroup>
                          </CCol>
                        </CRow>

                        <CModal
                          show={primary}
                          onClose={() => setPrimary(!primary)}
                          color="success"
                        >
                          <CModalHeader closeButton>
                            <h5>
                              <CModalTitle>
                                {" "}
                                {Constant.titleConfirmChangeData}
                              </CModalTitle>
                            </h5>
                          </CModalHeader>
                          <CModalBody className="text-left">
                            {Constant.contentConfirmEditData}
                          </CModalBody>
                          <CModalFooter>
                            <CButton
                              color="success"
                              onClick={onClickEditData(0)}
                            >
                              {Constant.btOK}
                            </CButton>{" "}
                            <CButton
                              color="secondary"
                              onClick={() => setPrimary(!primary)}
                            >
                              {Constant.btCancel}
                            </CButton>
                          </CModalFooter>
                        </CModal>
                        <CModal
                          show={danger}
                          onClose={() => setDanger(!danger)}
                          color="danger"
                        >
                          <CModalHeader closeButton>
                            <CModalTitle>
                              {" "}
                              {Constant.titleConfirmChangeData}
                            </CModalTitle>
                          </CModalHeader>
                          <CModalBody className="text-left">
                            {Constant.contentConfirmDeleteData}
                          </CModalBody>
                          <CModalFooter>
                            <CButton
                              color="danger"
                              onClick={deleteDistrict(item.districtId)}
                            >
                              {Constant.btOK}
                            </CButton>{" "}
                            <CButton
                              color="secondary"
                              onClick={() => setDanger(!danger)}
                            >
                              {Constant.btCancel}
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CCardBody>
                    </CCollapse>
                  );
                }
              }
            },
          }}
        />
      </CCard>
    );
  };

  const handleChangeUpdateField = (index, target, item) => (e, value) => {
    let newArr = [...items];
    if (target === "districtId") {
      newArr[index].countryCode = e.target.value;
    } else if (target === "provinceId") {
      // console.log(e.target.value)
      console.log(value.provinceId);
      newArr[index].provinceId = value.provinceId;
    } else if (target === "districtCode") {
      newArr[index].districtCode = e.target.value;
      items.map((x) => x.districtCode === e.target.value);
      if (item === e.target.value) {
        setcheckDistrict(false);
        console.log(item);
        console.log(e.target.value);
      } else {
        if (items) {
          setcheckDistrict(true);
        }
      }
    } else if (target === "districtName1")
      newArr[index].districtName1 = e.target.value;
    else if (target === "isActive") newArr[index].isActive = e.target.checked;
    else if (target === "districtName2")
      newArr[index].districtName2 = e.target.value;
    else if (target === "districtName3")
      newArr[index].districtName3 = e.target.value;
    else if (target === "districtDesc")
      newArr[index].districtDesc = e.target.value;

    setItems(newArr);
    console.log(newArr);
  };

  const onClickEditData = (index) => (e) => {
    // setIsConfirmEdit(!isConfirmEdit);
    let newArr = [...items];
    console.log(newArr);
    var districtId = newArr[index].districtId;
    var provinceId = newArr[index].provinceId;
    var districtCode = newArr[index].districtCode;
    var districtName1 = newArr[index].districtName1;
    var districtName2 = newArr[index].districtName2;
    var districtName3 = newArr[index].districtName3;
    var districtDesc = newArr[index].districtDesc;
    var isActive = newArr[index].isActive;
    // var updateBy = 1;
    var arrObj = [
      districtId,
      provinceId,
      districtCode,
      districtName1,
      districtName2,
      districtName3,
      districtDesc,
      isActive,
    ];
    console.log(arrObj);
    editDistrict(
      arrObj[0],
      arrObj[1],
      arrObj[2],
      arrObj[3],
      arrObj[4],
      arrObj[5],
      arrObj[6],
      arrObj[7]
    );
  };
  const fnGetProvinceList = () => {
    Repository.fetchGetProvinceList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // console.log(result.data.filter((x) => x.countryId === 213))
          setProvinceList(result.data.filter((x) => x.countryId === 213));
        } else {
          setError(result);
        }
      },
      (error) => {
        console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetDistrictListById = (districtId) => {
    setIsLoadingData(true);
    Repository.fecthGetDistrictById(districtId).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          var Arr = [];
          // if (countryList.length) {

          //   Arr = [...countryList]
          // }
          // Arr.push(result.data)
          setItems(result.data);
          console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        setError(error);
      }
    );
  };

  const handleChangeC = (event) => {
    console.log(event.target.value);
    // alert(event.target.value)
    setprovinceId(event.target.value);
  };

  const handleChange = (event) => {
    const aa = district.find((x) => x.districtCode == event.target.value);
    if (aa) {
      console.log("ซ้ำ");
      seterrortxt("District Code ซ้ำในระบบ...");
      setValidate(true);
    } else {
      setdistrictCode(event.target.value);
      seterrortxt("");
      setValidate(false);
    }
  };

  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const insertDistrict =
    (
      provinceId,
      districtCode,
      districtName1,
      districtName2,
      districtName3,
      districtDesc,
      isActive
    ) =>
    (e) => {
      Repository.fetchAddDistrictList(
        provinceId,
        districtCode,
        districtName1,
        districtName2,
        districtName3,
        districtDesc,
        isActive
      ).then(
        (result) => {
          if (result.httpCode === "200") window.location.reload(false);
          else console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
      setPrimary(!primary);
      // window.location.reload();
    };

  // const fnGetDistrictList = () => {
  //   Repository.fetchGetDistrictList()
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         if (result.httpCode === "200") {
  //           setItems(result.data)
  //         }
  //         else {
  //           console.log(result);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  // }

  const editDistrict = (
    districtId,
    provinceId,
    districtCode,
    districtName1,
    districtName2,
    districtName3,
    districtDesc,
    isActive
  ) => {
    Repository.fetchEditDistrictList(
      districtId,
      provinceId,
      districtCode,
      districtName1,
      districtName2,
      districtName3,
      districtDesc,
      isActive
    ).then(
      (result) => {
        if (result.httpCode === "200") window.location.reload(false);
        else console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    setPrimary(!primary);
    window.location.reload();
  };

  const deleteDistrict = (districtId) => (e) => {
    Repository.fetchDeleteDistrictList(districtId).then(
      (result) => {
        if (result.httpCode === "200") window.location.reload(false);
        else console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    setDanger(!danger);
    window.location.reload();
  };

  const fnGetDistrictList = () => {
    Repository.fetchGetDistrictList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          result.data.map((x) => {
            if (x.districtDesc == null) {
              x.districtDesc = "";
            }
          });
          setDistrict(functionController.setEmptyValueInArray(result.data));
          console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        console.log(error);
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
    fnGetProvinceList();

    fnGetDistrictList();
  }, []);

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">Fetch Error : {error.message}</div>
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return <div className="content-wrapper">{showLoadingData()}</div>;
  } else if (provinceList.length) {
    return (
      <div>
        <h6>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <h3 className="headertable">
                        {Constant.txtHeaderDistrict}
                      </h3>
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
                          onClick={toggle}
                        >
                          {Constant.btAddData}
                        </CButton>
                      </Box>
                    </CCol>
                  </CRow>
                  {collap()}
                  <CCol></CCol>
                </CCardHeader>
                <CCardBody>{maintable()}</CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  } else {
    return null;
  }
};

export default District;
