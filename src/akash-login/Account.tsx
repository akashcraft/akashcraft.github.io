import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  styled,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import HolderBox from "../akash-commons/HolderBox";
import {
  AccountCircleOutlined,
  CampaignOutlined,
  CalendarMonthOutlined,
  CoPresentOutlined,
  HomeOutlined,
  LinkOutlined,
  SettingsOutlined,
  AdminPanelSettingsOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import AccountHeaderBox, { StyledHeaderPaper } from "./AccountHeaderBox";
import ClassSchedule from "./ClassSchedule";
import ExamSchedule from "./ExamSchedule";
import {
  ContactWavesDark,
  ContactWavesLight,
} from "../akash-main/ContactWaves";
import Settings from "./Settings";
import { motion } from "framer-motion";
import { Links } from "./Links";
import Admin from "./Admin";
import { Exam } from "./Exam";
import { Class } from "./Class";
import {
  AccountContext,
  reducerAccount,
  type AccountState,
} from "./AccountContext";
import { useEffect, useReducer } from "react";
import { auth, db } from "../akash-commons/firebaseHooks";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { BlobDark, BlobLight } from "../akash-svg/Blob";
import { GradientDark, GradientLight } from "../akash-svg/Gradient";
import { PeaksLight } from "../akash-svg/Peaks";
import { RingsDark, RingsLight } from "../akash-svg/Rings";
import { ScatterDark, ScatterLight } from "../akash-svg/Scatter";
import { StepsDark, StepsLight } from "../akash-svg/Steps";

const adminUID = "NBH76id0H9gunlBAxynGWjsSomP2";

function getColours(colourName: string): string[] {
  const colours: Record<string, string[]> = {
    Red: ["#ff8080", "#ff4d4d", "#cc0000", "#990000"],
    Orange: ["#d9a38c", "#b27e64", "#864f33", "#6c402a"],
    Yellow: ["#f4d03f", "#f1c40f", "#d4ac0d", "#9a7d0a"],
    Green: ["#58d68d", "#27ae60", "#1e8449", "#145a32"],
    Blue: ["#5dade2", "#2980b9", "#21618c", "#1a5276"],
    Indigo: ["#7986cb", "#3f51b5", "#303f9f", "#1a237e"],
    Purple: ["#af7ac5", "#8e44ad", "#713d84", "#4a235a"],
    Grey: ["#bdc3c7", "#7f8c8d", "#34495e", "#2c3e50"],
  };

  return colours[colourName] || colours["Grey"];
}

function getLightBackground(wallpaper?: string, accentColour?: string) {
  switch (wallpaper) {
    case "Blob":
      return <BlobLight colours={getColours(accentColour ?? "Grey")} />;
    case "Waves":
      return <ContactWavesLight colours={getColours(accentColour ?? "Grey")} />;
    case "Gradient":
      return <GradientLight colours={getColours(accentColour ?? "Grey")} />;
    case "Peaks":
      return <PeaksLight colours={getColours(accentColour ?? "Grey")} />;
    case "Rings":
      return <RingsLight colours={getColours(accentColour ?? "Grey")} />;
    case "Scatter":
      return <ScatterLight colours={getColours(accentColour ?? "Grey")} />;
    case "Steps":
      return <StepsLight colours={getColours(accentColour ?? "Grey")} />;
    default:
      return null;
  }
}

function getDarkBackground(wallpaper?: string) {
  switch (wallpaper) {
    case "Blob":
      return <BlobDark />;
    case "Waves":
      return <ContactWavesDark />;
    case "Gradient":
      return <GradientDark />;
    case "Peaks":
      return <PeaksLight />;
    case "Rings":
      return <RingsDark />;
    case "Scatter":
      return <ScatterDark />;
    case "Steps":
      return <StepsDark />;
    default:
      return null;
  }
}

function getGreeting(isBirthday: boolean): string {
  if (isBirthday) return "Happy Birthday";
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 16) return "Good Afternoon";
  return "Good Evening";
}

const accountMenuOptions = [
  {
    title: "Home",
    icon: <HomeOutlined />,
    fgcolor: "#1c419a",
    bgcolor: "#aec6f6",
    id: "home",
  },
  {
    title: "Exam Schedule",
    icon: <CalendarMonthOutlined />,
    fgcolor: "#3e7d32",
    bgcolor: "#88d393",
    id: "exam",
  },
  {
    title: "Class Schedule",
    icon: <CoPresentOutlined />,
    fgcolor: "#6a1b9a",
    bgcolor: "#d4bbf9",
    id: "class",
  },
  {
    title: "Links",
    icon: <LinkOutlined />,
    fgcolor: "#b71c1c",
    bgcolor: "#f3b2e1",
    id: "links",
  },
  {
    title: "Settings",
    icon: <SettingsOutlined />,
    fgcolor: "#7f4c00",
    bgcolor: "#f4b98b",
    id: "settings",
  },
  {
    title: "Admin",
    icon: <AdminPanelSettingsOutlined />,
    fgcolor: "#880e4f",
    bgcolor: "#fe5d5d",
    id: "admin",
  },
];

export function Account() {
  const isPhone = useMediaQuery("(max-width:800px)");
  const { mode } = useColorScheme();
  const isLight = mode === "light";
  const { page } = useParams();
  const selectedPage = page || "home";
  const navigate = useNavigate();
  const [accountState, dispatchAccount] = useReducer(
    reducerAccount,
    {} as AccountState,
  );

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, "user", user.uid);
        const linkGeneralRef = doc(db, "link", "general");
        const linksCollectionRef = collection(db, "link");

        const unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            dispatchAccount({
              type: "updateUserDetails",
              userDetails: {
                name: data.name ?? "",
                email: data.email ?? "",
                uid: user.uid ?? "",
                photo: data.photo ?? "",
                provider: data.provider ?? "",
                dateOfBirth: data.dateOfBirth ?? "",
                university: data.university ?? "",
                semester: data.semester ?? "",
                accentColour: data.accentColour ?? "Orange",
                wallpaper: data.wallpaper ?? "Waves",
                game: data.game ?? "Dice",
              },
            });
            if (data.name) sessionStorage.setItem("account-name", data.name);
            if (data.photo) sessionStorage.setItem("account-photo", data.photo);
            sessionStorage.setItem("account-game", data.game ?? "Dice");
          }
        });

        const unsubscribeGeneral = onSnapshot(linkGeneralRef, (genSnap) => {
          if (genSnap.exists()) {
            dispatchAccount({
              type: "updateGeneral",
              general: genSnap.data(),
            });
          }
        });

        const unsubscribeLinks = onSnapshot(linksCollectionRef, (querySnap) => {
          const allLinks = querySnap.docs
            .filter((doc) => doc.id !== "general")
            .map((doc) => ({
              ...doc.data(),
              uid: doc.id,
            }));

          dispatchAccount({
            type: "updateLinks",
            links: allLinks,
          });
        });

        return () => {
          unsubscribeUser();
          unsubscribeGeneral();
          unsubscribeLinks();
        };
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const [main, light, dark, deep] = getColours(
    isLight ? (accountState.userDetails?.accentColour ?? "Grey") : "Grey",
  );

  return (
    <AccountContext.Provider
      value={{
        accountState: accountState,
        dispatch: dispatchAccount,
      }}
    >
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        {isLight
          ? getLightBackground(
              accountState.userDetails?.wallpaper,
              accountState.userDetails?.accentColour,
            )
          : getDarkBackground(accountState.userDetails?.wallpaper)}
      </Box>
      <Box
        sx={{
          "--mui-palette-background-light": light,
          "--mui-palette-background-light2": `${dark}cc`,
          "--mui-palette-background-button": dark,
          "--mui-palette-background-buttondark": deep,

          "--mui-palette-background-paper": isPhone ? dark : main,
          "--mui-palette-background-default": deep,

          "--mui-palette-secondary-main": deep,
          "--mui-palette-secondary-light": dark,
        }}
      >
        {!isPhone ? (
          <StyledPaper elevation={0}>
            <List>
              {accountMenuOptions.map((item, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedPage === item.id}
                  sx={{
                    borderRadius: "5rem",
                    width: "fit-content",
                    display:
                      item.id === "admin" &&
                      accountState.userDetails?.uid != adminUID
                        ? "none"
                        : "inline-flex",
                    transition: "background-color 0.3s",
                    "&.Mui-selected": {
                      // 50% opacity using color-mix
                      backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "Grey"}, transparent 80%) !important`,
                      "&:hover": {
                        backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "Grey"}, transparent 40%) !important`,
                      },
                    },
                    // Keep text and icons sharp at 100% opacity
                    "&.Mui-selected .MuiTypography-root, &.Mui-selected .MuiListItemIcon-root":
                      {
                        color: "#ffffff",
                        fontWeight: "bold",
                      },
                  }}
                  onClick={() => {
                    navigate(`/account/${item.id}`);
                  }}
                >
                  <ListItemAvatar
                    sx={{ position: "relative", left: "-0.5rem" }}
                  >
                    <Avatar sx={{ bgcolor: item.bgcolor, color: item.fgcolor }}>
                      {item.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <StyledListItemText primary={item.title} />
                </ListItemButton>
              ))}
            </List>
          </StyledPaper>
        ) : (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <BottomNavigation
              showLabels
              value={selectedPage}
              onChange={(_event, newValue) => {
                navigate(`/account/${newValue}`);
                window.scrollTo(0, 0);
              }}
              sx={{
                width: "100%",
                "& .MuiBottomNavigationAction-root": {
                  padding: "0 !important",
                  minWidth: "unset !important",
                  borderRadius: "2rem",
                },
              }}
            >
              {accountMenuOptions.map((item, index) => (
                <BottomNavigationAction
                  sx={{
                    color: "white",
                    "&.Mui-selected": { color: item.bgcolor },
                    display:
                      item.id === "admin" &&
                      accountState.userDetails?.uid != adminUID
                        ? "none"
                        : "inline-flex",
                  }}
                  key={index}
                  label={item.title.split(" ")[0]}
                  value={item.id}
                  icon={item.icon}
                />
              ))}
            </BottomNavigation>
          </Box>
        )}
        <HolderBox disablePadding disableAnimation disableFooter>
          <Stack direction={isPhone ? "column" : "row"} gap={1} zIndex={0}>
            {!isPhone && <Box sx={{ width: "13rem", flexShrink: 0 }} />}
            <motion.div
              key={selectedPage}
              style={{
                minHeight: "calc(100vh - 6rem)",
                flexGrow: 1,
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0.05, 0.8, 0.35, 0.99],
              }}
            >
              <MainBox
                sx={{
                  padding: isPhone ? "0" : "1rem",
                  fontSize: isPhone ? "0.9rem" : "1rem",
                }}
              >
                {selectedPage === "home" && (
                  <MainStack
                    sx={{
                      flexDirection: "row",
                      maxWidth: "60rem",
                      minHeight: "80vh",
                      alignContent: "flex-start",
                    }}
                  >
                    <AccountHeaderBox
                      onclick={() => {
                        navigate("/account/settings");
                      }}
                      isProfilePic
                      isBirthday={
                        accountState.userDetails?.dateOfBirth?.slice(5) ===
                        new Date().toISOString().slice(5, 10)
                      }
                      avatar={
                        <AccountCircleOutlined
                          sx={{
                            width: "2rem",
                            height: "2rem",
                            color:
                              accountState.userDetails?.accentColour ??
                              "#824222",
                          }}
                        />
                      }
                      isLoading={accountState.userDetails == undefined}
                      heading={
                        getGreeting(
                          accountState.userDetails?.dateOfBirth?.slice(5) ===
                            new Date().toISOString().slice(5, 10),
                        ) +
                        " " +
                        (accountState.userDetails?.name
                          ? accountState.userDetails.name.split(" ")[0]
                          : "Guest") +
                        "!"
                      }
                      description={
                        accountState.userDetails?.email
                          ? accountState.userDetails.email
                          : "guest@akashcraft.ca"
                      }
                    />
                    <AccountHeaderBox
                      onclick={() => {
                        navigate("/account/exam");
                      }}
                      avatar={
                        <CalendarMonthOutlined
                          sx={{
                            width: "2rem",
                            height: "2rem",
                            color:
                              accountState.userDetails?.accentColour ??
                              "#824222",
                          }}
                        />
                      }
                      heading="Next Exam"
                      description="DEMO 1000 in 10 days"
                    />
                    {accountState.general?.privateAnnouncement ? (
                      <AccountHeaderBox
                        avatar={
                          <CampaignOutlined
                            sx={{
                              width: "2rem",
                              height: "2rem",
                              color:
                                accountState.userDetails?.accentColour ??
                                "#824222",
                            }}
                          />
                        }
                        heading="Announcement"
                        isLoadingBottom={accountState.general == undefined}
                        description={
                          accountState.general?.privateAnnouncement
                            ? accountState.general.privateAnnouncement
                            : "You are all caught up!"
                        }
                        isAnnouncement
                        flexGrow={2}
                      />
                    ) : accountState.userDetails?.university &&
                      accountState.userDetails?.semester ? (
                      <AccountHeaderBox
                        avatar={
                          <SchoolOutlined
                            sx={{
                              width: "2rem",
                              height: "2rem",
                              color:
                                accountState.userDetails?.accentColour ??
                                "#824222",
                            }}
                          />
                        }
                        heading={
                          accountState.userDetails?.university ?? "University"
                        }
                        isLoading={accountState.general == undefined}
                        description={
                          accountState.userDetails?.semester ?? "Semester"
                        }
                        flexGrow={2}
                      />
                    ) : (
                      <AccountHeaderBox
                        avatar={
                          <CampaignOutlined
                            sx={{
                              width: "2rem",
                              height: "2rem",
                              color:
                                accountState.userDetails?.accentColour ??
                                "#824222",
                            }}
                          />
                        }
                        heading="Announcement"
                        isLoadingBottom={accountState.general == undefined}
                        description={
                          accountState.general?.privateAnnouncement
                            ? accountState.general.privateAnnouncement
                            : "You are all caught up!"
                        }
                        isAnnouncement
                        flexGrow={2}
                      />
                    )}
                    <Stack
                      direction={isPhone ? "column" : "row"}
                      sx={{ width: "100%" }}
                    >
                      <StyledHeaderPaper
                        elevation={0}
                        sx={{
                          flexGrow: 1,
                          minWidth: isPhone ? "100%" : "40%",
                          marginRight: isPhone ? 0 : "0.5rem",
                          marginBottom: isPhone ? "1rem" : 0,
                          padding: "1rem",
                          height: "100%",
                        }}
                      >
                        <h3 style={{ margin: "0 0 1rem 0" }}>Exam Schedule</h3>
                        <Box sx={{ height: "calc(100% - 2.75rem)" }}>
                          <ExamSchedule
                            onEmpty={() => {
                              navigate(`/account/exam`);
                              window.scrollTo(0, 0);
                            }}
                          />
                        </Box>
                      </StyledHeaderPaper>
                      <StyledHeaderPaper
                        elevation={0}
                        sx={{
                          flexGrow: 1,
                          minWidth: isPhone ? "100%" : "40%",
                          marginLeft: isPhone ? 0 : "0.5rem",
                          marginBottom: isPhone ? "2rem" : 0,
                          padding: "1rem",
                          height: "100%",
                        }}
                      >
                        <h3 style={{ margin: "0 0 1rem 0" }}>Class Schedule</h3>
                        <Box sx={{ height: "calc(100% - 2.75rem)" }}>
                          <ClassSchedule
                            onEmpty={() => {
                              navigate(`/account/class`);
                              window.scrollTo(0, 0);
                            }}
                          />
                        </Box>
                      </StyledHeaderPaper>
                    </Stack>
                  </MainStack>
                )}
                {selectedPage === "exam" && (
                  <MainStack sx={{ minHeight: "80vh", maxWidth: "60rem" }}>
                    <Exam />
                  </MainStack>
                )}
                {selectedPage === "class" && (
                  <MainStack sx={{ minHeight: "80vh", maxWidth: "60rem" }}>
                    <Class />
                  </MainStack>
                )}
                {selectedPage === "links" && (
                  <MainStack sx={{ minHeight: "80vh", maxWidth: "40rem" }}>
                    <Links />
                  </MainStack>
                )}
                {selectedPage === "settings" && (
                  <MainStack sx={{ minHeight: "80vh", maxWidth: "40rem" }}>
                    <Settings />
                  </MainStack>
                )}
                {selectedPage === "admin" && (
                  <MainStack
                    sx={{
                      minHeight: "80vh",
                      maxWidth: "40rem",
                      display:
                        accountState.userDetails?.uid != adminUID
                          ? "none"
                          : "flex",
                    }}
                  >
                    <Admin />
                  </MainStack>
                )}
              </MainBox>
            </motion.div>
          </Stack>
        </HolderBox>
      </Box>
    </AccountContext.Provider>
  );
}

export const StyledHeader = styled("h2")({
  fontFamily: "Segoe UI",
  margin: "0 0 0rem 0.5rem",
});

const MainStack = styled(Stack)`
  width: 100%;
  font-family: "Segoe UI";
  gap: 1rem;
  height: "fit-content";
  flex-wrap: wrap;
`;

const MainBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  flexGrow: 1,
});

const StyledPaper = styled(Paper)({
  padding: "0 1rem",
  position: "fixed",
  width: "17rem",
  top: "5.5rem",
  left: "0.65rem",
  backgroundColor: "transparent",
  height: "min-content",
});

export const StyledListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
  },
  "& .MuiListItemText-secondary": {
    fontFamily: "Segoe UI",
    color: "var(--mui-palette-text-primary)",
  },
  position: "relative",
  left: "-0.75rem",
});
