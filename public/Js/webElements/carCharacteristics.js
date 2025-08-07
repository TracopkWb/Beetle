
class carModel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        const styleLink = document.createElement('link');
        styleLink.href = "/Css/car-model-card.css",
            styleLink.rel = "stylesheet",
            styleLink.type = "text/css",
            this.shadowRoot.append(styleLink);
    }

    connectedCallback() {
        this.render();
    }

    set data(carData) {
        this.render(carData);
        // console.log("Project Data: ", projectData);
    }

    async render(carData) {
        this.getCarInfo();
        // //card
        // const div = document.createElement('');
        // div.data = carData;

        // // Append title and company card into project container
        // this.shadowRoot.append(div);

    }

    async getCarInfo() {
        const dataRaw = await fetch('/Forms/Car/sendData', {
            method: 'Get'
        });
        const dataRawObj = await dataRaw.json();
        const fixedData = await this.fixJson(dataRawObj.data[0]);
        // console.log(fixedData);
        // Create container elements
        const container = document.createElement('div');

        // Manufacturer
        const manufacturerLabel = document.createElement('label');
        const manufacturerSelect = document.createElement('select');
        const nullManufacturerOpt = document.createElement('option');
        const otherManufacturerOpt = document.createElement('option');

        manufacturerLabel.setAttribute('for', 'manufacturer');
        manufacturerLabel.textContent = 'Manufacturer:';
        manufacturerSelect.dataset.manufacturerSelection = '';
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
        nullModelOpt.value = '';
        nullModelOpt.text = 'Select a car model';
        modelSelect.appendChild(nullModelOpt);

        // Send Button

        const sendButton = document.createElement('button');
        sendButton.textContent = 'Send';


        Object.entries(fixedData).forEach(datum => {
            // console.log(datum);
            const opt = document.createElement('option');
            opt.value = datum[0];
            opt.textContent = datum[0];
            manufacturerSelect.appendChild(opt);
        });

        // Append once, in proper order
        container.appendChild(manufacturerLabel);
        container.appendChild(manufacturerSelect);
        container.appendChild(document.createElement('br'));
        container.appendChild(modelLabel);
        container.appendChild(modelSelect);
        container.appendChild(sendButton);

        this.shadowRoot.appendChild(container);

        // Populating the Manufacturer and Model Selection
        manufacturerSelect.addEventListener('change', (e) => {
            const selectedMan = e.target.value;
            console.log(selectedMan);
            // Clear old options (but keep first)
            modelSelect.length = 1;
            const models = fixedData[selectedMan];
            console.log((models));
            if (selectedMan !== 'Other') {
                if (models) {
                    console.log(1)
                    Object.values(models).forEach((carName) => {
                        console.log(carName);
                        const opt = document.createElement('option');
                        opt.value = carName;
                        opt.textContent = carName;
                        modelSelect.appendChild(opt);
                    });
                }
            } else {
                console.log(2);
                //Personalized input for a new Manufacturer
                const manInput = document.createElement('input');
                manInput.type = 'text';
                manInput.name = 'newMan';
                manInput.placeholder = 'Insert New Manufacturer';

                //Personalized input for new car model
                // modelSelect.remove();
                // modelLabel.remove();
                const modelInput = document.createElement('input');

                modelInput.type = 'text';
                modelInput.name = 'newModel';
                modelInput.placeholder = 'Insert New model';

                //Appending new inputs
                container.appendChild(manInput);
                container.appendChild(modelInput);


            }

        });

        // sendButton.addEventListener('click',async (e)=>{
        //    console.log(manufacturerSelect.value);
        //    if (manufacturerSelect.value == 'Other') {
        //     const newMode = {

        //     }
        //         const addNewData = fetch('/Forms/Car/newMode',{
        //             method: 'POST',
        //             body: 
        //         })
        //    } else {

        //    }
        // })
    }

    async fixJson(data) {
        const fixedJson = [];
        Object.entries(data).forEach(([_, value]) => {
            const rawObj = JSON.parse(value.result);
            // console.log(rawObj.manufacturer, rawObj.models)
            const id = rawObj.manufacturer.toString();
            fixedJson[id] = rawObj.models;
        });
        // console.log((fixedJson));
        return fixedJson;
    }

    async sendCarInfo() {

    }
}

customElements.define('car-model-card', carModel);


/**const modelSelect = document.createElement('select'),
            nullModelOpt = document.createElement('option'),
            manufacturerLabel = document.createElement('label'),
            manufacturerSelect = document.createElement('select'),
            modelLabel = document.createElement('label'),
            nullManufacturerOpt = document.createElement('option'),
            brTag = document.createElement('br')
            ;
        modelSelect.dataset.modelSelection = '',
            manufacturerSelect.dataset.manufacturerSelection = '',
            nullModelOpt.value = "",
            nullModelOpt.textContent = "Select a car model",
            nullManufacturerOpt.value = "",
            nullManufacturerOpt.text = 'Select a manufacturer',
            // nullManufacturerOpt.setAttribute('disabled','');

            manufacturerLabel.setAttribute('for', 'Manufacturer'),
            manufacturerLabel.textContent = 'Manufacturer:',
            modelLabel.setAttribute('for', 'Model'),
            modelLabel.textContent = 'Model:'
            ;

            manufacturerSelect.appendChild(nullManufacturerOpt),
            modelSelect.appendChild(nullModelOpt),
            this.shadowRoot.append(manufacturerLabel,manufacturerSelect),
            this.shadowRoot.append(modelLabel,modelSelect),
            // modelSelect.appendChild(nullModelOpt);

            Object.entries(dataObj.data).forEach(man => {
                const optSelection = document.createElement('option');
                optSelection.setAttribute('value', man[0]);
                optSelection.textContent = man[0];
                // console.log(man[0],optSelection);
                manufacturerSelect.appendChild(optSelection);
            });

        this.shadowRoot.appendChild(manufacturerSelect);

        const manufacturerSelection = this.shadowRoot.querySelector('[data-manufacturer-selection]');
        console.log(manufacturerSelection);

        manufacturerSelection.addEventListener('change', (e) => {
            const model = e.target.options[e.target.selectedIndex].label;
            // console.log(model);

            Object.entries(dataObj.data).forEach(mod => {
                // console.log(mod);
                if (model === mod[0]) {

                    Object.entries(mod[1]).forEach(modOpt =>{
                        console.log(modOpt[1]);
                        const optSelection = document.createElement('option');
                        optSelection.setAttribute('value', modOpt[1]);
                        optSelection.textContent = modOpt[1];
                        modelSelect.appendChild(optSelection);
                    });
                }
            });

            this.shadowRoot.appendChild(modelSelect); */

