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
import { GitHub, PlayArrow } from "@mui/icons-material";
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
          sx={{ minHeight: "12rem", display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h6">{data.appName}</Typography>

          <Typography variant="body2" color="text.primary" mt={1} mb={1}>
            {data.description}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {data.smallChipLabel.map((label, index) => (
              <Chip
                sx={{
                  cursor: "pointer",
                  width: !isPhone ? "100%" : "fit-content",
                }}
                key={index}
                label={label}
                onClick={() => {
                  if (data.smallChipLinks[index].includes("https://")) {
                    window.open(data.smallChipLinks[index], "_blank");
                  } else {
                    navigate(data.smallChipLinks[index]);
                  }
                }}
                icon={
                  data.smallChipLabel[index].includes("Start") ? (
                    <PlayArrow sx={{ color: "white!important" }} />
                  ) : (
                    <GitHub sx={{ color: "white!important" }} />
                  )
                }
              />
            ))}
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
