import * as CDK from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class HelloAwsCdkStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    const helloFunction = new CDK.aws_lambda_nodejs.NodejsFunction(this, 'HelloFunction', {
      runtime: CDK.aws_lambda.Runtime.NODEJS_18_X,
      entry: 'lambda/hello.ts',
      handler: 'handler',
    });

    const helloApi = new CDK.aws_apigateway.LambdaRestApi(this, 'HelloApi', {
      handler: helloFunction,
    });
  }
}
