async function removeBg (imgurl) {
  const url = "https://background-removal.p.rapidapi.com/remove";
  const data = new FormData();
  data.append("image_url", imgurl);

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "1a3b6aa4d6msh183ae62042777b2p1d4b7ajsn96e1ef7219ef",
      "x-rapidapi-host": "background-removal.p.rapidapi.com",
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = removeBg;
