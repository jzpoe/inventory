

import './Login.css'
import axios from "../routeGlobal/axios";
import { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { alerta } from '../sweetalert/Sweetalert';
import { alertanoexiste } from '../sweetalert/Sweetalert';


    const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate(); // Corrección aquí

      
      
    

      const handleLogin = async (e) => {
        
        e.preventDefault();
    
        try {
          const response = await axios.post('/login', {
            email: email,
            password: password,
          });
    
          if (response.data.token) {
            // Maneja la autenticación exitosa (guarda el token, redirección, etc.)
            console.log('Inicio de sesión exitoso');
            const token = response.data.token
            
            localStorage.setItem('token', token);
            console.log(response.data.token)
            navigate("/Formulario", {
              replace: true,
              state: {
                logged: true,
                // usuario: usuario
              }
              })
              
              alerta()
          } else {
            // Muestra un mensaje de error
            console.log('Error en el inicio de sesión');
            navigate("/404")
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          
          alertanoexiste();
          setEmail("")
          setPassword("")
        }
      };

     
      return (
        <div className="form-container">
          <h2 className='logo'>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <div className='form-column-1'  >
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='form-column-2' >
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>
            <button  className="bn5" type="submit">Iniciar Sesión</button>
            

            <Link to="/Register" className="form-registro">
               Registrarse
            </Link>
          </form>
        </div>
      );
    };
    
    export default Login;

  
