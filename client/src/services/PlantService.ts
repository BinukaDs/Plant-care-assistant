import { PlantDataTypes } from "@/types/Plant";
import { PlantsDataTypes } from "@/types/Plant";

export const FetchPlantDetails = (
  BASE: string,
  plantId: string,
  UserId: string
): Promise<PlantDataTypes> => {
  const data = fetch(BASE + "/plants/get/plant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantId: plantId, userId: UserId }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data.plant;
    })
    .catch((error) => {
      return console.error("Error fetching plant details:", error);
    });

  return data;
};

export const FetchPlants = (
  BASE: string,
  UserId: string
): Promise<PlantsDataTypes> => {
  const data = fetch(BASE + "/plants/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserId: UserId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data.plants;
    })
    .catch((error) => {
      return console.error("Error fetching plants:", error);
    });

  return data;
};
