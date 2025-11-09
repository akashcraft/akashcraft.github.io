import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ac from "../assets/img-web/img-airport/ac.png";
import f8 from "../assets/img-web/img-airport/f8.png";
import pb from "../assets/img-web/img-airport/pb.png";
import pd from "../assets/img-web/img-airport/pd.png";
import rv from "../assets/img-web/img-airport/rv.png";
import pj from "../assets/img-web/img-airport/pj.png";
import ws from "../assets/img-web/img-airport/ws.png";
import wg from "../assets/img-web/img-airport/wg.png";
import w8 from "../assets/img-web/img-airport/w8.png";

const airlineLogos: { [key: string]: string } = {
  AC: ac,
  F8: f8,
  PB: pb,
  PD: pd,
  P3: pd,
  RV: rv,
  PJ: pj,
  WS: ws,
  WG: wg,
  W8: w8,
};

const statusFrenchMap: { [key: string]: string } = {
  Scheduled: "Tarifé",
  "On Time": "À l'heure",
  Delayed: "Retardé",
  Cancelled: "Annulé",
  Early: "Tôt",
  Landed: "Arrivé",
  Unknown: "Inconnu",
  Diverted: "Détourné",
  Departed: "Décollé",
};

const colorMap: { [key: string]: string } = {
  delayed: "#ff9500",
  early: "#00de00",
  landed: "#808080",
  departed: "#808080",
  diverted: "#FF0000",
  cancelled: "#FF0000",
  unknown: "#808080",
};
import type { AirportSchedule } from "./airportHook";
import { motion, steps } from "framer-motion";
import { OpenInNew } from "@mui/icons-material";
import { StyledTooltip } from "../akash-macos/MacDock";

type AirportCardProps = {
  flight: AirportSchedule;
  isPhone?: boolean;
  isEnglish?: boolean;
};

export default function AirportCard({
  flight,
  isPhone,
  isEnglish,
}: AirportCardProps) {
  return (
    <StyledCard>
      <StyledCardContent
        onClick={() => {
          if (isPhone) {
            window.open(
              `https://flightaware.com/live/flight/${flight.flightIcao}`,
              "_blank",
            );
          }
        }}
      >
        <Stack direction="row" alignContent="center" spacing={2}>
          <Stack
            direction={isPhone ? "column" : "row"}
            spacing={1}
            alignItems={isPhone ? "flex-start" : "center"}
            sx={{
              flexShrink: 0,
              flexGrow: isPhone ? 1 : 0,
              minWidth: isPhone ? "50%" : "auto",
            }}
          >
            <img
              src={airlineLogos[flight.code]}
              alt={flight.airline}
              style={{ width: isPhone ? "4rem" : "5rem", height: "auto" }}
            />
            <Box sx={{ width: isPhone ? "2.5rem" : "0rem" }} />
            <Stack justifyContent="center">
              <Typography variant="h6" sx={{ textWrap: "nowrap" }}>
                {flight.airline}
              </Typography>
              <Typography variant="body2">
                {flight.code} {flight.number}
              </Typography>
            </Stack>
          </Stack>
          {!isPhone && <Box flexGrow={1} />}
          <Stack
            direction={isPhone ? "column-reverse" : "row"}
            spacing={isPhone ? 2.7 : 0}
          >
            <Stack justifyContent="center" width={isPhone ? "8rem" : "10rem"}>
              <Typography variant="body2">
                {flight.direction === "inbound"
                  ? isEnglish
                    ? "From"
                    : "De"
                  : isEnglish
                    ? "To"
                    : "À"}
              </Typography>
              <Typography variant="h6">{flight.city}</Typography>
            </Stack>
            <Stack justifyContent="center" width="10rem">
              <Typography
                variant="body2"
                sx={{
                  color: Object.keys(colorMap).includes(
                    flight.status.toLowerCase(),
                  )
                    ? colorMap[
                        flight.status.toLowerCase() as keyof typeof colorMap
                      ]
                    : "inherit",
                }}
              >
                <motion.span
                  animate={{
                    opacity: ["Delayed", "Cancelled", "Diverted"].includes(
                      flight.status,
                    )
                      ? [1, 1, 0, 1]
                      : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    ease: steps(2, "start"),
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  {isEnglish ? flight.status : statusFrenchMap[flight.status]}
                </motion.span>
              </Typography>
              <Stack direction="row" alignItems="flex-end" gap={1}>
                {flight.estimated ? (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: "line-through",
                        marginBottom: "0.15rem",
                        color:
                          colorMap[
                            flight.status.toLowerCase() as keyof typeof colorMap
                          ] || "inherit",
                      }}
                    >
                      {flight.scheduled}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color:
                          colorMap[
                            flight.status.toLowerCase() as keyof typeof colorMap
                          ] || "inherit",
                      }}
                    >
                      {flight.estimated}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: ["Cancelled", "Diverted", "Unknown"].includes(
                        flight.status,
                      )
                        ? colorMap[
                            flight.status.toLowerCase() as keyof typeof colorMap
                          ]
                        : "inherit",
                    }}
                  >
                    {flight.scheduled}
                  </Typography>
                )}
              </Stack>
            </Stack>
            {!isPhone && (
              <StyledTooltip
                title={
                  isEnglish ? "Track on FlightAware" : "Suivre sur FlightAware"
                }
                placement="top"
                arrow
                enterDelay={1000}
              >
                <StyledChip
                  icon={<StyledOpenInNew />}
                  onClick={() =>
                    window.open(
                      `https://flightaware.com/live/flight/${flight.flightIcao}`,
                      "_blank",
                    )
                  }
                />
              </StyledTooltip>
            )}
          </Stack>
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
}

const StyledCard = styled(Card)({
  borderRadius: "2rem",
  margin: "1rem 0",
});

const StyledCardContent = styled(CardContent)({
  padding: "0.75rem 1rem !important",
});

const StyledChip = styled(Chip)({
  cursor: "pointer",
  alignSelf: "center",
  padding: "1rem !important",
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "2rem",
});

const StyledOpenInNew = styled(OpenInNew)({
  color: "white !important",
  margin: "0rem",
  position: "relative",
  left: "0.425rem",
});
