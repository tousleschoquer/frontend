import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mangas } from '../data/manga';

const BorrowPage = () => {
  const [borrowStartDate, setBorrowStartDate] = useState(new Date());
  const [borrowEndDate, setBorrowEndDate] = useState(new Date());
  const [selectedMangas, setSelectedMangas] = useState([]);
  const [newManga, setNewManga] = useState({ title: '', available: true });

  const handleMangaSelection = (manga) => {
    setSelectedMangas((prevSelectedMangas) =>
      prevSelectedMangas.includes(manga)
        ? prevSelectedMangas.filter((m) => m !== manga)
        : [...prevSelectedMangas, manga]
    );
  };

  const handleAddManga = () => {
    if (newManga.title) {
      mangas.push({ ...newManga, id: mangas.length + 1 });
      setNewManga({ title: '', available: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const diffInDays = (borrowEndDate - borrowStartDate) / (1000 * 60 * 60 * 24);
    if (diffInDays > 21) {
      alert("La période d'emprunt ne doit pas dépasser 3 semaines.");
      return;
    }
    // Logique d'emprunt à ajouter ici
    alert('Emprunt effectué avec succès');
  };

  const styles = {
    borrowPage: {
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      width: '1200px'
    },
    banner: {
      backgroundImage: 'url(/jjk.jpg)', // Changez ce chemin avec le chemin de votre image
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      padding: '60px 20px',
      textAlign: 'center',
      height: '90px'
    },
    bannerText: {
      color: '#1A237E', // Couleur du texte de la bannière
      fontFamily: 'Arial, sans-serif',
      fontSize: '2rem', // Taille du texte
      fontWeight: 'bold',
      textShadow: '2px 2px 4px #000000' // Ombre du texte
    },
    boxRoot: {
      padding: '20px',
      margin: '0 auto',
      borderRadius: '8px',
      // Supprimer la couleur de fond et l'ombre
      backgroundColor: 'transparent',
      boxShadow: 'none',
      width: '800px' // Utiliser une largeur fixe
    }
    ,
    formControlLabelRoot: {
      display: 'block',
      margin: '5px 0',
      color: 'white' // Couleur du texte sous la bannière en blanc
    },
    buttonRoot: {
      marginTop: '20px'
    },
    textUnderBanner: {
      color: 'white' // Couleur du texte sous la bannière en blanc
    }
  };

  return (
    <div style={styles.borrowPage}>
      <Header />
      <div style={styles.banner}>
        <Typography variant="h4" style={styles.bannerText}>
          Emprunter des Mangas
        </Typography>
      </div>
      <Box sx={{ ...styles.boxRoot}}>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date de début"
                  value={borrowStartDate}
                  onChange={(date) => setBorrowStartDate(date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date de fin"
                  value={borrowEndDate}
                  onChange={(date) => setBorrowEndDate(date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" style={styles.textUnderBanner}>Sélectionnez les mangas à emprunter :</Typography>
            {mangas.map((manga) => (
              <FormControlLabel
                key={manga.id}
                control={
                  <Checkbox
                    checked={selectedMangas.includes(manga)}
                    onChange={() => handleMangaSelection(manga)}
                    disabled={!manga.available}
                  />
                }
                label={`${manga.title} ${manga.available ? '(Disponible)' : '(Indisponible)'}`}
                style={{ ...styles.formControlLabelRoot, color: manga.available ? 'white' : '#ff0000' }} // Changer la couleur du texte en gris clair pour les mangas indisponibles
              />
            ))}
          </Box>
          <Button type="submit" variant="contained" color="primary" sx={styles.buttonRoot}>
            Emprunter
          </Button>
        </form>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" style={styles.textUnderBanner}>Ton manga est indisponible ? Ajoutes-le à ta Wishlist :</Typography>
          <TextField
            label="Titre du manga"
            value={newManga.title}
            onChange={(e) => setNewManga({ ...newManga, title: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              style: { color: 'white' } // Couleur du label en blanc
            }}
            InputProps={{
              style: { color: 'white' } // Couleur du texte en blanc
            }}
          />
          <Button variant="contained" color="secondary" onClick={handleAddManga}>
            Ajouter Manga
          </Button>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default BorrowPage;
