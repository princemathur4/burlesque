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

    componentDidMount() {
        let arr = [];
        this.randomSongList = [];
        while (arr.length < songs.length) {
            var r = Math.floor(Math.random() * songs.length) + 1;
            if (arr.indexOf(r) === -1) {
                arr.push(r);
                this.randomSongList.push(songs[r]);
                console.log(songs[r]);
            }
        }
        console.log(this.randomSongList);
        setTimeout(this.setTimer(), 1000);
    }

    setTimer = () => {
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
        if (this.state.screen === "dubbed") {
            this.setState({ screen: "lyrics" });
        } else if (this.state.screen === "lyrics") {
            clearInterval(this.intervalId);
            this.setState({
                screen: "title",
                timer: 0,
            });
        }
    };

    handleNext = () => {
        this.setState({
            screen: "dubbed",
            iterator: this.state.iterator + 1,
        });
        clearInterval(this.intervalId);
        this.setTimer();
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
                                    <div className="dubbed-lyrics-container">
                                        {ReactHtmlParser(
                                            this.randomSongList[
                                                this.state.iterator
                                            ]["Dub"].replace(/\n/g, "<br/>")
                                        )}
                                    </div>
                                )}
                                {this.state.screen == "lyrics" && (
                                    <div className="actual-lyrics-container">
                                        {ReactHtmlParser(
                                            this.randomSongList[
                                                this.state.iterator
                                            ]["Song"].replace(/\n/g, "<br/>")
                                        )}
                                    </div>
                                )}
                                {this.state.screen == "title" && (
                                    <div className="title-container">
                                        {
                                            this.randomSongList[
                                                this.state.iterator
                                            ]["Name"]
                                        }
                                    </div>
                                )}
                            </div>
                            {this.state.screen !== "title" && (
                                <button
                                    className="reveal-button"
                                    onClick={() => {
                                        this.handleReveal();
                                    }}
                                >
                                    {this.state.screen == "dubbed"
                                        ? "Show Actual Lyrics"
                                        : "Reveal Title"}
                                </button>
                            )}
                            {this.state.screen === "title" && (
                                <button
                                    className="next-button"
                                    onClick={() => {
                                        this.handleNext();
                                    }}
                                >
                                    Next
                                </button>
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
