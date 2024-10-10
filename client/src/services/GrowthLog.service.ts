import { GrowthLogDataTypes } from "@/types/GrowthLog";
import { responseDataTypes } from "@/types/Plant";

export const AddGrowthLog = (
  BASE: string,
  Values: GrowthLogDataTypes
): Promise<responseDataTypes> => {
  return fetch(BASE + "/growthlogs/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const GetGrowthLogDetails = (
  BASE: string,
  plantId: string,
  index: number
): Promise<GrowthLogDataTypes> => {
  return fetch(BASE + "/growthlogs/get", {
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
      return data.growthLog;
    })
    .catch((error) => {
      return error;
    });
};

export const UpdateGrowthLog = async (
  BASE: string,
  Values: GrowthLogDataTypes
): Promise<responseDataTypes> => {
  return await fetch(BASE + "/growthlogs/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};

export const DeleteGrowthLog = (
  BASE: string,
  plantId: string,
  index: number,
  imageName: string,
  userId: string
): Promise<responseDataTypes> => {
  return fetch(BASE + "/growthlogs/delete", {
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
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });
};
