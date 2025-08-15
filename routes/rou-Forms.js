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


//Url = http://localhost:3000/Forms/Costumer/Registration
router.get("/Costumer/Registration",costumerFile.registration);
router.get("/Costumer/SendList",costumerFile.fetchList);

// router.get("/Costumer/Registration",costumerFile.registration);
router.post("/Costumer/Data",costumerFile.receivingData);
router.post("/Costumer/Registration",(req,res)=>{

});

router.get("/Car/Registration",carFile.registration);
// router.post("/Car/Registration",carFile.test);
router.get("/Car/sendData",carFile.sendData);
router.post("/Car/saveData",carFile.postData);
router.post('/Car/newAddition/newCar', carFile.addNewCarData);

//Testing new pages
router.get('/Car/newAddition', carFile.test)

router.get('/', (req, res, next) => {
    console.log(req.url);
    res.send(`<h1>Hi Tracopk</h1>`);
});




//Exports whatever is above under Express.Router
export default {
    route : router
}