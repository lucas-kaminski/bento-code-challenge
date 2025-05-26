# bento-code-challenge

Technical challenge for the backend developer position at Bento ([bento.kyc](https://bento.kyc)).

## Used to develop this project

- Node.js, in the development of project is used the version `v22.15.1`, to check the version of Node.js, run the command `node -v` in the terminal.
- Yarn, installed globally with (`npm i -g yarn`)
- NestJS, installed globally with (`npm i -g @nestjs/cli`)
- NestJS starter project, created with the command `nest new backend` and used `yarn` as package manager.

## Branch strategy

This project will use the `main` branch as the production branch and the `develop` branch as the development branch. All features will be developed in separate branches, which will be merged into the `develop` branch. Those branches will be named according to the task they are implementing. For example, the branch for TASK-1 will be named `TASK-1`.

The `develop` branch will be merged into the `main` branch when all tasks are completed and the project is ready for production. The `main` branch will be used for deployment.

## Environment variables

For the environment variables necessary to run the project, please refer to the `.env.template` file. Copy this file to `.env` and fill in the necessary values. To know how to retrieve the values, please refer to the file [TASK-1.md](TASK-1.md).

For the database configuration, please refer to the [Firebase documentation](https://firebase.google.com/docs/web/setup) for more information about how to create the JSON which contains the credentials to access the database which will be stored at `/secrets/google-credentials.json` and the path to this file should be set in the environment variable `GOOGLE_APPLICATION_CREDENTIALS`.

## Dependencies

This project uses the following dependencies:

- @nestjs/axios, axios: Para requisições HTTP à API externa do Bento.

- nestjs-pino, pino, pino-http, pino-pretty: Logging estruturado e bonito.

- @nestjs/config: Carregar variáveis de ambiente facilmente.

- reflect-metadata, rxjs: Utilizados internamente pelo NestJS.

- @nestjs/core, @nestjs/common, @nestjs/platform-express: Estrutura base do NestJS.

## Backlog

### TASK-0: Planning the project

- [x] Read the challenge instructions and analyze the requirements
- [x] Create a new repository on GitHub to start tracking the progress of the challenge
- [x] Start the backlog session in the README file to track the tasks that need to be done
- [x] Create the [checklist](#checklist) session to track what is done and what is missing
- [x] Create all the TECH-X tasks in the backlog section
- [x] Define the technology stack to be used in the project based on the challenge requirements and job description ([link](https://github.com/backend-br/vagas/issues/11910))
- [x] Define the branch strategy to be used in the project

### TASK-1: Validation

- [x] Collect the Bearer Token from the Bento website
  - [x] Document how to retrieve the token (manual or script-based) (video/gif)
  - [x] Verify the token's life usage (valid/invalid/expired) [jwt.io](https://jwt.io/)
- [x] Use the token to fetch the user profile and UUID
  - [x] Verify the response structure
  - [x] Store the token and UUID as USER_UUID.
- [x] Call Bento's `/delivery/fee` endpoint with required headers and payload
  - [x] Verify the request structure
  - [x] Verify the response structure

### TASK-2: API

- [x] Start the project based on the technology stack defined in the job description
- [x] Implement health check endpoint
  - [x] Check if the server is running
- [x] Logging layer
- [ ] Implement authentication layer
- [ ] Rate limit layer?
- [x] Implement /delivery/fee endpoint
  - [ ] Accept input parameters
    - [ ] It will be the same as the Bento API? Being a Gateway? Or will it be different?
  - [x] Call Bento API
  - [x] Extract response fields (originalFee, newFee, deliveryTime, distanceMeters and message)
  - [x] Transform data
    - [x] Convert fee to dollars and apply 13% margin
  - [x] Return structured response

### TASK-3: Database

- [x] Set up a database
- [x] Adapt the API layer to use the database
- [x] Update health check endpoint to verify database connection
- [x] Implement `/requests/last` endpoint
  - [x] Retrieve last 10 entries from database as an array
  - [ ] Should receive pagination parameters (page, limit)?

### TASK-4: Error Handling

- [ ] Handle with expected and unexpected errors
  - Invalid/missing/expired token
  - API call failures
  - Unexpected data
  - Missing fields

### TASK-5: Documentation

- [x] Write API documentation using Swagger/OpenAPI
  - [x] Document all endpoints
  - [x] Include request/response examples

### TASK-6: Testing

- [ ] Write unit tests for all endpoints
  - [ ] Test valid and invalid inputs
  - [ ] Test error handling
- [ ] Error handling tests

### TASK-7: Deployment

- [x] Dockerize
- [ ] CI pipeline
- [ ] CD pipeline
- [ ] Deploy the project
  - [ ] Personal VPS or Google environment?

### TASK-8: Review

- [ ] Ensure all tasks are completed

## Checklist

This checklist is extracted from the challenge instructions and will track what is done and what is missing.

- [ ] API Implementation: Correct integration with the Bento API and proper application of the margin.
- [ ] Documentation: Clear and comprehensive Swagger documentation.
- [ ] Error Handling: Robust error handling, including token validation and unexpected responses.
- [ ] Code Quality: Clean, maintainable code.
- [ ] Functionality: Properly storing data, returning the expected response, and having two clear endpoints.

## Tech at job description

This is the technology stack mentioned in the job description. It will be used as a reference to define the technology stack for this challenge.

- TypeScript
- Node.js
- NestJS
- Firebase (Firestore, functions, etc.)
- Google Cloud Platform (GCP)
- Cloud Run
- BigQuery
- Docker
- Swagger/OpenAPI

## Developer log

### 2025-05-22

- Received the challenge by email at 21:57 (Brazil time). Read the PDF instructions and analyzed the requirements.
- Created a new repository on GitHub and initialized it with a README to track progress.
- Started the [backlog](#backlog) and [checklist](#checklist) sections to break the work into small deliverables.

### 2025-05-23

- Finished the TASK-0: Planning the project with all the sections at README.md, comparing against the challenge instructions and defining the technology stack.

### 2025-05-25

- Explained the branch strategy at [#branch-strategy](#branch-strategy) section and started the `develop` branch.
- Finished the TASK-1 documentation with the steps to retrieve the Bearer Token and UUID.
- Started the TASK-2, setting up the project with NestJS and TypeScript and implemented many of the requirements, leaving the rest for after the database is set up.
- Configured the firebase and firestore to be used in the project. Implemented the connection to the database and the health check endpoint. Implemented the logging layer after calculating the fee and the delivery time. Implemented the `/delivery/fee` endpoint and the `/requests/last` endpoint.
- Implemented the swagger documentation for the API, creating the OpenAPI specification for the endpoints and their request/response examples.
-
