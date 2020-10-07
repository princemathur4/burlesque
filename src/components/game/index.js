import React, { Fragment } from "react";
import "./style.scss";
import { songs } from "../../constants";
import ReactHtmlParser from "react-html-parser";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = null;
        this.randomSongList = [];
    }

    state = {
        screen: "dubbed",
        timer: 60,
        iterator: 0,
    };

    componentWillMount() {
        this.randomSongList = [];
        let arr = [];
        while (arr.length < songs.length) {
            var r = Math.floor(Math.random() * songs.length) + 1;
            if (arr.indexOf(r) === -1) {
                arr.push(r);
                this.randomSongList.push(songs[r-1]);
            }
        }
        setTimeout(this.startTimer(), 1000);
    }

    startTimer = () => {
        var countDownDate = new Date();
        countDownDate.setSeconds(countDownDate.getSeconds() + 60);
        let self = this;
        // Update the count down every 1 second
        this.intervalId = setInterval(function () {
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            self.setState({ timer: seconds });

            // If the count down is finished, write some text
            if (distance < 0) {
                self.setState({ timer: 0 });
                clearInterval(self.intervalId);
            }
        }, 1000);
    };

    handleReveal = () => {
        clearInterval(this.intervalId);
        this.setState({
            screen: "title",
            timer: 0,
        });
    };

    handleNext = () => {
        this.setState({
            screen: "dubbed",
            iterator: this.state.iterator + 1,
        });
        clearInterval(this.intervalId);
        this.startTimer();
    };

    render() {
        return (
            <Fragment>
                <div className="game-title">Guess the title</div>
                {this.randomSongList.length && (
                    <div className="game-container">
                        <div className="left-container">
                            <div className="content-container">
                                {this.state.screen == "dubbed" && (
                                    <Fragment>
                                        <div className="song-number">Song No: {this.state.iterator+1}</div>
                                        <div className="dubbed-lyrics-container">
                                            {ReactHtmlParser(
                                                this.randomSongList[
                                                    this.state.iterator
                                                ]["Dub"].replace(/\n/g, "<br/>")
                                            )}
                                        </div>
                                    </Fragment>
                                )}
                               {this.state.screen == "title" && (
                                   <Fragment>
                                       <div className="title-container">
                                        {
                                            this.randomSongList[
                                                this.state.iterator
                                            ]["Name"]
                                        }
                                        </div>
                                        <div className="actual-lyrics-container">
                                            {ReactHtmlParser(
                                                this.randomSongList[
                                                    this.state.iterator
                                                ]["Song"].replace(/\n/g, "<br/>")
                                            )}
                                        </div>
                                    
                                    </Fragment>
                                )}
                            </div>
                            {this.state.screen !== "title" && (
                                <button
                                    className="reveal-button"
                                    onClick={() => {
                                        this.handleReveal();
                                    }}
                                >
                                    Reveal
                                </button>
                            )}
                            {this.state.screen === "title" && (
                                <Fragment>
                                    {
                                    this.state.iterator + 1!== this.randomSongList.length ?
                                        <Fragment>
                                        <button
                                            className="next-button"
                                            onClick={() => {
                                                this.setState({screen: "dubbed"});  
                                            }}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="next-button"
                                            onClick={() => {
                                                this.handleNext();
                                            }}
                                        >
                                            Next
                                        </button>
                                        </Fragment>
                                        :
                                        <div className="the-end">
                                            The End
                                        </div>
                                    }
                                </Fragment>
                            )}
                        </div>
                        <div className="timer-container">
                            {this.state.timer}
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}
