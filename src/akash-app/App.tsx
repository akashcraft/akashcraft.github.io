import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { appData, images, LegacyAppData } from "./appData";
import styled from "@emotion/styled";
import { useGetImages } from "../akash-commons/Hooks";
import githubLogo from "./../assets/img-main/GitHub.png";
import {
  Description,
  WorkOutline as Work,
  AccountBalance as Bank,
  Apps as ButtonsAlt,
  Category as Brick,
  CalendarToday,
  Calculate,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";
import type { JSX } from "react";

function App() {
  const isPhone = useMediaQuery("(min-width:900px)");
  const isLoading = useGetImages(images);
  const navigate = useNavigate();

  return (
    <HolderBox>
      <Box flexGrow={1}>
        <Typography variant="h6" sx={{ position: "relative", top: "1rem" }}>
          Featured
        </Typography>
        <StyledSwiper
          style={{
            height: isPhone ? "20rem" : isLoading ? "30rem" : "fit-content",
          }}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: false }}
          autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
        >
          {appData.map((app, index) => (
            <SwiperSlide key={index}>
              <StyledBox flexDirection={isPhone ? "row" : "column"}>
                {isLoading && (
                  <StyledSkeleton
                    style={{
                      height: "100rem",
                      width: "100%",
                      padding: isPhone ? "0" : "12rem 0",
                      position: "relative",
                      bottom: isPhone ? "0" : isLoading ? "2rem" : "0",
                    }}
                  />
                )}

                <StyledImage
                  src={app.image}
                  alt={app.appName}
                  style={{
                    display: isLoading ? "none" : "block",
                    height: isPhone ? "100%" : "15rem",
                    width: isPhone ? "60%" : "100%",
                  }}
                />

                <ContentBox
                  sx={{
                    marginBottom: isPhone ? "0" : "1.5rem",
                    position: "relative",
                    bottom: isPhone ? "0" : isLoading ? "6rem" : "0",
                  }}
                >
                  <Typography variant="h5">{app.appName}</Typography>
                  <Typography>{app.description}</Typography>
                  <Box flexGrow={1} />
                  {appData[index].smallChipLabel.map((label, idx) => (
                    <StyledChip
                      key={idx}
                      label={label}
                      sx={{ width: isPhone ? "fit-content" : "100%" }}
                      icon={
                        appData[index].smallChipIcons[idx] === "GitHub" ? (
                          <IconBox>
                            {isLoading && (
                              <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                                sx={{ position: "relative", left: "0.25rem" }}
                              />
                            )}
                            <img
                              src={githubLogo}
                              alt={label}
                              style={{
                                display: isLoading ? "none" : "block",
                                width: "1.4rem",
                                height: "1.4rem",
                                position: "relative",
                                bottom: "0.05rem",
                              }}
                            />
                          </IconBox>
                        ) : appData[index].smallChipIcons[idx] === "Work" ? (
                          <Work sx={IconStyle} />
                        ) : (
                          <Description sx={IconStyle} />
                        )
                      }
                      onClick={() => {
                        const link = appData[index].smallChipLinks[idx];
                        if (link.startsWith("https")) {
                          window.open(link, "_blank");
                        } else {
                          navigate(link);
                        }
                      }}
                    />
                  ))}
                </ContentBox>
              </StyledBox>
            </SwiperSlide>
          ))}
        </StyledSwiper>
        <StyledStack>
          <StyledAccordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white !important" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Legacy Projects</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {LegacyAppData.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: "var(--mui-palette-background-light)",
                        borderRadius: "1rem",
                      },
                    }}
                    onClick={() => window.open(item.link, "_blank")}
                  >
                    <ListItemIcon sx={IconStyle}>
                      {iconMap[item.icon] || <Brick />}
                    </ListItemIcon>
                    <StyledListItemText
                      primary={item.appName}
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </StyledAccordion>
        </StyledStack>
      </Box>
    </HolderBox>
  );
}

const StyledStack = styled(Stack)({
  marginTop: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const iconMap: Record<string, JSX.Element> = {
  Brick: <Brick />,
  ButtonsAlt: <ButtonsAlt />,
  Bank: <Bank />,
  CalendarToday: <CalendarToday />,
  Calculate: <Calculate />,
};

const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-body2": {
    color: "white !important",
  },
});

const StyledAccordion = styled(Accordion)({
  width: "100%",
  borderRadius: "1rem !important",
  border: "0",
  "&:before": {
    display: "none",
  },
});

const StyledBox = styled(Box)({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "var(--mui-palette-background-paper)",
});

const StyledSkeleton = styled(Skeleton)({
  objectFit: "cover",
  flexGrow: 2,
});

const StyledImage = styled("img")({
  objectFit: "cover",
  borderRadius: 0,
  transition: "opacity 0.3s ease",
});

const ContentBox = styled(Box)({
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
  gap: "0.5rem",
  height: "15rem",
});

const StyledChip = styled(Chip)({
  fontSize: "1rem",
  padding: "1.25rem 1rem",
  borderRadius: "1.5rem",
  gap: "0.25rem",
});

const IconBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const StyledSwiper = styled(Swiper)`
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.25rem 0;
  margin-top: 2rem;

  .swiper-wrapper {
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    height: 100%;
    padding: 0;
  }

  .swiper-pagination-bullet {
    background-color: rgba(255, 165, 0, 0.4);
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: orange;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: orange;
    transition: color 0.2s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #ffb347;
  }
`;

const IconStyle = {
  color: "white !important",
  position: "relative",
  bottom: "0.1rem",
};

export default App;
