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
        const dataObj = await dataRaw.json();
        console.log(typeof (dataObj));
        const select = document.createElement('select'),
            nullOpt = document.createElement('option');
        nullOpt.value = "null",
            // nullOpt.setAttribute('disabled','');
        nullOpt.textContent = "Select a car model";
        select.appendChild(nullOpt);
        Object.entries(dataObj.data).forEach(man => {
            const optGroup = document.createElement('optgroup');
            optGroup.setAttribute('label', man[0])
            console.log(optGroup);
            Object.entries(man[1]).forEach(model => {
                const optionTag = document.createElement('option');
                optionTag.value = model[1];
                optionTag.textContent = model[1];
                // console.log(optionTag);
                optGroup.appendChild(optionTag);
            });
            select.appendChild(optGroup);
        });
        this.shadowRoot.appendChild(select);
    }

}

customElements.define('car-model-card', carModel);


