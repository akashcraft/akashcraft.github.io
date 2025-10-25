import img1 from "./../assets/img-app/LightCraft.jpeg";
import img2 from "./../assets/img-work/eyeport7.png";

export const images = [img1, img2];

export type AppData = {
  appName: string;
  image: string;
  description: string;
  smallChipLabel: string[];
  smallChipIcons: string[];
  smallChipLinks: string[];
};

export type LegacyAppDataType = {
  appName: string;
  icon: string;
  link: string;
  description: string;
};

export const appData: AppData[] = [
  {
    appName: "LightCraft",
    image: images[0],
    description:
      "Software to control Bluetooth LED Strips like QHM-0A9E. Click to open Wiki or GitHub.",
    smallChipLabel: ["Open Wiki", "View Source Code"],
    smallChipIcons: ["Description", "GitHub"],
    smallChipLinks: [
      "https://github.com/akashcraft/LED-Controller/wiki",
      "https://github.com/akashCraft/LED-Controller",
    ],
  },
  {
    appName: "EyePort",
    image: images[1],
    description:
      "Software to collect, analyze, and export Eye-Tracking Data from TOBII Pro Glasses 3",
    smallChipLabel: ["Learn More", "View Source Code"],
    smallChipIcons: ["Visibility", "GitHub"],
    smallChipLinks: ["/eyeport", "https://github.com/akashCraft/eyeport"],
  },
];

export const LegacyAppData = [
  {
    appName: "Wordle",
    icon: "Brick",
    link: "https://github.com/akashCraft/Wordle-Python",
    description: "A simple version of the popular word-guessing game Wordle.",
  },
  {
    appName: "Tic Tac Toe",
    icon: "ButtonsAlt",
    link: "https://github.com/akashCraft/TicTacToe-Python",
    description:
      "The classic Tic Tac Toe game in command-line interface with AI.",
  },
  {
    appName: "Date Day Calculator",
    icon: "CalendarToday",
    link: "https://github.com/akashcraft/DateDayCalculator",
    description: "Simple app that calculates day of any specified date.",
  },
  {
    appName: "Unit Converter",
    icon: "Calculate",
    link: "https://github.com/akashcraft/UnitConverter",
    description: "Samsung OneUI themed Unit converter design.",
  },
  {
    appName: "WAY Banking Management",
    icon: "Bank",
    link: "https://github.com/akashcraft/WAY-Banking-Management",
    description:
      "Python Script with MySQL API to perform Banking tasks. High School Project.",
  },
];
