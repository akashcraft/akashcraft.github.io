import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  OutlinedInput,
  Snackbar,
  Stack,
  styled,
  useMediaQuery,
} from "@mui/material";
import { StyledHeader } from "./Account";
import { StyledHeaderPaper } from "./AccountHeaderBox";
import ExamSchedule from "./ExamSchedule";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  AddOutlined,
  ArrowDropDown,
  LinkOutlined,
  LockOutlined,
  PrintOutlined,
  PublicOutlined,
} from "@mui/icons-material";
import { SingleTextField, StyledDropChip, StyledFormControl } from "./Settings";
import EmptyState from "./EmptyState";
import { StyledDatePicker, StyledTimePicker } from "./Pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AccountContext } from "./AccountContext";

export function Exam() {
  const isPhone = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState<boolean>(true);
  const [isSnackBarOpen, setSnackBarOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement> | HTMLElement) => {
    if (event instanceof HTMLElement) {
      setAnchorEl(event);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { accountState } = useContext(AccountContext);

  return (
    <>
      <StyledHeader>Exam Schedule</StyledHeader>
      <Stack direction={isPhone ? "column" : "row"} gap={2}>
        <Stack
          gap={2}
          sx={{
            flexGrow: 1,
            minWidth: isPhone ? "100%" : "50%",
            height: "min-content",
          }}
        >
          <StyledHeaderPaper
            elevation={0}
            sx={{
              minWidth: "100%",
              padding: "1rem",
              height: "min-content",
            }}
          >
            <h3 style={{ margin: "0 0 1rem 0" }}>Add Exam</h3>
            <Stack
              direction={isPhone ? "column" : "row"}
              gap={2}
              flexWrap="wrap"
              mb={2.5}
            >
              <SingleTextField
                sx={{ width: isPhone ? "100%" : "48%", flexGrow: 1 }}
                required
                id="exam-entry-field"
                label="Course Name"
              />
              <Box sx={{ width: isPhone ? "100%" : "48%", flexGrow: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledDatePicker format="DD/MM/YYYY" label="Date" />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: isPhone ? "100%" : "48%", flexGrow: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledTimePicker format="HH:mm" label="Start Time" />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: isPhone ? "100%" : "48%", flexGrow: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledTimePicker format="HH:mm" label="End Time" />
                </LocalizationProvider>
              </Box>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginTop: "1rem" }}
            >
              <ControlButton
                variant="outlined"
                startIcon={<PrintOutlined sx={{ color: "inherit" }} />}
              >
                <p
                  style={{ margin: 0, position: "relative", bottom: "0.07rem" }}
                >
                  Print
                </p>
              </ControlButton>
              <ControlButton
                variant="contained"
                disableElevation
                startIcon={<AddOutlined sx={{ color: "inherit" }} />}
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
              >
                <p
                  style={{ margin: 0, position: "relative", bottom: "0.07rem" }}
                >
                  Add
                </p>
              </ControlButton>
            </Stack>
          </StyledHeaderPaper>
          <StyledHeaderPaper
            elevation={0}
            sx={{
              minWidth: "100%",
              padding: "1rem",
              height: "min-content",
            }}
          >
            <h3 style={{ margin: "0 0 1rem 0" }}>Sharing</h3>
            {isSharing ? (
              <StyledFormControl
                sx={{
                  margin: 0,
                  width: "100%",
                }}
                variant="outlined"
              >
                <OutlinedInput
                  id="sharing-link"
                  type="text"
                  sx={{
                    borderRadius: "1rem",
                    padding: "0 0.5rem",
                  }}
                  value="https://akashcraft.ca/#/account/exam/demo-link"
                  disabled={!isSharing}
                />
              </StyledFormControl>
            ) : (
              <EmptyState header="Not Available" height="3.5rem" />
            )}
            <Stack
              direction="row-reverse"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginTop: "1rem" }}
            >
              <StyledDropChip
                icon={
                  <Avatar
                    sx={{
                      backgroundColor: isSharing ? "#9dfba0ff" : "#696969ff",
                      borderRadius: "3rem",
                      height: "2rem",
                      width: "2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    {isSharing ? (
                      <PublicOutlined sx={{ color: "green !important" }} />
                    ) : (
                      <LockOutlined sx={{ color: "white !important" }} />
                    )}
                  </Avatar>
                }
                sx={{
                  height: "3rem",
                  borderRadius: "3rem",
                  padding: "0 0.25rem",
                }}
                deleteIcon={
                  <ArrowDropDown
                    sx={{
                      fontSize: "1.25rem",
                      color: "white !important",
                    }}
                  />
                }
                onDelete={() => {
                  handleClick(document.activeElement as HTMLElement);
                }}
                label={isSharing ? "Anyone with the link" : "Restricted"}
                onClick={(event) => {
                  handleClick(event);
                }}
              />
              <Menu
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      "--mui-palette-background-paper":
                        accountState.userDetails?.accentColour ?? "grey",
                      bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "grey"}, black 50%)`,
                    },
                  },
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "1.25rem",
                  },
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                  handleClose();
                }}
              >
                {["Restricted", "Anyone with the link"].map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => {
                      setIsSharing(option === "Anyone with the link");
                      handleClose();
                    }}
                    sx={{
                      "&.MuiMenuItem-root": {
                        fontFamily: "Segoe UI",
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
              <ControlButton
                variant="outlined"
                startIcon={<LinkOutlined sx={{ color: "inherit" }} />}
                disabled={!isSharing}
                onClick={() => {
                  setSnackBarOpen(true);
                }}
              >
                <p
                  style={{ margin: 0, position: "relative", bottom: "0.07rem" }}
                >
                  {isPhone ? "Copy" : "Copy Link"}
                </p>
              </ControlButton>
              <Snackbar
                sx={{
                  bottom: isPhone ? "4.5rem" : "2rem",
                }}
                ContentProps={{
                  sx: {
                    fontFamily: "Segoe UI",
                  },
                }}
                open={isSnackBarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackBarOpen(false)}
                message="Copied to Clipboard"
              />
            </Stack>
          </StyledHeaderPaper>
        </Stack>
        <StyledHeaderPaper
          elevation={0}
          sx={{
            flexGrow: 1,
            minWidth: isPhone ? "100%" : "50%",
            marginBottom: isPhone ? "2rem" : 0,
            padding: "1rem",
            height: "100%",
          }}
        >
          <ExamSchedule
            onEmpty={() => {
              navigate(`/account/exam`);
              window.scrollTo(0, 0);
            }}
          />
        </StyledHeaderPaper>
      </Stack>
    </>
  );
}

export const ControlButton = styled(Button)({
  textTransform: "none",
  borderRadius: "3rem",
  fontFamily: "Segoe UI",
  padding: "0.5rem 1.5rem",
  fontSize: "0.9rem",
  gap: 1,
  width: "fit-content",
});
