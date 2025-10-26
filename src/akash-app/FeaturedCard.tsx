import { Visibility, Description, GitHub } from "@mui/icons-material";
import { Typography, Box, Skeleton, styled, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { type AppData } from "./appData";

type FeaturedCardProps = {
  header: string;
  appData: AppData[];
  isLoading: boolean;
  isPhone: boolean;
};

function FeaturedCard({
  header,
  appData,
  isLoading,
  isPhone,
}: FeaturedCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" sx={{ position: "relative", top: "1rem" }}>
        {header}
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
                  alignItems: !isPhone ? "center" : "flex-start",
                  position: "relative",
                  bottom: isPhone ? "0" : isLoading ? "6rem" : "0",
                }}
              >
                <Typography variant="h5" sx={{ alignSelf: "flex-start" }}>
                  {app.appName}
                </Typography>
                <Typography>{app.description}</Typography>
                <Box flexGrow={1} />
                {appData[index].smallChipLabel.map((label, idx) => (
                  <Chip
                    key={idx}
                    label={label}
                    sx={{
                      minWidth: !isPhone ? "60%" : "fit-content",
                      padding: !isPhone ? "1.2rem" : "none",
                      fontSize: !isPhone ? "1rem" : "0.8rem",
                      borderRadius: !isPhone ? "2rem" : "1rem",
                      backgroundColor:
                        idx === 0
                          ? "var(--mui-palette-secondary-main)"
                          : "none",
                      ":hover": {
                        backgroundColor:
                          idx === 0
                            ? "var(--mui-palette-secondary-dark)"
                            : "none",
                      },
                    }}
                    icon={
                      appData[index].smallChipIcons[idx] === "GitHub" ? (
                        <GitHub sx={IconStyle} />
                      ) : appData[index].smallChipIcons[idx] ===
                        "Visibility" ? (
                        <Visibility sx={IconStyle} />
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
                <Box flexGrow={isPhone ? 0 : 1} />
              </ContentBox>
            </StyledBox>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
}

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

const IconStyle = {
  color: "white !important",
};

export default FeaturedCard;
