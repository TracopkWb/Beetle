//Node Dependencies
import express from 'express';
import path from 'path';
import db from '../utilities/uti-db.js'

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
    console.log(req.url);
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
    
    // if (sqlQuery.success) {
    // } else {
    //     console.log(sqlQuery.error);
    // }
}

//Exports whatever is above under Express.Router
export default {
    registration: addCostumer,
    receivingData: gettingData,
}

async function sendCostumer2DB(data) {
    const formattedCosId = data.cos_fName.toString().slice(0, 2).concat(data.cos_lName.toString().slice(0, 2).concat(data.cos_Phone.toString().slice(8,12))),
    formattedCosName = data.cos_fName.toString().concat(" ", data.cos_lName.toString()),
    formattedCosPhone = data.cos_Phone.toString().replaceAll("-","");

    const formatted = {
        id: formattedCosId,
        name: formattedCosName,
        phone: formattedCosPhone,
        otherContacts: null
    }
    const query = 'INSERT INTO costumer (cos_id, cosName, cosPhone,cosOtherContacts) values(?,?,?,?)';
    const result = await db.conn.execute(query, [formatted.id, formatted.name, formatted.phone, formatted.otherContacts]);
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