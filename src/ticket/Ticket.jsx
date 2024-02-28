import './Ticket.css'
import { useState } from "react";
import RutasTicket from "./RutasTicket";
import { useNavigate } from 'react-router-dom';

const Ticket = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");

  const navigate = useNavigate();
  const onLogate =()=>{
    navigate('/',{
      replace : true,
    })
      localStorage.removeItem("token");
    }

  const handleUser = (e) => {
    setUser(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInformacion = (e) => {
    setInfo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RutasTicket({
        nombre: user,
        correo: email,
        mensaje: info,
      });
      setUser("");
      setEmail("");
      setInfo("");
    } catch (error) {
      console.error("error al ingresar los datos", error);
    }
  };

  return (
    <>
    
    <button className='buttomSalir' onClick={onLogate}>salir</button>
    <div className="form-container">
      <h2>TICKET</h2>
    <form onSubmit={handleSubmit}>
      
        <label >TICKET</label>
      
      <div className='form-column-1'>
      
        <label>usuario</label>
        
        <input type="text" onChange={handleUser} value={user} id="user" />
      </div>
      <div>
        <label>correo</label>
        <input type="email" onChange={handleEmail} value={email} id="email" />
      </div>
      <div>
        <label>informacion</label>
        <input
          type="text"
          onChange={handleInformacion}
          value={info}
          id="info"
        />
      </div>

      <button className='bn5'>enviar</button>
      
    </form>
    
    </div>
    </>
    
  );
};

export default Ticket;
