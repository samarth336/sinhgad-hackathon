import { useNavigate } from "react-router-dom";
import { features } from "../constants";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-10 border-b border-neutral-800 min-h-[800px] bg-gradient-to-r text-white py-16">
      <div className="text-center">
        <span className="bg-neutral-900 text-white rounded-full h-6 text-3xl font-medium px-3 py-1 uppercase">
          Features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-10 tracking-wide font-bold">
          Explore potential of  {" "}
          <span className="bg-gradient-to-r from-[#0f7de6] to-[#c80f75] text-transparent bg-clip-text">
            FactShield
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 lg:mt-20 px-6">
        {features.map((feature, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-col items-center text-center bg-[#bebdc71f] p-8 rounded-2xl shadow-lg 
                      transition duration-300 hover:shadow-[#0f7de6] hover:scale-105">

              {/* Image Styling */}
              {feature.image && (
                <img
                  src={feature.image}
                  alt={feature.text}
                  className="mt-4 rounded-xl h-48 w-[235px] object-cover shadow-md"
                />
              )}

              <h5 className="mt-4 text-2xl font-semibold text-white">{feature.text}</h5>
              <p className="text-md p-2 mb-4 text-neutral-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Button Styling */}
              <button
                onClick={() => {
                  if (feature.route.includes("videos")) {
                    window.open("http://192.168.231.171:8001/", "_blank");
                    return;
                  }
                  navigate(feature.route);
                }}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#0f7de6] to-[#c80f75] text-white rounded-lg 
                     hover:bg-orange-700 transition font-medium shadow-md hover:scale-105"
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