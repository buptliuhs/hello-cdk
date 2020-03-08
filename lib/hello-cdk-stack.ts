import * as path from "path";
import {Construct, Duration, RemovalPolicy, Stack, StackProps} from "@aws-cdk/core";
import {AttributeType, BillingMode, Table} from "@aws-cdk/aws-dynamodb";
import {Bucket} from "@aws-cdk/aws-s3";
import {Queue} from "@aws-cdk/aws-sqs";
import {Code, Function, LogRetention, Runtime} from "@aws-cdk/aws-lambda";
import {SqsEventSource} from "@aws-cdk/aws-lambda-event-sources";
import {LogGroup, RetentionDays} from "@aws-cdk/aws-logs";

/**
 * The main stack
 */
export class HelloCdkStack extends Stack {
  /**
   * constructor
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps} props
   */
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // S3 Bucket
    const bucket = new Bucket(this, "MyFirstBucket", {
      bucketName: `tonyl-hello-cdk-${this.account}-${this.region}`,
      removalPolicy: RemovalPolicy.DESTROY, // or RETAIN
      versioned: true,
    });

    // DynamoDB Table
    const table = new Table(this, "MyFirstTable", {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY, // or RETAIN
      tableName: "MyFirstTable",
    });
    // DLQ
    const dlq = new Queue(this, "MyFirstDLQ", {
      queueName: "MyFirstDLQ",
      retentionPeriod: Duration.days(7),
    });
    // SQS
    const queue = new Queue(this, "MyFirstQueue", {
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: dlq,
      },
      queueName: "MyFirstQueue",
      visibilityTimeout: Duration.seconds(10),
    });
    // Lambda
    const lambda = new Function(this, "MyFirstFunction", {
      code: Code.fromAsset(path.join(`${__dirname}/../functions/message_handler`)),
      deadLetterQueue: dlq,
      events: [
        new SqsEventSource(queue, {
          batchSize: 1,
        }),
      ],
      functionName: "MyFirstFunction",
      handler: "index.handler",
      memorySize: 128,
      runtime: Runtime.NODEJS_10_X,
      timeout: Duration.seconds(10),
    });
    const logGroup = new LogGroup(this, "MyFirstFunctionLogGroup", {
      logGroupName: `/aws/lambda/${lambda.functionName}`,
      removalPolicy: RemovalPolicy.DESTROY,
      retention: RetentionDays.ONE_WEEK,
    });
  }
}
