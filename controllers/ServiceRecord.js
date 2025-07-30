export default class ServiceRecord {
    //Attributes

    #serReId;
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
    #serRe_Responsable_Mechanic; //Object
    #serRe_milage_at_Service;
    #serRe_Finished_Date;
    #serRe_Labor_Cost;
    #serRe_Material_List;
    #serRe_Material_Cost;
    #serRe_Other_List;
    #serRe_Other_Cost;


    constructor(serReId, serReName, serReDate, serReDescription, serReComments, serReWarranty, serReStatusWarranty, serReDownPayment, serReStatus, serReInitialTotal, serRe_Approved_By, serRe_Responsable_Mechanic, serRe_milage_at_Service, serRe_Finished_Date, serRe_Labor_Cost, serRe_Material_List, serRe_Material_Cost, serRe_Other_Cost) {

        this.#serReId = serReId;
        this.#serReName = serReName;
        this.#serReDate = serReDate;
        this.#serReDescription = serReDescription;
        this.#serReComments = serReComments
        this.#serReWarranty = serReWarranty;
        this.#serReStatusWarranty = serReStatusWarranty;
        this.#serReDownPayment = serReDownPayment;
        this.#serReStatus = serReStatus;
        this.#serReInitialTotal = serReInitialTotal;
        //this.#serReTotal = serReTotal;
        this.#serRe_Approved_By = serRe_Approved_By;
        this.#serRe_Responsable_Mechanic = serRe_Responsable_Mechanic; //Object
        this.#serRe_milage_at_Service = serRe_milage_at_Service;
        this.#serRe_Finished_Date = serRe_Finished_Date;
        this.#serRe_Labor_Cost = serRe_Labor_Cost;
        this.#serRe_Material_List = serRe_Material_List;
        this.#serRe_Material_Cost = serRe_Material_Cost;
        this.#serRe_Other_Cost = serRe_Other_Cost;
    }

    //Setters
    set setSerReId(serReId) {
        this.#serReId = serReId;
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
        this.#serRe_Responsable_Mechanic = serRe_Responsable_Mechanic;
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

    set setSerReMaterialList(serRe_Material_List) {
        this.#serRe_Material_List = serRe_Material_List;
    }

    set setSerReMaterialCost(serRe_Material_Cost) {
        this.#serRe_Labor_Cost = serRe_Material_Cost;

    }

    set setSerReOtherList(serRe_Other_List) {
        this.#serRe_Other_List = serRe_Other_List;
    }

    set setSerReOtherCost(serRe_Other_Cost) {
        this.#serRe_Other_Cost = serRe_Other_Cost;

    }

    //Getter

    get getSerReId() {
        return this.#serReId;
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

    get getSerReMaterialCost() {
        return this.#serRe_Labor_Cost;

    }

    get getSerReOtherList() {
        return this.#serRe_Other_List;
    }

    get getSerReOtherCost() {
        return this.#serRe_Other_Cost;

    }

    //Method
    toJSON() {
        return {
            
        }
    }

    //Static Methods
    static buildObject(obj) {
        return new ServiceRecord(
            obj.id,
            obj.name,
            obj.phone,
            obj.photo,
            obj.biometrics
        );
    }

}

