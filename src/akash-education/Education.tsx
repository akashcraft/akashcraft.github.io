import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import styled from "@emotion/styled";
import { useState } from "react";
import {
  scholarshipData,
  images,
  munHeaderData,
  dpsHeaderData,
  deanListPaperData,
  scholarshipListData,
} from "./educationData";
import { useGetImages } from "../akash-commons/Hooks";
import HeaderRowPaper from "../akash-commons/HeaderRowPaper";
import { SidePaper } from "../akash-commons/SidePaper";

function Education() {
  const [open, setOpen] = useState(false);
  const isPhone = useMediaQuery("(min-width:600px)");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const isLoading = useGetImages(images);

  return (
    <HolderBox>
      <Stack direction={"column"} gap={1.5}>
        <HeaderRowPaper data={munHeaderData} />
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
          {isLoading && (
            <StyledSkeleton
              style={{ width: isPhone ? "120%" : "100%" }}
              variant="rounded"
              animation="wave"
            />
          )}
          <StyledSwiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            autoplay
            style={{
              display: isLoading ? "none" : "block",
              width: isPhone ? "120%" : "100%",
            }}
          >
            {images.slice(4).map((src, index) => (
              <SwiperSlide key={index} style={{ height: "auto" }}>
                <StyledImg src={src} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
          <SidePaper
            title={scholarshipListData.title}
            description={scholarshipListData.description}
            chips={scholarshipListData.chips}
            style={{
              paddingBottom: "4.5rem",
            }}
          >
            <StyledButton
              variant="outlined"
              sx={{ margin: "0.25rem 0.5rem", marginLeft: "0rem" }}
              onClick={handleOpen}
            >
              View All
            </StyledButton>
            <Dialog open={open} onClose={handleClose} sx={{ zIndex: 2500 }}>
              <DialogTitle sx={systemFont}>Scholarships and Awards</DialogTitle>
              <DialogContent>
                <TableContainer>
                  <Table>
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
                <Button onClick={handleClose} sx={systemFont}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </SidePaper>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
          <SidePaper
            title={deanListPaperData.title}
            description={deanListPaperData.description}
            chips={deanListPaperData.chips}
          />
          {isLoading && (
            <StyledSkeleton
              style={{ width: isPhone ? "250%" : "100%" }}
              variant="rounded"
              animation="wave"
            />
          )}
          <StyledSwiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            autoplay
            style={{
              display: isLoading ? "none" : "block",
              width: isPhone ? "250%" : "100%",
            }}
          >
            {images.slice(0, 4).map((src, index) => (
              <SwiperSlide key={index} style={{ height: "auto" }}>
                <StyledImg src={src} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </Stack>
        <HeaderRowPaper data={dpsHeaderData} />
      </Stack>
    </HolderBox>
  );
}

const StyledSwiper = styled(Swiper)`
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.25rem 0;
  width: 100%;
  height: auto;

  .swiper-pagination-bullet {
    background-color: rgba(255, 165, 0, 0.4);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: orange;
  }
`;

const StyledImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
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

const StyledSkeleton = styled(Skeleton)({
  borderRadius: "1rem",
  margin: "0.25rem 0",
  height: "auto",
});

export default Education;
