/*
sale copmpleto

import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firebase Firestore

const ViajeFlota = () => {
  const [numPasajeros, setNumPasajeros] = useState('');
  const [formularios, setFormularios] = useState([]); // Lista de formularios generados
  const [telefonoOpciones, setTelefonoOpciones] = useState(''); // Opción seleccionada para teléfono
  const navigate = useNavigate(); // Hook para redirigir a otra página
  const db = getFirestore(); // Instancia de Firestore
  

  const handleNumPasajerosChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumPasajeros(value); // Permitir solo números
    }
  };

  const handleGenerarFormulario = () => {
    const cantidad = parseInt(numPasajeros, 10);
    if (cantidad > 0) {
      const nuevosFormularios = Array.from({ length: cantidad }, (_, index) => ({
        id: index + 1,
        nombre: '',
        apellidos: '',
        identidad: '',
        fechaNacimiento: null,
        telefono: '',
        codigoPais: '',
      }));
      setFormularios(nuevosFormularios);
    }
  };

  const handleFormularioChange = (id, field, value) => {
    setFormularios((prevFormularios) =>
      prevFormularios.map((formulario) =>
        formulario.id === id ? { ...formulario, [field]: value } : formulario
      )
    );
  };

  const codigosTelefonicos = [
    { label: '+1 (USA)', value: '+1' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+52 (MEX)', value: '+52' },
    { label: '+591 (BOL)', value: '+591' },
    { label: '+57 (COL)', value: '+57' },
  ];

  const handleTelefonoOpcionChange = (e) => {
    setTelefonoOpciones(e.target.value); // Actualizar la opción seleccionada
  };



  const handleContinuar = async () => {
    if (
      formularios.some(
        (form) =>
          !form.nombre ||
          !form.apellidos ||
          !form.identidad ||
          !form.fechaNacimiento ||
          (!form.telefono && telefonoOpciones === "individual")
      )
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const pasajerosCollection = collection(db, "pasajeros");
  
      for (const formulario of formularios) {
        const pasajero = {
          nombre: formulario.nombre,
          apellidos: formulario.apellidos,
          identidad: formulario.identidad,
          fechaNacimiento: formulario.fechaNacimiento.toISOString(),
          telefono:
            telefonoOpciones === "representacion" && formulario.id !== 1
              ? ""
              : `${formulario.codigoPais} ${formulario.telefono}`,
          tipoContacto: telefonoOpciones,
          reservaId: "currentReserva", // Identificador único de la reserva actual
        };
  
        await addDoc(pasajerosCollection, pasajero);
      }
  
      alert("Pasajeros registrados exitosamente.");
      navigate("/seleccionAsientos");
    } catch (error) {
      console.error("Error al registrar los datos:", error);
      alert("Ocurrió un error al registrar los datos.");
    }
  };
  


  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro de Pasajeros</h1>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ marginRight: '10px', width: '150px', fontWeight: 'bold' }}>
          Número de pasajeros:
        </label>
        <input
          type="text"
          value={numPasajeros}
          onChange={handleNumPasajerosChange}
          style={{
            border: '1px solid black',
            padding: '5px',
            width: '50px',
            marginRight: '20px',
          }}
        />
        <button
          onClick={handleGenerarFormulario}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Generar Formulario
        </button>
      </div>

      {formularios.length > 0 && (
        <>
          <h2 style={{ marginTop: '20px', textAlign: 'center' }}>Formulario Pasajeros</h2>

          {formularios.map((formulario, index) => (
            <div key={formulario.id} style={{ marginBottom: '20px' }}>
              <hr style={{ borderColor: 'red', margin: '10px 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>Nombre:</label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'nombre', e.target.value)
                  }
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginRight: '10px',
                    width: '200px',
                  }}
                />
                <label style={{ width: '150px', fontWeight: 'bold' }}>Apellidos:</label>
                <input
                  type="text"
                  value={formulario.apellidos}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'apellidos', e.target.value)
                  }
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    width: '200px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>No. de Identidad:</label>
                <input
                  type="text"
                  value={formulario.identidad}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'identidad', e.target.value)
                  }
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginRight: '10px',
                    width: '150px',
                  }}
                />
                <label style={{ width: '150px', fontWeight: 'bold' }}>Fecha de Nacimiento:</label>
                <DatePicker
                  selected={formulario.fechaNacimiento}
                  onChange={(date) =>
                    handleFormularioChange(formulario.id, 'fechaNacimiento', date)
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Selecciona una fecha"
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginRight: '10px',
                  }}
                />
              </div>

              {index === 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                    Número de contacto:
                  </label>
                  <select
                    value={telefonoOpciones}
                    onChange={handleTelefonoOpcionChange}
                    style={{
                      border: '1px solid black',
                      padding: '5px',
                      width: '300px',
                    }}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="individual">Registrar teléfono por cada pasajero</option>
                    <option value="representacion">Registrar un teléfono en representación</option>
                  </select>
                </div>
              )}

              {(telefonoOpciones === 'individual' || (telefonoOpciones === 'representacion' && index === 0)) && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ width: '150px', fontWeight: 'bold' }}>
                    {telefonoOpciones === 'representacion' ? 'Teléfono en Representación:' : 'Número de Teléfono:'}
                  </label>
                  <select
                    value={formulario.codigoPais}
                    onChange={(e) =>
                      handleFormularioChange(formulario.id, 'codigoPais', e.target.value)
                    }
                    style={{
                      border: '1px solid black',
                      padding: '5px',
                      marginRight: '10px',
                      width: '100px',
                    }}
                  >
                    <option value="">Código</option>
                    {codigosTelefonicos.map((codigo) => (
                      <option key={codigo.value} value={codigo.value}>
                        {codigo.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={formulario.telefono}
                    onChange={(e) =>
                      handleFormularioChange(formulario.id, 'telefono', e.target.value)
                    }
                    style={{
                      border: '1px solid black',
                      padding: '5px',
                      width: '150px',
                    }}
                  />
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleContinuar}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '20px',
              float: 'right',
            }}
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
};

export default ViajeFlota;

*/

/*
lo ultomo si no da

import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firebase Firestore
import { v4 as uuidv4 } from "uuid"; // Generar identificadores únicos

const ViajeFlota = () => {
  const [numPasajeros, setNumPasajeros] = useState('');
  const [formularios, setFormularios] = useState([]); // Lista de formularios generados
  const [telefonoOpciones, setTelefonoOpciones] = useState(''); // Opción seleccionada para teléfono
  const navigate = useNavigate(); // Hook para redirigir a otra página
  const db = getFirestore(); // Instancia de Firestore

  const handleNumPasajerosChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumPasajeros(value); // Permitir solo números
    }
  };

  const handleGenerarFormulario = () => {
    const cantidad = parseInt(numPasajeros, 10);
    if (cantidad > 0) {
      const nuevosFormularios = Array.from({ length: cantidad }, (_, index) => ({
        id: index + 1,
        nombre: '',
        apellidos: '',
        identidad: '',
        fechaNacimiento: null,
        telefono: '',
        codigoPais: '',
      }));
      setFormularios(nuevosFormularios);
    }
  };

  const handleFormularioChange = (id, field, value) => {
    setFormularios((prevFormularios) =>
      prevFormularios.map((formulario) =>
        formulario.id === id ? { ...formulario, [field]: value } : formulario
      )
    );
  };

  const codigosTelefonicos = [
    { label: '+1 (USA)', value: '+1' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+52 (MEX)', value: '+52' },
    { label: '+591 (BOL)', value: '+591' },
    { label: '+57 (COL)', value: '+57' },
  ];

  const handleTelefonoOpcionChange = (e) => {
    setTelefonoOpciones(e.target.value); // Actualizar la opción seleccionada
  };

  const handleContinuar = async () => {
    const reservaId = uuidv4(); // Generar un ID único para la reserva actual

    if (
      formularios.some(
        (form) =>
          !form.nombre ||
          !form.apellidos ||
          !form.identidad ||
          !form.fechaNacimiento ||
          (!form.telefono && telefonoOpciones === "individual")
      )
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const pasajerosCollection = collection(db, "pasajeros");

      for (const formulario of formularios) {
        const pasajero = {
          nombre: formulario.nombre,
          apellidos: formulario.apellidos,
          identidad: formulario.identidad,
          fechaNacimiento: formulario.fechaNacimiento.toISOString(),
          telefono:
            telefonoOpciones === "representacion" && formulario.id !== 1
              ? ""
              : `${formulario.codigoPais} ${formulario.telefono}`,
          tipoContacto: telefonoOpciones,
          reservaId: reservaId, // Guardar el ID de la reserva actual
        };

        await addDoc(pasajerosCollection, pasajero);
      }

      alert("Pasajeros registrados exitosamente.");
      navigate("/seleccionAsientos", { state: { reservaId } }); // Pasar el reservaId a SeleccionAsientos
    } catch (error) {
      console.error("Error al registrar los datos:", error);
      alert("Ocurrió un error al registrar los datos.");
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro de Pasajeros</h1>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ marginRight: '10px', width: '150px', fontWeight: 'bold' }}>
          Número de pasajeros:
        </label>
        <input
          type="text"
          value={numPasajeros}
          onChange={handleNumPasajerosChange}
          style={{
            border: '1px solid black',
            padding: '5px',
            width: '50px',
            marginRight: '20px',
          }}
        />
        <button
          onClick={handleGenerarFormulario}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Generar Formulario
        </button>
      </div>

      {formularios.length > 0 && (
        <>
          <h2 style={{ marginTop: '20px', textAlign: 'center' }}>Formulario Pasajeros</h2>

          {formularios.map((formulario, index) => (
            <div key={formulario.id} style={{ marginBottom: '20px' }}>
              <hr style={{ borderColor: 'red', margin: '10px 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>Nombre:</label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'nombre', e.target.value)
                  }
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginRight: '10px',
                    width: '200px',
                  }}
                />
                <label style={{ width: '150px', fontWeight: 'bold' }}>Apellidos:</label>
                <input
                  type="text"
                  value={formulario.apellidos}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'apellidos', e.target.value)
                  }
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    width: '200px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>No. de Identidad:</label>
                <input
                  type="text"
                  value={formulario.identidad}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'identidad', e.target.value)
                  }
                  style={{
                    border: '1px solid black',
                    padding: '5px',
                    marginRight: '10px',
                    width: '150px',
                  }}
                />
                <label style={{ width: '150px', fontWeight: 'bold' }}>Fecha de Nacimiento:</label>
                <DatePicker
                  selected={formulario.fechaNacimiento}
                  onChange={(date) =>
                    handleFormularioChange(formulario.id, 'fechaNacimiento', date)
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Selecciona una fecha"
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleContinuar}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '20px',
              float: 'right',
            }}
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
};

export default ViajeFlota;
*/

import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firebase Firestore
import { v4 as uuidv4 } from "uuid"; // Generar identificadores únicos

const ViajeFlota = () => {
  const [numPasajeros, setNumPasajeros] = useState(''); // Número de pasajeros
  const [formularios, setFormularios] = useState([]); // Lista de formularios generados
  const [telefonoOpciones, setTelefonoOpciones] = useState(''); // Opción seleccionada para el teléfono
  const navigate = useNavigate(); // Hook para redirigir a otra página
  const db = getFirestore(); // Instancia de Firestore

  // Validar número de pasajeros ingresado
  const handleNumPasajerosChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumPasajeros(value);
    }
  };

  // Generar formularios para los pasajeros
  const handleGenerarFormulario = () => {
    const cantidad = parseInt(numPasajeros, 10);
    if (cantidad > 0) {
      const nuevosFormularios = Array.from({ length: cantidad }, (_, index) => ({
        id: index + 1,
        nombre: '',
        apellidos: '',
        identidad: '',
        fechaNacimiento: null,
        telefono: '',
        codigoPais: '',
      }));
      setFormularios(nuevosFormularios);
    }
  };

  // Actualizar los campos de un formulario específico
  const handleFormularioChange = (id, field, value) => {
    setFormularios((prevFormularios) =>
      prevFormularios.map((formulario) =>
        formulario.id === id ? { ...formulario, [field]: value } : formulario
      )
    );
  };

  // Opciones de códigos telefónicos
  const codigosTelefonicos = [
    { label: '+1 (USA)', value: '+1' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+52 (MEX)', value: '+52' },
    { label: '+591 (BOL)', value: '+591' },
    { label: '+57 (COL)', value: '+57' },
  ];

  // Manejar la selección de opciones de teléfono
  const handleTelefonoOpcionChange = (e) => {
    setTelefonoOpciones(e.target.value);
  };

  // Continuar a la página de selección de asientos
  const handleContinuar = async () => {
    const reservaId = uuidv4(); // Generar un ID único para la reserva actual

    // Validación de campos obligatorios
    if (
      formularios.some(
        (form) =>
          !form.nombre ||
          !form.apellidos ||
          !form.identidad ||
          !form.fechaNacimiento ||
          (!form.telefono && telefonoOpciones === "individual")
      )
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const pasajerosCollection = collection(db, "pasajeros");

      for (const formulario of formularios) {
        const pasajero = {
          nombre: formulario.nombre,
          apellidos: formulario.apellidos,
          identidad: formulario.identidad,
          fechaNacimiento: formulario.fechaNacimiento.toISOString(),
          telefono:
            telefonoOpciones === "representacion" && formulario.id !== 1
              ? ""
              : `${formulario.codigoPais} ${formulario.telefono}`,
          tipoContacto: telefonoOpciones,
          reservaId: reservaId, // ID de la reserva actual
        };

        await addDoc(pasajerosCollection, pasajero);
      }

      alert("Pasajeros registrados exitosamente.");
      navigate("/seleccionAsientos", { state: { reservaId } });
    } catch (error) {
      console.error("Error al registrar los datos:", error);
      alert("Ocurrió un error al registrar los datos.");
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Registro de Pasajeros</h1>

      {/* Entrada del número de pasajeros */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ marginRight: '10px', width: '150px', fontWeight: 'bold' }}>
          Número de pasajeros:
        </label>
        <input
          type="text"
          value={numPasajeros}
          onChange={handleNumPasajerosChange}
          style={{
            border: '1px solid black',
            padding: '5px',
            width: '50px',
            marginRight: '20px',
          }}
        />
        <button
          onClick={handleGenerarFormulario}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Generar Formulario
        </button>
      </div>

      {/* Formularios generados */}
      {formularios.length > 0 && (
        <>
          <h2 style={{ marginTop: '20px', textAlign: 'center' }}>Formulario Pasajeros</h2>

          {formularios.map((formulario, index) => (
            <div key={formulario.id} style={{ marginBottom: '20px' }}>
              <hr style={{ borderColor: 'red', margin: '10px 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>Nombre:</label>
                <input
                  type="text"
                  value={formulario.nombre}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'nombre', e.target.value)
                  }
                  style={{ border: '1px solid black', padding: '5px', marginRight: '10px', width: '200px' }}
                />
                <label style={{ width: '150px', fontWeight: 'bold' }}>Apellidos:</label>
                <input
                  type="text"
                  value={formulario.apellidos}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'apellidos', e.target.value)
                  }
                  style={{ border: '1px solid black', padding: '5px', width: '200px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>No. de Identidad:</label>
                <input
                  type="text"
                  value={formulario.identidad}
                  onChange={(e) =>
                    handleFormularioChange(formulario.id, 'identidad', e.target.value)
                  }
                  style={{ border: '1px solid black', padding: '5px', marginRight: '10px', width: '150px' }}
                />
                <label style={{ width: '150px', fontWeight: 'bold' }}>Fecha de Nacimiento:</label>
                <DatePicker
                  selected={formulario.fechaNacimiento}
                  onChange={(date) =>
                    handleFormularioChange(formulario.id, 'fechaNacimiento', date)
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Selecciona una fecha"
                />
              </div>

              {index === 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                    Número de contacto:
                  </label>
                  <select
                    value={telefonoOpciones}
                    onChange={handleTelefonoOpcionChange}
                    style={{ border: '1px solid black', padding: '5px', width: '300px' }}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="individual">Registrar teléfono por cada pasajero</option>
                    <option value="representacion">Registrar un teléfono en representación</option>
                  </select>
                </div>
              )}

              {(telefonoOpciones === 'individual' || (telefonoOpciones === 'representacion' && index === 0)) && (
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ width: '150px', fontWeight: 'bold' }}>Número de Teléfono:</label>
                  <select
                    value={formulario.codigoPais}
                    onChange={(e) =>
                      handleFormularioChange(formulario.id, 'codigoPais', e.target.value)
                    }
                    style={{ border: '1px solid black', padding: '5px', marginRight: '10px', width: '100px' }}
                  >
                    <option value="">Código</option>
                    {codigosTelefonicos.map((codigo) => (
                      <option key={codigo.value} value={codigo.value}>
                        {codigo.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={formulario.telefono}
                    onChange={(e) =>
                      handleFormularioChange(formulario.id, 'telefono', e.target.value)
                    }
                    style={{ border: '1px solid black', padding: '5px', width: '150px' }}
                  />
                </div>
              )}
            </div>
          ))}

          <button
            onClick={handleContinuar}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '20px',
              float: 'right',
            }}
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
};

export default ViajeFlota;
