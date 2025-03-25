import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const AlertCard = ({ alert }) => {
  return (
    <motion.div
      className="bg-gray-900 shadow-lg rounded-2xl p-4 max-w-md mx-auto text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={alert.imageUrl}
        alt={alert.title}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h2 className="text-xl font-bold mt-3">{alert.title}</h2>
      <p className="text-gray-300 mt-2">{alert.description}</p>
      <div className="mt-4 flex justify-between text-gray-400 text-sm">
        <span>👍 {alert.likes}</span>
        <span>💬 {alert.comments.length} Comments</span>
      </div>
      {/* <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg">
        View Details
      </button> */}
    </motion.div>
  );
};

const AlertsList = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios
      .get("https://community-95v5.onrender.com/all")
      .then((response) => setAlerts(response.data))
      .catch((error) => console.error("Error fetching alerts:", error));
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r  min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">Deepfake Scam Alerts</h1>
      <motion.div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        {alerts.map((alert) => (
          <AlertCard key={alert._id} alert={alert} />
        ))}
      </motion.div>
    </div>
  );
};

export default AlertsList;
