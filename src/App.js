import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddExample from "./components/add-example.component";
import Example from "./components/example.component";
import ExamplesList from "./components/examples-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            ReactJS Skeleton
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/examples"} className="nav-link">
                View Examples
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Example
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<ExamplesList/>} />
            <Route exact path="/examples" element={<ExamplesList/>} />
            <Route exact path="/add" element={<AddExample/>} />
            <Route path="/examples/:id" element={<Example/>} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
