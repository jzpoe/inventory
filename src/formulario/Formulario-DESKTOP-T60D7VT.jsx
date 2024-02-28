import { useState } from "react";
import "./Formulario.css";
import { useForm } from "react-hook-form";
import inventario from "../rutasFormulario/inventario";
import { alerta, alertanoexiste, guardado } from "../sweetalert/SweetAlert"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

alerta();
alertanoexiste();

const Formulario = () => {
  const [cliente, setCliente] = useState("");
  const [serial, setSerial] = useState("");
  const [activoF, setActivoF] = useState("");
  const [activoFC, setActivoFC] = useState("");
  const [tipo, setTipo] = useState("");
  const [detalle, setDetalle] = useState("");
  const [selectEmpresa, setSelectEmpresa] = useState(""); // Cambia esta variable a un estado diferente para evitar errores
  const [infoEmpresa, setInfoEmpresa] = useState({});
  const [valorInicial, setValorInicial] = useState("");

  const handleCliente = (e) => {
    setCliente(e.target.value);
  };

  const handleSerial = (e) => {
    setSerial(e.target.value);
  };

  const handleActivoF = (e) => {
    setActivoF(e.target.value);
  };

  const handleActivoFC = (e) => {
    setActivoFC(e.target.value);
  };

  const handleTipo = (e) => {
    setTipo(e.target.value);
  };

  const handleDetalle = (e) => {
    setDetalle(e.target.value);
  };

  const selectEmpresaSAS = (e) => {
    setSelectEmpresa(e.target.value);
  };

  const infoEmpresaSAS = (e) => {
    setInfoEmpresa(e.target.value);
  };

  const valorInicialEmpresa = (e) => {
    setValorInicial(e.target.value);
  };

  const limpiarCampos = () => {
    setCliente("");
    setSerial("");
    setActivoF("");
    setActivoFC("");
    setTipo("");

    setDetalle("");
    setSelectEmpresa("");
    setInfoEmpresa({});
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // Corrige la firma de esta función para obtener los datos del formulario
    try {
      await inventario({
        cliente: selectEmpresa,
        serial: data.serial,
        activoF: data.fijo,
        activoFC: data.cargador,
        tipo: data.tipo,
        detalle: data.detalle,
        valorInicial,
      });

      guardado();
      limpiarCampos();
    } catch (error) {
      // Maneja los errores aquí
    }
  };

  const navigate = useNavigate();

  const onLogOut = () => {
    Swal.fire({
      title: "Salir",
      text: "¿Seguro que deseas salir?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/", { replace: true });
        localStorage.removeItem("token");
      }
    });
  };

  return (
    <div>
      <button className="buttonSalir" onClick={onLogOut}>
        Salir
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>INVENTARIO</label>
        </div>
        <div className="form-column-1">
          <label>
            SELECCIONA LA EMPRESA
            <select
              name="selectEmpresa"
              value={selectEmpresa}
              onChange={selectEmpresaSAS}
            >
              <option value="">Selecciona una empresa</option>
              <option value="GreenSQA">GreenSQA</option>
              <option value="OMEGA">OMEGA</option>
              <option value="QPRO">QPRO</option>
            </select>
          </label>
        </div>

        {selectEmpresa && (
          <div>
            <div className="form-column-1">
              <label>CLIENTE</label>
              <input
                type="text"
                value={selectEmpresa} // Aquí vinculamos el valor seleccionado a este campo
                readOnly // Esto evita que el usuario modifique manualmente el campo
              />
              {errors.cliente?.type === "required" && (
                <p className="errors.message">El campo es requerido</p>
              )}
            </div>

            <div className="form-column-2">
              <label>SERIAL</label>
              <input
                type="text"
                {...register("serial", {
                  required: true,
                })}
                id="serial"
                onChange={handleSerial}
                value={serial}
              />
              {errors.serial?.type === "required" && (
                <p className="errors.message">El campo es requerido</p>
              )}
            </div>

            <div className="form-column-1">
              <label>ACTIVO FIJO </label>
              <input
                type="text"
                {...register("fijo", {
                  required: true,
                })}
                id="activoF"
                onChange={handleActivoF}
                value={activoF}
              />
              {errors.fijo?.type === "required" && (
                <p className="errors.message">El campo es requerido</p>
              )}
            </div>

            <div className="form-column-2">
              <label>ACTIVO FIJO CARGADOR</label>
              <input
                type="text"
                {...register("cargador", {
                  required: true,
                })}
                id="cargador"
                onChange={handleActivoFC}
                value={activoFC}
              />
              {errors.cargador?.type === "required" && (
                <p className="errors.message">El campo es requerido</p>
              )}
            </div>

            <div className="form-column-1">
              <label>TIPO</label>
              <input
                type="text"
                {...register("tipo", {
                  required: true,
                })}
                id="tipo"
                onChange={handleTipo}
                value={tipo}
              />
              {errors.tipo?.type === "required" && (
                <p className="errors.message">El campo es requerido</p>
              )}
            </div>

            <div className="form-column-2"></div>

            <div className="form-column-1">
              <label>DETALLE</label>
              <input
                type="text"
                {...register("detalle", {
                  required: true,
                })}
                id="detalle"
                onChange={handleDetalle}
                value={detalle}
              />
              {errors.detalle?.type === "required" && (
                <p className="errors.message">El campo es requerido</p>
              )}
            </div>
            <div className="form-column-2">
              <label>fecha Inicial</label>
              <input
                type="date"
                id="fecha-inicio"
                value={valorInicial}
                onChange={valorInicialEmpresa}
              />

              {/* {errors.tipo?.type === "required" && (
                <p className="errors.message">El campo es requerido</p>
              )} */}
            </div>
          </div>
        )}

        <button type="submit" className="bn5">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
