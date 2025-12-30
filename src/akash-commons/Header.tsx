import { useContext, useMemo, useState } from "react";
import coin0 from "../assets/img-account/coin0.png";
import coin1 from "../assets/img-account/coin1.png";
import dice0 from "../assets/img-account/dice1.png";
import dice1 from "../assets/img-account/dice2.png";
import dice2 from "../assets/img-account/dice3.png";
import dice3 from "../assets/img-account/dice4.png";
import dice4 from "../assets/img-account/dice5.png";
import dice5 from "../assets/img-account/dice6.png";
import coinSound from "../assets/img-account/coin.mp3";
import diceSound from "../assets/img-account/dice.mp3";

import "../styles/Image.css";

import {
  AppBar,
  Chip,
  Menu,
  MenuItem,
  Toolbar,
  useColorScheme,
  Box,
  styled,
  Drawer,
  Stack,
  Breadcrumbs,
  Skeleton,
  Tooltip,
  tooltipClasses,
  type TooltipProps,
  IconButton,
  Modal,
} from "@mui/material";

import {
  LightMode,
  DarkMode,
  Computer,
  VolunteerActivism,
  Description,
  Menu as MenuIcon,
  Explore,
  Mail,
  ArrowDropDown,
  ExitToApp,
  AccountCircle,
  CasinoOutlined,
  TollOutlined,
  ReplayOutlined,
} from "@mui/icons-material";

import useMediaQuery from "@mui/material/useMediaQuery";

import { openDonatePageInNewTab, openResumeInNewTab } from "./Utils";
import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";
import { useGetImages } from "./Hooks";
import { headerImages } from "./headerData";
import { auth } from "./firebaseHooks";
import { AccountContext } from "../akash-login/AccountContext";
import { PopupButton, StyledPopupBox } from "../akash-login/Settings";

// eslint-disable-next-line react-refresh/only-export-components
export const headerContainer = document.createElement("div");

const dice = [dice0, dice1, dice2, dice3, dice4, dice5];
const coin = [coin0, coin1];

// Zero inclusive, Max exclusive
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function Header() {
  // Theme Menu
  const { setMode } = useColorScheme();
  const [themeMode, setThemeMode] = useState<string>(() => {
    const stored = localStorage.getItem("mui-mode");
    return stored ? stored.charAt(0).toUpperCase() + stored.slice(1) : "Light";
  });

  const [gameOpen, setGameOpen] = useState<boolean>(false);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [isCoinSound, setIsCoinSound] = useState<boolean>(false);
  const [isDiceSound, setIsDiceSound] = useState<boolean>(false);

  const { accountState } = useContext(AccountContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

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
  const isPhone = useMediaQuery("(max-width:800px)");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Breadcrumbs
  const breadcrumbLabel = useMemo(() => {
    let p = window.location.hash.replace(/^#!?/, "");
    const path = (() => {
      if (!p) return "/";
      if (!p.startsWith("/")) p = "/" + p;
      const match = p.match(/^[^?#]*/);
      return match ? match[0] : "/";
    })();

    if (path === "/") return "";
    if (path.includes("/account/")) {
      return "Account";
    } else if (path.includes("/verafin/")) {
      return "Verafin";
    }
    if (
      [
        "/eyeport",
        "/education",
        "/networking",
        "/app",
        "/web",
        "/mahjong",
        "/airport/yyt",
        "/questplunge",
        "/login",
      ].includes(path)
    ) {
      if (path === "/eyeport") {
        return "EyePort";
      } else if (path === "/questplunge") {
        return "Quest Plunge";
      } else if (path === "/mahjong") {
        return "Mahjong";
      } else if (path === "/airport/yyt") {
        return "Live Schedules";
      }
      return path.charAt(1).toUpperCase() + path.slice(2);
    } else {
      return "Not Found";
    }
  }, []);

  // Get Images
  const isLoading = useGetImages(headerImages);

  const handleHomeClick = () => {
    const p = window.location.hash.replace(/^#!?/, "");
    if (["/mahjong", "/airport/yyt"].includes(p)) {
      navigate("/web");
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      sessionStorage.removeItem("account-name");
      sessionStorage.removeItem("account-photo");
      sessionStorage.removeItem("account-game");
    } catch (error) {
      console.error(error);
    }
  };

  function scrolldownToSection(arg0: string) {
    if (arg0 === "education") {
      navigate("/education");
      return;
    } else if (arg0 === "networking") {
      navigate("/networking");
      return;
    } else if (!["", "#/"].includes(window.location.hash)) {
      navigate("/");
      setTimeout(() => {
        scrolldownToSection(arg0);
      }, 100);
      return;
    }
    const section = document.getElementById(arg0);
    if (!section) return;
    const yOffset = -90;
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    handleClose2();
  }

  return (
    <Box className="Header">
      {isCoinSound && <audio autoPlay src={coinSound} />}
      {isDiceSound && <audio autoPlay src={diceSound} />}
      <StyledAppBar
        position="fixed"
        sx={{
          backgroundColor: !isPhone
            ? "rgba(0, 0, 0, 0.2) !important"
            : "color-mix(in srgb, var(--mui-palette-background-paper) 95%, transparent)",
        }}
      >
        <Toolbar variant="dense" disableGutters>
          <Stack direction="row" gap={1} alignItems="center">
            {isLoading ? (
              <Skeleton
                variant="rounded"
                sx={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "1rem",
                  marginLeft: "0.6rem",
                }}
              />
            ) : (
              <StyledImg onClick={handleHomeClick} src={headerImages[0]} />
            )}

            <StyledTooltip
              title="Navigate Back"
              placement="bottom"
              enterDelay={1500}
            >
              <StyledH2 onClick={handleHomeClick}>AkashCraft</StyledH2>
            </StyledTooltip>
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
          <Modal
            open={gameOpen}
            onClose={() => {
              setGameOpen(false);
            }}
          >
            <StyledPopupBox
              sx={{
                fontFamily: "Segoe UI",
                backgroundColor:
                  accountState.userDetails?.accentColour ?? "grey",
                bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "grey"}, black 20%)`,
              }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                gap={1}
                mt={4}
                mb={2}
              >
                <motion.div
                  key={`${gameOpen}-${randomNumber}`}
                  initial={
                    sessionStorage.getItem("account-game") === "Dice"
                      ? { y: -50, opacity: 0, rotate: -45 }
                      : { rotateY: 0 }
                  }
                  animate={
                    sessionStorage.getItem("account-game") === "Dice"
                      ? {
                          y: 0,
                          opacity: 1,
                          rotate: 0,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                          },
                        }
                      : {
                          rotateY: 360,
                          transition: {
                            duration: 0.6,
                            ease: "easeInOut",
                          },
                        }
                  }
                  style={{ perspective: 1000 }}
                >
                  <img
                    style={{
                      width: "8rem",
                      height: "8rem",
                    }}
                    src={
                      sessionStorage.getItem("account-game") == "Dice"
                        ? dice[randomNumber]
                        : coin[randomNumber]
                    }
                  />
                </motion.div>
                <p style={{ margin: "1.5rem 0 0 0" }}>
                  {sessionStorage.getItem("account-game") == "Dice"
                    ? "The dice landed on " + (randomNumber + 1)
                    : "The coin landed on " +
                      (randomNumber === 0 ? "Heads" : "Tails")}
                </p>
                <Stack width="100%" gap={1} alignItems="center" mt={2}>
                  <PopupButton
                    startIcon={
                      <ReplayOutlined
                        sx={{ scale: 1.2, position: "relative", top: "0.1rem" }}
                      />
                    }
                    sx={{
                      backgroundColor:
                        accountState.userDetails?.accentColour ?? "unset",
                      bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 30%)`,
                      "&:hover": {
                        backgroundColor:
                          accountState.userDetails?.accentColour ?? "unset",
                      },
                      color: "var(--mui-palette-text-primary)",
                    }}
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      if (sessionStorage.getItem("account-game") == "Dice") {
                        setRandomNumber(getRandomInt(6));
                        setIsDiceSound(true);
                        setTimeout(() => {
                          setIsDiceSound(false);
                        }, 1000);
                      } else {
                        setRandomNumber(getRandomInt(2));
                        setIsCoinSound(true);
                        setTimeout(() => {
                          setIsCoinSound(false);
                        }, 1000);
                      }
                    }}
                  >
                    {sessionStorage.getItem("account-game") == "Dice"
                      ? "Roll Again"
                      : "Flip Again"}
                  </PopupButton>
                  <PopupButton
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          accountState.userDetails?.accentColour ?? "unset",
                      },
                      color: "var(--mui-palette-text-primary)",
                    }}
                    variant="text"
                    disableElevation
                    onClick={() => {
                      setGameOpen(false);
                    }}
                  >
                    Done
                  </PopupButton>
                </Stack>
              </Stack>
            </StyledPopupBox>
          </Modal>
          {!isPhone ? (
            <Stack
              direction="row"
              spacing={"0.5rem"}
              sx={{ marginRight: "0.6rem" }}
            >
              {breadcrumbLabel === "Account" && (
                <>
                  {sessionStorage.getItem("account-game") == "Dice" ? (
                    <StyledTooltip title="Dice" placement="bottom">
                      <IconChip
                        icon={<CasinoOutlined sx={ChipIconStyle} />}
                        onClick={() => {
                          setRandomNumber(getRandomInt(6));
                          setIsDiceSound(true);
                          setTimeout(() => {
                            setIsDiceSound(false);
                          }, 1000);
                          setGameOpen(true);
                        }}
                      />
                    </StyledTooltip>
                  ) : (
                    <StyledTooltip title="Coin" placement="bottom">
                      <IconChip
                        icon={<TollOutlined sx={ChipIconStyle} />}
                        onClick={() => {
                          setRandomNumber(getRandomInt(2));
                          setIsCoinSound(true);
                          setTimeout(() => {
                            setIsCoinSound(false);
                          }, 1000);
                          setGameOpen(true);
                        }}
                      />
                    </StyledTooltip>
                  )}
                </>
              )}
              <div>
                <StyledChip
                  icon={<Explore sx={ChipIconWithTextStyle} />}
                  label="Explore"
                  id="explore-chip"
                  onClick={handleClick2}
                  onDelete={() => {
                    document.getElementById("explore-chip")?.click();
                  }}
                  deleteIcon={<ArrowDropDown sx={ChipIconWithTextStyle} />}
                />
                <Menu
                  slotProps={{
                    paper: {
                      sx: {
                        "--mui-palette-background-paper":
                          accountState.userDetails?.accentColour ?? "unset",
                        bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 50%)`,
                      },
                    },
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      borderRadius: "0.75rem",
                    },
                    marginTop: "0.6rem",
                  }}
                  MenuListProps={{
                    disablePadding: true,
                  }}
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleClose2}
                >
                  <MenuItem
                    sx={{ fontSize: "0.9rem" }}
                    onClick={() => {
                      scrolldownToSection("projects");
                    }}
                  >
                    Projects
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "0.9rem" }}
                    onClick={() => {
                      scrolldownToSection("work experience");
                    }}
                  >
                    Work Experience
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "0.9rem" }}
                    onClick={() => {
                      scrolldownToSection("education");
                    }}
                  >
                    Education
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "0.9rem" }}
                    onClick={() => {
                      scrolldownToSection("youtube");
                    }}
                  >
                    YouTube
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "0.9rem" }}
                    onClick={() => {
                      scrolldownToSection("networking");
                    }}
                  >
                    Networking
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "0.9rem" }}
                    onClick={() => {
                      if (!["", "#/"].includes(window.location.hash)) {
                        sessionStorage.setItem("homeScroll", "0");
                        navigate("/");
                        setTimeout(() => {
                          document.getElementById("macos-finder")?.click();
                          handleClose2();
                        }, 100);
                        return;
                      }
                      document.getElementById("macos-finder")?.click();
                      handleClose2();
                    }}
                  >
                    macOS
                  </MenuItem>
                </Menu>
              </div>
              <StyledChip
                icon={<Mail sx={ChipIconWithTextStyle} />}
                label="Contact"
                onClick={() => {
                  navigate("/contact");
                }}
              />
              <StyledChip
                icon={<Description sx={ChipIconWithTextStyle} />}
                label="Resume"
                onClick={openResumeInNewTab}
              />
              <StyledChip
                sx={{
                  backgroundColor: "#f50057",
                  "&:hover": { backgroundColor: "#cb0f61", transition: "0.3s" },
                }}
                color={breadcrumbLabel !== "Account" ? "secondary" : "default"}
                icon={
                  breadcrumbLabel === "Account" ? (
                    <ExitToApp sx={ChipIconWithTextStyle} />
                  ) : sessionStorage.getItem("account-photo") ? (
                    <img
                      src={sessionStorage.getItem("account-photo") || ""}
                      alt="Profile"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <AccountCircle sx={ChipIconWithTextStyle} />
                  )
                }
                label={
                  breadcrumbLabel === "Account"
                    ? "Exit"
                    : (sessionStorage.getItem("account-name")?.split(" ")[0] ??
                      "Login")
                }
                onClick={() => {
                  if (breadcrumbLabel === "Account") {
                    handleLogout();
                  }
                  navigate("/login");
                }}
              />
              <StyledTooltip title="Donate" placement="bottom">
                <IconChip
                  icon={<VolunteerActivism sx={ChipIconStyle} />}
                  onClick={openDonatePageInNewTab}
                />
              </StyledTooltip>
              <div>
                <StyledTooltip title="Theme" placement="bottom">
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
                </StyledTooltip>
                <Menu
                  slotProps={{
                    paper: {
                      sx: {
                        "--mui-palette-background-paper":
                          accountState.userDetails?.accentColour ?? "unset",
                        bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 50%)`,
                      },
                    },
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      borderRadius: "0.75rem",
                    },
                    marginTop: "0.6rem",
                    marginLeft: "0.25rem",
                  }}
                  MenuListProps={{
                    disablePadding: true,
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem sx={{ fontSize: "0.9rem" }} onClick={setLightMode}>
                    Light
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "0.9rem" }} onClick={setDarkMode}>
                    Dark
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "0.9rem" }} onClick={setSystemMode}>
                    System
                  </MenuItem>
                </Menu>
              </div>
            </Stack>
          ) : (
            <>
              <IconButton size="large" onClick={() => setDrawerOpen(true)}>
                <MenuIcon sx={ChipIconStyle} />
              </IconButton>
              <Drawer
                sx={{ zIndex: 2001 }}
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                slotProps={{
                  paper: {
                    sx: {
                      "--mui-palette-background-paper":
                        accountState.userDetails?.accentColour ?? "unset",
                      bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 50%)`,
                    },
                  },
                }}
              >
                <StyledBox onClick={() => setDrawerOpen(false)}>
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    spacing={"0rem"}
                    sx={{
                      marginTop: "2rem",
                    }}
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
                      icon={
                        breadcrumbLabel === "Account" ? (
                          <ExitToApp sx={ChipIconStyle} />
                        ) : sessionStorage.getItem("account-photo") ? (
                          <img
                            src={sessionStorage.getItem("account-photo") || ""}
                            alt="Profile"
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              objectFit: "cover",
                              position: "relative",
                              bottom: "0.025rem",
                              left: "-0.1rem",
                            }}
                          />
                        ) : (
                          <AccountCircle sx={ChipIconStyle} />
                        )
                      }
                      label={
                        breadcrumbLabel == "Account"
                          ? "Exit"
                          : (sessionStorage
                              .getItem("account-name")
                              ?.split(" ")[0] ?? "Login")
                      }
                      onClick={() => {
                        if (breadcrumbLabel === "Account") {
                          handleLogout();
                        }
                        navigate("/login");
                      }}
                    />
                    <StyledChipDrawer
                      icon={<Description sx={ChipIconStyle} />}
                      label="Resume"
                      onClick={openResumeInNewTab}
                    />
                    <StyledChipDrawer
                      icon={<Mail sx={ChipIconStyle} />}
                      label="Contact"
                      onClick={() => {
                        navigate("/contact");
                      }}
                    />
                    {breadcrumbLabel === "Account" && (
                      <>
                        {sessionStorage.getItem("account-game") == "Dice" ? (
                          <StyledChipDrawer
                            icon={<CasinoOutlined sx={ChipIconStyle} />}
                            label="Dice"
                            onClick={() => {
                              setRandomNumber(getRandomInt(6));
                              setIsDiceSound(true);
                              setTimeout(() => {
                                setIsDiceSound(false);
                              }, 1000);
                              setGameOpen(true);
                            }}
                          />
                        ) : (
                          <StyledChipDrawer
                            icon={<TollOutlined sx={ChipIconStyle} />}
                            label="Coin"
                            onClick={() => {
                              setRandomNumber(getRandomInt(2));
                              setIsCoinSound(true);
                              setTimeout(() => {
                                setIsCoinSound(false);
                              }, 1000);
                              setGameOpen(true);
                            }}
                          />
                        )}
                      </>
                    )}
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
    </Box>
  );
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--mui-palette-background-main)",
    borderRadius: "1rem",
    fontSize: "0.85rem",
  },
}));

const StyledAppBar = styled(AppBar)`
  top: 0.75rem;
  width: calc(100dvw - 1rem);
  left: 0.5rem;
  border-radius: 1.5rem;
  z-index: 2000;
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
  fontSize: "1.2rem",
  backgroundColor: "transparent",
  width: "100%",
  height: "4rem",
  paddingLeft: "1rem",
  justifyContent: "flex-start",
  gap: "0.25rem",
  borderRadius: "0",
});

const StyledBox = styled(Box)({
  width: "12rem",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

const ChipIconStyle = { color: "white !important", fontSize: "1.25rem" };

const ChipIconWithTextStyle = {
  color: "white !important",
  fontSize: "1.25rem",
};

export default Header;
