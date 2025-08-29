//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import customerFile from '../models/mod-costumer.js';

//Initializing Router
const router = express.Router();
router.use(express.json({ limit: "50mb" }));

//Variables Section

//URL-> http://tracopk.ddns.net/Costumers/
router.get('/Agenda', customerFile.getAgendaPage);
//URL-> Customers/getCostumers
router.get('/getCustomers', customerFile.getAgenda);
//URL-> Customers/Delete/:id
router.delete('/Delete/:customerId', customerFile.deleteCustomer);

//URL-> Customers/search
router.get('/Search',customerFile.test);

//URL-> Customers/getCustomersList/:query
router.get('/getCustomersList/:hashed_id', customerFile.getCustomerList);


//URL-> /Customers/updateCustomers
router.get('/events',customerFile.getUpdate);


router.get('/getImage/:imgId', customerFile.getImage);
// router.get('/getImage:imgId',costumerFile.getImage);

router.use('/', (req, res, next) => {
    console.log('Path: /');
    res.send(`<h1>Hi Tracopk path : /</h1>`);
});
//Exports whatever is above under Express.Router
export default {
    route: router
}