# Caseworker Task Tracking System

For the [**DTS Developer Technical Test**](https://github.com/hmcts/dts-developer-challenge)


![Example of the running task manager app](https://github.com/user-attachments/assets/0d68ba42-dec3-46f0-9723-6e17c1eeb1b5)

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
**Swagger UI is available at `localhost:4000/swagger-ui/index.html`**

You must run the docker compose in the `server` directory to start the Postgres database.

```bash
docker-compose up
```

```bash
# Assuming you are in the project root
cd Server

# Building requires the test-database service to be running or else it will fail
./gradlew clean build 
# Running requires the database service is running
./gradlew run
```

### Running the Client

Runs on `localhost:4200`

```bash
# Make sure you're in the Client directory
cd ../Client
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

The API provides these endpoints:

- **GET** `/api/tasks/` - Get a single task by ID
- **GET** `/api/tasks/all` - Get tasks with pagination and filters
- **POST** `/api/tasks/add` - Create a new task
- **PUT** `/api/tasks/update` - Update an existing task
- **DELETE** `/api/tasks/delete/` - Delete a task by ID

### Tasks

*Each Task has the following properties*

- `id` - *Assigned by the server*
- `caseNumber` - *The id of the case the task is a part of*
- `title`
- `description`
- `dueDate`
- `status`

### Task Status Options

*These options can be used to filter tasks*

- `NotStarted`
- `InProgress`
- `OnHold`
- `Completed`
- `Cancelled`
