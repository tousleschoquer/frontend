import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Card, CardContent } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BorrowButton from '../components/BorrowButton';
import bannerImage from '../public/assets/bakuman.jpg';
import axios from 'axios';
import './MangaDetailPage.css';


const MangaDetail = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [serieName, setSerieName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchMangaDetail = async () => {
      try {
        const mangaResponse = await axios.get(`http://localhost:4000/api/manga/${id}`);
        const mangaData = mangaResponse.data;
        setManga(mangaData);
  
        const serieResponse = await axios.get(`http://localhost:4000/api/serie/${mangaData.series._id}`);
        setSerieName(serieResponse.data.name);
  
        const categoryResponse = await axios.get(`http://localhost:4000/api/category/${mangaData.series.category._id}`);
        setCategoryName(categoryResponse.data.name);
      } catch (error) {
        console.error('Error fetching manga detail:', error);
      }
    };
  
    fetchMangaDetail();
  }, [id]);
  

  if (!manga) {
    return <Typography variant="h6">Manga non trouvé</Typography>;
  }

  return (
    <div className="manga-detail-page">
      <Header />
      <div className="banner-container">
        <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
          <div className="banner-content">
          </div>
        </div>
      </div>
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
      <Box className="manga-detail-container">
        <Card>
          <CardContent>
            <img src={manga.image} alt={manga.title} className="manga-detail-image" />
            <Typography variant="h4" gutterBottom>{manga.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary" className="series-name">{serieName}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{categoryName}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{manga.available ? 'Disponible' : 'Indisponible'}</Typography>
            <Typography variant="body1" mt={2} style={{ textAlign: 'left' }}><strong>Description:</strong><br />{manga.series.description}</Typography> {/* Ajout du style pour aligner le texte à gauche */}
            <BorrowButton mangaId={manga._id} />
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </div>
  );
};

export default MangaDetail;
