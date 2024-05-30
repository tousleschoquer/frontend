import React, { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Définition de notifications fictives
const fakeNotifications = [
  { id: 1, message: 'Nouvelle recommandation de manga disponible!', timestamp: '2024-05-25 10:00:00' },
  { id: 2, message: 'Rappel : Renvoyer "One Piece" avant le 2024-06-01', timestamp: '2024-05-24 14:30:00' },
  { id: 3, message: 'Joyeux anniversaire! Profitez d\'une remise de 20% sur tous les mangas.', timestamp: '2024-05-22 08:00:00' },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Utilisation des notifications fictives lors du montage du composant
    setNotifications(fakeNotifications);
  }, []);

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Notifications</Typography>
        {notifications.length === 0 ? (
          <Typography variant="body1">Aucune notification pour le moment.</Typography>
        ) : (
          <List>
            {notifications.map(notification => (
              <ListItem key={notification.id}>
                <ListItemText primary={notification.message} secondary={notification.timestamp} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
