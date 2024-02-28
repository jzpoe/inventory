

import axios from "axios"


const RutasTicket = async (formData) => {
  
    try {
        const  url = 'http://localhost:3002/api/enviar/correo/'
        const response = await axios.post(url, formData)

        console.log("Objeto guardado con éxito:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al guardar el objeto:", error);
    }
  
}

export default RutasTicket