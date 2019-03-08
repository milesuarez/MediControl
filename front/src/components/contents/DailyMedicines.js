import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
import '../../style/Medicines.css';
import check from './check.png';


class DailyMedicines extends Component {

  
  constructor(props) {

    super(props);
    this.state = {
      data: null
      
    }

    
    this.service = new AuthService();
    const today = new Date();
    console.log("sigo buscando",this.props.userData)
    this.service.daily(this.props.userData)
      .then(response => {
       
        this.setState({
          ...this.state,
          data: response
        }, () => {
          
        })
      })

  }



  render() {

    

    function ShowDate() {
      let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      let today = new Date();
    
      return (today.getDate() + " de " + meses[today.getMonth()] + " de " + today.getFullYear()) + " son:";
    }


    if (this.state.data) {
      console.log("QQQ",this.state.data)
      return (
        <div>
          <h5>Tus medicinas del {ShowDate()}</h5>
          <table>
            <tbody>
              <tr>
                <th>HORA</th><th>MEDICINA</th><th>DOSIS</th><th>MARCAR</th>
              </tr>
              {this.state.data.map((element, index) => {
                return (
                  
                  < tr key={index} >
                    <td> { element.dosesTime }</td>
                    <td> { element.nameMedicine }</td>
                    <td> { element.doses } { element.unit }</td>
                    <td><img className="images" src={check} alt='Tomada' /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
      }
    else { return (<h1>Loading ...</h1>) }
  }
}
      
export default DailyMedicines;