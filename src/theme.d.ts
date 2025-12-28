import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    normal?: string;
    macos?: string;
    macosfinder?: string;
    macosfinder2?: string;
    light?: string;
    light2?: string;
    button?: string;
    buttondark?: string;
  }

  interface TypeText {
    muted?: string;
    light?: string;
    light2?: string;
    dark?: string;
  }
}
