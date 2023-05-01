import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { getResourceNameWithPrefix } from '../../util';
import { CfnAuthorizer, CfnApi } from 'aws-cdk-lib/aws-apigatewayv2';
import { BasicStackProps } from '../../interfaces';

export class CognitoAuthorizer {
  private scope: Construct;
  private api: CfnApi;
  private props: BasicStackProps;

  public userPool: UserPool;
  public userPoolClient: UserPoolClient;
  public authorizer: CfnAuthorizer;

  constructor(scope: Construct, api: CfnApi, props: BasicStackProps) {
    this.scope = scope;
    this.props = props;
    this.api = api;
    this.initialize();
  }

  private initialize() {
    this.createUserPool();
    this.addUserPoolClient();
    this.createAuthorizer();
  }

  private createUserPool() {
    this.userPool = new UserPool(this.scope, 'HashibisUserPool', {
      userPoolName: getResourceNameWithPrefix(`user-pool-${this.props.stage}`),
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
        email: true,
      },
    });

    new CfnOutput(this.scope, 'HashibisUserPoolId', {
      value: this.userPool.userPoolId,
    });
  }

  private addUserPoolClient() {
    this.userPoolClient = this.userPool.addClient('HashibisUserPoolClient', {
      userPoolClientName: getResourceNameWithPrefix(`user-pool-client-${this.props.stage}`),
      generateSecret: false,
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        userSrp: true,
      },
    });
    new CfnOutput(this.scope, 'HashibisUserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
    });
  }

  private createAuthorizer() {
    this.authorizer = new CfnAuthorizer(this.scope, 'HashibisApiAuthorizer', {
      name: getResourceNameWithPrefix(`authorizer-${this.props.stage}`),
      apiId: this.api.ref,
      authorizerType: 'JWT',
      identitySource: ['$request.header.Authorization'],
      jwtConfiguration: {
        audience: [this.userPoolClient.userPoolClientId],
        issuer: `https://cognito-idp.${this.props.env?.region}.amazonaws.com/${this.userPool.userPoolId}`,
      },
    });

    new CfnOutput(this.scope, 'HashibisAuthorizerId', {
      value: this.authorizer.ref,
      exportName: getResourceNameWithPrefix(`authorizer-id-${this.props.stage}`),
    });
  }
}
