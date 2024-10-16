import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './config.jsx'; // Importa la configuración global donde se encuentra Bootstrap

function RegisterCompany() {
  const [companyData, setCompanyData] = useState({
    nombre: '',
    ruc: '',
    direccion: '',
    telefono: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    console.log('Datos de la empresa:', companyData);
  };

  const handleGoBack = () => {
    navigate('/coupon-system'); // Redirige a la página de la cuponera
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
      <img src={"https://smc-peru.com/appsmc/logo-smc.png"} alt="Logo de la Empresa" className="logo mb-3" />
        <h2>Registrar Empresa</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={companyData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ruc" className="form-label">RUC (ID/obligatorio)</label>
          <input
            type="text"
            className="form-control"
            id="ruc"
            name="ruc"
            value={companyData.ruc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            name="direccion"
            value={companyData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={companyData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary me-3">Registrar</button>
          <button type="button" className="btn btn-secondary" onClick={handleGoBack}>Regresar</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCompany;
