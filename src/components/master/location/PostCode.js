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
        key: 'provinceName',
        label: `${Constant.arrFieldMasterPostCode[0]}`,
    },
    {
        key: 'districtName',
        label: `${Constant.arrFieldMasterPostCode[1]}`,
    },
    {
        key: 'postCode',
        label: `${Constant.arrFieldMasterPostCode[2]}`,
    },
    {
        key: 'manage',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
]

export default function PostCode() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorAPI, setErrorAPI] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isPostingData, setIsPostingData] = useState(false);
    const [baseItems, setBaseItems] = useState([]);
    const [items, setItems] = useState({});
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [slDistrictList, setSlDistrictList] = useState([]);
    const [details, setDetails] = useState([]);
    const [isShowAddForm, setIsShowAddForm] = useState(false);
    const [isConfirmSave, setIsConfirmSave] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState(false);
    const [fieldDelete, setFieldDelete] = useState(null);

    const classes = MakeStyleSheet.useStyles();

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
        if (!isLoadingData && !isShowAddForm) {
            fnGetPostCodeOtherList();
        }
        setIsShowAddForm(!isShowAddForm);
    }

    const handleChangeConfirmDelete = (index) => (e) => {
        setIsConfirmDelete(!isConfirmDelete);
        setFieldDelete(index);
    }

    const showSelectList = (type) => {
        if (type === "province") {
            var newArr = provinceList.filter((X) => X.countryId == 213);
            return (
                newArr.map((item) => (
                    <option value={item.provinceId}>{item.provinceName1}</option>
                )))
        }
        else if (type === "district") {
            return (
                slDistrictList.map((item) => (
                    <option value={item.districtId}>{item.districtName1}</option>
                )))
        }
    }

    const handleChangeAddSelect = (e, values) => {
        querySelector(values);
    }

    const querySelector = (item) => {
        var selection = document.getElementById("add-district-name");
        selection.selectedIndex = 0;
        if (item) {
            var result = provinceList.find((x) => x.provinceName1 === item.provinceName1);
            var value = result.provinceId;
            var newArr = districtList.filter((x) => x.provinceId === value);
            setSlDistrictList(newArr);
        }
        else {
            setSlDistrictList([]);
        }
    }

    const onClickAddData = () => {
        setIsConfirmSave(!isConfirmSave);
        var provinceValue = document.getElementById("add-province-name").value;
        var result = provinceList.find((x) => x.provinceName1 === provinceValue);
        var provinceId = result.provinceId;
        var districtId = parseInt(document.getElementById("add-district-name").value);
        districtId = !isNaN(districtId) ? districtId : null;
        var postcode = document.getElementById("add-postcode-name").value;
        var createBy = 1;
        var newArr = [postcode, provinceId, districtId, createBy];
        // console.log(newArr);
        fnInsertData(newArr);
    }

    const onClickDeleteData = () => {
        setIsConfirmDelete(!isConfirmDelete);
        var arrIndex = fieldDelete;
        // console.log(arrIndex);
        fnDeleteData(arrIndex);
    }

    const fnInsertData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchAddPostCodeList(arrData)
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
        Repository.fetchRemovePostCodeList(index)
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
        Repository.fetchGetPostCodeListById(index)
            .then(
                (result) => {
                    setIsLoadingData(false);
                    if (result.httpCode === "200") {
                        setProvinceList(result.data.provinceList);
                        setDistrictList(result.data.districtList);
                        setItems(result.data.postCodeList);
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

    const fnGetPostCodeOtherList = () => {
        setIsLoadingData(true);
        setProvinceList([]);
        setDistrictList([]);
        Repository.fetchGetPostCodeOtherList()
            .then(
                (result) => {
                    setIsLoadingData(false);
                    if (result.httpCode === "200") {
                        setProvinceList(result.data.provinceList);
                        setDistrictList(result.data.districtList);
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
        Repository.fetchGetPostCodeList()
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.httpCode === "200") {
                        var newArr = [];
                        result.data.map((item) => {
                            if (item.districtName === null) {
                                item.districtName = "";
                            }
                            newArr.push(item);
                        });
                        setBaseItems(newArr);
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
        else if (provinceList.length && districtList.length) {
            return (
                <CForm className="add-needs-validation" noValidate>
                    <CCard className='p-3'>


                        <CRow>
                            <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterPostCode[0]}</CLabel>
                                    {/* <CSelect id="add-province-name" style={{ height: Constant.styleHeightField }} required onChange={handleChangeAddSelect}>
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
                                            onChange={handleChangeAddSelect}
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
                                            }}
                                        />
                                    </Box>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterPostCode[1]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CSelect id="add-district-name" style={{ height: Constant.styleHeightField }}>
                                            <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                            <option value="">{Constant.txtformEmptySelected}</option>
                                            {showSelectList("district")}
                                        </CSelect>
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm="6" md="3">
                                <CFormGroup>
                                    <CLabel>{Constant.arrFieldMasterPostCode[2]}</CLabel>
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>
                                        <CInput
                                            type="number"
                                            style={{ height: Constant.styleHeightField }}
                                            id="add-postcode-name"
                                            min="0"
                                            max="99999"
                                            required
                                        />
                                    </Box>
                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
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
                </CForm>
            )
        }
    }

    const collapseEditForm = (index) => (
        <CCollapse show={details.includes(index)}>
            <CCardBody>
                {dataEditForm(index)}
            </CCardBody>
        </CCollapse>
    )

    const dataEditForm = (index) => {
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
                                <CLabel>{Constant.arrFieldMasterPostCode[0]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.provinceName}
                                        disabled
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterPostCode[1]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.districtName}
                                        disabled
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" sm="6" md="4" className="text-left">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterPostCode[2]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="number"
                                        style={{ height: Constant.styleHeightField }}
                                        value={data.postCode}
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
                                <CButton className="editbutton" size={Constant.btAddSize} color="danger" onClick={handleChangeConfirmDelete(data.postCodeId)} block>
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
                                    <h3 className="headertable">{Constant.txtMasterPostCode}</h3>
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
                                                                onClick={() => { toggleDetails(index, data.postCodeId) }}
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
