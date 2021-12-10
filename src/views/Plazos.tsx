import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Plazo } from 'models/plazo';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlazo, getPlazos, removePlazo, updatePlazo } from 'services/plazos';

const EMPTY_PLAZO: Plazo = {
  plazo: 0,
  tasaNormal: 0,
  tasaPuntual: 0,
};

const Plazos = () => {
  const navigate = useNavigate();

  const [plazos, setPlazos] = useState<Plazo[]>([]);
  const [plazo, setPlazo] = useState<Plazo>(EMPTY_PLAZO);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const columns = [
    {
      field: 'plazo',
      headerName: 'Plazo',
      flex: 1,
    },
    {
      field: 'tasaNormal',
      headerName: 'Tasa Normal',
      flex: 2,
    },
    {
      field: 'tasaPuntual',
      headerName: 'Tasa Puntual',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditRoundedIcon />}
          label="Edit"
          onClick={() => {
            setPlazo(params.row as Plazo);
            setIsUpdate(true);
          }}
        />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => deletePlazo(params.row.plazo)} />,
      ],
    },
  ];

  useEffect(() => {
    getAllPlazos();
  }, []);

  const getAllPlazos = () => {
    getPlazos().subscribe({
      next: ({ data }) => {
        setPlazos(data);
        setPlazo(EMPTY_PLAZO);
      },
      error: (err) => setMessage(err.response.data.message),
    });
  };

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setMessage('');
    setPlazo({ ...plazo, [id]: value });
  };

  const clear = () => {
    setIsUpdate(false);
    setPlazo(EMPTY_PLAZO);
  };

  const savePlazo = () => {
    if (isUpdate) {
      updatePlazo(plazo.plazo, plazo).subscribe({
        next: () => {
          setIsUpdate(false);
          getAllPlazos();
        },
        error: (err) => setMessage(err.response.data.message),
      });
    } else {
      createPlazo(plazo).subscribe({
        next: () => getAllPlazos(),
        error: (err) => setMessage(err.response.data.message),
      });
    }
  };

  const deletePlazo = (plazo: number) => {
    removePlazo(plazo).subscribe({
      next: () => getAllPlazos(),
      error: (err) => setMessage(err.response.data.message),
    });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={6}
      sx={{ height: '100vh' }}
    >
      <Grid item xs={3}>
        <Card elevation={4} sx={{ padding: 6 }}>
          <Grid container justifyContent="center" alignItems="center" spacing={3}>
            <Grid item container justifyContent="center" alignItems="center" spacing={3}>
              <Grid item>
                <TextField
                  id="plazo"
                  label="Plazo"
                  variant="filled"
                  fullWidth
                  value={plazo.plazo}
                  onChange={setValue}
                  InputProps={{ type: 'number' }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="tasaNormal"
                  label="Tasa Normal"
                  variant="filled"
                  fullWidth
                  value={plazo.tasaNormal}
                  onChange={setValue}
                  InputProps={{ type: 'number' }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="tasaPuntual"
                  label="Tasa Puntual"
                  variant="filled"
                  fullWidth
                  value={plazo.tasaPuntual}
                  onChange={setValue}
                  InputProps={{ type: 'number' }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" color="error" variant="subtitle1">
                {message}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<ClearAllRoundedIcon />} onClick={clear}>
                Limpiar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" startIcon={<SaveAsRoundedIcon />} onClick={savePlazo}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card elevation={4}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={plazos}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.plazo}
              loading={!plazos}
              disableSelectionOnClick
            />
          </Box>
        </Card>
      </Grid>
      <Grid item container justifyContent="center" alignItems="center" spacing={6}>
        <Grid item>
          <Button variant="outlined" startIcon={<WidgetsRoundedIcon />} onClick={() => navigate('/')}>
            Men&uacute;
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<ShoppingCartRoundedIcon />} onClick={() => navigate('/cotizacion')}>
            Cotizar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Plazos;
