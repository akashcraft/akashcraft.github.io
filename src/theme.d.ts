import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    macos?: string;
    light?: string;
  }

  interface TypeText {
    muted?: string;
    light?: string;
  }
}
