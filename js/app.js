import { results } from "./data.js";

const randomImg = document.createElement("img");
randomImg.src =
  "https://fastly.picsum.photos/id/534/1000/800.jpg?hmac=tFbU1nZ2RnQNroI_ToBhH-LFB8KNjyWoc3bVv5G9Wkw";
randomImg.alt = "random image";
randomImg.classList.add("random-img");
document.body.appendChild(randomImg);

const flightList = document.getElementById("flight-list");

function getDirectText(flightRoutes) {
  const isDirect = flightRoutes?.directFlightsAvailable;
  return isDirect ? "პირდაპირი რეისი" : "გადაჯდომით რეისი";
}

const cardsHtml = results
  .map((flight) => {
    const { location, image, flightQuotes, flightRoutes } = flight.content;

    return `
      <div class="flight-card" data-id="${flight.id}">
        <img class="flight-img" src="${image.url}" alt="${location.name}" />
        <div class="flight-body">
          <div class="flight-top">
            <h3 class="flight-name">${location.name}</h3>
          </div>
          <div class="flight-details hidden">
            <p class="flight-direct">${getDirectText(flightRoutes)}</p>
            <p class="flight-price">${flightQuotes.cheapest.price}</p>
          </div>
          <div class="flight-buttons">
            <button class="see-more-btn">See more details</button>
            <button class="remove-btn">Remove Flight</button>
          </div>
        </div>
      </div>
    `;
  })
  .join("");

flightList.insertAdjacentHTML("beforeend", cardsHtml);

const seeMoreButtons = flightList.querySelectorAll(".see-more-btn");
seeMoreButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".flight-card");
    const details = card.querySelector(".flight-details");
    details.classList.toggle("hidden");
    btn.innerText = details.classList.contains("hidden")
      ? "See more details"
      : "Hide details";
  });
});

const removeButtons = flightList.querySelectorAll(".remove-btn");
removeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".flight-card");
    card.remove();
  });
});
