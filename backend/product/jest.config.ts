import {compilerOptions} from './tsconfig.json'
import {pathsToModuleNameMapper} from "ts-jest"
import type {JestConfigWithTsJest} from 'ts-jest'

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/.esbuild/"
  ]
};

export default config;