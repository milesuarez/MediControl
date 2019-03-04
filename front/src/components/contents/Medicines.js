
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Medicines extends Component {
    constructor(props) {
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
                <label>Usuario:</label>
                <input type="text" name="username" required value={this.state.username} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Clave de acceso:</label>
                <input type="password" name="password" required value={this.state.password} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>e-mail:</label>
                <input type="email" name="email" required value={this.state.email} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Fecha de Nacimiento:</label>
                <input type="date" name="dateBirth" required value={this.state.dateBirth} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Peso:</label>
                <input type="number" name="weight" required value={this.state.weight} onChange={e => this.handleChange(e)} />
              </fieldset>
    
              <fieldset>
                <label>Altura:</label>
                <input type="number" name="height" required value={this.state.height} onChange={ e => this.handleChange(e)}/>
              </fieldset>
    
              <input 
                        type="file" 
                        onChange={(e) => this.handleFileUpload(e)} /> 
              
              <button type="submit">Registrarse</button>
            </form>
    
            <h1>{this.state.error ? 'Error' : ''}</h1>
            <h1>{console.log("RRR",this.state)}</h1>
          </div>
        )
      }
}

export default Medicines;