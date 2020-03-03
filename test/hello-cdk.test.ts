import {expect as expectCDK, matchTemplate, MatchStyle} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import HelloCdk = require('../lib/hello-cdk-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new HelloCdk.HelloCdkStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
        "Resources": {
            "MyFirstBucketB8884501": {
                "Type": "AWS::S3::Bucket",
                "Properties": {
                    "VersioningConfiguration": {
                        "Status": "Enabled"
                    }
                },
                "UpdateReplacePolicy": "Retain",
                "DeletionPolicy": "Retain"
            }
        }
    }, MatchStyle.EXACT))
});
