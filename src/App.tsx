import Home from "./Home.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, pink } from "@mui/material/colors";
import { GlobalStyles, CssBaseline } from "@mui/material";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Education from "./akash-education/Education.tsx";
import Networking from "./akash-others/Networking.tsx";
import Verafin from "./akash-work/Verafin.tsx";
import EyePort from "./akash-work/EyePort.tsx";
import QuestPlunge from "./akash-game/QuestPlunge.tsx";
import Web from "./akash-web/Web.tsx";
import ScrollToTop from "./akash-commons/ScrollToTop.tsx";
import { NotFound } from "./NotFound.tsx";
import Mahjong from "./akash-web/Mahjong.tsx";
import Airport from "./akash-web/Airport.tsx";
import Contact from "./akash-main/Contact.tsx";
import ContactLegacy from "./akash-main/ContactLegacy.tsx";
import Login from "./akash-login/Login.tsx";
import { Account } from "./akash-login/Account.tsx";
import { useEffect, useState } from "react";
import { auth } from "./akash-commons/firebaseHooks.tsx";
import type { User } from "firebase/auth";
import { Application } from "./akash-app/Application.tsx";

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
          button: "#99581c",
          buttondark: "#804a17ff",
        },
        text: {
          primary: "#fff",
          secondary: "#000",
          light: "#aaa",
          light2: "#999",
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
          button: "#5c5c5c",
          buttondark: "#4a4a4aff",
        },
        text: {
          primary: "#fff",
          secondary: "#fff",
          light: "#333",
          light2: "#494949",
          dark: "#494949",
        },
      },
    },
  },
});

export function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const providers = currentUser.providerData.map((p) => p.providerId);

        const isGitHub = providers.includes("github.com");
        const isGoogle = providers.includes("google.com");

        if (currentUser.emailVerified || isGitHub || isGoogle) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
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
          <Route path="/app" element={<Application />} />
          <Route path="/mahjong" element={<Mahjong />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-legacy" element={<ContactLegacy />} />
          <Route path="/airport/yyt" element={<Airport />} />
          <Route path="/questplunge" element={<QuestPlunge />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/account/home" /> : <Login />}
          />
          <Route path="/account/:page" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
