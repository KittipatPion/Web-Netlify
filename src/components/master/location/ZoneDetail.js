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
    CInvalidFeedback,
    CBadge,
    CInputCheckbox,
    CSelect,
    CSwitch,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Repository from '../../../repositories/Repository'
import Constant from '../../../helpers/Constant';
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Typography } from '@material-ui/core';
import MakeStyleSheet from '../../../helpers/MakeStyleSheet';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import functionController from '../../../helpers/FunctionController';

const fields = [
    {
        key: 'zoneName',
        label: `${Constant.arrFieldMasterZoneDetail[0]}`,
    },
    {
        key: 'provineName',
        label: `${Constant.arrFieldMasterZoneDetail[1]}`,
    },
    {
        key: 'isActive',
        label: `${Constant.arrFieldMasterZoneDetail[2]}`,
        _style: { width: '1%' },
    },
    {
        key: 'manage',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
]

export default function ZoneDetail() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorAPI, setErrorAPI] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isPostingData, setIsPostingData] = useState(false);
    const [baseItems, setBaseItems] = useState([]);
    const [items, setItems] = useState({});
    const [zoneList, setZoneList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [details, setDetails] = useState([]);
    const [isShowAddForm, setIsShowAddForm] = useState(false);
    const [isConfirmSave, setIsConfirmSave] = useState(false);
    const [isConfirmEdit, setIsConfirmEdit] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState(false);
    const [fieldDelete, setFieldDelete] = useState(null);

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
            fnGetZoneDetailOtherList();
        }
        setIsShowAddForm(!isShowAddForm);
    }

    const handleChangeConfirmDelete = (index = []) => (e) => {
        setIsConfirmDelete(!isConfirmDelete);
        setFieldDelete(index);
    }

    const handleChangeUpdateField = () => {
        let newObj = { ...items };
        newObj.isActive = !newObj.isActive;
        setItems(newObj);
    }

    const showSelectList = (type) => {
        if (type === "zone") {
            return (
                zoneList.map((item) => (
                    <option value={item.zoneId}>{item.zoneName}</option>
                )))
        }
        // else if (type === "province") {
        //     return (
        //         provinceList.map((item) => (
        //             <option value={item.provinceId}>{item.provinceName1}</option>
        //         )))
        // }
    }

    const onClickAddData = () => {
        setIsConfirmSave(!isConfirmSave);
        var zoneId = parseInt(document.getElementById("add-zone-name").value);
        var provinceValue = document.getElementById("add-province-name").value;
        var result = provinceList.find((x) => x.provinceName1 === provinceValue);
        var provinceId = result.provinceId;
        var isActive = true;
        var createBy = 1;
        var newArr = [zoneId, provinceId, isActive, createBy];
        // console.log(newArr);
        fnInsertData(newArr);
    }

    const onClickEditData = () => {
        setIsConfirmEdit(!isConfirmEdit);
        var newObj = { ...items };
        var zoneId = newObj.zoneId;
        var provinceId = newObj.provinceId;
        var isActive = newObj.isActive;
        var updateBy = 1;
        var newArr = [zoneId, provinceId, isActive, updateBy];
        // console.log(newArr);
        fnUpdateData(newArr);
    }

    const onClickDeleteData = () => {
        setIsConfirmDelete(!isConfirmDelete);
        var arrIndex = fieldDelete;
        // console.log(arrIndex);
        fnDeleteData(arrIndex);
    }

    const fnInsertData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchAddZoneDetailList(arrData)
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

    const fnUpdateData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchEditZoneDetailList(arrData)
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

    const fnDeleteData = (index = []) => {
        setIsPostingData(true);
        Repository.fetchRemoveZoneDetailList(index)
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
        Repository.fetchGetZoneDetailListById(indexArr)
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

    const fnGetZoneDetailOtherList = () => {
        setIsLoadingData(true);
        setZoneList([]);
        setProvinceList([]);
        Repository.fetchGetZoneDetailOtherList()
            .then(
                (result) => {
                    setIsLoadingData(false);
                    if (result.httpCode === "200") {
                        setZoneList(result.data.zoneList);
                        setProvinceList(result.data.provinceList);
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
        Repository.fetchGetZoneDetailList()
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
        var value = document.getElementById("add-province-name").value;
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
            <CCardBody>
                {dataAddForm()}
            </CCardBody>
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
                        </CCol>
                    </CRow>
                    {showLoadingData()}
                    <CRow>
                        <CCol>
                            <br />
                            <br />
                        </CCol>
                    </CRow>
                </div>
            )
        }
        else if (zoneList.length && provinceList.length) {
            return (
                <CForm className="add-needs-validation" noValidate>
                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                        width: ' 100%'
                    }}>
                        <CCard className='p-3'>
                            <CRow>
                                <CCol xs="12" sm="6" md="4">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterZoneDetail[0]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CSelect id="add-zone-name" style={{ height: Constant.styleHeightField }} required>
                                                <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                                {showSelectList("zone")}
                                            </CSelect>
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="6" md="4">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterZoneDetail[1]}</CLabel>
                                        {/* <CSelect id="add-province-name" required>
                                    <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                    {showSelectList("province")}
                                </CSelect>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback> */}
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <Autocomplete
                                                id="add-province-name"
                                                options={provinceList}
                                                size="small"
                                                getOptionLabel={(option) => (`${option.provinceName1}`)}
                                                // style={{ width: 300 }}   
                                                renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{option.provinceName1}</Typography>)}
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
                                                }
                                                }
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
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
                </CForm >
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
                        </CCol>
                    </CRow>
                    {showLoadingData()}
                    <CRow>
                        <CCol>
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
                        <CCol md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterZoneDetail[0]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.zoneName}
                                        disabled
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol md="5" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterZoneDetail[1]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.provineName}
                                        disabled
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="3">
                            <CFormGroup>
                                <CFormGroup variant="checkbox" className="checkbox">
                                    <CLabel className='mt-1' class="align-top" variant="checkbox" className="form-check-label" onClick={handleChangeUpdateField}>
                                        &nbsp; {Constant.txtFormisActive}
                                    </CLabel>
                                    <CSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={handleChangeUpdateField} checked={data.isActive} labelOn={'\u2713'} labelOff={'\u2715'} />

                                    {/* <CInputCheckbox
                                        checked={data.isActive}
                                        onChange={handleChangeUpdateField}
                                    /> */}
                                    {/* <CLabel variant="checkbox" className="form-check-label" onClick={handleChangeUpdateField}>{Constant.txtFormisActive}</CLabel> */}
                                </CFormGroup>

                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow className='justify-content-center'>
                        <CCol xs="12" sm="6" md="2">
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                            }}>
                                <CButton className="editbutton" size={Constant.btAddSize} color="primary" block onClick={() => setIsConfirmEdit(!isConfirmEdit)}>
                                    {Constant.btEditData}
                                </CButton>
                            </Box>
                        </CCol>
                        <CCol xs="12" sm="6" md="2">
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                            }}>
                                <CButton className="editbutton" size={Constant.btAddSize} color="danger" onClick={handleChangeConfirmDelete([data.zoneId, data.provinceId])} block>
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

            {/* Start Edit Modal */}
            <CModal
                show={isConfirmEdit}
                onClose={() => setIsConfirmEdit(!isConfirmEdit)}
                color="success"
            >
                <CModalHeader closeButton>
                    <h5><CModalTitle  >{Constant.titleConfirmChangeData}</CModalTitle></h5>
                </CModalHeader>
                <CModalBody>
                    {Constant.contentConfirmEditData}
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={onClickEditData}>
                        {Constant.btOK}
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setIsConfirmEdit(!isConfirmEdit)}>
                        {Constant.btCancel}
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* End Edit Modal */}

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
                                    <h3 className="headertable">{Constant.txtMasterZoneDetail}</h3>
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
                                            'isActive':
                                                (data) => (
                                                    <td className="py-2 text-center">
                                                        {data.isActive ? (
                                                            <CIcon name="cil-check-circle" style={{ color: 'green' }} size="2xl" />
                                                        ) : (
                                                            <CIcon name="cil-x-circle" style={{ color: 'red' }} size="2xl" />
                                                        )}
                                                    </td>
                                                ),
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
                                                                onClick={() => { toggleDetails(index, [data.zoneId, data.provinceId]) }}
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
            </CRow >
        )
    }
}
