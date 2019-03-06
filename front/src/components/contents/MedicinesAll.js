
import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
import agregar from './agregar.png';
import editar from './editar.png';
import { Switch, Route, Link } from 'react-router-dom';
import Medicines from '../contents/Medicines';

class MedicinesAll extends Component {

  constructor(props) {

    super(props);
    this.state = {
      data: null
    }
    this.service = new AuthService();
    console.log("En la segunda", this.props)
    this.service.medicinesAll(this.props.userData)
      .then(response => {
        console.log('Respuesta', response)
        this.setState({
          ...this.state,
          data: response
        }, () => {
          console.log('el nuevo state es', this.state.data)
        })
      })

  }

  render() {
    if (this.state.data) {

      return (
        <div>
          <h5>Plan de Medicinas</h5>
          <Link to={`/medicines/${this.props.userData}`}>
                  {<img width="30px" src={agregar} alt='Agregar' />}

          </Link>
          <Switch>
          </Switch>
          
          <table>
            <tr>
              <th>INICIO</th><th>FIN</th><th>MEDICINA</th><th>HORA</th><th>DOSIS</th><th>MODIFICAR</th>
            </tr>
            <tbody>
              {this.state.data.map((element, index) => {
                return (

                  <tr key={index}>
                    <td>{new Date(element.startDate).getDate()}/{new Date(element.startDate).getMonth()+1}/{new Date(element.startDate).getFullYear()}</td>
                    <td>{new Date(element.finishDate).getDate()}/{new Date(element.finishDate).getMonth()+1}/{new Date(element.finishDate).getFullYear()}</td>
                    
                    <td>{element.dosesTime}</td>
                    <td>{element.nameMedicine}</td>
                    <td>{element.doses}{element.unit}</td>
                    
                    <td><img width="20px" src={editar} alt='Tomada' /></td>
                  </tr>

                )
              })
              }</tbody>
          </table>
        </div>
      )
    }
    else { return (<h1>Loading ...</h1>) }
  }

}

export default MedicinesAll;







