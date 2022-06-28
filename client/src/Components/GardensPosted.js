import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const GardensPosted = () => {
  const [myGardens, setMyGardens] = useState([]);
  const { getToken } = useContext(AuthContext);

  const getMyGardens = async () => {
    const token = getToken();
    const myHeader = new Headers({
      Authorization: `Bearer ${token}`,
    });
    var requestOptions = {
      method: "GET",
      headers: myHeader,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/user/getgardens",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      setMyGardens({
        farmName: result.farmName,

        availableOn: result.availableOn,
        description: result.description,
        groupSize: result.groupSize,
        task: result.task,
        neighborhood: result.neighborhood,
        experienceRequired: result.experienceRequired,
        childrenWelcome: result.childrenWelcome,
        image: result.image,
      });
    } catch (err) {
      console.log("error getting gardens", err);
    }
  };

  useEffect(() => {
    getMyGardens();
  }, []);

  return <div>GardenPosted</div>;
};

export default GardensPosted;
