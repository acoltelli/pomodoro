import React from "react";
import { Component } from "react";
import './App.css';


class Pomodoro extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            pomTime: 63, //1500 seconds = 25 min
            breakTime:  65,
            // timerDone: false,
            breakFlag: false,
            timerTitle: "fill title"
          };
        }

        increasePomTimer(){
          this.setState({pomTime: this.state.pomTime + 60})
        }

        decreasePomTimer(){
          if (this.state.pomTime > 60)  {
            this.setState({pomTime: this.state.pomTime - 60})
          }
          else{
            this.setState({pomTime: 0})
          }
        }

        increaseBreakTimer(){
          this.setState({breakTime: this.state.breakTime + 60})
        }

        decreaseBreakTimer(){
          if (this.state.breakTime > 60)  {
            this.setState({breakTime: this.state.breakTime - 60})
          }
          else{
            this.setState({breakTime: 0})
          }
        }

        getHours(clockType) {
          if (clockType == "pom"){return ("0" + Math.floor(this.state.pomTime / 3600)).slice(-2);}
          else {return ("0" + Math.floor(this.state.pomTime / 3600)).slice(-2);}
        }

        getMinutes(clockType) {
          if (clockType == "pom"){return ("0" + Math.floor((this.state.pomTime % 3600) / 60)).slice(-2);}
          else{return ("0" + Math.floor((this.state.breakTime % 3600) / 60)).slice(-2);}
        }

        getSeconds(clockType) {
          if (clockType == "pom"){return ("0" + (this.state.pomTime % 60)).slice(-2);}
          else {return ("0" + (this.state.breakTime % 60)).slice(-2);}
        }

        startTime(clockType) {
          var _this = this;
          this.countdown = setInterval(dec, 1000); //decrements pomTime by one every 1000ms.
          function dec(){
            if (_this.state.pomTime > 0){
            _this.setState({ pomTime: _this.state.pomTime - 1 });
          }
          //clear timer when count is zero
          if (_this.state.pomTime == 0){
          clearInterval(this.countdown);
        }}
        }

        resetTime() {
          this.reset = this.setState({
            pomTime: (this.state.pomTime = 1500)
          });
          clearInterval(this.countdown);
        }

        pauseTime() {
          clearInterval(this.countdown);
        }

        // TODO:let hold down of button keep increading count
        // TODO:combine increase/decrease timers
        render() {
          return (

            <div className="App">

            <div className = "Inputs">

            <div id = "SessionInput">
            <h2 className="TimerTitle">Session Timer</h2>
            <button onClick={() => this.increasePomTimer()}>+</button>
            <div className="">{this.getHours("pom")}:{this.getMinutes("pom")}:{this.getSeconds("pom")}</div>
            <button onClick={() => this.decreasePomTimer()}>-</button>
            </div>

            <div id = "BreakInput">
            <h2 className="TimerTitle">Break Timer</h2>
            <button onClick={() => this.increaseBreakTimer()}>+</button>
            <div className="">{this.getHours("break")}:{this.getMinutes("break")}:{this.getSeconds("break")}</div>
            <button onClick={() => this.decreaseBreakTimer()}>-</button>
            </div>

            </div>

            <h2 className="TimerTitle"> {this.state.timerTitle} </h2>

            {(this.state.breakTime) ?
            <div className="TimeDisplay">{this.getHours("pom")}:{this.getMinutes("pom")}:{this.getSeconds("pom")}</div>:
            <div className="TimeDisplay">{this.getHours("break")}:{this.getMinutes("break")}:{this.getSeconds("break")}</div>
            }

            <div className="TimerButtons">
              <button onClick={() => this.startTime()}>Start</button>
              <button onClick={() => this.pauseTime()}>Pause</button>
              <button onClick={() => this.resetTime()}>Reset</button>
              </div>

            </div>
          );
        }
      }



class App extends Component {
  render() {
    return (
      <div className="App">
        <Pomodoro/>
      </div>
    );
  }
};
export default App;
