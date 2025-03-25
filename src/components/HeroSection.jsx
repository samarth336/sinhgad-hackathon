import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import { FaFlag } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        {t("title")}
        <span className="bg-gradient-to-r from-orange-500 via-white to-green-600 text-transparent bg-clip-text">
  {" "}
 {t("subtitle")}
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        {t("description")} 🚀
      </p>
      <div className="flex justify-center my-10">
        <a
  href="/community"
  className="bg-gradient-to-r from-orange-500 to-orange-800 text-white font-semibold py-3 px-5 mx-3 rounded-md shadow-md transition-all duration-300 hover:from-orange-600 hover:to-orange-900 hover:shadow-lg"
>
  {/* Explore Community */}
  {t("explore_community")}
</a>

       <a
  href="/app.apk"
  download
  className="bg-gradient-to-r from-orange-500 to-orange-800 text-white font-semibold py-3 px-5 mx-3 rounded-md shadow-md transition-all duration-300 hover:from-orange-600 hover:to-orange-900 hover:shadow-lg"
>
  {t("downloads")}
</a>


      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
