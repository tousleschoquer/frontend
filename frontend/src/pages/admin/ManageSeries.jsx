import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Link, MenuItem } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

const ManageSeries = () => {
  const [newSerie, setNewSerie] = useState({
    name: '',
    author: '',
    category: '',
    description: ''
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [serieToDelete, setSerieToDelete] = useState(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/serie');
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchSeries();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSerie({
      ...newSerie,
      [name]: value,
    });
  };

  const createSerieInstance = async () => {
    try {
      await axios.post('http://localhost:4000/api/serie', newSerie);
      const response = await axios.get('http://localhost:4000/api/serie');
      setSeries(response.data);
    } catch (error) {
      console.error('Error creating series:', error);
    }
  };

  const handleAddSerie = async () => {
    if (
      newSerie.name.trim() === '' ||
      newSerie.author.trim() === '' ||
      newSerie.category.trim() === ''
    ) {
      setErrorDialogOpen(true);
      return;
    }

    setConfirmDialogOpen(true);
  };

  const handleDeleteSerie = (id) => {
    setDialogOpen(true);
    setSerieToDelete(id);
  };

  const confirmDeleteSerie = async () => {
    try {
      // Supprimer la série
      await axios.delete(`http://localhost:4000/api/serie/${serieToDelete}`);

      // Récupérer tous les mangas associés à la série
      const response = await axios.get(`http://localhost:4000/api/manga?serie=${serieToDelete}`);
      const mangasToDelete = response.data;

      // Supprimer chaque manga associé à la série
      await Promise.all(mangasToDelete.map(async (manga) => {
        await axios.delete(`http://localhost:4000/api/manga/${manga._id}`);
      }));

      // Mettre à jour la liste des séries après la suppression
      const seriesResponse = await axios.get('http://localhost:4000/api/serie');
      setSeries(seriesResponse.data);
    } catch (error) {
      console.error('Error deleting series and associated mangas:', error);
    }
    setDialogOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSeries = series.filter(serie =>
    serie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateFields = () => {
    if (
      newSerie.name.trim() === '' ||
      newSerie.author.trim() === '' ||
      newSerie.category.trim() === ''
    ) {
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    createSerieInstance();
    setNewSerie({
      name: '',
      author: '',
      category: '',
      description: ''
    });
    setConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" mb={3} sx={{ color: 'white' }}>
          Si tu ne trouves pas ta catégorie dans le sélecteur, rendez-vous dans{' '}
          <Link component={RouterLink} to="/admin/manage-categories" style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
            ajouter catégorie !
          </Link>
        </Typography>

        <Typography variant="h4" mb={3} sx={{ color: 'white' }}>Gérer les Séries</Typography>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nom de la série"
              name="name"
              value={newSerie.name}
              onChange={handleChange}
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
            <TextField
              fullWidth
              label="Auteur"
              name="author"
              value={newSerie.author}
              onChange={handleChange}
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
            <TextField
              select
              fullWidth
              label="Catégorie"
              name="category"
              value={newSerie.category}
              onChange={handleChange}
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newSerie.description}
              onChange={handleChange}
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
              multiline // Ajout de la propriété multiline pour permettre l'extension du champ
              rows={7} // Nombre de lignes initiales
            />
            <Button variant="contained" color="primary" onClick={handleAddSerie} sx={{ marginBottom: '16px' }}>
              Ajouter Série
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Rechercher par nom"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              sx={{ backgroundColor: '#FFFFFF', marginBottom: '16px' }}
              InputProps={{
                style: { color: 'black' }
              }}
            />
            {filteredSeries.map(serie => (
              <Card key={serie._id} sx={{ mb: 2, backgroundColor: '#FFFFFF' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ color: 'black' }}>{serie.name}</Typography>
                  <Typography variant="subtitle2" sx={{ color: 'black' }}>Auteur: {serie.author}</Typography>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteSerie(serie._id)}>
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
          Êtes-vous sûr de vouloir supprimer cette série ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button onClick={confirmDeleteSerie} color="error">Supprimer</Button>
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

      {/* Boîte de dialogue de confirmation pour l'ajout de série */}
      <Dialog open={confirmDialogOpen} onClose={handleCancel}>
        <DialogTitle sx={{ color: 'black' }}>Confirmation</DialogTitle>
        <DialogContent sx={{ color: 'black' }}>
          Êtes-vous sûr de vouloir créer cette série ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button onClick={handleConfirm} color="primary">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageSeries;
