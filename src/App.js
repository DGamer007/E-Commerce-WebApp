import { Alert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { close } from './redux/slices/alertSlice';
import AppRouter from './routers/client/AppRouter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f14d54'
    }
  }
});


const App = () => {

  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppRouter />
        <Snackbar
          open={alert.open}
          autoHideDuration={4000}
          onClose={e => { dispatch(close()); }}>
          {
            alert.open ? (
              <Alert
                onClose={e => { dispatch(close()); }}
                severity={alert.severity}
                sx={{ width: '100%' }} >
                {alert.message}
              </Alert>
            ) : null
          }
        </Snackbar>
      </ThemeProvider>
    </>
  );
};

export default App;
