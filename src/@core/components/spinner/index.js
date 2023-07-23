// ** MUI Import
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const FallbackSpinner = () => {
  // ** Hook
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          height: "180px",
        }}
        src={`/images/obe_image.png`}
      >
        {/* <FooterIllustrationsV2 /> */}
      </Box>
      <CircularProgress disableShrink sx={{ mt: 3 }} />
    </Box>
  );
};

export default FallbackSpinner;
