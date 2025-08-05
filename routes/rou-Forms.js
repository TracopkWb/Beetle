//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import carFile from '../models/mod-car.js';
import costumerFile from '../models/mod-costumer.js';

//Initializing Router
const router = express.Router();
router.use(express.json({limit:"50mb"}));

//Variables Section


//Url = localhost:3000/Form/Costumer/registration
router.get("/Costumer/Registration",costumerFile.registration);
router.get("/Car/Registration",carFile.registration);

router.get('/', (req, res, next) => {
    console.log(req.url);
    res.send(`<h1>Hi Tracopk</h1>`);
});




//Exports whatever is above under Express.Router
export default {
    route : router
}