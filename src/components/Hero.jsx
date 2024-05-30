import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../public/assets/souleater.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <img src={Image} alt="Manga Banner" className="hero-image" />
      <div className="hero-overlay">
        <h1 style={{ fontSize: '3rem', textAlign: 'center', width: '100%' }}>
          Découvrez notre collection de mangas à emprunter
        </h1>
        <Link
          to="/catalog"
          className="cta-button"
          style={{ backgroundColor: '#1a237e', color: 'white' }}
        >
          Voir le catalogue
        </Link>
      </div>
    </section>
  );
};

export default Hero;
