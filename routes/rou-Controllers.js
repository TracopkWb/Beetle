//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';

//Variable section
const ownerClass = path.join(rootPath.__rootDir,'controllers','classes','owner.js');

//Initializing Router
const router = express.Router();
router.use(express.json({limit:"50mb"}));

router.get('/Classes/Owner',(req,res)=>{
    console.log('Sending Owner class');
    res.sendFile(ownerClass);
});


router.use('/', (req, res, next) => {
    console.log('Path: /');
    res.send(`<h1>Hi Tracopk</h1>`);
});


//Exports whatever is above under Express.Router
export default {
    route : router
}