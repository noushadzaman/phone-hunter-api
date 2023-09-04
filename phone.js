const loadPhone = async (searchText = "iphone", isShowAll) => {
  const data = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayPhones(data.data, isShowAll));
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 6 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="pt-5">
        <img src="${phone.image}" alt="Shoes" />
    </figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
        <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetail = async (id) => {
  console.log("consle loge", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  showPhoneDetails(data.data);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img class="py-3" src="${phone.image}"/>
  <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>CPU: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>Memory: </span>${phone.mainFeatures?.memory || 'No Memory available'}</p>
  `;

  show_Details_modal.showModal();
};

loadPhone();
