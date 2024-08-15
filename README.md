# Robot on Mission (React Project)

- Vite-React frontend project.
- Tailwind for CSS classes.
- Redux-Toolkit for state management.
- Axios for HTTP REST API calls.
- React-Router-Dom for routing.
- WebSocket for websocket connection.
- Eslint for lint check and fix.

## Before starting further please run npm install and add a /.env with required envs as shown in /.env.example

    (Install npm packages)
    npm i / install

    (Add /.env with required envs from /.env.example file)

    (Run a dev instance)
    npm run dev

    (Run a lint check)
    npm run lint

## Project has 3 modules

- Mission
- Robot
- Teleoperation

### Mission

- Mission module contains UI for CRUD REST APIs for missions.

### Robot

- Robot module contains UI for CRUD REST APIs for robot.

### Tele-operation

- Tele-operation module contains UI tele-operating a robot on the screen using a joystick button control and push the coordinates to the backend using websocket connection.
