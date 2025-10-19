import { Stack, Skeleton, Divider } from "@mui/material";

type NetworkingStyledImgProps = {
  imgSrc: string;
  isWide?: boolean;
  isEnd?: boolean;
  isLoading: boolean;
  isPhone: boolean;
};

export const NetworkingStyledImg = ({
  imgSrc,
  isWide = false,
  isEnd = false,
  isLoading,
  isPhone,
}: NetworkingStyledImgProps) => (
  <>
    <Stack
      direction="row"
      justifyContent={!isPhone ? "center" : "flex-start"}
      sx={{ margin: "2rem 0" }}
      mt={4}
      mb={isEnd ? 8 : 4}
      gap={2}
    >
      <img
        src={imgSrc}
        style={{
          width: isPhone ? (isWide ? 600 : 300) : "90%",
          height: "min-content",
          borderRadius: "1rem",
          display: isLoading ? "none" : "block",
        }}
      />
      {isLoading && (
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            width: isPhone ? (isWide ? 600 : 300) : "90%",
            height: isWide ? 300 : 200,
            borderRadius: "1rem",
          }}
        />
      )}
    </Stack>
    {isEnd && (
      <Divider
        sx={{ backgroundColor: "var(--mui-palette-background-macos)" }}
      />
    )}
  </>
);
