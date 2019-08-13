import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import * as contactAction from './Redux/contactAction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class App extends Component {

  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    let id = 0;
    this.state = {
      id: id++,
      name: '',
      email: '',
      startDate: new Date(),
      editing: false
    }
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  handleChangeDate(date) {
    this.setState({
      startDate: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let contact = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      startDate: this.state.startDate,
      editing: this.state.editing
    }
    this.setState({
      id: '',
      name: '',
      email: '',
      startDate: new Date(),
      editing: false
    });
    this.props.createContact(contact);
  }

  deleteContact(e, index) {
    e.preventDefault();
    this.props.deleteContact(index);
  }

  editContact(e, id) {
    e.preventDefault();
    this.props.editContact(id);
  }

  render() {
    return (
      <div className="container">
        <h3>Contact Book</h3>
        <div className="card card-body my-3">
          <Table striped bordered hover>
            <thead>
              <tr className="text-secondary">
                <th>Name</th>
                <th>Email</th>
                <th>Date oF Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            {
              this.props.contacts.map((data, index) => {
                return (
                  <tbody key={index} className="mb-5">
                    <tr>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.startDate.toDateString()}</td>
                      <td>
                        <div className="action">
                          <button type="button" className="btn btn-outline-success" onClick={(e) => this.editContact(e, id)}}>
                            Edit <i className="fa fa-pen" aria-hidden="true"></i>
                          </button>
                          <button type="button" className="btn btn-outline-danger ml-2" onClick={(e) => this.deleteContact(e, index)}>
                            Delete <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            }
          </Table>
        </div>
        <div>
          <form className="card card-body my-3" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label className="text-secondary">Name:</label>
              <input type="text" onChange={this.handleChangeName} value={this.state.name} className="form-control " placeholder="" />
            </div>
            <div className="form-group">
              <label className="text-secondary">Email:</label>
              <input type="text" onChange={this.handleChangeEmail} value={this.state.email} className="form-control " placeholder="" />
            </div>
            <div className="form-group" >
              <label className="text-secondary">Date of Birth :</label><br />
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChangeDate}
              />
            </div>
            <button type="submit" className="btn btn-outline-success mt-2" >Add Address</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index => dispatch(contactAction.deleteContact(index)),
    editContact: id => dispatch(contactAction.editContact(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);