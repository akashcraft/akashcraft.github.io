import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, pink } from "@mui/material/colors";
import { GlobalStyles, CssBaseline } from "@mui/material";

const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: ".theme-%s",
  },
  typography: { fontFamily: "Trebuchet" },
  colorSchemes: {
    light: {
      palette: {
        primary: orange,
        secondary: pink,
        background: {
          default: "#935737",
          paper: "#935737",
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
          paper: "#000000",
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
      <App />
    </ThemeProvider>
  </StrictMode>,
);
