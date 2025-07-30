import carClass from './controllers/Car.js';
import ownerClass from './controllers/Owner.js';
import mechanicClass from './controllers/Mechanic.js';
import MaterialClass from './controllers/MaterialUsed.js';
// import serviceClass from './controllers/ServiceRecord.js';
console.log("Hi Tracopk!");
let today = new Date();
let formattedDate = today.toLocaleDateString();
console.log(formattedDate);

const dataOwner = {
    name: "Tracopk",
    phone: "8327085695",
    email: null
}

const carData = {
    id: 'VW-Virtus-2019-8695',
    manufacturer: 'Volkswagen',
    model: 'Virtus',
    year: 2019,
    version: 'NE',
    licensePlate: 'PDV8695',
    vin: 'NE',
    milage: 70000,
    owner: dataOwner,
    registrationDate: formattedDate,
    lastService: null,
    lastServiceDate: null,
    photo: 'NE',
    entranceDate: formattedDate,
    exitDate: null,
    status: 'in Progress',
    billing: 0
}

const mechanicData = {
    id: 'TraTel-07-25',
    name: 'Tracopk Tellez',
    phone: '5517988530',
    photo: null,
    biometrics: null
}

const materialData = {
    id: 'SKU-702819',
    name: 'Break Pads',
    quantity: 1,
    cost: 359,
    purchaseDate: formattedDate,
    supplier: 'AutoZone',
    receipt: null
}


const o1 = ownerClass.buildObject(dataOwner);
const c1 = carClass.buildObject(carData);
const m1 = mechanicClass.buildObject(mechanicData);
const mat1 = MaterialClass.buildObject(materialData);
console.log(o1.getOwnerName);
console.log(c1.getCarId);
console.log(m1.getMecId);
console.log(mat1.getMatId);

