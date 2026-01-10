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
  SchoolOutlined,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import AccountHeaderBox, { StyledHeaderPaper } from "./AccountHeaderBox";
import ClassSchedule from "./ClassSchedule";
import ExamSchedule from "./ExamSchedule";
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
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import Loading from "../akash-commons/Loading";
import {
  accountMenuOptions,
  getColours,
  getDarkBackground,
  getLightBackground,
  getGreeting,
} from "./AccountUtils";

const adminUID = "NBH76id0H9gunlBAxynGWjsSomP2";

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
        const examsCollectionRef = collection(db, "exam");
        const examQuery = query(
          examsCollectionRef,
          where("uid", "==", user.uid),
        );
        const classesCollectionRef = collection(db, "class");
        const classQuery = query(
          classesCollectionRef,
          where("uid", "==", user.uid),
        );

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
                classSharing: data.classSharing ?? false,
                examSharing: data.examSharing ?? false,
              },
            });
            if (data.name)
              sessionStorage.setItem(
                "account-name",
                data.name.charAt(0).toUpperCase() + data.name.slice(1),
              );
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

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const unsubscribeExams = onSnapshot(examQuery, (querySnap) => {
          const allExams = querySnap.docs
            .map((doc) => {
              const data = doc.data();
              return {
                courseName: data.courseName,
                date: data.date,
                time: data.time,
                uid: doc.id,
              };
            })
            .filter((exam) => new Date(exam.date) >= now)
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            );

          dispatchAccount({
            type: "updateExams",
            exams: allExams,
          });
        });

        const unsubscribeClasses = onSnapshot(classQuery, (querySnap) => {
          const dayMap: { [key: string]: number } = {
            M: 1,
            T: 2,
            W: 3,
            R: 4,
            F: 5,
          };

          const allEvents = querySnap.docs.map((doc) => {
            const data = doc.data();

            const numericDays = data.daysOfWeek
              ? data.daysOfWeek.split("").map((char: string) => dayMap[char])
              : [];

            return {
              title: data.className,
              startTime: data.startTime,
              endTime: data.endTime,
              daysOfWeek: numericDays,
              uid: doc.id,
            };
          });

          dispatchAccount({
            type: "updateEvents",
            events: allEvents,
          });
        });

        return () => {
          unsubscribeUser();
          unsubscribeGeneral();
          unsubscribeLinks();
          unsubscribeExams();
          unsubscribeClasses();
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
      {!accountState.userDetails && <Loading text="Preparing Account" />}
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
          display: accountState.userDetails ? "block" : "none",
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
                      backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "Grey"}, transparent 80%) !important`,
                      "&:hover": {
                        backgroundColor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "Grey"}, transparent 40%) !important`,
                      },
                    },
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
                          ? accountState.userDetails.name
                              .split(" ")[0]
                              .charAt(0)
                              .toUpperCase() +
                            accountState.userDetails.name.split(" ")[0].slice(1)
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
                      description={
                        accountState.exams?.length > 0
                          ? getExamCountdown()
                          : "Hooray! No Exams"
                      }
                      isLoading={accountState.exams == undefined}
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
                        isAnnouncement
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
                            accountState={accountState}
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
                            accountState={accountState}
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

  function getExamCountdown(): string {
    const days = Math.max(
      0,
      Math.ceil(
        (new Date(`${accountState.exams[0].date}`).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );
    if (days === 0) return `${accountState.exams[0].courseName} today`;
    if (days === 1) return `${accountState.exams[0].courseName} tomorrow`;
    return `${accountState.exams[0].courseName} in ${days} days`;
  }
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
