

import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore
import { useNavigate } from 'react-router-dom'; // Para redirigir programáticamente

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [ciudadOrigen, setCiudadOrigen] = useState(null); // Ciudad origen seleccionada
  const [ciudadDestino, setCiudadDestino] = useState(null); // Ciudad destino seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado
  const [precio, setPrecio] = useState(0); // Precio inicial como 00 Bs
  const [tipoServicioSeleccionado, setTipoServicioSeleccionado] = useState(null); // Tipo de servicio seleccionado
  const [fechaViaje, setFechaViaje] = useState(new Date()); // Fecha de viaje seleccionada

  const db = getFirestore(); // Instancia de Firestore
  const navigate = useNavigate(); // Hook para redirigir programáticamente

  const opcionesCiudades = [
    { label: 'Cochabamba', value: 'Cochabamba' },
    { label: 'Santa Cruz', value: 'Santa Cruz' },
    { label: 'La Paz', value: 'La Paz' },
    { label: 'Oruro', value: 'Oruro' },
    { label: 'Potosí', value: 'Potosí' },
    { label: 'Chuquisaca', value: 'Chuquisaca' },
    { label: 'Tarija', value: 'Tarija' },
    { label: 'Beni', value: 'Beni' },
    { label: 'Pando', value: 'Pando' },
  ];

  const opcionesTipoServicio = [
    { label: 'Semi Cama', value: 'Semi Cama' },
    { label: 'Cama', value: 'Cama' },
    { label: 'Leito', value: 'Leito' },
    { label: 'Suite', value: 'Suite' },
  ];

  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ciudad origen
  const handleCiudadOrigenSeleccionada = (origen) => {
    setCiudadOrigen(origen);
    setCiudadDestino(null); // Reiniciar ciudad destino
    setHorarios([]); // Reiniciar horarios
    setHorarioSeleccionado(null); // Reiniciar horario seleccionado
    setTipoServicioSeleccionado(null); // Reiniciar tipo de servicio
    setPrecio(0); // Reiniciar precio
  };

  // Manejar selección de ciudad destino
  const handleCiudadDestinoSeleccionada = (destino) => {
    setCiudadDestino(destino);

    // Filtrar los horarios que coincidan con la ciudad de origen y destino seleccionadas
    const horariosFiltrados = rutas
      .filter((ruta) => ruta.ruta === `${ciudadOrigen?.value} - ${destino?.value}`) // Coincidir por la ruta
      .map((ruta) => ({
        label: `${ruta.horarioSalida} - ${ruta.horarioLlegada}`,
        value: ruta,
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
    setHorarioSeleccionado(null); // Reiniciar horario seleccionado
  };

  // Manejar selección de horario
  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
  };

  // Manejar selección de tipo de servicio
  const handleTipoServicioSeleccionado = (tipoServicio) => {
    setTipoServicioSeleccionado(tipoServicio);

    // Establecer el precio según el tipo de servicio seleccionado
    let nuevoPrecio = 0;
    switch (tipoServicio.value) {
      case 'Semi Cama':
        nuevoPrecio = 70;
        break;
      case 'Cama':
        nuevoPrecio = 80;
        break;
      case 'Leito':
        nuevoPrecio = 100;
        break;
      case 'Suite':
        nuevoPrecio = 120;
        break;
      default:
        nuevoPrecio = 0;
        break;
    }
    setPrecio(nuevoPrecio); // Actualizar el precio seleccionado
  };

  const handleVerBus = () => {
    navigate('/verBus'); // Redirigir a la página de Ver Bus
  };

  // Manejar clic en el botón Buscar
  const handleBuscar = () => {
    navigate('/viajeFlota'); // Redirigir directamente a la página ViajeFlota.jsx
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      <label>Ciudad Origen</label>
      <Select
        options={opcionesCiudades}
        onChange={handleCiudadOrigenSeleccionada}
        placeholder="Seleccione una ciudad de origen"
      />

      <label style={{ marginTop: '20px' }}>Ciudad Destino</label>
      <Select
        options={opcionesCiudades}
        onChange={handleCiudadDestinoSeleccionada}
        placeholder="Seleccione una ciudad de destino"
      />

      <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
      <Select
        options={horarios} // Opciones de horarios filtrados
        onChange={handleHorarioSeleccionado} // Manejar selección de horario
        placeholder="Seleccione un horario"
      />

      <div style={{ marginTop: '20px' }}>
        <label>Selecciona Fecha de Viaje</label>
        <DatePicker
          selected={fechaViaje}
          onChange={(date) => setFechaViaje(date)} // Manejar cambio de fecha
          minDate={new Date()} // Solo fechas a partir del día actual
          dateFormat="yyyy-MM-dd" // Formato de fecha
          placeholderText="Selecciona una fecha"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Tipo de Servicio</label>
        <Select
          options={opcionesTipoServicio}
          onChange={handleTipoServicioSeleccionado}
          placeholder="Seleccione un tipo de servicio"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Precio</label>
        <p>{precio} Bs</p>
      </div>

      {tipoServicioSeleccionado?.value === 'Semi Cama' && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleVerBus}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginRight: '10px',
            }}
          >
            Ver Bus
          </button>
        </div>
      )}

      <button
        onClick={handleBuscar}
        style={{
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Buscar
      </button>
    </div>
  );
};

export default Viajes;



/*
import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // npm install react-select
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore
import { useNavigate } from 'react-router-dom'; // Para redirigir programáticamente

const Viajes = () => {
  const [rutas, setRutas] = useState([]); // Datos de rutas cargadas desde Firebase
  const [ciudadOrigen, setCiudadOrigen] = useState(null); // Ciudad origen seleccionada
  const [ciudadDestino, setCiudadDestino] = useState(null); // Ciudad destino seleccionada
  const [horarios, setHorarios] = useState([]); // Horarios filtrados por la ruta seleccionada
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Horario seleccionado
  const [precio, setPrecio] = useState(0); // Precio inicial como 00 Bs
  const [tipoServicioSeleccionado, setTipoServicioSeleccionado] = useState(null); // Tipo de servicio seleccionado
  const [fechaViaje, setFechaViaje] = useState(new Date()); // Fecha de viaje seleccionada

  const db = getFirestore(); // Instancia de Firestore
  const navigate = useNavigate(); // Hook para redirigir programáticamente

  const opcionesCiudades = [
    { label: 'Cochabamba', value: 'Cochabamba' },
    { label: 'Santa Cruz', value: 'Santa Cruz' },
    { label: 'La Paz', value: 'La Paz' },
    { label: 'Oruro', value: 'Oruro' },
    { label: 'Potosí', value: 'Potosí' },
    { label: 'Chuquisaca', value: 'Chuquisaca' },
    { label: 'Tarija', value: 'Tarija' },
    { label: 'Beni', value: 'Beni' },
    { label: 'Pando', value: 'Pando' },
  ];

  const opcionesTipoServicio = [
    { label: 'Semi Cama', value: 'Semi Cama' },
    { label: 'Cama', value: 'Cama' },
    { label: 'Leito', value: 'Leito' },
    { label: 'Suite', value: 'Suite' },
  ];

  useEffect(() => {
    const obtenerRutas = async () => {
      const rutasSnapshot = await getDocs(collection(db, 'horarios')); // Colección 'horarios'
      const rutasData = rutasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ruta: doc.data().ruta, // Nombre de la ruta (Ciudad Origen - Ciudad Destino)
        horarioSalida: doc.data().horarioSalida,
        horarioLlegada: doc.data().horarioLlegada,
      }));

      setRutas(rutasData); // Guardar todas las rutas y horarios
    };

    obtenerRutas();
  }, []);

  // Manejar selección de ciudad origen
  const handleCiudadOrigenSeleccionada = (origen) => {
    setCiudadOrigen(origen);
    setCiudadDestino(null); // Reiniciar ciudad destino
    setHorarios([]); // Reiniciar horarios
    setHorarioSeleccionado(null); // Reiniciar horario seleccionado
    setTipoServicioSeleccionado(null); // Reiniciar tipo de servicio
    setPrecio(0); // Reiniciar precio
  };

  // Manejar selección de ciudad destino
  const handleCiudadDestinoSeleccionada = (destino) => {
    setCiudadDestino(destino);

    // Filtrar los horarios que coincidan con la ciudad de origen y destino seleccionadas
    const horariosFiltrados = rutas
      .filter((ruta) => ruta.ruta === `${ciudadOrigen?.value} - ${destino?.value}`) // Coincidir por la ruta
      .map((ruta) => ({
        label: `${ruta.horarioSalida} - ${ruta.horarioLlegada}`,
        value: ruta,
      }));

    setHorarios(horariosFiltrados); // Guardar horarios filtrados
    setHorarioSeleccionado(null); // Reiniciar horario seleccionado
  };

  // Manejar selección de horario
  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
  };

  // Manejar selección de tipo de servicio
  const handleTipoServicioSeleccionado = (tipoServicio) => {
    if (!tipoServicio || !tipoServicio.value) return; // Validar que el tipo de servicio sea válido
    
    setTipoServicioSeleccionado(tipoServicio);

    let nuevoPrecio = 0;

    // Establecer el precio según el tipo de servicio seleccionado
    switch (tipoServicio.value) {
      case 'Semi Cama':
        nuevoPrecio = 70;
        break;
      case 'Cama':
        nuevoPrecio = 80;
        break;
      case 'Leito':
        nuevoPrecio = 100;
        break;
      case 'Suite':
        nuevoPrecio = 120;
        break;
      default:
        nuevoPrecio = 0;
        break;
    }
    setPrecio(nuevoPrecio); // Actualizar el precio
  };

  const handleVerBus = () => {
    navigate('/verBus'); // Redirigir a la página de Ver Bus
  };

  // Manejar clic en el botón Buscar
  const handleBuscar = () => {
    navigate('/viajeFlota'); // Redirigir directamente a la página ViajeFlota.jsx
  };

  return (
    <div className="viajes">
      <h1>Selecciona tu Destino</h1>

      <label>Ciudad Origen</label>
      <Select
        options={opcionesCiudades}
        onChange={handleCiudadOrigenSeleccionada}
        placeholder="Seleccione una ciudad de origen"
      />

      <label style={{ marginTop: '20px' }}>Ciudad Destino</label>
      <Select
        options={opcionesCiudades}
        onChange={handleCiudadDestinoSeleccionada}
        placeholder="Seleccione una ciudad de destino"
      />

      <label style={{ marginTop: '20px' }}>Horario Salida - Horario de Llegada</label>
      <Select
        options={horarios} // Opciones de horarios filtrados
        onChange={handleHorarioSeleccionado} // Manejar selección de horario
        placeholder="Seleccione un horario"
      />

      <div style={{ marginTop: '20px' }}>
        <label>Selecciona Fecha de Viaje</label>
        <DatePicker
          selected={fechaViaje}
          onChange={(date) => setFechaViaje(date)} // Manejar cambio de fecha
          minDate={new Date()} // Solo fechas a partir del día actual
          dateFormat="yyyy-MM-dd" // Formato de fecha
          placeholderText="Selecciona una fecha"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Tipo de Servicio</label>
        <Select
          options={opcionesTipoServicio}
          onChange={handleTipoServicioSeleccionado}
          placeholder="Seleccione un tipo de servicio"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Precio</label>
        <p>{precio} Bs</p>
      </div>

      
      {tipoServicioSeleccionado && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleVerBus}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginRight: '10px',
            }}
          >
            Ver Bus
          </button>
        </div>
      )}

      <button
        onClick={handleBuscar}
        style={{
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Buscar
      </button>
    </div>
  );
};

export default Viajes;

*/