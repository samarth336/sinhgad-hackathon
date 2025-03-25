import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../constants";

const Adds = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-6 overflow-hidden">
      <div className="relative w-full max-w-4xl flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full bg-gray-800 p-6 rounded-2xl shadow-xl flex items-center"
          >
            <div className="w-2/3 text-white p-6">
              <h2 className="text-xl font-semibold">{testimonials[index].user}</h2>
              <p className="text-gray-400">{testimonials[index].company}</p>
              <p className="mt-4 text-lg">{testimonials[index].text}</p>
            </div>
            <div className="w-1/3 flex justify-center items-center">
              <motion.img
                src={testimonials[index].image}
                alt={testimonials[index].user}
                className="w-32 h-32 rounded-xl shadow-lg object-cover border-4 border-gray-700"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Adds;
