

import React, { useState } from 'react';
import db from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../styles.css';

const RegistroFlota = () => {
  const [formData, setFormData] = useState({
    tipoVehiculo: '',
    placa: '',
    modelo: '',
    color: '',
    kilometraje: '',
    estado: 'Activo',
    capacidad: '',
    añoFabricacion: '',
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'flotas'), formData);
      alert('Registro de flota exitoso.');
      // Limpiar el formulario
      setFormData({
        tipoVehiculo: '',
        placa: '',
        modelo: '',
        color: '',
        kilometraje: '',
        estado: 'Activo',
        capacidad: '',
        añoFabricacion: '',
      });
    } catch (error) {
      alert('Error al registrar flota.');
      console.error(error);
    }
  };

  return (
    <div className="registro-flota-container">
      <h2 className="registro-title">Registro de Flota</h2>
      <form className="registro-flota-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo de Vehículo <span className="required">*</span></label>
          <input type="text" name="tipoVehiculo" value={formData.tipoVehiculo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Placa <span className="required">*</span></label>
          <input type="text" name="placa" value={formData.placa} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Modelo <span className="required">*</span></label>
          <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Color <span className="required">*</span></label>
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Kilometraje <span className="required">*</span></label>
          <input type="number" name="kilometraje" value={formData.kilometraje} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Estado <span className="required">*</span></label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="En Mantenimiento">En Mantenimiento</option>
            <option value="Fuera de Servicio">Fuera de Servicio</option>
          </select>
        </div>

        <div className="form-group">
          <label>Capacidad (Número de Asientos) <span className="required">*</span></label>
          <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Año de Fabricación <span className="required">*</span></label>
          <input type="number" name="añoFabricacion" value={formData.añoFabricacion} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroFlota;