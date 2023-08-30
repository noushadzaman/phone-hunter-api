const loadPhone = async () => {
  const data = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  )
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="pt-5">
        <img src="${phone.image}" alt="Shoes" />
    </figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
};

loadPhone();
