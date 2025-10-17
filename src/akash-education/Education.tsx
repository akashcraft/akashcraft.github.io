import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import munLogo from "./../assets/img-education/mun.png";
import dpsLogo from "./../assets/img-education/dps.png";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import styled from "@emotion/styled";
import { useState } from "react";
import { scholarshipData, images } from "./educationData";
import { GetImages } from "../akash-commons/Hooks";

function Education() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const imagesLoaded = GetImages(images);

  return (
    <HolderBox>
      <Stack direction={"column"} gap={1.5}>
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          <Paper
            elevation={0}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              flexGrow: 2,
              marginTop: "0.25rem",
              width: "25rem",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Bachelor of Engineering
            </Typography>
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              <StyledChip
                label="Memorial University of Newfoundland"
                icon={
                  <Avatar
                    sx={{ width: "1.4rem", height: "1.4rem" }}
                    src={munLogo}
                  />
                }
              />
              <StyledChip
                label="Computer Engineering"
                icon={<SchoolIcon sx={{ color: "white !important" }} />}
              />
            </Stack>
          </Paper>
          <Stack direction={"row"} flexGrow={1} gap={1.5}>
            <StyledPaper elevation={0}>
              <Typography variant="body2">Graduation</Typography>
              <Typography variant="h5">2026</Typography>
              <Typography variant="body2" sx={{ marginTop: "0.25rem" }}>
                Since 2021
              </Typography>
            </StyledPaper>
            <StyledPaper elevation={0}>
              <Typography variant="body2">GPA</Typography>
              <Typography variant="h5">4.0</Typography>
              <Typography variant="body2" sx={{ marginTop: "0.25rem" }}>
                Out of 4.0
              </Typography>
            </StyledPaper>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
          {imagesLoaded ? (
            <StyledSwiper
              modules={[Pagination, Navigation, Autoplay]}
              pagination={{ clickable: true }}
              navigation
              slidesPerView={1}
              autoplay
            >
              {images.slice(4).map((src, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                  <StyledImg src={src} />
                </SwiperSlide>
              ))}
            </StyledSwiper>
          ) : (
            <StyledSkeleton variant="rounded" animation="wave" />
          )}
          <Paper
            elevation={0}
            sx={{
              padding: "1rem",
              paddingBottom: "5rem",
              borderRadius: "1rem",
              margin: "0.25rem 0",
              width: { xs: "none", sm: "25rem" },
              position: "relative",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Scholarships and Awards
            </Typography>
            <Stack direction="row" flexWrap="wrap" alignItems="center">
              <StyledChip label="Work Term Oral Presentation Dean's Award" />
              <StyledChip label="Verafin Inc. Computer Engineering Scholarship" />
              <StyledChip label="Innovasea Scholarship for Computer Engineering" />
            </Stack>
            <StyledButton
              variant="outlined"
              sx={{ margin: "0.25rem 0.5rem", marginLeft: "0rem" }}
              onClick={handleOpen}
            >
              View All
            </StyledButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={systemFont}>
                Scholarships and Awards
              </DialogTitle>
              <DialogContent id="alert-dialog-description">
                <TableContainer>
                  <Table aria-label="scholarships table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={systemFont}>Award</TableCell>
                        <TableCell sx={systemFont}>Year</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scholarshipData.map((scholarship, index) => (
                        <TableRow key={index}>
                          <TableCell sx={systemFont}>
                            {scholarship.title}
                          </TableCell>
                          <TableCell sx={systemFont}>
                            {scholarship.year}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus sx={systemFont}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
          <Paper
            elevation={0}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              margin: "0.25rem 0",
              width: { xs: "none", sm: "70rem" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Dean's List
            </Typography>
            <Typography variant="body2">
              The Dean's List recognizes the top academic performers and is an
              honour that is bestowed on students with academic averages within
              the top 10% of their class
            </Typography>
            <br />
            <Stack direction="row" flexWrap="wrap" alignItems="center">
              <StyledChip label="Fall 2023 - Term 3" />
              <StyledChip label="Winter 2024 - Term 4" />
              <StyledChip label="Fall 2024 - Term 6" />
              <StyledChip label="Winter 2025 - Term 7" />
            </Stack>
          </Paper>
          {imagesLoaded ? (
            <StyledSwiper
              modules={[Pagination, Navigation, Autoplay]}
              pagination={{ clickable: true }}
              navigation
              slidesPerView={1}
              autoplay
            >
              {images.slice(0, 4).map((src, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                  <StyledImg src={src} />
                </SwiperSlide>
              ))}
            </StyledSwiper>
          ) : (
            <StyledSkeleton variant="rounded" animation="wave" />
          )}
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          <Paper
            elevation={0}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              flexGrow: 2,
              marginTop: "0.25rem",
              width: "25rem",
            }}
          >
            <Typography variant="h6" gutterBottom>
              High School Diploma
            </Typography>
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              <StyledChip
                label="DPS Modern Indian School"
                icon={
                  <Avatar
                    sx={{ width: "1.4rem", height: "1.4rem" }}
                    src={dpsLogo}
                  />
                }
              />
              <StyledChip
                label="Science Stream"
                icon={<SchoolIcon sx={{ color: "white !important" }} />}
              />
            </Stack>
          </Paper>
          <Stack direction={"row"} flexGrow={1} gap={1.5}>
            <StyledPaper elevation={0}>
              <Typography variant="body2">Graduated</Typography>
              <Typography variant="h5">2021</Typography>
              <Typography variant="body2" sx={{ marginTop: "0.25rem" }}>
                Since 2014
              </Typography>
            </StyledPaper>
            <StyledPaper elevation={0}>
              <Typography variant="body2">Grade</Typography>
              <Typography variant="h5">97</Typography>
              <Typography variant="body2" sx={{ marginTop: "0.25rem" }}>
                Out of 100
              </Typography>
            </StyledPaper>
          </Stack>
        </Stack>
      </Stack>
    </HolderBox>
  );
}

const StyledSwiper = styled(Swiper)`
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.25rem 0;

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

const StyledImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const StyledChip = styled(Chip)({
  margin: "0.25rem 0.5rem",
  marginLeft: "0rem",
});

const StyledButton = styled(Button)({
  margin: "0.25rem 0.5rem",
  marginLeft: "0rem",
  borderRadius: "1.5rem",
  textTransform: "none",
  position: "absolute",
  bottom: "1rem",
  right: "1rem",
});

const systemFont = {
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;",
};

const StyledPaper = styled(Paper)({
  padding: "1rem",
  borderRadius: "1rem",
  flexBasis: "fit-content",
  flexGrow: 1,
  textWrap: "nowrap",
  marginTop: "0.25rem",
});

const StyledSkeleton = styled(Skeleton)({
  borderRadius: "1rem",
  margin: "0.25rem 0",
  width: "100%",
  height: 300,
});

export default Education;
