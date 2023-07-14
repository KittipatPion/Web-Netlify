import ApiBaseHelper from "../services/ApiBaseHelper";
import ApiController from "../services/ApiController";

class Repository {
  //****************************** Get Data ****************************** */
  /** Master Base Combo Box Item */
  fetchGetComboBoxListByGroupNo(txtGroupNo = "") {
    var newObj = {
      GroupNo: txtGroupNo,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetComboBoxListByGroupNo,
      newObj
    );
  }
  fetchGetComboBoxNameOnlyListByGroupNo(txtGroupNo = "") {
    var newObj = {
      GroupNo: txtGroupNo,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetComboBoxNameOnlyListByGroupNo,
      newObj
    );
  }

  /** Master Authentication */
  fetchGetUserGroupAuthenListById(index) {
    var newObj = {
      UserGroupId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetUserGroupAuthenListById,
      newObj
    );
  }

  /** Master Location */
  fetchGetCountryList() {
    return ApiBaseHelper.postData(ApiController._urlGetCountryList);
  }
  fetchGetProvinceList() {
    return ApiBaseHelper.postData(ApiController._urlGetProvinceList);
  }
  fetchGetDistrictList() {
    return ApiBaseHelper.postData(ApiController._urlGetDistrictList);
  }
  fetchGetZoneList() {
    return ApiBaseHelper.postData(ApiController._urlGetZoneList);
  }
  fetchGetZoneListById(index) {
    var newObj = {
      zoneId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetZoneListById,
      newObj
    );
  }
  fetchGetZoneDetailList() {
    return ApiBaseHelper.postData(ApiController._urlGetZoneDetailList);
  }
  fetchGetZoneDetailListById(index = []) {
    var newObj = {
      zoneId: index[0],
      provinceId: index[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetZoneDetailListById,
      newObj
    );
  }
  fetchGetZoneDetailOtherList() {
    return ApiBaseHelper.postData(ApiController._urlGetZoneDetailOtherList);
  }
  fetchGetSourceList() {
    return ApiBaseHelper.postData(ApiController._urlGetSourceList);
  }
  fetchGetSourceNameOnlyList() {
    return ApiBaseHelper.postData(ApiController._urlGetSourceNameOnlyList);
  }
  fetchGetSourceListById(index) {
    var newObj = {
      sourceId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetSourceListById,
      newObj
    );
  }
  fetchGetSourcePlantList() {
    return ApiBaseHelper.postData(ApiController._urlGetSourcePlantList);
  }
  fetchGetSourcePlantListById(index = []) {
    var newObj = {
      sourceId: index[0],
      plant: index[1],
      storageLocation: index[2],
      siteNo: index[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetSourcePlantListById,
      newObj
    );
  }
  fetchGetShipToList(obj = []) {
    var newObj = {
      shipToCode: obj[0],
      shipToNameEng: obj[1],
      shipToNameThai: obj[2],
      address: obj[3],
      shipToDesc: obj[4],
      countryId: obj[5],
      provinceId: obj[6],
      districtId: obj[7],
      zoneId: obj[8],
      postCode: obj[9],
      contractName: obj[10],
      isExport: obj[11],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipToList,
      newObj
    );
  }
  fetchGetShipToListById(index) {
    var newObj = {
      shipToId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipToListById,
      newObj
    );
  }
  fetchGetShipToOtherList() {
    return ApiBaseHelper.postData(ApiController._urlGetShipToOtherList);
  }
  fetchGetCYPlaceList() {
    return ApiBaseHelper.postData(ApiController._urlGetCYPlaceList);
  }
  fetchGetCYPlaceListById(index) {
    var newObj = {
      cyplaceId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCYPlaceListById,
      newObj
    );
  }
  fetchGetPostCodeList() {
    return ApiBaseHelper.postData(ApiController._urlGetPostCodeList);
  }
  fetchGetPostCodeListById(index = []) {
    var newObj = {
      postCodeId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetPostCodeListById,
      newObj
    );
  }
  fetchGetPostCodeOtherList() {
    return ApiBaseHelper.postData(ApiController._urlGetPostCodeOtherList);
  }

  /** Master Logistics */
  fetchGetTransporterNameOnlyList() {
    return ApiBaseHelper.postData(ApiController._urlGetTransporterNameOnlyList);
  }
  fetchGetTruckTypeList() {
    return ApiBaseHelper.postData(ApiController._urlGetTruckTypeList);
  }
  fetchGetTruckTypeNameOnlyList() {
    return ApiBaseHelper.postData(ApiController._urlGetTruckTypeNameOnlyList);
  }
  fetchGetTruckTypeListById(index) {
    var newObj = {
      truckTypeId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTruckTypeListById,
      newObj
    );
  }

  /** Master Contract */
  fetchGetContractDomesticList(obj = []) {
    var newObj = {
      contractNo: obj[0],
      sourceId: obj[1],
      transporterId: obj[2],
      truckTypeId: obj[3],
      fuelTypeId: obj[4],
      rateTypeId: obj[5],
      unloadTypeId: obj[6],
      packageType: obj[7],
      minQty: obj[8],
      maxQty: obj[9],
      refDocNo: obj[10],
      minTonRate: obj[11],
      contractDate: obj[12],
      contractYear: obj[13],
      contractStatus: obj[14],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetContractDomesticList,
      newObj
    );
  }
  fetchGetContractDomesticListById(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetContractDomesticListById,
      newObj
    );
  }
  fetchGetContractDomesticOtherList() {
    return ApiBaseHelper.postData(
      ApiController._urlGetContractDomesticOtherList
    );
  }
  fetchGetContractDomesticForSearchList() {
    return ApiBaseHelper.postData(
      ApiController._urlGetContractDomesticForSearchList
    );
  }
  fetchGetDomFuelRateList() {
    return ApiBaseHelper.postData(ApiController._urlGetDomFuelRateList);
  }
  fetchGetDomMultiDropRateList() {
    return ApiBaseHelper.postData(ApiController._urlGetDomMultiDropRateList);
  }
  fetchGetDomOverNightRateList() {
    return ApiBaseHelper.postData(ApiController._urlGetDomOverNightRateList);
  }

  /** Master Expenses */
  fetchGetVatList() {
    return ApiBaseHelper.postData(ApiController._urlGetVatList);
  }

  /** Transaction */
  /** Transaction Domestic */
  fetchGetExtraChargeNameOnlyList() {
    return ApiBaseHelper.postData(ApiController._urlGetExtraChargeNameOnlyList);
  }
  fetchGetDomDeliveryList(obj = []) {
    var newObj = {
      deliveryDateStart: obj[0],
      deliveryDateEnd: obj[1],
      monthYear: obj[2],
      shipmentNo: obj[3],
      deliveryNo: obj[4],
      saleOrderNo: obj[5],
      sourceId: obj[6],
      transaporterId: obj[7],
      truckTypeId: obj[8],
      eDPStatus: obj[9],
      shipmentStatus: obj[10],
      paymentStatus: obj[11],
      SummaryStatus: obj[12],
      ShipmentType: obj[13],
      CompanyId: obj[14],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomDeliveryList,
      newObj
    );
  }
  fetchGetDomDeliveryListById(obj = []) {
    var newObj = {
      shipmentNo: obj[0],
      deliveryNo: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomDeliveryListById,
      newObj
    );
  }
  fetchGetReCalculateTransportRate(obj = []) {
    var newObj = {
      ShipmentNo: obj[0],
      DeliveryNo: obj[1],
      UserId: obj[2],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetReCalculateTransportRate,
      newObj
    );
  }
  fetchGetMasterExtraChargeListByGroupType(obj = []) {
    var newObj = {
      IsExport: obj[0],
      ExtraChargeTypeId: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetMasterExtraChargeListByGroupType,
      newObj
    );
  }
  fetchGetShipmentExtraChargeListById(index) {
    var newObj = {
      shipmentNo: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentExtraChargeListById,
      newObj
    );
  }
  fetchGetDomCreditDebitList(obj = []) {
    var newObj = {
      DeliveryDateStart: obj[0],
      DeliveryDateEnd: obj[1],
      ShipmentNo: obj[2],
      TranspoterId: obj[3],
      TruckTypeId: obj[4],
      ExtraChargeType: obj[5],
      ExtraChargeId: obj[6],
      CreditDebitStatus: obj[7],
      IsViewData: obj[8],
      TranspoterTypeId: obj[9],
      ExtraChargeGroupId: obj[10],
      IsTransfer: obj[11],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomCreditDebitList,
      newObj
    );
  }
  fetchGetDomDeliveryItemList(obj = []) {
    var newObj = {
      DeliveryDateStart: obj[0],
      DeliveryDateEnd: obj[1],
      MonthYear: obj[2],
      ShipmentNo: obj[3],
      DeliveryNo: obj[4],
      SaleOrderNo: obj[5],
      LoadingLocationId: obj[6],
      TransaporterId: obj[7],
      TruckTypeId: obj[8],
      EDPStatus: obj[9],
      ShipmentStatus: obj[10],
      PaymentStatus: obj[11],
      SummaryStatus: obj[12],
      ShipmentType: obj[13],
      CompanyId: obj[14],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomDeliveryItemList,
      newObj
    );
  }
  fetchGetReCalculateMultiShipment(obj = []) {
    var newObj = {
      ShipmentList: obj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetReCalculateMultiShipment,
      newObj
    );
  }
  fetchGetShipmentNonSOById(index) {
    var newObj = {
      ShipmentNo: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentNonSOById,
      newObj
    );
  }
  fetchGetShipmentNoByShipmentId(index) {
    var newObj = {
      ShipmentId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentNoByShipmentId,
      newObj
    );
  }

  /** Transaction Export */
  fetchGetExpDeliveryList(obj = []) {
    var newObj = {
      DeliveryDateStart: obj[0],
      DeliveryDateEnd: obj[1],
      MonthYear: obj[2],
      ShipmentNo: obj[3],
      DeliveryNo: obj[4],
      SaleOrderNo: obj[5],
      LoadingLocationId: obj[6],
      TransaporterId: obj[7],
      ShippingId: obj[8],
      TruckTypeId: obj[9],
      EDPStatus: obj[10],
      ShipmentStatus: obj[11],
      PaymentStatus: obj[12],
      SummaryStatus: obj[13],
      ExportModeId: obj[14],
      CompanyId: obj[15],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExpDeliveryList,
      newObj
    );
  }
  fetchGetExpDeliveryListById(obj = []) {
    var newObj = {
      ShipmentNo: obj[0],
      DeliveryNo: obj[1],
      SaleOrderNo: obj[2],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExpDeliveryListById,
      newObj
    );
  }
  fetchGetShipmentExtraChargeListBySaleOrder(index) {
    var newObj = index;
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentExtraChargeListBySaleOrder,
      newObj
    );
  }
  fetchGetExpTransportRateById(index) {
    var newObj = index;
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExpTransportRateById,
      newObj
    );
  }
  fetchGetReCalculateExpTransportRate(obj = []) {
    var newObj = {
      SaleOrderNo: obj[0],
      UserId: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetReCalculateExpTransportRate,
      newObj
    );
  }

  fetchGetReCalculateTransferTransportRate(obj = []) {
    var newObj = {
      ShipmentNo: obj[0],
      UserId: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetReCalculateTransferTransportRate,
      newObj
    );
  }

  fetchGetExpDeliveryItemList(obj = []) {
    var newObj = {
      DeliveryDateStart: obj[0],
      DeliveryDateEnd: obj[1],
      MonthYear: obj[2],
      ShipmentNo: obj[3],
      DeliveryNo: obj[4],
      SaleOrderNo: obj[5],
      LoadingLocationId: obj[6],
      TransaporterId: obj[7],
      ShippingId: obj[8],
      TruckTypeId: obj[9],
      EDPStatus: obj[10],
      ShipmentStatus: obj[11],
      PaymentStatus: obj[12],
      SummaryStatus: obj[13],
      ExportModeId: obj[14],
      CompanyId: obj[15],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExpDeliveryItemList,
      newObj
    );
  }
  fetchGetReCalculateMultiSaleOrder(obj = []) {
    var newObj = {
      SaleOrderList: obj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetReCalculateMultiSaleOrder,
      newObj
    );
  }
  fetchGetShipmentListBySaleOrder(index) {
    var newObj = index;
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentListBySaleOrder,
      newObj
    );
  }

  /** Transaction Payment */
  fetchGetPaymentUserListByUserType(price, type) {
    console.log(price);
    var newObj = {
      UserType: type,
      Price: price,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetPaymentUserListByUserType,
      newObj
    );
  }
  fetchCancelPaymentById(index, isExport) {
    var newObj = {
      PaymentId: index,
      IsExport: isExport,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlCancelPaymentById,
      newObj
    );
  }

  /** Other Function */
  fetchGetAutoStartEndDateTime() {
    return ApiBaseHelper.postData(ApiController._urlGetAutoStartEndDateTime);
  }
  fetchDownloadFile(txtStreamFile) {
    return ApiBaseHelper.postFileRequestBody(
      ApiController._urlDownloadFile,
      txtStreamFile
    );
  }

  fetchCreatePaymentDownloadFile(txtStreamFile, fileType, name) {
    var newObj = {
      FileName: "",
      FileType: "",
      Guid: "",
    };

    newObj.Guid = txtStreamFile;
    newObj.FileName = name;
    newObj.FileType = fileType;

    console.log(newObj);

    return ApiBaseHelper.postFileRequestBody(
      ApiController._urlCreatePaymentDownloadFile,
      newObj
    );
  }

  //****************************** Add Data ****************************** */
  /** Master Location */
  fetchAddZoneList(obj = []) {
    var newObj = {
      zoneName: obj[0],
      isActive: obj[1],
      createBy: obj[2],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddZoneList,
      newObj
    );
  }
  fetchAddZoneDetailList(obj = []) {
    var newObj = {
      zoneId: obj[0],
      provinceId: obj[1],
      isActive: obj[2],
      createBy: obj[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddZoneDetailList,
      newObj
    );
  }
  fetchAddSourceList(obj = []) {
    var newObj = {
      sourceCode: obj[0],
      sourceNameEng: obj[1],
      sourceNameThai: obj[2],
      sourceDesc: obj[3],
      createBy: obj[4],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddSourceList,
      newObj
    );
  }
  fetchAddSourcePlantList(obj = []) {
    var newObj = {
      sourceId: obj[0],
      plant: obj[1],
      storageLocation: obj[2],
      siteNo: obj[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddSourcePlantList,
      newObj
    );
  }
  fetchAddShipToList(obj = []) {
    var newObj = {
      shipToCode: obj[0],
      shipToNameEng: obj[1],
      shipToNameThai: obj[2],
      address: obj[3],
      shipToDesc: obj[4],
      countryId: obj[5],
      provinceId: obj[6],
      districtId: obj[7],
      zoneId: obj[8],
      postCode: obj[9],
      contractName: obj[10],
      isExport: obj[11],
      isActive: obj[12],
      createBy: obj[13],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddShipToList,
      newObj
    );
  }
  fetchAddCYPlaceList(obj = []) {
    var newObj = {
      cyplaceCode: obj[0],
      cyplaceNameEng: obj[1],
      cyplaceNameThai: obj[2],
      description: obj[3],
      isActive: obj[4],
      createBy: obj[5],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddCYPlaceList,
      newObj
    );
  }
  fetchAddPostCodeList(obj = []) {
    var newObj = {
      postCode: obj[0],
      provinceId: obj[1],
      districtId: obj[2],
      createBy: obj[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddPostCodeList,
      newObj
    );
  }

  /** Master Logistics */
  fetchAddTruckTypeList(obj = []) {
    var newObj = {
      truckTypeCode: obj[0],
      truckTypeName: obj[1],
      truckTypeDesc: obj[2],
      loadWeight: obj[3],
      isActive: obj[4],
      createBy: obj[5],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddTruckTypeList,
      newObj
    );
  }

  /** Master Contract */
  fetchAddContractDomesticList(
    header = [],
    fuel = [],
    multidrop = [],
    overnight = [],
    transport = [],
    trucktype = [],
    unload = []
  ) {
    var newObj = {
      contractNo: header[0],
      sourceId: header[1],
      transporterId: header[2],
      truckTypeId: header[3],
      fuelTypeId: header[4],
      rateTypeId: header[5],
      unloadTypeId: header[6],
      packageType: header[7],
      minQty: header[8],
      maxQty: header[9],
      refDocNo: header[10],
      minTonRate: header[11],
      startDate: header[12],
      endDate: header[13],
      fuelRateRemark: header[14],
      contractStatus: header[15],
      createBy: header[16],
      mcontractDomesticFuelRates: [...fuel],
      mcontractDomesticMultiDropRates: [...multidrop],
      mcontractDomesticOverNightRates: [...overnight],
      mcontractDomesticTransportRates: [...transport],
      mcontractDomesticTruckLicenses: [...trucktype],
      mcontractDomesticUnloadRates: [...unload],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddContractDomesticList,
      newObj
    );
  }

  /** Transaction */
  fetchAddShipmentExtraChargeList(obj = []) {
    const formData = new FormData();
    formData.append("ShipmentNo", obj[0]);
    formData.append("ExtraChargeId", obj[1]);
    formData.append("TransporterTypeId", obj[2]);
    formData.append("ExtraChargeType", obj[3]);
    formData.append("ExtraChargeName", obj[4]);
    formData.append("ExtraChargePrice", obj[5]);
    if (obj[6] != null) formData.append("ExtraChargeQty", obj[6]);
    if (obj[7] != null) formData.append("RequestFile", obj[7]);
    if (obj[8] != null) formData.append("FileType", obj[8]);
    if (obj[9] != null) formData.append("RequestName1", obj[9]);
    if (obj[10] != null) formData.append("RequestValue1", obj[10]);
    if (obj[11] != null) formData.append("RequestName2", obj[11]);
    if (obj[12] != null) formData.append("RequestValue2", obj[12]);
    if (obj[13] != null) formData.append("RequestName3", obj[13]);
    if (obj[14] != null) formData.append("RequestValue3", obj[14]);
    if (obj[15] != null) formData.append("RequestName4", obj[15]);
    if (obj[16] != null) formData.append("RequestValue4", obj[16]);
    formData.append("CreateBy", obj[17]);
    formData.append("VatCode", obj[18]);
    formData.append("Vat", obj[19]);
    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlAddShipmentExtraChargeList,
      formData
    );
  }
  fetchAddShipmentExtraChargeMultiDrop(obj = []) {
    const formData = new FormData();
    formData.append("ShipmentNo", obj[0]);
    formData.append("MultiDropDistance", obj[1]);
    formData.append("RequestFile", obj[2]);
    formData.append("FileType", obj[3]);
    formData.append("CreateBy", obj[4]);
    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlAddShipmentExtraChargeMultiDrop,
      formData
    );
  }
  fetchAddShipmentNonSO(obj = [], isExport = false) {
    var newObj = {
      CompanyId: obj[0],
      TransporterId: obj[1],
      DeliveryDate: obj[2],
      ShipToId: obj[3],
      ShipToName: obj[4],
      TruckTypeId: obj[5],
      Qty: obj[6],
      ProductNo: obj[7],
      RefNo: obj[8],
      TransportTypeId: isExport ? obj[9] : 1,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddShipmentNonSO,
      newObj
    );
  }

  //****************************** Edit Data ****************************** */
  /** Master Authentication */
  fetchEditUserGroupAuthenListById(obj = []) {
    var newObj = {
      UserGroupId: obj[0],
      RoleList: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditUserGroupAuthenListById,
      newObj
    );
  }
  fetchResetPasswordUserListById(index) {
    var newObj = {
      UserId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlResetPasswordUserListById,
      newObj
    );
  }
  fetchChangePasswordByAdmin(obj = []) {
    var newObj = {
      UserId: obj[0],
      Password: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlChangePasswordByAdmin,
      newObj
    );
  }
  fetchChangePasswordByUser(obj = []) {
    var newObj = {
      UserId: obj[0],
      NewPassword: obj[1],
      OldPassword: obj[2] ? obj[2] : null,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlChangePasswordByUser,
      newObj
    );
  }

  /** Master Location */
  fetchEditZoneList(obj = []) {
    var newObj = {
      zoneId: obj[0],
      zoneName: obj[1],
      isActive: obj[2],
      updateBy: obj[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditZoneList,
      newObj
    );
  }
  fetchEditZoneDetailList(obj = []) {
    var newObj = {
      zoneId: obj[0],
      provinceId: obj[1],
      isActive: obj[2],
      updateBy: obj[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditZoneDetailList,
      newObj
    );
  }
  fetchEditSourceList(obj = []) {
    var newObj = {
      sourceId: obj[0],
      sourceCode: obj[1],
      sourceNameEng: obj[2],
      sourceNameThai: obj[3],
      sourceDesc: obj[4],
      updateBy: obj[5],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditSourceList,
      newObj
    );
  }
  fetchEditShipToList(obj = []) {
    var newObj = {
      shipToId: obj[0],
      shipToCode: obj[1],
      shipToNameEng: obj[2],
      shipToNameThai: obj[3],
      address: obj[4],
      shipToDesc: obj[5],
      countryId: obj[6],
      provinceId: obj[7],
      districtId: obj[8],
      zoneId: obj[9],
      postCode: obj[10],
      contractName: obj[11],
      isExport: obj[12],
      isActive: obj[13],
      updateBy: obj[14],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditShipToList,
      newObj
    );
  }
  fetchEditCYPlaceList(obj = []) {
    var newObj = {
      cyplaceId: obj[0],
      cyplaceCode: obj[1],
      cyplaceNameEng: obj[2],
      cyplaceNameThai: obj[3],
      description: obj[4],
      isActive: obj[5],
      updateBy: obj[6],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditCYPlaceList,
      newObj
    );
  }
  fetchEditPostCodeList(obj = []) {
    var newObj = {
      postCodeId: obj[0],
      postCode: obj[1],
      provinceId: obj[2],
      districtId: obj[3],
      updateBy: obj[4],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditPostCodeList,
      newObj
    );
  }

  /** Master Logistics */
  fetchEditTruckTypeList(obj = []) {
    var newObj = {
      truckTypeId: obj[0],
      truckTypeCode: obj[1],
      truckTypeName: obj[2],
      truckTypeDesc: obj[3],
      loadWeight: obj[4],
      isActive: obj[5],
      updateBy: obj[6],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditTruckTypeList,
      newObj
    );
  }

  /** Master Contract */
  fetchEditContractDomesticList(obj = {}) {
    // console.log(obj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditContractDomesticList,
      obj
    );
  }

  /** Transaction Delivery List */
  fetchReopenShipmentStatusList(obj = []) {
    var newObj = {
      ShipmentList: obj[0],
      UpdateBy: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlReopenShipmentStatusList,
      newObj
    );
  }
  fetchRejectShipmentStatusList(obj = []) {
    var newObj = {
      ShipmentList: obj[0],
      UpdateBy: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRejectShipmentStatusList,
      newObj
    );
  }
  fetchEditDeliveryStatusList(obj = []) {
    var newObj = {
      ShipmentNo: obj[0],
      ShipmentStatus: obj[1],
      EDPStatus: obj[2],
      PaymentStatus: obj[3],
      UpdateBy: obj[4],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditDeliveryStatusList,
      newObj
    );
  }
  fetchEditShipmentNonSO(obj = [], isExport = false) {
    var newObj = {
      ShipmentId: obj[0],
      CompanyId: obj[1],
      TransporterId: obj[2],
      DeliveryDate: obj[3],
      ShipToId: obj[4],
      ShipToName: obj[5],
      TruckTypeId: obj[6],
      Qty: obj[7],
      ProductNo: obj[8],
      RefNo: obj[9],
      TransportTypeId: isExport ? obj[10] : 1,
    };

    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditShipmentNonSO,
      newObj
    );
  }

  /** Transaction Credit Debit */
  fetchApproveCreditDebitStatusList(arrObj = []) {
    var newObj = {
      ShipmentNoList: arrObj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlApproveCreditDebitStatusList,
      newObj
    );
  }
  fetchRejectCreditDebitStatusList(arrObj = []) {
    var newObj = {
      ShipmentNoList: arrObj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRejectCreditDebitStatusList,
      newObj
    );
  }

  fetchTransferRejectCreditDebitStatusList(arrObj = []) {
    var newObj = {
      ShipmentNoList: arrObj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlTransferRejectCreditDebitStatusList,
      newObj
    );
  }

  /** Transaction Payment List */
  fetchAcceptPaymentList(id) {
    var newObj = {
      PaymentNo: id,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAcceptPaymentList,
      newObj
    );
  }
  fetchVerifyPaymentList(id) {
    var newObj = {
      PaymentNo: id,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlVerifyPaymentList,
      newObj
    );
  }

  fetchApprovePaymentList(arrObj = []) {
    var newObj = {
      PaymentList: arrObj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlApprovePaymentList,
      newObj
    );
  }
  fetchRejectPaymentList(arrObj = []) {
    var newObj = {
      PaymentList: arrObj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRejectPaymentList,
      newObj
    );
  }

  //****************************** Remove Data ****************************** */
  /** Master Location */
  fetchRemoveZoneList(index) {
    var newObj = {
      zoneId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveZoneList,
      newObj
    );
  }
  fetchRemoveZoneDetailList(index = []) {
    var newObj = {
      zoneId: index[0],
      provinceId: index[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveZoneDetailList,
      newObj
    );
  }
  fetchRemoveSourceList(index) {
    var newObj = {
      sourceId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveSourceList,
      newObj
    );
  }
  fetchRemoveSourcePlantList(obj = []) {
    var newObj = {
      sourceId: obj[0],
      plant: obj[1],
      storageLocation: obj[2],
      siteNo: obj[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveSourcePlantList,
      newObj
    );
  }
  fetchRemoveShipToList(index) {
    var newObj = {
      shipToId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveShipToList,
      newObj
    );
  }
  fetchRemoveCYPlaceList(index) {
    var newObj = {
      cyplaceId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveCYPlaceList,
      newObj
    );
  }
  fetchRemovePostCodeList(index) {
    var newObj = {
      postCodeId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemovePostCodeList,
      newObj
    );
  }

  /** Master Logistics */
  fetchRemoveTruckTypeList(index) {
    var newObj = {
      truckTypeId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveTruckTypeList,
      newObj
    );
  }

  fetchCbPaymentTypeList() {
    var newObj = {
      GroupNo: "PaymentTypeID",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }

  fetchCbAll(type) {
    var newObj = {
      GroupNo: type,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbGrApproveList() {
    var newObj = {
      GroupNo: "GrApproveType",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  /** Master Contract */
  fetchRemoveContractDomesticList(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveContractDomesticList,
      newObj
    );
  }

  /** Transaction */

  fetchRemoveShipmentExtraChargeList(obj = []) {
    var newObj = {
      ShipmentNo: obj[0],
      RunningNo: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveShipmentExtraChargeList,
      newObj
    );
  }

  //-----------------------------------------------GAME-------------------------------------------------------------//

  // fetchDistrictList() {
  //     return ApiBaseHelper.postData(ApiController._urlGetDistrictList);
  // }

  /** Login */
  fetchLoginUser(obj = []) {
    var newObj = {
      Domain: obj.Domain,
      Username: obj.Username === undefined ? "" : obj.Username,
      Password: obj.Password === undefined ? "" : obj.Password,
      UniqueId: "",
      OSVersion: "",
      MobileName: "",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetLoginUserData,
      newObj
    );
  }
  //

  fetchGetCountryListExport() {
    return ApiBaseHelper.postData(ApiController._urlGetCountryListExport);
  }

  fecthGetCountryById(countryId) {
    var newObj = {
      CountryId: countryId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCountryListById,
      newObj
    );
  }
  fecthGetProvinceById(provinceId) {
    var newObj = {
      ProvinceId: provinceId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetProvinceListById,
      newObj
    );
  }
  fecthGetDistrictById(districtId) {
    console.log(111111);
    console.log(districtId);
    var newObj = {
      DistrictId: districtId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDistrictListById,
      newObj
    );
  }

  fetchAddCountryList(countryCode, countryNameEng, countryNameThai, isActive) {
    var newObj = {
      CountryCode: countryCode,
      CountryNameEng: countryNameEng,
      CountryNameThai: countryNameThai,
      IsActive: isActive,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddCountryList,
      newObj
    );
  }
  fetchEditCountryList(
    countryId,
    countryCode,
    countryNameEng,
    countryNameThai,
    isActive
  ) {
    var newObj = {
      CountryId: countryId,
      CountryCode: countryCode,
      CountryNameEng: countryNameEng,
      CountryNameThai: countryNameThai,
      IsActive: isActive,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditCountryList,
      newObj
    );
  }
  fetchDeleteCountryList(countryId) {
    var newObj = {
      CountryId: countryId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteCountryList,
      newObj
    );
  }

  fetchAddDistrictList(
    provinceId,
    districtCode,
    districtName1,
    districtName2,
    districtName3,
    districtDesc,
    isActive
  ) {
    var newObj = {
      ProvinceId: provinceId,
      DistrictCode: districtCode,
      DistrictName1: districtName1,
      DistrictName2: districtName2,
      DistrictName3: districtName3,
      DistrictDesc: districtDesc,
      IsActive: isActive,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddDistrictList,
      newObj
    );
  }
  fetchEditDistrictList(
    districtId,
    provinceId,
    districtCode,
    districtName1,
    districtName2,
    districtName3,
    districtDesc,
    isActive
  ) {
    var newObj = {
      DistrictId: districtId,
      ProvinceId: provinceId,
      DistrictCode: districtCode,
      DistrictName1: districtName1,
      DistrictName2: districtName2,
      DistrictName3: districtName3,
      DistrictDesc: districtDesc,
      IsActive: isActive,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditDistrictList,
      newObj
    );
  }
  fetchDeleteDistrictList(districtId) {
    var newObj = {
      DistrictId: districtId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteDistrictList,
      newObj
    );
  }
  fetchGetPorttListById(portId) {
    var newObj = {
      PortId: portId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetPortListById,
      newObj
    );
  }

  fetchAddProvinceList(
    countryId,
    provinceCode,
    runningNo,
    provinceName1,
    provinceName2,
    provinceName3,
    provinceDesc,
    isActive
  ) {
    var newObj = {
      CountryId: countryId,
      RunningNo: runningNo,
      ProvinceCode: provinceCode,
      ProvinceName1: provinceName1,
      ProvinceName2: provinceName2,
      ProvinceName3: provinceName3,
      ProvinceDesc: provinceDesc,
      IsActive: isActive,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddProvinceList,
      newObj
    );
  }
  fetchEditProvinceList(
    provinceId,
    countryId,
    provinceCode,
    provinceName1,
    provinceName2,
    provinceName3,
    provinceDesc,
    isActive
  ) {
    var newObj = {
      ProvinceId: provinceId,
      CountryId: countryId,
      ProvinceCode: provinceCode,
      ProvinceName1: provinceName1,
      ProvinceName2: provinceName2,
      ProvinceName3: provinceName3,
      ProvinceDesc: provinceDesc,
      IsActive: isActive,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditProvinceList,
      newObj
    );
  }
  fetchDeleteProvinceList(provinceId) {
    var newObj = {
      ProvinceId: provinceId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteProvinceList,
      newObj
    );
  }
  fetchPortList() {
    return ApiBaseHelper.postData(ApiController._urlGetPortList);
  }
  fetchAddPortList(PortCode, PortNameThai, PortNameEng, Description, IsActive) {
    var newObj = {
      PortCode: PortCode,
      PortNameThai: PortNameThai,
      PortNameEng: PortNameEng,
      Description: Description,
      IsActive: IsActive,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddPortList,
      newObj
    );
  }
  fetchEditPortList(
    PortId,
    PortCode,
    PortNameThai,
    PortNameEng,
    Description,
    IsActive
  ) {
    var newObj = {
      PortId: PortId,
      PortCode: PortCode,
      PortNameThai: PortNameThai,
      PortNameEng: PortNameEng,
      Description: Description,
      IsActive: IsActive,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditPortList,
      newObj
    );
  }
  fetchDeletePortList(PortId) {
    var newObj = {
      PortId: PortId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeletePortList,
      newObj
    );
  }

  //Logistic//

  fetchTransporterList() {
    return ApiBaseHelper.postData(ApiController._urlGetTransporterList);
  }

  fetchTransporterListForCreate() {
    return ApiBaseHelper.postData(
      ApiController._urlGetTransporterListForCreate
    );
  }

  fetchTransporterRateList() {
    return ApiBaseHelper.postData(ApiController._urlGetTransporterRateList);
  }
  fetchTransporterVatList() {
    return ApiBaseHelper.postData(ApiController._urlGetTransporterVatList);
  }
  fetchTransporterListById(transportId) {
    var newObj = {
      TransporterID: transportId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransporterListById,
      newObj
    );
  }

  fetchTransporterListByMain(transportId) {
    var newObj = {
      TransporterID: transportId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransporterListByMain,
      newObj
    );
  }

  fetchAddTransporterList(obj = [], vat = []) {
    // console.log(obj)
    var newObj = {
      TransporterCode: obj.transporterCode,
      HaulageCode: obj.haulageCode,
      TransporterShortName: obj.TransporterShortName,
      TransporterNameEng: obj.transporterNameEng,
      TransporterNameThai: obj.transporterNameThai,
      TransporterDesc: obj.transporterDesc,
      ContractName: obj.contractName,
      TelNo: obj.telNo,
      TaxNo: obj.taxNo,
      BranchNo: obj.branchNo,
      Email: obj.email,
      Address: obj.address,
      CreditTerm: obj.creditTerm,
      PaymentTypeId: obj.paymentTypeId,
      BankName: obj.bankName,
      AccountNo: obj.accountNo,
      PlaceCheque: obj.placeCheque,
      IsActive: obj.isActive,
      TransporterVats: [...vat],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlInsertTransporterList,
      newObj
    );
  }
  fetchEditTransporterList(obj, transporterVats) {
    console.log(obj);
    var newObj = {
      TransporterId: obj.transporterId,
      TransporterCode: obj.transporterCode,
      HaulageCode: obj.haulageCode,
      TransporterShortName: obj.transporterShortName,
      TransporterNameEng: obj.transporterNameEng,
      TransporterNameThai: obj.transporterNameThai,
      TransporterDesc: obj.transporterDesc,
      ContractName: obj.contractName,
      TelNo: obj.telNo,
      TaxNo: obj.taxNo,
      BranchNo: obj.branchNo,
      Email: obj.email,
      Address: obj.address,
      MainTransporterId: obj.mainTransporterId,
      CreditTerm: obj.creditTerm,
      PaymentTypeId: obj.paymentTypeId,
      BankName: obj.bankName,
      AccountNo: obj.accountNo,
      PlaceCheque: obj.placeCheque,
      IsActive: obj.isActive,
      TransporterVats: transporterVats,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlUpdateTransporterList,
      newObj
    );
  }
  fetchDeleteTransporterList(transporterId) {
    var newObj = {
      TransporterId: transporterId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteTransporterList,
      newObj
    );
  }

  //

  //Domestic//
  fetchTruckLicenseList() {
    return ApiBaseHelper.postData(ApiController._urlGetTruckLicenseList);
  }
  fetchTransportRateList() {
    return ApiBaseHelper.postData(ApiController._urlGetTransportRateList);
  }
  fetchUnloadRateList() {
    return ApiBaseHelper.postData(ApiController._urlGetUnloadRateList);
  }
  fetchCbProvinceAndDistrictList() {
    return ApiBaseHelper.postData(
      ApiController._urlGetCbProvinceAndDistrictList
    );
  }

  fetchDeleteTruckLicense(ContractId, RunningNo) {
    var newObj = {
      ContractId: ContractId,
      RunningNo: RunningNo,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteTruckLicenseList,
      newObj
    );
  }
  fetchDeleteUnload(ContractId, RunningNo) {
    var newObj = {
      ContractId: ContractId,
      RunningNo: RunningNo,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteUnloadList,
      newObj
    );
  }

  fetchDeleteTransportRate(ContractId, RunningNo) {
    var newObj = {
      ContractId: ContractId,
      RunningNo: RunningNo,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteTransportRateList,
      newObj
    );
  }
  fetchInsertExportExcel(obj2 = []) {
    var newArr = [];
    obj2.map((x) => {
      var newObj = {
        SONo: "",
        SalesOrgCode: "",
        SalesOrgName: "",
        MaterialCode: "",
        PackageTypeCode: "",
        PackageType: "",
        MaterialGroup: "",
        Soqty: null,
        LoadingLocationCode: "",
        LoadingLocation: "",
        ContainerSize: "",
        ContainerCode: "",
        NoofContainer: null,
        LoadDate: "",
        HaulageName: "",
        HaulageCode: "",
        ShippingAccountCode: "",
        ShippingAccountName: "",
        PlaceContainerReturnCode: "",
        PlaceContainerReturn: "",
        CyplaceCode: "",
        CyplaceName: "",
        BookerNote: "",
        RemarkforInternal: "",
        ShipTo: "",
        ShipToCountry: "",
        BookingNo: "",
        ShipAgentCode: "",
        ShipAgentName: "",
        ShippingMarks: "",
        ShipFromCode: "",
        ShipFromName: "",
        Plant: "",
        ModeOfTransport: "",
        Channel: "",
        SoitemNo: "",
      };
      newObj.SONo = x.SONo;
      newObj.SalesOrgCode = x.SalesOrgCode;
      newObj.SalesOrgName = x.SalesOrgName;
      newObj.MaterialCode = x.MaterialCode;
      newObj.PackageTypeCode = x.PackageTypeCode;
      newObj.PackageType = x.PackageType;
      newObj.MaterialGroup = x.MaterialGroup;
      newObj.Soqty = parseFloat(x.Soqty);
      newObj.LoadingLocationCode = x.LoadingLocationCode;
      newObj.LoadingLocation = x.LoadingLocation;
      newObj.ContainerSize = x.ContainerSize;
      newObj.ContainerCode = x.ContainerCode;
      newObj.NoofContainer = parseInt(x.NOofContainer);
      newObj.LoadDate = x.LoadDate;
      newObj.HaulageName = x.HaulageName;
      newObj.HaulageCode = x.HaulageCode;
      newObj.ShippingAccountCode = x.ShippingAccountCode;
      newObj.ShippingAccountName = x.ShippingAccountName;
      newObj.PlaceContainerReturnCode = x.PlaceContainerReturnCode;
      newObj.PlaceContainerReturn = x.PlaceContainerReturn;
      newObj.CyplaceCode = x.CyplaceCode;
      newObj.CyplaceName = x.CyplaceName;
      newObj.BookerNote = x.BookerNote;
      newObj.RemarkforInternal = x.RemarkforInternal;
      newObj.ShipTo = x.ShipTo;
      newObj.ShipToCountry = x.ShipToCountry;
      newObj.BookingNo = x.BookingNo;
      newObj.ShipAgentCode = x.ShipAgentCode;
      newObj.ShipAgentName = x.ShipAgentName;
      newObj.ShippingMarks = x.ShippingMarks;
      newObj.ShipFromCode = x.ShipFromCode;
      newObj.ShipFromName = x.ShipFromName;
      newObj.Plant = x.Plant;
      newObj.ModeOfTransport = x.ModeOfTransport;
      newObj.Channel = x.Channel;
      newObj.SoitemNo = x.SoitemNo;

      newArr.push(newObj);
    });

    var addData = {
      dataList: [...newArr],
    };

    console.log(addData);

    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlInsertExportExcelFiles,
      addData
    );
  }

  fetchCbContainerSizeList() {
    var newObj = {
      GroupNo: "ContainerSize",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }

  fetchCbCustomBy() {
    var newObj = {
      GroupNo: "CustomBy",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }

  fetchExportVesselListBySearch(index = []) {
    console.log(index);
    var newObj = {
      StartDate: index.StartDate == "" ? null : index.StartDate,
      EndDate: index.EndDate == "" ? null : index.EndDate,
      Years: index.Years == "" ? null : index.Years,
      ContractStatus: index.ContractStatus,
      TransporterId: index.TransporterId,
      ContractNo: index.ContractNo,
      SourceId: index.SourceId,
      PackageType: index.PackageType,
      RefDocNo: index.RefDocNo,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExportVesselListBySearch,
      newObj
    );
  }

  fetchExportVesselListBySearchById(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetContractEcportVesselListById,
      newObj
    );
  }

  fetchAddContractExportVList(
    header = [],
    liftoff = [],
    lifton = [],
    transportRate = [],
    port = []
  ) {
    console.log();
    var newObj = {
      contractNo: header[0],
      sourceId: header[1],
      transporterId: header[2],
      packageType: header[3],
      fuelTypeId: header[4],
      refDocNo: header[5],
      startDate: header[6],
      endDate: header[7],
      contractStatus: header[8],
      createBy: header[9],
      customShippingPrice: header[10],
      customerShippingPriceById: header[11],
      McontractExportVesselLiftOffs: [...liftoff],
      McontractExportVesselLiftOns: [...lifton],
      McontractExportVesselTransportRates: [...transportRate],
      McontractExportVesselPorts: [...port],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExportVesselListAdd,
      newObj
    );
  }
  fetchRemoveContractExportList(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveContractExportList,
      newObj
    );
  }

  fetchGetContractExportForSearchList() {
    return ApiBaseHelper.postData(
      ApiController._urlGetContractExportForSearchList
    );
  }

  fetchEditExportVesselList(obj = {}) {
    console.log(obj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditExportVesselList,
      obj
    );
  }

  //**Export Truck */

  fetchEditExportTruckList(obj = {}) {
    // console.log(obj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditExportTruckList,
      obj
    );
  }

  fetchGetContractExportTruckForSearchList() {
    return ApiBaseHelper.postData(
      ApiController._urlGetExportTruckListForSearch
    );
  }

  fetchExportTruckListBySearch(index = []) {
    console.log(ApiController._urlGetExportTruckListBySearch);
    var newObj = {
      StartDate: index.StartDate == "" ? null : index.StartDate,
      EndDate: index.EndDate == "" ? null : index.EndDate,
      Years: index.Years == "" ? null : index.Years,
      ContractStatus: index.ContractStatus,
      TransporterId: index.TransporterId,
      ContractNo: index.ContractNo,
      SourceId: index.SourceId,
      TruckTypeId: index.TruckTypeId,
      FuelTypeId: index.FuelTypeId,
      RateTypeId: index.RateTypeId,
      MinQty: index.MinQty,
      MaxQty: index.MaxQty,
      MinTonRate: index.MinTonRate,
      PackageType: index.PackageType,
      RefDocNo: index.RefDocNo,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExportTruckListBySearch,
      newObj
    );
  }

  fetchExportVesselTruckBySearchById(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetContractExportTruckListById,
      newObj
    );
  }

  fetchAddContractExportTruckList(header = [], shipTo = [], fuelRate = []) {
    var newObj = {
      contractNo: header[0],
      sourceId: header[1],
      transporterId: header[2],
      rateTypeId: header[3],
      truckTypeId: header[4],
      fuelTypeId: header[5],
      minQty: header[6],
      maxQty: header[7],
      minTonRate: header[8],
      refDocNo: header[9],
      startDate: header[10],
      endDate: header[11],
      contractStatus: header[12],
      createBy: header[13],
      mcontractExportBorderFuelRates: [...fuelRate],
      mContractExportBorderShipTos: [...shipTo],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExportTruckListAdd,
      newObj
    );
  }

  fetchRemoveContractExportTruckList(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveContractExportTruckList,
      newObj
    );
  }

  /**Export LCL,AIR */

  fetchEditExportLCLAIRList(obj = {}) {
    console.log(obj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditExportLCLAIRList,
      obj
    );
  }

  fetchGetContractExportLCLAIRForSearchList() {
    return ApiBaseHelper.postData(
      ApiController._urlGetExportLCLAIRListForSearch
    );
  }

  fetchExportLCLAIRListBySearch(index = []) {
    console.log(index);
    var newObj = {
      StartDate: index.StartDate == "" ? null : index.StartDate,
      EndDate: index.EndDate == "" ? null : index.EndDate,
      Years: index.Years == "" ? null : index.Years,
      ContractStatus: index.ContractStatus,
      TransporterId: index.TransporterId,
      ContractNo: index.ContractNo,
      SourceId: index.SourceId,
      TruckTypeId: index.TruckTypeId,
      FuelTypeId: index.FuelTypeId,
      RateTypeId: index.RateTypeId,
      DeliveryMode: index.DeliveryMode,
      PackageType: index.PackageType,
      RefDocNo: index.RefDocNo,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExportLCLAIRListBySearch,
      newObj
    );
  }

  fetchExportVesselLCLAIRBySearchById(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetContractExportLCLAIRListById,
      newObj
    );
  }

  fetchAddContractExportLCLAIRList(
    header = [],
    placeContainerReturn = [],
    fuelRate = []
  ) {
    console.log();
    var newObj = {
      contractNo: header[0],
      sourceId: header[1],
      transporterId: header[2],
      rateTypeId: header[3],
      truckTypeId: header[4],
      fuelTypeId: header[5],
      minQty: header[6],
      maxQty: header[7],
      minTonRate: header[8],
      refDocNo: header[9],
      startDate: header[10],
      endDate: header[11],
      contractStatus: header[12],
      createBy: header[13],
      deliveryMode: header[14],
      mcontractExportLclairfuelRates: [...fuelRate],
      mcontractExportLclairplaceContainerReturns: [...placeContainerReturn],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExportLCLAIRListAdd,
      newObj
    );
  }

  fetchRemoveContractExportLCLAIRList(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveContractExportLCLAIRList,
      newObj
    );
  }

  //

  /**EPZ */

  fetchEditEPZList(obj = {}) {
    console.log(obj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditEPZList,
      obj
    );
  }

  fetchGetEPZListForSearchData() {
    return ApiBaseHelper.postData(ApiController._urlGetEPZListForSearch);
  }

  fetchGetEPZListForSearch(index = []) {
    console.log(index);
    var newObj = {
      StartDate: index.StartDate == "" ? null : index.StartDate,
      EndDate: index.EndDate == "" ? null : index.EndDate,
      Years: index.Years == "" ? null : index.Years,
      ContractStatus: index.ContractStatus,
      TransporterId: index.TransporterId,
      ContractNo: index.ContractNo,
      PackageTypeId: index.PackageType == "" ? null : index.PackageType,
      RefDocNo: index.RefDocNo,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetEPZListBySearch,
      newObj
    );
  }

  fetchGetContractEPZListById(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetContractEPZListById,
      newObj
    );
  }

  fetchAddContractEPZList(header = [], shipto = []) {
    console.log();
    var newObj = {
      contractNo: header[0],
      transporterId: header[1],
      packageType: header[2],
      refDocNo: header[3],
      contractStatus: header[4],
      startDate: header[5],
      endDate: header[6],
      createBy: header[7],
      mcontractEpzshipTos: [...shipto],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddEPZList,
      newObj
    );
  }

  fetchRemoveContractEPZList(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveContractEPZList,
      newObj
    );
  }

  //Contract Transfer//

  fetchTransferListBySearch(index = []) {
    var newObj = {
      StartDate: index.StartDate == "" ? null : index.StartDate,
      EndDate: index.EndDate == "" ? null : index.EndDate,
      Years: index.Years == "" ? null : index.Years,
      ContractStatus: index.ContractStatus,
      TransporterId: index.TransporterId,
      ContractNo: index.ContractNo,
      TruckTypeId: index.TruckTypeId,
      TransferTypeId:
        index.TransferTypeId == "" ? null : parseInt(index.TransferTypeId),
      FuelTypeId: index.FuelTypeId,
      RateTypeId: index.RateTypeId,
      RefDocNo: index.RefDocNo,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransferListBySearch,
      newObj
    );
  }

  fetchTransferBySearchById(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetContractTransferListById,
      newObj
    );
  }

  fetchAddContractTransferList(header = [], truckLicense = [], fuelRate = []) {
    var newObj = {
      contractNo: header[0],
      transporterId: header[1],
      rateTypeId: header[2],
      truckTypeId: header[3],
      fuelTypeId: header[4],
      transferTypeId: header[5],
      minQty: header[6],
      maxQty: header[7],
      minTonRate: header[8],
      minTransportRate: header[9],
      minDistanceRate: header[10],
      overRatio: header[11],
      refDocNo: header[12],
      startDate: header[13],
      endDate: header[14],
      contractStatus: header[15],
      createBy: header[16],
      mcontractTransferFuelRates: [...fuelRate],
      mcontractTransferTruckLicenses: [...truckLicense],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddTransferList,
      newObj
    );
  }

  fetchRemoveContractTransferList(index) {
    var newObj = {
      contractId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveContractTransferList,
      newObj
    );
  }

  fetchEditTransferList(obj = {}) {
    // console.log(obj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditTransferList,
      obj
    );
  }

  //

  /**Approve Contract */
  fetchApproveContractBySearch(index = []) {
    // console.log(ApiController._urlGetExportTruckListBySearch);
    var newObj = {
      StartDate: index.StartDate == "" ? null : index.StartDate,
      EndDate: index.EndDate == "" ? null : index.EndDate,
      Years: index.Years == "" ? null : index.Years,
      ContractStatus: index.ContractStatus,
      TransporterId: index.TransporterId,
      ContractNo: index.ContractNo,
      SourceId: index.SourceId,
      TruckTypeId: index.TruckTypeId,
      FuelTypeId: index.FuelTypeId,
      RateTypeId: index.RateTypeId,
      PackageType: index.PackageType,
      RefDocNo: index.RefDocNo,
      ContractType: index.ContractType,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetApproveContractListForSearch,
      newObj
    );
  }

  fetchUpdateApproveContractList(index = [], type) {
    console.log(type);
    console.log(index);
    var newArr = [];
    index.map((x) => {
      var newObj = {
        ContractId: null,
        ContractNo: "",
        CreateBy: null,
        RejectReason: "",
        ContractType: "",
        ContractStatus: "",
      };
      newObj.ContractId = x.ContractId;
      newObj.ContractNo = x.ContractNo === "" ? null : x.ContractNo;
      newObj.CreateBy = x.CreateBy === "" ? null : x.CreateBy;
      newObj.ContractType = x.ContractType;
      newObj.ContractStatus = x.ContractStatus;
      newObj.RejectReason = x.RejectReason;

      newArr.push(newObj);
    });
    var newObj = {
      Type: type,
      dataList: [...newArr],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlUpdateApproveContractList,
      newObj
    );
  }

  /** Company */

  fetchGetCompanyListById(companyId) {
    var newObj = {
      CompanyId: companyId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCompanyListById,
      newObj
    );
  }

  fetchGetCompanyCostList(companyId) {
    var newObj = {
      CompanyId: companyId,
      PaymentById: null,
      TransporterTypeId: 1,
      ExportModeId: null,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCompanyCostList,
      newObj
    );
  }

  fetchAddCompanyList(
    companyCode,
    companyPrefixCode,
    companyShortName,
    companyName
  ) {
    var newObj = {
      CompanyCode: companyCode,
      PlantPrefixCode: companyPrefixCode,
      CompanyShortName: companyShortName,
      CompanyName: companyName,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddCompanyList,
      newObj
    );
  }
  fetchEditCompanyList(
    companyCode,
    companyPrefixCode,
    companyShortName,
    companyName
  ) {
    var newObj = {
      CompanyCode: companyCode,
      PlantPrefixCode: companyPrefixCode,
      CompanyShortName: companyShortName,
      CompanyName: companyName,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditCompanyList,
      newObj
    );
  }
  fetchDeleteCompanyList(companyId) {
    var newObj = {
      CompanyId: companyId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteCompanyList,
      newObj
    );
  }
  fetchCompanyList() {
    return ApiBaseHelper.postData(ApiController._urlGetCompanyList);
  }

  // ComboBoxxs //
  fetchCbFuelTypeList() {
    var newObj = {
      GroupNo: "FuelTypeID",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbRateTypeList() {
    var newObj = {
      GroupNo: "RateTypeID",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbUnloadList() {
    var newObj = {
      GroupNo: "UnloadTypeID",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbPackageList() {
    var newObj = {
      GroupNo: "PackageType",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbContractStatusList() {
    var newObj = {
      GroupNo: "ContractStatus",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbEDPStatus() {
    var newObj = {
      GroupNo: "EDPStatus",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbPaymentStatus() {
    var newObj = {
      GroupNo: "PaymentStatus",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbShipmentStatus() {
    var newObj = {
      GroupNo: "ShipmentStatus",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbTransportType() {
    var newObj = {
      GroupNo: "TransportType",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }
  fetchCbRequestPayment() {
    var newObj = {
      GroupNo: "RequestPayment",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }

  fetchCbDeliveryMode() {
    var newObj = {
      GroupNo: "ContactType",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }

  fetchCbTransferType() {
    var newObj = {
      GroupNo: "TransferType",
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCbFuelTypeList,
      newObj
    );
  }

  /** Transaction */

  fetchEDPList() {
    return ApiBaseHelper.postData(ApiController._urlGetEDPList);
  }
  fetchEDPListBySearch(index = []) {
    console.log(index);
    var newObj = {
      TransportType: index.TransportType,
      DeliveryDateStart: index.DeliveryDateStart,
      DeliveryDateEnd: index.DeliveryDateEnd,
      EDPStatus: index.EDPStatus,
      ShipmentNo: index.ShipmentNo,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetEDPListBySearch,
      newObj
    );
  }
  fetchEDPListApproveBySearch(index = []) {
    console.log(index);
    var newObj = {
      DeliveryMode: index.DeliveryMode,
      DeliveryDateStart: index.DeliveryDateStart,
      DeliveryDateEnd: index.DeliveryDateEnd,
      EDPStatus: index.EDPStatus,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetEDPListApproveBySearch,
      newObj
    );
  }

  fetchInsertEDPEx(obj2 = []) {
    var newArr = [];
    obj2.map((x) => {
      var newObj = {
        ShipmentNo: "",
        DeliveryNo: "",
        OrderNo: "",
        SalesOrg: "",
        CompanyId: "",
        ShipTo: "",
        DeliveryStatus: "",
        CheckIn: "",
        PlanDelivery: "",
        LoadDatetime: "",
        ConfirmDatetime: "",
        Channel: "",
        DeliveryDate: "",
        ShippingType: "",
        TruckLicense: "",
        TransporterCode: "",
        UnloadingCode: "",
        Qty: 0,
      };
      newObj.ShipmentNo = x.ShipmentNo;
      newObj.DeliveryNo = x.DeliveryNo;
      newObj.OrderNo = x.OrderNo;
      newObj.SalesOrg = x.SalesOrg;
      newObj.CompanyId = x.CompanyId;
      newObj.ShipTo = x.ShipTo;
      newObj.DeliveryStatus = x.DeliveryStatus;
      newObj.CheckIn = x.CheckIn;
      newObj.PlanDelivery = x.PlanDelivery;
      newObj.LoadDatetime = x.LoadDatetime;
      newObj.ConfirmDatetime = x.ConfirmDatetime;
      newObj.Channel = x.Channel;
      newObj.DeliveryDate = x.DeliveryDate;
      newObj.ShippingType = x.ShippingType;
      newObj.TruckLicense = x.TruckLicense;
      newObj.TransporterCode = x.TransporterCode;
      newObj.UnloadingCode = x.UnloadingCode;
      newObj.Qty = parseFloat(x.Qty);

      newArr.push(newObj);
    });

    var newObj = {
      dataList: [...newArr],
    };

    console.log(newObj);

    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetEDPInsertEx,
      newObj
    );
  }

  fetchEditEDPList(index = []) {
    var newArr = [];
    index.map((x) => {
      var newObj = {
        ApproveBy: null,
        ApproveDatetime: "",
        DeliveryDate: null,
        DeliveryMode: "",
        // "DeliveryNo": "",
        Edpreason: "",
        Edpstatus: "",
        InitialBy: null,
        InitialDatetime: "",
        InitialReason: "",
        Qty: null,
        RejectBy: null,
        RejectDatetime: "",
        RejectReason: "",
        RequestPaymentType: null,
        // "ShipTo": "",
        ShipmentNo: "",
        // "SourceId": null,
        TruckLicense: "",
        // "TruckTypeId": null,
      };
      newObj.ApproveBy = x.approveBy === "" ? null : x.approveBy;
      newObj.ApproveDatetime =
        x.approveDatetime === "" ? null : x.approveDatetime;
      newObj.DeliveryDate = x.deliveryDate === "" ? null : x.deliveryDate;
      newObj.DeliveryMode = x.deliveryMode;
      // newObj.DeliveryNo = x.deliveryNo;
      newObj.Edpreason = x.edpreason;
      newObj.Edpstatus = x.edpstatus;
      newObj.InitialBy = x.initialBy === "" ? null : x.initialBy;
      newObj.InitialDatetime =
        x.initialDatetime === "" ? null : x.initialDatetime;
      newObj.InitialReason = x.initialReason;
      newObj.Qty = x.qty === "" ? null : x.qty;
      newObj.RejectBy = x.rejectBy === "" ? null : x.rejectBy;
      newObj.RejectDatetime = x.rejectDatetime === "" ? null : x.rejectDatetime;
      newObj.RejectReason = x.rejectReason;
      // if (x.requestPaymentType === "จ่าย") {
      //     newObj.RequestPaymentType = 1;
      // } else {
      //     newObj.RequestPaymentType = 0;
      // }
      newObj.RequestPaymentType =
        x.requestPaymentType === "" ? null : x.requestPaymentType;
      // newObj.ShipTo = x.shipTo;
      newObj.ShipmentNo = x.shipmentNo;
      // newObj.SourceId = x.sourceId === "" ? null : x.sourceId;
      newObj.TruckLicense = x.truckLicense;
      // newObj.TruckTypeId = x.truckTypeId === "" ? null : x.truckTypeId;

      newArr.push(newObj);
    });
    var newObj = {
      dataList: [...newArr],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditEdpList,
      newObj
    );
  }

  fetchEditEDPListApprove(index = []) {
    console.log(index);
    var newArr = [];
    index.map((x) => {
      var newObj = {
        ApproveBy: null,
        ApproveDatetime: "",
        RejectBy: null,
        RejectDatetime: "",
        RejectReason: "",
        ShipmentNo: "",
      };
      newObj.ShipmentNo = x.shipmentNo;
      newObj.ApproveBy = x.approveBy === "" ? null : x.approveBy;
      newObj.ApproveDatetime = x.approveDatetime;
      newObj.RejectBy = x.rejectBy === "" ? null : x.rejectBy;
      newObj.RejectDatetime = x.rejectDatetime;
      newObj.RejectReason = x.rejectReason;

      newArr.push(newObj);
    });
    var newObj = {
      dataList: [...newArr],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditEdpListApprove,
      newObj
    );
  }

  fetchEDPRefresh(index = []) {
    console.log(index);
    var newArr = [];
    index.map((x) => {
      var newObj = {
        ShipmentNo: "",
      };
      newObj.ShipmentNo = x.shipmentNo;

      newArr.push(newObj);
    });
    var newObj = {
      dataList: [...newArr],
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRefreshData,
      newObj
    );
  }

  fetchInsertHistoryLog(obj2 = []) {
    var newArr = [];
    obj2.map((x) => {
      var newObj = {
        ShipmentNo: "",
        // "RunningNo": "",
        ExtraChargeDocNo: "",
        Description: "",
        CreateByName: "",
        CreateBy: "",
      };
      newObj.ShipmentNo = x.ShipmentNo;
      // newObj.RunningNo = x.RunningNo;
      newObj.ExtraChargeDocNo = x.ExtraChargeDocNo;
      newObj.Description = x.Description;
      newObj.CreateByName = x.CreateByName;
      newObj.CreateBy = x.CreateBy;

      newArr.push(newObj);
    });

    var newObj = {
      dataList: [...newArr],
    };

    // console.log(newObj);

    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddHistoryLog,
      newObj
    );
  }
  /**FuelPrice */
  fecthGetUpdateFuelPriceList(value = []) {
    console.log("FuleDate", value);
    var newObj = {
      FuelTypeId: value.FuelTypeId,
      FuelPrice: value.FuelPrice,
      FuelDate: value.FuelDate,
      FuelDateEnd: value.FuelDateEnd,
      WeekPrice: value.WeekPrice,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetUpdateFuelPriceList,
      newObj
    );
  }

  fecthGetFuelPriceList() {
    return ApiBaseHelper.postData(ApiController._urlGetFuelPriceList);
  }

  fetchFuelPriceListBySearch(index = []) {
    console.log(index);
    var newObj = {
      FuelTypeId: index.FuelTypeId,
      FuelPrice: index.FuelPrice,
      FuelDate: index.FuelDate,
      FuelDateEnd: index.FuelDateEnd,
      WeekPrice: index.WeekPrice,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetFuelPriceListBtSearch,
      newObj
    );
  }

  fecthGetFuelPriceById(index) {
    var newObj = {
      FuelPriceId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetFuelPriceById,
      newObj
    );
  }

  fetchAddFuelPriceList(obj) {
    var newObj = {
      FuelTypeId: obj.fuelTypeId,
      FuelDate: obj.fuelDate,
      FuelPrice: obj.fuelPrice,
      WeekPrice: obj.weekPrice,
      MonthPrice: obj.monthPrice,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlInsertFuelPrice,
      newObj
    );
  }

  fetchEditfuelPriceById(obj) {
    console.log(obj);
    var newObj = {
      FuelPriceId: obj[0].fuelPriceId,
      FuelTypeId: obj[0].fuelTypeId,
      FuelPrice: parseFloat(obj[0].fuelPrice),
      FuelDate: obj[0].fuelDate,
      WeekPrice: parseFloat(obj[0].weekPrice),
      MonthPrice: parseFloat(obj[0].monthPrice),
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditFuelPrice,
      newObj
    );
  }
  fetchDeleteCompanyList(index) {
    var newObj = {
      FuelPriceId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteFuelPrice,
      newObj
    );
  }

  /**Payment */

  fetchGetCreatPaymentById(index, isExport = false) {
    console.log(index);
    var newObj = {
      paymentId: index,
      isExport: isExport,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCreatePaymentById,
      newObj
    );
  }

  fetchSendToAllPay(index) {
    var newObj = {
      paymentId: index,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlSendToAllPay,
      newObj
    );
  }

  fetchGetDomDeliveryListForCreatePaymentListView(obj = []) {
    var newObj = {
      startDate: obj[0],
      endDate: obj[1],
      transporterId: obj[2],
      paymentNo: obj[3],
      refNo: obj[4],
      allPayNo: obj[5],
      paymentStatus: obj[6],
      companyId: obj[7],
      duedate: obj[8],
      isTransfer: obj[9] ? obj[9] : false,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlCreatePaymentListView,
      newObj
    );
  }

  fetchGetShipmentDataForPayment(index = []) {
    // console.log(index);
    var newArr = [];
    index.map((x) => {
      newArr.push(x.shipmentNo);
    });
    // console.log(newArr)
    var newObj = {
      ShipmentList: [...newArr],
    };
    // console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDataShipmentDetailList,
      newObj
    );
  }

  fetchCreatePayment(
    PaymentHeader,
    FileList = [],
    shipmentIOList = [],
    isExport = false
  ) {
    console.log(PaymentHeader);
    console.log(FileList);
    const formData = new FormData();
    // var pay = JSON.stringify(PaymentHeader);
    // var fil = JSON.stringify(FileList);
    console.log(JSON.stringify(PaymentHeader));
    formData.append("PaymentHeader", JSON.stringify(PaymentHeader));

    FileList.map((x) => {
      formData.append("FileList", x.fileData);
      formData.append("Guid", x.guid);
      // formData.append("Guid2",  JSON.stringify(x.guid));
    });
    shipmentIOList.map((x) => {
      formData.append("ShipmentNo", x.shipmentNo);
      formData.append("IONo", x.ioNo);
      formData.append("RunningNo", x.runningNo);
      // formData.append("Guid2",  JSON.stringify(x.guid));
    });

    formData.append("IsExport", isExport);

    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlCreatePayment,
      formData
    );
  }

  fetchCreateDoc(arr, smpNo, name) {
    const formData = new FormData();
    formData.append("PaymentNo", smpNo);
    formData.append("FileName", name);
    formData.append("FileData", arr);

    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlGetPaymentForAddCoverSheet,
      formData
    );
  }

  fetchEditCreatePayment(PaymentHeader, FileList = [], shipmentIOList = []) {
    console.log(PaymentHeader);
    console.log(FileList);
    const formData = new FormData();
    // var pay = JSON.stringify(PaymentHeader);
    // var fil = JSON.stringify(FileList);
    console.log(JSON.stringify(PaymentHeader));
    formData.append("PaymentHeader", JSON.stringify(PaymentHeader));
    FileList.map((x) => {
      formData.append("FileList", x.fileData);
      formData.append("Guid", x.guid);
      // formData.append("Guid2",  JSON.stringify(x.guid));
    });

    shipmentIOList.map((x) => {
      formData.append("ShipmentNo", x.shipmentNo);
      formData.append("IONo", x.ioNo);
      formData.append("RunningNo", x.runningNo);
      // formData.append("Guid2",  JSON.stringify(x.guid));
    });

    // var newObj = {
    //   PaymentHeader: PaymentHeader,
    //   FileList:[...FileList]
    // };

    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlEditCreatePayment,
      formData
    );
  }

  fetchGetDomDeliveryListForCreatePayment(obj = []) {
    var newObj = {
      deliveryDateStart: obj[0],
      deliveryDateEnd: obj[1],
      monthYear: obj[2],
      shipmentNo: obj[3],
      deliveryNo: obj[4],
      saleOrderNo: obj[5],
      sourceId: obj[6],
      transaporterId: obj[7],
      truckTypeId: obj[8],
      eDPStatus: obj[9],
      shipmentStatus: obj[10],
      paymentStatus: obj[11],
      SummaryStatus: obj[12],
      shipmentType: obj[13],
      companyIdList: obj[14],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomDeliveryListForCreatePayment,
      newObj
    );
  }

  //Export

  fetchGetExpShipmentDataForPayment(index = [], id) {
    // console.log(index);
    var newArr = [];
    index.map((x) => {
      newArr.push(x.shipmentNo);
    });
    // console.log(newArr)
    var newObj = {
      TransporterId: id,
      ShipmentList: [...newArr],
    };
    // console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExpDataShipmentDetailList,
      newObj
    );
  }

  fetchGetExpDeliveryListForCreatePayment(obj = []) {
    console.log(obj);
    var newObj = {
      deliveryDateStart: obj[0],
      deliveryDateEnd: obj[1],
      monthYear: obj[2],
      shipmentNo: obj[3],
      deliveryNo: obj[4],
      saleOrderNo: obj[5],
      loadingLocationId: obj[6],
      transaporterId: obj[7],
      truckTypeId: obj[8],
      eDPStatus: obj[9],
      shipmentStatus: obj[10],
      paymentStatus: obj[11],
      SummaryStatus: obj[12],
      companyIdList: obj[13],
      exportModeId: obj[14],
      shippingid: obj[15],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExpDeliveryListForCreatePayment,
      newObj
    );
  }

  fetchGetExpDeliveryListForCreatePaymentListView(obj = [], type) {
    if (type === "admin") {
      var newObj = {
        startDate: obj[0],
        endDate: obj[1],
        transporterId: obj[2],
        paymentNo: obj[3],
        refNo: obj[4],
        allPayNo: obj[5],
        paymentStatus: obj[6],
        companyId: obj[7],
        ExportModeId: obj[8],
        dueDate: obj[9],
      };
    } else if (type === "tpe") {
      var newObj = {
        startDate: obj[0],
        endDate: obj[1],
        transporterId: obj[2],
        paymentNo: obj[3],
        refNo: obj[4],
        allPayNo: obj[5],
        paymentStatus: obj[6],
        companyId: obj[7],
        ExportModeId: obj[8],
        dueDate: obj[9],
        userId: obj[10],
      };
    } else if (type === "trst") {
      var newObj = {
        startDate: obj[0],
        endDate: obj[1],
        transporterId: obj[2],
        paymentNo: obj[3],
        refNo: obj[4],
        allPayNo: obj[5],
        paymentStatus: obj[6],
        companyId: obj[7],
        ExportModeId: obj[8],
        dueDate: obj[9],
        userTransporterId: obj[10],
      };
    }

    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlExpCreatePaymentListView,
      newObj
    );
  }

  fetchGetPaymentListViewForApprove(obj = []) {
    var newObj = {
      startDate: obj[0],
      endDate: obj[1],
      transporterId: obj[2],
      paymentNo: obj[3],
      refNo: obj[4],
      allPayNo: obj[5],
      paymentStatus: obj[6],
      companyId: obj[7],
      dueDate: obj[8],
      attachFileStatus: obj[9],
      exportModeId: obj[10],
      isTransfer: obj[11] ? true : false,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlExpCreatePaymentListView,
      newObj
    );
  }

  fetchGetCoverPageData(id, isExport) {
    console.log("CoverPageData");
    console.log("PaymentId", id);
    console.log("IsExport", isExport);
    var newObj = {
      PaymentId: id,
      IsExport: isExport,
    };
    // console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCoverPageData,
      newObj
    );
  }

  //*DashBoard//

  fetchGetDashBoard() {
    return ApiBaseHelper.postData(ApiController._urlGetDashBoardView);
  }
  fetchGetDashBoard2() {
    return ApiBaseHelper.postData(ApiController._urlGetDashBoardView2);
  }
  fetchGetDashBoard3() {
    return ApiBaseHelper.postData(ApiController._urlGetDashBoardView3);
  }

  fetchGetDashBoard4() {
    return ApiBaseHelper.postData(ApiController._urlGetDashBoardView4);
  }
  fetchGetDashBoard5() {
    return ApiBaseHelper.postData(ApiController._urlGetDashBoardView5);
  }
  fetchGetDashBoardMain() {
    return ApiBaseHelper.postData(ApiController._urlGetDashBoardMain);
  }

  //** Transfer */

  // fetchGetExtraChargeNameOnlyList() {
  //   return ApiBaseHelper.postData(ApiController._urlGetExtraChargeNameOnlyList);
  // }
  fetchGetTransferDeliveryList(obj = []) {
    var newObj = {
      deliveryDateStart: obj[0],
      deliveryDateEnd: obj[1],
      monthYear: obj[2],
      shipmentNo: obj[3],
      deliveryNo: obj[4],
      saleOrderNo: obj[5],
      sourceId: obj[6],
      transaporterId: obj[7],
      truckTypeId: obj[8],
      eDPStatus: obj[9],
      shipmentStatus: obj[10],
      paymentStatus: obj[11],
      SummaryStatus: obj[12],
      ShipmentType: obj[13],
      CompanyId: obj[14],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomDeliveryList,
      newObj
    );
  }

  fetchGetTransferDeliveryItemList(obj = []) {
    var newObj = {
      DeliveryDateStart: obj[0],
      DeliveryDateEnd: obj[1],
      MonthYear: obj[2],
      ShipmentNo: obj[3],
      DeliveryNo: obj[4],
      SaleOrderNo: obj[5],
      LoadingLocationId: obj[6],
      TransaporterId: obj[7],
      TruckTypeId: obj[8],
      EDPStatus: obj[9],
      ShipmentStatus: obj[10],
      PaymentStatus: obj[11],
      SummaryStatus: obj[12],
      ShipmentType: obj[13],
      CompanyId: obj[14],
    };

    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomDeliveryItemList,
      newObj
    );
  }
  fetchGetTransferDeliveryListById(obj = []) {
    var newObj = {
      shipmentNo: obj[0],
      deliveryNo: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDomDeliveryListById,
      newObj
    );
  }
  // fetchGetReCalculateTransportRate(obj = []) {
  //   var newObj = {
  //     ShipmentNo: obj[0],
  //     DeliveryNo: obj[1],
  //     UserId: obj[2],
  //   };
  //   return ApiBaseHelper.postDataRequestBody(
  //     ApiController._urlGetReCalculateTransportRate,
  //     newObj
  //   );
  // }
  // fetchGetMasterExtraChargeListByGroupType(obj = []) {
  //   var newObj = {
  //     IsExport: obj[0],
  //     ExtraChargeTypeId: obj[1],
  //   };
  //   return ApiBaseHelper.postDataRequestBody(
  //     ApiController._urlGetMasterExtraChargeListByGroupType,
  //     newObj
  //   );
  // }
  // fetchGetShipmentExtraChargeListById(index) {
  //   var newObj = {
  //     shipmentNo: index,
  //   };
  //   return ApiBaseHelper.postDataRequestBody(
  //     ApiController._urlGetShipmentExtraChargeListById,
  //     newObj
  //   );
  // }
  // fetchGetDomCreditDebitList(obj = []) {
  //   var newObj = {
  //     DeliveryDateStart: obj[0],
  //     DeliveryDateEnd: obj[1],
  //     ShipmentNo: obj[2],
  //     TranspoterId: obj[3],
  //     TruckTypeId: obj[4],
  //     ExtraChargeType: obj[5],
  //     ExtraChargeId: obj[6],
  //     CreditDebitStatus: obj[7],
  //     IsViewData: obj[8],
  //     TranspoterTypeId: obj[9],
  //     ExtraChargeGroupId: obj[10],
  //   };
  //   return ApiBaseHelper.postDataRequestBody(
  //     ApiController._urlGetDomCreditDebitList,
  //     newObj
  //   );
  // }

  //-----------------------------------------------GIFT-------------------------------------------------------------//
  //-----------------------------------------Function Get---------------------------------------
  /**ContainerReturn */
  fetchGetPlaceContainerReturnList() {
    return ApiBaseHelper.postData(
      ApiController._urlGetPlaceContainerReturnList
    );
  }
  fetchGetPlaceContainerReturnListById(index) {
    var newObj = {
      PlaceContainerReturnId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetPlaceContainerReturnListById,
      newObj
    );
  }
  /**ExtraCharge */
  fetchGetExtraChargeList() {
    return ApiBaseHelper.postData(ApiController._urlGetExtraChargeList);
  }

  fetchGetExtraChargeListById(id) {
    var newObj = {
      extraChargeId: id,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetExtraChargeListById,
      newObj
    );
  }

  fetchGetExtraChargeOtherList() {
    return ApiBaseHelper.postData(ApiController._urlGetExtraChargeOtherList);
  }

  /**Authentication */
  /**UserGroup */
  fetchGetUserGroupList() {
    return ApiBaseHelper.postData(ApiController._urlGetUserGroupList);
  }
  fetchGetUserGroupListById(index) {
    var newObj = {
      userGroupId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetUserGroupListById,
      newObj
    );
  }
  /**User */
  fetchGetUserList(obj = []) {
    var newObj = {
      userName: obj[0],
      aliasName: obj[1],
      firstName: obj[2],
      LastName: obj[3],
      TransporterID: obj[4],
      Email: obj[5],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetUserList,
      newObj
    );
  }
  fetchGetUserListById(index) {
    var newObj = {
      userId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetUserListById,
      newObj
    );
  }
  /**Authentication */
  fetchGetUserGroupNameOnlyList() {
    return ApiBaseHelper.postData(ApiController._urlGetUserGroupNameOnlyList);
  }
  /**CommandJobs */
  fetchGetCommandJobs(obj = []) {
    var newObj = {
      startDate: obj[0],
      endDate: obj[1],
      status: obj[2],
    };
    // console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCommandJobs,
      newObj
    );
  }
  //date///
  fetchGetAutoStartEndOneDayDateTime() {
    return ApiBaseHelper.postData(
      ApiController._urlGetAutoStartEndOneDayDateTime
    );
  }
  /**InterfaceErrorLog */
  fetchGetInterfaceErrorLog(obj = []) {
    var newObj = {
      startDate: obj[0],
      endDate: obj[1],
      deliveryNo: obj[2],
      shipmentNo: obj[3],
      saleOrderNo: obj[3],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetInterfaceErrorLog,
      newObj
    );
  }

  //-----------------------------------------Function Add---------------------------------------
  /**ContainerReturn */
  fetchAddPlaceContainerReturnList(obj = []) {
    var newObj = {
      placeContainerReturnCode: obj[0],
      placeContainerReturnNameThai: obj[1],
      placeContainerReturnNameEng: obj[2],
      description: obj[3],
      isActive: obj[4],
      createBy: obj[5],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddPlaceContainerReturnList,
      newObj
    );
  }
  /**ExtraCharge */
  fetchAddExtraChargeList(obj = []) {
    var newObj = {
      extraChargeCode: obj[0],
      extraChargeName: obj[1],
      transporterId: obj[2],
      transporterTypeId: obj[3],
      extraChargeGroupId: obj[4],
      extraChargeTypeId: obj[5],
      extraChargePrice: obj[6],
      maxPrice: obj[7],
      vatPrice: obj[8],
      isUseQty: obj[9],
      isFixPrice: obj[10],
      isRequstFile: obj[11],
      isActive: obj[12],
      createBy: obj[13],
      requestName1: obj[14],
      requestDataType1: obj[15],
      requestValue1: obj[16],
      requestName2: obj[17],
      requestDataType2: obj[18],
      requestValue2: obj[19],
      requestName3: obj[20],
      requestDataType3: obj[21],
      requestValue3: obj[22],
      requestName4: obj[23],
      requestDataType4: obj[24],
      requestValue4: obj[25],
      vatCode: obj[26],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddExtraChargeList,
      newObj
    );
  }
  /**UserGroup */
  fetchAddUserGroupList(obj = []) {
    var newObj = {
      userGroupCode: obj[0],
      userGroupName: obj[1],
      userGroupDescription: obj[2],
      isActive: obj[3],
      createBy: obj[4],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddUserGroupList,
      newObj
    );
  }
  /**User */
  fetchAddUserList(obj = []) {
    var newObj = {
      userName: obj[0],
      password: obj[1],
      aliasName: obj[2],
      firstName: obj[3],
      lastName: obj[4],
      isActive: obj[5],
      transporterId: obj[6],
      email: obj[7],
      createBy: obj[8],
      userGroupId: obj[9],
    };
    // console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddUserList,
      newObj
    );
  }
  //-----------------------------------------Function Delete---------------------------------------
  /**Authentication */
  fetchRemovePlaceContainerReturnList(placeContainerReturnId) {
    var newObj = {
      PlaceContainerReturnId: placeContainerReturnId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemovePlaceContainerReturnList,
      newObj
    );
  }
  /**ExtraCharge */
  fetchDeleteExtraChargeList(extraChargeID) {
    var newObj = {
      ExtraChargeID: extraChargeID,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteExtraChargeList,
      newObj
    );
  }
  /**UserGroup */
  fetchRemoveUserGroupList(userGroupId) {
    var newObj = {
      UserGroupId: userGroupId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveUserGroupList,
      newObj
    );
  }
  /**User */
  fetchRemoveUserList(userId) {
    var newObj = {
      UserId: userId,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveUserList,
      newObj
    );
  }

  //-----------------------------------------Function Edit---------------------------------------
  /**ContainerReturn  */
  fetchEditPlaceContainerReturnList(obj = []) {
    var newObj = {
      placeContainerReturnId: obj[0],
      placeContainerReturnCode: obj[1],
      placeContainerReturnNameEng: obj[2],
      placeContainerReturnNameThai: obj[3],
      description: obj[4],
      isActive: obj[5],
      updateBy: obj[6],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditPlaceContainerReturnList,
      newObj
    );
  }
  /**ExtraCharge */
  fetchEditExtraChargeList(obj = []) {
    var newObj = {
      extraChargeId: obj[0],
      extraChargeCode: obj[1],
      extraChargeName: obj[2],
      transporterId: obj[3],
      extraChargeGroupId: obj[4],
      extraChargeTypeId: obj[5],
      extraChargePrice: obj[6],
      maxPrice: obj[7],
      vatPrice: obj[8],
      isUseQty: obj[9],
      isFixPrice: obj[10],
      isRequstFile: obj[11],
      isActive: obj[12],
      updateBy: obj[13],
      requestName1: obj[14],
      requestDataType1: obj[15],
      requestValue1: obj[16],
      requestName2: obj[17],
      requestDataType2: obj[18],
      requestValue2: obj[19],
      requestName3: obj[20],
      requestDataType3: obj[21],
      requestValue3: obj[22],
      requestName4: obj[23],
      requestDataType4: obj[24],
      requestValue4: obj[25],
      vatCode: obj[26],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditExtraChargeList,
      newObj
    );
  }
  /**UserGroup */
  fetchEditUserGroupList(obj = []) {
    var newObj = {
      userGroupId: obj[0],
      userGroupCode: obj[1],
      userGroupName: obj[2],
      userGroupDescription: obj[3],
      isActive: obj[4],
      updateBy: obj[5],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditUserGroupList,
      newObj
    );
  }
  /**User */
  fetchEditUserList(obj = []) {
    var newObj = {
      userId: obj[0],
      userName: obj[1],
      isActive: obj[2],
      password: obj[3],
      aliasName: obj[4],
      firstName: obj[5],
      lastName: obj[6],
      transporterId: obj[7],
      email: obj[8],
      updateBy: obj[9],
      userGroupId: obj[10],
    };
    // console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditUserList,
      newObj
    );
  }

  //** Transfer List */
  fetchGetGetTransferList(obj = []) {
    var newObj = {
      deliveryDateStart: obj[0],
      deliveryDateEnd: obj[1],
      monthYear: obj[2],
      shipmentNo: obj[3],
      weightDocNo: obj[4],
      saleOrderNo: obj[5],
      sourceId: obj[6],
      transaporterId: obj[7],
      truckTypeId: obj[9],
      // eDPStatus: obj[9],
      docStatus: obj[11],
      paymentStatus: obj[12],
      SummaryStatus: null,
      ShipmentType: obj[13],
      CompanyId: obj[15],
      SourceList: obj[17],
      DestList: obj[18],
      TransferTypeCode: obj[16],
      TonoSource: obj[19],
      TonoDest: obj[20],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransferList,
      newObj
    );
  }

  fetchGetTransferListById(obj = []) {
    var newObj = {
      ShipmentNo: obj[0],
      WeightDocNo: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransferListById,
      newObj
    );
  }

  fetchGetShipmentListBySaleOrder(index) {
    var newObj = index;
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentListBySaleOrder,
      newObj
    );
  }

  fetchAddShipmentMileage(obj = [], isExport = false) {
    var newObj = {
      CompanyId: obj[0],
      TransporterId: obj[1],
      TruckLicense: obj[2],
      SiteSource: obj[4],
      TruckTypeId: obj[5],
      Qty: obj[6],
      ProductNo: obj[7],
      RefNo: obj[8],
      Remark: obj[9],
      MonthYear: obj[10],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddShipmentMileage,
      newObj
    );
  }

  fetchEditShipmentMileage(obj = [], isExport = false) {
    var newObj = {
      ShipmentId: obj[0],
      CompanyId: obj[1],
      TransporterId: obj[2],
      TruckLicense: obj[3],
      SiteSource: obj[5],
      TruckTypeId: obj[6],
      Qty: obj[7],
      ProductNo: obj[8],
      RefNo: obj[9],
      Remark: obj[10],
      MonthYear: obj[11],
    };

    console.log("newObj", newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditShipmentMileage,
      newObj
    );
  }

  fetchGetMiShipmentNoByShipmentId(index) {
    var newObj = {
      ShipmentId: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetMiShipmentNoByShipmentId,
      newObj
    );
  }

  fetchGetShipmentMileageById(index) {
    var newObj = {
      ShipmentNo: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentMileageById,
      newObj
    );
  }

  fetchGetTransferReCalculateMultiSaleOrder(obj = []) {
    var newObj = {
      ShipmentList: obj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransferReCalculateMultiShipment,
      newObj
    );
  }

  fetchDeleteShipmentNonSoList(obj = []) {
    var newObj = {
      ShipmentList: obj,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlDeleteShipmentNonSO,
      newObj
    );
  }

  fetchTransferReopenShipmentStatusList(obj = []) {
    var newObj = {
      ShipmentList: obj[0],
      UpdateBy: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransferReopenShipmentStatusList,
      newObj
    );
  }
  fetchTransferRejectShipmentStatusList(obj = []) {
    var newObj = {
      ShipmentList: obj[0],
      UpdateBy: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetTransferRejectShipmentStatusList,
      newObj
    );
  }
  //** Payment Transfer */

  fetchGetCreateTransferListForCreatePayment(obj = []) {
    var newObj = {
      deliveryDateStart: obj[0],
      deliveryDateEnd: obj[1],
      monthYear: obj[2],
      shipmentNo: obj[3],
      weightDocNo: obj[4],
      saleOrderNo: obj[5],
      sourceId: obj[6],
      transaporterId: obj[7],
      truckTypeId: obj[9],
      eDPStatus: obj[9],
      docStatus: obj[11],
      paymentStatus: obj[12],
      SummaryStatus: null,
      ShipmentType: obj[13],
      companyIdList: obj[15],
      SourceList: obj[17],
      DestList: obj[18],
      TransferTypeCode: obj[16],
      TonoSource: obj[19],
      TonoDest: obj[20],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetCreateTransferListForCreatePayment,
      newObj
    );
  }

  fetchGetTransferShipmentDataForPayment(index = []) {
    // console.log(index);
    var newArr = [];
    index.map((x) => {
      newArr.push(x.shipmentNo);
    });
    // console.log(newArr)
    var newObj = {
      ShipmentList: [...newArr],
    };
    // console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetDataTransferShipmentDetailList,
      newObj
    );
  }

  fetchTransferCreatePayment(
    PaymentHeader,
    FileList = [],
    shipmentIOList = [],
    isExport = false
  ) {
    console.log(PaymentHeader);
    console.log(FileList);
    const formData = new FormData();
    // var pay = JSON.stringify(PaymentHeader);
    // var fil = JSON.stringify(FileList);
    console.log(JSON.stringify(PaymentHeader));
    formData.append("PaymentHeader", JSON.stringify(PaymentHeader));

    FileList.map((x) => {
      formData.append("FileList", x.fileData);
      formData.append("Guid", x.guid);
      // formData.append("Guid2",  JSON.stringify(x.guid));
    });
    shipmentIOList.map((x) => {
      formData.append("ShipmentNo", x.shipmentNo);
      formData.append("IONo", x.ioNo);
      formData.append("RunningNo", x.runningNo);
      // formData.append("Guid2",  JSON.stringify(x.guid));
    });

    formData.append("IsExport", isExport);

    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlTransferCreatePayment,
      formData
    );
  }

  fetchAddTransferShipmentExtraChargeList(obj = []) {
    const formData = new FormData();
    formData.append("ShipmentNo", obj[0]);
    formData.append("ExtraChargeId", obj[1]);
    formData.append("TransporterTypeId", obj[2]);
    formData.append("ExtraChargeType", obj[3]);
    formData.append("ExtraChargeName", obj[4]);
    formData.append("ExtraChargePrice", obj[5]);
    if (obj[6] != null) formData.append("ExtraChargeQty", obj[6]);
    if (obj[7] != null) formData.append("RequestFile", obj[7]);
    if (obj[8] != null) formData.append("FileType", obj[8]);
    if (obj[9] != null) formData.append("RequestName1", obj[9]);
    if (obj[10] != null) formData.append("RequestValue1", obj[10]);
    if (obj[11] != null) formData.append("RequestName2", obj[11]);
    if (obj[12] != null) formData.append("RequestValue2", obj[12]);
    if (obj[13] != null) formData.append("RequestName3", obj[13]);
    if (obj[14] != null) formData.append("RequestValue3", obj[14]);
    if (obj[15] != null) formData.append("RequestName4", obj[15]);
    if (obj[16] != null) formData.append("RequestValue4", obj[16]);
    formData.append("CreateBy", obj[17]);
    formData.append("VatCode", obj[18]);
    formData.append("Vat", obj[19]);
    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlAddTransferShipmentExtraChargeList,
      formData
    );
  }
  fetchAddTransferShipmentExtraChargeMultiDrop(obj = []) {
    const formData = new FormData();
    formData.append("ShipmentNo", obj[0]);
    formData.append("MultiDropDistance", obj[1]);
    formData.append("RequestFile", obj[2]);
    formData.append("FileType", obj[3]);
    formData.append("CreateBy", obj[4]);
    return ApiBaseHelper.postFormDataRequestBody(
      ApiController._urlRemoveTransferShipmentExtraChargeList,
      formData
    );
  }

  fetchRemoveTransferShipmentExtraChargeList(obj = []) {
    var newObj = {
      ShipmentNo: obj[0],
      RunningNo: obj[1],
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlRemoveTransferShipmentExtraChargeList,
      newObj
    );
  }

  fetchGetTransferShipmentExtraChargeListById(index) {
    var newObj = {
      shipmentNo: index,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentExtraChargeListById,
      newObj
    );
  }

  fetchGetShipmentListByShipmentNo(index) {
    var newObj = index;
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlGetShipmentListByShipmentNo,
      newObj
    );
  }

  fetchGetTransfersForCreatePaymentListView(obj = []) {
    var newObj = {
      startDate: obj[0],
      endDate: obj[1],
      transporterId: obj[2],
      paymentNo: obj[3],
      refNo: obj[4],
      allPayNo: obj[5],
      paymentStatus: obj[6],
      companyId: obj[7],
      duedate: obj[8],
      isTransfer: obj[9] ? obj[9] : false,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlTransferCreatePaymentListView,
      newObj
    );
  }

  fetchGetTransferPaymentListViewForApprove(obj = []) {
    var newObj = {
      startDate: obj[0],
      endDate: obj[1],
      transporterId: obj[2],
      paymentNo: obj[3],
      refNo: obj[4],
      allPayNo: obj[5],
      paymentStatus: obj[6],
      companyId: obj[7],
      dueDate: obj[8],
      attachFileStatus: obj[9],
      exportModeId: obj[10],
      isTransfer: obj[11] ? true : false,
    };
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlTransferCreatePaymentListView,
      newObj
    );
  }

  fetchTransferSendToAllPay(index) {
    var newObj = {
      paymentId: index,
    };
    console.log(newObj);
    return ApiBaseHelper.postDataRequestBody(
      // ApiController._urlTransferSendToAllPay,
      ApiController._urlSendToAllPay,
      newObj
    );
  }

  fetchAddTransferShipmentNonSO(obj = [], isExport = false) {
    var newObj = {
      CompanyId: obj[0],
      TransporterId: obj[1],
      DeliveryDate: obj[2],
      SiteSource: obj[3],
      SiteDest: obj[4],
      TruckTypeId: obj[5],
      Qty: obj[6],
      ProductNo: obj[7],
      RefNo: obj[8],
      TransportTypeId: 1,
      TruckLicense: obj[9],
      TransferTypeCode: obj[10],
    };

    // companyId,
    // transporterId,
    // transferDate,
    // source,
    // dest,
    // truckTypeId,
    // qty,
    // productNo,
    // refNo,
    // truckLicense,
    // transferType,
    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlAddTransferShipmentNonSO,
      newObj
    );
  }

  fetchEditTransferShipmentNonSO(obj = [], isExport = false) {
    var newObj = {
      CompanyId: obj[0],
      TransporterId: obj[1],
      DeliveryDate: obj[2],
      SiteSource: obj[3],
      SiteDest: obj[4],
      TruckTypeId: obj[5],
      Qty: obj[6],
      ProductNo: obj[7],
      RefNo: obj[8],
      TransportTypeId: 1,
      TruckLicense: obj[9],
      TransferTypeCode: obj[10],
      ShipmentId: obj[11],
    };

    return ApiBaseHelper.postDataRequestBody(
      ApiController._urlEditTransferShipmentNonSO,
      newObj
    );
  }
}

const repository = new Repository();
export default repository;
