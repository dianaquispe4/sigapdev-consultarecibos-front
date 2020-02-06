import React from 'react'
import '../App.css';
class TableImporteFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deuda: this.props.total-1000
        }
        
    }


    

  render() {
    return(
    <thead>
			
    
      
      <tr>      
        
        <th className="thVacio"></th>
        <th className="thVacio"></th>
        <th className="thVacio"></th>
        <th className="th">TOTAL</th>
        <th className="inputImporte">S/. {this.props.total}</th>
        <th className="thVacio"></th>
        
      </tr>
      <tr>      
        
        <th className="thVacio"></th>
        <th className="thVacio"></th>
        <th className="thVacio"></th>
        <th className="th">DEUDA ACTUAL</th>
        <th className="inputDeuda">S/. {this.props.costo-this.props.total}</th>
        <th className="thVacio"></th>
        
      </tr>
	</thead>
    )
  }
}

export default TableImporteFooter