import React from "react";
import CIcon from "@coreui/icons-react";
import Constant from "../helpers/Constant";

const strArr = localStorage.getItem("role");
const arrRole = JSON.parse(strArr);

const roleMaster = [
  "/mstauthusr",
  "/mstauthusrg",
  "/mstauthat",
  "/mstloccty",
  "/mstlocpvc",
  "/mstlocdtc",
  "/mstloczn",
  "/mstloczdt",
  "/mstlocsrc",
  "/mstlocspt",
  "/mstlocst",
  "/mstlocpt",
  "/mstloccyp",
  "/mstlocpcrn",
  "/mstlocpcd",
  "/mstloccpn",
  "/mstloctrst",
  "/mstlocttp",
  "/mstothextc",
  "/mstcontdom",
  "/mstcontexpv",
  "/mstcontexpt",
  "/mstcontexpla",
  "/mstcontapp",
  "/mstcontepz",
];

const roleTransactionTPE = [
  "/tnsctpedomdelv",
  "/tnsctpeapcdini",
  "/tnsctpeapcdapp",
  "/tnsctpedompayv",
  "/tnsctpeexpdelv",
  "/tnsctpecdcdv",
  "/tnsctpeexppayv",
  "/tnsctpeexpctepay",
  "/tnsctpedomctepay",
  "/tnsctpeinfimpf",
  "/tnsctpeinfedpini",
  "/tnsctpeinfedpapp",
  "/tnsctpeinfimpsff",
  "/tnsctpefp",
  "/tnsctpecmj",
  "/tnsctpeifel",
];

const roleTransactionTRST = [
  "/tnsctrstdomdelv",
  "/tnsctrstcdcdv",
  "/tnsctrstcdapcdini",
  "/tnsctrstdompayv",
  "/tnsctrstexpdelv",
  "/tnsctrstexppayv",
];

const getIsMasterRole = () => {
  var isBool = false;
  arrRole.map((x) => {
    var result = roleMaster.find((y) => y === x.RoleCode);
    if (result) {
      isBool = true;
    }
  });
  return isBool;
};

const getIsTransactionTPERole = () => {
  var isBool = false;
  arrRole.map((x) => {
    var result = roleTransactionTPE.find((y) => y === x.RoleCode);
    if (result) {
      isBool = true;
    }
  });
  return isBool;
};

const getIsTransactionTRSTRole = () => {
  var isBool = false;
  arrRole.map((x) => {
    var result = roleTransactionTRST.find((y) => y === x.RoleCode);
    if (result) {
      isBool = true;
    }
  });
  return isBool;
};

const setRoleNav = () => {
  var isMasterRole = getIsMasterRole();
  var isTransactionTPERole = getIsTransactionTPERole();
  var isTransactionTRSTRole = getIsTransactionTRSTRole();

  if (isMasterRole && isTransactionTPERole && isTransactionTRSTRole) {
    var newNavTransaction = { ...objNavTransactionMain };
    newNavTransaction._children = [
      ...arrNavTransactionSubTPE,
      ...arrNavTransactionSubTRST,
    ];
    return [objDashboard, ...arrNavMaster, newNavTransaction];
  } else if (isMasterRole && isTransactionTPERole && !isTransactionTRSTRole) {
    var newNavTransaction = { ...objNavTransactionMain };
    newNavTransaction._children = [...arrNavTransactionSubTPE];
    return [objDashboard, ...arrNavMaster, newNavTransaction];
  } else if (isMasterRole && !isTransactionTPERole && !isTransactionTRSTRole) {
    return [...arrNavMaster];
  } else if (!isMasterRole && isTransactionTPERole && isTransactionTRSTRole) {
    var newNavTransaction = { ...objNavTransactionMain };
    newNavTransaction._children = [
      ...arrNavTransactionSubTPE,
      ...arrNavTransactionSubTRST,
    ];
    return [objDashboard, newNavTransaction];
  } else if (!isMasterRole && !isTransactionTPERole && isTransactionTRSTRole) {
    var newNavTransaction = { ...objNavTransactionMain };
    newNavTransaction._children = [...arrNavTransactionSubTRST];
    return [newNavTransaction];
  } else if (!isMasterRole && isTransactionTPERole && !isTransactionTRSTRole) {
    var newNavTransaction = { ...objNavTransactionMain };
    newNavTransaction._children = [...arrNavTransactionSubTPE];
    return [objDashboard, newNavTransaction];
  } else if (isMasterRole && !isTransactionTPERole && isTransactionTRSTRole) {
    var newNavTransaction = { ...objNavTransactionMain };
    newNavTransaction._children = [...arrNavTransactionSubTRST];
    return [newNavTransaction];
  } else {
    return [];
  }
};

const objDashboard = {
  _tag: "CSidebarNavItem",
  name: "Dashboard",
  to: "/dashboard",
  icon: <CIcon name="cil-chart-pie" customClasses="c-sidebar-nav-icon" />,

  // badge: {
  //   color: 'success',
  //   text: 'Welcome',
  // }
  // badge: {
  //   color: 'danger',
  //   text: 'New',
  // },
  // badge: {
  //   color: 'danger',
  //   text: 'Update',
  // }
};

const arrNavMaster = [
  {
    _tag: "CSidebarNavDropdown",
    name: `${Constant.mainMaster}`,
    route: "/master",
    icon: <CIcon name="cilUser" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavDropdown",
        name: `${Constant.submainAuthentication}`,
        route: "/buttons",
        icon: <CIcon name="cilLibrary" customClasses="c-sidebar-nav-icon" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterUser}
              </span>
            ),
            to: "/master/authentication/user",
          },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: "Charts",
          //   to: "/charts",
          //   icon: "cil-chart-pie",
          // },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: "Widgets",
          //   to: "/widgets",
          //   icon: "cil-calculator",
          //   badge: {
          //     color: "info",
          //     text: "NEW",
          //   },
          // },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterUserGroup}
              </span>
            ),
            to: "/master/authentication/userGroup",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterAuthentication}
              </span>
            ),
            to: "/master/authentication/Authentication",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: `${Constant.submainLocation}`,
        route: "/buttons",
        icon: (
          <CIcon name="cilLocationPin" customClasses="c-sidebar-nav-icon" />
        ),
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterCountry}
              </span>
            ),
            to: "/master/location/country",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterProvince}
              </span>
            ),
            to: "/master/location/province",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterDistrict}
              </span>
            ),
            to: "/master/location/district",
          },

          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterZone}
              </span>
            ),
            to: "/master/location/zone",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterZoneDetail}
              </span>
            ),
            to: "/master/location/zone_detail",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterSource}
              </span>
            ),
            to: "/master/location/source",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterSourcePlant}
              </span>
            ),
            to: "/master/location/source_plant",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterShipTo}
              </span>
            ),
            to: "/master/location/shipTo",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterPort}
              </span>
            ),
            to: "/master/location/port",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterCYPlace}
              </span>
            ),
            to: "/master/location/cyplace",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterPlaceContainerReturn}
              </span>
            ),
            to: "/master/location/PlaceContainerReturn",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterPostCode}
              </span>
            ),
            to: "/master/location/postcode",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.submainCompany}
              </span>
            ),
            to: "/master/company",
          },
        ],
      },

      {
        _tag: "CSidebarNavDropdown",
        name: `${Constant.submainLogistics}`,
        route: "/buttons",
        icon: <CIcon name="cilMap" customClasses="c-sidebar-nav-icon" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterTransporter}
              </span>
            ),
            to: "/master/logistics/transporter",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {" "}
                {Constant.txtMasterTruckType}
              </span>
            ),
            to: "/master/logistics/trucktype",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: `${Constant.submainOther}`,
        route: "/buttons",
        icon: <CIcon name="cilLibrary" customClasses="c-sidebar-nav-icon" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterExtraCharge}
              </span>
            ),
            to: "/master/other/extraCharge",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: `${Constant.submainContract}`,
        route: "/buttons",
        icon: <CIcon name="cilPhone" customClasses="c-sidebar-nav-icon" />,
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterContactDomestic}
              </span>
            ),
            to: "/master/Contract/Domestic",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterContactExport}
              </span>
            ),
            to: "/master/Contract/Export",
          },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: ".5rem" }}>
          //       Export งานขนสินค้า
          //       {/* {Constant.txtMasterContactExport} */}
          //     </span>
          //   ),
          //   to: "/master/Contract/Export",
          // },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: ".5rem" }}>
          //       {Constant.txtMasterContactExportTruck}
          //     </span>
          //   ),
          //   to: "/master/Contract/Export-Truck",
          // },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: ".5rem" }}>
          //       {Constant.txtMasterContactExportLCLAir}
          //     </span>
          //   ),
          //   to: "/master/Contract/Export-LCLAir",
          // },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: ".5rem" }}>
          //       {Constant.txtMasterContactEPZ}
          //     </span>
          //   ),
          //   to: "/master/Contract/EPZ",
          // },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: ".5rem" }}>
          //       {Constant.txtMasterTranferMTP}
          //     </span>
          //   ),
          //   to: "/master/Contract/Transfer",
          // },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: ".5rem" }}>
                {Constant.txtMasterContactApproveContract}
              </span>
            ),
            to: "/master/Contract/ApproveContract",
          },

          // {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: ".5rem" }}>
          //       {Constant.txtMasterTranferLCB}
          //     </span>
          //   ),
          //   to: "/master/Contract/ApproveContract",
          // },
        ],
      },
    ],
  },
];

const objNavTransactionMain = {
  _tag: "CSidebarNavDropdown",
  name: "Transaction",
  route: "/buttons",
  icon: <CIcon name="cibCashapp" customClasses="c-sidebar-nav-icon" />,
  _children: [],
};

const arrNavTransactionSubTPE = [
  {
    _tag: "CSidebarNavDropdown",
    name: "TPC",
    route: "/buttons",
    icon: <CIcon name="cibAboutMe" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavDropdown",
        name: (
          <span style={{ marginLeft: ".7rem" }}>
            {Constant.txtMasterContactDomesticEng}
          </span>
        ),
        route: "/buttons",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Delivery List View</span>
            ),
            to: "/Transaction/TPC/Domestic/DeliveryList",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>
                Create Payment Document
              </span>
            ),
            to: "/Transaction/TPC/Domestic/CreatePayment",
          },
          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>Payment List View</span>,
            to: "/Transaction/TPC/Domestic/PaymentList",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Approve Payment List</span>
            ),
            to: "/Transaction/TPC/Domestic/ApprovePayment",
          },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: (
          <span style={{ marginLeft: ".7rem" }}>
            {Constant.txtMasterContactExportEng}
          </span>
        ),
        route: "/buttons",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Delivery List View</span>
            ),
            to: "/Transaction/TPC/Export/DeliveryList",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>
                Create Payment Document
              </span>
            ),
            to: "/Transaction/TPC/Export/CreatePayment",
          },
          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>Payment List View</span>,
            to: "/Transaction/TPC/Export/PaymentList",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Approve Payment List</span>
            ),
            to: "/Transaction/TPC/Export/ApprovePayment",
          },
        ],
      },
      // {
      //   _tag: "CSidebarNavDropdown",
      //   name: (
      //     <span style={{ marginLeft: ".7rem" }}>
      //       {Constant.txtMasterTranfer}
      //     </span>
      //   ),
      //   route: "/buttons",
      //   _children: [
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: (
      //         <span style={{ marginLeft: "1rem" }}>Transfer List View</span>
      //       ),
      //       to: "/Transaction/TPC/Transfer/TransferList",
      //     },
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: (
      //         <span style={{ marginLeft: "1rem" }}>
      //           Create Payment Document
      //         </span>
      //       ),
      //       to: "/Transaction/TPC/Transfer/CreatePayment",
      //     },
      //     // {
      //     //   _tag: "CSidebarNavItem",
      //     //   name: (
      //     //     <span style={{ marginLeft: "1rem" }}>Credit/Debit List View</span>
      //     //   ),
      //     //   to: "/Transaction/TPC/Transfer/CreditDebit/ApproveList",
      //     // },
      //     // {
      //     //   _tag: "CSidebarNavItem",
      //     //   name: (
      //     //     <span style={{ marginLeft: "1rem" }}>Approve Credit/Debit</span>
      //     //   ),
      //     //   to: "/Transaction/TPC/Transfer/CreditDebit/Approve",
      //     // },
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: <span style={{ marginLeft: "1rem" }}>Payment List View</span>,
      //       to: "/Transaction/TPC/Transfer/PaymentList",
      //     },
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: (
      //         <span style={{ marginLeft: "1rem" }}>Approve Payment List</span>
      //       ),
      //       to: "/Transaction/TPC/Transfer/ApprovePayment",
      //     },
      //   ],
      // },
      {
        _tag: "CSidebarNavDropdown",
        name: (
          <span style={{ marginLeft: ".7rem" }}>
            {Constant.txtTransactionCrediDebit}
          </span>
        ),
        route: "/buttons",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Credit/Debit List View</span>
            ),
            to: "/Transaction/TPC/CreditDebit/ApproveList",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Approve Credit/Debit</span>
            ),
            to: "/Transaction/TPC/CreditDebit/Approve",
          },
          // {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: "1rem" }}>Initial Credit/Debit</span>
          //   ),
          //   to: "/Transaction/Transporter/Transfer/CreditDebit/Approve",
          // },
        ],
      },
      {
        _tag: "CSidebarNavDropdown",
        name: <span style={{ marginLeft: ".7rem" }}>Interface</span>,
        route: "/buttons",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>Import EDP Files</span>,
            to: "/Transaction/TPC/EDP/EDPMapping",
          },
          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>EDP Initial</span>,
            to: "/Transaction/TPC/EDP/EDPMappingView",
          },
          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>EDP Approve</span>,
            to: "/Transaction/TPC/EDP/ApproveEDPMapping",
          },

          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>Import SF Files</span>,
            to: "/Transaction/TPC/EDP/ImportExport",
          },
        ],
      },
      {
        _tag: "CSidebarNavItem",
        name: <span style={{ marginLeft: ".7rem" }}>Fuel Price</span>,
        to: "/Transaction/TPC/FuelPrice",
      },
      {
        _tag: "CSidebarNavItem",
        name: <span style={{ marginLeft: ".7rem" }}>Command Jobs</span>,
        to: "/Transaction/TPC/CommandJobs",
      },
      {
        _tag: "CSidebarNavItem",
        name: <span style={{ marginLeft: ".7rem" }}>Interfaec Error Log</span>,
        to: "/Transaction/TPC/InterfaceErrorLog",
      },
    ],
  },
];

const arrNavTransactionSubTRST = [
  {
    _tag: "CSidebarNavDropdown",
    name: "Transporter",
    route: "/buttons",
    icon: <CIcon name="cilTruck" customClasses="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: "CSidebarNavDropdown",
        name: <span style={{ marginLeft: ".7rem" }}>Domestic</span>,
        route: "/buttons",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Delivery List View</span>
            ),
            to: "/Transaction/Transporter/Domestic/DeliveryList",
          },
          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>Payment List View</span>,
            to: "/Transaction/TPC/Domestic/PaymentList",
          },
        ],
        //
      },
      {
        _tag: "CSidebarNavDropdown",
        name: <span style={{ marginLeft: ".7rem" }}>Export</span>,
        route: "/buttons",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Delivery List View</span>
            ),
            to: "/Transaction/Transporter/Export/DeliveryList",
          },
          {
            _tag: "CSidebarNavItem",
            name: <span style={{ marginLeft: "1rem" }}>Payment List View</span>,
            to: "/Transaction/TPC/Export/PaymentList",
          },
        ],
      },
      // {
      //   _tag: "CSidebarNavDropdown",
      //   name: (
      //     <span style={{ marginLeft: ".7rem" }}>
      //       {Constant.txtMasterTranfer}
      //     </span>
      //   ),
      //   route: "/buttons",
      //   _children: [
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: (
      //         <span style={{ marginLeft: "1rem" }}>Transfer List View</span>
      //       ),
      //       to: "/Transaction/Transporter/Transfer/DeliveryList",
      //     },
      //     // {
      //     //   _tag: "CSidebarNavItem",
      //     //   name: (
      //     //     <span style={{ marginLeft: "1rem" }}>Credit/Debit List View</span>
      //     //   ),
      //     //   to: "/Transaction/Transporter/Transfer/CreditDebit/ApproveList",
      //     // },
      //     // {
      //     //   _tag: "CSidebarNavItem",
      //     //   name: (
      //     //     <span style={{ marginLeft: "1rem" }}>Initial Credit/Debit</span>
      //     //   ),
      //     //   to: "/Transaction/Transporter/Transfer/CreditDebit/Approve",
      //     // },
      //     {
      //       _tag: "CSidebarNavItem",
      //       name: <span style={{ marginLeft: "1rem" }}>Payment List View</span>,
      //       to: "/Transaction/Transporter/Transfer/PaymentList",
      //     },
      //   ],
      // },
      {
        _tag: "CSidebarNavDropdown",
        name: (
          <span style={{ marginLeft: ".7rem" }}>
            {Constant.txtTransactionCrediDebit}
          </span>
        ),
        route: "/buttons",
        _children: [
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Credit/Debit List View</span>
            ),
            to: "/Transaction/Transporter/CreditDebit/ApproveList",
          },
          {
            _tag: "CSidebarNavItem",
            name: (
              <span style={{ marginLeft: "1rem" }}>Approve Credit/Debit</span>
            ),
            to: "/Transaction/Transporter/CreditDebit/Approve",
          },
          //   {
          //   _tag: "CSidebarNavItem",
          //   name: (
          //     <span style={{ marginLeft: "1rem" }}>Initial Credit/Debit</span>
          //   ),
          //   to: "/Transaction/Transporter/Transfer/CreditDebit/Approve",
          // },
        ],
        //
      },
    ],
  },
];

// const objCookieNotice = {
//   _tag: "CSidebarNavItem",
//   name: "CookieNotice",
//   to: "/cookieNotice",
//   // icon: <CIcon name="cil-chart-pie" customClasses="c-sidebar-nav-icon" />,
// };

const _nav = setRoleNav();

export default _nav;

//   {
//     _tag: 'CSidebarNavDivider',
//     className: 'm-2'
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: '----------------------------------------',
//     to: '',
//   },
//   {
//     _tag: 'CSidebarNavDivider',
//     className: 'm-2'
//   },
//   // {
//   //   _tag: 'CSidebarNavDropdown',
//   //   name: 'For Test',
//   //   route: '/buttons',
//   //   icon: <CIcon name="cilPhone" customClasses="c-sidebar-nav-icon" />,
//   //   badge: {
//   //     color: 'success',
//   //     text: 'Welcome',
//   //   },
//   //   _children: [
//   //     {
//   //       _tag: 'CSidebarNavItem',
//   //       name: 'For Test',
//   //       to: '/Test/ForTest',
//   //       icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
//   //       badge: {
//   //         color: 'info',
//   //         text: 'NEW',
//   //       }

//   //     },
//   //     {
//   //       _tag: 'CSidebarNavItem',
//   //       name: 'For Test1',
//   //       to: '/Test/ForTest',
//   //       icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
//   //       badge: {
//   //         color: 'info',
//   //         text: 'NEW',
//   //       }

//   //     },
//   //     {
//   //       _tag: 'CSidebarNavItem',
//   //       name: 'For Test2',
//   //       to: '/Test/ForTest',
//   //       icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
//   //       badge: {
//   //         color: 'info',
//   //         text: 'NEW',
//   //       }

//   //     },
//   //   ],
//   // },

//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Theme']
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Colors',
//     to: '/theme/colors',
//     icon: 'cil-drop',
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Typography',
//     to: '/theme/typography',
//     icon: 'cil-pencil',
//   },
//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Components']
//   },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Base',
//     route: '/base',
//     icon: 'cil-puzzle',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Breadcrumb',
//         to: '/base/breadcrumbs',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Cards',
//         to: '/base/cards',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Carousel',
//         to: '/base/carousels',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Collapse',
//         to: '/base/collapses',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Forms',
//         to: '/base/forms',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Jumbotron',
//         to: '/base/jumbotrons',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'List group',
//         to: '/base/list-groups',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Navs',
//         to: '/base/navs',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Navbars',
//         to: '/base/navbars',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Pagination',
//         to: '/base/paginations',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Popovers',
//         to: '/base/popovers',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Progress',
//         to: '/base/progress-bar',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Switches',
//         to: '/base/switches',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Tables',
//         to: '/base/tables',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Tabs',
//         to: '/base/tabs',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Tooltips',
//         to: '/base/tooltips',
//       },
//     ],
//   },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Buttons',
//     route: '/buttons',
//     icon: 'cil-cursor',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Buttons',
//         to: '/buttons/buttons',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Brand buttons',
//         to: '/buttons/brand-buttons',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Buttons groups',
//         to: '/buttons/button-groups',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Dropdowns',
//         to: '/buttons/button-dropdowns',
//       }
//     ],
//   },

// {
//   _tag: "CSidebarNavItem",
//   name: "Charts",
//   to: "/charts",
//   icon: "cil-chart-pie",
// },
// {
//   _tag: "CSidebarNavDropdown",
//   name: "Icons",
//   route: "/icons",
//   icon: "cil-star",
//   _children: [
//     {
//       _tag: "CSidebarNavItem",
//       name: "CoreUI Free",
//       to: "/icons/coreui-icons",
//       badge: {
//         color: "success",
//         text: "NEW",
//       },
//     },
//     {
//       _tag: "CSidebarNavItem",
//       name: "CoreUI Flags",
//       to: "/icons/flags",
//     },
//     {
//       _tag: "CSidebarNavItem",
//       name: "CoreUI Brands",
//       to: "/icons/brands",
//     },
//   ],
// },
//   {
//     _tag: 'CSidebarNavDropdown',
//     name: 'Notifications',
//     route: '/notifications',
//     icon: 'cil-bell',
//     _children: [
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Alerts',
//         to: '/notifications/alerts',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Badges',
//         to: '/notifications/badges',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Modal',
//         to: '/notifications/modals',
//       },
//       {
//         _tag: 'CSidebarNavItem',
//         name: 'Toaster',
//         to: '/notifications/toaster'
//       }
//     ]
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Widgets',
//     to: '/widgets',
//     icon: 'cil-calculator',
//     badge: {
//       color: 'info',
//       text: 'NEW',
//     },
//   },
//   {
//     _tag: 'CSidebarNavDivider'
//   },
//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Extras'],
//   },
// {
//   _tag: "CSidebarNavDropdown",
//   name: "Pages",
//   route: "/pages",
//   icon: "cil-star",
//   _children: [
//     {
//       _tag: "CSidebarNavItem",
//       name: "Login",
//       to: "/login",
//     },
//     {
//       _tag: "CSidebarNavItem",
//       name: "Register",
//       to: "/register",
//     },
//     {
//       _tag: "CSidebarNavItem",
//       name: "Error 404",
//       to: "/404",
//     },
//     {
//       _tag: "CSidebarNavItem",
//       name: "Error 500",
//       to: "/500",
//     },
//   ],
// },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Disabled',
//     icon: 'cil-ban',
//     badge: {
//       color: 'secondary',
//       text: 'NEW',
//     },
//     addLinkClass: 'c-disabled',
//     'disabled': true
//   },
//   {
//     _tag: 'CSidebarNavDivider',
//     className: 'm-2'
//   },
//   {
//     _tag: 'CSidebarNavTitle',
//     _children: ['Labels']
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Label danger',
//     to: '',
//     icon: {
//       name: 'cil-star',
//       className: 'text-danger'
//     },
//     label: true
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Label info',
//     to: '',
//     icon: {
//       name: 'cil-star',
//       className: 'text-info'
//     },
//     label: true
//   },
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Label warning',
//     to: '',
//     icon: {
//       name: 'cil-star',
//       className: 'text-warning'
//     },
//     label: true
//   },
//   {
//     _tag: 'CSidebarNavDivider',
//     className: 'm-2'
//   }
