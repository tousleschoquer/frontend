import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Box, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosInstance from '../axiosInstance';
import { useProfile } from '../hooks/useProfile';

const UserProfile = () => {
  const { profile } = useProfile();

  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);
  const [editedEmail, setEditedEmail] = useState(profile ? profile.email : '');
  const [editedUsername, setEditedUsername] = useState(profile ? profile.username : '');
  const [recommendedManga, setRecommendedManga] = useState(null);

  useEffect(() => {
    if (profile) {
      setEditedEmail(profile.email);
      setEditedUsername(profile.username);
    }
  }, [profile]);

  useEffect(() => {
    const fetchRecommendedManga = async () => {
      try {
        console.log('Fetching recommended manga...');
        const response = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_URL}/api/manga/6655278c070fff0e14f1b7b0`);
        console.log('Recommended manga fetched:', response.data);
        setRecommendedManga(response.data);
      } catch (error) {
        console.error('Error fetching recommended manga:', error);
      }
    };

    fetchRecommendedManga();
  }, []);

  const handleEditProfile = () => {
    setOpenEditProfileDialog(true);
  };

  const handleCloseEditProfileDialog = () => {
    setOpenEditProfileDialog(false);
  };

  const handleSaveProfile = async () => {
    try {
      // Logique pour sauvegarder les modifications du profil
      const updatedProfile = { username: editedUsername };
      await axiosInstance.put(`/api/user/profile`, updatedProfile);
      
      // Mettre à jour localement le nom d'utilisateur dans le profil
      setEditedUsername(editedUsername);
  
      handleCloseEditProfileDialog();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  const randomAvatar = () => {
    const avatars = [
      'https://th.bing.com/th/id/R.22052174a8a06bb1d365346298237e55?rik=EVA39iuaLp2exg&pid=ImgRaw&r=0'];
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Profil de {profile ? profile.username : 'Utilisateur'}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar alt={profile ? profile.username : 'Utilisateur'} src={randomAvatar()} sx={{ width: 150, height: 150 }} />
           
            <Button variant="contained" component={Link} to="/wishlist" sx={{ mt: 2 }}>Voir Wishlist</Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" mb={2}>Informations :</Typography>
            <Typography variant="subtitle1">Adresse email : {profile ? profile.email : ''}</Typography>
            <Typography variant="h5" mb={2}>Manga recommandé :</Typography>
            {recommendedManga ? (
              <Card key={recommendedManga._id} sx={{ mb: 2 }}>
                <CardContent>
                  <img src={recommendedManga.image} alt={recommendedManga.title} style={{ width: 150, height: 'auto' }} />
                  <Typography variant="subtitle1">{recommendedManga.title}</Typography>
                  <Typography variant="body2" color="textSecondary">Série : {recommendedManga.series.name}</Typography>
                  <Typography variant="body2" color="textSecondary">Auteur : {recommendedManga.series.author}</Typography>
                  <Typography variant="body2" color="textSecondary">Catégorie : {recommendedManga.series.category.name}</Typography>
                  <Typography variant="body2" color="textSecondary">Description : {recommendedManga.series.description}</Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body2">Chargement...</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default UserProfile;
