//Node Dependencies
import express from 'express';
import path from 'path';
import cors from "cors";

//Utilities dependencies
import rootDir from './utilities/uti-path.js';
//Routes
import rays from './routes/rou-Rays.js';
import forms from "./routes/rou-Forms.js";
import costumer from './routes/rou-Costumers.js';

//
// import controller from './routes/rou-Controllers.js';
// import utilities from './routes/rou-Utilities.js';

//Modules

//Initializing Server
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json()); //{limit:"#mb"}
//Static files as CSS and images
app.use(express.static(path.join(rootDir.__rootDir, 'public')));//_dirname it is used from the current directory
//rootDir: is used from the root directory,  this line has to be added const rootDir = require('../utilities/uti-path');


//Request
app.get("/",(req,res,next)=>{
    console.log("Welcome back Tracopk! This is the Beetle Project!");
    // console.log(req.rawHeaders);
});

//ALWAYS USE app.use to reroute!!!!
app.use("/Rays",rays.route);
app.use("/Forms",forms.route);
app.use("/Customers",costumer.route);

// app.get("/CostumerForm",beetle.route);


//Listening to PORT
app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Hi Tracopk, you are on http:localhost/${PORT}`);
});

