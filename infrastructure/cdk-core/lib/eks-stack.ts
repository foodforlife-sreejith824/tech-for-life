import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as param from '../props/params.json'

export class EKSStack extends Stack {
    constructor(scope: cdk.App, id: string, props?: StackProps) {
        super(scope, id, props);

        // Look up the existing VPC by ID or name
    
        const vpc = ec2.Vpc.fromVpcAttributes(this, 'ImportedVpc', {
            vpcId: cdk.Fn.importValue('VpcId'),
            availabilityZones: cdk.Fn.split(',', cdk.Fn.importValue('AvailabilityZones')),
            publicSubnetIds: cdk.Fn.split(',', cdk.Fn.importValue('PublicSubnetIds'), 1),
            privateSubnetIds: cdk.Fn.split(',', cdk.Fn.importValue('PrivateSubnetIds'), 1),
          });

        // Define the subnets to use (private subnets)
        const privateSubnets = vpc.selectSubnets({
            subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        });

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
            subnetSelection : privateSubnets
        });
    }
}
