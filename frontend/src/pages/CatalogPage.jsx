import React, { useEffect, useState } from 'react';
import './CatalogPage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import MangaList from '../components/MangaList';

const CatalogPage = () => {
  const [mangas, setMangas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/manga/');
        const mangasData = response.data;

        // Fetch series and category details
        const mangasWithDetails = await Promise.all(mangasData.map(async (manga) => {
          if (manga.series) {
            try {
              const seriesResponse = await axios.get(`http://localhost:4000/api/serie/${manga.series}`);
              const seriesData = seriesResponse.data;
              
              if (seriesData.category) {
                const categoryResponse = await axios.get(`http://localhost:4000/api/category/${seriesData.category}`);
                const categoryData = categoryResponse.data;
                
                return {
                  ...manga,
                  series: seriesData,
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
        const response = await axios.get('http://localhost:4000/api/category');
        setCategories(response.data);
        console.log('Fetched categories:', response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMangas();
    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log('Search term:', event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log('Selected category:', event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setOnlyAvailable(event.target.checked);
    console.log('Only available:', event.target.checked);
  };

  const filteredMangas = mangas.filter((manga) => {
    const categoryMatch = selectedCategory === 'All' || (manga.category && manga.category._id === selectedCategory);
    const availabilityMatch = !onlyAvailable || manga.available;
    const titleMatch = manga.title.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && availabilityMatch && titleMatch;
  });

  console.log('Filtered mangas:', filteredMangas);

  return (
    <div className="catalog-page">
      <Header />
      <div className="catalog-container">
        <div className="banner">
          <div className="banner-content">
            <h2>Catalogue des Mangas</h2>
          </div>
        </div>
        <div className="button-container">
          <div className="advanced-search-button-container">
            <Link to="/search" className="advanced-search-button">
              Recherche avancée
            </Link>
          </div>
        </div>
        <div className="filters">
          <input
            type="text"
            placeholder="Rechercher un manga..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="All">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={handleAvailabilityChange}
            />
            Disponible uniquement
          </label>
        </div>
        <MangaList mangas={filteredMangas}  />

      </div>
      <Footer />
    </div>
  );
};

export default CatalogPage;
