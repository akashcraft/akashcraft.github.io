import banner1 from "../assets/img-main/banner1.png";
import banner2 from "../assets/img-main/banner2.png";
import banner3 from "../assets/img-main/banner3.png";
import banner4 from "../assets/img-main/banner4.png";
import banner5 from "../assets/img-main/banner5.png";
import banner6 from "../assets/img-main/banner6.png";
import banner7 from "../assets/img-main/banner7.png";
import banner8 from "../assets/img-main/banner8.png";
import banner9 from "../assets/img-main/banner9.png";
import banner10 from "../assets/img-main/banner10.png";
import banner11 from "../assets/img-main/banner11.png";
import banner12 from "../assets/img-main/banner12.png";
import macSetupLogo from "../assets/img-macos/macSetup.png";
import { createContext } from "react";

export const images = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
  banner10,
  banner11,
  banner12,
  macSetupLogo,
];

export type genericAppData = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  linkText: string;
  link?: string;
};

export const aboutMeText: string =
  "Hello! My name is Akash Samanta. You are viewing an upcoming build of my website. Development started on 12 October 2025. The purpose of this new build is to migrate from vanilla HTML, CSS, JavaScript, PHP, and MySQL to a more modern framework of React, Material UI, and Firebase. The final build may differ from what is already there. You can always view the completed website at akashcraft.ca.";

export const codingData: genericAppData[] = [
  {
    title: "Web Development",
    description: "Try some of my web apps and games right from your browser.",
    image: banner1,
    linkText: "Explore",
    link: "web",
  },
  {
    title: "App Development",
    description:
      "My apps and games made using Flutter and Python. Download them here.",
    image: banner2,
    linkText: "Explore",
    link: "app",
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
    link: "eyeport",
  },
  {
    title: "UI Developer",
    subtitle: "8 months",
    description: "Worked with Nasdaq Verafin in the Front-End Development Team",
    image: banner5,
    linkText: "Learn More",
    link: "verafin/1",
  },
  {
    title: "Datalakes Developer",
    subtitle: "Present",
    description:
      "Working with Nasdaq Verafin in the Warehouse Data Preparation Team",
    image: banner6,
    linkText: "Learn More",
    link: "verafin/2",
  },
];

export const educationData = [
  {
    title: "Computer Engineering",
    subtitle: "Current GPA: 4.0/4.0",
    description: "Studying in Memorial University of Newfoundland",
    image: banner7,
    linkText: "Learn More",
    link: "education",
  },
];

export const videoEditingData = [
  {
    title: "Documentaries",
    description:
      "Check out some of my documentaries and travel vlogs on YouTube.",
    image: banner8,
    linkText: "Watch Now",
    link: "https://www.youtube.com/playlist?list=PLtbdWMYTs1LTHcgaZLtqBDS0XfVmMmmdy",
  },
  {
    title: "Rotoscoping",
    description:
      "Manual tracing over motion picture using After Effects. Watch now.",
    image: banner9,
    linkText: "Watch Now",
    link: "https://www.youtube.com/playlist?list=PLtbdWMYTs1LROXrqm7FyspWZHkkSsC8mg",
  },
  {
    title: "Arts and Crafts",
    description:
      "Sometimes we need a breather from school or work. See my sketches.",
    image: banner11,
    linkText: "Watch Now",
    link: "https://www.youtube.com/playlist?list=PLtbdWMYTs1LT1OG8O3EiDLtWg_OIxND1k",
  },
];

export const otherData = [
  {
    title: "Networking",
    description:
      "Built ADDS, DNS, RADIUS Server, and Guest Wi-Fi at home. Learn More.",
    image: banner10,
    linkText: "Learn More",
    link: "networking",
  },
  {
    title: "Personal Website",
    description: "This website. Built with React, Material UI, and Firebase.",
    image: banner12,
    linkText: "Reset",
  },
];

export const MacDialogContext = createContext<{
  openMacDialog: boolean;
  setOpenMacDialog: (open: boolean) => void;
}>({
  openMacDialog: false,
  setOpenMacDialog: () => {},
});
