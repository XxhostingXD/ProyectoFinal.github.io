import React, { useState } from 'react';
import ContactSection from './ContactSection';
import LocationSection from './LocationSection';
import VideoSection from './VideoSection';
import PublicationsSection from './PublicationsSection';
import PrivateAccessSection from './PrivateAccessSection';
import ControlCardSection from './ControlCardSection';
import { FaPhoneAlt, FaMapMarkerAlt, FaVideo, FaBook, FaLock, FaIdCard } from 'react-icons/fa'; // Iconos de react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa Bootstrap Icons
import './MainSection.css';  // Archivo CSS personalizado

// Importa las imágenes
import posterImage from './banner.png';
import logoImage from './assets/poster3.jpg';

function MainSection() {
  const [currentSection, setCurrentSection] = useState('contact');

  const renderSection = () => {
    switch (currentSection) {
      case 'contact':
        return <ContactSection />;
      case 'location':
        return <LocationSection />;
      case 'video':
        return <VideoSection />;
      case 'publications':
        return <PublicationsSection />;
      case 'privateAccess':
        return <PrivateAccessSection />;
      case 'controlCard':
        return <ControlCardSection />;
      default:
        return <ContactSection />;
    }
  };

  return (
    <div className="main-section d-flex flex-column">
      {/* Top bar con el logo y botones */}
      <nav className="navbar navbar-light bg-light justify-content-between">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={logoImage}
              alt="Logo de SMC"
              width="50"
              height="50"
              className="navbar-logo"
            />
            <span className="ms-2">SMC</span>
          </a>
          
          {/* Botones de iconos en el lado derecho */}
          <div className="d-flex">
            <button className="btn btn-outline-secondary me-2" type="button">
              <i className="bi bi-flag"></i> {/* Icono de bandera de Bootstrap */}
            </button>
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-gear"></i> {/* Otro icono de Bootstrap */}
            </button>
          </div>
        </div>
      </nav>

      {/* Header con imagen y logo */}
      <div className="header-section">
        <img 
          src={posterImage} 
          alt="Poster de la Empresa" 
          className="banner-img"  
        />
        <div className="doctor-info d-flex align-items-center">
          <img
            src={logoImage}
            alt="Logo de SMC"
            className="rounded-circle doctor-img"
            style={{ width: "100px", height: "100px", objectFit: "cover" }} 
          />
          <div className="doctor-details ms-3">
            <h3 className="logo-title">SMC</h3>
            <p className="logo-subtitle">Specialized Metrology Center S.A.C.</p>
          </div>
        </div>
      </div>

      {/* Sección de Contenido */}
      <div className="section-content flex-grow-1 mt-4">
        {renderSection()}
      </div>

      {/* Navbar fijo en la parte inferior */}
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-center">
          <button 
            className={`nav-link btn ${currentSection === 'contact' ? 'btn-primary' : 'btn-outline-primary'} btn-lg`}
            onClick={() => setCurrentSection('contact')}
            style={{ fontSize: '16px' }}
          >
            <FaPhoneAlt />
            <span className="d-none d-md-inline ms-2">Contactar</span>
          </button>
          <button 
            className={`nav-link btn ${currentSection === 'location' ? 'btn-primary' : 'btn-outline-primary'} btn-lg`}
            onClick={() => setCurrentSection('location')}
            style={{ fontSize: '16px' }}
          >
            <FaMapMarkerAlt />
            <span className="d-none d-md-inline ms-2">Localización</span>
          </button>
          <button 
            className={`nav-link btn ${currentSection === 'video' ? 'btn-primary' : 'btn-outline-primary'} btn-lg`}
            onClick={() => setCurrentSection('video')}
            style={{ fontSize: '16px' }}
          >
            <FaVideo />
            <span className="d-none d-md-inline ms-2">Video</span>
          </button>
          <button 
            className={`nav-link btn ${currentSection === 'publications' ? 'btn-primary' : 'btn-outline-primary'} btn-lg`}
            onClick={() => setCurrentSection('publications')}
            style={{ fontSize: '16px' }}
          >
            <FaBook />
            <span className="d-none d-md-inline ms-2">Servicios</span>
          </button>
          <button 
            className={`nav-link btn ${currentSection === 'privateAccess' ? 'btn-primary' : 'btn-outline-primary'} btn-lg`}
            onClick={() => setCurrentSection('privateAccess')}
            style={{ fontSize: '16px' }}
          >
            <FaLock />
            <span className="d-none d-md-inline ms-2">Accesos Privados</span>
          </button>
          <button 
            className={`nav-link btn ${currentSection === 'controlCard' ? 'btn-primary' : 'btn-outline-primary'} btn-lg`}
            onClick={() => setCurrentSection('controlCard')}
            style={{ fontSize: '16px' }}
          >
            <FaIdCard />
            <span className="d-none d-md-inline ms-2">Cartilla</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MainSection;
