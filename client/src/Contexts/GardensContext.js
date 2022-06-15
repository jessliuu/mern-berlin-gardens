import { createContext, useState } from "react";

export const GardensContext = createContext();

export const GardensContextProvider = (props) => {
  const [gardens, setGardens] = useState();
  const [loader, setLoader] = useState(true);

  const options = { method: "GET" };

  const fetchGardens = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/garden/all",
        options
      );
      const data = await response.json();
      console.log("data", data);
      setGardens(data);
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
