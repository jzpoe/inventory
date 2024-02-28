import Login from "../login/Login";
import "./Error.css";

const Error404 = () => {
  return (
    <div className="fondo">
      <div className="contenedor">
        <h1>404</h1>
        <h2>La pagina solicitada no existe</h2>
        <img
          src="/src/errores/img/spidermeme-2.png"
          alt="spiderman apuntandose con el dedo"
        />
        <button onClick={Login}>Login</button>
      </div>
      
    </div>
  );
};

export default Error404;
