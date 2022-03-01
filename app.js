//spinner function
const spinner = spin => {
    document.getElementById('spinner').style.display = spin;
}
// search
const search = () => {
    const searchText = document.getElementById('SearchBox');
    const searchValue = searchText.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue.toLowerCase()}`
    loadApi(url)
}
// loading api
const loadApi = async (url) => {
    spinner('block')
    const ref = await fetch(url);
    const datas = await ref.json();
    const errorMsg = document.getElementById('error-msg')
    errorMsg.style.display = 'none';
    spinner('none')
    if (datas.data[0] == undefined) {

        errorMsg.style.display = 'block'
    }
    display(datas.data)
}
loadApi();
const display = (phones) => {
    const showPhones = document.getElementById('show-phones');

    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        console.log(phone)
        div.innerHTML = `
        <div class="card h-100" onclick = showDetails(${phone.slug})>
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.slug}</p>
        </div>
    </div>
        `
        showPhones.appendChild(div)
    });




}

