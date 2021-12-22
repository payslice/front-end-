import React from "react";
// import Directory from "./routes/Directory"
import "./stylesheets/css/tailwind-output.css";
import "./stylesheets/css/index.css";
import "./stylesheets/sass/index.sass";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Routes from "./routes/Routes";

// import './App.css';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      ></ToastContainer>
      <Routes />
    </Router>
  );
}
export default App;
