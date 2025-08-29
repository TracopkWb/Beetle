// const mainContainer = document.querySelector('[data-costumer-container]');
// const filterContainer = document.querySelector('[data-costumer-container]');
// const cardContainer = document.querySelector('[data-costumer-card-result]');
// const cardContainerWE = document.querySelector('customer-agenda-result-card');

// console.log(mainContainer, filterContainer, cardContainerWE, cardContainerWE);

// const getAgenda2 = async () => {
//     const getCostumers = await fetch('/Customers/getCustomers', {
//         method: 'GET'
//     });
//     const res = await getCostumers.json();
//     console.log(typeof (res.data));
//     cardContainerWE.data = res.data;

// }
// getAgenda2();



document.addEventListener("notify", (e) => {
    // console.log(e);
    console.log(e.detail);
    showNotification(e.detail.type, e.detail.message, e.detail.data, e.detail.origin);
});
function showNotification(notification, data) {
    const container = document.getElementById("notifications-container");
    console.log(notification.type.split('-')[1]);
    const not = document.createElement("div");
    if (notification.type.split('-')[1] == 'error') {
        not.textContent = `${notification.data}`;
        not.style.backgroundColor = "#ec0101e7";

    } if (notification.type.split('-')[1] === 'delete') {
        not.textContent = `The customer ${notification.data.cosName} has been deleted`;
        not.style.backgroundColor = "#e64514e7";
    } if (notification.type.split('-')[1] === 'add') {
        // console.log(data);
        not.textContent = `The customer ${notification.data.cosName} has been saved`;
        not.style.backgroundColor = "#4caf50";
    }
    not.style.cssText = `
        color: white;
        padding: 10px 20px;
        margin-top: 10px;
        border-radius: 8px;
        font-family: sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    container.appendChild(not);

    // Fade in
    setTimeout(() => {
        not.style.opacity = "1";
    }, 10);

    // Remove after 10 sec
    setTimeout(() => {
        not.style.opacity = "0";
        setTimeout(() => not.remove(), 500);
    }, 2000);
}
const evtSource = new EventSource("./events");
evtSource.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    const notificationType = notification.type.split('-')[1];
    console.log(notification, notificationType);
    switch (notificationType) {
        case 'add':
            cardContainerWE.newData = notification.data;
            showNotification(notification, notification.show);
            break;
        case 'delete':
            cardContainerWE.removeCustomer(notification.data['cos_Id']);
            showNotification(notification, notification.show);
            break;

        default:
            break;
    }
};