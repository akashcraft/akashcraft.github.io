import {
  Stack,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { useContext, useState } from "react";
import { MacDialogContext, type genericAppData } from "./appData";
import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BlockIcon from "@mui/icons-material/Block";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { OpenInNew } from "@mui/icons-material";

type MainCardProps = {
  data: genericAppData;
  isDuration?: boolean;
  isLoading?: boolean;
};

function MainCard({ data, isDuration, isLoading = false }: MainCardProps) {
  const subtitle = isDuration ? "Duration: " + data.subtitle : data.subtitle;
  const [hovered, setHovered] = useState<boolean>(false);
  const isPrivate = data.linkText === "Private";
  const isReset = data.linkText === "Reset";
  const { setOpenMacDialog } = useContext(MacDialogContext);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  function handleClick() {
    if (data.link && !isReset) {
      if (data.link.startsWith("http")) {
        window.open(data.link, "_blank");
      } else {
        navigate(`/${data.link}`);
      }
    } else if (isReset) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.reload();
    } else {
      setOpenMacDialog(true);
    }
  }

  // Media Query
  const phone = useMediaQuery("(min-width:600px)");

  return (
    <>
      <StyledCard
        sx={{
          margin: phone ? "0.5rem" : "1rem",
        }}
      >
        <CardActionArea
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
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
          <CardContent>
            <div style={{ position: "relative", height: "2rem" }}>
              <motion.div
                key="left"
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: hovered ? 0 : 1, x: hovered ? 25 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{data.title}</Typography>
                  {isReset ? <RefreshIcon /> : <OpenInNew />}
                </Stack>
              </motion.div>

              <motion.div
                key="center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -25 }}
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
                sx={{
                  backgroundColor: isReset
                    ? "green"
                    : isPrivate
                      ? "red"
                      : "var(--mui-palette-secondary-main)",
                }}
                direction="row"
                spacing={"1rem"}
                alignItems="center"
                justifyContent="center"
              >
                <p>{data.linkText}</p>
                {isReset ? (
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

const StyledCard = styled(Card)({
  backgroundColor: "var(--mui-palette-background-paper)",
  borderRadius: "1rem",
  maxWidth: "20rem",
  textAlign: "left",
});

const StyledStack = styled(Stack)({
  borderRadius: "0.75rem",
  fontFamily: "Trebuchet",
  position: "absolute",
  textWrap: "nowrap",
  padding: "0.2rem 1rem",
  left: "50%",
  fontSize: "1.1rem",
  transform: "translateX(-50%)",
  transformOrigin: "center",
});

export default MainCard;
