
import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
console.log("wwwentre ")

class Medicines extends Component {
    
    constructor(props) {
        console.log("wwwentre ")
        super(props);
        this.state = { creatorId:'', nameMedicine: '', startDate: '', finishDate: '', doses: ''};
        this.service = new AuthService();
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault();
        const creatorId     = this.state.creatorId;
        const nameMedicine  = this.state.nameMedicine;
        const startDate     = this.state.startDate;
        const finishDate    = this.state.finishDate;
        const doses         = this.state.doses;
        
        console.log("SSSS",this.state)
    
        //aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
        this.service.signup(creatorId, nameMedicine, startDate, finishDate, doses)
          .then(response => {
            this.setState({
                creatorId       : '',
                nameMedicine    : '',
                startDate       : '',
                finishDate      : '',
                doses           : '', 
            });
            
          })
          .catch(error => {console.log("FDFD",this.state)
            this.setState({
                creatorId       : creatorId,
                nameMedicine    : nameMedicine,
                startDate       : startDate,
                finishDate      : finishDate,
                doses           : doses,
                error           : true
              //messageError: error
            });
          })
      }
    
      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }
    
      render() {
        return (
          <div>
            
            <h4>Para ingresar la toma de un nuevo medicamento complete el siguiente formulario</h4>
            <form id="form" onSubmit={this.handleFormSubmit}>
              
              <fieldset>
                <label>Medicina:</label>
                <input type="text" name="nameMedicine" required value={this.state.nameMedicine} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Fecha de inicio de toma:</label>
                <input type="date" name="startDate" required value={this.state.startDate} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Fecha de fin de toma:</label>
                <input type="date" name="finishDate" required value={this.state.finishDate} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Fecha de Nacimiento:</label>
                <input type="date" name="dateBirth" required value={this.state.dateBirth} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Dosis:</label>
                <input type="number" name="doses" required value={this.state.weight} onChange={e => this.handleChange(e)} />
              </fieldset>
                  
              <button type="submit">Registrarse</button>
            </form>
    
            <h1>{this.state.error ? 'Error' : ''}</h1>
            <h1>{console.log("RRR",this.state)}</h1>
          </div>
        )
      }
}

export default Medicines;