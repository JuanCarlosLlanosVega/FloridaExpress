import React, { useState } from 'react';
import db from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const RegistroConductor = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    numeroIdentidad: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
    licenciaConducir: '',
    categoriaLicencia: '',
    fechaEmisionLicencia: '',
    fechaExpiracionLicencia: '',
    añosExperiencia: '',
    contactoEmergencia: '',
    relacionEmergencia: '',
    telefonoEmergencia: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'conductores'), formData);
      alert('Conductor registrado exitosamente.');
      setFormData({
        nombreCompleto: '',
        numeroIdentidad: '',
        fechaNacimiento: '',
        genero: '',
        direccion: '',
        telefono: '',
        correoElectronico: '',
        licenciaConducir: '',
        categoriaLicencia: '',
        fechaEmisionLicencia: '',
        fechaExpiracionLicencia: '',
        añosExperiencia: '',
        contactoEmergencia: '',
        relacionEmergencia: '',
        telefonoEmergencia: '',
      });
    } catch (error) {
      alert('Error al registrar conductor.');
      console.error(error);
    }
  };

  return (
    <div className="registro-conductor-container">
      <h2>Registro de Conductor</h2>
      <form className="registro-conductor-form" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
              <input
                type={key.includes('fecha') ? 'date' : key.includes('años') ? 'number' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                required={key !== 'correoElectronico' && key !== 'relacionEmergencia'}
              />
            </label>
          </div>
        ))}
        <button type="submit" className="btn-submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroConductor;
