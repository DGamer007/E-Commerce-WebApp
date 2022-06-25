import { Alert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { close } from './redux/slices/alertSlice';
import AppRouter from './routers/client/AppRouter';

const App = () => {

  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  return (
    <>
      <AppRouter />
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={e => dispatch(close())}>
        <Alert
          onClose={e => dispatch(close())}
          severity={alert.severity}
          sx={{ width: '100%' }} >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;
