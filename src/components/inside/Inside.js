import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      ApiKey: "",
      ApiSecret: "",
      errors: {}
    };
  }
  
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();
const newUser = {
      exchange: this.state.name,
      apiKey: this.state.ApiKey,
      apiSecret: this.state.ApiSecret,
      token: localStorage.getItem('token')
    };
    axios
    .post("https://fierce-dawn-85986.herokuapp.com/account/create-account", newUser)
    .then(res => this.props.history.push("/dashboard"))

    }

render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Registre sua exchange</b> abaixo
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Exchange</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.ApiKey}
                  error={errors.ApiKey}
                  id="ApiKey"
                  type="text"
                />
                <label htmlFor="ApiKey">ApiKey</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.ApiSecret}
                  error={errors.ApiSecret}
                  id="ApiSecret"
                  type="password"
                />
                <label htmlFor="ApiSecret">ApiSecret</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;