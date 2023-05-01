# Hashibis Project

This project is a serverless REST API that serves as the core of the application. It consists of four microservices that can perform CRUD operations and is built with the Serverless Framework running on AWS Lambda functions. The API is designed to be scalable, maintainable, and easy to deploy.

Users can be authenticated and received a token to use the API through a frontend built with React.

The project also includes an infrastructure as code component using CDK, allowing for easy deployment and management of the underlying AWS resources.

Yoy can access the live project at http://hashibis.site

## Frontend

The frontend is built using Reac, and is designed for authentication and show the documentation of the api (build using swagger). Also it communicates with the backend via HTTP protocol.

![frontend-architecture](https://disgrafic-product-bucket-sand.s3.us-east-2.amazonaws.com/varios/frontend-architecture-hashibis.png)

## Backend

The backend of this project was built using TypeScript and AWS Lambda functions, leveraging the Serverless Framework for easy development and deployment of services. The codebase follows clean architecture principles and incorporates best practices to ensure maintainability, testability, and scalability. The backend consists of four microservices that enable CRUD operations and is designed to work seamlessly with the frontend and infrastructure components of the system.

![backend-architecture](https://disgrafic-product-bucket-sand.s3.us-east-2.amazonaws.com/varios/backend-architecture-hashibis.png)

To lear more please navigate to the **backend folder**.

## CICD Pipeline

The project includes two separate CodePipeline instances: one for infrastructure deployment and the other for backend deployment and testing. The infrastructure pipeline is responsible for deploying the AWS resources and using AWS CDK to update them as necessary. The backend pipeline is responsible for deploying the code and running tests, and is triggered when a new commit is made to the repository. Both pipelines are integrated with AWS CodeBuild for building and testing, and with AWS CodeDeploy for deployment.

![cicd-pipelines](https://disgrafic-product-bucket-sand.s3.us-east-2.amazonaws.com/varios/cicdpipeline-hashibis.png)
