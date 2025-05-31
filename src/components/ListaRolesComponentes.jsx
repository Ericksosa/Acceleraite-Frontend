import React, {useEffect, useState} from "react";
import { listaRoles } from "../services/RoLServices";

const ListaRolesComponentes = () => {
    const [roles, setRoles] = useState([]);
    
    useEffect(() => {
        listaRoles()
            .then(data => {
                setRoles(data);
            })
            .catch(error => console.error("Error al obtener roles:", error));
    }, []);

    return (
        <div>
            <h2>Lista de Roles</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length > 0 ? (
                        roles.map((rol) => (
                            <tr key={rol.id}>
                                <td>{rol.id}</td>
                                <td>{rol.nombre}</td>
                                <td>{rol.descripcion}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay roles disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListaRolesComponentes;
