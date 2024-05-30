import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot à partir de 'react-dom/client' au lieu de 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';

// les pages
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import HomePage from './pages/home';
import CatalogPage from './pages/CatalogPage';
import MangaDetailPage from './pages/MangaDetailPage';
import UserProfile from './pages/UserProfile';
import AdvancedSearch from './pages/advanced/AdvancedSearch';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageManga from './pages/admin/ManageManga';
import ManageBorrow from './pages/admin/ManageBorrow';
import Feedback from './pages/Feedback';
import FaqPage from './pages/FaqPage';
import AdminManageAccountsPage from './pages/admin/AdminManageAccountsPage';
import ManageSeries from './pages/admin/ManageSeries';
import ManageCategory from './pages/admin/ManageCategory';
import SeriesProposalPage from './pages/SeriesProposalPage';
import { AuthContextProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index={true} element={<HomePage />} /> {/* page accueil (1st page) */}
          <Route path="signup" element={<SignUp />} /> {/* page d'inscription */}
          <Route path="signin" element={<SignIn />} /> {/* page de connexion */}
          <Route path="catalog" element={<CatalogPage />} /> {/* page du catalogue */}
          <Route path="manga/:id" element={<MangaDetailPage />} /> {/* page des mangas détaillés */}
          <Route path="profile" element={<UserProfile />} /> {/* page de profil utilisateur */}
          <Route path="search" element={<AdvancedSearch />} /> {/* page de recherche avancée */}
          <Route path="admin" element={<AdminDashboard />} /> {/* page du dashborad pour l'admin */}
          <Route path="admin/manage-manga" element={<ManageManga />} /> {/* page de gestion des mangas pour l'admin */}
          <Route path="admin/manage-accounts" element={<AdminManageAccountsPage />} /> {/* page de gestion des comptes */}
          <Route path="admin/manage-series" element={<ManageSeries />} /> {/* page de gestion des series */}
          <Route path="admin/manage-categories" element={<ManageCategory />} /> {/* page de gestion des categories */}
          <Route path="admin/manage-borrows" element={<ManageBorrow />} /> {/* page de gestion des auteurs */}
          <Route path="feedback" element={<Feedback />} /> {/* page des notations */}
          <Route path="faq" element={<FaqPage />} /> {/* page de la faq et du service client */}
        </Route>
      </Routes>
    </Router>
   </AuthContextProvider>
  </React.StrictMode>
);
