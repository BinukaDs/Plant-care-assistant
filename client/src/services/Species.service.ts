import { responseDataTypes, SpeciesDataTypes } from "@/types/Plant";

export const addSpecies = async (
  BASE: string,
  name: string
): Promise<responseDataTypes> => {
  return await fetch(BASE + "/species/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error adding species:", error);
      return error;
    });
};

export const getSpecies = async (
  BASE: string,
  id: string
): Promise<responseDataTypes> => {
  return await fetch(BASE + "/species", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching species:", error);
      return error;
    });
};

export const getAllSpecies = async (
  BASE: string
): Promise<SpeciesDataTypes[]> => {
  return await fetch(BASE + "/species", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((payload) => {
      return payload.species;
    })
    .catch((error) => {
      console.error("Error fetching species:", error);
      return error;
    });
};

export const getAllSpeciesFiltered = async (
  BASE: string
): Promise<SpeciesDataTypes[]> => {
  return await fetch(BASE + "/species/filtered", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((payload) => {
      return payload.species;
    })
    .catch((error) => {
      console.error("Error Fetching species filtered: ", error);
      return error;
    });
};
