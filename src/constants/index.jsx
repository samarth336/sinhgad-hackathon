import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "ContactUs", href: "/contact" },
  { label: "Pricing", href: "/price" },
  { label: "Testimonials", href: "/testimonial" },
];

export const testimonials = [
  {
    user: "Dr. Rajesh Verma",
    company: "CMR College of Hyderabad",
    image: user1,
    text: "This project is incredible and truly novel. Its accuracy in detecting deepfakes is impressive. It has the potential to revolutionize media verification and combat misinformation.",
  },
  {
    user: "Badagarvala",
    company: "Badagarvala Startup",
    image: user2,
    text: "I was amazed by the accuracy of this tool. Its multi-platform support makes it user-friendly, and the government reporting feature is a great initiative.",
  },
  {
    user: "Siddharam Sutar",
    company: "Innovative AI Solutions",
    image: user3,
    text: "This project stands out for its speed and accuracy in real-time fact-checking. Multi-language support makes it widely accessible.",
  },
  {
    user: "Meera Patil",
    company: "TechSecure Labs",
    image: user4,
    text: "Misinformation is a big issue, and this AI-powered solution adapts well to deepfake techniques. The government reporting system adds real-world impact.",
  },
  {
    user: "Rohan Desai",
    company: "Future Vision AI",
    image: user5,
    text: "This is a game-changer, not just for fake news detection but also for startups. The integration of ads makes it both impactful and sustainable.",
  },
  {
    user: "Ananya Sharma",
    company: "Ethical AI Initiative",
    image: user6,
    text: "This system works amazingly well. A misinformation-free internet feels possible with its seamless support for multiple devices.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Fact Checker",
    description:
      "Detect fake or misleading text-based news articles",
      image:'/src/assets/text.jpg',
          route:'/news'

  },
  {
    icon: <Fingerprint />,
    text: "Image Inspector",
    description:
      "Detect tampered or manipulated images",
            image:'/src/assets/photo.jpg',
          route:'/photos'

  },
 
  {
    icon: <BatteryCharging />,
    text: "Deepfake Detector",
    description:
      "Identify and expose fake or altered videos",
      ///src/assets/video.jpg
     image:'/src/assets/video.jpg',
          route:'/videos'
          

  },
  {
    icon: <PlugZap />,
    text: "Content Detector",
    description:
      "Identify and expose fake or altered transcripts",
           image:'/src/assets/transcript.jpg',
          route:'/transcript'

  },
  {
    icon: <GlobeLock />,
    text: "Social Media Detector",
    description:
      "Identify and expose fake or altered social media posts",
      image:'/src/assets/media.jpg',
          route:'/socialmedia'

  },
   {
    icon: <ShieldHalf />,
    text: "Community Support",
    description:
      "Jumpstart VR projects with built-in templates",
     image:'/src/assets/media.jpg',
      route:'/community'

  },
];

export const checklistItems = [
  {
    title: "Spot Deepfakes Instantly",
    description:
      "Not sure if a photo or video is real? Our AI-powered tool helps you detect deepfakes with high accuracy, so you never fall for fake content again.",
  },
  {
    title: "Stopping Fake News, One Report at a Time",
    description:
      "Misinformation spreads fast, but we’re faster! Our app doesn’t just detect fake news—it reports it directly to the government, making the internet a safer place for everyone.",
  },
  {
    title: "Speak Your Language, Stay Informed",
    description:
      "No language barriers here! Our app works in multiple languages, ensuring everyone gets the right information, no matter where they’re from.",
  },
  {
    title: "Works Everywhere—From Phones to Smartwatches",
    description:
      "Fake news and deepfakes don’t wait, so why should you? Our app runs on Android, iOS, desktops, and even smartwatches, keeping you protected at all times.",
  },
];

export const pricingOptions = [
  {
    title: "Starter (Free Trial)",
    price: "$0",
    features: [
      "Run free ads for 7 days",
      "Basic email marketing campaign",
      "Limited audience reach",
      "Ad placement in community section",
    ],
  },
  {
    title: "Growth",
    price: "$49",
    features: [
      "Run ads for 30 days",
      "Targeted email campaigns",
      "Featured in recommended businesses",
      "Social media promotion",
      "Priority ad placement in trending section",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Unlimited ad placements",
      "Advanced audience targeting",
      "Dedicated digital marketing strategy",
      "Brand awareness campaigns",
      "Premium positioning on our platform",
    ],
  },
];export const resourcesLinks = [
  { href: "#", text: "getting_started" }, // Change "Getting Started" to "getting_started"
  { href: "#", text: "documentation" }, // Change "Documentation" to "documentation"
  { href: "#", text: "tutorials" }, // Change "Tutorials" to "tutorials"
  { href: "#", text: "api_reference" }, // Change "API Reference" to "api_reference"
  { href: "#", text: "community_forums" }, // Change "Community Forums" to "community_forums"
];
export const platformLinks = [
  { href: "#", text: "features" }, // Change "features" to "features"
  { href: "#", text: "supported_devices" }, // Change "supported devices" to "supported_devices"
  { href: "#", text: "system_requirements" }, // Change "system requirements" to "system_requirements"
  { href: "#", text: "downloads" }, // Change "downloads" to "downloads"
  { href: "#", text: "release_notes" }, // Change "release notes" to "release_notes"
];

export const communityLinks = [
  { href: "#", text: "events" }, // Change "Events" to "events"
  { href: "#", text: "meetups" }, // Change "Meetups" to "meetups"
  { href: "#", text: "conferences" }, // Change "Conferences" to "conferences"
  { href: "#", text: "hackathons" }, // Change "Hackathons" to "hackathons"
  { href: "#", text: "jobs" }, // Change "Jobs" to "jobs"
];
