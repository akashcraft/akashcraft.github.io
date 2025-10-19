import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    macos?: string;
    flush?: string;
  }

  interface TypeText {
    muted?: string;
    light?: string;
  }
}
