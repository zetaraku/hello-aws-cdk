import * as CDK from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class HelloAwsCdkStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);
  }
}
