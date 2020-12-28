#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SkynetCdkDemoStack } from '../lib/skynet-cdk-demo-stack';

const app = new cdk.App();
new SkynetCdkDemoStack(app, 'SkynetCdkDemoStack');
