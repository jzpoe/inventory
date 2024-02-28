import Swal from "sweetalert2";
import axios from "../routeGlobal/axios";





const Delete = (_id, datosGet, setDatosGet) => {
  
    Swal.fire({
      title: 'Eliminar',
      text: '¿Seguro que deseas eliminar la tarea?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/eliminar/${_id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                text: 'Tarea eliminada con éxito',
                icon: 'success',
              });
  
              const updatedDatos = datosGet.filter((dato) => dato._id !== _id);
              setDatosGet(updatedDatos);
            } else {
              Swal.fire({
                text: 'Error al eliminar la tarea',
                icon: 'error',
              });
            }
          })
          .catch((error) => {
            console.error('Error al eliminar la tarea:', error);
            Swal.fire({
              text: 'Error al eliminar la tarea',
              icon: 'error',
            });
          });
      }
    });
  };
      
 
  export default Delete