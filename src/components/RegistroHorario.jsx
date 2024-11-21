
import React, { useState, useEffect } from 'react';
import db from '../firebaseConfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

const RegistroHorario = () => {
  const [conductoresFiltrados, setConductoresFiltrados] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState('');
  const [conductorSeleccionado, setConductorSeleccionado] = useState('');
  const [flotaAsignada, setFlotaAsignada] = useState('');
  const [horario, setHorario] = useState({
    horarioSalida: '',
    horarioLlegada: '',
    precioBs: '',
    tipoServicio: '',
  });

  const rutasPredefinidas = [
    'Cochabamba - Santa Cruz',
    'Cochabamba - La Paz',
    'Cochabamba - Oruro',
    'Cochabamba - Potosí',
    'Cochabamba - Chuquisaca',
    'Cochabamba - Tarija',
    'Cochabamba - Beni',
    'Cochabamba - Pando',
  ];

  // Filtrar conductores según la ruta seleccionada
  const handleRutaSeleccionada = async (e) => {
    const rutaSeleccionada = e.target.value;
    setRutaSeleccionada(rutaSeleccionada);

    // Obtener ciudadOrigen y ciudadDestino de la ruta seleccionada
    const [ciudadOrigen, ciudadDestino] = rutaSeleccionada.split(' - ');

    // Consultar los conductores asignados a esta ruta
    const rutasCollection = collection(db, 'rutas');
    const q = query(
      rutasCollection,
      where('ciudadOrigen', '==', ciudadOrigen),
      where('ciudadDestino', '==', ciudadDestino)
    );

    const rutasSnapshot = await getDocs(q);
    const conductores = rutasSnapshot.docs.map((doc) => ({
      id: doc.data().conductorId,
      nombre: doc.data().conductorAsignado,
      flotaAsignada: doc.data().flotaAsignada, // Capturar la flota asignada
    }));

    setConductoresFiltrados(conductores);
  };

  // Manejar selección de conductor
  const handleConductorSeleccionado = (e) => {
    const conductorId = e.target.value;
    setConductorSeleccionado(conductorId);

    // Buscar la flota asignada al conductor seleccionado
    const conductor = conductoresFiltrados.find((c) => c.id === conductorId);
    setFlotaAsignada(conductor ? conductor.flotaAsignada : '');
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHorario({ ...horario, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rutaSeleccionada || !conductorSeleccionado) {
      alert('Por favor, selecciona una ruta y un conductor.');
      return;
    }
    try {
      const horariosCollection = collection(db, 'horarios');
      await addDoc(horariosCollection, {
        ...horario,
        ruta: rutaSeleccionada,
        conductorId: conductorSeleccionado,
        flotaAsignada,
      });
      alert('Horario asignado correctamente.');
      setHorario({
        horarioSalida: '',
        horarioLlegada: '',
        precioBs: '',
        tipoServicio: '',
      });
      setFlotaAsignada('');
      setConductorSeleccionado('');
    } catch (error) {
      alert('Error al asignar horario.');
      console.error(error);
    }
  };

  return (
    <div className="registro-horario-container">
      <h2>Asignar Horario</h2>
      <form className="registro-horario-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ruta</label>
          <select value={rutaSeleccionada} onChange={handleRutaSeleccionada} required>
            <option value="">Selecciona una ruta</option>
            {rutasPredefinidas.map((ruta, index) => (
              <option key={index} value={ruta}>
                {ruta}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Conductor Asignado</label>
          <select
            value={conductorSeleccionado}
            onChange={handleConductorSeleccionado}
            required
          >
            <option value="">Selecciona un conductor</option>
            {conductoresFiltrados.map((conductor) => (
              <option key={conductor.id} value={conductor.id}>
                {conductor.nombre}
              </option>
            ))}
          </select>
        </div>
        {flotaAsignada && (
          <div className="form-group">
            <label>Flota Asignada</label>
            <input type="text" value={flotaAsignada} readOnly />
          </div>
        )}
        <div className="form-group">
          <label>Horario de Salida</label>
          <input
            type="time"
            name="horarioSalida"
            value={horario.horarioSalida}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Horario de Llegada</label>
          <input
            type="time"
            name="horarioLlegada"
            value={horario.horarioLlegada}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio (Bs)</label>
          <input
            type="number"
            name="precioBs"
            value={horario.precioBs}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Servicio</label>
          <select
            name="tipoServicio"
            value={horario.tipoServicio}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona el tipo de servicio</option>
            <option value="Semi-cama">Semi-cama</option>
            <option value="Cama ejecutiva">Cama ejecutiva</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          Asignar Horario
        </button>
      </form>
    </div>
  );
};

export default RegistroHorario;
