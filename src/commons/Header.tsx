import { useState } from "react";
import styled from "@emotion/styled";
import logo from "../assets/logo.png";
import { AppBar, Chip, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import LightMode from "@mui/icons-material/LightMode";
import Person from "@mui/icons-material/Person";
import VolunteerActivism from "@mui/icons-material/VolunteerActivism";
import Description from "@mui/icons-material/Description";

import StyledMacDialog from "./MacDialog";
import {
  openResumeInNewTab,
  openDonatePageInNewTab,
  openMainWebsite,
} from "./Utils";

function Header() {
  const [openOpenMacDialog, setOpenMacDialog] = useState(false);

  function handleNotImplementedClick() {
    setOpenMacDialog(true);
  }

  return (
    <>
      <StyledMacDialog
        heading="Not Implemented"
        description="This feature is still under development. You can view the completed website on akashcraft.ca."
        visible={openOpenMacDialog}
        onClose={() => setOpenMacDialog(false)}
      />
      <StyledAppBar position="fixed">
        <Toolbar variant="dense" disableGutters>
          <StyledImg src={logo} />
          <StyledH2 onClick={openMainWebsite}>AkashCraft</StyledH2>
          <Box sx={{ flexGrow: 1 }} />
          <StyledFlex>
            <StyledChip
              icon={<LightMode sx={ChipIconStyle} />}
              label="Light"
              onClick={handleNotImplementedClick}
            />
            <StyledChip
              icon={<VolunteerActivism sx={ChipIconStyle} />}
              label="Donate"
              onClick={openDonatePageInNewTab}
            />
            <StyledChip
              icon={<Person sx={ChipIconStyle} />}
              label="Login"
              onClick={handleNotImplementedClick}
            />
            <StyledChip
              icon={<Description sx={ChipIconStyle} />}
              label="Resume"
              onClick={openResumeInNewTab}
            />
          </StyledFlex>
        </Toolbar>
      </StyledAppBar>
    </>
  );
}

const StyledAppBar = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
  backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
`;

const StyledH2 = styled.h2`
  margin: 0;
  font-size: 1.55rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
const StyledImg = styled.img`
  width: 30px;
  height: 31.2px;
  margin: 0 0.6rem;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-right: 0.6rem;
`;

const StyledChip = styled(Chip)({
  color: "white",
  fontFamily: "Trebuchet",
  fontSize: "1.2rem",
});

const ChipIconStyle = { color: "white !important" };

export default Header;
