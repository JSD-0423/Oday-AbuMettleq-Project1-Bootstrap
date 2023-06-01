function createArticles() {
  articles.sort((a, b) => 0.5 - Math.random());
  let gridContainer = document.querySelector(".grid-container");

  let html = "";

  for (const element of articles) {
    let ratingStars = "";

    for (let j = 0; j < 4; j++) {
      ratingStars += `<ion-icon name="star" class="rate-star"></ion-icon>`;
    }

    ratingStars += `<ion-icon name="star-half-outline" class="rate-star"></ion-icon>`;
    html += `<a href="./html/details.html"><article class="grid-item"  role="gridItem" aria-label="Click this item to navigate to full details" >
    <img src="${element.image}" alt="${element.title}">
    
      <section>
      
        <div>
          <h3>${element.category}</h3>
          <h2>${element.title}</h2>
        </div>
  
        <div class="rating">${ratingStars}</div>
        <h3 class="author">Author: ${element.author}</h3>
  
      </section>
    </article></a>`;
  }

  gridContainer.innerHTML = html;
}
// createArticles();

const popupButton = document.querySelector(".favorite-btn");
const popupContainer = document.querySelector(".favorites");

popupButton.addEventListener("click", function () {
  popupContainer.classList.toggle("active");
});

const themeToggle = document.querySelector(".theme-toggle");

function switchTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

themeToggle.addEventListener("click", switchTheme);