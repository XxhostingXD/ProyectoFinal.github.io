import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Formulario para registrar persona
const RegisterPersonForm = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [formData, setFormData] = useState({
    nombre_cliente: '',
    apellido: '',
    ruc: '', // Este campo será usado como DNI en el caso de personas
    direccion: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validar solo números en el campo DNI
    if (name === 'ruc' && !/^\d*$/.test(value)) return;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    
    // Validar que el DNI tenga 8 dígitos
    if (formData.ruc.length !== 8) {
      formErrors.ruc = 'El DNI debe tener exactamente 8 dígitos.';
    }

    setErrors(formErrors);

    // Retornar true si no hay errores
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3000/clientecrear', {
        ...formData,
        tipo_cliente: 'persona'
      });
      
      // Mostrar la alerta de éxito usando SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Proceso exitoso',
        text: 'Registros guardados',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        // Limpiar formulario después de guardar
        setFormData({
          nombre_cliente: '',
          apellido: '',
          ruc: '',
          direccion: ''
        });
      });
      
      console.log(response.data);
    } catch (error) {
      alert('Error al registrar los datos.');
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate('/coupon-system'); // Ruta hacia el menú de cupones
  };

  return (
    <div>
      <h2 className="mb-4 text-primary">Registrar Persona</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre_cliente"
            className="form-control"
            value={formData.nombre_cliente}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="form-control"
            value={formData.apellido}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dni">DNI (8 dígitos)</label>
          <input
            type="text"
            id="dni"
            name="ruc" // Utilizamos ruc para DNI en personas
            className="form-control"
            value={formData.ruc}
            onChange={handleInputChange}
            maxLength="8" // Limitar a 8 caracteres
            required
          />
          {errors.ruc && <small className="text-danger">{errors.ruc}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Registrar</button>
        <button type="button" onClick={handleGoBack} className="btn btn-secondary mt-3 ms-2">Regresar</button>
      </form>
    </div>
  );
};

// Formulario para registrar empresa
const RegisterCompanyForm = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [formData, setFormData] = useState({
    nombre_cliente: '',
    ruc: '', // Este campo es para el RUC de la empresa
    direccion: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validar solo números en el campo RUC
    if (name === 'ruc' && !/^\d*$/.test(value)) return;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    // Validar que el RUC tenga 11 dígitos
    if (formData.ruc.length !== 11) {
      formErrors.ruc = 'El RUC debe tener exactamente 11 dígitos.';
    }

    setErrors(formErrors);

    // Retornar true si no hay errores
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3000/clientecrear', {
        ...formData,
        tipo_cliente: 'empresa'
      });

      // Mostrar la alerta de éxito usando SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Proceso exitoso',
        text: 'Registros guardados',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        // Limpiar formulario después de guardar
        setFormData({
          nombre_cliente: '',
          ruc: '',
          direccion: ''
        });
      });

      console.log(response.data);
    } catch (error) {
      alert('Error al registrar los datos.');
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate('/cupones'); // Ruta hacia el menú de cupones
  };

  return (
    <div>
      <h2 className="mb-4 text-primary">Registrar Empresa</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="nombreEmpresa">Nombre</label>
          <input
            type="text"
            id="nombreEmpresa"
            name="nombre_cliente"
            className="form-control"
            value={formData.nombre_cliente}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ruc">RUC (11 dígitos)</label>
          <input
            type="text"
            id="ruc"
            name="ruc"
            className="form-control"
            value={formData.ruc}
            onChange={handleInputChange}
            maxLength="11" // Limitar a 11 caracteres
            required
          />
          {errors.ruc && <small className="text-danger">{errors.ruc}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Registrar</button>
        <button type="button" onClick={handleGoBack} className="btn btn-secondary mt-3 ms-2">Regresar</button>
      </form>
    </div>
  );
};

function RegisterOptions() {
  const [selectedOption, setSelectedOption] = useState(''); // Estado para la selección

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
      <h1 className="mb-4 text-primary">Registrar Opciones</h1>

      <div className="form-group mb-3">
        <label htmlFor="registerSelect">Selecciona una opción:</label>
        <select 
          id="registerSelect" 
          className="form-control"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="">Seleccione...</option>
          <option value="persona">Persona</option>
          <option value="empresa">Empresa</option>
        </select>
      </div>

      {/* Mostrar el formulario según la selección */}
      {selectedOption === 'persona' && <RegisterPersonForm />}
      {selectedOption === 'empresa' && <RegisterCompanyForm />}
    </div>
  );
}

export default RegisterOptions;
