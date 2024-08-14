import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as param from '../props/params.json'
import { Construct } from 'constructs';
import console = require('console');

export class EKSStack extends Stack {
    constructor(scope: Construct, id: string, vpc: ec2.Vpc, props?: cdk.StackProps) {
        super(scope, id, props);
        // Create an EKS cluster
        const cluster = new eks.Cluster(this, param.prefix.concat('-eks'), {
            vpc: vpc,
            defaultCapacity: 0, // We don't want to create EC2 worker nodes
            version: eks.KubernetesVersion.V1_27,
            albController: {
                version: eks.AlbControllerVersion.V2_6_2,
            }
        });

        // Add Fargate profiles
        cluster.addFargateProfile('FargateProfile', {
            selectors: [
                { namespace: 'default' },
                { namespace: 'kube-system' },
            ],
            vpc
        });
    }
}
