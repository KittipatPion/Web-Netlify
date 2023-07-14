import React, { useState, useEffect } from "react";
import Repository from "../../../repositories/Repository";
import Constant from "../../../helpers/Constant";
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
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CSpinner,
  CDropdownToggle,
  CDropdownDivider,
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
  CSelect,
} from "@coreui/react";
import Checkbox from "@material-ui/core/Checkbox";
import CIcon from "@coreui/icons-react";
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
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import usersData from "../../../views/users/UsersData";
import { Input } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import functionController from "../../../helpers/FunctionController";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      )
    : isoCode;
}

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
  input: {
    height: 300,
  },
});

const fields = [
  {
    key: "countryNameThai",
    label: "ประเทศ",
  },
  {
    key: "provinceCode",
    label: "รหัสจังหวัด",
  },
  {
    key: "provinceName1",
    label: "ชื่อจังหวัด 1",
  },
  {
    key: "provinceName2",
    label: "ชื่อจังหวัด 2",
  },
  {
    key: "provinceName3",
    label: "ชื่อจังหวัด 3",
  },
  {
    key: "provinceDesc",
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

const Province = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);
  // const [items,setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [province, setProvince] = useState([]);
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [collapseMulti, setCollapseMulti] = useState([false, false]);
  const [countryId, setcountryId] = useState("");
  const [countryName, setcountryName] = useState([]);
  const [provinceCode, setprovinceCode] = useState();
  const [provinceName1, setprovinceName1] = useState();
  const [provinceName2, setprovinceName2] = useState();
  const [provinceName3, setprovinceName3] = useState();
  const [runningNo, setRunningNo] = useState(null);
  const [provinceDesc, setprovinceDesc] = useState();
  const [isActive, setisActive] = useState(false);
  const [primary, setPrimary] = useState(false);
  const [danger, setDanger] = useState(false);
  const [IsWarnning, setIsWarning] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [invalidMaterialFormSearch, setInvalidMaterialFormSearch] =
    useState(false);
  const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState(false);
  const [invalidMaterialFormEdit, setInvalidMaterialFormEdit] = useState(false);
  const [items, setItems] = useState([]);
  const [isPostingData, setIsPostingData] = useState(false);
  // const [isLoadingData, setIsLoadingData] = useState(false);
  const options = {
    method: "POST",
  };
  const [contrySelect, setContrySelect] = useState([]);
  const itemThai = [
    {
      countryNameThai: "ไทย",
    },
  ];

  const classes = useStyles();

  const pageCode = "";

  const toggleDetails = (index, id) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [details, index];
      if (!isLoadingData) {
        fnGetProvinceListById(id);
      }
    }

    setDetails(newDetails);
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
    clearData();
  };
  const clearData = () => {
    setcountryId("");
    setprovinceName1("");
    setprovinceName2("");
    setprovinceName3("");
    setprovinceCode("");
    setprovinceDesc("");
    setisActive(false);
  };

  const fnGetProvinceListById = (provinceId) => {
    setIsLoadingData(true);
    Repository.fecthGetProvinceById(provinceId).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setItems(result.data);
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

  const handleChangeUpdateField = (index, target) => (e, value) => {
    let newArr = [...items];
    if (target === "provinceId") {
      newArr[index].provinceId = e.target.value;
    } else if (target === "countryId") {
      console.log(value.countryId);
      newArr[index].countryId = value.countryId;
    } else if (target === "provinceCode")
      newArr[index].provinceCode = e.target.value;
    else if (target === "provinceName1")
      newArr[index].provinceName1 = e.target.value;
    else if (target === "provinceName2")
      newArr[index].provinceName2 = e.target.value;
    else if (target === "provinceName3")
      newArr[index].provinceName3 = e.target.value;
    else if (target === "provinceDesc")
      newArr[index].provinceDesc = e.target.value;
    else if (target === "isActive") newArr[index].isActive = e.target.checked;
    setItems(newArr);
    console.log(newArr);
  };

  const onClickEditData = (index) => (e) => {
    // setIsConfirmEdit(!isConfirmEdit);
    let newArr = [...items];
    console.log(newArr);
    var countryId = newArr[index].countryId;
    var provinceId = newArr[index].provinceId;
    var countryId = newArr[index].countryId;
    var provinceCode = newArr[index].provinceCode;
    var provinceName1 = newArr[index].provinceName1;
    var provinceName2 = newArr[index].provinceName2;
    var provinceName3 = newArr[index].provinceName3;
    var provinceDesc = newArr[index].provinceDesc;
    var isActive = newArr[index].isActive;
    // var updateBy = 1;
    var arrObj = [
      provinceId,
      countryId,
      provinceCode,
      provinceName1,
      provinceName2,
      provinceName3,
      provinceDesc,
      isActive,
    ];
    // console.log(arrObj);
    editProvince(
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

  const onClickAddCheck = () => {
    var check = province.find((x) => x.provinceCode === provinceCode);
    if (!check) {
      if (getIsValidForm("district-needs-validation") && countryId !== "") {
        if (invalidMaterialFormAdd) {
          setInvalidMaterialFormAdd(false);
        }

        setPrimary(!primary);
      } else {
        if (countryId === "") {
          setInvalidMaterialFormAdd(true);
        } else {
          if (invalidMaterialFormAdd) {
            setInvalidMaterialFormAdd(false);
          }
        }
      }
    } else {
      setIsWarning(!IsWarnning);
    }
  };
  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const findCountryName = (item) => {
    const pp = countryName.find((x) => x.countryId === item.countryId);
    return <ul>{pp.countryNameThai}</ul>;
  };

  const editContrySelect = (e) => {
    console.log(e.target.value);
    // handleChangeUpdateField(0, 'countryId',value.countryId)
  };
  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#ED1B24",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    fontFamily: "Scg",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.countryCode} </span>)
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  const maintable = () => {
    return (
      <CDataTable
        columnFilter
        tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
        itemsPerPageSelect={{ label: "จำนวนหน้า" }}
        items={province}
        fields={fields}
        // hover
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
                      toggleDetails(index, item.provinceId);
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
                  <CCardBody>
                    {/* <CProgress sm animated value={100} className="mb-3" color='danger' /> */}
                    {showLoadingData()}
                  </CCardBody>
                );
              } else if (items.length) {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <CRow>
                        <CLabel htmlFor="nf-email"></CLabel>
                        <CRow>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                {" "}
                                &nbsp; &nbsp;{Constant.arrFieldAddProvince[0]}
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
                                  onChange={handleChangeUpdateField(
                                    0,
                                    "countryId"
                                  )}
                                  id="add-province-name"
                                  options={countryName}
                                  style={{ fontFamily: "Scg" }}
                                  size="small"
                                  defaultValue={countryName.find(
                                    (x) => x.countryId === items[0].countryId
                                  )}
                                  getOptionLabel={(option) =>
                                    `${option.countryNameThai}`
                                  }
                                  renderOption={(option) => {
                                    return (
                                      <Typography
                                        className={classes.comboOptions}
                                        value={option.countryId}
                                      >
                                        {"[" +
                                          option.countryCode +
                                          "] " +
                                          option.countryNameThai}
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
                                          <Typography className={classes.label}>
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
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                {Constant.arrFieldAddProvince[1]}
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
                                  value={items[0].provinceCode}
                                  onChange={handleChangeUpdateField(
                                    0,
                                    "provinceCode"
                                  )}
                                  placeholder={items[0].provinceCode}
                                  autoComplete="email"
                                />
                              </Box>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                {Constant.arrFieldAddProvince[2]}
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
                                  value={items[0].provinceName1}
                                  onChange={handleChangeUpdateField(
                                    0,
                                    "provinceName1"
                                  )}
                                  placeholder={items[0].provinceName1}
                                  autoComplete="email"
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                {Constant.arrFieldAddProvince[3]}
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
                                  value={items[0].provinceName2}
                                  onChange={handleChangeUpdateField(
                                    0,
                                    "provinceName2"
                                  )}
                                  placeholder={items[0].provinceName2}
                                  autoComplete="email"
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                {Constant.arrFieldAddProvince[4]}
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
                                  value={items[0].provinceName3}
                                  onChange={handleChangeUpdateField(
                                    0,
                                    "provinceName3"
                                  )}
                                  placeholder={items[0].provinceName3}
                                  autoComplete="email"
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                {Constant.arrFieldAddProvince[5]}
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
                                  value={items[0].provinceDesc}
                                  onChange={handleChangeUpdateField(
                                    0,
                                    "provinceDesc"
                                  )}
                                  placeholder={items[0].provinceDesc}
                                  autoComplete="email"
                                />
                              </Box>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12" sm="6" md="2">
                            <CFormGroup>
                              <CLabel className="mt-1" class="align-top">
                                &nbsp; {Constant.arrFieldAddProvince[6]}
                              </CLabel>
                              &nbsp;
                              <CSwitch
                                className={"mx-1"}
                                variant={"3d"}
                                color={"success"}
                                onChange={handleChangeUpdateField(
                                  index,
                                  "isActive"
                                )}
                                checked={items[0].isActive}
                                defaultChecked={items[0].isActive}
                                labelOn={"\u2713"}
                                labelOff={"\u2715"}
                              />
                              {/* <Checkbox
                                defaultChecked={items[0].isActive}
                                color="primary"
                                // value={items[0].isActive}
                                onChange={handleChangeUpdateField(0, 'isActive')}
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              /> */}
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CRow>
                      <CRow className="justify-content-center">
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
                              size="sm"
                              color="primary"
                              block
                              onClick={() => setPrimary(!primary)}
                            >
                              {Constant.btEditData}
                            </CButton>
                          </Box>
                        </CCol>
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
                              size="sm"
                              color="danger"
                              block
                              onClick={() => setDanger(!danger)}
                            >
                              {Constant.btDeleteData}
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
                            <CModalTitle>
                              {" "}
                              {Constant.titleConfirmChangeData}
                            </CModalTitle>
                          </h5>
                        </CModalHeader>
                        <CModalBody>
                          {Constant.contentConfirmEditData}
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="success" onClick={onClickEditData(0)}>
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
                        <CModalBody>
                          {Constant.contentConfirmDeleteData}
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            color="danger"
                            onClick={deleteProvince(item.provinceId)}
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
    );
  };

  const handleCountry = (event) => {
    console.log(document.getElementById("add-province-name").value);
    setContrySelect(event.target.value);
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
            <CForm className="district-needs-validation" novalidate>
              <CRow>
                <CLabel htmlFor="nf-email"></CLabel>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>{Constant.arrFieldAddProvince[0]}</CLabel>
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
                          setcountryId(value.countryId)
                        }
                        id="add-province-name"
                        options={countryName}
                        style={{ fontFamily: "Scg" }}
                        size="small"
                        getOptionLabel={(option) => `${option.countryNameThai}`}
                        renderOption={(option) => {
                          return (
                            <Typography
                              className={classes.comboOptions}
                              value={option.countryId}
                            >
                              {"[" +
                                option.countryCode +
                                "] " +
                                option.countryNameThai}
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
                              error={invalidMaterialFormAdd}
                              {...params}
                              size="small"
                              label={
                                <Typography className={classes.label}>
                                  {Constant.txtformPlaceholderSelected}
                                </Typography>
                              }
                              helperText={
                                invalidMaterialFormAdd ? (
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
                    <CLabel htmlFor="nf-email">
                      {Constant.arrFieldAddProvince[1]}
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
                        id="In-provinceCode"
                        name="nf-email"
                        value={provinceCode}
                        onChange={(event) => {
                          setprovinceCode(event.target.value);
                        }}
                        autoComplete="email"
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
                    <CLabel htmlFor="nf-email">
                      {Constant.arrFieldAddProvince[2]}
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
                        value={provinceName1}
                        onChange={(event) => {
                          setprovinceName1(event.target.value);
                        }}
                        autoComplete="email"
                        required
                      />{" "}
                    </Box>
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel htmlFor="nf-email">
                      {Constant.arrFieldAddProvince[3]}
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
                        value={provinceName2}
                        onChange={(event) => {
                          setprovinceName2(event.target.value);
                        }}
                        autoComplete="email"
                      />{" "}
                    </Box>
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel htmlFor="nf-email">
                      {Constant.arrFieldAddProvince[4]}
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
                        value={provinceName3}
                        onChange={(event) => {
                          setprovinceName3(event.target.value);
                        }}
                        autoComplete="email"
                      />{" "}
                    </Box>
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel htmlFor="nf-email">
                      {Constant.arrFieldAddProvince[5]}
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
                        value={provinceDesc}
                        onChange={(event) => {
                          setprovinceDesc(event.target.value);
                        }}
                        autoComplete="email"
                      />
                    </Box>
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup inline>
                    <CLabel className="mt-1" class="align-top">
                      &nbsp; {Constant.arrFieldAddProvince[6]}
                    </CLabel>
                    &nbsp;
                    <CSwitch
                      className={"mx-1"}
                      variant={"3d"}
                      color={"success"}
                      onChange={handleChange}
                      value={isActive}
                      defaultChecked={false}
                      labelOn={"\u2713"}
                      labelOff={"\u2715"}
                    />
                    {/* <Checkbox
                  color="primary"
                  value={isActive}
                  onChange={handleChange}
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                /> */}
                  </CFormGroup>
                </CCol>

                {/* <h5>
              <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                width: ' 100%'
              }}>
                <CButton className="editbutton" color="success" onClick={onClickAddCheck} className="mr-1">
                  บันทึก
                </CButton>
              </Box>
            </h5>
            <h5>
              <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                width: ' 100%'
              }}>
                <CButton className="editbutton" color="danger" onClick={toggle} className="mr-1">
                  ยกเลิก
                </CButton>
              </Box>
            </h5> */}
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
                        onClick={toggle}
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
                    <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
                  </h5>
                </CModalHeader>
                <CModalBody>{Constant.contentConfirmAddData}</CModalBody>
                <CModalFooter>
                  <CButton
                    color="success"
                    onClick={onClickAddData(
                      countryId,
                      provinceCode,
                      runningNo,
                      provinceName1,
                      provinceName2,
                      provinceName3,
                      provinceDesc,
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
  const handleChange = (event) => {
    setisActive(event.target.checked);
  };
  const handleChangeC = (event) => {
    // console.log(document.getElementById('country-select').value)
    console.log(event.target.value);
    // setcountryId(event.target.value)
  };
  // const insertURL =
  //   "http://192.168.88.138/PION.SCG.SMP.WebAPI/api/Location/InsertProvinceList";
  // const addProvince =
  //   (
  //     countryId,
  //     provinceCode,
  //     provinceName1,
  //     provinceName2,
  //     provinceName3,
  //     provinceDesc,
  //     isActive
  //   ) =>
  //   (e) => {
  //     console.log("1111");
  //     fetch(insertURL, {
  //       method: "POST",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({
  //         CountryId: countryId,
  //         ProvinceCode: provinceCode,
  //         RunningNo : null,
  //         ProvinceName1: provinceName1,
  //         ProvinceName2: provinceName2,
  //         ProvinceName3: provinceName3,
  //         ProvinceDesc: provinceDesc,
  //         IsActive: isActive,
  //       }),
  //     });

  //     setPrimary(!primary);
  //     window.location.reload();
  //   };

  const onClickAddData = (
    countryId,
    provinceCode,
    runningNo,
    provinceName1,
    provinceName2,
    provinceName3,
    provinceDesc,
    isActive
  ) => (e) => {
    setIsPostingData(true);
    Repository.fetchAddProvinceList(
      countryId,
      provinceCode,
      runningNo,
      provinceName1,
      provinceName2,
      provinceName3,
      provinceDesc,
      isActive
    ).then(
      (result) => {
        setIsPostingData(false);
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

  const editProvince = (
    provinceId,
    countryId,
    provinceCode,
    provinceName1,
    provinceName2,
    provinceName3,
    provinceDesc,
    isActive
  ) => {
    setIsPostingData(true);
    Repository.fetchEditProvinceList(
      provinceId,
      countryId,
      provinceCode,
      provinceName1,
      provinceName2,
      provinceName3,
      provinceDesc,
      isActive
    ).then(
      (result) => {
        setIsPostingData(false);
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

  const deleteProvince = (provinceId) => (e) => {
    setIsPostingData(true);
    Repository.fetchDeleteProvinceList(provinceId).then(
      (result) => {
        setIsPostingData(false);
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

  const getCountry = () => {
    setIsPostingData(true);
    Repository.fetchGetCountryList().then(
      (result) => {
        setIsLoaded(true);
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setcountryName(result.data);
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

  const changeObj = (item) => {
    console.log(item);
    if (item.countryId === "213") {
      return <CLabel>ไทย</CLabel>;
    }
  };
  const allModal = () => (
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

      {/* Start Add Modal */}
      {/* <CModal
            show={isAlertNoData}
            onClose={() => setIsAlertNoData(!isAlertNoData)}
            color="success"
        >
            <CModalHeader closeButton>
                <h5><CModalTitle  >{Constant.titleConfirmChangeData}</CModalTitle></h5>
            </CModalHeader>
            <CModalBody>
                {Constant.contentConfirmApprove}
            </CModalBody>
            <CModalFooter>
                <CButton color="success" >
                    {Constant.btOK}
                </CButton>{' '}
                <CButton color="secondary" onClick={() => setIsAlertNoData(!isAlertNoData)}>
                    {Constant.btCancel}
                </CButton>
            </CModalFooter>
        </CModal> */}
      {/* End Add Modal */}

      {/* Start Add Modal */}
      <CModal
        show={IsWarnning}
        onClose={() => setIsWarning(!IsWarnning)}
        color="warning"
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentWarningDuplicate}+ {Constant.arrFieldAddProvince[1]}
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => setIsWarning(!IsWarnning)}>
            {Constant.btOK}
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setIsWarning(!IsWarnning)}>
            {Constant.btCancel}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Add Modal */}
    </div>
  );

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

  const fnGetProvinceList = () => {
    Repository.fetchGetProvinceList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          result.data.map((x) => {
            if (x.provinceDesc === null) {
              x.provinceDesc = "";
            }
            if (x.provinceName2 === null) {
              x.provinceName2 = "";
            }
            if (x.provinceName3 === null) {
              x.provinceName3 = "";
            }
            // if (x.countryId === 213) {
            //   x.countryId = 'ไทย'
            // }
          });

          result.data.sort((a, b) => (a.provinceId > b.provinceId ? 1 : -1));
          setProvince(result.data);
        } else {
          console.log(result);
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
    }
    else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  useEffect(() => {
    fnGetProvinceList();
    getCountry();
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
  } else if (countryName.length) {
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
                        {Constant.txtHeaderProvince}
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
                <CCardBody>
                  <CCard className="p-2">
                    {maintable()}
                    {allModal()}
                  </CCard>
                </CCardBody>
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

export default Province;
