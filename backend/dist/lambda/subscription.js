"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_ses_1 = require("@aws-sdk/client-ses");
// Initialize AWS SDK v3 clients
const dynamoClient = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new client_ses_1.SESClient({});
const handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "No request body provided" }),
            };
        }
        const requestBody = JSON.parse(event.body);
        const { email } = requestBody;
        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Email is required" }),
            };
        }
        const tableName = process.env.TABLE_NAME;
        if (!tableName) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Table name not found in environment variables" }),
            };
        }
        // Save to DynamoDB
        await docClient.send(new lib_dynamodb_1.PutCommand({
            TableName: tableName,
            Item: {
                email,
                subscriptionDate: new Date().toISOString(),
            },
        }));
        // Send notification email
        const emailParams = {
            Source: "siddadeepika@gmail.com", // SES verified email
            Destination: {
                ToAddresses: ["siddadeepika@gmail.com"], // The email to receive the notification
            },
            Message: {
                Subject: { Data: "New Swasthyashe Subscription" },
                Body: { Text: { Data: `New subscription from: ${email}` } },
            },
        };
        await sesClient.send(new client_ses_1.SendEmailCommand(emailParams));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Subscription successful" }),
        };
    }
    catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGFtYmRhL3N1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBMEQ7QUFDMUQsd0RBQTJFO0FBQzNFLG9EQUFrRTtBQUdsRSxnQ0FBZ0M7QUFDaEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sU0FBUyxHQUFHLHFDQUFzQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1RCxNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFN0IsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQTJCLEVBQWtDLEVBQUU7SUFDM0YsSUFBSSxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQixPQUFPO2dCQUNMLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLENBQUM7YUFDOUQsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsV0FBVyxDQUFDO1FBRTlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQzthQUN2RCxDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsK0NBQStDLEVBQUUsQ0FBQzthQUNuRixDQUFDO1FBQ0osQ0FBQztRQUVELG1CQUFtQjtRQUNuQixNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQ2xCLElBQUkseUJBQVUsQ0FBQztZQUNiLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLElBQUksRUFBRTtnQkFDSixLQUFLO2dCQUNMLGdCQUFnQixFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFO2FBQzNDO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFFRiwwQkFBMEI7UUFDMUIsTUFBTSxXQUFXLEdBQUc7WUFDbEIsTUFBTSxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQjtZQUN2RCxXQUFXLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLENBQUMsd0JBQXdCLENBQUMsRUFBRSx3Q0FBd0M7YUFDbEY7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLDhCQUE4QixFQUFFO2dCQUNqRCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEtBQUssRUFBRSxFQUFFLEVBQUU7YUFDNUQ7U0FDRixDQUFDO1FBRUYsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksNkJBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUV4RCxPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxDQUFDO1NBQzdELENBQUM7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9CLE9BQU87WUFDTCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7U0FDM0QsQ0FBQztJQUNKLENBQUM7QUFDSCxDQUFDLENBQUM7QUEvRFcsUUFBQSxPQUFPLFdBK0RsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IER5bmFtb0RCQ2xpZW50IH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1keW5hbW9kYlwiO1xuaW1wb3J0IHsgRHluYW1vREJEb2N1bWVudENsaWVudCwgUHV0Q29tbWFuZCB9IGZyb20gXCJAYXdzLXNkay9saWItZHluYW1vZGJcIjtcbmltcG9ydCB7IFNFU0NsaWVudCwgU2VuZEVtYWlsQ29tbWFuZCB9IGZyb20gXCJAYXdzLXNkay9jbGllbnQtc2VzXCI7XG5pbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcblxuLy8gSW5pdGlhbGl6ZSBBV1MgU0RLIHYzIGNsaWVudHNcbmNvbnN0IGR5bmFtb0NsaWVudCA9IG5ldyBEeW5hbW9EQkNsaWVudCh7fSk7XG5jb25zdCBkb2NDbGllbnQgPSBEeW5hbW9EQkRvY3VtZW50Q2xpZW50LmZyb20oZHluYW1vQ2xpZW50KTtcbmNvbnN0IHNlc0NsaWVudCA9IG5ldyBTRVNDbGllbnQoe30pO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnQpOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4ge1xuICB0cnkge1xuICAgIGlmICghZXZlbnQuYm9keSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6IFwiTm8gcmVxdWVzdCBib2R5IHByb3ZpZGVkXCIgfSksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gSlNPTi5wYXJzZShldmVudC5ib2R5KTtcbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXF1ZXN0Qm9keTtcblxuICAgIGlmICghZW1haWwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiBcIkVtYWlsIGlzIHJlcXVpcmVkXCIgfSksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LlRBQkxFX05BTUU7XG4gICAgaWYgKCF0YWJsZU5hbWUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiBcIlRhYmxlIG5hbWUgbm90IGZvdW5kIGluIGVudmlyb25tZW50IHZhcmlhYmxlc1wiIH0pLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBTYXZlIHRvIER5bmFtb0RCXG4gICAgYXdhaXQgZG9jQ2xpZW50LnNlbmQoXG4gICAgICBuZXcgUHV0Q29tbWFuZCh7XG4gICAgICAgIFRhYmxlTmFtZTogdGFibGVOYW1lLFxuICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgZW1haWwsXG4gICAgICAgICAgc3Vic2NyaXB0aW9uRGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gU2VuZCBub3RpZmljYXRpb24gZW1haWxcbiAgICBjb25zdCBlbWFpbFBhcmFtcyA9IHtcbiAgICAgIFNvdXJjZTogXCJzaWRkYWRlZXBpa2FAZ21haWwuY29tXCIsIC8vIFNFUyB2ZXJpZmllZCBlbWFpbFxuICAgICAgRGVzdGluYXRpb246IHtcbiAgICAgICAgVG9BZGRyZXNzZXM6IFtcInNpZGRhZGVlcGlrYUBnbWFpbC5jb21cIl0sIC8vIFRoZSBlbWFpbCB0byByZWNlaXZlIHRoZSBub3RpZmljYXRpb25cbiAgICAgIH0sXG4gICAgICBNZXNzYWdlOiB7XG4gICAgICAgIFN1YmplY3Q6IHsgRGF0YTogXCJOZXcgU3dhc3RoeWFzaGUgU3Vic2NyaXB0aW9uXCIgfSxcbiAgICAgICAgQm9keTogeyBUZXh0OiB7IERhdGE6IGBOZXcgc3Vic2NyaXB0aW9uIGZyb206ICR7ZW1haWx9YCB9IH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBhd2FpdCBzZXNDbGllbnQuc2VuZChuZXcgU2VuZEVtYWlsQ29tbWFuZChlbWFpbFBhcmFtcykpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJTdWJzY3JpcHRpb24gc3VjY2Vzc2Z1bFwiIH0pLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KSxcbiAgICB9O1xuICB9XG59O1xuIl19