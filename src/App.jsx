

import './App.css'
import Formulario from './formulario/Formulario'
import Register from './register/Register';
import Home from './home/Home';
import Login from './login/Login';
import Rutas from './navbar/Rutas'
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import {ProtectedRoutes} from './protectRutas/ProtectedRoutes';
import Ticket from './ticket/Ticket';
import Error404 from './errores/Error404';
import Calculador from './home/Calculador';


function App() {
  
  
  return (

    <Calculador>
    <BrowserRouter>
    
    <Rutas/>
    <div>
      <Routes>
      <Route path='/' element={<Login />} /> 
      <Route path='/Register' element={<Register />} /> 
      

      
      <Route element ={<ProtectedRoutes/>}> 
      <Route path='/Formulario' element={<Formulario/>}/>
      <Route path='/Home' element={<Home />} /> 
      <Route path='/Ticket' element={<Ticket />} />

      </Route>
      <Route path="*" element={<Error404 />} />
      </Routes>
        
      
    </div>
    
    </BrowserRouter>
    
    </Calculador>  
    
  )
      
}

export default App
