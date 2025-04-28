# Caseworker Task Tracking System

For the DTS Development Technical Test

## Features

* Search for tasks
* Filter task results
* Inline status updating
* Pagination


### Server

The server is written in Java using the SpringBoot framework \
Cloned from the [**HMCTS Dev Test Backend**](https://github.com/hmcts/hmcts-dev-test-backend/tree/master) repository.

### Client

The client uses Angular and TypeScript for the UI as well as the GOV.UK component library


## Running this Project

### Prerequisites

- Java 21
- Node.js 20
- Docker

### Running the Server

Runs on `localhost:4000` \
Swagger UI is available at `localhost:4000/swagger-ui/index.html`

You must run the docker compose in the `server` directory to start the Postgres database.

```bash
cd Server
```

```bash
docker-compose up
```

```bash
# Assuming you are in the server directory
./gradlew clean build
./gradlew run
```

### Running the Client

Runs on `localhost:4200`

```bash
# Make sure you're in the Client directory
cd Client
# Install all dependencies
npm install
# Serve the application
ng serve
```

Run tests
```bash
npm test
# or
npm run test:headless # to run the tests without a browser opening
```

## About

### Tasks

*Each Task has the following properties*

`id`: *Assigned by the server*\
`caseNumber`: *The id of the case the task is a part of*\
`title`\
`description`\
`dueDate`\
`status`

### Task Status Options

*These options can be used to filter tasks*

`NotStarted`\
`InProgress`\
`OnHold`\
`Completed`\
`Cancelled`
