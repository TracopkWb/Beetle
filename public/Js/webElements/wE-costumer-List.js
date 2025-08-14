class costumerList extends HTMLElement {
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
    }

    async render(carData) {
        this.getCostumerList();
        

    }

    async getCostumerList() {
        const dataRaw = await fetch('/Forms/Costumer/SendList', {
            method: 'GET'
        });
        const dataRawObj = await dataRaw.json();
        const fixedData = dataRawObj.data[0];
        // console.log(fixedData);
       return fixedData;
        
    }

    async fixJson(data) {
        console.log(data);
        // const fixedJson = [];
        // Object.entries(data).forEach(([_, value]) => {
        //     const rawObj = JSON.parse(value.result);
        //     // console.log(rawObj.manufacturer, rawObj.models)
        //     const id = rawObj.manufacturer.toString();
        //     fixedJson[id] = rawObj.models;
        // });
        // console.log((fixedJson));
        // return fixedJson;
    }

    async sendCarInfo() {

    }
}

customElements.define('car-costumer-list-card', costumerList);

