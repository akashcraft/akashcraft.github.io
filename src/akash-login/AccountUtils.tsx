import {
  HomeOutlined,
  CalendarMonthOutlined,
  CoPresentOutlined,
  LinkOutlined,
  SettingsOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import {
  ContactWavesLight,
  ContactWavesDark,
} from "../akash-main/ContactWaves";
import { BlobLight, BlobDark } from "../akash-svg/Blob";
import { NoneLight, NoneDark } from "../akash-svg/None";
import { PeaksLight } from "../akash-svg/Peaks";
import { RingsLight, RingsDark } from "../akash-svg/Rings";
import { StarsLight, StarsDark } from "../akash-svg/Stars";
import { StepsLight, StepsDark } from "../akash-svg/Steps";

export const accountMenuOptions = [
  {
    title: "Home",
    icon: <HomeOutlined />,
    fgcolor: "#1c419a",
    bgcolor: "#aec6f6",
    id: "home",
  },
  {
    title: "Exam Schedule",
    icon: <CalendarMonthOutlined />,
    fgcolor: "#3e7d32",
    bgcolor: "#88d393",
    id: "exam",
  },
  {
    title: "Class Schedule",
    icon: <CoPresentOutlined />,
    fgcolor: "#6a1b9a",
    bgcolor: "#d4bbf9",
    id: "class",
  },
  {
    title: "Links",
    icon: <LinkOutlined />,
    fgcolor: "#b71c1c",
    bgcolor: "#f3b2e1",
    id: "links",
  },
  {
    title: "Settings",
    icon: <SettingsOutlined />,
    fgcolor: "#7f4c00",
    bgcolor: "#f4b98b",
    id: "settings",
  },
  {
    title: "Admin",
    icon: <AdminPanelSettingsOutlined />,
    fgcolor: "#880e4f",
    bgcolor: "#fe5d5d",
    id: "admin",
  },
];

export function getColours(colourName: string): string[] {
  const colours: Record<string, string[]> = {
    Red: ["#ff8080", "#ff4d4d", "#cc0000", "#990000"],
    Orange: ["#d9a38c", "#b27e64", "#864f33", "#6c402a"],
    Yellow: ["#f4d03f", "#f1c40f", "#d4ac0d", "#9a7d0a"],
    Green: ["#58d68d", "#27ae60", "#1e8449", "#145a32"],
    Blue: ["#5dade2", "#2980b9", "#21618c", "#1a5276"],
    Indigo: ["#7986cb", "#3f51b5", "#303f9f", "#1a237e"],
    Purple: ["#af7ac5", "#8e44ad", "#713d84", "#4a235a"],
    Grey: ["#bdc3c7", "#7f8c8d", "#34495e", "#2c3e50"],
  };

  return colours[colourName] || colours["Grey"];
}

export function getLightBackground(wallpaper?: string, accentColour?: string) {
  switch (wallpaper) {
    case "Blob":
      return <BlobLight colours={getColours(accentColour ?? "Grey")} />;
    case "Waves":
      return <ContactWavesLight colours={getColours(accentColour ?? "Grey")} />;
    case "None":
      return <NoneLight colours={getColours(accentColour ?? "Grey")} />;
    case "Peaks":
      return <PeaksLight colours={getColours(accentColour ?? "Grey")} />;
    case "Rings":
      return <RingsLight colours={getColours(accentColour ?? "Grey")} />;
    case "Stars":
      return <StarsLight colours={getColours(accentColour ?? "Grey")} />;
    case "Steps":
      return <StepsLight colours={getColours(accentColour ?? "Grey")} />;
    default:
      return null;
  }
}

export function getDarkBackground(wallpaper?: string) {
  switch (wallpaper) {
    case "Blob":
      return <BlobDark />;
    case "Waves":
      return <ContactWavesDark />;
    case "None":
      return <NoneDark />;
    case "Peaks":
      return <PeaksLight />;
    case "Rings":
      return <RingsDark />;
    case "Stars":
      return <StarsDark />;
    case "Steps":
      return <StepsDark />;
    default:
      return null;
  }
}

export function getGreeting(isBirthday: boolean): string {
  if (isBirthday) return "Happy Birthday";
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 16) return "Good Afternoon";
  return "Good Evening";
}
