import React from 'react'

class DeudaTotal extends React.Component {
  
     render() {
      return(
        <div className="col">
          <b className="importe"  text-align= "center">DEUDA TOTAL: S/.{ this.props.deuda}</b>
        </div>
      )
    }   
}
export default DeudaTotal;
