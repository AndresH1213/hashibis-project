#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraPipelineStack } from '../lib/infra-pipeline-stack';
import { getStackNameWithPrefix, validateEnvironment } from '../util';
import * as dotenv from 'dotenv';
import { ApiGatewayStack } from '../lib/api-gateway-stack';
import { validateEnvironmentVariables } from '../util/bootstrap';
import { DynamoStack } from '../lib/dynamo-stack';
import { PermissionStack } from '../lib/permissions-stack';

dotenv.config();
validateEnvironmentVariables();

const app = new cdk.App();

const stage = app.node.tryGetContext('env');

const { account, region } = validateEnvironment(stage);

// new InfraPipelineStack(app, 'InfraStack', {
//   env: { account, region },
//   stage,
//   name: getStackNameWithPrefix(`infra-pipeline-${stage}`),
//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });

new ApiGatewayStack(app, `apigateway-${stage}`, {
  stage,
  name: getStackNameWithPrefix(`apigateway-${stage}`),
  env: { account, region },
});

const dynamoStack = new DynamoStack(app, `dynamo-${stage}`, {
  stage,
  name: getStackNameWithPrefix(`dynamo-${stage}`),
  env: { account, region },
});

new PermissionStack(app, `permission-${stage}`, {
  stage,
  name: getStackNameWithPrefix(`permission-${stage}`),
  env: { account, region },
  stacks: {
    dynamo: dynamoStack,
  },
});
