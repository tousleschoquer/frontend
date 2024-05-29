import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">support@mangatake.fr</Link>
        <Link to="/faq"></Link>
        <Link to="/feedback#about">À propos</Link>
        <Link to="/feedback#conditions">Conditions d'utilisation</Link>
        <Link to="/feedback#privacy">Politique de confidentialité</Link>
        <Link to="/admin">Administrateur</Link>
      </div>
      <div className="social-media">
        {/* Liens vers les réseaux sociaux */}
      </div>
    </footer>
  );
};

export default Footer;
