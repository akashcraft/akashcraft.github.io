import { Box, Button, Container, Stack, styled } from "@mui/material";
import { openGitHub, openLinkedIn, openYouTube } from "../akash-commons/Utils";
import { useNavigate } from "react-router";
import background from "../assets/img-contact/background.jpg";
import setupLogo from "../assets/img-contact/installicon.png";
import windowLogo from "../assets/img-contact/windowslogo.png";
import { Close } from "@mui/icons-material";
import { useContactSubmit, useGetImages } from "../akash-commons/Hooks";
import winLoad from "../assets/img-contact/winloading.gif";
import errorSound from "../assets/img-contact/error-legacy.mp3";
import successSound from "../assets/img-contact/success.mp3";
const sanitize = (value: string): string => {
  return value
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");
};

function Contact() {
  const navigate = useNavigate();
  const isLoading = useGetImages([background, setupLogo, windowLogo, winLoad]);

  const handleSubmit = () => {
    const nameInput = document.querySelector(
      'input[name="name"]',
    ) as HTMLInputElement | null;

    const emailInput = document.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement | null;

    const messageInput = document.querySelector(
      'textarea[name="message"]',
    ) as HTMLTextAreaElement | null;

    const data = {
      name: sanitize(nameInput?.value ?? ""),
      email: sanitize(emailInput?.value ?? ""),
      message: sanitize(messageInput?.value ?? ""),
    };

    submitContactForm(data);
  };

  const { isSubmitting, isError, isSuccess, submitContactForm } =
    useContactSubmit();

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=0.5" />
      {isError && (
        <audio autoPlay>
          <source src={errorSound} type="audio/mpeg" />
        </audio>
      )}
      {isSuccess && (
        <audio autoPlay>
          <source src={successSound} type="audio/mpeg" />
        </audio>
      )}
      <img
        src={background}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          objectFit: "cover",
          zIndex: -1,
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.25s ease-in-out",
        }}
      />
      {!isSubmitting || isSuccess ? (
        <CenterBox
          sx={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.25s ease-in-out",
          }}
        >
          <StyledButton
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              position: "absolute",
              top: "2.9rem",
              right: "0.5rem",
              scale: 0.8,
              color: "red",
            }}
          >
            <Close sx={{ color: "white", fontWeight: "bold" }} />
          </StyledButton>
          <Stack
            flexGrow={2}
            alignItems="center"
            sx={{
              fontSize: "smaller",
              backgroundColor: "white",
              margin: "0.2rem",
            }}
          >
            <Stack
              direction="row"
              alignItems="flex-end"
              sx={{
                width: "100%",
                backgroundColor: "#bcd0e6",
                padding: "0.5rem 1rem",
                paddingTop: "3rem",
              }}
              spacing={1}
            >
              <img
                src={setupLogo}
                style={{
                  width: "1rem",
                  position: "relative",
                  bottom: "0.1rem",
                }}
              />
              <p>Windows Setup</p>
            </Stack>
            <br />
            <br />
            <Stack flexDirection="row" gap={1.5}>
              <img src={windowLogo} style={{ width: "15rem" }} />
              <h1
                style={{
                  margin: "0",
                  fontWeight: "100",
                  position: "relative",
                  top: "0.7rem",
                }}
              >
                AkashCraft
              </h1>
            </Stack>
            {(isSuccess || isError) && <Box flexGrow={1} />}
            <p>
              {!isSuccess &&
                !isError &&
                "If you have a question or just want to say hi, feel free to reach out!"}
              {isSuccess &&
                "Message sent successfully. Thank you for reaching out! "}
              {isError && "Something went wrong. But you can try again."}
            </p>
            {!isSuccess && !isError && (
              <form
                id="contact-form"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "24.4rem",
                }}
              >
                <Stack flexDirection="row" alignContent="center" gap={2}>
                  <StyledHolder>
                    <p>Type your name</p>
                    <StyledInput
                      required
                      onChange={(e) => {
                        sessionStorage.setItem("name", e.target.value);
                      }}
                      type="text"
                      name="name"
                      placeholder="Name"
                      defaultValue={sessionStorage.getItem("name") ?? ""}
                    />
                  </StyledHolder>
                  <StyledHolder>
                    <p>Type your email</p>
                    <StyledInput
                      required
                      onChange={(e) => {
                        sessionStorage.setItem("email", e.target.value);
                      }}
                      type="email"
                      name="email"
                      placeholder="Email"
                      defaultValue={sessionStorage.getItem("email") ?? ""}
                    />
                  </StyledHolder>
                </Stack>
                <StyledHolder>
                  <p>Type your message</p>
                  <StyledTextarea
                    required
                    onChange={(e) => {
                      sessionStorage.setItem("message", e.target.value);
                    }}
                    name="message"
                    placeholder="Message"
                    defaultValue={sessionStorage.getItem("message") ?? ""}
                  ></StyledTextarea>
                </StyledHolder>
              </form>
            )}
            <Box flexGrow={1} />
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                height: "6rem",
                width: "100%",
              }}
            />
            <Stack
              alignItems="center"
              gap={0.5}
              sx={{ position: "absolute", bottom: "2rem" }}
            >
              <p style={{ margin: 0 }}>More ways to connect</p>
              <Stack direction="row" spacing={1}>
                <LegacyHyperLink onClick={openGitHub}>GitHub</LegacyHyperLink>
                <LegacyHyperLink onClick={openLinkedIn}>
                  LinkedIn
                </LegacyHyperLink>
                <LegacyHyperLink onClick={openYouTube}>YouTube</LegacyHyperLink>
              </Stack>
            </Stack>
          </Stack>
          <SwitchStack>
            {isError && (
              <SubmitButton
                disableFocusRipple
                disableElevation
                disableTouchRipple
                disableRipple
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.reload();
                }}
              >
                Try Again
              </SubmitButton>
            )}
            {!(isSuccess || isError) && (
              <LegacyHyperLink
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Fancy the Modern UI?
              </LegacyHyperLink>
            )}
          </SwitchStack>
          <SubmitStack>
            {!isSuccess && (
              <LegacyHyperLink
                onClick={() => {
                  sessionStorage.removeItem("name");
                  sessionStorage.removeItem("email");
                  sessionStorage.removeItem("message");
                  navigate("/");
                }}
                sx={{
                  color: "var(--mui-palette-primary-main)",
                }}
              >
                Cancel
              </LegacyHyperLink>
            )}
            <SubmitButton
              disableFocusRipple
              disableElevation
              disableTouchRipple
              disableRipple
              variant="contained"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (isSuccess || isError) {
                  sessionStorage.removeItem("name");
                  sessionStorage.removeItem("email");
                  sessionStorage.removeItem("message");
                  navigate("/");
                } else {
                  const form = document.getElementById(
                    "contact-form",
                  ) as HTMLFormElement | null;
                  if (form?.checkValidity()) {
                    handleSubmit();
                  } else {
                    form?.reportValidity();
                  }
                }
              }}
            >
              {isSuccess || isError ? "Finish" : "Send Message"}
            </SubmitButton>
          </SubmitStack>
        </CenterBox>
      ) : (
        <Container>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={2}
            sx={{
              fontFamily: "Segoe UI",
              color: "var(--mui-palette-text-primary)",
              fontSize: "1.3rem",
              textShadow: "0 0 5px rgba(0,0,0,0.75)",
            }}
          >
            <img
              src={winLoad}
              style={{ width: "1.7rem", position: "relative", top: "1px" }}
            />
            Submitting your message
          </Stack>
        </Container>
      )}
    </>
  );
}

export default Contact;

const StyledButton = styled(Button)({
  fontFamily: "Segoe UI",
  textTransform: "none",
  fontSize: "13px",
  height: "26px",
  padding: "0 18px",
  color: "#ffffff",
  borderRadius: "4px",
  background:
    "linear-gradient(to bottom, #ff6a64 0%, #e0433a 38%, #c6352f 100%)",
  border: "1px solid #9a2a26",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), 0 1px 1px rgba(0,0,0,0.2)",
  cursor: "pointer",

  "&:hover": {
    background:
      "linear-gradient(to bottom, #ff7a74 0%, #e84d45 38%, #d23b34 100%)",
  },
});

const LegacyHyperLink = styled("a")({
  fontFamily: "Segoe UI",
  fontSize: "small",
  color: "var(--mui-palette-primary-main)",
  textDecoration: "underline",
  cursor: "pointer",
});

const SubmitButton = styled(Button)({
  fontFamily: "Segoe UI",
  textTransform: "none",
  fontSize: "13px",
  height: "26px",
  padding: "0 18px",
  color: "#000",
  borderRadius: "4px",
  background:
    "linear-gradient(to bottom, #fefefe 0%, #e6e6e6 38%, #d2d2d2 10%)",
  border: "1px solid #a7a7a7",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.9), " + "0 1px 1px rgba(0,0,0,0.15)",

  cursor: "pointer",

  "&:hover": {
    background:
      "linear-gradient(to bottom, #ffffff 0%, #ebebeb 38%, #d9d9d9 10%)",
  },

  "&:active": {
    background:
      "linear-gradient(to bottom, #d9d9d9 0%, #ebebeb 62%, #ffffff 10%)",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)",
    position: "relative",
    top: "1px",
  },
});

const SubmitStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "flex-end",
  position: "absolute",
  bottom: "2rem",
  right: "2rem",
  gap: "1rem",
});

const SwitchStack = styled(Stack)({
  flexDirection: "row",
  position: "absolute",
  bottom: "2rem",
  left: "2rem",
  gap: "1rem",
});

const StyledHolder = styled(Stack)({
  gap: "0.2rem",
  flexGrow: 1,
  flexDirection: "column",
  p: {
    margin: "0",
    fontSize: "small",
  },
});

const StyledInput = styled("input")({
  padding: "0.25rem",
  border: "1px solid grey",
  fontFamily: "Segoe UI",
  fontSize: "small",
  height: "1.5rem",
  backgroundColor: "white",
  color: "black",
  "&:active, &:focus": {
    outline: "1px solid var(--mui-palette-primary-main)",
  },
  "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
    WebkitBoxShadow:
      "0 0 0px 1000px var(--mui-palette-background-macosfinder) inset !important",
    boxShadow:
      "0 0 0px 1000px var(--mui-palette-background-macosfinder) inset !important",
    WebkitTextFillColor: "var(--mui-palette-text-secondary) !important",
  },
});

const StyledTextarea = styled("textarea")({
  padding: "0.25rem",
  border: "1px solid grey",
  fontFamily: "Segoe UI",
  fontSize: "small",
  backgroundColor: "white",
  color: "black",
  resize: "none",
  height: "8rem",
  "&:active, &:focus": {
    outline: "1px solid var(--mui-palette-primary-main)",
  },
  "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
    WebkitBoxShadow:
      "0 0 0px 1000px var(--mui-palette-background-macosfinder) inset !important",
    boxShadow:
      "0 0 0px 1000px var(--mui-palette-background-macosfinder) inset !important",
    WebkitTextFillColor: "var(--mui-palette-text-secondary) !important",
  },
});

const CenterBox = styled(Stack)({
  position: "relative",
  height: "35rem",
  width: "45rem",
  margin: "auto",
  flexDirection: "row",
  fontFamily: "Segoe UI",
  backgroundColor: "#bcd0e6",
  color: "black",
  borderRadius: "0.5rem",
  borderBottomRightRadius: "0rem",
  borderBottomLeftRadius: "0rem",
  boxShadow:
    "0 4px 6px rgba(0, 0, 0, 0.3), 0 -4px 6px rgba(255, 255, 255, 0.1) inset",
});
