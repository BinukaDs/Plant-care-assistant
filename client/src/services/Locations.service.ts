export const fetchLocations = (BASE: string): Promise<[]> => {
  return fetch(BASE + "/locations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return console.error("Error fetching locations:", error);
    });
};

export const addLocation = (
  BASE: string,
  location: string,
  environment: string
): Promise<JSON | string> => {
  return fetch(BASE + "/locations/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location: location, environment: environment }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error("Error adding Location:", error);
    });
};

export const deleteLocation = (
  BASE: string,
  location: string
): Promise<string> => {
  return fetch(BASE + "locations/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Id: location }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error("Error Deleting Location:", error);
    });
};
