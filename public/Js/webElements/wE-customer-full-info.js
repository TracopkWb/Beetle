class customerFullData extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        const styleLink = document.createElement('link');
        styleLink.href = "/Css/customer-data-visualization.css",
            styleLink.rel = "stylesheet",
            styleLink.type = "text/css",
            this.shadowRoot.append(styleLink);
        this._data;
        // this.isEditing = false;

        //card
        const customerFullDataCard = document.createElement('div');
        customerFullDataCard.classList.add('card-container');
        customerFullDataCard.dataset.cxIdCard = "";
        const headerCard = document.createElement('div');
        headerCard.classList.add('card-header');

        const imageHeader = document.createElement('img');
        imageHeader.dataset.cxData = '';


        const cxInfoSection = document.createElement('div');
        cxInfoSection.classList.add('info');

        const cxNameInfoSection = document.createElement('div');
        cxNameInfoSection.classList.add('card-name-section');

        const cxName = document.createElement('h2');
        cxName.dataset.cxName = '';
        cxName.classList.add('view-element')

        //Cx Name input element
        const cxNameInput = document.createElement('input');
        cxNameInput.type = 'text';
        cxNameInput.classList.add('edit-element');
        cxNameInput.classList.add('hidden-element');
        cxNameInput.setAttribute('name', 'cxNameInput')

        //ID section
        const cxId = document.createElement('p');
        cxId.dataset.cxId = '';


        //Cx Phone number element
        const cxPhone = document.createElement('p');
        cxPhone.dataset.cxPhone = '';
        cxPhone.classList.add('view-element');

        //Cx Phone input element
        const cxPhoneInput = document.createElement('input');
        cxPhoneInput.type = 'text';
        cxPhoneInput.classList.add('edit-element');
        cxPhoneInput.classList.add('hidden-element');
        cxPhoneInput.setAttribute('name', 'cxPhoneInput');

        const bodyCard = document.createElement('div');
        bodyCard.classList.add('card-body');

        const bodyTitleSection = document.createElement('div');
        bodyTitleSection.classList.add('cars-title');
        const bodyTitleSpan = document.createElement('span');
        bodyTitleSpan.textContent = 'Cars';

        const carListSection = document.createElement('ul');
        carListSection.classList.add('cars-list');

        // console.log(cxData.cusCars,cxData.cusCars.length);
        // this.populateCarsInfo(carListSection,cxData.cusCars);

        // const buttonSection = document.createElement('div');
        // buttonSection.classList.add('card-buttons-section');

        const cxButtonEdit = document.createElement('button');
        cxButtonEdit.dataset.cxOptionButton = 'Edit';
        //data-cx-option-button
        cxButtonEdit.classList.add('button', 'edit-button', 'view-element');
        cxButtonEdit.textContent = 'Edit';

        const cxButtonSave = document.createElement('button');
        cxButtonSave.dataset.cxOptionButton = 'Save';
        //data-cx-option-button
        cxButtonSave.classList.add('button', 'save-button', 'edit-element');
        cxButtonSave.textContent = 'Save';

        // Appending container
        cxNameInfoSection.appendChild(cxName);
        cxNameInfoSection.appendChild(cxNameInput);
        cxNameInfoSection.appendChild(cxId);

        cxInfoSection.appendChild(cxNameInfoSection);
        cxInfoSection.appendChild(cxPhone);
        cxInfoSection.appendChild(cxPhoneInput);
        cxInfoSection.appendChild(cxButtonEdit);
        cxInfoSection.appendChild(cxButtonSave);

        headerCard.appendChild(imageHeader);
        headerCard.appendChild(cxInfoSection);
        bodyTitleSection.appendChild(bodyTitleSpan);
        bodyCard.appendChild(bodyTitleSection);
        bodyCard.appendChild(carListSection);
        // buttonSection.appendChild(editButton);
        customerFullDataCard.appendChild(headerCard);
        customerFullDataCard.appendChild(bodyCard);
        // customerFullDataCard.appendChild(buttonSection);
        this.fullCustomerCard = customerFullDataCard;

    }

    connectedCallback() {
        this.shadowRoot.addEventListener('click', (e) => {
            let cxSelectedOptionIs = e.target['dataset']['cxOptionButton'];

            if (cxSelectedOptionIs === 'Edit') {
                let cxId = e.target['dataset']['cxId'];
                console.log(cxId);
                this.toggleEditMode(true);
            }

            if (cxSelectedOptionIs === 'Save') {
                let cxId = e.target['dataset']['cxId'];
                console.log(cxId);
                this.toggleEditMode(false);
            }
        });

    }

    set data(cxData) {
        this.updateCard(cxData, this.fullCustomerCard);
        this.shadowRoot.appendChild(this.fullCustomerCard);
        // console.log(this.renderSkeleton())
        // this.renderSkeleton();
        // console.log("Project Data: ", projectData);
    }

    updateCard(cxData) {
        // console.log(this.fullCustomerCard.querySelector('img'));

        const cxIdSection = this.fullCustomerCard;
        cxIdSection.setAttribute('data-cx-id-card', `${cxData.cos_Id}`);

        const cxImg = this.fullCustomerCard.querySelector('img');
        cxImg.src = `https://placehold.co/128x128?text=${cxData.cos_Id.slice(0, 4)}`;
        cxImg.alt = `${cxData.cos_Id}`;


        const cxName = this.fullCustomerCard.querySelector('[data-cx-name]');
        cxName.textContent = `${cxData.cosName}`;

        //Cx name input element
        const cxNameInput = this.fullCustomerCard.querySelector('[name = "cxNameInput"]');
        cxNameInput.setAttribute('value', `${cxData.cosName}`)
        console.log(cxNameInput);

        //Cx phone number input element
        const cxPhoneInput = this.fullCustomerCard.querySelector('[name = "cxPhoneInput"]');
        cxPhoneInput.setAttribute('value', `${cxData.cosPhone}`)
        console.log(cxPhoneInput);


        const cxId = this.fullCustomerCard.querySelector('[data-cx-id]');
        cxId.textContent = `${cxData.cos_Id}`;

        const cxPhone = this.fullCustomerCard.querySelector('[data-cx-phone]');
        cxPhone.textContent = `${cxData.cosPhone.slice(0, 3)} ${cxData.cosPhone.slice(3, 6)} ${cxData.cosPhone.slice(6, 10)}`;

        const cxButtonEditOption = this.fullCustomerCard.querySelector('[data-cx-option-button = "Edit"]');
        // cxButtonEditOption.setAttribute('data-cx-option-button', 'edit');
        cxButtonEditOption.setAttribute('data-cx-id', `${cxData.cos_Id}`);

        const cxButtonSaveOption = this.fullCustomerCard.querySelector('[data-cx-option-button = "Save"]');
        // cxButtonSaveOption.setAttribute('data-cx-option-button', 'save');
        cxButtonSaveOption.setAttribute('data-cx-id', `${cxData.cos_Id}`);


        const carListSectionDiv = this.fullCustomerCard.querySelector(".cars-list");
        this.populateCarsInfo(carListSectionDiv, cxData.cusCars);

    }

    toggleEditMode(showInputs) {
            const editableElements = this.fullCustomerCard.querySelectorAll('.edit-element')

            const fixedElements = this.fullCustomerCard.querySelectorAll('.view-element')
            fixedElements.forEach(el => el.classList.toggle('hidden-element', showInputs));

            editableElements.forEach(el => el.classList.toggle('hidden-element', !showInputs));
    }


    populateCarsInfo(section, cars) {
        while (section.firstChild) {
            section.removeChild(section.firstChild);
        }
        if (cars.length === 0) {
            const noCarFoundText = document.createElement('p');
            noCarFoundText.textContent = 'No cars Added Yet!';
            section.appendChild(noCarFoundText)
        }
        cars.map(car => {
            console.log(car);

            const carDetailSec = document.createElement('li');
            carDetailSec.classList.add('car-item');

            const carImg = document.createElement('img');
            carImg.src = `https://placehold.co/96x60?text=${car.carModel}`;
            carImg.alt = `${car.car_id}`;

            const carDetailCard = document.createElement('div');
            carDetailCard.classList.add('car-details');

            const carInfo = document.createElement('p')
                // ,carVIN = document.createElement('p')
                , carLicensePlate = document.createElement('p');

            carInfo.textContent = `${car.carYear} ${car.carManufacturer} ${car.carModel}`;
            // carInfo.classList.add('strong');
            // carVIN.textContent = `${car.carVin}`;
            carLicensePlate.textContent = `${car.carLicensePlate}`;

            const buttonSections = document.createElement('div');
            buttonSections.classList.add('car-actions');

            // const viewBtn = document.createElement('button'),
            const editBtn = document.createElement('button')
                , deleteBtn = document.createElement('button');

            // viewBtn.classList.add('view');
            editBtn.classList.add('edit');
            // deleteBtn.classList.add('btn');
            deleteBtn.classList.add('delete');

            // viewBtn.textContent = 'View';
            editBtn.textContent = 'Edit';
            deleteBtn.textContent = 'Delete';

            carDetailCard.appendChild(carImg);
            carDetailCard.appendChild(carInfo);
            carDetailCard.appendChild(carLicensePlate);
            // buttonSections.appendChild(viewBtn, editBtn, serviceHisBtn);
            buttonSections.appendChild(editBtn);
            // carDetailCard.appendChild(buttonSections);
            buttonSections.appendChild(editBtn);
            buttonSections.appendChild(deleteBtn);
            // carDetailSec.appendChild(carImg);
            carDetailSec.appendChild(carDetailCard);
            carDetailSec.appendChild(buttonSections);
            section.appendChild(carDetailSec);
        });
    }


}

////////////////Remember to change the type= module in the html file
customElements.define('customer-full-info-card', customerFullData);


