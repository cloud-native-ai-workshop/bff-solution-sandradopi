import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {InferenceDataSource} from '../datasources';

export interface Inference {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
}

export class InferenceProvider implements Provider<Inference> {
  constructor(
    // inference must match the name property in the datasource json file
    @inject('datasources.inference')
    protected dataSource: InferenceDataSource = new InferenceDataSource(),
  ) {}

  value(): Promise<Inference> {
    return getService(this.dataSource);
  }
}
