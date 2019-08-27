// npm i -g aws-cdk

import kinesis = require('@aws-cdk/aws-kinesis');
import kinesisfirehose = require('@aws-cdk/aws-kinesisfirehose');
import athena = require('@aws-cdk/aws-athena');
import s3 = require('@aws-cdk/aws-s3');
import lambda = require('@aws-cdk/aws-lambda');
import iam = require('@aws-cdk/aws-iam');
import cdk = require('@aws-cdk/cdk');

class MyStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
        super(parent, name, props);

        const kinesisc5cff84 = new kinesis.CfnStream(this, 'kinesisc5cff84', {
            name: "anzwebinar",
            retentionPeriodHours: 24,
            streamEncryption: {
                encryptionType: "NONE"
            },
            shardCount: 1
        });

        const kinesis1001474 = new kinesisfirehose.CfnDeliveryStream(this, 'kinesis1001474', {
            deliveryStreamName: "anzwebinardelivery",
            deliveryStreamType: "KinesisStreamAsSource",
            kinesisStreamSourceConfiguration: {
                kinesisStreamARN: kinesisc5cff84.getAtt('Arn'),
                roleARN: "arn:aws:iam::805580953652:role/firehose_delivery_role"
            },
            s3DestinationConfiguration: {
                bucketARN: "arn:aws:s3:::anzwebinar2019",
                bufferingHints: {
                    sizeInMBs: 1,
                    intervalInSeconds: 60
                },
                cloudWatchLoggingOptions: {
                    enabled: true,
                    logGroupName: "/aws/kinesisfirehose/anzwebinardelivery",
                    logStreamName: "S3Delivery"
                },
                compressionFormat: "UNCOMPRESSED",
                encryptionConfiguration: {
                    noEncryptionConfig: "NoEncryption"
                },
                prefix: "userclicks/!{timestamp:YYYY}/!{timestamp:MM}/!{timestamp:dd}/",
                roleARN: "arn:aws:iam::805580953652:role/firehose_delivery_role"
            },
            extendedS3DestinationConfiguration: {
                bucketARN: "arn:aws:s3:::anzwebinar2019",
                bufferingHints: {
                    sizeInMBs: 1,
                    intervalInSeconds: 60
                },
                cloudWatchLoggingOptions: {
                    enabled: true,
                    logGroupName: "/aws/kinesisfirehose/anzwebinardelivery",
                    logStreamName: "S3Delivery"
                },
                compressionFormat: "UNCOMPRESSED",
                encryptionConfiguration: {
                    noEncryptionConfig: "NoEncryption"
                },
                prefix: "userclicks/!{timestamp:YYYY}/!{timestamp:MM}/!{timestamp:dd}/",
                roleARN: "arn:aws:iam::805580953652:role/firehose_delivery_role",
                processingConfiguration: {
                    enabled: true,
                    processors: [
                        {
                            type: "Lambda",
                            parameters: [
                                {
                                    parameterName: "LambdaArn",
                                    parameterValue: "arn:aws:lambda:us-west-2:805580953652:function:KinesisDelimiter:$LATEST"
                                },
                                {
                                    parameterName: "NumberOfRetries",
                                    parameterValue: "3"
                                },
                                {
                                    parameterName: "RoleArn",
                                    parameterValue: "arn:aws:iam::805580953652:role/firehose_delivery_role"
                                },
                                {
                                    parameterName: "BufferSizeInMBs",
                                    parameterValue: "1"
                                },
                                {
                                    parameterName: "BufferIntervalInSeconds",
                                    parameterValue: "60"
                                }
                            ]
                        }
                    ]
                },
                s3BackupMode: "Disabled"
            }
        });

        const athena36afefa = new athena.CfnNamedQuery(this, 'athena36afefa', {
            name: "AnzWebinarQuery",
            name: "AnzWebinarQuery",
            description: "creating a user action data view",
            description: "creating a user action data view",
            database: "userclicks",
            database: "userclicks",
            queryString: `CREATE OR REPLACE VIEW "user_action_data" AS
SELECT * FROM userclicks.user_clicks`,
            query: `CREATE OR REPLACE VIEW "user_action_data" AS
SELECT * FROM userclicks.user_clicks`
        });

        const s3dcf98ed = new s3.CfnBucket(this, 's3dcf98ed', {
            bucketName: "anzwebinar2019"
        });

        const lambda4192b8c = new lambda.CfnFunction(this, 'lambda4192b8c', {
            description: "An Amazon Kinesis Firehose stream processor that accesses the records in the input and returns them with a processing status.",
            functionName: "KinesisDelimiter",
            handler: "index.handler",
            code: {
                s3Bucket: "awslambda-us-west-2-tasks",
                s3Key: "/snapshots/805580953652/KinesisDelimiter-6731f4f9-e721-4f7e-a6b7-dc31da65d5df",
                s3ObjectVersion: "6VX0jYCX2nJlx3XgJFenkMcaYQbUOyJp"
            },
            memorySize: 128,
            role: "arn:aws:iam::805580953652:role/MythicalMysfitsStreamingS-MysfitsClicksProcessorRo-U74OV2E30VKM",
            runtime: "nodejs8.10",
            timeout: 60,
            tracingConfig: {
                mode: "PassThrough"
            }
        });

        const iam958cf9a = new iam.CfnRole(this, 'iam958cf9a', {
            path: "/",
            roleName: "firehose_delivery_role",
            assumeRolePolicyDocument: "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"firehose.amazonaws.com\"},\"Action\":\"sts:AssumeRole\",\"Condition\":{\"StringEquals\":{\"sts:ExternalId\":\"805580953652\"}}}]}",
            maxSessionDuration: 3600
        });

        const iamc087475 = new iam.CfnRole(this, 'iamc087475', {
            path: "/",
            roleName: "MythicalMysfitsStreamingS-MysfitsClicksProcessorRo-U74OV2E30VKM",
            assumeRolePolicyDocument: "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}",
            maxSessionDuration: 3600
        });

        new cdk.Output(this, 'kinesisc5cff84Ref', { value: kinesisc5cff84.ref, disableExport: true })
        new cdk.Output(this, 'kinesis1001474Ref', { value: kinesis1001474.ref, disableExport: true })
        new cdk.Output(this, 'athena36afefaRef', { value: athena36afefa.ref, disableExport: true })
        new cdk.Output(this, 's3dcf98edRef', { value: s3dcf98ed.ref, disableExport: true })
        new cdk.Output(this, 'lambda4192b8cRef', { value: lambda4192b8c.ref, disableExport: true })
        new cdk.Output(this, 'iam958cf9aRef', { value: iam958cf9a.ref, disableExport: true })
        new cdk.Output(this, 'iamc087475Ref', { value: iamc087475.ref, disableExport: true });
    }
}

const app = new cdk.App();

new MyStack(app, 'my-stack-name', { env: { region: 'us-west-2' } });

app.run();
