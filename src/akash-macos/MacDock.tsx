import { useState, type CSSProperties } from "react";
import {
  Divider,
  Skeleton,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
  useMediaQuery,
  useColorScheme,
  type TooltipProps,
} from "@mui/material";
import { dockData, dockImages } from "./macDockData";
import { motion } from "framer-motion";
import MacDialog from "../akash-commons/MacDialog";
import "../styles/Image.css";
import { useGetImages } from "../akash-commons/Hooks";

type selectedProps = {
  heading: string;
  description: string;
  externalLink?: string;
};

function MacDock() {
  const isPhone = useMediaQuery("(min-width:900px)");
  const { mode } = useColorScheme();
  const isLight = mode === "light";
  const [selected, setSelected] = useState<number[]>([0]);
  const isLoading = useGetImages(dockImages);

  const [dialogProps, setDialogProps] = useState<selectedProps>({
    heading: "Dock Item Opened",
    description:
      "You have opened a dock item. This is a demo dialog to showcase the Mac Dock functionality.",
  });

  const handleClick = (index: number) => {
    setDialogProps({
      heading: `macOS cannot open this app`,
      description: `You are trying to open the ${dockData[index].title} dock item. Would you like to search the web instead?`,
      externalLink: `https://www.google.com/search?q=${dockData[index].title}`,
    });
    setSelected((prevSelected) => {
      return [...prevSelected, index];
    });
  };

  return (
    <>
      <MacDialog
        heading={dialogProps.heading}
        description={dialogProps.description}
        primaryButtonText="Stay on akashcraft.ca"
        secondaryButtonText="Search Safari"
        imageSrc={dockImages[dockImages.length - 2]}
        visible={selected.length > 1}
        onClose={() => setSelected([0])}
        onCloseSecondary={() => {
          if (dialogProps.externalLink) {
            window.location.href = dialogProps.externalLink;
          }
        }}
      />
      {isPhone && (
        <>
          {isLoading && (
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ margin: "4rem auto", borderRadius: "1rem" }}
              width="80%"
              height="2.5rem"
            />
          )}
          <StyledStack sx={{ display: isLoading ? "none" : "flex" }}>
            {dockData.map((item, index) => {
              const isSelected = selected.includes(index);
              if (item.title === "Trash") {
                return (
                  <Stack direction="row" key={index}>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginRight: "0.45rem", marginLeft: "0.2rem" }}
                    />
                    <StyledHolder>
                      <StyledTooltip title={item.title} arrow placement="top">
                        <img
                          style={{
                            ...imgOriginalStyle,
                            filter: isLight ? "none" : "brightness(0.5)",
                          }}
                          src={item.image}
                        />
                      </StyledTooltip>
                    </StyledHolder>
                  </Stack>
                );
              } else if (item.title === "Finder") {
                return (
                  <Stack direction="row" key={index}>
                    <StyledHolder>
                      <StyledTooltip title={item.title} arrow placement="top">
                        <img
                          style={imgStyle}
                          src={
                            isLight
                              ? item.image
                              : dockImages[dockImages.length - 1]
                          }
                        />
                      </StyledTooltip>
                      <Typography color="text.secondary">.</Typography>
                    </StyledHolder>
                  </Stack>
                );
              } else {
                return (
                  <StyledHolder key={index} onClick={() => handleClick(index)}>
                    <StyledTooltip title={item.title} arrow placement="top">
                      <motion.img
                        key={isSelected ? "active" : "inactive"}
                        animate={{
                          y: isSelected && index !== 0 ? [0, -20, 0] : 0,
                        }}
                        transition={{
                          duration: 1,
                          ease: ["easeIn", "linear"],
                          repeat: 100,
                        }}
                        style={isSelected ? imgStyle : imgOriginalStyle}
                        width="100%"
                        src={item.image}
                      />
                    </StyledTooltip>
                    {isSelected && (
                      <Typography color="text.secondary">.</Typography>
                    )}
                  </StyledHolder>
                );
              }
            })}
          </StyledStack>
        </>
      )}
    </>
  );
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    borderRadius: "1rem",
    backgroundColor: "var(--mui-palette-background-macos)",
    color: "var(--mui-palette-text-secondary)",
    fontSize: "0.85rem",
    fontFamily:
      "San Francisco, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "var(--mui-palette-background-macos)",
  },
}));

const StyledStack = styled(Stack)({
  backgroundColor: "var(--mui-palette-background-macos)",
  gap: "0.5rem",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  display: "flex",
  flexDirection: "row",
  margin: "4rem auto",
  flexWrap: "wrap",
  padding: "0.6rem 0.5rem",
  borderRadius: "1rem",
});

const StyledHolder = styled(Stack)({
  flexDirection: "column",
  gap: 0,
  width: "2rem",
  height: "2rem",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    transform: "scale(1.1)",
    transition: "transform 0.2s ease-in-out",
  },
});

const imgStyle: CSSProperties = {
  position: "relative",
  top: "0.7rem",
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const imgOriginalStyle: CSSProperties = {
  position: "relative",
  top: "-0.05rem",
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

export default MacDock;
