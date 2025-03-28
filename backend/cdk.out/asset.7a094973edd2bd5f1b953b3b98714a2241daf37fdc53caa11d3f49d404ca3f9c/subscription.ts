import { DynamoDB } from 'aws-sdk';
import { SES } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodb = new DynamoDB.DocumentClient();
const ses = new SES();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No request body provided' }),
      };
    }

    const requestBody = JSON.parse(event.body);
    const { email } = requestBody;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    // Save to DynamoDB
    await dynamodb.put({
      TableName: 'SwasthyasheStack-Subscriptions1F71F6D8-15DZA3CE8TSHY',  // Updated table name
      Item: {
        email,
        subscriptionDate: new Date().toISOString(),
      },
    }).promise();

    // Send notification email
    await ses.sendEmail({
      Source: 'siddadeepika@gmail.com',  // Updated source email (SES verified email)
      Destination: {
        ToAddresses: ['siddadeepika@gmail.com'],  // The email to receive the notification
      },
      Message: {
        Subject: {
          Data: 'New Swasthyashe Subscription',
        },
        Body: {
          Text: {
            Data: `New subscription from: ${email}`,
          },
        },
      },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription successful' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
