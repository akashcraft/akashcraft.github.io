import {
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  styled,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import HolderBox from "../akash-commons/HolderBox";
import {
  AccountCircleOutlined,
  CampaignOutlined,
  CalendarMonthOutlined,
  CoPresentOutlined,
  HomeOutlined,
  LinkOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountHeaderBox, { StyledHeaderPaper } from "./AccountHeaderBox";
import WeekScheduleGrid from "./WeekScheduleGrid";
import ExamSchedule from "./ExamSchedule";
import { motion } from "framer-motion";
import {
  ContactWavesDark,
  ContactWavesLight,
} from "../akash-main/ContactWaves";

const accountMenuOptions = [
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
];

export function Account() {
  const isPhone = useMediaQuery("(max-width:800px)");
  const { mode } = useColorScheme();
  const isLight = mode === "light";
  const [selectedPage, setSelectedPage] = useState<string>(
    useParams().page || "home",
  );

  const navigate = useNavigate();

  return (
    <>
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        {isLight ? <ContactWavesLight /> : <ContactWavesDark />}
      </Box>
      <HolderBox disablePadding disableAnimation disableFooter>
        <Stack direction={isPhone ? "column" : "row"} gap={1} zIndex={0}>
          {!isPhone && (
            <StyledPaper elevation={0}>
              <List>
                {accountMenuOptions.map((item, index) => (
                  <ListItemButton
                    key={index}
                    selected={selectedPage === item.id}
                    sx={{ borderRadius: "5rem", width: "fit-content" }}
                    onClick={() => {
                      setSelectedPage(item.id);
                      navigate(`/account/${item.id}`);
                    }}
                  >
                    <ListItemAvatar
                      sx={{ position: "relative", left: "-0.5rem" }}
                    >
                      <Badge
                        badgeContent={item.id == "links" ? 1 : 0}
                        color="secondary"
                        overlap="circular"
                      >
                        <Avatar
                          sx={{ bgcolor: item.bgcolor, color: item.fgcolor }}
                        >
                          {item.icon}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <StyledListItemText primary={item.title} />
                  </ListItemButton>
                ))}
              </List>
            </StyledPaper>
          )}
          <motion.div
            key={selectedPage}
            style={{
              minHeight: "calc(100vh - 6rem)",
              flexGrow: 1,
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.05, 0.8, 0.35, 0.99],
            }}
          >
            <MainBox sx={{ padding: isPhone ? "0" : "1rem" }}>
              {selectedPage === "home" && (
                <MainStack sx={{ height: "min-content" }}>
                  <AccountHeaderBox
                    onclick={() => {
                      setSelectedPage("settings");
                      navigate("/account/settings");
                    }}
                    avatar={
                      <AccountCircleOutlined
                        sx={{
                          width: "2rem",
                          height: "2rem",
                          color: "#824222",
                        }}
                      />
                    }
                    heading="Guest"
                    description="guest@akashcraft.ca"
                  />
                  <AccountHeaderBox
                    avatar={
                      <CalendarMonthOutlined
                        sx={{ width: "2rem", height: "2rem", color: "#824222" }}
                      />
                    }
                    heading="Next Exam"
                    description="DEMO 1000 in 10 days"
                  />
                  <AccountHeaderBox
                    avatar={
                      <CampaignOutlined
                        sx={{ width: "2rem", height: "2rem", color: "#824222" }}
                      />
                    }
                    heading="Announcements"
                    description="You are all caught up!"
                    flexGrow={2}
                  />
                  <Stack
                    direction={isPhone ? "column" : "row"}
                    gap={2}
                    width={"100%"}
                  >
                    <StyledHeaderPaper
                      elevation={0}
                      sx={{
                        flexGrow: 1,
                        flexShrink: 0,
                        padding: "1rem",
                      }}
                    >
                      <h3 style={{ margin: "0" }}>Exam Schedule</h3>
                      <ExamSchedule />
                    </StyledHeaderPaper>
                    <StyledHeaderPaper
                      elevation={0}
                      sx={{
                        flexGrow: 1,
                        flexShrink: 1,
                        minWidth: "20rem",
                        padding: "1rem",
                      }}
                    >
                      <h3 style={{ margin: "0 0 1rem 0" }}>Class Schedule</h3>
                      <WeekScheduleGrid />
                    </StyledHeaderPaper>
                  </Stack>
                </MainStack>
              )}
              {selectedPage === "exam" && (
                <MainStack sx={{ height: "min-content" }}>
                  <StyledHeader>Exam Schedule</StyledHeader>
                </MainStack>
              )}
              {selectedPage === "class" && (
                <MainStack sx={{ height: "min-content" }}>
                  <StyledHeader>Class Schedule</StyledHeader>
                </MainStack>
              )}
              {selectedPage === "links" && (
                <MainStack sx={{ height: "min-content" }}>
                  <StyledHeader>Links</StyledHeader>
                </MainStack>
              )}
              {selectedPage === "settings" && (
                <MainStack sx={{ height: "min-content" }}>
                  <StyledHeader>Settings</StyledHeader>
                </MainStack>
              )}
            </MainBox>
          </motion.div>
          <br />
          {isPhone && (
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <BottomNavigation
                showLabels
                value={selectedPage}
                onChange={(_event, newValue) => {
                  setSelectedPage(newValue);
                  navigate(`/account/${newValue}`);
                  window.scrollTo(0, 0);
                }}
                sx={{
                  width: "100%",
                  "& .MuiBottomNavigationAction-root": {
                    padding: "0 !important",
                    minWidth: "unset !important",
                    borderRadius: "2rem",
                  },
                }}
              >
                {accountMenuOptions.map((item, index) => (
                  <BottomNavigationAction
                    sx={{
                      color: "white",
                      "&.Mui-selected": { color: item.bgcolor },
                    }}
                    key={index}
                    label={item.title.split(" ")[0]}
                    value={item.id}
                    icon={
                      <Badge
                        badgeContent={item.id == "links" ? 1 : 0}
                        color="secondary"
                        overlap="circular"
                        variant="dot"
                      >
                        {item.icon}
                      </Badge>
                    }
                  />
                ))}
              </BottomNavigation>
            </Box>
          )}
        </Stack>
      </HolderBox>
    </>
  );
}

const StyledHeader = styled("h2")({
  fontFamily: "Segoe UI",
  margin: "0 0 1rem 0.5rem",
});

const MainStack = styled(Stack)`
  max-width: 60rem;
  width: 100%;
  font-family: "Segoe UI";
  flex-direction: row;
  gap: 1rem;
  height: "fit-content";
  flex-wrap: wrap;
`;

const MainBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  flexGrow: 1,
});

const StyledPaper = styled(Paper)({
  padding: "0 1rem",
  position: "sticky",
  width: "17rem",
  top: "5.5rem",
  backgroundColor: "transparent",
  margin: "0.25rem 0",
  height: "min-content",
});

const StyledListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
  },
  "& .MuiListItemText-secondary": {
    fontFamily: "Segoe UI",
  },
  position: "relative",
  left: "-0.75rem",
});
