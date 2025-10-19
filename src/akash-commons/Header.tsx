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
  Breadcrumbs,
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
import MacDialog from "./MacDialog";

import { openDonatePageInNewTab, openResumeInNewTab } from "./Utils";
import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const headerContainer = document.createElement("div");

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
  const navigate = useNavigate();

  // Breadcrumbs
  const path = (() => {
    let p = window.location.hash.replace(/^#!?/, "");
    if (!p) return "/";
    if (!p.startsWith("/")) p = "/" + p;
    const match = p.match(/^[^?#]*/);
    return match ? match[0] : "/";
  })();
  const breadcrumbLabel = (() => {
    if (path === "/") return "";
    if (
      [
        "/eyeport",
        "/verafin",
        "/education",
        "/networking",
        "/app",
        "/web",
      ].includes(path)
    ) {
      return path.charAt(1).toUpperCase() + path.slice(2);
    } else {
      return "Not Found";
    }
  })();

  return (
    <>
      <MacDialog
        heading="Not Implemented"
        description="This feature is still under development. You can view the completed website on akashcraft.ca."
        visible={openOpenMacDialog}
        onClose={() => setOpenMacDialog(false)}
      />
      <StyledAppBar
        position="fixed"
        sx={{
          backgroundColor: phone
            ? "rgba(0, 0, 0, 0.2) !important"
            : "color-mix(in srgb, var(--mui-palette-background-paper) 95%, transparent)",
        }}
      >
        <Toolbar variant="dense" disableGutters>
          <Stack direction="row" gap={1} alignItems="center">
            <StyledImg
              onClick={() => {
                navigate("/");
              }}
              src={logo}
            />
            <StyledH2
              onClick={() => {
                navigate("/");
              }}
            >
              AkashCraft
            </StyledH2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.05, 0.8, 0.35, 0.99],
              }}
            >
              <Breadcrumbs sx={{ marginTop: "0.45rem" }}>
                <StyledLink to="/">{breadcrumbLabel}</StyledLink>
              </Breadcrumbs>
            </motion.div>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          {phone ? (
            <Stack
              direction="row"
              spacing={"0.5rem"}
              sx={{ marginRight: "0.6rem" }}
            >
              <StyledChip label="Resume" onClick={openResumeInNewTab} />
              <IconChip
                icon={<VolunteerActivism sx={ChipIconStyle} />}
                onClick={openDonatePageInNewTab}
              />
              <IconChip
                icon={<Person sx={ChipIconStyle} />}
                onClick={handleNotImplementedClick}
              />
              <div>
                <IconChip
                  icon={
                    themeMode === "Light" ? (
                      <LightMode sx={ChipIconStyle} />
                    ) : themeMode === "Dark" ? (
                      <DarkMode sx={ChipIconStyle} />
                    ) : (
                      <Computer sx={ChipIconStyle} />
                    )
                  }
                  onClick={handleClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{
                    marginTop: "0.6rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  <MenuItem onClick={setLightMode}>Light</MenuItem>
                  <MenuItem onClick={setDarkMode}>Dark</MenuItem>
                  <MenuItem onClick={setSystemMode}>System</MenuItem>
                </Menu>
              </div>
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
                      icon={<Person sx={ChipIconStyle} />}
                      label="Login"
                      onClick={handleNotImplementedClick}
                    />
                    <StyledChipDrawer
                      icon={<VolunteerActivism sx={ChipIconStyle} />}
                      label="Donate"
                      onClick={openDonatePageInNewTab}
                    />
                    <StyledChipDrawer
                      icon={<Description sx={ChipIconStyle} />}
                      label="Resume"
                      onClick={openResumeInNewTab}
                    />
                    <div
                      style={{ marginLeft: "0.5rem" }}
                      ref={(el) => {
                        if (el) el.appendChild(headerContainer);
                      }}
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
  top: 0.75rem;
  width: calc(100dvw - 1rem);
  left: 0.5rem;
  border-radius: 1.5rem;
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
  margin-left: 0.6rem;
`;

const StyledChip = styled(Chip)({
  color: "white",
  fontSize: "1.2rem",
});

const IconChip = styled(Chip)({
  color: "white",
  fontSize: "1.2rem",
  width: "2rem",
  ".MuiChip-label": {
    display: "none",
  },
  ".MuiChip-icon": {
    margin: 0,
  },
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

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

const ChipIconStyle = { color: "white !important" };

export default Header;
