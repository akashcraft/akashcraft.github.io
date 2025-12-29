import {
  ArrowBackOutlined,
  CampaignOutlined,
  FlightOutlined,
  LinkOutlined,
  PersonOutlined,
  ReplayOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  styled,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { StyledHeader, StyledListItemText } from "./Account";
import { useEffect, useReducer } from "react";
import { motion } from "framer-motion";

type SettingsState = {
  selectedPage: string;
  entryHeader?: string;
  entryDescription?: string;
  entryType?: string;
  entryDefaultValue?: string;
  required?: boolean;
  settingsScroll?: number;
};

type SettingsAction = {
  page: string;
  header?: string;
  defaultValue?: string;
  description?: string;
  type?: string;
  required?: boolean;
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
      };
    case "main":
      window.scrollTo(0, state.settingsScroll || 0);
      return { ...state, selectedPage: "settings-main" };
    default:
      return state;
  }
};

export default function Admin() {
  const isPhone = useMediaQuery("(max-width:800px)");
  const [state, dispatch] = useReducer(settingsReducer, {
    selectedPage: "settings-main",
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
          <StyledHeader>Admin</StyledHeader>
          <StyledList>
            <StyledListItemButton
              sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Private Announcement",
                  description:
                    "This is the announcement displayed on the account page when logged in. Leave it blank to remove any announcements.",
                  type: "text",
                  defaultValue: "",
                });
              }}
            >
              <ListItemIcon>
                <CampaignOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Private Announcement"
                secondary="Not Set"
              />
            </StyledListItemButton>
            <StyledListItemButton
              sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Public Announcement",
                  description:
                    "This is the announcement displayed on the landing page regardless of login status. Leave it blank to remove any announcements.",
                  type: "text",
                  defaultValue: "",
                });
              }}
            >
              <ListItemIcon>
                <CampaignOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary="Public Announcement"
                secondary="Not Set"
              />
            </StyledListItemButton>
            <StyledListItemButton
              sx={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "About Me",
                  description:
                    "This is the text displayed under the About Me section on the landing page. Leave it blank to remove the section.",
                  type: "text",
                  defaultValue: "",
                });
              }}
            >
              <ListItemIcon>
                <PersonOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="About Me" secondary="Not Set" />
            </StyledListItemButton>
            <StyledListItemButton
              onClick={() => {
                dispatch({
                  page: "form-entry",
                  header: "Links",
                  description:
                    "Use the fields below to add links. They are visible to all logged in users. To remove a link, go to the Links section and delete it from there.",
                  type: "text",
                  defaultValue: "",
                  required: false,
                });
              }}
            >
              <ListItemIcon>
                <LinkOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Links" secondary="" />
            </StyledListItemButton>
            <StyledListItem
              sx={{ borderBottom: "none" }}
              secondaryAction={
                <StyledDropChip
                  icon={<ReplayOutlined sx={{ color: "white !important" }} />}
                  label="Reset"
                />
              }
            >
              <ListItemIcon>
                <FlightOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText primary="Reset Airport Schedules" />
            </StyledListItem>
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
                  state.entryHeader == "Links"
                    ? "Link Header"
                    : state.entryHeader
                }
                defaultValue={state.entryDefaultValue}
              />
            )}
            {state.entryHeader == "Links" && (
              <>
                <SingleTextField
                  sx={{
                    margin: isPhone ? "2rem 0.5rem" : "1rem",
                    width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  }}
                  id="form-entry-field-2"
                  label="Link Description"
                />
                <SingleTextField
                  sx={{
                    margin: isPhone ? "2rem 0.5rem" : "1rem",
                    width: isPhone ? "calc(100% - 1rem)" : "calc(100% - 2rem)",
                  }}
                  id="form-entry-field-3"
                  label="Link URL"
                />
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
                {state.entryHeader == "Links" ? "Add" : "Save"}
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

const StyledDropChip = styled(Chip)({
  ".MuiChip-label": {
    fontFamily: "Segoe UI",
  },
});
