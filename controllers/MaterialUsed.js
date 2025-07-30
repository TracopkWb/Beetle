export default class MaterialUsed {
    //Attributes
    #matId;
    #matName;
    #matQuantity;
    #matUnitCost;
    #matPurchaseDate;
    #matSupplier;
    #matReceipt; //Photo

    constructor(matId, matName, matQuantity, matUnitCost, matPurchaseDate, matSupplier, matReceipt) {
        this.#matId = matId;
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
        }
    }

    //Static Methods
    static buildObject(obj) {
        return new MaterialUsed(
            obj.id,
            obj.name,
            obj.quantity,
            obj.cost,
            obj.purchaseDate,
            obj.supplier,
            obj.receipt
        );
    }
}