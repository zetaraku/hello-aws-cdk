import * as CDK from 'aws-cdk-lib';
import { HelloAwsCdkStack } from '../lib/HelloAwsCdkStack';

test('HelloAwsCdkStack construct', () => {
  const app = new CDK.App();
  const stack = new HelloAwsCdkStack(app, 'TestHelloAwsCdkStack');
  const template = CDK.assertions.Template.fromStack(stack);

  template.hasResource('AWS::Lambda::Function', {});
  template.hasResource('AWS::ApiGateway::RestApi', {});
});
