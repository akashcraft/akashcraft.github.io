import styled from "@emotion/styled";
import { Chip } from "@mui/material";
import { CopyrightOutlined } from "@mui/icons-material";

function Footer() {
  function dateYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  return (
    <StyledChip
      variant="filled"
      icon={<CopyrightOutlined sx={{ color: "white !important" }} />}
      label={`Copyright ${dateYear()} AkashCraft`}
    />
  );
}

const StyledChip = styled(Chip)({
  zIndex: 1000,
  color: "white",
  justifyContent: "center",
  position: "fixed",
  bottom: "1rem",
  left: "50%",
  transform: "translateX(-50%)",
  borderRadius: "1.5rem",
  fontSize: "1rem",
  backgroundColor:
    "color-mix(in srgb, var(--mui-palette-background-paper) 80%, transparent)",
  backdropFilter: "blur(1px) saturate(1.1) url('#glassfilter')",
});

export default Footer;
