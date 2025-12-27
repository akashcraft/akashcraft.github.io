import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, pink } from "@mui/material/colors";
import { GlobalStyles, CssBaseline } from "@mui/material";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Education from "./akash-education/Education.tsx";
import Networking from "./akash-others/Networking.tsx";
import Verafin from "./akash-work/Verafin.tsx";
import EyePort from "./akash-work/EyePort.tsx";
import QuestPlunge from "./akash-game/QuestPlunge.tsx";
import Web from "./akash-web/Web.tsx";
import App from "./akash-app/App.tsx";
import ScrollToTop from "./akash-commons/ScrollToTop.tsx";
import { NotFound } from "./NotFound.tsx";
import Mahjong from "./akash-web/Mahjong.tsx";
import Airport from "./akash-web/Airport.tsx";
import Contact from "./akash-main/Contact.tsx";
import ContactLegacy from "./akash-main/ContactLegacy.tsx";
import Login from "./akash-login/Login.tsx";
import { Account } from "./akash-login/Account.tsx";

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
          default: "#9d532f",
          normal: "#fff",
          paper: "#7f4203",
          macos: "#fff",
          macosfinder: "#fff",
          macosfinder2: "#f3f3f3",
          light: "#693d14",
          light2: "#693d14aa",
        },
        text: {
          primary: "#fff",
          secondary: "#000",
          light: "#aaa",
          dark: "#dddddd",
        },
      },
    },
    dark: {
      palette: {
        primary: orange,
        secondary: pink,
        background: {
          default: "#000000",
          normal: "#000",
          paper: "#2a2a2a",
          macos: "#302f2f",
          macosfinder: "#1e1e1e",
          macosfinder2: "#1b1b1b",
          light: "#434343ff",
          light2: "#43434388",
        },
        text: {
          primary: "#fff",
          secondary: "#fff",
          light: "#333",
          dark: "#494949",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme} defaultMode="light">
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
          <Route path="/verafin/:id" element={<Verafin />} />
          <Route path="/eyeport" element={<EyePort />} />
          <Route path="/web" element={<Web />} />
          <Route path="/app" element={<App />} />
          <Route path="/mahjong" element={<Mahjong />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-legacy" element={<ContactLegacy />} />
          <Route path="/airport/yyt" element={<Airport />} />
          <Route path="/questplunge" element={<QuestPlunge />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/:page" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>,
);
