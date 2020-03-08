#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import {HelloCdkStack} from "../lib/hello-cdk-stack";

const props: cdk.StackProps = {
  tags: {
    Email: "buptliuhs@gmail.com",
    Owner: "Tony Liu",
    Stack: "Hello-CDK",
  },
};

const app = new cdk.App();
new HelloCdkStack(app, "HelloCdkStack", props);
