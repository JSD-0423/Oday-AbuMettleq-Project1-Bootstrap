import { getFavorites } from "./modules/local.js";
import { getTopic } from "./modules/api.js";

const popupButton = document.querySelector(".favorite-btn");
const popupContainer = document.querySelector(".favorites");
const favoritesSlider = document.querySelector(".slider");

popupButton.addEventListener("click", async () => {
  popupContainer.classList.toggle("active");
  favoritesSlider.innerHTML = "";

  const favorites = getFavorites();
  const results = await Promise.all(
    favorites.map((favorite) => getTopic(favorite))
  );

  results.forEach((topic) => {
    const favoriteArticle = createFavoriteArticle(topic);
    favoritesSlider.appendChild(favoriteArticle);
  });
});

function createFavoriteArticle(topic) {
  const favoriteArticle = document.createElement("article");
  let ratePercentage = (topic.rating / 5) * 100;
  let clipped_stars = "";
  let fixed_stars = "";

  for (let j = 0; j < 5; j++) {
    clipped_stars += `<ion-icon name="star" class="rate-star"></ion-icon>`;
    fixed_stars += `<ion-icon name="star-outline" class="rate-star"></ion-icon>`;
  }
  favoriteArticle.innerHTML = `
    <article class="favorite-topic d-flex flex-column">
      <img
        src="./images/logos/${topic.image}"
        alt=""
        class="m-0 w-100 object-fit-cover h-55"
      />
      <section>
        <h2>${topic.topic}</h2>
        <div style="position:relative; margin-bottom:0.4rem">

       
          <div class="clipped-stars" style=" clip-path: polygon(0 0, ${ratePercentage}% 0, ${ratePercentage}% 100%, 0% 100%);">
          ${clipped_stars}
          </div>

          <div class="fixed-stars">
    ${fixed_stars}
        </div>
      </div>
      </section>
    </article>`;
  return favoriteArticle;
}

function createRatingStars(rating) {
  const stars = `<ion-icon name="star"></ion-icon>`.repeat(rating);
  return stars;
}
