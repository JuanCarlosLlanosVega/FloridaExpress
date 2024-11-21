import React, { useEffect, useState } from 'react';
import db from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

const ListaHorarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState(null);

  // Función para obtener los horarios de Firebase
  const fetchHorarios = async () => {
    const horariosCollection = collection(db, 'horarios');
    const horariosSnapshot = await getDocs(horariosCollection);
    const horariosList = horariosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setHorarios(horariosList);
  };

  // Función para mostrar el modal de edición
  const handleEdit = (horario) => {
    setSelectedHorario(horario);
    setShowEditModal(true);
  };

  // Función para manejar cambios en los inputs del modal de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedHorario({ ...selectedHorario, [name]: value });
  };

  // Función para actualizar los datos en Firebase
  const handleUpdate = async () => {
    const docRef = doc(db, 'horarios', selectedHorario.id);
    await updateDoc(docRef, selectedHorario);
    alert('Datos actualizados correctamente.');
    fetchHorarios();
    setShowEditModal(false);
  };

  // Función para mostrar el modal de confirmación de eliminación
  const handleDeleteClick = (horario) => {
    setSelectedHorario(horario);
    setShowDeleteModal(true);
  };

  // Función para confirmar la eliminación del registro
  const handleDeleteConfirm = async () => {
    const docRef = doc(db, 'horarios', selectedHorario.id);
    await deleteDoc(docRef);
    alert('Registro eliminado correctamente.');
    fetchHorarios();
    setShowDeleteModal(false);
    setSelectedHorario(null);
  };

  // Función para cancelar la eliminación
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedHorario(null);
  };

  // Función para imprimir en formato Excel
  const handlePrint = () => {
    const worksheet = XLSX.utils.json_to_sheet(horarios);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Horarios');
    XLSX.writeFile(workbook, 'ListadoHorarios.xlsx');
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  return (
    <div>
      <h2>Lista de Horarios</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ruta</th>
            <th>Conductor</th>
            <th>Flota</th>
            <th>Horario de Salida</th>
            <th>Horario de Llegada</th>
            <th>Precio (Bs)</th>
            <th>Tipo de Servicio</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id}>
              <td>{horario.id}</td>
              <td>{horario.ruta}</td>
              <td>{horario.conductorAsignado}</td>
              <td>{horario.flotaAsignada}</td>
              <td>{horario.horarioSalida}</td>
              <td>{horario.horarioLlegada}</td>
              <td>{horario.precioBs}</td>
              <td>{horario.tipoServicio}</td>
              <td>
                <button onClick={() => handleEdit(horario)}>Editar</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(horario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrint}>Imprimir</button>

      {/* Modal para editar datos */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Horario</h3>
            {Object.keys(selectedHorario).map((key) => (
              <div className="form-group" key={key}>
                <label>{key}</label>
                <input
                  type="text"
                  name={key}
                  value={selectedHorario[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button onClick={() => setShowEditModal(false)}>Cerrar</button>
            <button onClick={handleUpdate}>Actualizar Datos</button>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro de que deseas eliminar este registro?</h3>
            <button onClick={handleDeleteCancel}>Cancelar</button>
            <button onClick={handleDeleteConfirm}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaHorarios;
