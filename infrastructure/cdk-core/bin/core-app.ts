#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VPCStack } from '../lib/vpc-stack';
import { ECRStack } from '../lib/ecr-stack';

const app = new cdk.App();
new VPCStack(app, 'VPCStack', {});
new ECRStack(app, 'ECRStack', {});