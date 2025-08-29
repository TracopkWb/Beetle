
///////////////////////////////////////////////////////////////Search Bar prediction
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const cardContainerWE = document.querySelector('customer-agenda-result-card');

let customerList = [];
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

// function searchByIndex(db,indexName,term){
//     return new Promise((res, rej)=>{
//         //db will be the opened Db
//         //transaction is the readonly setup
//         const transaction = db.transaction('customers','readonly');
//         //store is the variable where all data will be saved, const customers
//         const store = transaction.objectStore('customers');
//         const index = store.index(indexName); //Here is where cosName, cosPhone goes

//         //Creare the term similar to use like %a
//         const range = IDBKeyRange.bound(
//             term,
//             term + "\uffff",
//         );
//         const results = [];

//         index.openCursor(range).onsuccess= (e)=>{
//             const cursor = e.target.result;
//             console.log(cursor);
//             if(cursor){
//                 results.push(cursor.value);
//                 cursor.continue();
//             }
//         };

//         transaction.oncomplete = () => res(results);
//         transaction.onerror = (err) => rej(err);
//     });
// }

// function searchByKey(db, term) {
//   return new Promise((resolve, reject) => {
//     const tx = db.transaction("customers", "readonly");
//     const store = tx.objectStore("customers");

//     const range = IDBKeyRange.bound(
//       term, 
//       term + "\uffff"
//     );
//     console.log(term, range);

//     const results = [];
//     store.openCursor(range).onsuccess = (e) => {
//       const cursor = e.target.result;
//       console.log(cursor);
//       if (cursor) {
//         results.push(cursor.value);
//         cursor.continue();
//       }
//     };

//     tx.oncomplete = () => resolve(results);
//     tx.onerror = (err) => reject(err);
//   });
// }

// async function searchCustomers(term) {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open("CustomerList", 1);

//     request.onsuccess = async (e) => {
//       const db = e.target.result;
//       term = term.toLowerCase();

//       try {
//         const [byName, byPhone, byId] = await Promise.all([
//         //   searchByIndex(db, 'cosName', term),
//           searchByIndex(db, "cosPhone", term),
//           searchByKey(db, term) // primary key search
//         ]);

//         resolve({
//           names: byName,
//           phones: byPhone,
//           ids: byId
//         });
//       } catch (err) {
//         reject(err);
//       }
//     };

//     request.onerror = (err) => reject(err);
//   });
// }

// document.querySelector("#search").addEventListener("input", async (e) => {
//   const term = e.target.value.trim();
//   if (!term) return;

//   const results = await searchCustomers(term);

//   console.log("By Name:", results.names);
//   console.log("By Phone:", results.phones);
//   console.log("By ID:", results.ids);
// });

///////////////////////////Nothing
document.getElementById("reload").addEventListener("click", (e) => {
    e.preventDefault();
    //   console.log(localStorage.getItem("lastHashed"));
    //   getCustomerFromServer(localStorage.getItem("lastHashed"));
});