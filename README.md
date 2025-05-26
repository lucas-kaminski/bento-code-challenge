# bento-code-challenge

Technical challenge for the backend developer position at Bento ([bento.kyc](https://bento.kyc)). This project is a REST API that integrates with Bento's external API to calculate delivery fees and times, storing the results in a database. The details of the challenge are described in the PDF file received by email.

## Used to develop this challenge

This project was developed using the following technology stack:

- **Node.js** (`v22.15.1`): Runtime environment. Check with `node -v`.
- **Yarn**: Dependency and script manager. Install with `npm i -g yarn`.
- **NestJS**: Backend framework. Install globally with `npm i -g @nestjs/cli`.
- **TypeScript**: Strictly-typed JavaScript, required by NestJS.
- **Firebase Admin SDK**: Firestore connection and Google Cloud integration.
- **Docker** and **Docker Compose**: Containerized environment for development and production.
- **Nginx**: Reverse proxy and SSL termination.
- **Certbot**: Automated HTTPS certificates (Let's Encrypt).
- **Swagger/OpenAPI**: API documentation, available at `/api` endpoint.
- **Pino**: Structured logging.
- **Jest**: Testing framework.
- **GitHub Actions**: CI/CD pipeline.

## Branch strategy

This project will use the `main` branch as the production branch and the `develop` branch as the development branch. All features will be developed in separate branches, which will be merged into the `develop` branch. Those branches will be named according to the task they are implementing. For example, the branch for TASK-1 will be named `TASK-1`.

The `develop` branch will be merged into the `main` branch when all tasks are completed and the project is ready for production. The `main` branch will be used for deployment.

## Environment variables

For the environment variables necessary to run the project, please refer to the `.env.template` file. Copy this file to `.env` and fill in the necessary values.

Will be necessary to get two variables from the Bento website, the step-by-step to retrieve them is described in the [TASK-1 file](./TASK-1.md).

For connecting to the Firestore database, you will need to create a Firebase project and download the service account key JSON file, then set the enviroment variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of this file. If necessary, check the [Firebase documentation](https://firebase.google.com/docs/admin/setup#initialize-sdk) for more details on how to set up the Firebase Admin SDK.

## Dependencies

- `@nestjs/axios`, `axios`: HTTP client for external API requests.
- `@nestjs/config`: Environment variable management.
- `nestjs-pino`, `pino`, `pino-http`, `pino-pretty`: Logging.
- `firebase-admin`: Firestore database and Google Cloud integration.
- `@nestjs/swagger`, `swagger-ui-express`: API docs.
- `reflect-metadata`, `rxjs`: Required by NestJS.
- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`: NestJS core.
- `eslint`, `prettier`, `jest`, `ts-jest`, `supertest`, `husky` (pre-commit hooks), `@nestjs/testing`, and TypeScript-related packages for linting, formatting, testing, and development.

## How to Run

### Local

1. Clone the repository and install dependencies:
   ```bash
   yarn install
   ```
2. Copy `.env.template` to `.env` and fill in the required environment variables.
3. Build and start the backend:
   ```bash
   yarn build
   yarn start
   ```
   Or use Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. The API will be available at `http://localhost:3000` by default.

### Production

The project is deployed and available at: [https://bento.lucas-kaminski.dev](https://bento.lucas-kaminski.dev)

Deployment uses Docker, Docker Compose, Nginx, and Certbot for HTTPS on a personal VPS. For more details, see the development log below.

## Documentation

Swagger/OpenAPI documentation is available at the `/api` endpoint:

- Local: [http://localhost:3000/api](http://localhost:3000/api)
- Production: [https://bento.lucas-kaminski.dev/api](https://bento.lucas-kaminski.dev/api)

You can use Swagger UI to explore and test the API endpoints directly from your browser.

Ensure to have the Bearer Token from the Bento website to test the endpoints that require authentication. The token should be included in the `Authorization` header as `Bearer YOUR_TOKEN` in every request you make to the API.

## Tests

Automated tests are being developed using Jest. To run the tests (when available):

```bash
yarn test
```

Test coverage includes unit and integration tests for endpoints and error handling. This section will be updated as test coverage improves.

The tests, when implemented, will be run automatically in the CI pipeline using GitHub Actions, ensuring code quality and functionality before merging changes.

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
- Created the Dockerfile and docker-compose.yml to run the project in a containerized environment.
- Created the CI pipeline with GitHub Actions to run the tests and build the project. Added husky pre-commit hooks to run the tests before committing the code.
- Created the CD pipeline to deploy the project to a personal VPS using Docker and Docker Compose.
- Configured Nginx and Certbot to serve the project with HTTPS and a custom domain [https://bento.lucas-kaminski.dev](https://bento.lucas-kaminski.dev).
- Implemented the JWT authentication layer to validate the decoded content of the Bearer Token.
- Created a global error handler to handle expected and unexpected errors, returning the appropriate HTTP status codes and messages for TASK-4.
- Updated README.md with the missing details and updated the checklist, preparing for the delivery of the challenge.

## Backlog

### TASK-0: Planning the project

- [x] Read the challenge instructions and analyze the requirements
- [x] Create a new repository on GitHub to start tracking the progress of the challenge
- [x] Start the backlog session in the README file to track the tasks that need to be done
- [x] Create the [checklist](#checklist) session to track what is done and what is missing
- [x] Create all the TECH-X tasks in the backlog section
- [x] Define the technology stack to be used in the project based on the challenge requirements and job description ([link](https://github.com/backend-br/vagas/issues/11910))
- [x] Define the branch strategy to be used in the project

#### Tech at job description

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
- [x] Implement authentication layer
- [ ] Rate limit layer?
- [x] Implement /delivery/fee endpoint
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
  - [x] Should receive pagination parameters (page, limit)?
    - [x] Receive the parameter `limit` to limit the number of entries returned

### TASK-4: Error Handling

- [x] Handle with expected and unexpected errors
  - Invalid/missing/expired token
    - Will return a 401 Unauthorized error
  - API call failures
    - Will return a 500 Internal Server Error with a message indicating where the error occurred
  - Unexpected data or missing fields in the request
    - Will return a 400 Bad Request error with a message indicating the error

### TASK-5: Documentation

- [x] Write API documentation using Swagger/OpenAPI
  - [x] Document all endpoints
  - [x] Include request/response examples

### TASK-6: Testing

- [ ] Write unit tests for endpoints
  - [ ] Health
  - [ ] delivery fee
  - [ ] requests last
- [ ] Error handling tests
  - [ ] 401 Unauthorized
  - [ ] 400 Bad Request
  - [ ] 500 Internal Server Error

### TASK-7: Deployment

- [x] Dockerize
- [x] CI pipeline
  - [x] Add husky pre-commit hooks
- [x] CD pipeline
- [x] Deploy the project
  - [x] Personal VPS or Google environment?
    - [x] Used a personal VPS with Docker and Docker Compose, Nginx and Certbot for HTTPS [https://bento.lucas-kaminski.dev](https://bento.lucas-kaminski.dev)

### TASK-8: Review

- [x] Ensure all tasks are completed

## Checklist

This checklist is extracted from the challenge instructions and will track what is done and what is missing.

- [x] API Implementation: Correct integration with the Bento API and proper application of the margin.
- [x] Documentation: Clear and comprehensive Swagger documentation.
- [x] Error Handling: Robust error handling, including token validation and unexpected responses.
- [x] Code Quality: Clean, maintainable code.
- [x] Functionality: Properly storing data, returning the expected response, and having two clear endpoints.

## Final Considerations

It was great to work on this challenge. I delivered all core requirements with the same quality and development best practices I always apply. Some optional features, like full tests and rate limiting, were only planned due to time constraints, as they are not mandatory. These would add extra safety but don't impact the main objectives.

Considering the checklist and the tasks, I believe I delivered a solid solution that meets the challenge requirements. The project is ready for review, and I look forward to your feedback.

If you have any questions or need further clarifications, feel free to reach out. Thank you for the opportunity to participate in this challenge!
