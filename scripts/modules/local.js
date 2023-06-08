const getFavorites = () => {
  let favorites = localStorage.getItem("favorites");
  if (!favorites) return [];
  favorites = JSON.parse(favorites);
  return favorites;
};

const addFavorite = async (topicId) => {
  const isExist = checkExists(topicId);
  let favorites = getFavorites();
  if (isExist) {
    favorites = favorites.filter((id) => id != topicId);
  } else {
    favorites.push(topicId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  console.log("Added")
};

const checkExists = (topicId) => !!getFavorites().find((id) => id == topicId);

export { getFavorites, addFavorite, checkExists };
