import { Inject } from 'typescript-ioc';
import {post, Response } from 'superagent';

import { FromApi } from './from.api';
import { LoggerApi } from '../logger';
import { FromServiceConfig } from '../config';
import { FromModel } from 'src/models/from.model';

class From {
    'id'?: string;
    'electricalapliance'?: string;
    'date'?: string;
    'starttime'?: string;
    'endtime'?: string;
}

export class FromService implements FromApi {
    @Inject
    _logger: LoggerApi;
    @Inject
    config: FromServiceConfig;

    get logger(): LoggerApi {
        return this._logger.child('FromService');
    }

    async postFrom(): Promise<FromModel[]> {
        return new Promise((resolve, reject) => {
            post(`${this.config.baseUrl}/from_prediction`)
                .set('Accept', 'application/json')
                .then(res => {
                    console.error('LOGTAMER', res.body);
                    resolve(this.mapFroms(res.body));
                })
                .catch(err => {
                    console.error('LOGTAMER', err);
                    reject(err);
                });
        });
    }

    mapFroms(data: From[]): FromModel[] {
        return data.map(this.mapFrom);
    }

    mapFrom(item:From):FromModel {
        return {
            id: item.id,
            electricalapliance: item.electricalapliance,
            date: item.date,
            starttime: item.starttime,
            endtime: item.endtime,
        };
    }
}