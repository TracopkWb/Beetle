//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import adminFile from "../models/mod-Admin.js";

//Variable section 


//Initializing Router
const router = express.Router();
router.use(express.json({limit:"50mb"}));

//URL-> /Admin/Home
router.get('/Home',adminFile.getAdminPage);



////////CAR ROUTING

//URL-> /Admin/Cars
router.get('/Cars/',adminFile.getCarsPage);
router.get('/Cars/:car_Id',adminFile.getCarInfo);
router.get('/CarList/:hashed_id',adminFile.getCars);

///////CUSTOMERS ROUTING

//URL-> /Admin/Customers
router.get('/Customers/',adminFile.getCustomerPage);
router.get('/Customers/:customer_Id',adminFile.getCustomerInfo);
router.get('/CustomersList/:hashed_id',adminFile.getCustomers);

///////SERVICES ROUTING

//URL-> /Admin/Services
router.get('/Services/',adminFile.getServicesPage);
router.get('/Services/:service_Id',adminFile.getServiceInfo);
router.get('/ServicesList/:hashed_id',adminFile.getServices);




//URL-> /Admin/events
router.get('/events',adminFile.getUpdate);

router.use('/', (req, res, next) => {
    console.log('Path:' , req._parsedOriginalUrl.pathname);
    res.send(`<h1>Hi Tracopk welcome to Rays/Admin/</h1>`);
});

//Exports whatever is above under Express.Router
export default {
    route : router
}