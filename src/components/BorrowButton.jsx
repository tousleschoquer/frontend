import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Importe le contexte d'authentification

const BorrowButton = ({ mangaId }) => {
  const { user } = useContext(AuthContext); // Récupère l'utilisateur depuis le contexte d'authentification
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonText, setButtonText] = useState('Emprunter'); // Texte du bouton
  const [buttonDisabled, setButtonDisabled] = useState(false); // État pour désactiver le bouton si le manga n'est pas disponible

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        // Vérifier si le manga est disponible
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/manga/${mangaId}`);
        const manga = response.data;
        setButtonDisabled(!manga.available); // Désactiver le bouton si le manga n'est pas disponible
        setButtonText(manga.available ? 'Emprunter' : 'Indisponible');
      } catch (error) {
        console.error('Erreur lors de la vérification de la disponibilité du manga:', error);
      }
    };

    checkAvailability();
  }, [mangaId]);

  const handleBorrow = async () => {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!user) {
        setErrorMessage("L'utilisateur n'est pas connecté.");
        return;
      }

      // Créer un nouvel emprunt avec les attributs spécifiés
      const borrowData = {
        user: user._id, // Utilise l'ID de l'utilisateur connecté
        manga: [mangaId], // Si tu veux ajouter plusieurs mangas, ajoute-les ici
        pending: true,
      };

      // Envoyer une requête POST pour créer l'emprunt
      const borrowResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/borrow`, borrowData);
      console.log('Emprunt créé avec succès:', borrowResponse.data);

      // Mettre à jour la disponibilité des mangas empruntés
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/manga/${mangaId}`, { available: false });
      console.log(`Disponibilité du manga ${mangaId} mise à jour avec succès.`);

      // Mettre à jour l'état pour désactiver le bouton après confirmation de l'emprunt
      setButtonDisabled(true);
      setButtonText('Indisponible');
    } catch (error) {
      console.error('Erreur lors de la création de l\'emprunt:', error);
    }
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleBorrow} disabled={buttonDisabled} style={{ backgroundColor: buttonDisabled ? 'gray' : 'blue' }}>
        {buttonText}
      </button>
    </div>
  );
};

export default BorrowButton;
