import { createContext, useContext, useEffect, useState } from "react"


const calculadorMensual= createContext()

export const useCalculadora =()=>{

    return useContext(calculadorMensual)
}

const Calculador = ({children}) => {
    
    

    const [valorInicial, setValorInicial] = useState("")
    const [valorFinal, setValorFinal] = useState("")
    const [valorSeleccionado, setValorSelecionado] = useState("")
    const [valorTotal, setValorTotal] = useState("")

    
    
    useEffect(() =>{
        const fechaInicialData = new Date(valorInicial);
        const fechafinalData = new Date(valorFinal);

        const diferenciaDias = Math.floor((fechafinalData - fechaInicialData)/(1000 * 60 * 60 * 24)+1)
        
        const costoDiario= parseFloat(valorSeleccionado)
        const costo = ( costoDiario / 30 )
        const constValordia = (costo *diferenciaDias)
        setValorTotal(constValordia)
        
        
        

    },[valorInicial, valorFinal, valorSeleccionado])
 


  return (
    <calculadorMensual.Provider value={{ valorInicial,valorFinal,valorSeleccionado,valorTotal,setValorInicial,setValorFinal,setValorTotal,setValorSelecionado}}>
      {children}
    </calculadorMensual.Provider>
  )
}

export default Calculador
