import "./styles/App.css";
import Header from "./commons/Header";
import { Box, Button, Stack } from "@mui/material";
import styled from "@emotion/styled";
import logo from "./assets/logo.png";
import reactLogo from "./assets/reactLogo.svg";
import { openMainWebsite } from "./commons/Utils";

function App() {
  return (
    <>
      <Header />
      <Box sx={{ margin: "1rem" }}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "2rem" }}
        >
          <StyledImg src={logo} />
          <StyledImg2 src={reactLogo} />
        </Stack>
        <h2 className="about">
          Canary Build <StyledSpan>26.1.1</StyledSpan>
        </h2>
        <br />
        <p className="about">
          Hello! My name is Akash Samanta. You are viewing an upcoming build of
          my website. Development started on 12 October 2025. The purpose of
          this new build is to migrate from vanilla HTML, CSS, and JavaScript to
          a more modern framework of React, TypeScript, and Vite.
          <br />
          <br />
          Things were becoming like spaghetti with the old build as I was adding
          new features and sections. I wanted to start from scratch and make the
          website newer, cleaner, faster, and easier to manage. This new build
          is still under development, so please pardon any bugs or unfinished
          features. The final build may differ from what is already there. You
          can always view the completed website at akashcraft.ca.
        </p>
        <br />
        <Button variant="contained" color="primary" onClick={openMainWebsite}>
          Go to akashcraft.ca
        </Button>
      </Box>
    </>
  );
}

const StyledSpan = styled.span`
  font-weight: normal;
  font-size: 0.75rem;
  color: gray;
`;

const StyledImg = styled.img`
  width: 5.5rem;
`;

const StyledImg2 = styled.img`
  width: 6rem;
  animation: logo-spin 20s linear infinite;
`;

export default App;
