import { useState } from "react";
import logo from "../assets/logo.png";

import {
  AppBar,
  Chip,
  Menu,
  MenuItem,
  Toolbar,
  useColorScheme,
  IconButton,
  Box,
  styled,
  Drawer,
  Stack,
} from "@mui/material";

import {
  LightMode,
  DarkMode,
  Computer,
  Person,
  VolunteerActivism,
  Description,
  Menu as MenuIcon,
} from "@mui/icons-material";

import useMediaQuery from "@mui/material/useMediaQuery";
import StyledMacDialog from "./MacDialog";

import {
  openDonatePageInNewTab,
  openMainWebsite,
  openResumeInNewTab,
} from "./Utils";

function Header() {
  // Theme Menu
  const [openOpenMacDialog, setOpenMacDialog] = useState<boolean>(false);
  const { setMode } = useColorScheme();
  const [themeMode, setThemeMode] = useState<string>(() => {
    const stored = localStorage.getItem("mui-mode");
    return stored ? stored.charAt(0).toUpperCase() + stored.slice(1) : "Light";
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleNotImplementedClick() {
    setOpenMacDialog(true);
  }

  function setLightMode() {
    setMode("light");
    setThemeMode("Light");
    handleClose();
  }

  function setDarkMode() {
    setMode("dark");
    setThemeMode("Dark");
    handleClose();
  }

  function setSystemMode() {
    setMode("system");
    setThemeMode("System");
    handleClose();
  }

  function toggleThemeMode() {
    if (themeMode === "Light") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }

  // Media Query
  const phone = useMediaQuery("(min-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
          {phone ? (
            <Stack
              direction="row"
              spacing={"0.25rem"}
              sx={{ marginRight: "0.6rem" }}
            >
              <div>
                <StyledChip
                  icon={
                    themeMode === "Light" ? (
                      <LightMode sx={ChipIconStyle} />
                    ) : themeMode === "Dark" ? (
                      <DarkMode sx={ChipIconStyle} />
                    ) : (
                      <Computer sx={ChipIconStyle} />
                    )
                  }
                  label={themeMode}
                  onClick={handleClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{ marginTop: "0.5rem", marginLeft: "0.25rem" }}
                >
                  <MenuItem onClick={setLightMode}>Light</MenuItem>
                  <MenuItem onClick={setDarkMode}>Dark</MenuItem>
                  <MenuItem onClick={setSystemMode}>System</MenuItem>
                </Menu>
              </div>
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
            </Stack>
          ) : (
            <>
              <IconButton size="large" onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={ChipIconStyle} />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <StyledBox onClick={() => setDrawerOpen(false)}>
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    spacing={"0rem"}
                    sx={{ marginTop: "3rem" }}
                  >
                    <StyledChipDrawer
                      icon={
                        themeMode === "Dark" ? (
                          <LightMode sx={ChipIconStyle} />
                        ) : (
                          <DarkMode sx={ChipIconStyle} />
                        )
                      }
                      label={themeMode === "Dark" ? "Light" : "Dark"}
                      onClick={toggleThemeMode}
                    />
                    <StyledChipDrawer
                      icon={<VolunteerActivism sx={ChipIconStyle} />}
                      label="Donate"
                      onClick={openDonatePageInNewTab}
                    />
                    <StyledChipDrawer
                      icon={<Person sx={ChipIconStyle} />}
                      label="Login"
                      onClick={handleNotImplementedClick}
                    />
                    <StyledChipDrawer
                      icon={<Description sx={ChipIconStyle} />}
                      label="Resume"
                      onClick={openResumeInNewTab}
                    />
                  </Stack>
                </StyledBox>
              </Drawer>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
    </>
  );
}

const StyledAppBar = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.2) !important;
  -webkit-backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
  backdrop-filter: blur(1px) saturate(1.1) url("#glassfilter");
`;

const StyledH2 = styled("h2")`
  margin: 0;
  font-size: 1.55rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
const StyledImg = styled("img")`
  width: 30px;
  height: 30px;
  margin: 0 0.6rem;
`;

const StyledChip = styled(Chip)({
  color: "white",
  fontSize: "1.2rem",
  backgroundColor: "transparent",
});

const StyledChipDrawer = styled(Chip)({
  color: "white",
  fontSize: "1.25rem",
  backgroundColor: "transparent",
  width: "100%",
  height: "4rem",
  paddingLeft: "1rem",
  justifyContent: "flex-start",
  borderRadius: "0",
});

const StyledBox = styled(Box)({
  width: "12rem",
});

const ChipIconStyle = { color: "white !important" };

export default Header;
