module.exports = {
    apps: [
        {
            name: "command_server",
            script: "./backend/src/command_server.js",
        },
        {
            name: "frontend",
            script: "./frontend/src/controller.js",
        },
        {
            name: "starter",
            script: "./c++/build/run_me",
            exec_interpreter: "none",
            exec_mode: "fork_mode",
        },
    ],
};
