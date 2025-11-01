import {
  Box,
  Skeleton,
  styled,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import img1 from "./assets/img-parallax/img1.png";
import img2 from "./assets/img-parallax/img2.png";
import img3 from "./assets/img-parallax/img3.png";
import img4 from "./assets/img-parallax/img4.png";
import img5 from "./assets/img-parallax/img5.png";
import snow from "./assets/img-parallax/snow.gif";
import fog from "./assets/img-parallax/fog.png";
import sun from "./assets/img-parallax/sun.svg";
import moon from "./assets/img-parallax/moon.svg";
import nightsky from "./assets/img-parallax/stars.jpg";
import { useGetImages } from "./akash-commons/Hooks";
import { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import { motion } from "framer-motion";
import "./styles/Image.css";
import { ArrowCircleDownOutlined, SwipeUpOutlined } from "@mui/icons-material";

const images = [img1, img2, img3, img4, img5, fog, sun, moon, snow, nightsky];
export default function Background() {
  const isLoading = useGetImages(images);
  const isPhone = useMediaQuery("(max-width:600px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lottieRef = useRef<HTMLDivElement>(null);
  const { mode } = useColorScheme();
  const isLight = mode === "light";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const imgs = container.querySelectorAll<HTMLElement>(".parallax-img");
    let frame: number;

    const animate = () => {
      imgs.forEach((img) => {
        const speed = Number(img.dataset.speed || "0");
        const offsetX = isPhone
          ? 0
          : (mouse.current.x / window.innerWidth - 0.5) * 2 * speed;
        const offsetY = isPhone
          ? 0
          : (mouse.current.y / window.innerHeight - 0.5) * 2 * speed;
        img.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPhone]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  useEffect(() => {
    if (!lottieRef.current) return;

    const anim = Lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/img/text.json",
    });

    return () => anim.destroy();
  }, []);

  const month = new Date().getMonth();
  const isWinter = month === 11 || month === 0;

  return (
    <>
      {isLoading && (
        <StyledSkeleton
          variant="rounded"
          height={isPhone ? "42rem" : "100dvh"}
        />
      )}
      <StyledBox
        className="Header"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        sx={{
          display: isLoading ? "none" : "block",
          height: isPhone ? "42rem" : "100dvh",
        }}
      >
        {isWinter && (
          <motion.img
            animate={{
              filter: isLight ? "brightness(1)" : "brightness(0.2)",
            }}
            transition={{ duration: 0.4 }}
            src={images[8]}
            className="parallax-img"
            data-speed="20"
            style={{
              ...imgStyle,
              zIndex: 0,
              top: "10%",
            }}
          />
        )}
        <motion.img
          animate={{
            filter: isLight ? "brightness(1)" : "brightness(0.2)",
          }}
          transition={{ duration: 0.4 }}
          src={images[4]}
          className="parallax-img"
          data-speed="20"
          style={{
            ...imgStyle,
            zIndex: 0,
            top: "10%",
          }}
        />
        {/* Down Arrow */}
        <motion.div
          animate={{ y: [0, 20, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: "calc(50% - 2rem)",
            top: isPhone ? "88%" : "65%",
            color: "var(--mui-palette-primary-main)",
            zIndex: 0,
          }}
        >
          {isPhone ? (
            <SwipeUpOutlined
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 50,
                  behavior: "smooth",
                });
              }}
              sx={{
                width: "4rem",
                fontSize: "2rem",
                "&:hover": { cursor: "pointer" },
              }}
            />
          ) : (
            <ArrowCircleDownOutlined
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 50,
                  behavior: "smooth",
                });
              }}
              sx={{
                width: "4rem",
                fontSize: "2rem",
                "&:hover": { cursor: "pointer" },
              }}
            />
          )}
        </motion.div>
        <StyledHead className="mainhead" sx={{ top: isPhone ? "60%" : "65%" }}>
          <div style={{ scale: isPhone ? 2.4 : 1.5 }} ref={lottieRef}></div>
        </StyledHead>
        <motion.img
          animate={{ filter: isLight ? "brightness(1)" : "brightness(0.2)" }}
          transition={{ duration: 0.4 }}
          src={images[3]}
          className="parallax-img"
          data-speed="5"
          style={{
            ...imgStyle,
            zIndex: -2,
            top: isPhone ? "-4%" : "none",
          }}
        />
        <motion.img
          animate={{ filter: isLight ? "brightness(1)" : "brightness(0.2)" }}
          transition={{ duration: 0.4 }}
          src={images[2]}
          className="parallax-img"
          data-speed="3"
          style={{
            ...imgStyle,
            zIndex: -3,
          }}
        />
        {/* Mountain */}
        <motion.img
          animate={{ filter: isLight ? "brightness(1)" : "brightness(0.2)" }}
          transition={{ duration: 0.4 }}
          src={images[1]}
          className="parallax-img"
          data-speed="2"
          style={{
            ...imgStyle,
            zIndex: -3,
            display: isPhone ? "none" : "block",
            top: "35%",
          }}
        />
        {/* Fog */}
        <motion.img
          animate={{
            opacity: isLight ? 0 : 1,
            x: ["100%", "-110%", "100%"],
          }}
          transition={{
            opacity: { duration: 0.4 },
            x: { duration: 60, repeat: Infinity, ease: "easeInOut" },
          }}
          src={images[5]}
          style={{
            ...imgStyle,
            objectFit: "contain",
            y: -300,
            filter: "brightness(0.15)",
            zIndex: -4,
          }}
        />
        {/* Sun and Moon */}
        <motion.img
          animate={{ y: isLight ? 0 : 1000, opacity: isLight ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          src={images[6]}
          style={{
            width: "8rem",
            zIndex: -4,
            position: "absolute",
            top: "4rem",
            left: isPhone ? "calc(50% - 4rem)" : "6rem",
          }}
        />
        <motion.img
          animate={{
            y: isLight ? 1000 : 0,
            opacity: isLight ? 0 : 1,
          }}
          transition={{ duration: 0.4 }}
          src={images[7]}
          style={{
            width: "8rem",
            zIndex: -4,
            position: "absolute",
            top: "4rem",
            right: isPhone ? "calc(50% - 4rem)" : "6rem",
          }}
        />
        {/* Sky */}
        <motion.img
          animate={{ opacity: isLight ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          src={images[0]}
          className="parallax-img"
          data-speed="1"
          style={{
            ...imgStyle,
            zIndex: -5,
          }}
        />
        <StyledImg
          src={images[images.length - 1]}
          className="parallax-img"
          data-speed="1"
          sx={{
            zIndex: -6,
          }}
        />
      </StyledBox>
    </>
  );
}

const imgStyle: React.CSSProperties = {
  position: "absolute",
  left: -20,
  right: 0,
  top: 0,
  bottom: 0,
  width: "110%",
  height: "100%",
  objectFit: "cover",
};

const StyledHead = styled("div")({
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: -1,
});

const StyledImg = styled("img")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const StyledBox = styled(Box)({
  position: "relative",
  width: "100%",
  maxWidth: "120rem",
  overflow: "hidden",
  maxHeight: "68rem",
  margin: "0 auto",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 0%, black 90%, transparent)",
  WebkitMaskComposite: "intersect",
  maskImage:
    "linear-gradient(to bottom, transparent, black 0%, black 90%, transparent)",
  maskComposite: "intersect",
});

const StyledSkeleton = styled(Skeleton)({
  borderRadius: "1rem",
  margin: "0 auto",
  width: "100%",
  maxWidth: "120rem",
  overflow: "hidden",
  maxHeight: "68rem",
});
