#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VPCStack } from '../lib/vpc-stack';
import { ECRStack } from '../lib/ecr-stack';
import { EKSStack } from '../lib/eks-stack';

const app = new cdk.App();
const vpcStack = new VPCStack(app, 'VPCStack', {});
const ecrStack = new ECRStack(app, 'ECRStack', {});
const eksStack = new EKSStack(app, 'EKSStack', {});
eksStack.addDependency(vpcStack)
eksStack.addDependency(ecrStack)
