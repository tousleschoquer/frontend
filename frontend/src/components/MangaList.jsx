import React from 'react';
import { Link } from 'react-router-dom';
import BorrowButton from './BorrowButton'; // Importe le composant BorrowButton

const styles = {
  mangaGridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px', // Espacement entre les mangas
  },
  mangaGridItem: {
    width: '260px', // Largeur fixe pour chaque manga
    textAlign: 'center', // Centre le contenu du manga
    borderRadius: '10px', // Coins arrondis pour chaque manga
    padding: '10px', // Ajoute de l'espace à l'intérieur de chaque manga
    height: '450px', // Hauteur fixe pour chaque carte
    backgroundColor: '#2c2c2c', // Couleur de fond pour chaque manga
    border: '1px solid #555', // Bordure pour chaque manga
    boxSizing: 'border-box', // Inclut le rembourrage et la bordure dans le calcul de la largeur
  },
  
  
  mangaImageExtraSmall: {
    width: '80%', // Taille réduite de l'image
    height: 'auto', // Maintient le ratio hauteur-largeur
    margin: '0 auto', // Centre l'image horizontalement
  },
  mangaTitle: {
    fontSize: '0.8em', // Taille de la police pour le titre
    marginTop: '10px', // Marge supérieure pour le titre
    color: '#FFF', // Couleur du titre
    overflow: 'hidden', // Cache tout contenu dépassant de la zone
    whiteSpace: 'nowrap', // Empêche le texte de passer à la ligne
    textOverflow: 'ellipsis', // Ajoute des points de suspension à la fin du texte tronqué
  },
  
  mangaCategory: {
    fontSize: '0.9em', // Taille de la police pour la catégorie
    marginTop: '5px', // Marge supérieure pour la catégorie
    color: '#BBB', // Couleur de la catégorie
  },
  mangaAvailability: {
    fontSize: '0.9em', // Taille de la police pour la disponibilité
    marginTop: '5px', // Marge supérieure pour la disponibilité
    color: '#BBB', // Couleur de la disponibilité
  },
};

const MangaList = ({ mangas }) => {
  return (
    <div style={styles.mangaGridContainer}>
      {mangas.map((manga) => (
        <div key={manga._id} style={styles.mangaGridItem}>
          <Link to={`/manga/${manga._id}`}>
            <img src={manga.image} alt={manga.title} style={styles.mangaImageExtraSmall} />
          </Link>
          <h3 style={styles.mangaTitle}>{manga.title}</h3>
          {manga.series && manga.series.category && (
            <p style={styles.mangaCategory}>{manga.series.category.name}</p>
          )}
          {/* Ajoute le composant BorrowButton en dessous de chaque manga */}
          <BorrowButton mangaId={manga._id} />
        </div>
      ))}
    </div>
  );
};

export default MangaList;
