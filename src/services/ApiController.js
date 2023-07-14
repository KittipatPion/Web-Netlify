import SystemInfo from "../helpers/SystemInfo";

function getBaseUrl() {
  if (SystemInfo.environmentType === "DEV-LOCAL") {
    return (
      ApiController._http +
      ApiController._urlServerLocalhost +
      "/PION.SCG.SMP.WebAPI/api"
    );
  } else if (SystemInfo.environmentType === "DEV-NB01") {
    return (
      ApiController._http +
      ApiController._urlServerNB01.trim() +
      "/PION.SCG.SMP.WebAPI/api"
    );
  } else if (SystemInfo.environmentType === "DEV-NB02") {
    return (
      ApiController._http +
      ApiController._urlServerNB02 +
      "/PION.SCG.SMP.WebAPI/api"
    );
  } else if (SystemInfo.environmentType.trim() === "DP-LOCAL") {
    return ApiController._http + ApiController._urlServerDPLocalhost.trim() + "/api";
  } else if (SystemInfo.environmentType === "UAT-PO") {
    return ApiController._https + ApiController._urlServerPO.trim() + "/api";
  } else if (SystemInfo.environmentType === "UAT-SCG-DEV") {
    return ApiController._https + ApiController._urlServerSCGDEV.trim() + "/api";
  } else if (SystemInfo.environmentType === "UAT-SCG-QA") {
    return ApiController._https + ApiController._urlServerSCGQA.trim() + "/api";
  } else if (SystemInfo.environmentType === "PD") {
    return ApiController._https + ApiController._urlServerProduction.trim() + "/api";
  } else if (SystemInfo.environmentType === "PD-TEST") {
    return (
      ApiController._http + ApiController._urlServerProductionTest.trim() + "/api"
    );
  } else {
    return "unknown";
  }
}

function getOnlyUrl(environmentType) {
  if (environmentType === "DEV-LOCAL") {
    return (
      ApiController._http +
      ApiController._urlServerLocalhost.trim() +
      "/PION.SCG.SMP.WebAPI/api"
    );
  } else if (environmentType === "DEV-NB01") {
    return (
      ApiController._http +
      ApiController._urlServerNB01Phone.trim() +
      "/PION.SCG.SMP.WebAPI/api"
    );
  } else if (environmentType === "DEV-NB02") {
    return (
      ApiController._http +
      ApiController._urlServerNB02.trim() +
      "/PION.SCG.SMP.WebAPI/api"
    );
  } else if (environmentType === "DP-LOCAL") {
    return ApiController._http + ApiController._urlServerDPLocalhost.trim() + "/api";
  } else if (environmentType === "UAT-PO") {
    return ApiController._https + ApiController._urlServerPO.trim() + "/api";
  } else if (environmentType === "UAT-SCG-DEV") {
    return ApiController._https + ApiController._urlServerSCGDEV.trim() + "/api";
  } else if (environmentType === "UAT-SCG-QA") {
    return ApiController._https + ApiController._urlServerSCGQA.trim() + "/api";
  } else if (environmentType === "PD") {
    return ApiController._https + ApiController._urlServerProduction.trim() + "/api";
  } else if (environmentType === "PD-TEST") {
    return (
      ApiController._http + ApiController._urlServerProductionTest.trim() + "/api"
    );
  } else {
    return "unknown";
  }
}

export default class ApiController {
  static _http = "http://";
  static _https = "https://";
  static _urlServerLocalhost = "localhost";
  static _urlServerDPLocalhost = "localhost:89";
  static _urlServerNB01 = "192.168.88.241";
  static _urlServerNB02 = "192.168.88.98";
  static _urlServerPO = "pionscgsmpwebapi20210831115556.azurewebsites.net";
  static _urlServerSCGDEV = "scgchem-smpdev.scg.com";
  // static _urlServerSCGQA = "scgchem-smpqa.scg.com"; 
  static _urlServerProduction = "scgchem-tpcsmp.scg.com";
  static _urlServerProductionTest = "172.30.170.136:89";
  static tokenKey = "";
  static _urlServerSCGQA = "scgchem-tpcsmpqa.scg.com";

  //****************************** Get Data ****************************** */55
  /** Login */
  static _urlGetLoginUserData = getBaseUrl() + "/Authen/SystemLogin";

  /** Master Base Combo Box Item */
  static _urlGetComboBoxListByGroupNo =
    getBaseUrl() + "/ComboBox/GetComboBoxListByGroupNo";
  static _urlGetComboBoxNameOnlyListByGroupNo =
    getBaseUrl() + "/ComboBox/GetComboBoxNameOnlyListByGroupNo";

  /** Master Authentication */
  static _urlGetUserGroupAuthenListById =
    getBaseUrl() + "/UserGroupAuthen/GetUserGroupAuthenListById";
  static _urlResetPasswordUserListById =
    getBaseUrl() + "/User/ResetPasswordUserListById";
  static _urlChangePasswordByAdmin =
    getBaseUrl() + "/User/ChangePasswordByAdmin";
  static _urlChangePasswordByUser = getBaseUrl() + "/User/ChangePasswordByUser";

  /** Master Location */
  static _urlGetZoneList = getBaseUrl() + "/Zone/GetZoneList";
  static _urlGetZoneListById = getBaseUrl() + "/Zone/GetZoneListById";
  static _urlGetZoneDetailList = getBaseUrl() + "/ZoneDetail/GetZoneDetailList";
  static _urlGetZoneDetailListById =
    getBaseUrl() + "/ZoneDetail/GetZoneDetailListById";
  static _urlGetZoneDetailOtherList =
    getBaseUrl() + "/ZoneDetail/GetZoneDetailOtherList";
  static _urlGetSourceList = getBaseUrl() + "/Source/GetSourceList";
  static _urlGetSourceNameOnlyList =
    getBaseUrl() + "/Source/GetSourceNameOnlyList";
  static _urlGetSourceListById = getBaseUrl() + "/Source/GetSourceListById";
  static _urlGetSourcePlantList =
    getBaseUrl() + "/SourcePlant/GetSourcePlantList";
  static _urlGetSourcePlantListById =
    getBaseUrl() + "/SourcePlant/GetSourcePlantListById";
  static _urlGetShipToList = getBaseUrl() + "/ShipTo/GetShipToList";
  static _urlGetShipToListById = getBaseUrl() + "/ShipTo/GetShipToListById";
  static _urlGetShipToOtherList = getBaseUrl() + "/ShipTo/GetShipToOtherList";
  static _urlGetCYPlaceList = getBaseUrl() + "/CYPlace/GetCYPlaceList";
  static _urlGetCYPlaceListById = getBaseUrl() + "/CYPlace/GetCYPlaceListById";
  static _urlGetPostCodeList = getBaseUrl() + "/PostCode/GetPostCodeList";
  static _urlGetPostCodeListById =
    getBaseUrl() + "/PostCode/GetPostCodeListById";
  static _urlGetPostCodeOtherList =
    getBaseUrl() + "/PostCode/GetPostCodeOtherList";

  /** Master Logistics */
  static _urlGetTransporterNameOnlyList =
    getBaseUrl() + "/Logistic/GetTransporterNameOnlyList";
  static _urlGetTruckTypeList = getBaseUrl() + "/TruckType/GetTruckTypeList";
  static _urlGetTruckTypeNameOnlyList =
    getBaseUrl() + "/TruckType/GetTruckTypeNameOnlyList";
  static _urlGetTruckTypeListById =
    getBaseUrl() + "/TruckType/GetTruckTypeListById";

  /** Master Contract */
  static _urlGetContractDomesticList =
    getBaseUrl() + "/Domestic/GetContractDomesticList";
  static _urlGetContractDomesticListById =
    getBaseUrl() + "/Domestic/GetContractDomesticListById";
  static _urlGetContractDomesticOtherList =
    getBaseUrl() + "/Domestic/GetContractDomesticOtherList";
  static _urlGetContractDomesticForSearchList =
    getBaseUrl() + "/Domestic/GetContractDomesticForSearchList";

  /** Master Expenses */
  static _urlGetExtraChargeNameOnlyList =
    getBaseUrl() + "/ExtraCharge/GetExtraChargeNameOnlyList";
  static _urlGetVatList = getBaseUrl() + "/ExtraCharge/GetVatList";

  /** Transaction */
  /** Transaction Domestic */
  static _urlGetDomDeliveryList =
    getBaseUrl() + "/DeliveryList/GetDomDeliveryList";
  static _urlGetDomDeliveryForSearchList =
    getBaseUrl() + "/DeliveryList/GetDomDeliveryForSearchList";
  static _urlGetDomDeliveryListById =
    getBaseUrl() + "/DeliveryList/GetDomDeliveryListById";
  static _urlGetReCalculateTransportRate =
    getBaseUrl() + "/DeliveryList/GetReCalculateTransportRate";
  static _urlGetMasterExtraChargeListByGroupType =
    getBaseUrl() + "/DeliveryList/GetMasterExtraChargeListByGroupType";
  static _urlGetShipmentExtraChargeListById =
    getBaseUrl() + "/DeliveryList/GetShipmentExtraChargeListById";
  static _urlGetDomCreditDebitList =
    getBaseUrl() + "/CreditDebit/GetDomCreditDebitList";
  static _urlGetDomDeliveryItemList =
    getBaseUrl() + "/DeliveryList/GetDomDeliveryItemList";
  static _urlGetReCalculateMultiShipment =
    getBaseUrl() + "/DeliveryList/GetReCalculateMultiShipment";
  static _urlGetShipmentNonSOById =
    getBaseUrl() + "/ShipmentNonSO/GetShipmentNonSOById";
  static _urlGetShipmentNoByShipmentId =
    getBaseUrl() + "/ShipmentNonSO/GetShipmentNoByShipmentId";

  /** Transaction Export */
  static _urlGetExpDeliveryList =
    getBaseUrl() + "/ExpDeliveryList/GetExpDeliveryList";
  static _urlGetExpDeliveryListById =
    getBaseUrl() + "/ExpDeliveryList/GetExpDeliveryListById";
  static _urlGetExpTransportRateById =
    getBaseUrl() + "/ExpDeliveryList/GetExpTransportRateById";
  static _urlGetShipmentExtraChargeListBySaleOrder =
    getBaseUrl() + "/ExpDeliveryList/GetShipmentExtraChargeListBySaleOrder";
  static _urlGetReCalculateExpTransportRate =
    getBaseUrl() + "/ExpDeliveryList/GetReCalculateExpTransportRate";
 
  static _urlGetExpDeliveryItemList =
    getBaseUrl() + "/ExpDeliveryList/GetExpDeliveryItemList";
  static _urlGetReCalculateMultiSaleOrder =
    getBaseUrl() + "/ExpDeliveryList/GetReCalculateMultiSaleOrder";
  static _urlGetShipmentListBySaleOrder =
    getBaseUrl() + "/ExpDeliveryList/GetShipmentListBySaleOrder";

  /** Transaction Domestic */
  static _urlGetTransferDeliveryList =
    getBaseUrl() + "/TransferDeliveryList/GetDomDeliveryList";
  static _urlGetTransferDeliveryForSearchList =
    getBaseUrl() + "/TransferDeliveryList/GetDomDeliveryForSearchList";
  static _urlGetTransferDeliveryListById =
    getBaseUrl() + "/TransferDeliveryList/GetDomDeliveryListById";
  static _urlGetTransferReCalculateTransportRate =
    getBaseUrl() + "/TransferDeliveryList/GetReCalculateTransportRate";
  static _urlGetTransferMasterExtraChargeListByGroupType =
    getBaseUrl() + "/TransferDeliveryList/GetMasterExtraChargeListByGroupType";
  static _urlGetTransferShipmentExtraChargeListById =
    getBaseUrl() + "/TransferDeliveryList/GetShipmentExtraChargeListById";
  static _urlGetTransferCreditDebitList =
    getBaseUrl() + "/TransferDeliveryList/GetDomCreditDebitList";
  static _urlGetTransferDeliveryItemList =
    getBaseUrl() + "/TransferDeliveryList/GetDomDeliveryItemList";
  static _urlGetTrnasferReCalculateMultiShipment =
    getBaseUrl() + "/TransferDeliveryList/GetReCalculateMultiShipment";
  static _urlGetTrnasferShipmentNonSOById =
    getBaseUrl() + "/ShipmentNonSO/GetShipmentNonSOById";
  static _urlGetTransferShipmentNoByShipmentId =
    getBaseUrl() + "/ShipmentNonSO/GetShipmentNoByShipmentId";
    static _urlGetReCalculateTransferTransportRate =
    getBaseUrl() + "/TransferList/GetReCalculateTransferTransportRate";

  /** Transaction Payment */
  static _urlGetPaymentUserListByUserType =
    getBaseUrl() + "/PaymentList/GetPaymentUserListByUserType";
  static _urlCancelPaymentById =
    getBaseUrl() + "/PaymentList/CancelPaymentById";

  /** Other Function */
  static _urlGetAutoStartEndDateTime =
    getBaseUrl() + "/DateTime/GetAutoStartEndDateTime";
  static _urlDownloadFile = getBaseUrl() + "/File/DownloadFile";

  static _urlCreatePaymentDownloadFile =
    getBaseUrl() + "/File/PaymentDownloadFile";

  //****************************** Add Data ****************************** */
  /** Master Location */
  static _urlAddZoneList = getBaseUrl() + "/Zone/AddZoneList";
  static _urlAddZoneDetailList = getBaseUrl() + "/ZoneDetail/AddZoneDetailList";
  static _urlAddSourceList = getBaseUrl() + "/Source/AddSourceList";
  static _urlAddSourcePlantList =
    getBaseUrl() + "/SourcePlant/AddSourcePlantList";
  static _urlAddShipToList = getBaseUrl() + "/ShipTo/AddShipToList";
  static _urlAddCYPlaceList = getBaseUrl() + "/CYPlace/AddCYPlaceList";
  static _urlAddPostCodeList = getBaseUrl() + "/PostCode/AddPostCodeList";

  /** Master Logistics */
  static _urlAddTruckTypeList = getBaseUrl() + "/TruckType/AddTruckTypeList";

  /** Master Contract */
  static _urlAddContractDomesticList =
    getBaseUrl() + "/Domestic/AddContractDomesticList";

  /** Transaction */
  static _urlAddShipmentExtraChargeList =
    getBaseUrl() + "/DeliveryList/AddShipmentExtraChargeList";
  static _urlAddShipmentExtraChargeMultiDrop =
    getBaseUrl() + "/DeliveryList/AddShipmentExtraChargeMultiDrop";
  static _urlAddShipmentNonSO =
    getBaseUrl() + "/ShipmentNonSO/AddShipmentNonSO";

  //****************************** Edit Data ****************************** */
  /** Master Authentication */
  static _urlEditUserGroupAuthenListById =
    getBaseUrl() + "/UserGroupAuthen/EditUserGroupAuthenListById";

  /** Master Location */
  static _urlEditZoneList = getBaseUrl() + "/Zone/EditZoneList";
  static _urlEditZoneDetailList =
    getBaseUrl() + "/ZoneDetail/EditZoneDetailList";
  static _urlEditSourceList = getBaseUrl() + "/Source/EditSourceList";
  static _urlEditShipToList = getBaseUrl() + "/ShipTo/EditShipToList";
  static _urlEditCYPlaceList = getBaseUrl() + "/CYPlace/EditCYPlaceList";
  static _urlEditPostCodeList = getBaseUrl() + "/PostCode/EditPostCodeList";

  /** Master Logistics */
  static _urlEditTruckTypeList = getBaseUrl() + "/TruckType/EditTruckTypeList";

  /** Master Contract */
  static _urlEditContractDomesticList =
    getBaseUrl() + "/Domestic/EditContractDomesticList";

  /** Transaction Delivery List */
  static _urlReopenShipmentStatusList =
    getBaseUrl() + "/DeliveryList/ReopenShipmentStatusList";
  static _urlRejectShipmentStatusList =
    getBaseUrl() + "/DeliveryList/RejectShipmentStatusList";
  static _urlEditDeliveryStatusList =
    getBaseUrl() + "/DeliveryList/EditDeliveryStatusList";

  /** Transaction Credit Debit */
  static _urlApproveCreditDebitStatusList =
    getBaseUrl() + "/CreditDebit/ApproveCreditDebitStatusList";
  static _urlRejectCreditDebitStatusList =
    getBaseUrl() + "/CreditDebit/RejectCreditDebitStatusList";
  static _urlTransferRejectCreditDebitStatusList =
    getBaseUrl() + "/CreditDebit/RejectTransferCreditDebitStatusList";

  /** Transaction Payment List */
  static _urlAcceptPaymentList =
    getBaseUrl() + "/PaymentList/AcceptPaymentList";
  static _urlVerifyPaymentList =
    getBaseUrl() + "/PaymentList/VerifyPaymentList";
  static _urlApprovePaymentList =
    getBaseUrl() + "/PaymentList/ApprovePaymentList";
  static _urlRejectPaymentList =
    getBaseUrl() + "/PaymentList/RejectPaymentList";
  static _urlEditShipmentNonSO =
    getBaseUrl() + "/ShipmentNonSO/EditShipmentNonSO";

  //****************************** Remove Data ****************************** */
  /** Master Location */
  static _urlRemoveZoneList = getBaseUrl() + "/Zone/RemoveZoneList";
  static _urlRemoveZoneDetailList =
    getBaseUrl() + "/ZoneDetail/RemoveZoneDetailList";
  static _urlRemoveSourceList = getBaseUrl() + "/Source/RemoveSourceList";
  static _urlRemoveSourcePlantList =
    getBaseUrl() + "/SourcePlant/RemoveSourcePlantList";
  static _urlRemoveShipToList = getBaseUrl() + "/ShipTo/RemoveShipToList";
  static _urlRemoveCYPlaceList = getBaseUrl() + "/CYPlace/RemoveCYPlaceList";
  static _urlRemovePostCodeList = getBaseUrl() + "/PostCode/RemovePostCodeList";

  /** Master Logistics */
  static _urlRemoveTruckTypeList =
    getBaseUrl() + "/TruckType/RemoveTruckTypeList";

  /** Master Contract */
  static _urlRemoveContractDomesticList =
    getBaseUrl() + "/Domestic/RemoveContractDomesticList";

  /** Transaction */
  static _urlRemoveShipmentExtraChargeList =
    getBaseUrl() + "/DeliveryList/RemoveShipmentExtraChargeList";

  //---------------------------------------GAME-------------------------------------------------------//

  //Location//
  static _urlGetCountryListById = getBaseUrl() + "/Location/GetCountryListById";
  static _urlGetCountryList = getBaseUrl() + "/Location/GetCountryList";
  static _urlGetCountryListExport =
    getBaseUrl() + "/Location/GetCountryListExport";
  static _urlGetDistrictListById =
    getBaseUrl() + "/Location/GetDistrictListById";
  static _urlGetDistrictList = getBaseUrl() + "/Location/GetDistrictList";
  static _urlGetProvinceListById =
    getBaseUrl() + "/Location/GetProvinceListById";
  static _urlGetProvinceList = getBaseUrl() + "/Location/GetProvinceList";
  static _urlGetTransporterListById =
    getBaseUrl() + "/Logistic/GetTransporterListById";
  static _urlGetPortList = getBaseUrl() + "/Port/GetPortList";
  static _urlGetPortListById = getBaseUrl() + "/Port/GetPortListById";

  static _urlAddPortList = getBaseUrl() + "/Port/InsertPortList";
  static _urlEditPortList = getBaseUrl() + "/Port/UpdatePortList";
  static _urlDeletePortList = getBaseUrl() + "/Port/DeletePortByPortId";

  static _urlAddCountryList = getBaseUrl() + "/Location/InsertCountryList";
  static _urlAddDistrictList = getBaseUrl() + "/Location/InsertDistrictList";
  static _urlAddProvinceList = getBaseUrl() + "/Location/InsertProvinceList";
  static _urlEditCountryList = getBaseUrl() + "/Location/UpdateCountry";
  static _urlEditDistrictList = getBaseUrl() + "/Location/UpdateDistrict";
  static _urlEditProvinceList = getBaseUrl() + "/Location/UpdateProvince";
  static _urlDeleteCountryList = getBaseUrl() + "/Location/DeleteCountry";
  static _urlDeleteDistrictList = getBaseUrl() + "/Location/DeleteDistrict";
  static _urlDeleteProvinceList = getBaseUrl() + "/Location/DeleteProvince";

  //

  /** Company */
  static _urlGetCompanyList = getBaseUrl() + "/Company/GetCompanyList";
  static _urlGetCompanyListById = getBaseUrl() + "/Company/GetCompanyListById";
  static _urlGetCompanyCostList =
    getBaseUrl() + "/PaymentList/GetCompanyCostList";
  static _urlAddCompanyList = getBaseUrl() + "/Company/InsertCompanyList";
  static _urlEditCompanyList = getBaseUrl() + "/Company/UpdateCompanyList";
  static _urlDeleteCompanyList =
    getBaseUrl() + "/Company/DeleteCompanyByCompanyId";

  //Logistic//
  static _urlGetTransporterList = getBaseUrl() + "/Logistic/GetTransporterList";
  static _urlGetTransporterListForCreate =
    getBaseUrl() + "/Logistic/GetTransporterForCreatePayment";
  static _urlGetTransporterRateList =
    getBaseUrl() + "/Logistic/GetTransportRate";
  static _urlGetTransporterVatList =
    getBaseUrl() + "/Logistic/GetTransportRateVat";
  static _urlInsertTransporterList =
    getBaseUrl() + "/Logistic/InsertTransportList";
  static _urlUpdateTransporterList =
    getBaseUrl() + "/Logistic/UpdateTransportList";
  static _urlDeleteTransporterList = getBaseUrl() + "/Logistic/DeleteTransport";
  static _urlGetTransporterListByMain =
    getBaseUrl() + "/PaymentList/GetTransporterParentsById";

  //

  //Domestic//
  static _urlGetTruckLicenseList =
    getBaseUrl() + "/DomTruckLicense/GetTruckLicenseList";
  static _urlGetUnloadRateList =
    getBaseUrl() + "/DomUnloadRate/GetUnloadRateList";
  static _urlGetTransportRateList =
    getBaseUrl() + "/DomTransportRate/GetTransportRateList";
  static _urlGetCbProvinceAndDistrictList =
    getBaseUrl() + "/DomTransportRate/GetProvinceAndDistrictList";
  static _urlGetCbFuelTypeList = getBaseUrl() + "/ComboBox/GetFuelTypeList";

  static _urlDeleteTruckLicenseList =
    getBaseUrl() + "/DomTruckLicense/RemoveDomTruckLicenseList";
  static _urlDeleteUnloadList =
    getBaseUrl() + "/DomUnloadRate/RemoveDomUnloadList";
  static _urlDeleteTransportRateList =
    getBaseUrl() + "/DomTransportRate/RemoveDomTransportRateList";
  static _urlInsertExportExcelFiles =
    getBaseUrl() + "/ImportExcel/InserExExcelFile";
  //

  /**Transaction */
  static _urlAddHistoryLog = getBaseUrl() + "/HistoryLog/InsertHistoryLog";
  static _urlGetEDPList = getBaseUrl() + "/EDP/GetEDPList";
  static _urlGetEDPListBySearch = getBaseUrl() + "/EDP/GetEDPListBySearch";
  static _urlGetEDPListApproveBySearch =
    getBaseUrl() + "/EDP/GetEDPListApproveBySearch";
  static _urlEditEdpListApprove = getBaseUrl() + "/EDP/EditEDPListApprove";
  static _urlGetEDPInsertEx = getBaseUrl() + "/EDP/InserEDPList";
  static _urlEditEdpList = getBaseUrl() + "/EDP/EditEDPList";
  static _urlRefreshData = getBaseUrl() + "/EDP/GetEDPRefreshList";
  //

  /**FuelPrice */
  static _urlGetUpdateFuelPriceList = getBaseUrl() + "/FuelPrice/UpdateFuelPTT";
  static _urlGetFuelPriceList = getBaseUrl() + "/FuelPrice/GetFuelPriceList";
  static _urlGetFuelPriceListBtSearch =
    getBaseUrl() + "/FuelPrice/GetFuelPriceListBySearch";
  static _urlGetFuelPriceById =
    getBaseUrl() + "/FuelPrice/GetFuelPriceListById";
  static _urlInsertFuelPrice = getBaseUrl() + "/FuelPrice/InsertFuelPriceList";
  static _urlEditFuelPrice = getBaseUrl() + "/FuelPrice/UpdateFuelPriceList";
  static _urlDeleteFuelPrice = getBaseUrl() + "/FuelPrice/DeletePortByPortId";

  /**ExportVessel */
  static _urlGetContractExportForSearchList =
    getBaseUrl() + "/ExportVessel/GetContractExportForSearchList";
  static _urlGetExportVesselListBySearch =
    getBaseUrl() + "/ExportVessel/GetExportVesselListBySearch";
  static _urlGetExportVesselListAdd =
    getBaseUrl() + "/ExportVessel/AddContractExportVesselList";
  static _urlGetContractEcportVesselListById =
    getBaseUrl() + "/ExportVessel/GetExportVesselListById";
  static _urlEditExportVesselList =
    getBaseUrl() + "/ExportVessel/EditContractExportVesselList";
  static _urlRemoveContractExportList =
    getBaseUrl() + "/ExportVessel/RemoveContractExportVesselList";

  //**ExportTruck */
  static _urlGetExportTruckListForSearch =
    getBaseUrl() + "/ExportTruck/GetContractExportTruckForSearchList";
  static _urlGetExportTruckListBySearch =
    getBaseUrl() + "/ExportTruck/GetExportTruckListBySearch";
  static _urlGetContractExportTruckListById =
    getBaseUrl() + "/ExportTruck/GetExportTruckListById";
  static _urlGetExportTruckListAdd =
    getBaseUrl() + "/ExportTruck/AddContractExportTruckList";
  static _urlGetExportShipTo =
    getBaseUrl() + "/ExportTruck/GetExportTurckShipTo";
  static _urlEditExportTruckList =
    getBaseUrl() + "/ExportTruck/EditContractExportTruckList";
  static _urlRemoveContractExportTruckList =
    getBaseUrl() + "/ExportTruck/RemoveContractExportTruckList";

  //**ExportLCL,AIR */
  static _urlGetExportLCLAIRListForSearch =
    getBaseUrl() + "/ExportLCLAir/GetContractExportTruckForSearchList";
  static _urlGetExportLCLAIRListBySearch =
    getBaseUrl() + "/ExportLCLAir/GetExportLCLAIRListBySearch";
  static _urlGetContractExportLCLAIRListById =
    getBaseUrl() + "/ExportLCLAir/GetExportLCLAIRListById";
  static _urlGetExportLCLAIRListAdd =
    getBaseUrl() + "/ExportLCLAir/AddContractExporLCLAIRList";
  static _urlEditExportLCLAIRList =
    getBaseUrl() + "/ExportLCLAir/EditContractExportLCLAIRList";
  static _urlRemoveContractExportLCLAIRList =
    getBaseUrl() + "/ExportLCLAir/RemoveContractExportLCLAIRList";

  //**EPZ */
  static _urlGetEPZListForSearch =
    getBaseUrl() + "/EPZ/GetContractEPZForSearchList";
  static _urlGetEPZListBySearch = getBaseUrl() + "/EPZ/GetEPZListBySearch";
  static _urlGetContractEPZListById = getBaseUrl() + "/EPZ/GetEPZListById";
  static _urlAddEPZList = getBaseUrl() + "/EPZ/AddContractEPZList";
  static _urlEditEPZList = getBaseUrl() + "/EPZ/EditContractEPZList";
  static _urlRemoveContractEPZList =
    getBaseUrl() + "/EPZ/RemoveContractEPZList";

  //**Transfer */

  static _urlGetTransferListBySearch =
    getBaseUrl() + "/Transfer/GetTransferListBySearch";
  static _urlGetContractTransferListById =
    getBaseUrl() + "/Transfer/GetTransferListById";
  static _urlAddTransferList =
    getBaseUrl() + "/Transfer/AddContractTransferList";
  static _urlEditTransferList =
    getBaseUrl() + "/Transfer/EditContractTransferList";
  static _urlRemoveContractTransferList =
    getBaseUrl() + "/Transfer/RemoveContractTransferList";

  /**Approve Contract */
  static _urlGetApproveContractListForSearch =
    getBaseUrl() + "/ApproveContract/GetApproveContractListBySearch";
  static _urlUpdateApproveContractList =
    getBaseUrl() + "/ApproveContract/EditApproveContractTruckList";

  /**Payment */
  static _urlGetDomDeliveryListForCreatePayment =
    getBaseUrl() + "/DeliveryList/GetDomDeliveryListForCreatePayment";

  /**Payment */
  static _urlGetDataShipmentDetailList =
    getBaseUrl() + "/PaymentList/GetPaymentDetailShipmentList";

  static _urlCreatePayment = getBaseUrl() + "/PaymentList/AddPaymentList";

  static _urlCreatePaymentListView =
    getBaseUrl() + "/PaymentList/GetPaymentList";

  static _urlGetPaymentForAddCoverSheet =
    getBaseUrl() + "/PaymentList/GetPaymentForAddCoverSheet";

  static _urlGetCreatePaymentById =
    getBaseUrl() + "/PaymentList/GetPaymentListById";

  static _urlEditCreatePayment = getBaseUrl() + "/PaymentList/EditPaymentList";

  //Export
  static _urlGetExpDataShipmentDetailList =
    getBaseUrl() + "/ExpPaymentList/GetExpPaymentDetailShipmentList";
  static _urlGetExpDeliveryListForCreatePayment =
    getBaseUrl() + "/ExpDeliveryList/GetExpDeliveryListForCreatePayment";

  static _urlExpCreatePaymentListView =
    getBaseUrl() + "/PaymentList/GetPaymentList";

  /**AllPay */
  static #_BaseUrlForAllPay = SystemInfo.isSameUrlForAllPay
    ? getBaseUrl()
    : getOnlyUrl(SystemInfo.envTypeForAllPay);
  static _urlSendToAllPay =
    this.#_BaseUrlForAllPay + "/PaymentList/SendToAllPayById";

  static _urlTransferSendToAllPay =
    this.#_BaseUrlForAllPay + "/PaymentList/TransferSendToAllPayById";


  //**ใบปะหน้า */
  static _urlGetCoverPageData =
    getBaseUrl() + "/PaymentList/GetSummaryCoverSheetByPaymentId";

  /**Dashboard */
  static _urlGetDashBoardView = getBaseUrl() + "/Dashboard/GetDashBoardView";
  static _urlGetDashBoardView2 = getBaseUrl() + "/Dashboard/GetDashBoardView2";
  static _urlGetDashBoardView3 = getBaseUrl() + "/Dashboard/GetDashBoardView3";
  static _urlGetDashBoardView4 = getBaseUrl() + "/Dashboard/GetDashBoardView4";
  static _urlGetDashBoardView5 = getBaseUrl() + "/Dashboard/GetDashBoardView5";
  static _urlGetDashBoardMain = getBaseUrl() + "/Dashboard/GetDashBoardMain";

  //-----------------------------------------Edit by Gift---------------------------------------

  //-----------------------------------------Function Get---------------------------------------
  /**ContainerReturn */
  static _urlGetPlaceContainerReturnList =
    getBaseUrl() + "/PlaceContainerReturn/GetPlaceContainerReturnList";
  static _urlGetPlaceContainerReturnListById =
    getBaseUrl() + "/PlaceContainerReturn/GetPlaceContainerReturnListById";
  /**ExtraCharge */
  static _urlGetExtraChargeList =
    getBaseUrl() + "/ExtraCharge/GetExtraChargeList";
  static _urlGetExtraChargeListById =
    getBaseUrl() + "/ExtraCharge/GetExtraChargeListById";
  static _urlGetExtraChargeOtherList =
    getBaseUrl() + "/ExtraCharge/GetExtraChargeOtherList";
  /**UserGroup */
  static _urlGetUserGroupList = getBaseUrl() + "/UserGroup/GetUserGroupList";
  static _urlGetUserGroupListById =
    getBaseUrl() + "/UserGroup/GetUserGroupListById";
  /**User */
  static _urlGetUserList = getBaseUrl() + "/User/GetUserList";
  static _urlGetUserListById = getBaseUrl() + "/User/GetUserListById";
  /**Authentication */
  static _urlGetUserGroupNameOnlyList =
    getBaseUrl() + "/UserGroup/GetUserGroupNameOnlyList";

  //-----------------------------------------Function Add---------------------------------------
  /**ContainerReturn */
  static _urlAddPlaceContainerReturnList =
    getBaseUrl() + "/PlaceContainerReturn/AddPlaceContainerReturnList";
  /**ExtraCharge */
  static _urlAddExtraChargeList =
    getBaseUrl() + "/ExtraCharge/AddExtraChargeList";
  /**UserGroup */
  static _urlAddUserGroupList = getBaseUrl() + "/UserGroup/AddUserGroupList";
  /**User */
  static _urlAddUserList = getBaseUrl() + "/User/AddUserList";

  //-----------------------------------------Function Delete---------------------------------------
  /**ContainerReturn */
  static _urlRemovePlaceContainerReturnList =
    getBaseUrl() + "/PlaceContainerReturn/RemovePlaceContainerReturnList";
  /**ExtraCharge */
  static _urlDeleteExtraChargeList =
    getBaseUrl() + "/ExtraCharge/RemoveExtraChargeList";
  /**UserGroup */
  static _urlRemoveUserGroupList =
    getBaseUrl() + "/UserGroup/RemoveUserGroupList";
  /**User */
  static _urlRemoveUserList = getBaseUrl() + "/User/RemoveUserList";

  //-----------------------------------------Function Edite---------------------------------------
  /**ContainerReturn */
  static _urlEditPlaceContainerReturnList =
    getBaseUrl() + "/PlaceContainerReturn/EditPlaceContainerReturnList";
  /**ExtraCharge */
  static _urlEditExtraChargeList =
    getBaseUrl() + "/ExtraCharge/EditExtraChargeList";
  /**UserGroup */
  static _urlEditUserGroupList = getBaseUrl() + "/UserGroup/EditUserGroupList";
  /**User */
  static _urlEditUserList = getBaseUrl() + "/User/EditUserList";
  //-----------------------------------CommandJobs----------------------------------------------
  //**Search */
  static _urlGetCommandJobs = getBaseUrl() + "/CommandJobs/GetCommandJobs";
  //**date */
  static _urlGetAutoStartEndOneDayDateTime =
    getBaseUrl() + "/DateTime/GetAutoStartEndOneDayDateTime";
  //----------------------------------InterfaceErrorLog------------------------------------------
  static _urlGetInterfaceErrorLog =
    getBaseUrl() + "/InterfaceErrorLog/GetInterfaceErrorLog";

  //------------------------ Transfer --------------------------------------------------------------//

  static _urlGetTransferList =
    getBaseUrl() + "/TransferList/GetTransferList";
  static _urlGetTransferListById =
    getBaseUrl() + "/TransferList/GetTransferListById";
  static _urlAddShipmentMileage =
    getBaseUrl() + "/ShipmentMileage/AddShipmentMileage";
  static _urlGetMiShipmentNoByShipmentId =
    getBaseUrl() + "/ShipmentMileage/GetShipmentNoByShipmentId";
  static _urlGetShipmentMileageById =
    getBaseUrl() + "/ShipmentMileage/GetShipmentMileageById";
  static _urlEditShipmentMileage =
    getBaseUrl() + "/ShipmentMileage/EditShipmentMileage";
  static _urlGetTransferReCalculateMultiShipment =
    getBaseUrl() + "/TransferList/GetReCalculateMultiShipment";
    static _urlDeleteShipmentNonSO =
    getBaseUrl() + "/ShipmentNonSO/DeleteShipmentNonSO";
  static _urlGetTransferReopenShipmentStatusList =
    getBaseUrl() + "/TransferList/ReopenShipmentStatusList";
  static _urlGetTransferRejectShipmentStatusList =
    getBaseUrl() + "/TransferList/RejectShipmentStatusList";

  /**Payment */
  static _urlGetCreateTransferListForCreatePayment =
    getBaseUrl() + "/TransferList/GetCreateTransferListForCreatePayment";

  static _urlGetDataTransferShipmentDetailList =
    getBaseUrl() + "/PaymentList/GetTransferPaymentDetailShipmentList";

  static _urlTransferCreatePayment = getBaseUrl() + "/PaymentList/AddTransferPaymentList";
  static _urlAddTransferShipmentExtraChargeList =
    getBaseUrl() + "/TransferList/AddTransferShipmentExtraChargeList";
  static _urlRemoveTransferShipmentExtraChargeList =
    getBaseUrl() + "/TransferList/RemoveTransferShipmentExtraChargeList";

  static _urlGetTransferShipmentExtraChargeListById =
    getBaseUrl() + "/TransferList/GetTransferShipmentExtraChargeListById";

  static _urlGetShipmentListByShipmentNo =
    getBaseUrl() + "/TransferList/GetShipmentListByShipment";

  static _urlTransferCreatePaymentListView =
    getBaseUrl() + "/PaymentList/GetTransferPaymentList";

  static _urlAddTransferShipmentNonSO =
    getBaseUrl() + "/ShipmentNonSO/AddTransferShipmentNonSO";

  static _urlEditTransferShipmentNonSO =
    getBaseUrl() + "/ShipmentNonSO/EditTransferShipmentNonSO";


}
