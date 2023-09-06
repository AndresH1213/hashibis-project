import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { GetPresignedUrlParams, S3ClientParams } from '../interfaces';

class SingletonS3Client {
  private static instance: SingletonS3Client;
  private client: S3Client;

  private constructor() {
    this.client = new S3Client(this.getS3Params());
  }

  public static getInstance(): SingletonS3Client {
    if (!SingletonS3Client.instance) {
      SingletonS3Client.instance = new SingletonS3Client();
    }
    return SingletonS3Client.instance;
  }

  private getS3Params() {
    const params: S3ClientParams = { region: process.env.REGION || '' };
    if (process.env.IS_OFFLINE) {
      params['endpoint'] = 'http://localhost:4569';
      params['forcedPathStyle'] = true;
      params['accessKeyId'] = 'DEFAULT_ACCESS_KEY';
      params['secretAccessKey'] = 'DEFAULT_SECRET';
    }
    return params;
  }

  async getPresignedUrlPutObject({
    bucket,
    key,
    acl,
    contentType,
  }: GetPresignedUrlParams) {
    const input: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key,
      ACL: acl,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(input);
    return await getSignedUrl(this.client, command, { expiresIn: 3600 });
  }
}

export default SingletonS3Client.getInstance();
