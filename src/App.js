import React from "react";
import { Component } from "react";
import './App.css';


class Pomodoro extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            pomTime: 3, //1500 seconds = 25 min
            breakTime: 5,
            pomInput: 1500,
            breakInput: 300,
            breakFlag: false,
            buttonPress: true
          };
        }

        increaseTimer(clockType){
          if (clockType == "pom"){this.setState({pomTime: this.state.pomTime + 60})}
          else if (clockType == "break"){this.setState({breakTime: this.state.breakTime + 60})}
        }

        decreaseTimer(clockType){
          if (clockType == "pom"){
            if (this.state.pomTime > 60)  {
              this.setState({pomTime: this.state.pomTime - 60})}
            else {this.setState({pomTime: 0})}
        }
          else if (clockType == "break"){
            if (this.state.breakTime > 60)  {
              this.setState({breakTime: this.state.breakTime - 60})  }
            else {this.setState({breakTime: 0})}
        }
      }

        getHours(clockType) {
          if (clockType == "pom" || clockType == "pomInput"){return ("0" + Math.floor(this.state.pomTime / 3600)).slice(-2);}
          else if (clockType == "break"){return ("0" + Math.floor(this.state.pomTime / 3600)).slice(-2);}
          else if (clockType == "pomInput"){return ("0" + Math.floor(this.state.pomInput / 3600)).slice(-2);}
          else if (clockType == "breakInput"){return ("0" + Math.floor(this.state.breakInput / 3600)).slice(-2);}
        }

        getMinutes(clockType) {
          if (clockType == "pom"){return ("0" + Math.floor((this.state.pomTime % 3600) / 60)).slice(-2);}
          else if (clockType == "break"){return ("0" + Math.floor((this.state.breakTime % 3600) / 60)).slice(-2);}
          else if (clockType == "pomInput"){return ("0" + Math.floor((this.state.pomInput % 3600) / 60)).slice(-2);}
          else if (clockType == "breakInput"){return ("0" + Math.floor((this.state.breakInput % 3600) / 60)).slice(-2);}
        }

        getSeconds(clockType) {
          if (clockType == "pom"){return ("0" + (this.state.pomTime % 60)).slice(-2);}
          else if (clockType == "break"){return ("0" + (this.state.breakTime % 60)).slice(-2);}
          else if (clockType == "pomInput"){return ("0" + (this.state.pomInput % 60)).slice(-2);}
          else if (clockType == "breakInput"){return ("0" + (this.state.breakInput % 60)).slice(-2);}
        }

        clearCountdown(clockType){
          if (clockType == "pom"){clearInterval(this.countdown);}
          else if (clockType == "break"){clearInterval(this.countdownB);};
        }

        helper(clockType){
          if (clockType == "pom"){this.startBreakTime();}
          else if (clockType == "break"){this.startTime()};
       }

        startTime() {
          var _this = this;
          this.countdown = setInterval(dec, 1000); //decrements pomTime by one every 1000ms.

          function dec(){
            if (_this.state.pomTime > 0){
            _this.setState({

              pomTime: _this.state.pomTime - 1 });
          }
          //clear timer when count is zero
          if (_this.state.pomTime == 0){
            _this.setState({
              pomTime: _this.state.pomInput,
              breakFlag: true})
          _this.clearCountdown("pom");
          _this.helper("pom");  }

        }}

       //TODO:refactor
        startBreakTime() {
          var _this = this;
          this.countdownB = setInterval(dec, 1000); //decrements breakTime by one every 1000ms.
          function dec(){
            if (_this.state.breakTime > 0){
            _this.setState({ breakTime: _this.state.breakTime - 1 });
          }
          //clear timer when count is zero
          if (_this.state.breakTime == 0){
            _this.setState({
              breakTime: _this.state.breakInput,
              breakFlag: false})
            _this.clearCountdown("break");
            _this.helper("break");
        }}
        }

        resetTime(clockType) {
          this.reset = this.setState({
            pomTime: (this.state.pomTime = 1500),
            breakTime: 300,
            pomInput: 1500,
            breakInput: 300,
            breakFlag: false,
          });
          this.clearCountdown(clockType);

        }

        pauseButton(clockType) {
          if (clockType == "pom"){clearInterval(this.countdown);}
          else if (clockType == "break"){clearInterval(this.countdownB);};
          this.setState({
            buttonPress: true
          });
        }

        startButton(clockType){
          if (clockType == "pom"){this.startTime();}
          else if (clockType == "break"){this.startBreakTime();};
          this.setState({
            pomInput: this.state.pomTime,
            buttonPress: false
          });

        }

        // TODO:let hold down of button keep increading count
        render() {
          return (
            <div className="App">

            <div className = "Inputs">

            <div id = "SessionInput">
            <h2 className="TimerTitle">session length</h2>
            <button onClick={() => this.increaseTimer("pom")}>+</button>

            {this.state.buttonPress ? <div className="">{this.getHours("pom")}:{this.getMinutes("pom")}:{this.getSeconds("pom")}</div>
            :
            <div className="">{this.getHours("pomInput")}:{this.getMinutes("pomInput")}:{this.getSeconds("pomInput")}</div>
            }


            <button onClick={() => this.decreaseTimer("pom")}>-</button>
            </div>

            <div id = "BreakInput">
            <h2 className="TimerTitle">break length</h2>
            <button onClick={() => this.increaseTimer("break")}>+</button>
            <div className="">{this.getHours("break")}:{this.getMinutes("break")}:{this.getSeconds("break")}</div>
            <button onClick={() => this.decreaseTimer("break")}>-</button>
            </div>

            </div>

            {(this.state.breakFlag) ?
              <div>
              <h2 className="TimerTitle"> Break </h2>
              <div className="TimeDisplay">{this.getHours("break")}:{this.getMinutes("break")}:{this.getSeconds("break")}</div>
              {this.state.buttonPress ? <button onClick={() => this.startButton("break")}>Start</button> : <button onClick={() => this.pauseButton("break")}>Pause</button>}
              <button onClick={() => this.resetTime("break")}>Reset</button>
              </div>

            :

            <div>
            <h2 className="TimerTitle"> Session </h2>
            <div className="TimeDisplay">{this.getHours("pom")}:{this.getMinutes("pom")}:{this.getSeconds("pom")}</div>
            {this.state.buttonPress ? <button onClick={() => this.startButton("pom")}>Start</button> : <button onClick={() => this.pauseButton("pom")}>Pause</button>}
            <button onClick={() => this.resetTime("pom")}>Reset</button>
            </div>
            }

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
