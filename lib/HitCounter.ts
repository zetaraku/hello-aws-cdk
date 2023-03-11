import * as CDK from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class HitCounter extends Construct {
  /**
   * The function that wraps the `targetFunction` with hit counter.
   */
  public readonly handlerFunction: CDK.aws_lambda.Function;

  /**
   * The table that stores the hit counts for the `targetFunction`.
   */
  public readonly counterTable: CDK.aws_dynamodb.Table;

  constructor(scope: Construct, id: string, props: {
    /**
     * The function to be wrapped with hit counter.
     */
    targetFunction: CDK.aws_lambda.IFunction;
  }) {
    super(scope, id);

    const targetFunction = props.targetFunction;

    const counterTable = new CDK.aws_dynamodb.Table(this, 'CounterTable', {
      partitionKey: {
        name: 'path',
        type: CDK.aws_dynamodb.AttributeType.STRING,
      },
      removalPolicy: CDK.RemovalPolicy.DESTROY,
    });

    const handlerFunction = new CDK.aws_lambda_nodejs.NodejsFunction(this, 'HandlerFunction', {
      runtime: CDK.aws_lambda.Runtime.NODEJS_18_X,
      entry: 'lambda/hitCounter.ts',
      handler: 'handler',
      environment: {
        COUNTER_TABLE_NAME: counterTable.tableName,
        TARGET_FUNCTION_NAME: targetFunction.functionName,
      },
    });

    // grant `handlerFunction` read/write permissions to `counterTable`
    counterTable.grantReadWriteData(handlerFunction);

    // grant `handlerFunction` invoke permissions to `targetFunction`
    targetFunction.grantInvoke(handlerFunction);

    this.handlerFunction = handlerFunction;
    this.counterTable = counterTable;
  }
}
