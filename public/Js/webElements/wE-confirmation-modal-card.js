class NAME extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        const styleLink = document.createElement('link');
        styleLink.href = "/Css/<name>.css",
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

        //card
        const div = document.createElement('');
        div.data = carData;

        // Append title and company card into project container
        this.shadowRoot.append(div);

    }

}

////////////////Remember to change the type= module in the html file
customElements.define('-card', NAME);


