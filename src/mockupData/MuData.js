export default class MockUpData {

    static usersData = [
        { id: 0, paymentNo: 1670476094,limitDatetime:'01.01.2021', datetime: '01.01.2021-07.01.201', transporterId: 'STN', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '150000',edpStatus: 'OK', shipmentStatus: 'Complete' },
        { id: 1, paymentNo: 1670476095,limitDatetime:'01.01.2021', datetime: '01.01.2021-07.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'รับเช็ค', accountNo: 'BKK-MTP', price: '180000',edpStatus: 'OK', shipmentStatus: 'Complete' },
        { id: 2, paymentNo: 1670476096,limitDatetime:'16.01.2021', datetime: '08.01.2021-14.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '180000',edpStatus: 'OK', shipmentStatus: 'Complete' },
        { id: 3, paymentNo: 1670476097,limitDatetime:'16.01.2021', datetime: '01.01.2021-07.01.201', transporterId: 'STN', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '150000',edpStatus: 'OK', shipmentStatus: 'Complete' },
        { id: 4, paymentNo: 1670476098,limitDatetime:'16.01.2021', datetime: '08.01.2021-14.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'รับเช็ค', accountNo: 'BKK-MTP', price: '180000',edpStatus: 'OK', shipmentStatus: 'Complete' },
        { id: 5, paymentNo: 1670476099,limitDatetime:'16.01.2021', datetime: '08.01.2021-14.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '150000',edpStatus: 'OK', shipmentStatus: 'Complete' },

    ]

    static usersData2 = [
        { id: 0, paymentNo: 1670476094,limitDatetime:'01.01.2021', datetime: '01.01.2021-07.01.201', transporterId: 'STN', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '150000', refNo: 1670476094, paymentStatus: 'Open', allPayNo: '', },
        { id: 1, paymentNo: 1670476095,limitDatetime:'01.01.2021', datetime: '01.01.2021-07.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'รับเช็ค', accountNo: 'BKK-MTP', price: '180000', refNo: 167047609501, paymentStatus: 'Open',allPayNo: '', },
        { id: 2, paymentNo: 1670476096,limitDatetime:'16.01.2021', datetime: '08.01.2021-14.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '180000', refNo: 167047609601, paymentStatus: 'Open',allPayNo: '' },
        { id: 3, paymentNo: 1670476097,limitDatetime:'16.01.2021', datetime: '01.01.2021-07.01.201', transporterId: 'STN', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '150000', refNo: 167047609701, paymentStatus: 'Open',allPayNo: '' },
        { id: 4, paymentNo: 1670476098,limitDatetime:'16.01.2021', datetime: '08.01.2021-14.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'รับเช็ค', accountNo: 'BKK-MTP', price: '180000', refNo: 167047609801, paymentStatus: 'Open',allPayNo: '' },
        { id: 5, paymentNo: 1670476099,limitDatetime:'16.01.2021', datetime: '08.01.2021-14.01.201', transporterId: 'SCGL', creditType: '30 Days', paymentType: 'โอนเงิน', accountNo: 'SCB-1020102323', price: '150000', refNo: 167047609901, paymentStatus: 'Complete',allPayNo: 2021991670 },

    ]

    static paymentDocList = [
        { id: 0, shipmentNo: 1670476094, shipTo: 'แบ็กส์ แอนด์โกล์ฟ บจก.(รง.5)', provinceId: 'นครราชสีมา', truckType: '10W', truckLicense: '64-4355', transportPrice: '8000', fuelPrice: '1500', unLoadPrice: '900', overNightPrice: '0', extraCharge: '1000', paymentStatus: 'Complete' },
        { id: 1, shipmentNo: 1670476095, shipTo: 'ไทยอ๊อฟเซท บจก.', provinceId: 'ฉะเชิงเทรา', truckType: '10W', truckLicense: '64-4363', transportPrice: '8000', fuelPrice: '1500', unLoadPrice: '900', overNightPrice: '0', extraCharge: '0', paymentStatus: 'Open' },
        { id: 2, shipmentNo: 1670476096, shipTo: 'แบ็กส์ แอนด์โกล์ฟ บจก.(รง.5)', provinceId: 'นครราชสีมา', truckType: '10W', truckLicense: '64-4355', transportPrice: '8000', fuelPrice: '1500', unLoadPrice: '900', overNightPrice: '0', extraCharge: '1000', paymentStatus: 'Complete' },
        { id: 3, shipmentNo: 1670476097, shipTo: 'ไทยอ๊อฟเซท บจก.', provinceId: 'ฉะเชิงเทรา', truckType: '10W', truckLicense: '64-4363', transportPrice: '8000', fuelPrice: '1500', unLoadPrice: '900', overNightPrice: '0', extraCharge: '0', paymentStatus: 'Open' },
        { id: 4, shipmentNo: 1670476098, shipTo: 'แบ็กส์ แอนด์โกล์ฟ บจก.(รง.5)', provinceId: 'นครราชสีมา', truckType: '10W', truckLicense: '64-4355', transportPrice: '8000', fuelPrice: '1500', unLoadPrice: '900', overNightPrice: '0', extraCharge: '1000', paymentStatus: 'Complete' },
    ]

    static deliveryList = [
        { id: 0, shipmentNo: 1670476094, deliveryNo: '1550282263', saleOrderNo: '3032123218', sourceTo: 'MTP', shipTo: 'แบ็กส์ แอนด์โกล์ฟ บจก.(รง.5)', provinceId: 'นครราชสีมา', truckType: '10W', truckLicense: '64-4335', materialCode: '', qty: 15, debitStatus: 'Approve', eDPStatus: 'Ok', paymentStatus: 'Open', shipmentStatus: 'Complete', reject: '' },
        { id: 1, shipmentNo: 1670476095, deliveryNo: '1550282263', saleOrderNo: '3032123218', sourceTo: 'MTP', shipTo: 'ไทยอ๊อฟเซท บจก.', provinceId: 'ฉะเชิงเทรา', truckType: '10W', truckLicense: '64-4363', materialCode: '', qty: 15, debitStatus: 'Verify', eDPStatus: 'Ok', paymentStatus: 'Open', shipmentStatus: 'In progress', reject: '' },
        { id: 2, shipmentNo: 1670476096, deliveryNo: '1550282263', saleOrderNo: '3032123218', sourceTo: 'MTP', shipTo: 'แบ็กส์ แอนด์โกล์ฟ บจก.(รง.5)', provinceId: 'นครราชสีมา', truckType: '10W', truckLicense: '64-4335', materialCode: '', qty: 15, debitStatus: 'Cancel', eDPStatus: 'Ok', paymentStatus: 'Open', shipmentStatus: 'Reject', reject: 'Not Found' },
        { id: 3, shipmentNo: 1670476097, deliveryNo: '1550282263', saleOrderNo: '3032123218', sourceTo: 'MTP', shipTo: 'ไทยอ๊อฟเซท บจก.', provinceId: 'ฉะเชิงเทรา', truckType: '10W', truckLicense: '64-4363', materialCode: '', qty: 15, debitStatus: 'Cancel', eDPStatus: 'Not Ok', paymentStatus: 'Open', shipmentStatus: 'Reject', reject: 'Not Found' }

    ]

    static extraCharge = [
        { id: 0, shipmentNo: '1670476094', extratype: 'ลดหนี่', desc: 'ของแตกเสียหาย', refDoc: '12312313', price: '2500', checkBy: 'A', approveBy: '', status: 'Open', paymentDocument: '', },
        { id: 1, shipmentNo: '1670476094/1', extratype: 'ลดหนี่', desc: 'ของแตกเสียหาย', refDoc: '12312313', price: '1500', checkBy: 'B', approveBy: '', status: 'Open', paymentDocument: '', },
        { id: 2, shipmentNo: '1670476094/2', extratype: 'เพิ่มหนี้', desc: 'ค่าเอาของรับกลับ', refDoc: '12312314', price: '1000', checkBy: 'A', approveBy: 'A', status: 'Approve', paymentDocument: '2108131231', },
        { id: 3, shipmentNo: '1670476094/3', extratype: 'เพิ่มหนี้', desc: 'ค่าเอาของรับกลับ', refDoc: '12312314', price: '1200', checkBy: 'B', approveBy: 'B', status: 'Approve', paymentDocument: '2108131231' },

    ]

    static vatprice = [
        { id: 0, paymentType: 'ค่าขนส่ง', TransVat: '', price: '', },
        { id: 1, paymentType: 'ค่าปรับน้ำมัน', TransVat: '', price: '', },
        { id: 2, paymentType: 'ค่าขนลง', TransVat: '', price: '', },
        { id: 3, paymentType: 'ค่าใช้จ่ายอื่น', TransVat: '', price: '', },

        // { id: 1, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 2, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 3, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 4, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 5, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 6, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 7, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 8, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
        // { id: 9, transportPrice: '', TransVat: '', fuelPrice: '', fuelVat: '', unloadPrice: '', unLoadVat: '', otherPrice: '', otherVat: '', total: '', paymentStatus: '', },
    ]



}