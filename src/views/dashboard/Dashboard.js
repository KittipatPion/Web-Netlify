import React, { useState, useEffect } from "react";
import Repository from "../../repositories/Repository";
import Constant from "../../helpers/Constant";
import logoicon from "../../assets/icons/header.png";
import logoallpay from "../../assets/icons/allpay.png";
import scglogo from "../../assets/icons/SCG LOGISTICS.png";
import famouslogo from "../../assets/icons/FAMOUS LOGISTICS.png";
import interlogo from "../../assets/icons/Intertransport.png";
import pjtlogo from "../../assets/icons/PJ Transpack.png";
import scgclogo from "../../assets/icons/SCG Chemicals.png";
import smclogo from "../../assets/icons/SMC LOGISTICS.png";
import stnlogo from "../../assets/icons/STN.png";
import tripleilogo from "../../assets/icons/TRIPLE I.png";
import tssklogo from "../../assets/icons/TSSK LOGISTICS.png";
import yusenlogo from "../../assets/icons/YUSEN LOGISTICS .png";
import smclogonew from "../../assets/icons/SMC.png";
import payment01 from "../../assets/icons/55.png";
import payment02 from "../../assets/icons/66.png";
import nologo from "../../assets/icons/noLogo.jpg";
// import logoicon2 from "../../assets/icons/smp-logo5.png";

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
  CCallout,
  CCardFooter,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInvalidFeedback,
  CWidgetIcon,
  CWidgetBrand,
  CProgress,
  CSwitch,
  CLink,
  CSubheader,
  CBreadcrumbRouter,
  CRow,
  CWidgetProgress,
  CWidgetProgressIcon,
  CButtonToolbar,
  CImg,
} from "@coreui/react";

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
import MakeStyleSheet from "../../helpers/MakeStyleSheet";
import FunctionController from "../../helpers/FunctionController";
import ChartLineSimple from "../charts/ChartLineSimple";
import { Chart } from "chart.js";
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from "@coreui/react-chartjs";

import MainChartExample from "../charts/MainChartExample.js";
import { Divider } from "@mui/material";
import {
  FcAcceptDatabase,
  FcWorkflow,
  FcDoNotMix,
  FcDataBackup,
  FcMultipleInputs,
  FcInspection,
  FcOk,
  FcImport,
  FcExpired,
  FcReadingEbook,
  FcCancel,
} from "react-icons/fc";
import { min } from "date-fns";

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

const fieldMain = [
  // {
  //   key: "manage",
  //   label: "",
  //   _style: { width: "4%" },
  //   sorter: false,
  //   filter: false,
  // },

  {
    key: "transporterShortName",
    label: "ผู้รับเหมา",
  },
  {
    key: "domExp",
    label: "DOM/EXP/TRN",
    // digit: 3,
    // issumvalue: true,
  },
  {
    key: "typeName",
    label: "Status",
    // digit: 3,
    // issumvalue: true,
  },
  {
    key: "qty",
    label: "Shipment Qty",
    // digit: 3,
    // issumvalue: true,
  },
  // {
  //   key: "qty",
  //   label: "ยอดรวม (BAHT)",
  //   // digit: 3,
  //   // issumvalue: true,
  // },
  {
    key: "dateDiffQty",
    label: "ค้างชำระ",
  },
];

const fieldMainDash5 = [
  {
    key: "companyShortName",
    label: "Company",
    _style: { width: "4%" },
  },
  {
    key: "allPayNo",
    label: "Detail",
    _style: { width: "10%" },
    // digit: 3,
    // issumvalue: true,
  },
  {
    key: "paymentStatus",
    label: "Status",
  },
  {
    key: "transporterShortName",
    label: "",
    _style: { width: "3%" },
    sorter: false,
    filter: false,
  },
  {
    key: "transporterName",
    label: "Vendor",
    _style: { width: "8%" },
    sorter: false,
    filter: false,
  },
  {
    key: "dueDate",
    label: "Date",
    // digit: 3,
    // issumvalue: true,
  },
  {
    key: "actualTotalAmount",
    label: "Amount",
  },
  {
    key: "paymentTypeId",
    label: "Payment",
  },
  {
    key: "updateDateTime",
    label: "LastUpdate",
    // digit: 3,
    // issumvalue: true,
  },
];

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isPostingData, setIsPostingData] = useState(false);
  const [errorAPI, setErrorAPI] = useState(null);

  const [isChangeRePassword, setIsChangeRePassword] = useState(false);
  const [isShowFormChangePass, setIsShowFormChangePass] = useState(false);
  const [isShowSuccessChangePass, setIsShowSuccessChangePass] = useState(false);
  const [isShowWarningPassExp, setIsShowWarningPassExp] = useState(false);

  const [isFailChangePass, setFailChangePass] = useState(false);

  const [countDateExp, setCountDateExp] = useState(0);

  const [dashboardData, setDashboardData] = useState([]);
  const [dashboardData2, setDashboardData2] = useState([]);
  const [dashboardData3, setDashboardData3] = useState([]);
  const [dashboardData4, setDashboardData4] = useState([]);
  const [dashboardData5, setDashboardData5] = useState([]);

  const [dashboardMain, setDashboardMain] = useState([]);
  const [dashboardMain1, setDashboardMain1] = useState([]);
  const [dashboardMain2, setDashboardMain2] = useState([]);
  const [dashboardMain3, setDashboardMain3] = useState([]);
  const [dashboardMain4, setDashboardMain4] = useState([]);
  const [dashboardMain6, setDashboardMain6] = useState([]);
  const [dashboardMainExp6, SetDashboardMainExp6] = useState([]);

  const [dashboardMain7, setDashboardMain7] = useState([]);
  const [dashboardMain8, setDashboardMain8] = useState([]);
  const [dashboardMain9, setDashboardMain9] = useState([]);
  const [dashboardMain10, setDashboardMain10] = useState([]);
  const [transportByMain, setTransportByMain] = useState([]);

  const empCode = "/tnsctpedomdelv";
  const trstCode = "/tnsctrstdomdelv";

  const theme = useTheme();
  const classes = useStyles();

  const _UserId = parseInt(localStorage.getItem("userId"));
  const _TranspoterId = parseInt(localStorage.getItem("transporterId"));

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

  const handleChangeValidationPassword = (e) => {
    var upperChar = /[A-Z]/g;
    var numberChar = /[0-9]/g;
    var specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var length = 8;
    var input = e.target.value;

    if (input.match(upperChar)) {
      document.getElementById("rules-01").style.color = "green";
    } else {
      document.getElementById("rules-01").style.color = "red";
    }

    if (input.match(numberChar)) {
      document.getElementById("rules-02").style.color = "green";
    } else {
      document.getElementById("rules-02").style.color = "red";
    }

    if (input.match(specialChar)) {
      document.getElementById("rules-03").style.color = "green";
    } else {
      document.getElementById("rules-03").style.color = "red";
    }

    if (input.length >= length) {
      document.getElementById("rules-04").style.color = "green";
    } else {
      document.getElementById("rules-04").style.color = "red";
    }
  };

  const onClickChangePassword = () => {
    var pass = document.getElementById("change-password").value;
    var rePass = document.getElementById("change-re-password").value;
    if (getIsValidForm("change-pass-need-validation") && pass === rePass) {
      setIsChangeRePassword(false);
      setIsShowFormChangePass(!isShowFormChangePass);
      var userId = _UserId;
      var newArr = [userId, pass];

      // document.getElementById("rules-01").style.color = "red";
      // document.getElementById("rules-02").style.color = "red";
      // document.getElementById("rules-03").style.color = "red";
      // document.getElementById("rules-04").style.color = "red";

      // ////console.log(newArr);
      fnChangePassword(newArr);
    } else if (pass !== rePass) {
      setNoValidateForm("change-pass-need-validation");
      setIsChangeRePassword(true);
    } else {
      setIsChangeRePassword(false);
    }
  };

  const onClickCloseErrorAPI = () => {
    setErrorAPI(null);
    if (isFailChangePass) {
      setNoValidateForm("change-pass-need-validation");
      setFailChangePass(false);
      setIsShowFormChangePass(!isShowFormChangePass);
    }
  };

  const fnChangePassword = (arrData = []) => {
    setIsPostingData(true);
    Repository.fetchChangePasswordByUser(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIsShowSuccessChangePass(!isShowSuccessChangePass);
        } else {
          setFailChangePass(true);
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsPostingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fnGetDashboardData = () => {
    Repository.fetchGetDashBoard().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // ////console.log(result.data.filter((x) => x.countryId === 213))
          setDashboardData(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        ////console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetDashboardData2 = () => {
    Repository.fetchGetDashBoard2().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // ////console.log(result.data.filter((x) => x.countryId === 213))
          setDashboardData2(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        ////console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetDashboardData3 = () => {
    Repository.fetchGetDashBoard3().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // ////console.log(result.data.filter((x) => x.countryId === 213))
          setDashboardData3(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        ////console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetDashboardData4 = () => {
    Repository.fetchGetDashBoard4().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // ////console.log(result.data.filter((x) => x.countryId === 213))
          setDashboardData4(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        ////console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetDashboardData5 = () => {
    Repository.fetchGetDashBoard5().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // ////console.log(result.data.filter((x) => x.countryId === 213))
          console.log("Dash5", result.data);
          setDashboardData5(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        ////console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnGetDashboardMain = () => {
    Repository.fetchGetDashBoardMain().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          // ////console.log(result.data.filter((x) => x.countryId === 213))
          var dash1 = result.data.filter((x) => x.dashNo === 1);
          setDashboardMain1(dash1);
          //console.log("dash1", dash1);
          var dash2 = result.data.filter((x) => x.dashNo === 2);
          setDashboardMain2(dash2);
          //console.log("dash2", dash2);
          var dash3 = result.data.filter((x) => x.dashNo === 3);
          setDashboardMain3(dash3);
          console.log("dash3", dash3);
          var dash4 = result.data.filter((x) => x.dashNo === 4);
          setDashboardMain4(dash4);
          //console.log("dash4", dash4);
          var dash6 = result.data.filter((x) => x.dashNo === 5);
          setDashboardMain6(dash6);
          var dashExp6 = result.data.filter((x) => x.dashNo === 6);
          SetDashboardMainExp6(dashExp6);
          //console.log("dash6", dash6);
          var dash7 = result.data.filter((x) => x.dashNo === 7);
          setDashboardMain7(dash7);
          console.log("dash7", dash7);
          var dash8 = result.data.filter((x) => x.dashNo === 8);
          setDashboardMain8(dash8);
          //console.log("dash8", dash8);
          var dash9 = result.data.filter((x) => x.dashNo === 9);
          setDashboardMain9(dash9);
          //console.log("dash9", dash9);
          var dash10 = result.data.filter((x) => x.dashNo === 10);
          setDashboardMain10(dash10);
          

          ////console.log("Data", result.data);
          setDashboardMain(result.data);
        } else {
          setError(result);
        }
      },
      (error) => {
        ////console.log(error);
        setIsLoaded(true);
        setError(error);
      }
    );
  };

  const fnCheckActivatePassword = () => {
    Repository.fetchGetUserListById(_UserId).then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          var user = result.data;
          if (!user.activatePassword) {
            setIsShowFormChangePass(!isShowFormChangePass);
          } else {
            var date = new Date();
            var result = new Date(user.inActiveDateTime);
            date.setDate(date.getDate() + 15);
            if (result < date) {
              setCountDateExp(result.getDate() - new Date().getDate());
              setIsShowWarningPassExp(!isShowWarningPassExp);
            }
          }
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

  // const fnGetCompanyListByMain = () => {
  //   //console.log(selectItemsSearch[1].transporterId);
  //   Repository.fetchTransporterListByMain(
  //     _TranspoterId
  //   ).then(
  //     (result) => {
  //       // setIsLoaded(true);
  //       if (result.httpCode === "200") {
  //         console.log('setTransportByMain', result.data)
  //         setTransportByMain(result.data);
  //         // //console.log(result.data);
  //       } else {
  //         setError(result);
  //       }
  //     },
  //     (error) => {
  //       setIsLoaded(true);
  //       setError(error);
  //     }
  //   );
  // };

  useEffect(() => {
    fnCheckActivatePassword();
    // fnGetDashboardData();
    // fnGetDashboardData2();
    // fnGetDashboardData3();
    // fnGetDashboardData4();
    fnGetDashboardData5();
    fnGetDashboardMain();
    // fnGetCompanyListByMain()
  }, []);

  const showLoadingData = () => (
    <CCol className="text-center">
      <CLabel>{Constant.apiLoadingData}</CLabel>{" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  );

  const dashboardTest = () => {
    var baseData = [...dashboardData];
    var baseData2 = [...dashboardData2];
    var baseData3 = [...dashboardData3];
    var baseData4 = [...dashboardData4];
    ////console.log(baseData3);
    ////console.log(baseData4);

    var ddash = baseData.filter((x) => x.groupName === "Domestic");

    var edash = baseData.filter((x) => x.groupName === "Export");

    var ddash1 = baseData2.filter((x) => x.groupName === "Domestic");

    var edash1 = baseData2.filter((x) => x.groupName === "Export");

    return (
      <CForm>
        <CRow>
          <CCol>
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
                <CCardHeader className="text-head-dashboard">
                  Create Payment Document (Qty)
                </CCardHeader>
                <CCardBody>
                  <CChartBar
                    style={{ fontFamily: "Scg" }}
                    datasets={[
                      {
                        label: "Export",
                        backgroundColor: "#C0C0C0",
                        id: "bar-x-axis1",
                        borderWidth: 1,
                        data: edash.map((x) => {
                          return x.dataValue;
                        }),
                      },
                      {
                        label: "Domestic",
                        backgroundColor: "#708090",
                        xAxisID: "bar-x-axis2",
                        borderWidth: 1,
                        data: ddash.map((x) => {
                          return x.dataValue;
                        }),
                      },
                    ]}
                    labels={ddash1.map((x) => {
                      return x.monthName;
                    })}
                    options={{
                      tooltips: {
                        bodyFontFamily: "Scg",
                        titleFontFamily: "Scg",
                        enabled: true,
                        callbacks: {
                          label: function (tooltipItem, data) {
                            var tooltipValue =
                              data.datasets[tooltipItem.datasetIndex].data[
                                tooltipItem.index
                              ];
                            return parseFloat(tooltipValue).toLocaleString();
                          },
                        },
                      },
                      legend: {
                        labels: {
                          fontSize: 14,
                          fontFamily: "Scg",
                        },
                      },
                      title: {
                        fontSize: 14,
                        fontFamily: "Scg",
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: false,
                            ticks: {
                              fontSize: 14,
                              fontFamily: "Scg",
                              beginAtZero: true,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            stacked: true,
                            id: "bar-x-axis1",
                            barThickness: 30,
                            ticks: {
                              fontSize: 14,
                              fontFamily: "Scg",
                            },
                          },
                          {
                            display: false,
                            stacked: true,
                            id: "bar-x-axis2",
                            barThickness: 70,
                            // these are needed because the bar controller defaults set only the first x axis properties
                            type: "category",
                            categoryPercentage: 0.8,
                            barPercentage: 0.9,
                            gridLines: {
                              offsetGridLines: true,
                            },
                            offset: true,
                          },
                        ],
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </Box>
          </CCol>
          <CCol>
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
                <CCardHeader className="text-head-dashboard">
                  Create Payment Document (Baht)
                </CCardHeader>
                <CCardBody>
                  <CChartBar
                    datasets={[
                      {
                        label: "Export",
                        backgroundColor: "#C0C0C0",
                        borderWidth: 1,
                        // xAxisID: "bar-x-axis1",
                        data: edash1.map((x) => {
                          return x.dataValue;
                        }),
                      },
                      // {
                      //   label: "Domestic",
                      //   backgroundColor: "#708090",
                      //   borderWidth: 1,
                      //   xAxisID: "bar-x-axis1",
                      //   data: ddash1.map((x) => {
                      //     return x.dataValue;
                      //   }),
                      // },
                      {
                        label: "Domestic",
                        backgroundColor: "#708090",
                        borderWidth: 1,

                        data: ddash1.map((x) => {
                          return x.dataValue;
                        }),
                      },
                    ]}
                    labels={ddash1.map((x) => {
                      return x.monthName;
                    })}
                    options={{
                      tooltips: {
                        bodyFontFamily: "Scg",
                        titleFontFamily: "Scg",
                        enabled: true,
                        callbacks: {
                          label: function (tooltipItem, data) {
                            var tooltipValue =
                              data.datasets[tooltipItem.datasetIndex].data[
                                tooltipItem.index
                              ];
                            return parseFloat(tooltipValue).toLocaleString();
                          },
                        },
                      },
                      legend: {
                        labels: {
                          fontSize: 14,
                          fontFamily: "Scg",
                        },
                      },
                      title: {
                        fontSize: 14,
                        fontFamily: "Scg",
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: false,
                            ticks: {
                              fontSize: 14,
                              fontFamily: "Scg",
                              beginAtZero: true,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            // stacked: true,
                            ticks: {
                              fontSize: 14,
                              fontFamily: "Scg",
                            },
                          },
                        ],
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </Box>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="6">
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
                <CCardHeader className="text-head-dashboard">
                  Create Payment By Transporter (Domestic)
                </CCardHeader>
                <CCardBody>
                  <CChartPie
                    style={{ fontFamily: "Scg" }}
                    datasets={[
                      {
                        backgroundColor: [
                          "#41B883",
                          "#E46651",
                          "#00D8FF",
                          "#DD1B16",
                        ],
                        data: baseData3.map((x) => {
                          return x.dataValue;
                        }),
                      },
                    ]}
                    labels={baseData3.map((x) => {
                      return x.xvalue;
                    })}
                    options={{
                      tooltips: {
                        bodyFontFamily: "Scg",
                        titleFontFamily: "Scg",
                        enabled: true,
                        callbacks: {
                          label: function (tooltipItem, data) {
                            var tooltipValue =
                              data.datasets[tooltipItem.datasetIndex].data[
                                tooltipItem.index
                              ];
                            ////console.log(data);
                            ////console.log(tooltipItem);
                            var str = data.labels[tooltipItem.index];
                            ////console.log(tooltipValue);
                            return (
                              str +
                              "\xa0" +
                              ":" +
                              "\xa0" +
                              parseFloat(tooltipValue).toLocaleString() +
                              "\xa0" +
                              "Baht"
                            );
                          },
                        },
                      },
                      legend: {
                        labels: {
                          fontSize: 14,
                          fontFamily: "Scg",
                        },
                      },
                      title: {
                        fontSize: 14,
                        fontFamily: "Scg",
                      },
                      //   scales: {
                      //     yAxes: [{
                      //         ticks: {
                      //             fontSize: 14,
                      //             fontFamily : 'Scg'

                      //         }
                      //     }],
                      //     xAxes: [{
                      //       ticks: {
                      //           fontSize: 14,
                      //           fontFamily : 'Scg'

                      //       }
                      //   }]
                      // }
                    }}
                  />
                </CCardBody>
              </CCard>
            </Box>
          </CCol>
          <CCol sm="6">
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
                <CCardHeader className="text-head-dashboard">
                  Create Payment By Transporter (Export)
                </CCardHeader>
                <CCardBody>
                  <CChartPie
                    style={{ fontFamily: "Scg" }}
                    className="c-body"
                    datasets={[
                      {
                        backgroundColor: [
                          "#41B883",
                          "#E46651",
                          "#00D8FF",
                          "#DD1B16",
                        ],
                        data: baseData4.map((x) => {
                          return x.dataValue;
                        }),
                      },
                    ]}
                    labels={baseData4.map((x) => {
                      return x.xvalue;
                    })}
                    options={{
                      tooltips: {
                        bodyFontFamily: "Scg",
                        titleFontFamily: "Scg",
                        enabled: true,
                        callbacks: {
                          label: function (tooltipItem, data) {
                            var tooltipValue =
                              data.datasets[tooltipItem.datasetIndex].data[
                                tooltipItem.index
                              ];
                            ////console.log(data);
                            ////console.log(tooltipItem);
                            var str = data.labels[tooltipItem.index];
                            ////console.log(tooltipValue);
                            return (
                              str +
                              "\xa0" +
                              ":" +
                              "\xa0" +
                              parseFloat(tooltipValue).toLocaleString() +
                              "\xa0" +
                              "Baht"
                            );
                          },
                        },
                      },
                      legend: {
                        labels: {
                          fontSize: 14,
                          fontFamily: "Scg",
                        },
                      },
                      title: {
                        fontSize: 14,
                        fontFamily: "Scg",
                      },
                      //   scales: {
                      //     yAxes: [{
                      //         ticks: {
                      //             fontSize: 14,
                      //             fontFamily : 'Scg'

                      //         }
                      //     }],
                      //     xAxes: [{
                      //       ticks: {
                      //           fontSize: 14,
                      //           fontFamily : 'Scg'

                      //       }
                      //   }]
                      // }
                    }}
                  />
                </CCardBody>
              </CCard>
            </Box>
          </CCol>
        </CRow>
      </CForm>
    );
  };

  const dashboardChAndExtra = (typeN) => {
    var baseData;
    var baseData8;
    if (typeN === "transport") {
      baseData = dashboardMain7.filter(
        (x) => x.transporterId === _TranspoterId
      );
      baseData8 = dashboardMain8.filter(
        (x) => x.transporterId === _TranspoterId
      );
      console.log("baseData", baseData);
    } else {
      baseData = dashboardMain7;
      baseData8 = dashboardMain8;
    }

    var tp = [];
    var dateDiff = [];
    var qtyList = [];
    var main12 = [];

    dashboardMain7.map((x) => {
      tp.push(x.transporterShortName);
      dateDiff.push(x.dateDiffQty);
      qtyList.push(x.qty);

      if (x.dateDiffQty === 12) {
        main12.push(x.qty);
      }
    });

    var type = [];
    var mode = [];
    var valuedom = [];
    var valueExp = [];
    var value1 = 0;
    var value2 = 0;
    var value3 = 0;
    var valuedom1 = 0;
    var valuedom2 = 0;
    var valuedom3 = 0;
    var valuetrans1 = 0;
    var valuetrans2 = 0;
    var valuetrans3 = 0;
    if (dashboardMain8.length) {
      var types = [];
      var modes = [];
      baseData8.map((x) => {
        types.push(x.typeName);
        modes.push(x.DomExp);

        if (x.typeName === "Other") {
          if (x.domExp === "DOM") {
            valuedom1 += x.qty;
          } else if (x.domExp === "TRN") {
            valuetrans1 += x.qty;
          } else {
            value1 += x.qty;
          }
        }
        if (x.typeName === "No Assign Province") {
          if (x.domExp === "DOM") {
            valuedom2 += x.qty;
          } else if (x.domExp === "TRN") {
            valuetrans2 += x.qty;
          } else {
            value2 += x.qty;
          }
        }
        if (x.typeName === "No Shipping Contract") {
          if (x.domExp === "DOM") {
            valuedom3 += x.qty;
          } else if (x.domExp === "TRN") {
            valuetrans3 += x.qty;
          } else {
            value3 += x.qty;
          }
        }
      });
      valueExp.push(value1);
      valuedom.push(valuedom1);
      valuedom.push(value2);
      valueExp.push(valuedom2);
      valueExp.push(value3);
      valuedom.push(valuedom3);

      type = [...new Set(types)];
      mode = [...new Set(modes)];
    }

    return (
      <CCol md="12">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              {/* SMP */}
              SMART PAYMENT - RECHECK
            </CCardHeader>
            <CCardBody>
              <CDataTable
                style={{ fontSize: "20px" }}
                // columnFilter
                tableFilter={{
                  label: `${Constant.tabletxtSearch}`,
                  placeholder: `${Constant.tabletxtPlaceholder}`,
                }}
                itemsPerPageSelect={{
                  label: `${Constant.tabletxtCountPage}`,
                }}
                className="CDataTable ml-1 mr-1"
                items={baseData}
                fields={fieldMain}
                // footer
                // fixed
                // striped
                responsive
                bordered
                // size="xl"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  transporterShortName: (item) => {
                    return (
                      <td className="py-2">
                        <h4>{item.transporterShortName}</h4>
                      </td>
                    );
                  },
                  domExp: (item) => {
                    return (
                      <td className="py-2">
                        <h4>{item.domExp}</h4>
                      </td>
                    );
                  },
                  typeName: (item) => {
                    return (
                      <td className="py-2">
                        <h4>{item.typeName}</h4>
                      </td>
                    );
                  },
                  qty: (item) => {
                    return (
                      <td className="py-2">
                        <h4>{item.qty}</h4>
                      </td>
                    );
                  },
                  dateDiffQty: (item) => {
                    return (
                      <td className="py-2">
                        <h4>{item.dateDiffQty + "\xa0 วัน"}</h4>
                      </td>
                    );
                  },
                  qty: (item) => {
                    var newqty;
                    newqty = item.qty;
                    return (
                      <td className="py-2">
                        <h4>{newqty}</h4>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>

            {/* </CCard> */}
          </CCol>
        </CRow>
        <CRow className={"p-3"}>
          {extraChargeDom(typeN)}
          {extraChargeEx(typeN)}
          {extraChargeTransfer(typeN)}

          <CCol md="6">
            {/* <Box
              className="border-set"
              component={Grid}
              item
              boxShadow={1}
              xs={{
                width: " 100%",
              }}
            > */}
            {/* <CCard> */}
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              แสดงรายการที่มีปัญหา
            </CCardHeader>
            <CCardBody>
              <CChartBar
                style={{ fontFamily: "Scg" }}
                datasets={[
                  {
                    label: "Domestic",
                    backgroundColor: "rgba(25, 170, 220, 0.5)",
                    borderColor: "rgba(25, 170, 220, 1)",
                    // borderWidth: 1,
                    data: type.map((x) => {
                      var sum = 0;
                      baseData8.map((y) => {
                        if (y.domExp === "DOM") {
                          if (x === y.typeName) {
                            sum += y.qty;
                          }
                        }
                      });
                      return sum;
                    }),
                  },
                  {
                    label: "Export",
                    backgroundColor: "rgba(23, 107, 160, 0.5)",
                    borderColor: "#rgba(23, 107, 160, 1)",
                    // borderWidth: 1,
                    data: type.map((x) => {
                      var sum = 0;
                      baseData8.map((y) => {
                        if (y.domExp === "EXP") {
                          if (x === y.typeName) {
                            sum += y.qty;
                          }
                        }
                      });
                      return sum;
                    }),
                  },

                  {
                    label: "Transfer",
                    backgroundColor: "rgba(0, 176, 80, 1)",
                    borderColor: "rgba(108, 122, 137, 0.5)",
                    // borderWidth: 1,
                    data: type.map((x) => {
                      var sum = 0;
                      baseData8.map((y) => {
                        if (y.domExp === "TRN") {
                          if (x === y.typeName) {
                            sum += y.qty;
                          }
                        }
                      });
                      return sum;
                    }),
                  },
                ]}
                labels={type.map((x) => {
                  return x;
                })}
                options={{
                  tooltips: {
                    bodyFontFamily: "Scg",
                    titleFontFamily: "Scg",
                    enabled: true,
                    callbacks: {
                      label: function (tooltipItem, data) {
                        var tooltipValue =
                          data.datasets[tooltipItem.datasetIndex].data[
                            tooltipItem.index
                          ];
                        return parseFloat(tooltipValue).toLocaleString();
                      },
                    },
                  },
                  legend: {
                    labels: {
                      fontSize: 18,
                      fontFamily: "Scg",
                    },
                  },
                  title: {
                    fontSize: 18,
                    fontFamily: "Scg",
                  },
                  scales: {
                    yAxes: [
                      {
                        stacked: false,
                        ticks: {
                          fontSize: 18,
                          fontFamily: "Scg",
                          beginAtZero: true,
                        },
                      },
                    ],
                    xAxes: [
                      {
                        // stacked: true,
                        ticks: {
                          fontSize: 18,
                          fontFamily: "Scg",
                        },
                      },
                    ],
                  },
                }}
              />
            </CCardBody>
            {/* </CCard> */}
            {/* </Box> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const extraChargeDom = (type) => {
    var baseData;
    if (type === "transport") {
      baseData = dashboardMain9.filter(
        (x) => x.transporterId === _TranspoterId
      );
    } else {
      baseData = dashboardMain9;
    }
    var dom = [];
    var exp = [];
    if (dashboardMain9.length) {
      baseData.map((x) => {
        if (x.domExp === "DOM") {
          dom.push(x);
        } else if (x.domExp === "EXP") {
          exp.push(x);
        }
      });
    }
    return (
      <CCol md="6">
        <CCardHeader
          className="text-head-dashboard p-3"
          style={{ color: "#828282" }}
        >
          EXTRA CHARGE DOMESTIC
        </CCardHeader>
        <CCardBody>
          <CChartBar
            style={{ fontFamily: "Scg" }}
            datasets={[
              {
                label: "Approve",
                backgroundColor: "rgba(0, 176, 80, 1)",
                borderColor: "rgba(108, 122, 137, 0.5)",
                id: "bar-x-axis1",
                borderWidth: 1,
                data: dom.map((x) => {
                  return x.priceTotal;
                }),
              },
              {
                label: "Total",
                backgroundColor: "rgba(208, 206, 206, 1)",
                borderColor: "rgba(108, 122, 137, 0.5)",
                xAxisID: "bar-x-axis2",
                borderWidth: 1,
                data: dom.map((x) => {
                  return x.priceTotal2;
                }),
              },
            ]}
            labels={dom.map((x) => {
              return x.transporterShortName;
            })}
            options={{
              tooltips: {
                bodyFontFamily: "Scg",
                titleFontFamily: "Scg",
                enabled: true,
                callbacks: {
                  label: function (tooltipItem, data) {
                    var tooltipValue =
                      data.datasets[tooltipItem.datasetIndex].data[
                        tooltipItem.index
                      ];
                    return parseFloat(tooltipValue).toLocaleString();
                  },
                },
              },
              legend: {
                labels: {
                  fontSize: 18,
                  fontFamily: "Scg",
                },
              },
              title: {
                fontSize: 18,
                fontFamily: "Scg",
              },
              scales: {
                yAxes: [
                  {
                    stacked: false,
                    ticks: {
                      fontSize: 18,
                      fontFamily: "Scg",
                      beginAtZero: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    id: "bar-x-axis1",
                    barThickness: 30,
                    ticks: {
                      fontSize: 18,
                      fontFamily: "Scg",
                    },
                  },
                  {
                    display: false,
                    stacked: true,
                    id: "bar-x-axis2",
                    barThickness: 70,
                    // these are needed because the bar controller defaults set only the first x axis properties
                    type: "category",
                    categoryPercentage: 0.8,
                    barPercentage: 0.9,
                    gridLines: {
                      offsetGridLines: true,
                    },
                    offset: true,
                  },
                ],
              },
            }}
          />
        </CCardBody>
      </CCol>
    );
  };

  const extraChargeEx = (type) => {
    var baseData;
    if (type === "transport") {
      baseData = dashboardMain9.filter(
        (x) => x.transporterId === _TranspoterId
      );
    } else {
      baseData = dashboardMain9;
    }
    var dom = [];
    var exp = [];
    if (dashboardMain9.length) {
      baseData.map((x) => {
        if (x.domExp === "DOM") {
          dom.push(x);
        } else if (x.domExp === "EXP") {
          exp.push(x);
        }
      });
    }

    return (
      <CCol md="6">
        <CCardHeader
          className="text-head-dashboard p-3"
          style={{ color: "#828282" }}
        >
          EXTRA CHARGE EXPORT
        </CCardHeader>
        <CCardBody>
          <CChartBar
            style={{ fontFamily: "Scg" }}
            datasets={[
              {
                label: "Approve",
                backgroundColor: "rgba(0, 176, 80, 1)",
                borderColor: "rgba(108, 122, 137, 0.5)",
                id: "bar-x-axis1",
                borderWidth: 1,
                data: exp.map((x) => {
                  return x.priceTotal;
                }),
              },
              {
                label: "Total",
                backgroundColor: "rgba(208, 206, 206, 1)",
                borderColor: "rgba(108, 122, 137, 0.5)",
                xAxisID: "bar-x-axis2",
                borderWidth: 1,
                data: exp.map((x) => {
                  return x.priceTotal2;
                }),
              },
            ]}
            labels={exp.map((x) => {
              return x.transporterShortName;
            })}
            options={{
              tooltips: {
                bodyFontFamily: "Scg",
                titleFontFamily: "Scg",
                enabled: true,
                callbacks: {
                  label: function (tooltipItem, data) {
                    var tooltipValue =
                      data.datasets[tooltipItem.datasetIndex].data[
                        tooltipItem.index
                      ];
                    return parseFloat(tooltipValue).toLocaleString();
                  },
                },
              },
              legend: {
                labels: {
                  fontSize: 18,
                  fontFamily: "Scg",
                },
              },
              title: {
                fontSize: 18,
                fontFamily: "Scg",
              },
              scales: {
                yAxes: [
                  {
                    stacked: false,
                    ticks: {
                      fontSize: 18,
                      fontFamily: "Scg",
                      beginAtZero: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    id: "bar-x-axis1",
                    barThickness: 30,
                    ticks: {
                      fontSize: 18,
                      fontFamily: "Scg",
                    },
                  },
                  {
                    display: false,
                    stacked: true,
                    id: "bar-x-axis2",
                    barThickness: 70,
                    // these are needed because the bar controller defaults set only the first x axis properties
                    type: "category",
                    categoryPercentage: 0.8,
                    barPercentage: 0.9,
                    gridLines: {
                      offsetGridLines: true,
                    },
                    offset: true,
                  },
                ],
              },
            }}
          />
        </CCardBody>
      </CCol>
    );
  };

  const extraChargeTransfer = (type) => {
    var baseData;
    if (type === "transport") {
      baseData = dashboardMain9.filter(
        (x) => x.transporterId === _TranspoterId
      );
    } else {
      baseData = dashboardMain9;
    }
    var trn = [];
    var exp = [];
    if (dashboardMain9.length) {
      baseData.map((x) => {
        if (x.domExp === "TRN") {
          trn.push(x);
        } else if (x.domExp === "EXP") {
          exp.push(x);
        }
      });
    }
    return (
      <CCol md="6">
        <CCardHeader
          className="text-head-dashboard p-3"
          style={{ color: "#828282" }}
        >
          EXTRA CHARGE TRANSFER
        </CCardHeader>
        <CCardBody>
          <CChartBar
            style={{ fontFamily: "Scg" }}
            datasets={[
              {
                label: "Approve",
                backgroundColor: "rgba(0, 176, 80, 1)",
                borderColor: "rgba(108, 122, 137, 0.5)",
                id: "bar-x-axis1",
                borderWidth: 1,
                data: trn.map((x) => {
                  return x.priceTotal;
                }),
              },
              {
                label: "Total",
                backgroundColor: "rgba(208, 206, 206, 1)",
                borderColor: "rgba(108, 122, 137, 0.5)",
                xAxisID: "bar-x-axis2",
                borderWidth: 1,
                data: trn.map((x) => {
                  return x.priceTotal2;
                }),
              },
            ]}
            labels={trn.map((x) => {
              return x.transporterShortName;
            })}
            options={{
              tooltips: {
                bodyFontFamily: "Scg",
                titleFontFamily: "Scg",
                enabled: true,
                callbacks: {
                  label: function (tooltipItem, data) {
                    var tooltipValue =
                      data.datasets[tooltipItem.datasetIndex].data[
                        tooltipItem.index
                      ];
                    return parseFloat(tooltipValue).toLocaleString();
                  },
                },
              },
              legend: {
                labels: {
                  fontSize: 18,
                  fontFamily: "Scg",
                },
              },
              title: {
                fontSize: 18,
                fontFamily: "Scg",
              },
              scales: {
                yAxes: [
                  {
                    stacked: false,
                    ticks: {
                      fontSize: 18,
                      fontFamily: "Scg",
                      beginAtZero: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    stacked: true,
                    id: "bar-x-axis1",
                    barThickness: 30,
                    ticks: {
                      fontSize: 18,
                      fontFamily: "Scg",
                    },
                  },
                  {
                    display: false,
                    stacked: true,
                    id: "bar-x-axis2",
                    barThickness: 70,
                    // these are needed because the bar controller defaults set only the first x axis properties
                    type: "category",
                    categoryPercentage: 0.8,
                    barPercentage: 0.9,
                    gridLines: {
                      offsetGridLines: true,
                    },
                    offset: true,
                  },
                ],
              },
            }}
          />
        </CCardBody>
      </CCol>
    );
  };

  const smpCard = () => {
    var sortcc;
    sortcc = dashboardMain1.reverse();

    //console.log("sortcc", sortcc);
    if (dashboardMain1.length) {
    }
    return (
      <CCol md="6">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              {/* SMP */}
              <CImg
                src={logoicon}
                // align="center"
                high="200"
                width="200"
                block
                fluid
              />
              OVERDUE
            </CCardHeader>

            <CCardBody>
              <CCardBody>
                <CChartDoughnut
                  datasets={[
                    {
                      backgroundColor: [
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(255, 99, 132, 0.5)",
                      ],
                      borderColor: [
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(255, 205, 86, 0.5)",
                        "rgba(255, 99, 132, 0.5)",
                      ],
                      data: sortcc.map((x) => {
                        return x.qty;
                      }),
                    },
                  ]}
                  labels={sortcc.map((x) => {
                    return x.zoneName;
                  })}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                    legend: {
                      labels: {
                        fontSize: 14,
                        fontFamily: "Scg",
                      },
                    },
                    title: {
                      fontSize: 14,
                      fontFamily: "Scg",
                    },
                    scales: {
                      ticks: {
                        fontSize: 14,
                        fontFamily: "Scg",
                      },
                    },
                  }}
                />
              </CCardBody>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const allpayCard2 = () => {
    var red = [0, 0];
    var yellow = [0, 0];
    var green = [0, 0];
    if (dashboardMain2.length) {
      dashboardMain2.map((x) => {
        if (x.typeName === "For Accept") {
          if (x.zoneName === "RED") {
            red[0] = x.qty;
          } else if (x.zoneName === "YELLOW") {
            yellow[0] = x.qty;
          } else {
            green[0] = x.qty;
          }
        }

        if (x.typeName === "For Approve") {
          if (x.zoneName === "RED") {
            red[1] = x.qty;
          } else if (x.zoneName === "YELLOW") {
            yellow[1] = x.qty;
          } else {
            green[1] = x.qty;
          }
        }
      });

      //console.log("red", red);
      //console.log("yellow", yellow);
      //console.log("green", green);
    }

    return (
      <CCol md="6">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              <div
                // src={logoallpay}
                // align="center"
                high="110"
                width="111"
                block
                fluid
              />
              OVER DUE
            </CCardHeader>
            <CCardBody>
              <CCardBody>
                <CChartBar
                  datasets={[
                    {
                      label: "",
                      backgroundColor: "rgba(0, 176, 80, 1)",
                      borderColor: "rgba(75, 192, 192, 0.5)",

                      // borderWidth: 1,
                      data: [green[1]],
                    },
                    {
                      label: "",
                      backgroundColor: "rgba(255, 255, 0, 1)",
                      borderColor: "rgba(255, 205, 86, 0.5)",

                      // borderWidth: 1,
                      data: [yellow[1]],
                    },
                    {
                      label: "",
                      backgroundColor: "rgba(255, 51, 0, 1)",
                      borderColor: "rgba(255, 99, 132, 0.5)",

                      // borderWidth: 1,
                      data: [red[1]],
                    },
                  ]}
                  labels={["For Approve"]}
                  // {dashboardMain2.map((x) => {
                  //   return x.typeName;
                  // })}
                  options={{
                    tooltips: {
                      enabled: true,
                    },
                    legend: {
                      labels: {
                        fontSize: 18,
                        fontFamily: "Scg",
                      },
                    },
                    title: {
                      fontSize: 18,
                      fontFamily: "Scg",
                    },
                    scales: {
                      yAxes: [
                        {
                          stacked: false,
                          ticks: {
                            fontSize: 18,
                            fontFamily: "Scg",
                            beginAtZero: true,
                          },
                        },
                      ],
                      xAxes: [
                        {
                          // stacked: true,
                          ticks: {
                            fontSize: 18,
                            fontFamily: "Scg",
                          },
                        },
                      ],
                    },
                  }}
                />
              </CCardBody>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const allpayCard = () => {
    var red = [0, 0];
    var yellow = [0, 0];
    var green = [0, 0];
    if (dashboardMain2.length) {
      dashboardMain2.map((x) => {
        if (x.typeName === "For Accept") {
          if (x.zoneName === "RED") {
            red[0] = x.qty;
          } else if (x.zoneName === "YELLOW") {
            yellow[0] = x.qty;
          } else {
            green[0] = x.qty;
          }
        }

        if (x.typeName === "For Approve") {
          if (x.zoneName === "RED") {
            red[1] = x.qty;
          } else if (x.zoneName === "YELLOW") {
            yellow[1] = x.qty;
          } else {
            green[1] = x.qty;
          }
        }
      });

      //console.log("red", red);
      //console.log("yellow", yellow);
      //console.log("green", green);
    }

    return (
      <CRow>
        <CCol>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              <CImg
                src={logoallpay}
                // align="center"
                high="110"
                width="111"
                block
                fluid
              />
              OVER DUE
            </CCardHeader>

            <CRow>
              <CCol md="6">
                <CCardBody>
                  <CChartBar
                    datasets={[
                      {
                        label: "",
                        backgroundColor: "rgba(0, 176, 80, 1)",
                        borderColor: "rgba(75, 192, 192, 0.5)",

                        // borderWidth: 1,
                        data: [green[0]],
                      },
                      {
                        label: "",
                        backgroundColor: "rgba(255, 255, 0, 1)",
                        borderColor: "rgba(255, 205, 86, 0.5)",

                        // borderWidth: 1,
                        data: [yellow[0]],
                      },
                      {
                        label: "",
                        backgroundColor: "rgba(255, 51, 0, 1)",
                        borderColor: "rgba(255, 99, 132, 0.5)",

                        // borderWidth: 1,
                        data: [red[0]],
                      },
                    ]}
                    labels={["For Accept"]}
                    // {dashboardMain2.map((x) => {
                    //   return x.typeName;
                    // })}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                      legend: {
                        labels: {
                          fontSize: 18,
                          fontFamily: "Scg",
                        },
                      },
                      title: {
                        fontSize: 18,
                        fontFamily: "Scg",
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: false,
                            ticks: {
                              fontSize: 18,
                              fontFamily: "Scg",
                              beginAtZero: true,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            // stacked: true,
                            ticks: {
                              fontSize: 18,
                              fontFamily: "Scg",
                            },
                          },
                        ],
                      },
                    }}
                  />
                </CCardBody>
              </CCol>

              <CCol md="6">
                <CCardBody>
                  <CChartBar
                    datasets={[
                      {
                        label: "",
                        backgroundColor: "rgba(0, 176, 80, 1)",
                        borderColor: "rgba(75, 192, 192, 0.5)",

                        // borderWidth: 1,
                        data: [green[1]],
                      },
                      {
                        label: "",
                        backgroundColor: "rgba(255, 255, 0, 1)",
                        borderColor: "rgba(255, 205, 86, 0.5)",

                        // borderWidth: 1,
                        data: [yellow[1]],
                      },
                      {
                        label: "",
                        backgroundColor: "rgba(255, 51, 0, 1)",
                        borderColor: "rgba(255, 99, 132, 0.5)",

                        // borderWidth: 1,
                        data: [red[1]],
                      },
                    ]}
                    labels={["For Approve"]}
                    // {dashboardMain2.map((x) => {
                    //   return x.typeName;
                    // })}
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                      legend: {
                        labels: {
                          fontSize: 18,
                          fontFamily: "Scg",
                        },
                      },
                      title: {
                        fontSize: 18,
                        fontFamily: "Scg",
                      },
                      scales: {
                        yAxes: [
                          {
                            stacked: false,
                            ticks: {
                              fontSize: 18,
                              fontFamily: "Scg",
                              beginAtZero: true,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            // stacked: true,
                            ticks: {
                              fontSize: 18,
                              fontFamily: "Scg",
                            },
                          },
                        ],
                      },
                    }}
                  />
                </CCardBody>
              </CCol>
            </CRow>

            {/* </CCard> */}
          </CCol>
        </CCol>
      </CRow>
    );
  };

  const dashboardContract = () => {
    var data1 = 0;
    var data2 = 0;
    var data3 = 0;
    var totalDash3 = 0;
    if (dashboardMain3.length) {
      dashboardMain3.map((x) => {
        if (x.zoneName === "Contract") {
          data1 = x.qty;
          totalDash3 += x.qty;
        }
        if (x.zoneName === "Extra") {
          data2 = x.qty;
          totalDash3 += x.qty;
        }
        if (x.zoneName === "Payment") {
          data3 = x.qty;
          totalDash3 += x.qty;
        }
      });
    }
    console.log("totalDash3", totalDash3);
    console.log("dashboardMain3", dashboardMain3);

    return (
      <CCol md="6">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              {/* SMP */}
              WAIT FOR APPROVE
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain3.map((x) => {
                        if (x.zoneName === "Contract") {
                          return x.qty;
                        }
                      })}
                      animated
                      text={"CONTRACT"}
                      value={(data1 / totalDash3) * 100}
                      color={"gradient-success"}
                    >
                      <FcInspection size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain3.map((x) => {
                        if (x.zoneName === "Extra") {
                          return x.qty;
                        }
                      })}
                      text={"EXTRA CHARGE"}
                      value={(data2 / totalDash3) * 100}
                      color={"gradient-success"}
                    >
                      <FcInspection size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain3.map((x) => {
                        if (x.zoneName === "Payment") {
                          return x.qty;
                        }
                      })}
                      text={"PAYMENT"}
                      value={(data3 / totalDash3) * 100}
                      // value={(data3 / total) * 100}
                      color={"gradient-success"}
                    >
                      <FcInspection size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
              </CRow>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const dashboardAllpay = (type) => {
    var data1 = 0;
    var data2 = 0;
    var data3 = 0;
    var data4 = 0;
    var data5 = 0;
    var data6 = 0;
    var total = 0;
    if (dashboardMain4.length) {
      {
        dashboardMain4.map((x) => {
          if (x.typeName === "Wait for Accept") {
            data1 = x.qty;
            total += data1;
          }
          if (x.typeName === "Wait for Approve") {
            data2 = x.qty;
            total += data2;
          }
          if (x.typeName === "Withdraw") {
            data3 = x.qty;
            total += data3;
          }
          if (x.typeName === "Rejected") {
            data4 = x.qty;
            total += data4;
          }
          if (x.typeName === "Hold") {
            data5 = x.qty;
            total += data5;
          }
          if (x.typeName === "Cancelled") {
            data6 = x.qty;
            total += data6;
          }
        });
        //console.log("total", total);
      }
    }

    return (
      <CCol md="6">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              {/* SMP */}
              ALLPAY STATUS
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain4.map((x) => {
                        if (x.typeName === "Wait for Accept") {
                          return x.qty;
                        }
                      })}
                      animated
                      text={"Wait for Accept"}
                      value={(data1 / total) * 100}
                      color={"gradient-success"}
                    >
                      <FcInspection size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain4.map((x) => {
                        if (x.typeName === "Wait for Approve") {
                          return x.qty;
                        }
                      })}
                      text={"Wait for Approve"}
                      value={(data2 / total) * 100}
                      color={"gradient-success"}
                    >
                      <FcOk size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain4.map((x) => {
                        if (x.typeName === "Withdraw") {
                          return x.qty;
                        }
                      })}
                      text={"Withdraw"}
                      value={(data3 / total) * 100}
                      color={"gradient-success"}
                    >
                      <FcImport size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain4.map((x) => {
                        if (x.typeName === "Rejected") {
                          return x.qty;
                        }
                      })}
                      text={"Rejected"}
                      value={(data4 / total) * 100}
                      color={"gradient-success"}
                    >
                      <FcExpired size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain4.map((x) => {
                        if (x.typeName === "Hold") {
                          return x.qty;
                        }
                      })}
                      text={"Hold"}
                      value={(data5 / total) * 100}
                      color={"gradient-success"}
                    >
                      <FcReadingEbook size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
                <CCol md="4">
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetProgressIcon
                      style={{ fontSize: "20px" }}
                      header={dashboardMain4.map((x) => {
                        if (x.typeName === "Cancelled") {
                          return x.qty;
                        }
                      })}
                      text={"Cancelled"}
                      value={(data6 / total) * 100}
                      color={"gradient-success"}
                    >
                      <FcCancel size={50} />
                    </CWidgetProgressIcon>
                  </Box>
                </CCol>
              </CRow>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const dashboardDomestic = (type) => {
    var baseData;
    if (type === "transport") {
      baseData = dashboardMain6.filter(
        (x) => x.transporterId === _TranspoterId
      );
    } else {
      baseData = dashboardMain6;
    }
    var domestic;
    var data1 = 0;
    var data2 = 0;
    var data3 = 0;
    var data4 = 0;
    if (dashboardMain6.length) {
      domestic = baseData.filter((x) => x.domExp === "DOM");
      domestic.map((x) => {
        if (x.typeName.toUpperCase() === "IN PROGRESS") {
          data1 += x.qty;
        }
        if (x.typeName.toUpperCase() === "MISMATCH") {
          data2 += x.qty;
        }
        if (x.typeName.toUpperCase() === "REJECT") {
          data3 += x.qty;
        }
        if (x.typeName.toUpperCase() === "REOPEN") {
          data3 += x.qty;
        }
        if (x.typeName.toUpperCase() === "INPROCESS") {
          data4 += x.qty;
        }
      });
    }
    return (
      <CCol md="6">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              {/* SMP */}
              DOMESTIC
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="In Progress"
                      header={data1}
                      // color="primary"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcWorkflow size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Mismatch"
                      header={data2}
                      // color="info"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcDoNotMix size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                <CCol xs="6" sm="4" md="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Reject/Reopen"
                      header={data3}
                      // color="warning"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcDataBackup size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Extra (In Progress)"
                      header={data4}
                      // color="danger"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcMultipleInputs size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
              </CRow>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const dashboardExport = (type) => {
    var baseData;
    if (type === "transport") {
      baseData = dashboardMainExp6.filter(
        (x) => x.transporterId === _TranspoterId
      );
      console.log("dashboardMain6", baseData);
    } else {
      baseData = dashboardMainExp6;
    }
    var dataExport;
    var data1 = 0;
    var data2 = 0;
    var data3 = 0;
    var data4 = 0;
    if (dashboardMainExp6.length) {
      dataExport = baseData.filter((x) => x.domExp === "EXP");
      dataExport.map((x) => {
        if (x.typeName.toUpperCase() === "IN PROGRESS") {
          data1 += x.qty;
        }
        if (x.typeName.toUpperCase() === "MISMATCH") {
          data2 += x.qty;
        }
        if (x.typeName.toUpperCase() === "REJECT") {
          data3 += x.qty;
        }
        if (x.typeName.toUpperCase() === "REOPEN") {
          data3 += x.qty;
        }
        if (x.typeName.toUpperCase() === "INPROCESS") {
          data4 += x.qty;
        }
      });
    }
    return (
      <CCol md="6">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              {/* SMP */}
              EXPORT
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="In Progress"
                      header={data1}
                      // color="primary"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcWorkflow size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Mismatch"
                      header={data2}
                      // color="info"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcDoNotMix size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                <CCol xs="6" sm="4" md="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Reject/Reopen"
                      header={data3}
                      // color="warning"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcDataBackup size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Extra (In Progress)"
                      header={data4}
                      // color="danger"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcMultipleInputs size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
              </CRow>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const dashboardTransfer = (type) => {
    var baseData;
    if (type === "transport") {
      baseData = dashboardMain10.filter(
        (x) => x.transporterId === _TranspoterId
      );
    } else {
      baseData = dashboardMain10;
    }
    var domestic;
    var data1 = 0;
    var data2 = 0;
    var data3 = 0;
    var data4 = 0;
    if (dashboardMain6.length) {
      domestic = baseData.filter((x) => x.domExp === "TRN");
      domestic.map((x) => {
        if (x.typeName.toUpperCase() === "IN PROGRESS") {
          data1 += x.qty;
        }
        // if (x.typeName.toUpperCase() === "MISMATCH") {
        //   data2 += x.qty;
        // }
        if (x.typeName.toUpperCase() === "REJECT") {
          data3 += x.qty;
        }
        if (x.typeName.toUpperCase() === "REOPEN") {
          data3 += x.qty;
        }
        if (x.typeName.toUpperCase() === "INPROCESS") {
          data4 += x.qty;
        }
      });
    }
    return (
      <CCol md="6">
        <CRow>
          <CCol md="12">
            <CCardHeader
              className="text-head-dashboard p-3"
              style={{ color: "#828282" }}
            >
              {/* SMP */}
              TRANSFER
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="In Progress"
                      header={data1}
                      // color="primary"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcWorkflow size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                {/* <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Mismatch"
                      header={data2}
                      // color="info"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcDoNotMix size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol> */}
                <CCol xs="6" sm="4" md="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Reject/Reopen"
                      header={data3}
                      // color="warning"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcDataBackup size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
                <CCol xs="6" sm="4" lg="6" style={{ overflow: "hidden" }}>
                  <Box
                    className="border-set"
                    component={Grid}
                    item
                    boxShadow={1}
                    xs={{
                      width: " 100%",
                    }}
                  >
                    <CWidgetIcon
                      text="Extra (In Progress)"
                      header={data4}
                      // color="danger"
                      style={{ overflow: "hidden", fontSize: "20px" }}
                    >
                      <FcMultipleInputs size={50} />
                    </CWidgetIcon>
                  </Box>
                </CCol>
              </CRow>
            </CCardBody>
            {/* </CCard> */}
          </CCol>
        </CRow>
      </CCol>
    );
  };

  const mapLogo = (id) => {
    var imgpath = "";
    switch (id.transporterId) {
      case 0:
        imgpath = "Sunday";
        break;
      case 1:
        imgpath = scglogo;
        break;
      case 2:
        imgpath = "Tuesday";
        break;
      case 3:
        imgpath = "Wednesday";
        break;
      case 4:
        imgpath = "Thursday";
        break;
      case 5:
        imgpath = "Friday";
        break;
      case 6:
        imgpath = "Saturday";
    }
    return (
      <td className="text-center">
        <div className="c-avatar">
          <img
            high="60"
            width="60"
            src={imgpath}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
          <span className="c-avatar-status bg-success"></span>
        </div>
      </td>
    );
  };

  const dashBoardTable = (type) => {
    var baseData;
    if (type === "transport") {
      baseData = dashboardData5.filter(
        (x) => x.transporterId === _TranspoterId
      );
    } else {
      baseData = dashboardData5;
      console.log("baseData1", baseData);
      baseData.sort((a, b) => {
        return a.progress - b.progress;
      });
      console.log("baseData2", baseData);
    }
    return (
      <CRow>
        <CCol md="12">
          <CCardHeader
            className="text-head-dashboard p-3"
            style={{ color: "#828282" }}
          >
            {/* SMP */}
            DETAILS
          </CCardHeader>
          <CCardBody>
            <CDataTable
              // columnFilter
              tableFilter={{
                label: `${Constant.tabletxtSearch}`,
                placeholder: `${Constant.tabletxtPlaceholder}`,
              }}
              // itemsPerPageSelect={{
              //   label: `${Constant.tabletxtCountPage}`,
              // }}
              className="CDataTable ml-1 mr-1"
              items={baseData}
              fields={fieldMainDash5}
              responsive
              bordered
              itemsPerPage={10}
              pagination
              scopedSlots={{
                dueDate: (item) => {
                  var newDateDue = new Date(item.dueDate);
                  var newDateDoc = new Date(item.createDocument);
                  newDateDue = newDateDue.toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                  });
                  newDateDoc = newDateDoc.toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                  });
                  return (
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>{item.progress}%</strong>
                        </div>
                        <div className="float-right">
                          <small>
                            {newDateDoc} - {newDateDue}
                          </small>
                        </div>
                      </div>
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value={item.progress}
                      />
                    </td>
                  );
                },
                updateDateTime: (item) => {
                  var newDate = new Date(item.updateDateTime);
                  var timestr = new Date(item.updateDateTime);
                  // console.log("newDate", newDate);
                  timestr = timestr.toLocaleTimeString("en-US", {
                    hour12: false,
                  });
                  newDate = newDate.toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                  });

                  return (
                    <td className="py-2">
                      {newDate} {"\xa0"} {timestr}
                    </td>
                  );
                },
                paymentStatus: (item) => {
                  return (
                    <td className="py-2">
                      {item.paymentStatus === null ? "" : item.paymentStatus}
                    </td>
                  );
                },
                transporterName: (item) => {
                  var imgpath = "";
                  switch (item.transporterId) {
                    case 1:
                      imgpath = scglogo;
                      break;
                    case 3:
                      imgpath = stnlogo;
                      break;
                    case 6:
                      imgpath = yusenlogo;
                      break;
                    case 8:
                      imgpath = interlogo;
                      break;
                    case 9:
                      imgpath = "";
                      break;
                    case 10:
                      imgpath = pjtlogo;
                      break;
                    case 31:
                      imgpath = "";
                      break;
                    case 33:
                      imgpath = tssklogo;
                      break;
                    case 34:
                      imgpath = "";
                      break;
                    case 35:
                      imgpath = famouslogo;
                      break;
                    case 38:
                      imgpath = smclogonew;
                      break;
                    case 42:
                      imgpath = "";
                      break;
                    case 44:
                      imgpath = "";
                    case 45:
                      imgpath = "";
                      break;
                    case 46:
                      imgpath = scglogo;
                      break;
                    case 48:
                      imgpath = "";
                      break;
                    case 49:
                      imgpath = scgclogo;
                      break;
                    case 53:
                      imgpath = yusenlogo;
                      break;
                    case 57:
                      imgpath = "";
                      break;
                    case 58:
                      imgpath = yusenlogo;
                      break;
                    case 68:
                      imgpath = tripleilogo;
                      break;
                    case 70:
                      imgpath = "";
                      break;
                    case 71:
                      imgpath = "";
                    default:
                      imgpath = "";
                  }
                  return (
                    <td className="text-left">
                      <img
                        src={imgpath}
                        width="100%"
                        height="auto"
                        className="img-rounded "
                      />

                      {/* <img
                          high="110"
                          width="111"
                          block
                          fluid

                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        /> */}
                      {/* <span className="c-avatar-status bg-success"></span> */}
                      {/* </div> */}
                    </td>
                  );
                },

                transporterShortName: (item) => {
                  return (
                    <td className="text-right p-2">
                      {item.transporterShortName}
                    </td>
                  );
                },

                allPayNo: (item) => {
                  return (
                    <td>
                      <div>{item.allPayNo}</div>
                      <div className="small text-muted">
                        <span>{item.subject}</span>
                      </div>
                    </td>
                  );
                },
                paymentTypeId: (item) => {
                  return (
                    <td className="py-2">
                      <div className="c-avatar">
                        <img
                          width="70%"
                          height={"auto"}
                          title={item.paymentTypeId === "01" ? "โอน" : "เช็ค"}
                          src={
                            item.paymentTypeId === "01" ? payment01 : payment02
                          }
                          // className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                        {/* <span className="c-avatar-status bg-green"></span> */}
                      </div>
                    </td>
                  );
                },
                actualTotalAmount: (item) => {
                  var newqty;
                  newqty = item.actualTotalAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  return <td className="py-2">{newqty}</td>;
                },
              }}
            />
          </CCardBody>

          {/* </CCard> */}
        </CCol>
      </CRow>
    );
  };

  // Layout for TPE
  const layoutDashboard = () => (
    <div>
      <CRow>
        <CCol>
          {allpayCard()}
          <Divider className="pl-3 pr-3"></Divider>
          <Divider className="pl-3 pr-3"></Divider>
          <CRow className="p-2">
            {dashboardContract()}
            {dashboardAllpay()}
          </CRow>
          <Divider className="pl-3 pr-3"></Divider>
          <CRow className="justify-content-center p-2">
            {dashboardDomestic()}
            {dashboardExport()}
          </CRow>
          {dashboardTransfer()}
          <Divider className="pl-3 pr-3"></Divider>
          {dashboardChAndExtra()}
          <Divider className="pl-3 pr-3"></Divider>
          {dashBoardTable()}
        </CCol>
      </CRow>
    </div>
  );

  // Layout for Transpoter
  const layoutWelcome = (type) => (
    <div>
      <CRow>
        <CCol>
          {/* <CLabel>หน้าสำหรับ TRANSPORTER</CLabel> */}
          <CRow className="justify-content-center p-2">
            {dashboardDomestic(type)}
            {dashboardExport(type)}
          </CRow>
          {dashboardTransfer()}
          <Divider className="pl-3 pr-3"></Divider>
          {dashboardChAndExtra(type)}
          <Divider className="pl-3 pr-3"></Divider>
          {dashBoardTable(type)}
        </CCol>
      </CRow>
    </div>
  );

  const showLayout = () => {
    if (_TranspoterId) {
      return layoutWelcome("transport");
    } else {
      return layoutDashboard();
    }
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
          <CButton color="secondary" onClick={onClickCloseErrorAPI}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Fetch Error Modal */}

      {/* Start Show Form Change Password Modal */}
      <CModal
        show={isShowFormChangePass}
        onClose={() => window.location.reload(false)}
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
                    <CInput
                      type="password"
                      id="change-password"
                      onChange={handleChangeValidationPassword}
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
                    <CInput
                      type="password"
                      id="change-re-password"
                      invalid={isChangeRePassword}
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
              <CCol>
                <br />
                <p id="rules-header">{Constant.contentHeaderSetPassword}</p>
                <p id="rules-01" style={{ color: "red" }}>
                  {Constant.contentBodySetPassword01}
                </p>
                <p id="rules-02" style={{ color: "red" }}>
                  {Constant.contentBodySetPassword02}
                </p>
                <p id="rules-03" style={{ color: "red" }}>
                  {Constant.contentBodySetPassword03}
                </p>
                <p id="rules-04" style={{ color: "red" }}>
                  {Constant.contentBodySetPassword04}
                </p>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={onClickChangePassword}>
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Form Change Password Modal */}

      {/* Start Show Success Change Password Modal */}
      <CModal
        show={isShowSuccessChangePass}
        onClose={() => {
          setIsShowSuccessChangePass(!isShowSuccessChangePass);
          window.location.reload(false);
        }}
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
            onClick={() => {
              setIsShowSuccessChangePass(!isShowSuccessChangePass);
              window.location.reload(false);
            }}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Success Change Password Modal */}

      {/* Start Show Warning Password Expire Date Modal */}
      <CModal
        show={isShowWarningPassExp}
        onClose={() => setIsShowWarningPassExp(!isShowWarningPassExp)}
        color="warning"
        centered
      >
        <CModalHeader closeButton>
          <h5>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </h5>
        </CModalHeader>
        <CModalBody>
          {Constant.contentWarningPasswordExpireDate +
            " " +
            countDateExp +
            " " +
            Constant.unitDate}
          <br />
          {Constant.contentWarningPleaseChangePass}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setIsShowWarningPassExp(!isShowWarningPassExp)}
          >
            {Constant.btOK}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* End Show Warning Password Expire Date Modal */}
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
      <div style={{ backgroundColor: "white" }}>
        {modalForm()}
        {showLayout()}
      </div>
    );
  }
};

export default Dashboard;
