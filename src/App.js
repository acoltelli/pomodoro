import React from "react";
import { Component } from "react";
import './App.css';


class Timer_ extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            secondsElapsed: 1, //1500 seconds = 25 min
            timerDone: false,

            breakFlag: false,
            breakTime:  5,

            timerTitle: "fill"

          };
        }
        increaseTimer(){
          this.setState({secondsElapsed: this.state.secondsElapsed + 60})
        }

        decreaseTimer(){
          if (this.state.secondsElapsed > 0)  {
            this.setState({secondsElapsed: this.state.secondsElapsed - 60})
          }

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
          var count = this.state.secondsElapsed;
          this.countdown = setInterval(dec, 1000); //decrements secondsElapsed by one every 1000ms.
          function dec(){
            if (count > 0){
            _this.setState({ secondsElapsed: _this.state.secondsElapsed - 1 });
            count -= 1;
          }
          //once timer is done, clear timer
          if (count == 0){
          clearInterval(this.countdown);
        }}
        }


        resetTime() {
          this.reset = this.setState({
            secondsElapsed: (this.state.secondsElapsed = 1500)
          });
          clearInterval(this.countdown);
        }

        pauseTime() {
          clearInterval(this.countdown);
        }

        render() {
          return (

            <div className="App">
            <h1> {this.state.timerTitle} </h1>
              <h1>
                {this.getHours()}:{this.getMinutes()}:{this.getSeconds()}
              </h1>
              <button onClick={() => this.startTime()}>Start</button>
              <button onClick={() => this.pauseTime()}>Pause</button>
              <button onClick={() => this.resetTime()}>Reset</button>

              <button onClick={() => this.increaseTimer()}>+</button>
              <button onClick={() => this.decreaseTimer()}>-</button>
            </div>
          );
        }
      }



class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer_ />
      </div>
    );
  }
};
export default App;
