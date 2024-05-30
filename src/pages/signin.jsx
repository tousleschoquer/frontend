import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import narutoImage from '../public/assets/naruto.jpg';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MangaTake
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Créer un thème personnalisé avec la couleur de fond de la page modifiée
const customTheme = createTheme({
  palette: {
    mode: 'light', // Mode de palette léger
    background: {
      default: '#00000088', // Changer la couleur de fond de la page ici
    },
  },
});

export default function SignInSide() {

  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    console.log({ email, password });

    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          position: 'absolute', // Make the box take the full screen
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Grid container component="main" sx={{ height: '100vh', width: '90vw' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={9}
            sx={{
              flexGrow: 1,
              backgroundImage: `url(${narutoImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover', // Pour ajuster la taille de l'image à la zone
              backgroundPosition: 'center', // Pour la centrer dans le conteneur
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={3}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2, // Ajout de padding pour l'espace autour du formulaire
                width: '100%', // Assurez-vous que le formulaire occupe toute la largeur disponible
                maxWidth: '400px', // Définissez une largeur maximale pour le formulaire
              }}
            >
              <Button
                href="/"
                variant="text"
                sx={{ alignSelf: 'flex-start', mb: 2 }} // Aligne le bouton sur la gauche et ajoute une marge en bas
              >
                Accueil
              </Button>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <MailOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Se connecter
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Se souvenir de moi"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  Se connecter
                </Button>
                {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié?
                    </Link>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href="/signup" variant="body2">
                      {"Tu n'as pas de compte? S'inscrire."}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
