function createArticles() {
  articles.sort((a, b) => 0.5 - Math.random());
  let gridContainer = document.querySelector(".grid-container");

  let html = "";

  for (let i = 0; i < articles.length; i++) {
    let ratingStars = "";

    for (let j = 0; j < 4; j++) {
      ratingStars += `<ion-icon name="star" class="rate-star"></ion-icon>`;
    }

    ratingStars += `<ion-icon name="star-half-outline" class="rate-star"></ion-icon>`;
    html += `<article class="grid-item"  role="gridItem" aria-label="Click this item to navigate to full details" >
    <img src="${articles[i].image}" alt="${articles[i].title}">
    
      <section>
      
        <div>
          <h3>${articles[i].category}</h3>
          <h2>${articles[i].title}</h2>
        </div>
  
        <div class="rating">${ratingStars}</div>
        <h3 class="author">Author: ${articles[i].author}</h3>
  
      </section>
    </article>`;
  }

  gridContainer.innerHTML = html;
}
createArticles();

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

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach((e) => {
  e.addEventListener("click", navigateToPage);
});

function navigateToPage() {
  window.location.href = "./html/details.html";
}

var heading = document.querySelector(".page-title");

heading.addEventListener("click", function () {
  window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  var scrollToBottom = document.getElementById("scrollToBottom");

  // Show the button when scrolling down
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollToBottom.classList.add("show");
    } else {
      scrollToBottom.classList.remove("show");
    }
  });

  // Scroll to the bottom of the page
  scrollToBottom.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
});
