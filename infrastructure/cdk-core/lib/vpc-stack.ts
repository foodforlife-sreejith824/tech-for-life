import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cdk from 'aws-cdk-lib';
import * as param from '../props/params.json'
import { Construct } from 'constructs';

export class VPCStack extends cdk.Stack {
    readonly vpc: ec2.Vpc;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.vpc = new ec2.Vpc(this, 'techforlife-vpc', {
            ipAddresses: ec2.IpAddresses.cidr(param.vpc_cidr),
            vpcName: param.prefix.concat('-vpc'),
            natGateways: 1,
            maxAzs: 1,
            subnetConfiguration: [
                {
                    name: param.prefix.concat('-private-subnet-1'),
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24,
                },
                {
                    name: param.prefix.concat('-public-subnet-1'),
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24,
                }
            ],
        });

        new cdk.CfnOutput(this, 'VpcId', {
            value: this.vpc.vpcId,
            description: 'The VPC ID',
            exportName: param.prefix.concat('-vpcId'),
        });
        new cdk.CfnOutput(this, 'PublicSubnetIds', {
            value: this.vpc.publicSubnets.map(subnet => subnet.subnetId).join(','),
        });
        new cdk.CfnOutput(this, 'PrivateSubnetIds', {
            value: this.vpc.privateSubnets.map(subnet => subnet.subnetId).join(','),
        });
        new cdk.CfnOutput(this, 'AvailabilityZones', {
            value: this.vpc.availabilityZones.join(','),
        });

    }
}