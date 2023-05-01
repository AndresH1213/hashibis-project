import { CfnOutput, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PermissionStackProps } from '../interfaces';
import { DynamoStack } from './dynamo-stack';
import {
  Effect,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { getResourceNameWithPrefix } from '../util';

export class PermissionStack extends Stack {
  props: PermissionStackProps;
  dynamoStack: DynamoStack;
  dynamoPolicy: PolicyStatement;
  lambdaRole: Role;
  constructor(scope: Construct, id: string, props: PermissionStackProps) {
    super(scope, id, props);
    this.props = props;
    this.dynamoStack = props.stacks.dynamo;
    this.dynamoPolicy = this.createDynamoPolicy();
    this.lambdaRole = this.createLambdaRole();

    this.outputValues();
  }

  private createDynamoPolicy() {
    return new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['dynamodb:*'],
      resources: [
        this.dynamoStack.medicalHistoryTable.tableArn,
        `${this.dynamoStack.medicalHistoryTable.tableArn}/index/*`,
        this.dynamoStack.personalInformationTable.tableArn,
        `${this.dynamoStack.personalInformationTable.tableArn}/index/*`,
        this.dynamoStack.productTable.tableArn,
        `${this.dynamoStack.productTable.tableArn}/index/*`,
        this.dynamoStack.orderTable.tableArn,
        `${this.dynamoStack.orderTable.tableArn}/index/*`,
      ],
    });
  }

  private createLambdaRole() {
    const invokeLambdasPolicy = new PolicyStatement({
      resources: [
        `arn:aws:lambda:${this.props.env?.region}:${
          this.props.env?.account
        }:function:${getResourceNameWithPrefix('*')}`,
      ],
      actions: ['lambda:InvokeFunction'],
    });

    return new Role(this, 'LambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
      inlinePolicies: {
        [getResourceNameWithPrefix(`lambda-role-policy-${this.props.stage}`)]: new PolicyDocument({
          statements: [this.dynamoPolicy, invokeLambdasPolicy],
        }),
      },
    });
  }

  private outputValues() {
    new CfnOutput(this, 'LambdaRoleArn', {
      value: this.lambdaRole.roleArn,
      exportName: getResourceNameWithPrefix(`lambda-role-arn-${this.props.stage}`),
    });
  }
}
