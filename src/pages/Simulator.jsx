// src/pages/Simulador.jsx
import React, { useState, useMemo } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CreditCard from "../components/CreditCard";
import creditsData from "../data/creditsData";
import "../styles/simulador.css";

function Simulador() {
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");
  const [montoMin, setMontoMin] = useState(0);
  const [montoMax, setMontoMax] = useState(999999999);
  const [tasaOrden, setTasaOrden] = useState("");

  // Select de nombres
  const nombresDisponibles = useMemo(
    () => Array.from(new Set(creditsData.map((c) => c.nombre))),
    []
  );

  // Select de montos basado en minAmount y maxAmount
  const montosDisponibles = useMemo(() => {
    const valores = [];
    creditsData.forEach((c) => {
      valores.push(c.minAmount);
      valores.push(c.maxAmount);
    });

    return Array.from(new Set(valores)).sort((a, b) => a - b);
  }, []);

  // ---- FILTRADO ----
  const filtrarCreditos = () => {
    let resultados = [...creditsData];

    // Filtrar por nombre
    if (nombreSeleccionado) {
      resultados = resultados.filter(
        (c) => c.nombre === nombreSeleccionado
      );
    }

    // Filtrar por rango: se revisa si el rango seleccionado se cruza con el rango del crédito
    resultados = resultados.filter(
      (c) => c.maxAmount >= montoMin && c.minAmount <= montoMax
    );

    // Ordenar por tasa
    if (tasaOrden === "asc") {
      resultados.sort((a, b) => a.tasa - b.tasa);
    }

    return resultados;
  };

  const resultados = filtrarCreditos();

  // ---- LIMPIAR FILTROS ----
  const limpiarFiltros = () => {
    setNombreSeleccionado("");
    setMontoMin(0);
    setMontoMax(999999999);
    setTasaOrden("");
  };

  return (
    <div>
      <Hero
        titulo="Simulador de Créditos"
        parrafos={[
          "Encuentra el crédito perfecto para ti de manera rápida y sencilla.",
          "Utiliza nuestro buscador y filtros para comparar tasas, montos y plazos.",
        ]}
      />

      {/* CONTENEDOR DE FILTROS */}
      <section className="simulador-filtros">
        <h3>Buscar Créditos</h3>

        <div className="filtros-grid">

          {/* Buscar por nombre */}
          <div className="filtro">
            <label htmlFor="nombre">Buscar por nombre</label>
            <select
              id="nombre"
              value={nombreSeleccionado}
              onChange={(e) => setNombreSeleccionado(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              {nombresDisponibles.map((n, i) => (
                <option key={i} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Monto mínimo */}
          <div className="filtro">
            <label htmlFor="montoMin">Monto mínimo</label>
            <select
              id="montoMin"
              value={montoMin}
              onChange={(e) => setMontoMin(Number(e.target.value))}
            >
              <option value={0}>No mínimo</option>
              {montosDisponibles.map((m, i) => (
                <option key={i} value={m}>
                  ${m.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Monto máximo */}
          <div className="filtro">
            <label htmlFor="montoMax">Monto máximo</label>
            <select
              id="montoMax"
              value={montoMax}
              onChange={(e) => setMontoMax(Number(e.target.value))}
            >
              <option value={999999999}>No máximo</option>
              {montosDisponibles.map((m, i) => (
                <option key={i} value={m}>
                  ${m.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Orden por tasa */}
          <div className="filtro">
            <label htmlFor="tasaOrden">Ordenar por tasa</label>
            <select
              id="tasaOrden"
              value={tasaOrden}
              onChange={(e) => setTasaOrden(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              <option value="asc">Menor a mayor</option>
            </select>
          </div>

          {/* Botón limpiar */}
          <div className="boton-filtros">
            <button
              type="button"
              onClick={limpiarFiltros}
              className="btn-secondary"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <div className="credit-list">
        {resultados.length > 0 ? (
          <>
            <p className="result-count">
              Mostrando {resultados.length} resultado
              {resultados.length !== 1 && "s"}
            </p>

            <div className="credits-grid">
              {resultados.map((credit) => (
                <CreditCard
                  key={credit.id}
                  nombre={credit.nombre}
                  descripcion={credit.descripcion}
                  tasa={credit.tasa}
                  monto={credit.monto}
                  plazo={credit.plazo}
                  imagen={credit.imagen}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="no-results">No hay créditos disponibles</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Simulador;
