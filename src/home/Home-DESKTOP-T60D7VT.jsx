import "./Home.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import inventarioGet from "../rutasFormulario/inventarioGet";
import Delete from "./Delete";
import { useCalculadora } from "./Calculador";
import AgregarPrecio from "../rutasFormulario/agregarPrecio";
import Buscador from "../rutasFormulario/Buscador";

const Home = () => {
  const [datosGet, setDatosGet] = useState([]);
  const [selectEmpresa, setSelectEmpresa] = useState("");
  const [selectItem, setSelectItem] = useState([]);
  const [selectItem2, setSelectItem2] = useState([]);
  const [showCalculator, setShowCalculator] = useState(false);
    const [serial, setSerial] = useState("");

  const {
    valorInicial,
    valorFinal,
    valorSeleccionado,
    valorTotal,
    setValorInicial,
    setValorFinal,
    setValorSelecionado,
  } = useCalculadora();

  const generatePDF = (rowData) => {
    const doc = new jsPDF();
    doc.text("INVENTARIO", 10, 10); // Título
    const headers = [
      "ID",
      "Cliente",
      "Serial",
      "Activo Fijo",
      "ACTIVO FIJO CARGADOR",
      "Tipo",
      "Valor",
      "Detalle",
    ];
    const data = [
      [
        rowData._id,
        rowData.cliente,
        rowData.serial,
        rowData.activoF,
        rowData.activoFC,
        rowData.tipo,
        rowData.valor,
        rowData.detalle,
      ],
    ];
    doc.autoTable({
      head: [headers],
      body: data,
    });
    doc.save("inventario.pdf");
  };

  const navigate = useNavigate();

  const onLogate = () => {
    navigate("/", {
      replace: true,
    });
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await inventarioGet();
        setDatosGet(datos);
        console.log(datos);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };
    fetchData();
  }, []);

  const selectEmpresaSAS = (event) => {
    setSelectEmpresa(event.target.value);
  };

  const handleCheckboxChange = (event, datos) => {
    const itemID = datos._id;
    if (event.target.checked) {
      setSelectItem([...selectItem, itemID]);

      setSerial(datos.SERIAL);
    } else {
      const updateSelectItem = selectItem.filter((id) => id !== itemID);
      setSelectItem(updateSelectItem);
    }
  };

  const handleCheckboxCalcular = (event, datos) => {
    const itemID = datos._id;
    if (event.target.checked) {
      setSelectItem2([...selectItem2, itemID]);
      setShowCalculator(true);
      //setShowfechaInicial(true);
    } else {
      const updateSelectItem2 = selectItem2.filter((id) => id !== itemID);
      setSelectItem2(updateSelectItem2);
      setShowCalculator(false);
      //setShowfechaInicial(false);
    }
  };
  
  const agregarPrecioServidor = async (fechaInicial, fechaFinal, serial ) => {
    try {
      await AgregarPrecio({
        fechaInicial,
        fechaFinal,
        valorTotal,
        serial
      });
      console.log(agregarPrecioServidor)
    } catch (error) {
      console.log("error al guardar los datos de valor", error);
    }
  };

  return (
    <>
      <button className="buttomSalir" onClick={onLogate}>
        salir
      </button>
      <h1>INVENTARIO</h1>
      <label>
        SELECCIONA LA EMPRESA
        <select
          name="selectEmpresa"
          value={selectEmpresa}
          onChange={selectEmpresaSAS}
        >
          <option value="">Selecciona una empresa</option>
          <option value="GreenSQA">GREENSQA</option>
          <option value="OMEGA">OMEGA</option>
          <option value="QPRO">QPRO</option>
        </select>
      </label>
      
      <table className="responsive-table">
        <thead>
          <tr>
            <th></th>
            <th>Cliente</th>
            <th>Serial</th>
            <th>Activo Fijo</th>
            <th>ACTIVO FIJO CARGADOR</th>
            <th>Tipo</th>
            <th>Detalle</th>
            <th>Fecha Inicial</th>
          </tr>
        </thead>
        <tbody>
        <Buscador/>
          {datosGet
         
            .filter((dato) => {
              const empresaMinuscula = selectEmpresa.toLowerCase();
              const clienteMinuscula = dato.CLIENTE.toLowerCase();
              return empresaMinuscula === clienteMinuscula;
            })
            
            .map((datos) => (
              
              <tr key={datos._id}>
                
                <td>
                
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, datos)}
                    checked={selectItem.includes(datos._id)}
                  />
                  
                </td>
                
                <td>{datos.CLIENTE}</td>
                <td>{datos.SERIAL}</td>
                <td>{datos.ACTIVOFIJO}</td>
                <td>{datos.ACTIVOFIJOCARGADOR}</td>
                <td>{datos.TIPO}</td>
                {/* <td>{parseInt(datos.valor)}</td> */}
                <td>{datos.DETALLE}</td>
                <td>{datos.valorInicial} </td>
                <button
                  className="generatePDF"
                  onClick={() => generatePDF(datos)}
                >
                  🖨️
                </button>
                <button
                  className="btnBasura"
                  onClick={() => Delete(datos._id, datosGet, setDatosGet)}
                >
                  🗑
                </button>
              </tr>
            ))}
         
        </tbody>
      </table>

      <h2>Elementos seleccionados:</h2>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Serial</th>
            <th>Activo Fijo</th>
            <th>ACTIVO FIJO CARGADOR</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Detalle</th>
            <th>Fecha Inicial</th>
            <th>valorInicial</th>
            <th>ultima factura</th>
            <th>valor Total</th>
            <th>calcular</th>
          </tr>
        </thead>
        <tbody>
          {datosGet
          
            .filter((dato) => selectItem.includes(dato._id))
            
            .map((dato) => (
              <tr key={dato._id}>
                <td>{dato.CLIENTE}</td>
                <td>{dato.SERIAL}</td>
                <td>{dato.ACTIVOFIJO}</td>
                <td>{dato.ACTIVOFIJOCARGADOR}</td>
                <td>{dato.TIPO}</td>
                <td>{parseFloat(dato.VALOR)}</td>
                <td>{dato.DETALLE}</td>
                <td>{dato.valorInicial} </td>
                <td>{dato.fechaInicial}</td>
                <td>{dato.fechaFinal} </td>
                <td>{dato.valorTotal} </td>
                <td>
                  
                  <td>

                    <input
                      type="checkbox"
                      className="calculateCheckbox"
                      onChange={(e) => handleCheckboxCalcular(e, dato)}
                      checked={selectItem2.includes(dato._id)}
                    />

                    {showCalculator && (
                      <div>
                        <div className="date-inputs">
                          <div className="input-group">
                            <label htmlFor="fecha-inicio">
                              Fecha de Inicio:
                            </label>
                            <input
                              type="date"
                              id="fecha-inicio"
                              value={valorInicial}
                              onChange={(e) => setValorInicial(e.target.value)}
                            />
                          </div>
                          <div className="input-group">
                            <label htmlFor="fecha-fin">Fecha de Fin:</label>
                            <input
                              type="date"
                              id="fecha-fin"
                              value={valorFinal}
                              onChange={(e) => setValorFinal(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      {showCalculator && (
                        <label htmlFor="">
                          Precio base
                          <input
                            type="text"
                            placeholder="ingresa el valor"
                            value={valorSeleccionado}
                            onChange={(e) =>
                              setValorSelecionado(e.target.value)
                            }
                          />
                        </label>
                      )}
                      {showCalculator && (
                        <label htmlFor="">
                          resultado
                          <input type="text" value={valorTotal} />
                          <button
                            className="calculateButton"
                            onClick={() =>
                              
                              agregarPrecioServidor(
                                valorInicial,
                                valorFinal,
                                serial
                                
                              )
                              
                            }
                          >
                            
                            Guardar
                          </button>
                        </label>
                        
                      )}
                    </div>
                    
                  </td>
                  
                </td>
              </tr>
            ))}
            
        </tbody>
        
      </table>
    </>
  );
};

export default Home;
