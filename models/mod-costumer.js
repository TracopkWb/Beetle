//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';

//Initializing Router
const router = express.Router();
router.use(express.json({ limit: "50mb" }));

//Variable Section
const formPage = path.join(rootPath.__rootDir,'views','costumerRegistration.html');

const addCostumer = (req, res) => {
    console.log(req.url);
    res.sendFile(formPage);
}

//Exports whatever is above under Express.Router
export default {
    registration: addCostumer
}