import { topicsList, searchTopic, getTopic } from "./modules/api.js";
import {} from "./favorites.js";

let articles = [];
let categories = [];
let CatSet;
let Filterdarticles;
let BackupFilteredArticles;
async function createArticles(articles) {
  loadingContainer.remove();
  let html = "";
  gridContainer.innerHTML = html;
  filterBy.innerHTML = `<option value="default" class="select-option" tabindex="1">
  Default
</option>`;
  CatSet.forEach((element) => {
    let option = document.createElement("option");
    option.text = element;
    filterBy.appendChild(option);
  });
  for (const element of articles) {
    let ratePercentage = (element.rating / 5) * 100;
    let clipped_stars = "";
    let fixed_stars = "";

    for (let j = 0; j < 5; j++) {
      clipped_stars += `<ion-icon name="star" class="rate-star"></ion-icon>`;
      fixed_stars += `<ion-icon name="star-outline" class="rate-star"></ion-icon>`;
    }

    html += `<a href="./details.html?id=${element.id}" class="col my-4 text-decoration-none">
    <article
      class="grid-item d-flex flex-column justify-content-start"
      role="gridItem"
      aria-label="Click this item to navigate to full details"
    >
      <img src="./images/logos/${element.image}" alt="HTML" />
      <section>
        <div>
          <h2 class="category">${element.category}</h2>
          <h3 class="topic">${element.topic}</h3>
        </div>

        <div style="position:relative; margin-bottom:0.4rem">

       
          <div class="clipped-stars" style=" clip-path: polygon(0 0, ${ratePercentage}% 0, ${ratePercentage}% 100%, 0% 100%);">
          ${clipped_stars}
          </div>

          <div class="fixed-stars">
    ${fixed_stars}
        </div>
      </div>


        <h3 class="author">Author: ${element.name}</h3>
      </section>
    </article>
  </a>`;
  }
  result(articles);
  gridContainer.innerHTML = html;
}

//Variables
let gridContainer = document.querySelector(".grid-container");
let loadingCircle = document.querySelector(".loading-Circle");
let loadingContainer = document.querySelector(".loading-container");
let search = document.querySelector(".search-input");
let sortBy = document.getElementById("sort-by");
let filterBy = document.getElementById("filter-by");
let results = document.querySelector(".results");
let resultsNumber = 0;

let typingTimer;
search.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(searchByTopic, 300);
});

//Events
addEventListener("load", async () => {
  articles = await topicsList();
  for (const article of articles) {
    categories.push(article.category);
  }
  console.log(categories);
  CatSet = new Set(categories);
  console.log(CatSet);
  if (articles.length === 0) {
    error();
  } else if (articles.length >= 1) {
    await createArticles(articles);
  }
});
//functions

let searchByTopic = async () => {
  let inputValue = search.value;
  if (inputValue === "") {
    articles = await topicsList();
    createArticles(articles);
  } else {
    articles = await searchTopic(search.value);
  }
  createArticles(articles);
};
let sort = async () => {
  if (!Filterdarticles) {
    if (sortBy.value === "topic-title") {
      sortByTopic(articles);
    } else if (sortBy.value === "author-name") {
      sortbyNAme(articles);
    } else if (sortBy.value === "default") articles = await topicsList();
    createArticles(articles);
  } else {
    if (sortBy.value === "topic-title") {
      sortByTopic(Filterdarticles);
      createArticles(Filterdarticles);
    } else if (sortBy.value === "author-name") {
      sortbyNAme(Filterdarticles);
      createArticles(Filterdarticles);
    } else if (sortBy.value === "default") {
      createArticles(BackupFilteredArticles);
    }
  }
};

let fitlerDynamic = async () => {
  if (filterBy.value === "default") {
    articles = await topicsList();
    Filterdarticles = null;

    createArticles(articles);
  } else {
    Filterdarticles = articles.filter(
      (article) => article.category === filterBy.value
    );
    BackupFilteredArticles = [...Filterdarticles];
    createArticles(Filterdarticles);
  }
};
let sortByTopic = (articles) => {
  articles.sort((a, b) => {
    return a.topic.localeCompare(b.topic);
  });
  createArticles(articles);
};

let sortbyNAme = (articles) => {
  articles.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  createArticles(articles);
};
sortBy.addEventListener("change", sort);
filterBy.addEventListener("change", fitlerDynamic);
let result = (articles) => {
  results.textContent = `"${articles.length}" Web Topics Found`;
};
let error = () => {
  loadingCircle.remove();
  loadingContainer.innerHTML += `<h2 >Something went wrong. Web topics failed to load.</h2>
  <button
    class="reload-button"
    role="button"
    aria-label="Reload"
    onclick="location.reload()"

  >
  
    <p class="text-btn-title reset px-1">Reload</p>
  </button>`;
};
