import { responseDataTypes } from "@/types/Plant";

export const fetchLocations = (BASE: string, userId: string): Promise<[]> => {
  return fetch(BASE + "/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((payload) => {
      return payload.locations;
    })
    .catch((error) => {
      return console.error("Error fetching locations:", error);
    });
};

export const updateLocation = (
  BASE: string,
  id: string,
  location: string,
  environment: string
): Promise<responseDataTypes> => {
  return fetch(BASE + "/locations/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId: id,
      location: location,
      environment: environment,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error("Error updating Location:", error);
    });
};

export const addLocation = (
  BASE: string,
  userId: string,
  location: string,
  environment: string
): Promise<responseDataTypes> => {
  return fetch(BASE + "/locations/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      location: location,
      environment: environment,
    }),
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
  locationId: string
): Promise<responseDataTypes> => {
  return fetch(BASE + "/locations/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ locationId: locationId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error("Error Deleting Location:", error);
    });
};
