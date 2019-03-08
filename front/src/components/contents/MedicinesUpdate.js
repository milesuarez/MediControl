
import React, { Component } from 'react';
import AuthService from '../auth/AuthService';

class MedicinesUpdate extends Component {

  constructor(props) {

    super(props);
    this.state = { nameMedicine: '', startDate: '', finishDate: '', dosesTime: '', doses: '', unit: 'mg' };
    this.service = new AuthService();
    console.log("wwwentrerrr ", this.props)
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
          
          nameMedicine: '',
          startDate: '',
          finishDate: '',
          dosesTime: '',
          doses: '',
          unit: '',
        });
        this.props.getUser(response.user)
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
          error: true
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

        <h4>Ingrese un nuevo medicamento</h4>
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
            <label>Hora de la toma:</label>
            <input type="time" name="dosesTime" required value={this.state.dosesTime} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Dosis:</label>
            <input type="number" name="doses" required value={this.state.doses} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Unidades (mg / ml):</label>

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
    )
  }
}

export default MedicinesUpdate;