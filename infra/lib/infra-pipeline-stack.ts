import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { BasicStackProps } from '../interfaces';
import { getResourceNameWithPrefix, getGithubBranchName } from '../util';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { ApiGatewayStage } from './stages/api-gateway-stage';
import { DynamoStage } from './stages/dynamo-stage';

export class InfraPipelineStack extends cdk.Stack {
  private pipeline: pipelines.CodePipeline;

  constructor(scope: Construct, id: string, props: BasicStackProps) {
    super(scope, id, props);

    this.createPipeline(props);
  }

  private createPipeline(props: BasicStackProps) {
    const gitHubOwner = process.env.GITHUB_OWNER;
    const gitHubInfra = process.env.GITHUB_REPO_INFRA;
    this.pipeline = new pipelines.CodePipeline(this, 'InfraPipeline', {
      pipelineName: getResourceNameWithPrefix(`infra-pipeline-${props.stage}`),
      codeBuildDefaults: {
        buildEnvironment: {
          environmentVariables: {
            ENV: { value: props.stage },
            AWS_ACCOUNT_ID: { value: props.env?.account },
            AWS_REGION_ID: { value: props.env?.region },
          },
        },
      },
      selfMutation: true,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub(
          `${gitHubOwner}/${gitHubInfra}}`,
          getGithubBranchName(props.stage),
          {
            authentication: cdk.SecretValue.secretsManager(
              getResourceNameWithPrefix(`general-secret-${props.stage}`),
              {
                jsonField: 'GitHubToken',
              }
            ),
          }
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    const baseResourcesWave = this.pipeline.addWave('BaseResources');

    baseResourcesWave.addStage(new ApiGatewayStage(this, 'ApiGwStage', props));
    baseResourcesWave.addStage(new DynamoStage(this, 'DynamoStage', props));

    this.pipeline.buildPipeline();
  }
}
