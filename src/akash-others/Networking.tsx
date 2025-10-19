import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import {
  Box,
  Chip,
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
import { Download } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { GetImages } from "../akash-commons/Hooks";
import { NetworkingStyledImg } from "./NetworkStyledimg";
import { images } from "./networkingData";
import { headerContainer } from "../akash-commons/Header";

function Networking() {
  // Media Query
  const isPhone = useMediaQuery("(min-width:600px)");
  const isLoading = GetImages(images);

  function handleScrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <HolderBox isWide>
      <Stack direction={{ xs: "column", sm: "row" }} gap={3.5}>
        <SidePaper
          title="Table of Contents"
          width="15rem"
          elevation={3}
          style={{
            minWidth: "15rem",
            height: "min-content",
            position: !isPhone ? "static" : "sticky",
            top: "5rem",
          }}
        >
          <TableOfContentsLink handler={handleScrollTo} />
          <Portal container={headerContainer}>
            <TableOfContentsLink handler={handleScrollTo} />
          </Portal>
        </SidePaper>
        <Box flexGrow={1}>
          <NetworkingStyledImg
            imgSrc={images[0]}
            isWide
            isLoading={isLoading}
            isPhone={isPhone}
          />
          <p id="link1" style={{ position: "relative", bottom: "1000px" }}></p>
          <h2>Windows Server</h2>

          <p>
            Have you ever wondered how the "Other user" Login Page shows up at
            your school or work? What is happening behind the scenes? I am glad
            you asked. This is called the ADDS or Active Domain Directory
            Service.
          </p>

          <p>
            While there are different types of servers that can support ADDS,
            Windows Server is by far the widely chosen solution. It offers a
            robust group policy management and user credential validation unlike
            any other. I built an ADDS and DNS (Domain Name System) server back
            home as a fun project. This webpage is not a detailed guide but can
            point you in the right direction.
          </p>

          <p>
            We will be using Windows Server. You can get an evaluation copy for
            180 days from Microsoft. Install the operating system and set up the
            server. To get started, add the ADDS and DNS server roles by
            following this{" "}
            <StyledLink
              to="https://www.easeus.com/todo-backup-guide/how-to-install-active-directory-on-windows-server-2025.html"
              target="_blank"
            >
              guide
            </StyledLink>
            .
          </p>
          <Stack
            direction="row"
            justifyContent={!isPhone ? "center" : "flex-start"}
            mt={4}
            mb={4}
            gap={2}
          >
            <Chip
              sx={{
                fontSize: "1rem",
                padding: "1.25rem 1rem",
                borderRadius: "1.5rem",
              }}
              size="medium"
              onClick={() =>
                window.open(
                  "https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025",
                  "_blank",
                )
              }
              color="secondary"
              label="Windows Server Evaluation"
              icon={<Download sx={{ color: "white !important" }} />}
            />
          </Stack>

          <p>
            More importantly, set a Static IP for your Windows Server. You will
            be using this address a lot! So make sure to reserve it on your
            router as well, if you plan to connect your server to your home
            network. Run <b>ncpa.cpl</b> and navigate to the IPV4 properties of
            your network adaptor. A server should typically have multiple NICs
            (Network Interface Cards) and lots of storage. You may also use ICS
            (Internet Connection Sharing) from the Server.
          </p>

          <NetworkingStyledImg
            imgSrc={images[3]}
            isLoading={isLoading}
            isPhone={isPhone}
          />
          <NetworkingStyledImg
            imgSrc={images[4]}
            isLoading={isLoading}
            isPhone={isPhone}
            isEnd
          />

          <p id="link2" style={{ position: "relative", bottom: "5rem" }}></p>

          <h2>Windows Clients</h2>

          <p>
            Run <b>ncpa.cpl</b> and navigate to the IPV4 properties of your
            Client PCs network adaptor. Point to the Windows Server IP Address
            (in this case, 192.168.137.1) under the DNS Settings. Set Static IPs
            for Clients if no DHCP (Dynamic Host Configuration Protocol) Server
            is present in the network.
          </p>
          <NetworkingStyledImg
            imgSrc={images[2]}
            isLoading={isLoading}
            isPhone={isPhone}
          />
          <p>
            Finally, run <b>sysdm.cpl</b> in your Client PCs. Change your Domain
            to your ADDS Domain you have set earlier. Enter your Server
            Administrator Password. Restart your Client and you should see the
            ADDS working.
          </p>
          <NetworkingStyledImg
            imgSrc={images[1]}
            isWide
            isLoading={isLoading}
            isPhone={isPhone}
          />
          <p>
            We have just created the following network. You can take a step
            further and utilize the true benefits of this setup by setting up
            Roaming Profiles and File Sharing. Roaming Users can "roam" and
            access their synced files from any device on the domain network.
            This also provides backup in case of hardware failure or malware
            attack.
          </p>
          <NetworkingStyledImg
            imgSrc={images[5]}
            isWide
            isEnd
            isLoading={isLoading}
            isPhone={isPhone}
          />
          <p id="link3" style={{ position: "relative", bottom: "5rem" }}></p>

          <h2>Enterprise Wi-Fi</h2>

          <p>
            Now that you have your awesome network setup, time to go further.
            You see with ADDS, you can take advantage of user credential
            validation using NPAS (Network Policy and Access Service) Role. This
            way you can use your Windows Server as a RADIUS (Remote
            Authentication Dial-In User Service) Server.
          </p>
          <NetworkingStyledImg
            imgSrc={images[6]}
            isWide
            isLoading={isLoading}
            isPhone={isPhone}
          />
          <p>
            This is the foundation for those Enterprise Wi-Fi you see at
            businesses and corporations. You can see this{" "}
            <StyledLink
              to="https://arista.my.site.com/AristaCommunity/s/article/setting-up-ad-nps-and-radius-authentication-using-windows-nps"
              target="_blank"
            >
              guide
            </StyledLink>{" "}
            on how to add this role to your Windows Server. Create a Pre-Shared
            Key. Once that is done, do not forget to add ADCS (Active Directory
            Certificate Services) Role to your server for Certificate Validation
            on Clients.
          </p>

          <NetworkingStyledImg
            imgSrc={images[7]}
            isLoading={isLoading}
            isPhone={isPhone}
          />

          <p>
            Finally, open your Router Management Page and choose WPA2/Enterprise
            as your authentication type. Now your router is a RADIUS Client.
            Point all addresses and ports to your Windows Server Static IP we
            set earlier (My Home RADIUS Server was at 192.168.1.120 in this
            example). Reboot the router and enjoy your Enterprise Network!
          </p>

          <br />
          <Divider
            sx={{ backgroundColor: "var(--mui-palette-background-macos)" }}
          />
          <p id="link4" style={{ position: "relative", bottom: "5rem" }}></p>
          <h2>Guest Wi-Fi</h2>

          <p>
            We save the best for the last. You most likely have seen Open Guest
            Wi-Fi(s) at public places such as a coffee shop, hotel, or airport
            with the "Sign in to Network" prompt showing up in your device. This
            is a form of authoritive DNS which usually involves expensive
            routers and authentication servers but you can do it under $100
            bucks!
          </p>

          <p>
            A router first checks if the user is authenticated, if not, they are
            redirected to the Captive Portal Login Page. This redirection
            triggers the CPD (Captive Portal Detection) Protocol on the
            connecting device which asks users to "Sign in to Network".
            Pre-authenticated users are only allowed in the Walled Garden and
            the Login Page. Credentials are often checked by a FAS (Forward
            Authentication Service) Server. Some cases, this is skipped (like
            Click to Connect). Authenticated Users are leased an IP and are let
            through the firewall. All traffic including connectivity check
            websites are then allowed.
          </p>

          <NetworkingStyledImg
            imgSrc={images[8]}
            isWide
            isLoading={isLoading}
            isPhone={isPhone}
          />
          <p>
            You can setup your Guest Wi-Fi by following the OpenWRT{" "}
            <StyledLink to="https://openwrt.org/" target="_blank">
              documentation
            </StyledLink>{" "}
            for initial setup and then using the OpenNDS{" "}
            <StyledLink
              to="https://openwrt.org/docs/guide-user/services/captive-portal/opennds"
              target="_blank"
            >
              package
            </StyledLink>{" "}
            for the Captive Portal Page and Firewall Policy. It is robust and
            also provides a list of supported routers.
          </p>

          <p>
            I recommend buying a separate inexpensive router which has
            sufficient ROM Flash, Memory and CPU. Yes! Routers are computers
            too. This way you stay clear from your main router and experiment as
            much as you want. You will be voiding your router manufacturer's
            warranty as this involves replacing the router's OS.
          </p>

          <p>
            I bought the TP-Link Archer C20 router. It fits my project
            requirements perfectly. The Captive Portal Service, Network
            Bridging, DHCP Role, FAS Role, as well as Web Hosting Role for
            displaying the login page (stored locally) are done through that
            single router which is super cool!
          </p>

          <p id="link5" style={{ position: "relative", bottom: "5rem" }}></p>
        </Box>
      </Stack>
    </HolderBox>
  );
}

const StyledLink = styled(Link)({
  color: "orange",
});

const TableOfContentsLink = ({
  handler,
}: {
  handler: (link: string) => void;
}) => (
  <List sx={{ marginTop: "0.5rem" }}>
    <ListItem disablePadding onClick={() => handler("link1")}>
      <ListItemButton>
        <ListItemText primary="Windows Server" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding onClick={() => handler("link2")}>
      <ListItemButton>
        <ListItemText primary="Windows Clients" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding onClick={() => handler("link3")}>
      <ListItemButton>
        <ListItemText primary="Enterprise Wi-Fi" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding onClick={() => handler("link4")}>
      <ListItemButton>
        <ListItemText primary="Guest Wi-Fi" />
      </ListItemButton>
    </ListItem>
  </List>
);

export default Networking;
