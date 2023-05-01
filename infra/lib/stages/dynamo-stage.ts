import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';

import { BasicStackProps } from '../../interfaces';
import * as Util from '../../util';
import { DynamoStack } from '../dynamo-stack';

export class DynamoStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: BasicStackProps) {
    super(scope, id, props);

    new DynamoStack(this, `dynamo-${props?.stage}`, {
      env: {
        region: props?.env?.region,
        account: props?.env?.account,
      },
      stage: props?.stage || 'dev',
      name: Util.getStackNameWithPrefix(`dynamo-${props?.stage}`),
    });
  }
}
