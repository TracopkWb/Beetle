//Node Dependencies
import express from 'express';
import path from 'path';
import fs from 'fs/promises';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';

//Initializing Router
const router = express.Router();

router.use(express.json({ limit: "50mb" }));

//Variable Section
const carForm = path.join(rootPath.__rootDir, 'views', 'carRegistration.html');
const carModels = path.join(rootPath.__rootDir, 'controllers', 'Json', 'Cars', 'model.json');

const addCar = (req, res) => {
    console.log(req.url);
    res.sendFile(carForm);
}

const sendCarModel = async (req, res) => {
    const carData = await readCarFile(carModels);
    try {
        res.status(200).json({
            success: true,
            error: null,
            data: carData.data
        });
    } catch (error) {
        //status 204 Server successfully processes the request but has no content to return in the response body.
        res.status(204).json({
            success: false,
            error: null,
            data: carData.data
        })
    }
}


async function readCarFile(file) {
    console.log("Reading File", file);
    try {
        const dataRaw = await fs.readFile(file, 'utf8');
        // console.log('File content:', JSON.parse(dataRaw));
        const dataJson = JSON.parse(dataRaw);
        return {
            success: true,
            error: null,
            data: dataJson
        }
    } catch (err) {
        return {
            success: false,
            error: err,
            data: null
        }
    }
}

//Exports whatever is above under Express.Router
export default {
    registration: addCar,
    sendData: sendCarModel,
}