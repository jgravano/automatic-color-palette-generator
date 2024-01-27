import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ImageUploader from './components/ImageUploader';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          color palette generator
        </Typography>
        <ImageUploader />
      </Container>
    </ThemeProvider>
  );
}

export default App;
