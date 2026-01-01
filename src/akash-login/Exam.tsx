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
import "dayjs/locale/en-gb";
import { StyledHeader } from "./Account";
import { StyledHeaderPaper } from "./AccountHeaderBox";
import ExamSchedule from "./ExamSchedule";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { useExamHooks } from "./AuthHooks";

export function Exam() {
  const isPhone = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const { accountState } = useContext(AccountContext);

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

  const {
    isSuccess,
    successText,
    isError,
    isSharing,
    errorMessage,
    setIsSharing,
    updateSharing,
    addExam,
    deleteExam,
  } = useExamHooks();

  useEffect(() => {
    if (accountState.userDetails?.examSharing !== undefined) {
      setIsSharing(accountState.userDetails.examSharing);
    }
  }, [accountState.userDetails?.examSharing, setIsSharing]);

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
                autoComplete="off"
                inputProps={{ style: { textTransform: "uppercase" } }}
              />
              <Box sx={{ width: isPhone ? "100%" : "48%", flexGrow: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StyledDatePicker
                    format="DD MMM YYYY"
                    name="date-picker"
                    label="Date"
                    disablePast
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: isPhone ? "100%" : "48%", flexGrow: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <StyledTimePicker
                    views={["hours", "minutes"]}
                    label="Start Time"
                    name="start-time-picker"
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ width: isPhone ? "100%" : "48%", flexGrow: 1 }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <StyledTimePicker
                    views={["hours", "minutes"]}
                    label="End Time"
                    name="end-time-picker"
                  />
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
                sx={{
                  color: accountState.userDetails?.accentColour,
                  border: `1px solid ${accountState.userDetails?.accentColour}`,

                  "&:hover": {
                    borderColor:
                      accountState.userDetails?.accentColour ?? "grey",
                    backgroundColor: `color-mix(in srgb, var(--mui-palette-background-button), transparent 80%)`,
                  },
                  "& p": {
                    color: accountState.userDetails?.accentColour,
                  },
                }}
                onClick={() => {
                  window.open(
                    `https://${window.location.host}/#/exam/${accountState.userDetails?.uid}?print`,
                    "_blank",
                  );
                }}
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
                  "&:hover": {
                    bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "unset"}, black 10%)`,
                  },
                  color: "var(--mui-palette-text-primary)",
                }}
                onClick={() => {
                  const courseInput = document.getElementById(
                    "exam-entry-field",
                  ) as HTMLInputElement | null;
                  const dateInput = document.querySelector(
                    'input[name="date-picker"]',
                  ) as HTMLInputElement | null;
                  const startTimeInput = document.querySelector(
                    'input[name="start-time-picker"]',
                  ) as HTMLInputElement | null;
                  const endTimeInput = document.querySelector(
                    'input[name="end-time-picker"]',
                  ) as HTMLInputElement | null;
                  addExam(
                    accountState.userDetails?.uid ?? "",
                    courseInput?.value ?? "",
                    dateInput?.value ?? "",
                    startTimeInput?.value ?? "",
                    endTimeInput?.value ?? "",
                  );
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
                  value={`https://${window.location.host}/#/exam/${accountState.userDetails?.uid}`}
                  disabled={!isSharing}
                />
              </StyledFormControl>
            ) : (
              <EmptyState
                header={isSharing === undefined ? "Loading" : "Not Available"}
                height="3.5rem"
              />
            )}
            <Stack
              direction="row-reverse"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginTop: "1rem" }}
            >
              <StyledDropChip
                disabled={isSharing === undefined}
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
                      updateSharing(
                        accountState.userDetails?.uid ?? "",
                        option === "Anyone with the link",
                      );
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
                sx={{
                  color: accountState.userDetails?.accentColour,
                  border: `1px solid ${accountState.userDetails?.accentColour}`,

                  "&:hover": {
                    borderColor:
                      accountState.userDetails?.accentColour ?? "grey",
                    backgroundColor: `color-mix(in srgb, var(--mui-palette-background-button), transparent 80%)`,
                  },
                  "& p": {
                    color: accountState.userDetails?.accentColour,
                  },
                  "&:disabled": {
                    "& p": {
                      color: `color-mix(in srgb, var(--mui-palette-background-buttondark), transparent 30%)`,
                    },
                  },
                }}
                disabled={!isSharing}
                onClick={() => {
                  const link = document.getElementById(
                    "sharing-link",
                  ) as HTMLInputElement | null;
                  if (link) navigator.clipboard.writeText(link.value);
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
            accountState={accountState}
            onEmpty={() => {
              navigate(`/account/exam`);
              window.scrollTo(0, 0);
            }}
            enableDelete
            onDelete={(examId: string) => {
              deleteExam(examId);
            }}
          />
        </StyledHeaderPaper>
      </Stack>
      <Snackbar
        sx={{ bottom: isPhone ? "4.5rem" : "2rem" }}
        ContentProps={{
          sx: {
            fontFamily: "Segoe UI",
          },
        }}
        open={isSuccess}
        message={successText}
      />
      <Snackbar
        sx={{ bottom: isPhone ? "4.5rem" : "2rem" }}
        ContentProps={{
          sx: {
            fontFamily: "Segoe UI",
          },
        }}
        open={isError}
        message={errorMessage}
      />
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
