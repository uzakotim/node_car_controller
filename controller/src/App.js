// App.js
import React from "react";
import "./App.css";
import ArrowButton from "./ArrowButton";

function App() {
    return (
        <div className="App">
            <div className="button-container">
                <div className="forward-buttons">
                    <ArrowButton direction="left-forward" message="q" />
                    <ArrowButton direction="forward" message="w" />
                    <ArrowButton direction="right-forward" message="e" />
                </div>
                <div className="backward-buttons">
                    <ArrowButton direction="left-backward" message="a" />
                    <ArrowButton direction="backward" message="s" />
                    <ArrowButton direction="right-backward" message="d" />
                </div>
                <div className="additional-buttons">
                    <ArrowButton direction="stop" message="k" />
                </div>
            </div>
        </div>
    );
}

export default App;
