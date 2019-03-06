import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
import '../../style/DailyMedicines.css';
import check from './check.png';



class DailyMedicines extends Component {

  constructor(props) {

    super(props);
    this.state = {
      data: null
    }
    this.service = new AuthService();
    this.service.medicinesAll(this.props.userData._id)
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
      const today = new Date(); console.log("WWW",today)
      return (
        <div>
          <h5>Tus medicinas del: {ShowDate()}</h5>
          <table>
            <tbody>
              <tr>
                <th>HORA</th><th>MEDICINA</th><th>DOSIS</th><th>UNIDAD</th><th>MARCAR</th>
              </tr>

              {this.state.data.map((element, index) => {
                return ((element.startDate <= today && element.finishDate >= today)?(
                
                  
                   
                  < tr key = { index } >
                    <td>{element.dosesTime}</td>
                    <td>{element.nameMedicine}</td>
                    <td> {element.doses}</td>
                    <td> {element.unit}</td>
                    <td><img width="30px" src={check} alt='Tomada' /></td>
                  </tr>

                ):undefined)}
      )
              }
            </tbody>
          </table>
        </div>)
    }
    else { return (<h1>Loading ...</h1>) }
  }
}

export default DailyMedicines;