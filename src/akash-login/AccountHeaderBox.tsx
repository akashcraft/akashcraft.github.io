import { styled } from "@mui/system";
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

type AccountHeaderBoxProps = {
  avatar: React.ReactNode;
  heading: string;
  description: string;
  onclick?: () => void;
  flexGrow?: number;
  isProfilePic?: boolean;
  isLoading?: boolean;
};

function AccountHeaderBox({
  avatar,
  heading,
  description,
  flexGrow = 1,
  onclick,
  isProfilePic = false,
  isLoading = false,
}: AccountHeaderBoxProps): JSX.Element {
  const { accountState } = useContext(AccountContext);

  return (
    <StyledHeaderPaper elevation={0} sx={{ flexGrow: { flexGrow } }}>
      <ListItemButton
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
        }}
        onClick={() => onclick && onclick()}
      >
        <Stack height="100%" direction="row" gap={1} alignItems="center">
          <ListItemAvatar>
            {isLoading ? (
              <Skeleton variant="circular" width="3rem" height="3rem" />
            ) : isProfilePic &&
              accountState.userDetails?.provider !== "email" &&
              accountState.userDetails?.photo ? (
              <Avatar
                sx={{
                  width: "3rem",
                  height: "3rem",
                }}
                imgProps={{ referrerPolicy: "no-referrer" }}
                src={accountState.userDetails.photo}
              />
            ) : (
              <Avatar
                sx={{
                  bgcolor: "#f4b98b",
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
            ) : (
              <>
                <h3 style={{ margin: 0 }}>{heading}</h3>
                <p style={{ margin: 0 }}>{description}</p>
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
  height: "fit-content",
});
