
//////////////////////////////////////Getting all data from DB and storing it in IndexedDB
let db;
let customerList = [];
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
    console.log(store)
};
//Select DB to add data
request.onsuccess = async (event) => {
    db = event.target.result;
    console.log("Database ready");
    getCustomerFromServer(hashedKey);
    //   console.log(await getCustomerFromServer());
};

///////Fetch the data and add it t DB
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
    
    // cardContainerWE.data = res.data;
    
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
            cardContainerWE.removeCustomer(data["cos_Id"]);
            console.log(customerList);
        }
        
        if (type === "add") {
            // Add or update new/changed customers
            console.log("Adding ", data);
            store.put(data);
            cardContainerWE.newData = data;
            customerList.push(data);
            console.log(customerList);
        }
        store.getAll().onsuccess = (e) => {
            console.log("Current IndexedDB:", e.target.result);
        };
    };
}

const evtSource = new EventSource("/Rays/Admin/events");
evtSource.onmessage = async (e) => {
    const notification = JSON.parse(e.data);
    const event = notification.type.split("-")[0];
    const eventType = notification.type.split("-")[1];
    console.log(notification, eventType);
    if (event === 'notification') {
        switch (eventType) {
            case "add":
                await updateCustomersDiff(eventType, notification.data);
                break;
            case "delete":
                customerList = customerList.filter(cus => cus.cos_Id !== notification.data.cos_Id);
                await updateCustomersDiff(eventType, notification.data);
                break;
            default:
                break;
        }
    }
    showNotification(notification);
};



///////////////////////////////////////////////////////////////Search Bar prediction
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
// const cardContainerWE = document.querySelector('customer-agenda-result-card');

let filtered = [];

getCustomerList();
// show all initially
// renderResults(customerList);


function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const debounceSearch = debounce(filterCustomers, 500);
searchInput.addEventListener("input", debounceSearch);

function getCustomerList() {
    customerList = [];
    const iniDB = indexedDB.open('CustomerList', 1);
    iniDB.onsuccess = (e) => {
        const db = e.target.result
        const tx = db.transaction('customers', 'readonly');
        const objectStore = tx.objectStore('customers');
        const cursorRequest = objectStore.openCursor();
        let key;
        cursorRequest.onsuccess = (e) => {
            const cursor = e.target.result;
            // console.log(cursor,e.target);
            if (cursor) {
                // console.log(cursor);
                // console.log(cursor.primaryKey);
                key = cursor.primaryKey;
                const dataRequest = objectStore.get(key);
                dataRequest.onsuccess = (e) => {
                    const data = e.target.result
                    if (data) {
                        // console.log(data);
                        customerList.push(data);
                        cardContainerWE.newData = data;
                    }
                }
                cursor.continue();
            }
        }
        console.log(customerList);
    };
}

function renderResults(filtered) {
    // console.log(filtered);
    Object.entries(filtered).forEach(card => {
        cardContainerWE.newData = card[1];
    });
}

function filterCustomers() {
    cardContainerWE.removeCustomers();
    const query = searchInput.value.toLowerCase();

    filtered = customerList.filter(c =>
        c['cos_Id'].toLowerCase().includes(query) ||
        c.cosName.toLowerCase().includes(query) ||
        c.cosPhone.toLowerCase().includes(query)
    );
    renderResults(filtered);
}

function removeChildren(parent) {
    console.log(parent);
}


document.addEventListener("notify", (e) => {
    // console.log(e);
    console.log(e.detail);
    showNotification(e.detail.type, e.detail.message, e.detail.data, e.detail.origin);
});


function showNotification(notification) {
    console.log(notification);
    const container = document.getElementById("notifications-container");

    const notDiv = document.createElement("div");
    notDiv.classList.add("notification");

    // Add type-specific class
    const event = notification.type.split('-')[0]?.trim();  // <-- trim
    const eventType = notification.type.split('-')[1]?.trim();  // <-- trim
    console.log(eventType);
    
    console.log("Applied classes:", notDiv.className);
    
    // Message handling
    if (event === 'error') {
        notDiv.classList.add(event);
        notDiv.textContent = `${notification.error}`;
    }
    if (event === 'notification') {
        notDiv.classList.add(eventType);
        if (eventType === 'delete') {
            notDiv.textContent = `The customer ${notification.data.cosName} has been deleted`;
        } else if (eventType === 'add') {
            notDiv.textContent = `${notification.message}`;
        }
    }


    container.appendChild(notDiv);

    // Fade in
    setTimeout(() => notDiv.classList.add("show"), 10);

    // Remove after 2 sec
    setTimeout(() => {
        notDiv.classList.remove("show");
        setTimeout(() => notDiv.remove(), 500);
    }, 2000);
}
