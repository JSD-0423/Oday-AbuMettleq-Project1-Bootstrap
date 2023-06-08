const BASE_URL = "https://tap-web-1.herokuapp.com";
const Topics_DIR = "/topics/";

const topicsList = async () => {
  try {
    const response = await fetch(`${BASE_URL + Topics_DIR}list`, {
      method: "GET",
    });
    const topics = await response.json();
    return topics;
  } catch (error) {
    console.log("ERORR");
    return [];
  }
};
const searchTopic = async (topic) => {
  try {
    const response = await fetch(
      `${BASE_URL + Topics_DIR}list?phrase=${topic}`,
      {
        method: "GET",
      }
    );

    const topics = await response.json();

    return topics;
  } catch (error) {
    return [];
  }
};
const getTopic = async (topic) => {
  try {
    const response = await fetch(`${BASE_URL + Topics_DIR}details/${topic}`, {
      method: "GET",
    });

    const topics = await response.json();
    return topics;
  } catch (error) {
    return [];
  }
};


export { topicsList, searchTopic, getTopic };
