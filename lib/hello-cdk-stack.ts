import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import {BillingMode} from "@aws-cdk/aws-dynamodb/lib/table";

/**
 * The main stack
 */
export class HelloCdkStack extends cdk.Stack {
  /**
   * constructor
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps} props
   */
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new s3.Bucket(this, 'MyFirstBucket', {
      bucketName: `tonyl-hello-cdk-${this.account}-${this.region}`,
      versioned: true,
    });

    new dynamodb.Table(this, 'MyFirstTable', {
      tableName: 'MyFirstTable',
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });
  }
}
