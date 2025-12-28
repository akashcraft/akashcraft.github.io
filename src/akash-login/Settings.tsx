import {
  AccountBoxOutlined,
  AccountCircleOutlined,
  ArrowBackOutlined,
  ArrowDropDown,
  BrushOutlined,
  CakeOutlined,
  CalendarMonthOutlined,
  Circle,
  Delete,
  DeleteOutlined,
  PasswordOutlined,
  PhotoCameraOutlined,
  PhotoLibraryOutlined,
  SchoolOutlined,
  TollOutlined,
  Visibility,
  VisibilityOff,
  WallpaperOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  Stack,
  styled,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { StyledHeader, StyledListItemText } from "./Account";
import { useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const accentColours = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Purple",
  "Grey",
];

const wallpapers = [
  "Blob",
  "Gradient",
  "Peaks",
  "Rings",
  "Scatter",
  "Steps",
  "Waves",
];

const games = ["Dice", "Coin"];

type SettingsState = {
  selectedPage: string;
  entryHeader?: string;
  entryDescription?: string;
  entryType?: string;
  entryDefaultValue?: string;
  required?: boolean;
  passwordStates?: {
    oldPassword?: boolean;
    newPassword?: boolean;
    confirmPassword?: boolean;
  };
  dropdownStates?: (HTMLElement | null)[];
  isProfileDialogOpen?: boolean;
  settingsScroll?: number;
};

type SettingsAction = {
  page: string;
  header?: string;
  defaultValue?: string;
  description?: string;
  type?: string;
  required?: boolean;
  passwordField?: string;
  dropdownField?: { key: number; element: HTMLElement } | null;
};

const settingsReducer = (
  state: SettingsState,
  action: SettingsAction,
): SettingsState => {
  switch (action.page) {
    case "form-entry":
      return {
        ...state,
        settingsScroll: window.scrollY,
        selectedPage: "form-entry",
        entryHeader: action.header ?? "",
        entryDescription: action.description ?? "",
        entryType: action.type ?? "text",
        entryDefaultValue: action.defaultValue ?? "",
        required: action.required ?? false,
        passwordStates: {
          oldPassword: false,
          newPassword: false,
          confirmPassword: false,
        },
      };
    case "toggle-password-visibility":
      return {
        ...state,
        passwordStates: {
          ...state.passwordStates,
          oldPassword:
            action.passwordField === "oldPassword"
              ? !state.passwordStates?.oldPassword
              : state.passwordStates?.oldPassword || false,
          newPassword:
            action.passwordField === "newPassword"
              ? !state.passwordStates?.newPassword
              : state.passwordStates?.newPassword || false,
          confirmPassword:
            action.passwordField === "confirmPassword"
              ? !state.passwordStates?.confirmPassword
              : state.passwordStates?.confirmPassword || false,
        },
      };
    case "set-dropdown": {
      const newdropdownStates: (HTMLElement | null)[] = [null, null, null];
      if (action.dropdownField) {
        newdropdownStates[action.dropdownField.key] =
          action.dropdownField.element;
      }
      return {
        ...state,
        dropdownStates: newdropdownStates,
      };
    }
    case "close-all-dropdowns":
      return {
        ...state,
        dropdownStates: [null, null, null],
      };
    case "toggle-profile-dialog":
      return {
        ...state,
        isProfileDialogOpen: !state.isProfileDialogOpen,
      };
    case "main":
      window.scrollTo(0, state.settingsScroll || 0);
      return { ...state, selectedPage: "settings-main" };
    default:
      return state;
  }
};

export default function Settings() {
  const isPhone = useMediaQuery("(max-width:800px)");
  const [state, dispatch] = useReducer(settingsReducer, {
    selectedPage: "settings-main",
    dropdownStates: [null, null, null],
  });

  useEffect(() => {
    if (state.selectedPage === "settings-main") {
      window.scrollTo(0, state.settingsScroll || 0);
    }
  }, [state.selectedPage, state.settingsScroll]);

  return (
    <>
      {state.selectedPage === "settings-main" && (
        <>
          <StyledHeader>Personal Info</StyledHeader>
          <Modal
            open={state.isProfileDialogOpen || false}
            onClose={() => {
              dispatch({ page: "toggle-profile-dialog" });
            }}
          >
            <StyledPopupBox sx={{ fontFamily: "Segoe UI" }}>
              <Stack
                alignItems="center"
                justifyContent="center"
                gap={3}
                mt={2}
                mb={2}
              >
                <h3 style={{ margin: 0 }}>Change Profile Picture</h3>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    sx={{
                      bgcolor: "#f4b98b",
                      width: "8rem",
                      height: "8rem",
                    }}
                  >
                    <AccountCircleOutlined
                      sx={{
                        width: "6rem",
                        height: "6rem",
                        color: "#824222",
                      }}
                    />
                  </Avatar>
                  <Avatar
                    sx={{
                      bgcolor: "#f48b8bff",
                      width: "2rem",
                      height: "2rem",
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      cursor: "pointer",
                    }}
                  >
                    <Delete
                      sx={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "#822222ff",
                      }}
                    />
                  </Avatar>
                </Box>
                <Stack direction="row">
                  {["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff"].map(
                    (colour, index) => (
                      <Avatar
                        key={index}
                        sx={{
                          bgcolor: `${colour}44`,
                          width: "3rem",
                          height: "3rem",
                          margin: "0.25rem",
                          cursor: "pointer",
                        }}
                      >
                        <AccountCircleOutlined
                          sx={{
                            width: "2rem",
                            height: "2rem",
                            color: `${colour}dd`,
                          }}
                        />
                      </Avatar>
                    ),
                  )}
                </Stack>
                <Stack width="100%" gap={1} alignItems="center">
                  <PopupButton
                    sx={{
                      backgroundColor:
                        "var(--mui-palette-background-buttondark)",
                      "&:hover": {
                        backgroundColor: "var(--mui-palette-background-button)",
                      },
                      color: "var(--mui-palette-text-primary)",
                    }}
                    startIcon={
                      <PhotoLibraryOutlined
                        sx={{ scale: 1.2, position: "relative", top: "0.1rem" }}
                      />
                    }
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.click();
                    }}
                  >
                    Upload from Device
                  </PopupButton>
                  <PopupButton
                    variant="text"
                    onClick={() => {
                      dispatch({ page: "toggle-profile-dialog" });
                    }}
                  >
                    Cancel
                  </PopupButton>
                </Stack>
              </Stack>
            </StyledPopupBox>
          </Modal>
          <StyledList>
            <StyledListItemButton
              sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              onClick={() => {
                dispatch({ page: "toggle-profile-dialog" });
              }}
            >
              <ListItemIcon>
                <PhotoCameraOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Profile Picture" />
              <ListItemButton
                disableTouchRipple
                disableRipple
                sx={{
                  padding: 0,
                  display: "contents",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#f4b98b",
                    width: "3rem",
                    height: "3rem",
                    margin: "0.5rem",
                  }}
                >
                  <AccountCircleOutlined
                    sx={{
                      width: "2rem",
                      height: "2rem",
                      color: "#824222",
                    }}
                  />
                </Avatar>
              </ListItemButton>
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Name",
                  description:
                    "This is the name displayed on your account and in menus across the interface. You do not have to include your surname or use your real name.",
                  type: "text",
                  defaultValue: "Guest",
                  required: true,
                });
              }}
            >
              <ListItemIcon>
                <AccountBoxOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Name" secondary="Guest" />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Birthday",
                  description:
                    "This is used to provide automated greetings on your birthday. It is only visible to you and is an optional field.",
                  type: "date",
                  defaultValue: "Not Set",
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <CakeOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Birthday" secondary="Not Set" />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "University",
                  description:
                    "Your university is shown when printing your schedules. It is also visible to others if you have turned on schedule sharing. This is an optional field.",
                  type: "text",
                  defaultValue: "Demo University",
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <SchoolOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="University"
                secondary="Demo University"
              />
            </StyledListItemButton>
            <StyledListItemButton
              sx={{
                borderBottom: "none",
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Semester",
                  description:
                    "Your semester is shown when printing your schedules. It is also visible to others if you have turned on schedule sharing. This is an optional field.",
                  type: "text",
                  defaultValue: "Demo Semester",
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <CalendarMonthOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Semester"
                secondary="Demo Semester"
              />
            </StyledListItemButton>
          </StyledList>
          <StyledHeader>Personalization</StyledHeader>
          <StyledList>
            <StyledListItem
              secondaryAction={
                <>
                  <StyledColourChip
                    icon={
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                      >
                        <Circle sx={{ color: "orange !important" }} />
                        <ArrowDropDown
                          sx={{
                            fontSize: "1.4rem",
                            color: "white !important",
                          }}
                        />
                      </Stack>
                    }
                    onClick={(event) => {
                      dispatch({
                        page: "set-dropdown",
                        dropdownField: { key: 0, element: event.currentTarget },
                      });
                    }}
                  />
                  <Menu
                    sx={{
                      "& .MuiPaper-root": {
                        borderRadius: "1.25rem",
                      },
                    }}
                    anchorEl={state.dropdownStates?.[0] || null}
                    open={Boolean(state.dropdownStates?.[0])}
                    onClose={() => dispatch({ page: "close-all-dropdowns" })}
                  >
                    {accentColours.map((colour) => (
                      <MenuItem
                        key={colour}
                        onClick={() =>
                          dispatch({ page: "close-all-dropdowns" })
                        }
                      >
                        <ListItemIcon>
                          <Circle
                            sx={{
                              color: `${colour.toLowerCase()} !important`,
                              position: "relative",
                              left: "0.3rem",
                            }}
                          />
                        </ListItemIcon>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              }
              sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
            >
              <ListItemIcon>
                <BrushOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Accent Colour" secondary="Orange" />
            </StyledListItem>
            <StyledListItem
              secondaryAction={
                <>
                  <StyledDropChip
                    deleteIcon={
                      <ArrowDropDown
                        sx={{
                          fontSize: "1.25rem",
                          color: "white !important",
                        }}
                      />
                    }
                    onDelete={() => {
                      dispatch({
                        page: "set-dropdown",
                        dropdownField: {
                          key: 2,
                          element: document.activeElement as HTMLElement,
                        },
                      });
                    }}
                    label="Waves"
                    onClick={(event) => {
                      dispatch({
                        page: "set-dropdown",
                        dropdownField: { key: 1, element: event.currentTarget },
                      });
                    }}
                  />
                  <Menu
                    sx={{
                      "& .MuiPaper-root": {
                        borderRadius: "1.25rem",
                      },
                    }}
                    anchorEl={state.dropdownStates?.[1] || null}
                    open={Boolean(state.dropdownStates?.[1])}
                    onClose={() => dispatch({ page: "close-all-dropdowns" })}
                  >
                    {wallpapers.map((wallpaper) => (
                      <MenuItem
                        key={wallpaper}
                        onClick={() =>
                          dispatch({ page: "close-all-dropdowns" })
                        }
                        sx={{
                          "&.MuiMenuItem-root": {
                            fontFamily: "Segoe UI",
                            fontSize: "0.9rem",
                          },
                        }}
                      >
                        {wallpaper}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              }
            >
              <ListItemIcon>
                <WallpaperOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Wallpaper" />
            </StyledListItem>
            <StyledListItem
              secondaryAction={
                <>
                  <StyledDropChip
                    deleteIcon={
                      <ArrowDropDown
                        sx={{
                          fontSize: "1.25rem",
                          color: "white !important",
                        }}
                      />
                    }
                    onDelete={() => {
                      dispatch({
                        page: "set-dropdown",
                        dropdownField: {
                          key: 2,
                          element: document.activeElement as HTMLElement,
                        },
                      });
                    }}
                    label="Dice"
                    onClick={(event) => {
                      dispatch({
                        page: "set-dropdown",
                        dropdownField: { key: 2, element: event.currentTarget },
                      });
                    }}
                  />
                  <Menu
                    sx={{
                      "& .MuiPaper-root": {
                        borderRadius: "1.25rem",
                      },
                    }}
                    anchorEl={state.dropdownStates?.[2] || null}
                    open={Boolean(state.dropdownStates?.[2])}
                    onClose={() => dispatch({ page: "close-all-dropdowns" })}
                  >
                    {games.map((game) => (
                      <MenuItem
                        key={game}
                        onClick={() =>
                          dispatch({ page: "close-all-dropdowns" })
                        }
                        sx={{
                          "&.MuiMenuItem-root": {
                            fontFamily: "Segoe UI",
                            fontSize: "0.9rem",
                          },
                        }}
                      >
                        {game}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              }
              sx={{
                borderBottom: "none",
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
            >
              <ListItemIcon>
                <TollOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Mini Game" />
            </StyledListItem>
          </StyledList>
          <StyledHeader>Account</StyledHeader>
          <StyledList>
            <StyledListItemButton
              sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Change Password",
                  description:
                    "To change your password, please re-enter your old password and enter a new password along with confirmation below.",
                  type: "password",
                  defaultValue: "",
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <PasswordOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Change Password" />
            </StyledListItemButton>
            <StyledListItemButton
              sx={{
                borderBottom: "none",
                color: "red",
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Delete Account",
                  description:
                    "Deleting your account will remove all your data from AkashCraft. This action cannot be undone. You will be signed out immediately. Please type 'DELETE' to confirm.",
                  type: "text",
                  defaultValue: "",
                  required: true,
                });
              }}
            >
              <ListItemIcon>
                <DeleteOutlined sx={{ ...IconStyle, color: "red" }} />
              </ListItemIcon>
              <StyledListItemText primary="Delete Account" />
            </StyledListItemButton>
          </StyledList>
        </>
      )}
      {state.selectedPage === "form-entry" && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.05, 0.8, 0.35, 0.99],
          }}
        >
          <Stack direction="row" alignItems="center" gap={1} mb={2}>
            <IconChip
              sx={{
                color: "var(--mui-palette-text-primary)",
                borderRadius: "5rem",
                padding: "0",
              }}
              icon={<ArrowBackOutlined sx={BackIconStyle} />}
              onClick={() => {
                dispatch({ page: "main" });
              }}
            />
            <StyledChangeHeader>{state.entryHeader}</StyledChangeHeader>
          </Stack>
          <Box
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "var(--mui-palette-background-light2)",
              position: "relative",
            }}
          >
            <p
              style={{
                margin: isPhone ? "0.5rem" : "1rem",
                fontSize: "0.9rem",
              }}
            >
              {state.entryDescription}
            </p>
            {state.entryType == "text" && (
              <SingleTextField
                sx={{
                  margin: isPhone ? "2rem 0.5rem" : "1rem",
                  width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                }}
                required={state.required}
                id="form-entry-field"
                label={
                  state.entryHeader == "Delete Account"
                    ? "Type DELETE to confirm"
                    : state.entryHeader
                }
                defaultValue={state.entryDefaultValue}
              />
            )}
            {state.entryType == "date" && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Birthday"
                  slotProps={{
                    openPickerButton: {
                      sx: {
                        color: "var(--mui-palette-text-primary)",
                      },
                    },
                    popper: {
                      sx: {
                        "& *": {
                          color: "white",
                        },

                        "& .MuiPickersDay-root": {
                          color: "white",
                        },

                        "& .MuiPickersDay-root.Mui-selected": {
                          backgroundColor: "white",
                          color: "#824222",
                        },

                        "& .MuiPickersDay-root.MuiPickersDay-today": {
                          borderColor: "white",
                        },

                        "& .MuiPickersCalendarHeader-label": {
                          color: "white",
                        },

                        "& .MuiPickersArrowSwitcher-button": {
                          color: "white",
                        },

                        "& .MuiDayCalendar-weekDayLabel": {
                          color: "white",
                        },
                      },
                    },
                    textField: {
                      sx: {
                        margin: isPhone ? "2rem 0.5rem" : "1rem",
                        width: isPhone
                          ? "calc(100% - 1rem)"
                          : "calc(100% - 2rem)",
                        "& input": {
                          color: "var(--mui-palette-text-primary)",
                          fontFamily: "Segoe UI",
                        },
                        "& label": {
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "Segoe UI",
                        },
                        "& fieldset": {
                          borderColor: "rgba(255,255,255,0.4)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.7)",
                        },
                        "& .Mui-focused fieldset": {
                          borderColor: "#824222",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            )}
            {state.entryType == "password" && (
              <>
                <StyledFormControl
                  sx={{
                    margin: isPhone ? "2rem 0.5rem 0 0.5rem" : "1rem",
                    width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="old-password">Old Password</InputLabel>
                  <OutlinedInput
                    id="old-password"
                    type={
                      state.passwordStates?.oldPassword ? "text" : "password"
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        letterSpacing: state.passwordStates?.oldPassword
                          ? "normal"
                          : "0.15rem !important",
                      },
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            dispatch({
                              page: "toggle-password-visibility",
                              passwordField: "oldPassword",
                            })
                          }
                          edge="end"
                        >
                          {state.passwordStates?.oldPassword ? (
                            <VisibilityOff sx={{ color: "white" }} />
                          ) : (
                            <Visibility sx={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Old Password"
                  />
                </StyledFormControl>
                <StyledFormControl
                  sx={{
                    margin: isPhone ? "2rem 0.5rem 0 0.5rem" : "1rem",
                    width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="new-password">New Password</InputLabel>
                  <OutlinedInput
                    id="new-password"
                    type={
                      state.passwordStates?.newPassword ? "text" : "password"
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        letterSpacing: state.passwordStates?.newPassword
                          ? "normal"
                          : "0.15rem !important",
                      },
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            dispatch({
                              page: "toggle-password-visibility",
                              passwordField: "newPassword",
                            })
                          }
                          edge="end"
                        >
                          {state.passwordStates?.newPassword ? (
                            <VisibilityOff sx={{ color: "white" }} />
                          ) : (
                            <Visibility sx={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                </StyledFormControl>
                <StyledFormControl
                  sx={{
                    margin: isPhone ? "2rem 0.5rem" : "1rem",
                    width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="confirm-password">
                    Confirm New Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirm-password"
                    type={
                      state.passwordStates?.confirmPassword
                        ? "text"
                        : "password"
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        letterSpacing: state.passwordStates?.confirmPassword
                          ? "normal"
                          : "0.15rem !important",
                      },
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            dispatch({
                              page: "toggle-password-visibility",
                              passwordField: "confirmPassword",
                            })
                          }
                          edge="end"
                        >
                          {state.passwordStates?.confirmPassword ? (
                            <VisibilityOff sx={{ color: "white" }} />
                          ) : (
                            <Visibility sx={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm New Password"
                  />
                </StyledFormControl>
              </>
            )}
            <Stack
              direction="row"
              justifyContent="flex-end"
              gap={1}
              sx={{ margin: isPhone ? "0.5rem" : "1rem" }}
            >
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  fontFamily: "Segoe UI",
                  borderRadius: "2rem",
                  padding: "0.3rem 1rem 0.4rem 1rem",
                }}
                onClick={() => {
                  dispatch({ page: "main" });
                }}
              >
                Cancel
              </Button>
              <Button
                disabled
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "2rem",
                  fontSize: "1rem",
                  fontFamily: "Segoe UI",
                  padding: "0.3rem 1.4rem 0.4rem 1.4rem",
                }}
              >
                {state.entryHeader == "Delete Account"
                  ? "Delete"
                  : state.entryType == "password"
                    ? "Change"
                    : "Save"}
              </Button>
            </Stack>
          </Box>
        </motion.div>
      )}
    </>
  );
}

const BackIconStyle = {
  color: "white !important",
};

const IconChip = styled(Chip)({
  fontSize: "1.2rem",
  padding: "2rem",
  backgroundColor: "transparent",
  width: "3rem",
  height: "3rem",
  ".MuiChip-label": {
    display: "none",
  },
  ".MuiChip-icon": {
    margin: 0,
  },
});

const StyledChangeHeader = styled("h2")({
  fontFamily: "Segoe UI",
  margin: "0 0 0.2rem 0",
});

export const StyledList = styled(List)({
  backgroundColor: "var(--mui-palette-background-light2)",
  borderRadius: "1rem",
  marginBottom: "2rem",
  padding: 0,
});

export const StyledListItemButton = styled(ListItemButton)({
  borderBottom: "1px solid var(--mui-palette-text-light2)",
  minHeight: "4rem",
  gap: "0.2rem",
  paddingLeft: "1.5rem",
});

export const StyledListItem = styled(ListItem)({
  borderBottom: "1px solid var(--mui-palette-text-light2)",
  minHeight: "4rem",
  gap: "0.2rem",
  paddingLeft: "1.5rem",
});

const IconStyle = {
  color: "white",
  fontSize: "1.5rem",
  position: "relative",
  top: "0.1rem",
};

const SingleTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "var(--mui-palette-text-primary)",
    fontFamily: "Segoe UI",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Segoe UI",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.7)",
  },
});

const StyledFormControl = styled(FormControl)({
  "& .MuiInputBase-input": {
    color: "var(--mui-palette-text-primary)",
    fontFamily: "Segoe UI",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Segoe UI",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.7)",
  },
});

const StyledColourChip = styled(Chip)({
  width: "4rem",
  paddingRight: "0.7rem",
  ".MuiChip-label": {
    display: "none",
  },
});

const StyledDropChip = styled(Chip)({
  ".MuiChip-label": {
    fontFamily: "Segoe UI",
  },
});

const StyledPopupBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "var(--mui-palette-background-light)",
  padding: "0 1rem",
  borderRadius: "1rem",
});

const PopupButton = styled(Button)({
  textTransform: "none",
  borderRadius: "3rem",
  fontFamily: "Segoe UI",
  padding: "0.5rem 1.5rem",
  fontSize: "1rem",
  gap: 5,
  width: "95%",
});
