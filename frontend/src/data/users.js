// src/data/users.js
export const users = [
  {
    id: 1,
    username: 'Utilisateur1',
    profilePicture: 'url_de_la_photo1',
    borrowedBooks: [1, 3], // IDs des mangas empruntés par l'utilisateur
    wishlist: [2, 4] // IDs des mangas dans la liste de souhaits de l'utilisateur
  },
  {
    id: 2,
    username: 'Utilisateur2',
    profilePicture: 'url_de_la_photo2',
    borrowedBooks: [5],
    wishlist: [1, 3]
  }
  // Ajoutez plus d'utilisateurs ici...
];
