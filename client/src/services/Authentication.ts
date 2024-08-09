import { RegisterDataTypes } from "@/types/Authentication";
import { PlantDataTypes } from "@/types/Plant";
interface ExportDataTypes {
  id: string;
  isLoggedin: boolean;
}

export const FetchAuthentication = (BASE: string): Promise<ExportDataTypes> => {
  const data = fetch(BASE + "/isUserAuth", {
    headers: {
      "x-access-token": localStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.id) {
        return {
          id: data.id,
          isLoggedin: data.isLoggedin,
          username: data.username,
        };
      } else {
        return { id: null, isLoggedin: false };
      }
    })
    .catch((error) => {
      return error;
    });

  return data;
};

export const FetchSignIn = (
  BASE: string,
  Values: PlantDataTypes
): Promise<string> => {
  const response = fetch(BASE + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      // console.log('Success:', data);
      console.log("Logged In!");
      return { status: "400", message: "Logged In!", token: data.token };
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });

  return response;
};

export const FetchRegister = async (
  BASE: string,
  Values: RegisterDataTypes
): Promise<string> => {
  const response = await fetch(BASE + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Signed Up!");
      //localStorage.setItem("token", data.token);
      return { status: "201", message: "Signed Up!", token: data.token };
    })
    .catch((error) => {
      console.error(error);
      return error;
    });

  return response;
};
