import { validateEnvironment, validateEnvironmentVariables } from './bootstrap';

export function getResourceNameWithPrefix(resourceName: string) {
  return `api-hashibis-${resourceName}`;
}

export function getStackNameWithPrefix(resourceName: string) {
  return `api-hashibis-infra-${resourceName}`;
}

export function camelCaseToSnakeCase(str: string) {
  str = str[0].toLowerCase() + str.slice(1);
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function getGithubBranchName(stage: string) {
  switch (stage) {
    case 'dev':
      return 'develop';
    case 'prod':
      return 'main';
    default:
      throw new Error('Please specify a valid environment');
  }
}

export { validateEnvironment };
