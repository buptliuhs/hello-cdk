import {Construct, RemovalPolicy, Stack, StackProps} from "@aws-cdk/core";
import {AttributeType, BillingMode, Table} from "@aws-cdk/aws-dynamodb";
import {Bucket} from "@aws-cdk/aws-s3";

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

    // The code that defines your stack goes here
    new Bucket(this, 'MyFirstBucket', {
      bucketName: `tonyl-hello-cdk-${this.account}-${this.region}`,
      versioned: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    new Table(this, 'MyFirstTable', {
      tableName: 'MyFirstTable',
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }
}
