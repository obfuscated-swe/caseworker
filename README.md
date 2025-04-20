# Caseworker Task Tracking System

For the DTS Development Technical Test


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
./gradlew bootRun
```

### Running the Client

Runs on `localhost:4200`

```bash
# Make sure you're in the Client directory
cd Client
```
```bash
npm install
```

Run tests
```bash
npm test
```

```bash
npm run test:headless # to run the tests without a browser opening
```

Run the client
```bash
ng serve
```