import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};

export default config;