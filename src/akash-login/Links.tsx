import {
  OpenInNewRounded,
  LinkOutlined,
  LinkOffOutlined,
  Delete,
} from "@mui/icons-material";
import {
  Chip,
  ListItemButton,
  ListItemIcon,
  Snackbar,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { StyledHeader, StyledListItemText } from "./Account";
import { StyledList, StyledListItemButton } from "./Settings";
import EmptyState from "./EmptyState";
import { AccountContext } from "./AccountContext";
import { useContext, useState } from "react";
import { useAdminLinkDelete } from "./AuthHooks";
import { StyledHeaderPaper } from "./AccountHeaderBox";

const adminUID = "NBH76id0H9gunlBAxynGWjsSomP2";

export function Links() {
  const { accountState } = useContext(AccountContext);

  const { isSubmitting, isError, isSuccess, deleteLink } = useAdminLinkDelete();

  const isPhone = useMediaQuery("(max-width:800px)");

  const [selectedUID, setSelectedUID] = useState<string>("");

  return (
    <>
      <Stack direction="row" gap={1} alignItems="center">
        <StyledHeader>Links</StyledHeader>
        {accountState.links?.length > 0 && (
          <Chip
            sx={{
              fontFamily: "Segoe UI",
              fontSize: "0.9rem",
              borderRadius: "1rem",
              position: "relative",
              top: "0.1rem",
            }}
            label={accountState.links.length}
          />
        )}
      </Stack>
      {accountState.links?.length === 0 ? (
        <StyledHeaderPaper elevation={0}>
          <EmptyState
            header="No links available"
            height="70dvh"
            icon={
              <LinkOffOutlined
                style={{
                  fontSize: "4rem",
                  color: "var(--mui-palette-background-button)",
                }}
              />
            }
          />
        </StyledHeaderPaper>
      ) : (
        <StyledList>
          {accountState.links?.map((item, index) => (
            <StyledListItemButton
              disabled={isSubmitting && selectedUID === item.uid}
              key={index}
              sx={{
                borderTopLeftRadius: index === 0 ? "1rem" : 0,
                borderTopRightRadius: index === 0 ? "1rem" : 0,
                borderBottomLeftRadius:
                  index === accountState.links.length - 1 ? "1rem" : 0,
                borderBottomRightRadius:
                  index === accountState.links.length - 1 ? "1rem" : 0,
                borderBottom:
                  index === accountState.links.length - 1 ? "none" : "",
              }}
              onClick={() => {
                window.open(item.url, "_blank");
              }}
            >
              <ListItemIcon>
                <LinkOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary={item.header}
                secondary={item.description}
              />
              {accountState.userDetails?.uid === adminUID ? (
                <ListItemButton
                  disableTouchRipple
                  disableRipple
                  sx={{
                    padding: 0,
                    display: "contents",
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedUID(item.uid || "");
                    deleteLink(item.uid || "");
                  }}
                >
                  <Delete
                    sx={{
                      ...IconStyle,
                      color: "var(--mui-palette-secondary-dark) !important",
                      marginRight: "0.5rem",
                    }}
                  />
                </ListItemButton>
              ) : (
                <ListItemButton
                  disableTouchRipple
                  disableRipple
                  sx={{
                    padding: 0,
                    display: "contents",
                  }}
                >
                  <OpenInNewRounded
                    sx={{ ...IconStyle, marginRight: "1rem" }}
                  />
                </ListItemButton>
              )}
            </StyledListItemButton>
          ))}
        </StyledList>
      )}
      <Snackbar
        sx={{ bottom: isPhone ? "4.5rem" : "2rem" }}
        ContentProps={{
          sx: {
            fontFamily: "Segoe UI",
          },
        }}
        open={isSuccess}
        message="Link deleted successfully"
      />
      <Snackbar
        sx={{ bottom: isPhone ? "4.5rem" : "2rem" }}
        ContentProps={{
          sx: {
            fontFamily: "Segoe UI",
          },
        }}
        open={isError}
        message="Error"
      />
    </>
  );
}

const IconStyle = {
  color: "white",
  fontSize: "1.5rem",
  position: "relative",
  top: "0.1rem",
};
