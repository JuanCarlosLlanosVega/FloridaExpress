
/*
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Transaccion = () => {
  const { state } = useLocation();
  console.log("State recibido:", state); // Depuración: verifica el estado recibido
  const { pasajeros, asientosOcupados } = state || { pasajeros: [], asientosOcupados: 0 };
  const [nombreFactura, setNombreFactura] = useState("");
  const [nit, setNit] = useState("");
  const [precio, setPrecio] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Aquí puedes reemplazar el precio fijo por el precio real registrado en Viajes.jsx
    const precioPorAsiento = 50; // Precio de ejemplo
    setPrecio(asientosOcupados * precioPorAsiento);
  }, [asientosOcupados]);

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
    setModalVisible(true);
  };

  const renderModalContent = () => {
    if (metodoPago === "qr") {
      return <img src={require("../assets/226.PNG")} alt="QR" style={{ width: "100%" }} />;
    } else if (metodoPago === "tarjeta") {
      return <p>Número de cuenta: 1234-5678-9012</p>;
    } else if (metodoPago === "tigo-money") {
      return <p>Código de Tigo Money: 789456123</p>;
    }
    return null;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Datos de Facturación</h1>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", display: "block" }}>Nombre de la Factura:</label>
        <select
          value={nombreFactura}
          onChange={(e) => {
            const selectedPasajero = pasajeros.find(
              (p) => `${p.nombre}` === e.target.value
            );
            setNombreFactura(e.target.value);
            setNit(selectedPasajero?.ci || "");
          }}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="">Seleccione un nombre</option>
          {pasajeros.map((pasajero) => (
            <option key={pasajero.id} value={pasajero.nombre}>
              {pasajero.nombre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", display: "block" }}>NIT/C.I.:</label>
        <input
          type="text"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", display: "block" }}>Precio (Bs.):</label>
        <input
          type="text"
          value={precio}
          readOnly
          style={{ width: "100%", padding: "10px", backgroundColor: "#f0f0f0" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", display: "block" }}>Elige el método de Pago:</label>
        <select
          value={metodoPago}
          onChange={handleMetodoPagoChange}
          style={{ width: "100%", padding: "10px" }}
        >
          <option value="">Seleccione un método</option>
          <option value="qr">Pago con QR</option>
          <option value="tarjeta">Tarjeta de Débito o Crédito</option>
          <option value="tigo-money">Tigo Money</option>
        </select>
      </div>

      <button
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Finalizar Transacción
      </button>

      {modalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setModalVisible(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "300px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {renderModalContent()}
            <button
              style={{
                marginTop: "20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
              }}
              onClick={() => setModalVisible(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaccion;
*/
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Transaccion = () => {
  const { state } = useLocation();
  console.log("State recibido:", state); // Depuración: verifica el estado recibido
  const { pasajeros, asientosOcupados, origen, destino } = state || { pasajeros: [], asientosOcupados: 0 };

  const [nombreFactura, setNombreFactura] = useState("");
  const [nit, setNit] = useState("");
  const [precio, setPrecio] = useState(0);
  const [metodoPago, setMetodoPago] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFacturaVisible, setModalFacturaVisible] = useState(false);

  useEffect(() => {
    // Calcular el precio total
    const precioPorAsiento = 50; // Precio fijo por asiento
    setPrecio(asientosOcupados * precioPorAsiento);
  }, [asientosOcupados]);

  // Mostrar el modal de factura
  const handleFinalizarTransaccion = () => {
    setModalFacturaVisible(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Datos de Facturación</h1>

      {/* Nombre de Factura */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", display: "block" }}>Nombre de la Factura:</label>
        <input
          type="text"
          value={nombreFactura}
          onChange={(e) => {
            const nombreInput = e.target.value;
            setNombreFactura(nombreInput);

            // Buscar automáticamente el NIT cuando coincida el nombre
            const selectedPasajero = pasajeros.find((p) =>
              p.nombre.toLowerCase().includes(nombreInput.toLowerCase())
            );
            if (selectedPasajero) {
              setNit(selectedPasajero.ci);
            }
          }}
          placeholder="Escriba para buscar nombres..."
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          list="listaNombres"
        />
        <datalist id="listaNombres">
          {pasajeros.map((pasajero) => (
            <option key={pasajero.id} value={pasajero.nombre} />
          ))}
        </datalist>
      </div>

      {/* NIT o CI */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", display: "block" }}>NIT/C.I.:</label>
        <input
          type="text"
          value={nit}
          onChange={(e) => setNit(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        />
      </div>

      {/* Precio */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold", display: "block" }}>Precio (Bs.):</label>
        <input
          type="text"
          value={precio}
          readOnly
          style={{ width: "100%", padding: "10px", backgroundColor: "#f0f0f0" }}
        />
      </div>

      {/* Finalizar Transacción */}
      <button
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "100%",
        }}
        onClick={handleFinalizarTransaccion}
      >
        Finalizar Transacción
      </button>

      {/* Modal de Factura */}
      {modalFacturaVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setModalFacturaVisible(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "400px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Factura</h2>
            <p><strong>Origen:</strong> {origen || "No especificado"}</p>
            <p><strong>Destino:</strong> {destino || "No especificado"}</p>
            <h3>Pasajeros y Asientos</h3>
            <ul style={{ textAlign: "left" }}>
              {pasajeros.map((pasajero, index) => (
                <li key={pasajero.id}>
                  {pasajero.nombre} - Asiento: {index + 1}
                </li>
              ))}
            </ul>
            <p><strong>Total a Pagar:</strong> {precio} Bs</p>
            <button
              style={{
                marginTop: "20px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
              }}
              onClick={() => setModalFacturaVisible(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaccion;
