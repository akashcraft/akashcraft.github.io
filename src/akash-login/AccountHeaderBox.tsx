import { Box, styled, useMediaQuery } from "@mui/system";
import {
  Stack,
  ListItemAvatar,
  Avatar,
  Paper,
  ListItemButton,
  Skeleton,
} from "@mui/material";
import type React from "react";
import { useContext, type JSX } from "react";
import { AccountContext } from "./AccountContext";
import partyHat from "../assets/img-account/party.png";
import { useGetImages } from "../akash-commons/Hooks";

type AccountHeaderBoxProps = {
  avatar: React.ReactNode;
  heading: string;
  description: string;
  onclick?: () => void;
  flexGrow?: number;
  isProfilePic?: boolean;
  isLoading?: boolean;
  isLoadingBottom?: boolean;
  isBirthday?: boolean;
  isAnnouncement?: boolean;
};

function AccountHeaderBox({
  avatar,
  heading,
  description,
  flexGrow = 1,
  onclick,
  isProfilePic = false,
  isLoading = false,
  isLoadingBottom = false,
  isBirthday = false,
  isAnnouncement = false,
}: AccountHeaderBoxProps): JSX.Element {
  const { accountState } = useContext(AccountContext);
  const isHat = useGetImages([partyHat]);
  const isPhone = useMediaQuery("(max-width:800px)");

  return (
    <StyledHeaderPaper elevation={0} sx={{ flexGrow: { flexGrow } }}>
      <ListItemButton
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          height: "100%",
        }}
        onClick={() => onclick && onclick()}
      >
        <Stack
          height="100%"
          direction="row"
          flexWrap="wrap"
          alignContent="center"
          gap={1}
        >
          <ListItemAvatar sx={{ alignSelf: "center" }}>
            {isLoading || isHat ? (
              <Skeleton variant="circular" width="3rem" height="3rem" />
            ) : isProfilePic && accountState.userDetails?.photo ? (
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                  }}
                  imgProps={{ referrerPolicy: "no-referrer" }}
                  src={accountState.userDetails.photo}
                />
                {isBirthday && (
                  <img
                    src={partyHat}
                    style={{
                      position: "absolute",
                      width: "1.5rem",
                      bottom: "2.2rem",
                      right: "1.3rem",
                    }}
                  />
                )}
              </Box>
            ) : (
              <Avatar
                sx={{
                  backgroundColor:
                    accountState.userDetails?.accentColour ?? "#f4b98b",
                  bgcolor: `color-mix(in srgb, ${accountState.userDetails?.accentColour ?? "#f4b98b"}, white 60%)`,
                  width: "3rem",
                  height: "3rem",
                }}
              >
                {avatar}
              </Avatar>
            )}
          </ListItemAvatar>
          <Stack>
            {isLoading ? (
              <>
                <Skeleton
                  variant="text"
                  width="12rem"
                  height="1.6rem"
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="6rem"
                  height="1.6rem"
                  animation="wave"
                />
              </>
            ) : isLoadingBottom ? (
              <>
                <h3
                  style={{
                    margin: 0,
                    maxWidth: isPhone || isAnnouncement ? "100%" : "15rem",
                  }}
                >
                  {heading}
                </h3>
                <Skeleton
                  variant="text"
                  width="6rem"
                  height="1.6rem"
                  animation="wave"
                />
              </>
            ) : (
              <>
                <h3
                  style={{
                    margin: 0,
                    maxWidth: isPhone || isAnnouncement ? "100%" : "15rem",
                  }}
                >
                  {heading}
                </h3>
                <p
                  style={{
                    margin: 0,
                    maxWidth: isPhone || isAnnouncement ? "100%" : "15rem",
                    wordWrap: "break-word",
                  }}
                >
                  {description}
                </p>
              </>
            )}
          </Stack>
        </Stack>
      </ListItemButton>
    </StyledHeaderPaper>
  );
}

export default AccountHeaderBox;

export const StyledHeaderPaper = styled(Paper)({
  backgroundColor: "var(--mui-palette-background-light2)",
  borderRadius: "1rem",
  height: "auto",
});
