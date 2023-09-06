import s3Client from '/opt/nodejs/services/S3Client';
import { randomBytes } from 'crypto';

export default class Image {
  private bucket: string = this.getBucketName();
  private basePath: string = 'products/';
  private acl: string = 'public-read';
  constructor(
    public code: string,
    public name: string,
    public contentType: string
  ) {}

  private getImageName() {
    const [baseName, ext] = this.name.split('.');
    const random = randomBytes(2).toString('hex');
    const fullName = `${baseName}-${random}.${ext}`;
    return fullName;
  }

  async buildUrl() {
    const params = {
      bucket: this.bucket,
      key: `${this.basePath}${this.code}/${this.getImageName()}`,
      acl: this.acl,
      contentType: this.contentType,
    };
    const url = await s3Client.getPresignedUrlPutObject(params);
    return url;
  }

  validate() {
    return this.code && this.name && this.contentType;
  }

  private getBucketName() {
    return process.env.IS_OFFLINE ? 'localBucket' : process.env.BUCKET_NAME;
  }
}
