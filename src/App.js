import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  async login() {
    if (!this.state.email || !this.state.password) return alert(`Wrong`);
    let res = await axios.post(`/auth/login`, {
      email: this.state.email,
      password: this.state.password
    });
    console.log(res);
  }

  async signup() {
    if (!this.state.email || !this.state.password) return alert(`Wrong`);
    let res = await axios.post("/auth/signup", {
      email: this.state.email,
      password: this.state.password
    });
    console.log(res);
  }
  async logout() {
    let res = await axios.get("/auth/logout");
    console.log(res);
    // this.props.history.push("/")
  }

  render() {
    return (
      <div className="App">
        <h2>Auth App</h2>
        <p>
          Email: <input onChange={e => this.updateEmail(e)} type="email" />
        </p>
        <p>
          Password:{" "}
          <input onChange={e => this.updatePassword(e)} type="password" />
        </p>
        <button onClick={() => this.login()}>Login</button>
        <button onClick={() => this.signup()}>Signup</button>
        <br />
        <button onClick={() => this.logout()}>Logout</button>
      </div>
    );
  }
}

export default App;
