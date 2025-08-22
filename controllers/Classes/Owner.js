import DB from '../../utilities/uti-db.js';
export default class Owner {
    //Attributes
    #owId;
    #owName;
    #owPhoneNum;
    #owEmail = null;
    #owOtherContacts = [];

    constructor(owId, owName, owPhoneNum, owOtherContact = []) {
        this.#owId = owId;
        this.#owName = owName;
        this.#owPhoneNum = owPhoneNum;
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


    async deleteCustomer() {
        console.log("Deleting Customer:", this.toJSON());
        const deleteQuery = `DELETE FROM costumer WHERE cos_Id = ?`;
        // console.log(this.getOwnerId);
        try {
            DB.conn.execute(deleteQuery, [this.getOwnerId]);
            return {
                success: true,
                data: `Customer ${this.#owId} deleted`,
                error: null,
                type: 'notification-deleteCustomer',
                origin: 'OwnerClass-deleteCustomer()',
                show: true,
            }
        } catch (err) {
            return {
                success: false,
                data: `Customer ${this.#owId} deleted`,
                error: err,
                type: 'error-deleteCustomer',
                origin: 'OwnerClass-deleteCustomer()',
                show: true,
            }
        }
    }

    //static Methods
    static buildObject(obj) {
        // console.log(obj);
        return new Owner(
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