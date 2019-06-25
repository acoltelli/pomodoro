import React from "react";
import { Component } from "react";
import './App.css';


class Pomodoro extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            pomTime: 1500, //1500 seconds = 25 min
            breakTime: 300,
            pomInput: 1500,
            breakInput: 300,
            breakFlag: false,
            buttonPress: true
          };
        }

        increaseTimer(clockType){
          if (clockType === "pom"){
            this.setState({
              pomInput: this.state.pomTime + 60,
              pomTime: this.state.pomTime + 60});
          }
          else if (clockType === "break"){
            this.setState({
              breakInput: this.state.breakTime + 60,
              breakTime: this.state.breakTime + 60})}
        }

        decreaseTimer(clockType){
          if (clockType === "pom"){
            if (this.state.pomTime > 60)  {
              this.setState({
                pomInput:this.state.pomTime - 60,
                pomTime: this.state.pomTime - 60})}
            else {this.setState({
              pomInput: 0,
              pomTime: 0})}
        }
          else if (clockType === "break"){
            if (this.state.breakTime > 60)  {
              this.setState({
                breakInput: this.state.breakTime - 60,
                breakTime: this.state.breakTime - 60})  }
            else {this.setState({
              breakInput: 0,
              breakTime: 0})}
        }
      }

        getHours(clockType) {
          if (clockType === "pom"){return ("0" + Math.floor(this.state.pomTime / 3600)).slice(-2);}
          else if (clockType === "break"){return ("0" + Math.floor(this.state.pomTime / 3600)).slice(-2);}
          else if (clockType === "pomInput"){return ("0" + Math.floor(this.state.pomInput / 3600)).slice(-2);}
          else if (clockType === "breakInput"){return ("0" + Math.floor(this.state.breakInput / 3600)).slice(-2);}
        }

        getMinutes(clockType) {
          if (clockType === "pom"){return ("0" + Math.floor((this.state.pomTime % 3600) / 60)).slice(-2);}
          else if (clockType === "break"){return ("0" + Math.floor((this.state.breakTime % 3600) / 60)).slice(-2);}
          else if (clockType === "pomInput"){return ("0" + Math.floor((this.state.pomInput % 3600) / 60)).slice(-2);}
          else if (clockType === "breakInput"){return ("0" + Math.floor((this.state.breakInput % 3600) / 60)).slice(-2);}
        }

        getSeconds(clockType) {
          if (clockType === "pom"){return ("0" + (this.state.pomTime % 60)).slice(-2);}
          else if (clockType === "break"){return ("0" + (this.state.breakTime % 60)).slice(-2);}
        }

        clearCountdown(clockType){
          if (clockType === "pom"){clearInterval(this.countdown);}
          else if (clockType === "break"){clearInterval(this.countdownB);};
        }

        helper(clockType){
          if (clockType === "pom"){this.startBreakTime();}
          else if (clockType === "break"){this.startTime()};
       }

        startTime() {
          var _this = this;
          this.countdown = setInterval(dec, 1000);
          function dec(){
            if (_this.state.pomTime > 0){
            _this.setState({
              pomTime: _this.state.pomTime - 1 });
          }
          if (_this.state.pomTime === 0){
            _this.setState({
              pomTime: _this.state.pomInput,
              breakFlag: true})
          // _this.alert();
          _this.refs.audioBeep.play();
          _this.clearCountdown("pom");
          _this.helper("pom");  }

        }}

       //TODO:refactor
        startBreakTime() {
          var _this = this;
          this.countdownB = setInterval(dec, 1000);
          function dec(){
            if (_this.state.breakTime > 0){
              _this.setState({ breakTime: _this.state.breakTime - 1 });
            }
            if (_this.state.breakTime === 0){
              _this.setState({
                breakTime: _this.state.breakInput,
                breakFlag: false})
              _this.refs.audioBeep.play();
              _this.clearCountdown("break");
              _this.helper("break");
        }}
        }

        resetTime(clockType) {
          this.reset = this.setState({
            pomTime: 1500,
            breakTime: 300,
            pomInput: 1500,
            breakInput: 300,
            breakFlag: false,
            buttonPress: true
          });
          this.clearCountdown(clockType);

        }

        pauseButton(clockType) {
          if (clockType === "pom"){clearInterval(this.countdown);}
          else if (clockType === "break"){clearInterval(this.countdownB);};
          this.setState({
            buttonPress: true
          });
        }

        startButton(clockType){
          if (clockType === "pom"){this.startTime();}
          else if (clockType === "break"){this.startBreakTime();};
          this.setState({
            buttonPress: false
          });

        }

        // TODO:let hold down of button keep increading count
        render() {
          return (
            <div>
            <div className="App">
            <audio ref= "audioBeep" preload = "auto" src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"/>

            <div className = "InputButtons">
            <h1 className="AppTitle">Pomodoro Timer</h1>
            <div className= "btns">
            <h2 className="ButtonTitle">session length</h2>
            <button className= "plusminus" onClick={() => this.increaseTimer("pom")}>+</button>
            <div className= "plusminus" id= "pomInputTimer">{this.getHours("pomInput")}:{this.getMinutes("pomInput")}</div>
            <button className= "plusminus" onClick={() => this.decreaseTimer("pom")}>-</button>
            </div>

            <div className = "btns">
            <h2 className="ButtonTitle">break length</h2>
            <button className = "plusminus" onClick={() => this.increaseTimer("break")}>+</button>
            <div className= "plusminus" id= "breakInputTimer">{this.getHours("breakInput")}:{this.getMinutes("breakInput")}</div>
            <button className = "plusminus" onClick={() => this.decreaseTimer("break")}>-</button>
            </div>

            </div>

            <div className="TimerElement">
            {(this.state.breakFlag) ?
              <div className="TimeDisplay">
              <h2 className="TimerTitle">Break</h2>

              <div id= "breakInputTimer">{this.getHours("break")}:{this.getMinutes("break")}:{this.getSeconds("break")}</div>
              {this.state.buttonPress ? <button className="startpause" onClick={() => this.startButton("break")}>Start</button> : <button className="startpause" onClick={() => this.pauseButton("break")}>Pause</button>}
              <button className="startpause" onClick={() => this.resetTime("break")}>Reset</button>
              </div>

            :

            <div className="TimeDisplay">
            <h2 className="TimerTitle">Session</h2>
            <div id= "pomInputTimer">{this.getHours("pom")}:{this.getMinutes("pom")}:{this.getSeconds("pom")}</div>
            <div>
            {this.state.buttonPress ? <button className="startpause" onClick={() => this.startButton("pom")}>Start</button> : <button className="startpause" onClick={() => this.pauseButton("pom")}>Pause</button>}
            <button className="startpause" onClick={() => this.resetTime("pom")}>Reset</button>
            </div>

            </div>
            }

            </div>
            </div>
            <footer className = "Footer">
            <a href="https://github.com/acoltelli">author</a>
            <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">about</a>
            </footer>
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
