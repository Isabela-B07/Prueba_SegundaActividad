// src/components/Hero.jsx
import React from "react";
import "../styles/hero.css";

function Hero({ titulo, parrafos }) {
  return (
    <section className="hero">
      <div className="container">
        <h2>{titulo}</h2>
        {parrafos.map((texto, index) => (
          <p key={index}>{texto}</p>
        ))}
      </div>
    </section>
  );
}

export default Hero;
