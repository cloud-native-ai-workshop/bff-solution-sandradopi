import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'inference',
  connector: 'rest',
  baseURL: 'https://cpd-cpd-hackathon.cp4d-workshop-hackathon-o-0a90eebd1b04c36c8a65993d6a0c3f93-0000.eu-de.containers.appdomain.cloud',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json'
    }
  },
  operations: [
    {
      template: {
        method: 'POST',
        url: 'https://cpd-cpd-hackathon.cp4d-workshop-hackathon-o-0a90eebd1b04c36c8a65993d6a0c3f93-0000.eu-de.containers.appdomain.cloud/icp4d-api/v1/authorize',
        body: {
          username: 'amun',
          api_key: '9ZTNoY3cW4lPqIQOchVF5oGLWOuswQ2RSqo8TZuu'
        }
      },
      functions: {
        getToken: [
          'username',
          'password'
        ]
      }
    },
    {
      template: {
        method: 'POST',
        url: 'https://cpd-cpd-hackathon.cp4d-workshop-hackathon-o-0a90eebd1b04c36c8a65993d6a0c3f93-0000.eu-de.containers.appdomain.cloud/ml/v4/deployments/deployment_trial/predictions?version=2022-10-12',
        headers: {
          Authorization: 'Bearer {token:string}'
        },
        query: {
          version: '{version:string}'
        },
        body: {
          input_data: '{inputData:array}'
        }
      },
      functions: {
        getPredictions: [
          'version',
          'inputData',
          'token'
        ]
      }
    }
  ],
  crud: false
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class InferenceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'inference';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.inference', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
