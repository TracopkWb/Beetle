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

}