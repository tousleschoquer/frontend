import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

// Import your background image
import backgroundImage from '../public/assets/akira.jpg'; // Adjust the path as needed

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

const defaultTheme = createTheme();

export default function SignUp() {
  const { signup, error, isLoading } = useSignup();
  const navigate = useNavigate();
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    setConfirmPasswordError('');

    const success = await signup(username, email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              position: 'relative',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 2,
              padding: 3,
              width: '400px',
              marginLeft: { xs: 0, md: 'auto' },
              marginRight: { xs: 0, md: 'auto' },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <MailOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                S'inscrire
              </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Prénom"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Nom"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Adresse mail"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirmer le mot de passe"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Me prévenir par mail lors des nouveautés."
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
                S'INSCRIRE
              </Button>
              {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
              {confirmPasswordError && <div className="error" style={{ color: 'red' }}>{confirmPasswordError}</div>}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Déjà un compte ? Se connecter.
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
