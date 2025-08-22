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
        // this.shadowRoot.append(this.cardContainerResult);
    }


    connectedCallback() {
        // this.render();
    }

    set data(cusData) {
        // this.render(cusData);
        // // console.log("Project Data: ", projectData);
        Object.values(cusData).forEach(cus => {
            // console.log(cus);
            this.cardContainerResult.appendChild(this.createCard(cus));
        });
        this.shadowRoot.appendChild(this.cardContainerResult);
    }
    
    set newData(newCus) {
        // console.log(newCus);
        this.cardContainerResult.appendChild(this.createCard(newCus));
        this.shadowRoot.appendChild(this.cardContainerResult);
    }

    async getAgenda() {
        const getCostumers = await fetch('/Costumers/getCostumers', {
            method: 'GET'
        });
        const res = await getCostumers.json();
        return res;
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

        cusName.textContent = cus.cosName;
        cusName.classList.add('customer-name');

        cusNumber.textContent = cus.cosPhone;
        cusNumber.classList.add('customer-phone');

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
}

////////////////Remember to change the type= module in the html file
customElements.define('customer-agenda-card', customerAgenda);


