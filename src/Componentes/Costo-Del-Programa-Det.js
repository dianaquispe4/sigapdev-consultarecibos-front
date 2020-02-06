import React from 'react'
import '../App.css';
class CostoDelProgramaDet extends React.Component {

  render() {
    return(
      
			<div>
      <h6 align= "center" className="Alumno"><b>Costo Detalle del Programa:</b></h6>
      
      <table className="tableScroll">
      <tr>      
        
        <th className="th">N°</th>
        <th className="th">MATRÍCULA</th>
        <th className="th">CONCEPTO</th>
        <th className="th">MONTO</th>
        
      </tr>
      
      {this.props.costoxciclo.map((data)=>
        
        <tr>
            <td className="td">{data.id}</td>
            <td className="td">Ciclo {data.ciclo}</td>
            <td className="td">{data.concepto}</td>
            <td className="td">{data.monto}</td>
        </tr>
      )}
      
      </table>
      
      
      
      {/*<h6 align="center" className="Alumno"><b>Datos del Beneficio:</b></h6>
      
      <table>
      <tr>      
        
        <th className="th">BENEFICIO</th>
        <th className="th">AUTORIZACIÓN</th>
        <th className="th">CONDICIÓN</th>
        <th className="th">FECHA</th>
        <th className="th">RESOLUCIÓN</th>
        
      </tr>

        
      {this.props.datosPrograma.map((data)=>
        <tr>
            <td className="td">{data.benef_otrogado}%</td>
            <td className="td">{data.autorizacion}</td>
            <td className="td">{data.condicion}</td>
            <td className="td">{data.fecha}</td>
            <td className="td">{data.resolucion}</td>
        </tr>
      )}
      </table>*/}
      </div>
    
    )
  }
}

export default CostoDelProgramaDet