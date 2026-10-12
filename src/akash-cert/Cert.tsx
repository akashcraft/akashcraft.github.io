import "./../styles/App.css";
import HolderBox from "../akash-commons/HolderBox";
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { SidePaper } from "../akash-commons/SidePaper";
import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import {
  certData,
  CertTypeFilters,
  images,
  type CertFilterType,
} from "./certData";
import { useReducer, useState } from "react";
import { reducerFilter } from "./CertHook";
import { Check, FilterAlt } from "@mui/icons-material";
import { useGetImages } from "../akash-commons/Hooks";
import CertCard from "./CertCard";

function Cert() {
  const isPhone = useMediaQuery("(min-width:800px)");
  const isLoading = useGetImages(images);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const filterOpen = Boolean(anchorEl);
  const [filterState, dispatchFilteredData] = useReducer(reducerFilter, {
    selectedTypes: CertTypeFilters,
    filteredData: certData,
    isAllSelected: true,
  });

  return (
    <HolderBox isWide>
      <Stack
        direction={isPhone ? "row" : "column"}
        alignItems={isPhone ? "flex-start" : "center"}
        mt={1}
        gap={isPhone ? 3.5 : 0}
      >
        {isPhone && (
          <SidePaper
            title="Filters"
            icon={<FilterAlt />}
            elevation={3}
            style={{
              width: "15rem",
              height: "min-content",
              top: "5.5rem",
              margin: "0rem",
              flexShrink: 0,
              boxSizing: "border-box",
              position: "sticky",
            }}
          >
            <List sx={{ marginTop: "0.5rem", paddingBottom: "0" }}>
              <ListItem disablePadding>
                <StyledListItemButton
                  sx={{
                    backgroundColor: filterState.isAllSelected
                      ? "var(--mui-palette-background-light)"
                      : "none",
                  }}
                  onClick={() =>
                    dispatchFilteredData({
                      type: "RESET",
                      payload: "" as CertFilterType,
                    })
                  }
                >
                  <ListItemText primary="All" />
                  {filterState.isAllSelected && <Check />}
                </StyledListItemButton>
              </ListItem>
              {CertTypeFilters.map((type) => (
                <ListItem key={type} disablePadding>
                  <StyledListItemButton
                    sx={{
                      backgroundColor:
                        filterState.selectedTypes.includes(type) &&
                        !filterState.isAllSelected
                          ? "var(--mui-palette-background-light)"
                          : "none",
                    }}
                    onClick={() =>
                      dispatchFilteredData({
                        type: filterState.selectedTypes.includes(type)
                          ? "REMOVE_TYPE"
                          : "ADD_TYPE",
                        payload: type,
                      })
                    }
                  >
                    <ListItemText primary={type} />
                    {filterState.selectedTypes.includes(type) &&
                      !filterState.isAllSelected && <Check />}
                  </StyledListItemButton>
                </ListItem>
              ))}
            </List>
          </SidePaper>
        )}
        <Box>
          {!isPhone && (
            <Stack gap={1} direction="row" flexWrap="wrap" mt={2} mb={3}>
              <Chip
                sx={{ padding: "0.5rem" }}
                icon={<FilterAlt sx={{ color: "white !important" }} />}
                label="Add Filter"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              />
              <Menu
                anchorEl={anchorEl}
                open={filterOpen}
                onClose={() => setAnchorEl(null)}
                sx={{ marginTop: "0.1rem", marginLeft: "0.25rem" }}
              >
                {CertTypeFilters.map((type) => (
                  <MenuItem
                    key={type}
                    onClick={() => {
                      dispatchFilteredData({
                        type: filterState.selectedTypes.includes(type)
                          ? "REMOVE_TYPE"
                          : "ADD_TYPE",
                        payload: type,
                      });
                      setAnchorEl(null);
                    }}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Menu>
              {!filterState.isAllSelected && (
                <>
                  <Chip
                    sx={{ padding: "0.5rem" }}
                    label="Clear All"
                    onClick={() =>
                      dispatchFilteredData({
                        type: "RESET",
                        payload: "" as CertFilterType,
                      })
                    }
                  />
                  {filterState.selectedTypes.map((type) => (
                    <Chip
                      key={type}
                      sx={{ padding: "0.5rem" }}
                      label={type}
                      onDelete={() =>
                        dispatchFilteredData({
                          type: "REMOVE_TYPE",
                          payload: type,
                        })
                      }
                    />
                  ))}
                </>
              )}
            </Stack>
          )}
          <Stack
            sx={{ flexGrow: 1 }}
            direction={!isPhone ? "column" : "row"}
            width="100%"
            flexWrap={!isPhone ? "nowrap" : "wrap"}
            gap={!isPhone ? "0rem" : "1.5rem"}
          >
            {filterState.filteredData.map((item) => (
              <CertCard
                key={item.certName}
                data={item}
                isLoading={isLoading}
                isPhone={isPhone}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </HolderBox>
  );
}

const StyledListItemButton = styled(ListItemButton)({
  cursor: "pointer",
  borderRadius: "1rem",
  margin: "0.25rem 0",
});

export default Cert;
