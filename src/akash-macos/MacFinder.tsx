import { Stack, styled } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import Draggable, {
  type DraggableData,
  type DraggableEvent,
} from "react-draggable";
import { NavChip } from "./NavChip";
import { LeftItems } from "./LeftItems";
// import { useGetImages } from "../akash-commons/Hooks";
import { finderImages, macFinderContent } from "./macDockData";
import { TopBar } from "./TopBar";
import { MacFinderContent } from "./MacFinderContent";
import { ArrowBackOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import { MacContext } from "./MacContext";

export function MacFinder() {
  const nodeRef = useRef(null);
  const [visibleChips, setVisibleChips] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previousPosition, setPreviousPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    const saved = sessionStorage.getItem("finder-pos");
    return saved ? JSON.parse(saved) : { x: 185, y: 200 };
  });

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleStop = (_e: DraggableEvent, data: DraggableData) => {
    setIsDragging(false);
    const newPos = { x: data.x, y: data.y };
    setPosition(newPos);
    sessionStorage.setItem("finder-pos", JSON.stringify(newPos));
  };

  const { macSystemState } = useContext(MacContext);

  useEffect(() => {
    if (macSystemState.isFinderExpanded) {
      setPreviousPosition(position);
      setPosition({ x: 0, y: 0 });
    } else {
      if (previousPosition) {
        setPosition(previousPosition);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [macSystemState.isFinderExpanded]);

  return (
    <Draggable
      handle=".handle"
      nodeRef={nodeRef}
      position={position}
      onStop={handleStop}
      onStart={handleStart}
      disabled={macSystemState.isFinderExpanded}
    >
      <StyledStack
        ref={nodeRef}
        sx={{
          zIndex: macSystemState.isFinderExpanded ? 2000 : 2,
          borderRadius: macSystemState.isFinderExpanded ? 0 : "1.5rem",
          width: macSystemState.isFinderExpanded ? "100vw" : "45rem",
          height: macSystemState.isFinderExpanded ? "100vh" : "27rem",
          transition: isDragging ? "none" : "all 0.4s ease-in-out",
        }}
      >
        <Handle className="handle" />
        <LeftBar>
          <NavBar
            onMouseEnter={() => setVisibleChips(true)}
            onMouseLeave={() => setVisibleChips(false)}
          >
            {["close", "minimize", "maximize"].map((type) => (
              <NavChip key={type} type={type} visible={visibleChips} />
            ))}
            {!macSystemState.isFinderExpanded && (
              <motion.div
                animate={{ x: [-5, 20, -5], y: [1, 1, 1] }}
                transition={{ ease: "easeInOut", repeat: 1000, duration: 1.5 }}
              >
                <ArrowBackOutlined
                  sx={{ color: "var(--mui-palette-text-secondary)" }}
                />
              </motion.div>
            )}
          </NavBar>
          <LeftItems
            title="Locations"
            items={["Akash's MacBook Pro", "iCloud", "Windows Drive"]}
            imgSrc={[finderImages[0], finderImages[1], finderImages[2]]}
          />
          <LeftItems
            title="Favourites"
            items={[
              "Applications",
              "Handcrafted By Akash",
              "Legacy Website",
              "Trash",
            ]}
            imgSrc={["", "", "", finderImages[3]]}
          />
        </LeftBar>
        <RightBar>
          <TopBar />
          <MacFinderContent
            names={macFinderContent.names}
            imgSrc={macFinderContent.imgSrc}
            links={macFinderContent.links}
          />
        </RightBar>
      </StyledStack>
    </Draggable>
  );
}

const NavBar = styled(Stack)({
  marginLeft: "0.5rem",
  marginTop: "0.25rem",
  gap: "0.6rem",
  height: "1.5rem",
  width: "fit-content",
  flexDirection: "row",
  zIndex: 2,
});

const LeftBar = styled(Stack)({
  width: "12rem",
  flexShrink: 0,
  height: "100%",
  borderRadius: "1rem",
  border: "1px solid var(--mui-palette-text-light)",
  backgroundColor: "var(--mui-palette-background-macosfinder2)",
});

const RightBar = styled(Stack)({
  flexDirection: "column",
  flexGrow: 1,
  height: "100%",
  backgroundColor: "var(--mui-palette-background-macosfinder)",
});

const StyledStack = styled(Stack)({
  position: "fixed",
  top: 0,
  left: 0,
  flexDirection: "row",
  backgroundColor: "var(--mui-palette-background-macosfinder)",
  padding: "0.5rem",
  border: "1px solid var(--mui-palette-text-light)",
  zIndex: 2,
  overflow: "hidden",
});

const Handle = styled("div")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "3rem",
  zIndex: 1,
});
