import { addFavorite, checkExists } from "./modules/local.js";
import { getTopic } from "./modules/api.js";
import { switchTheme, initTheme } from "./modules/theme.js";

//variables
const themeToggle = document.querySelector(".theme-toggle");

const mainSection = document.querySelector(".main-details");
const id = getId();
const subTopicsContent = document.querySelector(".sub-topics-content");
const sidBar = document.querySelector(".side-bar");
let buttonText = "Add to Favorites";
initTheme();
createPage();

//events
themeToggle.addEventListener("click", switchTheme);

async function createPage() {
  let element = await getTopicDetails();

  let clipped_stars = "";
  let fixed_stars = "";
  for (let j = 0; j < 5; j++) {
    clipped_stars += `<ion-icon name="star" class="rate-star"></ion-icon>`;
    fixed_stars += `<ion-icon name="star-outline" class="rate-star"></ion-icon>`;
  }

  let ratePercentage = (element.rating / 5) * 100;
  let category = `<h2 class="category">${element.category}</h2>`;
  let topic = `<h3 class="title">${element.topic}</h3>`;
  let description = `<p class="description h-100">${element.description}</p>`;
  let rating = ` <div class="rating"><div class="clipped-stars" style=" clip-path: polygon(0 0, ${ratePercentage}% 0, ${ratePercentage}% 100%, 0% 100%);">
  ${clipped_stars}
  </div>
  <div class="fixed-stars">
  ${fixed_stars}
  </div>  </div>`;
  let subtopics = element.subtopics;
  for (let i in subtopics) {
    let content = `
   
    <div>
    <ion-icon name="checkmark-circle-outline" class="check-mark">
    </ion-icon>
    <h3 class="reset">${subtopics[i]}</h3>
  </div>   
`;

    subTopicsContent.innerHTML += content;
  }

  let createSideBar = () => {
    // Create the img element
    const image = document.createElement("img");
    image.src = `./images/logos/${element.image}`;
    image.alt = element.top;
    image.classList.add("object-fit-cover", "m-0");

    // Create the h3 element
    const title = document.createElement("h3");
    const strong = document.createElement("strong");
    strong.classList.add("mx-2");
    strong.textContent = element.topic;
    title.appendChild(strong);

    // Create the anchor element
    const anchor = document.createElement("a");
    anchor.href = "#";
    anchor.textContent = element.name;
    title.appendChild(anchor);

    // Create the section element
    const section = document.createElement("section");
    section.classList.add("side-bar-content", "h-100");

    // Create the h3 element for "Interested in this topic?"
    const heading = document.createElement("h3");
    heading.textContent = "Interested in this topic?";

    // Create the button element
    const button = document.createElement("button");
    button.classList.add(
      "add-to-favorites",
      "d-flex",
      "justify-content-center",
      "gap-4",
      "align-items-center",
      "px-2"
    );
    button.onclick = addToF;

    // Create the p element for the button state
    const p = document.createElement("p");
    p.classList.add("button-state");
    p.textContent = checkExists(id)
      ? "Remove from Favorites"
      : "Add to Favorites";
    button.appendChild(p);
    button.addEventListener("click", () => {
      p.textContent = checkExists(id) ? "Remove from Favorites" : "Add to Favorites";
    });
    // Create the ion-icon element
    const icon = document.createElement("ion-icon");
    icon.name = "heart-outline";
    icon.role = "img";
    icon.classList.add("md", "hydrated");
    button.appendChild(icon);

    // Create the h4 element for "Unlimited Credits"
    const credits = document.createElement("h4");
    credits.classList.add("text-center");
    credits.textContent = "Unlimited Credits";

    // Create the div element for the "add-to-fav" section
    const div = document.createElement("div");
    div.classList.add(
      "add-to-fav",
      "d-flex",
      "flex-column",
      "p-3",
      "mt-2",
      "justify-content-between",
      "g-5"
    );
    div.appendChild(heading);
    div.appendChild(button);
    div.appendChild(credits);

    // Append the elements to the section
    sidBar.appendChild(image);
    section.appendChild(title);
    section.appendChild(div);

    sidBar.appendChild(section);
  };

  mainSection.innerHTML += category;
  mainSection.innerHTML += topic;
  mainSection.innerHTML += rating;
  mainSection.innerHTML += description;
  createSideBar();
}

//Functions
function getId() {
  const url = window.location.href;
  const params = new URLSearchParams(url.substring(url.indexOf("?")));
  return params.get("id");
}
async function addToF() {
  await addFavorite(id);
}
async function getTopicDetails() {
  return await getTopic(id);
}

function buttonState() {
  buttonText = checkExists(id) ? "Remove from Favorites" : "Add to Favorites";
}
