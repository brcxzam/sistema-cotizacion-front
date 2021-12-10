import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flex: '1 1 auto', margin: 3 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
