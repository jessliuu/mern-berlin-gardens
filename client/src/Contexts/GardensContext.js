import { createContext, useState } from "react";

export const GardensContext = createContext();

export const GardensContextProvider = (props) => {
  const [gardens, setGardens] = useState();
  const [loader, setLoader] = useState(true);

  const options = { method: "GET" };

  const fetchGardens = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/garden/browse",
        options
      );
      console.log("response", response);
      const data = await response.json();
      const cleandata = data.allGardens;
      console.log("data", data);
      setGardens(cleandata);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <GardensContext.Provider value={{ gardens, loader, fetchGardens }}>
      {props.children}
    </GardensContext.Provider>
  );
};
