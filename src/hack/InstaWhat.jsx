import { useNavigate } from 'react-router-dom';
import instaImg from '../assets/instaimg.avif';
import WhatsappImage from '../assets/whatsapplogo.avif';
import axios from 'axios';
import { useState } from 'react';

const features = [
  {
    text: "Instagram Chat Detector",
    description: "Detect and analyze Instagram chats for suspicious activities, including digital scams and illicit communications.",
    icon: "📷",
    image: instaImg,
    route: "http://192.168.231.72:5001/analyze",
  },
  {
    text: "WhatsApp Chat Detector",
    description: "Monitor WhatsApp chats to identify potential threats like drug trafficking and online fraud.",
    icon: "💬",
    image: WhatsappImage,
    route: "http://192.168.231.72:5000/analyze",
  }
];

const InstaWhat = function ChatDetectors() {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("");

  const func = async (url) => {
    const res = await axios.get(url);
    return res.data;
  };

  return (
    <div className="flex mt-14 flex-col items-center">
      <h1 className="text-2xl sm:text-4xl lg:text-5xl text-center tracking-wide mb-6">
        Protecting <span className="bg-gradient-to-r from-orange-500 via-white to-green-600 text-transparent bg-clip-text">Digital India</span> from Online Threats
      </h1>
      
      <div className="flex flex-wrap gap-6 m-10 justify-center">
        {features.map((feature, index) => (
          <div key={index} className="p-3 w-80 sm:w-96">
            <div className="flex flex-col items-center text-center bg-neutral-900 p-6 rounded-xl shadow-lg hover:shadow-[#0f7de6] transition duration-300 transform hover:scale-105 h-auto sm:h-96 w-full">
              {/* <div className="flex h-12 w-12 mb-3 bg-orange-500 text-white justify-center items-center rounded-xl shadow-md">
                {feature.icon}
              </div> */}
              {feature.image && (
                <img
                  src={feature.image}
                  alt={feature.text}
                  className="mt-3 rounded-xl h-24 w-24 object-cover shadow-md"
                />
              )}
              <h5 className="mt-3 text-xl font-semibold text-white">{feature.text}</h5>
              <p className="text-sm p-2 mb-3 text-neutral-400 leading-relaxed flex-grow">
                {feature.description}
              </p>
              <button
                onClick={() => {
                  setReason("");
                  setStatus("");
                  func(feature.route).then((data) => {
                    console.log(data);
                    setReason(data.reason);
                    setStatus(data.status);
                  });
                }}
                className="mt-auto px-5 py-3 bg-gradient-to-r from-[#0f7de6] to-[#c80f75] text-white rounded-lg hover:bg-orange-700 transition font-medium shadow-md "
              >
                {feature.text}
              </button>
            </div>
          </div>
        ))}
      </div>

      {reason && status && (
        <div className="bg-neutral-900 p-6 rounded-xl shadow-lg mt-6 w-11/12 sm:w-3/4 md:w-1/2 text-center text-white">
          <h2 className="text-xl font-semibold mb-3">Analysis Result</h2>
          <div className="bg-neutral-800 p-4 rounded-lg shadow-md mb-2">
            <span className="text-orange-500 font-bold">Reason : </span>{reason}
          </div>
          <div className="bg-neutral-800 p-4 rounded-lg shadow-md">
            <span className="text-green-500 font-bold">Status : </span>{status}
          </div>
        </div>
      )}
    </div>
  );
}

export default InstaWhat;