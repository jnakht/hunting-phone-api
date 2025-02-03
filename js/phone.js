
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    // console.log(data.data)
    displayPhones(data.data, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `<figure>
            <img
            src="${phone.image}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>`;
        phoneContainer.appendChild(phoneCard);
    });
    // toggleLoaderSpinner(false);

}

// spinner stops too soon because API call function does not wait to load all data, since it is asynchronous function. using async and await fix this problem.
const handleSearch = async (isShowAll) => {
    toggleLoaderSpinner(true);
    const searchField = document.getElementById('search-field');
    const searText = searchField.value;
    await loadPhone(searText, isShowAll);
    toggleLoaderSpinner(false);

}

const toggleLoaderSpinner = (isLoading) => {
    const loader = document.getElementById('loader-spinner');
    if (isLoading) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetails = async (id) => {
    console.log('Show Details clicked', id);

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data.data);
    const phone = data.data;
    handleShowModal(phone);
}

const handleShowModal = (phone) => {

    // const phoneName = document.getElementById('show-details-modal-name');
    // phoneName.innerText = phone.name;
    const modalContainer = document.getElementById('show-detail-modal-container');
    modalContainer.innerHTML = `
        <div class="card bg-base-100 w-full shadow-xl">
  <figure>
    <img
      src="${phone.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.name}</h2>
    <p>Storage: ${phone?.mainFeatures?.storage}</p>
    <p>Display Size: ${phone?.mainFeatures?.displaySize}</p>
    <p>Chipset: ${phone?.mainFeatures?.chipSet}</p>
    <p>Memory: ${phone?.mainFeatures?.memory}</p>
     <p>Slug: ${phone?.slug}</p>
     <p>Release Date: ${phone?.releaseDate}</p>
     <p>Brand: ${phone?.brand}</p>
     <p>GPS: ${phone?.others?.GPS || 'No GPS available'}</p>
   
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    
    
    `;
    my_modal.showModal();
}