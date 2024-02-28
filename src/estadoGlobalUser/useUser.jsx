

import { createContext, useContext, useState } from "react"
export const dataContext= createContext();
export const useUser  = ({children}) => {
  const [calcularValor, setcalcularValor] =useState(0)

 
const dataContext= useContext(dataContext)


  return (
    <dataContext.Provider value={setcalcularValor}>
      {children}
    </dataContext.Provider>
  );
   
}

  
    
