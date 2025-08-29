// import '../../utilities/uti-hash.js';
import Hash from '../../utilities/uti-hash.js';
import carClass from './Car.js';
import DB from '../../utilities/uti-db.js';
export default class Customer {
    //Attributes
    #cos_Id;
    #cosName;
    #cosPhone;
    #cosEmail = null;
    #cusCars = [];

    constructor(owId, owName, owPhoneNum) {
        this.#cos_Id = owId;
        this.#cosName = owName;
        this.#cosPhone = owPhoneNum;
        this.#cusCars = [];
    }

    //Setters
    set setOwnerId(cos_Id) {
        this.#cos_Id = cos_Id;
    }

    set setOwnerName(cosName) {
        this.owName = cosName;

    }
    set setOwnerPhoneNumber(cosPhone) {
        this.#cosPhone = cosPhone;
    }

    set setOwnerEmail(cosEmail) {
        this.#cosEmail = cosEmail;
    }

    //Getters
    get getOwnerId() {
        return this.#cos_Id;
    }

    get getOwnerName() {
        return this.#cosName;
    }

    get getOwnerPhoneNumber() {
        return this.#cosPhone;
    }

    get getOwnerEmail() {
        return this.#cosEmail;
    }

    get getCustomerCars() {
        return this.#cusCars;
    }
    //Methods
    toJSON() {
        return {
            cos_Id: this.getOwnerId,
            cosName: this.getOwnerName,
            cosPhone: this.getOwnerPhoneNumber,
            cusCars: this.getCustomerCars,
            // cosEmail: this.getOwnerEmail,
        }
    }

    addCar(newCar) {
        // console.log("newCar:",newCar);
        this.#cusCars.push(newCar);
    }

    async deleteCustomer() {
        console.log("Deleting Customer:", this.toJSON());
        const deleteQuery = `DELETE FROM costumer WHERE cos_Id = ?`;
        // console.log(this.getOwnerId);
        try {
            DB.conn.execute(deleteQuery, [this.getOwnerId]);
            return {
                success: true,
                data: this,
                error: null,
                type: 'notification-delete-Customer()',
                origin: 'delete-OwnerClass-deleteCustomer()',
                show: true,
            }
        } catch (err) {
            return {
                success: false,
                data: `Customer ${this.#cos_Id} deleted`,
                error: err,
                type: 'error-deleteCustomer',
                origin: 'OwnerClass-deleteCustomer()',
                show: true,
            }
        }
    }

    //static Methods
    static buildObject(obj) {
        // console.log("buildObject: ",obj);
        return new Customer(
            obj['cos_Id'],
            obj.cosName,
            obj.cosPhone,
        );
    }

    static buildObjectWithCar(obj) {
        // console.log("buildObject: ",obj);
        return new Customer(
            obj['cos_Id'],
            obj.cosName,
            obj.cosPhone,
        );
    }

    static async search4Owner(id) {
        const checkDB = await DB.testConnection();
        if (!checkDB.success) {
            return {
                success: false,
                data: checkDB.data,
                error: checkDB.error,
                type: checkDB.type,
                origin: 'search4Owner()-'.concat(checkDB.origin),
                show: true,
            }
        }
        const searchQueryCus = `SELECT * FROM costumer WHERE cos_Id = ?`;
        const searchQueryCars = `SELECT * FROM car WHERE cos_Id = ?`;
        try {
            ////////GETS ALL THE CUSTOMERS DATA
            const [rawCustomerInfo] = await DB.conn.execute(searchQueryCus, [id]);
            if (rawCustomerInfo.length === 0) {
                return {
                    success: false,
                    data: `Customer ${id} not found`,
                    error: `Wrong ID: ${id}`,
                    type: 'notification-notFound',
                    origin: 'search4Owner()-'.concat(checkDB.origin),
                    show: true,
                }
            }

            let customerInfo = this.buildObject(rawCustomerInfo[0]);

            const [rawCarsInfo] = await DB.conn.execute(searchQueryCars, [id]);
            // console.log(rawCustomerInfo);
            rawCarsInfo.forEach(car => {
                customerInfo.addCar(car);
            });
            // console.log(customerInfo.toJSON());
            return {
                success: true,
                data: customerInfo,
                error: null,
                type: 'notification-found',
                origin: 'search4Owner()-'.concat(checkDB.origin),
                show: true,
            }
        } catch(err) {
        // console.log(err);
        return {
            success: false,
            data: checkDB.data,
            error: checkDB.error,
            type: checkDB.type,
            origin: 'search4Owner()-'.concat(checkDB.origin),
            show: true,
        }
    }
}

    static lastHashed = null; // store last hash globally in class
    static async getAllCustomers(hash) {
    let cusList = [];
    let currentHashed;
    console.log('Getting all customers from DB');
    const checkDB = await DB.testConnection();
    if (!checkDB.success) {
        return {
            success: checkDB.success,
            data: checkDB.data,
            type: checkDB.type,
            origin: 'CustomersClass-getAllCustomers()-'.concat(checkDB.origin),
            error: checkDB.error,
            show: true,
            hash: null,
        }
    }

    try {
        const [costumerListRaw] = await DB.conn.execute('SELECT * FROM costumer');
        // console.log((costumerListRaw));

        for (const nCus of costumerListRaw) {
            const newCus = await this.search4Owner(nCus['cos_Id']);
            cusList.push(newCus.data);
        }
        console.log(cusList);

        ////////////Hashing data to make sure indexDB in browser is upto date
        // currentHashed = generateHash(cusList);
        currentHashed = Hash.generateHash(cusList);
        // console.log('hash', currentHashed);
        this.lastHashed = currentHashed;
        if (hash === null || hash === this.lastHashed) {
            console.log('The data is upto date');
            return {
                success: true,
                data: 'Data upto date',
                error: 'uptoDate',
                type: 'notification-get-Customers',
                origin: 'CustomersClass-getAllCustomers()-hash',
                show: false,
                hash: this.lastHashed,
            }
        }
        return {
            success: true,
            data: cusList,
            error: null,
            type: 'notification-getCustomers',
            origin: 'CustomersClass-getAllCustomers()-'.concat(checkDB.origin),
            show: false,
            hash: currentHashed,
        }
    } catch (err) {
        // console.log(err);
        return {
            success: false,
            data: 'No customers found, check XAMPP',
            error: err.message,
            type: 'error-getCustomers',
            origin: 'CustomersClass-getAllCustomers()-'.concat(checkDB.origin),
            show: true,
            hash: null,
        }

    }
}

    static async getSpecificCustomer(customerId) {

}

}