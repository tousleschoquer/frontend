import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useProfile } from '../../hooks/useProfile'; 

const AdminDashboard = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { profile } = useProfile();


  console.log('Initial isAdmin:', isAdmin);
  console.log('Initial loading:', loading);
  console.log('Initial user:', user);

  useEffect(() => {
    if (profile) {
      console.log('User available:', profile);
      setIsAdmin(profile.admin);
      setLoading(false);
    } else {
      console.log('No user available');
      setIsAdmin(false);
      setLoading(false);
    }
  }, [profile]);

  if (loading) {
    console.log('Loading state:', loading);
    return <Typography variant="h6">Chargement...</Typography>;
  }

  if (!isAdmin) {
    console.log('Access denied for user:', profile);
    return (
      <div>
        <Header />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Accès refusé</Typography>
          <Typography variant="body1">Vous devez être connecté en tant qu'administrateur pour accéder à cette page.</Typography>
        </Box>
        <Footer />
      </div>
    );
  }

  console.log('Admin access granted for user:', profile);
  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Tableau de Bord Administrateur</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Gérer les Mangas</Typography>
                <Button variant="contained" color="primary" component={Link} to="/admin/manage-manga" sx={{ marginTop: 2 }}>
                  Gérer
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Gérer les Users</Typography>
                <Button variant="contained" color="primary" component={Link} to="/admin/manage-accounts" sx={{ marginTop: 2 }}>
                  Gérer
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Gérer les Séries</Typography>
                <Button variant="contained" color="primary" component={Link} to="/admin/manage-series" sx={{ marginTop: 2 }}>
                  Gérer
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Gérer les Catégories</Typography>
                <Button variant="contained" color="primary" component={Link} to="/admin/manage-categories" sx={{ marginTop: 2 }}>
                  Gérer
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Gérer les Emprunts</Typography>
                <Button variant="contained" color="primary" component={Link} to="/admin/manage-borrows" sx={{ marginTop: 2 }}>
                  Gérer
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Ajoutez d'autres cartes pour les différentes fonctionnalités d'administration ici */}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
