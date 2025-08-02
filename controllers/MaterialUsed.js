export default class MaterialUsed {
    //Attributes
    #matId;
    #mat4Car;
    #matName;
    #matQuantity;
    #matUnitCost;
    #matPurchaseDate;
    #matSupplier;
    #matReceipt; //Photo

    constructor(matId, mat4Car,matName, matQuantity, matUnitCost, matPurchaseDate, matSupplier, matReceipt) {
        this.#matId = matId;
        this.#mat4Car = mat4Car;
        this.#matName = matName;
        this.#matQuantity = matQuantity;
        this.#matUnitCost = matUnitCost;
        this.#matPurchaseDate = matPurchaseDate;
        this.#matSupplier = matSupplier;
        this.#matReceipt = matReceipt;
    }

    //Setters
    set setMatId(matId) {
        this.#matId = matId;
    }

    set setMat4Car(mat4Car){
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

    set setMatPurchaseDate(matPurchaseDate) {
        this.#matPurchaseDate = matPurchaseDate;
    }

    set setMatSupplier(matSupplier) {
        this.#matSupplier = matSupplier;
    }

    set setMatReceipt(matReceipt) {
        this.#matReceipt = matReceipt;
    }

    //Getter
    get getMatId() {
        return this.#matId;
    }

    get getMat4Car(){
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

    get getMatPurchaseDate() {
        return this.#matPurchaseDate;
    }

    get getMatSupplier() {
        return this.#matSupplier;
    }

    get getMatReceipt() {
        return this.#matReceipt;
    }

     //Method
    toJSON() {
        return {
            matId: this.getMatId,
            mat4Car: this.getMat4Car,
            matName: this.getMatName,
            matQuantity: this.getMatQuantity,
            matUnitCost: this.getMatUnitCost,
            matPurchaseDate: this.getMatPurchaseDate,
            matSupplier: this.getMatSupplier,
            matReceipt: this.getMatReceipt, //Phot,

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
            obj.purchaseDate,
            obj.supplier,
            obj.receipt
        );
    }
}