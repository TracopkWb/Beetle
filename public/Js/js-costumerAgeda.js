
const mainContainer = document.querySelector('[data-costumer-container]');
const filterContainer = document.querySelector('[data-costumer-container]');
const cardContainer = document.querySelector('[data-costumer-card-result]');
const cardContainerWE = document.querySelector('customer-agenda-card');

console.log(mainContainer, filterContainer, cardContainer, cardContainerWE);

// const getAgenda = async () => {
//     const getCostumers = await fetch('/Costumers/getCostumers', {
//         method: 'GET'
//     });
//     const res = await getCostumers.json();
//     console.log(typeof (res.data));
//     Object.entries(res.data).forEach(cus => {
//         // console.log(cus[1]);
//         //Costumer card
//         const customerCard = document.createElement('div');
//         customerCard.classList.add('customer-card');
//         customerCard.dataset.costumerId = cus[1]['cos_Id'];

//         //Costumer Photo
//         const cusAvatar = document.createElement('img');
//         cusAvatar.classList.add('customer-avatar');
//         cusAvatar.src = './getImage/neutral';
//         cusAvatar.alt = cus[1]['cos_Id'].concat('-avatar');

//         //Customer info div
//         const cusInfoDiv = document.createElement('div');
//         cusInfoDiv.classList.add('customer-info');
//         const cusName = document.createElement('h3');
//         const cusNumber = document.createElement('p');

//         cusName.textContent = cus[1].cosName;
//         cusName.classList.add('customer-name');

//         cusNumber.textContent = cus[1].cosPhone;
//         cusNumber.classList.add('customer-phone');

//         //Customer actions Div
//         const cusActionBtnDiv = document.createElement('div');
//         cusActionBtnDiv.classList.add('customer-actions');

//         //buttons actions
//         const editBtn = document.createElement('button');
//         const viewBtn = document.createElement('button');
//         const deleteBtn = document.createElement('button');

//         editBtn.textContent = 'Edit';
//         editBtn.classList.add('btn');
//         editBtn.classList.add('edit');
//         editBtn.dataset.action = 'edit';

//         viewBtn.textContent = 'view';
//         viewBtn.classList.add('btn');
//         viewBtn.classList.add('view');
//         viewBtn.dataset.action = 'view';

//         deleteBtn.textContent = 'Delete';
//         deleteBtn.classList.add('btn');
//         deleteBtn.classList.add('delete');
//         deleteBtn.dataset.action = 'delete';


//         //Appending

//         cusInfoDiv.appendChild(cusName);
//         cusInfoDiv.appendChild(cusNumber);

//         cusActionBtnDiv.appendChild(editBtn);
//         cusActionBtnDiv.appendChild(viewBtn);
//         cusActionBtnDiv.appendChild(deleteBtn);

//         customerCard.appendChild(cusAvatar);
//         customerCard.appendChild(cusInfoDiv);
//         customerCard.appendChild(cusActionBtnDiv);

//         cardContainer.appendChild(customerCard);
//     })

// }
// // getAgenda();


const getAgenda2 = async () => {
    const getCostumers = await fetch('/Customers/getCustomers', {
        method: 'GET'
    });
    const res = await getCostumers.json();
    console.log(typeof (res.data));
    cardContainerWE.data = res.data;

}
getAgenda2();

const evtSource = new EventSource("./events");

evtSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    const newCustomer = {
        cos_Id: data.formatted.id,
        cosName: data.formatted.name,
        cosPhone: data.formatted.phone,
    }
    console.log(newCustomer);
    cardContainerWE.newData = newCustomer;
};
