import React, {Component, Fragment} from "react";

export default class TypeRace extends Component {
    state = {
        currentChar: null,
        completedText: [],
        errorText: [],
        pendingText: this.props.text.split(""),
        totalText: this.props.text,
        inputText: ""
        
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
    render(){
        //console.log("completed Text : "+this.state.completedText+ " pending Text : "+ this.state.pendingText)
        return(
            <Fragment>
                <div>
                    <span className="completed">{this.state.completedText.join("")}</span>
                    <span className="error">{this.state.errorText.join("")}</span>
                    <span className="pending">{this.state.pendingText.join("")}</span>
                </div>
                <input type="text" onKeyPress={this.handleKeyPress} onKeyDown={this.handleKeyDown} value = {this.state.inputText} />
            </Fragment>
        );
    }

}