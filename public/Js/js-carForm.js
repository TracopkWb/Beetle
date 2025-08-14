
window.addEventListener('DOMContentLoaded',async ()=>{
  console.log("Hola Mundo")  ;
  console.log( window.location.href)
  const url = new URL(window.location.href);
  console.log(url.searchParams.get('nombre'));
  const urlNombre = url.searchParams.get('nombre');
  const div = document.createElement('div');
  div.textContent = urlNombre;
  document.body.appendChild(div);

//   console.log(Object.fromEntries(url.searchParams.entries()));
  const rea = await fetch(`/Forms/Car/Registration?nombre=${urlNombre}`);

//   console.log(await rea.json());
})