//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';
const DBFile = path.join(rootPath.__rootDir,'utilities','uti-db.js');

//Initializing Router
const router = express.Router();
router.use(express.json({limit:"50mb"}));

router.get('/DB',(req,res)=>{
    console.log('Sending DB File');
    res.sendFile(DBFile);
});

router.use('/', (req, res, next) => {
    console.log('Path: /');
    res.send(`<h1>Hi Tracopk</h1>`);
});


//Exports whatever is above under Express.Router
export default {
    route : router
}