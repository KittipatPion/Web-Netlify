// import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import HotelIcon from '@material-ui/icons/Hotel';
// import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../../routes";
// import axios from "axios";
import useFetch from "../../../../fecthData/useFetch";
import Repository from "../../../../repositories/Repository";
import Constant from "../../../../helpers/Constant";
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
} from "@coreui/react";
// import { DocsLink } from "../../reusable";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CIcon from "@coreui/icons-react";
import Box from "@material-ui/core/Box";
import functionController from '../../../../helpers/FunctionController';

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

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    appBar: {
        position: "relative",
        backgroundColor: "#ED1B24",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const fields = [
    {
        key: "manage",
        label: "",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
    },
    {
        key: "creditDebitNo",
        label: "Credit/Debit No",

    },
    {
        key: "ShipmentNo",
        label: "Shipment No",
    },
    {
        key: "Type",
        label: "ประเภท",
    },
    {
        key: "List",
        label: "รายการ",
    },
    ,
    {
        key: "RefDoc",
        label: "Reference Document",
    },
    {
        key: "Amount",
        label: "จำนวนเงิน",
    },
    {
        key: "CheckedBy",
        label: "ตรวจสอบโดย",
    },
    {
        key: "ApproveBy",
        label: "Approve By",
    },
    {
        key: "Status",
        label: "Status",
    },
    {
        key: "PaymentDoc",
        label: "Payment Document",
    },
    // {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "1%" },
    //     sorter: false,
    //     filter: false,
    // },
];

const HistoryLog = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [primary, setPrimary] = useState(false);
    const [danger, setDanger] = useState(false);
    const [items, setItems] = useState([]);
    const [details, setDetails] = useState([]);
    const [collapse, setCollapse] = useState(false);
    const [roleUser, setRoleUser] = useState(null);

    const pageCode = "";
    const classes = useStyles();

    const getBadge = status => {
        switch (status) {
            case 'Complete': return 'success'
            case 'Approve': return 'success'
            case 'Ok': return 'success'
            case 'Verify': return 'secondary'
            case 'In progress': return 'secondary'
            case 'Reject': return 'warning'
            case 'Cancel': return 'danger'
            case 'Not Ok': return 'danger'
            default: return 'primary'
        }
    }

    const toggleDetails = (index) => {
        const position = details.indexOf(index);
        let newDetails = details.slice();
        if (position !== -1) {
            newDetails.splice(position, 1);
        } else {
            newDetails = [...details, index];
        }
        setDetails(newDetails);
    };

    const fnCheckUserAuth = () => {
        var result = functionController.getUserAuthenOneRole(pageCode);
        if (result.isAuth) {
            setRoleUser(result.roleCode);
            // initeState();
        }
        else {
            setIsLoaded(true);
            setError(Constant.apiMessageUnAuthenToUsePage);
        }
    };

    useEffect(() => {

    }, []);

    if (false) {
        return (
            <div className="content-wrapper">
                <div className="card">
                    <div className="card-body">Fetch Error : {error.message}</div>
                </div>
            </div>
        );
        // }
        // else if (!isLoaded) {
        //   return (
        //     <div className="content-wrapper">
        //       <div className="card">
        //         <div className="card-body">Loading...</div>
        //       </div>
        //     </div>
        //   );
    } else {
        return (
            <div>
                <h6>
                    <CRow>
                        <CCol xs="12" sm="6" md="12">
                            <CCard>
                                <CCol md="12">
                                    <CCardHeader>
                                        <CRow>
                                            <CCol xs="6" sm="8" md="10">
                                                <h3 className="headtext">   {Constant.txtApproveCreditDebit}</h3>
                                            </CCol>
                                            <CCol xs="6" sm="4" md="2" >
                                                {/* {dialogs("show")} */}
                                            </CCol>
                                        </CRow>
                                    </CCardHeader>
                                    <CCardBody>
                                        <Timeline align="alternate">
                                            <TimelineItem>
                                                <TimelineOppositeContent>
                                                    <Typography variant="body2" color="textSecondary">
                                                        9:30 am
                                                    </Typography>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineDot>
                                                        {/* <FastfoodIcon /> */}
                                                    </TimelineDot>
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Paper elevation={3} className={classes.paper}>
                                                        <Typography variant="h6" component="h1">
                                                            Eat
                                                        </Typography>
                                                        <Typography>Because you need strength</Typography>
                                                    </Paper>
                                                </TimelineContent>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <TimelineOppositeContent>
                                                    <Typography variant="body2" color="textSecondary">
                                                        10:00 am
                                                    </Typography>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineDot color="primary">
                                                        {/* <LaptopMacIcon /> */}
                                                    </TimelineDot>
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Paper elevation={3} className={classes.paper}>
                                                        <Typography variant="h6" component="h1">
                                                            Code
                                                        </Typography>
                                                        <Typography>Because it&apos;s awesome!</Typography>
                                                    </Paper>
                                                </TimelineContent>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <TimelineSeparator>
                                                    <TimelineDot color="primary" variant="outlined">
                                                        {/* <HotelIcon /> */}
                                                    </TimelineDot>
                                                    <TimelineConnector className={classes.secondaryTail} />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Paper elevation={3} className={classes.paper}>
                                                        <Typography variant="h6" component="h1">
                                                            Sleep
                                                        </Typography>
                                                        <Typography>Because you need rest</Typography>
                                                    </Paper>
                                                </TimelineContent>
                                            </TimelineItem>
                                            <TimelineItem>
                                                <TimelineSeparator>
                                                    <TimelineDot color="secondary">
                                                        {/* <RepeatIcon /> */}
                                                    </TimelineDot>
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <Paper elevation={3} className={classes.paper}>
                                                        <Typography variant="h6" component="h1">
                                                            Repeat
                                                        </Typography>
                                                        <Typography>Because this is the life you love!</Typography>
                                                    </Paper>
                                                </TimelineContent>
                                            </TimelineItem>
                                        </Timeline>
                                    </CCardBody>
                                    <CFormGroup class="d-flex justify-content-end">
                                        <CCol xs="10" sm="6" md="2">
                                            <CFormGroup>
                                                <CButton size="sm" block color="success"
                                                // onClick={searchData()}
                                                >
                                                    <CIcon name="cil-check-circle" /> Approve
                                                </CButton>
                                            </CFormGroup>
                                        </CCol>
                                        &nbsp;
                                        <CCol xs="10" sm="6" md="2">
                                            <CFormGroup>
                                                <CButton size="sm" block color="danger"
                                                // onClick={searchData()}
                                                >
                                                    <CIcon name="cil-x-circle" /> Cancel
                                                </CButton>
                                            </CFormGroup>
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                            </CCard>
                        </CCol>
                    </CRow>
                </h6>
            </div>
        );
    }
};

export default HistoryLog;

