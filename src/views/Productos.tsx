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
import { Producto } from 'models/producto';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto, getProductos, removeProducto, updateProducto } from 'services/productos';

const EMPTY_PRODUCTO: Producto = {
  sku: 0,
  descripcion: '',
  precio: 0,
};

const Productos = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [producto, setProducto] = useState<Producto>(EMPTY_PRODUCTO);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

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
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditRoundedIcon />}
          label="Edit"
          onClick={() => {
            setProducto(params.row as Producto);
            setIsUpdate(true);
          }}
        />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => deleteProducto(params.row.sku)} />,
      ],
    },
  ];

  useEffect(() => {
    getAllProductos();
  }, []);

  const getAllProductos = () => {
    getProductos().subscribe({
      next: ({ data }) => {
        setProductos(data);
        setProducto(EMPTY_PRODUCTO);
      },
      error: (err) => {
        setProductos([]);
        if (err.response.status !== 404) {
          setMessage(err.response.data.message);
        }
      },
    });
  };

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setMessage('');
    setProducto({ ...producto, [id]: value });
  };

  const clear = () => {
    setIsUpdate(false);
    setProducto(EMPTY_PRODUCTO);
  };

  const saveProducto = () => {
    const productoCrt = { ...producto, descripcion: producto.descripcion.toLowerCase() };
    if (isUpdate) {
      updateProducto(producto.sku, productoCrt).subscribe({
        next: () => {
          setIsUpdate(false);
          getAllProductos();
        },
        error: (err) => setMessage(err.response.data.message),
      });
    } else {
      createProducto(productoCrt).subscribe({
        next: () => getAllProductos(),
        error: (err) => setMessage(err.response.data.message),
      });
    }
  };

  const deleteProducto = (sku: number) => {
    removeProducto(sku).subscribe({
      next: () => getAllProductos(),
      error: (err) => setMessage(err.response.data.message),
    });
  };

  const multiplica = (n1, n2) => {
    let result = 0;

    for (let i = 0; i < n2; i++) {
      result += n1;
    }

    return result;
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
                  id="sku"
                  label="SKU"
                  variant="filled"
                  fullWidth
                  value={producto.sku}
                  onChange={setValue}
                  InputProps={{ type: 'number' }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="descripcion"
                  label="Descripci&oacute;n"
                  variant="filled"
                  fullWidth
                  value={producto.descripcion}
                  onChange={setValue}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="precio"
                  label="Precio"
                  variant="filled"
                  fullWidth
                  value={producto.precio}
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
              <Button variant="contained" startIcon={<SaveAsRoundedIcon />} onClick={saveProducto}>
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
              rows={productos}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.sku}
              loading={!productos}
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

export default Productos;
