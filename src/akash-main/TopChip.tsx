import styled from "@emotion/styled";
import { Chip, useMediaQuery } from "@mui/material";

type TopChipProps = {
  img: string;
  color: Record<string, string>;
  title: string;
  link: () => void;
};

function TopChip({ img, title, color, link }: TopChipProps) {
  // Media Query
  const phone = useMediaQuery("(min-width:600px)");

  return (
    <StyledChip
      variant="filled"
      icon={<img width={"20rem"} src={img}></img>}
      sx={{
        backgroundColor: color[800],
        ":hover": { backgroundColor: color[900] },
        width: phone ? "9rem" : "15rem",
      }}
      onClick={link}
      label={title}
    />
  );
}

const StyledChip = styled(Chip)({
  color: "white",
  fontSize: "1rem",
  margin: "0.5rem",
  height: "2.2rem",
});

export default TopChip;
