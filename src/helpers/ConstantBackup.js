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

  static inValidDuplicateValue = "ตรวจพบข้อมูลซ้ำ";

  //****************************** Button ****************************** */
  static btAddData = "เพิ่มข้อมูล";
  static btEditData = "แก้ไขข้อมูล";
  static btDeleteData = "ลบข้อมูล";
  static btSave = "บันทึก";
  static btOK = "ยืนยัน";
  static btCancel = "ยกเลิก";
  static btCollapseShow = "แสดง";
  static btCollapseHide = "ซ่อน";
  static btCalculate = "คำนวณ";
  static btSearchData = "ค้นหา";
  static btClearData = "ล้างข้อมูล";
  static btCloneData = "คัดลอกข้อมูล";
  static btReOpen = "Reopen";
  static btReJect = "Reject";
  static btViewContract = "ดูสัญญา";
  static btViewContractTransport = "ดูสัญญา (ขนส่ง)";
  static btViewContractShipping = "ดูสัญญา (Shipping)";
  static btReCalculate = "คำนวณใหม่";
  static btShowImage = "แสดงรูปภาพ";
  static btDownloadFile = "ดาวน์โหลดไฟล์";

  //****************************** Text Unit ****************************** */
  static unitBaht = "บาท";

  //****************************** Modal Title ****************************** */
  static titleConfirmChangeData = "ตรวจสอบข้อมูล";
  static titleErrorSaveData = "กรุณาเลือกข้อมูล";

  //****************************** Modal Content ****************************** */
  static contentConfirmAddData = "คุณต้องการจะเพิ่มข้อมูลใช่หรือไม่?";
  static contentConfirmEditData = "คุณต้องการจะแก้ไขข้อมูลใช่หรือไม่?";
  static contentConfirmDeleteData = "คุณต้องการจะลบข้อมูลใช่หรือไม่?";
  static contentConfirmCloneData = "คุณต้องการจะคัดลอกข้อมูลใช่หรือไม่?";
  static contentConfirmExitForm = "คุณต้องการจะออกจากหน้านี้ใช่หรือไม่?";
  static contentConfirmChangeStatus = "คุณต้องการจะเปลี่ยนสถานะใช่หรือไม่?";
  static contentConfirmOpenContract = "คุณต้องการจะเปิดดูสัญญาใช่หรือไม่?";
  static contentConfirmReCal = "คุณต้องการจะคำนวณราคาใหม่ใช่หรือไม่?";
  static contentConfirmTempDataStart = "คุณต้องการ";
  static contentConfirmTempDataEnd = "ใช่หรือไม่?";

  static contentWarningForClone = "การคัดลอกข้อมูลของคุณจะถูกยกเลิก";
  static contentWarningForViewContract = "เงื่อนไขการดูสัญญาไม่ครบถ้วน";
  static contentWarningForDateTimeOrMontYearSearch = "กรุณาเลือกวันที่เริ่มต้น/สิ้นสุด หรือ เดือน/ปี เท่านั้น";

  static contentSuccessCloneData = "คุณทำการคัดลอกข้อมูลเรียบร้อยแล้ว";
  static contentSuccessSaveData = "คุณทำการบันทึกข้อมูลเรียบร้อยแล้ว";
  static contentSuccessEditData = "คุณทำการแก้ไขข้อมูลเรียบร้อยแล้ว";
  static contentSuccessDeleteData = "คุณทำการลบข้อมูลเรียบร้อยแล้ว";

  //****************************** Table Assets ****************************** */
  static tabletxtSearch = "ค้นหา";
  static tabletxtPlaceholder = "ค้นหาข้อมูล...";
  static tabletxtCountPage = "จำนวนรายการ/หน้า";

  //****************************** Other Form Assets ****************************** */
  static txtformPlaceholderSelected = "เลือกรายการ";
  static txtformEmptySelected = "ว่าง";
  static txtFormisActive = "สถานะใช้งาน";
  static txtFormAllSelected = "ทั้งหมด";
  static txtFormHeaderNewCreate = "สร้างรายการใหม่";
  static txtFormHeaderEditData = "แก้ไขรายการข้อมูล";

  //****************************** Menu ****************************** */
  static mainMenu = "หน้าแรก";
  static mainMaster = "ข้อมูลระบบ";
  static submainLocation = "สถานที่";
  static submainLogistics = "โลจิสติกส์";
  static submainContract = "สัญญา";
  static submainCompany = "บริษัท";
  static submainOther = "อื่นๆ";
  static submainTransaction = "Transaction";

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
  static txtMasterContactDomesticEng = "Domestic";
  static txtMasterContactExportEng = "Export";

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
  static arrFieldMasterConDomTruckLicense = ["Truck ID"];
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
    "ราคาค่า Drop",
    "ราคาค่าใช้จ่ายอื่นๆ",
    "สถานที่ส่ง",
    "จังหวัด/เขต",
    "Sale Order No",
    "Reopen โดย",
    "Reject โดย",
    "สาเหตุการ Reject"
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

  /** Transaction Export */
  /** Transaction Export Delivery List */
  static arrFieldTransExpDeliverySearch = [
    "วันที่เริ่มต้น (Load Date)",
    "วันที่สิ้นสุด (Load Date)",
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
    "Delivery Mode",
    "ราคาน้ำมัน/สัปดาห์",
    "หมายเหตุ",
    "Status : EDP&DWH",
    "Status : Debit/Credit Note",
    "Status : SMP",
    "Status : All Pay",
    "Q'ty(Tons)",
    "Transport Cost",
    "Shipping Cost",
    "Transport -OTH Cost",
    "Shipping -OTH Cost",
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
  ];

  //****************************** Text Form Group ****************************** */
  /** Transaction */
  static arrTextGroupTransDomDelData = [
    "ค้นหา",
    "ข้อมูล",
    "Delivery List",
    "ค่าใช้จ่าย",
    "สถานะ",
    "Multi Drop",
    "ค่าใช้จ่ายอื่นๆ",
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

  //****************************** Text Dialog Full Screen ****************************** */
  static txtDialogMasterConDom = "แบบฟอร์มทำสัญญา";
  static txtDialogFormClose = "ปิดหน้าต่าง";



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
  static txtHeaderProvince = "อำเภอ";
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
  static txtTransactionPaymentList = "Payment";
  static txtTransaction = "Transaction";
  static txtTPE = "TPE";
  static txtTransactionApprove = "Approve Credit/Debit";
  static txtTransactionApproveList = "Credit/Debit";
  static txtTransactionEDPMapping = "Import EDP Files";
  static txtTransactionImportExport = "Import Export Files";
  static txtTransactionEDPMappingListView = "EDP Initial";
  static txtTransactionApproveEDPMapping = "EDP Approve";
  static txtTransactionPaymentListDoc = "Create Payment Document";
  static txtTransactionPaymentListDocDetail = "Payment Document ";
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
    "ค่าขนส่ง(บาท/คัน)",
    "ค่าบรรทุกเพิ่ม(บาท/ตัน)",
    "เชื้อเพลิงเริ่มต้น",
    "เชื้อเพลิงสิ้นสุด",
    "ราคาปรับ/ช่วง",
    "ค่าดำเนินพิธีการ (บาท/คัน)",
    "ค่าดำเนินพิธีการ คันที่2เป็นต้นไป(บาท/คัน)",
    "ค่าPhoto(บาท/Order)",
    "ค่าBridgeFee(บาท/คัน)",
    "ค่าFormD(บาท/Order)",
    "ค่านายตรวจ (บาท/คัน)",
    "ค่านายตรวจ คันที่2เป็นต้นไป(บาท/คัน)",
    "ค่าBondedWH(บาท/คัน)",
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
    "วันที่เข้าใช้งาน",
    "วันที่ไม่ได้ใช้งาน",
    "วันที่เปลี่ยนรหัสผ่าน",
    "counter",
    "รหัสผู้ขนส่ง",
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
  
  
}
