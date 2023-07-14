import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../routes";
// import axios from "axios";
import useFetch from "../../../fecthData/useFetch";
import Repository from '../../../repositories/Repository'
import FunctionController from "../../../helpers/FunctionController";
import Constant from "../../../helpers/Constant";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from '@material-ui/data-grid';
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
    CProgress,
    CLink,
    CSubheader,
    CBreadcrumbRouter,
    CRow,
    CSpinner,
    CButtonToolbar,
} from "@coreui/react";
import { DocsLink } from "../../../reusable";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';




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
        backgroundColor: '#ED1B24'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


const fields = [
    {
        key: "companyShortName",
        label: "ชื่อบริษัท(ย่อ)",

    },
    {
        key: "companyName",
        label: "ชื่อบริษัท",

    },
    {
        key: "show_details",
        label: "",
        _style: { width: "1%" },
        sorter: false,
        filter: false,
    },
];

const Tables = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [country, setCountry] = useState([]);
    const [modal, setModal] = useState(true);
    const [primary, setPrimary] = useState(false);
    const [danger, setDanger] = useState(false);
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [collapse, setCollapse] = useState(false);
    const [collapseMulti, setCollapseMulti] = useState([false, false]);
    const [companyById, setCompanyById] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [validations, setValidate] = useState(false);
    const [countryCode, setcountryCode] = useState();
    const [countryNameEng, setcountryNameEng] = useState();
    const [countryNameThai, setcountryNameThai] = useState();
    const [isActive, setisActive] = useState(true);
    const [IncompanyCode, setIncompanyCode] = useState('');
    const [IncompanyShortName, setIncompanyShortName] = useState('');
    const [IncompanyName, setIncompanyName] = useState('');
    const [IncompanyPrefix, setIncompanyPrefix] = useState('');
    const [InisActive, setInisActive] = useState(false);
    const [errtxt, seterrtxt] = useState('กรอกข้อมูลให้ครบถ้วน');
    const [isLoadingData, setIsLoadingData] = useState(false);

    const pageCode = "";

    const options = {
        method: "POST",
    };


    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const myFunction = () => {
        return (
            <CProgress sm animated value={100} className="mb-3" color='danger' />
        )
    }

    const handleChangeUpdateField = (index, target) => (e) => {
        let newArr = [...companyById];
        if (target === "companyCode") {
            newArr[0].companyCode = e.target.value;
        }
        else if (target === "companyShortName")
            newArr[0].companyShortName = e.target.value;
        else if (target === "companyName")
            newArr[0].companyName = e.target.value;
        else if (target === "plantPrefixCode")
            newArr[0].plantPrefixCode = e.target.value;
        setCompanyById(newArr);
        console.log(newArr)
    }

    const onClickEditData = (index) => (e) => {
        // setIsConfirmEdit(!isConfirmEdit);
        let newArr = [...companyById];
        console.log('Checkpoint' + newArr)
        var companyId = newArr[0].companyId;
        var companyShortName = newArr[0].companyShortName;
        var companyName = newArr[0].companyName;

        // var updateBy = 1;
        var arrObj = [companyId, companyShortName, companyName];
        console.log(arrObj);
        fnUpdateData(arrObj[0], arrObj[1], arrObj[2]);
    }


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

    const fnGetCompanyListById = (companyId) => {
        setIsLoadingData(true)
        Repository.fetchGetCompanyListById(companyId)
            .then(
                (result) => {
                    setIsLoadingData(false)
                    if (result.httpCode === "200") {

                        setCompanyById(result.data)


                    }
                    else {
                        console.log(result);
                    }
                },
                (error) => {
                    setIsLoadingData(false)
                    console.log(error);
                }
            )
    }

    const showLoadingData = () => (
        <CCol className="text-center">
            <CLabel>
                {Constant.apiLoadingData}
            </CLabel>
            {" "}
            <CSpinner variant="grow" size="md" />
        </CCol>
    )





    const [checked, setChecked] = React.useState(true);

    const handleChanges = (event) => {
        setisActive(event.target.checked);
    };

    const tabledata = () => {
        return (
            <CCard className='p-2 ' xs="12" sm="6" md="3">

                <CDataTable
                    columnFilter
                    tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
                    itemsPerPageSelect={{ label: "จำนวนรายการ/หน้า" }}
                    className="CDataTable"
                    items={data}
                    fields={fields}
                    // hover
                    // striped
                    bordered
                    // sorter
                    // size="xl"
                    itemsPerPage={10}
                    pagination
                    scopedSlots={{

                        isActive: (item, index) => {
                            return (
                                <td className="py-2" >
                                    <Checkbox
                                        defaultChecked={item.isActive}
                                        color="primary"
                                        disabled
                                        value={item.isActive}
                                    // onChange={(event) => {
                                    //   setisActive(event.target.value);
                                    // }}

                                    />
                                </td>
                            );
                        },
                        show_details: (item, index) => {
                            return (
                                <td className="py-2">
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        onClick={() => {
                                            toggleDetails(index, item.companyId);
                                        }}
                                    >
                                        {details.includes(index) ? "ซ่อน" : "แสดง"}
                                    </CButton>
                                </td>
                            );
                        },

                        details: (item, index) => {
                            if (details.includes(index)) {
                                if (isLoadingData) {
                                    return (
                                        <CCardBody>
                                            {/* <CProgress onTimeUpdate={3000} showPercentage isLoaded={isLoaded} sm animated value={100} className="mb-3" color='danger' /> */}
                                            {showLoadingData()}
                                        </CCardBody>
                                    )
                                }
                                else if (companyById.length) {
                                    // var dataShow = [...countryList];
                                    console.log(companyById)
                                    return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CRow>
                                                    {/* <CLabel htmlFor="nf-email">
                                                        {index + 1} : &nbsp;
                                                    </CLabel> */}

                                                    <CCol xs="12" sm="6" md="3">
                                                        <CForm className="text-left" action="" method="post">
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-email">
                                                                    {" "}
                                                                    รหัสบริษัท
                                                                </CLabel>
                                                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                                    width: ' 100%'
                                                                }}>
                                                                    <CInput
                                                                        type="text"
                                                                        maxLength="15"
                                                                        id={'In-companyId-' + index}
                                                                        value={companyById[0].companyCode}
                                                                        onChange={
                                                                            handleChangeUpdateField(index, 'companyCode')
                                                                        }
                                                                        // placeholder={dataShow[index].countryCode}
                                                                        autoComplete="email"
                                                                    />
                                                                </Box>
                                                            </CFormGroup>
                                                        </CForm>
                                                    </CCol>
                                                    <CCol xs="12" sm="6" md="3">
                                                        <CForm className="text-left" action="" method="post">
                                                            <CFormGroup>
                                                                <CLabel >Plant Prefix Code</CLabel>
                                                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                                    width: ' 100%'
                                                                }}>
                                                                    <CInput
                                                                        type="text"
                                                                        id={"In-PlantPrefixCode-" + index}
                                                                        maxLength="15"
                                                                        value={companyById[0].plantPrefixCode}
                                                                        onChange={
                                                                            handleChangeUpdateField(index, 'plantPrefixCode')
                                                                        }
                                                                    // placeholder={dataShow[index].countryNameEng}

                                                                    />
                                                                </Box>
                                                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                                            </CFormGroup>
                                                        </CForm>
                                                    </CCol>

                                                    <CCol xs="12" sm="6" md="3">
                                                        <CForm className="text-left" action="" method="post">
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-email">
                                                                    ชื่อบริษัท(ย่อ)
                                                                </CLabel>
                                                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                                    width: ' 100%'
                                                                }}>
                                                                    <CInput
                                                                        type="text"
                                                                        id={"In-companyShortName-" + index}
                                                                        maxLength="100"
                                                                        value={companyById[0].companyShortName}
                                                                        onChange={
                                                                            handleChangeUpdateField(index, 'companyShortName')
                                                                        }
                                                                    // placeholder={dataShow[index].countryNameEng}

                                                                    />
                                                                </Box>
                                                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                                            </CFormGroup>
                                                        </CForm>
                                                    </CCol>

                                                    <CCol xs="12" sm="6" md="3">
                                                        <CForm className="text-left" action="" method="post">
                                                            <CFormGroup>
                                                                <CLabel htmlFor="nf-email">
                                                                    ชื่อบริษัท
                                                                </CLabel>
                                                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                                    width: ' 100%'
                                                                }}>
                                                                    <CInput
                                                                        type="text"
                                                                        id={"In-companyName-" + index}
                                                                        maxLength="100"
                                                                        value={companyById[0].companyName}
                                                                        onChange={
                                                                            handleChangeUpdateField(index, 'companyName')
                                                                        }
                                                                    // placeholder={dataShow[index].countryNameThai}

                                                                    />
                                                                </Box>
                                                                {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                                                            </CFormGroup>
                                                        </CForm>
                                                    </CCol>

                                                </CRow>
                                                <CRow className='justify-content-center'>
                                                    <CCol xs="10" sm="6" md="3">
                                                        <CFormGroup>
                                                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                                width: ' 100%'
                                                            }}>
                                                                <CButton
                                                                    className="editbutton"
                                                                    size={Constant.btAddSize}
                                                                    color="primary"
                                                                    onClick={() => setPrimary(!primary)}
                                                                    block
                                                                >
                                                                    แก้ไขข้อมูล
                                                                </CButton>
                                                            </Box>
                                                        </CFormGroup>
                                                    </CCol>

                                                    <CCol xs="10" sm="6" md="3">
                                                        <CFormGroup>
                                                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                                width: ' 100%'
                                                            }}>
                                                                <CButton
                                                                    className="editbutton"
                                                                    size={Constant.btAddSize}
                                                                    color="danger"
                                                                    onClick={() => setDanger(!danger)}
                                                                    block
                                                                >
                                                                    ลบข้อมูล
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
                                                            <CModalTitle>ตรวจสอบข้อมูล</CModalTitle>
                                                        </h5>
                                                    </CModalHeader>
                                                    <CModalBody>
                                                        คุณต้องการจะแก้ไขข้อมูลใช่หรือไม่?
                                                    </CModalBody>
                                                    <CModalFooter>
                                                        <CButton
                                                            color="success"
                                                            onClick={onClickEditData(index)}
                                                        >
                                                            ยืนยัน
                                                        </CButton>{" "}
                                                        <CButton
                                                            color="secondary"
                                                            onClick={() => setPrimary(!primary)}
                                                        >
                                                            ยกเลิก
                                                        </CButton>
                                                    </CModalFooter>
                                                </CModal>
                                                <CModal
                                                    show={danger}
                                                    onClose={() => setDanger(!danger)}
                                                    color="danger"
                                                >
                                                    <CModalHeader closeButton>
                                                        <CModalTitle>ตรวจสอบข้อมูล</CModalTitle>
                                                    </CModalHeader>
                                                    <CModalBody>
                                                        คุณต้องการจะลบข้อมูลใช่หรือไม่?
                                                    </CModalBody>
                                                    <CModalFooter>
                                                        <CButton
                                                            color="danger"
                                                            onClick={fnDeleteData(item.companyId)}
                                                        >
                                                            ยืนยัน
                                                        </CButton>{" "}
                                                        <CButton
                                                            color="secondary"
                                                            onClick={() => setDanger(!danger)}
                                                        >
                                                            ยกเลิก
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

        )
    }

    const collaps = () => {
        return (
            <CCollapse show={collapse}>
                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                    width: ' 100%'
                }}>
                    <CCard className='p-3 mt-1'>
                        <CForm className="company-need-validation" novalidate>
                            <CRow>
                                <CCol xs="12" sm="6" md="2">
                                    <CFormGroup>
                                        <CLabel > รหัสบริษัท</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                // invalid={validations}                    
                                                maxLength="15"
                                                // id="In-CountryId"
                                                type="text"
                                                value={IncompanyCode}
                                                onChange={(event) => {
                                                    setIncompanyCode(event.target.value);
                                                }}
                                                required />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="2">
                                    <CFormGroup >
                                        <CLabel>Plant Prefix Code</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                // invalid={validations}                    
                                                type="text"
                                                // id="In-CountryNameEng"
                                                maxLength="15"
                                                value={IncompanyPrefix}
                                                onChange={(event) => {
                                                    setIncompanyPrefix(event.target.value);
                                                }}
                                                required />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="2">
                                    <CFormGroup >
                                        <CLabel>ชื่อบริษัท(ย่อ)</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                // invalid={validations}                    
                                                type="text"
                                                // id="In-CountryNameEng"
                                                maxLength="100"
                                                value={IncompanyShortName}
                                                onChange={(event) => {
                                                    setIncompanyShortName(event.target.value);
                                                }}
                                                required />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="2">
                                    <CFormGroup>
                                        <CLabel >ชื่อบริษัท</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                // id="In-CountryNameThai"
                                                maxLength="100"
                                                value={IncompanyName}
                                                onChange={(event) => {
                                                    setIncompanyName(event.target.value);
                                                }}
                                                required />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>

                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow className='m-1 p-0 justify-content-center'>

                                <CCol xs="12" sm="6" md="2">
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CButton
                                            className="editbutton"
                                            size={Constant.btAddSize}
                                            // type="submit"
                                            color="success"
                                            onClick={onClickAddCountry}
                                            block
                                        >
                                            บันทึก
                                        </CButton>
                                    </Box>
                                </CCol>
                                <CCol xs="12" sm="6" md="2">
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CButton
                                            className="editbutton"
                                            size={Constant.btAddSize}
                                            color="danger"
                                            onClick={toggle}
                                            block
                                        >
                                            ยกเลิก
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
                                        <CModalTitle>ตรวจสอบข้อมูล</CModalTitle>
                                    </h5>
                                </CModalHeader>
                                <CModalBody>
                                    คุณต้องการจะเพิ่มข้อมูลใช่หรือไม่?
                                </CModalBody>
                                <CModalFooter>
                                    <CButton
                                        color="success"
                                        onClick={fnInsertData(
                                            IncompanyCode,
                                            IncompanyPrefix,
                                            IncompanyShortName,
                                            IncompanyName,

                                        )}
                                    >
                                        ยืนยัน
                                    </CButton>{" "}
                                    <CButton
                                        color="secondary"
                                        onClick={() => setPrimary(!primary)}
                                    >
                                        ยกเลิก
                                    </CButton>
                                </CModalFooter>
                            </CModal>
                        </CForm>
                    </CCard>
                </Box>
            </CCollapse>

        )
    }


    const fnInsertData = (companyCode, companyPrefixCode, companyShortName, companyName) => (e) => {
        Repository.fetchAddCompanyList(companyCode, companyPrefixCode, companyShortName, companyName)
            .then(
                (result) => {
                    if (result.httpCode === "200")
                        window.location.reload(false);
                    else
                        console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
        setPrimary(!primary);
        window.location.reload();
    }


    const fnUpdateData = (companyId, companyPrefixCode, companyShortName, companyName) => {
        Repository.fetchEditCompanyList(companyId, companyPrefixCode, companyShortName, companyName)
            .then(
                (result) => {
                    if (result.httpCode === "200")
                        window.location.reload(false);
                    else
                        console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
        setPrimary(!primary);
        window.location.reload();
    }

    const fnDeleteData = (companyId) => (e) => {
        Repository.fetchDeleteCompanyList(companyId)
            .then(
                (result) => {
                    if (result.httpCode === "200")
                        window.location.reload(false);
                    else
                        console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
        setDanger(!danger);
        window.location.reload();
    }

    const toggleDetails = (index, id) => {
        const position = details.indexOf(index);
        let newDetails = details.slice();
        if (position !== -1) {
            newDetails.splice(position, 1);
        } else {
            newDetails = [details, index];
            if (!isLoadingData.length) {
                fnGetCompanyListById(id)
            }

        }
        console.log(id)

        setDetails(newDetails);
    };

    const _export = React.useRef(null);

    const editData = (id) => (e) => {

        var countrycodeIN = document.getElementById("In-countryCode").value;
        var countryNameTH = document.getElementById("In-countryNameThai").value;
        var countryNameEng = document.getElementById("In-countryNameEng").value;
        // var countrycode = document.getElementById("").value;
        console.log(id, countrycodeIN, countryNameTH, countryNameEng)
        // fnUpdateData(id,countrycode,countryNameTH,countryNameEng)

    }

    const onTodoChange = (value) => {

    }



    const changedata = (item, index, type) => {

        if (type === 'countrycode') {
            item.countryCode = document.getElementById('In-countryCode-' + index).value;
        }



    }




    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport csvOptions={{ allColumns: true }} />
            </GridToolbarContainer>
        );
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

    const setNoValidateForm = (formClassName) => {
        var forms = document.querySelectorAll(`.${formClassName}`);
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.classList.remove('was-validated');
            });
    }

    const onClickAddCountry = () => {
        if (getIsValidForm("company-need-validation")) {

            setPrimary(!primary)

        }
    }



    const fnBaseGetCompanyList = () => {
        Repository.fetchCompanyList()
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.httpCode === "200") {
                        setData(result.data)
                    }
                    else {
                        console.log(result);
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
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

        fnBaseGetCompanyList()


    }, []);

    // const API = "http://192.168.88.128/PION.SCG.SMP.WebAPI/api/Location/GetCountryList"
    // const { data, error, isLoaded } = useFetch(API)


    if (error) {
        return (
            <div className="content-wrapper">
                <div className="card">
                    <div className="card-body">Fetch Error : {error.message}</div>
                </div>
            </div>
        );
    } else if (!isLoaded) {
        return (
            <div className="content-wrapper">
                <div className="card">
                    <div className="card-body">Loading...</div>
                </div>
            </div>
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
                                        <CCol>
                                            <h3 className="headertable">Company</h3>
                                        </CCol>
                                        <CCol className="col-2">
                                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                width: ' 100%'
                                            }}>
                                                <CButton size={Constant.btHeaderSize} block className='btn-mainsmp' onClick={toggle}>
                                                    {Constant.btAddData}
                                                </CButton>
                                            </Box>
                                        </CCol>
                                    </CRow>
                                    {collaps()}
                                </CCardHeader>
                                <CCardBody>
                                    {/* <CRow xs='12' className="justify-content-center "> */}

                                    {tabledata()}

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
