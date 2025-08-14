//Node Dependencies
import express from 'express';
import path from 'path';
import DB from '../utilities/uti-db.js'

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import { error } from 'console';

//Initializing Router
const router = express.Router();
router.use(express.json({ limit: "50mb" }));

//Variable Section
const formPage = path.join(rootPath.__rootDir, 'views', 'costumerRegistration.html');
const currDate = new Date();

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
            error: null,
        });
    } catch (err) {
        res.json({
            success: false,
            received: null,
            error: err.message,
        });
    }
}

const sendCostumers2WebSite = async (req, res) => {
    // const query = await DB.testConnection();
    const query = await fetchCostumerFromDB();
    console.log(query.data[0]);
    try {
        res.status(200).json({
            success: true,
            data: query.data[0],
            error: null,
        });
    } catch (err) {
        res.status(204).json({
            success: false,
            data: null,
            error: err,
        });
    }
}

//Exports whatever is above under Express.Router
export default {
    registration: addCostumer,
    receivingData: gettingData,
    fetchList: sendCostumers2WebSite,
}

async function sendCostumer2DB(data) {
    const formattedCosId = data.cos_fName.toString().slice(0, 2).concat(data.cos_lName.toString().slice(0, 2).concat(data.cos_Phone.toString().slice(8, 12))),
        formattedCosName = data.cos_fName.toString().concat(" ", data.cos_lName.toString()),
        formattedCosPhone = data.cos_Phone.toString().replaceAll("-", "");

    const formatted = {
        id: formattedCosId,
        name: formattedCosName,
        phone: formattedCosPhone,
        otherContacts: null
    }
    const query = 'INSERT INTO costumer (cos_id, cosName, cosPhone,cosOtherContacts) values(?,?,?,?)';
    const result = await DB.conn.execute(query, [formatted.id, formatted.name, formatted.phone, formatted.otherContacts]);
    try {
        return {
            success: true,
            error: null,
            data: formatted,
        }
    } catch (err) {
        return {
            success: false,
            error: err.message,
            data: null,
        }
    }

}

async function fetchCostumerFromDB() {
    const costumerListRaw = await DB.conn.execute('SELECT * FROM costumer');
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