import Routers from './Routers/Routers';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme.js';
import { firebaseApp, analytics } from './db/firebase';

analytics;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routers />
    </ThemeProvider>
  );
};

export default App;
