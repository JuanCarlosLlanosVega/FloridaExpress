
import React, { useEffect, useState } from 'react';
import db from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

const ListaRutas = () => {
    const [rutas, setRutas] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRuta, setSelectedRuta] = useState(null);

    // Función para obtener las rutas de Firebase
    const fetchRutas = async () => {
        const rutasCollection = collection(db, 'rutas');
        const rutasSnapshot = await getDocs(rutasCollection);
        const rutasList = rutasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRutas(rutasList);
    };

    // Función para mostrar el modal de edición
    const handleEdit = (ruta) => {
        setSelectedRuta(ruta);
        setShowEditModal(true);
    };

    // Función para manejar cambios en los inputs del modal de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedRuta({ ...selectedRuta, [name]: value });
    };

    // Función para actualizar los datos en Firebase
    const handleUpdate = async () => {
        const docRef = doc(db, 'rutas', selectedRuta.id);
        await updateDoc(docRef, selectedRuta);
        alert('Datos actualizados correctamente.');
        fetchRutas();
        setShowEditModal(false);
    };

    // Función para mostrar el modal de confirmación de eliminación
    const handleDeleteClick = (ruta) => {
        setSelectedRuta(ruta);
        setShowDeleteModal(true);
    };

    // Función para confirmar la eliminación del registro
    const handleDeleteConfirm = async () => {
        const docRef = doc(db, 'rutas', selectedRuta.id);
        await deleteDoc(docRef);
        alert('Registro eliminado correctamente.');
        fetchRutas();
        setShowDeleteModal(false);
        setSelectedRuta(null);
    };

    // Función para cancelar la eliminación
    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedRuta(null);
    };

    // Función para imprimir en formato Excel
    const handlePrint = () => {
        const worksheet = XLSX.utils.json_to_sheet(rutas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rutas");
        XLSX.writeFile(workbook, "ListadoRutas.xlsx");
    };

    useEffect(() => {
        fetchRutas();
    }, []);

    return (
        <div>
            <h2>Lista de Rutas</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ciudad Origen</th>
                        <th>Ciudad Destino</th>
                        <th>Distancia (Km.)</th>
                        <th>Precio (Bs.)</th>
                        <th>Parada</th>
                        <th>Estado</th>
                        <th>Conductor Asignado</th>
                        <th>ID Conductor</th>
                        <th>Flota Asignada</th>
                        <th>ID Flota</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {rutas.map((ruta) => (
                        <tr key={ruta.id}>
                            <td>{ruta.id}</td>
                            <td>{ruta.ciudadOrigen}</td>
                            <td>{ruta.ciudadDestino}</td>
                            <td>{ruta.distanciaKm}</td>
                            <td>{ruta.precioBs}</td>
                            <td>{ruta.parada}</td>
                            <td>{ruta.estado}</td>
                            <td>{ruta.conductorAsignado}</td>
                            <td>{ruta.conductorId}</td>
                            <td>{ruta.flotaAsignada}</td>
                            <td>{ruta.flotaId}</td>
                            <td>
                                <button onClick={() => handleEdit(ruta)}>Editar</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(ruta)}>Eliminar</button>
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
                        <h3>Editar Ruta</h3>
                        {Object.keys(selectedRuta).map((key) => (
                            <div className="form-group" key={key}>
                                <label>{key}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={selectedRuta[key]}
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

export default ListaRutas;
