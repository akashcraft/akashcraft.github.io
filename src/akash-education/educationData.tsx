import img from "./../assets/img-education/Class of 2026 Dean's List - AT3.jpg";
import img2 from "./../assets/img-education/Class of 2026 Dean's List - AT4.jpg";
import img3 from "./../assets/img-education/Class of 2026 Dean's List - AT6.jpg";
import img4 from "./../assets/img-education/Class of 2026 Dean's List - AT7.jpg";
import img5 from "./../assets/img-education/Dean's Award for Fall 2023 Work Term Oral Presentation.jpg";
import img6 from "./../assets/img-education/Innovasea Scholarship for Computer Engineering.jpg";
import img7 from "./../assets/img-education/Verafin Inc. Computer Engineering Scholarship - Akash Samanta.jpg";
import munLogo from "./../assets/img-education/mun.png";
import dpsLogo from "./../assets/img-education/dps.png";
import SchoolIcon from "@mui/icons-material/School";
import type { HeaderRowData } from "../akash-commons/HeaderRowPaper";
import { Avatar } from "@mui/material";

export const images = [img, img2, img3, img4, img5, img6, img7];
export const scholarshipData = [
  {
    title: "International Undergraduate Academic Award",
    year: "Fall 2024",
  },
  {
    title: "Innovasea Scholarship for Computer Engineering",
    year: "Winter 2024",
  },
  {
    title: "International Undergraduate Academic Award",
    year: "Fall 2023",
  },
  {
    title: "PEGNL Connections East Work Term Award",
    year: "Spring 2023",
  },
  {
    title: "RealIT Management Scholarship in Engineering",
    year: "Spring 2023",
  },
  {
    title: "Hector and Fanny McNeil Memorial Trust Fund Scholarship",
    year: "Spring 2023",
  },
  {
    title: "Verafin Inc. Computer Engineering Scholarship",
    year: "Fall 2022",
  },
  {
    title: "International Undergraduate Academic Award",
    year: "Fall 2022",
  },
  {
    title: "Charlie Sheppard Memorial – Hatch Scholarship",
    year: "Winter 2022",
  },
  {
    title: "PEGNL Engineering Scholarship",
    year: "Fall 2021",
  },
];

export const scholarshipListData = {
  title: "Scholarships and Awards",
  description: [
    "Scholarship standing for undergraduate students is defined as a 75% average over the previous scholarship year and the successful completion of not less than 30 credit hours",
  ],
  chips: [
    "Work Term Oral Presentation Dean's Award",
    "Verafin Inc. Computer Engineering Scholarship",
    "Innovasea Scholarship for Computer Engineering",
  ],
};

export const deanListData = {
  title: "Dean's List",
  description:
    "The Dean's List recognizes the top academic performers and is an honour that is bestowed on students with academic averages within the top 10% of their class",
  chips: [
    "Fall 2023 - Term 3",
    "Winter 2024 - Term 4",
    "Fall 2024 - Term 6",
    "Winter 2025 - Term 7",
  ],
};

export const munHeaderData: HeaderRowData = {
  title: "Bachelor of Engineering",
  chipLabels: ["Memorial University of Newfoundland", "Computer Engineering"],
  chipIcons: [
    <Avatar sx={{ width: "1.4rem", height: "1.4rem" }} src={munLogo} />,
    <SchoolIcon sx={{ color: "white !important" }} />,
  ],
  statLabel: ["Graduation", "GPA"],
  statValue: ["2026", "4.0"],
  statSubLabel: ["Since 2021", "Out of 4.0"],
};

export const dpsHeaderData: HeaderRowData = {
  title: "High School Diploma",
  chipLabels: ["DPS Modern Indian School", "Science Stream"],
  chipIcons: [
    <Avatar sx={{ width: "1.4rem", height: "1.4rem" }} src={dpsLogo} />,
    <SchoolIcon sx={{ color: "white !important" }} />,
  ],
  statLabel: ["Graduated", "Grade"],
  statValue: ["2021", "97"],
  statSubLabel: ["Since 2014", "Out of 100"],
};

export const deanListPaperData = {
  title: "Dean's List",
  description: [
    "The Dean's List recognizes the top academic performers and is an honour that is bestowed on students with academic averages within the top 10% of their class",
  ],
  chips: [
    "Fall 2023 - Term 3",
    "Winter 2024 - Term 4",
    "Fall 2024 - Term 6",
    "Winter 2025 - Term 7",
  ],
};
