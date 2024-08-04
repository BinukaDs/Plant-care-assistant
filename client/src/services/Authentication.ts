interface ExportDataTypes {
  id: string;
  isLoggedin: boolean;
}

export const FetchAuthentication = (BASE: string):Promise<ExportDataTypes> => {
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
        return { id: data.id, isLoggedin: data.isLoggedin, username: data.username };
      } else {
        return { id: null, isLoggedin: false };
      }
      
    })
    .catch((error) => {
      return error;
    });

    return data;
};
