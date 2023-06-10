import * as AWS from "aws-sdk";
import { faker } from "@faker-js/faker";
import { ulid } from "ulid";

const kinesis = new AWS.Kinesis({
  region: "us-west-1",
});

const streamName = "kds-lambda-test-kinesis";

function generateTelemetry() {
  const randomEmails = [
    faker.internet.email(),
    faker.internet.email(),
    faker.internet.email(),
  ];
  let count = 0;
  setInterval(() => {
    count += 1;
    const email = randomEmails[count % randomEmails.length];
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();
    const data = { email, latitude, longitude };
    const partitionKey = ulid();

    // if you use this Buffer & zlib you have to change the lambda handler also
    // const sendData = Buffer.from(zlib.deflateSync(JSON.stringify(data)), "utf-8");
    const sendData = JSON.stringify(data);

    const params = {
      Data: sendData,
      PartitionKey: partitionKey,
      StreamName: streamName,
    };

    // console.log(params);

    kinesis.putRecord(params, (err, data) => {
      if (err) {
        console.error(err, err.stack);
      } else {
        console.log(data, count);
      }
    });
  }, 50);
}

generateTelemetry();
