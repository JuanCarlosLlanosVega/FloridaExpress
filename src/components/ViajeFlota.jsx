/*
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos del calendario

const ViajeFlota = () => {
  const [numPasajeros, setNumPasajeros] = useState('');
  const [formularios, setFormularios] = useState([]); // Lista de formularios generados

  const handleNumPasajerosChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumPasajeros(value); // Permitir solo números
    }
  };

  const handleGenerarFormulario = () => {
    const cantidad = parseInt(numPasajeros, 10);
    if (cantidad > 0) {
      // Crear formularios según el número ingresado
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
    // Agregar más códigos de país si es necesario
  ];

  const handleContinuar = () => {
    alert('Formularios enviados con éxito');
    // Aquí puedes agregar la lógica para manejar los datos de los formularios
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
          {formularios.map((formulario) => (
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
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>Número de Teléfono:</label>
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

const ViajeFlota = () => {
  const [numPasajeros, setNumPasajeros] = useState('');
  const [formularios, setFormularios] = useState([]); // Lista de formularios generados
  const navigate = useNavigate(); // Hook para redirigir a otra página

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

  const handleContinuar = () => {
    // Redirigir a la página SeleccionAsientos.jsx
    navigate('/seleccionAsientos');
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
          {formularios.map((formulario) => (
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
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ width: '150px', fontWeight: 'bold' }}>Número de Teléfono:</label>
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
