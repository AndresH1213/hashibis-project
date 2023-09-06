interface IError {
  message: string;
  code: string;
  httpStatus: number;
}

interface IValidationRules {
  bodyParams?: any;
  queryParams?: any;
  pathParams?: any;
}

interface IValidatorResponse {
  valid: boolean;
  errors: { message: string }[];
}

interface DynamoAttribute {
  attribute: string;
  value: string;
}

interface Index extends DynamoAttribute {
  name: string;
}

interface IQueryByIndexComposeInput {
  tableName: string;
  index: {
    name: string;
    pk: DynamoAttribute;
    sk: DynamoAttribute;
  };
}

interface IQueryByIndexInput {
  tableName: string;
  index: Index;
}

interface SDKClientParams {
  region: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

interface DynamoClientParams extends SDKClientParams {}

interface S3ClientParams extends SDKClientParams {
  forcedPathStyle?: boolean;
}

interface GetPresignedUrlParams {
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
}

export {
  IError,
  IValidationRules,
  IValidatorResponse,
  IQueryByIndexInput,
  IQueryByIndexComposeInput,
  DynamoClientParams,
  S3ClientParams,
  GetPresignedUrlParams,
};
