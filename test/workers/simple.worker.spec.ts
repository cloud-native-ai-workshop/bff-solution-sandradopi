import {Container} from 'typescript-ioc';
import {SimpleWorker} from '../../src/workers';
import {SimpleWorkerConfig} from '../../src/config/simple-worker.config';
import Mock = jest.Mock;
import {LoggerApi, NoopLoggerService} from '../../src/logger';

describe('simple.worker', () => {
  test('canary verifies test infrastructure', () => {
  });

  describe('given SimpleWorker', () => {

  });
});

async function promiseTimeout<T>(fn: () => T, timeout: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  });
}
