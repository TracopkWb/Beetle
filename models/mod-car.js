//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';

//Initializing Router
const router = express.Router();
router.use(express.json({ limit: "50mb" }));

//Variable Section
const carForm = path.join(rootPath.__rootDir,'views','carRegistration.html');

const addCar = (req, res) => {
    console.log(req.url);
    res.sendFile(carForm);
}

//Exports whatever is above under Express.Router
export default {
    registration: addCar
}