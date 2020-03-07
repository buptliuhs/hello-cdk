import {MatchStyle, expect as expectCDK, matchTemplate} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import HelloCdk = require('../lib/hello-cdk-stack');

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new HelloCdk.HelloCdkStack(app, 'HelloCdkStack');
  // THEN
  const stackJson = require('./data/hello-cdk');
  expectCDK(stack).to(matchTemplate(stackJson, MatchStyle.EXACT));
});
