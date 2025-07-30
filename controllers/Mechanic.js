export default class Mechanic {
    //Attributes
    #mecId;
    #mecName;
    #mecPhoneNum;
    #mecPhoto;
    #mecBiometrics;

    constructor(mecId, mecName, mecPhoneNum, mecPhoto, mecBiometrics) {
        this.#mecId = mecId;
        this.#mecName = mecName;
        this.#mecPhoneNum = mecPhoneNum;
        this.#mecPhoto = mecPhoto;
        this.#mecBiometrics = mecBiometrics;
    }

    //Setters
    set setMecId(mecId) {
        this.#mecId = mecId;
    }

    set setMecName(mecName) {
        this.#mecName = mecName;
    }

    set setMecPhoneNum(mecPhoneNum) {
        this.#mecPhoneNum = mecPhoneNum;
    }

    set setMecPhoto(mecPhoto) {
        this.#mecPhoto = mecPhoto;
    }
    set setMecBiometrics(mecBiometrics) {
        this.#mecBiometrics = mecBiometrics;
    }

    //Getter

    get getMecId() {
        return this.#mecId;
    }

    get getMecName() {
        return this.#mecName;
    }

    get getMecPhoneNum() {
        return this.#mecPhoneNum;
    }

    get getMecPhoto() {
        return this.#mecPhoto;
    }
    get getMecBiometrics() {
        return this.#mecBiometrics;
    }

    //Method
    toJSON() {
        return {
            mecId:this.getMecId,
            mecName:this.getMecName,
            mecPhone:this.getMecPhoneNum,
            mecPhoto:this.getMecPhoto,
            mecBiometrics:this.getMecBiometrics,
        }
    }

    //Static Methods
    static buildObject(obj) {
        return new Mechanic(
            obj.id,
            obj.name,
            obj.phone,
            obj.photo,
            obj.biometrics
        );
    }

}

