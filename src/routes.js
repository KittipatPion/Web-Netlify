import React from "react";
import { Component } from "react";
import Constant from "./helpers/Constant";

const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() => import("./views/base/tables/Tables"));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const BrandButtons = React.lazy(() =>
  import("./views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

// {* Start Add New Route * }
/** Other */
const EditProfile = React.lazy(() => import("./components/other/EditProfile"));
const CoverSheet = React.lazy(() => import("./components/other/CoverSheet"));

/** Authentication */
const UsersValue = React.lazy(() =>
  import("./components/master/authentication/User")
);
const UserGroup = React.lazy(() =>
  import("./components/master/authentication/UserGroup")
);
const Authentication = React.lazy(() =>
  import("./components/master/authentication/Authentication")
);

/** Location */
const Country = React.lazy(() =>
  import("./components/master/location/Country")
);
const District = React.lazy(() =>
  import("./components/master/location/District")
);
const Province = React.lazy(() =>
  import("./components/master/location/Province")
);
const Zone = React.lazy(() => import("./components/master/location/Zone"));
const ZoneDetail = React.lazy(() =>
  import("./components/master/location/ZoneDetail")
);
const Source = React.lazy(() => import("./components/master/location/Source"));
const SourcePlant = React.lazy(() =>
  import("./components/master/location/SourcePlant")
);
const ShipTo = React.lazy(() => import("./components/master/location/ShipTo"));
const Port = React.lazy(() => import("./components/master/location/Port"));
const CYPlace = React.lazy(() =>
  import("./components/master/location/CYPlace")
);
const PlaceContainerReturn = React.lazy(() =>
  import("./components/master/location/PlaceContainerReturn")
);
const PostCode = React.lazy(() =>
  import("./components/master/location/PostCode")
);

/** Company */
const Company = React.lazy(() => import("./components/master/company/Company"));

/** Logistic */
const Transporter = React.lazy(() =>
  import("./components/master/logistics/Transporter")
);
const TruckType = React.lazy(() =>
  import("./components/master/logistics/TruckType")
);

/** Other */
const ExtraCharge = React.lazy(() =>
  import("./components/master/other/extraCharge")
);

/** Contract */
const Domestic = React.lazy(() =>
  import("./components/master/contract/Domestic")
);
const Export = React.lazy(() => import("./components/master/contract/Export"));
const ExportTruck = React.lazy(() =>
  import("./components/master/contract/ExportTruck")
);
const ExportLCLAir = React.lazy(() =>
  import("./components/master/contract/ExportLCLAir")
);
const EPZ = React.lazy(() => import("./components/master/contract/EPZ"));
const ApproveContract = React.lazy(() =>
  import("./components/master/contract/ApproveContract")
);
const TrnsferMTP = React.lazy(() =>
  import("./components/master/contract/Transfer")
);
// const TrnsferLCB = React.lazy(() =>
//   import("./components/master/contract/")
// );

//**Transaction */
//**Transaction History Log */
const HistoryLog = React.lazy(() =>
  import("./components/transaction/tpe/domestic/historyLog")
);

//**Transaction Domestic */
const DomDeliveryList = React.lazy(() =>
  import("./components/transaction/tpe/domestic/DeliveryList")
);
const DomCreatePayment = React.lazy(() =>
  import("./components/transaction/tpe/domestic/PaymentDoc")
);
const DomPaymentList = React.lazy(() =>
  import("./components/transaction/tpe/domestic/PaymentList")
);
const DomApprovePayment = React.lazy(() =>
  import("./components/transaction/tpe/domestic/ApprovePayment")
);

/**Transaction Export */
const ExpDeliveryList = React.lazy(() =>
  import("./components/transaction/tpe/export/DeliveryList")
);
const ExpCreatePayment = React.lazy(() =>
  import("./components/transaction/tpe/export/PaymentDoc")
);
const ExpPaymentList = React.lazy(() =>
  import("./components/transaction/tpe/export/PaymentList")
);
const ExpApprovePayment = React.lazy(() =>
  import("./components/transaction/tpe/export/ApprovePayment")
);

/**Transaction Export */
const TransferDeliveryList = React.lazy(() =>
  import("./components/transaction/tpe/transfer/DeliveryList")
);
const TransferCreatePayment = React.lazy(() =>
  import("./components/transaction/tpe/transfer/PaymentDoc")
);
const TransferPaymentList = React.lazy(() =>
  import("./components/transaction/tpe/transfer/PaymentList")
);
const TransferApprovePayment = React.lazy(() =>
  import("./components/transaction/tpe/transfer/ApprovePayment")
);





/**Transaction Credit Debit */
const CdDbApproveList = React.lazy(() =>
  import("./components/transaction/tpe/domestic/ApproveListView.js")
);
const CdDbApprove = React.lazy(() =>
  import("./components/transaction/tpe/domestic/Approve")
);

const TransferCdDbApproveList = React.lazy(() =>
  import("./components/transaction/tpe/transfer/ApproveListView.js")
);
const TransferCdDbApprove = React.lazy(() =>
  import("./components/transaction/tpe/transfer/Approve")
);




/**Transaction EDP */
const EDPMapping = React.lazy(() =>
  import("./components/transaction/tpe/edp/EDPMapping")
);
const ImportExport = React.lazy(() =>
  import("./components/transaction/tpe/edp/ExImport")
);
const EDPMappingList = React.lazy(() =>
  import("./components/transaction/tpe/edp/EDPListView")
);
const ApproveEDPMapping = React.lazy(() =>
  import("./components/transaction/tpe/edp/EDPApprove")
);

/**FuelPrice */
const FuelPrice = React.lazy(() =>
  import("./components/transaction/tpe/fuelPrice/FuelPrice")
);
//** CommandJobs */
const CommandJobs = React.lazy(() =>
  import("./components/transaction/tpe/commandJobs/CommandJobs")
);
//**ErrorLog */
const InterfaceErrorLog = React.lazy(() =>
  import("./components/transaction/tpe/interfaceErrorLog/InterfaceErrorLog")
);

//

//** CookieNotice */
const CookieNotice = React.lazy(() =>
  import("./views/pages/cookieNotice/cookieNotice")
);

// {* End Add New Route *}

const routes = [
  { path: "/", exact: true, name: `${Constant.mainMenu}` },
  {
    path: "/cookieNotice",
    name: `${Constant.cookieNotice}`,
    component: CookieNotice,
  },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/theme", name: "Theme", component: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", name: "Base", component: Cards, exact: true },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/forms", name: "Forms", component: BasicForms },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  {
    path: "/buttons/button-dropdowns",
    name: "Dropdowns",
    component: ButtonDropdowns,
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups,
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons,
  },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/brands", name: "Brands", component: Brands },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/widgets", name: "Widgets", component: Widgets },

  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },

  // {* Start Add New Route * }
  /** Authentication */
  { path: "/Menu", name: `Menu`, exact: true },
  {
    path: "/Menu/EditProfile",
    name: `Edit Profile`,
    component: EditProfile,
  },
  {
    path: "/Menu/CoverSheet",
    name: `Cover Sheet`,
    component: CoverSheet,
  },

  { path: "/master", name: `${Constant.mainMaster}`, exact: true },
  {
    path: "/master/Authentication",
    name: `${Constant.submainAuthentication}`,
    exact: true,
  },
  {
    path: "/master/authentication/user",
    name: `${Constant.txtMasterUser}`,
    component: UsersValue,
  },
  {
    path: "/master/authentication/UserGroup",
    name: `${Constant.txtMasterUserGroup}`,
    component: UserGroup,
  },
  {
    path: "/master/authentication/Authentication",
    name: `${Constant.txtMasterAuthentication}`,
    component: Authentication,
  },

  /** Location */
  // { path: "/master", name: `${Constant.mainMaster}`, exact: true },
  {
    path: "/master/location",
    name: `${Constant.submainLocation}`,
    exact: true,
  },
  {
    path: "/master/location/country",
    name: `${Constant.txtMasterCountry}`,
    component: Country,
  },
  {
    path: "/master/location/province",
    name: `${Constant.txtMasterProvince}`,
    component: Province,
  },
  {
    path: "/master/location/district",
    name: `${Constant.txtMasterDistrict}`,
    component: District,
  },
  {
    path: "/master/location/zone",
    name: `${Constant.txtMasterZone}`,
    component: Zone,
  },
  {
    path: "/master/location/zone_detail",
    name: `${Constant.txtMasterZoneDetail}`,
    component: ZoneDetail,
  },
  {
    path: "/master/location/source",
    name: `${Constant.txtMasterSource}`,
    component: Source,
  },
  {
    path: "/master/location/source_plant",
    name: `${Constant.txtMasterSourcePlant}`,
    component: SourcePlant,
  },
  {
    path: "/master/location/shipTo",
    name: `${Constant.txtMasterShipTo}`,
    component: ShipTo,
  },
  {
    path: "/master/location/port",
    name: `${Constant.txtMasterPort}`,
    component: Port,
  },
  {
    path: "/master/location/cyplace",
    name: `${Constant.txtMasterCYPlace}`,
    component: CYPlace,
  },
  {
    path: "/master/location/placeContainerReturn",
    name: `${Constant.txtMasterPlaceContainerReturn}`,
    component: PlaceContainerReturn,
  },
  {
    path: "/master/location/postcode",
    name: `${Constant.txtMasterPostCode}`,
    component: PostCode,
  },

  //**Company */

  {
    path: "/master/company",
    name: `${Constant.submainCompany}`,
    component: Company,
  },

  /** Logistics */
  {
    path: "/master/logistics",
    name: `${Constant.submainLogistics}`,
    exact: true,
  },
  {
    path: "/master/logistics/transporter",
    name: `${Constant.txtMasterTransporter}`,
    component: Transporter,
  },
  {
    path: "/master/logistics/trucktype",
    name: `${Constant.txtMasterTruckType}`,
    component: TruckType,
  },

  /** Logistics */
  {
    path: "/master/other/extraCharge",
    name: `${Constant.txtMasterExtraCharge}`,
    component: ExtraCharge,
  },

  /** Contract */
  {
    path: "/master/Contract",
    name: `${Constant.submainContract}`,
    exact: true,
  },
  {
    path: "/master/Contract/Domestic",
    name: `${Constant.txtMasterContactDomestic}`,
    component: Domestic,
  },
  {
    path: "/master/Contract/Export",
    name: `${Constant.txtMasterContactExport}`,
    component: Export,
  },
  {
    path: "/master/Contract/Export-Truck",
    name: `${Constant.txtMasterContactExportTruck}`,
    component: ExportTruck,
  },
  {
    path: "/master/Contract/Export-LCLAir",
    name: `${Constant.txtMasterContactExportLCLAir}`,
    component: ExportLCLAir,
  },
  {
    path: "/master/Contract/EPZ",
    name: `${Constant.txtMasterContactEPZ}`,
    component: EPZ,
  },
  {
    path: "/master/Contract/ApproveContract",
    name: `${Constant.txtMasterContactApproveContract}`,
    component: ApproveContract,
  },
  {
    path: "/master/Contract/Transfer",
    name: `${Constant.txtMasterTranferMTP}`,
    component: TrnsferMTP,
  },

  // {* End Add New Route *}

  //transaction//
  { path: "/Transaction", name: `${Constant.txtTransaction}`, exact: true },

  {
    path: "/Transaction/HistoryLog",
    name: "History Log",
    component: HistoryLog,
  },

  { path: "/Transaction/TPC", name: `${Constant.txtTPE}`, exact: true },
  {
    path: "/Transaction/TPC/Domestic",
    name: `${Constant.txtMasterContactDomestic}`,
    exact: true,
  },
  {
    path: "/Transaction/TPC/Domestic/DeliveryList",
    name: `${Constant.txtTransactionDeliveryList}`,
    component: DomDeliveryList,
  },
  {
    path: "/Transaction/TPC/Domestic/CreatePayment",
    name: `${Constant.txtTransactionPaymentListDoc}`,
    component: DomCreatePayment,
  },
  {
    path: "/Transaction/TPC/Domestic/PaymentList",
    name: `${Constant.txtTransactionPaymentList}`,
    component: DomPaymentList,
  },
  {
    path: "/Transaction/TPC/Domestic/ApprovePayment",
    name: `${Constant.txtTransactionApprovePaymentList}`,
    component: DomApprovePayment,
  },

  {
    path: "/Transaction/TPC/Export",
    name: `${Constant.txtMasterContactExports}`,
    exact: true,
  },
  {
    path: "/Transaction/TPC/Export/DeliveryList",
    name: `${Constant.txtTransactionDeliveryList}`,
    component: ExpDeliveryList,
  },
  {
    path: "/Transaction/TPC/Export/CreatePayment",
    name: `${Constant.txtTransactionPaymentListDoc}`,
    component: ExpCreatePayment,
  },
  {
    path: "/Transaction/TPC/Export/PaymentList",
    name: `${Constant.txtTransactionPaymentList}`,
    component: ExpPaymentList,
  },
  {
    path: "/Transaction/TPC/Export/ApprovePayment",
    name: `${Constant.txtTransactionApprovePaymentList}`,
    component: ExpApprovePayment,
  },
  

  {
    path: "/Transaction/TPC/CreditDebit",
    name: `${Constant.txtTransactionCrediDebit}`,
    exact: true,
  },
  {
    path: "/Transaction/TPC/CreditDebit/ApproveList",
    name: `${Constant.txtTransactionApproveList}`,
    component: CdDbApproveList,
  },
  {
    path: "/Transaction/TPC/CreditDebit/Approve",
    name: `${Constant.txtTransactionApprove}`,
    component: CdDbApprove,
  },

  {
    path: "/Transaction/TPC/Transfer",
    name: `${Constant.txtMasterTranfer}`,
    exact: true,
  },
  {
    path: "/Transaction/TPC/Transfer/TransferList",
    name: 'Transfer List View',
    component: TransferDeliveryList,
  },
  {
    path: "/Transaction/TPC/Transfer/CreatePayment",
    name: `${Constant.txtTransactionPaymentListDoc}`,
    component: TransferCreatePayment,
  },
  {
    path: "/Transaction/TPC/Transfer/PaymentList",
    name: `${Constant.txtTransactionPaymentList}`,
    component: TransferPaymentList,
  },
  {
    path: "/Transaction/TPC/Transfer/ApprovePayment",
    name: `${Constant.txtTransactionApprovePaymentList}`,
    component: TransferApprovePayment,
  },
  {
    path: "/Transaction/TPC/Transfer/CreditDebit/ApproveList",
    name: `${Constant.txtTransactionApproveList}`,
    component: TransferCdDbApproveList,
  },
  {
    path: "/Transaction/TPC/Transfer/CreditDebit/Approve",
    name: `${Constant.txtTransactionApprove}`,
    component: TransferCdDbApprove,
  },
  {
    path: "/Transaction/Transporter/Transfer/ApprovePayment",
    name: `${Constant.txtTransactionApprovePaymentList}`,
    component: TransferApprovePayment,
  },
  
  


  { path: "/Transaction/Transporter", name: "Transporter", exact: true },
  
  {
    path: "/Transaction/Transporter/Domestic",
    name: `${Constant.txtMasterContactDomestic}`,
    exact: true,
  },
  {
    path: "/Transaction/Transporter/Domestic/DeliveryList",
    name: `${Constant.txtTransactionDeliveryList}`,
    component: DomDeliveryList,
  },
  {
    path: "/Transaction/Transporter/Domestic/PaymentList",
    name: `${Constant.txtTransactionPaymentList}`,
    component: DomPaymentList,
  },

  {
    path: "/Transaction/Transporter/Export",
    name: `${Constant.txtMasterContactExports}`,
    exact: true,
  },
  {
    path: "/Transaction/Transporter/Export/DeliveryList",
    name: `${Constant.txtTransactionDeliveryList}`,
    component: ExpDeliveryList,
  },
  {
    path: "/Transaction/Transporter/Export/PaymentList",
    name: `${Constant.txtTransactionPaymentList}`,
    component: ExpPaymentList,
  },
  {
    path: "/Transaction/Transporter/Export/DeliveryList",
    name: `${Constant.txtTransactionDeliveryList}`,
    component: ExpCreatePayment,
  },
  {
    path: "/Transaction/Transporter/Export/PaymentList",
    name: `${Constant.txtTransactionPaymentList}`,
    component: ExpPaymentList,
  },
  {
    path: "/Transaction/Transporter/Transfer",
    name: `${Constant.txtMasterTranfer}`,
    exact: true,
  },
  {
    path: "/Transaction/Transporter/Transfer/DeliveryList",
    name: `${Constant.txtTransactionDeliveryList}`,
    component: TransferDeliveryList,
  },
  {
    path: "/Transaction/Transporter/Transfer/PaymentList",
    name: `${Constant.txtTransactionDeliveryList}`,
    component: TransferPaymentList,
  },

  {
    path: "/Transaction/Transporter/CreditDebit",
    name: `${Constant.txtTransactionCrediDebit}`,
    exact: true,
  },
  {
    path: "/Transaction/Transporter/CreditDebit/ApproveList",
    name: `${Constant.txtTransactionApproveList}`,
    component: CdDbApproveList,
  },
  {
    path: "/Transaction/Transporter/CreditDebit/Approve",
    name: `${Constant.txtTransactionApprove}`,
    component: CdDbApprove,
  },

  {
    path: "/Transaction/Transporter/Transfer/CreditDebit/ApproveList",
    name: `${Constant.txtTransactionApproveList}`,
    component: TransferCdDbApproveList,
  },
  {
    path: "/Transaction/Transporter/Transfer/CreditDebit/Approve",
    name: `${Constant.txtTransactionApprove}`,
    component: TransferCdDbApprove,
  },


  {
    path: "/Transaction/TPC/EDP",
    name: `${Constant.txtTransactionEDP}`,
    exact: true,
  },
  {
    path: "/Transaction/TPC/EDP/EDPMappingView",
    name: `${Constant.txtTransactionEDPMappingListView}`,
    component: EDPMappingList,
  },
  {
    path: "/Transaction/TPC/EDP/EDPMapping",
    name: `${Constant.txtTransactionEDPMapping}`,
    component: EDPMapping,
  },
  {
    path: "/Transaction/TPC/EDP/ImportExport",
    name: `${Constant.txtTransactionImportExport}`,
    component: ImportExport,
  },
  {
    path: "/Transaction/TPC/EDP/ApproveEDPMapping",
    name: `${Constant.txtTransactionApproveEDPMapping}`,
    component: ApproveEDPMapping,
  },

  {
    path: "/Transaction/TPC/FuelPrice",
    name: `${Constant.txtFuelPrice}`,
    component: FuelPrice,
  },

  //
  //**-----------------------By Gift-------------------------------------- */
  //**CommandJobs */
  {
    path: "/Transaction/TPC/CommandJobs",
    name: `${Constant.txtCommandJobs}`,
    component: CommandJobs,
  },
  //**ErrorLog */
  {
    path: "/Transaction/TPC/InterfaceErrorLog",
    name: `${Constant.txtInterfaceErrorLog}`,
    component: InterfaceErrorLog,
  },
];

export default routes;
