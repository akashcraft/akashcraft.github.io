import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Portal,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { SidePaper } from "../akash-commons/SidePaper";
import { headerContainer } from "../akash-commons/Header";

export function Policy() {
  // Media Query
  const isPhone = useMediaQuery("(min-width:600px)");

  function handleScrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <HolderBox isWide>
      <Portal container={headerContainer}>
        <TableOfContentsLink handler={handleScrollTo} />
      </Portal>
      <Stack direction={{ xs: "column", sm: "row" }} gap={3.5}>
        {isPhone && (
          <SidePaper
            title="Table of Contents"
            elevation={3}
            style={{
              minWidth: "15rem",
              height: "min-content",
              position: "sticky",
              top: "5.5rem",
              marginTop: "0rem",
            }}
          >
            <TableOfContentsLink handler={handleScrollTo} />
          </SidePaper>
        )}
        <Box flexGrow={1}>
          <p id="link1" style={{ position: "relative", bottom: "5rem" }}></p>
          <h2>Terms of Service</h2>

          <p>By using AkashCraft, you agree to the following terms:</p>
          <ul>
            <li>
              Users are permitted to create and manage content within the
              platform for personal use only.
            </li>
            <li>
              Commercial use of the platform or its services is strictly
              prohibited.
            </li>
            <li>
              Tampering with or attempting to compromise the security of the
              platform is forbidden.
            </li>
            <li>
              AkashCraft reserves the right to terminate or disable your account
              at any time, without prior notice, if you are found to be in
              violation of these terms.
            </li>
          </ul>

          <p>
            <b>Liability:</b> AkashCraft is provided "as is." I am not liable
            for any damages arising from the use of this service. You are solely
            responsible for how you intend to use or share your data with
            others.
          </p>

          <Divider
            sx={{
              backgroundColor: "var(--mui-palette-background-macos)",
              my: 4,
            }}
          />

          <p id="link2" style={{ position: "relative", bottom: "5rem" }}></p>

          <h2>Privacy Policy</h2>

          <p>
            Your privacy is important. Data collected on AkashCraft is handled
            with the following principles:
          </p>
          <ul>
            <li>
              Data is only processed and stored to provide you with the services
              offered.
            </li>
            <li>
              Your personal data is never shared with third parties for revenue
              or advertising purposes.
            </li>
            <li>
              All user passwords are encrypted using industry-standard hashing
              and safely stored via Firebase Authentication.
            </li>
            <li>
              All application data is hosted using Google Firebase to ensure
              robust security protocols.
            </li>
          </ul>

          <p>
            <b>Public Data:</b> If you choose to use the "Schedule Sharing"
            feature, certain basic information—including your name, university,
            and current semester—will be shared publicly to facilitate the
            connection.
          </p>

          <p>
            <b>User Control:</b> You retain full control over your data. You may
            modify or delete your stored schedules at any time. If you wish to
            delete your entire account and associated data, you can do so
            through the account settings or by contacting support.
          </p>
        </Box>
      </Stack>
    </HolderBox>
  );
}

const TableOfContentsLink = ({
  handler,
}: {
  handler: (link: string) => void;
}) => (
  <List sx={{ marginTop: "0.5rem", paddingBottom: "0" }}>
    <ListItem disablePadding onClick={() => handler("link1")}>
      <ListItemButton>
        <ListItemText primary="Terms of Service" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding onClick={() => handler("link2")}>
      <ListItemButton>
        <ListItemText primary="Privacy Policy" />
      </ListItemButton>
    </ListItem>
  </List>
);
