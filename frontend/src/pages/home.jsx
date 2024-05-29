import React, { useEffect, useState } from 'react';
import './home.css';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MangaList from '../components/MangaList';
import UserReviews from '../components/UserReviews';

const reviews = [
  {
    user: 'lamenace26',
    review: 'Plein de mangas! Excellent!',
    rating: 4,
  },
  {
    user: 'asmae-chan',
    review: 'Je déteste le site, il manque de style...',
    rating: 2,
  },
  {
    user: 'ledzsucreyyyyyyyyyy',
    review: "OLALA C'EST QUOI CE POULET !!!",
    rating: 5,
  }
];

// Add more manga IDs to the arrays
const popularMangasIds = [
  '6655278c070fff0e14f1b7b0',
  '66557aba6d5002f98382b524',
  '66557a746d5002f98382b521',
  '6655781b6d5002f98382b503'
];

const newMangasIds = [
  '665577f36d5002f98382b500',
  '66557aba6d5002f98382b524',
  '66557a746d5002f98382b521',
  '6655784a6d5002f98382b506'
];

const HomePage = () => {
  const [newMangasDetails, setNewMangasDetails] = useState([]);
  const [popularMangasDetails, setPopularMangasDetails] = useState([]);

  useEffect(() => {
    const fetchMangasDetails = async () => {
      try {
        const newDetails = await Promise.all(newMangasIds.map(async (id) => {
          const response = await axios.get(`http://localhost:4000/api/manga/${id}`);
          return response.data;
        }));
        setNewMangasDetails(newDetails);

        const popularDetails = await Promise.all(popularMangasIds.map(async (id) => {
          const response = await axios.get(`http://localhost:4000/api/manga/${id}`);
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
        <div className="wishlist-button-container">
          <Link to="/wishlist" className="wishlist-button">
            Ma Wishlist
          </Link>
        </div>
      </div>
      <div className="manga-grid">
        <h2>Recommendations de l'équipe</h2>
        <MangaList mangas={popularMangasDetails} />
      </div>
      <div className="manga-grid">
        <h2>Nouveautés</h2>
        <MangaList mangas={newMangasDetails} />
      </div>
      <UserReviews reviews={reviews} />
      <Footer />
    </div>
  );
};

export default HomePage;
