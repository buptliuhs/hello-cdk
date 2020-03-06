#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {HelloCdkStack} from '../lib/hello-cdk-stack';

const props: cdk.StackProps = {
  tags: {
    Owner: 'Tony Liu',
    Email: 'buptliuhs@gmail.com',
  }
};

const app = new cdk.App();
new HelloCdkStack(app, 'HelloCdkStack', props);
