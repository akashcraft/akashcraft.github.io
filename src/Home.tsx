import "./styles/App.css";
import Header from "./akash-commons/Header";
import { Backdrop, Box, Skeleton, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import logo from "./assets/logo.png";
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
  WorkOutline as Work,
  SchoolOutlined as School,
  VideocamOutlined as Videocam,
  DescriptionOutlined as NoteAdd,
  TouchApp,
} from "@mui/icons-material";
import Footer from "./akash-commons/Footer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetImages } from "./akash-commons/Hooks";
import MacDialog from "./akash-commons/MacDialog";
import { MacDialogContext } from "./akash-main/appData";
import MacDock from "./akash-macos/MacDock";
import Background from "./Background";

function Home() {
  const [showHint, setShowHint] = useState<boolean>(false);
  const [openMacDialog, setOpenMacDialog] = useState<boolean>(false);

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
      if (parseInt(sessionStorage.getItem("homeScroll") || "100") > 1000) {
        if (!sessionStorage.getItem("hintShown")) {
          sessionStorage.setItem("hintShown", "true");
          setTimeout(() => setShowHint(true), 8000);
        }
      } else {
        setShowHint(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLoading = useGetImages(images);

  return (
    <>
      <Backdrop
        sx={{ zIndex: 100 }}
        open={showHint}
        onClick={() => {
          setShowHint(false);
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <motion.div
            style={{ transformOrigin: "center center" }}
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 75,
              damping: 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <TouchApp
              sx={{
                color: "white !important",
                fontSize: "10rem",
              }}
            />
          </motion.div>
          <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
            Click Cards to Learn More
          </Typography>
        </Stack>
      </Backdrop>
      <Header />
      <motion.div
        style={{ transformOrigin: "top center" }}
        initial={{ opacity: 0, scale: 0.95, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.05, 0.8, 0.35, 0.99] }}
      >
        <Box sx={{ marginBottom: "4rem" }}>
          <Background />
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ margin: "2rem 0", marginTop: "4rem" }}
          >
            {isLoading && (
              <Skeleton variant="circular" width={88} height={88} />
            )}
            <StyledImg
              src={logo}
              style={{ display: isLoading ? "none" : "block" }}
            />
            <StyledImg2
              src={reactLogo}
              style={{ display: isLoading ? "none" : "block" }}
            />
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            alignItems="center"
            sx={{
              maxWidth: "65rem",
              width: "80%",
              textAlign: "center",
              margin: "0 auto",
            }}
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
            <TopChip title="LinkedIn" color={blue} link={openLinkedIn} />
            <TopChip title="GitHub" color={grey} link={openGitHub} />
            <TopChip title="YouTube" color={red} link={openYouTube} />
          </Stack>
          <MacDock />
          <MacDialogContext.Provider
            value={{ openMacDialog, setOpenMacDialog }}
          >
            <MacDialog
              heading="Not Implemented"
              description="This feature is still under development. You can view the completed website on akashcraft.ca."
              visible={openMacDialog}
              onClose={() => setOpenMacDialog(false)}
            />
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
                isLoading={isLoading}
              />
              <MainSection
                heading="Work Experience"
                icon={<Work sx={ChipIconStyle} />}
                genericData={workData}
                isLoading={isLoading}
                isDuration
              />
              <MainSection
                heading="Education"
                icon={<School sx={ChipIconStyle} />}
                genericData={educationData}
                isLoading={isLoading}
              />
              <MainSection
                heading="Others"
                icon={<NoteAdd sx={ChipIconStyle} />}
                genericData={otherData}
                isLoading={isLoading}
              />
              <MainSection
                heading="YouTube"
                icon={<Videocam sx={ChipIconStyle} />}
                genericData={videoEditingData}
                isLoading={isLoading}
              />
            </Stack>
          </MacDialogContext.Provider>
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
