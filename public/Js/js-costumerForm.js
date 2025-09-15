window.addEventListener('DOMContentLoaded', () => {

});

const sendButton = document.querySelector('[data-send-form]'),
    costumerForm = document.querySelector('[data-costumer-form]');
console.log(sendButton, costumerForm);

sendButton.addEventListener('click', async (e) => {
    // alert(1);
    e.preventDefault();
    const formData = new FormData(costumerForm);
    if (!costumerForm.checkValidity()) {
        costumerForm.reportValidity();
        return;
    }
    const costumerData = Object.fromEntries(formData.entries());
    console.log(formData, costumerData);

    const sendingData = await fetch('/Rays/Admin/Customers/Post/newCustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(costumerData),
    });

    const res = await sendingData.json();
    console.log(res);
    showNotification(res);
    costumerForm.reset();
});

const phoneInput = document.getElementById('phoneInput');

phoneInput.addEventListener('input', (e) => {
    let digitsOnly = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters

    if (digitsOnly.length > 10) digitsOnly = digitsOnly.slice(0, 10); // Limit to 10 digits

    //American Phone Numbers format
    let formatted = digitsOnly;
    if (digitsOnly.length >= 7) {
        formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    } else if (digitsOnly.length >= 4) {
        formatted = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
    }

    //Mexican Phone Numbers format
    // const formatted = digitsOnly.match(/.{1,2}/g)?.join('-') || '';
    e.target.value = formatted;
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