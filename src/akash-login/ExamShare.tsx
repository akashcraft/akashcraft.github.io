import {
  Paper,
  Typography,
  Stack,
  styled,
  Chip,
  CircularProgress,
  useMediaQuery,
  Button,
  ListItemAvatar,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HolderBox from "../akash-commons/HolderBox";
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
import { useExamSharing } from "./AuthHooks";
import { useEffect, useMemo } from "react";
import ExamSchedule from "./ExamSchedule";
import { motion } from "framer-motion";
import errorImg from "../assets/img-commons/error.png";

export default function ExamShare() {
  const { uid } = useParams<"uid">();
  const { data, error, loading } = useExamSharing(uid);
  const isPhone = useMediaQuery("(max-width:800px)");

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

  useEffect(() => {
    const queryParams = new URLSearchParams(search);

    if (!loading && !error && data && queryParams.has("print")) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, error, data, search]);

  return loading ? (
    <HolderBox disableFooter>
      <Stack
        spacing={2}
        mb={2}
        sx={{ maxWidth: "40rem", margin: "0 auto", fontFamily: "Segoe UI" }}
      >
        <Stack
          spacing={2}
          sx={{
            flexGrow: 1,
            height: "90dvh",
          }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size="2rem" />
          <span>Loading Schedules</span>
        </Stack>
      </Stack>
    </HolderBox>
  ) : error ? (
    <HolderBox disableFooter>
      <Stack
        spacing={2}
        mb={2}
        sx={{ maxWidth: "40rem", margin: "0 auto", fontFamily: "Segoe UI" }}
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
              <StyledListItemText primary="Make sure the user has shared their Exam Schedule"></StyledListItemText>
            </ListItem>
          </List>
          <br />
          <StyledButton variant="contained" href="/">
            BACK TO HOME
          </StyledButton>
        </Stack>
      </Stack>
    </HolderBox>
  ) : (
    <HolderBox disableFooter>
      <Stack spacing={2} mb={2} sx={{ maxWidth: "40rem", margin: "0 auto" }}>
        <Paper
          elevation={0}
          sx={{
            padding: "1rem",
            borderRadius: "1rem",
            margin: "0.25rem 0",
            width: "100%",
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
              {data?.name.split(" ")[0] || "Unknown User"}'s Exam Schedule
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" flexWrap="wrap">
            {chipData.map((chip, index) => (
              <StyledChip
                key={index}
                id={index === chipData.length - 1 ? "print-chip" : undefined}
                onClick={() => {
                  if (index == chipData.length - 1) {
                    window.print();
                  }
                }}
                label={chip.label}
                icon={chip.icon}
              />
            ))}
          </Stack>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            padding: "1rem",
            borderRadius: "1rem",
            margin: "0.25rem 0",
            width: "100%",
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
              userDetails: { accentColour: "Orange" },
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
    </HolderBox>
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
