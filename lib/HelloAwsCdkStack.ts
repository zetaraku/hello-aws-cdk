import * as CDK from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { TableViewer } from 'cdk-dynamo-table-viewer';
import { HitCounter } from './HitCounter';

export class HelloAwsCdkStack extends CDK.Stack {
  /**
   * The url of the hello api.
   */
  public readonly helloApiUrl: CDK.CfnOutput;

  /**
   * The url of the hit counter table viewer.
   */
  public readonly hitCounterTableViewerUrl: CDK.CfnOutput;

  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    const helloFunction = new CDK.aws_lambda_nodejs.NodejsFunction(this, 'HelloFunction', {
      runtime: CDK.aws_lambda.Runtime.NODEJS_18_X,
      entry: 'lambda/hello.ts',
      handler: 'handler',
    });

    const hitCounter = new HitCounter(this, 'HitCounter', {
      targetFunction: helloFunction,
    });

    const helloApi = new CDK.aws_apigateway.LambdaRestApi(this, 'HelloApi', {
      handler: hitCounter.handlerFunction,
    });

    const hitCounterTableViewer = new TableViewer(this, 'HitCounterTableViewer', {
      title: 'Hit Counts',
      table: hitCounter.counterTable,
      sortBy: '-hits',
    });

    const helloApiUrl = new CDK.CfnOutput(this, 'HelloApiUrl', {
      value: helloApi.url,
    });

    const hitCounterTableViewerUrl = new CDK.CfnOutput(this, 'HitCounterTableViewerUrl', {
      value: hitCounterTableViewer.endpoint,
    });

    this.helloApiUrl = helloApiUrl;
    this.hitCounterTableViewerUrl = hitCounterTableViewerUrl;
  }
}
