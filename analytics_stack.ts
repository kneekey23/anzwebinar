// npm i -g aws-cdk

import kinesis = require('@aws-cdk/aws-kinesis');
import kinesisfirehose = require('@aws-cdk/aws-kinesisfirehose');
import athena = require('@aws-cdk/aws-athena');
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

        new cdk.Output(this, 'kinesisc5cff84Ref', { value: kinesisc5cff84.ref, disableExport: true })
        new cdk.Output(this, 'kinesis1001474Ref', { value: kinesis1001474.ref, disableExport: true })
        new cdk.Output(this, 'athena36afefaRef', { value: athena36afefa.ref, disableExport: true });
    }
}

const app = new cdk.App();

new MyStack(app, 'my-stack-name', { env: { region: 'us-west-2' } });

app.run();

