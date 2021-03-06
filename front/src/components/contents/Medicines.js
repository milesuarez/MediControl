
import React, { Component } from 'react';
import AuthService from '../auth/AuthService';
import { Redirect } from 'react-router-dom'
import App from '../../App';

class Medicines extends Component {

  constructor(props) {

    super(props);
    this.state = { nameMedicine: '', startDate: '', finishDate: '', dosesTime: '', doses: '', unit: 'mg', redirected:false };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const nameMedicine = this.state.nameMedicine;
    const startDate = new Date(this.state.startDate);
    const finishDate = this.state.finishDate;
    const dosesTime = this.state.dosesTime;
    const doses = this.state.doses;
    const unit = this.state.unit;

    //aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
   
    this.service.medicinesAdd(nameMedicine, startDate, finishDate, dosesTime, doses, unit)
      .then(response => {
        this.setState({
          redirected : true,
          nameMedicine: '',
          startDate: '',
          finishDate: '',
          dosesTime: '',
          doses: '',
          unit: '',
          
          user: this.props.userData
        });
        this.props.getUser(response.user)
        console.log("quien soy ",this.state.user);
      })
      .catch(error => {
        console.log("FDFD", error)
        this.setState({

          nameMedicine: nameMedicine,
          startDate: startDate,
          finishDate: finishDate,
          dosesTime: dosesTime,
          doses: doses,
          unit: unit,
          
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() { if (!this.state.redirected) {
    return (
      <div>

        <h4>Ingrese un nuevo medicamento</h4>
        <form id="form" onSubmit={this.handleFormSubmit}>

          <fieldset>
            <label>Medicina:</label>
            <input type="text" name="nameMedicine" required value={this.state.nameMedicine} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Fecha de inicio de toma:</label>
            <input type="date" name="startDate" min={new Date()} required value={this.state.startDate} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Fecha de fin de toma:</label>
            <input type="date" name="finishDate" required value={this.state.finishDate} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Hora de la toma:</label>
            <input type="time" name="dosesTime" required value={this.state.dosesTime} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Dosis:</label>
            <input type="number" name="doses" required value={this.state.doses} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Unidades (mg / ml):</label>
<br></br>
            <select name="unit" value={this.state.value} onChange={e => this.handleChange(e)}>
            <option value=""></option>
              <option value="mg">mg</option>
              <option value="ml">ml</option>
            </select>
          </fieldset>

          <button type="submit">Ingresar</button>
        </form>

        <h1>{this.state.error ? 'ErrorM' : ''}</h1>

      </div>
    )}
    // else return (<Redirect to = {`/medicinesAll/${this.props.userData}`} />)
    else return (<Redirect to = {`/`} />)
  }
}

export default Medicines;