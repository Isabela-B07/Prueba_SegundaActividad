function CreditCard({ nombre, descripcion, tasa, monto, plazo, imagen }) {
  return (
    <div className="credit-card">
      {imagen && <img src={imagen} alt={nombre} className="card-image" />}

      <div className="card-content">
        <h4>{nombre}</h4>
        {descripcion && <p className="card-description">{descripcion}</p>}

        <div className="details">
          <div className="detail-item">
            <span className="label">Tasa de interés</span>
            <span className="value highlight">{tasa}%</span>
          </div>

          <div className="detail-item">
            <span className="label">Monto</span>
            <span className="value">{monto}</span>
          </div>

          <div className="detail-item">
            <span className="label">Plazo</span>
            <span className="value">{plazo}</span>
          </div>
        </div>
      </div>

      <button className="btn-primary">Solicitar ahora</button>
    </div>
  );
}

export default CreditCard;
