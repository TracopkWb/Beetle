//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
import admin from './rou-Admin.js';
//Variable section
const logInPage = path.join(rootPath.__rootDir, 'views', 'test', 'login.html');


//Initializing Router
const router = express.Router();
router.use(express.json({ limit: "50mb" }));

router.use("/Admin",admin.route);

router.get('/Login', (req, res, next) => {
    console.log(`Rays home: http://tracopk.ddns.net${req._parsedOriginalUrl.pathname}`);
    res.sendFile(logInPage);
});


router.use('/', (req, res, next) => {
    console.log('Path: /');
    res.send(`<h1>Hi Tracopk</h1>`);
});


//Exports whatever is above under Express.Router
export default {
    route: router
}