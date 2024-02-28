import jsPDF from "jspdf";
import "jspdf-autotable";


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
    

export default generatePDF
