import ownerClass from './Owner.js';
export default class Car {
    //Attributes

    //car Info
    #carId;
    #carManufacturer;
    #carModel;
    #carYear;
    #carVersion; //Optional
    #carLicensePlate;
    #carVin; //Optional
    #carCurrMilage;
    //Shop Required Info
    #carOwner;
    #car_Registration_Date;
    #car_Last_Service;
    #car_Last_Service_Date;
    #car_Photo;
    #car_Entrance_Date;
    #car_Exit_Date;
    #car_Status;
    #car_Billing;


    constructor(carId, carManufacturer, carModel, carYear, carVersion, carLicensePlate, carVin, carCurrMilage, carOwner, car_Registration_Date, car_Last_Service, car_Last_Service_Date, car_Photo, car_Entrance_Date, car_Exit_Date, car_Status, car_Billing) {
        this.#carId = carId;
        this.#carManufacturer = carManufacturer;
        this.#carModel = carModel;
        this.#carYear = carYear;
        this.#carVersion = carVersion; //Optional
        this.#carLicensePlate = carLicensePlate;
        this.#carVin = carVin; //Optional
        this.#carCurrMilage = carCurrMilage;
        this.#carOwner = carOwner;
        this.#car_Registration_Date = car_Registration_Date;
        this.#car_Last_Service = car_Last_Service;
        this.#car_Last_Service_Date = car_Last_Service_Date;
        this.#car_Photo = car_Photo;
        this.#car_Entrance_Date = car_Entrance_Date;
        this.#car_Exit_Date = car_Exit_Date;
        this.#car_Status = car_Status;
        this.#car_Billing = car_Billing;
    }

    //Setters
    set setCarId(car) {
        this.#carId = carId;
    }

    set setCarManufacturer(carManufacturer) {
        this.#carManufacturer = carManufacturer;
    }

    set setCarModel(carModel) {
        this.#carModel = carModel;
    }

    set setCarYear(carYear) {
        this.#carYear = carYear;
    }

    set setCarVersion(carVersion) {
        this.#carVersion = carVersion; //Optional
    }

    set setCarLicensePlate(carLicensePlate) {
        this.#carLicensePlate = carLicensePlate;
    }

    set setCarVIn(carVin) {
        this.#carVin = carVin; //Optional
    }

    set setCarCurrMilage(carCurrMilage) {
        this.#carCurrMilage = carCurrMilage;
    }

    set setCarOwner(carOwner) {
        this.#carOwner = carOwner;
    }

    set setCarRegistrationDate(car_Registration_Date) {
        this.#car_Registration_Date = car_Registration_Date;
    }

    set setCarLastService(car_Last_Service) {
        this.#car_Last_Service = car_Last_Service;
    }

    set setCarLastServiceDate(car_Last_Service_Date) {
        this.#car_Last_Service_Date = car_Last_Service_Date;
    }

    set setCarPhoto(car_Photo) {
        this.#car_Photo = car_Photo;
    }

    set setCarEntranceDate(car_Entrance_Date) {
        this.#car_Entrance_Date = car_Entrance_Date;
    }

    set setCarExitDate(car_Exit_Date) {
        this.#car_Exit_Date = car_Exit_Date;
    }

    set setCarStatus(car_Status) {
        this.#car_Status = car_Status;
    }

    set setCarBilling(car_Billing) {
        this.#car_Billing = car_Billing;
    }

    //Getters

    get getCarId() {
        return this.#carId;
    }

    get getCarManufacturer() {
        return this.#carManufacturer;
    }

    get getCarModel() {
        return this.#carModel;
    }

    get getCarYear() {
        return this.#carYear;
    }

    get getCarVersion() {
        return this.#carVersion; //Optional
    }

    get getCarLicensePlatee() {
        return this.#carLicensePlate;
    }

    get getCarVIn() {
        return this.#carVin; //Optional
    }

    get getCarCurrMilage() {
        return this.#carCurrMilage;
    }

    get getCarOwner() {
        return this.#carOwner;
    }

    get getCarRegistrationDate() {
        return this.#car_Registration_Date;
    }

    get getCarLastService() {
        return this.#car_Last_Service;
    }

    get getCarLastServiceDate() {
        return this.#car_Last_Service_Date;
    }

    get getCarPhoto() {
        return this.#car_Photo;
    }

    get getCarEntranceDate() {
        return this.#car_Entrance_Date;
    }

    get getCarExitDate() {
        return this.#car_Exit_Date;
    }

    get getCarStatus() {
        return this.#car_Status;
    }

    get getCarBilling() {
        return this.#car_Billing;
    }

    //Methods

    //Static Methods
    static buildObject(obj) {
        return new Car(
            obj.id,
            obj.manufacturer,
            obj.model,
            obj.year,
            obj.version,
            obj.licensePlate,
            obj.vin,
            obj.milage,
            obj.owner,
            obj.registrationDate,
            obj.lastService,
            obj.lastServiceDate,
            obj.photo,
            obj.entranceDate,
            obj.exitDate,
            obj.status,
            obj.billing,
        );
    }

}