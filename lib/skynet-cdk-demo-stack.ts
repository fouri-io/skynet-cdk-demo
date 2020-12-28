import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as iam from "@aws-cdk/aws-iam";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";

export class SkynetCdkDemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "FouriVPC", {
      maxAzs: 3, // Default is all AZs in region
      cidr: "10.0.0.0/24"
    });

    const cluster = new ecs.Cluster(this, "SkynetCluster", {
      vpc: vpc,
      clusterName: "skynet-demo"
    });

     // Create a role where permissions can be granted
    const taskRole = new iam.Role(this, "SkynetTaskWorkerRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "SkynetFargateService", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 6, // Default is 1
      taskImageOptions: { 
        image: ecs.ContainerImage.fromRegistry("fouri/skynet"),
        containerName: "skynet-container",
        enableLogging: true,
        taskRole: taskRole,
        containerPort: 4000
      },
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: true, // Default is false
      listenerPort: 4000
    });

    // Build DynamoDB Infrastructure
   const tableName = 'skynet';

   const table =  new dynamodb.Table(this, "SkynetTable", {
        tableName,
        partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
        sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
        removalPolicy: cdk.RemovalPolicy.DESTROY
   });

   table.grantReadWriteData(taskRole);

  }
}
