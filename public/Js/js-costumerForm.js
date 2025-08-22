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

    const sendingData = await fetch('/Forms/Customer/Data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(costumerData),
    });

    const res = await sendingData.json();
    console.log(res);
    costumerForm.reset();
});

const phoneInput = document.getElementById('phoneInput');

phoneInput.addEventListener('input', (e) => {
    let digitsOnly = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters

    if (digitsOnly.length > 10) digitsOnly = digitsOnly.slice(0, 10); // Limit to 10 digits

    //American Phone Numbers format
    let formatted = digitsOnly;
    if (digitsOnly.length >= 7) {
        formatted = `${digitsOnly.slice(0,3)}-${digitsOnly.slice(3,6)}-${digitsOnly.slice(6)}`;
    } else if (digitsOnly.length >= 4) {
        formatted = `${digitsOnly.slice(0,3)}-${digitsOnly.slice(3)}`;
    }

    //Mexican Phone Numbers format
    // const formatted = digitsOnly.match(/.{1,2}/g)?.join('-') || '';
    e.target.value = formatted;
});


