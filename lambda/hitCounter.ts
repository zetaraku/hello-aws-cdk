import * as AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  // read environment variables provided by Lambda function
  const counterTableName = process.env.COUNTER_TABLE_NAME!;
  const targetFunctionName = process.env.TARGET_FUNCTION_NAME!;

  // create AWS SDK clients
  const dynamo = new AWS.DynamoDB();
  const lambda = new AWS.Lambda();

  // update DynamoDB entry
  await dynamo
    .updateItem({
      TableName: counterTableName,
      Key: {
        path: { S: event.path },
      },
      UpdateExpression: `
        ADD hits :n
      `,
      ExpressionAttributeValues: {
        ':n': { N: '1' },
      },
    })
    .promise();

  // call target function with forwarded payload and capture response
  const response = await lambda
    .invoke({
      FunctionName: targetFunctionName,
      Payload: JSON.stringify(event),
    })
    .promise();

  // return response back to upstream caller
  return JSON.parse(response.Payload as string);
};
