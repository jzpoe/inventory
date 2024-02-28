import { useState } from 'react';
import axios from 'axios';

const Buscador = () => {
  const [serial, setSerial] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleSerial = () => {
    axios.put('/buscar', { serial })
      .then((response) => {
        setResultado(response.data);
      })
      .catch((err) => {
        console.error(err, 'error al buscar la información');
        setResultado(null)
      });
  };

  return (
    <div>
      <input
        type="text"
        value={serial}
        placeholder="Ingresa serial"
        onChange={(e) => setSerial(e.target.value)}
      />
      <button onClick={handleSerial}>Buscar</button>
      {resultado && (
        <div>
          <p>{resultado.valorTotal}</p>
          <p>{resultado.serial}</p>
          <p>{resultado.activofijo}</p>

        </div>
      )}
    </div>
  );
};

export default Buscador;