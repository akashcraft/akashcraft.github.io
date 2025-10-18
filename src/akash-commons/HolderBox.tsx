import "./../styles/App.css";
import Header from "../akash-commons/Header";
import { Box, useMediaQuery } from "@mui/material";
import Footer from "../akash-commons/Footer";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

type HolderBoxProps = {
  children?: React.ReactNode;
};

function HolderBox({ children }: HolderBoxProps) {
  // Media Query
  const isPhone = useMediaQuery("(min-width:600px)");
  const isMid = useMediaQuery("(min-width:900px)");
  const isLarge = useMediaQuery("(min-width:1200px)");

  const padding = isLarge
    ? "2rem 20%"
    : isMid
      ? "2rem 15%"
      : isPhone
        ? "2rem 8%"
        : "1.5rem";

  return (
    <>
      <Header />
      <StyledBox sx={{ padding }}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.05, 0.8, 0.35, 0.99],
          }}
        >
          {children}
        </motion.div>
      </StyledBox>
      <Footer />
    </>
  );
}

const StyledBox = styled(Box)({
  width: "100dvw",
  minHeight: "100dvh",
  marginTop: "3rem",
  textAlign: "left",
});

export default HolderBox;
