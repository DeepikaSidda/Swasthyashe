"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwasthyasheStack = void 0;
const cdk = require("aws-cdk-lib");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigateway = require("aws-cdk-lib/aws-apigateway");
class SwasthyasheStack extends cdk.Stack {
    constructor(scope, id, props) {
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
exports.SwasthyasheStack = SwasthyasheStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhc3RoeWFzaGUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvc3dhc3RoeWFzaGUtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLHFEQUFxRDtBQUNyRCxpREFBaUQ7QUFDakQseURBQXlEO0FBSXpELE1BQWEsZ0JBQWlCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDN0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qix5Q0FBeUM7UUFDekMsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNuRSxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUNwRSxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxlQUFlO1lBQ2pELGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxpQ0FBaUM7U0FDNUUsQ0FBQyxDQUFDO1FBRUgsMkNBQTJDO1FBQzNDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUMzRSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxXQUFXLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxzREFBc0Q7Z0JBQ2hHLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLDBCQUEwQjthQUN6RTtTQUNGLENBQUMsQ0FBQztRQUVILCtDQUErQztRQUMvQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN2RCxtQkFBbUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztZQUNsRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSztZQUNoQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUM7WUFDOUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsZ0NBQWdDO1NBQ25ELENBQUMsQ0FBQyxDQUFDO1FBRUosdUJBQXVCO1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDekQsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QiwyQkFBMkIsRUFBRTtnQkFDM0IsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDekMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVzthQUMxQztTQUNGLENBQUMsQ0FBQztRQUVILDBCQUEwQjtRQUMxQixNQUFNLHVCQUF1QixHQUFHLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdEYsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FDRjtBQTNDRCw0Q0EyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSAnYXdzLWNkay1saWIvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgc2VzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZXMnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBTd2FzdGh5YXNoZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gRHluYW1vREIgVGFibGUgZm9yIEVtYWlsIFN1YnNjcmlwdGlvbnNcbiAgICBjb25zdCBzdWJzY3JpcHRpb25zVGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywgJ1N1YnNjcmlwdGlvbnMnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ2VtYWlsJywgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcbiAgICAgIGJpbGxpbmdNb2RlOiBkeW5hbW9kYi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLCAvLyBOT1QgcmVjb21tZW5kZWQgZm9yIHByb2R1Y3Rpb25cbiAgICB9KTtcblxuICAgIC8vIExhbWJkYSBGdW5jdGlvbiBmb3IgU3Vic2NyaXB0aW9uIEhhbmRsZXJcbiAgICBjb25zdCBzdWJzY3JpcHRpb25IYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnU3Vic2NyaXB0aW9uSGFuZGxlcicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgaGFuZGxlcjogJ3N1YnNjcmlwdGlvbi5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBUQUJMRV9OQU1FOiBzdWJzY3JpcHRpb25zVGFibGUudGFibGVOYW1lLCAvLyBQYXNzIER5bmFtb0RCIHRhYmxlIG5hbWUgYXMgYW4gZW52aXJvbm1lbnQgdmFyaWFibGVcbiAgICAgICAgTk9USUZJQ0FUSU9OX0VNQUlMOiAnc2lkZGFkZWVwaWthQGdtYWlsLmNvbScsIC8vIFJlcGxhY2Ugd2l0aCB5b3VyIGVtYWlsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gR3JhbnQgTGFtYmRhIHBlcm1pc3Npb25zIHRvIER5bmFtb0RCIGFuZCBTRVNcbiAgICBzdWJzY3JpcHRpb25zVGFibGUuZ3JhbnRXcml0ZURhdGEoc3Vic2NyaXB0aW9uSGFuZGxlcik7XG4gICAgc3Vic2NyaXB0aW9uSGFuZGxlci5hZGRUb1JvbGVQb2xpY3kobmV3IGNkay5hd3NfaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBlZmZlY3Q6IGNkay5hd3NfaWFtLkVmZmVjdC5BTExPVyxcbiAgICAgIGFjdGlvbnM6IFsnc2VzOlNlbmRFbWFpbCcsICdzZXM6U2VuZFJhd0VtYWlsJ10sXG4gICAgICByZXNvdXJjZXM6IFsnKiddLCAvLyBTY29wZSB0aGlzIGRvd24gaW4gcHJvZHVjdGlvblxuICAgIH0pKTtcblxuICAgIC8vIEFQSSBHYXRld2F5IFJFU1QgQVBJXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCAnU3dhc3RoeWFzaGVBcGknLCB7XG4gICAgICByZXN0QXBpTmFtZTogJ1N3YXN0aHlhc2hlIEFQSScsXG4gICAgICBkZWZhdWx0Q29yc1ByZWZsaWdodE9wdGlvbnM6IHtcbiAgICAgICAgYWxsb3dPcmlnaW5zOiBhcGlnYXRld2F5LkNvcnMuQUxMX09SSUdJTlMsXG4gICAgICAgIGFsbG93TWV0aG9kczogYXBpZ2F0ZXdheS5Db3JzLkFMTF9NRVRIT0RTLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIEFQSSBHYXRld2F5IEludGVncmF0aW9uXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uSW50ZWdyYXRpb24gPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihzdWJzY3JpcHRpb25IYW5kbGVyKTtcbiAgICBhcGkucm9vdC5hZGRSZXNvdXJjZSgnc3Vic2NyaWJlJykuYWRkTWV0aG9kKCdQT1NUJywgc3Vic2NyaXB0aW9uSW50ZWdyYXRpb24pO1xuICB9XG59XG4iXX0=