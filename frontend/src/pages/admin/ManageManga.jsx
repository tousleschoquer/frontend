import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Link, MenuItem } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const ManageManga = () => {
  const [newManga, setNewManga] = useState({
    title: '',
    available: true,
    image: '',
    series: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mangas, setMangas] = useState([]);
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/manga`);
        setMangas(response.data);
      } catch (error) {
        console.error('Error fetching mangas:', error);
      }
    };

    const fetchSeries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/serie`);
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/category`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMangas();
    fetchSeries();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewManga({
      ...newManga,
      [name]: value,
    });
  };

  const createMangaInstance = async () => {
    try {
      // Créer une instance avec les valeurs saisies et available=true
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/manga`, { ...newManga, available: true });
      // Rafraîchir la liste des mangas après ajout
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/manga`);
      setMangas(response.data);
    } catch (error) {
      console.error('Error creating manga:', error);
    }
  };

  const handleAddManga = async () => {
    // Vérifier si tous les champs obligatoires sont remplis
    if (
      newManga.title.trim() === '' ||
      newManga.series.trim() === '' ||
      newManga.image.trim() === ''
    ) {
      setErrorDialogOpen(true);
      return;
    }

    // Afficher la boîte de dialogue de confirmation
    setConfirmDialogOpen(true);
  };

  const handleDeleteManga = (id) => {
    setDialogOpen(true);
    setMangaToDelete(id);
  };

  const confirmDeleteManga = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/manga/${mangaToDelete}`);
      // Rafraîchir la liste des mangas après suppression
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/manga`);
      setMangas(response.data);
    } catch (error) {
      console.error('Error deleting manga:', error);
    }
    setDialogOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMangas = mangas.filter(manga =>
    manga.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateFields = () => {
    if (
      newManga.title.trim() === '' ||
      newManga.series.trim() === '' ||
      newManga.image.trim() === ''
    ) {
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    // Appeler la fonction pour créer une instance de manga
    createMangaInstance();
    // Réinitialiser les champs après l'ajout
    setNewManga({
      title: '',
      available: true,
      image: '',
      series: '',
    });
    // Fermer la boîte de dialogue de confirmation
    setConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    // Fermer la boîte de dialogue de confirmation
    setConfirmDialogOpen(false);
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
      <Typography variant="body1" mb={3} sx={{ color: 'white' }}>
          Si tu ne trouves pas ta série dans le sélecteur, rendez-vous dans{' '}
          <Link component={RouterLink} to="/admin/manage-series" style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
            ajouter série !
          </Link>
        </Typography>

        <Typography variant="h4" mb={3} sx={{ color: 'white' }}>Gérer les Mangas</Typography>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            {/* Formulaire pour ajouter un nouveau manga */}
            <TextField
              fullWidth
              label="Titre"
              name="title"
              value={newManga.title}
              onChange={handleChange}
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
            <TextField
              select
              fullWidth
              label="Série"
              name="series"
              value={newManga.series}
              onChange={handleChange}
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
            >
              {series.map((serie) => (
                <MenuItem key={serie._id} value={serie._id}>
                  {serie.name}
                </MenuItem>
              ))}
            </TextField>
            {/* Champ pour l'URL de l'image */}
            <TextField
              fullWidth
              label="URL de l'image"
              name="image"
              value={newManga.image}
              onChange={handleChange}
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
            {/* Bouton pour ajouter le manga */}
            <Button variant="contained" color="primary" onClick={handleAddManga} sx={{ marginBottom: '16px' }}>
              Ajouter Manga
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Rechercher par titre"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
              />
              {/* Liste des mangas filtrée et boutons de suppression */}
              {filteredMangas.map(manga => (
                <Card key={manga._id} sx={{ mb: 2, backgroundColor: '#FFFFFF' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ color: 'black' }}>{manga.title}</Typography>
                    {/* Autres détails du manga (catégorie, description, etc.) */}
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteManga(manga._id)}>
                      Supprimer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Footer />
        {/* Boîte de dialogue de confirmation pour la suppression */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle sx={{ color: 'black' }}>Confirmation de la suppression</DialogTitle>
          <DialogContent sx={{ color: 'black' }}>
            Êtes-vous sûr de vouloir supprimer ce manga ?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
            <Button onClick={confirmDeleteManga} color="error">Supprimer</Button>
          </DialogActions>
        </Dialog>
        {/* Boîte de dialogue d'erreur si tous les champs ne sont pas remplis */}
        <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
          <DialogTitle sx={{ color: 'black' }}>Erreur</DialogTitle>
          <DialogContent sx={{ color: 'black' }}>
            Veuillez remplir tous les champs obligatoires.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setErrorDialogOpen(false)}>OK</Button>
          </DialogActions>
        </Dialog>
        {/* Boîte de dialogue de confirmation pour l'ajout de manga */}
        <Dialog open={confirmDialogOpen} onClose={handleCancel}>
          <DialogTitle sx={{ color: 'black' }}>Confirmation</DialogTitle>
          <DialogContent sx={{ color: 'black' }}>
            Êtes-vous sûr de vouloir créer ce manga ?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Annuler</Button>
            <Button onClick={handleConfirm} color="primary">Confirmer</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  export default ManageManga;
  