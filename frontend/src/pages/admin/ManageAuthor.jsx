import React from 'react';
import { Typography, Box, Button, TextField, Grid } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ManageAuthor = () => {
  const handleAddAuthor = () => {
    // Logique d'ajout d'auteur ici
    console.log("Ajouter un auteur");
  };

  const handleDeleteAuthor = () => {
    // Logique de suppression d'auteur ici
    console.log("Supprimer un auteur");
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Gestion des Auteurs</Typography>
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Nom de l'auteur" variant="outlined"
              style={{ backgroundColor: '#F0F0F0', marginBottom: '16px' }} // Styles communs
              InputProps={{
                style: { color: 'black' } // Style pour la couleur du texte
              }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" onClick={handleAddAuthor}>
              Ajouter un Auteur
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Rechercher un auteur" variant="outlined"
              style={{ backgroundColor: '#F0F0F0', marginBottom: '16px' }} // Styles communs
              InputProps={{
                style: { color: 'black' } // Style pour la couleur du texte
              }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" onClick={handleDeleteAuthor}>
              Supprimer un Auteur
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default ManageAuthor;
