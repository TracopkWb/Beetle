import customerList from './js-updateIndexDB.js';
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const cardContainerWE = document.querySelector('customer-agenda-result-card');

let filtered = [];
// let customerList = [];
// console.log(customerList);
getCustomerList();


function getCustomerList() {
    // indexDB = [];
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

////////////Search filtering
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const debounceSearch = debounce(filterCustomers, 500);
searchInput.addEventListener("input", debounceSearch);

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



// /////////////Notification Js
// document.addEventListener("notify", (e) => {
//     // console.log(e);
//     console.log(e.detail);
//     showNotification(e.detail.type, e.detail.message, e.detail.data, e.detail.origin);
// });


// function showNotification(notification) {
//     console.log(notification);
//     const container = document.getElementById("notifications-container");

//     const notDiv = document.createElement("div");
//     notDiv.classList.add("notification");

//     // Add type-specific class
//     const event = notification.type.split('-')[0]?.trim();  // <-- trim
//     const eventType = notification.type.split('-')[1]?.trim();  // <-- trim
//     console.log(eventType);
    
//     console.log("Applied classes:", notDiv.className);
    
//     // Message handling
//     if (event === 'error') {
//         notDiv.classList.add(event);
//         notDiv.textContent = `${notification.error}`;
//     }
//     if (event === 'notification') {
//         notDiv.classList.add(eventType);
//         if (eventType === 'delete') {
//             notDiv.textContent = `The customer ${notification.data.cosName} has been deleted`;
//         } else if (eventType === 'add') {
//             notDiv.textContent = `${notification.message}`;
//         }
//     }


//     container.appendChild(notDiv);

//     // Fade in
//     setTimeout(() => notDiv.classList.add("show"), 10);

//     // Remove after 2 sec
//     setTimeout(() => {
//         notDiv.classList.remove("show");
//         setTimeout(() => notDiv.remove(), 500);
//     }, 2000);
// }

// ///////////////Updating indexedDB every time there is a modification (e.i. deletion and addition)
// async function updateCustomersDiff(type, data) {
//     const dbReq = indexedDB.open("CustomerList", 1);
//       console.log(data,dbReq);
//     dbReq.onsuccess = (event) => {
//         const db = event.target.result;
//         const tx = db.transaction("customers", "readwrite");
//         const store = tx.objectStore("customers");
//         console.log(db);
//         // Delete removed customers
//         if (type === "delete") {
//             console.log("Deleting ", data);
//             store.delete(data["cos_Id"]);
//         }

//         if (type === "add") {
//             // Add or update new/changed customers
//             console.log("Adding ", data);
//             store.put(data);
//         }
//         store.getAll().onsuccess = (e) => {
//             console.log("Current IndexedDB:", e.target.result);
//         };
//     };
// }

// const evtSource = new EventSource("/Rays/Admin/events");
// evtSource.onmessage = async (e) => {
//     const notification = JSON.parse(e.data);
//     const event = notification.type.split("-")[0];
//     const eventType = notification.type.split("-")[1];
//     console.log(notification, eventType);
//     if (event === 'notification') {
//         switch (eventType) {
//             case "add":
//                 await updateCustomersDiff(notification, notification.data);
//                 break;
//             case "delete":
//                 await updateCustomersDiff(notification, notification.data);
//                 break;
//             default:
//                 break;
//         }
//     }
//     showNotification(notification);
// };