import banner1 from "../assets/img-app/banner1.png";
import banner2 from "../assets/img-app/banner2.png";
import banner3 from "../assets/img-app/banner3.png";
import banner4 from "../assets/img-app/banner4.png";
import banner5 from "../assets/img-app/banner5.png";
import banner6 from "../assets/img-app/banner6.png";
import banner7 from "../assets/img-app/banner7.png";
import banner8 from "../assets/img-app/banner8.png";
import banner9 from "../assets/img-app/banner9.png";
import banner10 from "../assets/img-app/banner10.png";
import banner11 from "../assets/img-app/banner11.png";
import banner12 from "../assets/img-app/banner12.png";

export type genericAppData = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  linkText: string;
};

export const codingData: genericAppData[] = [
  {
    title: "Web Development",
    description: "Try some of my web apps and games right from your browser.",
    image: banner1,
    linkText: "Explore",
  },
  {
    title: "App Development",
    description: "Try some of my web apps and games right from your browser.",
    image: banner2,
    linkText: "Explore",
  },
  {
    title: "Game Development",
    description:
      "Check out Quest Plunge! My 2D Platformer Game made with Unity.",
    image: banner3,
    linkText: "Play Now",
  },
];

export const workData = [
  {
    title: "Research and Development",
    subtitle: "8 months",
    description:
      "Worked with Marine Institute and MUN to develop an automated eye tracking software.",
    image: banner4,
    linkText: "Learn More",
  },
  {
    title: "UI Developer",
    subtitle: "8 months",
    description: "Worked with Nasdaq Verafin in the Front-End Development Team",
    image: banner5,
    linkText: "Private",
  },
  {
    title: "Datalakes Developer",
    subtitle: "Present",
    description:
      "Working with Nasdaq Verafin in the Warehouse Data Preparation Team",
    image: banner6,
    linkText: "Private",
  },
];

export const educationData = [
  {
    title: "Computer Engineering (B.Eng.)",
    subtitle: "Current GPA: 4.0/4.0",
    description: "Studying in Memorial University of Newfoundland",
    image: banner7,
    linkText: "External",
  },
];

export const videoEditingData = [
  {
    title: "Documentaries",
    description:
      "Check out some of my documentaries and travel vlogs on YouTube.",
    image: banner8,
    linkText: "Watch Now",
  },
  {
    title: "Rotoscoping",
    description:
      "Manual tracing over motion picture using After Effects. Watch now.",
    image: banner9,
    linkText: "Watch Now",
  },
];

export const otherData = [
  {
    title: "Networking",
    description:
      "Built ADDS, DNS, RADIUS Server, and Guest Wi-Fi at home. Learn More.",
    image: banner10,
    linkText: "Learn More",
  },
  {
    title: "Arts and Crafts",
    description:
      "Sometimes we need a breather from school or work. See my sketches.",
    image: banner11,
    linkText: "Watch Now",
  },
  {
    title: "Personal Website",
    description:
      "This website. Designed with React, TypeScript, Vite, and MUI.",
    image: banner12,
    linkText: "Reload",
  },
];
