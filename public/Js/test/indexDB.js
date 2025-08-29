//////////////////////////////////////Getting all data from DB and storing it in IndexedDB
let db;
const cardContainerWE = document.querySelector('customer-agenda-result-card');
//Creating a Hash to check update
const hashedKey = localStorage.getItem("lastHash");
console.log('Hash: ',hashedKey);
//Initialize indexDB
const request = indexedDB.open("CustomerList", 1);
//Create IndexDB with specific fields
request.onupgradeneeded = (event) => {
    db = event.target.result;
    const store = db.createObjectStore("customers", { keyPath: "cos_Id" });
    store.createIndex("cosName", "cosName", { unique: false });
    store.createIndex("cosPhone", "cosPhone", { unique: false });
};
//Select DB to add data
request.onsuccess = async (event) => {
    db = event.target.result;
    console.log("Database ready");
    getCustomerFromServer(hashedKey);
    //   console.log(await getCustomerFromServer());
};

///////Fetch the data and add oit t DB
async function getCustomerFromServer(hash) {
    const getCustomerList = await fetch(
        `/Customers/getCustomersList/${hash}`,
        {
            method: "GET",
        }
    );
    const res = await getCustomerList.json();
    console.log(res);
    const openDB = db.transaction("customers", "readwrite");
    const store2DB = openDB.objectStore("customers");
    cardContainerWE.data = res.data;
    //Checks for upto date flag (true == out of date, false == up to date)
    if (res.success) {
        res.data.forEach((c) => store2DB.put(c));
        //Get new hash and save it in the localStorage
        localStorage.setItem("lastHashed", res.hash);
    }
}


///////////////Updating indexedDB every time there is a modification (e.i. deletion and addition)
async function updateCustomersDiff(type, data) {
    const dbReq = indexedDB.open("CustomerList", 1);
    //   console.log(diff);
    dbReq.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction("customers", "readwrite");
        const store = tx.objectStore("customers");

        // Delete removed customers
        if (type === "delete") {
            console.log("Deleting ", data);
            store.delete(data["cos_Id"]);
            
        }

        if (type === "add") {
            // Add or update new/changed customers
            console.log("Adding ", data);
            store.put(data);
            cardContainerWE.newData = data;
        }
        store.getAll().onsuccess = (e) => {
            console.log("Current IndexedDB:", e.target.result);
        };
    };
}

const evtSource = new EventSource("./events");
evtSource.onmessage = async (event) => {
    const notification = JSON.parse(event.data);
    const notificationType = notification.type.split("-")[1];
    console.log(notification, notificationType);
    switch (notificationType) {
        case "add":
            await updateCustomersDiff(notificationType, notification.data);

            break;
        case "delete":
            await updateCustomersDiff(notificationType, notification.data);
            break;

        default:
            break;
    }
};
