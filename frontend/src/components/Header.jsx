import React from 'react';
import './Header.css';
import mangatakeImage from '../public/assets/logo_mangatake_blue.jpg';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useProfile } from '../hooks/useProfile';

// Fonction pour l'en-tête lorsque l'utilisateur est connecté
const HeaderLoggedIn = ({ handleLogout }) => (
  <header>
    <a href="/">
      <img src={mangatakeImage} alt="MangaTake Logo" className="logo" />
    </a>
    <nav>
      <Link to="/profile" className="button-profile">Profil</Link>
      <button onClick={handleLogout} className="button-logout">Déconnexion</button>
    </nav>
  </header>
);

// Fonction pour l'en-tête lorsque l'utilisateur n'est pas connecté
const HeaderLoggedOut = () => (
  <header>
    <a href="/">
      <img src={mangatakeImage} alt="MangaTake Logo" className="logo" />
    </a>
    <nav>
      <Link to="/signin" className="button-signin">Se connecter</Link>
      <Link to="/signup" className="button-signup">Tu n'as pas de compte ? S'inscrire.</Link>
    </nav>
  </header>
);

// Fonction pour l'en-tête qui détermine quel en-tête afficher en fonction de l'état de connexion de l'utilisateur
const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { profile } = useProfile();

  const handleLogout = () => {
    logout();
  };

  return user ? <HeaderLoggedIn handleLogout={handleLogout} /> : <HeaderLoggedOut />;
};

export default Header;
