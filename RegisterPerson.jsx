import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './config.jsx'; // Importa la configuración global donde se encuentra Bootstrap

function RegisterPerson() {
  const [personData, setPersonData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    // telefono: '',
    // direccion: '',
    // ruc: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonData({
      ...personData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    console.log('Datos de la persona:', personData);
  };

  const handleGoBack = () => {
    navigate('/coupon-system'); // Redirige a la página de la cuponera
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src={"https://smc-peru.com/appsmc/logo-smc.png"} alt="Logo de la Empresa" className="logo mb-3" />
        <h2>Registrar Persona</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={personData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="apellido"
            name="apellido"
            value={personData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">DNI/Carne(ID)</label>
          <input
            type="text"
            className="form-control"
            id="dni"
            name="dni"
            value={personData.dni}
            onChange={handleChange}
            required
          />
        </div>

{/*         
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={personData.telefono}
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
            value={personData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">   

          <label htmlFor="ruc" className="form-label">RUC (opcional)</label>
          <input
            type="text"
            className="form-control"
            id="ruc"
            name="ruc"
            value={personData.ruc}
            onChange={handleChange}
          />
        </div>   */}



        <div className="text-center">
          <button type="submit" className="btn btn-primary me-3">Registrar</button>
          <button type="button" className="btn btn-secondary" onClick={handleGoBack}>Regresar</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPerson;
