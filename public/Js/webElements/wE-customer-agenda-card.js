class customerAgenda extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        const styleLink = document.createElement('link');
        styleLink.href = "/Css/customer-agenda.css",
            styleLink.rel = "stylesheet",
            styleLink.type = "text/css"
            , this.shadowRoot.append(styleLink)
            ;
        this.cardContainerResult = document.createElement('div');
        this.cardContainerResult.classList.add('customer-grid');
        this.cardContainerResult.dataset.cardContainerResult = '';

    }


    connectedCallback() {
        this.shadowRoot.addEventListener('click', (e) => {
            let customerId;
            if (e.target.matches('[data-action="edit"]')) {
                customerId = e.target.closest('[data-card-container]').dataset.costumerId;
                console.log("Clicked edit", customerId);
            }
            if (e.target.matches('[data-action="view"]')) {
                customerId = e.target.closest('[data-card-container]').dataset.costumerId;
                console.log("Clicked view", customerId);
            }
            if (e.target.matches('[data-action="delete"]')) {
                customerId = e.target.closest('[data-card-container]').dataset.costumerId;
                console.log("Clicked delete",customerId);
                this.deleteCustomer(customerId);
                this.removeCustomer(customerId);
            }
        });
    }

    set data(cusData) {
        console.log(cusData);
        Object.values(cusData).forEach(cus => {
            this.cardContainerResult.appendChild(this.createCard(cus));
        });
        this.shadowRoot.appendChild(this.cardContainerResult);
    }

    set newData(newCus) {
        // console.log(newCus);
        this.cardContainerResult.appendChild(this.createCard(newCus));
        this.shadowRoot.appendChild(this.cardContainerResult);
    }

    removeCustomers(){
        Array.from(this.cardContainerResult.children).forEach(child => {
            // console.log(child[1].attributes[2].value);
            child.remove();
            
        });
    }

    removeCustomer(customerId){
        // console.log(customerId,this.cardContainerResult.children);
         Array.from(this.cardContainerResult.children).forEach(child => {
            console.log(child.attributes[2].value);
            if (child.attributes[2].value === customerId) {
                child.remove();
            }
            
        });
    }

    createCard(cus) {
        //Costumer card
        const customerCard = document.createElement('div');
        customerCard.classList.add('customer-card');
        customerCard.dataset.cardContainer = '';

        customerCard.dataset.costumerId = cus['cos_Id'];

        //Costumer Photo
        const cusAvatar = document.createElement('img');
        cusAvatar.classList.add('customer-avatar');
        cusAvatar.src = './getImage/neutral';

        cusAvatar.alt = cus['cos_Id'].concat('-avatar');

        //Customer info div
        const cusInfoDiv = document.createElement('div');
        cusInfoDiv.classList.add('customer-info');
        const cusName = document.createElement('h3');
        const cusNumber = document.createElement('p');
        cusName.classList.add('customer-name');
        cusNumber.classList.add('customer-phone');

        cusName.textContent = cus.cosName;
        cusNumber.textContent = cus.cosPhone;

        //Customer actions Div
        const cusActionBtnDiv = document.createElement('div');
        cusActionBtnDiv.classList.add('customer-actions');

        //buttons actions
        const editBtn = document.createElement('button');
        const viewBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        editBtn.textContent = 'Edit';
        editBtn.classList.add('btn');
        editBtn.classList.add('edit');
        editBtn.dataset.action = 'edit';

        viewBtn.textContent = 'view';
        viewBtn.classList.add('btn');
        viewBtn.classList.add('view');
        viewBtn.dataset.action = 'view';

        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('delete');
        deleteBtn.dataset.action = 'delete';


        //Appending

        cusInfoDiv.appendChild(cusName);
        cusInfoDiv.appendChild(cusNumber);

        cusActionBtnDiv.appendChild(editBtn);
        cusActionBtnDiv.appendChild(viewBtn);
        cusActionBtnDiv.appendChild(deleteBtn);

        customerCard.appendChild(cusAvatar);
        customerCard.appendChild(cusInfoDiv);
        customerCard.appendChild(cusActionBtnDiv);

        return customerCard;
    }

    async deleteCustomer(customer) {
        console.log(customer);
        const del = await fetch(`/Customers/Delete/${customer}`, {
            method: 'Delete'
        }
        );
        const res = await del.json();
        // console.log(res);
        // this.sendNotification(res,res.show);
    }

}

////////////////Remember to change the type= module in the html file
customElements.define('customer-agenda-result-card', customerAgenda);


