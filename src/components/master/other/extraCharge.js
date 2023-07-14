import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import routes from "../../../routes";
// import axios from "axios";
import useFetch from "../../../fecthData/useFetch";
import Repository from "../../../repositories/Repository";
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
  CSwitch,
  CSpinner,
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
  CInputCheckbox,
} from "@coreui/react";

import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CIcon from "@coreui/icons-react";
import Box from "@material-ui/core/Box";
import Constant from "../../../helpers/Constant";
import functionController from "../../../helpers/FunctionController";
import { Dialog } from "@material-ui/core";

const fields = [
  {
    key: "transporterName",
    label: `${Constant.arrFieldMasterExtraCharge[0]}`,
  },
  {
    key: "transporterTypeName",
    label: `${Constant.arrFieldMasterExtraCharge[1]}`,
  },
  {
    key: "extraChargeGroupName",
    label: `${Constant.arrFieldMasterExtraCharge[2]}`,
  },
  {
    key: "extraChargeTypeName",
    label: `${Constant.arrFieldMasterExtraCharge[3]}`,
  },
  {
    key: "extraChargeCode",
    label: `${Constant.arrFieldMasterExtraCharge[4]}`,
  },
  {
    key: "extraChargeName",
    label: `${Constant.arrFieldMasterExtraCharge[5]}`,
  },
  {
    key: "extraChargePrice",
    label: `${Constant.arrFieldMasterExtraCharge[6]}`,
    digit: 2
  },
  {
    key: "maxPrice",
    label: `${Constant.arrFieldMasterExtraCharge[7]}`,
    digit: 2
  },
  {
    key: "vatPrice",
    label: `${Constant.arrFieldMasterExtraCharge[8]}`,
    digit: 2
  },
  {
    key: "isUseQty",
    label: `${Constant.arrFieldMasterExtraCharge[9]}`,
  },
  {
    key: "isFixPrice",
    label: `${Constant.arrFieldMasterExtraCharge[10]}`,
  },
  {
    key: "isRequstFile",
    label: `${Constant.arrFieldMasterExtraCharge[11]}`,
  },
  {
    key: "isActive",
    label: `${Constant.arrFieldMasterExtraCharge[12]}`,
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
  const [error, setError] = useState(null);
  const [errorAPI, setErrorAPI] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState([]);
  const [itemsbyId, setItemsbyId] = useState({});
  const [itemsTran, setItemsTran] = useState([]);
  const [itemsGroup, setItemsGroup] = useState([]);
  const [itemsPrice, setItemsPrice] = useState([]);
  const [transportTypeList, setTransportTypeList] = useState([]);
  const [vatList, setVatList] = useState([]);

  const [itemsRemarkSelect1, setItemsRemarkSelect1] = useState([]);
  const [itemsRemarkSelect2, setItemsRemarkSelect2] = useState([]);
  const [itemsRemarkSelect3, setItemsRemarkSelect3] = useState([]);
  const [itemsRemarkSelect4, setItemsRemarkSelect4] = useState([]);

  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isPostingData, setIsPostingData] = useState(false);
  const [accordion, setAccordion] = useState(1);
  const [accordion2, setAccordion2] = useState(2);

  const [success, setSuccess] = useState(false);
  const [primary, setPrimary] = useState(false);
  const [danger, setDanger] = useState(false);

  const [indexDelete, setIndexDelete] = useState(null);

  const [dynamicForm, setDynamicForm] = useState([0, 0, 0, 0]);
  const [dynamicForm2, setDynamicForm2] = useState([0, 0, 0, 0]);

  const [isRenderEdit, setIsRenderEdit] = useState(false);

  const _UserId = parseInt(localStorage.getItem('userId'));

  const txtSelectRemarkForm = [
    "No Choose",
    "Select",
    "Text",
    "Number"
  ];

  const pageCode = "";

  const fngetdata = () => {
    Repository.fetchGetExtraChargeList().then(
      (result) => {
        setIsLoaded(true);
        if (result.httpCode === "200") {
          setItems(functionController.setCurrencyAndEmptyValueInArray(fields, result.data));
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

  const fngetdata2 = () => {
    setIsLoadingData(true);
    Repository.fetchGetExtraChargeOtherList().then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setItemsTran(result.data.transpoterList);
          setItemsGroup(result.data.extraChargeGroupList);
          setItemsPrice(result.data.extraChargeTypeList);
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        setErrorAPI(error);
      }
    );
  };

  const fbgetdatabyid = (id) => {
    setIsLoadingData(true);
    Repository.fetchGetExtraChargeListById(id).then(
      (result) => {
        setIsLoadingData(false);
        if (result.httpCode === "200") {
          setItemsbyId(result.data);
        } else {
          setErrorAPI(result);
        }
      },
      (error) => {
        setIsLoadingData(false);
        setErrorAPI(error);
      }
    );
  }

  const fnGetTransportTypeNameOnlyList = () => {
    if (!transportTypeList.length) {
      Repository.fetchGetComboBoxNameOnlyListByGroupNo("TransporterType")
        .then(
          (result) => {
            if (result.httpCode === "200") {
              setTransportTypeList(result.data);
            }
            else {
              setErrorAPI(result);
            }
          },
          (error) => {
            setErrorAPI(error);
          }
        )
    }
  }

  const fnGetVatList = () => {
    if (!vatList.length) {
      Repository.fetchGetVatList()
        .then(
          (result) => {
            if (result.httpCode === "200") {
              setVatList(result.data);
            }
            else {
              setErrorAPI(result);
            }
          },
          (error) => {
            setErrorAPI(error);
          }
        )
    }
  }

  const fnInsertData = (newArr) => {
    setIsPostingData(true);
    Repository.fetchAddExtraChargeList(newArr).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          window.location.reload(false);
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

  const fnUpdateData = (arrData) => {
    setIsPostingData(true);
    Repository.fetchEditExtraChargeList(arrData).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          window.location.reload(false);
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

  const fnDeleteData = (extraChargeID) => {
    setIsPostingData(true);
    Repository.fetchDeleteExtraChargeList(extraChargeID).then(
      (result) => {
        setIsPostingData(false);
        if (result.httpCode === "200") {
          setIndexDelete(null);
          window.location.reload(false);
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
    fngetdata();
  }, []);

  const toggleDetails = (index, indexId) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [details, index];
      setItemsbyId({});
      fngetdata2();
      fbgetdatabyid(indexId);
    }
    setDetails(newDetails);
    setDynamicForm2([0, 0, 0, 0]);
    setIsRenderEdit(false);
  };

  const toggle = (e) => {
    if (!collapse) {
      fngetdata2();
    }
    setCollapse(!collapse);
    e.preventDefault();
  };

  const showLoadingData = () => (
    <CCol className="text-center headtext">
      <CLabel>
        {Constant.apiLoadingData}
      </CLabel>
      {" "}
      <CSpinner variant="grow" size="md" />
    </CCol>
  )

  const collaps = () => {
    return (
      <CCollapse show={collapse}>
        <CCardBody>
          {showFormAdd()}
        </CCardBody>
      </CCollapse>
    );
  };

  const dialog = () => {
    return (
      <div>
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

        <CModal
          show={success}
          onClose={() => setSuccess(!success)}
          color="success"
        >
          <CModalHeader closeButton>
            <h5>
              <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
            </h5>
          </CModalHeader>
          <CModalBody>
            {Constant.contentConfirmAddData}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="success"
              onClick={onClickAddData}
            >
              {Constant.btOK}
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => setSuccess(!success)}
            >
              {Constant.btCancel}
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal
          show={primary}
          onClose={() => setPrimary(!primary)}
          color="success"
        >
          <CModalHeader closeButton>
            <h5>
              <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
            </h5>
          </CModalHeader>
          <CModalBody>
            {Constant.contentConfirmEditData}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="success"
              onClick={onClickEditData}
            >
              {Constant.btOK}
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => setPrimary(!primary)}
            >
              {Constant.btCancel}
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal
          show={danger}
          onClose={() => setDanger(!danger)}
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>{Constant.titleConfirmChangeData}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {Constant.contentConfirmDeleteData}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="danger"
              onClick={onClickDeleteData}
            >
              {Constant.btOK}
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => setDanger(!danger)}
            >
              {Constant.btCancel}
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    )
  }

  const showFormAdd = () => {
    if (isLoadingData) {
      return showLoadingData();
    }
    else if (itemsTran.length && itemsGroup.length && itemsPrice.length) {
      return (
        <CForm className="search-header-need-validation">
          <CCard className="mb-1" xs="12" sm="6" md="12">
            <CCardHeader
              id="headingThree"
              className="d-flex justify-content-between"
            >
              <CButton
                // block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => setAccordion(accordion === 1 ? null : 1)}
              >
                <CRow className="m-2 p-0">
                  <h6 className="m-2 p-0">{Constant.arrTextGroupMastExtraChargeData[0]}</h6>
                </CRow>
              </CButton>
              <CButton
                color="link"
                onClick={() => setAccordion(accordion === 1 ? null : 1)}
              >
                <CIcon
                  className="collap-icon"
                  name={
                    accordion === 1 ? "cil-chevron-bottom" : "cil-chevron-top"
                  }
                />
              </CButton>
            </CCardHeader>

            <CCollapse show={accordion === 1}>
              <CCardBody>{extraChargeForm()}</CCardBody>
            </CCollapse>
          </CCard>
          <CCard className="mb-1" xs="12" sm="6" md="12">
            <CCardHeader
              id="headingThree"
              className="d-flex justify-content-between"
            >
              <CButton
                color="link"
                className="text-left m-0 p-0"
                onClick={() => setAccordion2(accordion2 === 2 ? null : 2)}
              >
                <CRow className="m-2 p-0">
                  <h6 className="m-2 p-0">{Constant.arrTextGroupMastExtraChargeData[1]}</h6>
                </CRow>
              </CButton>
              <CButton
                color="link"
                onClick={() => setAccordion2(accordion2 === 2 ? null : 2)}
              >
                <CIcon
                  className="collap-icon"
                  name={
                    accordion2 === 2
                      ? "cil-chevron-bottom"
                      : "cil-chevron-top"
                  }
                />
              </CButton>
            </CCardHeader>

            <CCollapse show={accordion2 === 2}>
              <CCardBody>{remark()}</CCardBody>
            </CCollapse>
          </CCard>
          <br />
        </CForm>
      )
    }
  }

  const mainTable = () => {
    return (
      <CCard className="pl-1" style={{ maxHeight: "700px", overflowY: "auto" }}>


        <CDataTable
          // Toolbar={{}}
          // columnFilter
          tableFilter={{
            label: `${Constant.tabletxtSearch}`,
            placeholder: `${Constant.tabletxtPlaceholder}`
          }}
          itemsPerPageSelect={{ label: `${Constant.tabletxtCountPage}` }}
          className="CDataTable"
          fields={fields}
          items={items}
          responsive
          bordered
          itemsPerPage={10}
          pagination
          scopedSlots={{
            isUseQty: (item) => (
              <td className="py-2 text-center">
                {item.isUseQty ? (
                  <CIcon name="cil-check-circle" style={{ color: 'green' }} size="2xl" />
                ) : (
                  <CIcon name="cil-x-circle" style={{ color: 'red' }} size="2xl" />
                )}
              </td>
            ),
            isFixPrice: (item) => (
              <td className="py-2 text-center">
                {item.isFixPrice ? (
                  <CIcon name="cil-check-circle" style={{ color: 'green' }} size="2xl" />
                ) : (
                  <CIcon name="cil-x-circle" style={{ color: 'red' }} size="2xl" />
                )}
              </td>
            ),
            isRequstFile: (item) => (
              <td className="py-2 text-center">
                {item.isRequstFile ? (
                  <CIcon name="cil-check-circle" style={{ color: 'green' }} size="2xl" />
                ) : (
                  <CIcon name="cil-x-circle" style={{ color: 'red' }} size="2xl" />
                )}
              </td>
            ),
            isActive: (item) => (
              <td className="py-2 text-center">
                {item.isActive ? (
                  <CIcon name="cil-check-circle" style={{ color: 'green' }} size="2xl" />
                ) : (
                  <CIcon name="cil-x-circle" style={{ color: 'red' }} size="2xl" />
                )}
              </td>
            ),
            show_details: (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size={Constant.btAddSize}
                    onClick={() => {
                      toggleDetails(index, item.extraChargeId);
                    }}
                  >
                    {details.includes(index) ? `${Constant.btCollapseHide}` : `${Constant.btCollapseShow}`}
                  </CButton>
                </td>
              );
            },
            details: (item, index) => {
              if (details.includes(index)) {
                if (isLoadingData) {
                  return showLoadingData();
                }
                else if (Object.keys(itemsbyId).length) {
                  // return (
                  //   <CCardBody>
                  //     {" "}
                  //     {/* <CProgress onTimeUpdate={3000} showPercentage isLoaded={isLoaded} sm animated value={100} className="mb-3" color='danger' /> */}
                  //      {showLoadingData()}
                  //     {" "}
                  //   </CCardBody>
                  // );
                  //   } else if (countryList.length) {
                  //     // var dataShow = [...countryList];
                  //     console.log(countryList);
                  var data = { ...itemsbyId };
                  setEditRequestDataType(item);
                  return (
                    <CRow>
                      <CCol xs="12" sm="6" md="12">
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <CForm className="need-validation-edit">
                              <CFormGroup row className="my-0">
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="ExtraCode"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[4]}
                                    </CLabel>
                                    <CInput
                                      id="ExtraCode"
                                      value={data.extraChargeCode}
                                      onChange={handleChangeUpdateField(
                                        "extraChargeCode"
                                      )}
                                      required
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="ExtraName"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[5]}
                                    </CLabel>
                                    <CInput
                                      id="ExtraName"
                                      value={data.extraChargeName}
                                      onChange={handleChangeUpdateField(
                                        "extraChargeName"
                                      )}
                                      required
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[0]}
                                    </CLabel>

                                    <CSelect
                                      id="selectTran"
                                      onChange={handleChangeUpdateField(
                                        "transporterId"
                                      )}
                                    >
                                      <option value={data.transporterId !== null ? data.transporterId : ""} selected hidden>
                                        {data.transporterName !== null ? data.transporterName : Constant.txtformPlaceholderSelected}
                                      </option>
                                      <option value="">{Constant.txtFormAllSelected}</option>
                                      {itemsTran.map((x) => (
                                        <option value={x.transporterId}>
                                          {x.transporterNameThai}
                                        </option>
                                      ))}
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                              </CFormGroup>

                              <CFormGroup row className="my-0">
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[1]}
                                    </CLabel>

                                    <CSelect
                                      id="selectTranType"
                                      onClick={fnGetTransportTypeNameOnlyList}
                                      onChange={handleChangeUpdateField(
                                        "transporterType"
                                      )}
                                    >
                                      <option value={data.transporterTypeId !== null ? data.transporterTypeId : ""} selected hidden>
                                        {data.transporterTypeName !== null ? data.transporterTypeName : Constant.txtFormAllSelected}
                                      </option>
                                      <option value="">{Constant.txtFormAllSelected}</option>
                                      {transportTypeList.map((x) => (
                                        <option value={x.valueMember}>
                                          {x.displayMember}
                                        </option>
                                      ))}
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[2]}
                                    </CLabel>

                                    <CSelect
                                      id="selectGroup"
                                      onChange={handleChangeUpdateField(
                                        "extraChargeGroupId"
                                      )}
                                      required
                                    >
                                      <option value={data.extraChargeGroupId !== null ? data.extraChargeGroupId : ""} selected hidden>
                                        {data.extraChargeGroupName !== null ? data.extraChargeGroupName : Constant.txtformPlaceholderSelected}
                                      </option>

                                      {itemsGroup.map((x) => (
                                        <option value={x.comboBoxItemId}>
                                          {x.displayMember}
                                        </option>
                                      ))}
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[3]}
                                    </CLabel>

                                    <CSelect
                                      id="selectType"
                                      onChange={handleChangeUpdateField(
                                        "extraChargeTypeId"
                                      )}
                                      required
                                    >
                                      <option value={data.extraChargeTypeId !== null ? data.extraChargeTypeId : ""} selected hidden>
                                        {data.extraChargeTypeName !== null ? data.extraChargeTypeName : Constant.txtformPlaceholderSelected}
                                      </option>

                                      {itemsPrice.map((x) => (
                                        <option value={x.comboBoxItemId}>
                                          {x.displayMember}
                                        </option>
                                      ))}
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="ExtraPrice"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[6]}
                                    </CLabel>
                                    <CInput
                                      id="ExtraPrice"
                                      value={data.extraChargePrice}
                                      onChange={handleChangeUpdateField(
                                        "extraChargePrice"
                                      )}
                                      onBlur={() => setItemsbyId(functionController.onBlurChangePrice(itemsbyId, 2, "extraChargePrice"))}
                                      onClick={() => setItemsbyId(functionController.onClickChangePrice(itemsbyId, "extraChargePrice"))}
                                      required
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="MaxPrice"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[7]}
                                    </CLabel>
                                    <CInput
                                      id="MaxPrice"
                                      value={data.maxPrice}
                                      onChange={handleChangeUpdateField(
                                        "maxPrice"
                                      )}
                                      onBlur={() => setItemsbyId(functionController.onBlurChangePrice(itemsbyId, 2, "maxPrice"))}
                                      onClick={() => setItemsbyId(functionController.onClickChangePrice(itemsbyId, "maxPrice"))}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="Vat"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[8]}
                                    </CLabel>
                                    {/* <CInput
                                    id="Vat"
                                    value={data.vatPrice}
                                    onChange={handleChangeUpdateField(
                                      "vatPrice"
                                    )}
                                    required
                                  /> */}
                                    <CSelect
                                      id="selectEditVat"
                                      onClick={fnGetVatList}
                                      onChange={handleChangeUpdateField(
                                        "vatPrice"
                                      )}
                                      required>
                                      <option value={data.vatCode} selected hidden>
                                        {data.vatPrice}
                                      </option>
                                      {vatList.map((x) => (
                                        <option value={x.vatcode}>{x.vatPrice}</option>
                                      ))}
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                              </CFormGroup>

                              <br />

                              <CFormGroup>
                                <CCol md="6">
                                  <CFormGroup variant="custom-switch" inline>
                                    <CSwitch
                                      className="mr-1"
                                      color="success"
                                      id="IsUseQty"
                                      defaultChecked={data.isUseQty}
                                      value={data.isUseQty}
                                      onChange={handleChangeUpdateField(
                                        "isUseQty"
                                      )}
                                      shape="pill"
                                    />
                                    <CLabel
                                      variant="custom-switch"
                                      htmlFor="IsUseQty"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[9]}
                                    </CLabel>
                                  </CFormGroup>
                                  <CFormGroup variant="custom-switch" inline>
                                    <CSwitch
                                      className="mr-1"
                                      color="success"
                                      id="IsFixPrice"
                                      defaultChecked={data.isFixPrice}
                                      value={data.isFixPrice}
                                      onChange={handleChangeUpdateField(
                                        "isFixPrice"
                                      )}
                                      shape="pill"
                                    />
                                    <CLabel
                                      variant="custom-switch"
                                      htmlFor="IsFixPrice"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[10]}
                                    </CLabel>
                                  </CFormGroup>
                                  <CFormGroup variant="custom-switch" inline>
                                    <CSwitch
                                      className="mr-1"
                                      color="success"
                                      id="IsRequstFile"
                                      defaultChecked={data.isRequstFile}
                                      value={data.isRequstFile}
                                      onChange={handleChangeUpdateField(
                                        "isRequstFile"
                                      )}
                                      shape="pill"
                                    />
                                    <CLabel
                                      variant="custom-switch"
                                      htmlFor="IsRequstFile"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[11]}
                                    </CLabel>
                                  </CFormGroup>
                                  <CFormGroup variant="custom-switch" inline>
                                    <CSwitch
                                      className="mr-1"
                                      color="success"
                                      id="IsActive"
                                      defaultChecked={data.isActive}
                                      value={data.isActive}
                                      onChange={handleChangeUpdateField(
                                        "isActive"
                                      )}
                                      shape="pill"
                                    />
                                    <CLabel
                                      variant="custom-switch"
                                      htmlFor="IsActive"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[12]}
                                    </CLabel>
                                  </CFormGroup>
                                </CCol>
                              </CFormGroup>

                              {/* Remark */}
                              <CFormGroup row className="my-0">
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="RequestName1"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[13]}
                                    </CLabel>
                                    <CInput
                                      id="RequestName1"
                                      value={data.requestName1}
                                      onChange={handleChangeUpdateField(
                                        "requestName1"
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[14]}
                                    </CLabel>

                                    <CSelect
                                      custom
                                      name="select"
                                      id="selectDataType-001"
                                      onChange={editDataType(1)}
                                    >
                                      <option value={data.requestDataType1} selected hidden>
                                        {data.requestDataType1}
                                      </option>
                                      <option value="">{txtSelectRemarkForm[0]}</option>
                                      <option value="1">{txtSelectRemarkForm[1]}</option>
                                      <option value="2">{txtSelectRemarkForm[2]}</option>
                                      <option value="3">{txtSelectRemarkForm[3]}</option>
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                {dynamicReturnForm2(1, data.requestValue1)}
                              </CFormGroup>
                              <CFormGroup row className="my-0">
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="RequestName2"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[15]}
                                    </CLabel>
                                    <CInput
                                      id="RequestName2"
                                      value={data.requestName2}
                                      onChange={handleChangeUpdateField(
                                        "requestName2"
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[16]}
                                    </CLabel>

                                    <CSelect
                                      custom
                                      name="select"
                                      id="selectDataType-002"
                                      onChange={editDataType(2)}
                                    >
                                      <option value={data.requestDataType2} selected hidden>
                                        {data.requestDataType2}
                                      </option>
                                      <option value="">{txtSelectRemarkForm[0]}</option>
                                      <option value="1">{txtSelectRemarkForm[1]}</option>
                                      <option value="2">{txtSelectRemarkForm[2]}</option>
                                      <option value="3">{txtSelectRemarkForm[3]}</option>
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                {dynamicReturnForm2(2, data.requestValue2)}
                              </CFormGroup>
                              <CFormGroup row className="my-0">
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="RequestName3"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[17]}
                                    </CLabel>
                                    <CInput
                                      id="RequestName3"
                                      value={data.requestName3}
                                      onChange={handleChangeUpdateField(
                                        "requestName3"
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[18]}
                                    </CLabel>

                                    <CSelect
                                      custom
                                      name="select"
                                      id="selectDataType-003"
                                      onChange={editDataType(3)}
                                    >
                                      <option value={data.requestDataType3} selected hidden>
                                        {data.requestDataType3}
                                      </option>
                                      <option value="">{txtSelectRemarkForm[0]}</option>
                                      <option value="1">{txtSelectRemarkForm[1]}</option>
                                      <option value="2">{txtSelectRemarkForm[2]}</option>
                                      <option value="3">{txtSelectRemarkForm[3]}</option>
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                {dynamicReturnForm2(3, data.requestValue3)}
                              </CFormGroup>
                              <CFormGroup row className="my-0">
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="RequestName4"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[19]}
                                    </CLabel>
                                    <CInput
                                      id="RequestName4"
                                      value={data.requestName4}
                                      onChange={handleChangeUpdateField(
                                        "requestName4"
                                      )}
                                    />
                                  </CFormGroup>
                                </CCol>
                                <CCol xs="12" sm="4" md="4">
                                  <CFormGroup>
                                    <CLabel
                                      htmlFor="select"
                                      className="d-flex justify-content-start"
                                    >
                                      {Constant.arrFieldMasterExtraCharge[20]}
                                    </CLabel>

                                    <CSelect
                                      custom
                                      name="select"
                                      id="selectDataType-004"
                                      onChange={editDataType(4)}
                                    >
                                      <option value={data.requestDataType4} selected hidden>
                                        {data.requestDataType4}
                                      </option>
                                      <option value="">{txtSelectRemarkForm[0]}</option>
                                      <option value="1">{txtSelectRemarkForm[1]}</option>
                                      <option value="2">{txtSelectRemarkForm[2]}</option>
                                      <option value="3">{txtSelectRemarkForm[3]}</option>
                                    </CSelect>
                                  </CFormGroup>
                                </CCol>
                                {dynamicReturnForm2(4, data.requestValue4)}

                                <br />
                              </CFormGroup>
                            </CForm>

                            <CFormGroup className="d-flex justify-content-start">
                              <CButton
                                type="submit"
                                size={Constant.btAddSize}
                                color="primary"
                                onClick={onClickCheckEditData}
                              >
                                {Constant.btEditData}
                              </CButton>
                              &nbsp;
                              <CButton
                                type="submit"
                                size={Constant.btAddSize}
                                color="danger"
                                onClick={() => onClickCheckDeleteData(data.extraChargeId)}
                              >
                                {Constant.btDeleteData}
                              </CButton>
                            </CFormGroup>
                          </CCardBody>
                        </CCollapse>
                      </CCol>
                    </CRow>
                  );
                }
              }
            },
            // }
            // },
          }}
        />
      </CCard>
    );
  };

  const onClickCheckAddSelectValue = (index) => {
    if (getIsValidForm("need-validation-remark-select")) {
      setNoValidateForm("need-validation-remark-select");
      onClickAddSelectValue(index);
    }
  }

  const onClickAddSelectValue = (index) => {
    var value = document.getElementById("requestValue-SL-" + index).value;
    switch (index) {
      case 1:
        if (itemsRemarkSelect1.length) {
          var newArr = [...itemsRemarkSelect1];
          newArr.push(value);
          setItemsRemarkSelect1(newArr);
        }
        else {
          setItemsRemarkSelect1([value]);
        }
        break;
      case 2:
        if (itemsRemarkSelect2.length) {
          var newArr = [...itemsRemarkSelect2];
          newArr.push(value);
          setItemsRemarkSelect2(newArr);
        }
        else {
          setItemsRemarkSelect2([value]);
        }
        break;
      case 3:
        if (itemsRemarkSelect3.length) {
          var newArr = [...itemsRemarkSelect3];
          newArr.push(value);
          setItemsRemarkSelect3(newArr);
        }
        else {
          setItemsRemarkSelect3([value]);
        }
        break;
      case 4:
        if (itemsRemarkSelect4.length) {
          var newArr = [...itemsRemarkSelect4];
          newArr.push(value);
          setItemsRemarkSelect4(newArr);
        }
        else {
          setItemsRemarkSelect4([value]);
        }
        break;
      default:
        console.log("Error Index Select Remark!!!");
    }
    document.getElementById("requestValue-SL-" + index).value = "";
  }

  const onClickRemoveAddSelectValue = (index) => {
    var value = document.getElementById("select-remark-" + index).value;
    switch (index) {
      case 1:
        if (itemsRemarkSelect1.length) {
          var newArr = [...itemsRemarkSelect1];
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            setItemsRemarkSelect1(newArr);
          }
        }
        break;
      case 2:
        if (itemsRemarkSelect2.length) {
          var newArr = [...itemsRemarkSelect2];
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            setItemsRemarkSelect2(newArr);
          }
        }
        break;
      case 3:
        if (itemsRemarkSelect3.length) {
          var newArr = [...itemsRemarkSelect3];
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            setItemsRemarkSelect3(newArr);
          }
        }
        break;
      case 4:
        if (itemsRemarkSelect4.length) {
          var newArr = [...itemsRemarkSelect4];
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            setItemsRemarkSelect4(newArr);
          }
        }
        break;
      default:
        console.log("Error Index Select Remark!!!");
    }
  }

  const onClickCheckAddData = () => {
    if (getIsValidForm("add-need-validation")) {
      setSuccess(!success);
    }
  }

  const onClickAddData = () => {
    setSuccess(!success);
    var extraCodeValue = document.getElementById("ExtraCode").value;
    var extraNameValue = document.getElementById("ExtraName").value;
    var selectTranValue = parseInt(
      document.getElementById("selectTran").value
    );
    var selectTranTypeValue = parseInt(
      document.getElementById("selectTranType").value
    );
    var selectGroupValue = parseInt(
      document.getElementById("selectGroup").value
    );
    var selectTypeValue = parseInt(
      document.getElementById("selectType").value
    );
    var extraPriceValue = functionController.setNumberValue(
      document.getElementById("ExtraPrice").value
    );
    var maxPriceValue = functionController.setNumberValue(
      document.getElementById("MaxPrice").value
    );
    var vatCode = document.getElementById("Vat").value
    var vatObj = vatList.find((x) => x.vatcode === vatCode);
    var vatPrice = vatObj.vatPrice;

    if (isNaN(selectTranValue)) {
      selectTranValue = null;
    }
    if (isNaN(selectTranTypeValue)) {
      selectTranTypeValue = null;
    }
    if (isNaN(maxPriceValue)) {
      maxPriceValue = null;
    }

    if (isNaN(extraPriceValue)) {
      extraPriceValue = 0;
    }
    if (isNaN(maxPriceValue) || maxPriceValue === 0) {
      maxPriceValue = null;
    }

    var isUseQtyValue = document.getElementById("IsUseQty").checked;
    var isFixPriceValue = document.getElementById("IsFixPrice").checked;
    var isRequstFileValue = document.getElementById("IsRequstFile").checked;

    var isActive = true;
    var createBy = _UserId;

    var RequestName1 = null;
    var selectDataType01 = null;
    var requestValue1 = null;
    var RequestName2 = null;
    var selectDataType02 = null;
    var requestValue2 = null;
    var RequestName3 = null;
    var selectDataType03 = null;
    var requestValue3 = null;
    var RequestName4 = null;
    var selectDataType04 = null;
    var requestValue4 = null;

    var newArr = [...dynamicForm];
    if (newArr[0] !== 0) {
      var RequestName1 = document.getElementById("RequestName1").value;
      var selectDataType01 =
        document.getElementById("selectDataType-01").value;
      var requestValue1 = null;
      if (newArr[0] === 3) {
        var number1 = document.getElementById("requestValue-01-1").value;
        var number2 = document.getElementById("requestValue-02-1").value;
        requestValue1 = number1 + "," + number2;
      }
      else if (newArr[0] === 1) {
        requestValue1 = itemsRemarkSelect1.toString();
      }
      else {
        requestValue2 = document.getElementById("requestValue-1").value;
      }
      console.log(requestValue1);
    }
    if (newArr[1] !== 0) {
      var RequestName2 = document.getElementById("RequestName2").value;
      var selectDataType02 =
        document.getElementById("selectDataType-02").value;
      var requestValue2 = null;
      if (newArr[1] === 3) {
        var number1 = document.getElementById("requestValue-01-2").value;
        var number2 = document.getElementById("requestValue-02-2").value;
        requestValue2 = number1 + "," + number2;
      }
      else if (newArr[1] === 1) {
        requestValue2 = itemsRemarkSelect2.toString();
      }
      else {
        requestValue2 = document.getElementById("requestValue-2").value;
      }
    }
    if (newArr[2] !== 0) {
      var RequestName3 = document.getElementById("RequestName3").value;
      var selectDataType03 =
        document.getElementById("selectDataType-03").value;
      var requestValue3 = null;
      if (newArr[2] === 3) {
        var number1 = document.getElementById("requestValue-01-3").value;
        var number2 = document.getElementById("requestValue-02-3").value;
        requestValue3 = number1 + "," + number2;
      }
      else if (newArr[2] === 1) {
        requestValue3 = itemsRemarkSelect3.toString();
      }
      else {
        requestValue3 = document.getElementById("requestValue-3").value;
      }
    }
    if (newArr[3] !== 0) {
      var RequestName4 = document.getElementById("RequestName4").value;
      var selectDataType04 =
        document.getElementById("selectDataType-04").value;
      var requestValue4 = null;
      if (newArr[3] === 3) {
        var number1 = document.getElementById("requestValue-01-4").value;
        var number2 = document.getElementById("requestValue-02-4").value;
        requestValue4 = number1 + "," + number2;
      }
      else if (newArr[3] === 1) {
        requestValue4 = itemsRemarkSelect4.toString();
      }
      else {
        requestValue4 = document.getElementById("requestValue-4").value;
      }
    }

    selectDataType01 = setValueDataType(selectDataType01);
    selectDataType02 = setValueDataType(selectDataType02);
    selectDataType03 = setValueDataType(selectDataType03);
    selectDataType04 = setValueDataType(selectDataType04);

    if (requestValue1 === "," || requestValue1 === "") {
      requestValue1 = null;
    }
    if (requestValue2 === "," || requestValue2 === "") {
      requestValue2 = null;
    }
    if (requestValue3 === "," || requestValue3 === "") {
      requestValue3 = null;
    }
    if (requestValue4 === "," || requestValue4 === "") {
      requestValue4 = null;
    }

    var newArr = [
      extraCodeValue,
      extraNameValue,
      selectTranValue,
      selectTranTypeValue,
      selectGroupValue,
      selectTypeValue,
      extraPriceValue,
      maxPriceValue,
      vatPrice,
      isUseQtyValue,
      isFixPriceValue,
      isRequstFileValue,
      isActive,
      createBy,
      RequestName1,
      selectDataType01,
      requestValue1,
      RequestName2,
      selectDataType02,
      requestValue2,
      RequestName3,
      selectDataType03,
      requestValue3,
      RequestName4,
      selectDataType04,
      requestValue4,
      vatCode
    ];
    // console.log(newArr);
    fnInsertData(newArr);
  };

  const setValueDataType = (value) => {
    if (value === "1" || value === "2" || value === "3")
      if (value === "1") {
        return "Select";
      } else if (value === "2") {
        return "Text";
      } else if (value === "3") {
        return "Number";
      } else {
        return null;
      }
    else if (value === "Select" || value === "Text" || value === "Number") {
      return value;
    }
    else {
      return null;
    }
  };

  const handleChangeUpdateField = (target) => (e) => {
    let newArr = { ...itemsbyId };
    if (target === "extraChargeCode") {
      newArr.extraChargeCode = e.target.value;
    } else if (target === "extraChargeName") {
      newArr.extraChargeName = e.target.value;
    } else if (target === "transporterId") {
      if (e.target.value === "") {
        newArr.transporterId = null;
      }
      else {
        newArr.transporterId = parseInt(e.target.value);
      }
    } else if (target === "transporterType") {
      if (e.target.value === "") {
        newArr.transporterTypeId = null;
      }
      else {
        newArr.transporterTypeId = parseInt(e.target.value);
      }
    } else if (target === "extraChargeGroupId") {
      newArr.extraChargeGroupId = parseInt(e.target.value);
    } else if (target === "extraChargeTypeId") {
      newArr.extraChargeTypeId = parseInt(e.target.value);
    } else if (target === "extraChargePrice") {
      newArr.extraChargePrice = e.target.value;
    } else if (target === "maxPrice") {
      newArr.maxPrice = e.target.value;
    } else if (target === "vatPrice") {
      newArr.vatCode = e.target.value;
      var newObj = vatList.find((x) => x.vatcode == newArr.vatCode);
      newArr.vatPrice = newObj.vatPrice;
    } else if (target === "isUseQty") {
      newArr.isUseQty = e.target.checked;
    } else if (target === "isFixPrice") {
      newArr.isFixPrice = e.target.checked;
    } else if (target === "isRequstFile") {
      newArr.isRequstFile = e.target.checked;
    } else if (target === "isActive") {
      newArr.isActive = e.target.checked;
    } else if (target === "updateBy") {
      newArr.updateBy = e.target.value;
    }
    // remark
    else if (target === "requestName1") {
      newArr.requestName1 = e.target.value;
    } else if (target === "requestDataType1") {
      newArr.requestDataType1 = parseInt(e.target.value);
    } else if (target === "requestName2") {
      newArr.requestName2 = e.target.value;
    } else if (target === "requestDataType2") {
      newArr.requestDataType2 = parseInt(e.target.value);
    } else if (target === "requestName3") {
      newArr.requestName3 = e.target.value;
    } else if (target === "requestDataType3") {
      newArr.requestDataType3 = parseInt(e.target.value);
    } else if (target === "requestName4") {
      newArr.requestName4 = e.target.value;
    } else if (target === "requestDataType4") {
      newArr.requestDataType4 = e.target.value;
    }

    setItemsbyId(newArr);
    // setItemsTran(newArr);
    // setItemsGroup(newArr);
    // setItemsPrice(newArr);
  };

  const onClickCheckDeleteData = (index) => {
    setIndexDelete(index);
    setDanger(!danger);
  }

  const onClickDeleteData = () => {
    setDanger(!danger);
    var index = indexDelete;
    fnDeleteData(index);
  }

  const handleChangeUpdateRemarkValue = (requestIndex, index = null) => (e) => {
    var newObj = { ...itemsbyId };
    switch (requestIndex) {
      case 1:
        if (index !== null) {
          if (newObj.requestValue1 !== null) {
            var newArr = newObj.requestValue1.split(",");
          }
          else {
            var newArr = ["0", "0"];
          }
          newArr[index] = e.target.value;
          newObj.requestValue1 = newArr[0] + "," + newArr[1];
        }
        else {
          newObj.requestValue1 = e.target.value;
        }
        break;
      case 2:
        if (index !== null) {
          if (newObj.requestValue2 !== null) {
            var newArr = newObj.requestValue2.split(",");
          }
          else {
            var newArr = ["0", "0"];
          }
          newArr[index] = e.target.value;
          newObj.requestValue2 = newArr[0] + "," + newArr[1];
        }
        else {
          newObj.requestValue2 = e.target.value;
        }
        break;
      case 3:
        if (index !== null) {
          if (newObj.requestValue3 !== null) {
            var newArr = newObj.requestValue3.split(",");
          }
          else {
            var newArr = ["0", "0"];
          }
          newArr[index] = e.target.value;
          newObj.requestValue3 = newArr[0] + "," + newArr[1];
        }
        else {
          newObj.requestValue3 = e.target.value;
        }
        break;
      case 4:
        if (index !== null) {
          if (newObj.requestValue4 !== null) {
            var newArr = newObj.requestValue4.split(",");
          }
          else {
            var newArr = ["0", "0"];
          }
          newArr[index] = e.target.value;
          newObj.requestValue4 = newArr[0] + "," + newArr[1];
        }
        else {
          newObj.requestValue4 = e.target.value;
        }
        break;
      default:
        console("Error Parameter Set Value Remark!!!");
    }
    setItemsbyId(newObj);
  }

  // const handleChangeEditField = (index, target) => (e) => {
  //   let newArr = [...items];
  //   if (target === "requestDataType1") {
  //     newArr[index].requestDataType1 = parseInt(e.target.value);
  //   } else if (target === "requestDataType2") {
  //     newArr[index].requestDataType2 = parseInt(e.target.value);
  //   } else if (target === "requestDataType3") {
  //     newArr[index].requestDataType3 = parseInt(e.target.value);
  //   } else if (target === "requestDataType4") {
  //     newArr[index].requestDataType4 = e.target.value;
  //   }
  //   // console.log(newArr);
  // };

  const onClickCheckEditSelectValue = (index) => {
    if (getIsValidForm("need-validation-remark-select")) {
      setNoValidateForm("need-validation-remark-select");
      onClickEditSelectValue(index);
    }
  }

  const onClickEditSelectValue = (index) => {
    var newObj = { ...itemsbyId };
    var value = document.getElementById("requestValue-SL-" + index).value;
    switch (index) {
      case 1:
        if (newObj.requestValue1 !== null) {
          var newArr = newObj.requestValue1.split(",");
          newArr.push(value);
          newObj.requestValue1 = newArr.toString();
        }
        else {
          newObj.requestValue1 = value;
        }
        break;
      case 2:
        if (newObj.requestValue2 !== null) {
          var newArr = newObj.requestValue2.split(",");
          newArr.push(value);
          newObj.requestValue2 = newArr.toString();
        }
        else {
          newObj.requestValue2 = value;
        }
        break;
      case 3:
        if (newObj.requestValue3 !== null) {
          var newArr = newObj.requestValue3.split(",");
          newArr.push(value);
          newObj.requestValue3 = newArr.toString();
        }
        else {
          newObj.requestValue3 = value;
        }
        break;
      case 4:
        if (newObj.requestValue4 !== null) {
          var newArr = newObj.requestValue4.split(",");
          newArr.push(value);
          newObj.requestValue4 = newArr.toString();
        }
        else {
          newObj.requestValue4 = value;
        }
        break;
      default:
        console.log("Error Index Select Remark!!!");
    }
    setItemsbyId(newObj);
    document.getElementById("requestValue-SL-" + index).value = "";
  }

  const onClickRemoveEditSelectValue = (index) => {
    var newObj = { ...itemsbyId };
    var value = document.getElementById("select-remark-" + index).value;
    switch (index) {
      case 1:
        if (newObj.requestValue1 !== null) {
          var newArr = newObj.requestValue1.split(",");
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            newObj.requestValue1 = newArr.toString();
          }
        }
        break;
      case 2:
        if (newObj.requestValue2 !== null) {
          var newArr = newObj.requestValue2.split(",");
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            newObj.requestValue2 = newArr.toString();
          }
        }
        break;
      case 3:
        if (newObj.requestValue3 !== null) {
          var newArr = newObj.requestValue3.split(",");
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            newObj.requestValue3 = newArr.toString();
          }
        }
        break;
      case 4:
        if (newObj.requestValue4 !== null) {
          var newArr = newObj.requestValue4.split(",");
          var indexArr = newArr.indexOf(value);
          if (indexArr > -1) {
            newArr.splice(indexArr, 1);
            newObj.requestValue4 = newArr.toString();
          }
        }
        break;
      default:
        console.log("Error Index Select Remark!!!");
    }
    setItemsbyId(newObj);
  }

  const onClickCheckEditData = () => {
    if (getIsValidForm("need-validation-edit")) {
      setPrimary(!primary);
    }
  }

  const onClickEditData = () => {
    setPrimary(!primary);
    let newArr = { ...itemsbyId };
    var extraChargeId = newArr.extraChargeId;
    var extraCodeValue = newArr.extraChargeCode;
    var extraNameValue = newArr.extraChargeName;
    var selectTranValue = newArr.transporterId;
    var selectGroupValue = newArr.extraChargeGroupId;
    var selectTypeValue = newArr.extraChargeTypeId;
    var extraPriceValue = functionController.setNumberValue(newArr.extraChargePrice);
    var maxPriceValue = functionController.setNumberValue(newArr.maxPrice);
    var vatCode = newArr.vatCode;
    var vatValue = newArr.vatPrice;
    var isUseQtyValue = newArr.isUseQty;
    var isFixPriceValue = newArr.isFixPrice;
    var isRequstFileValue = newArr.isRequstFile;
    var isActive = newArr.isActive;
    var updateBy = _UserId;
    var requestName1 = newArr.requestName1;
    var requestValue1 = newArr.requestValue1;
    var requestName2 = newArr.requestName2;
    var requestValue2 = newArr.requestValue2;
    var requestName3 = newArr.requestName3;
    var requestValue3 = newArr.requestValue3;
    var requestName4 = newArr.requestName4;
    var requestValue4 = newArr.requestValue4;

    var selectDataType1 =
      document.getElementById("selectDataType-001").value;
    var selectDataType2 =
      document.getElementById("selectDataType-002").value;
    var selectDataType3 =
      document.getElementById("selectDataType-003").value;
    var selectDataType4 =
      document.getElementById("selectDataType-004").value;

    var requestDataType001 = setValueDataType(selectDataType1);
    var requestDataType002 = setValueDataType(selectDataType2);
    var requestDataType003 = setValueDataType(selectDataType3);
    var requestDataType004 = setValueDataType(selectDataType4);

    // handleChangeEditField(index);

    requestName1 = requestName1 !== "" ? requestName1 : null;
    requestName2 = requestName2 !== "" ? requestName2 : null;
    requestName3 = requestName3 !== "" ? requestName3 : null;
    requestName4 = requestName4 !== "" ? requestName4 : null;

    if (requestValue1 === "," || requestValue1 === "") {
      requestValue1 = null;
    }
    if (requestValue2 === "," || requestValue2 === "") {
      requestValue2 = null;
    }
    if (requestValue3 === "," || requestValue3 === "") {
      requestValue3 = null;
    }
    if (requestValue4 === "," || requestValue4 === "") {
      requestValue4 = null;
    }

    if (isNaN(extraPriceValue)) {
      extraPriceValue = 0;
    }
    if (isNaN(maxPriceValue) || maxPriceValue === 0) {
      maxPriceValue = null;
    }

    // var updateBy = 1;
    var arrObj = [
      extraChargeId,
      extraCodeValue,
      extraNameValue,
      selectTranValue,
      selectGroupValue,
      selectTypeValue,
      extraPriceValue,
      maxPriceValue,
      vatValue,
      isUseQtyValue,
      isFixPriceValue,
      isRequstFileValue,
      isActive,
      updateBy,
      requestName1,
      requestDataType001,
      requestValue1,
      requestName2,
      requestDataType002,
      requestValue2,
      requestName3,
      requestDataType003,
      requestValue3,
      requestName4,
      requestDataType004,
      requestValue4,
      vatCode,
    ];

    // console.log(arrObj);
    fnUpdateData(arrObj);
  };

  ///////////////////////GetDATA////////////////////////////////
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
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.classList.remove('was-validated');
      });
  }

  const extraChargeForm = () => {
    return (
      <div>
        <CForm className="add-need-validation">
          <CFormGroup row className="my-0">
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="ExtraCode">{Constant.arrFieldMasterExtraCharge[4]}</CLabel>
                <CInput id="ExtraCode" placeholder="กรุณากรอกรหัส" required />
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="ExtraName">{Constant.arrFieldMasterExtraCharge[5]}</CLabel>
                <CInput id="ExtraName" placeholder="กรุณากรอกรายการ" required />
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="select">{Constant.arrFieldMasterExtraCharge[0]}</CLabel>

                <CSelect
                  id="selectTran"
                // items={itemsTran}
                >
                  <option value="" selected hidden>
                    {Constant.txtformPlaceholderSelected}
                  </option>
                  <option value="">{Constant.txtFormAllSelected}</option>
                  {itemsTran.map((x) => (
                    <option value={x.transporterId}>
                      {x.transporterNameThai}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CFormGroup>

          <CFormGroup row className="my-0">
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel
                  htmlFor="select"
                  className="d-flex justify-content-start"
                >
                  {Constant.arrFieldMasterExtraCharge[1]}
                </CLabel>

                <CSelect
                  id="selectTranType"
                  onClick={fnGetTransportTypeNameOnlyList}
                  required
                >
                  <option value="" selected hidden>
                    {Constant.txtformPlaceholderSelected}
                  </option>
                  <option value="">{Constant.txtFormAllSelected}</option>
                  {transportTypeList.map((x) => (
                    <option value={x.valueMember}>
                      {x.displayMember}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="select">{Constant.arrFieldMasterExtraCharge[2]}</CLabel>

                <CSelect id="selectGroup" required>
                  <option value="" selected hidden>
                    {Constant.txtformPlaceholderSelected}
                  </option>
                  {itemsGroup.map((x) => (
                    <option value={x.valueMember}>{x.displayMember}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="select">{Constant.arrFieldMasterExtraCharge[3]}</CLabel>

                <CSelect id="selectType" required>
                  <option value="" selected hidden>
                    {Constant.txtformPlaceholderSelected}
                  </option>
                  {itemsPrice.map((x) => (
                    <option value={x.valueMember}>{x.displayMember}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="ExtraPrice">{Constant.arrFieldMasterExtraCharge[6]}</CLabel>
                <CInput
                  id="ExtraPrice"
                  placeholder="กรุณากรอกราคา"
                  onBlur={() => document.getElementById("ExtraPrice").value = functionController.onBlurChangePrice(document.getElementById("ExtraPrice").value, 2)}
                  onClick={() => document.getElementById("ExtraPrice").value = functionController.onClickChangePrice(document.getElementById("ExtraPrice").value)}
                  required
                />
                <CInvalidFeedback>
                  {Constant.inValidNullMessage}
                </CInvalidFeedback>
              </CFormGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row className="my-0">
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="MaxPrice">{Constant.arrFieldMasterExtraCharge[7]}</CLabel>
                <CInput
                  id="MaxPrice"
                  onBlur={() => document.getElementById("MaxPrice").value = functionController.onBlurChangePrice(document.getElementById("MaxPrice").value, 2)}
                  onClick={() => document.getElementById("MaxPrice").value = functionController.onClickChangePrice(document.getElementById("MaxPrice").value)}
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12" sm="4" md="4">
              <CFormGroup>
                <CLabel htmlFor="Vat">{Constant.arrFieldMasterExtraCharge[8]}</CLabel>
                {/* <CInput id="Vat" required /> */}
                <CSelect
                  id="Vat"
                  onClick={fnGetVatList}
                  required>
                  <option value="" selected hidden>
                    {Constant.txtformPlaceholderSelected}
                  </option>
                  {vatList.map((x) => (
                    <option value={x.vatcode}>{x.vatPrice}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CFormGroup>

          <br />

          <CFormGroup>
            <CCol md="6">
              <CFormGroup variant="custom-switch" inline>
                <CSwitch
                  className="mr-1"
                  color="success"
                  id="IsUseQty"
                  shape="pill"
                />
                <CLabel variant="custom-switch" htmlFor="IsUseQty">
                  {Constant.arrFieldMasterExtraCharge[9]}
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="custom-switch" inline>
                <CSwitch
                  className="mr-1"
                  color="success"
                  id="IsFixPrice"
                  shape="pill"
                />
                <CLabel variant="custom-switch" htmlFor="IsFixPrice">
                  {Constant.arrFieldMasterExtraCharge[10]}
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="custom-switch" inline>
                <CSwitch
                  className="mr-1"
                  color="success"
                  id="IsRequstFile"
                  shape="pill"
                />
                <CLabel variant="custom-switch" htmlFor="IsRequstFile">
                  {Constant.arrFieldMasterExtraCharge[11]}
                </CLabel>
              </CFormGroup>
            </CCol>
          </CFormGroup>
        </CForm>
      </div>
    );
  };

  /////////////////////////////////////AddDATA////////////////////////////

  const addDataType = (index) => (e) => {
    var selectValue = null;
    var newArr = [...dynamicForm];
    if (index === 1) {
      selectValue = parseInt(
        document.getElementById("selectDataType-01").value
      );
    } else if (index === 2) {
      selectValue = parseInt(
        document.getElementById("selectDataType-02").value
      );
    } else if (index === 3) {
      selectValue = parseInt(
        document.getElementById("selectDataType-03").value
      );
    } else if (index === 4) {
      selectValue = parseInt(
        document.getElementById("selectDataType-04").value
      );
    }
    if (isNaN(selectValue)) {
      newArr[index - 1] = 0;
    }
    else {
      if (selectValue === 1) {
        newArr[index - 1] = 1;
      } else if (selectValue === 2) {
        newArr[index - 1] = 2;
      } else if (selectValue === 3) {
        newArr[index - 1] = 3;
      }
    }

    setDynamicForm(newArr);
  };

  const dynamicReturnForm = (index) => {
    if (dynamicForm[index - 1] === 1) {
      return selectForm(index);
    } else if (dynamicForm[index - 1] === 2) {
      return textForm(index);
    } else if (dynamicForm[index - 1] === 3) {
      return numberForm(index);
    } else {
      return <div></div>;
    }
  };

  ///////////////////////////////////////Edit//////////////////////////////////////////////
  const dynamicReturnForm2 = (index, obj) => {
    if (dynamicForm2[index - 1] === 1) {
      return selectForm(index, true, obj);
    } else if (dynamicForm2[index - 1] === 2) {
      return textForm(index, true, obj);
    } else if (dynamicForm2[index - 1] === 3) {
      return numberForm(index, true, obj);
    } else {
      return <div></div>;
    }
  };


  const setEditRequestDataType = (item) => {
    if (!isRenderEdit) {
      setIsRenderEdit(true);
      var newArr = [...dynamicForm2];
      if (item.requestDataType1 !== null) {
        newArr = setValueDymamic(newArr, item.requestDataType1, 0);
      }
      if (item.requestDataType2 !== null) {
        newArr = setValueDymamic(newArr, item.requestDataType2, 1);
      }
      if (item.requestDataType3 !== null) {
        newArr = setValueDymamic(newArr, item.requestDataType3, 2);
      }
      if (item.requestDataType4 !== null) {
        newArr = setValueDymamic(newArr, item.requestDataType4, 3);
      }
      setDynamicForm2(newArr);
    }
  }

  const setValueDymamic = (array, obj, index) => {
    switch (obj) {
      case 'Text':
        array[index] = 2;
        break;
      case 'Number':
        array[index] = 3;
        break;
      case 'Select':
        array[index] = 1;
        break;
      default:
        array[index] = 0;
        break;
    }
    return array;
  }


  const editDataType = (index) => (e) => {
    var selectValue = null;
    var newObj = { ...itemsbyId };
    var newArr = [...dynamicForm2];
    if (index === 1) {
      selectValue = parseInt(
        document.getElementById("selectDataType-001").value
      );
      newObj.requestValue1 = null;
    } else if (index === 2) {
      selectValue = parseInt(
        document.getElementById("selectDataType-002").value
      );
      newObj.requestValue2 = null;
    } else if (index === 3) {
      selectValue = parseInt(
        document.getElementById("selectDataType-003").value
      );
      newObj.requestValue3 = null;
    } else if (index === 4) {
      selectValue = parseInt(
        document.getElementById("selectDataType-004").value
      );
      newObj.requestValue4 = null;
    }
    // console.log(selectValue);
    if (isNaN(selectValue)) {
      newArr[index - 1] = 0;
    }
    else {
      if (selectValue === 1) {
        newArr[index - 1] = 1;
      } else if (selectValue === 2) {
        newArr[index - 1] = 2;
      } else if (selectValue === 3) {
        newArr[index - 1] = 3;
      }
    }

    setItemsbyId(newObj);
    setDynamicForm2(newArr);
  };

  const textForm = (index, isEdit = false, obj = null) => {
    return (
      <CCol xs="12" sm="4" md="4">
        <CFormGroup>
          <CLabel htmlFor="Extra" className="d-flex justify-content-start">
            {Constant.arrFieldMastExtCRemark[0]}
          </CLabel>
          <CInput id={"requestValue-" + index} value={obj !== null ? obj : null} onChange={isEdit ? handleChangeUpdateRemarkValue(index) : null} />
        </CFormGroup>
      </CCol>
    );
  };

  const numberForm = (index, isEdit = false, obj = null) => {
    if (obj !== null) {
      obj = obj.split(",");
    }
    return (
      <div>
        <CCol xs="12" sm="4" md="12">
          <CFormGroup>
            <CLabel htmlFor="Start" className="d-flex justify-content-start">
              {Constant.arrFieldMastExtCRemark[1]}
            </CLabel>
            <CInput id={"requestValue-01-" + index} value={obj !== null ? obj[0] : null} onChange={isEdit ? handleChangeUpdateRemarkValue(index, 0) : null} />
          </CFormGroup>
        </CCol>
        <CCol>
          <CFormGroup xs="12" sm="4" md="12">
            <CLabel htmlFor="End" className="d-flex justify-content-start">
              {Constant.arrFieldMastExtCRemark[2]}
            </CLabel>
            <CInput id={"requestValue-02-" + index} value={obj !== null ? obj[1] : null} onChange={isEdit ? handleChangeUpdateRemarkValue(index, 1) : null} />
          </CFormGroup>
        </CCol>
      </div>
    );
  };

  const selectForm = (index, isEdit = false, obj = []) => {
    var newArr = [];
    if (!isEdit) {
      switch (index) {
        case 1:
          newArr = [...itemsRemarkSelect1];
          break;
        case 2:
          newArr = [...itemsRemarkSelect2];
          break;
        case 3:
          newArr = [...itemsRemarkSelect3];
          break;
        case 4:
          newArr = [...itemsRemarkSelect4];
          break;
        default:
          newArr = [];
      }
    }
    else {
      if (obj !== null) {
        newArr = obj.split(",");
      }
    }
    return (
      <div>
        <CForm className="need-validation-remark-select">
          <CCol xs="12" sm="2" md="12">
            <CFormGroup>
              <CLabel htmlFor="Item" className="d-flex justify-content-start">
                {Constant.arrFieldMastExtCRemark[3]}
              </CLabel>
              <CInput id="Item" id={"requestValue-SL-" + index} required />
            </CFormGroup>
          </CCol>
        </CForm>
        <CCol xs="12" sm="2" md="12">
          <CFormGroup>
            <CLabel htmlFor="select" className="d-flex justify-content-start">
              {Constant.arrFieldMastExtCRemark[4]}
            </CLabel>

            <CSelect custom name="select" id={"select-remark-" + index} >
              {newArr.map((x) => (<option value={x}>{x}</option>))}
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol xs="12" sm="2" md="12">
          <CFormGroup>
            <CButton color="success" onClick={isEdit ? () => onClickCheckEditSelectValue(index) : () => onClickCheckAddSelectValue(index)}>เพิ่มข้อมูล</CButton>
            {" "}
            <CButton color="danger" onClick={isEdit ? () => onClickRemoveEditSelectValue(index) : () => onClickRemoveAddSelectValue(index)}>ลบข้อมูล</CButton>
          </CFormGroup>
        </CCol>
      </div>
    );
  };

  const remark = () => {
    return (
      <div>
        <CFormGroup row className="my-0">
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="RequestName1">{Constant.arrFieldMasterExtraCharge[13]}</CLabel>
              <CInput id="RequestName1" />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="select">{Constant.arrFieldMasterExtraCharge[14]}</CLabel>

              <CSelect
                custom
                name="select"
                id="selectDataType-01"
                onChange={addDataType(1)}
              >
                <option value=" " selected hidden>
                  {" "}
                  {Constant.txtformPlaceholderSelected}
                </option>
                <option value="">{txtSelectRemarkForm[0]}</option>
                <option value="1">{txtSelectRemarkForm[1]}</option>
                <option value="2">{txtSelectRemarkForm[2]}</option>
                <option value="3">{txtSelectRemarkForm[3]}</option>
              </CSelect>
            </CFormGroup>
          </CCol>
          {dynamicReturnForm(1)}

          {/* <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="Extra">ข้อมูลเพิ่มเติม</CLabel>
              <CInput id="Extar" />
            </CFormGroup>
          </CCol> */}
        </CFormGroup>
        <CFormGroup row className="my-0">
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="RequestName2">{Constant.arrFieldMasterExtraCharge[15]}</CLabel>
              <CInput id="RequestName2" />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="select">{Constant.arrFieldMasterExtraCharge[16]}</CLabel>

              <CSelect
                custom
                name="select"
                id="selectDataType-02"
                onChange={addDataType(2)}
              >
                <option value=" " selected hidden>
                  {" "}
                  {Constant.txtformPlaceholderSelected}
                </option>
                <option value="">{txtSelectRemarkForm[0]}</option>
                <option value="1">{txtSelectRemarkForm[1]}</option>
                <option value="2">{txtSelectRemarkForm[2]}</option>
                <option value="3">{txtSelectRemarkForm[3]}</option>
              </CSelect>
            </CFormGroup>
          </CCol>
          {dynamicReturnForm(2)}
          {/* <CCol xs="12" sm="2" md="2">
            <CFormGroup>
              <CLabel htmlFor="Start">ค่าเริ่มต้น</CLabel>
              <CInput id="Start" />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="2" md="2">
            <CFormGroup>
              <CLabel htmlFor="End">ค่าสิ้นสุด</CLabel>
              <CInput id="End" />
            </CFormGroup>
          </CCol> */}
        </CFormGroup>
        <CFormGroup row className="my-0">
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="RequestName3">{Constant.arrFieldMasterExtraCharge[17]}</CLabel>
              <CInput id="RequestName3" />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="select">{Constant.arrFieldMasterExtraCharge[18]}</CLabel>

              <CSelect
                custom
                name="select"
                id="selectDataType-03"
                onChange={addDataType(3)}
              >
                <option value=" " selected hidden>
                  {" "}
                  {Constant.txtformPlaceholderSelected}
                </option>
                <option value="">{txtSelectRemarkForm[0]}</option>
                <option value="1">{txtSelectRemarkForm[1]}</option>
                <option value="2">{txtSelectRemarkForm[2]}</option>
                <option value="3">{txtSelectRemarkForm[3]}</option>
              </CSelect>
            </CFormGroup>
          </CCol>
          {dynamicReturnForm(3)}
        </CFormGroup>
        <CFormGroup row className="my-RequestName40">
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="RequestName4">{Constant.arrFieldMasterExtraCharge[19]}</CLabel>
              <CInput id="RequestName4" />
            </CFormGroup>
          </CCol>
          <CCol xs="12" sm="4" md="4">
            <CFormGroup>
              <CLabel htmlFor="select">{Constant.arrFieldMasterExtraCharge[20]}</CLabel>

              <CSelect
                custom
                name="select"
                id="selectDataType-04"
                onChange={addDataType(4)}
              >
                <option value=" " selected hidden>
                  {" "}
                  {Constant.txtformPlaceholderSelected}
                </option>
                <option value="">{txtSelectRemarkForm[0]}</option>
                <option value="1">{txtSelectRemarkForm[1]}</option>
                <option value="2">{txtSelectRemarkForm[2]}</option>
                <option value="3">{txtSelectRemarkForm[3]}</option>
              </CSelect>
            </CFormGroup>
          </CCol>
          {dynamicReturnForm(4)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CCol xs="12" sm="6" md="2">
            <CButton block color="success" size={Constant.btHeaderSize} onClick={onClickCheckAddData}>
              {Constant.btSave}
            </CButton>
          </CCol>
          <br />
        </CFormGroup>
      </div>
    );
  };

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
  } else {
    return (
      <div>
        <h6>
          <CRow>
            <CCol xs="12" sm="6" md="12">
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol xs="6" sm="8" md="10">
                      <h3 className="headtext">{Constant.txtMasterExtraCharge}</h3>
                    </CCol>
                    <CCol xs="6" sm="4" md="2">
                      <CButton block size={Constant.btHeaderSize} className='btn-mainsmp' onClick={toggle}>
                        {Constant.btAddData}
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <br />
                {collaps()}
                {dialog()}
                <CCardBody>{mainTable()}</CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>
      </div>
    );
  }
};

export default Tables;
