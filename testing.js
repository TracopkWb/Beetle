import carClass from './controllers/Classes/Car.js';
import ownerClass from './controllers/Classes/Owner.js';
import mechanicClass from './controllers/Classes/Mechanic.js';
import MaterialClass from './controllers/Classes/MaterialUsed.js';
import serviceClass from './controllers/Classes/ServiceRecord.js';
import Ticket from './controllers/Classes/Ticket.js';
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
    prevServiceInfo: [],
    photo: 'NE',
    entranceDate: formattedDate,
    exitDate: null,
    status: 'in Progress',
    billingInfo: [],
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

// const billing = [
//     {
//         name: '1',
//         serviceCost: 0,
//         cost: 0,
//         laborCost: 0,
//         comment: 'none',
//         date: '8/2/2025'
//     }
// ];

const labor1 = {
    amount: 0,
    materialUsed: null,
    description: 'Labor 1',
}
const serviceData = {
    id: 1,
    car: c1,
    name: 'Ser 1',
    date: formattedDate,
    description: 'Description 1',
    comment: 'Comment 1 ',
    warranty: 6,
    statusWarranty: true,
    downPayment: 0,
    status: 'in progress',
    initialTotal: 0,
    total: 0,
    statementStatus: 'pending',
    statementInfo: [],
    _Approved_By: 'none',
    _Responsable_Mechanic: [], //Object:
    _milage_at_Service: 67918,
    _Finished_Date: null,
    _Labor_Info: [],
    _Material_List: [], //ArrayList [Object (material price): ,
    _Other_List: [],
    _Billing_History: []
    // _Billing_history: [1],
}

const serviceData2 = {
    id: 2,
    car: c1,
    name: 'Ser 12',
    date: formattedDate,
    description: 'Description 1',
    comment: 'Comment 1 ',
    warranty: 6,
    statusWarranty: true,
    downPayment: 0,
    status: 'in progress',
    initialTotal: 0,
    total: 0,
    statementStatus: 'pending',
    statementInfo: [],
    _Approved_By: 'none',
    _Responsable_Mechanic: [], //Object:
    _milage_at_Service: 67918,
    _Finished_Date: null,
    _Labor_Info: [],
    _Material_List: [], //ArrayList [Object (material price): ,
    _Other_List: [],
    _Billing_History: []
    // _Billing_history: [1],
}

const s1 = serviceClass.buildObject(serviceData);
const s2 = serviceClass.buildObject(serviceData2);



const m1 = mechanicClass.buildObject(mechanicData);


const materialData = {
    id: 'SKU-702819',
    ser: c1,
    name: 'Break Pads',
    quantity: 4,
    // quantity: 1,
    cost: 359, //1436
    // cost: 1, //1436
    laborCost: 150,
    purchaseDate: formattedDate,
    supplier: 'AutoZone',
    receipt: null,
    comment: 'none',
}

const matD2 = {
    id: 'SKU-1072086',
    ser: s1,
    name: 'Filtro de Aceite STP SL3506',
    quantity: 3,
    // quantity: 1,
    cost: 89, //267
    // cost: 1, //267
    laborCost: 0,
    purchaseDate: formattedDate,
    supplier: 'AutoZone',
    receipt: null,
    comment: 'none',
}

const matD3 = {
    id: 'SKU-764464',
    car: s1,
    name: 'Interruptor de Solenoide Dura last SS317',
    quantity: 1,
    cost: 10,
    laborCost: 0,
    purchaseDate: formattedDate,
    supplier: 'AutoZone',
    receipt: null,
    comment: 'none',
}

const extMatD1 = {
    id: 'extMat-2',
    ser: s1,
    name: 'Free-on refilled',
    quantity: 1,
    cost: 15,
    laborCost: 10,
    purchaseDate: formattedDate,
    supplier: null,
    receipt: null,
    comment: 'BBBB',
}

const extMatD2 = {
    id: 'extMat-1',
    ser: s1,
    name: 'Headlights installation',
    quantity: 1,
    cost: 100,
    laborCost: 20,
    purchaseDate: formattedDate,
    supplier: null,
    receipt: null,
    comment: 'aaaaa',
}

const downP1 = {
    date: formattedDate,
    amount: 2033,
}

const downP2 = {
    date: formattedDate,
    amount: 10,
}



const mat1 = MaterialClass.buildObject(materialData);
const mat2 = MaterialClass.buildObject(matD2);
const mat3 = MaterialClass.buildObject(matD3);
const extMat1 = MaterialClass.buildObject(extMatD1);
const extMat2 = MaterialClass.buildObject(extMatD2);
// console.log(s1.toJSON());

////Mechanics
s1.updateMechanic(m1, 1); //1 is for adding, -1 is for removing
s1.updateMechanic(m1, 1);
s1.updateMechanic(m1, -1);

s2.updateMechanic(m1, 1);

// s1.updateMechanic(m1, -1);

////New Material
s1.updateMaterial(mat1, 1);//LaborCost: 0
s1.updateMaterial(mat2, 1);//LaborCost: 0
s1.updateMaterial(mat3, 1);//LaborCost: 0

s2.updateMaterial(mat3, 1);//LaborCost: 0


////Extras
s1.updateOtherCost(extMat1, 1);//LaborCost: 10
s1.updateOtherCost(extMat2, 1);//LaborCost: 20
s1.updateOtherCost(extMat1, 1);//LaborCost: 10

// console.log("Labor Total", s1.getLaborTotal());

////DownPayment testing
s1.updateDownPayment(downP1, 1); //(amount, flag) => flag = 1 (add), flag = 0 (remove) 
s2.updateDownPayment(downP2, 1); //(amount, flag) => flag = 1 (add), flag = 0 (remove) 
// s1.updateDownPayment(downP2, 1); //(amount, flag) => flag = 1 (add), flag = 0 (remove) 
// s1.updateDownPayment(downP2, 1); //(amount, flag) => flag = 1 (add), flag = 0 (remove) 
// s1.updateDownPayment(downP2, 1); //(amount, flag) => flag = 1 (add), flag = 0 (remove) 

// s1.updateMaterial(mat3, -1);
// console.log(s1.getSerReBillingHistory.length);
// console.log('Responsable Mechanics: '+s1.showMechanicList());
// console.log('List of Materials: '+s1.showMaterialList());
// console.log('Total Material: ' + s1.getSerReTotal);

// console.log('Cost History:');
// console.log(s1.getSerReBillingHistory);
// console.log('Labor History :');
// console.log(s1.getSerReLaborInfo);

// console.log(s1.getLaborTotal);
// console.log("Material info");
// console.log(s1.getMaterialTotal());
// console.log("Other Cost info");
// console.log(s1.getOtherCostTotal());
// console.log(s1.getOtherCostTotal());
// console.log("Labor Cost info");
// console.log(s1.getLaborTotal());
// console.log("Payment info");
// console.log("Total:");
// console.log(s1.getFinalTotal());
// console.log(s1.getSerReBillingHistory);
// console.log(s1.getSerReStatementInfo);
// console.log(s1.getSerReTotal);
// console.log(s1.getSerReTotalLeft);
// console.log(s1.getPaymentTotal());

// console.log(s1.toJSON());
// console.log(s2.toJSON());
// console.log(s1.generateTicket(s1).toJSON());


///////Ticket Testing
const ticData = {
    id: 1,
    ser: s1,
    date: today.toLocaleDateString(),
    amount: s1.getSerReTotal,
}

const t1 = Ticket.buildObject(ticData);
console.log(t1.toJSON());


////////////Car methods Testing

// c1.updateService(s1,1); //Flag = 1 => Adding service, Flag = -1 => Removing a service
// c1.updateService(s2,1); //Flag = 1 => Adding service, Flag = -1 => Removing a service
// c1.updateService(s1,-1); //Flag = 1 => Adding service, Flag = -1 => Removing a service

// console.log(c1.getCarBillingInfo);

