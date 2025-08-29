//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import customerClass from "../controllers/Classes/Customer.js";
import carClass from "../controllers/Classes/Car.js";


//variable section
const customerPage = path.join(rootPath.__rootDir, 'views','test' ,'costumerAgenda.html');
const adminPage = path.join(rootPath.__rootDir, 'views','test' ,'admin.html');
const carPage = path.join(rootPath.__rootDir, 'views','test' ,'cars.html');
const servicePage = path.join(rootPath.__rootDir, 'views','test' ,'services.html');

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

const getCustomers = async (req, res) => {
    console.log("Hash: ",req.params.hashed_id);
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

//////////////Cars Routing
const getCarsPage = async (req, res) => {
    console.log('Getting admin page');
    res.sendFile(carPage);

}

const getCars = async (req, res) => {
    console.log("Hash: ",req.params.hashed_id);
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
    console.log("Hash: ",req.params.hashed_id);
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
let clients =[];
const getUpdate = (req, res) => {
    console.log('Updating page admin', req._parsedOriginalUrl.pathname);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    clients.push(res);

    req.on("close", () => {
        clients = clients.filter(c => c !== res);
    });
}

const test = async (req, res) => {
    console.log('Admin page Url:', req.originalUrl);
    res.write('<h1>This is the test for the admin page</h1>')
}
//Exports whatever is above under Express.Router
export default {
    getAdminPage:getAdminPage,

    getCustomerPage: getCustomerPage,
    getCustomers: getCustomers,
    getCustomerInfo: getCustomerInfo,

    getCarsPage: getCarsPage,
    getCars: getCars,
    getCarInfo: getCarInfo,

    getServicesPage: getServicesPage,
    getServices: getServices,
    getServiceInfo: getServiceInfo,

    getUpdate: getUpdate,
    test: test,

}