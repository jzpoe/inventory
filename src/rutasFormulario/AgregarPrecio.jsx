
import axios from "../routeGlobal/axios";


const AgregarPrecio = async (formData) => {
  
    try {
        
        const response = await axios.post("/addprecio", formData)

        console.log("Objeto guardado con éxito:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al guardar el objeto:", error);
    }
  
}

export default AgregarPrecio