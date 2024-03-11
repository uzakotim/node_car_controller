// App.js
import React from "react";
import "./App.css";
import ArrowButton from "./ArrowButton";

function App() {
    const [address, setAddress] = React.useState(window.location.hostname);
    return (
        <div className="App">
            <div className="button-container">
                {/* Create div that will take input from user and store it as address variable */}
                <div className="input-container">
                    <input
                        type="text"
                        placeholder={address}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="forward-buttons">
                    <ArrowButton
                        direction="left-forward"
                        message="q"
                        address={address}
                    />
                    <ArrowButton
                        direction="forward"
                        message="w"
                        address={address}
                    />
                    <ArrowButton
                        direction="right-forward"
                        message="e"
                        address={address}
                    />
                </div>
                <div className="backward-buttons">
                    <ArrowButton
                        direction="left-backward"
                        message="a"
                        address={address}
                    />
                    <ArrowButton
                        direction="backward"
                        message="s"
                        address={address}
                    />
                    <ArrowButton
                        direction="right-backward"
                        message="d"
                        address={address}
                    />
                </div>
                <div className="additional-buttons">
                    <ArrowButton
                        direction="stop"
                        message="k"
                        address={address}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
