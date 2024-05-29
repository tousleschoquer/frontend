import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section id="about">
        <h2>À propos</h2>
        <p>
          Bienvenue sur Mangatake, votre plateforme en ligne pour emprunter des mangas dans votre médiathèque préférée sans avoir à vous déplacer. Notre mission est de rendre l'accès à une vaste collection de mangas aussi facile et pratique que possible, vous permettant ainsi de découvrir de nouveaux titres, de suivre vos séries préférées et de profiter de la lecture où que vous soyez.
        </p>
      </section>
      <section id="conditions">
        <h2>Conditions d'utilisation</h2>
        <p>
          En utilisant Mangatake, vous acceptez de respecter les conditions d'utilisation suivantes :
        </p>
        <ol>
          <li>Vous devez être âgé d'au moins 18 ans ou avoir l'autorisation d'un parent ou tuteur pour utiliser nos services.</li>
          <li>Vous êtes responsable de maintenir la confidentialité de vos informations de compte et de ne pas partager votre compte avec d'autres personnes.</li>
          <li>Vous vous engagez à utiliser notre plateforme de manière légale et à ne pas violer les droits d'auteur ou d'autres lois applicables.</li>
          <li>Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de non-respect des présentes conditions.</li>
        </ol>
      </section>
      <section id="privacy">
        <h2>Politique de confidentialité</h2>
        <p>
          Chez Mangatake, nous accordons une grande importance à la confidentialité et à la sécurité de vos données. Notre politique de confidentialité vise à vous informer sur les types d'informations que nous collectons, comment nous les utilisons et les mesures que nous prenons pour protéger vos données personnelles.
        </p>
        <ol>
          <li>Collecte d'informations : Nous collectons des informations telles que votre nom, votre adresse e-mail et vos préférences de lecture pour faciliter l'utilisation de nos services.</li>
          <li>Utilisation des informations : Nous utilisons vos informations pour traiter vos demandes d'emprunt, personnaliser votre expérience utilisateur et vous informer des mises à jour et des promotions.</li>
          <li>Sécurité des données : Nous prenons des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé ou toute divulgation.</li>
          <li>Partage d'informations : Nous ne partageons pas vos informations personnelles avec des tiers sans votre consentement, sauf dans les cas prévus par la loi ou pour fournir nos services.</li>
        </ol>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutPage;
