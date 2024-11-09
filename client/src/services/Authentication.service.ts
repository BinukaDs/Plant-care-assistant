import { RegisterDataTypes } from "@/types/Authentication";
import Cookies from "universal-cookie";
import { responseDataTypes } from "@/types/Plant";
interface ExportDataTypes {
  username: string;
  id: string;
  isLoggedin: boolean;
}

export const FetchAuthentication = (
  BASE: string,
  token: string
): Promise<ExportDataTypes> => {
  const data = fetch(BASE + "/isUserAuth", {
    headers: {
      "x-access-token": token || "",
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
        return { id: null, isLoggedin: false, data: data };
      }
    })
    .catch((error) => {
      return error;
    });

  return data;
};

export const FetchSignIn = (
  BASE: string,
  Values: { email: string; password: string }
): Promise<responseDataTypes> => {
  const response = fetch(BASE + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log("Success:", data);
      // console.log("Logged In!");
      return data;
    })
    .catch((error) => {
      // console.error("Error:", error);
      return error;
    });

  return response;
};

export const SignOut = () => {
  const cookies = new Cookies();
  cookies.remove("token");
  window.location.reload();
};

export const FetchRegister = async (
  BASE: string,
  Values: RegisterDataTypes
): Promise<responseDataTypes> => {
  const response = await fetch(BASE + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Values),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log("Success:", data);
      // console.log("Logged In!");
      return data;
    })
    .catch((error) => {
      // console.error("Error:", error);
      return error;
    });

  return response;
};
