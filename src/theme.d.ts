import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    macos?: string;
  }

  interface TypeText {
    muted?: string;
  }
}
