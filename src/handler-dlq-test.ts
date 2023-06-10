import { KinesisStreamHandler } from "aws-lambda";

export const preprocess: KinesisStreamHandler = async (
  event: any,
  context: any
) => {
  console.log(JSON.stringify(event));

  console.log(event.Records.length);

  event.Records.forEach((record: any) => {
    console.log(record);
    // console.log(record.kinesis.data);
  });

  throw new Error("Check DKQ");
};
