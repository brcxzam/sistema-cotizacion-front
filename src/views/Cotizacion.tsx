import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { Divider, MenuItem, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Plazo } from 'models/plazo';
import { Producto } from 'models/producto';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlazos } from 'services/plazos';
import { createProducto, findProductos, getProductos, removeProducto, updateProducto } from 'services/productos';

const columns = [
  {
    field: 'sku',
    headerName: 'SKU',
    flex: 1,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    flex: 2,
  },
  {
    field: 'precio',
    headerName: 'Precio',
    flex: 1,
  },
];

const Cotizacion = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [producto, setProducto] = useState<Producto>({} as Producto);

  const [plazos, setPlazos] = useState<Plazo[]>([]);
  const [plazoIndex, setPlazoIndex] = useState<number>(0);

  const findBy = (search: string) => {
    findProductos(search.toLowerCase()).subscribe({
      next: ({ data }) => setProductos(data),
      error: (err) => setProductos([]),
    });
  };

  useEffect(() => {
    getPlazos().subscribe({
      next: ({ data }) => setPlazos(data),
      error: (err) => setProductos([]),
    });
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={6}
      sx={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Card elevation={4} sx={{ padding: 3 }}>
          <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
            <Grid item>
              <TextField
                id="search"
                label="Ingresa SKU o Descripci&oacute;n"
                variant="filled"
                fullWidth
                onKeyPress={(e) => e.key === 'Enter' && findBy((e.target as HTMLInputElement).value)}
              />
            </Grid>
            <Grid item>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={productos}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row) => row.sku}
                  loading={!productos}
                  onRowClick={(dta) => setProducto(dta.row as Producto)}
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {Object.keys(producto).length !== 0 && (
        <Grid item>
          <Card elevation={4} sx={{ padding: 6 }}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
              <Grid item>
                <TextField
                  id="plazo"
                  select
                  label="Selecciona un n&uacute;mero de plazo"
                  value={plazoIndex}
                  onChange={(e) => setPlazoIndex(Number(e.target.value))}
                  variant="filled"
                  sx={{ width: 300 }}
                >
                  {plazos.map((p, i) => (
                    <MenuItem key={i} value={i}>
                      {p.plazo}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {plazos && plazos[plazoIndex] && (
                <Grid item container justifyContent="center" alignItems="center" spacing={3}>
                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography align="center" variant="subtitle1" color="primary">
                        SKU
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <Typography align="center">{producto.sku}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography align="center" variant="subtitle1" color="primary">
                        Descripci&oacute;n
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <Typography align="center">{producto.descripcion}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography align="center" variant="subtitle1" color="primary">
                        Precio
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <Typography align="center">{producto.precio}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography align="center" variant="subtitle1" color="primary">
                        Abono Normal
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <Typography align="center">
                        {(producto.precio * plazos[plazoIndex].tasaNormal + producto.precio) / plazos[plazoIndex].plazo}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
                  >
                    <Grid item>
                      <Typography align="center" variant="subtitle1" color="primary">
                        Abono Puntual
                      </Typography>
                      <Divider />
                    </Grid>
                    <Grid item>
                      <Typography align="center">
                        {(producto.precio * plazos[plazoIndex].tasaPuntual + producto.precio) /
                          plazos[plazoIndex].plazo}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Card>
        </Grid>
      )}
      <Grid item container justifyContent="center" alignItems="center" spacing={6}>
        <Grid item>
          <Button variant="outlined" startIcon={<WidgetsRoundedIcon />} onClick={() => navigate('/')}>
            Men&uacute;
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cotizacion;
