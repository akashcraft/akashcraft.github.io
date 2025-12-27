import { styled } from "@mui/system";
import {
  Stack,
  ListItemAvatar,
  Avatar,
  Paper,
  ListItemButton,
} from "@mui/material";
import type React from "react";
import type { JSX } from "react";

type AccountHeaderBoxProps = {
  avatar: React.ReactNode;
  heading: string;
  description: string;
  onclick?: () => void;
  flexGrow?: number;
};

function AccountHeaderBox({
  avatar,
  heading,
  description,
  flexGrow = 1,
  onclick,
}: AccountHeaderBoxProps): JSX.Element {
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
            <Avatar
              sx={{
                bgcolor: "#f4b98b",
                width: "3rem",
                height: "3rem",
              }}
            >
              {avatar}
            </Avatar>
          </ListItemAvatar>
          <Stack>
            <h3 style={{ margin: 0 }}>{heading}</h3>
            <p style={{ margin: 0 }}>{description}</p>
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
});
