//Node Dependencies
import express from 'express';
import path from 'path';
import DB from '../utilities/uti-db.js'

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import customerClass from '../controllers/Classes/Customer.js';
import  "../utilities/uti-hash.js";


//Initializing Router
const router = express.Router();
router.use(express.json({ limit: "50mb" }));

//Variable Section
const formPage = path.join(rootPath.__rootDir, 'views', 'costumerRegistration.html');
const costumerAgendaPage = path.join(rootPath.__rootDir, 'views', 'test', 'costumerAgenda.html');
const neutralImage = path.join(rootPath.__rootDir, 'public', 'Img', 'customer.png');
const customerFindPage = path.join(rootPath.__rootDir, 'views', 'test', 'customerFinder.html');

const currDate = new Date();
let clients = [];


const addCostumer = (req, res) => {
    // console.log("url",req.url);
    // console.log("body",req.body);
    res.sendFile(formPage);
}


const gettingData = async (req, res) => {
    const costumerData = req.body;
    try {
        const sqlQuery = await sendCostumer2DB(costumerData);
        res.json({
            success: sqlQuery.success,
            received: sqlQuery.data,
            // data: query.data,
            error: null,
            origin: 'gettingData()',
            show: false,
        });
    } catch (err) {
        res.json({
            success: false,
            received: null,
            error: err.message,
            origin: 'gettingData()',
            type: 'notification-gettingData()',
            show: true,
        });
    }
}

const sendCostumers2WebSite = async (req, res) => {
    // const query = await DB.testConnection();
    const query = await fetchCostumerFromDB();
    console.log(query.data);
    try {
        res.status(200).json({
            success: true,
            data: query.data,
            error: null,
            type: query.type,
            origin: 'sendList-sendCostumer2Website()',
            show: false,
        });
    } catch (err) {
        res.status(204).json({
            success: false,
            data: null,
            error: err.message,
            type: query.type,
            origin: 'sendList-sendCostumer2Website()',
            show: true,
        });
    }
}

const getAgendaPage = async (req, res) => {
    console.log('Getting the agenda Page', req.url);
    res.sendFile(costumerAgendaPage);
}

const getAgenda = async (req, res) => {
    console.log('Getting the agenda', req.url);
    const checkDB = await fetchCostumerFromDB();
    // console.log(checkDB);
    if (!checkDB.success) {
        res.status(500).json({
            success: false,
            data: checkDB.data,
            type: checkDB.type,
            origin: 'getAgenda()-'.concat(checkDB.origin),
            show: true,
        });
    } else {
        res.status(200).json({
            success: true,
            data: checkDB.data,
            type: checkDB.type,
            origin: 'getAgenda()-'.concat(checkDB.origin),
            show: true
        })
    }
}

const getUpdate = (req, res) => {
    console.log('Updating page');
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    clients.push(res);

    req.on("close", () => {
        clients = clients.filter(c => c !== res);
    });
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

const deleteCustomer = async (req, res) => {
    console.log('Deleting customer',req.params.customerId);
    const cus2Delete = customerClass.search4Owner(req.params.customerId);
    const response = await cus2Delete;
    console.log("response:", response.data);
    const cus = response.data;
    console.log("Customer to delete: ", cus.toJSON());
    const deleteQuery = await cus.deleteCustomer();
    const customer = deleteQuery.data;
    console.log("delete query", deleteQuery);
    if (deleteQuery.success) {
        notifyUpdate({
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

const test = async (req, res) => {
    console.log('Testing Customer finder page', req.url);
    res.sendFile(customerFindPage);
}

const getCustomerList = async (req, res) => {
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

//Exports whatever is above under Express.Router
export default {
    registration: addCostumer,
    receivingData: gettingData,
    fetchList: sendCostumers2WebSite,
    getAgendaPage: getAgendaPage,
    getAgenda: getAgenda,
    getImage: getImage,
    getUpdate: getUpdate,
    deleteCustomer: deleteCustomer,
    getCustomerList: getCustomerList,
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
    // console.log("Customer sent 2 DB: ", customerFormatted.toJSON());
    const query = 'INSERT INTO costumer (cos_id, cosName, cosPhone) values(?,?,?)';
    try {
        const result = await DB.conn.execute(query, [customerFormatted.getOwnerId, customerFormatted.getOwnerName, customerFormatted.getOwnerPhoneNumber]);
        // console.log(result);
        notifyUpdate({
            success: true,
            data: customerFormatted.toJSON(),
            type: 'notification-add-Costumer',
            origin: 'sendCustomer2DDB()',
            show: true,
        });
        return {
            success: true,
            error: null,
            data: formatted,
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            error: err.message,
            data: null,
        }
    }

}

async function fetchCostumerFromDB() {
    const checkDB = await DB.testConnection();
    if (!checkDB.success) {
        return {
            success: false,
            data: checkDB.data,
            type: checkDB.type,
            origin: 'fetchCostumerFromDB()-'.concat(checkDB.origin),
            show: true
        }
    }
    const [costumerListRaw] = await DB.conn.execute('SELECT * FROM costumer');
    try {
        return {
            success: true,
            data: costumerListRaw,
            error: null,
        }
    } catch (err) {
        // console.log(err);
        return {
            success: false,
            data: null,
            error: err,
        }
    }

}

function notifyUpdate(newCustomer) {
    console.log(newCustomer);
    clients.forEach(res => {
        res.write(`data: ${JSON.stringify(newCustomer)}\n\n`);
    });
}