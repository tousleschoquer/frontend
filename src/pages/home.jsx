import React, { useEffect, useState } from 'react';
import './home.css';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MangaList from '../components/MangaList';


// Add more manga IDs to the arrays
const popularMangasIds = [
  '6655278c070fff0e14f1b7b0',
  '66557aba6d5002f98382b524',
  '66557a746d5002f98382b521',
  '6655781b6d5002f98382b503'
];

const HomePage = () => {
  const [popularMangasDetails, setPopularMangasDetails] = useState([]);
  const [customText, setCustomText] = useState(''); // State to manage the custom text

  useEffect(() => {
    const fetchMangasDetails = async () => {
      try {
        const popularDetails = await Promise.all(popularMangasIds.map(async (id) => {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/manga/${id}`);
          return response.data;
        }));
        setPopularMangasDetails(popularDetails);
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    };

    fetchMangasDetails();
  }, []);

  return (
    <div className="homepage">
      <Header />
      <Hero />
      <div className="button-container">
        <div className="advanced-search-button-container">
          <Link to="/search" className="advanced-search-button">
            Recherche avancée
          </Link>
        </div>
      </div>
      <div className="manga-grid">
        <h2>Recommendations de l'équipe</h2>
        <MangaList mangas={popularMangasDetails} />
      </div>
      <div className="static-text-container">
        <p>Bienvenue sur notre site de mangas! Ici, vous trouverez une sélection des mangas les plus populaires et des recommandations de notre équipe. N'hésitez pas à explorer et à découvrir de nouvelles histoires passionnantes. Bonne lecture! 
        </p>
        <p>Ce site n'était qu'un premier pas dans le but de rendre plus instinctif, épuré et facile l'interface d'emprunt des livres par internet aux utilisateurs, qui peuvent être des enfants en plein éveil ou bien même des personnes âgées trop peu initiées aux outils informatiques. Cette facilité à naviguer vaut aussi pour les personnes s'occupant des livres, qui pourront manipuler les données en quelques clics et sans la moindre difficulté. Profitez bien !</p>
        <p>Remerciements : Merci Yanis Baroudi et Wayne Wan Chow Wah. </p>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
