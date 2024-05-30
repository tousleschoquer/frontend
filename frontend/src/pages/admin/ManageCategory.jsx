import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, TextField, Grid, Card, CardContent } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useProfile } from '../../hooks/useProfile';


const ManageCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile || !profile.admin) {
      // Si l'utilisateur n'est pas administrateur, redirigez-le ou affichez un message d'accès refusé
      console.log('Access denied for user:', profile);
      return;
    }
    fetchCategories();
  }, [profile]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/category`, { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Gestion des Catégories</Typography>
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nom de la catégorie"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{ backgroundColor: '#F0F0F0', marginBottom: '16px' }} 
              InputProps={{
                style: { color: 'black' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
              Ajouter une Catégorie
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Rechercher une catégorie"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              style={{ backgroundColor: '#F0F0F0', marginBottom: '16px' }} 
              InputProps={{
                style: { color: 'black' }
              }}
            />
          </Grid>
        </Grid>
        {filteredCategories.map(category => (
          <Card key={category._id} sx={{ mb: 2, backgroundColor: '#FFFFFF' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ color: 'black' }}>{category.name}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleDeleteCategory(category._id)}>
                Supprimer
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Footer />
    </div>
  );
};

export default ManageCategory;
