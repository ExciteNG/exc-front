import React, { Component } from "react";
import axios from "axios";

export default class Leads extends Component {
  state = {
    data: "",
  };

  getLeads = async () => {
    await axios
      .get("http://127.0.0.1:8000/core_api/leads-list/")
      .then((res) => {
        this.setState({ data: res.data.slice(0,100) });
      });
  };

  componentDidMount() {
    this.getLeads();
  }

  render() {
    const { data } = this.state;
    const a = new Set(data);
    const b = Array.from(a);
    console.log(b);

    return (
      <div className="fitter">
        <div className="leads-grid">
          {b.map((i) => (
            <div className="lead-grid-box">
              <p>Name: {i.BusinessName} </p>
              <p>Email: {i.BusinessAddress} </p>
              <p>Phone:{i.BusinessPhone} </p>
              
              <p>State: {i.BusinessState} </p>
              <p>Country:{i.BusinessCountry} </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
