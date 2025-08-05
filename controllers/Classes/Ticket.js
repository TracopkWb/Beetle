export default class Ticket {
    #ticId;
    #ticSer;
    #ticDate;
    #ticAmount;
    // #tic ;
    constructor(ticId, ticSer, ticDate, ticAmount) {
        this.#ticId = ticId;
        this.#ticSer = ticSer;
        this.#ticDate = ticDate;
        this.#ticAmount = ticAmount;
    }

    //Setters

    set setTicId(ticId) {
        this.#ticId = ticId;
    }

    set setTicSer(ticSer) {
        this.#ticSer = ticSer;
    }

    set setTicDate(ticDate) {
        this.#ticDate = ticDate;
    };

    set setTicAmount(ticAmount) {
        this.#ticAmount = ticAmount;
    };


    //Getters

    get getTicId() {
        return this.#ticId;
    }

    get getTicSer() {
        return this.#ticSer;
    }

    get getTicDate() {
        return this.#ticDate;
    };

    get getTicAmount() {
        return this.#ticAmount;
    };


    //Methods

    getDataFromService() {
        return this.#ticSer;
    }

    toJSON() {
        return {
            ticId: this.getTicId,
            ticSer: this.getTicSer,
            ticDate: this.getTicDate,
            ticTotal: this.getTicAmount,
        }
    }

    static buildObject(obj) {
        return new Ticket(
            obj.id,
            obj.ser,
            obj.date,
            obj.amount,
        );
    }

    //Static Methods
}