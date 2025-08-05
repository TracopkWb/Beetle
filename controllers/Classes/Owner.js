export default class Owner {
    //Attributes
    #owId;
    #owName;
    #owPhoneNum;
    #owEmail;
    #owOtherContacts = [];

    constructor(owId, owName, owPhoneNum, owEmail,owOtherContact = []) {
        this.#owId = owId;
        this.#owName = owName;
        this.#owPhoneNum = owPhoneNum;
        this.#owEmail = owEmail;
        this.#owOtherContacts = owOtherContact;
    }

    //Setters
    set setOwnerId(owId) {
        this.#owId = owId;
    }

    set setOwnerName(owName) {
        this.owName = owName;

    }
    set setOwnerPhoneNumber(owPhoneNum) {
        this.#owPhoneNum = owPhoneNum;
    }

    set setOwnerEmail(owEmail) {
        this.#owEmail = owEmail;
    }

    //Getters
    get getOwnerId() {
        return this.#owId;
    }

    get getOwnerName() {
        return this.#owName;
    }

    get getOwnerPhoneNumber() {
        return this.#owPhoneNum;
    }

    get getOwnerEmail() {
        return this.#owEmail;
    }
    //Methods
    toJSON() {
        return {
            owId: this.getOwnerId,
            owName: this.getOwnerName,
            owPhoneNum: this.getOwnerPhoneNumber,
            owEmail: this.getOwnerEmail,
        }
    }


    //static Methods
    static buildObject(obj) {
        return new Owner(
            obj.id,
            obj.name,
            obj.phone,
            obj.email
        );
    }

}