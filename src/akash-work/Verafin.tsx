import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import { Paper, Skeleton, Stack } from "@mui/material";
import "swiper/swiper-bundle.css";

import styled from "@emotion/styled";
import {
  datalakesPaperData,
  images,
  uiPaperData,
  verafinHeaderData,
  verafinHeaderData2,
} from "./verafinData";
import HeaderRowPaper from "../akash-commons/HeaderRowPaper";
import { SidePaper } from "../akash-commons/SidePaper";
import { GetImages } from "../akash-commons/Hooks";

function Verafin() {
  const imagesLoaded = GetImages(images);
  return (
    <HolderBox>
      <Stack direction={"column"} gap={1.5}>
        <HeaderRowPaper data={verafinHeaderData} />
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
          {imagesLoaded ? (
            <StyledPaper>
              <img
                src={images[1]}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </StyledPaper>
          ) : (
            <StyledSkeleton variant="rounded" animation="wave" />
          )}
          <SidePaper
            title={datalakesPaperData.title}
            description={datalakesPaperData.description}
            width="35rem"
          />
        </Stack>
        <HeaderRowPaper data={verafinHeaderData2} />
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
          <SidePaper
            title={uiPaperData.title}
            description={uiPaperData.description}
            width="30rem"
          />
          {imagesLoaded ? (
            <StyledPaper>
              <img
                src={images[0]}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </StyledPaper>
          ) : (
            <StyledSkeleton variant="rounded" animation="wave" />
          )}
        </Stack>
      </Stack>
    </HolderBox>
  );
}

const StyledSkeleton = styled(Skeleton)({
  borderRadius: "1rem",
  margin: "0.25rem 0",
  width: "100%",
  height: 300,
});

const StyledPaper = styled(Paper)({
  flexGrow: 1,
  borderRadius: "1rem",
  overflow: "hidden",
  margin: "0.25rem 0",
  height: "20rem",
});

export default Verafin;
