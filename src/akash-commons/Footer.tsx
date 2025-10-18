import styled from "@emotion/styled";
import { Chip, Stack } from "@mui/material";
import { CopyrightOutlined } from "@mui/icons-material";

function Footer() {
  function dateYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ marginBottom: "2rem" }}
    >
      <StyledChip
        variant="filled"
        icon={<CopyrightOutlined sx={{ color: "white !important" }} />}
        label={`Copyright ${dateYear()} AkashCraft`}
      />
    </Stack>
  );
}

const StyledChip = styled(Chip)({
  color: "white",
  justifyContent: "center",
  borderRadius: "1.5rem",
  fontSize: "1rem",
  backgroundColor:
    "color-mix(in srgb, var(--mui-palette-background-paper) 80%, transparent)",
  backdropFilter: "blur(1px) saturate(1.1) url('#glassfilter')",
});

export default Footer;
