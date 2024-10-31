import { responseDataTypes } from "@/types/Plant";
import { UserDataTypes, UsersDataTypes } from "@/types/User";

export const FetchUser = async (
  BASE: string,
  UserId: string
): Promise<UserDataTypes> => {
  return await fetch(BASE + "/users/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserId: UserId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((payload) => {
      return payload.user;
    })
    .catch((error) => {
      return console.error("Error fetching user:", error);
    });
};

export const UpdateUser = async (
  BASE: string,
  UserId: string,
  username: string
): Promise<responseDataTypes> => {
  return await fetch(BASE + "/users/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserId: UserId, username: username }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error("Error Updating user:", error);
    });
};

export const UpdatePassword = async (
  BASE: string,
  UserId: string,
  password: string
): Promise<responseDataTypes> => {
  return await fetch(BASE + "/passwords/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserId: UserId, password: password }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return console.error("Error Updating user:", error);
    });
};
export const FetchUsers = async (BASE: string): Promise<UsersDataTypes> => {
  return await fetch(BASE + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((payload) => {
      return payload.users;
    })
    .catch((error) => {
      return console.error("Error fetching users:", error);
    });
};
