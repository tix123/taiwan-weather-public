import './App.css';
import TaiwanWeatherReport from './components/TaiwanWeatherReport'
import { ThemeProvider, createTheme, responsiveFontSizes, } from '@mui/material/styles';

function App() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <TaiwanWeatherReport />
    </ThemeProvider>
  );
}

export default App;
