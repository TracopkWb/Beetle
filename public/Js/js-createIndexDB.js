//////////////////////////////////////Getting all data from DB and storing it in IndexedDB
let db;
//Creating a Hash to check update
const hashedKey = localStorage.getItem("lastHash");
console.log(hashedKey);
//Initialize indexDB
const request = indexedDB.open("CustomerList",1);
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


//Fetch the data and add it to DB
async function getCustomerFromServer(hash) {
    const getCustomerList = await fetch(
        `/Rays/Admin/Customers/CustomersList/${hash}`,
        {
            method: "GET",
        }
    );
    const res = await getCustomerList.json();
    console.log(res);
    const openDB = db.transaction("customers", "readwrite");
    const store2DB = openDB.objectStore("customers");
    //Checks for upto date flag (true == out of date, false == up to date)
    if (res.success) {
        res.data.forEach((c) => store2DB.put(c));
        //Get new hash and save it in the localStorage
        localStorage.setItem("lastHashed", res.hash);
        console.log("lastHashed", res.hash);
    }
}