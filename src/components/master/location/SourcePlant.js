import React, { useState, useEffect } from 'react'
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
    CSelect,
    CInvalidFeedback,
    CSpinner
} from '@coreui/react'
import Repository from '../../../repositories/Repository'
import Constant from '../../../helpers/Constant';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Typography } from '@material-ui/core';
import MakeStyleSheet from '../../../helpers/MakeStyleSheet';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import functionController from '../../../helpers/FunctionController';

const fields = [
    {
        key: 'sourceCode',
        label: `${Constant.arrFieldMasterSourcePlant[0]}`,
    },
    {
        key: 'sourceNameEng',
        label: `${Constant.arrFieldMasterSourcePlant[1]}`,
    },
    {
        key: 'sourceNameThai',
        label: `${Constant.arrFieldMasterSourcePlant[2]}`,
    },
    {
        key: 'plant',
        label: `${Constant.arrFieldMasterSourcePlant[3]}`,
    },
    {
        key: 'storageLocation',
        label: `${Constant.arrFieldMasterSourcePlant[4]}`,
    },
    {
        key: 'siteNo',
        label: `${Constant.arrFieldMasterSourcePlant[5]}`,
    },
    {
        key: 'manage',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
]

export default function Source() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorAPI, setErrorAPI] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isPostingData, setIsPostingData] = useState(false);
    const [baseItems, setBaseItems] = useState([]);
    const [items, setItems] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const [details, setDetails] = useState([]);
    const [isShowAddForm, setIsShowAddForm] = useState(false);
    const [isConfirmSave, setIsConfirmSave] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState(false);
    const [itemSelectAdd, setItemSelectAdd] = useState({});
    const [addENname, setAddENname] = useState("");
    const [addTHname, setAddTHname] = useState("");
    const [fieldDelete, setFieldDelete] = useState({});

    const classes = MakeStyleSheet.useStyles();

    const pageCode = "";

    const toggleDetails = (index, keyArr = []) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [details, index]
            if (!isLoadingData) {
                fnGetDataForEdit(keyArr)
            }
        }
        setDetails(newDetails)
    }

    const handleChangeAddForm = () => {
        if (!isLoadingData && !isShowAddForm) {
            fnGetSourceList();
        }
        if (isShowAddForm) {
            setAddENname("");
            setAddTHname("");
        }
        setIsShowAddForm(!isShowAddForm);
    }

    const handleChangeAddSelect = (e, values) => {
        setAddENname(values !== null ? values.sourceNameEng : "");
        setAddTHname(values !== null ? values.sourceNameThai : "");
        if (values !== null) {
            setItemSelectAdd(values);
        }
        else {
            setItemSelectAdd({});
        }
    }

    const handleChangeConfirmDelete = (index = {}) => (e) => {
        setIsConfirmDelete(!isConfirmDelete);
        setFieldDelete(index);
    }

    // const showSelectList = () => {
    //     return (
    //         sourceList.map((item) => (
    //             <option value={item.sourceId}>{"[" + item.sourceCode + "] " + item.sourceNameThai}</option>
    //         )))
    // }

    const onClickAddData = () => {
        setIsConfirmSave(!isConfirmSave);
        var newObj = { ...itemSelectAdd };
        var sourceId = newObj.sourceId;
        var plant = document.getElementById("add-plant").value;
        var storageLocation = document.getElementById("add-storage-location").value;
        var siteNo = document.getElementById("add-site-no").value;
        var newArr = [sourceId, plant, storageLocation, siteNo];
        // console.log(newArr);
        fnInsertData(newArr);
    }

    const onClickDeleteData = () => {
        setIsConfirmDelete(!isConfirmDelete);
        var newObj = { ...fieldDelete };
        var sourceId = newObj.sourceId;
        var plant = newObj.plant;
        var storageLocation = newObj.storageLocation;
        var siteNo = newObj.siteNo;
        var newArr = [sourceId, plant, storageLocation, siteNo]
        // console.log(newArr);
        fnDeleteData(newArr);
    }

    const fnInsertData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchAddSourcePlantList(arrData)
            .then(
                (result) => {
                    setIsPostingData(false);
                    if (result.httpCode === "200")
                        window.location.reload(false);
                    else
                        setErrorAPI(result);
                },
                (error) => {
                    setIsPostingData(false);
                    setErrorAPI(error);
                }
            )
    }

    const fnDeleteData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchRemoveSourcePlantList(arrData)
            .then(
                (result) => {
                    setIsPostingData(false);
                    if (result.httpCode === "200")
                        window.location.reload(false);
                    else
                        setErrorAPI(result);
                },
                (error) => {
                    setIsPostingData(false);
                    setErrorAPI(error);
                }
            )
    }

    const fnGetDataForEdit = (indexArr = []) => {
        setIsLoadingData(true);
        setItems({});
        Repository.fetchGetSourcePlantListById(indexArr)
            .then(
                (result) => {
                    setIsLoadingData(false);
                    if (result.httpCode === "200") {
                        setItems(result.data);
                    }
                    else {
                        setErrorAPI(result);
                    }
                },
                (error) => {
                    setIsLoadingData(false);
                    setErrorAPI(error);
                }
            )
    }

    const fnGetSourceList = () => {
        setIsLoadingData(true);
        setSourceList([]);
        Repository.fetchGetSourceList()
            .then(
                (result) => {
                    setIsLoadingData(false);
                    if (result.httpCode === "200") {
                        setSourceList(result.data);
                    }
                    else {
                        console.log(result);
                    }
                },
                (error) => {
                    setIsLoadingData(false);
                    console.log(error);
                }
            )
    }

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
        Repository.fetchGetSourcePlantList()
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.httpCode === "200") {
                        setBaseItems(result.data);
                    }
                    else {
                        setError(result);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

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

    const onClickCheckFormAddData = () => {
        var value = document.getElementById("add-source-code").value;
        if (getIsValidForm("add-needs-validation") && value !== "") {
            setIsConfirmSave(!isConfirmSave);
            if (invalidMaterialFormAdd) {
                setInvalidMaterialFormAdd(false);
            }
        }
        else {
            if (value === "") {
                setInvalidMaterialFormAdd(true);
            } else {
                if (invalidMaterialFormAdd) {
                    setInvalidMaterialFormAdd(false);
                }
            }
        }
    }

    const showLoadingData = () => (
        <CCol className="text-center headtext">
            <CLabel>
                {Constant.apiLoadingData}
            </CLabel>
            {" "}
            <CSpinner variant="grow" size="md" />
        </CCol>
    )

    const collapseAddForm = () => (
        <CCollapse show={isShowAddForm}>

            {dataAddForm()}

        </CCollapse >
    )

    const dataAddForm = () => {
        if (isLoadingData) {
            return (
                <div>
                    <CRow>
                        <CCol>
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
                        </CCol>
                    </CRow>
                </div>
            )
        }
        else if (sourceList.length) {
            return (
                <CForm className="add-needs-validation" noValidate>
                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                    }}>
                        <CCard className='p-3'>
                            <CRow>
                                <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterSourcePlant[6]}</CLabel>
                                        {/* <CSelect id="add-source-code" onChange={handleChangeAddSelect} required>
                                    <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                    {showSelectList()}
                                </CSelect>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <Autocomplete
                                                id="add-source-code"
                                                options={sourceList}
                                                size="small"
                                                getOptionLabel={(option) => ("[" + option.sourceCode + "] " + option.sourceNameThai)}
                                                // style={{ width: 300 }}   
                                                onChange={handleChangeAddSelect}
                                                renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{"[" + option.sourceCode + "] " + option.sourceNameThai}</Typography>)}
                                                renderInput={(params) => {
                                                    params.inputProps.className = classes.autoCompleteInputLabel;
                                                    return (
                                                        <TextField
                                                            size="small"
                                                            // style={{ height: Constant.styleHeightField }}
                                                            error={invalidMaterialFormAdd}
                                                            {...params}
                                                            label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                                            helperText={invalidMaterialFormAdd ? <Typography className={classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                                            variant="outlined"
                                                        />
                                                    )
                                                }}
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterSourcePlant[1]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={addENname}
                                                disabled
                                                required
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterSourcePlant[2]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={addTHname}
                                                disabled
                                                required
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" />
                                <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterSourcePlant[3]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                id="add-plant"
                                                maxLength="4"
                                                required
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterSourcePlant[4]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                id="add-storage-location"
                                                maxLength="2"
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterSourcePlant[5]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                id="add-site-no"
                                                maxLength="30"
                                                required
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow className='justify-content-center'>
                                <CCol xs="12" sm="6" md="4" lg="2">
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CButton className="editbutton" size={Constant.btAddSize} color="success" block onClick={onClickCheckFormAddData}>
                                            {Constant.btSave}
                                        </CButton>
                                    </Box>
                                </CCol>
                            </CRow>
                        </CCard>
                    </Box>
                </CForm>
            )
        }
    }

    const collapseEditForm = (index) => (
        <CCollapse show={details.includes(index)}>
            <CCardBody>
                {dataEditForm()}
            </CCardBody>
        </CCollapse>
    )

    const dataEditForm = () => {
        if (isLoadingData) {
            return (
                <div>
                    <CRow>
                        <CCol>
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
                        </CCol>
                    </CRow>
                </div>
            )
        }
        else if (Object.keys(items).length) {
            var data = { ...items };
            return (
                <CForm>
                    <CRow>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSourcePlant[0]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.sourceCode}
                                        value={data.sourceCode}
                                        disabled
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSourcePlant[1]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.sourceNameEng}
                                        value={data.sourceNameEng}
                                        disabled
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSourcePlant[2]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.sourceNameThai}
                                        value={data.sourceNameThai}
                                        disabled
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSourcePlant[3]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.plant}
                                        value={data.plant}
                                        disabled
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSourcePlant[4]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.storageLocation}
                                        value={data.storageLocation}
                                        disabled
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSourcePlant[5]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.siteNo}
                                        value={data.siteNo}
                                        disabled
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow className='justify-content-center'>
                        <CCol xs="12" sm="6" md="2">
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                            }}>
                                <CButton className="editbutton" size={Constant.btAddSize} color="danger" onClick={handleChangeConfirmDelete(data)} block>
                                    {Constant.btDeleteData}
                                </CButton>
                            </Box>
                        </CCol>
                    </CRow>
                </CForm>
            )
        }
    }

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
            <CModal
                show={errorAPI}
                color="danger"
                closeOnBackdrop={false}
            >
                <CModalHeader>
                    <h5>
                        <CLabel>
                            {Constant.apiTopicFetchError}
                        </CLabel>
                    </h5>
                </CModalHeader>
                <CModalBody>
                    <CLabel>
                        {errorAPI ? errorAPI.message != null ? errorAPI.message : errorAPI.messageDescription : " "}
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
            >
                <CModalHeader closeButton>
                    <h5><CModalTitle  >{Constant.titleConfirmChangeData}</CModalTitle></h5>
                </CModalHeader>
                <CModalBody>
                    {Constant.contentConfirmAddData}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={onClickAddData}>
                        {Constant.btOK}
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setIsConfirmSave(!isConfirmSave)}>
                        {Constant.btCancel}
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* End Add Modal */}

            {/* Start Delete Modal */}
            <CModal
                show={isConfirmDelete}
                onClose={() => setIsConfirmDelete(!isConfirmDelete)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {Constant.contentConfirmDeleteData}
                </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={onClickDeleteData}>
                        {Constant.btOK}
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setIsConfirmDelete(!isConfirmDelete)}>
                        {Constant.btCancel}
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* End Delete Modal */}
        </div>
    )

    if (error) {
        return (
            <CCol className="text-center">
                {Constant.apiTopicFetchError} : {error.message}
            </CCol>
        );
    } else if (!isLoaded) {
        return (
            showLoadingData()
        );
    }
    else {
        return (
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol>
                                    <h3 className="headertable">{Constant.txtMasterSourcePlant}</h3>
                                </CCol>
                                <CCol md="2" xs="4">
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CButton block className='btn-mainsmp' size={Constant.btHeaderSize} onClick={handleChangeAddForm}>{Constant.btAddData}</CButton>
                                    </Box>
                                </CCol>
                            </CRow>
                            {collapseAddForm()}
                        </CCardHeader>
                        <CCardBody>
                            {/* <CRow className="justify-content-center"> */}
                            <CCard>
                                <CCardBody>
                                    <CDataTable
                                        items={baseItems}
                                        fields={fields}
                                        columnFilter
                                        tableFilter={{
                                            label: `${Constant.tabletxtSearch}`,
                                            placeholder: `${Constant.tabletxtPlaceholder}`
                                        }}
                                        itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
                                        itemsPerPage={10}
                                        hover
                                        sorter
                                        pagination
                                        scopedSlots={{
                                            'manage':
                                                (data, index) => (
                                                    <td className="py-2">
                                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                            width: ' 100%'
                                                        }}>
                                                            <CButton
                                                                color="primary"
                                                                variant="outline"
                                                                shape="square"
                                                                size={Constant.btAddSize}
                                                                block
                                                                onClick={() => { toggleDetails(index, [data.sourceId, data.plant, data.storageLocation, data.siteNo]) }}
                                                            >
                                                                {details.includes(index) ? `${Constant.btCollapseHide}` : `${Constant.btCollapseShow}`}
                                                            </CButton>
                                                        </Box>
                                                    </td>
                                                ),
                                            'details':
                                                (data, index) => {
                                                    return (
                                                        collapseEditForm(index)
                                                    )
                                                }
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                            {/* </CRow> */}
                        </CCardBody>
                    </CCard>
                </CCol>
                {allModal()}
            </CRow>
        )
    }
}
