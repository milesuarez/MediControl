
import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
import agregar from './agregar.png';
import editar from './editar.png';
import { Switch, Link } from 'react-router-dom';
import '../../style/Medicines.css';



class MedicinesAll extends Component {

  constructor(props) {

    super(props);
    this.state = {
      data: null
    }
    this.service = new AuthService();
  }
   
  componentDidMount(){

    this.service.medicinesAll(this.props.userData)
    .then(response => {
      
      this.setState({
        ...this.state,
        data: response
      }, () => {
        
      })
    })
  }


  componentWillReceiveProps(nextProps) {
    this.service.medicinesAll(nextProps.userData)
      .then(response => {
       
        this.setState({
          ...this.state,
          data: response
        }, () => {
          
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
              <th>INICIO</th><th>FIN</th><th>HORA</th><th>MEDICINA</th><th>DOSIS</th><th>EDITAR</th>
            </tr>
            <tbody>
              {this.state.data.map((element, index) => {
                return (

                  <tr key={index}>
                    <td>{(new Date(element.startDate).getDate()>9?new Date(element.startDate).getDate():('0'+new Date(element.startDate).getDate()))}/{new Date(element.startDate).getMonth()+1}/{new Date(element.startDate).getFullYear()}</td>
                    <td>{new Date(element.finishDate).getDate()}/{new Date(element.finishDate).getMonth()+1}/{new Date(element.finishDate).getFullYear()}</td>
                    
                    <td>{element.dosesTime}</td>
                    <td>{element.nameMedicine}</td>
                    <td>{element.doses}{element.unit}</td>
                    
                    <td><img className="images" width="15px" src={editar} alt='Editar' /></td>
                  </tr>

                )
                })
              }
            </tbody>
          </table>
        </div>
      )
    }
    else { return (<h1>Loading ...</h1>) }
  }

}

export default MedicinesAll;







