// console.log(document.URL);
// const Url = new URL(document.URL);
// console.log(Url.href);
// console.log(Url.pathname.split('/')[3]);

// async function getCustomerInfo(customerId){
//     const getReq = await fetch(`${customerId.href}`,{
//         method: 'GET'
//     });

//     const res = await getReq.json();
//     console.log(res);
// }

// const addClientBtn = document.querySelector('[data-add-client]');
const addServiceBtn = document.querySelector('[data-add-service]');
const addMechanicBtn = document.querySelector('[data-add-mechanic]');
// const addClientBtn = document.querySelector('[data-add-client]');
// console.log(addClientBtn);




addServiceBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    alert('Add service button still in progress');
    // const newUserModal = document.createElement('add-new-customer-card');
    // document.body.appendChild(newUserModal);
});

addMechanicBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    alert('Add Mechanic btn still in progress');
    confirm("111");
    // const newUserModal = document.createElement('add-new-customer-card');
    // document.body.appendChild(newUserModal);
});

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