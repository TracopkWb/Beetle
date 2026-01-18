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
        this.fullCustomerCard;
        this.initialState = {
            "cxForm": null,
            "carsForms": []
        };
        // this.isEditing = false;

        //1-Cx card
        const customerFullDataCard = document.createElement('div');
        customerFullDataCard.classList.add('cx-card-container');

        //1.1-Cx Info Section 
        const cxInfoSection = document.createElement('div');
        cxInfoSection.classList.add('cx-info-section');

        //1.1.1-Cx Info Pic Section
        const cxInfoPicSection = document.createElement('div');
        cxInfoPicSection.classList.add('cx-info-pic-section');

        //1.1.1.a-Cx Pic Id
        const cxPicId = document.createElement('img');

        //1.1.2-Cx Info Data Section
        const cxInfoDataSection = document.createElement('div');
        cxInfoDataSection.classList.add('cx-info-data-section');

        //1.1.2.a Cx Form
        const cxForm = document.createElement('form');
        cxForm.dataset.formFor = 'cx';
        cxForm.classList.add('cxForm')
        //Cx Name Input Element
        const cxNameInput = document.createElement('input');
        cxNameInput.readOnly = true;
        cxNameInput.setAttribute('name', 'cxName');
        //Cx Phone Input Element
        const cxPhoneInput = document.createElement('input');
        cxPhoneInput.readOnly = true;
        cxPhoneInput.setAttribute('name', 'cxPhone');

        //Form Edit 
        const formEditButton = document.createElement('button');
        formEditButton.type = 'button';
        formEditButton.dataset.buttonOrigin = 'cx-form-edit';
        formEditButton.textContent = 'Edit';
        formEditButton.classList.add('edit');

        // formEditButton.setAttribute('') 

        //From buttons container
        const formButtonsContainer = document.createElement('div');

        //Form Save button 
        const formSaveButton = document.createElement('button');
        formSaveButton.type = 'button';
        formSaveButton.dataset.buttonOrigin = 'cx-form-save';
        formSaveButton.setAttribute('hidden', '');
        formSaveButton.textContent = 'Save';
        formSaveButton.classList.add('save');

        //Form Cancel button 
        const formCancelButton = document.createElement('button');
        formCancelButton.type = 'button';
        formCancelButton.dataset.buttonOrigin = 'cx-form-cancel';
        formCancelButton.setAttribute('hidden', '');
        formCancelButton.textContent = 'Cancel';
        formCancelButton.classList.add('cancel');

        //1.1.3-Cx Info Id Section
        const cxInfoIdSection = document.createElement('div');
        cxInfoIdSection.classList.add('cx-info-id-section');

        //1.1.3.a-Cx Id
        const cxId = document.createElement('p');
        cxId.dataset.cxElement = 'IdTag';

        //2 Car Section
        const carSection = document.createElement('div');
        carSection.classList.add('cars-section');

        cxInfoPicSection.appendChild(cxPicId)
        cxForm.appendChild(cxNameInput);
        cxForm.appendChild(cxPhoneInput);
        formButtonsContainer.appendChild(formEditButton);
        formButtonsContainer.appendChild(formSaveButton);
        formButtonsContainer.appendChild(formCancelButton);
        cxForm.appendChild(formButtonsContainer);
        cxInfoDataSection.appendChild(cxForm)
        cxInfoIdSection.appendChild(cxId)
        cxInfoSection.appendChild(cxInfoPicSection)
        cxInfoSection.appendChild(cxInfoDataSection)
        cxInfoSection.appendChild(cxInfoIdSection)
        customerFullDataCard.appendChild(cxInfoSection);
        customerFullDataCard.appendChild(carSection);
        this.fullCustomerCard = customerFullDataCard;
        // this.shadowRoot.appendChild(this.fullCustomerCard);
    }

    connectedCallback() {
        this.shadowRoot.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target)
            let selectedElementRaw = e.target ?? null;
            let selectedElement = selectedElementRaw.dataset;
            const form = this.shadowRoot.querySelector(`form[data-id="${selectedElement.id}"]`)
            console.log(selectedElement);
            let selectedCarId = selectedElement.id;
            if (selectedElement.actionFor === 'cx') {
                if (selectedElement.action === 'edit') {
                    console.log('Editing cx!');
                    this.toggleShowMode(selectedElement.id, false);
                    form.addEventListener('input', () => {
                        // console.log(this.initialState['cxForm'])
                        const somethingChangedFlagInCxForm = JSON.stringify(this.serializeForm(form)) !== JSON.stringify(this.initialState['cxForm']);
                        // console.log(somethingChangedFlagInCxForm)
                        if (somethingChangedFlagInCxForm) {
                            this.enableButtons(selectedElement.id, !somethingChangedFlagInCxForm);
                        }
                    })
                } else if (selectedElement.action === 'save') {
                    console.log('Saving cx!');
                    this.toggleShowMode(selectedElement.id, false);
                    this.enableButtons(selectedElement.id, true);
                    const currState = new FormData(form);
                    // console.log(currState)
                    // console.log(this.initialState.cxForm)
                    if (JSON.stringify(currState) === JSON.stringify(this.initialState.cxForm)) {
                        alert("No changes to save");
                        return;
                    }
                    this.initialState.cxForm = Object.fromEntries(currState.entries());
                    // console.log(this.initialState.cxForm)

                } else if (selectedElement.action === 'cancel') {
                    console.log('Cancel Action!');
                    this.toggleShowMode(selectedElement.id, false);
                    this.enableButtons(selectedElement.id, true);
                    this.restoreForm(form, this.initialState['cxForm'])
                }

                console.log(`Cx data: ${selectedElement.id}`);
            } else if (selectedElement.actionFor === 'car') {
                console.log(selectedCarId)
                let selectedCar = this.initialState.carsForms.find(car => car.carLicense == selectedCarId.split('-')[1]);
                if (selectedElement.action === 'edit') {
                    console.log('Editing cx!');
                    this.toggleShowMode(selectedElement.id, false);
                    console.log(form)
                    form.addEventListener('input', () => {
                        // console.log(selectedCar);
                        const somethingChangedFlagInCxForm = JSON.stringify(this.serializeForm(form)) !== JSON.stringify(selectedCar);
                        // console.log(somethingChangedFlagInCxForm):
                        if (somethingChangedFlagInCxForm) {
                            this.enableButtons(selectedElement.id, !somethingChangedFlagInCxForm);
                        }
                    })
                } else if (selectedElement.action === 'save') {
                    console.log('Saving cx!');
                    this.toggleShowMode(selectedElement.id, false);
                    this.enableButtons(selectedElement.id, true);
                    const currentValues = Object.fromEntries(new FormData(form).entries());
                    console.log(currentValues)
                    if (JSON.stringify(currentValues) === JSON.stringify(selectedCar)) {
                        alert("No changes to save");
                        return;
                    }
                    this.initialState.carsForms = this.initialState.carsForms.map(car => {
                        const baseLicense = selectedCar.carLicense.split('-')[0];

                        if (car.carLicense === baseLicense) {
                            console.log('Car Found');
                            return { ...car, ...currentValues };
                        }
                        return car;
                    });
                    console.log(this.initialState)

                } else if (selectedElement.action === 'cancel') {
                    console.log('Cancel Action!')
                    this.toggleShowMode(selectedElement.id, false);
                    this.enableButtons(selectedElement.id, true);
                    this.restoreForm(form, selectedCar);
                }

            }

        });

    }

    set data(cxData) {
        // console.log("Obtained data", this.fullCustomerCard);
        this.shadowRoot.appendChild(this.fullCustomerCard);
        this.updateCard(cxData, this.fullCustomerCard);
        // console.log(this.renderSkeleton())
        // this.renderSkeleton();
        // console.log("Project Data: ", projectData);
    }

    updateCard(cxData) {
        // console.log(this.fullCustomerCard.querySelector('img'));

        const cxIdSection = this.fullCustomerCard;
        // console.log(cxIdSection);
        cxIdSection.setAttribute('data-id-card', `${cxData.cos_Id}`);

        //Cx icon image
        const cxImg = this.fullCustomerCard.querySelector('img');
        cxImg.src = `https://placehold.co/128x128?text=${cxData.cos_Id.slice(0, 4)}`;
        cxImg.alt = `${cxData.cos_Id}`;

        //Cx Id tag
        const cxIdTag = this.fullCustomerCard.querySelector('[data-cx-element = "IdTag"]');
        cxIdTag.textContent = `${cxData.cos_Id}`
        console.log(cxIdTag)
        //Cx form
        const cxForm = this.fullCustomerCard.querySelector('[data-form-for="cx"]');
        cxForm.setAttribute('data-id', `${cxData.cos_Id}`);
        // console.log(cxForm);
        //Cx name input element
        const cxNameInput = this.fullCustomerCard.querySelector('[name = "cxName"]');
        cxNameInput.setAttribute('value', `${cxData.cosName}`)
        cxNameInput.dataset.id = `${cxData.cos_Id}`
        // console.log(cxNameInput);

        //Cx phone number input element
        const cxPhoneInput = this.fullCustomerCard.querySelector('[name = "cxPhone"]');
        cxPhoneInput.setAttribute('value', `${cxData.cosPhone.slice(0, 3)} ${cxData.cosPhone.slice(3, 6)} ${cxData.cosPhone.slice(6, 10)}`)
        cxPhoneInput.dataset.id = `${cxData.cos_Id}`
        // console.log(cxPhoneInput);

        //Form buttons Structure
        const cxButtonEditOption = this.fullCustomerCard.querySelector('[data-button-origin = "cx-form-edit"]');
        // console.log(cxButtonEditOption);
        cxButtonEditOption.setAttribute('data-action-for', `cx`);
        cxButtonEditOption.setAttribute('data-action', `edit`);
        cxButtonEditOption.setAttribute('data-id', `${cxData.cos_Id}`);

        const cxButtonSaveOption = this.fullCustomerCard.querySelector('[data-button-origin = "cx-form-save"]');
        cxButtonSaveOption.setAttribute('data-action-for', `cx`);
        cxButtonSaveOption.setAttribute('data-action', `save`);
        cxButtonSaveOption.setAttribute('data-id', `${cxData.cos_Id}`);
        cxButtonSaveOption.disabled = true;
        // console.log(cxButtonSaveOption);

        const cxButtonCancelOption = this.fullCustomerCard.querySelector('[data-button-origin = "cx-form-cancel"]');
        cxButtonCancelOption.setAttribute('data-action-for', `cx`);
        cxButtonCancelOption.setAttribute('data-action', `cancel`);
        cxButtonCancelOption.setAttribute('data-id', `${cxData.cos_Id}`);
        // console.log(cxButtonCancelOption);

        const carListSection = this.fullCustomerCard.querySelector(".cars-section");
        // console.log(carListSection);
        this.populateCarsInfo(carListSection, cxData.cusCars);

        this.initialState["cxForm"] = this.serializeForm(cxForm);
        console.log(this.initialState)
    }

    toggleShowMode(id, showInputsFlag) {
        const disabledInputs = this.fullCustomerCard.querySelector(`form[data-id= "${id}"]`);
        const hiddenButtons = this.fullCustomerCard.querySelectorAll(`button[data-id= "${id}"]`);
        // console.log(disabledInputs, hiddenButtons);

        for (const element of disabledInputs.elements) {
            // console.log(element.name, element.value);
            if (element.readOnly) {
                // console.log(element);
                element.readOnly = showInputsFlag;
            } else {
                // console.log(element)''
                element.readOnly = !showInputsFlag;
            }
        }

        hiddenButtons.forEach(button => {
            if (button.hidden) {
                button.hidden = showInputsFlag;
            } else {
                button.hidden = !showInputsFlag;
            }
        });

    }

    enableButtons(id, enableFlag) {
        const disabledSaveButton = this.fullCustomerCard.querySelector(`button[data-id="${id}"][data-action="save"]`);
        console.log(disabledSaveButton, enableFlag);
        disabledSaveButton.disabled = enableFlag;
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
            // console.log(car);
            ////////////Car Card Form
            const carCard = document.createElement('div');
            carCard.classList.add('car-item');
            carCard.dataset.id = `${car.car_Id}`;

            ////////////Car Picture Section           
            const carPicSection = document.createElement('div');
            carPicSection.classList.add('car-pic')
            const carImg = document.createElement('img');
            carImg.src = `https://placehold.co/96x60?text=${car.carModel}`;
            carImg.alt = `${car.car_id}`;


            ////////////Car Form Section   
            const carDetailSection = document.createElement('div');
            const carForm = document.createElement('form');
            carForm.dataset.id = `${car.car_Id}`;
            const carFormFieldset = document.createElement('fieldset');

            const carFormLegend = document.createElement('legend');
            carFormLegend.textContent = 'Car Info: ';

            /////Year input
            const carYearGroup = document.createElement('div');
            carYearGroup.classList.add('form-group');
            const carYearLabel = document.createElement('label');
            carYearLabel.for = 'Year';
            carYearLabel.textContent = 'Year: ';


            const carYearInput = document.createElement('input');
            carYearInput.value = `${car.carYear ?? 'Not provided'}`;
            carYearInput.setAttribute('name', 'carYear');
            carYearInput.readOnly = true;

            /////Manufacturer input
            const carManufacturerGroup = document.createElement('div');
            carManufacturerGroup.classList.add('form-group');
            const carManufacturerLabel = document.createElement('label');
            carManufacturerLabel.for = 'Manufacturer;';
            carManufacturerLabel.textContent = 'Manufacturer: ';

            const carManufacturerInput = document.createElement('input');
            carManufacturerInput.value = `${car.carManufacturer ?? 'Not provided'}`;
            carManufacturerInput.readOnly = true;
            carManufacturerInput.setAttribute('name', 'carManufacturer');

            /////Model input
            const carModelGroup = document.createElement('div');
            carModelGroup.classList.add('form-group');
            const carModelLabel = document.createElement('label');
            carModelLabel.for = 'Model';
            carModelLabel.textContent = 'Model:';

            const carModelInput = document.createElement('input');
            carModelInput.value = `${car.carModel ?? 'Not provided'}`
            carModelInput.setAttribute('name', 'Model');
            carModelInput.readOnly = true;

            /////Vin input
            const carVINGroup = document.createElement('div');
            carVINGroup.classList.add('form-group');
            const carVINLabel = document.createElement('label');
            carVINLabel.for = 'VIN';
            carVINLabel.textContent = 'VIN: ';

            const carVINInput = document.createElement('input');
            carVINInput.value = `${car.carVIN ?? 'Not provided'}`;
            carVINInput.setAttribute('name', 'carVIN');
            carVINInput.readOnly = true;

            /////License Plate input
            const carLicenseGroup = document.createElement('div');
            carLicenseGroup.classList.add('form-group');
            const carLicensePlateLabel = document.createElement('label');
            carLicensePlateLabel.for = 'License Plate';
            carLicensePlateLabel.textContent = 'License Plate: ';

            const carLicensePlateInput = document.createElement('input');
            carLicensePlateInput.value = `${car.carLicensePlate ?? 'Not provided'}`;
            carLicensePlateInput.setAttribute('name', 'carLicense');
            carLicensePlateInput.readOnly = true;

            const formEditingButtonsGroup = document.createElement('div');
            formEditingButtonsGroup.classList.add('form-buttons-group');

            //Form Save button 
            const saveCarButton = document.createElement('button');
            saveCarButton.type = 'button';
            saveCarButton.hidden = true;
            saveCarButton.dataset.buttonOrigin = 'car-form-save';
            saveCarButton.dataset.actionFor = 'car';
            saveCarButton.dataset.action = 'save';
            saveCarButton.dataset.id = `${car.car_Id}`;
            saveCarButton.textContent = 'Save';
            saveCarButton.classList.add('save');
            saveCarButton.disabled = true;

            //Form Cancel button 
            const cancelCarButton = document.createElement('button');
            cancelCarButton.type = 'button';
            cancelCarButton.dataset.buttonOrigin = 'car-form-cancel';
            cancelCarButton.dataset.actionFor = 'car';
            cancelCarButton.dataset.action = 'cancel';
            cancelCarButton.dataset.id = `${car.car_Id}`;
            cancelCarButton.hidden = true;
            cancelCarButton.textContent = 'Cancel';
            cancelCarButton.classList.add('cancel');

            ////////////Car Buttons Section
            const carButtonsSection = document.createElement('div');
            carButtonsSection.classList.add('car-actions');
            // const viewBtn = document.createElement('button'),
            const editCarFormButton = document.createElement('button')
            // , deleteCarFormButton = document.createElement('button');


            editCarFormButton.setAttribute('data-action-for', `car`);
            editCarFormButton.setAttribute('data-action', `edit`);
            editCarFormButton.setAttribute('data-id', `${car.car_Id}`);
            editCarFormButton.classList.add('edit');
            editCarFormButton.dataset.buttonOrigin = 'car-form-edit';
            editCarFormButton.textContent = 'Edit';


            // deleteCarFormButton.setAttribute('data-action-for', `car`);
            // deleteCarFormButton.setAttribute('data-action', `delete`);
            // deleteCarFormButton.setAttribute('data-id', `${car.car_Id}`);
            // deleteCarFormButton.classList.add('delete');
            // deleteCarFormButton.classList.add('delete');
            // deleteCarFormButton.dataset.buttonOrigin = 'car-form-edit';
            // deleteCarFormButton.textContent = 'Delete';



            ////////////Appending components
            carPicSection.appendChild(carImg);
            carPicSection.appendChild(editCarFormButton);
            carFormFieldset.appendChild(carFormLegend);
            carYearGroup.appendChild(carYearLabel);
            carYearGroup.appendChild(carYearInput);
            carFormFieldset.appendChild(carYearGroup);
            carManufacturerGroup.appendChild(carManufacturerLabel);
            carManufacturerGroup.appendChild(carManufacturerInput);
            carFormFieldset.appendChild(carManufacturerGroup);
            carModelGroup.appendChild(carModelLabel);
            carModelGroup.appendChild(carModelInput);
            carFormFieldset.appendChild(carModelGroup);
            carVINGroup.appendChild(carVINLabel);
            carVINGroup.appendChild(carVINInput);
            carFormFieldset.appendChild(carVINGroup);
            carLicenseGroup.appendChild(carLicensePlateLabel);
            carLicenseGroup.appendChild(carLicensePlateInput);
            carFormFieldset.appendChild(carLicenseGroup);

            formEditingButtonsGroup.appendChild(saveCarButton);
            formEditingButtonsGroup.appendChild(cancelCarButton);
            carFormFieldset.appendChild(formEditingButtonsGroup);
            carForm.appendChild(carFormFieldset);
            carDetailSection.appendChild(carForm);
            // carButtonsSection.appendChild(editCarFormButton);
            // carDetailCard.appendChild(buttonSections);
            // carButtonsSection.appendChild(editCarFormButton);-
            // carButtonsSection.appendChild(deleteCarFormButton);
            // carDetailSec.appendChild(carImg);
            carCard.appendChild(carPicSection);
            carCard.appendChild(carDetailSection);
            // carCard.appendChild(carButtonsSection);
            section.appendChild(carCard);
            this.initialState["carsForms"].push(this.serializeForm(carForm))
        });
        console.log(this.initialState["carsForms"])
    }

    serializeForm(form) {
        const obj = {};

        for (const el of form.elements) {
            if (!el.name || el.disabled) continue;

            if (el.type === "checkbox") {
                obj[el.name] = el.checked;
            } else {
                obj[el.name] = el.value;
            }
        }

        return obj;
    }

    restoreForm(form, state) {
        for (const el of form.elements) {
            if (!el.name || !(el.name in state)) continue;

            if (el.type === "checkbox") {
                el.checked = state[el.name];
            } else {
                el.value = state[el.name];
            }
        }
    }



}

////////////////Remember to change the type= module in the html file
customElements.define('customer-full-info-card', customerFullData);


