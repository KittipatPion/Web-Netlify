export default class SystemInfo {
  static environmentType = "DEV-NB01";
  // static environmentType = "PD-TEST";

  static systemVersion = "0.0.0.16";

  // Set isSameUrlForAllPay is false, If want connect AllPay other URL 
  static isSameUrlForAllPay =  false;

  // Variable envTypeForAllPay is environmentType, Set as needed, If want connect AllPay other URL 
  static envTypeForAllPay = "PD";
  // static envTypeForAllPay = "UAT-SCG-QA";
}

/************* Environment Type List *************
 * DEV-LOCAL      =>  IP localhost
 * DEV-NB01       =>  IP Laptop Game
 * DEV-NB02       =>  IP Laptop Nut
 * DP-LOCAL       =>  IP localhost Server Deploy
 * UAT-PO         =>  IP PION Server Test
 * UAT-SCG-DEV    =>  IP SCG DEV Server Test
 * UAT-SCG-QA     =>  IP SCG QA Server Test
 * PD             =>  IP Production Server
 * PD-TEST        =>  IP Production Server Tester
 ************************************************** */
