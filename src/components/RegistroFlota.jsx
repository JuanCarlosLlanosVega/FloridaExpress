/*
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const RegistroFlota = () => {
  const [formData, setFormData] = useState({
    tipoVehiculo: '',
    placa: '',
    modelo: '',
    kilometraje: '',
    estado: 'Activo',
    capacidad: '',
    anioFabricacion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Aquí puedes agregar el código para enviar los datos a Firebase
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Registro de Flota</h2>
        <form className="form-registro" onSubmit={handleSubmit}>
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
            <label>Kilometraje <span className="required">*</span></label>
            <input type="number" name="kilometraje" value={formData.kilometraje} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Estado <span className="required">*</span></label>
            <select name="estado" value={formData.estado} onChange={handleChange} required>
              <option value="Activo">Activo</option>
              <option value="En mantenimiento">En mantenimiento</option>
              <option value="Fuera de servicio">Fuera de servicio</option>
            </select>
          </div>

          <div className="form-group">
            <label>Capacidad <span className="required">*</span></label>
            <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Año de Fabricación <span className="required">*</span></label>
            <input type="number" name="anioFabricacion" value={formData.anioFabricacion} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-submit">Registrar</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegistroFlota;
*/


/*penultimoooooooooooooooooooooooooooo*/
/*
import React from 'react';

const RegistroFlota = () => {
  return (
    <div className="registro-flota-container">
      <h2>Registro de Flota</h2>
      <form className="registro-flota-form">
        <label>Tipo de Vehículo <span className="required">*</span></label>
        <input type="text" required />

        <label>Placa <span className="required">*</span></label>
        <input type="text" required />

        <label>Modelo <span className="required">*</span></label>
        <input type="text" required />

        <label>Color <span className="required">*</span></label>
        <input type="text" required />

        <label>Kilometraje <span className="required">*</span></label>
        <input type="number" required />

        <label>Estado <span className="required">*</span></label>
        <select required>
          <option value="activo">Activo</option>
          <option value="en mantenimiento">En Mantenimiento</option>
          <option value="fuera de servicio">Fuera de Servicio</option>
        </select>
        <label>Capacidad <span className="required">*</span></label>
        <input type="number" required />
        <label>Año de Fabricación <span className="required">*</span></label>
        <input type="number" required />
        <button type="submit" className="btn-submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroFlota;
*/

/**************************************************************************** */

/*

import React, { useState } from 'react';
import  db  from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const RegistroFlota = () => {
  const [formData, setFormData] = useState({
    tipoVehiculo: '',
    placa: '',
    modelo: '',
    color: '',
    kilometraje: '',
    estado: 'Activo',
    capacidad: '',
    añoFabricacion: ''
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Referencia a la colección 'flotas'
      const docRef = await addDoc(collection(db, 'flotas'), {
        tipo_vehiculo: formData.tipoVehiculo,
        placa: formData.placa,
        modelo: formData.modelo,
        color: formData.color,
        kilometraje: formData.kilometraje,
        estado: formData.estado,
        capacidad: formData.capacidad,
        año_fabricacion: formData.añoFabricacion
      });
      alert(`Registro exitoso con ID: ${docRef.id}`);
      // Limpiar el formulario después de registrar
      setFormData({
        tipoVehiculo: '',
        placa: '',
        modelo: '',
        color: '',
        kilometraje: '',
        estado: 'Activo',
        capacidad: '',
        añoFabricacion: ''
      });
    } catch (error) {
      console.error('Error al registrar flota:', error);
      alert('Error al registrar flota.');
    }
  };

  return (
    <div className="registro-flota-container">
      <h2>Registro de Flota</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <label>Tipo de Vehículo *</label>
        <input type="text" name="tipoVehiculo" value={formData.tipoVehiculo} onChange={handleChange} required />

        <label>Placa *</label>
        <input type="text" name="placa" value={formData.placa} onChange={handleChange} required />

        <label>Modelo *</label>
        <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />

        <label>Color *</label>
        <input type="text" name="color" value={formData.color} onChange={handleChange} required />

        <label>Kilometraje *</label>
        <input type="number" name="kilometraje" value={formData.kilometraje} onChange={handleChange} required />

        <label>Estado *</label>
        <select name="estado" value={formData.estado} onChange={handleChange} required>
          <option value="Activo">Activo</option>
          <option value="En mantenimiento">En mantenimiento</option>
          <option value="Fuera de servicio">Fuera de servicio</option>
        </select>

        <label>Capacidad *</label>
        <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} required />

        <label>Año de Fabricación *</label>
        <input type="number" name="añoFabricacion" value={formData.añoFabricacion} onChange={handleChange} required />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroFlota;

*/
/********************************************************************************************** */

/*
import React from 'react';

const RegistroFlota = () => {
  return (
    <div className="registro-flota-container">
      <h2>Registro de Flota</h2>
      <form className="registro-flota-form">
        <label>Tipo de Vehículo <span className="required">*</span></label>
        <input type="text" required />
        <label>Placa <span className="required">*</span></label>
        <input type="text" required />
        <label>Modelo <span className="required">*</span></label>
        <input type="text" required />
        <label>Kilometraje <span className="required">*</span></label>
        <input type="number" required />
        <label>Estado <span className="required">*</span></label>
        <select required>
          <option value="activo">Activo</option>
          <option value="en mantenimiento">En Mantenimiento</option>
          <option value="fuera de servicio">Fuera de Servicio</option>
        </select>
        <label>Capacidad <span className="required">*</span></label>
        <input type="number" required />
        <label>Año de Fabricación <span className="required">*</span></label>
        <input type="number" required />
        <button type="submit" className="btn-submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroFlota;
*/

/*
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
*/

import React, { useState, useEffect } from 'react';
import db from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
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
    conductorAsignado: '',
    conductorId: '',
  });

  const [conductoresDisponibles, setConductoresDisponibles] = useState([]);

  // Obtener la lista de conductores disponibles al cargar el componente
  useEffect(() => {
    const fetchConductores = async () => {
      try {
        const q = query(
          collection(db, 'conductores'),
          //where('asignado', '==', false) // Solo conductores no asignados
        );
        const querySnapshot = await getDocs(q);
        const conductores = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombreCompleto,
        }));
        setConductoresDisponibles(conductores);
      } catch (error) {
        console.error('Error al obtener conductores:', error);
      }
    };

    fetchConductores();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar selección de conductor
  const handleConductorSeleccionado = (e) => {
    const conductorId = e.target.value;
    const conductor = conductoresDisponibles.find((c) => c.id === conductorId);
    setFormData({
      ...formData,
      conductorAsignado: conductor ? conductor.nombre : '',
      conductorId: conductorId,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'flotas'), formData);

      // Actualizar el estado del conductor para marcarlo como asignado
      if (formData.conductorId) {
        await db
          .collection('conductores')
          .doc(formData.conductorId)
          .update({ asignado: true });
      }

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
        conductorAsignado: '',
        conductorId: '',
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
          <input type="text" name="conductorId" value={formData.conductorId} readOnly />
        </div>

        <button type="submit" className="btn-submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistroFlota;
