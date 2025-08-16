document.addEventListener("notify", (e) => {
  console.log(e);
  console.log(e.detail);
  showNotification(e.detail.type, e.detail.message,e.detail.data);
});
function showNotification(type,message,data) {
  const container = document.getElementById("notifications-container");
  // console.log(container);
  const not = document.createElement("div");
  if (type == 'error') {
    not.textContent = `${data}`;

  } else {
    not.textContent = `The car: ${data.carManufacturer} - ${data.carModel} has been saved under costumer ${data.cos_Id}`;
  }
  not.style.cssText = `
        background: ${type === "error" ? "#ff4d4f" : "#4caf50"};
        color: white;
        padding: 10px 20px;
        margin-top: 10px;
        border-radius: 8px;
        font-family: sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  container.appendChild(not);

  // Fade in
  setTimeout(() => {
    not.style.opacity = "1";
  }, 10);

  // Remove after 10 sec
  setTimeout(() => {
    not.style.opacity = "0";
    setTimeout(() => not.remove(), 500);
  }, 2000);
}