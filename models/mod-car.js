//Node Dependencies
import express from 'express';
import path from 'path';
import DB from "../utilities/uti-db.js";

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';

//Initializing Router
const router = express.Router();

router.use(express.json({ limit: "50mb" }));

//Variable Section
const carForm = path.join(rootPath.__rootDir, 'views', 'carRegistration.html');
// const carModels = path.join(rootPath.__rootDir, 'controllers', 'Json', 'Cars', 'model.json');
const carAdditionPage = path.join(rootPath.__rootDir, 'views', 'test', 'carAddition.html');
const currDate = new Date();



const addCar = (req, res) => {
    console.log(req.url);
    // console.log(req);
    // console.log(req.params);
    res.sendFile(carForm);
}

const sendCarModel = async (req, res) => {

    const fetchCarJson = `SELECT CONCAT('{"manufacturer":"', man.manName,'","models":[', GROUP_CONCAT('"', mods.modName, '"'), ']}') AS result FROM manufacturers AS man JOIN models AS mods ON man.man_Id = mods.man_Id GROUP BY man.manName ASC`;

    ////CHECK THE CONNECTION TO THE DB BEFORE ANYTHING ELSE
    const checkingDB = await DB.testConnection();
    if (!checkingDB.success) {
        res.status(500).json({
            success: false,
            data: checkingDB.data,
            type: 'error',
            origin: 'sendCarModel()-testConnection()',
            show: true
        });
    } else {
        console.log('Status:', checkingDB);
    }

    try {
        const carData = await DB.conn.execute(fetchCarJson);
        res.status(200).json({
            success: true,
            data: carData[0],
            type: 'notification',
            show: false,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            type: 'error',
            show: true,
        });
    }
}

const saveData = async (req, res) => {
    // console.log(req.body);
    const car = { ...req.body };
    // console.log(car);
    // console.log(car.car_Id,car.carModel,car.carYear,car.carManufacturer,car.carLicensePlate,car.carVin,car.carCurrMilage,car.cos_Id,car.car_Registration_Date);
    const query2Car = 'INSERT INTO car (car_id,carModel,carYear,carManufacturer,carLicensePlate,carVin,carCurrMilage,cos_Id,car_Registration_Date) VALUES(?,?,?,?,?,?,?,?,?)'
    try {
        await DB.conn.execute(query2Car, [car.car_Id, car.carModel, car.carYear, car.carManufacturer, car.carLicensePlate, car.carVin, car.carCurrMilage, car.cos_Id, car.car_Registration_Date]);
        res.status(200).json({
            success: true,
            data: req.body,
            type: 'notification',
            show: true,
            origin: 'saveData()',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            type: 'error',
            show: true,
            origin: 'saveData()',
        });
    }

}

const addCarData = async (req, res) => {
    console.log("New car's Manufacturer sent from website: ", req.body);
    // console.log(currDate);
    ////CHECK THE CONNECTION TO THE DB BEFORE ANYTHING ELSE
    const checkingDB = await DB.testConnection();
    if (!checkingDB.success) {
        res.status(500).json({
            success: false,
            data: checkingDB.data,
            type: 'error',
            origin: 'sendCarModel()-testConnection()',
            show: true,
        });
    } else {
        console.log('Status:', checkingDB);
    }
    ////Checking for duplicity
    const checkData = await checkDuplicity(req.body, req.body.flag);
    if (!checkData.success) {
        res.status(500).json({
            success: false,
            data: checkData.data,
            type: 'error',
            origin: `addCarData-`.concat(checkData.origin),
            show: true,
        });
    } else {
        res.status(200).json({
            success: true,
            data: checkData.data,
            type: 'notification-newCar',
            origin: `addCarData-`.concat(checkData.origin),
            show: false,
        });
    }


    try {
        if (req.body.flag == 0) {
            const queryMan = `INSERT INTO manufacturers (manName,man_register_data) VALUES (?,?)`;
            const exMan = await DB.conn.execute(queryMan, [req.body.newCarMan, currDate]);
            console.log("Consult:  ", exMan);
        }
        const queryModel = `INSERT INTO models (modName, man_Id,mod_register_data) VALUES (?, (SELECT man_Id FROM manufacturers WHERE manName = ?),?)`;
        const exModel = await DB.conn.execute(queryModel, [req.body.newCarModel, req.body.newCarMan, currDate]);
        res.status(200).json({
            success: true,
            data: req.body,
            type: 'notification-newCar',
            origin: `addCarData-sqlQuery`,
            show: false,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            type: 'error',
        })
    }
}

const test = async (req, res) => {
    console.log('Testing the car Addition page');
    res.status(200);
    res.sendFile(carAdditionPage);
}


//Exports whatever is above under Express.Router
export default {
    registration: addCar,
    sendData: sendCarModel,
    postData: saveData,
    addNewCarData: addCarData,
    test: test,
}


async function checkDuplicity(carData, flag) {
    try {
        console.log(carData, flag);

        let query, value;

        if (flag === 0) {
            //Adding the Manufacturer
            query = `SELECT * FROM manufacturers WHERE manName = ?`;
            value = carData.newCarMan;
        } else if (flag === 1) {
            // Adding the Model
            query = `SELECT * FROM models WHERE modName = ?`;
            value = carData.newCarModel;
        } else {
            throw new Error(`Invalid flag: ${flag}`);
        }

        const [rows] = await DB.conn.execute(query, [value]);

        if (rows.length > 0) {
            return {
                success: false,
                data: `${value} has already been added!`,
                type: "error",
                origin: "checkDuplicity()",
                show: true,
            };
        } else {
            return {
                success: true,
                data: `${value} is available`,
                type: "notification",
                origin: "checkDuplicity()",
                show: false,
            };
        }

    } catch (err) {
        console.error("checkDuplicity error:", err.message);
        return {
            success: false,
            data: "Database error occurred",
            type: "error",
            origin: "checkDuplicity()",
            show: true,
        };
    }
}