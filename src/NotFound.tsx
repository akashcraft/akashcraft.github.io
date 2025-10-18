import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import HolderBox from "./akash-commons/HolderBox";
import ErrorIcon from "@mui/icons-material/ErrorOutlineOutlined";
import styled from "@emotion/styled";

export function NotFound() {
  // Media Query
  const isPhone = useMediaQuery("(min-width:600px)");
  return (
    <HolderBox>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "10rem" }}
        gap={isPhone ? 2 : 1}
      >
        <ErrorIcon sx={{ fontSize: "6rem", marginBottom: "1rem" }} />
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography
          textAlign={"center"}
          sx={{ fontSize: isPhone ? "1rem" : "0.75rem" }}
        >
          Error 404 - The page you are looking for does not exist
        </Typography>
        <Typography
          textAlign={"center"}
          sx={{ fontSize: isPhone ? "1rem" : "0.75rem" }}
        >
          Are you sure you typed the URL correctly?
        </Typography>
        <StyledButton variant="contained" href="/">
          BACK TO HOME
        </StyledButton>
      </Stack>
    </HolderBox>
  );
}

const StyledButton = styled(Button)({
  marginTop: "1rem",
  borderRadius: "1rem",
  padding: "0.5rem 1rem",
  color: "white",
  backgroundColor: "#df742d",
});
