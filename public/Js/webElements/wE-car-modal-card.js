class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        const styleLink = document.createElement('link');
        styleLink.href = "/Css/modal-card.css",
            styleLink.rel = "stylesheet",
            styleLink.type = "text/css"
        // ,this.shadowRoot.append(styleLink);
    }

    connectedCallback() {
        this.render(this._data);

        const dialog = this.shadowRoot.querySelector('dialog');
        dialog.showModal();

        const closeBtn = this.shadowRoot.querySelector('[data-close-btn]');
        closeBtn.addEventListener('click', () => {
            // e.preventDefault();
            const dialog = this.shadowRoot.querySelector('[data-new-car]');
            dialog.close();
        });

        const sendBtn = this.shadowRoot.querySelector('[data-send-btn]');
        // console.log(sendBtn);
        sendBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const formDiv = this.shadowRoot.querySelector('[data-new-car-addition]')
            const newCarFormRawData = new FormData(formDiv);
            const newCarFormData = Object.fromEntries(newCarFormRawData.entries());
            const newCarFormDataFlagged = {
                newCarMan: newCarFormData.newCarMan,
                newCarModel: newCarFormData.newCarModel, 
                flag: null,
            }
            console.log(this._data, newCarFormDataFlagged);
            const dialog = this.shadowRoot.querySelector('[data-new-car]');
            const data2Send = {
                message: newCarFormDataFlagged,
            };
            if (this._data) {
                console.log("Saving only the model", data2Send.message);
                data2Send.message.newCarMan = this._data; //Setting carMan to null
                data2Send.message.flag = 1; //Only add the model into table
                dialog.close();
            } else {
                console.log(`Saving the manufacturer and model`);
                data2Send.message.flag = 0;//Add the manufacturer and model into table
            }
            this.dispatchEvent(new CustomEvent('send-data', {
                detail: data2Send,
                bubbles: true,  // allow the event to bubble up through DOM
                composed: true, // allow it to cross shadow DOM boundary
            }));
            dialog.close();
            // console.log(newCarFormData);
            const sendNewModel = await fetch('/Forms/Car/newAddition/newCar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCarFormDataFlagged),
            });
            console.log(await sendNewModel);
            console.log(await sendNewModel.json());
            if (sendNewModel.ok) {
                const dialog = this.shadowRoot.querySelector('[data-new-car]');
                // console.log(await sendNewModel);
            dialog.close();
            } else {
                console.log(sendNewModel.statusText);
            }
        });
    }

    set data(carData) {
        this.render(carData);
        this._data = carData;
        // console.log("Project Data: ", projectData);
    }

    async render(carData) {
        // console.log(carData);
        //Dialog tag creation
        const dialogDiv = document.createElement('dialog');
        dialogDiv.dataset.newCar = '';
        // dialogDiv.setAttribute('open', '');

        //Form tag creation 
        const formDiv = document.createElement('form');
        formDiv.dataset.newCarAddition = '';

        //fieldset tag creation, legend tag
        const fieldsetTag = document.createElement('fieldset');
        const legendTag = document.createElement('legend');
        legendTag.textContent = 'Adding a new Car:';


        // Manufacturer
        const manufacturerLabel = document.createElement('label');
        const manufacturerInput = document.createElement('input');

        manufacturerLabel.setAttribute('for', 'manufacturer');
        manufacturerLabel.textContent = 'New Manufacturer:';
        manufacturerInput.dataset.newManufacturer = '';
        manufacturerInput.setAttribute('name', 'newCarMan');
        manufacturerInput.setAttribute('required', '');
        if (carData) {
            manufacturerInput.value = carData;
            manufacturerInput.innerText = carData;
            manufacturerInput.setAttribute('disabled', '');
            console.log(manufacturerInput);

        } else {
            manufacturerInput.value = ''; //NULL
        }


        // Model
        const modelLabel = document.createElement('label');
        const modelInput = document.createElement('input');

        modelLabel.setAttribute('for', 'model');
        modelLabel.textContent = 'New Model:';
        modelInput.dataset.newModel = '';
        modelInput.setAttribute('name', 'newCarModel');
        modelInput.setAttribute('required', '');

        //Closing button & Close Button
        const addBtn = document.createElement('div');
        addBtn.textContent = 'Add car';
        addBtn.dataset.sendBtn = '';
        const closeBtn = document.createElement('div');
        closeBtn.textContent = 'Cancel';
        closeBtn.dataset.closeBtn = '';

        //Appending every new element
        fieldsetTag.appendChild(legendTag);
        fieldsetTag.appendChild(manufacturerLabel);
        fieldsetTag.appendChild(document.createElement('br'));
        fieldsetTag.appendChild(manufacturerInput);
        fieldsetTag.appendChild(document.createElement('br'));
        fieldsetTag.appendChild(modelLabel);
        fieldsetTag.appendChild(document.createElement('br'));
        fieldsetTag.appendChild(modelInput);
        fieldsetTag.appendChild(document.createElement('br'));
        fieldsetTag.appendChild(addBtn);
        fieldsetTag.appendChild(document.createElement('br'));
        fieldsetTag.appendChild(closeBtn);

        formDiv.appendChild(fieldsetTag);

        dialogDiv.appendChild(formDiv);

        // Append everything into shadowRoot
        this.shadowRoot.appendChild(dialogDiv);
        // dialogDiv.showModal();
    }

}

////////////////Remember to change the type= module in the html file
customElements.define('new-car-selector', Modal);


