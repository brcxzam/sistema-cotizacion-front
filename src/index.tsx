import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { LinkProps } from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { store } from 'store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }>(
  (props, ref) => {
    const { href, ...other } = props;
    return <RouterLink ref={ref} to={href || ''} {...other} />;
  },
);

const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#006341',
      },
      secondary: {
        main: '#00957a',
      },
      error: {
        main: '#bf0d3e',
      },
      warning: {
        main: '#ff9e1b',
      },
      success: {
        main: '#43b02a',
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  },
  esES,
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
