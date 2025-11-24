import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "../styles/solicitar.css";

const RequestCredit = () => {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  const [errors, setErrors] = useState({});
  const [cuota, setCuota] = useState(null);
  const [resumenVisible, setResumenVisible] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);
  const [success, setSuccess] = useState(false);

  // VALIDACIONES EN TIEMPO REAL
  const validate = (field, value) => {
    let newErrors = { ...errors };

    if (field === "nombre" && value.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    } else {
      delete newErrors.nombre;
    }

    if (field === "cedula" && !/^\d{6,10}$/.test(value)) {
      newErrors.cedula = "La cédula debe ser numérica y entre 6 y 10 dígitos.";
    } else {
      delete newErrors.cedula;
    }

    if (field === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.correo = "Correo no válido.";
    } else {
      delete newErrors.correo;
    }

    if (field === "telefono" && !/^\d{10}$/.test(value)) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos.";
    } else {
      delete newErrors.telefono;
    }

    setErrors(newErrors);
  };

  // CÁLCULO CUOTA
  const calcularCuota = (monto, plazo) => {
    if (!monto || !plazo) return null;

    const tasaMensual = 0.015;
    const p = parseFloat(monto);
    const n = parseInt(plazo);

    const cuotaCalc =
      (p * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));

    return cuotaCalc.toFixed(2);
  };

  const handleMontoPlazoChange = (field, value) => {
    if (field === "monto") setMonto(value);
    if (field === "plazo") setPlazo(value);

    const updatedMonto = field === "monto" ? value : monto;
    const updatedPlazo = field === "plazo" ? value : plazo;

    setCuota(calcularCuota(updatedMonto, updatedPlazo));
  };

  // ENVIAR SOLICITUD
  const enviarSolicitud = () => {
    const nuevaSolicitud = {
      nombre,
      cedula,
      correo,
      telefono,
      monto,
      plazo,
      cuota
    };

    setSolicitudes([...solicitudes, nuevaSolicitud]);

    setSuccess(true);
    setResumenVisible(false);

    // limpiar
    setNombre("");
    setCedula("");
    setCorreo("");
    setTelefono("");
    setMonto("");
    setPlazo("");
    setCuota(null);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>

      {/* HERO: props correctas */}
      <Hero 
        titulo="Solicitar Crédito"
        parrafos={["Completa el formulario para enviar tu solicitud."]}
      />

      <div className="solicitar-container">

        <h2 className="titulo-formulario">Formulario de Solicitud</h2>

        <form className="formulario">

          {/* NOMBRE */}
          <div className="grupo">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                validate("nombre", e.target.value);
              }}
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>

          {/* CÉDULA */}
          <div className="grupo">
            <label>Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => {
                setCedula(e.target.value);
                validate("cedula", e.target.value);
              }}
            />
            {errors.cedula && <span className="error">{errors.cedula}</span>}
          </div>

          {/* CORREO */}
          <div className="grupo">
            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                validate("correo", e.target.value);
              }}
            />
            {errors.correo && <span className="error">{errors.correo}</span>}
          </div>

          {/* TELEFONO */}
          <div className="grupo">
            <label>Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                validate("telefono", e.target.value);
              }}
            />
            {errors.telefono && <span className="error">{errors.telefono}</span>}
          </div>

          {/* MONTO */}
          <div className="grupo">
            <label>Monto solicitado</label>
            <input
              type="number"
              min="500000"
              value={monto}
              onChange={(e) => handleMontoPlazoChange("monto", e.target.value)}
            />
          </div>

          {/* PLAZO */}
          <div className="grupo">
            <label>Plazo (meses)</label>
            <select
              value={plazo}
              onChange={(e) => handleMontoPlazoChange("plazo", e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>

          {/* CUOTA */}
          {cuota && (
            <p className="cuota">
              Cuota mensual estimada: <strong>${cuota}</strong>
            </p>
          )}

          {/* BOTÓN RESUMEN */}
          <button
            className="btn-morado"
            type="button"
            onClick={() => setResumenVisible(true)}
            disabled={Object.keys(errors).length > 0 || !nombre || !cedula}
          >
            Ver Resumen
          </button>
        </form>

        {/* RESUMEN */}
        {resumenVisible && (
          <div className="resumen">
            <h3>Resumen de la solicitud</h3>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Cédula:</strong> {cedula}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <p><strong>Teléfono:</strong> {telefono}</p>
            <p><strong>Monto:</strong> ${monto}</p>
            <p><strong>Plazo:</strong> {plazo} meses</p>
            <p><strong>Cuota mensual:</strong> ${cuota}</p>

            <button className="btn-rosa" onClick={enviarSolicitud}>
              Enviar Solicitud
            </button>
          </div>
        )}

        {/* ÉXITO */}
        {success && (
          <div className="exito">
            ¡Solicitud enviada con éxito! 🎉
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default RequestCredit;
