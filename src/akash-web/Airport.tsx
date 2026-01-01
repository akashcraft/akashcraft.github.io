import {
  Box,
  Stack,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  Divider,
  Alert,
} from "@mui/material";
import HolderBox from "../akash-commons/HolderBox";
import flag from "../assets/img-web/img-airport/flag.svg";
import { useEffect, useState } from "react";
import {
  FlightLandOutlined,
  FlightTakeoffOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import useGetAirportData from "./airportHook";
import AirportCard from "./AirportCard";
import { StyledTooltip } from "../akash-macos/MacDock";
import { motion } from "framer-motion";
import error from "../assets/img-commons/error.png";

export default function Airport() {
  const [time, setTime] = useState<string>("");
  const [filter, setFilter] = useState<"arrival" | "departure">("arrival");
  const isPhone = useMediaQuery("(max-width:750px)");
  const [isEnglish, setIsEnglish] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/St_Johns",
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading, isError } = useGetAirportData();

  return (
    <HolderBox>
      <Stack
        direction={isPhone ? "column" : "row"}
        gap={2}
        mt={isPhone ? 3 : 0}
      >
        <img src={flag} style={{ maxWidth: "5rem", height: "auto" }} />
        <Stack direction="column" spacing={0}>
          <Typography variant="body1">
            {isEnglish
              ? "St. John's International Airport (YYT/CYYT)"
              : "Aéroport International St. John's (YYT/CYYT)"}
          </Typography>
          <Typography variant="body2">
            {isEnglish ? "Local Time" : "Heure locale"} - {time}
          </Typography>
        </Stack>
        <Box flexGrow={1} />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent={isPhone ? "center" : "flex-end"}
          sx={{ scale: isPhone ? 0.88 : 1 }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={() => {
              setFilter((prev) =>
                prev === "arrival" ? "departure" : "arrival",
              );
            }}
          >
            <ToggleButton value="arrival" sx={{ borderRadius: "2rem" }}>
              <FlightLandOutlined sx={{ color: "text.primary" }} />
              <StyledTypography variant="body2">
                {isEnglish ? "Arrivals" : "Arrivées"}
              </StyledTypography>
            </ToggleButton>
            <ToggleButton value="departure" sx={{ borderRadius: "2rem" }}>
              <FlightTakeoffOutlined sx={{ color: "text.primary" }} />
              <StyledTypography variant="body2">
                {isEnglish ? "Departures" : "Départs"}
              </StyledTypography>
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={isEnglish}
            exclusive
            onChange={() => {
              setIsEnglish((prev) => !prev);
            }}
          >
            <ToggleButton value={true} sx={{ borderRadius: "2rem" }}>
              <StyledTypographyLang variant="body2">EN</StyledTypographyLang>
            </ToggleButton>
            <ToggleButton value={false} sx={{ borderRadius: "2rem" }}>
              <StyledTypographyLang variant="body2">FR</StyledTypographyLang>
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={false}
            exclusive
            onChange={() => {
              window.open(
                "https://stjohnsairport.com/cam/livecam.htm?v=2.0",
                "_blank",
              );
            }}
          >
            <StyledTooltip
              title={isEnglish ? "Live Camera" : "Caméra en direct"}
              placement="bottom"
              enterDelay={1000}
              arrow
            >
              <ToggleButton
                value={true}
                sx={{
                  borderRadius: "2rem",
                }}
              >
                <VideocamOutlined sx={{ color: "text.primary" }} />
              </ToggleButton>
            </StyledTooltip>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
      <Divider sx={{ margin: "1rem 0" }} />
      {isLoading ? (
        <Stack
          spacing={2}
          sx={{
            flexGrow: 1,
            height: isPhone ? "40dvh" : "70dvh",
          }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size="2rem" />
          <Typography variant="body2">
            {isEnglish ? "Loading Schedules" : "Chargement des horaires"}
          </Typography>
        </Stack>
      ) : isError ? (
        <Stack
          spacing={2}
          sx={{
            flexGrow: 1,
            height: isPhone ? "40dvh" : "70dvh",
          }}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <motion.img
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            src={error}
            alt="Error"
            style={{
              width: isPhone ? "10rem" : "50%",
              maxWidth: "10rem",
            }}
          />
          <Typography variant="h6">Server Error</Typography>
        </Stack>
      ) : (
        <>
          {data
            ?.filter(
              filter === "arrival"
                ? (flight) => flight.direction === "inbound"
                : (flight) => flight.direction === "outbound",
            )
            .map((flight) => (
              <AirportCard
                key={`${filter}-${flight.number}`}
                flight={flight}
                isPhone={isPhone}
                isEnglish={isEnglish}
              />
            ))}

          <Alert
            sx={{ borderRadius: "1rem", marginTop: "1.5rem" }}
            severity="info"
          >
            {isEnglish
              ? "The system updates every 45 minutes due to network constraints. Apologies for any inconvenience caused."
              : "Le système se met à jour toutes les 45 minutes en raison de contraintes réseau. Toutes nos excuses pour tout inconvénient causé."}
          </Alert>
        </>
      )}
    </HolderBox>
  );
}

const StyledTypography = styled(Typography)({
  marginLeft: "0.5rem",
  textTransform: "none",
  color: "white",
});

const StyledTypographyLang = styled(Typography)({
  textTransform: "none",
  color: "white",
});
