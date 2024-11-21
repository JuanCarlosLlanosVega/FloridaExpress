

import React, { useEffect, useState } from 'react';
import db from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

const ListaFlotas = () => {
    const [flotas, setFlotas] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedFlota, setSelectedFlota] = useState(null);

    // Función para obtener las flotas de Firebase
    const fetchFlotas = async () => {
        const flotasCollection = collection(db, 'flotas');
        const flotasSnapshot = await getDocs(flotasCollection);
        const flotasList = flotasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFlotas(flotasList);
    };

    // Función para mostrar el modal de edición
    const handleEdit = (flota) => {
        setSelectedFlota(flota);
        setShowEditModal(true);
    };

    // Función para manejar cambios en los inputs del modal de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedFlota({ ...selectedFlota, [name]: value });
    };

    // Función para actualizar los datos en Firebase
    const handleUpdate = async () => {
        const docRef = doc(db, 'flotas', selectedFlota.id);
        await updateDoc(docRef, selectedFlota);
        alert('Datos actualizados correctamente.');
        fetchFlotas();
        setShowEditModal(false);
    };

    // Función para mostrar el modal de confirmación de eliminación
    const handleDeleteClick = (flota) => {
        setSelectedFlota(flota);
        setShowDeleteModal(true);
    };

    // Función para confirmar la eliminación del registro
    const handleDeleteConfirm = async () => {
        const docRef = doc(db, 'flotas', selectedFlota.id);
        await deleteDoc(docRef);
        alert('Registro eliminado correctamente.');
        fetchFlotas();
        setShowDeleteModal(false);
        setSelectedFlota(null);
    };

    // Función para cancelar la eliminación
    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedFlota(null);
    };

    // Función para imprimir en formato Excel
    const handlePrint = () => {
        const worksheet = XLSX.utils.json_to_sheet(flotas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Flotas");
        XLSX.writeFile(workbook, "ListadoFlotas.xlsx");
    };

    useEffect(() => {
        fetchFlotas();
    }, []);

    return (
        <div>
            <h2>Lista de Flotas</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo de Vehículo</th>
                        <th>Placa</th>
                        <th>Modelo</th>
                        <th>Color</th>
                        <th>Kilometraje</th>
                        <th>Estado</th>
                        <th>Capacidad</th>
                        <th>Año de Fabricación</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {flotas.map((flota) => (
                        <tr key={flota.id}>
                            <td>{flota.id}</td>
                            <td>{flota.tipoVehiculo}</td>
                            <td>{flota.placa}</td>
                            <td>{flota.modelo}</td>
                            <td>{flota.color}</td>
                            <td>{flota.kilometraje}</td>
                            <td>{flota.estado}</td>
                            <td>{flota.capacidad}</td>
                            <td>{flota.añoFabricacion}</td>
                            <td>
                                <button onClick={() => handleEdit(flota)}>Editar</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(flota)}>Eliminar</button>
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
                        <h3>Editar Flota</h3>
                        <div className="form-group">
                            <label>Tipo de Vehículo</label>
                            <input type="text" name="tipoVehiculo" value={selectedFlota.tipoVehiculo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Placa</label>
                            <input type="text" name="placa" value={selectedFlota.placa} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Modelo</label>
                            <input type="text" name="modelo" value={selectedFlota.modelo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <input type="text" name="color" value={selectedFlota.color} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Kilometraje</label>
                            <input type="number" name="kilometraje" value={selectedFlota.kilometraje} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" name="estado" value={selectedFlota.estado} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Capacidad</label>
                            <input type="number" name="capacidad" value={selectedFlota.capacidad} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Año de Fabricación</label>
                            <input type="number" name="añoFabricacion" value={selectedFlota.añoFabricacion} onChange={handleChange} />
                        </div>
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
                        <p>Esta acción no se puede deshacer.</p>
                        <button onClick={handleDeleteCancel}>Cancelar</button>
                        <button onClick={handleDeleteConfirm}>Aceptar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaFlotas;
