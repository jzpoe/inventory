

import './Register.css'
import  axios from '../routeGlobal/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', {
        nombre,
        email,
        password,
      });

      if (response.data.message === 'Usuario registrado exitosamente') {
        
        console.log('Registro exitoso');
        navigate("/Login", {
          replace: true,
          state: {
            logged: true,
          }
          })
      } else {
        // Muestra un mensaje de error
        console.log('Error en el registro');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
      <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={`bn5 custom-button`} type="submit"  >Registrarse</button>
      </form>
    </div>
  );
};

export default Register;