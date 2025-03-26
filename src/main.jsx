import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";
import News from "./hack/News.jsx";
import Photos from "./hack/Photos.jsx";
import Videos from "./hack/Videos.jsx";
import Transcript from "./hack/Transcript.jsx";
import Socialmedia from "./hack/Socialmedia.jsx";
import Commu from "./hack/Commu.jsx";
import AboutUs from "./components/About.jsx";
import ContactUs from "./components/ContactUs.jsx";
import "./i18n.js"; 
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import Pricing from "./components/Pricing.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Test from "./hack/Test.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/news" element={<News />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/transcript" element={<Transcript />} />
        <Route path="/socialmedia" element={<Socialmedia />} />
                <Route path="/about" element={<AboutUs />} />
<Route path="/contact" element={<ContactUs />} />
<Route path="/price" element={<div className="ml-40 mr-40 "><Pricing /></div>} />
                <Route path="/community" element={<Commu />} />
                <Route path="/testimonial" element={<Test />} />
                                <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
    </Router>
    </I18nextProvider>
  </React.StrictMode>
);
