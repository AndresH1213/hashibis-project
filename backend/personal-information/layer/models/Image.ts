import s3Client from '/opt/nodejs/services/S3Client';
import { randomBytes } from 'crypto';

export default class Image {
  private bucket: string = this.getBucketName();
  private basePath: string = 'users/';
  private acl: string = 'public-read';
  constructor(
    public userId: string,
    public contentType: string,
    public ext: string
  ) {}

  private getPath() {
    const random = randomBytes(4).toString('hex');
    return this.basePath + this.userId + `/${random}.${this.ext}`;
  }

  async getPresignedUrl() {
    const params = {
      bucket: this.bucket,
      key: this.getPath(),
      acl: this.acl,
      contentType: this.contentType,
    };
    const url = await s3Client.getPresignedUrlPutObject(params);
    return url;
  }

  private getBucketName() {
    return process.env.IS_OFFLINE ? 'localBucket' : process.env.BUCKET_NAME;
  }
}
