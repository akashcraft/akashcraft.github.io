import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  useColorScheme,
  useMediaQuery,
  type TooltipProps,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectFade, Autoplay } from "swiper/modules";
import loading from "../assets/img-contact/Loading.mp4";
import loadingDark from "../assets/img-contact/LoadingDark.mp4";
import error from "../assets/img-commons/error.png";
import errorSound from "../assets/img-contact/error.mp3";
import successSound from "../assets/img-contact/success.mp3";
import { motion } from "framer-motion";
import {
  Close,
  Google,
  AccountCircleOutlined,
  CalendarMonthOutlined,
  BrushOutlined,
  VisibilityOff,
  Visibility,
  MoneyOffOutlined,
  EmailOutlined,
  KeyOutlined,
  CheckCircleOutlineOutlined,
  GitHub,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import {
  ContactWavesDark,
  ContactWavesLight,
} from "../akash-main/ContactWaves";
import welcome1 from "../assets/img-account/welcome1.png";
import welcome2 from "../assets/img-account/welcome2.png";
import welcome3 from "../assets/img-account/welcome3.png";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { useLoginSubmit } from "./AuthHooks";
import { useGetImages } from "../akash-commons/Hooks";

const sanitize = (value: string): string => {
  return value
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");
};

const slideContent = [
  {
    title: "Exam and Class Schedules",
    description: "Create, manage, and share your academic calendar with ease",
    icon: <CalendarMonthOutlined />,
  },
  {
    title: "No Ads and No Frills",
    description: "Access member links and other DLC content at no cost ad-free",
    icon: <MoneyOffOutlined />,
  },
  {
    title: "Extensive Personalization",
    description: "Make it your own with themes and wallpapers",
    icon: <BrushOutlined />,
  },
];

const getErrorText = (statusCode: number): string => {
  const errorMessages: Record<number, string> = {
    400: "Incorrect Credentials Entered",
    401: "Unauthorized",
    403: "Account Disabled",
    404: "Email Verification Pending",
    409: "Account Already Exists",
    410: "Authorization Denied",
    500: "Server Error",
    503: "Service Unavailable",
  };
  return errorMessages[statusCode] || "Something went wrong";
};

const getErrorSubText = (statusCode: number): string => {
  const errorMessages: Record<number, string> = {
    400: "Please check your credentials and try again",
    401: "You are not authorized to access this service. Please contact an administrator.",
    403: "Your account has been disabled. Please contact an administrator.",
    404: "Please verify your email before logging in. Check your inbox for a verification email.",
    409: "An account with that email already exists. Please use a different email or provider.",
    410: "You have rejected the authorization request from AkashCraft",
    500: "Internal server error occurred. Please try again later.",
    503: "This service is currently unavailable. Please try again later.",
  };
  return errorMessages[statusCode] || "But you can try again";
};

function Login() {
  const { mode } = useColorScheme();
  const isLight = mode === "light";
  const navigate = useNavigate();
  const isPhone = useMediaQuery("(max-width:1000px)");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPasswordTyped, setIsPasswordTyped] = useState<boolean>(false);
  const [isPasswordForgotten, setIsPasswordForgotten] =
    useState<boolean>(false);
  const [isLoginPage, setIsLoginPage] = useState<boolean>(
    localStorage.getItem("loggedIn") === "true",
  );
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSubmit = () => {
    const nameInput = document.querySelector(
      'input[name="name"]',
    ) as HTMLInputElement | null;

    const emailInput = document.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement | null;

    const passwordInput = document.querySelector(
      'input[name="password"]',
    ) as HTMLInputElement | null;

    const data = {
      name: sanitize(nameInput?.value ?? ""),
      email: sanitize(emailInput?.value ?? ""),
      password: passwordInput?.value ?? "",
    };

    submitLoginForm(data);
  };

  const {
    isSubmitting,
    isError,
    isSuccess,
    statusCode,
    submitLoginForm,
    signInWithGoogle,
    signInWithGitHub,
  } = useLoginSubmit();

  const isLoading = useGetImages([welcome1, welcome2, welcome3, logo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
        {isLight ? <ContactWavesLight /> : <ContactWavesDark />}
      </Box>
      <CenterBox
        flexDirection={
          !isPhone
            ? "row"
            : isLoginPage || isSubmitting || isSuccess || isError
              ? "column"
              : "column-reverse"
        }
        sx={{
          height: isPhone ? "auto" : "90vh",
          padding: isPhone ? "2rem 1rem" : "0",
          margin: isPhone ? "1rem auto" : "none",
          transition: "opacity 0.25s ease-in-out",
        }}
      >
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!(isSubmitting || isPhone) && (
          <StyledTooltip title="Close" placement="top">
            <CircularButton
              variant="text"
              onClick={() => {
                sessionStorage.setItem("homeScroll", "0");
                navigate("/");
              }}
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                scale: isPhone ? 0.8 : 1,
                color: "red",
              }}
            >
              <Close />
            </CircularButton>
          </StyledTooltip>
        )}
        <Stack
          flexDirection={isPhone && isLoginPage ? "row" : "column"}
          width={isPhone ? "100%" : "50%"}
          justifyContent="center"
          alignItems="center"
        >
          {isPhone && (
            <h1
              style={{
                fontSize: isPhone ? "1.5rem" : "2rem",
                marginTop: "3rem",
                marginBottom: "0rem",
                marginLeft: "0.5rem",
              }}
            >
              {!(
                isSubmitting ||
                isSuccess ||
                isError ||
                isLoading ||
                isLoginPage
              ) && "Why create an account?"}
            </h1>
          )}
          {!(
            isSubmitting ||
            isSuccess ||
            isError ||
            isLoading ||
            isLoginPage
          ) && (
            <>
              <StyledSwiper
                modules={[EffectFade, Autoplay]}
                fadeEffect={{ crossFade: true }}
                effect="fade"
                slidesPerView={1}
                speed={1000}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                style={{
                  display: isLoading ? "none" : "block",
                  width: isPhone ? "95%" : "80%",
                  height: "auto",
                  aspectRatio: "16/9",
                  marginBottom: "1rem",
                }}
              >
                {[welcome1, welcome2, welcome3].map((src, index) => (
                  <SwiperSlide key={index} style={{ height: "auto" }}>
                    <StyledImg
                      src={src}
                      style={{ display: isLoading ? "none" : "block" }}
                    />
                  </SwiperSlide>
                ))}
              </StyledSwiper>
              <List sx={{ width: isPhone ? "95%" : "81%" }}>
                {slideContent.map((item, index) => (
                  <ListItemButton
                    key={index}
                    sx={{
                      filter:
                        index === activeIndex ? "none" : "grayscale(100%)",
                      opacity: index === activeIndex ? 1 : 0.6,
                      borderRadius: "5rem",
                    }}
                    onClick={() => {
                      setActiveIndex(index);
                      swiperRef.current?.slideToLoop(index);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#f4b98b" }}>{item.icon}</Avatar>
                    </ListItemAvatar>
                    <StyledListItemText
                      primary={item.title}
                      secondary={item.description}
                    />
                  </ListItemButton>
                ))}
              </List>
            </>
          )}
          {(isSubmitting || isLoading) && (
            <video
              src={isLight ? loading : loadingDark}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: isPhone ? "50%" : "15rem",
                maxWidth: "15rem",
                marginBottom: "1.5rem",
              }}
            />
          )}
          {!(
            isSubmitting ||
            isSuccess ||
            isError ||
            isLoading ||
            !isLoginPage
          ) && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isPhone ? [0, 1.5, 1] : [0, 2.5, 2] }}
              transition={{ duration: 0.5, ease: [0.05, 0.8, 0.35, 0.99] }}
            >
              {isPasswordForgotten ? (
                <KeyOutlined
                  sx={{
                    color: "var(--mui-palette-primary-main)",
                    fontSize: isPhone ? "6rem" : "10rem",
                    marginBottom: isPhone ? "1rem" : "0rem",
                  }}
                />
              ) : (
                <AccountCircleOutlined
                  sx={{
                    color: "var(--mui-palette-primary-main)",
                    fontSize: isPhone ? "6rem" : "10rem",
                    marginBottom: isPhone ? "1rem" : "0rem",
                  }}
                />
              )}
            </motion.div>
          )}
          {isSuccess && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {isLoginPage && isSuccess && !isPasswordForgotten ? (
                <CheckCircleOutlineOutlined
                  sx={{
                    color: "var(--mui-palette-success-main)",
                    fontSize: isPhone ? "6rem" : "10rem",
                    marginBottom: "1rem",
                  }}
                />
              ) : (
                <EmailOutlined
                  sx={{
                    color: "var(--mui-palette-success-main)",
                    fontSize: isPhone ? "6rem" : "10rem",
                    marginBottom: isPhone ? "1rem" : "0rem",
                  }}
                />
              )}
            </motion.div>
          )}
          {isError && (
            <motion.img
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              src={error}
              alt="Error"
              style={{
                width: isPhone ? "50%" : "15rem",
                maxWidth: "15rem",
              }}
            />
          )}
        </Stack>
        <Stack
          width={isPhone ? "100%" : "50%"}
          justifyContent="center"
          alignItems={
            isPhone && !(isSubmitting || isError || isSuccess)
              ? "center"
              : "flex-start"
          }
          spacing={2}
          margin="auto"
        >
          <motion.div
            key={
              isSubmitting
                ? "submitting"
                : isError
                  ? "error"
                  : isSuccess
                    ? "success"
                    : "form"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              {!(isError || isSuccess || isSubmitting) && (
                <Avatar>
                  <img
                    src={logo}
                    style={{
                      width: "100%",
                      bottom: "0.08rem",
                      position: "absolute",
                    }}
                  />
                </Avatar>
              )}
              <h1
                style={{
                  fontSize: isPhone ? "1.5rem" : "2rem",
                  margin: "0rem",
                }}
              >
                {isSubmitting
                  ? isLoginPage
                    ? isPasswordForgotten
                      ? "Sending..."
                      : "Signing you in..."
                    : "Creating your account..."
                  : isError
                    ? getErrorText(statusCode)
                    : isSuccess
                      ? isLoginPage
                        ? isPasswordForgotten
                          ? "Password Reset Link Sent"
                          : "Signed in successfully"
                        : "Account created successfully"
                      : isLoginPage
                        ? isPasswordForgotten
                          ? "Password Reset"
                          : "Sign in to AkashCraft"
                        : "Sign up for an account"}
              </h1>
            </Stack>
            <p
              style={{
                marginRight: isPhone ? "0rem" : "10rem",
              }}
            >
              {isError
                ? getErrorSubText(statusCode)
                : isSuccess
                  ? isLoginPage
                    ? isPasswordForgotten
                      ? "A password reset link has been sent to your email address"
                      : "You should be redirected shortly"
                    : "Please verify your email before logging in. Check your inbox for a verification email."
                  : isSubmitting
                    ? "Hang tight!"
                    : isLoginPage
                      ? isPasswordForgotten
                        ? "Enter your email and we will send you a password reset link if an account with that email exists."
                        : isPhone
                          ? "Welcome back!"
                          : "Welcome back! Please enter your credentials to sign in"
                      : "Access exclusive features and content by creating an AkashCraft account"}
            </p>
            {!(isSubmitting || isSuccess || isError) && (
              <form
                id="login-form"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  maxWidth: "30rem",
                  fontSize: isPhone ? "smaller" : "1rem",
                }}
              >
                <Stack
                  flexDirection="column"
                  alignContent="center"
                  gap={2}
                  mt={2}
                >
                  {!isLoginPage && (
                    <StyledHolder>
                      <p>Enter your name</p>
                      <StyledInput
                        required
                        onKeyDownCapture={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            (
                              document.querySelector(
                                'input[name="email"]',
                              ) as HTMLInputElement
                            )?.focus();
                          }
                        }}
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue=""
                      />
                    </StyledHolder>
                  )}
                  <StyledHolder>
                    <p>Enter your email</p>
                    <StyledInput
                      required
                      onKeyDownCapture={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          (
                            document.querySelector(
                              'input[name="password"]',
                            ) as HTMLInputElement
                          )?.focus();
                        }
                      }}
                      type="email"
                      name="email"
                      placeholder="Email"
                      defaultValue=""
                    />
                  </StyledHolder>
                  {!isPasswordForgotten && (
                    <StyledHolder>
                      <p>
                        {isLoginPage
                          ? "Enter your password"
                          : "Create a password"}
                      </p>
                      <FormControl variant="standard" fullWidth>
                        <InputBase
                          required
                          name="password"
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          inputProps={{ minLength: 8 }}
                          onChange={(value) => {
                            if (value.currentTarget.value == "") {
                              setIsPasswordTyped(false);
                            } else {
                              setIsPasswordTyped(true);
                            }
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
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword
                                    ? "hide the password"
                                    : "display the password"
                                }
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          sx={{
                            padding: "0.5rem",
                            borderRadius: "0.25rem",
                            border: "none",
                            fontFamily: "Segoe UI",
                            fontSize: "1rem",
                            height: "2.5rem",
                            letterSpacing:
                              showPassword || !isPasswordTyped
                                ? "normal"
                                : "0.15rem",
                            backgroundColor:
                              "var(--mui-palette-background-macosfinder)",
                            color: "var(--mui-palette-text-secondary)",
                            "&:active, &:focus": {
                              outline: "none",
                            },
                            "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus":
                              {
                                WebkitBoxShadow:
                                  "0 0 0px 1000px var(--mui-palette-background-macosfinder) inset !important",
                                boxShadow:
                                  "0 0 0px 1000px var(--mui-palette-background-macosfinder) inset !important",
                                WebkitTextFillColor:
                                  "var(--mui-palette-text-secondary) !important",
                              },
                          }}
                        />
                      </FormControl>
                    </StyledHolder>
                  )}
                </Stack>
                {isLoginPage && !isPasswordForgotten && (
                  <SubmitButton
                    variant="text"
                    onClick={() => {
                      setIsPasswordForgotten(true);
                      const email = document.querySelector(
                        'input[name="email"]',
                      ) as HTMLInputElement;
                      email.value = "";
                      email?.focus();
                    }}
                    sx={{
                      color: "var(--mui-palette-primary-main)",
                      padding: "0",
                      width: "fit-content",
                      alignSelf: "flex-end",
                    }}
                  >
                    Forgot your password?
                  </SubmitButton>
                )}
              </form>
            )}
            {!(isSubmitting || isSuccess || isError || isPasswordForgotten) && (
              <>
                <p>
                  {isLoginPage
                    ? "More ways to sign in"
                    : "More ways to sign up"}
                </p>
                <Stack direction="row" spacing={2}>
                  <StyledTooltip title="Google" placement="bottom">
                    <CircularButton
                      variant="outlined"
                      onClick={signInWithGoogle}
                    >
                      <Google />
                    </CircularButton>
                  </StyledTooltip>
                  <StyledTooltip title="GitHub" placement="bottom">
                    <CircularButton
                      variant="outlined"
                      onClick={signInWithGitHub}
                    >
                      <GitHub />
                    </CircularButton>
                  </StyledTooltip>
                </Stack>
              </>
            )}
          </motion.div>
          {!(isSuccess || isSubmitting || isError || isPasswordForgotten) && (
            <SwitchStack
              sx={{
                position: isPhone ? "relative" : "absolute",
                top: isPhone ? "-0.25rem" : "unset",
                left: isPhone ? (isLoginPage ? "0.25rem" : "-0.55rem") : "50%",
                width: isPhone ? "100%" : "auto",
                maxWidth: isPhone ? "95%" : "auto",
              }}
            >
              <SubmitButton
                variant="text"
                onClick={() => {
                  localStorage.setItem(
                    "loggedIn",
                    isLoginPage ? "false" : "true",
                  );
                  const passwordInput = document.querySelector(
                    'input[name="password"]',
                  ) as HTMLInputElement | null;
                  passwordInput!.value = "";
                  setIsLoginPage((prev) => !prev);
                }}
                sx={{
                  color: "var(--mui-palette-primary-main)",
                  padding: "0",
                }}
              >
                {isLoginPage
                  ? "Sign up for an account"
                  : "Already have an account?"}
              </SubmitButton>
            </SwitchStack>
          )}
          <SubmitStack
            sx={{
              position: isPhone ? "static" : "absolute",
              width: isPhone ? "100%" : "auto",
              maxWidth: isPhone ? "95%" : "auto",
            }}
            justifyContent={"flex-end"}
          >
            {!(isSuccess || isSubmitting) && (
              <SubmitButton
                variant="text"
                onClick={() => {
                  sessionStorage.setItem("homeScroll", "0");
                  if (isPasswordForgotten) {
                    (
                      document.querySelector(
                        'input[name="email"]',
                      ) as HTMLInputElement
                    ).value = "";
                    setIsPasswordForgotten(false);
                  } else {
                    navigate("/");
                  }
                }}
                sx={{
                  color: "var(--mui-palette-primary-main)",
                }}
              >
                {isPasswordForgotten ? "Back" : "Cancel"}
              </SubmitButton>
            )}
            <SubmitButton
              variant="contained"
              id="submit-button"
              onClick={(e) => {
                e.preventDefault();
                if (isSuccess || isError) {
                  localStorage.setItem("loggedIn", "true");
                  window.location.reload();
                } else {
                  const form = document.getElementById(
                    "login-form",
                  ) as HTMLFormElement | null;
                  if (form?.checkValidity()) {
                    handleSubmit();
                  } else {
                    form?.reportValidity();
                  }
                }
              }}
              sx={{
                color: "var(--mui-palette-text-primary)",
                justifySelf: "flex-end",
                minWidth: "8rem",
              }}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {isSuccess
                ? "Finish"
                : isError
                  ? "Try Again"
                  : isLoginPage
                    ? "Continue"
                    : "Create"}
            </SubmitButton>
          </SubmitStack>
        </Stack>
      </CenterBox>
    </>
  );
}

export default Login;

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--mui-palette-background-macosfinder)",
    borderRadius: "1rem",
    fontSize: "0.85rem",
    color: "var(--mui-palette-text-secondary)",
    fontFamily: "Segoe UI",
  },
}));

const SubmitButton = styled(Button)({
  fontFamily: "Segoe UI",
  textTransform: "none",
  fontSize: "1rem",
});

const SubmitStack = styled(Stack)({
  flexDirection: "row",
  bottom: "2rem",
  right: "2rem",
  gap: "1rem",
});

const SwitchStack = styled(Stack)({
  flexDirection: "row",
  bottom: "2.4rem",
  left: "50%",
  gap: "1rem",
});

const CircularButton = styled(Button)({
  borderRadius: "50%",
  width: "3rem",
  height: "3rem",
  minWidth: "3rem",
  padding: "0",
});

const StyledHolder = styled(Stack)({
  gap: "0.4rem",
  flexGrow: 1,
  flexDirection: "column",
  p: {
    margin: "0",
  },
});

const StyledInput = styled("input")({
  padding: "0.5rem",
  borderRadius: "0.25rem",
  border: "none",
  fontFamily: "Segoe UI",
  fontSize: "1rem",
  height: "2.5rem",
  backgroundColor: "var(--mui-palette-background-macosfinder)",
  color: "var(--mui-palette-text-secondary)",
  "&:active, &:focus": {
    outline: "none",
    borderBottom: "2px solid var(--mui-palette-primary-main)",
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
  width: "90%",
  margin: "auto",
  fontFamily: "Segoe UI",
  backgroundColor: "var(--mui-palette-background-macosfinder2)",
  color: "var(--mui-palette-text-secondary)",
  borderRadius: "0.5rem",
  overflow: "hidden",
});

const StyledSwiper = styled(Swiper)`
  height: 20rem;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.25rem 0;
  margin-top: 2rem;

  .swiper-pagination-bullet {
    background-color: rgba(255, 165, 0, 0.4);
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background-color: orange;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: orange;
    transition: color 0.2s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #ffb347;
  }
`;

const StyledImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const StyledListItemText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
  },
  "& .MuiListItemText-secondary": {
    fontFamily: "Segoe UI",
  },
});
