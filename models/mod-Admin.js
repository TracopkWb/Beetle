//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import customerClass from "../controllers/Classes/Customer.js";
import carClass from "../controllers/Classes/Car.js";

import seeRoute from "../routes/rou-SEE.js";


//variable section
const customerPage = path.join(rootPath.__rootDir, 'views', 'Customers', 'customerPageInfo.html');
const addCustomerPage = path.join(rootPath.__rootDir, 'views', 'customerRegistration.html');
const adminPage = path.join(rootPath.__rootDir, 'views', 'test', 'admin.html');
const carPage = path.join(rootPath.__rootDir, 'views', 'test', 'cars.html');
const addCarPage = path.join(rootPath.__rootDir, 'views', 'carRegistration.html');
const servicePage = path.join(rootPath.__rootDir, 'views', 'test', 'services.html');
const customerViewPage = path.join(rootPath.__rootDir, 'views', 'test', 'test-customerView.html');
const customerEditPage = path.join(rootPath.__rootDir, 'views', 'test', 'test-customerEdit.html');
const neutralImage = path.join(rootPath.__rootDir, 'public', 'Img', 'customer.png');

//Initializing Router
const router = express.Router();
router.use(express.json({ limit: "50mb" }));

const getAdminPage = async (req, res) => {
    console.log('Getting admin page');
    res.sendFile(adminPage);

}

//////////////Customers Routing

const getCustomerPage = async (req, res) => {
    console.log('Getting admin page');
    res.sendFile(customerPage);

}

const getAddNewCustomerPage = async (req, res) => {
    console.log('Adding a new customer', req._parsedOriginalUrl.pathname);
    res.sendFile(addCustomerPage);

}

const getCustomers = async (req, res) => {
    console.log("Hash: ", req.params.hashed_id);
    const lastHashed = req.params.hashed_id;
    const check4Customers = customerClass.getAllCustomers(lastHashed);
    if ((await check4Customers).error === 'uptoDate') {
        res.status(200).json({
            success: false,
            data: (await check4Customers).data,
            error: (await check4Customers).error,
            type: 'notification-get-Customers',
            origin: 'getCustomerList()-'.concat((await check4Customers).origin),
            show: false,
            hash: (await check4Customers).hash,
        });
    } else {
        res.status(200).json({
            success: (await check4Customers).success,
            data: (await check4Customers).data,
            error: (await check4Customers).error,
            type: 'notification-get-Customers',
            origin: 'getCustomerList()-'.concat((await check4Customers).origin),
            show: false,
            hash: (await check4Customers).hash,
        });
    }
}

const getCustomerInfo = async (req, res) => {
    // console.log(req);
    console.log('Getting customer info wid ID:', req.params.customer_Id);
    const customer = await customerClass.search4Owner(req.params.customer_Id);
    console.log(customer);
    if (customer.success) {
        res.status(200).json({
            success: customer.success,
            data: customer.data,
            message: customer.message,
            error: customer.error,
            type: customer.type,
            origin: ('getCustomerInfo()-').concat(customer.origin),
            show: customer.show,
        });
    } else {
        res.status(500).json({
            success: false,
            data: customer.data,
            message: customer.message,
            error: customer.error,
            type: customer.type,
            origin: ('getCustomerInfo()-').concat(customer.origin),
            show: customer.show,
        });
    }


}

const deleteCustomer = async (req, res) => {
    console.log('Deleting customer', req.params.customerId);
    const cus2Delete = customerClass.search4Owner(req.params.customerId);
    const response = await cus2Delete;
    console.log("response:", response.data);
    const cus = response.data;
    console.log("Customer to delete: ", cus.toJSON());
    const deleteQuery = await cus.deleteCustomer();
    const customer = deleteQuery.data;
    console.log("delete query", deleteQuery);
    if (deleteQuery.success) {
        seeRoute.sendEvent("admin", {
            success: deleteQuery.success,
            data: deleteQuery.data,
            type: deleteQuery.type,
            origin: 'notification-'.concat(deleteQuery.origin),
            show: deleteQuery.show,
        });
        res.status(200).json({
            success: true,
            data: deleteQuery.data,
            error: null,
            type: deleteQuery.type,
            origin: deleteQuery.origin.concat('-deleteCostumer()'),
            show: true,
        });
    } else {
        res.status(500).json({
            success: false,
            data: deleteQuery.data,
            error: null,
            type: deleteQuery.type,
            origin: deleteQuery.origin.concat('-delete-Costumer()'),
            show: true,
        });
    }

}

const postNewCustomer = async (req, res) => {
    const customerData = req.body;
    const sqlQuery = await sendCostumer2DB(customerData);
    try {
        res.json({
            success: sqlQuery.success,
            data: sqlQuery.data,
            message: sqlQuery.message,
            error: sqlQuery.error,
            type: sqlQuery.type,
            origin: 'receivingData()-'.concat(sqlQuery.origin),
            show: sqlQuery.show,
        });
    } catch (err) {
        res.json({
            success: sqlQuery.success,
            data: sqlQuery.data,
            message: sqlQuery.message,
            error: sqlQuery.error,
            type: sqlQuery.type,
            origin: 'receivingData()-'.concat(sqlQuery.origin),
            show: sqlQuery.show,
        });
    }
}

const testingCustomerViewServer = async(req,res)=>{
    console.log('Testing cx page', req.params);
    res.sendFile(customerViewPage);
}

const testingCustomerEditServer = async(req,res)=>{
    console.log('Testing cx edit page', req.params);
    res.sendFile(customerEditPage);
}


//////////////Cars Routing
const getCarsPage = async (req, res) => {
    console.log('Getting admin page');
    res.sendFile(carPage);

}

const getAddNewCarPage = async (req, res) => {
    console.log('Adding new Car', req._parsedOriginalUrl.pathname);
    res.sendFile(addCarPage);

}

const getCars = async (req, res) => {
    console.log("Hash: ", req.params.hashed_id);
    const lastHashed = req.params.hashed_id;
    const check4Customers = customerClass.getAllCustomers(lastHashed);
    if ((await check4Customers).error === 'uptoDate') {
        res.status(200).json({
            success: false,
            data: (await check4Customers).data,
            error: (await check4Customers).error,
            type: 'notification-get-Customers',
            origin: 'getCustomerList()-'.concat((await check4Customers).origin),
            show: false,
            hash: (await check4Customers).hash,
        });
    } else {
        res.status(200).json({
            success: (await check4Customers).success,
            data: (await check4Customers).data,
            error: (await check4Customers).error,
            type: 'notification-get-Customers',
            origin: 'getCustomerList()-'.concat((await check4Customers).origin),
            show: false,
            hash: (await check4Customers).hash,
        });
    }
}

const getCarInfo = async (req, res) => {
    console.log('Getting customer info wid ID:', req.params.customerId);
    const customer = await customerClass.search4Owner(req.params.customerId);
    if (customer.success) {
        res.status(200).json({
            success: true,
            data: customer.data,
            error: null,
            type: customer.type,
            origin: ('getCustomerInfo()-').concat(customer.origin),
            show: customer.show,
        });
    } else {
        res.status(500).json({
            success: false,
            data: customer.data,
            error: customer.error,
            type: customer.type,
            origin: ('getCustomerInfo()-').concat(customer.origin),
            show: customer.show,
        });
    }


}


//////////////Services Routing
const getServicesPage = async (req, res) => {
    console.log('Getting admin page');
    res.sendFile(servicePage);

}

const getServices = async (req, res) => {
    console.log("Hash: ", req.params.hashed_id);
    const lastHashed = req.params.hashed_id;
    const check4Customers = customerClass.getAllCustomers(lastHashed);
    if ((await check4Customers).error === 'uptoDate') {
        res.status(200).json({
            success: false,
            data: (await check4Customers).data,
            error: (await check4Customers).error,
            type: 'notification-get-Customers',
            origin: 'getCustomerList()-'.concat((await check4Customers).origin),
            show: false,
            hash: (await check4Customers).hash,
        });
    } else {
        res.status(200).json({
            success: (await check4Customers).success,
            data: (await check4Customers).data,
            error: (await check4Customers).error,
            type: 'notification-get-Customers',
            origin: 'getCustomerList()-'.concat((await check4Customers).origin),
            show: false,
            hash: (await check4Customers).hash,
        });
    }
}

const getServiceInfo = async (req, res) => {
    console.log('Getting customer info wid ID:', req.params.customerId);
    const customer = await customerClass.search4Owner(req.params.customerId);
    if (customer.success) {
        res.status(200).json({
            success: true,
            data: customer.data,
            error: null,
            type: customer.type,
            origin: ('getCustomerInfo()-').concat(customer.origin),
            show: customer.show,
        });
    } else {
        res.status(500).json({
            success: false,
            data: customer.data,
            error: customer.error,
            type: customer.type,
            origin: ('getCustomerInfo()-').concat(customer.origin),
            show: customer.show,
        });
    }


}

//////////////Complementary Routing
let clients = [];
const getUpdate = (req, res) => {
    console.log('Updating page admin', req._parsedOriginalUrl.pathname);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    seeRoute.addClient(res, 'admin');
}

const getImage = async (req, res) => {
    // console.log('Getting images', req.body);
    console.log('Getting images', req.params.imgId);
    const img = req.params.imgId;
    // console.log('Getting images', req._parsedOriginalUrl);
    // console.log('Getting images', req._parsedOriginalUrl.query);
    if (img === 'neutral') {
        res.status(200).sendFile(neutralImage);
    }
}

const test = async (req, res) => {
    console.log('Admin page Url:', req.originalUrl);
    res.write('<h1>This is the test for the admin page</h1>')
}
//Exports whatever is above under Express.Router
export default {
    getAdminPage: getAdminPage,

    getCustomerPage: getCustomerPage,
    getAddNewCustomerPage: getAddNewCustomerPage,
    getCustomers: getCustomers,
    getCustomerInfo: getCustomerInfo,
    deleteCustomer: deleteCustomer,
    postNewCustomer: postNewCustomer,
    testingCustomerEdit:testingCustomerEditServer,
    testingCustomerView:testingCustomerViewServer,
    

    getCarsPage: getCarsPage,
    getAddNewCarPage: getAddNewCarPage,
    getCars: getCars,
    getCarInfo: getCarInfo,

    getServicesPage: getServicesPage,
    getServices: getServices,
    getServiceInfo: getServiceInfo,

    getUpdate: getUpdate,
    getImage: getImage,
    test: test,

}


async function sendCostumer2DB(data) {
    const formattedCosId = data.cos_fName.toString().slice(0, 2).concat(data.cos_lName.toString().slice(0, 2).concat(data.cos_Phone.toString().slice(8, 12))),
        formattedCosName = data.cos_fName.toString().concat(" ", data.cos_lName.toString()),
        formattedCosPhone = data.cos_Phone.toString().replaceAll("-", "");
    const formatted = {
        cos_Id: formattedCosId,
        cosName: formattedCosName,
        cosPhone: formattedCosPhone,
        //     otherContacts: null
    }
    const customerFormatted = customerClass.buildObject(formatted);

    const req = await customerClass.sendCustomer2DB(customerFormatted);
    console.log('req',req)
    try {
        seeRoute.sendEvent("admin", {
            success: req.success,
            data: customerFormatted,
            message: req.message,
            error: req.error,
            type: req.type,
            origin: 'sendCustomer2DDB()-'.concat(req.origin),
            show: true,
        });
        return {
            success: req.success,
            data: req.data,
            message: req.message,
            error: req.error,
            type: req.type,
            origin: 'sendCustomer2DDB()-'.concat(req.origin),
            show: true,
        }
    } catch (err) {
        return {
            success: false,
            data: req.data,
            error: req.error,
            type: req.type,
            origin: 'sendCustomer2DDB()'.concat(req.origin),
            show: true,
        }
    }

}
