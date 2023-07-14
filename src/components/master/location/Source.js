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
    CSpinner
} from '@coreui/react'
import Repository from '../../../repositories/Repository'
import Constant from '../../../helpers/Constant';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import functionController from '../../../helpers/FunctionController';

const fields = [
    {
        key: 'sourceCode',
        label: `${Constant.arrFieldMasterSource[0]}`,
    },
    {
        key: 'sourceNameEng',
        label: `${Constant.arrFieldMasterSource[1]}`,
    },
    {
        key: 'sourceNameThai',
        label: `${Constant.arrFieldMasterSource[2]}`,
    },
    {
        key: 'sourceDesc',
        label: `${Constant.arrFieldMasterSource[3]}`,
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
        if (type === "sourceCode")
            newObj.sourceCode = e.target.value;
        else if (type === "sourceNameEng")
            newObj.sourceNameEng = e.target.value;
        else if (type === "sourceNameThai")
            newObj.sourceNameThai = e.target.value;
        else if (type === "sourceDesc")
            newObj.sourceDesc = e.target.value;
        setItems(newObj);
    }

    const onClickAddData = () => {
        setIsConfirmSave(!isConfirmSave);
        var sourceCode = document.getElementById("add-source-code").value;
        var sourceNameEng = document.getElementById("add-en-name").value;
        var sourceNameThai = document.getElementById("add-th-name").value;
        var sourceDesc = document.getElementById("add-description").value;
        var createBy = 1;
        var newArr = [sourceCode, sourceNameEng, sourceNameThai, sourceDesc, createBy];
        // console.log(newArr);
        fnInsertData(newArr)
    }

    const onClickEditData = () => {
        setIsConfirmEdit(!isConfirmEdit);
        var newObj = { ...items };
        var sourceId = newObj.sourceId;
        var sourceCode = newObj.sourceCode;
        var sourceNameEng = newObj.sourceNameEng;
        var sourceNameThai = newObj.sourceNameThai;
        var sourceDesc = newObj.sourceDesc;
        var updateBy = 1;
        var newArr = [sourceId, sourceCode, sourceNameEng, sourceNameThai, sourceDesc, updateBy];
        // console.log(newArr);
        fnUpdateData(newArr);
    }

    const onClickDeleteData = () => {
        setIsConfirmDelete(!isConfirmDelete);
        var sourceId = fieldDelete;
        // console.log(sourceId);
        fnDeleteData(sourceId);
    }

    const fnInsertData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchAddSourceList(arrData)
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
        Repository.fetchEditSourceList(arrData)
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
        Repository.fetchRemoveSourceList(index)
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
        Repository.fetchGetSourceListById(index)
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
        Repository.fetchGetSourceList()
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
                            <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterSource[0]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="text"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-source-code"
                                            maxLength="10"
                                            required
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterSource[1]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="text"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-en-name"
                                            maxLength="50"
                                            required
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterSource[2]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="text"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-th-name"
                                            maxLength="50"
                                            required
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol md="3" />
                            <CCol xs="12" sm="6" md="6">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterSource[3]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="text"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-description"
                                            maxLength="255"
                                        />
                                    </Box>
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
                                <CLabel>{Constant.arrFieldMasterSource[0]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.sourceCode}
                                        value={data.sourceCode}
                                        onChange={handleChangeUpdateField("sourceCode")}
                                        maxLength="10"
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSource[1]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.sourceNameEng}
                                        value={data.sourceNameEng}
                                        onChange={handleChangeUpdateField("sourceNameEng")}
                                        maxLength="50"
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterSource[2]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.sourceNameThai}
                                        value={data.sourceNameThai}
                                        onChange={handleChangeUpdateField("sourceNameThai")}
                                        maxLength="50"
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
                                <CLabel>{Constant.arrFieldMasterSource[3]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        placeholder={data.sourceDesc}
                                        value={data.sourceDesc}
                                        onChange={handleChangeUpdateField("sourceDesc")}
                                        maxLength="255"
                                    />
                                </Box>
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
                        </CCol>
                        <CCol xs="12" sm="6" md="2">
                            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                            }}>

                                <CButton className="editbutton" size={Constant.btAddSize} color="danger" onClick={handleChangeConfirmDelete(data.sourceId)} block>
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
                                    <h3 className="headertable">{Constant.txtMasterSource}</h3>
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
                                                                onClick={() => { toggleDetails(index, data.sourceId) }}
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
