
import { useEffect, useState } from "react"
import "./reloj.css"

export function Reloj(){

    const[dia,setDia] = useState(0)
    const [hora,setHora] = useState(0);
    const [min,setMin] = useState(0);
    const [seg,setSeg] = useState(0);
    const [periodo,setPeriodo] = useState("AM");

    useEffect(() => {
        const intervalo = setInterval(() => {
            const hoy = new Date();
            const limite = new Date('')

            const diaRestante = (limite.getDate() - hoy.getDate())
            const horaRestante = (limite.getHours() + 24 - hoy.getHours() % 24)
            const minRestante = (limite.getMinutes() + 59 - hoy.getMinutes()) % 60;
            const segRestante = ((limite.getSeconds() + 0 - hoy.getSeconds())) 

            setDia(diaRestante);
            setHora(horaRestante);
            setMin(minRestante >=0 ? minRestante : 59);
            setSeg(segRestante >=0 ? segRestante : 60 + segRestante);
            setPeriodo(hoy.getHours() >=12 ? 'PM' : 'AM')
        })
        return () => clearInterval(intervalo)
    },[])

    return (
        <div className="reloj">


            <span className="variable">{hora}
            <span className="descripcion">Horas</span>
            </span>
            
            <span className="separador"> : </span>

            <span className="variable">{min}
            <span className="descripcion">Minutos</span>
            </span>

            <span className="separador"> : </span>
            
            <span className="variable">{seg} 
            <span className="descripcion">Segundos</span>
            </span>
            
            

            <span style={{display:"none"}}> {periodo} </span>
        </div>
    )
}
