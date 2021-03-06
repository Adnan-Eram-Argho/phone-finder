let previouosData;
let newData;
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
    searchText.value = ''
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
    document.getElementById('show-more').innerHTML = ''
    showdetailssection.innerHTML = '';
    console.log(phones)
    previouosData = phones;
    newData = previouosData.slice(0, 20);
    console.log(newData)
    if (phones.length >= 20) {
        showPhones(newData);
        // document.getElementById('show-more-btn').style.display = 'block'
        document.getElementById('show-more').innerHTML = `
        <button class="btn btn-danger mx-auto" id="show-more-btn" onclick="showMore()">Show More</button>
       `
    } else {
        showPhones(previouosData);
    }
}
// show phones
const showPhones = (data) => {

    const showPhones = document.getElementById('show-phones');
    showPhones.innerHTML = ''
    data.forEach(phone => {

        const div = document.createElement('div');
        div.classList.add('col');
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
        showPhones.appendChild(div)
    });
}
//show more button
const showMore = () => {
    showPhones(previouosData);
    document.getElementById('show-more').innerHTML = ''
}
// show details
const showDetails = async (id) => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`
    const ref = await fetch(url);
    const data = await ref.json();
    showDetailsData(data.data)
}
// load datas of detail
const showDetailsData = (phone) => {
    const showdetailssection = document.getElementById('phone-spec');
    showdetailssection.innerHTML = '';
    let release;
    let wlan;
    let bluetooth;
    let gps;
    let nfc;
    let radio;
    let usb;

    if (phone.releaseDate == '') {
        release = 'No release date found'
    } else {
        release = phone.releaseDate;
    }
    // console.log(phone.others)
    if (phone.others === undefined) {
        wlan = 'no wlan found'
        gps = 'no gps found'
        bluetooth = 'no bluetooth found';
        nfc = ' no nfc found';
        radio = 'no radio found'
        usb = 'no usb found'

    } else {
        wlan = phone.others.WLAN;
        bluetooth = phone.others.Bluetooth;
        gps = phone.others.GPS;
        nfc = phone.others.NFC
        radio = phone.others.Radio
        usb = phone.others.USB;
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
    <h4>wlan: <span>${wlan}</span></h4>
    <hr>
    <h4>bluetooth: <span>${bluetooth}</span></h4>
    <hr>
    <h4>Gps: <span>${gps}</span></h4>
    <hr>
    <h4>Nfc: <span>${nfc}</span></h4>
    <hr>
    <h4>radio: <span>${radio}</span></h4>
    <hr>
    <h4>Usb: <span>${usb}</span></h4>
    <hr>
</div>
    `
    showdetailssection.appendChild(div)
}