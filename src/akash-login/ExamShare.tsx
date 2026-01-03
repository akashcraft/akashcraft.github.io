import {
  Paper,
  Typography,
  Stack,
  styled,
  Chip,
  useMediaQuery,
  Button,
  ListItemAvatar,
  Avatar,
  List,
  ListItem,
  ListItemText,
  useColorScheme,
  Box,
} from "@mui/material";
import logo from "../assets/logo.png";
import "../styles/ExamPrint.css";
import {
  CalendarMonthOutlined,
  EditOutlined,
  PersonOutlined,
  PrintOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import errorImg from "../assets/img-commons/error.png";
import { useExamSharing } from "./AuthHooks";
import {
  getColours,
  getDarkBackground,
  getLightBackground,
} from "./AccountUtils";
import Loading from "../akash-commons/Loading";
import ExamSchedule from "./ExamSchedule";
import dayjs from "dayjs";

export default function ExamShare() {
  const { uid } = useParams<"uid">();
  const { data, error, loading } = useExamSharing(uid);
  const isPhone = useMediaQuery("(max-width:800px)");
  const [wallpaper, setWallpaper] = useState<string | null>("Waves");
  const [accentColour, setAccentColour] = useState<string | null>("Orange");
  const { mode } = useColorScheme();
  const isLight = mode === "light";

  const chipData = useMemo(() => {
    if (!data) return [];

    const chips = [];
    if (data.university) {
      chips.push({
        label: data.university,
        icon: <SchoolOutlined sx={{ color: "white !important" }} />,
      });
    }
    if (data.semester) {
      chips.push({
        label: data.semester,
        icon: <CalendarMonthOutlined sx={{ color: "white !important" }} />,
      });
    }
    chips.push({
      label: "Print",
      icon: <PrintOutlined sx={{ color: "white !important" }} />,
    });
    return chips;
  }, [data]);

  const { search } = useLocation();

  const [main, light, dark, deep] = useMemo(
    () => getColours(isLight ? (accentColour ?? "Orange") : "Grey"),
    [isLight, accentColour],
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(search);

    if (!loading && !error && data && queryParams.has("print")) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);

      return () => clearTimeout(timer);
    }

    if (queryParams.has("wallpaper")) {
      setWallpaper(queryParams.get("wallpaper") || "Waves");
    }

    if (queryParams.has("colour")) {
      setAccentColour(queryParams.get("colour") || "Orange");
    }
  }, [loading, error, data, search]);

  return loading && !data ? (
    <Loading text="Loading Schedules" />
  ) : (
    <>
      <Box
        id="background-box"
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
        {isLight
          ? getLightBackground(wallpaper as string, accentColour as string)
          : getDarkBackground(wallpaper as string)}
      </Box>
      <Box
        sx={{
          "--mui-palette-background-light": light,
          "--mui-palette-background-light2": `${dark}cc`,
          "--mui-palette-background-button": dark,
          "--mui-palette-background-buttondark": deep,

          "--mui-palette-background-paper": isPhone ? dark : main,
          "--mui-palette-background-default": deep,

          "--mui-palette-secondary-main": deep,
          "--mui-palette-secondary-light": dark,
          "--calendar-accent": main,
        }}
      >
        {error ? (
          <MainBox>
            <Stack
              spacing={2}
              mb={2}
              sx={{
                maxWidth: "40rem",
                margin: "0 auto",
                fontFamily: "Segoe UI",
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  flexGrow: 1,
                  height: "90dvh",
                }}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <motion.img
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  src={errorImg}
                  alt="Error"
                  style={{
                    width: isPhone ? "50%" : "15rem",
                    maxWidth: "15rem",
                    marginBottom: "2rem",
                  }}
                />

                <Typography
                  variant="h4"
                  sx={{ color: "white !important", fontFamily: "Segoe UI" }}
                  gutterBottom
                >
                  {error}
                </Typography>
                <br />
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EditOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <StyledListItemText primary="Check for typos in the link"></StyledListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <StyledListItemText primary="Make sure the user has shared their Class Schedule"></StyledListItemText>
                  </ListItem>
                </List>
                <br />
                <StyledButton variant="contained" href="/">
                  BACK TO HOME
                </StyledButton>
              </Stack>
            </Stack>
          </MainBox>
        ) : (
          <MainBox
            id="main-box"
            sx={{ display: data == null ? "none" : "flex" }}
          >
            <Stack
              spacing={2}
              mb={2}
              sx={{ width: isPhone ? "95%" : "40rem", margin: "0 auto" }}
            >
              <Paper
                id="header-paper"
                elevation={0}
                sx={{
                  padding: "1rem",
                  borderRadius: "1rem",
                  margin: "0.25rem 0",
                  width: "100%",
                  backgroundColor: "var(--mui-palette-background-light2)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <img
                    id="brand-logo"
                    src={logo}
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      position: "relative",
                      top: "0.04rem",
                      display: "none",
                    }}
                  />
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontFamily: "Segoe UI" }}
                  >
                    {data?.name.split(" ")[0] || "Unknown User"}'s Class
                    Schedule
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" flexWrap="wrap">
                  {chipData.map((chip, index) => (
                    <StyledChip
                      key={index}
                      id={
                        index === chipData.length - 1
                          ? "print-chip"
                          : "normal-chip"
                      }
                      onClick={() => {
                        if (index == chipData.length - 1) {
                          window.print();
                        }
                      }}
                      label={chip.label}
                      icon={chip.icon}
                    />
                  ))}
                  <StyledChip
                    sx={{
                      display: "none",
                    }}
                    id="stamp-chip"
                    label={`Printed on ${dayjs().format("D MMM YYYY")}`}
                    icon={<PrintOutlined sx={{ color: "white !important" }} />}
                  />
                </Stack>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  padding: "1rem",
                  borderRadius: "1rem",
                  margin: "0.25rem 0",
                  width: "100%",
                  backgroundColor: "var(--mui-palette-background-light2)",
                }}
              >
                <ExamSchedule
                  accountState={{
                    general: {},
                    links: {} as {
                      header?: string | undefined;
                      description?: string | undefined;
                      url?: string | undefined;
                      uid?: string | undefined;
                    }[],
                    userDetails: { accentColour: accentColour || "Orange" },
                    exams:
                      (data?.exams as {
                        courseName?: string | undefined;
                        date?: string | undefined;
                        time?: string | undefined;
                        uid?: string | undefined;
                      }[]) || [],
                  }}
                  onEmpty={() => {
                    window.scrollTo(0, 0);
                  }}
                />
              </Paper>
            </Stack>
          </MainBox>
        )}
      </Box>
    </>
  );
}

const StyledChip = styled(Chip)({
  margin: "0.25rem 0.5rem",
  marginLeft: "0rem",
  fontFamily: "Segoe UI",
});

const StyledButton = styled(Button)({
  fontFamily: "Segoe UI",
  marginTop: "1rem",
  borderRadius: "1rem",
  padding: "0.5rem 1rem",
  color: "white",
  backgroundColor: "#df742d",
});

const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontFamily: "Segoe UI",
  },
});

const MainBox = styled(Stack)({
  justifyContent: "center",
  alignItems: "center",
  height: "100dvh",
  width: "100dvw",
});
