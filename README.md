# AWS Kinesis Data Stream, Lambda and S3

The main purpose of this application is to help the data analytics team. The data analytics team collects data from s3 and does their analysis. This serverless application will do that, a client application 
produce data and pass data into the AWS kinesis data stream then lambda consumer will consume the data and store it in s3 for further work.

## Architecture
<p align="center">
  <img src="https://github.com/Rafat97/aws-kinesis-data-stream-lambda-s3/assets/21246862/5094f4d6-9904-4541-b759-2a0b5bab8067" alt="high level architecture" />
</p>

## Blog
https://medium.com/@rafat97/kinesis-data-stream-kinesis-firehose-common-use-case-d515c785e51

## How to Run
1. Install serverless freamwork
``` npm install -g serverless ```
2. Clone the repository
``` git clone https://github.com/Rafat97/aws-kinesis-data-stream-lambda-s3.git ```
3. install packages
``` npm install ```
4. Deploy application into AWS 
``` npm run deploy:dev:us-west-1 ```
5. After complition run producer for producing messages. 
``` npm run run:producer ```

6. [NOTE] If you want to remove application 
``` npm run remove:dev:us-west-1 ```
7. For more commend you can checkout `package.json` file. 

---
<h1 align="center"> Thank you </h1>
