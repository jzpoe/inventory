import axios from "../routeGlobal/axios";



const inventarioGet = async () => {

 
  
  try {
    

    const response = await axios.get("/obtener")
    console.log(response)
    return  response.data
    
  } catch (error) {
    console.error("Error al obtener el objeto:", error);
  }
}

export default inventarioGet
