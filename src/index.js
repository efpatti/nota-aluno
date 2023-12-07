import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NavBar from "./components/NavBar";
import InserScore from "./components/InsertScore";
import InsertInfo from "./components/InsertInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <NavBar />
    <InsertInfo />
    <InserScore />
  </React.StrictMode>
);
