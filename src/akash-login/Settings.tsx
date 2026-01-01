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
  KeyOutlined,
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
  Skeleton,
  Snackbar,
  Stack,
  styled,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { StyledHeader, StyledListItemText } from "./Account";
import { useContext, useEffect, useReducer, type JSX } from "react";
import { motion } from "framer-motion";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledDatePicker } from "./Pickers";
import { AccountContext } from "./AccountContext";
import dayjs from "dayjs";
import { usePhotoUpload, useSettingsSubmit } from "./AuthHooks";

const sanitize = (value: string): string => {
  return value
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");
};

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
  "None",
  "Blob",
  "Peaks",
  "Rings",
  "Stars",
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
  entryValue?: string;
};

type SettingsAction = {
  page: string;
  setEntryValue?: string;
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
        entryValue: action.defaultValue ?? "",
      };
    case "set-entry-value":
      return {
        ...state,
        entryValue: action.setEntryValue ?? "",
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

function showData(
  data: string | undefined,
  width?: string,
): JSX.Element | string {
  if (data === undefined) {
    return (
      <Skeleton
        variant="text"
        animation="wave"
        sx={{ width: width || "10rem", fontSize: "0.9rem" }}
      />
    );
  }

  if (data === "") return "Not Set";

  const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(data);

  if (isIsoDate) {
    const dateObj = dayjs(data);
    if (dateObj.isValid()) {
      return dateObj.format("DD MMM YYYY");
    }
  }

  return data;
}

export default function Settings() {
  const isPhone = useMediaQuery("(max-width:800px)");
  const [state, dispatch] = useReducer(settingsReducer, {
    selectedPage: "settings-main",
    dropdownStates: [null, null, null],
  });

  const { accountState } = useContext(AccountContext);
  const isExternalProvider = accountState.userDetails?.provider !== "email";

  const handlePasswordValidation = () => {
    const newPass = document.getElementById("new-password") as HTMLInputElement;
    const confirmPass = document.getElementById(
      "confirm-password",
    ) as HTMLInputElement;

    if (newPass && confirmPass) {
      if (newPass.value !== confirmPass.value) {
        confirmPass.setCustomValidity("Passwords do not match");
      } else {
        confirmPass.setCustomValidity("");
      }
    }
  };

  useEffect(() => {
    if (state.selectedPage === "settings-main") {
      window.scrollTo(0, state.settingsScroll || 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [state.selectedPage, state.settingsScroll]);

  const handleSubmitSettingsForm = (value: string, fieldOverride?: string) => {
    let field = state.entryHeader?.toLowerCase().replace(" ", "") || "";
    if (field === "birthday") {
      field = "dateOfBirth";
    }
    updateUserSetting(
      accountState.userDetails.uid || "",
      fieldOverride ? fieldOverride : field,
      value,
      fieldOverride ? undefined : () => dispatch({ page: "main" }),
    );
  };

  const {
    isSubmitting,
    isError,
    isSuccess,
    errorMessage,
    updateUserSetting,
    deleteUserAccount,
    changeUserPassword,
  } = useSettingsSubmit();

  const { uploadPhoto, deletePhoto, isUploading, uploadError } =
    usePhotoUpload();

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
                gap={3}
                mt={2}
                mb={2}
              >
                <h3 style={{ margin: 0 }}>Change Profile Picture</h3>
                {!isUploading &&
                accountState.userDetails?.photo !== undefined ? (
                  <Box sx={{ position: "relative" }}>
                    <Avatar
                      sx={{
                        backgroundColor:
                          accountState.userDetails?.accentColour ?? "#f4b98b",
                        bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "#f4b98b"}, white 60%)`,
                        width: "8rem",
                        height: "8rem",
                      }}
                      src={
                        accountState.userDetails.photo == ""
                          ? undefined
                          : accountState.userDetails.photo
                      }
                    >
                      {accountState.userDetails.photo == "" && (
                        <AccountCircleOutlined
                          sx={{
                            width: "6rem",
                            height: "6rem",
                            color:
                              accountState.userDetails?.accentColour ??
                              "#824222",
                          }}
                        />
                      )}
                    </Avatar>
                    {accountState.userDetails.photo !== "" && (
                      <Avatar
                        sx={{
                          bgcolor: "#f48b8b",
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
                          onClick={() => {
                            deletePhoto(accountState.userDetails?.uid || "");
                            sessionStorage.removeItem("account-photo");
                          }}
                        />
                      </Avatar>
                    )}
                  </Box>
                ) : (
                  <Skeleton
                    variant="circular"
                    sx={{ width: "8rem", height: "8rem" }}
                  />
                )}
                <Stack width="100%" gap={1} alignItems="center" mt={2}>
                  <PopupButton
                    sx={{
                      backgroundColor:
                        accountState.userDetails?.accentColour ?? "unset",
                      "&:hover": {
                        bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 10%)`,
                      },
                      color: "var(--mui-palette-text-primary)",
                    }}
                    startIcon={
                      <PhotoLibraryOutlined
                        sx={{ scale: 1.2, position: "relative", top: "0.1rem" }}
                      />
                    }
                    loading={isUploading}
                    variant="contained"
                    disableElevation
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";

                      input.onchange = async (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file && accountState.userDetails?.uid) {
                          uploadPhoto(accountState.userDetails.uid, file);
                        }
                      };

                      input.click();
                    }}
                  >
                    Upload from Device
                  </PopupButton>
                  <PopupButton
                    variant="text"
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          accountState.userDetails?.accentColour ?? "unset",
                        bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 10%)`,
                      },
                      color: "var(--mui-palette-text-primary)",
                    }}
                    onClick={() => {
                      dispatch({ page: "toggle-profile-dialog" });
                    }}
                  >
                    Done
                  </PopupButton>
                </Stack>
              </Stack>
            </StyledPopupBox>
          </Modal>
          <StyledList>
            <StyledListItemButton
              sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              disabled={isExternalProvider}
              onClick={() => {
                dispatch({ page: "toggle-profile-dialog" });
              }}
            >
              <ListItemIcon>
                <PhotoCameraOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Profile Picture"
                secondary={isExternalProvider && "Managed by Third-Party Login"}
              />
              <ListItemButton
                disableTouchRipple
                disableRipple
                sx={{
                  padding: 0,
                  display: "contents",
                }}
              >
                {!isUploading &&
                accountState.userDetails?.photo !== undefined ? (
                  <Avatar
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0.5rem",
                      backgroundColor:
                        accountState.userDetails?.accentColour ?? "#f4b98b",
                      bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "#f4b98b"}, white 60%)`,
                    }}
                    imgProps={{ referrerPolicy: "no-referrer" }}
                    src={
                      accountState.userDetails.photo == ""
                        ? undefined
                        : accountState.userDetails.photo
                    }
                  >
                    {accountState.userDetails.photo == "" && (
                      <AccountCircleOutlined
                        sx={{
                          width: "2rem",
                          height: "2rem",
                          color:
                            accountState.userDetails?.accentColour ?? "#824222",
                        }}
                      />
                    )}
                  </Avatar>
                ) : (
                  <Skeleton
                    variant="circular"
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0.5rem",
                    }}
                  />
                )}
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
                  defaultValue: accountState.userDetails?.name,
                  required: true,
                });
              }}
            >
              <ListItemIcon>
                <AccountBoxOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Name"
                secondary={showData(accountState.userDetails?.name)}
              />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Birthday",
                  description:
                    "This is used to provide automated greetings on your birthday. It is only visible to you and is an optional field.",
                  type: "date",
                  defaultValue:
                    accountState.userDetails.dateOfBirth == "" ||
                    accountState.userDetails.dateOfBirth == undefined
                      ? new Date().toISOString().split("T")[0]
                      : accountState.userDetails.dateOfBirth,
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <CakeOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Birthday"
                secondary={showData(accountState.userDetails?.dateOfBirth)}
              />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "University",
                  description:
                    "Your university is shown when printing your schedules. It is also visible to others if you have turned on schedule sharing. This is an optional field.",
                  type: "text",
                  defaultValue: accountState.userDetails?.university,
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <SchoolOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="University"
                secondary={showData(accountState.userDetails?.university)}
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
                  defaultValue: accountState.userDetails?.semester,
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <CalendarMonthOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Semester"
                secondary={showData(accountState.userDetails?.semester)}
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
                        <Circle
                          sx={{
                            color: `${accountState.userDetails?.accentColour?.toLowerCase() ?? "grey"} !important`,
                          }}
                        />
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
                    slotProps={{
                      paper: {
                        sx: {
                          "--mui-palette-background-paper":
                            accountState.userDetails?.accentColour ?? "grey",
                          bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "grey"}, black 50%)`,
                        },
                      },
                    }}
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
                        onClick={() => {
                          handleSubmitSettingsForm(
                            colour.charAt(0).toUpperCase() + colour.slice(1),
                            "accentColour",
                          );
                          dispatch({ page: "close-all-dropdowns" });
                        }}
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
              <StyledListItemText
                primary="Accent Colour"
                secondary={showData(accountState.userDetails?.accentColour)}
              />
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
                          key: 1,
                          element: document.activeElement as HTMLElement,
                        },
                      });
                    }}
                    label={showData(
                      accountState.userDetails?.wallpaper,
                      "3rem",
                    )}
                    onClick={(event) => {
                      dispatch({
                        page: "set-dropdown",
                        dropdownField: { key: 1, element: event.currentTarget },
                      });
                    }}
                  />
                  <Menu
                    slotProps={{
                      paper: {
                        sx: {
                          "--mui-palette-background-paper":
                            accountState.userDetails?.accentColour ?? "grey",
                          bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "grey"}, black 50%)`,
                        },
                      },
                    }}
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
                        onClick={() => {
                          handleSubmitSettingsForm(wallpaper, "wallpaper");
                          dispatch({ page: "close-all-dropdowns" });
                        }}
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
                    label={showData(accountState.userDetails?.game, "3rem")}
                    onClick={(event) => {
                      dispatch({
                        page: "set-dropdown",
                        dropdownField: { key: 2, element: event.currentTarget },
                      });
                    }}
                  />
                  <Menu
                    slotProps={{
                      paper: {
                        sx: {
                          "--mui-palette-background-paper":
                            accountState.userDetails?.accentColour ?? "grey",
                          bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "grey"}, black 50%)`,
                        },
                      },
                    }}
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
                        onClick={() => {
                          handleSubmitSettingsForm(game, "game");
                          dispatch({ page: "close-all-dropdowns" });
                        }}
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
              disabled={isExternalProvider}
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
                <KeyOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Change Password"
                secondary={isExternalProvider && "Managed by Third-Party Login"}
              />
            </StyledListItemButton>
            <StyledListItemButton
              sx={{
                borderBottom: "none",
                color: "red",
                borderBottomLeftRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
              disabled={
                accountState.userDetails?.uid === "NBH76id0H9gunlBAxynGWjsSomP2"
              }
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Delete Account",
                  description: `Deleting your account will remove all your data from AkashCraft. This action cannot be undone and you will be signed out immediately. Please type 'DELETE' to confirm.${!isExternalProvider ? " For security reasons, you will also need to enter your password to proceed." : ""}`,
                  type: "text",
                  defaultValue: "",
                  required: true,
                });
              }}
            >
              <ListItemIcon>
                <DeleteOutlined sx={{ ...IconStyle, color: "red" }} />
              </ListItemIcon>
              <StyledListItemText
                primary="Delete Account"
                secondary={
                  accountState.userDetails?.uid ===
                  "NBH76id0H9gunlBAxynGWjsSomP2"
                    ? "Cannot delete Administrator Account"
                    : ""
                }
              />
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
            {state.entryType == "password" && (
              <form id="password-form">
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
                    required
                    type={
                      state.passwordStates?.oldPassword ? "text" : "password"
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        letterSpacing: state.passwordStates?.oldPassword
                          ? "normal"
                          : "0.15rem !important",
                      },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderRadius: "1rem",
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
                    required
                    onChange={handlePasswordValidation}
                    inputProps={{ minLength: 8 }}
                    type={
                      state.passwordStates?.newPassword ? "text" : "password"
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        letterSpacing: state.passwordStates?.newPassword
                          ? "normal"
                          : "0.15rem !important",
                      },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderRadius: "1rem",
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
                    required
                    onChange={handlePasswordValidation}
                    inputProps={{ minLength: 8 }}
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
                      ".MuiOutlinedInput-notchedOutline": {
                        borderRadius: "1rem",
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
              </form>
            )}
            {state.entryHeader == "Delete Account" && !isExternalProvider && (
              <form id="password-form">
                <StyledFormControl
                  sx={{
                    margin: isPhone ? "2rem 0.5rem 0 0.5rem" : "1rem",
                    width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="old-password">Password</InputLabel>
                  <OutlinedInput
                    id="old-password"
                    required
                    type={
                      state.passwordStates?.oldPassword ? "text" : "password"
                    }
                    sx={{
                      ".MuiOutlinedInput-input": {
                        letterSpacing: state.passwordStates?.oldPassword
                          ? "normal"
                          : "0.15rem !important",
                      },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderRadius: "1rem",
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
                    label="Password"
                  />
                </StyledFormControl>
              </form>
            )}
            {state.entryType == "text" && (
              <form
                id="form-entry-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <SingleTextField
                  sx={{
                    margin: isPhone ? "2rem 0.5rem" : "1rem",
                    width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  }}
                  onChange={(event) => {
                    dispatch({
                      page: "set-entry-value",
                      setEntryValue: event.currentTarget.value,
                    });
                  }}
                  onKeyDownCapture={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      (
                        document.querySelector(
                          "#submit-button",
                        ) as HTMLInputElement
                      )?.click();
                    }
                  }}
                  autoComplete="off"
                  inputProps={{
                    maxLength: 60,
                    pattern:
                      state.entryHeader == "Delete Account"
                        ? "DELETE"
                        : undefined,
                    title:
                      state.entryHeader == "Delete Account"
                        ? "Please type DELETE to confirm account deletion."
                        : undefined,
                  }}
                  required={state.required}
                  name="form-entry-field"
                  label={
                    state.entryHeader == "Delete Account"
                      ? "Type DELETE to confirm"
                      : state.entryHeader
                  }
                  defaultValue={state.entryDefaultValue}
                />
              </form>
            )}
            {state.entryType == "date" && (
              <Box
                sx={{
                  width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  margin: isPhone ? "2rem 0.5rem" : "2rem 1rem",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledDatePicker
                    format="DD MMM YYYY"
                    defaultValue={dayjs(state.entryDefaultValue)}
                    label="Birthday"
                    name="form-entry-date"
                  />
                </LocalizationProvider>
              </Box>
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
                  color: "var(--mui-palette-text-primary)",
                }}
                onClick={() => {
                  dispatch({ page: "main" });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disableElevation
                id="submit-button"
                disabled={
                  state.entryHeader != "Birthday" &&
                  state.entryValue === (state.entryDefaultValue || "").trim()
                }
                loading={isSubmitting}
                onClick={() => {
                  if (
                    state.entryType == "text" &&
                    state.entryHeader != "Delete Account"
                  ) {
                    const form = document.getElementById(
                      "form-entry-form",
                    ) as HTMLFormElement | null;
                    if (form?.checkValidity()) {
                      const input = document.querySelector(
                        'input[name="form-entry-field"]',
                      ) as HTMLInputElement | null;
                      handleSubmitSettingsForm(
                        sanitize(
                          (input?.value.charAt(0).toUpperCase() || "") +
                            input?.value.slice(1),
                        ),
                      );
                    } else {
                      form?.reportValidity();
                    }
                  } else if (
                    state.entryType == "text" &&
                    state.entryHeader == "Delete Account"
                  ) {
                    const form = document.getElementById(
                      "password-form",
                    ) as HTMLFormElement | null;
                    const form2 = document.getElementById(
                      "form-entry-form",
                    ) as HTMLFormElement | null;
                    if (form?.checkValidity() && form2?.checkValidity()) {
                      const input = document.getElementById(
                        "old-password",
                      ) as HTMLInputElement | null;
                      deleteUserAccount(
                        accountState.userDetails?.uid || "",
                        accountState.userDetails?.email || "",
                        accountState.userDetails?.provider || "",
                        input?.value || "",
                      );
                    } else {
                      form?.reportValidity();
                      form2?.reportValidity();
                    }
                  } else if (state.entryType == "date") {
                    const input = document.querySelector(
                      'input[name="form-entry-date"]',
                    ) as HTMLInputElement | null;
                    const formattedDate = dayjs(input?.value).format(
                      "YYYY-MM-DD",
                    );
                    handleSubmitSettingsForm(formattedDate);
                  } else if (state.entryType == "password") {
                    const form = document.getElementById(
                      "password-form",
                    ) as HTMLFormElement | null;
                    if (form?.checkValidity()) {
                      const oldPasswordInput = document.getElementById(
                        "old-password",
                      ) as HTMLInputElement | null;
                      const newPasswordInput = document.getElementById(
                        "new-password",
                      ) as HTMLInputElement | null;
                      const confirmPasswordInput = document.getElementById(
                        "confirm-password",
                      ) as HTMLInputElement | null;
                      changeUserPassword(
                        accountState.userDetails?.email || "",
                        oldPasswordInput?.value || "",
                        newPasswordInput?.value || "",
                      );
                      oldPasswordInput!.value = "";
                      newPasswordInput!.value = "";
                      confirmPasswordInput!.value = "";
                    } else {
                      form?.reportValidity();
                    }
                  }
                }}
                sx={{
                  textTransform: "none",
                  borderRadius: "2rem",
                  fontSize: "1rem",
                  fontFamily: "Segoe UI",
                  color: "var(--mui-palette-text-primary)",
                  padding: "0.3rem 1.4rem 0.4rem 1.4rem",
                  backgroundColor: "var(--mui-palette-secondary-main)",
                  "&:hover": {
                    backgroundColor: "var(--mui-palette-secondary-light)",
                  },
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
      <Snackbar
        sx={{ bottom: isPhone ? "4.5rem" : "2rem" }}
        ContentProps={{
          sx: {
            fontFamily: "Segoe UI",
          },
        }}
        open={isSuccess}
        message={`${
          state.entryType == "password" ? "Password changed" : "Setting updated"
        } successfully`}
      />
      <Snackbar
        sx={{ bottom: isPhone ? "4.5rem" : "2rem" }}
        ContentProps={{
          sx: {
            fontFamily: "Segoe UI",
          },
        }}
        open={isError || uploadError !== null}
        message={errorMessage == "" ? "Error" : `Error - ${errorMessage}`}
      />
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

export const SingleTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "var(--mui-palette-text-primary)",
    fontFamily: "Segoe UI",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Segoe UI",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "1rem",
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.7)",
  },
});

export const StyledFormControl = styled(FormControl)({
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

export const StyledDropChip = styled(Chip)({
  ".MuiChip-label": {
    fontFamily: "Segoe UI",
  },
});

export const StyledPopupBox = styled(Box)({
  position: "absolute",
  width: "18rem",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "var(--mui-palette-background-light)",
  padding: "0 1rem",
  borderRadius: "1rem",
});

export const PopupButton = styled(Button)({
  textTransform: "none",
  borderRadius: "3rem",
  fontFamily: "Segoe UI",
  padding: "0.5rem 1.5rem",
  fontSize: "1rem",
  gap: 5,
  width: "90%",
});
