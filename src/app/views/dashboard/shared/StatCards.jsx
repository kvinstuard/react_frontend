import { Box, Card, Grid, Icon, 
  // IconButton, 
  styled, 
  // Tooltip 
} from '@mui/material';
import { Small } from 'app/components/Typography';
import { useState, useEffect, useContext } from "react";
import * as utils from 'app/utils/utils';
import { userContext } from "../../../contexts/user-context";

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const context = useContext(userContext);
  const [dashboardData, setDashBoardData] = useState({
    cantidad_contactos: 0,
    total_saldos_pendientes: 0,
    cantidad_eventos_creados: 0,
    cantidad_eventos_participante: 0,
  }); 
  const cardList = [
    { name: 'Contacts', amount: `${dashboardData.cantidad_contactos}`, icon: 'group' },
    { name: "Pending Balance - Total", amount: `$${dashboardData.total_saldos_pendientes}`, icon: 'attach_money' },
    { name: 'Events created', amount: `${dashboardData.cantidad_eventos_creados}`, icon: 'store' },
    { name: 'Activities in which you participate', amount: `${dashboardData.cantidad_actividades_participante}`, icon: 'shopping_cart' },
  ];

  useEffect(() => {
    async function fetchData() {
      // Se obtienen los datos básicos del dashboard
      const usuario = context.user_data;
      console.log("AuthContext:", usuario)

      const config = {
        method: "GET",
        headers: {
          Authorization: `Token ${context.token}`,
          "Content-type": "application/json",
        },
      };

      try {
        const response = await utils.obtenerDatosDashboard(config);
        console.log("response:", response)
        if (!response.error) {
          await setDashBoardData(response.description);
        }
        else {
          console.error("Error:", response.error);    
          await setDashBoardData({
            cantidad_contactos: 0,
            total_saldos_pendientes: 0,
            cantidad_eventos_creados: 0,
            cantidad_eventos_participante: 0,
          })
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData()
  }, [context.token, context.user_data]);

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
