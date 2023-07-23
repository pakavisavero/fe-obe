// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Custom Components Imports

// ** Styled component for the image
const Img = styled("img")({
  right: 7,
  bottom: 0,
  height: 177,
  position: "absolute",
});

const CardStatsCharacter = ({ data }) => {
  // ** Vars
  const { title, chipColor, chipText, src, stats, trend, trendNumber } = data;

  return (
    <Card sx={{ overflow: "visible", position: "relative" }}>
      <CardContent>
        <Typography sx={{ mb: 6.5, fontWeight: 600 }}>{title}</Typography>
        <Box
          sx={{
            mb: 1.5,
            rowGap: 1,
            width: "55%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5" sx={{ mr: 1.5, fontWeight: "bold" }}>
            {stats}
          </Typography>
          <Typography
            component="sup"
            variant="caption"
            sx={{ color: trend === "negative" ? "error.main" : "success.main" }}
          ></Typography>
        </Box>
        <Img src={src} alt={title} />
      </CardContent>
    </Card>
  );
};

export default CardStatsCharacter;

CardStatsCharacter.defaultProps = {
  trend: "positive",
  chipColor: "primary",
};
