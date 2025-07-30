export default class Owner{
    //Attributes
    #owName;
    #owPhoneNum;
    #owEmail;

    constructor(ow_name, ow_phoneNum, ow_email){
        this.#owName = ow_name;
        this.#owPhoneNum = ow_phoneNum;
        this.#owEmail = ow_email;
    }

    //Setters
    get getOwnerName(){
        return newName;
    }

    get getOwnerPhoneNumber(){
        return newNumber;
    }

    get getOwnerEmail(){
        return newEmail;
    }

    //Getters
    get getOwnerName(){
        return this.#owName;
    }

    get getOwnerPhoneNumber(){
        return this.#owPhoneNum;
    }

    get getOwnerEmail(){
        return this.#owEmail;
    }
    //Methods

    //static Methods
    static buildObject(ow){
        return new Owner(
            ow.name,
            ow.phone,
            ow.email
        );
    }

}