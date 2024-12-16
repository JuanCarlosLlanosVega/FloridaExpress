/*
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig"; // Configuración de Firebase
import { useNavigate, useLocation } from "react-router-dom"; // Navegación y ubicación

const SeleccionAsientos = () => {
  const [asientos, setAsientos] = useState(Array(43).fill(null)); // Estado para los asientos
  const [listaPasajeros, setListaPasajeros] = useState([]); // Estado para la lista de pasajeros
  const navigate = useNavigate();
  const location = useLocation();
  const reservaId = location.state?.reservaId; // Obtener el ID de reserva desde el estado

  // Cargar pasajeros que pertenecen a la reserva actual
  useEffect(() => {
    const cargarPasajeros = async () => {
      if (!reservaId) return;

      try {
        const pasajerosSnapshot = await getDocs(
          query(collection(db, "pasajeros"), where("reservaId", "==", reservaId))
        );

        const pasajeros = pasajerosSnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: `${doc.data().nombre} ${doc.data().apellidos}`,
          ci: doc.data().identidad,
        }));

        setListaPasajeros(pasajeros);
      } catch (error) {
        console.error("Error al cargar los pasajeros:", error);
      }
    };

    cargarPasajeros();
  }, [reservaId]);

  // Manejar el inicio del arrastre del pasajero
  const handleDragStart = (e, pasajero) => {
    e.dataTransfer.setData("pasajero", JSON.stringify(pasajero));
  };

  // Manejar el evento de soltar un pasajero en un asiento
  const handleDrop = (e, index) => {
    e.preventDefault();
    const pasajero = JSON.parse(e.dataTransfer.getData("pasajero"));

    setAsientos((prevAsientos) => {
      const nuevosAsientos = [...prevAsientos];
      nuevosAsientos[index] = pasajero;
      return nuevosAsientos;
    });

    setListaPasajeros((prevPasajeros) =>
      prevPasajeros.filter((p) => p.id !== pasajero.id)
    );
  };

  // Permitir que el área de un asiento sea un objetivo de arrastre
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Deseleccionar un pasajero de un asiento
  const handleDeseleccionar = (index) => {
    const pasajero = asientos[index];
    if (pasajero) {
      setListaPasajeros((prevPasajeros) => [
        ...prevPasajeros,
        { id: pasajero.id, nombre: pasajero.nombre, ci: pasajero.ci },
      ]);

      setAsientos((prevAsientos) => {
        const nuevosAsientos = [...prevAsientos];
        nuevosAsientos[index] = null;
        return nuevosAsientos;
      });
    }
  };

  // Continuar al siguiente paso después de asignar los asientos
  const handleContinuar = async () => {
    try {
      for (let i = 0; i < asientos.length; i++) {
        const pasajero = asientos[i];
        if (pasajero) {
          const pasajeroRef = doc(db, "pasajeros", pasajero.id);
          await updateDoc(pasajeroRef, {
            asiento: i + 1, // Guardar el número de asiento
          });
        }
      }

      navigate("/transaccion", {
        state: {
          pasajeros: asientos.filter((asiento) => asiento !== null), // Lista de pasajeros asignados
          asientosOcupados: asientos.filter((asiento) => asiento !== null).length, // Número de asientos ocupados
          origen: "Cochabamba", // Puedes cambiarlo dinámicamente
          destino: "La Paz",    // Puedes cambiarlo dinámicamente
        },
      });
      /*
      navigate("/transaccion", {
        state: {
          pasajeros: listaPasajeros,
          asientosOcupados: asientos.filter((asiento) => asiento !== null).length,
        },
      });
      */
/*
    } catch (error) {
      console.error("Error al actualizar los datos de los pasajeros:", error);
      alert("Hubo un problema al procesar los datos.");
    }
  };

  // Generar la visualización de los asientos
  const generarAsientos = (inicio, fin) => {
    const elementosAsientos = [];
    for (let i = inicio; i <= fin; i++) {
      elementosAsientos.push(
        <div
          key={i}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i - 1)}
          onClick={() => handleDeseleccionar(i - 1)}
          style={{
            width: "60px",
            height: "60px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5px",
            backgroundColor: asientos[i - 1] ? "gray" : "white",
            cursor: "pointer",
            fontWeight: "bold",
            color: asientos[i - 1] ? "#FFFFFF" : "#000000",
          }}
        >
          {asientos[i - 1]?.nombre || i}
        </div>
      );
    }
    return elementosAsientos;
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Selección de Asientos</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "gray",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          ></div>
          Ocupado
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "white",
              border: "1px solid black",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          ></div>
          Libre
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "50px", width: "200px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "10px" }}>Lista de Pasajeros</h3>
          {listaPasajeros.map((pasajero) => (
            <div
              key={pasajero.id}
              draggable
              onDragStart={(e) => handleDragStart(e, pasajero)}
              style={{
                backgroundColor: "#e0e0e0",
                padding: "10px",
                marginBottom: "5px",
                borderRadius: "5px",
                cursor: "grab",
              }}
            >
              {pasajero.nombre}
            </div>
          ))}
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            Arrastra el nombre de la lista hasta el asiento de su preferencia.
          </p>
        </div>
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div style={{ marginRight: "50px", textAlign: "center" }}>
              <img
                src={require("../assets/142.PNG")}
                alt="Planta Alta"
                style={{ width: "250px", height: "auto" }}
              />
              <p>Planta Alta</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={require("../assets/143.PNG")}
                alt="Planta Baja"
                style={{ width: "250px", height: "auto" }}
              />
              <p>Planta Baja</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {generarAsientos(1, 30)}
            </div>
            <div style={{ width: "50px" }}></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {generarAsientos(31, 43)}
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleContinuar}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SeleccionAsientos;

*/
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig"; // Configuración de Firebase
import { useNavigate, useLocation } from "react-router-dom"; // Navegación y ubicación

const SeleccionAsientos = () => {
  const [asientos, setAsientos] = useState(Array(43).fill(null)); // Estado de los asientos
  const [listaPasajeros, setListaPasajeros] = useState([]); // Estado para la lista de pasajeros
  const navigate = useNavigate(); // Para redirigir
  const location = useLocation(); // Obtener datos de navegación
  const reservaId = location.state?.reservaId; // Obtener el ID de reserva del estado de navegación

  // Cargar los pasajeros de la reserva actual desde Firestore
  useEffect(() => {
    const cargarPasajeros = async () => {
      if (!reservaId) return; // Si no hay reservaId, no ejecutar
      try {
        const pasajerosSnapshot = await getDocs(
          query(collection(db, "pasajeros"), where("reservaId", "==", reservaId))
        );

        const pasajeros = pasajerosSnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: `${doc.data().nombre} ${doc.data().apellidos}`,
          ci: doc.data().identidad,
        }));

        setListaPasajeros(pasajeros);
      } catch (error) {
        console.error("Error al cargar los pasajeros:", error);
      }
    };

    cargarPasajeros();
  }, [reservaId]);

  // Manejar el arrastre del pasajero
  const handleDragStart = (e, pasajero) => {
    e.dataTransfer.setData("pasajero", JSON.stringify(pasajero));
  };

  // Manejar cuando se suelta un pasajero en un asiento
  const handleDrop = (e, index) => {
    e.preventDefault();
    const pasajero = JSON.parse(e.dataTransfer.getData("pasajero"));

    setAsientos((prevAsientos) => {
      const nuevosAsientos = [...prevAsientos];
      nuevosAsientos[index] = pasajero;
      return nuevosAsientos;
    });

    setListaPasajeros((prevPasajeros) =>
      prevPasajeros.filter((p) => p.id !== pasajero.id)
    );
  };

  // Permitir el arrastre sobre un asiento
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Deseleccionar un pasajero de un asiento
  const handleDeseleccionar = (index) => {
    const pasajero = asientos[index];
    if (pasajero) {
      setListaPasajeros((prevPasajeros) => [
        ...prevPasajeros,
        { id: pasajero.id, nombre: pasajero.nombre, ci: pasajero.ci },
      ]);

      setAsientos((prevAsientos) => {
        const nuevosAsientos = [...prevAsientos];
        nuevosAsientos[index] = null;
        return nuevosAsientos;
      });
    }
  };

  // Guardar los datos y continuar a la siguiente página
  const handleContinuar = async () => {
    try {
      for (let i = 0; i < asientos.length; i++) {
        const pasajero = asientos[i];
        if (pasajero) {
          const pasajeroRef = doc(db, "pasajeros", pasajero.id);
          await updateDoc(pasajeroRef, {
            asiento: i + 1, // Guardar el número de asiento
          });
        }
      }

      navigate("/transaccion", {
        state: {
          pasajeros: asientos.filter((asiento) => asiento !== null), // Pasajeros asignados
          asientosOcupados: asientos.filter((asiento) => asiento !== null).length, // Asientos ocupados
          origen: "Cochabamba",
          destino: "La Paz",
        },
      });
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Hubo un problema al guardar los datos.");
    }
  };

  // Generar los asientos en la pantalla
  const generarAsientos = (inicio, fin) => {
    const elementosAsientos = [];
    for (let i = inicio; i <= fin; i++) {
      elementosAsientos.push(
        <div
          key={i}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, i - 1)}
          onClick={() => handleDeseleccionar(i - 1)}
          style={{
            width: "60px",
            height: "60px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "5px",
            backgroundColor: asientos[i - 1] ? "gray" : "white",
            cursor: "pointer",
            fontWeight: "bold",
            color: asientos[i - 1] ? "#FFFFFF" : "#000000",
          }}
        >
          {asientos[i - 1]?.nombre || i}
        </div>
      );
    }
    return elementosAsientos;
  };

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Selección de Asientos</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "gray",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          ></div>
          Ocupado
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "white",
              border: "1px solid black",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          ></div>
          Libre
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {/* Lista de Pasajeros */}
        <div style={{ marginRight: "50px", width: "200px", textAlign: "center" }}>
          <h3 style={{ marginBottom: "10px" }}>Lista de Pasajeros</h3>
          {listaPasajeros.map((pasajero) => (
            <div
              key={pasajero.id}
              draggable
              onDragStart={(e) => handleDragStart(e, pasajero)}
              style={{
                backgroundColor: "#e0e0e0",
                padding: "10px",
                marginBottom: "5px",
                borderRadius: "5px",
                cursor: "grab",
              }}
            >
              {pasajero.nombre}
            </div>
          ))}
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            Arrastra el nombre de la lista hasta el asiento de su preferencia.
          </p>
        </div>

        {/* Área de Asientos */}
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <p>Planta Alta</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {generarAsientos(1, 30)}
              </div>
            </div>
            <div style={{ textAlign: "center", marginLeft: "50px" }}>
              <p>Planta Baja</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                {generarAsientos(31, 43)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleContinuar}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SeleccionAsientos;
