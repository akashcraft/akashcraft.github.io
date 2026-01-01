import {
  Box,
  Chip,
  Stack,
  styled,
  useColorScheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import macInfo from "../assets/img-macos/macSetup3.svg";
import { useGetImages } from "../akash-commons/Hooks";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MacNotification({ text }: { text: string | null }) {
  const { mode } = useColorScheme();
  const isLight = mode === "light";
  const isPhone = useMediaQuery("(max-width: 800px)");
  const isLoading = useGetImages([macInfo]);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsDismissed(true);
    }, 15000);
  }, []);

  const isVisible =
    text !== null &&
    text.trim() !== "" &&
    !isLoading &&
    sessionStorage.getItem("remove-notice") === null &&
    !isDismissed;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={
            isPhone
              ? { y: -100, x: 0, opacity: 0 }
              : { x: 300, y: 0, opacity: 0 }
          }
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={isPhone ? { y: -100, opacity: 0 } : { x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            position: "fixed",
            top: "4.5rem",
            right: isPhone ? "5%" : "0.5rem",
            left: isPhone ? "5%" : "auto",
            zIndex: 1300,
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            gap={2}
            sx={{
              bgcolor: isLight
                ? "color-mix(in srgb, var(--mui-palette-background-normal), transparent 50%)"
                : "color-mix(in srgb, var(--mui-palette-background-paper), transparent 20%)",
              backdropFilter: "blur(1px) saturate(1.1) url('#glassfilter')",
              padding: "1rem",
              borderRadius: "1rem",
              boxShadow:
                "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
              width: isPhone ? "90vw" : "30rem",
              color: "var(--mui-palette-text-secondary)",
              position: "relative",
            }}
          >
            <img
              src={macInfo}
              style={{ width: "4rem", height: "auto" }}
              alt="mac-info"
            />
            <Box sx={{ position: "relative", overflow: "visible" }}>
              <IconChip
                variant="filled"
                icon={<Close sx={{ fontSize: "1rem", color: "white" }} />}
                onClick={() => {
                  sessionStorage.setItem("remove-notice", "true");
                  setIsDismissed(true);
                }}
                sx={{
                  position: "absolute",
                  top: "-1.7rem",
                  left: "-6.7rem",
                  opacity: 0,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "var(--mui-palette-background-macos)",
                    opacity: 1,
                  },
                }}
              />
              <Stack>
                <Typography
                  sx={{
                    fontFamily: "San Francisco Bold",
                    margin: 0,
                    fontWeight: "bold",
                  }}
                >
                  Notice
                </Typography>
                <Typography sx={{ fontFamily: "San Francisco", margin: 0 }}>
                  {text}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const IconChip = styled(Chip)({
  color: "white",
  width: "1.6rem",
  height: "1.6rem",
  cursor: "pointer",
  ".MuiChip-label": { display: "none" },
  ".MuiChip-icon": { margin: 0 },
});
