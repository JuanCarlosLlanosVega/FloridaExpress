import React, { useEffect, useState } from 'react';
import db from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

const ListaConductores = () => {
    const [conductores, setConductores] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedConductor, setSelectedConductor] = useState(null);

    // Función para obtener los conductores de Firebase
    const fetchConductores = async () => {
        const conductoresCollection = collection(db, 'conductores');
        const conductoresSnapshot = await getDocs(conductoresCollection);
        const conductoresList = conductoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setConductores(conductoresList);
    };

    // Función para mostrar el modal de edición
    const handleEdit = (conductor) => {
        setSelectedConductor(conductor);
        setShowEditModal(true);
    };

    // Función para manejar cambios en los inputs del modal de edición
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedConductor({ ...selectedConductor, [name]: value });
    };

    // Función para actualizar los datos en Firebase
    const handleUpdate = async () => {
        const docRef = doc(db, 'conductores', selectedConductor.id);
        await updateDoc(docRef, selectedConductor);
        alert('Datos actualizados correctamente.');
        fetchConductores();
        setShowEditModal(false);
    };

    // Función para mostrar el modal de confirmación de eliminación
    const handleDeleteClick = (conductor) => {
        setSelectedConductor(conductor);
        setShowDeleteModal(true);
    };

    // Función para confirmar la eliminación del registro
    const handleDeleteConfirm = async () => {
        const docRef = doc(db, 'conductores', selectedConductor.id);
        await deleteDoc(docRef);
        alert('Registro eliminado correctamente.');
        fetchConductores();
        setShowDeleteModal(false);
        setSelectedConductor(null);
    };

    // Función para cancelar la eliminación
    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setSelectedConductor(null);
    };

    // Función para imprimir en formato Excel
    const handlePrint = () => {
        const worksheet = XLSX.utils.json_to_sheet(conductores);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Conductores");
        XLSX.writeFile(workbook, "ListadoConductores.xlsx");
    };

    useEffect(() => {
        fetchConductores();
    }, []);

    return (
        <div>
            <h2>Lista de Conductores</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cédula de Identidad</th>
                        <th>Fecha Nacimiento</th>
                        <th>Género</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>Licencia de Conducir</th>
                        <th>Categoría</th>
                        <th>Fecha Emisión</th>
                        <th>Fecha Expiración</th>
                        <th>Años Experiencia</th>
                        <th>Contacto Emergencia</th>
                        <th>Relación</th>
                        <th>Teléfono Emergencia</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {conductores.map((conductor) => (
                        <tr key={conductor.id}>
                            <td>{conductor.id}</td>
                            <td>{conductor.nombreCompleto}</td>
                            <td>{conductor.numeroIdentidad}</td>
                            <td>{conductor.fechaNacimiento}</td>
                            <td>{conductor.genero}</td>
                            <td>{conductor.direccion}</td>
                            <td>{conductor.telefono}</td>
                            <td>{conductor.correoElectronico}</td>
                            <td>{conductor.licenciaConducir}</td>
                            <td>{conductor.categoriaLicencia}</td>
                            <td>{conductor.fechaEmisionLicencia}</td>
                            <td>{conductor.fechaExpiracionLicencia}</td>
                            <td>{conductor.añosExperiencia}</td>
                            <td>{conductor.contactoEmergencia}</td>
                            <td>{conductor.relacionEmergencia}</td>
                            <td>{conductor.telefonoEmergencia}</td>
                            <td>
                                <button onClick={() => handleEdit(conductor)}>Editar</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteClick(conductor)}>Eliminar</button>
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
                        <h3>Editar Conductor</h3>
                        {Object.keys(selectedConductor).map((key) => (
                            <div className="form-group" key={key}>
                                <label>{key}</label>
                                <input
                                    type="text"
                                    name={key}
                                    value={selectedConductor[key]}
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

export default ListaConductores;
