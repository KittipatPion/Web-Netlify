import React, { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Repository from "../../../../repositories/Repository";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Divider } from "@material-ui/core";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { MdSwitchAccount } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { MdEditOff } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { MdStickyNote2 } from "react-icons/md";
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
  CSwitch,
  CModalTitle,
  CInvalidFeedback,
  CLink,
  CSpinner,
  CInputFile,
  CTextarea,
  CSubheader,
  CBreadcrumbRouter,
  CRow,
  CButtonToolbar,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInputGroupPrepend,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import PropTypes, { object } from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Constant from "../../../../helpers/Constant";
import MakeStyleSheet from "../../../../helpers/MakeStyleSheet";
import FunctionController from "../../../../helpers/FunctionController";
import VariableController from "../../../../helpers/VariableController";

const fieldsPayment = [
  {
    key: "runningNo",
    label: "",
    sorter: false,
    filter: false,
  },
  {
    key: "expenseCode",
    label: `${Constant.arrFieldTransAppPaymentItems[0]}`,
  },
  {
    key: "costCenterCode",
    label: `${Constant.arrFieldTransAppPaymentItems[1]}`,
  },
  {
    key: "internalOrderNumber",
    label: `${Constant.arrFieldTransAppPaymentItems[2]}`,
  },
  {
    key: "assignment",
    label: `${Constant.arrFieldTransAppPaymentItems[3]}`,
  },
];

const fieldsInvoice = [
  {
    key: "manage",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },

  {
    key: "runningNo",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "fileName",
    label: "",
    sorter: false,
    filter: false,
  },
  {
    key: "documentTypeId",
    label: `${Constant.arrFieldTransAppPaymentDocument[0]}`,
  },
  {
    key: "paymentRunNo",
    label: `${Constant.arrFieldTransAppPaymentDocument[1]}`,
  },
  {
    key: "documentNo",
    label: `${Constant.arrFieldTransAppPaymentDocument[2]}`,
  },
  {
    key: "documentDate",
    label: `${Constant.arrFieldTransAppPaymentDocument[3]}`,
  },
  {
    key: "amount",
    _style: { width: "8%" },
    label: `${Constant.arrFieldTransAppPaymentDocument[4]}`,
  },
  {
    key: "vatAmount",
    _style: { width: "8%" },
    label: `${Constant.arrFieldTransAppPaymentDocument[5]}`,
  },
  {
    key: "totalAmount",
    _style: { width: "8%" },
    label: `${Constant.arrFieldTransAppPaymentDocument[6]}`,
  },
  {
    key: "refDocNo",
    label: `${Constant.arrFieldTransAppPaymentDocument[7]}`,
  },
  {
    key: "vendorTax",
    label: `${Constant.arrFieldTransAppPaymentDocument[8]}`,
  },
];

const fieldsApproveval = [
  {
    key: "firstName",
    label: `${Constant.arrFieldTransAppPaymentDocument[1]}`,
  },
];

const fieldsCC = [
  {
    key: "firstName",
    label: `${Constant.arrFieldTransAppPaymentDocument[2]}`,
  },
];

const fieldMain = [
  {
    key: "checkbox",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "attachFileStatus",
    label: `${Constant.arrFieldTransAppPaymentMain[0]}`,
  },
  {
    key: "paymentStatus",
    label: `${Constant.arrFieldTransAppPaymentMain[1]}`,
  },
  {
    key: "paymentNo",
    label: `${Constant.arrFieldTransAppPaymentMain[2]}`,
  },
  {
    key: "startDate",
    label: `${Constant.arrFieldTransAppPaymentMain[3]}`,
  },
  {
    key: "dueDate",
    label: `${Constant.arrFieldTransAppPaymentMain[4]}`,
  },
  {
    key: "durationDate",
    label: `${Constant.arrFieldTransAppPaymentMain[5]}`,
  },
  {
    key: "companyName",
    label: `${Constant.arrFieldTransAppPaymentMain[6]}`,
  },
  {
    key: "transporterName",
    label: `${Constant.arrFieldTransAppPaymentMain[7]}`,
  },
  {
    key: "transportMode",
    label: `${Constant.arrFieldTransAppPaymentMain[8]}`,
  },
  {
    key: "smptotalAmount",
    label: `${Constant.arrFieldTransAppPaymentMain[9]}`,
    digit: 2,
  },
  {
    key: "refNo",
    label: `${Constant.arrFieldTransAppPaymentMain[10]}`,
  },
  {
    key: "allPayNo",
    label: `${Constant.arrFieldTransAppPaymentMain[11]}`,
  },
  {
    key: "verifyName",
    label: `${Constant.arrFieldTransAppPaymentMain[12]}`,
  },
  {
    key: "approveName",
    label: `${Constant.arrFieldTransAppPaymentMain[13]}`,
  },
  {
    key: "rejectName",
    label: `${Constant.arrFieldTransAppPaymentMain[14]}`,
  },
  {
    key: "rejectReason",
    label: `${Constant.arrFieldTransAppPaymentMain[15]}`,
  },
];

const fieldTransportRate2 = [
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransDomDelTransport[11]}`,
  },
  {
    key: "rateTypeName",
    label: `${Constant.arrFieldTransDomDelTransport[0]}`,
  },
  {
    key: "price",
    label: `${Constant.arrFieldTransDomDelTransport[1]}`,
  },
  {
    key: "vat",
    label: `${Constant.arrFieldTransDomDelTransport[2]}`,
  },
  {
    key: "refName1",
    label: `${Constant.arrFieldTransDomDelTransport[3]}`,
  },
  {
    key: "refValue1",
    label: `${Constant.arrFieldTransDomDelTransport[4]}`,
  },
  {
    key: "refName2",
    label: `${Constant.arrFieldTransDomDelTransport[5]}`,
  },
  {
    key: "refValue2",
    label: `${Constant.arrFieldTransDomDelTransport[6]}`,
  },
  {
    key: "refName3",
    label: `${Constant.arrFieldTransDomDelTransport[7]}`,
  },
  {
    key: "refValue3",
    label: `${Constant.arrFieldTransDomDelTransport[8]}`,
  },
  {
    key: "refName4",
    label: `${Constant.arrFieldTransDomDelTransport[9]}`,
  },
  {
    key: "refValue4",
    label: `${Constant.arrFieldTransDomDelTransport[10]}`,
  },
];

const fieldExtraCharge = [
  {
    key: "ioNo",
    label: `${Constant.arrFieldTransDomDelExtraCharge[19]}`,
  },
  {
    key: "extraChargeStatus",
    label: `${Constant.arrFieldTransDomDelExtraCharge[17]}`,
  },
  {
    key: "shipmentNo",
    label: `${Constant.arrFieldTransDomDelExtraCharge[0]}`,
  },
  {
    key: "extraChargeType",
    label: `${Constant.arrFieldTransDomDelExtraCharge[1]}`,
  },
  {
    key: "extraChargeName",
    label: `${Constant.arrFieldTransDomDelExtraCharge[2]}`,
  },
  {
    key: "extraChargeQty",
    label: `${Constant.arrFieldTransDomDelExtraCharge[4]}`,
  },
  {
    key: "extraChargePrice",
    label: `${Constant.arrFieldTransDomDelExtraCharge[3]}`,
  },
  {
    key: "extraChargeTotalPrice",
    label: `${Constant.arrFieldTransDomDelExtraCharge[5]}`,
  },
  {
    key: "extraChargeDocNo",
    label: `${Constant.arrFieldTransDomDelExtraCharge[8]}`,
  },
  {
    key: "paymentDocNo",
    label: `${Constant.arrFieldTransDomDelExtraCharge[7]}`,
  },
  {
    key: "requestName1",
    label: `${Constant.arrFieldTransDomDelExtraCharge[9]}`,
  },
  {
    key: "requestValue1",
    label: `${Constant.arrFieldTransDomDelExtraCharge[10]}`,
  },
  {
    key: "requestName2",
    label: `${Constant.arrFieldTransDomDelExtraCharge[11]}`,
  },
  {
    key: "requestValue2",
    label: `${Constant.arrFieldTransDomDelExtraCharge[12]}`,
  },
  {
    key: "requestName3",
    label: `${Constant.arrFieldTransDomDelExtraCharge[13]}`,
  },
  {
    key: "requestValue3",
    label: `${Constant.arrFieldTransDomDelExtraCharge[14]}`,
  },
  {
    key: "requestName4",
    label: `${Constant.arrFieldTransDomDelExtraCharge[15]}`,
  },
  {
    key: "requestValue4",
    label: `${Constant.arrFieldTransDomDelExtraCharge[16]}`,
  },
];

const getBadge = (status) => {
  switch (status) {
    case "Complete":
      return "success";
    case "Approve":
      return "success";
    case "Match":
      return "success";
    case "Mismatch":
      return "danger";
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
    case "Open":
      return "success";
    case "Wait for Verify":
      return "secondary";
    case "Wait For Approve":
      return "info";
    case "Reject from Verify":
      return "warning";
    case "Reject from Approve":
      return "warning";
    default:
      return "primary";
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TabPanel = (props) => {
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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
  options: {
    backgroundColor: "red",
    fontSize: "14px",
    fontWeight: "normal",
    color: "grey ",
    fontFamily: "Scg",
  },
}));

const ApproveDomesticPayment = () => {
  const [error, setError] = useState(null);
  const [errorAPI, setErrorAPI] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [items, setItems] = useState({});
  const [baseItems, setBaseItems] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [paymentStatusList, setPaymentStatusList] = useState([]);

  const [changeStatusType, setChangeStatusType] = useState("");
  const [isShowApproveSuccess, setIsShowApproveSuccess] = useState(false);
  const [isShowRejectSuccess, setIsShowRejectSuccess] = useState(false);
  const [approveStatusList, setApproveStatusList] = useState([]);

  // Var for Start&End Date Search Form
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectItemsSearch, setSelectItemsSearch] = useState([
    {},
    {},
    {},
    {},
    {},
  ]);

  const [invalidFormSearch, setInvalidFormSearch] = useState([
    false,
    false,
    false,
  ]);
  const [invalidMaterialFormSearch, setInvalidMaterialFormSearch] = useState([
    false,
  ]);
  const [isConfirmChangeStatus, setIsConfirmChangeStatus] = useState(false);
  const [isShowDialogEdit, setisShowDialogEdit] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [isShowWarningSearch, setIsShowWarningSearch] = useState(false);
  const [collsFormSearch, setCollsFormSearch] = useState(true);

  const [roleUser, setRoleUser] = useState(null);

  const [value1, setValue1] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [indexEditForm, setIndexEditForm] = useState(null);
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed1, setCollapsed1] = React.useState(true);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [collapsed3, setCollapsed3] = React.useState(true);
  const [collapsed4, setCollapsed4] = React.useState(true);
  const [collapsed5, setCollapsed5] = React.useState(true);
  const [collapsed6, setCollapsed6] = React.useState(true);
  const [collapsed10, setCollapsed10] = React.useState(true);
  const [collapsed11, setCollapsed11] = React.useState(true);
  const [isShowDialogInvoice, setisShowDialogInvoice] = useState(false);
  const [isShowDialogVat, setisShowDialogVat] = useState(false);
  const [grApproveType, setGrApproveType] = useState([]);
  const [invoiceTax, setInvoiceTax] = React.useState([]);
  const [cbLocationCode, setCbLocationCode] = useState([]);
  const [cbPaymentType, setCbPaymentType] = useState([]);
  const [cbCurrencyType, setCbCurrencyType] = useState([]);
  const [cbDocumentType, setCbDocumentType] = useState([]);
  const [selectItemsCreatePayment, setSelectItemsCreatePayment] = useState([
    {},
    {},
    {},
    {},
  ]);
  const [companyList, setCompanyList] = useState([]);
  const [serviceTeam, setCbServiceTeam] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [indexFiles, setIndexFiles] = useState([{}, {}]);
  const [costItems, setCostItems] = useState([]);
  const [cbCompanyList, setCbCompanyList] = useState([]);
  const [cbCompanyCost, setCbCompanyCost] = useState([]);
  const [transportByMain, setTransportByMain] = useState([]);

  const [extrachargeData, setExtraChargeData] = useState([]);
  const [shipmentData, setShipmentData] = useState([]);
  const [supportfile, setSupportFile] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);

  const [userRequestorList, setUserRequestorList] = useState([]);
  const [userApproveList, setUserApproveList] = useState([]);
  const [userCCList, setUserCCList] = useState([]);
  const [userReviewerList, setUserReviewerList] = useState([]);

  const [userApproveListItems, setUserApproveListItems] = useState({});
  const [userCCListItems, setUserCCListItems] = useState([]);
  const [userReviewerListItems, setUserReviewerListItems] = useState([]);

  const [testShow, setTestShow] = useState(false);
  const [editData, setEditData] = useState([]);

  const [isEdit, setIsEdit] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [actualVat, setActualVat] = useState([]);
  const [actualAmount, setActualAmount] = useState([]);
  const [cbdeliveryMode, setDeliveryMode] = useState([]);
  const [isType, setIsType] = useState("add");

  const _UserId = parseInt(localStorage.getItem("userId"));
  const _Username = localStorage.getItem("username");
  const _TranspoterId = parseInt(localStorage.getItem("transporterId"));
  const _aliasName = localStorage.getItem("aliasName");
  const [worktype , setWorkType] = useState(['งานจ่าย','งานย้าย']);

  const theme = useTheme();
  const _classes = useStyles();
  const classes = MakeStyleSheet.useStyles();

  const txtWarningAttachFile =
    "***รองรับไฟล์ .png / .jpg / .jpeg / .pdf ขนาดไม่เกิน 1 MB***";

  const appCode = "/tnsctpeexpapppay";

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

  const onChangeIsChecked = (id) => (e) => {
    var newArr = [...baseItems];
    var index = newArr.findIndex((x) => x.paymentId === id);
    newArr[index].isChecked = e.target.checked;
    setBaseItems(newArr);
  };

  const onChangeSetAllIsChecked = () => {
    var newArr = [...baseItems];
    if (newArr.length) {
      var isTrue = newArr.find((x) => x.isChecked === true);
      if (isTrue) {
        newArr.map((x) => {
          x.isChecked = false;
        });
      } else {
        newArr.map((x) => {
          x.isChecked = true;
        });
      }
      setBaseItems(newArr);
    }
  };

  const onChangeRejectReason = (id) => (e) => {
    var newArr = [...baseItems];
    var index = newArr.findIndex((x) => x.paymentId === id);
    newArr[index].rejectReason = e.target.value;
    // console.log(newArr[index]);
    setBaseItems(newArr);
  };

  const tableShipDetail = () => {
    return (
      <CRow className="justify-content-center m-4">
        <CCard>
          <CCardBody className="c-body-1">
            <CDataTable
              columnFilter
              className="CDataTable ml-1 mr-1"
              items={shipmentData}
              fields={fieldTransportRate2}
              hover
              // striped
              // bordered
              size="sm"
              itemsPerPage={10}
              pagination
            />
          </CCardBody>
        </CCard>
      </CRow>
    );
  };

  const tableShipExtraChrge = () => {
    return (
      <CCard>
        <CCardBody className="c-body-1">
          <CDataTable
            className="CDataTable"
            columnFilter
            items={extrachargeData}
            fields={fieldExtraCharge}
            itemsPerPage={10}
            hover
            pagination
            scopedSlots={{
              ioNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      size={Constant.btAddSize}
                      disabled={isEdit}
                      value={item.ioNo}
                      type="text"
                      block
                      color="danger"
                    ></CInput>
                  </td>
                );
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
                          size={Constant.btAddSize}
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
                          size={Constant.btAddSize}
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
              manage: (item, index) => {
                return <td className="py-2"></td>;
              },
            }}
          />
        </CCardBody>
      </CCard>
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  const onClickOpenDialogInvoice = (index, id) => (e) => {
    var newArr = [...indexFiles];
    newArr[0] = index;
    newArr[1] = id;
    setIndexFiles(newArr);
    setInvoiceTax([]);
    setisShowDialogInvoice(true);
  };

  const onClickOpenDialogVat = (index, id) => (e) => {
    var newArr = [...indexFiles];
    newArr[0] = index;
    newArr[1] = id;
    setIndexFiles(newArr);
    setisShowDialogVat(true);
  };

  const onClickCloseDialogInvoice = () => {
    setisShowDialogInvoice(false);
  };

  const otherTablesGerneral = () => {
    if (Object.keys(editData).length) {
      var newShowData = { ...editData };
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
                  label="GR & Payment Approve"
                  {...a11yProps(0)}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel
                className="c-body-1"
                value={value}
                index={0}
                dir={theme.direction}
              >
                <CForm className="c-body-1">
                  <CRow>
                    <CCol xs="12" sm="6" md="6">
                      <CFormGroup>
                        <CLabel htmlFor="cvv">
                          {Constant.arrFieldTransAppPaymentOtherGeneral[0]}
                          {showtext()}{" "}
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
                            id="create-payment-grApprovefor"
                            value={1}
                            disabled
                            required
                          >
                            <option selected hidden value="">
                              {Constant.txtformPlaceholderSelected}
                            </option>
                            {grApproveType.map((cb) => (
                              <option value={cb.valueMember}>
                                {cb.displayMember}
                              </option>
                            ))}
                          </CSelect>
                          <CInvalidFeedback>
                            {Constant.inValidNullSelected}
                          </CInvalidFeedback>
                        </Box>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" sm="6" md="6">
                      <CFormGroup>
                        <CLabel htmlFor="cvv">
                          {Constant.arrFieldTransAppPaymentOtherGeneral[1]}
                          {showtext()}{" "}
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
                          <CTextarea
                            value={newShowData.subject}
                            name="textarea-input"
                            id="create-payment-subject"
                            disabled={isEdit}
                            rows="3"
                            placeholder=""
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
              </TabPanel>
            </SwipeableViews>
          </div>
        </List>
      );
    }
  };

  const otherTablesShipmentDetail = () => {
    return (
      <List>
        <div className={_classes.root}>
          <AppBar position="center" color="default">
            <Tabs
              className={_classes.tabRoot}
              value={value1}
              onChange={handleChange1}
              variant="fullWidth"
              centered
            >
              <Tab
                style={{ outline: "none" }}
                label="Shipment Detail"
                {...a11yProps(0)}
              />
              <Tab
                style={{ outline: "none" }}
                label="Extra Charge"
                {...a11yProps(0)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value1}
            onChangeIndex={handleChangeIndex1}
          >
            <TabPanel value={value1} index={0} dir={theme.direction}>
              {tableShipDetail()}
            </TabPanel>
            <TabPanel value={value1} index={1} dir={theme.direction}>
              {tableShipExtraChrge()}
            </TabPanel>
          </SwipeableViews>
        </div>
      </List>
    );
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleChangeIndex1 = (index) => {
    setValue1(index);
  };

  const tablePayment = () => {
    return (
      <CForm className="p-2">
        <CDataTable
          // columnFilter
          items={costItems}
          fields={fieldsPayment}
          itemsPerPage={5}
          pagination
          scopedSlots={{
            runningNo: (item, index) => {
              return (
                <td className="py-2">
                  <CLabel>{item.runningNo}</CLabel>
                </td>
              );
            },
            expenseCode: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="costCenter"
                    id="add-costElement"
                    value={item.expenseCode}
                    placeholder="Code or Description"
                    disabled={isEdit}
                  ></CInput>
                  <datalist style={{ display: "none" }} id="costCenter">
                    {cbCompanyCost.map((cb) => (
                      <option
                        value={cb.valueMember}
                        className={_classes.options}
                      >
                        {cb.costElement}{" "}
                      </option>
                    ))}
                  </datalist>
                </td>
              );
            },
            costCenterCode: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="costElement"
                    id="add-costElement"
                    disabled={isEdit}
                    value={item.costCenterCode}
                    placeholder="Code or Description"
                  ></CInput>
                  <datalist style={{ display: "none" }} id="costElement">
                    {cbCompanyCost.map((cb) => (
                      <option
                        value={cb.valueMember}
                        className={_classes.options}
                      >
                        {cb.costCenter}{" "}
                      </option>
                    ))}
                  </datalist>
                </td>
              );
            },
            internalOrderNumber: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    class="form-control"
                    list="ioData"
                    id="add-costElement"
                    value={item.internalOrderNumber}
                    disabled={isEdit}
                    placeholder="Code or Description"
                  ></CInput>
                  <datalist id="ioData">
                    {extrachargeData.map((cb) => (
                      <option
                        // value={cb.valueMember}
                        className={_classes.options}
                      >
                        {cb.ioNo}{" "}
                      </option>
                    ))}
                  </datalist>
                </td>
              );
            },
            assignment: (item, index) => {
              return (
                <td className="py-2">
                  <CInput
                    value={item.assignment}
                    disabled={isEdit}
                    type="text"
                  ></CInput>
                </td>
              );
            },
          }}
        />
      </CForm>
    );
  };

  const handleClickOpen = (type, paymentId) => (e) => {
    if (type === "edit") {
      setOpenAddForm(false);
      setOpenEditForm(true);
      setIsType(type);
      fnGetDataPaymentListById(paymentId, type);
      fnGetCompanyListById(baseItems[0].companyId);
      fnGetCompanyCost();
      fnGetCompanyListByMain();
      setTestShow(true);
    }
  };

  const fnClearOtherTableValueList = () => {
    setTotalPrice(0);
    setActualVat();
    setActualAmount();
    setEditData([]);
    setUserCCListItems([]);
    setUserCCList([]);
    setUserApproveListItems({});
    setUserApproveList([]);
    setUserReviewerListItems([]);
    setUserReviewerList([]);
    setExtraChargeData([]);
    setShipmentData([]);
    setInvoiceItems([]);
    setCostItems([]);
    setSupportFile([]);
    setIsEdit(true);
  };

  const handleClose = (type) => (e) => {
    fnClearOtherTableValueList();
    if (type === "edit") {
      setOpenEditForm(false);
      setIndexEditForm(null);
    }
  };

  const showtext = () => {
    return (
      <CLabel show="false" style={{ color: "red" }}>
        {/* {" "} */}*
      </CLabel>
    );
  };

  const tableApproval = (data, fields) => {
    return (
      <CDataTable
        className="CDataTable"
        header={false}
        items={data}
        fields={fields}
        size="sm"
        itemsPerPage={5}
        pagination
      />
    );
  };

  const tableApprovalCC = (data, fields) => {
    return (
      <CDataTable
        className="CDataTable"
        header={false}
        items={data}
        fields={fields}
        size="sm"
        itemsPerPage={5}
        pagination
      />
    );
  };

  const tabAttachInvoice = (type) => {
    if (type === "edit") {
      return (
        <CForm className="justify-content-center">
          <CDataTable
            items={invoiceItems}
            fields={fieldsInvoice}
            bordered
            size="sm"
            itemsPerPage={5}
            pagination
            scopedSlots={{
              manage: (item, index) => {
                return (
                  <td className="py-2">
                    <CLabel>{index + 1}</CLabel>
                  </td>
                );
              },
              fileName: (item, index) => {
                var fileName = "No Items";
                if (item.tpaymentAttachFiles[0]) {
                  fileName = item.tpaymentAttachFiles[0].fileName
                    ? item.tpaymentAttachFiles[0].fileName
                    : "";
                }
                return (
                  <td className="py-2">
                    <CFormGroup>
                      <CRow>
                        <CLabel style={{ color: "#056776" }}>
                          <BsFileEarmarkArrowDown
                            onClick={onClickOpenDialogInvoice(index, item.dpId)}
                            className="text-center"
                            style={{
                              width: "50px",
                              height: "50px",
                              color: "#056776",
                            }}
                          />
                        </CLabel>
                      </CRow>
                      <CRow>
                        <CLabel
                          className="pl-1"
                          style={{
                            display: "inline-block",
                            width: "100px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {fileName}
                        </CLabel>
                      </CRow>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </td>
                );
              },
              documentTypeId: (item, index) => {
                return (
                  <td className="py-2">
                    <CSelect
                      className="form-control"
                      id="invoice-documentTypeId"
                      value={item.documentType}
                      disabled="false"
                      required
                    >
                      <option value="">
                        {Constant.txtformPlaceholderSelected}
                      </option>
                      {cbDocumentType.map((cb) => (
                        <option value={cb.valueMember}>
                          {cb.displayMember}{" "}
                        </option>
                      ))}
                    </CSelect>
                  </td>
                );
              },
              paymentRunNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CSelect
                      className="form-control"
                      id={"invoice-ioNo"}
                      value={item.paymentRunNo}
                      disabled="false"
                    >
                      <option selected value="">
                        {Constant.txtformPlaceholderSelected}
                      </option>
                      {costItems.map((cb) => (
                        <option value={cb.runningNo}>{cb.runningNo} </option>
                      ))}
                    </CSelect>
                  </td>
                );
              },
              documentNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      value={item.documentNo}
                      disabled="false"
                      id={"invoice-documentNo"}
                    ></CInput>
                  </td>
                );
              },
              documentDate: (item, index) => {
                item.documentDate =
                  item.documentDate !== null
                    ? new Date(item.documentDate)
                    : null;
                item.documentDate = formatDate(item.documentDate);
                return (
                  <td className="py-2">
                    <CInput
                      size="xs"
                      type="date"
                      disabled="false"
                      value={item.documentDate}
                      id={"invoice-documentDate"}
                      name="date-input"
                      placeholder="date"
                      required
                    />
                  </td>
                );
              },
              amount: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      disabled="false"
                      value={item.amount}
                      type="number"
                      step="0.001"
                      min="0"
                      onWheel={(e) => e.target.blur()}
                      id={"invoice-amount"}
                    ></CInput>
                  </td>
                );
              },
              vatAmount: (item, index) => {
                if (item.vatAmount !== undefined) {
                  return (
                    <td className="py-2">
                      <CLabel>
                        {item.vatAmount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </CLabel>
                    </td>
                  );
                } else {
                  return <td className="py-2"></td>;
                }
              },
              totalAmount: (item, index) => {
                if (item.totalAmount !== undefined) {
                  return (
                    <td className="py-2">
                      <CLabel>
                        {item.totalAmount.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </CLabel>
                    </td>
                  );
                } else {
                  return <td className="py-2"></td>;
                }
              },
              refDocNo: (item, index) => {
                return (
                  <td className="py-2">
                    <CInput
                      type="text"
                      disabled="false"
                      id={"invoice-refDocNo"}
                    ></CInput>
                  </td>
                );
              },
              vendorTax: (item, index) => {
                return (
                  <td className="py-2">
                    <CRow>
                      <CCol>
                        <CLabel>
                          {Constant.arrFieldTransAppPaymentTax[0]}
                        </CLabel>
                        <br />
                        <CSwitch
                          className={"mx-1"}
                          variant={"3d"}
                          color={"success"}
                          id={"invoice-VAT"}
                          checked={item.tpaymentVatRate.checkbox}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.tpaymentVatRate.checkbox ? (
                          <CLabel style={{ fontSize: "12px", color: "gray" }}>
                            {Constant.arrFieldTransAppPaymentTax[0]}{" "}
                            {item.tpaymentVatRate.rate}%{" "}
                            {item.tpaymentVatRate.vatAmount.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 2 }
                            )}{" "}
                            {Constant.unitBahtENG}{" "}
                          </CLabel>
                        ) : (
                          <CLabel></CLabel>
                        )}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol>
                        <CLabel>
                          {Constant.arrFieldTransAppPaymentTax[1]}
                        </CLabel>
                        <br />
                        <CSwitch
                          className={"mx-1"}
                          variant={"3d"}
                          color={"success"}
                          id={"invoice-WHT"}
                          checked={item.tpaymentWhtrates[0].checkbox}
                          labelOn={"\u2713"}
                          labelOff={"\u2715"}
                        />
                        <br />
                        {item.tpaymentWhtrates[0].checkbox ? (
                          <CForm>
                            {item.tpaymentWhtrates[0].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                {Constant.arrFieldTransAppPaymentTax[1]}{" "}
                                {item.tpaymentWhtrates[0].rate}% {"       "}
                                {item.tpaymentWhtrates[0].vatAmount}
                                {Constant.unitBahtENG}{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.tpaymentWhtrates[1].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                {Constant.arrFieldTransAppPaymentTax[1]}{" "}
                                {item.tpaymentWhtrates[1].rate}%{" "}
                                {item.tpaymentWhtrates[1].vatAmount}
                                {Constant.unitBahtENG}{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}

                            <br />
                            {item.tpaymentWhtrates[2].rate ? (
                              <CLabel
                                style={{ fontSize: "12px", color: "gray" }}
                              >
                                {Constant.arrFieldTransAppPaymentTax[1]}{" "}
                                {item.tpaymentWhtrates[2].rate}%{" "}
                                {item.tpaymentWhtrates[2].vatAmount}{" "}
                                {Constant.unitBahtENG}{" "}
                              </CLabel>
                            ) : (
                              <div></div>
                            )}
                            <Divider></Divider>
                            <CLabel style={{ fontSize: "12px", color: "gray" }}>
                              {Constant.arrFieldTransAppPaymentTax[3]}{" "}
                              {item.tpaymentWhtrates[0].vatAmount +
                                item.tpaymentWhtrates[1].vatAmount +
                                item.tpaymentWhtrates[2].vatAmount}{" "}
                              {Constant.unitBahtENG}{" "}
                            </CLabel>
                          </CForm>
                        ) : (
                          <div></div>
                        )}
                      </CCol>
                    </CRow>
                  </td>
                );
              },
            }}
          />
        </CForm>
      );
    }
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const onClickExportPDF = () => {
    var newShowData = { ...editData };
    var paymentId = newShowData.paymentId;
    setIsPostingData(true);
    Repository.fetchGetCoverPageData(paymentId, false).then(
      (result) => {
        console.log("result", result);
        setIsPostingData(false);
        if (result.httpCode === "200") {
          console.log("result", result.data);

          const toDay = new Date();

          var subject = document.getElementById("create-payment-subject").value;
          // const toDay = new Date();
          var newDoc = {
            createDate: toDay,
            toName: "",
            fromName: _aliasName,
            subject: subject,
            transporterName: newShowData.transporterName,
            smpNo: newShowData.paymentNo,
            companyName: companyList[0].companyName,
            sumQty: 0,
            sumSaleOrder: 0,
            sumShipment: 0,
            sumDelivery: 0,
            sumAmount: 0,
          };

          var newDeliveryList = [];
          var newShipmentList = [];
          var newSaleOrderList = [];

          var newBaseItem = baseItems.filter((x) => x.isChecked === true);

          console.log(newBaseItem);
          var _sumQty = 0;

          if (shipmentData.length) {
            shipmentData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          } else if (extrachargeData.length && !shipmentData.length) {
            extrachargeData.map((x) => {
              newShipmentList.push(x.shipmentNo);
            });
          }

          newBaseItem.map((x) => {
            _sumQty += x.qty;
            newDeliveryList.push(x.deliveryNo);

            newSaleOrderList.push(x.saleOrderNo);
          });

          var countDelivery = [...new Set(newDeliveryList)].length;
          var countShipment = [...new Set(newShipmentList)].length;
          var countSaleOrder = [...new Set(newSaleOrderList)].length;

          // console.log("countDelivery", countDelivery);
          // console.log("countShipment", countShipment);
          // console.log("countSaleOrder", countSaleOrder);

          newDoc.sumQty = result.data.summaryQty;
          newDoc.sumSaleOrder = result.data.summarySaleOrder;
          newDoc.sumShipment = countShipment;
          newDoc.sumDelivery = result.data.summaryDelivery;
          newDoc.sumAmount = totalAmount;
          newDoc.toName = userApproveListItems.aliasName;

          // Render to View PDF
          FunctionController.renderPDF(newDoc);
          // console.log(newDoc);

          // Convert PDF to File in Variable
          FunctionController.convertPDFToFile(newDoc, "Cover Sheet").then(
            (result) => {
              console.log(result);
            }
          );
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );

    // console.log(newFile.value)
  };

  const footerboxView = () => {
    if (Object.keys(editData).length) {
      const newVaue = { ...editData };
      var newArr = [...invoiceItems];
      var sum = 0;
      var wht = 0;

      if (newArr.length) {
        newArr.map((x, index) => {
          // console.log(index);
          if (index < 3) {
            wht = wht + x.tpaymentWhtrates[index].vatAmount;
          }
        });
      }

      return (
        <CCard className="fixed d-flex">
          <CCardBody>
            <CRow className="d-flex">
              <CCol className="mr-autopl-3 pr-3">
                <h3>
                  <CLabel style={{ color: "black" }}>
                    Summary Payment Amount
                  </CLabel>
                </h3>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  SMP Total Amount (Exclude VAT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3   text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.smpamount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual Total Amount (Exclude VAT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.actualAmount.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
              {/* <GrCircleInformation
                      // class="tooltip"
                      title={
                        "SMP VAT : " +
                        `${newVaue.smpvat}` +
                        "\n" +
                        "ACTUAL VAT : " +
                        `${newVaue.actualVat}`
                      }
                      color="grey"
                      size="20px"
                    /> */}
            </CRow>
            {/* //Actual Payment */}
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual VAT
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {newVaue.actualVat.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual WHT
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {wht.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol xs="12" sm="6" md="3" className="pl-3 pr-3 text-right">
                <CLabel style={{ color: "black", fontSize: "20px" }}>
                  Actual Total Amount (Include VAT + WHT)
                </CLabel>
              </CCol>
              <CCol xs="12" sm="6" md="2" className="pl-3 pr-3  text-right">
                <CLabel style={{ color: "#056776", fontSize: "20px" }}>
                  {totalPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </CLabel>
                <CLabel
                  className="pl-1"
                  onClick={() => console.log("Data", editData)}
                  style={{ color: "black", fontSize: "20px" }}
                >
                  THB
                </CLabel>
              </CCol>
            </CRow>
            <CRow className="justify-content-end">
              <CCol md="1" className="p-3 text-right">
                <CButton
                  size={Constant.btAddSize}
                  onClick={onClickExportPDF}
                  className={"btn-mainsmp"}
                  style={{ fontSize: "16px" }}
                  block
                >
                  <MdStickyNote2 size="30px" />
                  {"\xa0"}
                  {Constant.btViewCoverSheet}
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      );
    }
  };

  const dialogs = (paymentId, type) => {
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
            className="btn-mainsmp"
            size={Constant.btAddSize}
            block
            onClick={handleClickOpen(type, paymentId)}
          >
            {Constant.btViewData}
          </CButton>
        </Box>

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
                <h3>{Constant.txtFormHeaderViewData}</h3>
              </Typography>
              <CButton className="btt-close" onClick={handleClose("edit")}>
                <h5>{Constant.txtDialogFormClose}</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>
            {collapseHeader("edit")}
            {modalForm()}
            {footerboxView()}
          </List>
        </Dialog>
      </h6>
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

  const collapseHeader = (type) => {
    if (type === "edit") {
      if (Object.keys(editData).length) {
        var newShowData = { ...editData };
        var startDate = newShowData.startDate;
        var endDate = newShowData.endDate;
        var transporterId = newShowData.transporterId;
        var transporterCode = newShowData.transporterCode;
        var transporterName = newShowData.transporterName;
        var transporterEmail = newShowData.transporterEmail;
        var companyId = newShowData.companyId;
        var companyCode = newShowData.companyCode;
        var companyName = newShowData.companyName;
        var paymentTypeId = newShowData.paymentTypeId;
        var bankName = newShowData.bankName;
        var accountNo = newShowData.accountNo;
        var placeCheque = newShowData.placeCheque;
        var creditTerm = newShowData.creditTerm;
        var price = newShowData.price;
        var refNo = newShowData.refNo;
        var allPayNo = newShowData.allPayNo;
        var taxId = newShowData.taxNo;
        var branch = newShowData.branchNo;
        var address = newShowData.address;
        var grApprovefor = newShowData.grApprovefor;
        var subject = newShowData.subject;
        var dueDate =
          newShowData.dueDate !== null ? new Date(newShowData.dueDate) : null;
        dueDate = formatDate(dueDate);
        var currency = newShowData.currency;
        var paymentDescription = newShowData.paymentDescription;
        var exchangeRate = newShowData.exchangeRate;
        var serviceTeamCode = newShowData.serviceTeamCode;
        var smpamount = newShowData.smpamount;
        var smpvat = newShowData.smpvat;
        var smptotalAmount = newShowData.smptotalAmount;
        var actualAmount = newShowData.actualAmount;
        var actualVat = newShowData.actualVat;
        var actualTotalAmount = newShowData.actualTotalAmount;
        var requestorName = userRequestorList.find(
          (x) => x.userId === newShowData.createBy
        );
        requestorName = requestorName ? requestorName.userName : "ไม่พบรายชื่อ";
        var costArr = [];
        var inVoiceArr = [];
        var wht = 0;
        var checkBox = false;
        var checkBoxWht = false;
        var newWht = [];
        var newTpaymentDocument = [];

        if (!costItems.length && !invoiceItems.length) {
          newShowData.tpaymentItems.map((x) => {
            x.tpaymentDocuments.map((y) => {
              y.fileName = y.tpaymentAttachFiles;
              for (let i = y.tpaymentWhtrates.length; i < 3; i++) {
                var obj = {
                  checkbox: false,
                  rate: 0,
                  baseAmount: 0,
                  vatAmount: 0,
                };
                y.tpaymentWhtrates.push(obj);
              }
            });

            x.tpaymentDocuments.map((y) => {
              if (y.tpaymentVatRate) {
                if (y.tpaymentVatRate.vatAmount > 0) {
                  y.tpaymentVatRate.checkbox = true;
                } else {
                  y.tpaymentVatRate.checkbox = false;
                }
                y.vatAmount = y.tpaymentVatRate.vatAmount;
                y.totalAmount = y.amount + y.vatAmount;
              } else {
                var newtVat = {
                  checkbox: false,
                  rate: 0,
                  baseAmount: 0,
                  vatAmount: 0,
                };
                y.vatAmount = newtVat.vatAmount;
                y.totalAmount = y.amount + newtVat.vatAmount;
                y.tpaymentVatRate = newtVat;
              }

              if (y.tpaymentWhtrates.length) {
                y.tpaymentWhtrates.map((y) => {
                  if (y.vatAmount > 0) {
                    y.checkbox = true;
                  }
                  checkBoxWht = y.checkbox;
                  wht = wht + y.vatAmount;
                });
              }
            });
            x.tpaymentDocuments.map((t) => {
              newTpaymentDocument.push(t);
            });
            
          });
          setCostItems(newShowData.tpaymentItems);
          setSupportFile(newShowData.tpaymentSupportFiles);
          setInvoiceItems(newTpaymentDocument);
        }

        if (
          !newShowData.taxNo &&
          !newShowData.branchNo &&
          !newShowData.address
        ) {
          transporterList.find((x) => {
            if (x.transporterId === transporterId) {
              newShowData.taxNo = x.taxNo;
              newShowData.branchNo = x.branchNo;
              newShowData.address = x.address;
              newShowData.transporterCode = x.transporterCode;
              newShowData.transporterName = x.transporterNameThai;
              newShowData.transporterEmail = x.email;
              setEditData(newShowData);
            }
          });
        }

        if (Object.keys(editData).length) {
          return (
            <div>
              <CCard color="gradient-secondary" className="color-card-gra p-3">
                <CCardHeader
                  className="font-form-scg-card"
                  style={{ backgroundColor: "#50949f", color: "white" }}
                >
                  {Constant.arrFieldTransAppPaymentTopicFormBody[0]}
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
                      <CForm
                        className="general-info-need-validation"
                        noValidate
                      >
                        {/* <h6> */}
                        <CRow>
                          <CCol xs="12" sm="6" md="6">
                            <CFormGroup>
                              <CLabel htmlFor="cvv">
                                {
                                  Constant
                                    .arrFieldTransAppPaymentDetailFormBody[0]
                                }
                              </CLabel>
                              {showtext()}
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
                                  type="text"
                                  id="create-payment-companyId"
                                  disabled
                                  value={
                                    editData
                                      ? "[" + companyCode + "]" + companyName
                                      : ""
                                  }
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
                          <CCol xs="12" sm="6" md="6">
                            <CFormGroup>
                              <CLabel htmlFor="cvv">
                                {
                                  Constant
                                    .arrFieldTransAppPaymentDetailFormBody[1]
                                }
                              </CLabel>
                              {showtext()}
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
                                  id="search-transporter"
                                  size="small"
                                  options={transportByMain}
                                  disabled={true}
                                  loading
                                  autoHighlight
                                  filterSelectedOptions
                                  defaultValue={transportByMain.find(
                                    (x) => x.transporterId === transporterId
                                  )}
                                  getOptionLabel={(option) =>
                                    `[${option.transporterCode}] ` +
                                    option.transporterNameThai
                                  }
                                  renderOption={(option) => {
                                    return (
                                      <Typography
                                        className={
                                          classes.autoCompleteRenderOptions
                                        }
                                      >
                                        {`[${option.transporterCode}] ` +
                                          option.transporterNameThai}
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
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="cvv"> </CLabel>
                            </CFormGroup>
                            <CLabel disabled={true} className="pr-2">
                              {
                                Constant
                                  .arrFieldTransAppPaymentDetailFormBody[2]
                              }{" "}
                              :{" "}
                            </CLabel>
                            <CLabel disabled={true} className="base-Label">
                              {" "}
                              {taxId}
                            </CLabel>
                          </CCol>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="cvv"> </CLabel>
                            </CFormGroup>
                            <CLabel disabled={true} className="pr-2">
                              {
                                Constant
                                  .arrFieldTransAppPaymentDetailFormBody[3]
                              }{" "}
                              :{" "}
                            </CLabel>
                            <CLabel disabled={true} className="base-Label">
                              {branch}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow className="pb-3">
                          <CCol xs="12" sm="6" md="6">
                            {address ? (
                              <FaRegAddressCard
                                size="30px"
                                style={{ color: "grey", size: "100px" }}
                              />
                            ) : (
                              ""
                            )}
                            <CLabel className="base-Label pl-2">
                              {address}
                            </CLabel>
                          </CCol>
                        </CRow>
                        {otherTablesGerneral()}
                      </CForm>
                    </CCardBody>
                  </Box>
                </CCollapse>
              </CCard>

              <CCard color="gradient-secondary" className="color-card-gra p-3">
                <CCardHeader
                  className="font-form-scg-card"
                  style={{ backgroundColor: "#50949f", color: "white" }}
                >
                  {Constant.arrFieldTransAppPaymentTopicFormBody[1]}
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => setCollapsed1(!collapsed1)}
                    >
                      <CIcon
                        className="collap-icon"
                        style={{ color: "white" }}
                        name={
                          collapsed1 ? "cil-chevron-bottom" : "cil-chevron-top"
                        }
                      />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed1}>
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
                      <CForm
                        className="shipment-detail-need-validation"
                        noValidate
                      >
                        {/* <h6> */}

                        {otherTablesShipmentDetail()}
                        <CRow>
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CInvalidFeedback>
                                {Constant.inValidNullMessage}
                              </CInvalidFeedback>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </Box>
                </CCollapse>
              </CCard>
              <CCard color="gradient-secondary" className="color-card-gra p-3">
                <CCardHeader
                  className="font-form-scg-card"
                  style={{ backgroundColor: "#50949f", color: "white" }}
                >
                  {Constant.arrFieldTransAppPaymentTopicFormBody[2]}
                  <div className="card-header-actions">
                    {/* <CLink className="card-header-action">
                                        <CIcon name="cil-settings" />
                                    </CLink> */}
                    <CLink
                      className="card-header-action"
                      onClick={() => setCollapsed1(!collapsed1)}
                    >
                      <CIcon
                        className="collap-icon"
                        style={{ color: "white" }}
                        name={
                          collapsed1 ? "cil-chevron-bottom" : "cil-chevron-top"
                        }
                      />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed1}>
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
                      <CForm
                        className="payment-info-need-validation"
                        noValidate
                      >
                        {/* <h6> */}
                        <CRow>
                          <CCol xs="12" sm="6" md="6">
                            <CFormGroup>
                              <CLabel htmlFor="cvv">
                                {
                                  Constant
                                    .arrFieldTransAppPaymentDetailFormBody[4]
                                }
                              </CLabel>
                              {showtext()}
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
                                  disabled={true}
                                  value={dueDate}
                                  id="create-payment-dueDate"
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
                              <CLabel htmlFor="name">
                                {
                                  Constant
                                    .arrFieldTransAppPaymentDetailFormBody[5]
                                }
                              </CLabel>
                              {showtext()}
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
                                  id="create-payment-currency"
                                  value={1}
                                  disabled
                                  required
                                >
                                  <option selected hidden value="">
                                    {Constant.txtformPlaceholderSelected}
                                  </option>
                                  {cbCurrencyType.map((cb) => (
                                    <option value={cb.valueMember}>
                                      {cb.displayMember}
                                    </option>
                                  ))}
                                </CSelect>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </Box>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12" sm="6" md="6">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">
                                  {
                                    Constant
                                      .arrFieldTransAppPaymentDetailFormBody[6]
                                  }
                                </CLabel>
                                {showtext()}
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
                                    id="create-payment-paymentType"
                                    value={paymentTypeId}
                                    disabled
                                    required
                                  >
                                    <option selected hidden value="">
                                      {Constant.txtformPlaceholderSelected}
                                    </option>
                                    {cbPaymentType.map((cb) => (
                                      <option value={cb.valueMember}>
                                        {cb.displayMember}
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
                          {showInputLocation()}
                        </CRow>
                        <CRow>
                          <CCol xs="12" sm="6" md="6">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">
                                  {
                                    Constant
                                      .arrFieldTransAppPaymentDetailFormBody[7]
                                  }
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
                                  <CTextarea
                                    name="textarea-input"
                                    disabled={true}
                                    value={paymentDescription}
                                    id="create-payment-paymentDesc"
                                    rows="3"
                                    placeholder=""
                                  />
                                </Box>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
                          {showInputServiceTeam()}
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CFormGroup>
                                <CLabel htmlFor="name">
                                  {
                                    Constant
                                      .arrFieldTransAppPaymentDetailFormBody[8]
                                  }
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
                                    id="create-payment-vendorEmail"
                                    value={transporterEmail}
                                    disabled={true}
                                    type="text"
                                  />
                                </Box>
                                <CInvalidFeedback>
                                  {Constant.inValidNullSelected}
                                </CInvalidFeedback>
                              </CFormGroup>
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <Divider></Divider>
                        <CRow className="pt-2">
                          <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                              <CLabel for="validationCustom03">
                                {
                                  Constant
                                    .arrFieldTransAppPaymentDetailFormBody[9]
                                }
                              </CLabel>
                              <br />

                              <CSwitch
                                className={"mx-1"}
                                variant={"3d"}
                                color={"success"}
                                id="create-payment-nonPo"
                                disabled
                                block
                                //   onChange={onHandleChangeadd}
                                checked={true}
                                labelOn={"\u2713"}
                                labelOff={"\u2715"}
                              />
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        {tablePayment()}
                        <CRow className="justify-content-center">
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
                                size={Constant.btAddSize}
                                color="success"
                                disabled={true}
                                block
                              >
                                <AiOutlinePlusSquare size="30px" />
                                {""} {Constant.btAddItem}
                              </CButton>
                            </Box>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </Box>
                </CCollapse>
              </CCard>
              <CCard color="gradient-secondary" className="color-card-gra p-3">
                <CCardHeader
                  className="font-form-scg-card"
                  style={{ backgroundColor: "#50949f", color: "white" }}
                >
                  {Constant.arrFieldTransAppPaymentTopicFormBody[3]}
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => setCollapsed3(!collapsed3)}
                    >
                      <CIcon
                        className="collap-icon"
                        style={{ color: "white" }}
                        name={
                          collapsed3 ? "cil-chevron-bottom" : "cil-chevron-top"
                        }
                      />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed3}>
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
                      <CForm
                        className="approve-info-need-validation"
                        noValidate
                      >
                        {/* <h6> */}
                        <CCard
                          color="gradient-secondary"
                          className="color-card-gra p-3"
                        >
                          <CCardHeader
                            className="font-form-scg-card"
                            style={{ backgroundColor: "white", color: "black" }}
                          >
                            {Constant.arrFieldTransAppPaymentUser[0]}
                            <div className="card-header-actions">
                              <CLink
                                className="card-header-action"
                                onClick={() => setCollapsed6(!collapsed6)}
                              >
                                <CIcon
                                  className="collap-icon"
                                  style={{ color: "black" }}
                                  name={
                                    collapsed6
                                      ? "cil-chevron-bottom"
                                      : "cil-chevron-top"
                                  }
                                />
                              </CLink>
                            </div>
                          </CCardHeader>
                          <CCollapse show={collapsed6}>
                            <CCardBody className="font-form-scg-card">
                              <CRow>
                                <CCol xs="12" sm="6" md="3">
                                  <CFormGroup>
                                    <CLabel htmlFor="cvv">
                                      {Constant.arrFieldTransAppPaymentUser[0]}{" "}
                                      {showtext()}
                                    </CLabel>
                                    <CInput
                                      value={requestorName}
                                      readOnly
                                      size="xs"
                                      type="text"
                                      required
                                    ></CInput>
                                    <CInvalidFeedback>
                                      {Constant.inValidNullMessage}
                                    </CInvalidFeedback>
                                  </CFormGroup>
                                </CCol>
                              </CRow>
                            </CCardBody>
                          </CCollapse>
                        </CCard>

                        <CCard
                          color="gradient-secondary"
                          className="color-card-gra p-3"
                        >
                          <CCardHeader
                            className="font-form-scg-card"
                            style={{ backgroundColor: "white", color: "black" }}
                          >
                            {Constant.arrFieldTransAppPaymentUser[1]}
                            <div className="card-header-actions">
                              <CLink
                                className="card-header-action"
                                onClick={() => setCollapsed4(!collapsed4)}
                              >
                                <CIcon
                                  className="collap-icon"
                                  style={{ color: "black" }}
                                  name={
                                    collapsed4
                                      ? "cil-chevron-bottom"
                                      : "cil-chevron-top"
                                  }
                                />
                              </CLink>
                            </div>
                          </CCardHeader>
                          <CCollapse show={collapsed4}>
                            <CCardBody className="font-form-scg-card">
                              <CRow className="justify-content-between">
                                <CCol xs="12" sm="6" md="3">
                                  <CFormGroup>
                                    <CFormGroup>
                                      <CLabel htmlFor="name">
                                        {
                                          Constant
                                            .arrFieldTransAppPaymentUser[1]
                                        }
                                      </CLabel>
                                      <Autocomplete
                                        id="tags-filled"
                                        size="small"
                                        disabled={isEdit}
                                        options={userReviewerList}
                                        getOptionLabel={(option) =>
                                          `[${option.aliasName}]` +
                                          "  " +
                                          option.firstName +
                                          " " +
                                          option.lastName
                                        }
                                        renderOption={(option) => {
                                          return (
                                            <Typography
                                              className={
                                                classes.autoCompleteRenderOptions
                                              }
                                            >
                                              {`[${option.aliasName}]` +
                                                "  " +
                                                option.firstName +
                                                " " +
                                                option.lastName}
                                            </Typography>
                                          );
                                        }}
                                        renderInput={(params) => {
                                          params.inputProps.className =
                                            classes.autoCompleteInputLabel;
                                          return (
                                            <TextField
                                              disabled={isEdit}
                                              size="small"
                                              {...params}
                                              onClick={fnGetUserReviewerList}
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
                                              variant="outlined"
                                            />
                                          );
                                        }}
                                      />
                                      <br />
                                      <CInvalidFeedback>
                                        {Constant.inValidNullMessage}
                                      </CInvalidFeedback>
                                      {tableApproval(
                                        userReviewerListItems,
                                        fieldsApproveval
                                      )}
                                    </CFormGroup>
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="3">
                                  <CFormGroup>
                                    <CFormGroup>
                                      <CLabel htmlFor="name">
                                        {
                                          Constant
                                            .arrFieldTransAppPaymentUser[2]
                                        }
                                      </CLabel>

                                      <Autocomplete
                                        id="tags-filled"
                                        size="small"
                                        disabled={isEdit}
                                        options={userCCList}
                                        getOptionLabel={(option) =>
                                          `[${option.aliasName}]` +
                                          "  " +
                                          option.firstName +
                                          " " +
                                          option.lastName
                                        }
                                        renderOption={(option) => {
                                          return (
                                            <Typography
                                              className={
                                                classes.autoCompleteRenderOptions
                                              }
                                            >
                                              {`[${option.aliasName}]` +
                                                "  " +
                                                option.firstName +
                                                " " +
                                                option.lastName}
                                            </Typography>
                                          );
                                        }}
                                        renderInput={(params) => {
                                          params.inputProps.className =
                                            classes.autoCompleteInputLabel;
                                          return (
                                            <TextField
                                              disabled={isEdit}
                                              size="small"
                                              {...params}
                                              onClick={fnGetUserCCList}
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
                                              variant="outlined"
                                            />
                                          );
                                        }}
                                      />
                                      <br />
                                      {tableApprovalCC(
                                        userCCListItems,
                                        fieldsCC
                                      )}
                                      <CInvalidFeedback>
                                        {Constant.inValidNullMessage}
                                      </CInvalidFeedback>
                                    </CFormGroup>
                                  </CFormGroup>
                                </CCol>
                              </CRow>
                            </CCardBody>
                          </CCollapse>
                        </CCard>

                        <CCard
                          color="gradient-secondary"
                          className="color-card-gra p-3"
                        >
                          <CCardHeader
                            className="font-form-scg-card"
                            style={{ backgroundColor: "white", color: "black" }}
                          >
                            {Constant.arrFieldTransAppPaymentUser[3]}
                            <div className="card-header-actions">
                              <CLink
                                className="card-header-action"
                                onClick={() => setCollapsed5(!collapsed5)}
                              >
                                <CIcon
                                  className="collap-icon"
                                  style={{ color: "black" }}
                                  name={
                                    collapsed5
                                      ? "cil-chevron-bottom"
                                      : "cil-chevron-top"
                                  }
                                />
                              </CLink>
                            </div>
                          </CCardHeader>
                          <CCollapse show={collapsed5}>
                            <CCardBody className="font-form-scg-card">
                              <CRow>
                                <CCol xs="12" sm="6" md="3">
                                  <CFormGroup>
                                    <CLabel for="validationCustom03">
                                      {
                                        Constant
                                          .arrFieldTransAppPaymentDetailFormBody[10]
                                      }
                                    </CLabel>
                                    <br />

                                    <CSwitch
                                      className={"mx-1"}
                                      variant={"3d"}
                                      color={"success"}
                                      id="create-payment-autoDoa"
                                      block
                                      disabled
                                      defaultChecked={false}
                                      labelOn={"\u2713"}
                                      labelOff={"\u2715"}
                                    />
                                  </CFormGroup>
                                </CCol>
                              </CRow>
                              {userApproveListItems ? (
                                <CRow>
                                  <CCol xs="12" sm="6" md="6">
                                    <CFormGroup>
                                      <CFormGroup>
                                        <CLabel htmlFor="name">
                                          {
                                            Constant
                                              .arrFieldTransAppPaymentUser[3]
                                          }
                                        </CLabel>
                                        {showtext()}
                                        <Autocomplete
                                          id="tags-filled"
                                          size="small"
                                          value={userApproveListItems}
                                          disabled={isEdit}
                                          options={userApproveList}
                                          getOptionLabel={(option) =>
                                            `[${option.aliasName}]` +
                                            "  " +
                                            option.userName
                                          }
                                          renderOption={(option) => {
                                            return (
                                              <Typography
                                                className={
                                                  classes.autoCompleteRenderOptions
                                                }
                                              >
                                                {`[${option.aliasName}]` +
                                                  "  " +
                                                  option.userName}
                                              </Typography>
                                            );
                                          }}
                                          renderInput={(params) => {
                                            params.inputProps.className =
                                              classes.autoCompleteInputLabel;
                                            return (
                                              <TextField
                                                size="small"
                                                disabled={isEdit}
                                                {...params}
                                                onClick={fnGetUserApproveList}
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
                                                variant="outlined"
                                              />
                                            );
                                          }}
                                        />

                                        <CInvalidFeedback>
                                          {Constant.inValidNullSelected}
                                        </CInvalidFeedback>
                                      </CFormGroup>
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                              ) : (
                                <CRow>
                                  <CCol xs="12" sm="6" md="6">
                                    <CFormGroup>
                                      <CFormGroup>
                                        <CLabel htmlFor="name">
                                          {
                                            Constant
                                              .arrFieldTransAppPaymentUser[3]
                                          }
                                        </CLabel>
                                        {showtext()}
                                        <Autocomplete
                                          id="tags-filled"
                                          size="small"
                                          // value={userApproveListItems}
                                          disabled={isEdit}
                                          options={userApproveList}
                                          getOptionLabel={(option) =>
                                            `[${option.aliasName}]` +
                                            "  " +
                                            option.userName
                                          }
                                          renderOption={(option) => {
                                            return (
                                              <Typography
                                                className={
                                                  classes.autoCompleteRenderOptions
                                                }
                                              >
                                                {`[${option.aliasName}]` +
                                                  "  " +
                                                  option.userName}
                                              </Typography>
                                            );
                                          }}
                                          renderInput={(params) => {
                                            params.inputProps.className =
                                              classes.autoCompleteInputLabel;
                                            return (
                                              <TextField
                                                size="small"
                                                disabled={isEdit}
                                                {...params}
                                                onClick={fnGetUserApproveList}
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
                                                variant="outlined"
                                              />
                                            );
                                          }}
                                        />

                                        <CInvalidFeedback>
                                          {Constant.inValidNullSelected}
                                        </CInvalidFeedback>
                                      </CFormGroup>
                                    </CFormGroup>
                                  </CCol>
                                </CRow>
                              )}
                            </CCardBody>
                          </CCollapse>
                        </CCard>
                      </CForm>
                    </CCardBody>
                  </Box>
                </CCollapse>
              </CCard>
              <CCard color="gradient-secondary" className="color-card-gra p-3">
                <CCardHeader
                  className="font-form-scg-card"
                  style={{ backgroundColor: "#50949f", color: "white" }}
                >
                  {Constant.arrFieldTransAppPaymentTopicFormBody[4]}
                  <div className="card-header-actions">
                    {/* <CLink className="card-header-action">
                                        <CIcon name="cil-settings" />
                                    </CLink> */}
                    <CLink
                      className="card-header-action"
                      onClick={() => setCollapsed2(!collapsed2)}
                    >
                      <CIcon
                        className="collap-icon"
                        style={{ color: "white" }}
                        name={
                          collapsed2 ? "cil-chevron-bottom" : "cil-chevron-top"
                        }
                      />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed2}>
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
                      <CForm
                        className="invoice-info-need-validation"
                        noValidate
                      >
                        <CRow className="m-1 p-0 justify-content-center">
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
                              <CCard
                                className="p-3"
                                style={{
                                  borderColor: "#5089c6",
                                  borderStyle: "dashed",
                                }}
                              >
                                <CLabel
                                  className="text-center"
                                  style={{ color: "#5089c6" }}
                                // onClick={addInvoiceItems}
                                >
                                  {" "}
                                  {Constant.btUploadInvoice}
                                  {<BsFileEarmarkArrowDown size="30px" />}
                                </CLabel>
                              </CCard>
                            </Box>
                          </CCol>
                        </CRow>
                        <br />
                        <CCard className="p-3">
                          {tabAttachInvoice("edit")}
                        </CCard>
                        {/* </CRow> */}
                      </CForm>
                    </CCardBody>
                  </Box>
                </CCollapse>
              </CCard>
            </div>
          );
        }
      }
    }
  };

  const fileViews = () => {
    if (invoiceItems[indexFiles[0]]) {
      var lengthOfFile = invoiceItems[indexFiles[0]].tpaymentAttachFiles.length;

      var newArr = [];
      for (var i = 1; i <= lengthOfFile; i++) {
        newArr.push(
          <CRow style={{ display: "flex" }}>
            <CCol xs="12" sm="6" md="12">
              <CLabel
                id={"label-" + i}
                onClick={(e, value) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  if (!isNaN(index)) {
                    if (
                      invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                        .guid
                    ) {
                      var guid =
                        invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .guid;
                      var filename = invoiceItems[indexFiles[0]]
                        .tpaymentAttachFiles[index].fileName
                        ? invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .fileName
                        : invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .name;
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";
                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
                style={{ color: "#056776" }}
              >
                {i + "."}
                <BsFileEarmarkCheck
                  className="text-center"
                  id={"icon-" + i}
                  style={{
                    width: "100px",
                    height: "100px",
                    color: "#056776",
                  }}
                ></BsFileEarmarkCheck>
                {invoiceItems[indexFiles[0]].tpaymentAttachFiles[i - 1].fileName
                  ? invoiceItems[indexFiles[0]].tpaymentAttachFiles[i - 1]
                    .fileName
                  : invoiceItems[indexFiles[0]].tpaymentAttachFiles[i - 1].name}
              </CLabel>
              {"\xa0 \xa0 \xa0"}
              <CButton
                id={"bt-" + i}
                color="info"
                onClick={(e, value) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  // console.log(index);
                  // console.log(invoiceItems[indexFiles[0]].tpaymentAttachFiles);

                  if (!isNaN(index)) {
                    if (
                      invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                        .guid
                    ) {
                      var guid =
                        invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .guid;

                      console.log(guid);
                      var filename = invoiceItems[indexFiles[0]]
                        .tpaymentAttachFiles[index].fileName
                        ? invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .fileName
                        : invoiceItems[indexFiles[0]].tpaymentAttachFiles[index]
                          .name;
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      // console.log(name);
                      // console.log(fileType);
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";
                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
              >
                {Constant.btDownloadFile}
              </CButton>
            </CCol>
          </CRow>
        );
      }
      return <div>{newArr}</div>;
    }
  };

  const SupportFileViews = () => {
    if (supportfile.length) {
      var lengthOfFile = supportfile.length;

      var newArr = [];
      for (var i = 1; i <= lengthOfFile; i++) {
        newArr.push(
          <CRow>
            <CCol xs="12" sm="6" md="12">
              <CLabel
                style={{ color: "#056776" }}
                id={"label-" + i}
                onClick={(e) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  if (!isNaN(index)) {
                    if (supportfile[index].guid) {
                      var guid = supportfile[index].guid;
                      var filename = supportfile[index].fileName
                        ? supportfile[index].fileName
                        : supportfile[index].name;
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";

                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
              >
                {i + "."}
                <BsFileEarmarkCheck
                  id={"icon-" + i}
                  className="text-center"
                  style={{
                    width: "100px",
                    height: "100px",
                    color: "#056776",
                  }}
                ></BsFileEarmarkCheck>
                {supportfile[i - 1].fileName
                  ? supportfile[i - 1].fileName
                  : supportfile[i - 1].name}
              </CLabel>
              {"\xa0 \xa0 \xa0"}
              <CButton
                id={"bt-" + i}
                color="info"
                onClick={(e) => {
                  var newArr = e.target.id.split("-");
                  var index = parseInt(newArr[newArr.length - 1]) - 1;

                  // console.log(index);
                  // console.log(supportfile[index]);

                  if (!isNaN(index)) {
                    if (supportfile[index].guid) {
                      var guid = supportfile[index].guid;

                      console.log(guid);
                      var filename = supportfile[index].fileName
                        ? supportfile[index].fileName
                        : supportfile[index].name;
                      console.log(filename);
                      var fileType = filename.split(".");
                      var name = fileType[0];
                      // console.log(name)
                      // console.log(fileType);
                      fileType = fileType[fileType.length - 1];
                      var typeName = "file";

                      fnDownloadFile(guid, fileType, typeName, name);
                    }
                  }
                }}
              >
                {Constant.btDownloadFile}
              </CButton>
            </CCol>
          </CRow>
        );
      }
      return <div>{newArr}</div>;
    }
  };

  const collapseHeaderInvoice = (type) => {
    if (type === "edit") {
      return (
        <CForm>
          <CCard color="gradient-secondary" className="color-card-gra p-3">
            <CForm className="header-need-validation">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                {Constant.arrFieldTransAppPaymentInvoice[0]}
                <div className="card-header-actions">
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed11(!collapsed11)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed11 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed11}>
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
                    <CRow>
                      <CCol xs="12" sm="6" md="12">
                        <CLabel
                          style={{ color: "#056776" }}
                          htmlFor="file-input-invoice"
                        >
                          <BsFileEarmarkArrowDown
                            className="text-center"
                            style={{
                              width: "100px",
                              height: "100px",
                              color: "#056776",
                            }}
                          ></BsFileEarmarkArrowDown>
                          {Constant.btAddAttachFile}
                        </CLabel>
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                        {fileViews()}
                        {/* </CFormGroup> */}
                      </CCol>
                    </CRow>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CForm>
          </CCard>

          <CCard color="gradient-secondary" className="color-card-gra p-3">
            <CForm className="header-need-validation">
              <CCardHeader
                className="font-form-scg-card"
                style={{ backgroundColor: "#50949f", color: "white" }}
              >
                {Constant.arrFieldTransAppPaymentInvoice[1]}
                <div className="card-header-actions">
                  <CLink
                    className="card-header-action"
                    onClick={() => setCollapsed10(!collapsed10)}
                  >
                    <CIcon
                      className="collap-icon"
                      style={{ color: "white" }}
                      name={
                        collapsed10 ? "cil-chevron-bottom" : "cil-chevron-top"
                      }
                    />
                  </CLink>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed10}>
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
                    <CCol xs="12" sm="6" md="12">
                      <CFormGroup style={{ backgroundColor: "white" }}>
                        <CLabel
                          style={{ color: "#056776" }}
                          htmlFor="file-input-support"
                        >
                          <BsFileEarmarkArrowDown
                            className="text-center"
                            style={{
                              width: "100px",
                              height: "100px",
                              color: "#056776",
                            }}
                          ></BsFileEarmarkArrowDown>
                          {Constant.btAddAttachFile}
                        </CLabel>
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                        {SupportFileViews()}
                      </CFormGroup>
                    </CCol>
                  </CCardBody>
                </Box>
              </CCollapse>
            </CForm>
          </CCard>
        </CForm>
      );
    }
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

  const setFormatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const setZeroTwoDigit = (value) => {
    var txtValue = "" + value + "";
    if (value / 10 < 1) {
      txtValue = "0" + value;
    }
    return txtValue;
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
    if (type === "source") {
      if (getHasObjectValue(values)) {
        newArr[0] = values;
      } else {
        newArr[0] = {};
      }
    } else if (type === "transporter") {
      if (getHasObjectValue(values)) {
        newArr[1] = values;
      } else {
        newArr[1] = {};
      }
    } else if (type === "trucktype") {
      if (getHasObjectValue(values)) {
        newArr[2] = values;
      } else {
        newArr[2] = {};
      }
    } else if (type === "paymentstatus") {
      if (getHasObjectValue(values)) {
        newArr[3] = values;
      } else {
        newArr[3] = {};
      }
    } else if (type === "company") {
      if (getHasObjectValue(values)) {
        newArr[4] = values;
      } else {
        newArr[4] = {};
      }
    }
    setSelectItemsSearch(newArr);
  };

  const onClickCheckSearchData = () => {
    var newArr = [...selectItemsSearch];
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var monthyear = "";
    var isPass = false;

    if (dateStart === "" && dateEnd === "" && monthyear === "") {
      setInvalidFormSearch([true, true, true]);
    } else if (dateStart !== "" && dateEnd === "" && monthyear === "") {
      setInvalidFormSearch([false, true, false]);
    } else if (dateStart === "" && dateEnd !== "" && monthyear === "") {
      setInvalidFormSearch([true, false, false]);
    } else if (dateStart === "" && dateEnd === "" && monthyear !== "") {
      setInvalidFormSearch([false, false, false]);
      isPass = true;
    } else if (dateStart !== "" && dateEnd !== "" && monthyear === "") {
      setInvalidFormSearch([false, false, false]);
      isPass = true;
    } else if (dateStart !== "" && dateEnd !== "" && monthyear !== "") {
      setIsShowWarningSearch(!isShowWarningSearch);
    }
    if (
      getIsValidForm("search-startend-need-validation") &&
      Object.keys(newArr[1]).length
    ) {
      setInvalidMaterialFormSearch([false]);
      if (isPass) {
        setCollsFormSearch(false);
        onClickSearchData();
      } else {
        setBaseItems([]);
      }
    } else {
      if (!Object.keys(newArr[1]).length) {
        setInvalidMaterialFormSearch([true]);
      } else {
        setInvalidMaterialFormSearch([false]);
      }
      setBaseItems([]);
    }
  };

  const onClickClearData = () => {
    document.getElementById("search-datestart").value = "";
    document.getElementById("search-dateend").value = "";

    document.getElementById("search-refNo").value = "";
    document.getElementById("search-allPayNo").value = "";
    document.getElementById("search-deliveryMode").value = "";
    document.getElementById("search-dueDate").value = "";
  };

  const onClickSearchData = () => {
    var arrSelect = [...selectItemsSearch];
    var dateStart = document.getElementById("search-datestart").value;
    var dateEnd = document.getElementById("search-dateend").value;
    var monthyear = "";
    var duedate = document.getElementById("search-dueDate").value;
    var refNo = document.getElementById("search-refNo").value;
    var paymentNo = document.getElementById("search-paymentNo").value;
    var allPayNo = document.getElementById("search-allPayNo").value;
    var attachFileStatus = document.getElementById(
      "search-attachfilestatus"
    ).value;

    var companyId = getHasObjectValue(arrSelect[4])
      ? arrSelect[4].companyId
      : null;
    var transporterId = getHasObjectValue(arrSelect[1])
      ? arrSelect[1].transporterId
      : null;
    var paymentStatus = getHasObjectValue(arrSelect[3])
      ? arrSelect[3].displayMember
      : null;

    dateStart = dateStart !== "" ? dateStart : null;
    dateEnd = dateEnd !== "" ? dateEnd : null;
    monthyear = monthyear !== "" ? monthyear : null;
    refNo = refNo !== "" ? refNo : null;
    allPayNo = allPayNo !== "" ? allPayNo : null;
    paymentNo = paymentNo !== "" ? paymentNo : null;
    duedate = duedate !== "" ? duedate : null;
    attachFileStatus = attachFileStatus !== "" ? attachFileStatus : null;

    var newArr = [
      dateStart,
      dateEnd,
      transporterId,
      paymentNo,
      refNo,
      allPayNo,
      paymentStatus,
      companyId,
      duedate,
      attachFileStatus,
    ];

    // console.log(newArr);
    fnGetDataList(newArr);
  };

  const onClickApproveStatusList = () => {
    setChangeStatusType("Approve");
    setIsConfirmChangeStatus(!isConfirmChangeStatus);
  };

  const onClickRejectStatusList = () => {
    setChangeStatusType("Reject");
    setIsConfirmChangeStatus(!isConfirmChangeStatus);
  };

  const onClickChangeStatusList = () => {
    setIsConfirmChangeStatus(!isConfirmChangeStatus);
    var arrChangeStatus = baseItems.filter((x) => x.isChecked === true);
    var arrStatus = [];
    if (arrChangeStatus.length) {
      arrChangeStatus.map((x) => {
        var newObj = { paymentNo: null, remark: null };
        newObj.paymentNo = x.paymentNo;
        if (x.rejectReason !== "") {
          newObj.remark = x.rejectReason;
        } else {
          newObj.remark = null;
        }
        arrStatus.push(newObj);
      });
    }
    // console.log(arrStatus);

    if (changeStatusType !== "") {
      if (changeStatusType === "Approve") {
        fnApprovePaymentList(arrStatus);
      } else if (changeStatusType === "Reject") {
        fnRejectPaymentList(arrStatus);
      }
    }
  };

  const fnApprovePaymentList = (arrData = []) => {
    Repository.fetchApprovePaymentList(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          setIsShowApproveSuccess(!isShowApproveSuccess);
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setErrorAPI(error);
      }
    );
  };

  const fnRejectPaymentList = (arrData = []) => {
    Repository.fetchRejectPaymentList(arrData).then(
      (result) => {
        if (result.httpCode === "200") {
          setIsShowRejectSuccess(!isShowRejectSuccess);
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setErrorAPI(error);
      }
    );
  };

  const fnGetDataList = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchGetPaymentListViewForApprove(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          // console.log(result.data);
          setBaseItems(
            FunctionController.setIsCheckedObjectInArray(
              FunctionController.setCurrencyAndEmptyValueInArray(
                fieldMain,
                result.data
              )
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

  const fnGetDataPaymentListById = (paymentId) => {
    setIsPostingData(true);
    Repository.fetchGetCreatPaymentById(paymentId, false).then(
      (result) => {
        setIsPostingData(false);

        if (result.httpCode === "200") {
          // console.log(result.data);
          setEditData(result.data.paymentHeader);
          setExtraChargeData(
            FunctionController.setEmptyValueInArray(result.data.extraChargeList)
          );

          setShipmentData(
            FunctionController.setEmptyValueInArray(
              result.data.transportRateList
            )
          );
          setTotalPrice(result.data.paymentHeader.actualTotalAmount);
          setTotalAmount(result.data.paymentHeader.smptotalAmount);
          var newCC = [];
          var newRe = [];
          var newAp = null;
          setUserApproveListItems(newAp);
          result.data.paymentHeader.tpaymentReviewerAndCcs.map((x) => {
            if (x.type === "3") {
              if (userReviewerListItems.length) {
                newRe = [...userReviewerListItems];
              }
              x.firstName = "[" + x.userName + "]" + "" + x.aliasName;
              newRe.push(x);
            }
            if (x.type === "2") {
              if (userCCListItems.length) {
                newCC = [...userCCListItems];
              }
              x.firstName = "[" + x.userName + "]" + "" + x.aliasName;
              newCC.push(x);
            }
            if (x.type === "1") {
              // console.log(x);
              if (x) {
                //console.log(x)
                setUserApproveListItems(x);
                console.log(x);
              }
            }
          });

          setUserReviewerListItems(newRe);
          setUserCCListItems(newCC);
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
      Repository.fetchTransporterListForCreate().then(
        (result) => {
          if (result.httpCode === "200") {
            // //console.log(result.data);
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

  const fnGetApproveStatusNameOnlyList = () => {
    if (!approveStatusList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("AttachFileStatus").then(
        (result) => {
          if (result.httpCode === "200") {
            setApproveStatusList(result.data);
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

  const fnGetPaymentStatusNameOnlyList = () => {
    if (!paymentStatusList.length || paymentStatusList.length <= 1) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("PaymentStatus").then(
        (result) => {
          if (result.httpCode === "200") {
            setPaymentStatusList(result.data);
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

  const fnDownloadFile = (streamFile, fileType, typeName, name) => {
    setIsPostingData(true);
    Repository.fetchCreatePaymentDownloadFile(streamFile, fileType, name).then(
      (result) => {
        setIsPostingData(false);
        if (result.status === 200) {
          result.blob().then((blob) => {
            if (typeName === "image") {
              setShowFileImage(blob);
            } else if (typeName === "file") {
              console.log(typeName);
              setDownloadFile(blob, name, fileType);
            }
          });
        } else {
          setErrorAPI("ไม่สามารถดาวน์โหลดไฟล์ได้");
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetUserApproveList = () => {
    if (!userApproveList.length) {
      Repository.fetchGetPaymentUserListByUserType(
        totalAmount,
        "Approver"
      ).then(
        (result) => {
          if (result.httpCode === "200") {
            // console.log(result.data);
            setUserApproveList(result.data);
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

  const fnGetUserCCList = () => {
    if (!userCCList.length) {
      Repository.fetchGetPaymentUserListByUserType(null, "CC").then(
        (result) => {
          if (result.httpCode === "200") {
            setUserCCList(result.data);
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

  const fnGetUserReviewerList = () => {
    if (!userReviewerList.length) {
      Repository.fetchGetPaymentUserListByUserType(null, "Reviewer").then(
        (result) => {
          if (result.httpCode === "200") {
            setUserReviewerList(result.data);
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

  const fnCheckUserAuth = () => {
    var result = FunctionController.getUserAuthenOneRole(appCode);
    if (result.isAuth) {
      setRoleUser(result.roleCode);
      initeState();
    } else {
      setIsLoaded(true);
      setError(Constant.apiMessageUnAuthenToUsePage);
    }
  };

  const initeState = () => {
    fnGetStartEndDate();
    fnGetCbDeliveryMode();
    fnGetUserList();
    fnGetUserApproveList();
    fnGetUserCCList();
    fnGetUserReviewerList();
    fnGetCbLocationCode();
    fnGetCbDocumentType();
    fnGetCbServiceTeam();
    fnGetCbPaymentType();
    fnGetCbGrApprove();
    fnGetCbCurrencyType();
    fnGetApproveStatusNameOnlyList();
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

  const fnGetCbGrApprove = () => {
    Repository.fetchCbGrApproveList().then(
      (result) => {
        if (result.httpCode === "200") {
          setGrApproveType(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCbPaymentType = () => {
    Repository.fetchCbPaymentTypeList().then(
      (result) => {
        if (result.httpCode === "200") {
          setCbPaymentType(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCbCurrencyType = () => {
    Repository.fetchCbAll("CurrencyType").then(
      (result) => {
        if (result.httpCode === "200") {
          setCbCurrencyType(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCbLocationCode = () => {
    Repository.fetchCbAll("LocationCode").then(
      (result) => {
        if (result.httpCode === "200") {
          setCbLocationCode(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCbServiceTeam = () => {
    Repository.fetchCbAll("ServiceTeam").then(
      (result) => {
        if (result.httpCode === "200") {
          var newResult = result.data.filter((x) => x.valueMember !== "01"); //Because IsDomestic
          setCbServiceTeam(newResult);
          // //console.log(newResult);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCbDocumentType = () => {
    Repository.fetchCbAll("DocumentType").then(
      (result) => {
        if (result.httpCode === "200") {
          setCbDocumentType(result.data);
          // //console.log(newResult);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCompanyListById = (companyId) => {
    Repository.fetchGetCompanyListById(companyId).then(
      (result) => {
        if (result.httpCode === "200") {
          setCompanyList(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCompanyListByMain = () => {
    var TransporterId = selectItemsSearch[1].transporterId;
    Repository.fetchTransporterListByMain(TransporterId).then(
      (result) => {
        if (result.httpCode === "200") {
          setTransportByMain(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCompanyCost = () => {
    Repository.fetchGetCompanyCostList(baseItems[0].companyId).then(
      (result) => {
        if (result.httpCode === "200") {
          setCbCompanyCost(result.data);
          //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnBaseGetCompanyList = () => {
    Repository.fetchCompanyList().then(
      (result) => {
        if (result.httpCode === "200") {
          setCbCompanyList(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetCbDeliveryMode = () => {
    Repository.fetchCbAll("ExportModeId").then(
      (result) => {
        if (result.httpCode === "200") {
          setDeliveryMode(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
  };

  const fnGetUserList = () => {
    var newObj = [null, null, null, null, null, null];
    Repository.fetchGetUserList(newObj).then(
      (result) => {
        if (result.httpCode === "200") {
          setUserRequestorList(result.data);
          // //console.log(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        setError(error);
      }
    );
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
                <h6 className="ml-2 mt-1 p-0">
                  {Constant.arrTextGroupTransDomDelData[0]}
                </h6>
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
              <CForm className="search-startend-need-validation">
                <CRow className="ml-2 mr-2 p-0">
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransDomDeliverySearch[0]}
                      </CLabel>
                      {FunctionController.showtext()}
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
                          id="search-datestart"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          invalid={invalidFormSearch[0]}
                        />
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransDomDeliverySearch[1]}
                      </CLabel>
                      {FunctionController.showtext()}
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
                          id="search-dateend"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          invalid={invalidFormSearch[1]}
                        />
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6" sm="6" md="3">
                    <CFormGroup>
                      <CLabel htmlFor="cvv">
                        {Constant.arrFieldTransAppPaymentDetailFormBody[4]}
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
                        <CInput size="xs" type="date" id="search-dueDate" />
                        <CInvalidFeedback>
                          {Constant.inValidNullMessage}
                        </CInvalidFeedback>
                      </Box>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" sm="6" md="3">
                    <CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="name">
                          {Constant.arrFieldTransDomDeliveryMain[2]}
                        </CLabel>
                        {FunctionController.showtext()}
                        <Box
                          className="border-set"
                          component={Grid}
                          item
                          boxShadow={1}
                          xs={{
                            width: " 100%",
                          }}
                        >
                          {showInputTransporter()}
                        </Box>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
              <CRow className="ml-2 mr-2 p-0">
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.arrFieldTransAppPaymentDetailFormBody[0]}
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
                        {showInputCompanyList()}
                      </Box>
                    </CFormGroup>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="cvv">
                      {Constant.arrFieldTransAppPaymentMain[8]}
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
                        disabled
                      // style={{ height: Constant.styleHeightField }}
                      >
                        <option selected value="">
                          {Constant.txtMasterContactDomestic}
                        </option>
                      </CSelect>
                    </Box>
                    <CInvalidFeedback>
                      {Constant.inValidNullMessage}
                    </CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="6" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.arrFieldTransAppPaymentMain[11]}
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
                          id="search-allPayNo"
                          maxLength="20"
                        />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullSelected}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CFormGroup>
                </CCol>
                <CCol xs="6" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.arrFieldTransAppPaymentMain[16]}
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
                        <CInput type="text" id="search-refNo" maxLength="20" />
                      </Box>
                      <CInvalidFeedback>
                        {Constant.inValidNullSelected}
                      </CInvalidFeedback>
                    </CFormGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className="ml-2 mr-2 p-0">
                <CCol xs="6" sm="6" md="3">
                  <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.arrFieldTransAppPaymentMain[2]}
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
                          id="search-paymentNo"
                          maxLength="20"
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
                    <CFormGroup>
                      <CLabel htmlFor="name">
                        {Constant.arrFieldTransDomDeliveryMain[13]}
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
                          id="search-paymentstatus"
                          size="small"
                          options={paymentStatusList}
                          onChange={handleChangeSelectSearch("paymentstatus")}
                          getOptionLabel={(option) => `${option.displayMember}`}
                          renderOption={(option) => {
                            return (
                              <Typography
                                className={classes.autoCompleteRenderOptions}
                              >
                                {option.displayMember}
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
                                onClick={fnGetPaymentStatusNameOnlyList}
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
                <CCol xs="12" sm="6" md="3">
                  <CFormGroup>
                    <CLabel htmlFor="cvv">
                      {Constant.arrFieldTransAppPaymentMain[0]}
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
                      <CSelect id="search-attachfilestatus" required>
                        <option
                          selected
                          hidden
                          value={
                            approveStatusList.length
                              ? approveStatusList.find(
                                (x) => x.valueMember === "3"
                              ).displayMember
                              : ""
                          }
                        >
                          {approveStatusList.length
                            ? approveStatusList.find(
                              (x) => x.valueMember === "3"
                            ).displayMember
                            : Constant.txtformPlaceholderSelected}
                        </option>
                        <option value="">{Constant.txtFormAllSelected}</option>
                        {approveStatusList.map((cb) => (
                          <option value={cb.displayMember}>
                            {cb.displayMember}{" "}
                          </option>
                        ))}
                      </CSelect>
                      <CInvalidFeedback>
                        {Constant.inValidNullMessage}
                      </CInvalidFeedback>
                    </Box>
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
                        size={Constant.btSeacrhSize}
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
                        size={Constant.btSeacrhSize}
                        block
                        color="danger"
                        onClick={onClickClearData}
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
    </div>
  );

  const showInputLocation = () => {
    if (Object.keys(editData).length) {
      var newShowData = { ...editData };
      var paymentTypeCode = newShowData.paymentTypeId;
      if (paymentTypeCode === "01") {
        return (
          <CRow>
            <CCol xs="12" sm="6" md="12">
              <MdSwitchAccount
                size="30px"
                style={{ color: "grey", size: "100px" }}
              />
              <CLabel className="base-Label pl-2">xxxx-xxx-x-xxx-xxx</CLabel>
            </CCol>
            <CCol xs="12" sm="12" md="12">
              <RiBankFill
                size="30px"
                style={{ color: "grey", size: "100px" }}
              />
              <CLabel className="base-Label pl-2">
                {selectItemsCreatePayment[0].bankName}
              </CLabel>
            </CCol>
          </CRow>
        );
      } else if (
        paymentTypeCode === "02" ||
        paymentTypeCode === "03" ||
        paymentTypeCode === "04"
      ) {
        return (
          <CCol xs="12" sm="6" md="6">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFieldTransAppPaymentDetailFormBody[11]}
                </CLabel>
                {showtext()}
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
                    id="create-payment-LocationCode"
                    value={newShowData.placeCheque}
                    disabled
                    required
                  >
                    <option selected hidden value="">
                      {Constant.txtformPlaceholderSelected}
                    </option>
                    {cbLocationCode.map((cb) => (
                      <option value={cb.valueMember}>{cb.displayMember}</option>
                    ))}
                  </CSelect>
                  <CInvalidFeedback>
                    {Constant.inValidNullSelected}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CFormGroup>
          </CCol>
        );
      } else {
        return (
          <CCol xs="12" sm="6" md="6">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFieldTransAppPaymentDetailFormBody[11]}
                </CLabel>
                {showtext()}
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
                    id="create-payment-LocationCode"
                    disabled
                    required
                  >
                    <option selected hidden value="">
                      {Constant.txtformPlaceholderSelected}
                    </option>
                    {cbLocationCode.map((cb) => (
                      <option value={cb.valueMember}>{cb.displayMember}</option>
                    ))}
                  </CSelect>
                  <CInvalidFeedback>
                    {Constant.inValidNullSelected}
                  </CInvalidFeedback>
                </Box>
              </CFormGroup>
            </CFormGroup>
          </CCol>
        );
      }
    }
  };

  const showInputServiceTeam = () => {
    if (Object.keys(editData).length) {
      var newShowData = { ...editData };
      if (selectItemsSearch[1].icflag === true) {
        return (
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFieldTransAppPaymentDetailFormBody[12]}
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
                    id="create-payment-serviceTeam"
                    value={newShowData.serviceTeamCode}
                    disabled={isEdit}
                    required
                  >
                    <option selected hidden value="">
                      {Constant.txtformPlaceholderSelected}
                    </option>
                    {serviceTeam.map((cb) => (
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
        );
      } else {
        return (
          <CCol xs="12" sm="6" md="3">
            <CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">
                  {Constant.arrFieldTransAppPaymentDetailFormBody[12]}
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
                    id="create-payment-serviceTeam"
                    value={newShowData.serviceTeamCode}
                    disabled={isEdit}
                    required
                  >
                    <option selected hidden value="">
                      {Constant.txtformPlaceholderSelected}
                    </option>
                    {serviceTeam.map((cb) => (
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
        );
      }
    }
  };

  const showInputCompanyList = () => {
    return (
      <Autocomplete
        id="search-Company"
        size="small"
        options={cbCompanyList}
        onChange={handleChangeSelectSearch("company")}
        getOptionLabel={(option) =>
          `[${option.companyCode}] ` + option.companyName
        }
        renderOption={(option) => {
          return (
            <Typography className={classes.autoCompleteRenderOptions}>
              {`[${option.companyCode}] ` + option.companyName}
            </Typography>
          );
        }}
        renderInput={(params) => {
          params.inputProps.className = classes.autoCompleteInputLabel;
          return (
            <TextField
              size="small"
              {...params}
              onClick={fnBaseGetCompanyList}
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
    );
  };

  const showInputTransporter = () => {
    return (
      <Autocomplete
        id="search-transporter"
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
              error={invalidMaterialFormSearch[0]}
              {...params}
              onClick={fnGetTransporterNameOnlyList}
              label={
                <Typography className={classes.autoCompleteInputLabel}>
                  {Constant.txtformPlaceholderSelected}
                </Typography>
              }
              helperText={
                invalidMaterialFormSearch[0] ? (
                  <Typography className={classes.autoCompleteInputHelperText}>
                    {Constant.inValidNullMessage}
                  </Typography>
                ) : null
              }
              variant="outlined"
            />
          );
        }}
      />
    );
  };

  const showButtonManage = () => {
    return (
      <CRow class="d-flex justify-content-end">
        <CCol xs="4" sm="3" md="2">
          <CFormGroup>
            <CButton
              className="btn-success"
              size={Constant.btHeaderSize}
              block
              onClick={onClickApproveStatusList}
            >
              {Constant.btApprove}
            </CButton>
          </CFormGroup>
        </CCol>
        <CCol xs="4" sm="3" md="2">
          <CFormGroup>
            <CButton
              className="btn-warning"
              size={Constant.btHeaderSize}
              block
              onClick={onClickRejectStatusList}
            >
              {Constant.btReJect}
            </CButton>
          </CFormGroup>
        </CCol>
      </CRow>
    );
  };

  const mainTable = () => {
    return (
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <CButton color="secondary" onClick={onChangeSetAllIsChecked}>
                {Constant.btSelectAll}
              </CButton>
            </CCol>
          </CRow>
          <CDataTable
            Toolbar={{}}
            columnFilter
            tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
            itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
            className="CDataTable"
            items={baseItems}
            fields={fieldMain}
            hover
            striped
            bordered
            size="sm"
            itemsPerPage={10}
            pagination
            scopedSlots={{
              checkbox: (item) => {
                if (item.attachFileStatus !== "Wait for Approve") {
                  return <td className="py-2"></td>;
                } else {
                  return (
                    <td className="py-2">
                      <Checkbox
                        checked={item.isChecked}
                        color="primary"
                        onChange={onChangeIsChecked(item.paymentId)}
                      />
                    </td>
                  );
                }
              },
              dueDate: (item) => {
                var newDate = new Date(item.dueDate);
                newDate = newDate.toLocaleDateString();
                return <td className="py-2">{newDate}</td>;
              },
              startDate: (item) => {
                var newDate = new Date(item.startDate);
                newDate = newDate.toLocaleDateString();
                return <td className="py-2">{newDate}</td>;
              },
              durationDate: (item) => (
                <td>
                  <CLabel>{item.durationDate} Day</CLabel>
                </td>
              ),
              creditTerm: (item) => (
                <td>
                  <CLabel>{item.creditTerm} Day</CLabel>
                </td>
              ),
              attachFileStatus: (item) => (
                <td>
                  <h4>
                    <CBadge color={getBadge(item.attachFileStatus)}>
                      {item.attachFileStatus}
                    </CBadge>
                  </h4>
                </td>
              ),
              paymentStatus: (item) => (
                <td>
                  <h4>
                    <CBadge color={getBadge(item.paymentStatus)}>
                      {item.paymentStatus}
                    </CBadge>
                  </h4>
                </td>
              ),
              show_details: (item, index) => (
                <td className="py-2">{dialogs(item.paymentId, "edit")}</td>
              ),
              rejectReason: (item, index) => {
                if (item.attachFileStatus !== "Wait for Approve") {
                  return <td className="py-2">{item.rejectReason}</td>;
                } else {
                  return (
                    <td className="py-2">
                      <CInput
                        type="text"
                        onBlur={onChangeRejectReason(item.paymentId)}
                      />
                    </td>
                  );
                }
              },
            }}
          />
        </CCardBody>
      </CCard>
    );
  };

  const layoutDialogInvoice = () => {
    return (
      <h6>
        <Dialog
          // fullScreen
          fullWidth
          maxWidth="100%"
          size="xl"
          open={isShowDialogInvoice}
          onClose={onClickCloseDialogInvoice}
          TransitionComponent={Transition}
        >
          <AppBar className={_classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="default"
                onClick={onClickCloseDialogInvoice}
                aria-label="close"
              ></IconButton>
              <Typography variant="h6" className={_classes.title}>
                <h3>{Constant.txtFormHeaderInvoiceData}</h3>
              </Typography>
              <CButton
                className="btt-close"
                onClick={onClickCloseDialogInvoice}
              >
                <h5>{Constant.txtDialogFormClose}</h5>
              </CButton>
            </Toolbar>
          </AppBar>
          <List>{collapseHeaderInvoice(isType)}</List>
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

      {/* Start Error Datetime Search Modal */}
      <CModal
        show={isShowWarningSearch}
        onClose={() => setIsShowWarningSearch(!isShowWarningSearch)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentWarningForDateTimeOrMontYearSearch}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowWarningSearch(!isShowWarningSearch)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Error Datetime Search Modal */}

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
          <CButton color="success" onClick={onClickChangeStatusList}>
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
        <CModalBody>{Constant.contentSuccessApprovePayment}</CModalBody>
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
        <CModalBody>{Constant.contentSuccessRejectPayment}</CModalBody>
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
                <CCardHeader>
                  <CRow>
                    <CCol xs="6" sm="8" md="10">
                      <h3 className="headtext">
                        {Constant.txtTransactionApprovePaymentList}
                      </h3>
                    </CCol>
                    <CCol xs="6" sm="4" md="2">
                      {layoutDialogInvoice()}
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  {formSearch()}
                  {mainTable()}
                  {showButtonManage()}
                  {modalForm()}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  }
};

export default ApproveDomesticPayment;
