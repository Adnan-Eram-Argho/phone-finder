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
    showPhones.innerHTML = ''
    phones.forEach(phone => {


        const div = document.createElement('div');
        div.classList.add('col');
        console.log(phone)
        try {
            div.innerHTML = `
    <div class="card h-100" >
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>

                <button class="btn btn-danger" onclick="showDetails('${phone.slug}')">Details</button>
        </div>
       
    </div>`
        } catch (error) {
            console.log(error)
        }

        showPhones.appendChild(div)
    });

}


const showDetails = (id) => {
    try {
        console.log(`${id}`);
        console.log('hello')

    } catch (error) {
        console.log(error)
    }
}