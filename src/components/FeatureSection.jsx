import { useNavigate } from "react-router-dom";
import { features } from "../constants";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-10 border-b border-neutral-800 min-h-[800px] bg-gradient-to-r text-white py-16">
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-3 py-1 uppercase">
          Features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-10 tracking-wide font-bold">
          Explore potential of  {" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
           FactShield
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 lg:mt-20 px-6">
        {features.map((feature, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-col items-center text-center bg-neutral-900 p-8 rounded-2xl shadow-lg hover:shadow-orange-500/50 transition duration-300">
              {/* Icon Styling */}
              <div className="flex h-12 w-12 mb-4 bg-orange-500 text-white justify-center items-center rounded-xl shadow-md">
                {feature.icon}
              </div>
              
              {/* Image Styling */}
              {feature.image && (
                <img
                  src={feature.image}
                  alt={feature.text}
                  className="mt-4 rounded-xl h-28 w-28 object-cover shadow-md"
                />
              )}
              
              <h5 className="mt-4 text-2xl font-semibold text-white">{feature.text}</h5>
              <p className="text-md p-2 mb-4 text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Button Styling */}
              <button
                onClick={() => navigate(feature.route)}
                className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition font-medium shadow-md hover:shadow-orange-600/50"
              >
                 {feature.text}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;