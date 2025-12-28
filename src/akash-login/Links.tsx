import {
  OpenInNewRounded,
  LinkOutlined,
  LinkOffOutlined,
} from "@mui/icons-material";
import { Chip, ListItemButton, ListItemIcon, Stack } from "@mui/material";
import { StyledHeader, StyledListItemText } from "./Account";
import { StyledList, StyledListItemButton } from "./Settings";
import EmptyState from "./EmptyState";

const mockData = [
  {
    title: "Feedback Form",
    secondary: "Tell us how we did and how we can improve this service",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScsCpxUZM8I7dWFH5wTmmYYZ0605UVmwrxiVUJEkRSkqKYnDw/viewform?usp=send_form",
  },
];

export function Links() {
  return (
    <>
      <Stack direction="row" gap={1} alignItems="center">
        <StyledHeader>Links</StyledHeader>
        {mockData.length > 0 && (
          <Chip
            sx={{
              fontFamily: "Segoe UI",
              fontSize: "0.9rem",
              borderRadius: "1rem",
              position: "relative",
              top: "0.1rem",
            }}
            label={mockData.length}
          />
        )}
      </Stack>
      {mockData.length === 0 ? (
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
      ) : (
        <StyledList>
          {mockData.map((item, index) => (
            <StyledListItemButton
              key={index}
              sx={{
                borderTopLeftRadius: index === 0 ? "1rem" : 0,
                borderTopRightRadius: index === 0 ? "1rem" : 0,
                borderBottomLeftRadius:
                  index === mockData.length - 1 ? "1rem" : 0,
                borderBottomRightRadius:
                  index === mockData.length - 1 ? "1rem" : 0,
                borderBottom: index === mockData.length - 1 ? "none" : "",
              }}
              onClick={() => {
                window.open(item.link, "_blank");
              }}
            >
              <ListItemIcon>
                <LinkOutlined sx={IconStyle} />
              </ListItemIcon>
              <StyledListItemText
                primary={item.title}
                secondary={item.secondary}
              />
              <ListItemButton
                disableTouchRipple
                disableRipple
                sx={{
                  padding: 0,
                  display: "contents",
                }}
              >
                <OpenInNewRounded sx={{ ...IconStyle, marginRight: "1rem" }} />
              </ListItemButton>
            </StyledListItemButton>
          ))}
        </StyledList>
      )}
    </>
  );
}

const IconStyle = {
  color: "white",
  fontSize: "1.5rem",
  position: "relative",
  top: "0.1rem",
};
