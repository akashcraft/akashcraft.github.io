import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import Home from "./Home.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, pink } from "@mui/material/colors";
import { GlobalStyles, CssBaseline } from "@mui/material";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Education from "./akash-education/Education.tsx";
import Networking from "./akash-others/Networking.tsx";
import Verafin from "./akash-work/Verafin.tsx";
import EyePort from "./akash-work/EyePort.tsx";
import Web from "./akash-web/Web.tsx";
import App from "./akash-app/App.tsx";
import ScrollToTop from "./akash-commons/ScrollToTop.tsx";

const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
  },
  typography: { fontFamily: "Trebuchet" },
  colorSchemes: {
    light: {
      palette: {
        primary: orange,
        secondary: pink,
        background: {
          default: "#935737",
          paper: "#774517",
          macos: "#fff",
        },
        text: {
          primary: "#fff",
          secondary: "#000",
        },
      },
    },
    dark: {
      palette: {
        primary: orange,
        secondary: pink,
        background: {
          default: "#000000",
          paper: "#2a2a2a",
          macos: "#302f2f",
        },
        text: {
          primary: "#fff",
          secondary: "#fff",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "body, #root": {
            transition: "background-color 0.4s ease, color 0.4s ease",
          },
        }}
      />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/verafin" element={<Verafin />} />
          <Route path="/eyeport" element={<EyePort />} />
          <Route path="/web" element={<Web />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>,
);
