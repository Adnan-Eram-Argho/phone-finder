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

// displaying phones
const display = (phones) => {
    const showdetailssection = document.getElementById('phone-spec');
    const showPhones = document.getElementById('show-phones');
    showPhones.innerHTML = ''
    showdetailssection.innerHTML = '';
    phones.forEach(phone => {


        const div = document.createElement('div');
        div.classList.add('col');
        console.log(phone)
        try {
            div.innerHTML = `
    <div class="card h-100 cards" >
    <div class="d-flex justify-content-center mt-5">
        <img src="${phone.image}" class="card-img-top" alt="...">
        </div>
            <div class="card-body d-flex justify-content-center flex-column">
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

// show details
const showDetails = async (id) => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    const ref = await fetch(url);
    const data = await ref.json();
    showDetailsData(data.data)
}

const showDetailsData = (phone) => {
    const showdetailssection = document.getElementById('phone-spec');
    showdetailssection.innerHTML = '';
    let release;
    console.log(phone)
    console.log(phone.name)

    if (phone.releaseDate == '') {
        release = 'No release date found'
    } else {
        release = phone.releaseDate;
    }

    const div = document.createElement('div')
    div.innerHTML = `
    <div>
    <img src="${phone.image}" class="  w-25 img-fluid mx-auto" alt="">
</div>
<div>
    <h3>name: <span>${phone.name}</span></h3>
    <hr>
    <h4>release date: <span>${release}</span></h4>
    <hr>
    <h4>chipset: ${phone.mainFeatures.chipSet} </h4>
    <hr>
    <h4>memory: <span>${phone.mainFeatures.memory}</span></h4>
    <hr>
    <h4>sensors: <span> ${phone.mainFeatures.sensors[0]}, ${phone.mainFeatures.sensors[1]}, ${phone.mainFeatures.sensors[2]}, ${phone.mainFeatures.sensors[3]}, ${phone.mainFeatures.sensors[4]}, ${phone.mainFeatures.sensors[5]}</span></h4>
    <hr>
    <h4>dsplay size: <span>${phone.mainFeatures.displaySize}</span></h4>
    <hr>
    <h4>storage: <span>${phone.mainFeatures.storage}</span></h4>
    <hr>
    <h4>wlan: <span>${phone.others.WLAN}</span></h4>
    <hr>
    <h4>bluetooth: <span>${phone.others.Bluetooth}</span></h4>
    <hr>
    <h4>Gps: <span>${phone.others.GPS}</span></h4>
    <hr>
    <h4>Nfc: <span>${phone.others.NFC}</span></h4>
    <hr>
    <h4>radio: <span>${phone.others.Radio}</span></h4>
    <hr>
    <h4>Usb: <span>${phone.others.USB}</span></h4>
    <hr>
</div>
    `
    showdetailssection.appendChild(div)
}