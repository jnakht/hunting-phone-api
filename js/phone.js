
const loadPhone = async(searchText, isShowAll) => {
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
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
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