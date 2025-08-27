// import '../../utilities/uti-hash.js';
import Hash from '../../utilities/uti-hash.js';
import DB from '../../utilities/uti-db.js';
export default class Costumer {
    //Attributes
    #cos_Id;
    #cosName;
    #cosPhone;
    #cosEmail = null;
    #cosOtherPhone = [];

    constructor(owId, owName, owPhoneNum, owOtherContact = []) {
        this.#cos_Id = owId;
        this.#cosName = owName;
        this.#cosPhone = owPhoneNum;
        this.#cosOtherPhone = owOtherContact;
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
    //Methods
    toJSON() {
        return {
            cos_Id: this.getOwnerId,
            cosName: this.getOwnerName,
            cosPhone: this.getOwnerPhoneNumber,
            // cosEmail: this.getOwnerEmail,
        }
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
        return new Costumer(
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
                type: checkDB.type,
                origin: 'fetchCostumerFromDB()-'.concat(checkDB.origin),
                show: true
            }
        }
        const searchQuery = `SELECT * FROM costumer WHERE cos_Id = ?`;
        const [costumerListRaw] = await DB.conn.execute(searchQuery, [id]);
        // console.log(customerListRaw, Owner.buildObject(costumerListRaw));
        try {
            return {
                success: true,
                data: costumerListRaw[0],
                error: null,
            }
        } catch (err) {
            // console.log(err);
            return {
                success: false,
                data: null,
                error: err,
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
            // console.log(typeof (costumerListRaw));

            for (const nCus of costumerListRaw) {
                const newCus = this.buildObject(nCus);
                cusList.push(newCus);
            }
            // console.log(cusList);
            //Hashing data to make sure indexDB in browser is upto date
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