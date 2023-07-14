import React, { useState, useEffect } from "react";
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
  CSpinner,
  CDataTable,
} from "@coreui/react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { style } from "@mui/system";

const fields = [
  {
    key: "runningNo",
    label: ``,
    _style: { width: "3%" },
  },
  {
    key: "company",
    label: `บริษัท เจ้าของค่าใช้จ่าย`,
  },
  {
    key: "paymentType",
    label: `ประเภทค่าใช้จ่าย`,
  },
  {
    key: "costCenter",
    label: `Cost Center`,
  },
  {
    key: "costElement",
    label: `Cost Element`,
  },
  {
    key: "amount",
    label: `จำนวนเงิน (ไม่รวม VAT)`,
  },
  {
    key: "unit",
    label: `หน่วย`,
    _style: { width: "5%" },
  },
];

const makeData = [
  {
    runningNo: 1,
    company: "TPE : 0100",
    paymentType: "ค่าขนส่งในประเทศ",
    costCenter: "0100-99999",
    costElement: "232500",
    amount: 8561,
    unit: "บาท",
  },
  {
    runningNo: 2,
    company: "SCG ICO : 2220",
    paymentType: "ค่าขนส่งในประเทศ",
    costCenter: "2220-99999",
    costElement: "232500",
    amount: 6435,
    unit: "บาท",
  },
  {
    runningNo: 3,
    company: "งานนอกระบบ",
    paymentType: "ค่าขนส่งในประเทศ",
    costCenter: "",
    costElement: "",
    amount: 1210,
    unit: "บาท",
  },
  {
    runningNo: "",
    company: "Total",
    paymentType: "",
    costCenter: "",
    costElement: "",
    amount: 16206,
    unit: "บาท",
  },
];

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf",
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

class CoverSheet {
  setDataInPDF(data = {}, isTransfer = false) {
    const value = [];
    var header = {
      createDate: "",
      toName: "",
      fromName: "",
      subject: "",
      transporterName: "",
      smpNo: "",
    };
    var body = {
      companyName: "",
      sumQty: 0,
      sumSaleOrder: 0,
      sumShipment: 0,
      sumDelivery: 0,
      sumAmount: 0,
    };

    if (Object.keys(data).length) {
      header.createDate = data.createDate
        ? new Date(data.createDate).toLocaleDateString("en-GB", {
            timeZone: "UTC",
          })
        : "";
      header.toName = data.toName ? data.toName : "";
      header.fromName = data.fromName ? data.fromName : "";
      header.subject = data.subject ? data.subject : "";
      header.transporterName = data.transporterName ? data.transporterName : "";
      header.smpNo = data.smpNo ? data.smpNo : "";

      body.companyName = data.companyName ? data.companyName : "";
      body.sumQty = data.sumQty ? data.sumQty : "";
      body.sumSaleOrder = data.sumSaleOrder ? data.sumSaleOrder : "";
      body.sumShipment = data.sumShipment ? data.sumShipment : "";
      body.sumDelivery = data.sumDelivery ? data.sumDelivery : "";
      body.sumAmount = data.sumAmount ? data.sumAmount : "";
    }

    var docDefinition = {
      content: [
        {
          columns: [
            {
              width: 340,
              text: "",
            },
            {
              width: "auto",
              text: `วันที่ ${header.createDate}`,
              style: ["txtNormal"],
            },
          ],
        },
        {
          text: " ",
        },
        {
          columns: [
            {
              width: 120,
              text: "เรื่อง",
              style: ["txtNormal"],
            },
            {
              width: "auto",
              text: `${header.subject}`,
              style: ["txtNormal"],
            },
          ],
        },
        {
          text: " ",
        },
        {
          columns: [
            {
              width: 120,
              text: "จาก",
              style: ["txtNormal"],
            },
            {
              width: "auto",
              text: `${header.fromName}`,
              style: ["txtNormal"],
            },
          ],
        },
        {
          text: " ",
        },
        {
          columns: [
            {
              width: 120,
              text: "ผู้ขนส่ง",
              style: ["txtNormal"],
            },
            {
              width: "auto",
              text: `${header.transporterName}`,
              style: ["txtNormal"],
            },
          ],
        },
        {
          text: " ",
        },
        {
          columns: [
            {
              width: 120,
              text: "Smart Payment No.",
              style: ["txtNormal"],
            },
            {
              width: "auto",
              text: `${header.smpNo}`,
              style: ["txtNormal"],
            },
          ],
        },
        {
          text: " ",
        },
        {
          columns: [
            {
              width: 120,
              text: " ",
              style: ["txtNormal"],
            },
            {
              width: "auto",
              text: "โดยมีรายละเอียดดังนี้",
              style: ["txtNormal"],
            },
          ],
        },
        {
          text: " ",
        },
        {
          columns: [
            {
              width: 500,
              table: {
                headerRows: 1,
                widths: [110, 60, 75, 50, 80, 85],
                body: [
                  [
                    {
                      text: "บริษัทที่เรียกเก็บค่าใช้จ่าย",
                      style: ["txtNormal"],
                    },
                    {
                      text: `${body.companyName}`,
                      style: ["txtCenter"],
                      colSpan: 5,
                    },
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    { text: "", style: ["txtNormal"] },
                    { text: "TOTAL ORDER", style: ["txtCenter"] },
                    { text: "TOTAL SHIPMENT", style: ["txtCenter"] },
                    { text: "TOTAL DP", style: ["txtCenter"] },
                    { text: "TOTAL QTY(TON)", style: ["txtCenter"] },
                    { text: "TOTAL COST(Baht)", style: ["txtCenter"] },
                  ],
                  [
                    { text: "", style: ["txtNormal"] },
                    { text: `${body.sumSaleOrder}`, style: ["txtCenter"] },
                    { text: `${body.sumShipment}`, style: ["txtCenter"] },
                    { text: `${body.sumDelivery}`, style: ["txtCenter"] },
                    {
                      text: `${body.sumQty.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}`,
                      style: ["txtRight"],
                    },
                    {
                      text: `${body.sumAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      style: ["txtRight"],
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          columns: [
            {
              width: 100,
              text: " ",
            },
            {
              width: 100,
              text: "",
              style: ["txtNormal"],
            },
            {
              width: 100,
              text: "",
              style: ["txtNormal"],
            },
            {
              width: 160,
              text: "",
              style: ["txtNormal"],
            },
            {
              width: "*",
              text: "* ไม่รวม VAT",
              style: ["txtNormal"],
            },
          ],
        },
        {
          text: " ",
        },
        {
          text: " ",
        },
        // isTransfer
        //   ? {
        //       columns: [
        //         {
        //           width: 70,
        //           text: " ",
        //         },
        //         {
        //           width: 60,
        //           text: "อนุมัติโดย",
        //           style: ["txtNormal"],
        //         },
        //         {
        //           width: 25,
        //           text: "ลงชื่อ",
        //           style: ["txtRight"],
        //         },
        //         {
        //           image:
        //             "data:image/png;base64,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",
        //           width: 170,
        //           margin: [0, -16],
        //         },
        //         {
        //           width: "*",
        //           text: "ตำแหน่ง : Logistics Support Section Manager",
        //           style: ["txtNormal"],
        //         },
        //       ],
        //     }
        //   : {},
      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        alignRight: {
          // italics: true,
          alignment: "right",
        },
        txtNormal: {
          fontSize: 14,
        },
        txtCenter: {
          alignment: "center",
          fontSize: 14,
        },
        txtRight: {
          alignment: "right",
          fontSize: 14,
        },
        txtVat: {
          alignItems: "end",
          alignment: "end",
          fontSize: 14,
          color: "red",
        },
      },

      defaultStyle: {
        font: "THSarabunNew",
      },
    };

    return docDefinition;
  }

  async convertPDF(data = {}, fileName = "" , isTransfer = false) {
    const fileExtension = ".pdf";
    const txtFileName = fileName + fileExtension;
    const document = pdfMake.createPdf(this.setDataInPDF(data , isTransfer));
    return new Promise((resolve) => {
      document.getBlob((theBlob) => {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = txtFileName;
        resolve(new File([theBlob], txtFileName, { type: theBlob.type }));
      });
    });
  }

  downloadPDF(data = {}, fileName = "",  isTransfer = false) {
    const fileExtension = ".pdf";
    const txtFileName = fileName + fileExtension;
    const document = pdfMake.createPdf(this.setDataInPDF(data , isTransfer));
    document.download(txtFileName);
  }

  renderPDF(data = {},  isTransfer = false) {
    const document = pdfMake.createPdf(this.setDataInPDF(data , isTransfer));
    document.open();
  }
}

const coverSheet = new CoverSheet();
export default coverSheet;

// const CoverSheet = () => {
// const [baseItems, setBaseItems] = useState([]);

// useEffect(() => {
//     setBaseItems(makeData);
// }, []);

// return (
//     <div>
//         <CRow>
//             <CCol>
//                 <CCard>
//                     <CCardBody>
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="8"></CCol>
//                             <CCol className="text-right" md="1">วันที่</CCol>
//                             <CCol md="2">{"09/09/2022"}</CCol>
//                             <CCol md="1"></CCol>
//                         </CRow>
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="1"></CCol>
//                             <CCol className="text-right" md="1">เรียน</CCol>
//                             <CCol md="10">{"Nonchapat"}</CCol>
//                         </CRow>
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="1"></CCol>
//                             <CCol className="text-right" md="1">ผ่าน</CCol>
//                             <CCol md="10">{"E-mail"}</CCol>
//                         </CRow>
//                         <br />
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="1"></CCol>
//                             <CCol className="text-right" md="1">จาก</CCol>
//                             <CCol md="10">{"TPE"}</CCol>
//                         </CRow>
//                         <br />
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="1"></CCol>
//                             <CCol className="text-right" md="1">เรื่อง</CCol>
//                             <CCol md="10">ขอเสนออนุมัติค่าขนส่งในประเทศ</CCol>
//                         </CRow>
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="2"></CCol>
//                             <CCol md="10">{"Approve Payment"}</CCol>
//                         </CRow>
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="2"></CCol>
//                             <CCol md="10">โดยมีรายละเอียดดังนี้</CCol>
//                         </CRow>
//                         <br />
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol>
//                                 <CDataTable
//                                     className="CDataTable"
//                                     items={baseItems}
//                                     fields={fields}
//                                     hover
//                                     striped
//                                     bordered
//                                     itemsPerPage={10}
//                                     pagination
//                                 />
//                             </CCol>
//                         </CRow>
//                         <br />
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="2"></CCol>
//                             <CCol md="2">ผู้ตรวจสอบเบื้องต้น</CCol>
//                             <CCol className="text-right" md="1">ลงลายมือชื่อ</CCol>
//                             <CCol md="2">____________________________________</CCol>
//                             <CCol md="5">ตำแหน่ง : Logistics Section Manager</CCol>
//                         </CRow>
//                         <br />
//                         <CRow className="ml-2 mr-2 p-0">
//                             <CCol md="2"></CCol>
//                             <CCol md="2">ผู้จัดเตรียมเอกสาร</CCol>
//                             <CCol className="text-right" md="1">ลงลายมือชื่อ</CCol>
//                             <CCol md="2">____________________________________</CCol>
//                             <CCol md="5">ตำแหน่ง : พนักงาน Logistics Support</CCol>
//                         </CRow>
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                         <br />
//                     </CCardBody>
//                 </CCard>
//             </CCol>
//         </CRow>
//     </div>
// );
// }

// export default CoverSheet;
