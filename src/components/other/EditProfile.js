import React, { useState, useEffect } from "react";
import Repository from "../../repositories/Repository";
import Constant from "../../helpers/Constant";
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CLabel,
    CRow,
    CModalTitle,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CInvalidFeedback,
    CModal,
    CFormGroup,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const Register = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState({});

    const [isPostingData, setIsPostingData] = useState(false);
    const [errorAPI, setErrorAPI] = useState(null);

    const [isConfirmEdit, setIsConfirmEdit] = useState(false);

    const [isChangeRePassword, setIsChangeRePassword] = useState(false);
    const [isShowFormChangePass, setIsShowFormChangePass] = useState(false);
    const [isShowSuccessChangePass, setIsShowSuccessChangePass] = useState(false);

    const _UserId = parseInt(localStorage.getItem('userId'));
    const _TranspoterId = parseInt(localStorage.getItem('transporterId'));

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

    const handleChangeUpdateField = (type) => (e) => {
        var newObj = { ...items };
        if (type === "firstName") {
            newObj.firstName = e.target.value;
        }
        else if (type === "lastName") {
            newObj.lastName = e.target.value;
        }
        else if (type === "aliasName") {
            newObj.aliasName = e.target.value;
        }
        else if (type === "email") {
            newObj.email = e.target.value;
        }
        setItems(newObj);
    }

    const handleChangeValidationPassword = (e) => {
        var upperChar = /[A-Z]/g;
        var numberChar = /[0-9]/g;
        var specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var length = 8;
        var input = e.target.value;

        if (input.match(upperChar)) {
            document.getElementById("rules-01").style.color = "green";
        }
        else {
            document.getElementById("rules-01").style.color = "red";
        }

        if (input.match(numberChar)) {
            document.getElementById("rules-02").style.color = "green";
        }
        else {
            document.getElementById("rules-02").style.color = "red";
        }

        if (input.match(specialChar)) {
            document.getElementById("rules-03").style.color = "green";
        }
        else {
            document.getElementById("rules-03").style.color = "red";
        }

        if (input.length >= length) {
            document.getElementById("rules-04").style.color = "green";
        }
        else {
            document.getElementById("rules-04").style.color = "red";
        }
    }

    const fnClearDataFormChangePass = () => {
        setIsChangeRePassword(false);
        setNoValidateForm("change-pass-need-validation");
        document.getElementById("old-password").value = "";
        document.getElementById("change-password").value = "";
        document.getElementById("change-re-password").value = "";
    }

    const onClickChangePassword = () => {
        var oldPass = document.getElementById("old-password").value;
        var pass = document.getElementById("change-password").value;
        var rePass = document.getElementById("change-re-password").value;
        if (getIsValidForm("change-pass-need-validation") && pass === rePass) {
            setIsChangeRePassword(false);
            setIsShowFormChangePass(!isShowFormChangePass);
            var userId = _UserId;
            var newArr = [userId, pass, oldPass];

            fnClearDataFormChangePass();

            // console.log(newArr);
            fnChangePassword(newArr);
        }
        else if (pass !== rePass) {
            setNoValidateForm("change-pass-need-validation");
            setIsChangeRePassword(true);
        }
        else {
            setIsChangeRePassword(false);
        }
    }

    const onClickCheckEditData = () => {
        if (getIsValidForm("edit-need-validation")) {
            setIsConfirmEdit(!isConfirmEdit);
        }
    }

    const onClickEditData = () => {
        setIsConfirmEdit(!isConfirmEdit);
        var newObj = { ...items };
        var firstName = newObj.firstName;
        var lastName = newObj.lastName;
        var aliasName = newObj.aliasName;
        var email = newObj.email;

        var newArr = [
            newObj.userId,
            newObj.userName,
            newObj.isActive,
            newObj.password,
            aliasName,
            firstName,
            lastName,
            newObj.transporterId,
            email,
            _UserId,
            newObj.userGroupId
        ];

        // console.log(newArr);
        fnEditUser(newArr);
    }

    const fnChangePassword = (arrData = []) => {
        setIsPostingData(true);
        Repository.fetchChangePasswordByUser(arrData).then(
            (result) => {
                setIsPostingData(false);
                if (result.httpCode === "200") {
                    setIsShowSuccessChangePass(!isShowSuccessChangePass);
                }
                else {
                    setErrorAPI(result);
                }
            },
            (error) => {
                setIsPostingData(false);
                setErrorAPI(error);
            }
        );
    }

    const fnEditUser = (arrData = []) => {
        setIsPostingData(true);
        Repository.fetchEditUserList(arrData).then(
            (result) => {
                setIsPostingData(false);
                if (result.httpCode === "200") {
                    window.location.reload(false);
                }
                else {
                    setErrorAPI(result);
                }
            },
            (error) => {
                setIsPostingData(false);
                setErrorAPI(error);
            }
        );
    }

    useEffect(() => {
        Repository.fetchGetUserListById(_UserId).then(
            (result) => {
                setIsLoaded(true);
                if (result.httpCode === "200") {
                    setItems(result.data);
                } else {
                    setError(result);
                }
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, []);

    const showLoadingData = () => (
        <CCol className="text-center">
            <CLabel>
                {Constant.apiLoadingData}
            </CLabel>
            {" "}
            <CSpinner variant="grow" size="md" />
        </CCol>
    )

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

            {/* Start Show Form Change Password Modal */}
            <CModal
                show={isShowFormChangePass}
                onClose={() => { fnClearDataFormChangePass(); setIsShowFormChangePass(!isShowFormChangePass); }}
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
                                    <CLabel>รหัสผ่านเดิม</CLabel>
                                    <Box
                                        className="border-set"
                                        component={Grid}
                                        item
                                        boxShadow={1}
                                        xs={{
                                            width: " 100%",
                                        }}
                                    >
                                        <CInput type="password" id="old-password" required />
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </Box>
                                </CFormGroup>
                            </CCol>
                        </CRow>
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
                                        <CInput type="password" id="change-password" onChange={handleChangeValidationPassword} required />
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
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
                                        <CInput type="password" id="change-re-password" invalid={isChangeRePassword} required />
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </Box>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <br />
                                <p id="rules-header">{Constant.contentHeaderSetPassword}</p>
                                <p id="rules-01" style={{ color: 'red' }}>{Constant.contentBodySetPassword01}</p>
                                <p id="rules-02" style={{ color: 'red' }}>{Constant.contentBodySetPassword02}</p>
                                <p id="rules-03" style={{ color: 'red' }}>{Constant.contentBodySetPassword03}</p>
                                <p id="rules-04" style={{ color: 'red' }}>{Constant.contentBodySetPassword04}</p>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={onClickChangePassword}>
                        {Constant.btOK}
                    </CButton>{" "}
                    <CButton
                        color="secondary"
                        onClick={() => { fnClearDataFormChangePass(); setIsShowFormChangePass(!isShowFormChangePass); }}
                    >
                        {Constant.btCancel}
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* End Show Form Change Password Modal */}

            {/* Start Show Success Change Password Modal */}
            <CModal
                show={isShowSuccessChangePass}
                onClose={() => { setIsShowSuccessChangePass(!isShowSuccessChangePass); window.location.reload(false); }}
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
                        onClick={() => { setIsShowSuccessChangePass(!isShowSuccessChangePass); window.location.reload(false); }}
                    >
                        {Constant.btOK}
                    </CButton>
                </CModalFooter>
            </CModal>
            {/* End Show Success Change Password Modal */}

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
        </div>
    )

    if (error) {
        return (
            <CCol className="text-center">
                {Constant.apiTopicFetchError} : {error.message}
            </CCol>
        );
    }
    else if (!isLoaded || !Object.keys(items).length) {
        return (
            showLoadingData()
        );
    }
    else {
        var newObj = { ...items };
        return (
            <div>
                {modalForm()}
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="9" lg="7" xl="6">
                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm className="edit-need-validation">
                                        <h1>Edit Profile</h1>
                                        <p className="text-muted">Change data your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    First Name
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                value={newObj.firstName}
                                                onChange={handleChangeUpdateField("firstName")}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    Last Name
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                value={newObj.lastName}
                                                onChange={handleChangeUpdateField("lastName")}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    Alias Name
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                value={newObj.aliasName}
                                                onChange={handleChangeUpdateField("aliasName")}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    Email
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                value={newObj.email}
                                                onChange={handleChangeUpdateField("email")}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    Username
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput
                                                type="text"
                                                value={newObj.userName}
                                                disabled
                                            />
                                        </CInputGroup>
                                        {/* <CInputGroup className="mb-3">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="password" placeholder="Password" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupPrepend>
                                            <CInputGroupText>
                                                <CIcon name="cil-lock-locked" />
                                            </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="password" placeholder="Repeat password" />
                                    </CInputGroup> */}
                                        <CButton
                                            color="warning"
                                            onClick={() => setIsShowFormChangePass(!isShowFormChangePass)}
                                            block
                                        >
                                            Change Password
                                        </CButton>
                                    </CForm>
                                </CCardBody>
                                <CCardFooter className="p-4">
                                    <CRow>
                                        <CCol xs="12" sm="6">
                                            <CButton
                                                color="success"
                                                block
                                                onClick={onClickCheckEditData}
                                            >
                                                <span>
                                                    Save
                                                </span>
                                            </CButton>
                                        </CCol>
                                        <CCol xs="12" sm="6">
                                            <CButton
                                                color="danger"
                                                block
                                            >
                                                <span>
                                                    Cancel
                                                </span>
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    }
}

export default Register
