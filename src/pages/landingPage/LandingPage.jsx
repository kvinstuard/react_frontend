import "./LandingPage.scss";
import { Box, Typography } from "@mui/material";
import TopbarLanding from "../../components/topbarLanding/TopbarLanding";

const LandingPage = () => {
  // Obtén el valor de "nickname" del localStorage
  const nickname = localStorage.getItem("nickname");

  return (
    <Box>
      <TopbarLanding />
      {nickname && (
        <Typography variant="h6">
          ¡Hola, {nickname}! Bienvenido de nuevo.
        </Typography>
      )}
    </Box>
  );
};

export default LandingPage;
