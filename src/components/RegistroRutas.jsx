/*
import React, { useState } from 'react';
import db from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const RegistroRutas = () => {
  const [formData, setFormData] = useState({
    ciudadOrigen: '',
    ciudadDestino: '',
    duracionEstimada: '',
    distanciaKm: '',
    horaSalida: '',
    horaLlegada: '',
    precioBs: '',
    parada: '',
    estado: 'Activo',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        horaSalida: '',
        horaLlegada: '',
        precioBs: '',
        parada: '',
        estado: 'Activo',
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
          <input type="text" name="ciudadOrigen" value={formData.ciudadOrigen} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Ciudad Destino</label>
          <select name="ciudadDestino" value={formData.ciudadDestino} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="Santa Cruz">Santa Cruz</option>
            <option value="La Paz">La Paz</option>
            <option value="Oruro">Oruro</option>
            <option value="Potosi">Potosí</option>
            <option value="Chuquisaca">Chuquisaca</option>
            <option value="Tarija">Tarija</option>
            <option value="Beni">Beni</option>
            <option value="Pando">Pando</option>
          </select>
        </div>

        <div className="form-group">
  <label>Duración Estimada (Horas)</label>
  <input
    type="number"
    name="duracionEstimada"
    value={formData.duracionEstimada}
    onChange={handleChange}
    min="0"
    max="24"
    placeholder="Ej: 5"
    required
  />
</div>



        <div className="form-group">
          <label>Distancia (Km)</label>
          <input type="number" name="distanciaKm" value={formData.distanciaKm} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Hora de Salida</label>
          <input type="time" name="horaSalida" value={formData.horaSalida} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Hora de Llegada</label>
          <input type="time" name="horaLlegada" value={formData.horaLlegada} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Precio (Bs)</label>
          <input type="number" name="precioBs" value={formData.precioBs} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Parada</label>
          <input type="text" name="parada" value={formData.parada} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange} required>
            <option value="Activo">Activo</option>
            <option value="Fuera de Servicio">Fuera de Servicio</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroRutas;
*/

import React, { useState } from 'react';
import db from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const RegistroRutas = () => {
  const [formData, setFormData] = useState({
    ciudadOrigen: '',
    ciudadDestino: '',
    duracionEstimada: '',
    distanciaKm: '',
    precioBs: '',
    parada: '',
    estado: 'Activo',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          <input type="text" name="ciudadOrigen" value={formData.ciudadOrigen} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Ciudad Destino</label>
          <select name="ciudadDestino" value={formData.ciudadDestino} onChange={handleChange} required>
            <option value="">Seleccione</option>
            <option value="Santa Cruz">Santa Cruz</option>
            <option value="La Paz">La Paz</option>
            <option value="Oruro">Oruro</option>
            <option value="Potosi">Potosí</option>
            <option value="Chuquisaca">Chuquisaca</option>
            <option value="Tarija">Tarija</option>
            <option value="Beni">Beni</option>
            <option value="Pando">Pando</option>
          </select>
        </div>
        <div className="form-group">
          <label>Duración Estimada (Horas)</label>
          <input
            type="number"
            name="duracionEstimada"
            value={formData.duracionEstimada}
            onChange={handleChange}
            min="0"
            max="24"
            placeholder="Ej: 5"
            required
          />
        </div>
        <div className="form-group">
          <label>Distancia (Km)</label>
          <input type="number" name="distanciaKm" value={formData.distanciaKm} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Precio (Bs)</label>
          <input type="number" name="precioBs" value={formData.precioBs} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Parada</label>
          <input type="text" name="parada" value={formData.parada} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange} required>
            <option value="Activo">Activo</option>
            <option value="Fuera de Servicio">Fuera de Servicio</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroRutas;
