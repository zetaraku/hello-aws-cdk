import * as CDK from 'aws-cdk-lib';
import { HitCounter }  from '../lib/HitCounter';

test('HitCounter construct', () => {
  const stack = new CDK.Stack();

  const testHelloFunction = new CDK.aws_lambda_nodejs.NodejsFunction(stack, 'TestHelloFunction', {
    runtime: CDK.aws_lambda.Runtime.NODEJS_18_X,
    entry: 'lambda/hello.ts',
    handler: 'handler',
  });
  const testHitCounter = new HitCounter(stack, 'TestHitCounter', {
    targetFunction: testHelloFunction,
  });

  const template = CDK.assertions.Template.fromStack(stack);

  template.resourceCountIs('AWS::DynamoDB::Table', 1);
});
