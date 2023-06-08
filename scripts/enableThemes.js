import { switchTheme, initTheme } from "./modules/theme.js";
initTheme();
const themeButton = document.querySelector(".theme-toggle");
themeButton.addEventListener("click", switchTheme);
