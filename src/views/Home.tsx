import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }} spacing={8}>
      <Grid item xs={3}>
        <Card elevation={4}>
          <CardActionArea onClick={() => navigate('/productos')}>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ padding: 6 }}>
              <Grid item>
                <InventoryRoundedIcon color="primary" sx={{ fontSize: 100 }} />
              </Grid>
              <Grid item>
                <Typography align="center">
                  Administraci&oacute;n <br /> de Productos
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card elevation={4} onClick={() => navigate('/plazos')}>
          <CardActionArea>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ padding: 6 }}>
              <Grid item>
                <ReceiptLongRoundedIcon color="primary" sx={{ fontSize: 100 }} />
              </Grid>
              <Grid item>
                <Typography align="center">
                  Administraci&oacute;n <br /> de Plazos
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card elevation={4} onClick={() => navigate('/cotizacion')}>
          <CardActionArea>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ padding: 6 }}>
              <Grid item>
                <ShoppingCartRoundedIcon color="primary" sx={{ fontSize: 100 }} />
              </Grid>
              <Grid item>
                <Typography align="center">
                  Cotizaci&oacute;n <br /> de Cr&eacute;ditos
                </Typography>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
