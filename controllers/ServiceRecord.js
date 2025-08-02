export default class ServiceRecord {
    //Attributes

    #serReId;
    #serReCar;
    #serReName;
    #serReDate;
    #serReDescription;
    #serReComments
    #serReWarranty;
    #serReStatusWarranty;
    #serReDownPayment;
    #serReStatus;
    #serReInitialTotal;
    #serReTotal;

    #serRe_Approved_By;
    #serRe_Responsable_Mechanic = []; //Array list [Object (mechanic)]
    #serRe_milage_at_Service;
    #serRe_Finished_Date;
    #serRe_Labor_Cost;
    #serRe_Material_List = []; //ArrayList [Object (material price)]
    #serRe_Other_List = []; //ArrayList [Object (material price)]

    constructor(serReId, serReCar, serReName, serReDate, serReDescription, serReComments, serReWarranty, serReStatusWarranty, serReDownPayment, serReStatus, serReInitialTotal, serReTotal, serRe_Approved_By, serRe_Responsable_Mechanic, serRe_milage_at_Service, serRe_Finished_Date, serRe_Labor_Cost, serRe_Material_List = [], serRe_Other_List = []) {
        // constructor(serReId, serReCar, serReName, serReDate, serReDescription, serReComments, serReWarranty, serReStatusWarranty, serReDownPayment, serReStatus, serReInitialTotal,serReTotal, serRe_Approved_By, serRe_milage_at_Service, serRe_Finished_Date, serRe_Labor_Cost) {

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
        this.#serRe_Approved_By = serRe_Approved_By;
        this.#serRe_Responsable_Mechanic = serRe_Responsable_Mechanic; //Object
        this.#serRe_milage_at_Service = serRe_milage_at_Service;
        this.#serRe_Finished_Date = serRe_Finished_Date;
        this.#serRe_Labor_Cost = serRe_Labor_Cost;
        this.#serRe_Material_List = serRe_Material_List;
        this.#serRe_Other_List = serRe_Other_List;
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

    set setSerReLaborCost(serRe_Labor_Cost) {
        this.#serRe_Labor_Cost = serRe_Labor_Cost;
    }

    set setSerReMaterialList(material) {
        this.#serRe_Material_List.push(material);
    }

    set setSerReOtherList(serRe_Other_List) {
        this.#serRe_Other_List = serRe_Other_List;
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

    get getSerReApprovedBy() {
        return this.#serRe_Approved_By;
    }

    get getSerReResponsableMechanic() {
        // console.log(typeof(this.#serRe_Responsable_Mechanic));
        return this.#serRe_Responsable_Mechanic;
    }

    get getSerReMilageAtService() {
        return this.#serRe_milage_at_Service;
    }

    get getSerReFinishedDate() {
        return this.#serRe_Finished_Date;
    }

    get getSerReLaborCost() {
        return this.#serRe_Labor_Cost;
    }

    get getSerReMaterialList() {
        return this.#serRe_Material_List;
    }

    get getSerReOtherList() {
        return this.#serRe_Other_List;
    }

    //Methods
    addMechanic(obj) {
        this.#serRe_Responsable_Mechanic.push(obj);
    }

    removeMechanic(obj) {
        if (this.#serRe_Responsable_Mechanic != 0) {
            this.#serRe_Responsable_Mechanic.pop(obj);
        } else {
            console.log("There has to be a mechanic in charge!");
        }
    }

    addNewMaterial(obj) {
        if (!obj) {
            console.log("There is no material to be added");
        } else {
            // console.log(obj.toJSON());
            this.#serRe_Material_List.push(obj);
        }
    }

    removeMaterial(obj) {
        if (this.#serRe_Material_List.length != 0) {
            this.#serRe_Material_List.pop(obj);
        } else {
            console.log("There is not material left");
        }
    }

    getMaterialTotal(){
        
        this.#serRe_Material_List.forEach(obj => {
            console.log(obj.getMatQuantity, obj.getMatUnitCost, obj.getMatQuantity *  obj.getMatUnitCost );
            this.total
        })
    }

    showMechanicList() {
        this.#serRe_Responsable_Mechanic.forEach(me => console.log(me.toJSON()));
    }

    showMaterialList() {
        this.#serRe_Material_List.forEach(mat => console.log(mat.toJSON()));
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
            serRe_Approved_By: this.getSerReApprovedBy,
            serRe_Responsable_Mechanic: this.getSerReResponsableMechanic,
            serRe_milage_at_Service: this.getSerReMilageAtService,
            serRe_Finished_Date: this.getSerReFinishedDate,
            serRe_Labor_Cost: this.getSerReLaborCost,
            serRe_Material_List: this.getSerReMaterialList,
            serRe_Other_List: this.getSerReOtherList,
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
            obj._Approved_By,
            obj._Responsable_Mechanic,
            obj._milage_at_Service,
            obj._Finished_Date,
            obj._Labor_Cost,
            obj._Material_List, //ArrayList [Object (material)]
            obj._Other_List,
        );
    }

}

