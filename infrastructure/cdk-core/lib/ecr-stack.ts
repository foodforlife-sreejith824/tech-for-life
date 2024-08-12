import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as cdk from 'aws-cdk-lib';
import * as param from '../props/params.json'
import { Construct } from 'constructs';

export class ECRStack extends cdk.Stack {
    readonly repo: ecr.Repository;
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.repo = new ecr.Repository(this, 'Repo', {
            imageScanOnPush: true,
          });

        new cdk.CfnOutput(this, 'ecrUrl', {
            value: this.repo.repositoryUri,
            description: 'ECR URL',
            exportName: param.prefix.concat('-ecrUrl'),
        });

    }
}