import { Stack } from "@mui/material";

type EmptyStateProps = {
  height?: string | number;
  minHeight?: string | number;
  header: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

function EmptyState({
  height,
  minHeight,
  header,
  description,
  icon,
  onClick,
}: EmptyStateProps) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={height}
      gap={1}
      sx={{
        backgroundColor: "var(--mui-palette-background-default)",
        borderRadius: "1rem",
        cursor: onClick ? "pointer" : "default",
        minHeight: minHeight,
      }}
      onClick={() => onClick && onClick()}
    >
      {icon}
      <h3 style={{ margin: 0, textAlign: "center", color: "#ccc" }}>
        {header}
      </h3>
      {description && (
        <p
          style={{
            margin: 0,
            textAlign: "center",
            maxWidth: "20rem",
            color: "#ccc",
          }}
        >
          {description}
        </p>
      )}
    </Stack>
  );
}

export default EmptyState;
