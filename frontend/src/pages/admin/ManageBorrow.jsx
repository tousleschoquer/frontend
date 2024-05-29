import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useProfile } from '../../hooks/useProfile'; // Assurez-vous d'importer le hook useProfile

const ManageBorrow = () => {
  const [borrows, setBorrows] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const { profile } = useProfile(); // Utilisez le hook useProfile pour obtenir les informations de l'utilisateur

  useEffect(() => {
    if (!profile || !profile.admin) {
      // Si l'utilisateur n'est pas administrateur, redirigez-le ou affichez un message d'accès refusé
      console.log('Access denied for user:', profile);
      return;
    }

    const fetchBorrows = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/borrow');
        setBorrows(response.data);
      } catch (error) {
        console.error('Error fetching borrows:', error);
      }
    };

    fetchBorrows();
  }, [profile]);

  if (!profile || !profile.admin) {
    // Affichez un message d'accès refusé si l'utilisateur n'est pas administrateur
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

  const handleConfirmFinish = (id) => {
    setRequestToDelete(id);
    setDialogOpen(true);
  };

  const confirmFinishRequest = async () => {
    try {
      // Récupérer l'emprunt correspondant à requestToDelete
      const borrowToUpdate = borrows.find(borrow => borrow._id === requestToDelete);
      // Mettre à jour la valeur 'available' de chaque manga dans l'emprunt
      await Promise.all(borrowToUpdate.manga.map(async mangaId => {
        await axios.put(`http://localhost:4000/api/manga/${mangaId}`, { available: true });
      }));
      // Supprimer l'emprunt de la liste
      await axios.delete(`http://localhost:4000/api/borrow/${requestToDelete}`);
      setBorrows(borrows.filter(request => request._id !== requestToDelete));
      setDialogOpen(false);
    } catch (error) {
      console.error('Error deleting borrow:', error);
    }
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Gérer les Emprunts</Typography>
        <Grid container spacing={3}>
          {borrows.map(borrow => (
            <Grid item xs={12} key={borrow._id}>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">Utilisateur: {borrow.user}</Typography>
                  <Typography variant="body2">Manga: {borrow.manga}</Typography>
                  <Typography variant="body2">Statut: {borrow.pending ? 'En attente' : 'Terminé'}</Typography>
                  <Button variant="contained" onClick={() => handleConfirmFinish(borrow._id)} sx={{ mt: 2 }}>
                    Terminer
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir terminer cette demande ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button onClick={confirmFinishRequest} color="error">Terminer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageBorrow;
