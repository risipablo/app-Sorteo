import { useState } from "react"
import "./sorteo.css"
import { Reloj } from "../reloj/reloj"
import { Participantes } from "../participantes/participantes"
import { ThreeDots } from 'react-loader-spinner'; 


export function Sorteo(){

    const [ganador1,setGanador1] = useState('')
    const [ganador2,setGanador2] = useState('')
    const [ganador3,setGanador3] = useState('')

    const [sorteoRealizado,setSorteoRealizado] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [participantes,setParticipantes] = useState([])


    const generarGanador = () => {
        setSpinner(true); 
        setTimeout(() => {
            const ganador = [];
            while (ganador.length < 3) {
                const ganadorIndex = Math.floor(Math.random() * participantes.length);
                if (!ganador.includes(ganadorIndex)) {
                    ganador.push(ganadorIndex);
                }
            }
             setGanador1(participantes[ganador[0]].nombre)
             setGanador2(participantes[ganador[1]].nombre)
             setGanador3(participantes[ganador[2]].nombre)
 
                setSorteoRealizado(false);
                setSpinner(false);
        }, 3000)
    }


    return(
        <div className="container-sorteo">
            {/* <h1> Sorteo </h1> */}

            <Participantes participantesChange={setParticipantes}/>

            <div className="reloj-container">
                <p> Se revelaran los ganadores en : </p>
                <Reloj/>
            </div>

            <button className="sortear" onClick={generarGanador}> <p>Sortear </p> </button>

            {spinner && 
                <div style={{ display: 'flex', justifyContent: 'center', alignIjtetems: 'center', height: '100px' }}>
                <ThreeDots
                    visible={true}
                    height="100"
                    width="100"
                    color="purple"
                    radius="9"
                    ariaLabel="three-dots-loading"
                />
            </div>}
            <div className="ganadores" >
                        < > {
                        ganador1 && ganador2 && ganador3 && (
                            <>
                                <h2> Felicidades Ganadores</h2>
                                <p className="ganador1"> Primer puesto: {ganador1}.  </p> 
                                <p className="ganador2"> Segundo puesto: {ganador2}. </p> 
                                <p  className="ganador3"> Tercer puesto:  {ganador3}.</p>
                            </>
                            )
                        }
                        </>
                    </div>

        </div>
    )
}


           // setGanador1(ganador1);
            // setGanador2(ganador2);
            // setGanador3(ganador3);