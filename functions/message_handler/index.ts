import {Context, SQSEvent} from "aws-lambda";

exports.handler = async (event: SQSEvent, context: Context) => {
  for (const record of event.Records) {
    console.log(`Record: ${record.body}`);
  }
};
