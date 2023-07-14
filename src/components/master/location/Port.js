
import React, { useState, useEffect } from 'react';
import Repository from '../../../repositories/Repository'
import Constant from "../../../helpers/Constant";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
  CSwitch,
  CLabel,
  CForm,
  CFormGroup,
  CFormText,
  CModal,
  CCardFooter,
  CSpinner,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInvalidFeedback,
  CValidFeedback,
  CProgress,
  CLink,
  CSubheader,
  CBreadcrumbRouter,
  CRow
} from '@coreui/react'
import Checkbox from "@material-ui/core/Checkbox";
import CIcon from "@coreui/icons-react";
import { DocsLink } from '../../../reusable'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import usersData from '../../../views/users/UsersData'
import functionController from '../../../helpers/FunctionController';


const fields = [
  // 'districtId',
  {
    key: 'portCode',
    label: "รหัสท่าเรือ",
  }, {
    key: 'portNameThai',
    label: "ชื่อท่าเรือ(ไทย)",
  }, {
    key: 'portNameEng',
    label: "ชื่อท่าเรือ(อังกฤษ)",
  },
  {
    key: 'description',
    label: "รายละเอียด",
  }, {
    key: 'isActive',
    label: "สถานะ",
  }, {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },]

const District = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [district, setDistrict] = useState([]);
  // const [items, setItems] = useState([]);
  const [modal, setModal] = useState(true);
  const [primary, setPrimary] = useState(false);
  const [danger, setDanger] = useState(false)
  const [items, setItems] = useState([]);
  const [details, setDetails] = useState([]);
  const [collapse, setCollapse] = useState(false)
  const [collapseMulti, setCollapseMulti] = useState([false, false])
  const [port, setPortList] = useState([])
  const [portCode, setPortCode] = useState();
  const [portNameEng, setPortNameEng] = useState();
  const [portNameThai, setPortNameThai] = useState();
  const [description, setDesc] = useState();
  const [errortext, seterrortxt] = useState('กรอกข้อมูลให้ครบถ้วน');
  const [errortext1, seterrortxt1] = useState('กรอกข้อมูลให้ครบถ้วน');
  const [isActive, setisActive] = useState(false);
  const [validations, setValidate] = useState(false);
  const [validation, setValidates] = useState(false);
  const [districtCode, setdistrictCode] = useState();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const options = {
    method: 'POST',


  }

  const pageCode = "";

  const toggleDetails = (index, id) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [details, index]
      if (!isLoadingData) {
        fnGetPortListById(id)
      }

    }
    setDetails(newDetails)
  }

  const fnGetPortListById = (portId) => {
    setIsLoadingData(true)
    Repository.fetchGetPorttListById(portId)
      .then(
        (result) => {
          setIsLoadingData(false)
          setIsLoaded(true);
          if (result.httpCode === "200") {
            setItems(result.data)
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

  const handleChangeUpdateField = (index, target) => (e) => {
    let newArr = [...items];
    if (target === "portCode") {
      newArr[0].portCode = e.target.value;
    }
    else if (target === "portNameThai")
      newArr[0].portNameThai = e.target.value;
    else if (target === "portNameEng")
      newArr[0].portNameEng = e.target.value;
    else if (target === "description")
      newArr[0].description = e.target.value;
    else if (target === "isActive")
      newArr[index].isActive = e.target.checked;
    setItems(newArr);
    console.log(newArr)
  }

  const onClickEditData = (index) => (e) => {
    // setIsConfirmEdit(!isConfirmEdit);
    let newArr = [...items];
    console.log(newArr)
    var portId = newArr[index].portId;
    var portCode = newArr[index].portCode;
    var portNameThai = newArr[index].portNameThai;
    var portNameEng = newArr[index].portNameEng;
    var description = newArr[index].description;
    var isActive = newArr[index].isActive;
    // var updateBy = 1;
    var arrObj = [portId, portCode, portNameThai, portNameEng, description, isActive];
    // console.log(arrObj);
    editPort(arrObj[0], arrObj[1], arrObj[2], arrObj[3], arrObj[4], arrObj[5]);
  }

  const onClickAddCheck = () => {
    var checkprot = port.find((x) => x.portCode === document.getElementById('In-portCode').value)
    if (checkprot) {
      console.log(11111)
      console.log(checkprot)

    } else {
      if (getIsValidForm("port-needs-validation")) {

        setPrimary(!primary)

      }
    }
  }




  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice()
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
    setCollapseMulti(newCollapse)
  }
  const toggle = (e) => {
    setCollapse(!collapse)
    e.preventDefault()
  }

  const collaps = () => {
    return (
      <CCollapse show={collapse}>
        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
          width: ' 100%'
        }}>
          <CCard className='p-3'>
            <CForm className="port-needs-validation" novalidate>
              <CRow>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel>รหัสท่าเรือ</CLabel>
                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                      width: ' 100%'
                    }}>
                      <CInput
                        id="In-portCode"
                        maxLength="5"
                        // class="form-control"
                        type="text"
                        name="nf-email"
                        value={portCode}
                        onChange={(event) => {
                          setPortCode(event.target.value);
                        }}
                        required />
                    </Box>
                    <CInvalidFeedback>กรอกข้อมูลให้ครบถ้วน</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup >
                    <CLabel >ชื่อท่าเรือ(อังกฤษ)</CLabel>
                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                      width: ' 100%'
                    }}>
                      <CInput
                        type="text"
                        // class="form-control"
                        name="nf-email"
                        value={portNameEng}
                        onChange={(event) => {
                          setPortNameEng(event.target.value);
                        }}
                        required />
                    </Box>
                    <CInvalidFeedback>กรอกข้อมูลให้ครบถ้วน</CInvalidFeedback>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel >ชื่อท่าเรือ(ไทย)</CLabel>
                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                      width: ' 100%'
                    }}>
                      <CInput
                        type="text"
                        // class="form-control"
                        name="nf-email"
                        value={portNameThai}
                        onChange={(event) => {
                          setPortNameThai(event.target.value);
                        }}
                        required />
                    </Box>
                    <CInvalidFeedback>กรอกข้อมูลให้ครบถ้วน</CInvalidFeedback>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel >รายละเอียด</CLabel>
                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                      width: ' 100%'
                    }}>
                      <CInput
                        type="text"
                        // class="form-control"
                        name="nf-email"
                        value={description}
                        onChange={(event) => {
                          setDesc(event.target.value);
                        }}
                        required />
                    </Box>
                    <CInvalidFeedback>กรอกข้อมูลให้ครบถ้วน</CInvalidFeedback>
                    {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                  </CFormGroup>
                </CCol>
                <CCol xs="12" sm="6" md="2">
                  <CFormGroup>
                    <CLabel className='mt-1' class="align-top">
                      &nbsp; สถานะ
                    </CLabel>
                    &nbsp;
                    <CSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={handleChange} value={isActive} defaultChecked={false} labelOn={'\u2713'} labelOff={'\u2715'} />

                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow className='justify-content-center mt-2'>

                <CCol xs="12" sm="6" md="2">
                  <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                    width: ' 100%'
                  }}>
                    <CButton
                      className="editbutton"
                      size={Constant.btAddSize}
                      color="success"
                      onClick={onClickAddCheck}
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
                    onClick={insertPort(
                      portCode,
                      portNameThai,
                      portNameEng,
                      description,
                      isActive
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

  const maintable = () => {
    return (
      <CDataTable
        columnFilter
        tableFilter={{ label: "ค้นหา", placeholder: "ค้นหาข้อมูล..." }}
        itemsPerPageSelect={{ label: "จำนวนหน้า" }}
        items={port}
        fields={fields}
        // hover
        striped
        bordered
        size="sm"
        itemsPerPage={10}
        pagination
        scopedSlots={{
          isActive: (item, index) => {
            return (
              <td className="py-2 text-center">
                {item.isActive ? (
                  <CIcon name="cil-check-circle" style={{ color: 'green' }} size="2xl" />
                ) : (
                  <CIcon name="cil-x-circle" style={{ color: 'red' }} size="2xl" />
                )}
              </td>
            );
          },
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                  width: ' 100%'
                }}>
                  <CButton
                    color="primary"
                    variant="outline"
                    block
                    size="sm"
                    onClick={() => {
                      toggleDetails(index, item.portId);
                    }}
                  >
                    {details.includes(index) ? "ซ่อน" : "แสดง"}
                  </CButton>
                </Box>
              </td>
            );
          },
          details: (item, index) => {
            if (details.includes(index)) {
              if (!items.length) {
                return (
                  <CCardBody>
                    {/* <CProgress sm animated value={100} className="mb-3" color='danger' /> */}
                    {showLoadingData()}
                  </CCardBody>
                )
              } else if (items.length) {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <CRow>
                        <CLabel htmlFor="nf-email">
                          {items[0].portId} : &nbsp;
                        </CLabel>

                        <CCol xs="12" sm="6" md="2">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                รหัสท่าเรือ
                              </CLabel>
                              <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                              }}>
                                <CInput
                                  type="text"
                                  id="nf-email"
                                  name="nf-email"
                                  value={items[0].portCode}
                                  onChange={handleChangeUpdateField(0, 'portCode')}
                                  placeholder={items[0].portCode}
                                  autoComplete="email"
                                />
                              </Box>
                              {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CFormGroup>
                          </CForm>
                        </CCol>

                        <CCol xs="12" sm="6" md="2">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                ชื่อท่าเรือ(ไทย)
                              </CLabel>
                              <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                              }}>
                                <CInput
                                  type="text"
                                  id="nf-email"
                                  name="nf-email"
                                  value={items[0].portNameThai}
                                  onChange={handleChangeUpdateField(0, 'portNameThai')}
                                  placeholder={items[0].portNameThai}
                                  autoComplete="email"
                                />
                              </Box>
                              {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CFormGroup>
                          </CForm>
                        </CCol>

                        <CCol xs="12" sm="6" md="2">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                ชื่อท่าเรือ(อังกฤษ)
                              </CLabel>
                              <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                              }}>
                                <CInput
                                  type="text"
                                  id="nf-email"
                                  name="nf-email"
                                  value={items[0].portNameEng}
                                  onChange={handleChangeUpdateField(0, 'portNameEng')}
                                  placeholder={items[0].portNameEng}
                                  autoComplete="email"
                                />
                              </Box>
                              {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CFormGroup>
                          </CForm>
                        </CCol>

                        <CCol xs="12" sm="6" md="2">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel htmlFor="nf-email">
                                Discription
                              </CLabel>
                              <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                width: ' 100%'
                              }}>
                                <CInput
                                  type="text"
                                  id="nf-email"
                                  name="nf-email"
                                  value={items[0].description}
                                  onChange={handleChangeUpdateField(0, 'description')}
                                  placeholder={items[0].description}
                                  autoComplete="email"
                                />
                              </Box>
                              {/* <CFormText className="help-block">Please enter your email</CFormText> */}
                            </CFormGroup>
                          </CForm>
                        </CCol>

                        <CCol xs="12" sm="6" md="2">
                          <CForm action="" method="post">
                            <CFormGroup>
                              <CLabel className='mt-1' class="align-top">
                                &nbsp; สถานะ
                              </CLabel>
                              &nbsp;
                              <CSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={handleChangeUpdateField(0, 'isActive')} checked={items[0].isActive} labelOn={'\u2713'} labelOff={'\u2715'} />
                            </CFormGroup>
                          </CForm>
                        </CCol>

                      </CRow>
                      <CRow className='justify-content-center mt-2 '>
                        <CCol xs="12" sm="6" md="2">
                          <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                            width: ' 100%'
                          }}>
                            <CButton
                              className="editbutton"
                              size="sm"
                              color="primary"
                              onClick={() => setPrimary(!primary)}
                              block
                            >
                              แก้ไขข้อมูล
                            </CButton>
                          </Box>
                        </CCol>

                        <CCol xs="12" sm="6" md="2">
                          <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                            width: ' 100%'
                          }}>
                            <CButton
                              className="editbutton"
                              size="sm"
                              color="danger"
                              onClick={() => setDanger(!danger)}
                              block
                            >
                              ลบข้อมูล
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
                          คุณต้องการจะแก้ไขข้อมูลใช่หรือไม่?
                        </CModalBody>
                        <CModalFooter>
                          <CButton
                            color="success"
                            onClick={onClickEditData(
                              0
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
                            onClick={deletePort(item.portId)}
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
    )
  }

  const handleChange = (event) => {
    setisActive(event.target.checked)



  }



  const insertPort = (portCode, portNameThai, portNameEng, description, isActive) => (e) => {
    Repository.fetchAddPortList(portCode, portNameThai, portNameEng, description, isActive)
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


  const editPort = (portId, portCode, portNameThai, portNameEng, description, isActive) => {
    Repository.fetchEditPortList(portId, portCode, portNameThai, portNameEng, description, isActive)
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

  const deletePort = (portId) => (e) => {
    Repository.fetchDeletePortList(portId)
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

  const fnGetPortList = () => {
    console.log('88888');
    Repository.fetchPortList()
      .then(
        (result) => {
          setIsLoaded(true);
          if (result.httpCode === "200") {
            setPortList(result.data);
          }
          else {
            setError(result);
          }
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
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

    fnGetPortList();

  }, []);

  if (error) {
    return (
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            Fetch Error : {error.message}
          </div>
        </div>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="content-wrapper">
        {showLoadingData()}
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
                      <h3 className="headertable">ท่าเรือ</h3>
                    </CCol>
                    <CCol xs="4" sm="6" md="2">
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
                  {/* <CRow xs='6' className="justify-content-center "> */}
                  <CCard className="p-2">
                    {maintable()}
                  </CCard>
                  {/* </CRow> */}

                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </h6>

      </div>
    )
  }
}




export default District
