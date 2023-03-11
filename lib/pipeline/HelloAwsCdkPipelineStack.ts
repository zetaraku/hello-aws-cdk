import * as CDK from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HelloAwsCdkStackDeployStage } from './HelloAwsCdkStackDeployStage';

export class HelloAwsCdkPipelineStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    const gitRepository = new CDK.aws_codecommit.Repository(this, 'GitRepository', {
      repositoryName: 'hello-aws-cdk',
    });

    const mainPipeline = new CDK.pipelines.CodePipeline(this, 'MainPipeline', {
      pipelineName: 'hello-aws-cdk-pipeline',
      synth: new CDK.pipelines.CodeBuildStep('Synth', {
        input: CDK.pipelines.CodePipelineSource.codeCommit(gitRepository, 'master'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    const deploymentStage = new HelloAwsCdkStackDeployStage(this, 'Deploy');

    mainPipeline.addStage(deploymentStage);
  }
}
