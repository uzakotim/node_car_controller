// App.js
import React from "react";
import "./App.css";
import ArrowButton from "./ArrowButton";

function App() {
    return (
        <div className="App">
            <ArrowButton direction="left-forward" message="q" />
            <ArrowButton direction="forward" message="w" />
            <ArrowButton direction="right-forward" message="e" />
            <ArrowButton direction="left-backward" message="a" />
            <ArrowButton direction="backward" message="s" />
            <ArrowButton direction="right-backward" message="d" />
        </div>
    );
}

export default App;
