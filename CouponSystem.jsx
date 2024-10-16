import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./config.jsx";
import { LLamadaapi } from "./LLamadas.js";
import axios from "axios";
import imagensspiderman from "./assets/poster3.jpg";
import { FaRegPlusSquare } from "react-icons/fa";

let urlsec = {
  getalldata: `http://localhost:3000/getallDecision`,
  getallpersona: `http://localhost:3000/datospersonas`,
};

function CouponSystem() {
  const [valor, setvalor] = useState("empresa");
  const [selectedCompany, setSelectedCompany] = useState({});
  const [Cupones, setcupones] = useState({ arraydata: [] });
  const [empresa, setempresa] = useState([]);
  const [persona, setpersona] = useState([]);
  const [couponCount, setCouponCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    if (selectedCompany.id_cliente) {
      Obtenerapirest(selectedCompany);
    }
  }, [selectedCompany]);

  const obtenerDatos = () => {
    LLamadaapi(urlsec.getalldata)
      .then((empresa) => {
        if (Array.isArray(empresa.data.data)) {
          const empresaFilter = empresa.data.data.filter(
            (item) => item.tipo_cliente === "empresa"
          );
          setempresa(empresaFilter);

          const personacliente = empresa.data.data.filter(
            (item) => item.tipo_cliente === "persona"
          );
          setpersona(personacliente);
        } else {
          console.error("empresa.data.data no es un array:", empresa.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleChanuge = async (e) => {
    const atos = e.target.value;
    const splitdataa = atos.split(",");

    if (splitdataa.length === 3) {
      let nombre = splitdataa[0].trim();
      let id_cliente = splitdataa[1].trim();
      let tipo = splitdataa[2].trim();

      setSelectedCompany({ nombre, id_cliente, tipo });
    } else {
      console.error("Error al procesar la selección del cliente:", splitdataa);
    }
  };

  const Obtenerapirest = async ({ id_cliente }) => {
    try {
      const obtener = await axios.get(`http://localhost:3000/actualizar/${id_cliente}`);
      const consultadetalle = obtener.data[0];
      const totalCupones = consultadetalle.totalCupones ?? 0;

      let center = {
        ...consultadetalle,
        arraydata: new Array(totalCupones).fill(0).map((_, index) => ""),
      };

      setcupones(center);
    } catch (error) {
      console.error("Error al obtener los cupones del cliente:", error);
    }
  };

  const NumeroStosnames = (index) => {
    if (!selectedCompany.id_cliente || selectedCompany.id_cliente === "") {
      alert("Error: No hay un cliente seleccionado.");
      return;
    }

    if (Cupones.arraydata.length >= 5) {
      alert("¡Felicidades! Has llegado a 5 cupones y se reiniciarán.");

      // Reinicia los cupones en el frontend
      setcupones((prev) => ({
        ...prev,
        arraydata: [],
      }));

      // Reinicia los cupones en el backend
      axios.put(`http://localhost:3000/actualizar/${selectedCompany.id_cliente}`, {
        valorquemepasaFronte: 0,
      });

      setCouponCount(0);
      return;
    }

    const nuevoTotalCupones = Cupones.arraydata.length + 1;

    // Actualiza en el backend
    axios.put(`http://localhost:3000/actualizar/${selectedCompany.id_cliente}`, {
      valorquemepasaFronte: nuevoTotalCupones,
    });
    

    // Actualiza el estado local
    setcupones((prev) => ({
      ...prev,
      arraydata: [...prev.arraydata, ""],
    }));

    setCouponCount(nuevoTotalCupones);
  };

  const handleSelectTipocliente = (e) => {
    setvalor(e.target.value);
  };

  const handleClaimReward = () => {
    alert(`¡Felicidades! Has obtenido un regalo de la empresa: ${selectedCompany.nombre}.`);
    setCouponCount(0);
  };

  const handleRegister = () => {
    navigate("/register-options");
  };

  return (
    <div>
      <h1 className="text-center">Sistema de Cupones</h1>
      <div className="text-center my-4">
        <label htmlFor="empresaSelect" className="form-label">
          Selecciona una empresa:
        </label>
        <div className="container mx-auto row">
          <div className="col">
            <p className="bold">Seleccion Cliente:</p>
            <select
              onChange={handleSelectTipocliente}
              className="w-25 mx-auto form-select bg-secondary text-white"
            >
              <option value="empresa">empresa</option>
              <option value="persona">persona</option>
              <option value="" selected>
                Elige tipo Cliente
              </option>
            </select>
          </div>

          {valor === "persona" && (
            <div className="col">
              <p className="bold">Persona:</p>
              <select
                id="empresaSelect"
                className="form-select w-50 mx-auto"
                onChange={handleChanuge}
              >
                {persona.map((item) => (
                  <option
                    key={item.id_cliente}
                    value={`${item.nombre_cliente}, ${item.id_cliente}, ${item.tipo_cliente}`}
                  >
                    {item.nombre_cliente}
                  </option>
                ))}
              </select>
            </div>
          )}

          {valor === "empresa" && (
            <div className="col">
              <p>Empresa</p>
              <select
                id="empresaSelect"
                className="form-select w-50 mx-auto"
                onChange={handleChanuge}
              >
                {empresa.map((item) => (
                  <option
                    key={item.id_cliente}
                    value={`${item.nombre_cliente}, ${item.id_cliente}, ${item.tipo_cliente}`}
                  >
                    {item.nombre_cliente}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <hr />

        {JSON.stringify(selectedCompany) !== "{}" && (
          <pre>
            Se ha seleccionado {selectedCompany.tipo} - {selectedCompany.nombre}
          </pre>
        )}
      </div>

      <div className="text-center my-4">
        <button
          className="btn btn-primary"
          onClick={() => NumeroStosnames(Cupones.arraydata.length)}
        >
          Agregar Cupón
        </button>
      </div>

      <div className="d-flex justify-content-center text-center mx-auto w-50">
        {Cupones?.arraydata.length > 0 ? (
          Cupones.arraydata.map((item, index) => (
            <div
              key={index}
              className="grid_seccion bg-dark text-white border p-4 rounded m-2"
              style={{
                width: "80px",
                height: "100px",
                backgroundImage: `url(${imagensspiderman})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))
        ) : (
          <p>No hay cupones aún.</p>
        )}
      </div>

      <div className="text-center">
        {Cupones?.arraydata.length === 5 ? (
          <p>Ya obtuviste el Regalo</p>
        ) : (
          <p>Te faltan {5 - Cupones?.arraydata.length} para el regalo</p>
        )}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-warning" onClick={handleRegister}>
          Opciones para Registrar
        </button>
      </div>
    </div>
  );
}

export default CouponSystem;
