import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import {
  Box,
  Stack,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  useColorScheme,
  useMediaQuery,
  styled,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Visibility,
  VisibilityOff,
  KeyOutlined,
  MarkEmailReadOutlined,
} from "@mui/icons-material";
import { auth } from "../akash-commons/firebaseHooks";
import { confirmPasswordReset, applyActionCode } from "firebase/auth";
import errorSound from "../assets/img-contact/error.mp3";
import successSound from "../assets/img-contact/success.mp3";

// Assets
import loading from "../assets/img-contact/Loading.mp4";
import loadingDark from "../assets/img-contact/LoadingDark.mp4";
import errorImg from "../assets/img-commons/error.png";
import {
  ContactWavesDark,
  ContactWavesLight,
} from "../akash-main/ContactWaves";

export function AuthHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mode: themeMode } = useColorScheme();
  const isLight = themeMode === "light";
  const isPhone = useMediaQuery("(max-width:1000px)");

  const initialized = useRef(false);

  // Firebase Parameters
  const mode = searchParams.get("mode");
  const actionCode = searchParams.get("oobCode");

  // State
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "form"
  >("loading");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!initialized.current) {
      initialized.current = true;

      if (!actionCode) {
        setStatus("error");
        setErrorMsg("Invalid Request");
        return;
      }

      if (mode === "verifyEmail") {
        handleVerifyEmail();
      } else if (mode === "resetPassword") {
        setStatus("form");
      } else {
        setStatus("error");
        setErrorMsg("Invalid Request");
      }
    }
  }, [mode, actionCode]);

  const handleVerifyEmail = async () => {
    try {
      await applyActionCode(auth, actionCode!);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg("Failed to verify email. The link may have expired.");
    }
  };

  const handleResetPassword = async () => {
    if (password.length < 8) return;
    setStatus("loading");
    try {
      await confirmPasswordReset(auth, actionCode!, password);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMsg("Failed to reset password. The link may have expired.");
    }
  };

  return (
    <>
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          zIndex: -1,
        }}
      >
        {isLight ? <ContactWavesLight /> : <ContactWavesDark />}
      </Box>

      <CenterBox
        flexDirection={isPhone ? "column" : "row"}
        sx={{
          height: isPhone ? "auto" : "90vh",
          padding: isPhone ? "1rem" : "0",
          margin: isPhone ? "1rem auto" : "5vh auto",
        }}
      >
        {status === "error" && (
          <audio autoPlay>
            <source src={errorSound} type="audio/mpeg" />
          </audio>
        )}
        {status === "success" && (
          <audio autoPlay>
            <source src={successSound} type="audio/mpeg" />
          </audio>
        )}
        {/* Left Side: Visuals */}
        <Stack
          width={isPhone ? "100%" : "50%"}
          justifyContent="center"
          alignItems="center"
        >
          {status === "loading" && (
            <video
              src={isLight ? loading : loadingDark}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "15rem" }}
            />
          )}

          {status === "form" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isPhone ? 1.5 : 2.5 }}
            >
              <KeyOutlined sx={{ color: "primary.main", fontSize: "5rem" }} />
            </motion.div>
          )}

          {status === "success" && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              {mode === "verifyEmail" ? (
                <MarkEmailReadOutlined
                  sx={{
                    color: "success.main",
                    fontSize: isPhone ? "6rem" : "10rem",
                  }}
                />
              ) : (
                <KeyOutlined
                  sx={{
                    color: "success.main",
                    fontSize: isPhone ? "6rem" : "10rem",
                  }}
                />
              )}
            </motion.div>
          )}

          {status === "error" && (
            <motion.img
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              src={errorImg}
              style={{
                width: isPhone ? "50%" : "15rem",
                maxWidth: "15rem",
              }}
            />
          )}
        </Stack>

        {/* Right Side: Content & Actions */}
        <Stack
          width={isPhone ? "100%" : "50%"}
          justifyContent="center"
          alignItems={isPhone ? "center" : "flex-start"}
          spacing={2}
          mt={isPhone ? 2 : 0}
        >
          <h1
            style={{
              fontSize: isPhone ? "1.5rem" : "2rem",
              margin: 0,
              textAlign: "left",
              width: "100%",
            }}
          >
            {status === "loading" && "Processing..."}
            {status === "form" && "Reset Password"}
            {status === "success" &&
              (mode === "verifyEmail" ? "Email Verified" : "Password Updated")}
            {status === "error" && "Error"}
          </h1>
          <p
            style={{
              maxWidth: "30rem",
            }}
          >
            {status === "loading" && "Hang tight!"}
            {status === "form" &&
              "Please enter a new password to regain access to your account"}
            {status === "success" &&
              (mode === "verifyEmail"
                ? "You may now sign in to your AkashCraft account"
                : "You may now sign in with your new password")}
            {status === "error" && errorMsg}
          </p>

          {status === "form" && (
            <form
              id="reset-password-form"
              style={{ width: "100%", maxWidth: "25rem", marginTop: "2rem" }}
            >
              <StyledHolder>
                <p>Enter new password</p>
                <FormControl variant="standard" fullWidth>
                  <InputBase
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
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
                    inputProps={{ minLength: 8 }}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={InputBaseStyle(showPassword, password !== "")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </StyledHolder>
            </form>
          )}

          {/* Bottom Right Placement */}
          <SubmitStack
            sx={{
              position: isPhone ? "static" : "absolute",
              width: isPhone ? "100%" : "auto",
              justifyContent: isPhone ? "flex-end" : "flex-end",
            }}
          >
            {status === "form" && (
              <SubmitButton
                variant="text"
                onClick={() => navigate("/login")}
                sx={{
                  color: "var(--mui-palette-primary-main)",
                }}
              >
                Cancel
              </SubmitButton>
            )}
            <SubmitButton
              sx={{
                marginTop: isPhone ? 4 : 0,
                minWidth: "8rem",
              }}
              id="submit-button"
              variant="contained"
              onClick={() => {
                if (status === "form") handleResetPassword();
                else navigate("/login");
              }}
              loading={status === "loading"}
            >
              {status === "form"
                ? "Reset"
                : status === "error"
                  ? "Try Again"
                  : "Continue"}
            </SubmitButton>
          </SubmitStack>
        </Stack>
      </CenterBox>
    </>
  );
}

const CenterBox = styled(Stack)({
  position: "relative",
  width: "90%",
  fontFamily: "Segoe UI",
  backgroundColor: "var(--mui-palette-background-macosfinder2)",
  color: "var(--mui-palette-text-secondary)",
  borderRadius: "0.5rem",
  overflow: "hidden",
});

const StyledHolder = styled(Stack)({
  gap: "0.4rem",
  flexDirection: "column",
  p: { margin: "0" },
});

const SubmitStack = styled(Stack)({
  flexDirection: "row",
  bottom: "2rem",
  right: "2rem",
  gap: "1rem",
});

const SubmitButton = styled(Button)({
  fontFamily: "Segoe UI",
  textTransform: "none",
  fontSize: "1rem",
  color: "white",
});

const InputBaseStyle = (showPassword: boolean, isTyped: boolean) => ({
  padding: "0.5rem",
  borderRadius: "0.25rem",
  fontFamily: "Segoe UI",
  fontSize: "1rem",
  height: "2.5rem",
  letterSpacing: showPassword || !isTyped ? "normal" : "0.15rem",
  backgroundColor: "var(--mui-palette-background-macosfinder)",
  color: "var(--mui-palette-text-secondary)",
  "&:-webkit-autofill": {
    WebkitBoxShadow:
      "0 0 0px 1000px var(--mui-palette-background-macosfinder) inset !important",
  },
});
