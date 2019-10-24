import React, { Component } from "react";
import axios from "axios";
import Select from 'react-select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
          account: [],
          trades: []
        };
      }
    

  onLogoutClick = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.history.push('/')
  };

  onAddClick = e => {
    e.preventDefault();
    //localStorage.removeItem('token');
    this.props.history.push('/inside')
  };

  componentDidMount = e => {
      const token = localStorage.getItem('token')
      let accounts = [];
      axios
      .post("https://fierce-dawn-85986.herokuapp.com/account/list-account", {'token': token})
      .then(res => {

          for(const i in res.data.data) {
              accounts.push({label: res.data.data[i].id, value: i})
          }

          this.setState({ account: accounts });
          console.log(this.state.account)

        })
      .catch(err => {
        localStorage.removeItem("token");
        this.props.history.push('/login');
      })
  }

      onDropdownChange = async e => {
      var accountId = e.label;
      let trade = []
      //console.log(accountId)

      const token = localStorage.getItem('token')
      console.log(token)
      await axios 
      .post("https://fierce-dawn-85986.herokuapp.com/trades/report-trades", {"accountId":accountId, "token":token})
      .then(res =>  {
        console.log(res)
       })
      .catch(err => {
        console.log(err)
       })

      axios
      .post("https://fierce-dawn-85986.herokuapp.com/trades/list-trades", {"accountId":accountId, "token":token})
       .then(res => {
        for(const i in res.data.data) {
          trade.push(res.data.data[i])
          }

        this.setState({ trades: trade });
        console.log(this.state.trades)
       })

       .catch(err =>{
        console.log(err)
       })

      //this.state.trades = trades;
  }

    render() {
        
    return (

        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align">
            <Select options={ this.state.account}
                    onChange = {this.onDropdownChange}/>
            
                <h4>
                <p className="flow-text grey-text text-darken-1">
                    Você está logado na plataforma de {" "}
                    <span style={{ fontFamily: "monospace" }}>APIs</span> 👏
                </p>
                </h4>
                <button
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Logout
                </button>
                <button
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={this.onAddClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                Adicionar Exchanges
                </button>
                <div className=".submissionfield">
                <TextareaAutosize aria-label="eefkmvlkefnvlefnvlfnv" value = {JSON.stringify(this.state.trades)} style={{
                    width: "900px",
                    lenght: "10px",
                    fontSize: "15",
                    borderRadius: "10px",
                    letterSpacing: "1.5px",
                    marginTop: "5rem"
                }}
                />
                </div>
                
            </div>
            </div>
        </div>

        
        );
    }
}

export default Dashboard;