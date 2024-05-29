import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FaqPage = () => {
  const faqItems = [
    {
      question: "Comment puis-je emprunter un manga ?",
      answer: "Pour emprunter un manga, vous devez d'abord vous connecter à votre compte. Ensuite, accédez à la page du catalogue, trouvez le manga que vous souhaitez emprunter, et cliquez sur le bouton 'Emprunter'. Suivez les instructions pour finaliser l'emprunt."
    },
    {
      question: "Comment trouver un manga dont je n'ai plus le titre ?",
      answer: "Utilisez la recherche avancée et écrivez ce dont vous vous y souvenez, vous y trouverez peut-etre votre bonheur !"
    },
    {
      question: "Je ne parviens pas à me connecter à mon compte, que dois-je faire ?",
      answer: "Si vous rencontrez des problèmes pour vous connecter à votre compte, assurez-vous d'utiliser les bonnes informations d'identification (nom d'utilisateur et mot de passe). Si vous avez oublié votre mot de passe, veuillez contacter le support."
    },
    
  ];

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Foire aux questions (FAQ)</Typography>
        {faqItems.map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box mt={3}>
          <Typography variant="h6">Besoin d'aide supplémentaire ? Contactez-nous :</Typography>
          <Typography variant="body1">Adresse e-mail : support@mangatake.fr</Typography>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default FaqPage;
