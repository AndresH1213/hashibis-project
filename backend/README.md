# Hashibis Project

This project is a serverless REST API that consists of four microservices that can perform CRUD operations. The API runs on AWS Lambda functions using the Serverless Framework. To use each service, users must be authenticated via Cognito User Pools through our frontend.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints & Database Schema](#api-endpoints-&-database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Work](#future-work)
- [License](#license)

## Overview

The main objective of this project is to build a reliable system for managing the sale of cannabis products in a responsible manner. It was developed with a focus on clean architecture principles and best practices, ensuring that the code is easy to maintain, test, and scale. The system provides users with the ability to keep track of their medical history, personal information, products for sale, and orders.

## Features

The system is built using a serverless architecture, with four microservices that can perform CRUD operations. This architecture provides several benefits, including cost-efficiency, scalability, and reduced operational overhead. The microservices are managed using the Serverless Framework and run on AWS Lambda functions, ensuring that the system is highly available and fault-tolerant.

## Getting Started

To run this project locally, you will need:

- []node.js v16+
- []npm
- []Docker
- []aws cli
- []aws profile in config credentials hashibis-project-dev (optional)

To initialize the local environment, you should first give permission to the build.sh script using the following command:

`chmod +x ./build.sh`

Then we need to install all dependencies:

`npm run dev:init`

And finally we have to start de serverless offline environment:

`npm run dev`

## Project Structure

The project follows a modular structure based on serverless stacks that contain individual Lambdas, each with a dedicated layer to separate business logic from the functions. The project includes separate layers for the Domain and Application layers. The Infrastructure layer is located in the layer folder and contains services to interact with Amazon Web Services resources. The structure of the project is as follows:

├── stack1
│ ├── layer
│ │ ├── entity
│ │ └── lib
│ ├── src
│ │ ├── usecase1
│ │ └── usecase2
│ └── serverless.yml
├── layer
│ ├── infrastructure
│ │ ├── database
│ │ └── service
│ └── application
│ ├── libs
│ └── exceptions
├── build.sh
├── serverless.yml
└── README.md

## API Endpoints & Database Schema

The API endpoints provide a simple and intuitive way to interact with the system as well the project's database schemas are designed to support the system's functionalities and ensure data consistency. You can find the API documentation [here](#link-to-documentation)

## Testing

The project follows a modular testing methodology, with each module being thoroughly tested with integration and unit tests using Jest. To run the tests, simply use the command `npm run test`. This will execute all the tests and provide detailed feedback on any errors or failures encountered.

## Deployment

To deploy the project to the AWS cloud, simply run the npm run deploy command. However, be sure to specify the target environment or stage using the --env flag. For instance, you can deploy to the development environment with the command:

`npm run deploy --env=dev`

Before deploying, make sure you have the AWS profile configured on your local machine. Additionally, any required infrastructure, such as databases, must be deployed beforehand, as they are referenced in the serverless.yml stacks.

## Future Work

I plan to continue working on this project and adding new features to improve its functionality. Specifically, I'm interested in exploring the integration of AI technologies, such as machine learning and natural language processing, to provide personalized product recommendations through a chat interface.

## License

Creating Commons License
