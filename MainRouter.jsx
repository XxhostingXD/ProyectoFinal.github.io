import { Routes, Route } from 'react-router-dom';
import App from './App';
import DisplayData from './DisplayData';
import Login from './Login';
import SelectionPage from './SelectionPage';
import CouponSystem from './CouponSystem';
import RegisterOptions from './RegisterOptions';
import RegisterPerson from './RegisterPerson';
import RegisterCompany from './RegisterCompany';
import MainSection from './MainSection'; // Importa el nuevo componente
import ContactSection from './ContactSection'; // Nueva sección
import LocationSection from './LocationSection'; // Nueva sección
import VideoSection from './VideoSection'; // Nueva sección
import PublicationsSection from './PublicationsSection'; // Nueva sección
import PrivateAccessSection from './PrivateAccessSection'; // Nueva sección
import ControlCardSection from './ControlCardSection'; // Nueva sección

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/selection" element={<SelectionPage />} />
      <Route path="/coupon-system" element={<CouponSystem />} />
      <Route path="/register-options" element={<RegisterOptions />} />
      <Route path="/register-person" element={<RegisterPerson />} />
      <Route path="/register-company" element={<RegisterCompany />} />
      <Route path="/data-entry" element={<App />} />
      <Route path="/display/:nroCertificado" element={<DisplayData />} />

      {/* Ruta principal para la página con las secciones */}
      <Route path="/main-section" element={<MainSection />} />

      {/* Rutas adicionales para las secciones individuales */}
      <Route path="/main-section/contact" element={<ContactSection />} />
      <Route path="/main-section/location" element={<LocationSection />} />
      <Route path="/main-section/video" element={<VideoSection />} />
      <Route path="/main-section/publications" element={<PublicationsSection />} />
      <Route path="/main-section/private-access" element={<PrivateAccessSection />} />
      <Route path="/main-section/control-card" element={<ControlCardSection />} />
    </Routes>
  );
}

export default MainRouter;
