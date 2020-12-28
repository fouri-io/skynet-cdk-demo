# Welcome to Skynet CDK Demo
#### Prerequisistes
* AWS Account with an IAM user with Infrastructure creation permissions
* AWS CLI Installed
* CDK Installed

After cloning repository, you will need to do an initial npm install to get npm packages
`npm install`

Now build the package, creating js files from the typescript
`npm run build`

Ok, now let's verify CDK and build our infrasturcture
`cdk synth`
`cdk deploy` // You will get a verification message, choose 'Y', hit enter to deploy

After all the installing is complete, you should see something like the following:
SkynetCdkDemoStack: deploying...
SkynetCdkDemoStack: creating CloudFormation changeset...
[██████████████████████████████████████████████████████████] (41/41)

You will also have some outputs giving you an http endpoint to hit:
Go ahead and try out your new service
`http://<your output address here>:4000/ping` // You should receive 'pong' back

Now let's go ahead and initialize Skynet and get it started on it's path towards global domination
```
http://<your output address here>:4000/initialize
http://<your output address here>:4000/missions
```
Now that we have stretched our legs, lets hit Dynamo and make sure all the plumbing is working
```
// Seed some info in Dynamo and retrieve it
http://<your output address here>:4000/seedTargets
http://<your output address here>:4000/targets
```

That is it, the entire stack is functioning -- VPC, Subnets, Fargate Containers, Dynamo Table, with all the plumbing.

