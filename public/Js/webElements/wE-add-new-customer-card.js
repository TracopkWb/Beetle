class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        const styleLink = document.createElement('link');
        styleLink.href = "/Css/add-new-customer-card.css",
        styleLink.rel = "stylesheet",
        styleLink.type = "text/css",
        this.shadowRoot.appendChild(styleLink);
        // console.log(styleLink);
    }

    connectedCallback() {
        this.render(this._data);

        const dialog = this.shadowRoot.querySelector('dialog');
        dialog.showModal();

        // const closeBtn = this.shadowRoot.querySelector('[data-close-btn]');
        // closeBtn.addEventListener('click', () => {
        //     // e.preventDefault();
        //     dialog.close();
        //     document.querySelector('add-new-customer-card').remove();
        // });

        this.shadowRoot.addEventListener('click',(e)=>{
            console.log(e.target.tagName);
            if (e.target.tagName === 'DIALOG') {
                dialog.close();
                document.querySelector('add-new-customer-card').remove();
                console.log();
            }
        })

        // const sendBtn = this.shadowRoot.querySelector('[data-send-btn]');
        // // console.log(sendBtn);
        // sendBtn.addEventListener('click', async (e) => {
        //     e.preventDefault();
        //     const formDiv = this.shadowRoot.querySelector('[data-new-car-addition]')
        //     const newCarFormRawData = new FormData(formDiv);
        //     if (!formDiv.checkValidity()) {
        //         formDiv.reportValidity(); // shows browser validation messages
        //         return;
        //     }
        //     const newCarFormData = Object.fromEntries(newCarFormRawData.entries());
        //     const newCarFormDataFlagged = {
        //         newCarMan: newCarFormData.newCarMan,
        //         newCarModel: newCarFormData.newCarModel,
        //         flag: null,
        //         error: null,
        //     }
        //     // console.log(this._data, newCarFormDataFlagged);
        //     const dialog = this.shadowRoot.querySelector('[data-new-car]');
        //     const data2Send = {
        //         message: newCarFormDataFlagged,
        //     };
        //     if (this._data) {
        //         // console.log("Saving only the model", data2Send.message);
        //         data2Send.message.newCarMan = this._data; //Setting carMan to null
        //         data2Send.message.flag = 1; //Only add the model into table
        //         dialog.close();
        //     } else {
        //         // console.log(`Saving the manufacturer and model`);
        //         data2Send.message.flag = 0;//Add the manufacturer and model into table
        //     }
        //     const sendNewModel = await fetch('/Forms/Car/newAddition/newCar', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(newCarFormDataFlagged),
        //     });
        //     // console.log(await sendNewModel);

        //     const res = await sendNewModel.json();
        //     data2Send.message.error = (res.type === 'error') ? true : false;
        //     console.log(data2Send.message);
        //     this.sendNotification(res, res.show);
        //     this.dispatchEvent(new CustomEvent('send-data', {
        //         detail: data2Send,
        //         bubbles: true,  // allow the event to bubble up through DOM
        //         composed: true, // allow it to cross shadow DOM boundary
        //     }));
        //     if (sendNewModel.ok) {
        //         const dialog = this.shadowRoot.querySelector('[data-new-car]');
        //         // console.log(await sendNewModel);
        //         dialog.close();
        //     }
        // });
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

        const carResModal = document.createElement('car-registration-form');
        // carResModal.data = carData;

        //Closing button & Add Button
        const sendBtn = document.createElement('button');
        sendBtn.textContent = 'Send';
        sendBtn.dataset.sendBtn = '';
        sendBtn.classList.add('confirm');
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Cancel';
        closeBtn.dataset.closeBtn = '';
        closeBtn.classList.add('cancel');

        // //Appending every new element


        
        dialogDiv.appendChild(carResModal);

        dialogDiv.appendChild(closeBtn);
        dialogDiv.appendChild(sendBtn);
        // Append everything into shadowRoot
        this.shadowRoot.appendChild(dialogDiv);
        // dialogDiv.showModal();
    }

    sendNotification(notification, flag) {
        console.log('Sending a notification ', notification);
        if (flag) {
            this.dispatchEvent(new CustomEvent('notify', {
                detail: {
                    origin: notification.origin,
                    message: notification.error,
                    data: notification.data,
                    type: notification.type,
                    show: notification.show,
                },
                bubbles: true,     // Allows event to bubble up
                composed: true,
            }));
        }
    }
}

////////////////Remember to change the type= module in the html file
customElements.define('add-new-customer-card', Modal);


