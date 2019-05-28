import React from 'react';
import './App.css';

class TimerLengthControl extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "length-control" },
      React.createElement("div", { id: this.props.titleID },
      this.props.title),

      React.createElement("button", { id: this.props.minID,
        className: "btn-level", value: "-",
        onClick: this.props.onClick },
      React.createElement("i", { className: "fa fa-arrow-down fa-2x" })),

      React.createElement("div", { id: this.props.lengthID, className: "btn-level" },
      this.props.length),

      React.createElement("button", { id: this.props.addID,
        className: "btn-level", value: "+",
        onClick: this.props.onClick },
      React.createElement("i", { className: "fa fa-arrow-up fa-2x" }))));



  }}
;


function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
