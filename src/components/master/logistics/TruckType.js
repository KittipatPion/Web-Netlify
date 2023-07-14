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
    CSwitch,
    CRow,
    CInvalidFeedback,
    CInputCheckbox,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Repository from '../../../repositories/Repository'
import Constant from '../../../helpers/Constant';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import functionController from '../../../helpers/FunctionController';

const fields = [
    {
        key: 'truckTypeCode',
        label: `${Constant.arrFieldMasterTruckType[0]}`,
    },
    {
        key: 'truckTypeName',
        label: `${Constant.arrFieldMasterTruckType[1]}`,
    },
    {
        key: 'truckTypeDesc',
        label: `${Constant.arrFieldMasterTruckType[2]}`,
    },
    {
        key: 'loadWeight',
        label: `${Constant.arrFieldMasterTruckType[3]}`,
    },
    {
        key: 'isActive',
        label: `${Constant.arrFieldMasterTruckType[4]}`,
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

export default function TruckType() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorAPI, setErrorAPI] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isPostingData, setIsPostingData] = useState(false);
    const [baseItems, setBaseItems] = useState([]);
    const [items, setItems] = useState([]);
    const [details, setDetails] = useState([]);
    const [isShowAddForm, setIsShowAddForm] = useState(false);
    const [isConfirmSave, setIsConfirmSave] = useState(false);
    const [isConfirmEdit, setIsConfirmEdit] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [fieldDelete, setFieldDelete] = useState(null);

    const pageCode = "";

    const toggleDetails = (index, keyId) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [details, index]
            if (!isLoadingData) {
                fnGetDataForEdit(keyId)
            }
        }
        setDetails(newDetails)
    }

    const handleChangeAddForm = () => {
        setIsShowAddForm(!isShowAddForm);
    }

    const handleChangeConfirmDelete = (index) => (e) => {
        setIsConfirmDelete(!isConfirmDelete);
        setFieldDelete(index);
    }

    const handleChangeUpdateField = (type) => (e) => {
        let newObj = { ...items };
        if (type === "truckTypeCode")
            newObj.truckTypeCode = e.target.value;
        else if (type === "truckTypeName")
            newObj.truckTypeName = e.target.value;
        else if (type === "truckTypeDesc")
            newObj.truckTypeDesc = e.target.value;
        else if (type === "loadWeight")
            newObj.loadWeight = e.target.value;
        else if (type === "isActive")
            newObj.isActive = !newObj.isActive;
        setItems(newObj);
    }

    const onClickAddData = () => {
        setIsConfirmSave(!isConfirmSave);
        var truckTypeCode = document.getElementById("add-trucktype-code").value;
        var truckTypeName = document.getElementById("add-trucktype-name").value;
        var truckTypeDesc = document.getElementById("add-description").value;
        var loadWeight = document.getElementById("add-loadweight").value;
        var isActive = true;
        var createBy = 1;
        var newArr = [truckTypeCode, truckTypeName, truckTypeDesc, loadWeight, isActive, createBy];
        // console.log(newArr);
        fnInsertData(newArr)
    }

    const onClickEditData = () => {
        setIsConfirmEdit(!isConfirmEdit);
        var newObj = { ...items };
        var truckTypeId = newObj.truckTypeId;
        var truckTypeCode = newObj.truckTypeCode;
        var truckTypeName = newObj.truckTypeName;
        var truckTypeDesc = newObj.truckTypeDesc;
        var loadWeight = newObj.loadWeight;
        var isActive = newObj.isActive;
        var updateBy = 1;
        var arrObj = [truckTypeId, truckTypeCode, truckTypeName, truckTypeDesc, loadWeight, isActive, updateBy];
        // console.log(arrObj);
        fnUpdateData(arrObj);
    }

    const onClickDeleteData = () => {
        setIsConfirmDelete(!isConfirmDelete);
        var truckTypeId = fieldDelete;
        // console.log(sourceId);
        fnDeleteData(truckTypeId);
    }

    const fnInsertData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchAddTruckTypeList(arrData)
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
        Repository.fetchEditTruckTypeList(arrData)
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

    const fnDeleteData = (index) => {
        setIsPostingData(true);
        Repository.fetchRemoveTruckTypeList(index)
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

    const fnGetDataForEdit = (index) => {
        setIsLoadingData(true);
        setItems({});
        Repository.fetchGetTruckTypeListById(index)
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
        Repository.fetchGetTruckTypeList()
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
        if (getIsValidForm("add-needs-validation")) {
            setIsConfirmSave(!isConfirmSave);
        }
    }

    const onClickCheckFormEditData = () => {
        if (getIsValidForm("edit-needs-validation")) {
            setIsConfirmEdit(!isConfirmEdit);
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
            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                width: ' 100%'
            }}>
                <CCard className='p-3'>
                    <CForm className="add-needs-validation" noValidate>
                        <CRow>
                            <CCol xs="4" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterTruckType[0]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="text"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-trucktype-code"
                                            maxLength="15"
                                            required
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="4" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterTruckType[1]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="text"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-trucktype-name"
                                            maxLength="50"
                                            required
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="4" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterTruckType[3]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="number"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-loadweight"
                                            maxLength="18"
                                            required
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="4" sm="6" md="3" />
                            <CCol xs="4" sm="6" md="6">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterTruckType[2]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="text"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-description"
                                            maxLength="50"
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow className='justify-content-center'>
                            <CCol xs="4" sm="6" md="1">
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CButton className="editbutton" size={Constant.btAddSize} color="success" block onClick={onClickCheckFormAddData}>
                                        {Constant.btSave}
                                    </CButton>
                                </Box>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCard>
            </Box>
        </CCollapse >
    )

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
                <CForm className="edit-needs-validation" noValidate>
                    <CRow>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterTruckType[0]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.truckTypeCode}
                                        onChange={handleChangeUpdateField("truckTypeCode")}
                                        maxLength="15"
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterTruckType[1]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.truckTypeName}
                                        onChange={handleChangeUpdateField("truckTypeName")}
                                        maxLength="50"
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterTruckType[3]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="number"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.loadWeight}
                                        onChange={handleChangeUpdateField("loadWeight")}
                                        maxLength="18"
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12" sm="6" md="6" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterTruckType[2]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.truckTypeDesc}
                                        onChange={handleChangeUpdateField("truckTypeDesc")}
                                        maxLength="50"
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="2" className="text-left">
                            <CFormGroup>

                                <CCol md="12">
                                    <CFormGroup variant="checkbox" className="checkbox" >
                                        <CLabel htmlFor="nf-email" onClick={handleChangeUpdateField("isActive")}>
                                            &nbsp; {Constant.txtFormisActive}
                                        </CLabel>
                                        &nbsp;
                                        <CSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={handleChangeUpdateField("isActive")} checked={data.isActive} labelOn={'\u2713'} labelOff={'\u2715'} />


                                    </CFormGroup>
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow className='justify-content-center'>
                        <CCol xs="12" sm="6" md="2">
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                            }}>
                                <CButton className="editbutton" size={Constant.btAddSize} color="primary" block onClick={onClickCheckFormEditData}>
                                    {Constant.btEditData}
                                </CButton>
                            </Box>
                        </CCol >
                        <CCol xs="12" sm="6" md="2">

                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                            }}>

                                <CButton className="editbutton" size={Constant.btAddSize} color="danger" onClick={handleChangeConfirmDelete(data.truckTypeId)} block>
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
                                    <h3 className="headertable">{Constant.txtMasterTruckType}</h3>
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
                            <CCard className="pl-1 pr-1" style={{ maxHeight: "700px", overflowY: "auto" }}>
                                {/* <CCardBody> */}
                                <CDataTable
                                    items={baseItems}
                                    fields={fields}
                                    // columnFilter
                                    tableFilter={{
                                        label: `${Constant.tabletxtSearch}`,
                                        placeholder: `${Constant.tabletxtPlaceholder}`
                                    }}
                                    itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
                                    itemsPerPage={10}
                                    // hover
                                    // sorter
                                    responsive
                                    bordered
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
                                                            onClick={() => { toggleDetails(index, data.truckTypeId) }}
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
                                {/* </CCardBody> */}
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
