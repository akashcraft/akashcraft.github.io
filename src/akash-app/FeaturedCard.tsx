import {
  Visibility,
  Description,
  GitHub,
  OpenInNew,
} from "@mui/icons-material";
import {
  Typography,
  Box,
  Skeleton,
  styled,
  Chip,
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
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

  return isPhone ? (
    <>
      <Typography variant="h6" sx={{ position: "relative", top: "1rem" }}>
        {header}
      </Typography>
      <StyledSwiper
        style={{
          height: "20rem",
        }}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: false }}
        autoplay={{ delay: 10000, pauseOnMouseEnter: true }}
      >
        {appData.map((app, index) => (
          <SwiperSlide key={index}>
            <StyledBox flexDirection="row">
              {isLoading && (
                <StyledSkeleton
                  style={{
                    height: "100rem",
                    width: "100%",
                    padding: 0,
                    position: "relative",
                    bottom: 0,
                  }}
                />
              )}

              <StyledImage
                src={app.image}
                alt={app.appName}
                style={{
                  display: isLoading ? "none" : "block",
                  height: "100%",
                  width: "60%",
                }}
              />

              <ContentBox
                sx={{
                  alignItems: "flex-start",
                  position: "relative",
                  bottom: 0,
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
                      minWidth: "fit-content",
                      padding: "none",
                      fontSize: "0.8rem",
                      borderRadius: "1rem",
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
                <Box flexGrow={1} />
              </ContentBox>
            </StyledBox>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </>
  ) : (
    <>
      <Typography variant="h6" sx={{ mb: 0, mt: 1 }}>
        {header}
      </Typography>
      <List sx={{ alignSelf: "center", mt: 2, mb: 0 }}>
        {appData.map((app, index) => (
          <ListItemButton
            key={index}
            sx={{
              maxWidth: "40rem",
              padding: "1rem",
              alignSelf: "center",
              gap: "1rem",
              backgroundColor: "var(--mui-palette-background-paper)",
              ":hover": { backgroundColor: "var(--mui-palette-action-hover)" },
              borderRadius: "1rem",
              mb: 2,
            }}
            onClick={() => {
              const link = app.smallChipLinks[0];
              if (link.startsWith("https")) {
                window.open(link, "_blank");
              } else {
                navigate(link);
              }
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={app.image}
                variant="rounded"
                sx={{ transform: "scale(1.7)", margin: "0 1rem" }}
              />
            </ListItemAvatar>

            <ListItemText
              primary={
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <span style={{ fontWeight: "bold" }}>{app.appName}</span>
                  <OpenInNew sx={{ fontSize: "1.2rem", opacity: 0.7 }} />
                </Stack>
              }
              secondary={
                <Stack
                  direction="column"
                  gap={1}
                  mt={1}
                  component="div"
                  sx={{ color: "var(--mui-palette-text-primary)" }}
                >
                  <span>{app.description}</span>
                  <Stack direction="row" gap={1.5} mt={0.5} flexWrap="wrap">
                    {app.smallChipLabel.map((label, idx) => (
                      <Chip
                        key={idx}
                        size="small"
                        sx={{
                          cursor: "pointer",
                          fontSize: "0.9rem",
                          padding: "1rem 0.75rem",
                          borderRadius: "1rem",
                          backgroundColor:
                            idx === 0
                              ? "var(--mui-palette-secondary-main)"
                              : "rgba(255,255,255,0.1)",
                          color: "white",
                          ":hover": {
                            backgroundColor:
                              idx === 0
                                ? "var(--mui-palette-secondary-dark)"
                                : "rgba(255,255,255,0.2)",
                          },
                        }}
                        label={label}
                        onClick={(e) => {
                          e.stopPropagation();
                          const link = app.smallChipLinks[idx];
                          if (link.startsWith("https")) {
                            window.open(link, "_blank");
                          } else {
                            navigate(link);
                          }
                        }}
                        icon={
                          app.smallChipIcons[idx] === "GitHub" ? (
                            <GitHub
                              style={{ color: "white", fontSize: "1rem" }}
                            />
                          ) : app.smallChipIcons[idx] === "Visibility" ? (
                            <Visibility
                              style={{ color: "white", fontSize: "1rem" }}
                            />
                          ) : (
                            <Description
                              style={{ color: "white", fontSize: "1rem" }}
                            />
                          )
                        }
                      />
                    ))}
                  </Stack>
                </Stack>
              }
              secondaryTypographyProps={{ component: "div" }}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}

export const StyledSwiper = styled(Swiper)`
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.25rem 0;
  margin: 2rem 0;

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
