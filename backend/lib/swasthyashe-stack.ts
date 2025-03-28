import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ses from 'aws-cdk-lib/aws-ses';
import { Construct } from 'constructs';

export class SwasthyasheStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table for Email Subscriptions
    const subscriptionsTable = new dynamodb.Table(this, 'Subscriptions', {
      partitionKey: { name: 'email', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production
    });

    // Lambda Function for Subscription Handler
    const subscriptionHandler = new lambda.Function(this, 'SubscriptionHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'subscription.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        TABLE_NAME: subscriptionsTable.tableName, // Pass DynamoDB table name as an environment variable
        NOTIFICATION_EMAIL: 'siddadeepika@gmail.com', // Replace with your email
      },
    });

    // Grant Lambda permissions to DynamoDB and SES
    subscriptionsTable.grantWriteData(subscriptionHandler);
    subscriptionHandler.addToRolePolicy(new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*'], // Scope this down in production
    }));

    // API Gateway REST API
    const api = new apigateway.RestApi(this, 'SwasthyasheApi', {
      restApiName: 'Swasthyashe API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // API Gateway Integration
    const subscriptionIntegration = new apigateway.LambdaIntegration(subscriptionHandler);
    api.root.addResource('subscribe').addMethod('POST', subscriptionIntegration);
  }
}
