import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Box, FormControlLabel, Checkbox, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Header from '../../components/Header';
import MangaList from '../../components/MangaList'; // Importe le composant MangaList
import Footer from '../../components/Footer';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#1A237E',
  '&.Mui-checked': {
    color: '#1A237E',
  },
}));

const AdvancedSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState({
    title: '',
    category: '',
    author: '',
    available: false,
    description: ''
  });
  const [mangas, setMangas] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/manga/`);
        const mangasData = response.data;

        // Fetch series and category details
        const mangasWithDetails = await Promise.all(mangasData.map(async (manga) => {
          if (manga.series) {
            try {
              const seriesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/serie/${manga.series}`);
              const seriesData = seriesResponse.data;

              if (seriesData.category) {
                const categoryResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/category/${seriesData.category}`);
                const categoryData = categoryResponse.data;

                return {
                  ...manga,
                  series: {
                    ...seriesData,
                    description: seriesData.description || '' // Assurez-vous qu'il y a une valeur par défaut pour la description
                  },
                  category: categoryData
                };
              } else {
                console.warn(`No category found for series ID: ${manga.series}`);
              }
            } catch (seriesError) {
              console.error(`Error fetching series with ID ${manga.series}:`, seriesError);
            }
          } else {
            console.warn(`Manga with ID ${manga._id} does not have a series.`);
          }

          return { ...manga, category: null };
        }));

        setMangas(mangasWithDetails);
        console.log('Fetched mangas with category:', mangasWithDetails);
      } catch (error) {
        console.error('Error fetching mangas:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/category`);
        setCategories(response.data);
        console.log('Fetched categories:', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMangas();
    fetchCategories();
  }, []);


  const handleSearch = () => {
    const results = mangas.filter((manga) => {
      return (
        (!searchParams.title || manga.title.toLowerCase().includes(searchParams.title.toLowerCase())) &&
        (!searchParams.category || manga.category._id === searchParams.category) && // Comparaison avec _id
        (!searchParams.author || manga.series.author.toLowerCase().includes(searchParams.author.toLowerCase())) &&
        (!searchParams.available || manga.available === searchParams.available) &&
        (!searchParams.description || manga.series.description.toLowerCase().includes(searchParams.description.toLowerCase()))
      );
    });
    setSearchResults(results);
  };


  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setSearchParams({
      title: '',
      category: '',
      author: '',
      available: false,
      description: ''
    });
    setSearchResults([]);
  };


  return (
    <div className="advanced-search-container" style={{ width: '1200px', margin: '0 auto' }}>
      <Header />
      <div className="banner" style={{ backgroundImage: 'url("/miaou.jpg")', color: '#FFFFFF', padding: '80px', textAlign: 'center' }}>
        <Typography
          variant="h4"
          style={{
            color: '#FFD700',
            fontFamily: 'Arial, sans-serif',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px #000000',
          }}
        >
          Recherche Avancée
        </Typography>
      </div>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} mb={3} className="filters-container">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Titre"
              name="title"
              value={searchParams.title}
              onChange={handleChange}
              className="input-field"
              style={{ backgroundColor: '#F0F0F0' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel className="filter-label" style={{ color: '#333333' }}>Catégorie</InputLabel>
              <Select
                label="Catégorie"
                name="category"
                value={searchParams.category}
                onChange={handleChange}
                className="input-field"
                style={{ backgroundColor: '#F0F0F0' }}
              >
                <MenuItem value="">
                  <em>Toutes les catégories</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Auteur"
              name="author"
              value={searchParams.author}
              onChange={handleChange}
              className="input-field"
              style={{ backgroundColor: '#F0F0F0' }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={searchParams.description}
              onChange={handleChange}
              className="input-field"
              style={{ backgroundColor: '#F0F0F0' }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <CustomCheckbox
                  name="available"
                  checked={searchParams.available}
                  onChange={handleChange}
                />
              }
              label="Disponible seulement"
              className="filter"
            />
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleSearch} className="search-button" style={{ backgroundColor: '#1A237E', color: '#FFFFFF', marginRight: '10px' }}>
          Rechercher
        </Button>
        <Button variant="contained" onClick={handleReset} className="reset-button" style={{ backgroundColor: '#333333', color: '#FFFFFF' }}>
          Réinitialiser
        </Button>
        {/* Affichage des résultats de la recherche sous forme de MangaList */}
        <MangaList mangas={searchResults} />
      </Box>
      <Footer />
    </div>
  );
};

export default AdvancedSearch;
