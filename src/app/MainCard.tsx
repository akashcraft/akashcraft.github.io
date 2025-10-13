import {
  Stack,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import type { genericAppData } from "./appData";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BlockIcon from "@mui/icons-material/Block";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import MacDialog from "../commons/MacDialog";

type MainCardProps = {
  data: genericAppData;
  isDuration?: boolean;
};

function MainCard({ data, isDuration }: MainCardProps) {
  const subtitle = isDuration ? "Duration: " + data.subtitle : data.subtitle;
  const [hovered, setHovered] = useState<boolean>(false);
  const isPrivate = data.linkText === "Private";
  const isReload = data.linkText === "Reload";
  const [openOpenMacDialog, setOpenMacDialog] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  function handleNotImplementedClick() {
    setOpenMacDialog(true);
  }

  // Media Query
  const phone = useMediaQuery("(min-width:600px)");

  return (
    <>
      <MacDialog
        heading="Not Implemented"
        description="This feature is still under development. You can view the completed website on akashcraft.ca."
        visible={openOpenMacDialog}
        onClose={() => setOpenMacDialog(false)}
      />
      <StyledCard phone={phone} sx={{ maxWidth: "20rem" }}>
        <CardActionArea
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleNotImplementedClick}
        >
          <motion.div
            style={{ y: 0 }}
            initial={{ scale: 1 }}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <CardMedia component="img" height="170" image={data.image} />
          </motion.div>
          <CardContent>
            <div style={{ position: "relative", height: "2rem" }}>
              <motion.div
                key="left"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: hovered ? 0 : 1, x: hovered ? -20 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <Typography variant="h6">{data.title}</Typography>
              </motion.div>

              <motion.div
                key="center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 20 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">{data.title}</Typography>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 1, y: 5 }}
              animate={{ opacity: hovered ? 0 : 1, y: 5 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Typography
                variant="subtitle1"
                color="text.primary"
                marginBottom={"1rem"}
              >
                {subtitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                marginBottom={"1rem"}
              >
                {data.description}
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? -50 : 40 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <StyledStack
                isReload={isReload}
                isPrivate={isPrivate}
                direction="row"
                spacing={"1rem"}
                alignItems="center"
                justifyContent="center"
              >
                <p>{data.linkText}</p>
                {isReload ? (
                  <RefreshIcon />
                ) : isPrivate ? (
                  <BlockIcon />
                ) : (
                  <motion.div
                    initial={{ x: -10, y: 2.75 }}
                    animate={{ x: 10, y: 2.75 }}
                    transition={{
                      duration: 0.4,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <ArrowForwardIcon />
                  </motion.div>
                )}
              </StyledStack>
            </motion.div>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </>
  );
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "phone",
})<{ phone: boolean }>(({ phone }) => ({
  backgroundColor: "var(--mui-palette-background-paper)",
  margin: phone ? "0.5rem" : "1rem",
  borderRadius: "1rem",
  textAlign: "left",
}));

const StyledStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "isPrivate" && prop !== "isReload",
})<{ isPrivate: boolean; isReload: boolean }>(({ isPrivate, isReload }) => ({
  borderRadius: "1rem",
  fontFamily: "Trebuchet",
  position: "absolute",
  textWrap: "nowrap",
  padding: "0.2rem 1rem",
  left: "50%",
  backgroundColor: isReload ? "green" : isPrivate ? "red" : "#ed784f",
  fontSize: "1.1rem",
  transform: "translateX(-50%)",
  transformOrigin: "center",
}));

export default MainCard;
