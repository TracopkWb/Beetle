console.log(document.URL);
const Url = new URL(document.URL);
console.log(Url.href);
// console.log(Url.pathname.split('/')[3]);

async function getCustomerInfo(customerId){
    const getReq = await fetch(`${customerId.href}`,{
        method: 'GET'
    });

    const res = await getReq.json();
    console.log(res);
}