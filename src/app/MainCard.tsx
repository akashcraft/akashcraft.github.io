import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { genericAppData } from "./appData";
import { styled } from "@mui/material/styles";

type MainCardProps = {
  data: genericAppData;
  isDuration?: boolean;
};

function MainCard({ data, isDuration }: MainCardProps) {
  const subtitle = isDuration ? "Duration: " + data.subtitle : data.subtitle;
  return (
    <StyledCard sx={{ maxWidth: "20rem" }}>
      <CardActionArea>
        <CardMedia component="img" height="170" image={data.image} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {data.title}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            <p>{subtitle}</p>
          </Typography>
          <Typography variant="body2" color="text.primary">
            <p>{data.description}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}

const StyledCard = styled(Card)({
  backgroundColor: "var(--mui-palette-background-paper)",
  margin: "1rem",
  borderRadius: "0.5rem",
  textAlign: "left",
});

export default MainCard;
