import React from "react";
import "./style.scss";
import logo from "../../logo.svg";


export default class Home extends React.Component {

    startGame() {
        this.props.history.push('/game');
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Song Burlesque</h1>
                    <h3>(Guess the title)</h3>
                    <button className="start-button" onClick={()=>{this.startGame()}}>
                        Start
                    </button>
                </header>
            </div>
        );
    }
}
