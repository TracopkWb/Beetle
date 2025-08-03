export default class MaterialUsed {
    //Attributes
    #matId;
    #mat4Car;
    #matName;
    #matQuantity;
    #matUnitCost;
    #matLaborCost;
    #matPurchaseDate;
    #matSupplier;
    #matReceipt; //Photo
    #matComment;

    constructor(matId, mat4Car, matName, matQuantity, matUnitCost, matLaborCost, matPurchaseDate, matSupplier, matReceipt, matComment) {
        this.#matId = matId;
        this.#mat4Car = mat4Car;
        this.#matName = matName;
        this.#matQuantity = matQuantity;
        this.#matUnitCost = matUnitCost;
        this.#matLaborCost = matLaborCost;
        this.#matPurchaseDate = matPurchaseDate;
        this.#matSupplier = matSupplier;
        this.#matReceipt = matReceipt;
        this.#matComment = matComment;
    }

    //Setters
    set setMatId(matId) {
        this.#matId = matId;
    }

    set setMat4Car(mat4Car) {
        this.#mat4Car = mat4Car;
    }

    set setMatName(matName) {
        this.#matName = matName;
    }

    set setMatQuantity(matQuantity) {
        this.#matQuantity = matQuantity;
    }

    set setMatUnitCost(matUnitCost) {
        this.#matUnitCost = matUnitCost;
    }

    set setMatLaborCost(matLaborCost) {
        this.#matLaborCost = matLaborCost;
    }


    set setMatPurchaseDate(matPurchaseDate) {
        this.#matPurchaseDate = matPurchaseDate;
    }

    set setMatSupplier(matSupplier) {
        this.#matSupplier = matSupplier;
    }

    set setMatReceipt(matReceipt) {
        this.#matReceipt = matReceipt;
    }

    set setMatComment(matComment) {
        this.#matComment = matComment;
    }

    //Getter
    get getMatId() {
        return this.#matId;
    }

    get getMat4Car() {
        return this.#mat4Car;
    }

    get getMatName() {
        return this.#matName;
    }

    get getMatQuantity() {
        return this.#matQuantity;
    }

    get getMatUnitCost() {
        return this.#matUnitCost;
    }

    get getMatLaborCost() {
        return this.#matLaborCost;
    }

    get getMatPurchaseDate() {
        return this.#matPurchaseDate;
    }

    get getMatSupplier() {
        return this.#matSupplier;
    }

    get getMatReceipt() {
        return this.#matReceipt;
    }

    get getMatComment() {
        return this.#matComment;
    }


    //Method
    toJSON() {
        return {
            matId: this.getMatId,
            mat4Car: this.getMat4Car,
            matName: this.getMatName,
            matQuantity: this.getMatQuantity,
            matUnitCost: this.getMatUnitCost,
            matLaborCost: this.getMatLaborCost,
            matPurchaseDate: this.getMatPurchaseDate,
            matSupplier: this.getMatSupplier,
            matReceipt: this.getMatReceipt, //Phot,
            matComment: this.getMatComment,
        }
    }

    //Static Methods
    static buildObject(obj) {
        return new MaterialUsed(
            obj.id,
            obj.car,
            obj.name,
            obj.quantity,
            obj.cost,
            obj.laborCost,
            obj.purchaseDate,
            obj.supplier,
            obj.receipt,
            obj.comment,
        );
    }
}