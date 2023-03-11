import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const {
    httpMethod: method,
    resource: resourcePath,
    path,
    pathParameters: params,
    queryStringParameters: query,
    headers,
    body,
  } = event;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      method,
      path,
      message: 'Hello world!',
    }),
  };
};
