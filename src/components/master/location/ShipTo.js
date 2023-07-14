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
    CSwitch,
    CInvalidFeedback,
    CInputCheckbox,
    CSelect,
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
        key: 'manage',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
    {
        key: 'isActive',
        label: `${Constant.arrFieldMasterShipTo[12]}`,
        _style: { width: '1%' },
    },
    {
        key: 'shipToCode',
        label: `${Constant.arrFieldMasterShipTo[0]}`,
    },
    {
        key: 'shipToNameEng',
        label: `${Constant.arrFieldMasterShipTo[1]}`,
    },
    {
        key: 'shipToNameThai',
        label: `${Constant.arrFieldMasterShipTo[2]}`,
    },
    {
        key: 'provinceName',
        label: `${Constant.arrFieldMasterShipTo[6]}`,
    },
    {
        key: 'districtName',
        label: `${Constant.arrFieldMasterShipTo[7]}`,
    },
    {
        key: 'zoneName',
        label: `${Constant.arrFieldMasterShipTo[8]}`,
    },
    {
        key: 'postCode',
        label: `${Constant.arrFieldMasterShipTo[9]}`,
    },
    {
        key: 'contractName',
        label: `${Constant.arrFieldMasterShipTo[10]}`,
    },
]

export default function ShipTo() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorAPI, setErrorAPI] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isPostingData, setIsPostingData] = useState(false);
    const [baseItems, setBaseItems] = useState([]);
    const [items, setItems] = useState({});
    const [countryList, setCountryList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [zoneList, setZoneList] = useState([]);
    const [zoneDetailList, setZoneDetailList] = useState([]);
    const [postCodeList, setPostCodeList] = useState([]);

    const [slProvinceList, setSlProvinceList] = useState([]);
    const [slDistrictList, setSlDistrictList] = useState([]);
    const [objZoneList, setObjZoneList] = useState({});
    const [objPostCodeList, setObjPostCodeList] = useState({});

    const [details, setDetails] = useState([]);
    const [allQry, setAllQry] = useState(false);

    const [isShowAddForm, setIsShowAddForm] = useState(false);
    const [isConfirmSave, setIsConfirmSave] = useState(false);
    const [isConfirmEdit, setIsConfirmEdit] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [invalidMaterialFormAdd, setInvalidMaterialFormAdd] = useState([false, false]);
    const [invalidMaterialFormEdit, setInvalidMaterialFormEdit] = useState([false, false]);

    const [fieldDelete, setFieldDelete] = useState(null);

    const classes = MakeStyleSheet.useStyles();
    const [accordion, setAccordion] = useState(1);

    const pageCode = "";

    const toggleDetails = (index, keyId) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
            clearSelector()
        } else {
            newDetails = [details, index]
            if (!isLoadingData) {
                fnGetDataForEdit(keyId)
            }
        }
        setDetails(newDetails)
        setAllQry(false)
    }

    const handleChangeAddForm = () => {
        if (!isShowAddForm) {
            clearSelector();
            if (!isLoadingData) {
                fnGetShipToOtherList();
            }
        }
        setIsShowAddForm(!isShowAddForm);
    }

    const handleChangeConfirmDelete = (index) => (e) => {
        setIsConfirmDelete(!isConfirmDelete);
        setFieldDelete(index);
    }

    const handleChangeUpdateField = (type) => (e) => {
        let newObj = { ...items };
        if (type === "shipToCode")
            newObj.shipToCode = e.target.value;
        else if (type === "shipToNameEng")
            newObj.shipToNameEng = e.target.value;
        else if (type === "shipToNameThai")
            newObj.shipToNameThai = e.target.value;
        else if (type === "address")
            newObj.address = e.target.value;
        else if (type === "shipToDesc")
            newObj.shipToDesc = e.target.value;
        else if (type === "contractName")
            newObj.contractName = e.target.value;
        else if (type === "isExport")
            newObj.isExport = !newObj.isExport;
        else if (type === "isActive")
            newObj.isActive = !newObj.isActive;
        setItems(newObj);
    }

    const handleChangeSearchSelect = (type) => (e, values) => {
        if (type === "district") {
            querySelector(type, parseInt(e.target.value), "search");
        }
        else {
            if (values) {
                querySelector(type, values, "search");
            }
            else {
                if (type === "country") {
                    setSlProvinceList([]);
                    setSlDistrictList([]);
                    setObjZoneList({});
                    setObjPostCodeList({});
                }
                else if (type === "province") {
                    setSlDistrictList([]);
                    setObjZoneList({});
                    setObjPostCodeList({});
                }
            }
        }
    }

    const handleChangeAddSelect = (type) => (e, values) => {
        if (type === "district") {
            querySelector(type, parseInt(e.target.value), "add");
        }
        else {
            if (!values) {
                if (type === "country") {
                    setSlProvinceList([]);
                    setSlDistrictList([]);
                    setObjZoneList({});
                    setObjPostCodeList({});
                }
                else if (type === "province") {
                    setSlDistrictList([]);
                    setObjZoneList({});
                    setObjPostCodeList({});
                }
            }
            else {
                querySelector(type, values, "add");
            }
        }
    }

    const handleChangeEditSelect = (index, type) => (e, values) => {
        let newObj = { ...items };
        if (!values && type !== "district") {
            if (type === "country") {
                setSlProvinceList([]);
                setSlDistrictList([]);
                newObj.zoneId = null;
                newObj.zoneName = "";
                newObj.districtId = null;
                newObj.districtName = "";
                newObj.postCode = null;
                setItems(newObj);
                querySelector(type, {}, "edit", index);
            }
            else if (type === "province") {
                setSlDistrictList([]);
                newObj.zoneId = null;
                newObj.zoneName = "";
                newObj.districtId = null;
                newObj.districtName = "";
                newObj.postCode = null;
                setItems(newObj);
                querySelector(type, {}, "edit", index);
            }
        }
        else {
            if (type === "country") {
                var value = values.countryId;
                countryList.map((item) => {
                    if (item.countryId === value) {
                        newObj.countryId = item.countryId;
                        newObj.countryName = item.countryNameThai;
                        newObj.zoneId = null;
                        newObj.zoneName = "";
                        newObj.provinceId = null;
                        newObj.provinceName = "";
                        newObj.districtId = null;
                        newObj.districtName = "";
                        newObj.postCode = null;
                        return;
                    }
                });
                setItems(newObj);
                querySelector(type, values, "edit", index);
            }
            else if (type === "province") {
                var value = values.provinceId;
                provinceList.map((item) => {
                    if (item.provinceId === value) {
                        newObj.provinceId = item.provinceId;
                        newObj.provinceName = item.provinceName1;
                        newObj.districtId = null;
                        newObj.districtName = "";
                        newObj.zoneId = null;
                        newObj.zoneName = "";
                        newObj.postCode = null;
                        return;
                    }
                });
                var newObjZoneDetail = zoneDetailList.find((x) => x.provinceId === value);
                if (newObjZoneDetail) {
                    newObj.zoneId = newObjZoneDetail.zoneId;
                    var newObjZone = zoneList.find((x) => x.zoneId === newObjZoneDetail.zoneId);
                    if (newObjZone) {
                        newObj.zoneName = newObjZone.zoneName;
                    }
                }
                setItems(newObj);
                querySelector(type, values, "edit", index);
            }
            else if (type === "district") {
                var value = parseInt(document.getElementById("edit-district-name-" + index).value);
                if (!isNaN(value)) {
                    districtList.map((item) => {
                        if (item.districtId === value) {
                            newObj.districtId = item.districtId;
                            newObj.districtName = item.districtName1;
                            newObj.postCode = null;
                            return;
                        }
                    });
                    var result = postCodeList.find((x) => x.provinceId === newObj.provinceId && x.districtId === value);
                    if (result) {
                        newObj.postCode = result.postCode;
                    }
                }
                else {
                    newObj.districtId = null;
                    newObj.districtName = "";
                    newObj.postCode = null;
                }
                setItems(newObj);
            }
        }
    }

    const querySelector = (type = "", itemObj, form = "", index = 0) => {
        var newObj = { ...items };
        if (type === "country") {
            var selection = document.getElementById(form === "edit" ? "edit-district-name-" + index : form === "add" ? "add-district-name" : form === "search" ? "search-district-name" : "");
            selection.selectedIndex = 0;
            if (Object.keys(itemObj).length) {
                var slCountryId = itemObj.countryId;
                var newArr = [];
                provinceList.map((item) => {
                    if (item.countryId === slCountryId) {
                        newArr.push(item);
                    }
                })
                setSlProvinceList(newArr);
                setSlDistrictList([]);
                setObjZoneList({});
                setObjPostCodeList({});
            }
        }
        else if (type === "province") {
            var selection = document.getElementById(form === "edit" ? "edit-district-name-" + index : form === "add" ? "add-district-name" : form === "search" ? "search-district-name" : "");
            selection.selectedIndex = 0;

            if (Object.keys(itemObj).length) {
                var slProvinceId = itemObj.provinceId;
                var newArr = [];
                districtList.map((item) => {
                    if (item.provinceId === slProvinceId) {
                        newArr.push(item);
                    }
                })
                setSlDistrictList(newArr);
                var newObjZoneDetail = zoneDetailList.find((x) => x.provinceId === slProvinceId);
                if (newObjZoneDetail) {
                    var newObjZone = zoneList.find((x) => x.zoneId === newObjZoneDetail.zoneId);
                    if (newObjZone) {
                        setObjZoneList(newObjZone);
                    }
                }
                setObjPostCodeList({});
            }
        }
        else if (type === "district" && form !== "edit") {
            var provinceValue = document.getElementById(form === "add" ? "add-province-name" : form === "search" ? "search-province-name" : "").value;
            var slProvinceId = provinceList.find((x) => x.provinceName1 === provinceValue).provinceId;

            if (!isNaN(itemObj)) {
                var slDistrictId = itemObj;
                var result = postCodeList.find((x) => x.provinceId === slProvinceId && x.districtId === slDistrictId);
                if (result) {
                    setObjPostCodeList(result);
                }
            }
            else {
                setObjPostCodeList({});
            }
        }
        else if (type === "all" && form === "edit") {
            var slCountryId = newObj.countryId;
            var newArr = [];
            provinceList.map((item) => {
                if (item.countryId === slCountryId) {
                    newArr.push(item);
                }
            })
            setSlProvinceList(newArr);

            newArr = [];
            var slProvinceId = newObj.provinceId;
            districtList.map((item) => {
                if (item.provinceId === slProvinceId) {
                    newArr.push(item);
                }
            })
            setSlDistrictList(newArr);
            newArr = [];
            zoneDetailList.map((item) => {
                if (item.provinceId === slProvinceId) {
                    newArr.push(item);
                }
            })
            setObjZoneList(newArr);

            newArr = [];
            var slDistrictId = newObj.districtId;
            postCodeList.map((item) => {
                if (item.provinceId === slProvinceId && item.districtId === slDistrictId) {
                    newArr.push(item);
                }
            })
            setObjPostCodeList(newArr);
        }
    }

    const clearSelector = () => {
        setSlProvinceList([]);
        setSlDistrictList([]);
        setObjZoneList({});
        setObjPostCodeList({});
    }

    const showSelectList = (type) => {
        if (type === "country") {
            return (
                countryList.map((item) => (
                    <option value={item.countryId}>{item.countryNameThai}</option>
                )))
        }
        else if (type === "province") {
            return (
                slProvinceList.map((item) => (
                    <option value={item.provinceId}>{item.provinceName1}</option>
                )))
        }
        else if (type === "district") {
            return (
                slDistrictList.map((item) => (
                    <option value={item.districtId}>{item.districtName1}</option>
                )))
        }
        else if (type === "search-country") {
            return (
                countryList.map((item) => {
                    if (item.countryId === 213) {
                        return (
                            <option selected value={item.countryId}>{item.countryNameThai}</option>
                        )
                    } else {
                        return (
                            <option value={item.countryId}>{item.countryNameThai}</option>
                        )
                    }
                }))
        }
        else if (type === "search-province") {
            var result = countryList.find((x) => x.countryId === 213);
            return (
                provinceList.map((item) => (
                    <option value={item.provinceId}>{"[" + result.countryNameThai + "] " + item.provinceName1}</option>
                )))
        }
        else if (type === "search-district") {
            return (
                districtList.map((item) => {
                    var result = provinceList.find((x) => x.provinceId === item.provinceId);
                    return (
                        <option value={item.districtId}>{"[" + result.provinceName1 + "] " + item.districtName1}</option>
                    )
                }))
        }
        else if (type === "search-zone") {
            return (
                zoneList.map((item) => (
                    <option value={item.zoneId}>{item.zoneName}</option>
                )))
        }
        // else if (type === "search-postcode") {
        //     return (
        //         postCodeList.map((item) => (
        //             <option value={item.postCode}>{item.postCode}</option>
        //         )))
        // }
    }

    const handleChangeKeyForSearch = () => {
        setNoValidateForm("search-needs-validation");
    }

    const onclickSearchData = () => {
        var shipToCode = document.getElementById("search-shipto-code").value;
        var shipToNameEng = document.getElementById("search-en-name").value;
        var shipToNameThai = document.getElementById("search-th-name").value;

        if (shipToCode === "" && shipToNameEng === "" && shipToNameThai === "") {
            if (!getIsValidForm("search-needs-validation")) {
                if (Object.keys(baseItems).length) {
                    setBaseItems([]);
                }
            }
        }
        else {
            setNoValidateForm("search-needs-validation");
            setAccordion(0);

            var address = document.getElementById("search-address").value;
            var shipToDesc = document.getElementById("search-description").value;
            var countryValue = document.getElementById("search-country-name").value;
            var countryId = countryValue != "" ? countryList.find((x) => x.countryNameThai === countryValue).countryId : null;
            var provinceValue = document.getElementById("search-province-name").value;
            var provinceId = provinceValue != "" ? provinceList.find((x) => x.provinceName1 === provinceValue).provinceId : null;
            var districtId = parseInt(document.getElementById("search-district-name").value);
            var zoneId = parseInt(document.getElementById("search-zone-name").value);
            var postCode = document.getElementById("search-post-code").value;
            var contractName = document.getElementById("search-contract-name").value;
            var isExport = parseInt(document.getElementById("search-is-export").value);

            if (shipToCode === "") {
                shipToCode = null;
            }
            if (shipToNameEng === "") {
                shipToNameEng = null;
            }
            if (shipToNameThai === "") {
                shipToNameThai = null;
            }
            if (address === "") {
                address = null;
            }
            if (shipToDesc === "") {
                shipToDesc = null;
            }
            if (isNaN(districtId)) {
                districtId = null;
            }
            if (isNaN(zoneId)) {
                zoneId = null;
            }
            if (postCode === "") {
                postCode = null;
            }
            if (contractName === "") {
                contractName = null;
            }
            if (isNaN(isExport)) {
                isExport = null;
            }
            else if (isExport === 1) {
                isExport = true;
            }
            else if (isExport === 0) {
                isExport = false;
            }

            var newArr = [
                shipToCode,
                shipToNameEng,
                shipToNameThai,
                address,
                shipToDesc,
                countryId,
                provinceId,
                districtId,
                zoneId,
                postCode,
                contractName,
                isExport
            ];

            // console.log(newArr);
            fnGetShipToList(newArr);
        }
    }

    const onClickClearDataForSearch = () => {
        var shipToCode = document.getElementById("search-shipto-code");
        shipToCode.value = "";
        var shipToNameEng = document.getElementById("search-en-name");
        shipToNameEng.value = "";
        var shipToNameThai = document.getElementById("search-th-name");
        shipToNameThai.value = "";
        var address = document.getElementById("search-address");
        address.value = "";
        var shipToDesc = document.getElementById("search-description");
        shipToDesc.value = "";


        // var countryId = document.getElementById("search-country-name");
        // countryId.selectedIndex = 0;
        // var provinceId = document.getElementById("search-province-name");
        // provinceId.selectedIndex = 0;


        var districtId = document.getElementById("search-district-name");
        districtId.selectedIndex = 0;
        var zoneId = document.getElementById("search-zone-name");
        zoneId.selectedIndex = 0;
        var postCode = document.getElementById("search-post-code");
        postCode.value = "";
        var contractName = document.getElementById("search-contract-name");
        contractName.value = "";
        var isExport = document.getElementById("search-is-export");
        isExport.selectedIndex = 0;
    }

    const onClickAddData = () => {
        setIsConfirmSave(!isConfirmSave);
        var shipToCode = document.getElementById("add-shipto-code").value;
        var shipToNameEng = document.getElementById("add-en-name").value;
        var shipToNameThai = document.getElementById("add-th-name").value;
        var address = document.getElementById("add-address").value;
        var shipToDesc = document.getElementById("add-description").value;
        var countryValue = document.getElementById("add-country-name").value;
        var countryId = countryList.find((x) => x.countryNameThai === countryValue).countryId;
        var provinceValue = document.getElementById("add-province-name").value;
        var provinceId = provinceList.find((x) => x.provinceName1 === provinceValue).provinceId;
        var districtId = document.getElementById("add-district-name").value;
        var zoneValue = document.getElementById("add-zone-name").value;
        var postCode = document.getElementById("add-post-code").value;
        var contractName = document.getElementById("add-contract-name").value;
        var isExport = document.getElementById("add-is-export").checked;
        var isActive = true;
        var createBy = 1;

        var zoneId = null;
        if (zoneValue !== "") {
            var result = zoneList.find((x) => x.zoneName === zoneValue);
            if (result) {
                zoneId = result.zoneId;
            }
        }
        districtId = districtId !== "" ? parseInt(districtId) : null;
        postCode = postCode !== "" ? parseInt(postCode) : null;
        var newArr = [shipToCode, shipToNameEng, shipToNameThai, address, shipToDesc, countryId, provinceId, districtId
            , zoneId, postCode, contractName, isExport, isActive, createBy];
        // console.log(newArr);
        fnInsertData(newArr);
    }

    const onClickEditData = () => {
        setIsConfirmEdit(!isConfirmEdit);
        var newObj = { ...items };
        var shipToId = newObj.shipToId;
        var shipToCode = newObj.shipToCode;
        var shipToNameEng = newObj.shipToNameEng;
        var shipToNameThai = newObj.shipToNameThai;
        var address = newObj.address;
        var shipToDesc = newObj.shipToDesc;
        var countryId = newObj.countryId;
        var provinceId = newObj.provinceId;
        var districtId = newObj.districtId;
        var zoneId = newObj.zoneId;
        var postCode = newObj.postCode;
        var contractName = newObj.contractName;
        var isExport = newObj.isExport;
        var isActive = newObj.isActive;
        var updateBy = 1;

        var arrObj = [shipToId, shipToCode, shipToNameEng, shipToNameThai, address, shipToDesc, countryId, provinceId, districtId
            , zoneId, postCode, contractName, isExport, isActive, updateBy];
        // console.log(arrObj);
        fnUpdateData(arrObj);
    }

    const onClickDeleteData = () => {
        setIsConfirmDelete(!isConfirmDelete);
        var shipToId = fieldDelete;
        // console.log(shipToId);
        fnDeleteData(shipToId);
    }

    const fnInsertData = (arrData) => {
        setIsPostingData(true);
        Repository.fetchAddShipToList(arrData)
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
        Repository.fetchEditShipToList(arrData)
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
        Repository.fetchRemoveShipToList(index)
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
        setCountryList([]);
        setProvinceList([]);
        setDistrictList([]);
        setZoneList([]);
        setZoneDetailList([]);
        setPostCodeList([]);
        setItems({});
        Repository.fetchGetShipToListById(index)
            .then(
                (result) => {
                    setIsLoadingData(false);
                    if (result.httpCode === "200") {
                        setCountryList(result.data.countryList);
                        setProvinceList(result.data.provinceList);
                        setDistrictList(result.data.districtList);
                        setZoneList(result.data.zoneList);
                        setZoneDetailList(result.data.zoneDetailList);
                        setPostCodeList(result.data.postCodeList);
                        setItems(result.data.shipToList);
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

    const fnGetShipToOtherList = () => {
        setIsLoadingData(true);
        setCountryList([]);
        setProvinceList([]);
        setDistrictList([]);
        setZoneList([]);
        setZoneDetailList([]);
        setPostCodeList([]);
        Repository.fetchGetShipToOtherList()
            .then(
                (result) => {
                    setIsLoadingData(false);
                    if (result.httpCode === "200") {
                        setCountryList(result.data.countryList);
                        setProvinceList(result.data.provinceList);
                        setDistrictList(result.data.districtList);
                        setZoneList(result.data.zoneList);
                        setZoneDetailList(result.data.zoneDetailList);
                        setPostCodeList(result.data.postCodeList);
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

    const fnGetShipToList = (arrData = []) => {
        setIsPostingData(true);
        Repository.fetchGetShipToList(arrData)
            .then(
                (result) => {
                    setIsPostingData(false);
                    if (result.httpCode === "200") {
                        var newArr = [];
                        result.data.map((item) => {
                            if (item.districtName === null) {
                                item.districtName = "";
                            }
                            if (item.zoneName === null) {
                                item.zoneName = "";
                            }
                            if (item.postCode === null) {
                                item.postCode = "";
                            }
                            newArr.push(item);
                        });
                        setBaseItems(newArr);
                    }
                    else {
                        setErrorAPI(result);
                    }
                },
                (error) => {
                    setIsPostingData(false);
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
        Repository.fetchGetShipToOtherList()
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.httpCode === "200") {
                        setCountryList(result.data.countryList);
                        setProvinceList(result.data.provinceList);
                        setDistrictList(result.data.districtList);
                        setZoneList(result.data.zoneList);
                        setZoneDetailList(result.data.zoneDetailList);
                        setPostCodeList(result.data.postCodeList);
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

    const setNoValidateForm = (formClassName) => {
        var forms = document.querySelectorAll(`.${formClassName}`);
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.classList.remove('was-validated');
            });
    }

    const onClickCheckFormAddData = () => {
        var invalidList = [...invalidMaterialFormAdd];
        var countryValue = document.getElementById("add-country-name").value;
        var provinceValue = document.getElementById("add-province-name").value;
        if (getIsValidForm("add-needs-validation") && countryValue !== "" && provinceValue !== "") {
            setIsConfirmSave(!isConfirmSave);
            if (invalidList[0] || invalidList[1]) {
                if (invalidList[0]) {
                    invalidList[0] = false;
                }
                if (invalidList[1]) {
                    invalidList[1] = false;
                }
                setInvalidMaterialFormAdd(invalidList);
            }
        }
        else {
            if (countryValue === "") {
                invalidList[0] = true;
            }
            else if (invalidList[0]) {
                invalidList[0] = false;
            }
            if (provinceValue === "") {
                invalidList[1] = true;
            }
            else if (invalidList[1]) {
                invalidList[1] = false;
            }
            setInvalidMaterialFormAdd(invalidList);
        }
    }

    const onClickCheckFormEditData = (index) => (e) => {
        var invalidList = [...invalidMaterialFormEdit];
        var countryValue = document.getElementById("edit-country-name-" + index).value;
        var provinceValue = document.getElementById("edit-province-name-" + index).value;
        if (getIsValidForm("edit-needs-validation") && countryValue !== "" && provinceValue !== "") {
            setIsConfirmEdit(!isConfirmEdit);
            if (invalidList[0] || invalidList[1]) {
                if (invalidList[0]) {
                    invalidList[0] = false;
                }
                if (invalidList[1]) {
                    invalidList[1] = false;
                }
                setInvalidMaterialFormEdit(invalidList);
            }
        }
        else {
            if (countryValue === "") {
                invalidList[0] = true;
            }
            else if (invalidList[0]) {
                invalidList[0] = false;
            }
            if (provinceValue === "") {
                invalidList[1] = true;
            }
            else if (invalidList[1]) {
                invalidList[1] = false;
            }
            setInvalidMaterialFormEdit(invalidList);
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

    const collapseAddForm = () => {
        return (
            <CCollapse show={isShowAddForm}>
                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                    width: ' 100%'
                }}>
                    <CCard className='p-3'>
                        {dataAddForm()}
                    </CCard>
                </Box>
            </CCollapse >
        )
    }

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
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </CCol>
                    </CRow>
                </div>
            )
        }
        else if (countryList.length && provinceList.length && districtList.length && zoneList.length && zoneDetailList.length && postCodeList.length) {
            return (
                <CForm className="add-needs-validation" noValidate>

                    <CRow>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[0]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        id="add-shipto-code"
                                        maxLength="10"
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[1]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        id="add-en-name"
                                        maxLength="50"
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[2]}</CLabel>
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
                        <CCol md="6">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[3]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        id="add-address"
                                        maxLength="255"
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol md="4">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[4]}</CLabel>
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
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[5]}</CLabel>
                                {/* <CSelect id="add-country-name" style={{ height: Constant.styleHeightField }} required onChange={handleChangeAddSelect("country")}>
                                    <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                    {showSelectList("country")}
                                </CSelect>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <Autocomplete
                                        id="add-country-name"
                                        options={countryList}
                                        size="small"
                                        getOptionLabel={(option) => (`${option.countryNameThai}`)}
                                        // style={{ width: 300 }}   
                                        onChange={handleChangeAddSelect("country")}
                                        renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{option.countryNameThai}</Typography>)}
                                        renderInput={(params) => {
                                            params.inputProps.className = classes.autoCompleteInputLabel;
                                            return (
                                                <TextField
                                                    size="small"

                                                    error={invalidMaterialFormAdd[0]}
                                                    {...params}
                                                    label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                                    helperText={invalidMaterialFormAdd[0] ? <Typography className={classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                                    variant="outlined"
                                                />
                                            )
                                        }}
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[6]}</CLabel>
                                {/* <CSelect id="add-province-name" style={{ height: Constant.styleHeightField }} required onChange={handleChangeAddSelect("province")}>
                                    <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                    {showSelectList("province")}
                                </CSelect>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <Autocomplete
                                        id="add-province-name"
                                        options={slProvinceList}
                                        size="small"
                                        getOptionLabel={(option) => (`${option.provinceName1}`)}
                                        // style={{ width: 300 }}   
                                        onChange={handleChangeAddSelect("province")}
                                        renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{option.provinceName1}</Typography>)}
                                        renderInput={(params) => {
                                            params.inputProps.className = classes.autoCompleteInputLabel;
                                            return (
                                                <TextField
                                                    size="small"

                                                    error={invalidMaterialFormAdd[1]}
                                                    {...params}
                                                    label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                                    helperText={invalidMaterialFormAdd[1] ? <Typography className={classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                                    variant="outlined"
                                                />
                                            )
                                        }}
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[7]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CSelect id="add-district-name" style={{ height: Constant.styleHeightField }} onChange={handleChangeAddSelect("district")}>
                                        <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                        <option value="">{Constant.txtFormAllSelected}</option>
                                        {showSelectList("district")}
                                    </CSelect>
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[8]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        id="add-zone-name"
                                        value={Object.keys(objZoneList).length ? objZoneList.zoneName : ""}
                                        disabled
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[9]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        id="add-post-code"
                                        value={Object.keys(objPostCodeList).length ? objPostCodeList.postCode : ""}
                                        disabled
                                        required
                                    />
                                </Box>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <CLabel>{Constant.arrFieldMasterShipTo[10]}</CLabel>
                                <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                    width: ' 100%'
                                }}>
                                    <CInput
                                        type="text"
                                        style={{ height: Constant.styleHeightField }}
                                        id="add-contract-name"
                                        maxLength="100"
                                    />
                                </Box>
                            </CFormGroup>
                        </CCol>
                        <CCol md="3">
                            <CFormGroup>
                                <br />
                                <CCol md="8">
                                    <CFormGroup variant="checkbox" className="checkbox">
                                        <CLabel className='mt-1' class="align-top" variant="checkbox" htmlFor="add-is-export">
                                            &nbsp; {Constant.arrFieldMasterShipTo[11]}
                                        </CLabel>
                                        &nbsp;
                                        <CSwitch id="add-is-export" className={'mx-1'} variant={'3d'} color={'success'} defaultChecked={false} labelOn={'\u2713'} labelOff={'\u2715'} />

                                        {/* <CInputCheckbox
                                            id="add-is-export"
                                        />
                                        <CLabel variant="checkbox" className="form-check-label" htmlFor="add-is-export">{Constant.arrFieldMasterShipTo[11]}</CLabel> */}
                                    </CFormGroup>
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow className='justify-content-center'>
                        <CCol md='2'>
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
                            <br />
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
            if (!allQry) {
                querySelector("all", {}, "edit", index);
                setAllQry(true);
            }
            return (
                <CRow className="justify-content-center">
                    <CCol md="10">
                        <CForm className="edit-needs-validation" noValidate>
                            <CRow>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[0]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.shipToCode}
                                                onChange={handleChangeUpdateField("shipToCode")}
                                                maxLength="10"
                                                required
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[1]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.shipToNameEng}
                                                onChange={handleChangeUpdateField("shipToNameEng")}
                                                maxLength="50"
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[2]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.shipToNameThai}
                                                onChange={handleChangeUpdateField("shipToNameThai")}
                                                maxLength="50"
                                                required
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="6" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[3]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.address}
                                                onChange={handleChangeUpdateField("address")}
                                                maxLength="255"
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="4" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[4]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.shipToDesc}
                                                onChange={handleChangeUpdateField("shipToDesc")}
                                                maxLength="255"
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[5]}</CLabel>
                                        {/* <CSelect id={"edit-country-name-" + index} style={{ height: Constant.styleHeightField }} onChange={handleChangeEditSelect(index, "country")} required>
                                    <option selected hidden value={data.countryId}>{data.countryName}</option>
                                    {showSelectList("country")}
                                </CSelect> */}
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <Autocomplete
                                                id={"edit-country-name-" + index}
                                                options={countryList}
                                                size="small"
                                                defaultValue={countryList.find((x) => x.countryNameThai === data.countryName)}
                                                getOptionLabel={(option) => (`${option.countryNameThai}`)}
                                                // style={{ width: 300 }}   
                                                onChange={handleChangeEditSelect(index, "country")}
                                                renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{option.countryNameThai}</Typography>)}
                                                renderInput={(params) => {
                                                    params.inputProps.className = classes.autoCompleteInputLabel;
                                                    return (
                                                        <TextField
                                                            size="small"

                                                            error={invalidMaterialFormEdit[0]}
                                                            {...params}
                                                            label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                                            helperText={invalidMaterialFormEdit[0] ? <Typography className={classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                                            variant="outlined"
                                                        />
                                                    )
                                                }}
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[6]}</CLabel>
                                        {/* <CSelect id={"edit-province-name-" + index} style={{ height: Constant.styleHeightField }} onChange={handleChangeEditSelect(index, "province")} required>
                                    <option selected hidden value={data.provinceId != null ? data.provinceId : ""}>{data.provinceName != "" ? data.provinceName : Constant.txtformPlaceholderSelected}</option>
                                    {showSelectList("province")}
                                </CSelect> */}
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <Autocomplete
                                                id={"edit-province-name-" + index}
                                                options={slProvinceList}
                                                size="small"
                                                defaultValue={provinceList.find((x) => x.provinceName1 === data.provinceName)}
                                                getOptionLabel={(option) => (`${option.provinceName1}`)}
                                                // style={{ width: 300 }}   
                                                onChange={handleChangeEditSelect(index, "province")}
                                                renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{option.provinceName1}</Typography>)}
                                                renderInput={(params) => {
                                                    params.inputProps.className = classes.autoCompleteInputLabel;
                                                    return (
                                                        <TextField
                                                            size="small"

                                                            error={invalidMaterialFormEdit[1]}
                                                            {...params}
                                                            label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                                            helperText={invalidMaterialFormEdit[1] ? <Typography className={classes.autoCompleteInputHelperText}>{Constant.inValidNullMessage}</Typography> : null}
                                                            variant="outlined"
                                                        />
                                                    )
                                                }}
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[7]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CSelect id={"edit-district-name-" + index} style={{ height: Constant.styleHeightField }} onChange={handleChangeEditSelect(index, "district")}>
                                                <option selected hidden value={data.districtId != null ? data.districtId : ""}>{data.districtName != "" ? data.districtName : Constant.txtformPlaceholderSelected}</option>
                                                <option value="">{Constant.txtFormAllSelected}</option>
                                                {showSelectList("district")}
                                            </CSelect>
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[8]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.zoneName}
                                                disabled
                                                required
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[9]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.postCode ? data.postCode : ""}
                                                disabled
                                                required
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[10]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                value={data.contractName}
                                                onChange={handleChangeUpdateField("contractName")}
                                                maxLength="255"
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>

                                        <CCol md="8">
                                            <CFormGroup variant="checkbox" className="checkbox">
                                                <CLabel className='mt-1' class="align-top" variant="checkbox" onClick={handleChangeUpdateField("isExport")}>
                                                    &nbsp; {Constant.arrFieldMasterShipTo[11]}
                                                </CLabel>
                                                &nbsp;
                                                <CSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={handleChangeUpdateField("isExport")} value={data.isExport} checked={data.isExport} labelOn={'\u2713'} labelOff={'\u2715'} />
                                                {/* <CInputCheckbox
                                                    checked={data.isExport}
                                                    onChange={handleChangeUpdateField("isExport")}
                                                />
                                                <CLabel variant="checkbox" className="form-check-label" onClick={handleChangeUpdateField("isExport")}>{Constant.arrFieldMasterShipTo[11]}</CLabel> */}
                                            </CFormGroup>
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3" className="text-left">
                                    <CFormGroup>

                                        <CCol md="8">
                                            <CFormGroup variant="checkbox" className="checkbox">
                                                <CLabel className='mt-1' class="align-top" variant="checkbox"  onClick={handleChangeUpdateField("isActive")}>
                                                    &nbsp; {Constant.txtFormisActive}
                                                </CLabel>
                                                &nbsp;
                                                <CSwitch className={'mx-1'} variant={'3d'} color={'success'} onChange={handleChangeUpdateField("isActive")} value={data.isActive} checked={data.isActive} labelOn={'\u2713'} labelOff={'\u2715'} />
                                                {/* <CInputCheckbox
                                                    checked={data.isActive}
                                                    onChange={handleChangeUpdateField("isActive")}
                                                /> */}
                                                {/* <CLabel variant="checkbox" className="form-check-label" onClick={handleChangeUpdateField("isActive")}>{Constant.txtFormisActive}</CLabel> */}
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
                                        <CButton className="editbutton" size={Constant.btAddSize} color="primary" block onClick={onClickCheckFormEditData(index)}>
                                            {Constant.btEditData}
                                        </CButton>
                                    </Box>
                                </CCol>
                                <CCol xs="12" sm="6" md="2">
                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                        width: ' 100%'
                                    }}>

                                        <CButton className="editbutton" size={Constant.btAddSize} color="danger" onClick={handleChangeConfirmDelete(data.shipToId)} block>
                                            {Constant.btDeleteData}
                                        </CButton>
                                    </Box>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCol>
                </CRow >
            )
        }
    }

    const cardSearchForm = () => (
        <CForm >
            <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                width: ' 100%'
            }}>
                <CCard xs="12" sm="6" md="12">
                    <CCardHeader id="headingThree" class="d-flex justify-content-between">
                        <CButton
                            // block
                            color="link"
                            className="text-left m-0 p-0"
                            onClick={() => setAccordion(accordion === 1 ? null : 1)}
                        >
                            <CRow className="ml-2 mt-1 p-0">
                                <h6 className="ml-2 mt-1 p-0">ค้นหา</h6>
                                {/* {showtext()} */}
                            </CRow>
                        </CButton>
                        <CButton
                            // block
                            color="link"
                            // className="text-right "
                            onClick={() => setAccordion(accordion === 1 ? null : 1)}
                        >
                            <CIcon className="collap-icon" name={accordion === 1 ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                        </CButton>
                    </CCardHeader>
                    <CCollapse show={accordion === 1}>

                        <CCardBody >
                            <CRow>
                                <CCol md="12">
                                    <CForm className="search-needs-validation" noValidate>
                                        <CRow>
                                            <CCol md="3">
                                                <CFormGroup>
                                                    <CLabel>{Constant.arrFieldMasterShipTo[0]}</CLabel>
                                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                        width: ' 100%'
                                                    }}>
                                                        <CInput
                                                            type="text"
                                                            style={{ height: Constant.styleHeightField }}
                                                            id="search-shipto-code"
                                                            maxLength="10"
                                                            onChange={handleChangeKeyForSearch}
                                                            required
                                                        />
                                                    </Box>
                                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="3">
                                                <CFormGroup>
                                                    <CLabel>{Constant.arrFieldMasterShipTo[1]}</CLabel>
                                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                        width: ' 100%'
                                                    }}>
                                                        <CInput
                                                            type="text"
                                                            style={{ height: Constant.styleHeightField }}
                                                            id="search-en-name"
                                                            maxLength="50"
                                                            onChange={handleChangeKeyForSearch}
                                                            required
                                                        />
                                                    </Box>
                                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                                </CFormGroup>
                                            </CCol>
                                            <CCol md="3">
                                                <CFormGroup>
                                                    <CLabel>{Constant.arrFieldMasterShipTo[2]}</CLabel>
                                                    <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                                        width: ' 100%'
                                                    }}>
                                                        <CInput
                                                            type="text"
                                                            style={{ height: Constant.styleHeightField }}
                                                            id="search-th-name"
                                                            maxLength="50"
                                                            onChange={handleChangeKeyForSearch}
                                                            required
                                                        />
                                                    </Box>
                                                    <CInvalidFeedback>{Constant.inValidNullMessage}</CInvalidFeedback>
                                                </CFormGroup>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCol>
                                <CCol md="6">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[3]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                id="search-address"
                                                maxLength="255"
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="4">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[4]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                id="search-description"
                                                maxLength="255"
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[5]}</CLabel>
                                        {/* <CSelect id="search-country-name" style={{ height: Constant.styleHeightField }}>
                                    <option value="">{Constant.txtFormAllSelected}</option>
                                    {showSelectList("search-country")}
                                </CSelect>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <Autocomplete
                                                id="search-country-name"
                                                options={countryList}
                                                size="small"
                                                getOptionLabel={(option) => (`${option.countryNameThai}`)}
                                                // style={{ width: 300 }}   
                                                onChange={handleChangeSearchSelect("country")}
                                                renderOption={(option) => (<Typography className={classes.autoCompleteRenderOptions}>{option.countryNameThai}</Typography>)}
                                                renderInput={(params) => {
                                                    params.inputProps.className = classes.autoCompleteInputLabel;
                                                    return (
                                                        <TextField
                                                            size="small"

                                                            {...params}
                                                            label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                                            variant="outlined"
                                                        />
                                                    )
                                                }}
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[6]}</CLabel>
                                        {/* <CSelect id="search-province-name" style={{ height: Constant.styleHeightField }}>
                                    <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                    <option value="">{Constant.txtFormAllSelected}</option>
                                    {showSelectList("search-province")}
                                </CSelect>
                                <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback> */}
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <Autocomplete
                                                id="search-province-name"
                                                options={provinceList}
                                                size="small"
                                                getOptionLabel={(option) => (`${option.provinceName1}`)}
                                                // style={{ width: 300 }}   
                                                onChange={handleChangeSearchSelect("province")}
                                                renderOption={(option) => {
                                                    var result = countryList.find((x) => x.countryId === option.countryId);
                                                    if (result) {
                                                        return (<Typography className={classes.autoCompleteRenderOptions}>{`[${result.countryNameThai}] ${option.provinceName1}`}</Typography>)
                                                    }
                                                    else {
                                                        return (<Typography className={classes.autoCompleteRenderOptions}>{`${option.provinceName1}`}</Typography>)
                                                    }
                                                }}
                                                renderInput={(params) => {
                                                    params.inputProps.className = classes.autoCompleteInputLabel;
                                                    return (
                                                        <TextField
                                                            size="small"

                                                            {...params}
                                                            label={<Typography className={classes.autoCompleteInputLabel}>{Constant.txtformPlaceholderSelected}</Typography>}
                                                            variant="outlined"
                                                        />
                                                    )
                                                }
                                                }
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[7]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CSelect id="search-district-name" style={{ height: Constant.styleHeightField }} onChange={handleChangeSearchSelect("district")}>
                                                <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                                <option value="">{Constant.txtFormAllSelected}</option>
                                                {districtList.map((x) => {
                                                    var result = provinceList.find((y) => y.provinceId === x.provinceId);
                                                    if (result) {
                                                        return (<option value={x.districtId}>{`[${result.provinceName1}] ${x.districtName1}`}</option>)
                                                    }
                                                    else {
                                                        return (<option value={x.districtId}>{x.districtName1}</option>)
                                                    }
                                                })}
                                            </CSelect>
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[8]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CSelect id="search-zone-name" style={{ height: Constant.styleHeightField }}>
                                                <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                                <option value="">{Constant.txtFormAllSelected}</option>
                                                {showSelectList("search-zone")}
                                            </CSelect>
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[9]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                id="search-post-code"
                                                maxLength="5"
                                            />
                                        </Box>
                                        <CInvalidFeedback>{Constant.inValidNullSelected}</CInvalidFeedback>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[10]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CInput
                                                type="text"
                                                style={{ height: Constant.styleHeightField }}
                                                id="search-contract-name"
                                                maxLength="100"
                                            />
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol md="3">
                                    <CFormGroup>
                                        <CLabel>{Constant.arrFieldMasterShipTo[11]}</CLabel>
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CSelect id="search-is-export" style={{ height: Constant.styleHeightField }}>
                                                <option selected hidden value="">{Constant.txtformPlaceholderSelected}</option>
                                                <option value="">{Constant.txtFormAllSelected}</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </CSelect>
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CRow className="row justify-content-center">
                                <CCol xs="10" sm="6" md="2">
                                    <CFormGroup>
                                        <br />
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CButton size={Constant.btSeacrhSize} block color="warning" onClick={onclickSearchData}>
                                                {Constant.btSearchData}
                                            </CButton>
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="10" sm="6" md="2">
                                    <CFormGroup>
                                        <br />
                                        <Box className='border-set' component={Grid} item boxShadow={1} xs={{
                                            width: ' 100%'
                                        }}>
                                            <CButton size={Constant.btSeacrhSize} block color="danger" onClick={onClickClearDataForSearch}>
                                                {Constant.btClearData}
                                            </CButton>
                                        </Box>
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                        </CCardBody>
                    </CCollapse>
                </CCard>
            </Box>


        </CForm>

    )



    const dataTable = () => (
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
                    sorter
                    striped
                    pagination
                    scopedSlots={{
                        'isExport':
                            (data) => (
                                <td className="py-2 text-center">
                                    {data.isExport ? (
                                        <CIcon name="cil-check-circle" style={{ color: 'green' }} size="2xl" />
                                    ) : (
                                        <CIcon name="cil-x-circle" style={{ color: 'red' }} size="2xl" />
                                    )}
                                </td>
                            ),
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
                                            block
                                            onClick={() => { toggleDetails(index, data.shipToId) }}
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
    )

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
                                    <h3 className="headertable">{Constant.txtMasterShipTo}</h3>
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

                            {cardSearchForm()}

                            {dataTable()}

                        </CCardBody>
                    </CCard>
                </CCol>
                {allModal()}
            </CRow>
        )
    }
}
