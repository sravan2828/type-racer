import React, {Component, Fragment} from "react";

export default class TypeRace extends Component {
    state = {
        currentChar: null,
        completedText: [],
        errorText: [],
        pendingText: this.props.text.split(""),
        totalText: this.props.text,
        inputText: "",
        showStartButton: true,
        showStopButton: false,
        seconds: 0,
        timerOn: false
        
    }

    handleKeyPress = (event) => {
        let char = event.key;
        let {completedText, pendingText, currentChar, errorText, inputText} = this.state;
        inputText += char;
        debugger;
        const iskeySpace = char === " ";
        currentChar = currentChar || pendingText[0];
        if(char === currentChar){
            completedText.push(char);
            pendingText.shift();
            let nextChar = pendingText[0];
            if(iskeySpace){
                this.setState({
                    completedText,
                    currentChar: nextChar,
                    pendingText,
                    inputText: ""
                });
            } else {
                this.setState({
                    completedText,
                    currentChar: nextChar,
                    pendingText,
                    inputText
                });
            }  
        } else {
            errorText.push(currentChar);
            pendingText.shift();
            let nextChar = pendingText[0];
            this.setState({
                errorText,
                pendingText,
                currentChar: nextChar,
                inputText
            });
        }
        if(pendingText.length === 0){
            this.stopTimer();
        }
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 8) {
            let {pendingText, errorText, inputText} = this.state;
            let currentChar = errorText.pop();
            inputText = inputText.slice(0, -1);
            pendingText.unshift(currentChar);
            this.setState({
                pendingText,
                errorText,
                currentChar,
                inputText
            })
        }
    }

    startTimer = () => {
        this.setState({
            showStartButton: false,
            showStopButton: true,
            seconds: 0,
            completedText: []
        })
        this.timer = setInterval(() => {
                let seconds = this.state.seconds
                this.setState({ seconds: ++seconds });
        }, 1000)
    }
    


    stopTimer = () => {
        this.setState({
            showStartButton: true,
            showStopButton: false
        })
        clearInterval(this.timer);
        alert("your words/minute speed is "+ this.getWPM().toPrecision(2));
    }

    getWPM = () => {
        const {completedText, seconds} = this.state;
        if(seconds<=1){
            return 0;
        }
        return (completedText.length/5)/(seconds/60);
    }
    render(){
        return(
            <Fragment>
                <div>
                    <span className="completed">{this.state.completedText.join("")}</span>
                    <span className="error">{this.state.errorText.join("")}</span>
                    <span className="pending">{this.state.pendingText.join("")}</span>
                </div>
                <input type="text" className="input" onKeyPress={this.handleKeyPress} onKeyDown={this.handleKeyDown} value = {this.state.inputText} />
                <p>time: {this.state.seconds}</p>
                <p>words per minute: {this.getWPM().toPrecision(2)}</p>
                <button className="button" onClick={this.startTimer} disabled={!this.state.showStartButton}>Start Timer</button>
                <button className="button" onClick={this.stopTimer} disabled={!this.state.showStopButton}>Stop Timer</button>
            </Fragment>
        );
    }

}