


import axios from "../routeGlobal/axios";


const inventario = async (formData) => {
  
    try {
        
        const response = await axios.post("/add", formData)

        console.log("Objeto guardado con éxito:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al guardar el objeto:", error);
    }
  
}

export default inventario
