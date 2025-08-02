import carClass from './controllers/Car.js';
import ownerClass from './controllers/Owner.js';
import mechanicClass from './controllers/Mechanic.js';
import MaterialClass from './controllers/MaterialUsed.js';
import serviceClass from './controllers/ServiceRecord.js';
console.log("Hi Tracopk!");
let today = new Date();
let formattedDate = today.toLocaleDateString();
// console.log(formattedDate);

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

const o1 = ownerClass.buildObject(dataOwner);
const c1 = carClass.buildObject(carData);
const m1 = mechanicClass.buildObject(mechanicData);

const serviceData = {
    id: 1,
    car: c1,
    name: 'Ser 1',
    date: formattedDate,
    description: 'Description 1',
    comment: 'Comment 1 ',
    warranty: 6,
    statusWarranty: true,
    downPayment: 10,
    status: 'in progress',
    initialTotal: 100,
    total: 100,
    _Approved_By: 'none',
    _Responsable_Mechanic: [], //Object:
    _milage_at_Service: 67918,
    _Finished_Date: null,
    _Labor_Cost: 50,
    _Material_List: [], //ArrayList [Object (material price): ,
    _Other_List: [] ,
}

const s1 = serviceClass.buildObject(serviceData);

const materialData = {
    id: 'SKU-702819',
    car: c1,
    name: 'Break Pads',
    quantity: 4,
    cost: 359, //1436
    purchaseDate: formattedDate,
    supplier: 'AutoZone',
    receipt: null
}

const matD2 = {
    id: 'SKU-1072086',
    car: c1,
    name: 'Filtro de Aceite STP SL3506',
    quantity: 3,
    cost: 89, //267
    purchaseDate: formattedDate,
    supplier: 'AutoZone',
    receipt: null
}

const matD3 = {
    id: 'SKU-764464',
    car: c1,
    name: 'Interruptor de Solenoide Dura last SS317',
    quantity: 1,
    cost: 1259,
    purchaseDate: formattedDate,
    supplier: 'AutoZone',
    receipt: null
}
const mat1 = MaterialClass.buildObject(materialData);
const mat2 = MaterialClass.buildObject(matD2);
const mat3 = MaterialClass.buildObject(matD3);
// console.log(o1.toJSON());
// console.log(c1.toJSON());
// console.log(m1.toJSON());
// console.log(mat2.toJSON());
// console.log(s1.toJSON());
s1.addMechanic(m1);
s1.addMechanic(m1);
// s1.removeMechanic(m1);
s1.removeMechanic(m1);
s1.addNewMaterial(mat1);
s1.addNewMaterial(mat2);
s1.addNewMaterial(mat3);

s1.removeMaterial(mat3);
// console.log(s1.toJSON());
// console.log('Responsable Mechanics: '+s1.showMechanicList());
// console.log('List of Materials: '+s1.showMaterialList());
console.log('Total Material: ' + s1.getMaterialTotal());

