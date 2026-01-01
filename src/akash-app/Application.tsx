import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { appData, images, LegacyAppData } from "./appData";
import styled from "@emotion/styled";
import { useGetImages } from "../akash-commons/Hooks";
import {
  AccountBalance as Bank,
  Apps as ButtonsAlt,
  Category as Brick,
  CalendarToday,
  Calculate,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { JSX } from "react";
import FeaturedCard from "./FeaturedCard";

export function Application() {
  const isPhone = useMediaQuery("(min-width:800px)");
  const isLoading = useGetImages(images);

  return (
    <HolderBox>
      <Stack width="100%">
        <FeaturedCard
          header="Featured"
          appData={appData}
          isLoading={isLoading}
          isPhone={isPhone}
        />
        <StyledStack>
          <StyledAccordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white !important" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Legacy Projects</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {LegacyAppData.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      cursor: "pointer",
                      ":hover": {
                        backgroundColor: "var(--mui-palette-background-light)",
                        borderRadius: "1rem",
                      },
                    }}
                    onClick={() => window.open(item.link, "_blank")}
                  >
                    <ListItemIcon sx={IconStyle}>
                      {iconMap[item.icon] || <Brick />}
                    </ListItemIcon>
                    <StyledListItemText
                      primary={item.appName}
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </StyledAccordion>
        </StyledStack>
      </Stack>
    </HolderBox>
  );
}

const StyledStack = styled(Stack)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const iconMap: Record<string, JSX.Element> = {
  Brick: <Brick />,
  ButtonsAlt: <ButtonsAlt />,
  Bank: <Bank />,
  CalendarToday: <CalendarToday />,
  Calculate: <Calculate />,
};

const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-body2": {
    color: "white !important",
  },
});

const StyledAccordion = styled(Accordion)({
  width: "100%",
  borderRadius: "1rem !important",
  border: "0",
  "&:before": {
    display: "none",
  },
});

const IconStyle = {
  color: "white !important",
  position: "relative",
  bottom: "0.1rem",
};
