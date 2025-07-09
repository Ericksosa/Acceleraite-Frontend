import React, {useEffect, useState} from "react";
import { ListaEstadoComponent, listaEstados } from "../services/EstadoServices";

const ListaEstadoComponent = () => {
    const [estados, setEstados] = useState([]);
    
    useEffect(() => {
        listaEstados()
            .then(data => {
                setEstados(data);
            })
            .catch(error => console.error("Error al obtener estados:", error));
    }, []);

    return (
        <div>
            <h2>Lista de Estados</h2>
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
