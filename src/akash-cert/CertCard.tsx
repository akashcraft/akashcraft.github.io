import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  List,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  styled,
  Typography,
  useColorScheme,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import type { CertDataType } from "./certData";
import { motion } from "framer-motion";
import { useState } from "react";

type CertCardProps = {
  data: CertDataType;
  isLoading: boolean;
  isPhone: boolean;
};

function CertCard({ data, isLoading, isPhone }: CertCardProps) {
  const labels = data.smallChipLabel ?? [];
  const links = data.smallChipLinks ?? [];
  const credentialLink = links[0];
  const { mode } = useColorScheme();
  const isLight = mode === "light";
  const [hovered, setHovered] = useState(false);
  const handleCredentialClick = () => {
    if (credentialLink) window.open(credentialLink, "_blank");
  };

  return !isPhone ? (
    <List sx={{ gap: "0.5rem", width: "100%", alignSelf: "center" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "40rem",
          padding: "1rem",
          alignSelf: "center",
          gap: "1rem",
          display: "flex",
          backgroundColor: "var(--mui-palette-background-paper)",
          borderRadius: "1rem",
          cursor: credentialLink ? "pointer" : "default",
          ":hover": credentialLink
            ? { backgroundColor: "var(--mui-palette-background-paper)" }
            : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={credentialLink ? handleCredentialClick : undefined}
      >
        <ListItemAvatar
          sx={{
            minWidth: "4.5rem",
            width: "4.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <motion.div
            style={{ display: "flex" }}
            initial={{ scale: 1 }}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Avatar
              src={data.image}
              variant="rounded"
              sx={{
                width: "4rem",
                height: "4rem",
                "& img": {
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                },
              }}
            />
          </motion.div>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              gap={1}
              alignItems="center"
            >
              <span style={{ fontWeight: "bold" }}>{data.certName}</span>
            </Stack>
          }
          secondary={
            <Stack
              direction="column"
              gap={1}
              mt={1}
              component="div"
              sx={{ color: "var(--mui-palette-text-primary)" }}
            >
              <span>{data.description}</span>
              <CredentialChips labels={labels} links={links} />
            </Stack>
          }
          secondaryTypographyProps={{ component: "div" }}
        />
      </Box>
    </List>
  ) : (
    <StyledCard sx={{ width: "18rem" }}>
      {credentialLink ? (
        <CardActionArea
          onClick={handleCredentialClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <CertificationCardContent
            data={data}
            isLoading={isLoading}
            labels={labels}
            links={links}
            hovered={hovered}
            isLight={isLight}
          />
        </CardActionArea>
      ) : (
        <CertificationCardContent
          data={data}
          isLoading={isLoading}
          labels={labels}
          links={links}
          hovered={false}
          isLight={isLight}
        />
      )}
    </StyledCard>
  );
}

function CertificationCardContent({
  data,
  isLoading,
  labels,
  links,
  hovered,
  isLight,
}: {
  data: CertDataType;
  isLoading: boolean;
  labels: string[];
  links: string[];
  hovered: boolean;
  isLight: boolean;
}) {
  return (
    <>
      <motion.div
        initial={{ scale: 1, y: 0 }}
        animate={{ scale: hovered ? 1.05 : 1, y: hovered ? -4 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" animation="wave" height={170} />
        ) : (
          <CardMedia
            component="img"
            height="170"
            image={data.image}
            sx={{
              backgroundColor: isLight
                ? "var(--mui-palette-background-buttondark)"
                : "var(--mui-palette-background-macosfinder2)",
              transition: "background-color 0.4s ease",
              objectFit: "contain",
              padding: "17px",
            }}
          />
        )}
      </motion.div>
      <CardContent
        sx={{
          minHeight: "12rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0.5rem",
        }}
      >
        <Typography variant="h6">{data.certName}</Typography>
        <Typography color="text.primary" variant="body2">
          {data.description}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <CredentialChips labels={labels} links={links} />
      </CardContent>
    </>
  );
}

function CredentialChips({
  labels,
  links,
}: {
  labels: string[];
  links: string[];
}) {
  return (
    <Stack direction="row" gap={1.5} mt={0.5} flexWrap="wrap">
      {labels.map((label, index) => {
        const link = links[index];
        if (!link) return null;
        return (
          <Chip
            key={label}
            size="small"
            label={label}
            icon={<OpenInNew sx={{ color: "white !important" }} />}
            sx={{
              cursor: "pointer",
              fontSize: "0.9rem",
              padding: "1rem 0.75rem",
              borderRadius: "1rem",
              backgroundColor:
                index === 0
                  ? "var(--mui-palette-secondary-main)"
                  : "rgba(255,255,255,0.1)",
              color: "white",
              "&:hover": {
                backgroundColor:
                  index === 0
                    ? "var(--mui-palette-secondary-dark)"
                    : "rgba(255,255,255,0.2)",
              },
            }}
            onClick={(event) => {
              event.stopPropagation();
              window.open(link, "_blank");
            }}
          />
        );
      })}
    </Stack>
  );
}

const StyledCard = styled(Card)({
  backgroundColor: "var(--mui-palette-background-paper)",
  borderRadius: "1rem",
  textAlign: "left",
});

export default CertCard;
