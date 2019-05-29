import React from "react";
import { Component } from "react";
// import './App.css';

class TimerLengthControl extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "length-control" },
      React.createElement("div", { id: this.props.titleID },
      this.props.title),

      React.createElement("button", { id: this.props.minID,
        className: "btn-level", value: "-",
        onClick: this.props.onClick },"-"),

      React.createElement("div", { id: this.props.lengthID, className: "btn-level" },
      this.props.length),

      React.createElement("button", { id: this.props.addID,
        className: "btn-level", value: "+",
        onClick: this.props.onClick },"+"))
      );
  }};
;




class Timer_ extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            secondsElapsed: 1500 //1500 seconds = 25 min
          };
        }

        getHours() {
          return ("0" + Math.floor(this.state.secondsElapsed / 3600)).slice(-2);
        }

        getMinutes() {
          return ("0" + Math.floor((this.state.secondsElapsed % 3600) / 60)).slice(-2);
        }

        getSeconds() {
          return ("0" + (this.state.secondsElapsed % 60)).slice(-2);
        }

        startTime() {
          var _this = this;
          this.countdown = setInterval(function() {
            _this.setState({ secondsElapsed: _this.state.secondsElapsed - 1 });

          }, 1000);
        }

        resetTime() {
          this.reset = this.setState({
            secondsElapsed: (this.state.secondsElapsed = 0)
          });
        }

        pauseTime() {
          clearInterval(this.countdown);
        }

        render() {
          return (
            <div className="App">
              <h1>
                {this.getHours()}:{this.getMinutes()}:{this.getSeconds()}
              </h1>
              <button onClick={() => this.startTime()}>Start</button>
              <button onClick={() => this.pauseTime()}>Pause</button>
              <button onClick={() => this.resetTime()}>Reset</button>
            </div>
          );
        }
      }



class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-title">Timers Demo</div>
        <div className="Timers">
        <TimerLengthControl/>
        <Timer_ />
        </div>
      </div>
    );
  }
};
export default App;
