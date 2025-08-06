window.addEventListener('DOMContentLoaded', () => {

});

const sendButton = document.querySelector('[data-send-form]'),
    costumerForm = document.querySelector('[data-costumer-form]');
console.log(sendButton,costumerForm);

sendButton.addEventListener('click', async (e)=>{
    // alert(1);
    e.preventDefault();
    const formData = new FormData(costumerForm);
    console.log(formData.get("cos_Phone"));
    console.log(formData.getAll());

    const sendingData = await fetch('/Forms/Costumer/Data',{
        method : 'POST',
        body: formData
    });

    const res = await sendingData.json();
    console.log(res);
})


