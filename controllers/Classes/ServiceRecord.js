import Ticket from './Ticket.js';

export default class ServiceRecord {
    //Attributes

    #serReId;
    #serReCar; //Foreign Key from carId
    #serReName;
    #serReDate;
    #serReDescription;
    #serReComments
    #serReWarranty;
    #serReStatusWarranty;
    #serReDownPayment;
    #serReStatus; //Service status => pending, onprogress, finished, other
    #serReInitialTotal;
    #serReTotal;
    #serReTotalLeft;
    #serReStatementStatus //Paid, pending
    
    #serRe_Approved_By;
    #serRe_Responsable_Mechanic = []; //Array list [Object (mechanic)]  ServiceMechanics (many-to-many relationship)
    #serRe_milage_at_Service;
    #serRe_Finished_Date;

    ///ServiceMaterial (many-to-many)
    #serRe_Labor_Info = [];
    #serRe_Material_List = []; //ArrayList [Object (material price)]
    #serRe_Other_List = []; //ArrayList [Object (material price)]
    #serRe_Billing_History = []; //ArrayList [Object (Price, date, comments)]
    
    ////Ticket Table
    #serReStatementInfo = []; // tic_Id
    #ticket;

    constructor(serReId, serReCar, serReName, serReDate, serReDescription, serReComments, serReWarranty, serReStatusWarranty, serReDownPayment, serReStatus, serReInitialTotal, serReTotal, serReStatementStatus, serReStatementInfo = [], serRe_Approved_By, serRe_Responsable_Mechanic, serRe_milage_at_Service, serRe_Finished_Date, serRe_Labor_info = [], serRe_Material_List = [], serRe_Other_List = [], serRe_Billing_History = [],ticket = '') {
        this.#serReId = serReId;
        this.#serReCar = serReCar;
        this.#serReName = serReName;
        this.#serReDate = serReDate;
        this.#serReDescription = serReDescription;
        this.#serReComments = serReComments
        this.#serReWarranty = serReWarranty;
        this.#serReStatusWarranty = serReStatusWarranty;
        this.#serReDownPayment = serReDownPayment;
        this.#serReStatus = serReStatus;
        this.#serReInitialTotal = serReInitialTotal;
        this.#serReTotal = serReTotal;
        // this.#serReTotalLeft = serReTotalLeft;
        this.#serReStatementStatus = serReStatementStatus;
        this.#serReStatementInfo = serReStatementInfo;

        this.#serRe_Approved_By = serRe_Approved_By;
        this.#serRe_Responsable_Mechanic = serRe_Responsable_Mechanic; //Object
        this.#serRe_milage_at_Service = serRe_milage_at_Service;
        this.#serRe_Finished_Date = serRe_Finished_Date;
        this.#serRe_Labor_Info = serRe_Labor_info;
        this.#serRe_Material_List = serRe_Material_List; //Object
        this.#serRe_Other_List = serRe_Other_List; //Object
        this.#serRe_Billing_History = serRe_Billing_History; //Object
        this.#ticket = ticket;
    }

    //Setters
    set setSerReId(serReId) {
        this.#serReId = serReId;
    }

    set setSerReCar(serReCar) {
        this.#serReCar = serReCar;
    }

    set setSerReName(serReName) {
        this.#serReName = serReName;
    }

    set setSerReDate(serReDate) {
        this.#serReDate = serReDate;
    }

    set setSerReDescription(serReDescription) {
        this.#serReDescription = serReDescription;
    }

    set setSerReComments(serReComments) {
        this.#serReComments = serReComments;
    }

    set setSerReWarranty(serReWarranty) {
        this.#serReWarranty = serReWarranty;
    }

    set setSerReStatusWarranty(serReStatusWarranty) {
        this.#serReStatusWarranty = serReStatusWarranty;
    }

    set setSerReDownPayment(serReDownPayment) {
        this.#serReDownPayment = serReDownPayment;
    }

    set setSerReStatus(serReStatus) {
        this.#serReStatus = serReStatus;
    }

    set setSerReInitialTotal(serReInitialTotal) {
        this.#serReInitialTotal = serReInitialTotal;
    }

    set setSerReTotal(serReTotal) {
        this.#serReTotal = serReTotal;
    }

    set setSerReStatementStatus(serReStatementStatus) {
        this.#serReStatementStatus = serReStatementStatus;
    }

    set setSerReStatementInfo(serReStatementInfo) {
        this.#serReStatementInfo = serReStatementInfo;
    }

    set setSerReApprovedBy(serRe_Approved_By) {
        this.#serRe_Approved_By = serRe_Approved_By;
    }

    set setSerReResponsableMechanic(serRe_Responsable_Mechanic) {
        this.#serRe_Responsable_Mechanic.push(serRe_Responsable_Mechanic);
    }

    set setSerReMilageAtService(serRe_milage_at_Service) {
        this.#serRe_milage_at_Service = serRe_milage_at_Service;
    }

    set setSerReFinishedDate(serRe_Finished_Date) {
        this.#serRe_Finished_Date = serRe_Finished_Date;
    }

    set setSerReLaborInfo(serRe_Labor_Cost) {
        this.#serRe_Labor_Info = serRe_Labor_Cost;
    }

    set setSerReMaterialList(material) {
        this.#serRe_Material_List.push(material);
    }

    set setSerReOtherList(serRe_Other_List) {
        this.#serRe_Other_List = serRe_Other_List;
    }

    set setSerReBillingHistory(serRe_Billing_History) {
        this.#serRe_Billing_History = serRe_Billing_History;
    }

    set setTicket(ticket){
        this.#ticket = ticket;
    }

    //Getter

    get getSerReId() {
        return this.#serReId;
    }

    get getSerReCar() {
        return this.#serReCar;
    }
    get getSerReName() {
        return this.#serReName;
    }

    get getSerReDate() {
        return this.#serReDate;
    }

    get getSerReDescription() {
        return this.#serReDescription;
    }

    get getSerReComments() {
        return this.#serReComments;
    }

    get getSerReWarranty() {
        return this.#serReWarranty;
    }

    get getSerReStatusWarranty() {
        return this.#serReStatusWarranty;
    }

    get getSerReDownPayment() {
        return this.#serReDownPayment;
    }

    get getSerReStatus() {
        return this.#serReStatus;
    }

    get getSerReInitialTotal() {
        return this.#serReInitialTotal;
    }

    get getSerReTotal() {
        return this.#serReTotal;
    }

    get getSerReTotalLeft() {
        return this.#serReTotalLeft;
    }

    get getSerReStatementStatus() {
        return this.#serReStatementStatus;
    }

    get getSerReStatementInfo() {
        return this.#serReStatementInfo;
    }

    get getSerReApprovedBy() {
        return this.#serRe_Approved_By;
    }

    get getSerReResponsableMechanic() {
        return this.#serRe_Responsable_Mechanic;
    }

    get getSerReMilageAtService() {
        return this.#serRe_milage_at_Service;
    }

    get getSerReFinishedDate() {
        return this.#serRe_Finished_Date;
    }

    get getSerReLaborInfo() {
        return this.#serRe_Labor_Info;
    }

    get getSerReMaterialList() {
        return this.#serRe_Material_List;
    }

    get getSerReOtherList() {
        return this.#serRe_Other_List;
    }

    get getSerReBillingHistory() {
        return this.#serRe_Billing_History;
    }

    get getTicket(){
        return this.#ticket;
    }

    //Methods
    updateMechanic(obj, flag) {
        let mec = {
            id: obj.getMecId,
            name: obj.getMecName,
        }
        if (flag == 1) {
            console.log(`Mechanic ${mec.name} with id ${mec.id} has been added`);
            this.#serRe_Responsable_Mechanic.push(mec);
        } else {
            if (this.#serRe_Responsable_Mechanic.length > 1) {
                console.log(`Mechanic ${mec.name} with id ${mec.id} has been removed`);
                this.#serRe_Responsable_Mechanic.pop(obj);
            } else {
                console.log("There has to be a mechanic in charge!");
            }
        }
    }

    // addMechanic(obj) {
    //     this.#serRe_Responsable_Mechanic.push(obj);
    // }

    // removeMechanic(obj) {
    //     if (this.#serRe_Responsable_Mechanic.length != 0) {
    //         this.#serRe_Responsable_Mechanic.pop(obj);
    //     } else {
    //         console.log("There has to be a mechanic in charge!");
    //     }
    // }

    updateMaterial(obj, flag) {
        let newObj = {
            name: obj.getMatName,
            quantity: obj.getMatQuantity,
            cost: obj.getMatUnitCost,
            laborCost: obj.getMatLaborCost,
            comment: obj.getMatComment,
            date: obj.getMatPurchaseDate,
        }
        if (flag == 1) {
            console.log(`${newObj.name} has been added to the service`);
            this.#serRe_Material_List.push(obj);
        } else {
            if (this.#serRe_Material_List.length > 0) {
                console.log(`${newObj.name} has been removed from the service`);
                this.#serRe_Material_List = this.#serRe_Material_List.filter(mat => mat.name !== obj.name);
            } else {
                console.log("There is not material left");
            }
        }
        this.updateLabor(newObj, flag);
        this.getFinalTotal();
        this.updateBillingHistory(newObj, flag);
    }

    updateOtherCost(obj, flag,) {
        let newObj = {
            name: obj.getMatName,
            quantity: obj.getMatQuantity,
            cost: obj.getMatUnitCost,
            laborCost: obj.getMatLaborCost,
            comment: obj.getMatComment,
        }
        if (flag == 1) {
            console.log(`The extra service ${newObj.name} has been added to the service`);
            this.#serRe_Other_List.push(obj);
        } else {
            if (this.#serRe_Other_List.length > 0) {
                console.log(`The extra service ${newObj.name} has been removed from the service`);
                this.#serRe_Other_List = this.#serRe_Other_List.filter(mat => mat.name !== obj.name);
            } else {
                console.log("There is not extra cost left");
            }
        }
        this.updateLabor(newObj, flag);
        this.getFinalTotal();
        this.updateBillingHistory(newObj, flag);
    }

    updateLabor(obj, flag) {
        console.log(`Update labor: `);
        console.log(obj.laborCost);
        if (flag == 1) {
            // console.log(`The labor cost  is ${obj.laborCost} and has been added`);
            this.#serRe_Labor_Info.push(obj);
        } else {
            if (this.#serRe_Labor_Info.length > 0) {
                console.log(`The labor cost ${obj.laborCost} and has been removed`);
                this.#serRe_Labor_Info = this.#serRe_Labor_Info.filter(job => job.name !== obj.name);
            } else {
                console.log("There is not extra cost left");
            }
        }
    };

    updateDownPayment(obj, flag) {
        this.#serReTotalLeft = this.#serReTotalLeft - obj.amount;
        let st = {
            date: obj.date,
            amount: obj.amount,
            amountTotal: this.#serReTotal,
            amountLeft: this.#serReTotalLeft,
        }
        if (flag == 1) {
            console.log(`Amount Received: ${obj.amount} on ${obj.date} has been added`);
            this.#serReStatementInfo.push(st);
            if (this.#serReTotalLeft== 0) {
                this.setSerReStatementStatus = 'Paid';
            }
        } else {
            if (this.#serReStatementInfo.length > 0) {
                console.log(`Amount Received: ${obj.amount} on ${obj.date} has been removed`);
                this.#serReStatementInfo = this.#serReStatementInfo.filter(payment => payment.amount !== obj.amount);
            } else {
                console.log("There is not extra cost left");
            }
        }

    };

    // addNewMaterial(obj) {
    //     if (!obj) {
    //         console.log("There is no material to be added");
    //     } else {
    //         const flag = 1;
    //         let newObj = {
    //             name: obj.getMatName,
    //             quantity: obj.getMatQuantity,
    //             cost: obj.getMatUnitCost,
    //         }
    //         // console.log(obj.toJSON());
    //         console.log(`${newObj.name} has been added to the service`);
    //         this.#serRe_Material_List.push(obj);

    //         this.updateTotal(newObj, flag); //1 for adding a material
    //         this.updateBillingHistory(newObj, flag);
    //     }
    // }

    // removeMaterial(obj) {
    //     const flag = -1; //-1 for removing a material
    //     let newObj = {
    //         name: obj.getMatName,
    //         quantity: obj.getMatQuantity,
    //         cost: obj.getMatUnitCost,
    //     }
    //     if (this.#serRe_Material_List.length != 0) {
    //         console.log(`${newObj.name} has been removed from the service`);
    //         this.#serRe_Material_List.pop(obj);
    //         this.updateTotal(newObj, flag); //0 for removing a material
    //         this.updateBillingHistory(newObj, flag);
    //     } else {
    //         console.log("There is not material left");
    //     }
    // }

    updateMaterialTotal() {
        let prevTotal = 0;
        this.#serRe_Material_List.forEach(obj => {
            prevTotal = prevTotal + (obj.getMatQuantity * obj.getMatUnitCost);
        });
        return prevTotal;
    }

    getMaterialTotal() {
        let prevMatTotal = 0, prevMatLaborTotal = 0;
        this.#serRe_Material_List.forEach(mat => {
            // console.log(mat.getMatQuantity, mat.getMatUnitCost,mat.getMatQuantity * mat.getMatUnitCost);
            prevMatTotal += mat.getMatQuantity * mat.getMatUnitCost;
            prevMatLaborTotal += mat.getMatLaborCost;
        });
        let subTotal = prevMatTotal + prevMatLaborTotal;
        // console.log(prevLaborTotal);
        return {
            matSubTotal: prevMatTotal,
            matLabTotal: prevMatLaborTotal,
            matTotal: subTotal,
        };
    }

    getLaborTotal() {
        let materialTotal = this.getMaterialTotal().matLabTotal,
            otherTotal = this.getOtherCostTotal().otherLabTotal,
            subTotal = materialTotal + otherTotal;
        return {
            matSubTotal: materialTotal,
            otherSubTotal: otherTotal,
            laborTotal: subTotal
        };
    }

    getOtherCostTotal() {
        let prevOtherTotal = 0, prevOtherLabTotal = 0;
        this.#serRe_Other_List.forEach(mat => {
            // console.log(mat.toJSON());
            // console.log(mat.getMatQuantity, mat.getMatUnitCost,mat.getMatQuantity * mat.getMatUnitCost);
            prevOtherTotal += mat.getMatQuantity * mat.getMatUnitCost;
            prevOtherLabTotal += mat.getMatLaborCost;
        });
        let subTotal = prevOtherTotal + prevOtherLabTotal;
        // console.log(subTotal);
        return {
            otherSubTotal: prevOtherTotal,
            otherLabTotal: prevOtherLabTotal,
            otherTotal: subTotal
        };
    }

    getPaymentTotal() {
        let prevPaymentTotal = 0;
        this.#serReStatementInfo.forEach(st => {
            // console.log(st.amount);
            prevPaymentTotal += st.amount;
        });
        this.#serReTotalLeft = this.#serReTotal - prevPaymentTotal
        // console.log(prevPaymentTotal);
        return {
            serId: this.getSerReId,
            serName: this.getSerReName, 
            serStatus: this.getSerReStatementStatus,
            serTotal: this.getSerReTotal,
            totalPayment: prevPaymentTotal,
            totalLeft: this.getSerReTotalLeft,
        }
    }

    getFinalTotal() {
        let material = this.getMaterialTotal().matTotal,
            other = this.getOtherCostTotal().otherTotal;
        let subTotal = material + other;
        this.#serReTotal = subTotal;
        this.#serReTotalLeft = this.#serReTotal;
        return {
            matTotal: material,
            laborTotal: other,
            total: subTotal,
            leftTotal: this.#serReTotal - this.#serReTotalLeft,
        }
    }

    showMechanicList() {
        this.#serRe_Responsable_Mechanic.forEach(me => console.log(me.toJSON()));
    }

    showMaterialList() {
        this.#serRe_Material_List.forEach(mat => console.log(mat.toJSON()));
    }

    showBillingHistory() {
        this.#serRe_Billing_History.forEach(bill => console.log(bill.toJSON()));
    }

    // updateTotal(obj, flag) {
    //     let total = flag * obj.quantity * obj.cost;
    //     console.log(obj.name, total);
    //     console.log(`Total Before: ${this.#serReTotal}`);
    //     console.log(`SubTotal: ${total}`);
    //     this.#serReTotal += total;
    //     console.log(`Total: ${this.#serReTotal}`);

    // }

    updateBillingHistory(obj, flag) {
        if (flag == 1) {
            console.log(`Adding ${obj.name} to the history`);
            this.#serRe_Billing_History.push(obj);
        } else {
            console.log(`Removing ${obj.name} from the history`)
            this.#serRe_Billing_History = this.#serRe_Billing_History.filter(item => item.name !== obj.name);
        }
    }

    generateTicket(ser){
        const ticketIdFormatted = ser.getSerReId.toString().concat('-tic');
        const formattedDate = new Date().toLocaleDateString();
        console.log("ID:"+ser.getSerReId.toString().concat('-tic'));
        return new Ticket(
            ticketIdFormatted,
            ser,
            formattedDate,
            ser.getSerReTotal
        );
    }

    toJSON() {
        return {
            serReId: this.getSerReId,
            serReCar: this.getSerReCar.toJSON(),
            serReName: this.getSerReName,
            serReDate: this.getSerReDate,
            serReDescription: this.getSerReDescription,
            serReComments: this.getSerReComments,
            serReWarranty: this.getSerReWarranty,
            serReStatusWarranty: this.getSerReStatusWarranty,
            serReDownPayment: this.getSerReDownPayment,
            serReStatus: this.getSerReStatus,
            serReInitialTotal: this.getSerReInitialTotal,
            serReTotal: this.getSerReTotal,
            serReTotalLeft: this.getSerReTotalLeft,
            serReStatementStatus: this.getSerReStatementStatus,
            serReStatementInfo: this.getSerReStatementInfo,
            serRe_Approved_By: this.getSerReApprovedBy,
            serRe_Responsable_Mechanic: this.getSerReResponsableMechanic,
            serRe_milage_at_Service: this.getSerReMilageAtService,
            serRe_Finished_Date: this.getSerReFinishedDate,
            serRe_Labor_Info: this.getSerReLaborInfo,
            serRe_Material_List: this.getSerReMaterialList,
            serRe_Other_List: this.getSerReOtherList,
            serRe_Billing_History: this.getSerReBillingHistory,
            serRe_Ticket: this.getTicket,
        }
    }

    //Static Methods
    static buildObject(obj) {
        return new ServiceRecord(
            obj.id,
            obj.car,
            obj.name,
            obj.date,
            obj.description,
            obj.comment,
            obj.warranty,
            obj.statusWarranty,
            obj.downPayment,
            obj.status,
            obj.initialTotal,
            obj.total,
            obj.statementStatus,
            obj.statementInfo, //ArrayList [Object (material)]
            obj._Approved_By,
            obj._Responsable_Mechanic, //ArrayList [Object (material)]
            obj._milage_at_Service,
            obj._Finished_Date,
            obj._Labor_Info, //ArrayList [Object (material)]
            obj._Material_List, //ArrayList [Object (material)]
            obj._Other_List, //ArrayList [Object ()]
            obj._Billing_History, //ArrayList [Object ()]
        );
    }

}

