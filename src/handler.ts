import { KinesisStreamHandler } from "aws-lambda";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  S3_JSON_DESTINATION_BUCKET_NAME,
  S3_JSON_DESTINATION_BUCKET_REGION,
} from "./constant";
import { ulid } from "ulid";

const currentDateTime = () => {
  const nowDate = Date.now();
  const today: Date | string = new Date(nowDate);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return {
    "yyyy-mm-dd": `${yyyy}-${mm}-${dd}`,
    "yyyy/mm/dd": `${yyyy}/${mm}/${dd}`,
    timestamp: nowDate,
  };
};

const putItemIntoS3 = async (data: any) => {
  const current = currentDateTime();
  const bucketName = S3_JSON_DESTINATION_BUCKET_NAME;
  const bucketRegion = S3_JSON_DESTINATION_BUCKET_REGION;
  const s3BucketKey = `${current["yyyy-mm-dd"]}/${
    current.timestamp
  }_${ulid()}.json`;

  const client = new S3Client({
    region: bucketRegion,
  });

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3BucketKey,
    Body: data,
  });
  const response = await client.send(command);
  return response;
  // console.log(response);
};

export const preprocess: KinesisStreamHandler = async (
  event: any,
  context: any
) => {
  // console.log(JSON.stringify(event));
  // console.log(event.Records.length);

  const data: any = [];
  for (let index = 0; index < event.Records.length; index++) {
    const record = event.Records[index];
    const decodedData = Buffer.from(record.kinesis.data, "base64").toString(
      "utf-8"
    );
    data.push({
      partitionKey: record.kinesis.partitionKey,
      sequenceNumber: record.kinesis.sequenceNumber,
      data: record.kinesis.data,
      decodedData: decodedData,
      approximateArrivalTimestamp: record.kinesis.approximateArrivalTimestamp,
    });
  }
  const convertString = JSON.stringify(data);
  // console.log(convertString);
  await putItemIntoS3(convertString);

  return;
};
