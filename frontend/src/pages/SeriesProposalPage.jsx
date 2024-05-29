import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SeriesProposalPage = () => {
  const [seriesName, setSeriesName] = useState('');

  const handleChange = (event) => {
    setSeriesName(event.target.value);
  };

  const handleSubmit = () => {
    // Logique d'envoi de la proposition de série
    console.log('Proposition de série envoyée :', seriesName);
    // Réinitialiser le champ de texte après l'envoi
    setSeriesName('');
  };

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Proposer une Série</Typography>
        <Typography variant="body1" mb={2}>
          Entrez le nom de la série que vous souhaitez proposer :
        </Typography>
        <TextField
          label="Nom de la Série"
          variant="outlined"
          value={seriesName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Envoyer la Proposition
        </Button>
      </Box>
      <Footer />
    </div>
  );
};

export default SeriesProposalPage;
