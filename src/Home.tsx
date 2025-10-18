import "./styles/App.css";
import Header from "./akash-commons/Header";
import { Box, Skeleton, Stack } from "@mui/material";
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
  images,
  otherData,
  videoEditingData,
  workData,
} from "./akash-main/appData";
import {
  openMainWebsite,
  openGitHub,
  openLinkedIn,
  openYouTube,
} from "./akash-commons/Utils";
import { orange, grey, red, blue } from "@mui/material/colors";
import TopChip from "./akash-main/TopChip";
import MainSection from "./akash-main/MainSection";
import {
  DataObject,
  Work,
  School,
  Videocam,
  NoteAdd,
} from "@mui/icons-material";
import Footer from "./akash-commons/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { GetImages } from "./akash-commons/Hooks";

function Home() {
  useEffect(() => {
    window.addEventListener("load", () => {
      const splash = document.getElementById("splash");
      if (splash) {
        splash.remove();
      }
    });
    const saved = sessionStorage.getItem("homeScroll");
    if (saved) {
      window.scrollTo(0, Number(saved));
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    const handleScroll = () => {
      sessionStorage.setItem("homeScroll", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imagesLoaded = GetImages(images);

  return (
    <>
      <Header />
      <motion.div
        style={{ transformOrigin: "top center" }}
        initial={{ opacity: 0, scale: 0.95, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.05, 0.8, 0.35, 0.99] }}
      >
        <Box sx={{ margin: "4rem 0rem" }}>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ margin: "2rem 0", marginTop: "8rem" }}
          >
            {imagesLoaded ? (
              <>
                <StyledImg src={logo} />
                <StyledImg2 src={reactLogo} />
              </>
            ) : (
              <Skeleton variant="circular" width={88} height={88} />
            )}
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            alignItems="center"
            sx={{ maxWidth: "65rem", textAlign: "center", margin: "0 2rem" }}
          >
            <h2 className="about">
              Canary Build <StyledSpan>{packageJson.version}</StyledSpan>
            </h2>
            <p className="about">{aboutMeText}</p>
          </Stack>
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
              isLoading={!imagesLoaded}
            />
            <MainSection
              heading="Work Experience"
              icon={<Work sx={ChipIconStyle} />}
              genericData={workData}
              isLoading={!imagesLoaded}
              isDuration
            />
            <MainSection
              heading="Education"
              icon={<School sx={ChipIconStyle} />}
              genericData={educationData}
              isLoading={!imagesLoaded}
            />
            <MainSection
              heading="Video Editing"
              icon={<Videocam sx={ChipIconStyle} />}
              genericData={videoEditingData}
              isLoading={!imagesLoaded}
            />
            <MainSection
              heading="Others"
              icon={<NoteAdd sx={ChipIconStyle} />}
              genericData={otherData}
              isLoading={!imagesLoaded}
            />
          </Stack>
        </Box>
      </motion.div>
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

export default Home;
