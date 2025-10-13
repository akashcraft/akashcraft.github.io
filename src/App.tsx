import "./styles/App.css";
import Header from "./commons/Header";
import { Box, Stack } from "@mui/material";
import styled from "@emotion/styled";
import logo from "./assets/logo.png";
import githubLogo from "./assets/img-app/GitHub.png";
import youtubeLogo from "./assets/img-app/Youtube.png";
import linkedinLogo from "./assets/img-app/Linkedin.png";
import reactLogo from "./assets/reactLogo.png";
import packageJson from "../package.json";
import {
  aboutMeText,
  codingData,
  educationData,
  otherData,
  videoEditingData,
  workData,
} from "./app/appData";
import {
  openMainWebsite,
  openGitHub,
  openLinkedIn,
  openYouTube,
} from "./commons/Utils";
import { orange, grey, red, blue } from "@mui/material/colors";
import TopChip from "./app/TopChip";
import MainSection from "./app/MainSection";
import {
  DataObject,
  Work,
  School,
  Videocam,
  NoteAdd,
} from "@mui/icons-material";
import Footer from "./commons/Footer";

function App() {
  return (
    <>
      <Header />
      <Box sx={{ margin: "4rem 0rem" }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "2rem" }}
        >
          <StyledImg src={logo} />
          <StyledImg2 src={reactLogo} />
        </Stack>
        <h2 className="about">
          Canary Build <StyledSpan>{packageJson.version}</StyledSpan>
        </h2>
        <p className="about">{aboutMeText}</p>
        <br />
        <Stack
          direction="row"
          spacing={0}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ maxWidth: "fit-content", margin: "0 auto" }}
        >
          <TopChip
            img={logo}
            title="AkashCraft"
            color={orange}
            link={openMainWebsite}
          />
          <TopChip
            img={linkedinLogo}
            title="LinkedIn"
            color={blue}
            link={openLinkedIn}
          />
          <TopChip
            img={githubLogo}
            title="GitHub"
            color={grey}
            link={openGitHub}
          />
          <TopChip
            img={youtubeLogo}
            title="YouTube"
            color={red}
            link={openYouTube}
          />
        </Stack>
        <Stack
          direction="column"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "2rem" }}
        >
          <MainSection
            heading="Coding"
            icon={<DataObject sx={ChipIconStyle} />}
            genericData={codingData}
          />
          <MainSection
            heading="Work Experience"
            icon={<Work sx={ChipIconStyle} />}
            genericData={workData}
            isDuration
          />
          <MainSection
            heading="Education"
            icon={<School sx={ChipIconStyle} />}
            genericData={educationData}
          />
          <MainSection
            heading="Video Editing"
            icon={<Videocam sx={ChipIconStyle} />}
            genericData={videoEditingData}
          />
          <MainSection
            heading="Others"
            icon={<NoteAdd sx={ChipIconStyle} />}
            genericData={otherData}
          />
        </Stack>
      </Box>
      <Footer />
    </>
  );
}

const StyledSpan = styled.span`
  font-weight: normal;
  font-size: 0.75rem;
`;

const StyledImg = styled.img`
  width: 5.5rem;
`;

const StyledImg2 = styled.img`
  width: 6rem;
  animation: logo-spin 20s linear infinite;
`;

const ChipIconStyle = { color: "white !important", fontSize: "2rem" };

export default App;
