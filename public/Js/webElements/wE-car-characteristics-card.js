class carModel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        const styleLink = document.createElement('link');
        styleLink.href = "/Css/car-model-card.css",
            styleLink.rel = "stylesheet",
            styleLink.type = "text/css"
        // ,this.shadowRoot.append(styleLink);
    }

    async connectedCallback() {
        await this.render();
        const manufacturerSelect = this.shadowRoot.querySelector('[data-manufacturer-selection]');
        const modelSelect = this.shadowRoot.querySelector('[data-model-selection]');
        console.log(modelSelect);
        // console.log(manufacturerSelect);
        let manSelected = '';
        manufacturerSelect.addEventListener('change', (e) => {
            e.preventDefault();
            console.log(e.target.value);
            manSelected = e.target.value;
            if (e.target.value.toString().toLowerCase() == 'other') {
                const dialogModal = document.createElement('new-car-modal-card');
                // const dialogModal = document.createElement('new-car-modal-card');
                if (!this.shadowRoot.contains(dialogModal)) {
                    this.shadowRoot.appendChild(dialogModal);
                }
                // console.log(dialogModal);
                dialogModal.addEventListener('send-data', (e) => {
                    console.log("CustomEvent: ", e.detail);
                    const newOptMan = document.createElement('option');
                    newOptMan.name = 'carMan';
                    newOptMan.textContent = e.detail.message.newCarMan;
                    newOptMan.value = e.detail.message.newCarMan;
                    newOptMan.setAttribute('selected', '');

                    const newOptModel = document.createElement('option');
                    newOptModel.name = 'carModel';
                    newOptModel.textContent = e.detail.message.newCarModel;
                    newOptModel.value = e.detail.message.newCarModel;

                    const newOptOther = document.createElement('option');
                    newOptOther.name = 'carModel';
                    newOptOther.textContent = '----Other----';
                    newOptOther.value = '';

                    manufacturerSelect.appendChild(newOptMan);
                    this.shadowRoot.querySelector('[data-model-selection]').appendChild(newOptOther);
                    this.shadowRoot.querySelector('[data-model-selection]').appendChild(newOptModel);
                });
                e.target.value = ''; 
            }

        });

        modelSelect.addEventListener('change', (e) => {
            console.log(e.target.value);
            if (e.target.value.toLowerCase() == 'other') {
                const dialogModal2 = document.createElement('new-car-modal-card');
                // console.log(dialogModal);

                console.log(manSelected);
                dialogModal2.data = manSelected;

                dialogModal2.addEventListener('send-data', (e) => {
                    console.log("CustomEvent: ", e.detail);
                    const modelSelect = this.shadowRoot.querySelector('[data-model-selection]');
                    const newOptModel = document.createElement('option');
                    newOptModel.value = e.detail.message.newCarModel;
                    newOptModel.textContent = e.detail.message.newCarModel;
                    modelSelect.appendChild(newOptModel);
                });
                this.shadowRoot.appendChild(dialogModal2);
            }
        });


        //Listening for the Car's Form Modal

    }

    set data(carData) {
        this.render(carData);
        // console.log("Project Data: ", projectData);
    }

    async render(carData) {
        await this.getCarInfo();
    }

    async getCarInfo() {

        const dataRaw = await fetch('/Forms/Car/sendData', {
            method: 'Get'
        });
        const dataRawObj = await dataRaw.json();
        const fixedData = await this.fixJson(dataRawObj.data);
        // console.log(fixedData);
        // Create container elements
        const container = document.createElement('div');

        //Form constructors
        const formSection = document.createElement('form');
        formSection.dataset.carForm = '';

        // Manufacturer
        const manufacturerLabel = document.createElement('label');
        const manufacturerSelect = document.createElement('select');
        const nullManufacturerOpt = document.createElement('option');
        const otherManufacturerOpt = document.createElement('option');

        manufacturerLabel.setAttribute('for', 'manufacturer');
        manufacturerLabel.textContent = 'Manufacturer:';
        manufacturerSelect.dataset.manufacturerSelection = '';
        manufacturerSelect.setAttribute('name', 'carMan');
        manufacturerSelect.setAttribute('required', '');
        nullManufacturerOpt.value = '';
        nullManufacturerOpt.text = 'Select a manufacturer';
        otherManufacturerOpt.value = 'Other';
        otherManufacturerOpt.textContent = '-----Other------';
        manufacturerSelect.appendChild(nullManufacturerOpt);
        manufacturerSelect.appendChild(otherManufacturerOpt);

        // Model
        const modelLabel = document.createElement('label');
        const modelSelect = document.createElement('select');
        const nullModelOpt = document.createElement('option');

        modelLabel.setAttribute('for', 'model');
        modelLabel.textContent = 'Model:';
        modelSelect.dataset.modelSelection = '';
        modelSelect.setAttribute('name', 'carModel');
        modelSelect.setAttribute('required', '');
        nullModelOpt.value = '';
        nullModelOpt.text = 'Select a car model';
        modelSelect.appendChild(nullModelOpt);

        //Owner Selector
        const ownerLabel = document.createElement('label');
        const ownerSelect = document.createElement('select');
        const nullOwnerOpt = document.createElement('option');
        const otherOwnerOpt = document.createElement('option');

        ownerLabel.setAttribute('for', 'owner');
        ownerLabel.textContent = 'Owner';
        nullOwnerOpt.value = ''
        nullOwnerOpt.textContent = 'Select a owner';
        otherOwnerOpt.textContent = '---------Other-------'
        ownerSelect.setAttribute('name', 'carOwner');
        ownerSelect.setAttribute('required', '');
        ownerSelect.appendChild(nullOwnerOpt)
        ownerSelect.appendChild(otherOwnerOpt);

        //Constructing Select options
        const ownerList = await this.getCostumerList();
        // console.log((ownerList));
        ownerList.forEach(datum => {
            // console.log(datum);
            const opt = document.createElement('option');
            opt.value = datum.cos_Id;
            opt.textContent = datum.cos_Id.concat("- ", datum.cosName);
            ownerSelect.appendChild(opt);
        });

        //Year input
        const yearLabel = document.createElement('label');
        const yearInput = document.createElement('input');

        yearLabel.setAttribute('for', 'Year');
        yearLabel.textContent = 'Year:';
        yearInput.setAttribute('name', 'carYear');
        yearInput.setAttribute('required', '');
        yearInput.type = 'number';
        yearInput.placeholder = '2000';
        yearInput.min = 1900;
        yearInput.max = 2050;

        //License Plate Input
        const licenseLabel = document.createElement('label');
        const licenseInput = document.createElement('input');

        licenseLabel.setAttribute('for', 'License Plate');
        licenseLabel.textContent = 'License Plate:';
        licenseInput.setAttribute('name', 'carLicensePlate');
        licenseInput.setAttribute('required', '');
        licenseInput.type = 'text';
        licenseInput.placeholder = 'ABC12345';
        licenseInput.maxLength = 8;

        //Current Milage input
        const currMilLabel = document.createElement('label');
        const currMilInput = document.createElement('input');

        currMilLabel.setAttribute('for', 'CurrMil');
        currMilLabel.textContent = 'Current Milage:';
        currMilInput.setAttribute('name', 'carCurrMilage');
        currMilInput.type = 'number';
        currMilInput.placeholder = '10,000 Mil';

        //Vin Number input
        const vinLabel = document.createElement('label');
        const vinInput = document.createElement('input');

        vinLabel.setAttribute('for', 'carVin');
        vinLabel.textContent = 'VIN Number:';
        vinInput.setAttribute('name', 'carVin');
        vinInput.type = 'text';
        vinInput.placeholder = '4Y1SL65848Z411439';
        vinInput.maxLength = 17;
        // Send Button

        const sendButton = document.createElement('button');
        sendButton.textContent = 'Send';

        // Object.entries(fixedData).forEach(datum => {
        //     // console.log(datum);
        //     const opt = document.createElement('option');
        //     opt.value = datum[0];
        //     opt.textContent = datum[0];
        //     manufacturerSelect.appendChild(opt);
        // });

        // Append once, in proper order

        container.appendChild(manufacturerLabel);
        container.appendChild(manufacturerSelect);
        container.appendChild(document.createElement('br'));
        container.appendChild(modelLabel);
        container.appendChild(modelSelect);
        container.appendChild(document.createElement('br'));
        container.appendChild(ownerLabel);
        container.appendChild(ownerSelect);
        container.appendChild(document.createElement('br'));
        container.appendChild(yearLabel);
        container.appendChild(yearInput);
        container.appendChild(document.createElement('br'));
        container.appendChild(licenseLabel);
        container.appendChild(licenseInput);
        container.appendChild(document.createElement('br'));
        container.appendChild(currMilLabel);
        container.appendChild(currMilInput);
        container.appendChild(document.createElement('br'));
        container.appendChild(vinLabel);
        container.appendChild(vinInput);
        container.appendChild(document.createElement('br'));

        container.appendChild(sendButton);

        formSection.appendChild(container);
        this.shadowRoot.appendChild(formSection);

        await this.populateOption(fixedData);

        // Populating the Manufacturer and Model Selection
        manufacturerSelect.addEventListener('change', (e) => {
            const selectedMan = e.target.value;
            console.log(selectedMan);
            // Clear old options (but keep first)
            modelSelect.length = 1;
            const models = fixedData[selectedMan];
            console.log((models));
            if (models) {
                Object.values(models).forEach((carName) => {
                    // console.log(carName);
                    const opt = document.createElement('option');
                    opt.value = carName;
                    opt.textContent = carName;
                    modelSelect.appendChild(opt);
                });
            }
        });

        ////SEND THE CAR'S FORM
        // sendButton.addEventListener('click', async (e) => {
        //     e.preventDefault();
        //     // alert(1);
        //     const form = this.shadowRoot.querySelector('[data-car-form]');
        //     // console.log(form);
        //     const formRawData = new FormData(form);
        //     const formData = Object.fromEntries(formRawData.entries());
        //     console.log((formData));
        //     const idFormatted = formData.carOwner.toString().concat("-", formData.carLicensePlate.toString());
        //     console.log(idFormatted);
        //     const carDataFormatted = {
        //         car_Id: idFormatted.toString(),
        //         carModel: formData.carModel.toString(),
        //         carYear: formData.carYear.toString(),
        //         carManufacturer: formData.carMan.toString(),
        //         carLicensePlate: formData.carLicensePlate.toString(),
        //         carVin: formData.carVin.toString(),
        //         carCurrMilage: parseInt(formData.carCurrMilage),
        //         cos_Id: formData.carOwner.toString(),
        //         car_Registration_Date: new Date(),
        //         cos_Id: formData.carOwner.toString(),
        //     }
        //     const serverRes = await fetch('/Forms/Car/saveData', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(carDataFormatted),
        //     });
        //     console.log(await serverRes.json());
        // });
    }

    async getCostumerList() {
        const dataRaw = await fetch('/Forms/Costumer/SendList', {
            method: 'GET'
        });
        const dataRawObj = await dataRaw.json();
        const fixedData = dataRawObj.data;
        // console.log(typeof(dataRawObj.data));

        return fixedData;
    }

    async fixJson(data) {
        // console.log(data);
        const fixedJson = [];
        Object.entries(data).forEach(([_, value]) => {
            const rawObj = JSON.parse(value.result);
            // console.log(rawObj);
            const id = rawObj.manufacturer.toString();
            fixedJson[id] = rawObj.models;
        });
        // console.log((fixedJson));
        return fixedJson;
    }

    async populateOption(fixedData) {
        const manufacturerSelect = this.shadowRoot.querySelector('[data-manufacturer-selection]');
        Object.entries(fixedData).forEach(datum => {
            // console.log(datum);
            const opt = document.createElement('option');
            opt.value = datum[0];
            opt.textContent = datum[0];
            manufacturerSelect.appendChild(opt);
        });
    }




}

customElements.define('car-model-card', carModel);

