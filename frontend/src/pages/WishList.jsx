import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Utilisez useSelector pour accéder à l'état de connexion de l'utilisateur
import { users } from '../data/users';
import { mangas } from '../data/manga';

const Wishlist = ({ userId }) => {
  // Récupérer les données de l'utilisateur connecté
  const user = users.find(u => u.id === userId);

  // Utiliser useSelector pour accéder à l'état de connexion de l'utilisateur
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  // Fonction pour emprunter un manga
  const borrowManga = mangaId => {
    // Votre logique pour emprunter un manga
    console.log(`Manga emprunté avec l'ID: ${mangaId}`);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Liste de souhaits de {user.username}</h1>
          {user.wishlist.length > 0 ? (
            <ul>
              {user.wishlist.map(mangaId => {
                const manga = mangas.find(m => m.id === mangaId);
                return (
                  <li key={mangaId}>
                    <div>
                      <img src={manga.image} alt={manga.title} />
                      <h3>{manga.title}</h3>
                      <p>{manga.description}</p>
                      {manga.available ? (
                        <button onClick={() => borrowManga(manga.id)}>Emprunter</button>
                      ) : (
                        <p>Ce manga n'est pas disponible pour l'emprunt pour le moment.</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Votre liste de souhaits est vide.</p>
          )}
        </div>
      ) : (
        <div>
          <h1>Liste de souhaits</h1>
          <p>Vous n'êtes pas connecté.</p>
          <p>
            <Link to="/signin">Se connecter</Link> pour accéder à votre liste de souhaits.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
