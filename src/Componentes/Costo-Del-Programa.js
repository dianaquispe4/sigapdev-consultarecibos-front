import React from 'react'
import '../App.css';
class CostoDelPrograma extends React.Component {

    
  render() {
    return(
      
			<div>
      <h6 align= "center" className="Alumno"><b>Costo Real del Programa:</b></h6>
      
      <table>
      <tr>      
        
        <th className="th">MATRÍCULA UPG</th>
        <th className="th">MATRÍCULA EPG</th>
        <th className="th">DERECHO ENSEÑANZA</th>
        <th className="th">TOTAL</th>
        <th className="th">VALOR POR CRÉDITO</th>
        
      </tr>
      
      <tr>      
        
        <td className="td">{this.props.datosCosto.upg}</td>
        <td className="td">{this.props.datosCosto.epg}</td>
        <td className="td">{this.props.datosCosto.total}</td>
        <td className="td">{this.props.datosCosto._Total}</td>
        <td className="td">{this.props.datosCosto.creditos} x {this.props.datosCosto.costo_credito}</td>
        
      </tr>
      </table>
      
      <h6 align="center" className="Alumno"><b>Costo Final del Programa:</b></h6>
      
      <table>
      <tr>      
        
        <th className="th">MATRÍCULA UPG</th>
        <th className="th">MATRÍCULA EPG</th>
        <th className="th">DERECHO ENSEÑANZA</th>
        <th className="th">TOTAL</th>
        <th className="th">VALOR POR CRÉDITO</th>
        <th className="th">DSCTO. APLICADO</th>
        
      </tr>

      <tr>      
        
        <td className="td">{this.props.datosCosto.d_upg}</td>
        <td className="td">{this.props.datosCosto.d_epg}</td>
        <td className="td">{this.props.datosCosto.d_total}</td>
        <td className="td">{this.props.datosCosto.d_Total}</td>
        <td className="td">{this.props.datosCosto.creditos} x {this.props.datosCosto.costo_credito_d}</td>
        <td className="td">{this.props.datosCosto.tipo}</td>
        
      </tr>
      </table>
      
      <h6 align="center" className="Alumno"><b>Datos del Beneficio:</b></h6>
      
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
      </table>
      </div>
    
    )
  }
}

export default CostoDelPrograma