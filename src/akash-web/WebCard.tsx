import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import type { WebDataType } from "./webData";
import { useState } from "react";
import { GitHub, PlayArrow, WarningAmberOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

type WebCardProps = {
  data: WebDataType;
  isLoading: boolean;
  isPhone: boolean;
};

function WebCard({ data, isLoading, isPhone }: WebCardProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <StyledCard sx={{ width: isPhone ? "18rem" : "100%" }}>
      <CardActionArea
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (data.smallChipLinks[0].includes(".html")) {
            window.location.href = data.smallChipLinks[0];
          } else if (!data.smallChipLinks[0].includes("https://")) {
            navigate(data.smallChipLinks[0]);
          }
        }}
      >
        <motion.div
          style={{ y: 0 }}
          initial={{ scale: 1, y: 0 }}
          animate={{ scale: hovered ? 1.05 : 1, y: hovered ? -4 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {isLoading && (
            <Skeleton variant="rectangular" animation="wave" height={170} />
          )}
          <CardMedia
            component="img"
            style={{ display: isLoading ? "none" : "block" }}
            height="170"
            image={data.image}
          />
        </motion.div>
        <CardContent
          sx={{
            minHeight: "12rem",
            display: "flex",
            flexDirection: "column",
            alignItems: !isPhone ? "center" : "flex-start",
            gap: "0.5rem",
          }}
        >
          <Typography variant="h6" sx={{ alignSelf: "flex-start" }}>
            {data.appName}
          </Typography>

          <Typography
            color="text.primary"
            variant="body2"
            sx={{ alignSelf: "flex-start" }}
          >
            {data.description}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction={isPhone ? "row" : "column"} gap={1}>
            {data.smallChipLabel.map((label, index) => {
              const isStartChip = data.smallChipLabel[index].includes("Start");
              const isWarningChip = (data.isWideOnly ?? false) && !isPhone;
              return (
                <Chip
                  sx={{
                    cursor: "pointer",
                    minWidth: !isPhone ? "60%" : "fit-content",
                    padding: !isPhone ? "1.2rem" : "none",
                    fontSize: !isPhone ? "1rem" : "0.8rem",
                    borderRadius: !isPhone ? "2rem" : "1rem",
                    backgroundColor: isStartChip
                      ? isWarningChip
                        ? "#d29914ff"
                        : "var(--mui-palette-secondary-main)"
                      : "none",
                    "&:hover": {
                      backgroundColor: isStartChip
                        ? isWarningChip
                          ? "#8c660cff"
                          : "var(--mui-palette-secondary-dark)"
                        : "none",
                    },
                  }}
                  key={index}
                  label={
                    isWarningChip && label == "Start"
                      ? "Screen Width Low"
                      : label
                  }
                  onClick={() => {
                    if (data.smallChipLinks[index].includes("https://")) {
                      window.open(data.smallChipLinks[index], "_blank");
                    } else if (data.smallChipLinks[index].includes(".html")) {
                      window.location.href = data.smallChipLinks[index];
                    } else {
                      navigate(data.smallChipLinks[index]);
                    }
                  }}
                  icon={
                    !isStartChip ? (
                      <GitHub sx={{ color: "white!important" }} />
                    ) : isWarningChip ? (
                      <WarningAmberOutlined sx={{ color: "white!important" }} />
                    ) : (
                      <PlayArrow sx={{ color: "white!important" }} />
                    )
                  }
                />
              );
            })}
          </Stack>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

const StyledCard = styled(Card)({
  backgroundColor: "var(--mui-palette-background-paper)",
  borderRadius: "1rem",
  textAlign: "left",
});

export default WebCard;
