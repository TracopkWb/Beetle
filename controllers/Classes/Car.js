// import ownerClass from './Customer.js';
import DB from '../../utilities/uti-db.js';
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
    // #carOwner; //ownerId => cosId (DB)

    #car_Registration_Date;
    #car_prev_Services_Info = [];
    #car_Photo;
    #car_Status;
    #car_Billing_Info = [];

    // #car_Entrance_Date;
    // #car_Exit_Date;


    constructor(carId, carManufacturer, carModel, carYear ,carVersion = '',carLicensePlate, carVin = '', carCurrMilage = 0, car_Registration_Date,car_Photo = '',car_Status='') {

        this.#carId = carId;
        this.#carManufacturer = carManufacturer;
        this.#carModel = carModel;
        this.#carYear = carYear;
        this.#carVersion = carVersion; //Optional
        this.#carLicensePlate = carLicensePlate;
        this.#carVin = carVin; //Optional
        this.#carCurrMilage = carCurrMilage;
        this.#car_Registration_Date = car_Registration_Date;
        this.#car_Photo = car_Photo;
        this.#car_Status     = car_Status;
    }

    //Setters
    set setCarId(carId) {
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

    set setCarRegistrationDate(car_Registration_Date) {
        this.#car_Registration_Date = car_Registration_Date;
    }

    set setCarPrevServiceInfo(car_prev_Services_Info) {
        this.#car_prev_Services_Info = car_prev_Services_Info;
    }


    set setCarPhoto(car_Photo) {
        this.#car_Photo = car_Photo;
    }
    set setCarStatus(car_Status) {
        this.#car_Status = car_Status;
    }

    set setCarBilling(car_Billing_Info) {
        this.#car_Billing_Info = car_Billing_Info;
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


    get getCarRegistrationDate() {
        return this.#car_Registration_Date;
    }

    get getCarPrevServiceInfo() {
        return this.#car_prev_Services_Info;
    }

    get getCarPhoto() {
        return this.#car_Photo;
    }


    get getCarStatus() {
        return this.#car_Status;
    }

    get getCarBillingInfo() {
        return this.#car_Billing_Info;
    }

    //Methods

    updateService(service, flag) {
        if (flag == 1) {
            console.log(`Service ${service.getSerReName} added to  History`);
            console.log(service.getPaymentTotal());
            this.#car_Billing_Info.push(service);
            this.#car_prev_Services_Info.push(service);

        } else {
            console.log(`Service ${service.getSerReName} removed from  History`);
            this.#car_prev_Services_Info.filter(ser => ser.id !== service.id);
            this.#car_Billing_Info.filter(ser => ser.id !== service.id);
        }
    }

    showServiceResume() {
        this.#car_prev_Services_Info.forEach(ser => {
            console.log(ser);
            // return ser;
        });

    }

    toJSON() {
        return {
            carId: this.getCarId,
            carManufacturer: this.getCarManufacturer,
            carModel: this.getCarModel,
            carYear: this.getCarYear,
            carVersion: this.getCarVersion, //Optional
            carLicensePlate: this.getCarLicensePlatee,
            carVin: this.getCarVIn, //Optional
            carCurrMilage: this.getCarCurrMilage,
            car_Registration_Date: this.getCarRegistrationDate,
            car_Photo: this.getCarPhoto,
            car_Status: this.getCarStatus,
        }
    }

    //Static Methods

    static buildObject(obj) {
        return new Car(
            obj['car_Id'],
            obj.carManufacturer,
            obj.carModel,
            obj.carYear,
            obj.carVersion,
            obj.carLicensePlate,
            obj.carVin,
            obj.carCurrMilage,
            obj.car_Registration_Date,
            obj.car_Photo,
            obj.car_Status,
        );
    }

    static async search4Cars(id) {
        const checkDB = await DB.testConnection();
        if (!checkDB.success) {
            return {
                success: false,
                data: checkDB.data,
                error: checkDB.error,
                type: checkDB.type,
                origin: 'search4Cars()-'.concat(checkDB.origin),
                show: true,
            }
        }
        const searchQuery = `SELECT * FROM car WHERE cos_Id = ?`;
        try {
            ////////GETS ALL THE CUSTOMERS DATA
            const [customerCarList] = await DB.conn.execute(searchQuery, [id]);
            // console.log(customerCarList);
            if (customerCarList.length === 0) {
                return {
                    success: true,
                    data: `There are no cars under this customer id: ${id}`,
                    error: `No card under: ${id}`,
                    type: 'notification-notFound',
                    origin: 'search4Cars()-'.concat(checkDB.origin),
                    show: true,
                }
            } else {
                // console.log(typeof(customerCarList), customerCarList.length ,Array.from(customerCarList))
                let carListArray = [];
                Array.from(customerCarList).forEach(car => {
                    carListArray.push(this.buildObject(car));
                });
                // console.log(carListArray);
                return {
                    success: true,
                    data: carListArray,
                    error: null,
                    type: 'notification-found',
                    origin: 'search4Cars()-'.concat(checkDB.origin),
                    show: true,
                }
            }
        } catch (err) {
            // console.log(err);
            return {
                success: false,
                data: checkDB.data,
                error: checkDB.error,
                type: checkDB.type,
                origin: 'search4Cars()-'.concat(checkDB.origin),
                show: true,
            }
        }
    }


}