/*

import React, { useState, useEffect } from 'react';
import db from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const RegistroRutas = () => {
  const [formData, setFormData] = useState({
    ciudadOrigen: '',
    ciudadDestino: '',
    duracionEstimada: '',
    distanciaKm: '',
    precioBs: '',
    parada: '',
    estado: 'Activo',
    conductorAsignado: '',
    conductorId: '',
    flotaAsignada: '',
    flotaId: '',
  });

  const [conductoresDisponibles, setConductoresDisponibles] = useState([]);
  const [flotasDisponibles, setFlotasDisponibles] = useState([]);

  // Obtener la lista de conductores disponibles
  useEffect(() => {
    const fetchConductores = async () => {
      try {
        const conductoresSnapshot = await getDocs(collection(db, 'conductores'));
        const conductores = conductoresSnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombreCompleto,
        }));
        setConductoresDisponibles(conductores);
      } catch (error) {
        console.error('Error al obtener conductores:', error);
      }
    };

    const fetchFlotas = async () => {
      try {
        const flotasSnapshot = await getDocs(collection(db, 'flotas'));
        const flotas = flotasSnapshot.docs.map((doc) => ({
          id: doc.id,
          placa: doc.data().placa,
        }));
        setFlotasDisponibles(flotas);
      } catch (error) {
        console.error('Error al obtener flotas:', error);
      }
    };

    fetchConductores();
    fetchFlotas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConductorSeleccionado = (e) => {
    const conductorId = e.target.value;
    const conductor = conductoresDisponibles.find((c) => c.id === conductorId);
    setFormData({
      ...formData,
      conductorAsignado: conductor ? conductor.nombre : '',
      conductorId: conductorId,
    });
  };

  const handleFlotaSeleccionada = (e) => {
    const flotaId = e.target.value;
    const flota = flotasDisponibles.find((f) => f.id === flotaId);
    setFormData({
      ...formData,
      flotaAsignada: flota ? flota.placa : '',
      flotaId: flotaId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rutas'), formData);
      alert('Ruta registrada exitosamente.');
      setFormData({
        ciudadOrigen: '',
        ciudadDestino: '',
        duracionEstimada: '',
        distanciaKm: '',
        precioBs: '',
        parada: '',
        estado: 'Activo',
        conductorAsignado: '',
        conductorId: '',
        flotaAsignada: '',
        flotaId: '',
      });
    } catch (error) {
      alert('Error al registrar la ruta.');
      console.error(error);
    }
  };

  return (
    <div className="registro-rutas-container">
      <h2>Registro de Ruta</h2>
      <form className="registro-rutas-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ciudad Origen</label>
          <input
            type="text"
            name="ciudadOrigen"
            value={formData.ciudadOrigen}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ciudad Destino</label>
          <select
            name="ciudadDestino"
            value={formData.ciudadDestino}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Santa Cruz">Santa Cruz</option>
            <option value="La Paz">La Paz</option>
            <option value="Oruro">Oruro</option>
            <option value="Potosí">Potosí</option>
            <option value="Chuquisaca">Chuquisaca</option>
            <option value="Tarija">Tarija</option>
            <option value="Beni">Beni</option>
            <option value="Pando">Pando</option>
          </select>
        </div>


        
        
        <div className="form-group">
          <label>Distancia (Km)</label>
          <input
            type="number"
            name="distanciaKm"
            value={formData.distanciaKm}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label>Precio (Bs)</label>
          <input
            type="number"
            name="precioBs"
            value={formData.precioBs}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Parada</label>
          <input
            type="text"
            name="parada"
            value={formData.parada}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="Activo">Activo</option>
            <option value="Fuera de Servicio">Fuera de Servicio</option>
          </select>
        </div>
        <div className="form-group">
          <label>Conductor Asignado</label>
          <select onChange={handleConductorSeleccionado} required>
            <option value="">Seleccione un conductor</option>
            {conductoresDisponibles.map((conductor) => (
              <option key={conductor.id} value={conductor.id}>
                {conductor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>ID Conductor</label>
          <input
            type="text"
            name="conductorId"
            value={formData.conductorId}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Flota Asignada</label>
          <select onChange={handleFlotaSeleccionada} required>
            <option value="">Seleccione una flota</option>
            {flotasDisponibles.map((flota) => (
              <option key={flota.id} value={flota.id}>
                {flota.placa}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>ID Flota</label>
          <input
            type="text"
            name="flotaId"
            value={formData.flotaId}
            readOnly
          />
        </div>
        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistroRutas;
*/

import React, { useState, useEffect } from 'react';
import db from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const RegistroRutas = () => {
  const [formData, setFormData] = useState({
    ciudadOrigen: '',
    ciudadDestino: '',
    duracionEstimada: '',
    distanciaKm: '',
    precioBs: '',
    parada: '',
    estado: 'Activo',
    conductorAsignado: '',
    conductorId: '',
    flotaAsignada: '',
    flotaId: '',
  });

  const [conductoresDisponibles, setConductoresDisponibles] = useState([]);
  const [flotasDisponibles, setFlotasDisponibles] = useState([]);

  const opcionesCiudades = [
    { value: '', label: 'Seleccione' },
    { value: 'Cochabamba', label: 'Cochabamba' },
    { value: 'Santa Cruz', label: 'Santa Cruz' },
    { value: 'La Paz', label: 'La Paz' },
    { value: 'Oruro', label: 'Oruro' },
    { value: 'Potosí', label: 'Potosí' },
    { value: 'Chuquisaca', label: 'Chuquisaca' },
    { value: 'Tarija', label: 'Tarija' },
    { value: 'Beni', label: 'Beni' },
    { value: 'Pando', label: 'Pando' },
  ];

  useEffect(() => {
    const fetchConductores = async () => {
      try {
        const conductoresSnapshot = await getDocs(collection(db, 'conductores'));
        const conductores = conductoresSnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombreCompleto,
        }));
        setConductoresDisponibles(conductores);
      } catch (error) {
        console.error('Error al obtener conductores:', error);
      }
    };

    const fetchFlotas = async () => {
      try {
        const flotasSnapshot = await getDocs(collection(db, 'flotas'));
        const flotas = flotasSnapshot.docs.map((doc) => ({
          id: doc.id,
          placa: doc.data().placa,
        }));
        setFlotasDisponibles(flotas);
      } catch (error) {
        console.error('Error al obtener flotas:', error);
      }
    };

    fetchConductores();
    fetchFlotas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConductorSeleccionado = (e) => {
    const conductorId = e.target.value;
    const conductor = conductoresDisponibles.find((c) => c.id === conductorId);
    setFormData({
      ...formData,
      conductorAsignado: conductor ? conductor.nombre : '',
      conductorId: conductorId,
    });
  };

  const handleFlotaSeleccionada = (e) => {
    const flotaId = e.target.value;
    const flota = flotasDisponibles.find((f) => f.id === flotaId);
    setFormData({
      ...formData,
      flotaAsignada: flota ? flota.placa : '',
      flotaId: flotaId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rutas'), formData);
      alert('Ruta registrada exitosamente.');
      setFormData({
        ciudadOrigen: '',
        ciudadDestino: '',
        duracionEstimada: '',
        distanciaKm: '',
        precioBs: '',
        parada: '',
        estado: 'Activo',
        conductorAsignado: '',
        conductorId: '',
        flotaAsignada: '',
        flotaId: '',
      });
    } catch (error) {
      alert('Error al registrar la ruta.');
      console.error(error);
    }
  };

  return (
    <div className="registro-rutas-container">
      <h2>Registro de Ruta</h2>
      <form className="registro-rutas-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ciudad Origen</label>
          <select
            name="ciudadOrigen"
            value={formData.ciudadOrigen}
            onChange={handleChange}
            required
          >
            {opcionesCiudades.map((ciudad, index) => (
              <option key={index} value={ciudad.value}>
                {ciudad.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Ciudad Destino</label>
          <select
            name="ciudadDestino"
            value={formData.ciudadDestino}
            onChange={handleChange}
            required
          >
            {opcionesCiudades.map((ciudad, index) => (
              <option key={index} value={ciudad.value}>
                {ciudad.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Duración Estimada (Horas)</label>
          <input
            type="number"
            name="duracionEstimada"
            value={formData.duracionEstimada}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Distancia (Km)</label>
          <input
            type="number"
            name="distanciaKm"
            value={formData.distanciaKm}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio (Bs)</label>
          <input
            type="number"
            name="precioBs"
            value={formData.precioBs}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Parada</label>
          <input
            type="text"
            name="parada"
            value={formData.parada}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="Activo">Activo</option>
            <option value="Fuera de Servicio">Fuera de Servicio</option>
          </select>
        </div>
        <div className="form-group">
          <label>Conductor Asignado</label>
          <select onChange={handleConductorSeleccionado} required>
            <option value="">Seleccione un conductor</option>
            {conductoresDisponibles.map((conductor) => (
              <option key={conductor.id} value={conductor.id}>
                {conductor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>ID Conductor</label>
          <input
            type="text"
            name="conductorId"
            value={formData.conductorId}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Flota Asignada</label>
          <select onChange={handleFlotaSeleccionada} required>
            <option value="">Seleccione una flota</option>
            {flotasDisponibles.map((flota) => (
              <option key={flota.id} value={flota.id}>
                {flota.placa}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>ID Flota</label>
          <input
            type="text"
            name="flotaId"
            value={formData.flotaId}
            readOnly
          />
        </div>
        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistroRutas;
