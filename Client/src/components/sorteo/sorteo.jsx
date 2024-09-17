import { useState, useEffect } from "react";
import "./sorteo.css";
import { Reloj } from "../reloj/reloj";
import { Participantes } from "../participantes/participantes";
import { ThreeDots } from 'react-loader-spinner'; 

export function Sorteo() {

    const [ganador1, setGanador1] = useState('');
    const [ganador2, setGanador2] = useState('');
    const [sorteoRealizado, setSorteoRealizado] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [participantes, setParticipantes] = useState([]);

    const [mostrarTitulo, setMostrarTitulo] = useState(false);
    const [mostrarGanador1, setMostrarGanador1] = useState(false);
    const [mostrarGanador2, setMostrarGanador2] = useState(false);

    const generarGanador = () => {
        setSpinner(true); 
        setMostrarTitulo(false);
        setMostrarGanador1(false);
        setMostrarGanador2(false);
        
        setTimeout(() => {
            const ganador = [];
            while (ganador.length < 2) {
                const ganadorIndex = Math.floor(Math.random() * participantes.length);
                if (!ganador.includes(ganadorIndex)) {
                    ganador.push(ganadorIndex);
                }
            }
            setGanador1(participantes[ganador[0]].nombre);
            setGanador2(participantes[ganador[1]].nombre);
            
            // Mostrar ganadores uno por uno
            setSpinner(false);
            setSorteoRealizado(true);
        }, 3000);
    };

    useEffect(() => {
        if (sorteoRealizado) {
            setTimeout(() => setMostrarTitulo(true), 500);
            setTimeout(() => setMostrarGanador1(true), 2500);
            setTimeout(() => setMostrarGanador2(true), 1500);
        }
    }, [sorteoRealizado]);

    return (
        <div className="container-sorteo">
            <Participantes participantesChange={setParticipantes} />

            <div className="reloj-container">
                <p> Se revelarán los ganadores en: </p>
                <Reloj />
            </div>

            <button className="sortear" onClick={generarGanador}> 
                <p>Sortear </p> 
            </button>

            {spinner && 
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                    <ThreeDots
                        visible={true}
                        height="100"
                        width="100"
                        color="purple"
                        radius="9"
                        ariaLabel="three-dots-loading"
                    />
                </div>
            }

            <div className="ganadores">
                {mostrarTitulo && <h2 className="fade-in">Felicidades Ganadores</h2>}
                {mostrarGanador1 && <p className="ganador1 fade-in">Primer puesto: {ganador1}</p>}
                {mostrarGanador2 && <p className="ganador2 fade-in">Segundo puesto: {ganador2}</p>}
            </div>
        </div>
    );
}

           // setGanador1(ganador1);
            // setGanador2(ganador2);
            // setGanador3(ganador3);