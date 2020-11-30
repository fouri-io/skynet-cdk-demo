#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FouriCdkDemoStack } from '../lib/fouri-cdk-demo-stack';

const app = new cdk.App();
new FouriCdkDemoStack(app, 'FouriCdkDemoStack');
