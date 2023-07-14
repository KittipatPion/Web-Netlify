export default class Constant {
  static _Username = localStorage.getItem("username");

  //============================== String Constant ============================== //

  //****************************** API Response ****************************** */
  static apiLoadingData = "กำลังโหลดข้อมูล...";
  static apiTopicFetchError = "ข้อมูลเกิดข้อผิดพลาด";
  static apiMessageUnAuthenToUsePage = {
    message: "คุณไม่มีสิทธิ์ในการเข้าใช้งานหน้าเว็บไซต์นี้",
  };

  static apiHisLogReOpenDelivery =
    "รายการ Delivery List ถูก Reopen โดย " + this._Username;
  static apiHisLogRejectDelivery =
    "รายการ Delivery List ถูก Reject โดย " + this._Username + " เนื่องจาก ";
  static apiHisLogCreateCreditDebit =
    "รายการ Extra Charge ถูกสร้างโดย " + this._Username;
  static apiHisLogInitialCreditDebit =
    "รายการ Extra Charge ถูก Initial โดย " + this._Username;
  static apiHisLogApproveCreditDebit =
    "รายการ Extra Charge ถูก Approve โดย " + this._Username;
  static apiHisLogRejectCreditDebit =
    "รายการ Extra Charge ถูก Reject โดย " + this._Username + " เนื่องจาก ";
  static apiHisLogDeleteCreditDebit =
    "รายการ Extra Charge ถูกลบโดย " + this._Username;

  //****************************** InValid ****************************** */
  static inValidNullMessage = "กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน";
  static inValidNullSelected = "กรุณาเลือกรายการ";
  static inValidNullBelow = "กรุณากรอกข้อมูลด้านล่างในแท็บของ";
  static inValidMoreThanValue = "กรุณากรอกค่าให้น้อยกว่าค่าเริ่มต้น";

  static inValidDuplicateValue = "ตรวจพบข้อมูลซ้ำ";

  //****************************** Button ****************************** */
  static btAddData = "เพิ่มข้อมูล";
  static btCreateOrder = "สร้างรายการ";
  static btEditData = "แก้ไขข้อมูล";
  static btDeleteData = "ลบข้อมูล";
  static btDeleteShipmentNonSOData = "ลบข้อมูล Shipment Non-SO";
  static btSave = "บันทึก";
  static btOKNew = "ตกลง";
  static btOK = "ยืนยัน";
  static btCancel = "ยกเลิก";
  static btCollapseShow = "แสดง";
  static btCollapseHide = "ซ่อน";
  static btCalculate = "คำนวณ";
  static btSearchData = "ค้นหา";
  static btClearData = "ล้างข้อมูล";
  static btCloneData = "คัดลอกข้อมูล";
  static btReOpen = "Reopen";
  static btApprove = "Approve";
  static btInitial = "Initial";
  static btAccept = "Accept";
  static btReJect = "Reject";
  static btViewContract = "ดูสัญญา";
  static btViewContractTransport = "ดูสัญญา (ขนส่ง)";
  static btViewContractShipping = "ดูสัญญา (Shipping)";
  static btReCalculate = "คำนวณใหม่";
  static btShowImage = "แสดงรูปภาพ";
  static btDownloadFile = "ดาวน์โหลดไฟล์";
  static btExportFileDelivery = "Delivery List File";
  static btExportFileTransfer = "Transfer List File";
  static btExportFileAccure = "Accrue File";
  static btExportFileSaleOrder = "Sale Order List File";
  static btResetPassword = "Reset รหัสผ่าน";
  static btChangePassword = "เปลี่ยนรหัสผ่าน";
  static btSelectAll = "เลือกทั้งหมด";
  static btViewCoverSheet = "ใบปะหน้า";
  static btViewData = "ดูข้อมูล";
  static btAddItem = "Add Item";
  static btUploadInvoice = "Upload Invoice,Tax Invoice Click";
  static btAddAttachFile = "Click to Attach file";

  //****************************** Text Unit ****************************** */
  static unitBaht = "บาท";
  static unitBahtENG = "THB";
  static unitDate = "วัน";

  //****************************** Modal Title ****************************** */
  static titleConfirmChangeData = "ตรวจสอบข้อมูล";
  static titleErrorSaveData = "กรุณาเลือกข้อมูล";
  static titleChangePassword = "เปลี่ยนรหัสผ่านใหม่";

  //****************************** Modal Content ****************************** */
  static contentConfirmAddData = "คุณต้องการจะเพิ่มข้อมูลใช่หรือไม่?";
  static contentConfirmEditData = "คุณต้องการจะแก้ไขข้อมูลใช่หรือไม่?";
  static contentConfirmDeleteData = "คุณต้องการจะลบข้อมูลใช่หรือไม่?";
  static contentConfirmCloneData = "คุณต้องการจะคัดลอกข้อมูลใช่หรือไม่?";
  static contentConfirmExitForm = "คุณต้องการจะออกจากหน้านี้ใช่หรือไม่?";
  static contentConfirmChangeStatus = "คุณต้องการจะเปลี่ยนสถานะใช่หรือไม่?";
  static contentConfirmOpenContract = "คุณต้องการจะเปิดดูสัญญาใช่หรือไม่?";
  static contentConfirmReCal = "คุณต้องการจะคำนวณราคาใหม่ใช่หรือไม่?";
  static contentConfirmDeleteShipmentNonSo = "คุณต้องการจะลบเอกสารใช่หรือไม่?";
  static contentConfirmTempDataStart = "คุณต้องการ";
  static contentConfirmTempDataEnd = "ใช่หรือไม่?";
  static contentConfirmResetPassword = "คุณต้องการ Reset รหัสผ่านใช่หรือไม่?";
  static contentConfirmCancelPayment = "คุณต้องการยกเลิกเอกสาร Payment ใช่หรือไม่?";

  static contentSelectImportFilePayment = "กรุณาเลือกรายการเอกสารแนบไฟล์ที่คุณต้องการ : ";

  static contentWarningForClone = "การคัดลอกข้อมูลของคุณจะถูกยกเลิก";
  static contentWarningForViewContract = "เงื่อนไขการดูสัญญาไม่ครบถ้วน";
  static contentWarningForDateTimeOrMontYearSearch = "กรุณาเลือกวันที่เริ่มต้น/สิ้นสุด หรือ เดือน/ปี เท่านั้น";
  static contentWarningPasswordExpireDate = "รหัสผ่านของท่านจะหมดอายุในอีก";
  static contentWarningPleaseChangePass = "กรุณาเปลี่ยนรหัสผ่านก่อนหมดอายุ";
  static contentWarningSameShipmentCreatePayment = "ตรวจพบ Shipment ที่ถูกสร้าง Payment ไปแล้ว";
  static contentWarningExportSaleOrderList = "Export Sale Order List ใช้งานได้เฉพาะ Export Mode : Border, Air, LCL เท่านั้น";

  static contentSuccessCloneData = "คุณทำการคัดลอกข้อมูลเรียบร้อยแล้ว";
  static contentSuccessSaveData = "คุณทำการบันทึกข้อมูลเรียบร้อยแล้ว";
  static contentSuccessEditData = "คุณทำการแก้ไขข้อมูลเรียบร้อยแล้ว";
  static contentSuccessDeleteData = "คุณทำการลบข้อมูลเรียบร้อยแล้ว";
  static contentSuccessApproveContractData = "คุณทำการอนุมัติเอกสารสัญญาเรียบร้อยแล้ว";
  static contentSuccessRejectContractData = "คุณทำการยกเลิกเอกสารสัญญาเรียบร้อยแล้ว";
  static contentSuccessContractRecalData = "รายการขนส่งที่ผูกกับสัญญานี้ ระบบจะทำการคำนวณรายการค่าขนส่งใหม่ตามคิวภายใน 15 นาที";
  static contentSuccessRecalData = "คุณทำการคำนวณราคาใหม่เรียบร้อยแล้ว กรณีมีการเลือกรายการเกิน 10 รายการ ระบบจะทำการคำนวณรายการค่าขนส่งใหม่ตามคิวภายใน 15 นาที";
  static contentSuccessApproveData = "คุณทำการอนุมัติเอกสาร Extra Charge เรียบร้อยแล้ว";
  static contentSuccessRejectData = "คุณทำการ Reject เอกสาร Extra Charge เรียบร้อยแล้ว";
  static contentSuccessResetPass = "คุณทำการ Reset รหัสผ่านเรียบร้อยแล้ว";
  static contentSuccessChangePass = "คุณทำการเปลี่ยนแปลงรหัสผ่านเรียบร้อยแล้ว";
  static contentSuccessApprovePayment = "คุณทำการอนุมัติเอกสาร Payment เรียบร้อยแล้ว";
  static contentSuccessRejectPayment = "คุณทำการ Reject เอกสาร Payment เรียบร้อยแล้ว";
  static contentSuccessCancelPayment = "คุณทำการยกเลิกเอกสาร Payment เรียบร้อยแล้ว";

  static contentHeaderSetPassword = "รูปแบบการตั้งรหัสผ่านที่ถูกต้อง :";
  static contentBodySetPassword01 = "1.) มีอักษรตัวใหญ่อย่างน้อย 1 ตัวอักษร";
  static contentBodySetPassword02 = "2.) มีตัวเลขอย่างน้อย 1 ตัวอักษร";
  static contentBodySetPassword03 = "3.) มีอักษรพิเศษอย่างน้อย 1 ตัวอักษร";
  static contentBodySetPassword04 = "4.) มีความยาวอย่างน้อย 8 ตัวอักษร";

  //****************************** Table Assets ****************************** */
  static tabletxtSearch = "ค้นหา";
  static tabletxtPlaceholder = "ค้นหาข้อมูล...";
  static tabletxtCountPage = "จำนวนรายการ/หน้า";

  //****************************** Other Form Assets ****************************** */
  static txtformPlaceholderSelected = "เลือกรายการ";
  static txtformEmptySelected = "ว่าง";
  static txtFormisActive = "สถานะใช้งาน";
  static txtFormAllSelected = "ทั้งหมด";

    //****************************** Text Form Group ****************************** */
  /** Master */
  /** Other */
  static arrTextGroupMastExtraChargeData = [
    "ค่าใช้จ่ายเพิ่มเติม",
    "Remark",
  ];

  /** Transaction */
  static arrTextGroupTransDomDelData = [
    "ค้นหา",
    "ข้อมูล",
    "Delivery List",
    "ค่าใช้จ่าย",
    "สถานะ",
    "Multi Drop",
    "ค่าใช้จ่ายอื่นๆ",
    "สร้างเอกสาร"
  ];

  static arrTextGroupTransExpDelData = [
    "ค้นหา",
    "ข้อมูล",
    "Shipment List",
    "ค่าใช้จ่าย",
    "สถานะ",
    "Multi Drop",
    "ค่าใช้จ่ายอื่นๆ",
  ];

  static arrTextGroupTransCdDbData = [
    "ค้นหา",
  ];

  //****************************** Text Dialog Full Screen ****************************** */
  static txtFormHeaderNewCreate = "สร้างรายการใหม่";
  static txtFormHeaderEditData = "แก้ไขรายการข้อมูล";
  static txtFormHeaderViewData = "แสดงรายการข้อมูล";
  static txtDialogMasterConDom = "แบบฟอร์มทำสัญญา";
  static txtDialogFormClose = "ปิดหน้าต่าง";
  static txtFormHeaderInvoiceData = "Invoice/Tax Invoice/Other Information";

  //****************************** Menu ****************************** */
  static mainMenu = "หน้าแรก";
  static mainMaster = "ข้อมูลระบบ";
  static submainLocation = "สถานที่";
  static submainLogistics = "โลจิสติกส์";
  static submainContract = "สัญญา";
  static submainCompany = "บริษัท";
  static submainOther = "อื่นๆ";
  static submainTransaction = "Transaction";
  static cookieNotice = "CookieNotice";

  //****************************** Text Master ****************************** */
  /** Location */
  static txtMasterCountry = "ประเทศ";
  static txtMasterProvince = "จังหวัด";
  static txtMasterDistrict = "อำเภอ";
  static txtMasterZone = "โซน";
  static txtMasterZoneDetail = "โซน - รายละเอียด";
  static txtMasterSource = "สถานที่ต้นทาง";
  static txtMasterSourcePlant = "สถานที่ต้นทาง - Plant";
  static txtMasterShipTo = "สถานที่ส่ง";
  static txtMasterPort = "ท่าเรือ";
  static txtMasterCYPlace = "ลานรับตู้";
  static txtMasterPostCode = "รหัสไปรษณีย์";

  /** Logistics */
  static txtMasterTransporter = "บริษัทขนส่ง";
  static txtMasterTruckType = "ประเภทรถ";
  static txtMasterTransporterEng = "Vender Name";

  /** Contract */
  static txtMasterContactDomestic = "Domestic";
  static txtMasterContactExports = "Export";
  static txtMasterContactExport = "Export-Vessel";
  static txtMasterContactExportTruck = "Export-Truck(Cross Border)";
  static txtMasterContactExportLCLAir = "Export-LCL,AIR";
  static txtMasterContactEPZ = "EPZ";
  static txtMasterContactDomesticEng = "Domestic";
  static txtMasterContactExportEng = "Export";
  static txtMasterContactApproveContract = "Approve Contract";
  static txtMasterTranfer = "Transfer";
  static txtMasterTranferMTP = "Transfer";
  static txtMasterTranferLCB = "Transfer-LCB";

  /** Other */
  static txtMasterExtraCharge = "ค่าใช้จ่ายเพิ่มเติม";

  //****************************** Field Master ****************************** */
  /** Location */
  static arrFieldMasterZone = ["ชื่อโซน", "สถานะ"];
  static arrFieldMasterZoneDetail = ["ชื่อโซน", "ชื่อจังหวัด", "สถานะ"];
  static arrFieldMasterSource = [
    "รหัสต้นทาง",
    "ชื่อต้นทาง (อังกฤษ)",
    "ชื่อต้นทาง (ไทย)",
    "รายละเอียดเพิ่มเติม",
  ];
  static arrFieldMasterSourcePlant = [
    "รหัสต้นทาง",
    "ชื่อต้นทาง (อังกฤษ)",
    "ชื่อต้นทาง (ไทย)",
    "Plant ต้นทาง",
    "สถานที่จัดเก็บ",
    "Site No.",
    "ต้นทาง",
  ];
  static arrFieldMasterShipTo = [
    "รหัสสถานที่ส่ง",
    "ชื่อสถานที่ส่ง (อังกฤษ)",
    "ชื่อสถานที่ส่ง (ไทย)",
    "ที่อยู่",
    "รายละเอียดเพิ่มเติม",
    "ชื่อประเทศ",
    "ชื่อจังหวัด",
    "ชื่ออำเภอ",
    "ชื่อโซน",
    "รหัสไปรษณีย์",
    "ชื่อที่ติดต่อ",
    "Export",
    "สถานะ",
  ];
  static arrFieldMasterCYPlace = [
    "รหัสลานรับตู้",
    "ชื่อลานรับตู้ (ไทย)",
    "ชื่อลานรับตู้ (อังกฤษ)",
    "รายละเอียดเพิ่มเติม",
    "สถานะ",
  ];
  static arrFieldMasterPostCode = ["ชื่อจังหวัด", "ชื่ออำเภอ", "รหัสไปรษณีย์"];

  /** Logistics */
  static arrFieldMasterTruckType = [
    "รหัสประเภทรถ",
    "ชื่อประเภทรถ",
    "รายละเอียดเพิ่มเติม",
    "น้ำหนักบรรทุก",
    "สถานะ",
  ];

  /** Other */
  static arrFieldMasterExtraCharge = [
    "บริษัทขนส่ง",
    "ประเภทบริษัทขนส่ง",
    "ประเภทการขนส่ง",
    "ประเภทค่าใช้จ่าย",
    "รหัสค่าใช้จ่ายเพิ่มเติม",
    "รายการค่าใช้จ่ายเพิ่มเติม",
    "ราคาค่าใช้จ่าย",
    "ราคาค่าใช้จ่ายสูงสุด",
    "Vat",
    "ระบุจำนวน",
    "กำหนดราคาคงที่",
    "แนบไฟล์",
    "สถานะการใช้งาน",
    "Request Name1",
    "Request Data type1",
    "Request Name2",
    "Request Data type2",
    "Request Name3",
    "Request Data type3",
    "Request Name4",
    "Request Data type4",
  ];

  static arrFieldMastExtCRemark = [
    "ข้อมูลเพิ่มเติม",
    "ค่าเริ่มต้น",
    "ค่าสิ้นสุด",
    "ชื่อรายการ",
    "*ตัวอย่างรายการ",
  ];

  /** Contract */
  static arrFieldConDomSearchDateYear = ["วันที่ทำสัญญา", "ปีที่ทำสัญญา"];
  static arrFieldMasterConDomHeader = [
    "เลขที่สัญญา",
    "ต้นทาง",
    "บริษัทขนส่ง",
    "Truck Type",
    "ประเภทเชื้อเพลิง",
    "ประเภทค่าขนส่ง",
    "ประเภทค่าขนลง",
    "ประเภทแพ็คเกจ",
    "น้ำหนักบรรทุกต่ำสุด",
    "น้ำหนักบรรทุกสูงสุด",
    "หมายเลขอ้างอิง",
    "น้ำหนักขั้นต่ำในการบรรทุก",
    "วันเริ่มต้น",
    "วันสิ้นสุด",
    "สถานะการใช้งาน",
  ];
  static arrFieldMasterConDomOtherTable = [
    "FUELRATE",
    "MULTIDROP",
    "OVERNIGHT",
    "TRANSPORT",
    "TRUCKLICENSE",
    "UNLOADING",
  ];
  static arrFieldMasterConDomFuel = [
    "ช่วงเริ่มต้น",
    "ช่วงสิ้นสุด",
    "Step",
    "หมายเหตุ",
  ];
  static arrFieldMasterConDomMultiDrop = [
    "ระยะต้นทาง",
    "ระยะปลายทาง",
    "ราคาระยะทาง",
  ];
  static arrFieldMasterConDomOverNight = ["จังหวัด", "ราคาค้างแรม/คน"];
  static arrFieldMasterConDomTransport = [
    "ปลายทาง",
    "จังหวัด",
    "อำเภอ",
    "ราคา",
    "ปรับน้ำมัน",
  ];
  static arrFieldMasterConDomTruckLicense = ["Truck License"];
  static arrFieldMasterConDomUnload = [
    "จำนวนแรงงานขนถ่าย",
    "Rate ขั้นต่ำ",
    "อัตราค่าขนถ่าย",
    "จำนวนบรรทุก(ตัน)",
  ];

  /** Transaction */
  /** Transaction Domestic */
  /** Transaction Domestic Delivery List */
  static arrFieldTransDomDeliverySearch = [
    "วันที่เริ่มต้น (Load Date)",
    "วันที่สิ้นสุด (Load Date)",
    "เดือน/ปี",
    "Status : Delivery"
  ];

  static arrFieldTransDomDelSummary = [
    "Status : Delivery",
    "Sum Delivery (รายการ)",
    "Sum Shipment (รายการ)",
    "Sum Q'ty (Tons)",
    "Sum Transport Cost (Bht)",
    "Sum Shipping Cost (Bht)"
  ];

  static arrFieldTransDomDeliveryMain = [
    "Shipment No",
    "Delivery No",
    "บริษัทขนส่ง",
    "ต้นทาง",
    "Truck Type",
    "Load Date",
    "Truck ID",
    "Delivery Mode",
    "ราคาน้ำมัน/สัปดาห์",
    "หมายเหตุ",
    "Status : EDP&DWH",
    "Status : Debit/Credit Note",
    "Status : SMP",
    "Status : All Pay",
    "Q'ty(Tons)",
    "ราคาค่าขนส่ง",
    "ราคาค่าขนลง",
    "ชดเชยราคาน้ำมัน",
    "ราคาค่าค้างคืน",
    "Extra Cost",
    "สถานที่ส่ง",
    "จังหวัด/เขต",
    "Sale Order No",
    "Reopen โดย",
    "Reject โดย",
    "สาเหตุการ Reject",
    "Total Cost",
    "Shipment Type",
    "Company",
    "Total TransportPrice"
  ];

  static arrFieldTransDomDelItemList = [
    "Delivery No",
    "Sale Order No",
    "Sales Org",
    "Product Group 5 (Package Type)",
    "Material No",
    "Material Group",
    "สถานที่ส่ง",
    "จังหวัด/เขต",
    "Plant",
    "Q'ty(Tons)",
    "Total Q'ty(Tons)",
  ];

  static arrFieldTransDomDelTransport = [
    "ประเภทค่าใช้จ่าย",
    "ราคา",
    "ภาษีมูลค่าเพิ่ม",
    "อ้างอิงข้อมูลที่ 1",
    "ค่าอ้างอิงที่ 1",
    "อ้างอิงข้อมูลที่ 2",
    "ค่าอ้างอิงที่ 2",
    "อ้างอิงข้อมูลที่ 3",
    "ค่าอ้างอิงที่ 3",
    "อ้างอิงข้อมูลที่ 4",
    "ค่าอ้างอิงที่ 4",
    "ค่าใช้จ่ายรวมทั้งสิน",
    "Shipment No"
  ];

  static arrFieldTransDomDelExtraCharge = [
    "Shipment No",
    "ประเภทค่าใช้จ่าย",
    "สาเหตุการลดหนี้/เพิ่มหนี้",
    "ราคาค่าใช้จ่าย",
    "จำนวน",
    "ราคาค่าใช้จ่ายทั้งหมด",
    "แนบไฟล์",
    "หมายเลขอ้างอิง (Payment)",
    "หมายเลขอ้างอิง (ค่าใช้จ่าย)",
    "Remark 1",
    "Value 1",
    "Remark 2",
    "Value 2",
    "Remark 3",
    "Value 3",
    "Remark 4",
    "Value 4",
    "สถานะ",
    "VAT",
    "IO No"
  ];

  static arrFieldTransDomDelMultiDrop = [
    "ระยะทางจุด Drop",
    "แนบไฟล์"
  ];

  static arrFieldTransDomDelMasterExtc = [
    "ประเภทค่าใช้จ่าย",
    "สาเหตุการลดหนี้/เพิ่มหนี้",
    "VAT",
    "ราคา",
    "จำนวน",
    "แนบไฟล์",
    "Remark",
    "คำอธิบาย",
  ];

  static arrFieldShipmentNonSO = [
    "Company",
    "บริษัทขนส่ง",
    "Delivery Date",
    "ประเภทรถ",
    "Ship To",
    "Ship To (ใช้กรณีต้องการเพิ่ม Ship To ที่ยังไม่มีในระบบ)",
    "จำนวนตัน",
    "หมายเลขส่งสินค้า",
    "หมายเลขอ้างอิง (LGS Request No)",
    "ทะเบียนรถ"
  ];

  /** Transaction Export */
  /** Transaction Export Delivery List */
  static arrFieldTransExpDeliverySearch = [
    "วันที่เริ่มต้น (Last Load Date)",
    "วันที่สิ้นสุด (Last Load Date)",
    "เดือน/ปี",
    "Status : Delivery"
  ];

  static arrFieldTransExpDelSummary = [
    "Status : Delivery",
    "Sum Delivery (รายการ)",
    "Sum Sale Order (รายการ)",
    "Sum Shipment (รายการ)",
    "Sum Q'ty (Tons)",
    "Sum Transport Cost (Bht)",
    "Sum Shipping Cost (Bht)"
  ];

  static arrFieldTransExpDeliveryMain = [
    "Shipment No",
    "Delivery No",
    "Transporter Name",
    "Shipping Name",
    "Loading Location",
    "Truck Type",
    "Load Date",
    "Truck ID",
    "Export Mode",
    "ราคาน้ำมัน/สัปดาห์",
    "หมายเหตุ",
    "Status : EDP&DWH",
    "Status : Debit/Credit Note",
    "Status : SMP",
    "Status : All Pay",
    "Q'ty(Tons)",
    "ToTal Transport Cost",
    "SMP Shipping Cost",
    "Transport -Extra (Request)",
    "Shipping -Extra (Request)",
    "Place Container Return",
    "Sale Order No",
    "Reopen โดย",
    "Reject โดย",
    "สาเหตุการ Reject",
    "Company",
    "Container Size",
    "Sale Org",
    "Channel",
    "Hualage Name",
    "Place Container Return",
    "CY Place",
    "Shipto-Country",
    "Booker Note",
    "Remark of Internal",
    "Booking No.",
    "Transport Cost",
    "Lift On Cost",
    "Lift Off Cost",
    "Total Cost",
    "Export Mode",
    "ShipTo-Country",
    "ShipTo Code",
    "ShipTo Name",
    "Company Code",
    "Company Name",
    "ค่าต่อระยะรับตู้",
    "ค่าผ่านลานรับตู้เปล่า",
    "ค่าต่อระยะคืนตู้",
    "ค่าผ่านท่า(ตู้หนัก)",
    "ค่าชั่งน้ำหนัก(ตู้หนัก)",
    "Total Shipping Cost",
    "SoldTo Name",
    "Ship Agent Name",
    "End Customer Name",
    "Last Load Date",
    "First Load Date"
  ];

  static arrFieldTransExpDeliverySub = [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ];

  static arrFieldTransExpDelItemList = [
    "Load Date",
    "Shipment No",
    "Delivery No",
    "Material Name",
    "Product Hierarchy",
    "Production Plant",
    "Q'ty(Tons)",
    "Truck Type",
    "Truck ID",
    "Container Size",
    "หมายเหตุ",
    "Loading Location",
    "Product Group 5 (Package Type)",
    "Material Group",
    "Plant",
    "Status : SMP",
    "Status : EDP&DWH",
    "Status : All Pay",
    "Total Q'ty(Tons)",
    "Loading Location"
  ];

  static arrFieldExportFileExpAccure = [
    "วันที่โหลดสินค้า",
    "Company",
    "Sale Group",
    "Distribution Channel",
    "Shipto-Country",
    "End Customer",
    "Sale Order No",
    "Shipment No",
    "Delivery No",
    "Material",
    "Product Hierarchy",
    "Production Plant",
    "Plant",
    "จำนวน(ตัน)",
    "ค่าหัวลาก",
    "ค่าย้าย 104 บาท/ตัน",
    "ค่า Export InLand",
    "Lift Off(บาท)",
    "Lift On(บาท)",
    "Total Transport",
    "Total Shiping",
    "บริษัทขนส่ง"
  ];

  static arrFieldTransExpDelContainer = [
    "Container Size",
    "No. of Container"
  ];

  static arrFieldTransExpDelTransport = [
    "Shipment No",
    "Transport Cost",
    "Shipping Cost",
    "Transport -OTH Cost",
    "Shipping -OTH Cost",
    "Total Transport Cost",
    "Total Shipping Cost",
    "Total Cost"
  ];

  static arrFieldTransExpDelExtraCharge = [
    "Shipment No",
    "ประเภทค่าใช้จ่าย",
    "สาเหตุการลดหนี้/เพิ่มหนี้",
    "ราคาค่าใช้จ่าย",
    "จำนวน",
    "ราคาค่าใช้จ่ายทั้งหมด",
    "แนบไฟล์",
    "หมายเลขอ้างอิง (Payment)",
    "หมายเลขอ้างอิง (ค่าใช้จ่าย)",
    "Remark 1",
    "Value 1",
    "Remark 2",
    "Value 2",
    "Remark 3",
    "Value 3",
    "Remark 4",
    "Value 4",
    "สถานะ",
    "ประเภทบริษัทขนส่ง",
    "VAT"
  ];

  static arrFieldTransExpDelMultiDrop = [
    "ระยะทางจุด Drop",
    "แนบไฟล์"
  ];

  static arrFieldTransExpDelMasterExtc = [
    "Shipment No",
    "ประเภทค่าใช้จ่าย",
    "สาเหตุการลดหนี้/เพิ่มหนี้",
    "VAT",
    "ราคา",
    "จำนวน",
    "แนบไฟล์",
    "Remark",
    "คำอธิบาย",
    "ประเภทบริษัทขนส่ง"
  ];

  /** Transaction Approve Payment */
  static arrFieldTransAppPaymentMain = [
    "Payment Status",
    "All Pay Status",
    "Payment No",
    "วันที่รอบบิล",
    "วันครบกำหนดชำระ",
    "ระยะเวลาจากวันที่สร้างเอกสาร",
    "บริษัท",
    "ผู้รับเหมา",
    "Mode",
    "จำนวนเงิน",
    "หมายเลขอ้างอิง",
    "All Pay No",
    "Verify โดย",
    "Approve โดย",
    "Reject โดย",
    "สาเหตุการ Reject",
    "Ref No"
  ];

  static arrFieldTransAppPaymentOtherGeneral = [
    "GR Aprroval For",
    "Subject"
  ];

  static arrFieldTransAppPaymentItems = [
    "Cost Element",
    "Cost Center",
    "Order No.(IO)",
    "Assignment"
  ];

  static arrFieldTransAppPaymentDocument = [
    "Document Type",
    "ExpenseCode/CostCenter",
    "Document No",
    "Document Date",
    "Amount(Excl.VAT)",
    "VAT Amount",
    "Total Amount",
    "RefDoc",
    "Vendor & Tax",
  ];

  static arrFieldTransAppPaymentUser = [
    "Requestor",
    "Reviewer",
    "CC",
    "Approver",
  ];

  static arrFieldTransAppPaymentTax = [
    "VAT",
    "WHT",
    "Total VAT",
    "Total WHT"
  ];

  static arrFieldTransAppPaymentTopicFormBody = [
    "1. General Information",
    "2. Shipment Detail",
    "3. Payment & Budget Information",
    "4. User Approval Information",
    "5. Invoice/Tax Invoice/Other Information"
  ];

  static arrFieldTransAppPaymentDetailFormBody = [
    "Company",
    "Vender",
    "Tax Id",
    "Branch",
    "Due date",
    "Currency",
    "Payment Type",
    "Payment Description",
    "Vendor Email",
    "Non-PO",
    "Auto DOA",
    "Location",
    "Service Team",
  ];

  static arrFieldTransAppPaymentInvoice = [
    "Tax Invoice",
    "Supporting Doc",
  ];
  
  static arrFieldTransAppPaymentFormFooter = [
    "Summary Payment Amount",
    "SMP Total Amount",
    "Actual Total Amount",
  ];

  /** Transaction CreditDebit */
  static arrFieldTransCreditDebitMainTable = [
    "สถานะ",
    "วันที่จัดส่ง",
    "วันที่สร้างรายการ",
    "Duration",
    "ประเภทค่าใช้จ่าย",
    "หมายเลขอ้างอิงค่าใช้จ่าย",
    "สาเหตุการลดหนี้/เพิ่มหนี้",
    "Shipment No",
    "บริษัทขนส่ง",
    "ประเภทบริษัทขนส่ง",
    "ประเภทรถ",
    "จำนวน",
    "ราคา",
    "จำนวนเงินทั้งหมด",
    "Remark 1",
    "Value 1",
    "Remark 2",
    "Value 2",
    "Remark 3",
    "Value 3",
    "Remark 4",
    "Value 4",
    "แนบไฟล์",
    "สาเหตุ Reject",
    "Create โดย",
    "Initial โดย",
    "Approve โดย",
    "Reject โดย",
  ];

  static arrFieldTransCreditDebitMainSearch = [
    "วันที่เริ่มต้น",
    "วันที่สิ้นสุด",
    "Shipment No",
    "บริษัทขนส่ง",
    "ประเภทบริษัทขนส่ง",
    "ประเภทรถ",
    "ประเภทค่าใช้จ่าย (Domestic/Export/Transfer)",
    "ประเภทค่าใช้จ่าย (Credit/Debit)",
    "สาเหตุการลดหนี้เพิ่มหนี้",
    "Credit Debit Status",
  ];




  //============================== Number Constant ============================== //

  //****************************** Form Master ****************************** */
  static styleHeightField = 40;



  //============================== Variable Constant ============================== //

  //****************************** File Image Format ****************************** */
  static arrFileImage = [
    "bmp",
    "cgm",
    "djv",
    "djvu",
    "gif",
    "ico",
    "ief",
    "jp2",
    "jpe",
    "jpeg",
    "jpg",
    "mac",
    "pct",
    "pgm",
    "pic",
    "pict",
    "png",
    "pnm",
    "pnt",
    "pntg",
    "qti",
    "qtif",
    "ras",
    "rgb",
    "svg",
    "tif",
    "tiff",
    "wbmp",
    "xbm",
    "xpm",
    "xwd",
  ];

  //---------------------------------------GAME-------------------------------------------------------//
  static contentConfirmCreatePayment = "คุณต้องการจะสร้างเอกสารชำระเงินใช่หรือไม่?";
  static contentCantCreatePayment = "ไม่พบรายการที่สามารถสร้างได้";
  /**Master */
  //Country
  static txtHeaderCountry = "ประเทศ";
  static arrFieldAddCountry = [
    "รหัสประเทศ",
    "ชื่อประเทศ(อังกฤษ)",
    "ชื่อประเทศ(ไทย)",
    "สถานะ",
  ];
  //District
  static txtHeaderDistrict = "อำเภอ";
  static arrFieldAddDistrict = [
    "จังหวัด",
    "รหัสอำเภอ",
    "ชื่ออำเภอ1",
    "ชื่ออำเภอ2",
    "ชื่ออำเภอ3",
    "รายละเอียด",
    "สถานะ",
  ];
  //District
  static txtHeaderProvince = "จังหวัด";

  static arrFieldAddProvince = [
    "ประเทศ",
    "รหัสจังหวัด",
    "ชื่อจังหวัด1",
    "ชื่อจังหวัด2",
    "ชื่อจังหวัด3",
    "รายละเอียด",
    "สถานะ",
  ];

  //**Transaction */
  static txtTransactionExport = "Export";
  static txtTransactionDeliveryList = "Delivery List View";
  static txtTransactionTransferList = "Transfer List View";
  static txtTransactionPaymentList = "Payment";
  static txtTransaction = "Transaction";
  static txtTPE = "TPC";
  static txtTransactionApprove = "Approve Credit/Debit";
  static txtTransactionInitial = "Initial Credit/Debit";
  static txtTransactionApproveList = "Credit/Debit List View";
  static txtTransactionEDPMapping = "Import EDP Files";
  static txtTransactionImportExport = "Import Export Files";
  static txtTransactionEDPMappingListView = "EDP Initial";
  static txtTransactionApproveEDPMapping = "EDP Approve";
  static txtTransactionPaymentListDoc = "Create Payment Document";
  static txtTransactionPaymentListDocDetail = "Payment Document";
  static txtTransactionApprovePaymentList = "Approve Payment List";
  static txtTransactionEDP = "EDP";
  static txtTransactionCrediDebit = "Credit/Debit";

  static arrTxtMainStartDateEndDate = ["วันที่เริ่มต้น", "วันที่สิ้นสุด"];

  //**Transaction Export */
  static arrFormSearchExport = [
    "ต้นทาง",
    "ผู้รับเหมา",
    "ท่าเรือ",
    "Shipment No",
    " Delivery No",
    "Mode",
    "Order Status",
    " Payment Status",
    " Sale Order No",
  ];


  static confirmUpdateFuelPrice = "อัพเดตราคาน้ำมันเรียบร้อยแล้ว"

  //

  //

  //****************************** Button ****************************** */
  static btHeaderSize = "md";
  static btSeacrhSize = "md";
  static btAddSize = "md";
  static btAddSizeSM = "sm";

  //****************************** Modal Content ****************************** */
  static contentConfirmApprove = "คุณต้องการจะApproveเอกสารใช่หรือไม่?";
  static contentConfirmReject = "คุณต้องการจะRejectเอกสารใช่หรือไม่?";
  static contentConfirmInitial = "คุณต้องการจะInitialเอกสารใช่หรือไม่?";
  static contentUploadSuccess = "อัพโหลดข้อมูลสำเร็จ";
  // static contentConfirmApprove = "คุณต้องการจะApproveเอกสารใช่หรือไม่?";

  //****************************** EDP****************************** */
  static txtHeaderImportEDPFile = "Import EDP Files";
  static txtHeaderEDPInitial = "EDP Initial";
  static txtHeaderEDPApprove = "EDP Approve";
  static txtHeaderImportSFFile = "Import SF Files";
  static arrFieldEDPHeader = [
    "DeliveryStatus",
    "CheckInInfo",
    "PlanDelivery",
    "CheckInTimestamp",
    "SubmittoServerTimestamp",
    "ApproveCheckInOffline",
    "SalesOrg",
    "SalesOrg.",
    "OrderNumber",
    "DeliveryNumber",
    "LoadDate",
    "LoadTime",
    "ConfirmedDate",
    "ConfirmedTime",
    "ShipmentNumber",
    "OwnerCompany",
    "Channel",
    "PayerCode",
    "PayerName",
    "ShipToCode",
    "ShipToName",
    "ShipToAddress",
    "DeliveryDate",
    "ShippingType",
    "ShippingTypeDescription",
    "LicenseNumber",
    "ForwardingAgentCode",
    "ForwardingAgentName",
    "TabletNumber",
    "UnloadingMethod",
    "UnloadingMethodDescription",
    "ContainerNumber",
    "SealNumber",
    "MaterialCode",
    "Grade",
    "Plant",
    "Batch",
    "Quantity",
    "SumDiffQty",
    "Unit",
    "ManualCloseBy",
    "ManualCloseDate",
    "ManualCloseTime",
    "ManualCloseReason",
    "ReferenceDeliveryNumber",
    "Remark",
    "DriverSignFlag",
    "ApproveCheck-In&SignOutsideLocationFlag",
    "ApproveCheck-In&SignOutside LocationComment",
    "FeedbackPoint",
    "FeedbackComment",
  ];

  /**ExportVessel */

  static arrFieldMasterConExportOtherTable = [
    "LIFTOFF",
    "LIFTON",
    "TRANSPORTRATE",
    "PLACECONTAINERRETURN",
  ];


  /**ExportTruck */

  static txtShipTo = "ShipTo";
  static txtFuelRate = "FuelRate";



  static arrFShipto = [
    "ShipTo",
    "Transport Charge",
    "Extra Transport Charge",
    "เชื้อเพลิงเริ่มต้น",
    "เชื้อเพลิงสิ้นสุด",
    "ราคาปรับ/ช่วง",
    "Customs Fee",
    "Extra Customs Fee(2nd Onward)",
    "Phytosanitary Cert.",
    "Bridge Fee",
    "FORM D Cert.",
    "Inspector Fee",
    "Inspector Fee2(2nd Onward)",
    "Bonded WH Fee",
    "Fuel Price",
    // "ต้นทาง",
    // "ประเภทแพ็คเกจ",
    // "ประเภทเชื้อเพลิง",
    // "ต้นทาง",
    // "ประเภทแพ็คเกจ",
    // "ประเภทเชื้อเพลิง",

  ];

  /**ExportLCLAIR */

  static txtShipTo = "ShipTo";
  static txtFuelRate = "FuelRate";

  static arrFPlaceContainerReturn = [
    "Place Container Return",
    "Transport Cost",
    "Custom Fee",
    "Port Charge",
    "Lashing Charge",
    "Repackage Charge",
    "Inspector Fee",
    "Fuel Price"

  ];





  //

  //-----------------------------------------Edit by Gift---------------------------------------

  //****************************** Menu ****************************** */
  static submainAuthentication = "สิทธิ์การเข้าถึง";
  static arrFieldMasterAuthentication = ["A role", "Discription"];

  //****************************** Text Master ****************************** */
  /** Authentication */
  static txtMasterUser = "User";
  static txtMasterUserGroup = "User Group";
  static txtMasterAuthentication = "Authentication";

  //****************************** Field Master ****************************** */
  /**Authen */
  static arrFieldMasterUser = [
    "ชื่อผู้ใช้",
    "ชื่อที่ใช้แสดง",
    "ชื่อจริง",
    "นามสกุล",
    "วันที่เข้าใช้งานล่าสุด",
    "วันหมดอายุ",
    "วันที่เปลี่ยนรหัสผ่าน",
    "counter",
    "ชื่อบริษัทขนส่ง",
    "Email",
    "เข้าสู่ระบบ",
    "เปิดใช้งานรหัสผ่าน",
    "สถานะ",
  ];

  static arrFieldMasterUserGroup = [
    "User Group Code",
    "User Group Name",
    "User Group Description",
    "สถานะ",
  ];
  //****************************Contraner *************************************/
  static arrFieldMasterPlaceContainerReturn = [
    "รหัสลานคืนตู้",
    "สถานที่ลานคืนตู้ (ภาษาไทย)",
    "สถานที่ลานคืนตู้ (ภาษาอังกฤษ)",
    "รายละเอียด",
    "สถานะ",
  ];
  static txtMasterPlaceContainerReturn = ["ลานคืนตู้"];







  /**New Constant */
  static txtVenderName = "Vender Name"
  static txtAll = "All"
  static txtTruckType = "Truck Type"
  static txtLoadingLocation = "Loading Location"
  static txtContractStatus = "Status : Contract"
  static txtContractNo = "เลขที่สัญญา"
  static txtFuelType = "ประเภทเชื้อเพลิง"
  static txtContractType = "ประเภทสัญญา"
  static txtRateType = "ประเภทขนส่ง"
  static txtRefDocNo = "หมายเลขอ้างอิง"
  static txtFuelPrice = "FuelPrice"
  static txtTransferType = "ประเภทงานย้าย"
  static txtTruckType = "ประเภทรถ"
  /**CommandJobs */
  static txtCommandJobs = "Command Jobs"
  static txtInterfaceErrorLog = "Interface Error Log"
  static txtTransferDate = "Transfer Date";



}
