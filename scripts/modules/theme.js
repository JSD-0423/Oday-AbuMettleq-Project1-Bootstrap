function switchTheme() {
  const currentTheme = getTheme();
  console.log(currentTheme);
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

let getTheme = () => {
  let theme = localStorage.getItem("theme");
  if (!theme) {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? (theme = "dark")
      : (theme = "light");
    localStorage.setItem("theme", theme);
  }
  return theme;
};

let initTheme = () => {
  let theme = localStorage.getItem("theme");
  if (!theme) {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? (theme = "dark")
      : (theme = "light");
  }
  document.documentElement.setAttribute("data-theme", theme);
};

export { switchTheme, initTheme };
