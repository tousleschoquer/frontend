import React from 'react';
import { Button } from '@mui/material';
import { users } from '../data/users'; // Importez les données des utilisateurs (à remplacer par votre propre méthode de récupération des données utilisateur)

const AddToWishlistButton = ({ userId, mangaId }) => {
  const handleAddToWishlist = () => {
    // Trouver l'utilisateur dans les données et mettre à jour sa liste de souhaits
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1 && !users[userIndex].wishlist.includes(mangaId)) {
      users[userIndex].wishlist.push(mangaId);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddToWishlist}
    >
      Ajouter à la Wishlist
    </Button>
  );
};

export default AddToWishlistButton;
