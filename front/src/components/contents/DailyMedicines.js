import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
console.log("ENTREEEEEEEEEEEE ")

class DailyMedicines extends Component {
    
  constructor(props) {
    super(props);
    console.log("EEEEE",this.props)
    
    this.service = new AuthService();

  }
    render() {
      
      function ShowDate () {
        let meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        let today =new Date();
  
        return (today.getDate() + " de " + meses[today.getMonth()] + " de " + today.getFullYear()) + " son:"; 
      }
      
        return (
          <div>
             {/* <h4>{this.state.loggedInUser.username}, tus medicinas de hoy: {ShowDate()}</h4> */}
             
            <h4>ENTRE A LAS MEDICINAS</h4>
            
          </div>
        )
      }
}

export default DailyMedicines;