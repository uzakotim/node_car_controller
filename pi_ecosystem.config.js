module.exports = {
    apps: [
        {
            name: "rpi_backend",
            script: "./rpi_backend/src/rpi_server.js",
        },
        {
            name: "frontend",
            script: "./frontend/src/controller.js",
        },
        {
            name: "starter",
            script: "../featsion/c++/build/run_me",
            exec_interpreter: "none",
            exec_mode: "fork_mode",
        },
    ],
};
