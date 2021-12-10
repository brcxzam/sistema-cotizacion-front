import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cotizacion from 'views/Cotizacion';
import Home from 'views/Home';
import Layout from 'views/Layout';
import Plazos from 'views/Plazos';
import Productos from 'views/Productos';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/plazos" element={<Plazos />} />
        <Route path="/cotizacion" element={<Cotizacion />} />
      </Routes>
    </Layout>
  );
}

export default App;
