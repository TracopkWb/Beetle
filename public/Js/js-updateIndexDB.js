///////////////Updating indexedDB every time there is a modification (e.i. deletion and addition)
let customerList = [];
const cardContainerWE = document.querySelector('customer-agenda-result-card');
const carRegistrationWE = document.querySelector('car-registration-form');

async function updateCustomersDiff(type, data) {
    const dbReq = indexedDB.open("CustomerList", 1);
    console.log(type);
    dbReq.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction("customers", "readwrite");
        const store = tx.objectStore("customers");

        // Delete removed customers
        if (type === "delete") {
            console.log("Deleting: ", data);
            store.delete(data["cos_Id"]);
            if (cardContainerWE) {
                cardContainerWE.removeCustomer(data["cos_Id"]);
            }
            console.log(carRegistrationWE);
            if (carRegistrationWE) {
                carRegistrationWE.updateCustomersDiff(type,data);
            }
            console.log(customerList);
        }

        if (type === "add") {
            // Add or update new/changed customers
            console.log("Adding2:", data);
            store.put(data);
            customerList.push(data);
            if (cardContainerWE) {
                cardContainerWE.newData = data;
            }
            console.log(carRegistrationWE);
            if (carRegistrationWE) {
                carRegistrationWE.updateCustomersDiff(type,data);
            }
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
    console.log(notification, 'event:', event, 'type:', eventType);
    if (event === 'notification') {
        switch (eventType) {
            case "add":
                await updateCustomersDiff(eventType, notification.data);
                break;
            case "delete":
                await updateCustomersDiff(eventType, notification.data);
                customerList = customerList.filter(cus => cus.cos_Id !== notification.data.cos_Id);
                break;
            default:
                break;
        }
    }
    showNotification(notification);
};

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

export default customerList;