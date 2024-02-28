import Swal from "sweetalert2";





export const alerta = () => {
  Swal.fire({
    title: "Bienvenido",
    timer: "700",
  });
};
export const alertanoexiste = () => {
  Swal.fire({
    title: "Usuario o contraseña invalidos",
    timer: "1000",
  });
};

export const guardado = () => {
    Swal.fire({
      title: "tarea guardada con exito",
      timer: "800",
    });
  };
  

 
 


 
  
  