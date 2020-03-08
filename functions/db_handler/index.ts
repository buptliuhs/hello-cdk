import {Context, DynamoDBStreamEvent} from "aws-lambda";

exports.handler = async (event: DynamoDBStreamEvent, context: Context) => {
  for (const record of event.Records) {
    console.log(`Record: ${JSON.stringify(record)}`);
  }
};
