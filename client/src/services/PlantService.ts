import { PlantDataTypes } from "@/types/Plant";
import { PlantsDataTypes } from "@/types/Plant";
import { StringFormat } from "firebase/storage";

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

export const AddPlant = async (BASE: string, Values: Array<PlantDataTypes>) => {
  const response = await fetch(BASE + "/plants/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });

  return response;
};

export const DeletePlant = async (BASE: string,UserId: string,plantId: string,imageName: string): Promise<void> => {
  const response = await fetch(BASE + "/plants/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: UserId,
      plantId: plantId,
      imageName: imageName,
    }),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error deleting plant:", error);
      return error;
    });

  return response;
};
