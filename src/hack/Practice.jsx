import React, { useEffect, useState } from "react";
import Barchart from "./Barchart";
import axios from "axios";

const Practice = ({ imageurl }) => {
  console.log(imageurl);

  const [backendData, setbackendData] = useState([]);

  const func = async () => {
    const res = await axios.post(
      "https://image-detection-dv2h.onrender.com/detect",
      { image_url: imageurl }
    );
    return res.data;
  };

  useEffect(() => {
    func().then((res) => {
      console.log(res);
      setbackendData(res.result);
    });
  }, []);

  if (backendData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Fake vs Real Score</h2>
      <Barchart data={backendData} />
      <button className="mt-4 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600">
        Refresh
      </button>
    </div>
  );
};

export default Practice;
