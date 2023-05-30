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

const popupButton = document.querySelector(".favorite-btn");
const popupContainer = document.querySelector(".favorites");
popupButton.addEventListener("click", function () {
  popupContainer.classList.toggle("active");
});

var heading = document.querySelector(".page-title");

heading.addEventListener("click", function () {
  window.location.href = "../index.html";
});
