import * as CDK from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HelloAwsCdkStack } from '../HelloAwsCdkStack';

export class HelloAwsCdkStackDeployStage extends CDK.Stage {
  constructor(scope: Construct, id: string, props?: CDK.StageProps) {
    super(scope, id, props);

    const stack = new HelloAwsCdkStack(this, 'HelloAwsCdkStack');
  }
}
