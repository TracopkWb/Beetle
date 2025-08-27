//Node Dependencies
import express from 'express';
import path from 'path';

//Initializing Dependencies
import rootPath from '../utilities/uti-path.js';

//Variable section 
const adminPage = path.join(rootPath.__rootDir,'views','test','admin.html');
//Initializing Router
const router = express.Router();
router.use(express.json({limit:"50mb"}));

router.get('/',(req,res)=>{
    console.log('Admin page -> Url /Admin',);
    res.sendFile(adminPage);
})
router.use('/', (req, res, next) => {
    console.log('Path: /');
    res.send(`<h1>Hi Tracopk welcome</h1>`);
});


//Exports whatever is above under Express.Router
export default {
    route : router
}