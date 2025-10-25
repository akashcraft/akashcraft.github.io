import img1 from "./../assets/img-main/banner1.png";
import img2 from "./../assets/img-web/airport-yyt.png";
import img3 from "./../assets/img-web/mahjong.png";
import img4 from "./../assets/img-web/windows8.png";
import img5 from "./../assets/img-web/gradeplus.png";

export const images = [img1, img2, img3, img4, img5];

export type WebDataType = {
  appName: string;
  image: string;
  description: string;
  logo?: string;
  type?: WebFilterType;
  isWideOnly?: boolean;
  smallChipLabel: string[];
  smallChipLinks: string[];
};

export type WebFilterType = "Aviation" | "Games" | "Replicas" | "Legacy";
export const WebTypeFilters: WebFilterType[] = [
  "Aviation",
  "Games",
  "Replicas",
  "Legacy",
];

export type LegacyAppDataType = {
  appName: string;
  icon: string;
  link: string;
  description: string;
};

export const webData: WebDataType[] = [
  {
    appName: "Air Canada In-Flight Map",
    image: images[0],
    type: "Aviation",
    isWideOnly: true,
    description: "Interactive Aircraft Progress Map",
    smallChipLabel: ["Start", "View Source Code"],
    smallChipLinks: [
      "/mapcraft.html",
      "https://github.com/akashCraft/MapCraft",
    ],
  },
  {
    appName: "Live Airport Schedules",
    image: images[1],
    type: "Aviation",
    description:
      "Live Flight Schedules for St. John's International Airport (CYYT/YYT)",
    smallChipLabel: ["Start"],
    smallChipLinks: ["/airport/yyt"],
  },
  {
    appName: "Mahjong Flip Game",
    image: images[2],
    type: "Games",
    description: "A fun and interactive Mahjong game.",
    smallChipLabel: ["Start"],
    smallChipLinks: ["/mahjong"],
  },
  {
    appName: "Windows 8.1 Replica",
    image: images[3],
    type: "Replicas",
    isWideOnly: true,
    description: "A limited replica of the Windows 8.1 interface.",
    smallChipLabel: ["Start"],
    smallChipLinks: ["/windows8.html"],
  },
  {
    appName: "GradePlus",
    image: images[4],
    type: "Legacy",
    description: "ECE 6400 Project",
    smallChipLabel: ["View Source Code"],
    smallChipLinks: ["https://github.com/akashcraft/GradePlus"],
  },
];
