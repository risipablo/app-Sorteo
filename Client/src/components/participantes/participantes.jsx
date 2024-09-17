import axios from "axios";
import { useEffect, useState } from "react";
import "./participantes.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const serverFront = 'http://localhost:3001';
const serverFront = 'https://app-sorteo.onrender.com'

export function Participantes({participantesChange}) {
    const [participante, setParticipante] = useState([]);
    const [nombre, setNombre] = useState('');
    const [selectedId, setSelectedId] = useState(null);  

    useEffect(() => {
        axios.get(`${serverFront}/participantes`)
            .then(response => {
                setParticipante(response.data);
                participantesChange(response.data)
            })
            .catch(err => console.log(err));
    }, [participantesChange]);

    const addParticipante = () => {
        if (nombre.trim() !== "") {
            axios.post(`${serverFront}/add-participantes`, { nombre: nombre })
                .then(response => {
                    const nuevoNombre = response.data;
                    setParticipante(participante => [...participante, nuevoNombre]);
                    participantesChange(participante => [...participante,nuevoNombre])
                    setNombre("");
                })
                .catch(err => console.log(err));
        }
    };

    const deleteParticipante = (id) => {
        axios.delete(`${serverFront}/delete-participantes/${id}`)
            .then(response => {
                const deleteNombres = participante.filter((participant) => participant._id !== id);
                setParticipante(deleteNombres);
                participantesChange(deleteNombres)
            })
            .catch(err => console.log(err));
    };


    const handleShowDelete = (id) => {
        setSelectedId(id === selectedId ? null : id);  
    };

    return (
        <section className="container-participantes">
            <h2> Participantes</h2>

            <div className="boton-agregar">
                <input
                    type="text"
                    placeholder="Agregar participante"
                    onChange={(event) => setNombre(event.target.value)}
                    value={nombre}
                />
                <button className="agregar" onClick={addParticipante}>Agregar</button>

                <div className="list-participantes">
                    {participante.map((element) => (
                        <ul key={element._id}>
                            <li
                                onClick={() => handleShowDelete(element._id)} 
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                {element.nombre} 

                                {selectedId === element._id && ( 
                                    <button
                                        onClick={() => deleteParticipante(element._id)}
                                        style={{
                                            marginLeft: '10px',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {/* Ícono de basura */}
                                        <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                    </button>
                                )}
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
