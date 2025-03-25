import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Chatbot from "./hack/Chatbot";
import Adds from "./hack/Adds";

const App = () => {
  return (
    <>
      
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Chatbot></Chatbot>
        <Adds></Adds>
        <Workflow />
        <Pricing />
        <Testimonials />
        
      </div>
    </>
  );
};

export default App;
