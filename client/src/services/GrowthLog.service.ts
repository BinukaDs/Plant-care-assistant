import { GrowthLogDataTypes } from "@/types/GrowthLog";
import { PlantDataTypes } from "@/types/Plant";

export const AddGrowthLog = (BASE: string, Values: any): Promise<void> => {
  const response = fetch(BASE + "/growthlogs/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
  return response;
};

export const GetGrowthLogDetails = (
  BASE: string,
  plantId: string,
  index: string
): Promise<GrowthLogDataTypes> => {
  const response = fetch(BASE + "/growthlogs/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantId: plantId, index: index }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });

  return response;
};

export const EditGrowthLog = async (
  BASE: string,
  Values: PlantDataTypes
): Promise<void> => {
  const response = await fetch(BASE + "/growthlogs/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error)
      return error
    })

  return response;
};

export const DeleteGrowthLog = (
  BASE: string,
  plantId: string,
  index: string,
  imageName: string,
  userId: string
): Promise<void> => {
  const response = fetch(BASE + "/growthlogs/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      plantId: plantId,
      index: index,
      imageName: imageName,
    }),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });

  return response;
};
